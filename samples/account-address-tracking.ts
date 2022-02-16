import { AccountService } from '@emurgo/yoroi-lib-core/dist/account'
import {
  AccountChainProtocols,
  AddressPath,
  AddressRecord
} from '@emurgo/yoroi-lib-core/dist/account/models'
import {
  Address,
  Bip32PrivateKey,
  Bip32PublicKey,
  Ed25519KeyHash
} from '@emurgo/yoroi-lib-core/dist/internals/wasm-contract'
import { init } from '@emurgo/yoroi-lib-nodejs'
import { mnemonicToEntropy } from 'bip39'
import * as path from 'path'
import { JsonAccountStorage } from './shared/json-storage'

const CHIMERIC = 2
const INTERNAL = 1
const EXTERNAL = 0

const accountsPath = path.join(__dirname, '__storage__', 'accounts.json')
const accountsStorage = new JsonAccountStorage(accountsPath)
const yoroiLib = init()

const cardanoDerive = async () => {
  const harden = (num: number) => {
    return 0x80000000 + num
  }
  const toHex = (x) => Buffer.from(x).toString('hex')
  const mnemonic = Array(14).fill('abandon').concat('share').join(' ')
  const entropy = mnemonicToEntropy(mnemonic)
  const accountKeys = new Map<
    number,
    {
      accountSK: Bip32PrivateKey
      accountVKHex: string
      accountVK: Bip32PublicKey
      stakeVK: Bip32PublicKey
      stakeVKHex: string
      stakeVKHash: Ed25519KeyHash
      rewardAddress: Address
    }
  >()
  let networkId, rootSK
  try {
    networkId = await yoroiLib.Wasm.NetworkInfo.testnet().then((x) =>
      x.networkId()
    )
    rootSK = await yoroiLib.Wasm.Bip32PrivateKey.fromBip39Entropy(
      Buffer.from(entropy, 'hex'),
      Buffer.from('')
    )
  } catch (err) {
    console.error(`Root setup error`, err)
  }

  return async (path: AddressPath): Promise<AddressRecord> => {
    const { account, chain, addressIndex } = path

    if (!accountKeys.has(account)) {
      try {
        const accountSK = await rootSK
          .derive(harden(1852))
          .then((x) => x.derive(harden(1815)))
          .then((x) => x.derive(harden(account)))
        const accountVK = await accountSK.toPublic()
        const accountVKHex = await accountVK.asBytes().then(toHex)
        const stakeVK = await accountSK
          .derive(2)
          .then((x) => x.derive(0))
          .then((x) => x.toPublic())
        const stakeVKHex = await stakeVK.asBytes().then(toHex)
        const stakeVKHash = await stakeVK.toRawKey().then((x) => x.hash())
        const rewardAddress = await yoroiLib.Wasm.RewardAddress.new(
          networkId,
          await yoroiLib.Wasm.StakeCredential.fromKeyhash(stakeVKHash)
        ).then((x) => x.toAddress())
        await accountKeys.set(account, {
          accountSK,
          accountVKHex,
          accountVK,
          stakeVK,
          stakeVKHex,
          stakeVKHash,
          rewardAddress
        })
      } catch (err) {
        console.error(`Account setup error`, err)
      }
    }
    const accountKeysData = accountKeys.get(account)
    const { accountVK, stakeVKHash, rewardAddress, stakeVKHex } =
      accountKeysData

    if (chain !== 2) {
      const addressVKHash = await accountVK
        .derive(chain)
        .then((x) => x.derive(addressIndex))
        .then((x) => x.toRawKey())
        .then((x) => x.hash())

      const baseAddress = await yoroiLib.Wasm.BaseAddress.new(
        networkId,
        await yoroiLib.Wasm.StakeCredential.fromKeyhash(addressVKHash),
        await yoroiLib.Wasm.StakeCredential.fromKeyhash(stakeVKHash)
      )

      const address = await baseAddress.toAddress().then((x) => x.toBech32())
      const hash = await addressVKHash.toBytes().then(toHex)

      return {
        account,
        chain,
        addressIndex,
        address,
        hash,
        firstBlock: 0
      }
    }
    return {
      account,
      chain,
      addressIndex,
      address: await rewardAddress.toBech32(),
      hash: stakeVKHex,
      firstBlock: 0
    }
  }
}

const main = async () => {
  const derive = await cardanoDerive()
  const chainProtocols: AccountChainProtocols = new Map([
    [
      EXTERNAL,
      {
        bufferSize: 50,
        gapLimit: 20,
        queryUsedBy: 'address',
        derive: derive
      }
    ],
    [
      INTERNAL,
      {
        bufferSize: 50,
        gapLimit: 20,
        queryUsedBy: 'address',
        derive: derive
      }
    ],
    [
      CHIMERIC,
      {
        bufferSize: 2,
        gapLimit: 1,
        queryUsedBy: 'none',
        derive: derive
      }
    ]
  ])

  const accountService = AccountService.fromConfig(
    {
      url: 'https://testnet-backend.yoroiwallet.com/api/',
      maxAddressesPerRequest: 50
    },
    accountsStorage,
    chainProtocols
  )
  // NOTE: You have to manage the store
  // await accountsStorage.clearStorage()

  await accountService.initialize()
  const account = 0
  await accountService.create(account)

  const externalAddressRecords = accountService.addresses(account, EXTERNAL)
  const internalAddressRecords = accountService.addresses(account, INTERNAL)

  // NOTE: You have to manage the store
  // await addressService.save()

  console.debug(externalAddressRecords, internalAddressRecords)

  // TODO: integrate with UtxoService and check if is used by address or hash
  // const externalAddresses: string[] = externalAddressRecords.map((r) => r.address)
  // const internalAddresses: string[] = internalAddressRecords.map((r) => r.address)

  // const addresses = externalAddresses.concat(internalAddresses)
  // await utxoService.syncUtxoState(addresses)
  // const utxos = await utxoService.getAvailableUtxos()
  // const sum = utxos.reduce((prev, curr) => {
  //   return prev.plus(curr.amount)
  // }, new BigNumber('0'))
}

main()
