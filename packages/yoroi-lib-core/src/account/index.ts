import { EmurgoAccountApi } from './emurgo-api'
import {
  AccountApi,
  AccountApiConfig,
  AccountChainProtocols,
  AccountStorage,
  AddressRecord,
  EmurgoApiResult
} from './models'

type AddressChainMetadata = {
  highestAddressIndexUsed: number
  addresses: Map<number, number>
}

export class AccountService {
  readonly _api: AccountApi
  readonly _storage: AccountStorage
  readonly _chainProtocols: AccountChainProtocols
  _initialized: boolean

  readonly _storageData: AddressRecord[]
  readonly _indexByAddress: Map<string, number>
  readonly _indexByHash: Map<string, number>
  readonly _accounts: Map<number, Map<number, AddressChainMetadata>>

  _lastWrite: number
  _lastWriteSaved: number

  static metadataDefault(): AddressChainMetadata {
    return {
      highestAddressIndexUsed: -1,
      addresses: new Map()
    }
  }

  constructor(
    api: AccountApi,
    storage: AccountStorage,
    chainProtocols: AccountChainProtocols
  ) {
    this._api = api
    this._storage = storage
    this._chainProtocols = chainProtocols
    this._initialized = false

    this._storageData = []
    this._indexByAddress = new Map()
    this._indexByHash = new Map()
    this._accounts = new Map()

    this._lastWrite = 0
    this._lastWriteSaved = 0
  }

  static fromConfig(
    apiConfig: AccountApiConfig,
    storage: AccountStorage,
    protocol: AccountChainProtocols
  ) {
    const api = new EmurgoAccountApi(apiConfig)
    return new AccountService(api, storage, protocol)
  }

  _addToAccounts(account: number) {
    if (!this._accounts.has(account)) {
      this._accounts.set(
        account,
        new Map(
          [...this._chainProtocols.keys()].map((chain) => [
            chain,
            {
              ...AccountService.metadataDefault()
            }
          ])
        )
      )
    }
    return this._accounts.get(account)
  }

  _saveMetadata(addressRecord: Readonly<AddressRecord>, index: number) {
    const { account, chain, firstBlock, addressIndex } = addressRecord
    const accountData = this._addToAccounts(account)
    if (!accountData?.has(chain)) {
      accountData?.set(chain, {
        ...AccountService.metadataDefault()
      })
    }
    const chainData = accountData?.get(chain)
    if (chainData) {
      if (firstBlock && addressIndex > chainData.highestAddressIndexUsed) {
        chainData.highestAddressIndexUsed = addressIndex
      }
      chainData.addresses.set(addressIndex, index)
    }
  }

  _saveIndexes(addressRecord: Readonly<AddressRecord>, index: number) {
    if (addressRecord.address) {
      this._indexByAddress.set(addressRecord.address, index)
    }
    if (addressRecord.hash) {
      this._indexByHash.set(addressRecord.hash, index)
    }
  }

  _saveRecord(addressRecord: Readonly<AddressRecord>, isHidrating = false) {
    let index =
      this._indexByAddress.get(addressRecord.address) ??
      this._indexByHash.get(addressRecord.hash)
    if (index === undefined) {
      index = this._storageData.push(addressRecord) - 1
      this._saveIndexes(addressRecord, index)
    }
    this._saveMetadata(addressRecord, index)
    if (!isHidrating) {
      this._lastWrite += 1
    }
  }

  get accounts() {
    return this._accounts
  }

  async _fillAccount(account: number) {
    let updated = false
    const accountData = this._accounts.get(account)
    if (accountData) {
      for (const [
        chain,
        { addresses, highestAddressIndexUsed }
      ] of accountData.entries()) {
        const chainProtocolData = this._chainProtocols.get(chain)
        if (chainProtocolData) {
          const { bufferSize, gapLimit, derive } = chainProtocolData
          const freeBuffer =
            addresses.size - (highestAddressIndexUsed + 1 + gapLimit)
          if (!addresses.size || freeBuffer < 0) {
            updated = true
            const startIndex = addresses.size
            for (let i = 0; i < bufferSize; i++) {
              const addressRecord = await derive({
                account,
                chain,
                addressIndex: startIndex + i
              })
              this._saveRecord(addressRecord)
            }
          }
        }
      }
    }
    return updated
  }

  address(addressOrHash: string) {
    const index =
      this._indexByAddress.get(addressOrHash) ??
      this._indexByHash.get(addressOrHash)
    if (index !== undefined) {
      return this._storageData[index]
    }
  }

  addresses(account: number, chain: number) {
    const addresses: Array<AddressRecord> = []
    const accountData = this._accounts.get(account)
    if (accountData) {
      const chainProtocolData = this._chainProtocols.get(chain)
      const chainData = accountData.get(chain)
      if (chainData && chainProtocolData) {
        const addressSizeWithGap =
          chainProtocolData.gapLimit + chainData.highestAddressIndexUsed + 1
        const sortedEntriesWithoutGap = [...chainData.addresses.entries()]
          .sort(([a], [b]) => a - b)
          .slice(0, addressSizeWithGap)
        sortedEntriesWithoutGap.forEach(([_addressIndex, index]) => {
          const addressData = this._storageData[index]
          addresses.push(addressData)
        })
      }
    }
    return addresses
  }

  async _updateUsedAddresses(account: number) {
    let updated = false
    const accountData = this._accounts.get(account)
    if (accountData) {
      const unsettledAddresses: Array<string> = []
      for (const [chain, { addresses }] of accountData.entries()) {
        const chainData = this._chainProtocols.get(chain)
        if (chainData) {
          const { queryUsedBy } = chainData
          if (queryUsedBy !== 'none') {
            addresses.forEach((index) => {
              const data = this._storageData[index]
              // NOTE: to support soft forks need to match current_block and assurance
              if (data.firstBlock === 0) {
                unsettledAddresses.push(
                  queryUsedBy === 'address' ? data.address : data.hash
                )
              }
            })
          }
        }
        if (unsettledAddresses.length) {
          const { result, data } = await this._api.getAddressesUsed({
            addresses: unsettledAddresses
          })
          if (result === EmurgoApiResult.SUCCESS && data?.length) {
            updated = true
            // NOTE: new return should map address with first_block
            data.forEach((addressOrHash) => {
              const addressData = this.address(addressOrHash)
              if (addressData && addressData.firstBlock === 0) {
                addressData.firstBlock = 1
                this._saveRecord(addressData)
              }
            })
          }
        }
      }
    }
    return updated
  }

  async _checkInitilization() {
    if (!this._initialized) {
      throw new Error('It should be initialized first')
    }
  }

  async synchronize(account: number, isHidrating = false) {
    if (!isHidrating) {
      await this._checkInitilization()
    }
    let isUpdating
    do {
      isUpdating = await this._updateUsedAddresses(account)
      if (isUpdating) {
        isUpdating = await this._fillAccount(account)
      }
    } while (isUpdating)
  }

  async create(account: number) {
    await this._checkInitilization()
    const accountData = this._addToAccounts(account)
    await this._fillAccount(account)
    await this.synchronize(account)
    return accountData
  }

  async initialize() {
    const deserializedAccountsData = await this._storage.readAccounts()
    deserializedAccountsData.forEach((accountsData) =>
      this._saveRecord(accountsData, true)
    )
    for (const account of this._accounts.keys()) {
      await this.synchronize(account, true)
    }
    this._initialized = true
  }

  async save() {
    await this._checkInitilization()
    if (this._lastWriteSaved !== this._lastWrite) {
      const nextLastWriteSaved = this._lastWrite
      const accountsData = [...this._storageData]
      const saved = await this._storage.saveAccounts(accountsData)
      if (saved) {
        this._lastWriteSaved = nextLastWriteSaved
      }
    }
  }

  logMetadata() {
    console.debug(this._indexByAddress)
    console.debug(this._indexByHash)
    console.debug(this._storageData)
  }
}
