import * as WasmContract from './wasm-contract'
import { BigNumber } from 'bignumber.js'

import {
  CardanoAddressedUtxo,
  Change,
  Token,
  MultiTokenValue,
  PRIMARY_ASSET_CONSTANTS,
  TxMetadata,
  Bip44DerivationLevels,
  WithdrawalRequest
} from './models'
import { filterAddressesByStakingKey, normalizeToAddress } from './utils/addresses'
import {
  getCardanoSpendingKeyHash,
  derivePrivateByAddressing
} from './utils/crypto'
import {
  multiTokenFromCardanoValue,
  multiTokenFromRemote
} from './utils/assets'
import { MultiToken } from './multi-token'
import { getDifferenceAfterTx } from './utils/transactions'

export interface SignedTx {
  id: string
  encodedTx: Uint8Array
}

export class WasmUnsignedTx implements UnsignedTx {
  private _wasm: WasmContract.WasmModuleProxy
  private _txBody: WasmContract.TransactionBody
  private _txBuilder: WasmContract.TransactionBuilder
  private _certificates: WasmContract.Certificates
  private _withdrawals: WasmContract.Withdrawals
  private _deregistrations: ReadonlyArray<WasmContract.StakeDeregistration>
  private _delegations: ReadonlyArray<WasmContract.StakeDelegation>
  private _registrations: ReadonlyArray<WasmContract.StakeRegistration>
  private _ttl: number | undefined
  private _neededStakingKeyHashes: {
    neededHashes: Set<string>
    wits: Set<string>
  }
  private _hash: WasmContract.TransactionHash
  private _auxiliaryData?: WasmContract.AuxiliaryData
  private _catalystRegistrationData?: CatalystRegistrationData

  private _senderUtxos: ReadonlyArray<CardanoAddressedUtxo>
  private _inputs: ReadonlyArray<{
    address: string
    value: MultiTokenValue
  }>
  private _totalInput: MultiTokenValue
  private _outputs: ReadonlyArray<{
    address: string
    value: MultiTokenValue
  }>
  private _totalOutput: MultiTokenValue
  private _totalAmountToDelegate: MultiTokenValue | undefined
  private _fee: MultiTokenValue
  private _change: ReadonlyArray<Change>
  private _metadata: ReadonlyArray<TxMetadata>
  private _encodedTx: string
  private _withdrawalRequests: Array<WithdrawalRequest>

  get wasm(): WasmContract.WasmModuleProxy {
    return this._wasm
  }

  get txBody(): WasmContract.TransactionBody {
    return this._txBody
  }

  get txBuilder(): WasmContract.TransactionBuilder {
    return this._txBuilder
  }

  get senderUtxos(): ReadonlyArray<CardanoAddressedUtxo> {
    return this._senderUtxos
  }

  get inputs(): ReadonlyArray<{ address: string; value: MultiTokenValue }> {
    return this._inputs
  }

  get totalInput(): MultiTokenValue {
    return this._totalInput
  }

  get totalAmountToDelegate(): MultiTokenValue | undefined {
    return this._totalAmountToDelegate
  }

  get outputs(): ReadonlyArray<{
    address: string
    value: MultiTokenValue
  }> {
    return this._outputs
  }

  get totalOutput(): MultiTokenValue {
    return this._totalOutput
  }

  get fee(): MultiTokenValue {
    return this._fee
  }

  get change(): ReadonlyArray<Change> {
    return this._change
  }

  get metadata(): ReadonlyArray<TxMetadata> {
    return this._metadata
  }

  get encodedTx(): string {
    return this._encodedTx
  }

  get certificates(): WasmContract.Certificates {
    return this._certificates
  }

  get withdrawals(): WasmContract.Withdrawals {
    return this._withdrawals
  }

  get deregistrations(): ReadonlyArray<WasmContract.StakeDeregistration> {
    return this._deregistrations
  }

  get delegations(): ReadonlyArray<WasmContract.StakeDelegation> {
    return this._delegations
  }

  get registrations(): ReadonlyArray<WasmContract.StakeRegistration> {
    return this._registrations
  }

  get ttl(): number | undefined {
    return this._ttl
  }

  get neededStakingKeyHashes(): {
    neededHashes: Set<string>
    wits: Set<string>
  } {
    return this._neededStakingKeyHashes
  }

  get hash(): WasmContract.TransactionHash {
    return this._hash
  }

  get auxiliaryData(): WasmContract.AuxiliaryData | undefined {
    return this._auxiliaryData
  }

  get catalystRegistrationData(): CatalystRegistrationData | undefined {
    return this._catalystRegistrationData
  }

  get withdrawalRequests(): Array<WithdrawalRequest> {
    return this._withdrawalRequests
  }

  /**
   * Initializes the class with the specific wasm types, outputs and change.
   * Even though this class can be instantiated directly, you should probably be getting
   * an instance of it through its abstraction UnsignedTx by calling YoroiLib.createUnsignedTx
   */
  protected constructor(
    wasm: WasmContract.WasmModuleProxy,
    txBody: WasmContract.TransactionBody,
    txBuilder: WasmContract.TransactionBuilder,
    senderUtxos: CardanoAddressedUtxo[],
    inputs: ReadonlyArray<{ address: string; value: MultiTokenValue }>,
    totalInput: MultiTokenValue,
    outputs: ReadonlyArray<{ address: string; value: MultiTokenValue }>,
    totalOutput: MultiTokenValue,
    fee: MultiTokenValue,
    change: ReadonlyArray<Change>,
    metadata: ReadonlyArray<TxMetadata>,
    certificates: WasmContract.Certificates,
    withdrawals: WasmContract.Withdrawals,
    deregistrations: WasmContract.StakeDeregistration[],
    delegations: WasmContract.StakeDelegation[],
    registrations: WasmContract.StakeRegistration[],
    ttl: number | undefined,
    neededStakingKeyHashes: { neededHashes: Set<string>; wits: Set<string> },
    encodedTx: string,
    hash: WasmContract.TransactionHash,
    auxiliaryData: WasmContract.AuxiliaryData | undefined,
    catalystRegistrationData: CatalystRegistrationData | undefined,
    totalAmountToDelegate: MultiTokenValue | undefined,
    withdrawalRequests: Array<WithdrawalRequest>
  ) {
    this._wasm = wasm
    this._txBody = txBody
    this._txBuilder = txBuilder
    this._senderUtxos = senderUtxos
    this._inputs = inputs
    this._totalInput = totalInput
    this._totalAmountToDelegate = totalAmountToDelegate
    this._outputs = outputs
    this._totalOutput = totalOutput
    this._fee = fee
    this._change = change
    this._metadata = metadata
    this._certificates = certificates
    this._withdrawals = withdrawals
    this._deregistrations = deregistrations
    this._delegations = delegations
    this._registrations = registrations
    this._ttl = ttl
    this._neededStakingKeyHashes = neededStakingKeyHashes
    this._encodedTx = encodedTx
    this._hash = hash
    this._auxiliaryData = auxiliaryData
    this._catalystRegistrationData = catalystRegistrationData
    this._withdrawalRequests = withdrawalRequests
  }

  static async new(
    wasm: WasmContract.WasmModuleProxy,
    networkId: number,
    defaultToken: Token,
    txBuilder: WasmContract.TransactionBuilder,
    senderUtxos: CardanoAddressedUtxo[],
    allUtxos: CardanoAddressedUtxo[],
    inputs: ReadonlyArray<{ address: string; value: MultiTokenValue }>,
    totalInput: MultiTokenValue,
    outputs: ReadonlyArray<{ address: string; value: MultiTokenValue }>,
    totalOutput: MultiTokenValue,
    fee: MultiTokenValue,
    change: ReadonlyArray<Change>,
    neededStakingKeyHashes: { neededHashes: Set<string>; wits: Set<string> },
    metadata: ReadonlyArray<TxMetadata>,
    auxiliaryData: WasmContract.AuxiliaryData | undefined,
    catalystRegistrationData: CatalystRegistrationData | undefined,
    stakingKey: WasmContract.PublicKey | undefined,
    valueInAccount: MultiTokenValue | undefined,
    withdrawalRequests: Array<WithdrawalRequest>
  ): Promise<WasmUnsignedTx> {
    const txBody = await txBuilder.build()
    const txBytes = await txBody.toBytes()
    const certs = await txBody.certs()
    const withdrawals = await txBody.withdrawals()
    const ttl = await txBody.ttl()
    const hash = await wasm.hashTransaction(txBody)
    const deregistrations: WasmContract.StakeDeregistration[] = []
    const delegations: WasmContract.StakeDelegation[] = []
    const registrations: WasmContract.StakeRegistration[] = []

    if (certs.hasValue()) {
      for (let i = 0; i < (await certs.len()); i++) {
        const cert = await certs.get(i)
        try {
          const dereg = await cert.asStakeDeregistration()
          if (dereg.hasValue()) {
            deregistrations.push(dereg)
          }
        } catch {
          // not a deregistration, ignore
        }

        try {
          const del = await cert.asStakeDelegation()
          if (del.hasValue()) {
            delegations.push(del)
          }
        } catch {
          // not a deregistration, ignore
        }

        try {
          const reg = await cert.asStakeRegistration()
          if (reg.hasValue()) {
            registrations.push(reg)
          }
        } catch {
          // not a deregistration, ignore
        }
      }
    }

    let totalAmountToDelegate: MultiTokenValue | undefined
    if (stakingKey && valueInAccount) {
      const allUtxosForKey = await filterAddressesByStakingKey(
        wasm,
        await wasm.StakeCredential.fromKeyhash(await stakingKey.hash()),
        allUtxos,
        false
      )
      const utxoSum = allUtxosForKey.reduce(
        (sum, utxo) =>
          sum.joinAddMutable(
            multiTokenFromRemote(utxo, networkId)
          ),
        new MultiToken([], defaultToken)
      )
  
      const differenceAfterTx = await getDifferenceAfterTx(
        wasm,
        senderUtxos,
        txBody,
        allUtxos,
        stakingKey,
        defaultToken
      )
  
      const totalAmountToDelegateMt = utxoSum
        .joinAddCopy(differenceAfterTx) // subtract any part of the fee that comes from UTXO
        .joinAddCopy(
          new MultiToken(valueInAccount.values, valueInAccount.defaults)
        ) // recall: rewards are compounding

      totalAmountToDelegate = {
        defaults: totalAmountToDelegateMt.defaults,
        values: totalAmountToDelegateMt.values
      }
    }

    return new WasmUnsignedTx(
      wasm,
      txBody,
      txBuilder,
      senderUtxos,
      inputs,
      totalInput,
      outputs,
      totalOutput,
      fee,
      change,
      metadata,
      certs,
      withdrawals,
      deregistrations,
      delegations,
      registrations,
      ttl,
      neededStakingKeyHashes,
      Buffer.from(txBytes).toString('hex'),
      hash,
      auxiliaryData,
      catalystRegistrationData,
      totalAmountToDelegate,
      withdrawalRequests
    )
  }

  async sign(
    keyLevel: number,
    privateKey: string,
    stakingKeyWits: Set<string>,
    stakingKeys: {
      rewardAddress: string,
      privateKey: WasmContract.PrivateKey
    }[] = []
  ): Promise<SignedTx> {
    const signingKey = await this._wasm.Bip32PrivateKey.fromBytes(
      Buffer.from(privateKey, 'hex')
    )

    const seenByronKeys: Set<string> = new Set()
    const seenKeyHashes: Set<string> = new Set()
    const deduped: Array<CardanoAddressedUtxo> = []
    for (const senderUtxo of this.senderUtxos) {
      const wasmAddr = await normalizeToAddress(this._wasm, senderUtxo.receiver)
      if (!wasmAddr?.hasValue()) {
        throw new Error(`WasmUnsignedTx.sign: utxo not a valid Shelley address`)
      }
      const keyHash = await getCardanoSpendingKeyHash(this._wasm, wasmAddr)
      const addrHex = Buffer.from(await wasmAddr.toBytes()).toString('hex')
      if (!keyHash?.hasValue()) {
        if (!seenByronKeys.has(addrHex)) {
          seenByronKeys.add(addrHex)
          deduped.push(senderUtxo)
        }
        continue
      }
      if (!keyHash.hasValue()) {
        throw new Error(`WasmUnsignedTx.sign: cannot sign script inputs`)
      }
      {
        const keyHex = Buffer.from(await keyHash.toBytes()).toString('hex')
        if (!seenKeyHashes.has(keyHex)) {
          seenKeyHashes.add(keyHex)
          deduped.push(senderUtxo)
        }
      }
    }

    /*
      ToDo:
      In the extension, what would be the _txBuilder here can also be either a TransactionBuilder or a TransactionBody.
      Verify how and if this needs to be replicated here as well.
    */

    const txHash = await this._wasm.hashTransaction(this._txBody)

    const vkeyWits = await this._wasm.Vkeywitnesses.new()
    const bootstrapWits = await this._wasm.BootstrapWitnesses.new()

    await this.addWitnesses(
      txHash,
      deduped,
      keyLevel,
      signingKey,
      vkeyWits,
      bootstrapWits
    )

    const stakingKeySigSet = new Set<string>()
    for (const witness of stakingKeyWits) {
      if (stakingKeySigSet.has(witness)) {
        continue
      }
      stakingKeySigSet.add(witness)
      await vkeyWits.add(
        await this._wasm.Vkeywitness.fromBytes(Buffer.from(witness, 'hex'))
      )
    }

    for (const withdrawalRequest of this.withdrawalRequests) {
      const stakingKey = stakingKeys.find(s => s.rewardAddress === withdrawalRequest.rewardAddress)
      if (stakingKey) {
        const vkeyWitness = await this._wasm.makeVkeyWitness(
          await this._wasm.hashTransaction(this.txBody),
          stakingKey.privateKey
        )
        const witness = Buffer.from(
          await vkeyWitness.toBytes()
        ).toString('hex')
        stakingKeySigSet.add(witness)
        await vkeyWits.add(
          await this._wasm.Vkeywitness.fromBytes(Buffer.from(witness, 'hex'))
        )
      }
    }

    const witnessSet = await this._wasm.TransactionWitnessSet.new()
    if ((await bootstrapWits.len()) > 0)
      await witnessSet.setBootstraps(bootstrapWits)
    if ((await vkeyWits.len()) > 0) await witnessSet.setVkeys(vkeyWits)

    const signedTx = await this._wasm.Transaction.new(
      this._txBody,
      witnessSet,
      this.auxiliaryData && this._auxiliaryData?.hasValue()
          ? this.auxiliaryData
          : await this.wasm.AuxiliaryData.empty()
    )

    const signedTxBody = await signedTx.body()
    const signedTxHash = await this._wasm.hashTransaction(signedTxBody)

    return {
      id: Buffer.from(await signedTxHash.toBytes()).toString('hex'),
      encodedTx: await signedTx.toBytes()
    }
  }

  private async addWitnesses(
    txHash: WasmContract.TransactionHash,
    uniqueUtxos: Array<CardanoAddressedUtxo>, // pre-req: does not contain duplicate keys
    keyLevel: number,
    signingKey: WasmContract.Bip32PrivateKey,
    vkeyWits: WasmContract.Vkeywitnesses,
    bootstrapWits: WasmContract.BootstrapWitnesses
  ): Promise<void> {
    // get private keys
    const privateKeys = await Promise.all(
      uniqueUtxos.map(async (utxo) => {
        const lastLevelSpecified =
          utxo.addressing.startLevel + utxo.addressing.path.length - 1
        if (lastLevelSpecified !== Bip44DerivationLevels.ADDRESS.level) {
          throw new Error(
            `WasmUnsignedTx.addWitnesses incorrect addressing size`
          )
        }
        return await derivePrivateByAddressing(utxo.addressing, {
          level: keyLevel,
          key: signingKey
        })
      })
    )

    // sign the transactions
    for (let i = 0; i < uniqueUtxos.length; i++) {
      const wasmAddr = await normalizeToAddress(
        this._wasm,
        uniqueUtxos[i].receiver
      )
      if (!wasmAddr?.hasValue()) {
        throw new Error(
          `WasmUnsignedTx.addWitnesses utxo not a valid Shelley address`
        )
      }
      const byronAddr = await this._wasm.ByronAddress.fromAddress(wasmAddr)
      if (!byronAddr.hasValue()) {
        const vkeyWit = await this._wasm.makeVkeyWitness(
          txHash,
          await privateKeys[i].toRawKey()
        )
        vkeyWits.add(vkeyWit)
      } else {
        const bootstrapWit = await this._wasm.makeIcarusBootstrapWitness(
          txHash,
          byronAddr,
          privateKeys[i]
        )
        bootstrapWits.add(bootstrapWit)
      }
    }
  }
}

export type CatalystRegistrationData = {
  votingPublicKey: string,
  stakingKeyPath: number[],
  nonce: string
}

export interface UnsignedTx {
  readonly senderUtxos: ReadonlyArray<CardanoAddressedUtxo>
  readonly txBody: WasmContract.TransactionBody
  readonly txBuilder: WasmContract.TransactionBuilder
  readonly inputs: ReadonlyArray<{
    address: string
    value: MultiTokenValue
  }>
  readonly totalInput: MultiTokenValue
  readonly totalAmountToDelegate?: MultiTokenValue
  readonly outputs: ReadonlyArray<{
    address: string
    value: MultiTokenValue
  }>
  readonly totalOutput: MultiTokenValue
  readonly fee: MultiTokenValue
  readonly change: ReadonlyArray<Change>
  readonly metadata: ReadonlyArray<TxMetadata>
  readonly certificates: WasmContract.Certificates
  readonly withdrawals: WasmContract.Withdrawals
  readonly deregistrations: ReadonlyArray<WasmContract.StakeDeregistration>
  readonly delegations: ReadonlyArray<WasmContract.StakeDelegation>
  readonly registrations: ReadonlyArray<WasmContract.StakeRegistration>
  readonly ttl: number | undefined
  readonly neededStakingKeyHashes: {
    neededHashes: Set<string>
    wits: Set<string>
  }
  readonly encodedTx: string
  readonly hash: WasmContract.TransactionHash
  readonly auxiliaryData?: WasmContract.AuxiliaryData
  readonly catalystRegistrationData?: CatalystRegistrationData
  readonly withdrawalRequests: Array<WithdrawalRequest>
  sign(
    keyLevel: number,
    privateKey: string,
    stakingKeyWits: Set<string>,
    stakingKeys?: {
      rewardAddress: string,
      privateKey: WasmContract.PrivateKey
    }[]
  ): Promise<SignedTx>
}

export async function genWasmUnsignedTx(
  wasm: WasmContract.WasmModuleProxy,
  defaultToken: Token,
  txBuilder: WasmContract.TransactionBuilder,
  senderUtxos: CardanoAddressedUtxo[],
  allUtxos: CardanoAddressedUtxo[],
  change: ReadonlyArray<Change>,
  defaults: Token,
  networkId: number,
  neededStakingKeyHashes: { neededHashes: Set<string>; wits: Set<string> },
  metadata: ReadonlyArray<TxMetadata>,
  auxiliaryData: WasmContract.AuxiliaryData | undefined,
  catalystRegistrationData: CatalystRegistrationData | undefined,
  stakingKey: WasmContract.PublicKey | undefined,
  valueInAccount: MultiTokenValue | undefined,
  withdrawalRequests: Array<WithdrawalRequest>
): Promise<WasmUnsignedTx> {
  return await WasmUnsignedTx.new(
    wasm,
    networkId,
    defaultToken,
    txBuilder,
    senderUtxos,
    allUtxos,
    await genWasmUnsignedTxInputs(txBuilder, senderUtxos, networkId),
    await genWasmUnsignedTxTotalInput(txBuilder, change, defaults),
    await genWasmUnsignedTxOutputs(txBuilder, networkId),
    await genWasmUnsignedTxTotalOutput(txBuilder, defaults),
    await genWasmUnsignedTxFee(txBuilder, defaults, networkId),
    change,
    neededStakingKeyHashes,
    metadata,
    auxiliaryData,
    catalystRegistrationData,
    stakingKey,
    valueInAccount,
    withdrawalRequests
  )
}

async function genWasmUnsignedTxInputs(
  txBuilder: WasmContract.TransactionBuilder,
  senderUtxos: CardanoAddressedUtxo[],
  networkId: number
): Promise<
  ReadonlyArray<{
    address: string
    value: MultiTokenValue
  }>
> {
  const body = await txBuilder.build()
  const values = [] as {
    address: string
    value: MultiTokenValue
  }[]

  const inputs = await body.inputs()
  for (let i = 0; i < (await inputs.len()); i++) {
    const input = await inputs.get(i)

    const txIdBytes = await input.transactionId().then((x) => x.toBytes())
    const key = {
      hash: Buffer.from(txIdBytes).toString('hex'),
      index: await input.index()
    }

    const utxoEntry = senderUtxos.find(
      (utxo) => utxo.txHash === key.hash && utxo.txIndex === key.index
    )

    if (!utxoEntry) {
      throw new Error(`missing input for ${JSON.stringify(key)}`)
    }

    const ma = multiTokenFromRemote(utxoEntry, networkId)
    values.push({
      value: {
        defaults: ma.defaults,
        values: ma.values
      },
      address: utxoEntry.receiver
    })
  }

  return values
}

async function genWasmUnsignedTxTotalInput(
  txBuilder: WasmContract.TransactionBuilder,
  changes: ReadonlyArray<Change>,
  defaults: Token
): Promise<MultiTokenValue> {
  const values = await multiTokenFromCardanoValue(
    await txBuilder
      .getImplicitInput()
      .then(async (x) => x.checkedAdd(await txBuilder.getExplicitInput())),
    defaults
  )

  for (const change of changes) {
    values.joinSubtractMutable(change.values)
  }

  return {
    defaults: values.defaults,
    values: values.values
  }
}

async function genWasmUnsignedTxOutputs(
  txBuilder: WasmContract.TransactionBuilder,
  networkId: number
): Promise<
  ReadonlyArray<{
    address: string
    value: MultiTokenValue
  }>
> {
  const body = await txBuilder.build()

  const values = [] as {
    address: string
    value: MultiTokenValue
  }[]

  const outputs = await body.outputs()
  for (let i = 0; i < (await outputs.len()); i++) {
    const output = await outputs.get(i)

    const outputAddressBytes = await output.address().then((x) => x.toBytes())
    const ma = await multiTokenFromCardanoValue(await output.amount(), {
      identifier: PRIMARY_ASSET_CONSTANTS.Cardano,
      networkId: networkId,
      isDefault: true
    })
    values.push({
      value: {
        defaults: ma.defaults,
        values: ma.values
      },
      address: Buffer.from(outputAddressBytes).toString('hex')
    })
  }

  return values
}

async function genWasmUnsignedTxTotalOutput(
  txBuilder: WasmContract.TransactionBuilder,
  defaults: Token
): Promise<MultiTokenValue> {
  const ma = await multiTokenFromCardanoValue(
    await txBuilder.getExplicitOutput(),
    defaults
  )
  return {
    defaults: ma.defaults,
    values: ma.values
  }
}

async function genWasmUnsignedTxFee(
  txBuilder: WasmContract.TransactionBuilder,
  defaults: Token,
  networkId: number
): Promise<MultiTokenValue> {
  const values = new MultiToken([], defaults)

  const wasmFee = await txBuilder.getFeeIfSet()
  const fee = wasmFee.hasValue()
    ? new BigNumber(await wasmFee.toStr())
    : new BigNumber('0')

  values.add({
    identifier: PRIMARY_ASSET_CONSTANTS.Cardano,
    amount: fee.plus(await txBuilder.getDeposit().then((x) => x.toStr())),
    networkId: networkId
  })

  return {
    defaults: values.defaults,
    values: values.values
  }
}
