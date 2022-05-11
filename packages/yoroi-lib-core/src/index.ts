import { BigNumber } from 'bignumber.js'
import { blake2b } from 'hash-wasm'

import {
  AssetOverflowError,
  BaseError,
  GenericError,
  NoOutputsError,
  NotEnoughMoneyToSendError,
  RewardAddressEmptyError
} from './errors'
import {
  AccountStatePart,
  Address,
  AddressingAddress,
  CardanoAddressedUtxo,
  CardanoHaskellConfig,
  CatalystLabels,
  Change,
  MetadataJsonSchema,
  PRIMARY_ASSET_CONSTANTS,
  RemoteUnspentOutput,
  SendToken,
  Token,
  TxOptions,
  TxOutput,
  WithdrawalRequest
} from './internals/models'
import { genWasmUnsignedTx, UnsignedTx } from './internals/tx'
import {
  AddInputResult,
  createMetadata,
  firstWithValue
} from './internals/utils'
import { normalizeToAddress } from './internals/utils/addresses'
import {
  buildSendTokenList,
  cardanoValueFromMultiToken,
  hasSendAllDefault,
  multiTokenFromCardanoValue,
  multiTokenFromRemote
} from './internals/utils/assets'
import {
  addUtxoInput,
  cardanoValueFromRemoteFormat,
  isBigNumZero,
  minRequiredForChange
} from './internals/utils/transactions'
import * as WasmContract from './internals/wasm-contract'
import { BigNum, RewardAddress } from './internals/wasm-contract'

export { AccountService } from './account'
export { AccountChainProtocols, AccountStorage } from './account/models'
export * from './internals/models'
export * from './internals/tx'
export * as WasmContract from './internals/wasm-contract'
export { init as initUtxo, UtxoService, UtxoStorage } from './utxo'

/**
 * Currently, the @emurgo/react-native-haskell-shelley lib defines some variables as the type `u32`, which have a max value of `4294967295`.
  In TypeScript, this type is translated as `number`, which goes much bigger than `4294967295`.
 */
export const RUST_u32_MAX = 4294967295

const defaultTtlOffset = 7200

export const createYoroiLib = (
  wasmV4: WasmContract.WasmModuleProxy
): IYoroiLib => {
  return new YoroiLib(wasmV4)
}

export interface YoroiLibLogger {
  debug: (msg: string, ...args: any[]) => void
  error: (msg: string, ...args: any[]) => void
}

export interface IYoroiLib {
  readonly Wasm: WasmContract.WasmModuleProxy
  calculateTxId(encodedTx: string, encoding: 'base64' | 'hex'): Promise<string>
  encryptWithPassword(
    password: string,
    salt: string,
    nonce: string,
    data: string
  ): Promise<string>
  decryptWithPassword(password: string, data: string): Promise<string>
  createUnsignedTx(
    absSlotNumber: BigNumber,
    utxos: Array<CardanoAddressedUtxo>,
    receiver: string,
    changeAddr: AddressingAddress,
    tokens: Array<SendToken>,
    config: CardanoHaskellConfig,
    defaultToken: Token,
    txOptions: TxOptions
  ): Promise<UnsignedTx>
  createUnsignedWithdrawalTx(
    accountState: {
      [key: string]: null | AccountStatePart
    },
    absSlotNumber: BigNumber,
    utxos: Array<CardanoAddressedUtxo>,
    withdrawalRequests: Array<WithdrawalRequest>,
    changeAddr: AddressingAddress,
    config: CardanoHaskellConfig,
    txOptions: TxOptions
  ): Promise<UnsignedTx>
  createUnsignedVotingTx(
    absSlotNumber: BigNumber,
    utxos: Array<CardanoAddressedUtxo>,
    changeAddr: AddressingAddress,
    config: CardanoHaskellConfig,
    txOptions: TxOptions,
    votingPublicKey: string,
    stakingPublicKey: string,
    rewardAddress: string,
    nonce: number,
    signer: (a: Uint8Array) => string
  ): Promise<UnsignedTx>
}

class YoroiLib implements IYoroiLib {
  private static _logger: YoroiLibLogger
  private readonly _wasmV4: WasmContract.WasmModuleProxy

  // Not much tought was given to this logging solution, so it's likely to change
  static set logger(val: YoroiLibLogger) {
    YoroiLib._logger = val
  }

  static get logger(): YoroiLibLogger {
    if (!YoroiLib._logger) {
      YoroiLib._logger = {
        debug: (msg: string) => console.log(msg),
        error: (msg: string, ...args: any[]) => {
          console.error(msg)
          console.error(args)
        }
      }
    }
    return YoroiLib._logger
  }

  get Wasm(): WasmContract.WasmModuleProxy {
    return this._wasmV4
  }

  constructor(wasmV4: WasmContract.WasmModuleProxy) {
    this._wasmV4 = wasmV4
  }

  async calculateTxId(
    encodedTx: string,
    encoding: 'base64' | 'hex'
  ): Promise<string> {
    const txBuffer = Buffer.from(encodedTx, encoding)
    const tx = await this.Wasm.Transaction.fromBytes(txBuffer)
    const txBody = await tx.body()

    const blake2bTxHash = await blake2b(await txBody.toBytes(), 256)
    return blake2bTxHash
  }

  async encryptWithPassword(
    password: string,
    salt: string,
    nonce: string,
    data: string
  ): Promise<string> {
    return await this._wasmV4.encryptWithPassword(password, salt, nonce, data)
  }

  async decryptWithPassword(password: string, data: string): Promise<string> {
    return await this._wasmV4.decryptWithPassword(password, data)
  }

  async createUnsignedTx(
    absSlotNumber: BigNumber,
    utxos: Array<CardanoAddressedUtxo>,
    receiver: string,
    changeAddr: AddressingAddress,
    tokens: Array<SendToken>,
    config: CardanoHaskellConfig,
    defaultToken: Token,
    txOptions: TxOptions
  ): Promise<UnsignedTx> {
    const receivers = [
      {
        address: receiver
      } as AddressingAddress
    ]

    if (!hasSendAllDefault(tokens)) {
      receivers.push(changeAddr)
    }

    return await this.createUnsignedTxForUtxos(
      absSlotNumber,
      receivers,
      defaultToken,
      tokens,
      utxos,
      config,
      txOptions
    )
  }

  async createUnsignedVotingTx(
    absSlotNumber: BigNumber,
    utxos: Array<CardanoAddressedUtxo>,
    changeAddr: AddressingAddress,
    config: CardanoHaskellConfig,
    txOptions: TxOptions,
    votingPublicKey: string,
    stakingPublicKey: string,
    rewardAddress: string,
    nonce: number,
    signer: (a: Uint8Array) => string
  ): Promise<UnsignedTx> {
    const registrationData = await this.Wasm.encodeJsonStrToMetadatum(
      JSON.stringify({
        '1': `0x${votingPublicKey}`,
        '2': `0x${stakingPublicKey}`,
        '3': `0x${rewardAddress}`,
        '4': `0x${nonce}`
      }),
      MetadataJsonSchema.BasicConversions
    )

    const generalMetadata = await this.Wasm.GeneralTransactionMetadata.new()
    await generalMetadata.insert(
      await this.Wasm.BigNum.fromStr(CatalystLabels.DATA.toString()),
      registrationData
    )

    const hashedMetadataStr = await blake2b(
      await generalMetadata.toBytes(),
      256
    )
    const hashedMetadata = Buffer.from(hashedMetadataStr, 'hex')

    await generalMetadata.insert(
      await this.Wasm.BigNum.fromStr(CatalystLabels.SIG.toString()),
      await this.Wasm.encodeJsonStrToMetadatum(
        JSON.stringify({
          '1': `0x${signer(hashedMetadata)}`
        }),
        MetadataJsonSchema.BasicConversions
      )
    )

    const metadataList = await this.Wasm.MetadataList.new()
    await metadataList.add(
      await this.Wasm.TransactionMetadatum.fromBytes(
        await generalMetadata.toBytes()
      )
    )
    await metadataList.add(
      await this.Wasm.TransactionMetadatum.newList(
        await this.Wasm.MetadataList.new()
      )
    )

    const auxData = await this.Wasm.AuxiliaryData.fromBytes(
      await metadataList.toBytes()
    )

    const protocolParams = {
      keyDeposit: await this._wasmV4.BigNum.fromStr(config.keyDeposit),
      linearFee: await this._wasmV4.LinearFee.new(
        await this._wasmV4.BigNum.fromStr(config.linearFee.coefficient),
        await this._wasmV4.BigNum.fromStr(config.linearFee.constant)
      ),
      minimumUtxoVal: await this._wasmV4.BigNum.fromStr(config.minimumUtxoVal),
      poolDeposit: await this._wasmV4.BigNum.fromStr(config.poolDeposit),
      networkId: config.networkId
    }

    const unsignedTx = await this.newAdaUnsignedTx(
      [],
      changeAddr,
      utxos,
      absSlotNumber,
      protocolParams,
      [],
      [],
      auxData,
      {
        neededHashes: new Set(),
        wits: new Set()
      },
      txOptions,
      false
    )

    return unsignedTx
  }

  async createUnsignedWithdrawalTx(
    accountState: {
      [key: string]: null | AccountStatePart
    },
    absSlotNumber: BigNumber,
    utxos: Array<CardanoAddressedUtxo>,
    withdrawalRequests: Array<WithdrawalRequest>,
    changeAddr: AddressingAddress,
    config: CardanoHaskellConfig,
    txOptions: TxOptions
  ): Promise<UnsignedTx> {
    const certificates = []
    const neededKeys = {
      neededHashes: new Set<string>(),
      wits: new Set<string>()
    }
    const requiredWits: Array<WasmContract.Ed25519KeyHash> = []

    for (const withdrawalRequest of withdrawalRequests) {
      const wasmAddr = await this.Wasm.RewardAddress.fromAddress(
        await this.Wasm.Address.fromBytes(
          Buffer.from(withdrawalRequest.rewardAddress, 'hex')
        )
      )
      if (!wasmAddr.hasValue())
        throw new Error(
          `createUnsignedWithdrawalTx: withdrawal not a reward address`
        )
      const paymentCred = await wasmAddr.paymentCred()

      const keyHash = await paymentCred.toKeyhash()
      if (!keyHash.hasValue())
        throw new Error(`Unexpected: withdrawal from a script hash`)
      requiredWits.push(keyHash)

      if (withdrawalRequest.shouldDeregister) {
        certificates.push(
          await this.Wasm.Certificate.newStakeDeregistration(
            await this.Wasm.StakeDeregistration.new(paymentCred)
          )
        )
        neededKeys.neededHashes.add(
          Buffer.from(await paymentCred.toBytes()).toString('hex')
        )
      }
    }

    const finalWithdrawals = await Object.keys(accountState).reduce(
      async (listPromise, address) => {
        const list = await listPromise
        const rewardForAddress = accountState[address]
        // if key is not registered, we just skip this withdrawal
        if (rewardForAddress == null) {
          return list
        }

        const rewardBalance = new BigNumber(rewardForAddress.remainingAmount)

        // if the reward address is empty, we filter it out of the withdrawal list
        // although the protocol allows withdrawals of 0 ADA, it's pointless to do
        // recall: you may want to undelegate the ADA even if there is 0 ADA in the reward address
        // since you may want to get back your deposit
        if (rewardBalance.eq(0)) {
          return list
        }

        const rewardAddress = await this.Wasm.RewardAddress.fromAddress(
          await this.Wasm.Address.fromBytes(Buffer.from(address, 'hex'))
        )
        if (!rewardAddress.hasValue()) {
          throw new Error(
            `createUnsignedWithdrawalTx: withdrawal not a reward address`
          )
        }
        {
          const stakeCredential = await rewardAddress.paymentCred()
          neededKeys.neededHashes.add(
            Buffer.from(await stakeCredential.toBytes()).toString('hex')
          )
        }
        list.push({
          address: rewardAddress,
          amount: await this.Wasm.BigNum.fromStr(
            rewardForAddress.remainingAmount
          )
        })
        return list
      },
      Promise.resolve(
        [] as {
          address: RewardAddress
          amount: BigNum
        }[]
      )
    )

    if (finalWithdrawals.length === 0 && certificates.length === 0) {
      throw new RewardAddressEmptyError()
    }

    const protocolParams = {
      keyDeposit: await this._wasmV4.BigNum.fromStr(config.keyDeposit),
      linearFee: await this._wasmV4.LinearFee.new(
        await this._wasmV4.BigNum.fromStr(config.linearFee.coefficient),
        await this._wasmV4.BigNum.fromStr(config.linearFee.constant)
      ),
      minimumUtxoVal: await this._wasmV4.BigNum.fromStr(config.minimumUtxoVal),
      poolDeposit: await this._wasmV4.BigNum.fromStr(config.poolDeposit),
      networkId: config.networkId
    }

    const unsignedTx = await this.newAdaUnsignedTx(
      [],
      changeAddr,
      utxos,
      absSlotNumber,
      protocolParams,
      certificates,
      finalWithdrawals,
      undefined,
      neededKeys,
      txOptions,
      false
    )

    return unsignedTx
  }

  private async createUnsignedTxForUtxos(
    absSlotNumber: BigNumber,
    receivers: Array<AddressingAddress>,
    defaultToken: Token,
    tokens: SendToken[],
    utxos: Array<CardanoAddressedUtxo>,
    config: CardanoHaskellConfig,
    txOptions: TxOptions
  ): Promise<UnsignedTx> {
    try {
      const protocolParams = {
        keyDeposit: await this._wasmV4.BigNum.fromStr(config.keyDeposit),
        linearFee: await this._wasmV4.LinearFee.new(
          await this._wasmV4.BigNum.fromStr(config.linearFee.coefficient),
          await this._wasmV4.BigNum.fromStr(config.linearFee.constant)
        ),
        minimumUtxoVal: await this._wasmV4.BigNum.fromStr(
          config.minimumUtxoVal
        ),
        poolDeposit: await this._wasmV4.BigNum.fromStr(config.poolDeposit),
        networkId: config.networkId
      }

      const txMetadata =
        txOptions.metadata !== undefined
          ? await createMetadata(this.Wasm, txOptions.metadata)
          : undefined

      if (hasSendAllDefault(tokens)) {
        if (receivers.length !== 1) {
          throw new Error(
            `createUnsignedTxForUtxos: wrong output size for sendAll`
          )
        }
        const receiver = receivers[0]
        return await this.sendAllUnsignedTx(
          receiver,
          utxos,
          absSlotNumber,
          protocolParams,
          txMetadata,
          {
            neededHashes: new Set([]),
            wits: new Set([])
          },
          txOptions
        )
      } else {
        const changeAddresses = receivers.reduce((arr, next) => {
          if (next.addressing != null) {
            arr.push({
              address: next.address,
              addressing: next.addressing
            })
            return arr
          }
          return arr
        }, [] as Array<AddressingAddress>)

        if (changeAddresses.length !== 1) {
          throw new Error(
            'createUnsignedTxForUtxos: needs exactly one change address'
          )
        }

        const changeAddr = changeAddresses[0]
        const otherAddresses: Array<Address> = receivers.reduce((arr, next) => {
          if (next.addressing == null) {
            arr.push(next.address)
            return arr
          }
          return arr
        }, [] as Array<Address>)

        if (otherAddresses.length > 1) {
          throw new Error(
            "createUnsignedTxForUtxos: can't send to more than one address"
          )
        }

        const unsignedTx = await this.newAdaUnsignedTx(
          otherAddresses.length === 1
            ? [
                {
                  address: otherAddresses[0],
                  amount: buildSendTokenList(
                    defaultToken,
                    tokens,
                    utxos.map((utxo) =>
                      multiTokenFromRemote(utxo, protocolParams.networkId)
                    )
                  )
                }
              ]
            : [],
          {
            address: changeAddr.address,
            addressing: changeAddr.addressing
          },
          utxos,
          absSlotNumber,
          protocolParams,
          [],
          [],
          txMetadata,
          {
            neededHashes: new Set([]),
            wits: new Set([])
          },
          txOptions,
          false
        )
        YoroiLib.logger.debug(`createUnsignedTxForUtxos success`, unsignedTx)
        return unsignedTx
      }
    } catch (error) {
      YoroiLib.logger.error(`createUnsignedTxForUtxos error`, error)
      if (error instanceof BaseError) throw error
      throw new GenericError()
    }
  }

  private async sendAllUnsignedTx(
    receiver: AddressingAddress,
    allUtxos: Array<CardanoAddressedUtxo>,
    absSlotNumber: BigNumber,
    protocolParams: {
      linearFee: WasmContract.LinearFee
      minimumUtxoVal: WasmContract.BigNum
      poolDeposit: WasmContract.BigNum
      keyDeposit: WasmContract.BigNum
      networkId: number
    },
    auxData: WasmContract.AuxiliaryData | undefined,
    neededStakingKeyHashes: { neededHashes: Set<string>; wits: Set<string> },
    txOptions: TxOptions
  ): Promise<UnsignedTx> {
    const addressingMap = new Map<RemoteUnspentOutput, CardanoAddressedUtxo>()
    for (const utxo of allUtxos) {
      addressingMap.set(
        {
          amount: utxo.amount,
          receiver: utxo.receiver,
          txHash: utxo.txHash,
          txIndex: utxo.txIndex,
          utxoId: utxo.utxoId,
          assets: utxo.assets
        },
        utxo
      )
    }
    const unsignedTxResponse = await this.sendAllUnsignedTxFromUtxo(
      receiver,
      Array.from(addressingMap.keys()),
      absSlotNumber,
      protocolParams,
      auxData
    )

    const addressedUtxos = unsignedTxResponse.senderUtxos.map((utxo) => {
      const addressedUtxo = addressingMap.get(utxo)
      if (addressedUtxo == null) {
        throw new Error(
          'sendAllUnsignedTx: utxo reference was changed. Should not happen'
        )
      }
      return addressedUtxo
    })

    /*
      The outputs is an empty array and the change is undefined.
      These info should be implicit on 'send all', meaning the client code should know
      they beforehand, and therefore sending them back is not needed
    */
    return await genWasmUnsignedTx(
      this.Wasm,
      unsignedTxResponse.txBuilder,
      addressedUtxos,
      unsignedTxResponse.change,
      {
        networkId: protocolParams.networkId,
        identifier: PRIMARY_ASSET_CONSTANTS.Cardano,
        isDefault: true
      },
      protocolParams.networkId,
      neededStakingKeyHashes,
      txOptions.metadata ?? []
    )
  }

  private async sendAllUnsignedTxFromUtxo(
    receiver: AddressingAddress,
    allUtxos: Array<RemoteUnspentOutput>,
    absSlotNumber: BigNumber,
    protocolParams: {
      linearFee: WasmContract.LinearFee
      minimumUtxoVal: WasmContract.BigNum
      poolDeposit: WasmContract.BigNum
      keyDeposit: WasmContract.BigNum
      networkId: number
    },
    auxData: WasmContract.AuxiliaryData | undefined
  ): Promise<{
    senderUtxos: RemoteUnspentOutput[]
    txBuilder: WasmContract.TransactionBuilder
    change: Array<Change>
  }> {
    const totalBalance = allUtxos
      .map((utxo) => new BigNumber(utxo.amount))
      .reduce((acc, amount) => acc.plus(amount), new BigNumber(0))
    if (totalBalance.isZero()) {
      throw new NotEnoughMoneyToSendError()
    }

    const txBuilder = await this.Wasm.TransactionBuilder.new(
      protocolParams.linearFee,
      protocolParams.minimumUtxoVal,
      protocolParams.poolDeposit,
      protocolParams.keyDeposit
    )
    await txBuilder.setTtl(absSlotNumber.plus(defaultTtlOffset).toNumber())

    for (const input of allUtxos) {
      if (
        (await addUtxoInput(this.Wasm, txBuilder, undefined, input, false, {
          networkId: protocolParams.networkId
        })) === AddInputResult.OVERFLOW
      ) {
        // for the send all case, prefer to throw an error
        // instead of skipping inputs that would cause an error
        // otherwise leads to unexpected cases like wallet migration leaving some UTXO behind
        throw new AssetOverflowError()
      }
    }

    if (auxData?.hasValue()) {
      await txBuilder.setAuxiliaryData(auxData)
    }

    if (totalBalance.lt(await txBuilder.minFee().then((x) => x.toStr()))) {
      // not enough in inputs to even cover the cost of including themselves in a tx
      throw new NotEnoughMoneyToSendError()
    }
    {
      const wasmReceiver = await normalizeToAddress(this.Wasm, receiver.address)
      if (wasmReceiver == null) {
        throw new Error(
          'sendAllUnsignedTxFromUtxo receiver not a valid Shelley address'
        )
      }

      // semantically, sending all ADA to somebody
      // is the same as if you're sending all the ADA as change to yourself
      // (module the fact the address doesn't belong to you)
      const couldSendAmount = await txBuilder.addChangeIfNeeded(wasmReceiver)
      if (!couldSendAmount) {
        // if you couldn't send any amount,
        // it's because you couldn't cover the fee of adding an output
        throw new NotEnoughMoneyToSendError()
      }
    }

    const change = await (async () => {
      if (receiver.addressing == null) return []
      const { addressing } = receiver

      return [
        {
          addressing,
          address: receiver.address,
          values: await multiTokenFromCardanoValue(
            await txBuilder.getExplicitOutput(),
            {
              networkId: protocolParams.networkId,
              identifier: PRIMARY_ASSET_CONSTANTS.Cardano,
              isDefault: true
            }
          )
        }
      ]
    })()

    return {
      senderUtxos: allUtxos,
      txBuilder,
      change
    }
  }

  private async newAdaUnsignedTx(
    outputs: Array<TxOutput>,
    changeAdaAddr: AddressingAddress,
    allUtxos: Array<CardanoAddressedUtxo>,
    absSlotNumber: BigNumber,
    protocolParams: {
      linearFee: WasmContract.LinearFee
      minimumUtxoVal: WasmContract.BigNum
      poolDeposit: WasmContract.BigNum
      keyDeposit: WasmContract.BigNum
      networkId: number
    },
    certificates: ReadonlyArray<WasmContract.Certificate>,
    withdrawals: ReadonlyArray<{
      address: WasmContract.RewardAddress
      amount: WasmContract.BigNum
    }>,
    auxData: WasmContract.AuxiliaryData | undefined,
    neededStakingKeyHashes: { neededHashes: Set<string>; wits: Set<string> },
    txOptions: TxOptions,
    allowNoOutputs: boolean
  ): Promise<UnsignedTx> {
    const addressingMap = new Map<RemoteUnspentOutput, CardanoAddressedUtxo>()
    for (const utxo of allUtxos) {
      addressingMap.set(
        {
          amount: utxo.amount,
          receiver: utxo.receiver,
          txHash: utxo.txHash,
          txIndex: utxo.txIndex,
          utxoId: utxo.utxoId,
          assets: utxo.assets
        },
        utxo
      )
    }

    const unsignedTxResponse = await this.newAdaUnsignedTxFromUtxo(
      outputs,
      changeAdaAddr,
      Array.from(addressingMap.keys()),
      absSlotNumber,
      protocolParams,
      certificates,
      withdrawals,
      auxData,
      allowNoOutputs
    )

    const addressedUtxos = unsignedTxResponse.senderUtxos.map((utxo) => {
      const addressedUtxo = addressingMap.get(utxo)
      if (addressedUtxo == null) {
        throw new Error(
          `newAdaUnsignedTx: utxo reference was changed. Should not happen`
        )
      }
      return addressedUtxo
    })

    return await genWasmUnsignedTx(
      this.Wasm,
      unsignedTxResponse.txBuilder,
      addressedUtxos,
      unsignedTxResponse.change,
      {
        networkId: protocolParams.networkId,
        identifier: PRIMARY_ASSET_CONSTANTS.Cardano,
        isDefault: true
      },
      protocolParams.networkId,
      neededStakingKeyHashes,
      txOptions.metadata ?? []
    )
  }

  private async newAdaUnsignedTxFromUtxo(
    outputs: ReadonlyArray<TxOutput>,
    changeAdaAddr: AddressingAddress,
    utxos: Array<RemoteUnspentOutput>,
    absSlotNumber: BigNumber,
    protocolParams: {
      linearFee: WasmContract.LinearFee
      minimumUtxoVal: WasmContract.BigNum
      poolDeposit: WasmContract.BigNum
      keyDeposit: WasmContract.BigNum
      networkId: number
    },
    certificates: ReadonlyArray<WasmContract.Certificate>,
    withdrawals: ReadonlyArray<{
      address: WasmContract.RewardAddress
      amount: WasmContract.BigNum
    }>,
    auxData: WasmContract.AuxiliaryData | undefined,
    allowNoOutputs: boolean
  ): Promise<{
    senderUtxos: RemoteUnspentOutput[]
    txBuilder: WasmContract.TransactionBuilder
    change: Change[]
  }> {
    const outputAssets = outputs.reduce((set, o) => {
      o.amount.values
        .map((v) => v.identifier)
        .filter((id) => id.length > 0)
        .forEach((id) => set.add(id))
      return set
    }, new Set<string>())
    const isAssetsRequired = outputAssets.size > 0

    const utxosMapped: Array<{
      u: RemoteUnspentOutput
      isPure: boolean
      hasRequiredAsset: boolean
      spendableValue: number
    }> = await Promise.all(
      utxos.map(async (u: RemoteUnspentOutput) => {
        if (u.assets.length === 0) {
          return {
            u: u,
            isPure: true,
            hasRequiredAsset: false,
            spendableValue: 0
          }
        }
        const hasRequiredAsset =
          isAssetsRequired && u.assets.some((a) => outputAssets.has(a.assetId))
        const amount = await this.Wasm.BigNum.fromStr(u.amount)
        const minRequired = await this.Wasm.minAdaRequired(
          await cardanoValueFromRemoteFormat(this.Wasm, u),
          protocolParams.minimumUtxoVal
        )
        const spendable = parseInt(
          await amount.clampedSub(minRequired).then((x) => x.toStr()),
          10
        )
        // Round down the spendable value to the nearest full ADA for safer deposit
        // TODO: unmagic the constant
        return {
          u: u,
          isPure: false,
          hasRequiredAsset: hasRequiredAsset,
          spendableValue: Math.floor(spendable / 1_000_000) * 1_000_000
        }
      })
    )

    // prioritize inputs
    const sortedUtxos: Array<RemoteUnspentOutput> = utxosMapped
      .sort((v1, v2) => {
        const u1 = v1.u
        const isPure1 = v1.isPure
        const hasRequiredAsset1 = v1.hasRequiredAsset
        const spendableValue1 = v1.spendableValue

        const u2 = v2.u
        const isPure2 = v2.isPure
        const hasRequiredAsset2 = v2.hasRequiredAsset
        const spendableValue2 = v2.spendableValue

        if ((hasRequiredAsset1 as any) ^ (hasRequiredAsset2 as any)) {
          // one but not both of the utxos has required assets
          // utxos with required assets are always prioritized
          // ahead of any other, pure or dirty
          return hasRequiredAsset1 ? -1 : 1
        }
        if (isPure1 && isPure2) {
          // both utxos are clean - randomize them
          return Math.random() - 0.5
        }
        if (isPure1 || isPure2) {
          // At least one of the utxos is clean
          // The clean utxo is prioritized
          return isPure1 ? -1 : 1
        }
        // both utxos are dirty
        if (spendableValue1 !== spendableValue2) {
          // dirty utxos with highest spendable ADA are prioritised
          return spendableValue2 - spendableValue1
        }
        // utxo with fewer assets is prioritised
        return u1.assets.length - u2.assets.length
      })
      .map((u) => u.u)

    const result = await this._newAdaUnsignedTxFromUtxo(
      outputs,
      changeAdaAddr,
      sortedUtxos,
      absSlotNumber,
      protocolParams,
      certificates,
      withdrawals,
      auxData,
      allowNoOutputs,
      false
    )
    const fee = await result.txBuilder.getFeeIfSet()

    const resultWithOneExtraInput = await this._newAdaUnsignedTxFromUtxo(
      outputs,
      changeAdaAddr,
      sortedUtxos,
      absSlotNumber,
      protocolParams,
      certificates,
      withdrawals,
      auxData,
      allowNoOutputs,
      true
    )
    const feeWithOneExtraInput =
      await resultWithOneExtraInput.txBuilder.getFeeIfSet()

    const actualResult =
      feeWithOneExtraInput?.hasValue() &&
      fee?.hasValue() &&
      (await feeWithOneExtraInput.compare(fee)) < 0
        ? resultWithOneExtraInput
        : result

    return actualResult
  }

  private async _newAdaUnsignedTxFromUtxo(
    outputs: ReadonlyArray<TxOutput>,
    changeAdaAddr: AddressingAddress,
    utxos: Array<RemoteUnspentOutput>,
    absSlotNumber: BigNumber,
    protocolParams: {
      linearFee: WasmContract.LinearFee
      minimumUtxoVal: WasmContract.BigNum
      poolDeposit: WasmContract.BigNum
      keyDeposit: WasmContract.BigNum
      networkId: number
    },
    certificates: ReadonlyArray<WasmContract.Certificate>,
    withdrawals: ReadonlyArray<{
      address: WasmContract.RewardAddress
      amount: WasmContract.BigNum
    }>,
    auxData: WasmContract.AuxiliaryData | undefined,
    allowNoOutputs: boolean,
    oneExtraInput: boolean
  ): Promise<{
    senderUtxos: RemoteUnspentOutput[]
    txBuilder: WasmContract.TransactionBuilder
    change: Change[]
  }> {
    const shouldForceChange = async (
      assetsForChange: WasmContract.MultiAsset | undefined
    ): Promise<boolean> => {
      const noOutputDisallowed = !allowNoOutputs && outputs.length === 0
      if (noOutputDisallowed && changeAdaAddr == null) {
        throw new NoOutputsError()
      }
      if (assetsForChange?.hasValue() && (await assetsForChange.len()) > 0) {
        return true
      }
      return noOutputDisallowed
    }

    const emptyAsset = await this.Wasm.MultiAsset.new()
    await shouldForceChange(undefined)

    const txBuilder = await this.Wasm.TransactionBuilder.new(
      protocolParams.linearFee,
      protocolParams.minimumUtxoVal,
      protocolParams.poolDeposit,
      protocolParams.keyDeposit
    )

    if (certificates.length > 0) {
      const certsWasm = await this.Wasm.Certificates.new()
      for (const cert of certificates) {
        certsWasm.add(cert)
      }
      await txBuilder.setCerts(certsWasm)
    }

    if (auxData) {
      await txBuilder.setAuxiliaryData(auxData)
    }

    if (withdrawals.length > 0) {
      const withdrawalWasm = await this.Wasm.Withdrawals.new()
      for (const withdrawal of withdrawals) {
        await withdrawalWasm.insert(withdrawal.address, withdrawal.amount)
      }

      await txBuilder.setWithdrawals(withdrawalWasm)
    }

    await txBuilder.setTtl(absSlotNumber.plus(defaultTtlOffset).toNumber())
    {
      for (const output of outputs) {
        const wasmReceiver = await normalizeToAddress(this.Wasm, output.address)
        if (!wasmReceiver) {
          throw new Error(
            `newAdaUnsignedTxFromUtxo: receiver not a valid Shelley address`
          )
        }
        await txBuilder.addOutput(
          await this.Wasm.TransactionOutput.new(
            wasmReceiver,
            await cardanoValueFromMultiToken(this.Wasm, output.amount)
          )
        )
      }
    }

    // output excluding fee
    const targetOutput = await (
      await txBuilder.getExplicitOutput()
    ).checkedAdd(await this.Wasm.Value.new(await txBuilder.getDeposit()))

    // pick inputs
    // const usedUtxos: Array<RemoteUnspentOutput> = [];
    const usedUtxos: RemoteUnspentOutput[] = []
    {
      // recall: we might have some implicit input to start with from deposit refunds
      const implicitSum = await txBuilder.getImplicitInput()

      // this flag is set when one extra input is added
      let oneExtraAdded = false
      // add utxos until we have enough to send the transaction
      for (const utxo of utxos) {
        if (oneExtraAdded) {
          break
        }
        const currentInputSum = await txBuilder
          .getExplicitInput()
          .then((x) => x.checkedAdd(implicitSum))

        const neededInput = await targetOutput.checkedAdd(
          await this.Wasm.Value.new(await txBuilder.minFee())
        )
        const currentInputSumMa = await currentInputSum.multiasset()
        let neededInputMa = await neededInput.multiasset()
        if (!neededInputMa.hasValue()) {
          neededInputMa = emptyAsset
        }
        const excessiveInputAssets = currentInputSumMa.hasValue()
          ? await currentInputSumMa.sub(neededInputMa)
          : undefined
        const remainingNeeded = await neededInput.clampedSub(currentInputSum)

        // update amount required to make sure we have ADA required for change UTXO entry
        if (await shouldForceChange(excessiveInputAssets)) {
          if (changeAdaAddr == null) {
            throw new NoOutputsError()
          }
          const difference = await currentInputSum.clampedSub(neededInput)
          const minimumNeededForChange = await minRequiredForChange(
            this.Wasm,
            txBuilder,
            changeAdaAddr,
            difference,
            protocolParams
          )
          const adaNeededLeftForChange =
            await minimumNeededForChange.clampedSub(await difference.coin())
          const remainingNeededCoin = await remainingNeeded.coin()
          if ((await remainingNeededCoin.compare(adaNeededLeftForChange)) < 0) {
            await remainingNeeded.setCoin(adaNeededLeftForChange)
          }
        }

        // stop if we've added all the assets we needed
        const isNonEmptyInputs = usedUtxos.length > 0
        {
          const remainingAssets = await remainingNeeded.multiasset()
          const isRemainingNeededCoinZero = await isBigNumZero(
            this.Wasm,
            await remainingNeeded.coin()
          )
          const isRemainingNeededAssetZero =
            (remainingAssets.hasValue() ? await remainingAssets.len() : 0) === 0
          if (
            isRemainingNeededCoinZero &&
            isRemainingNeededAssetZero &&
            isNonEmptyInputs
          ) {
            if (oneExtraInput) {
              // We've added all the assets we need, but we add one extra.
              // Set the flag so that the adding loop stops after this extra one is added.
              oneExtraAdded = true
            } else {
              break
            }
          }
        }

        const added = await addUtxoInput(
          this.Wasm,
          txBuilder,
          oneExtraAdded
            ? undefined // avoid 'NO_NEED'
            : {
                value: remainingNeeded,
                hasInput: usedUtxos.length > 0
              },
          utxo,
          true,
          { networkId: protocolParams.networkId }
        )
        if (added !== AddInputResult.VALID) continue

        usedUtxos.push(utxo)
      }
      if (usedUtxos.length === 0) {
        throw new NotEnoughMoneyToSendError()
      }
      // check to see if we have enough balance in the wallet to cover the transaction
      {
        const currentInputSum = await txBuilder
          .getExplicitInput()
          .then((x) => x.checkedAdd(implicitSum))

        // need to recalculate each time because fee changes
        const output = await targetOutput.checkedAdd(
          await this.Wasm.Value.new(await txBuilder.minFee())
        )

        const compare = await currentInputSum.compare(output)
        const enoughInput = compare != null && compare >= 0

        const multiasset = await currentInputSum.multiasset()
        const outputMa = await output.multiasset()
        const forceChange = await shouldForceChange(
          multiasset.hasValue()
            ? await multiasset.sub(outputMa.hasValue() ? outputMa : emptyAsset)
            : undefined
        )
        if (forceChange) {
          if (changeAdaAddr == null) {
            throw new NoOutputsError()
          }
          if (!enoughInput) {
            throw new NotEnoughMoneyToSendError()
          }
          const difference = await currentInputSum.checkedSub(output)
          const minimumNeededForChange = await minRequiredForChange(
            this.Wasm,
            txBuilder,
            changeAdaAddr,
            difference,
            protocolParams
          )
          if (
            (await difference
              .coin()
              .then((x) => x.compare(minimumNeededForChange))) < 0
          ) {
            throw new NotEnoughMoneyToSendError()
          }
        }
        if (!forceChange && !enoughInput) {
          throw new NotEnoughMoneyToSendError()
        }
      }
    }

    const change = await (async () => {
      const totalInput = await txBuilder
        .getExplicitInput()
        .then(async (x) => x.checkedAdd(await txBuilder.getImplicitInput()))
      const difference = await totalInput.checkedSub(targetOutput)

      const forceChange = await shouldForceChange(
        firstWithValue(await difference.multiasset(), emptyAsset)
      )
      if (changeAdaAddr == null) {
        if (forceChange) {
          throw new NoOutputsError()
        }
        const minFee = await txBuilder.minFee()
        if ((await difference.coin().then((x) => x.compare(minFee))) < 0) {
          throw new NotEnoughMoneyToSendError()
        }
        // recall: min fee assumes the largest fee possible
        // so no worries of cbor issue by including larger fee
        await txBuilder.setFee(
          await this.Wasm.BigNum.fromStr(
            await difference.coin().then((x) => x.toStr())
          )
        )
        return []
      }
      const outputBeforeChange = await txBuilder.getExplicitOutput()

      const wasmChange = await normalizeToAddress(
        this.Wasm,
        changeAdaAddr.address
      )
      if (!wasmChange?.hasValue()) {
        throw new Error(
          `newAdaUnsignedTxFromUtxo: change not a valid Shelley address`
        )
      }
      const changeWasAdded = await txBuilder.addChangeIfNeeded(wasmChange)
      if (forceChange && !changeWasAdded) {
        // note: this should never happened since it should have been handled by earlier code
        throw new Error(`No change added even though it should be forced`)
      }
      const output = await multiTokenFromCardanoValue(
        // since the change is added as an output
        // the amount of change is the new output minus what the output was before we added the change
        await txBuilder
          .getExplicitOutput()
          .then((x) => x.checkedSub(outputBeforeChange)),
        {
          networkId: protocolParams.networkId,
          identifier: PRIMARY_ASSET_CONSTANTS.Cardano,
          isDefault: true
        }
      )
      return changeWasAdded
        ? [
            {
              ...changeAdaAddr,
              values: output
            }
          ]
        : []
    })()

    return {
      senderUtxos: usedUtxos,
      txBuilder,
      change
    }
  }
}
