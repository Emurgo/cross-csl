import * as WasmV4 from '@emurgo/react-native-haskell-shelley'

import { IYoroiLib, createYoroiLib, WasmContract } from '@emurgo/yoroi-lib-core'

const EXCEPTIONS = WasmContract.EXCEPTIONS

export const init = (): IYoroiLib => {
  return createYoroiLib({
    encryptWithPassword: WasmV4.encrypt_with_password,
    decryptWithPassword: WasmV4.decrypt_with_password,
    encodeJsonStrToMetadatum: async (json: string, schema: number) => {
      const wasm = await WasmV4.encode_json_str_to_metadatum(json, schema)
      return Promise.resolve(new Mobile.TransactionMetadatum(wasm))
    },
    minAdaRequired: async (
      value: Mobile.Value,
      minimumUtxoVal: Mobile.BigNum
    ) => {
      return new Mobile.BigNum(
        await WasmV4.min_ada_required(value.wasm, minimumUtxoVal.wasm)
      )
    },
    hashTransaction: async (txBody: Mobile.TransactionBody) => {
      return new Mobile.TransactionHash(
        await WasmV4.hash_transaction(txBody.wasm)
      )
    },
    makeVkeyWitness: async (
      txBodyHash: Mobile.TransactionHash,
      sk: Mobile.PrivateKey
    ) => {
      return new Mobile.Vkeywitness(
        await WasmV4.make_vkey_witness(txBodyHash.wasm, sk.wasm)
      )
    },
    makeIcarusBootstrapWitness: async (
      txBodyHash: Mobile.TransactionHash,
      addr: Mobile.ByronAddress,
      key: Mobile.Bip32PrivateKey
    ) => {
      return new Mobile.BootstrapWitness(
        await WasmV4.make_icarus_bootstrap_witness(
          txBodyHash.wasm,
          addr.wasm,
          key.wasm
        )
      )
    },
    decodeMetadatumToJsonStr: async (
      metadatum: Mobile.TransactionMetadatum,
      schema: number
    ) => {
      return await WasmV4.decode_metadatum_to_json_str(metadatum.wasm, schema)
    },
    BigNum: Mobile.BigNum,
    LinearFee: Mobile.LinearFee,
    GeneralTransactionMetadata: Mobile.GeneralTransactionMetadata,
    TransactionMetadatum: Mobile.TransactionMetadatum,
    AuxiliaryData: Mobile.AuxiliaryData,
    AssetName: Mobile.AssetName,
    AssetNames: Mobile.AssetNames,
    Assets: Mobile.Assets,
    ScriptHash: Mobile.ScriptHash,
    ScriptHashes: Mobile.ScriptHashes,
    MultiAsset: Mobile.MultiAsset,
    Ed25519KeyHash: Mobile.Ed25519KeyHash,
    TransactionHash: Mobile.TransactionHash,
    TransactionInput: Mobile.TransactionInput,
    Value: Mobile.Value,
    Address: Mobile.Address,
    PublicKey: Mobile.PublicKey,
    Bip32PublicKey: Mobile.Bip32PublicKey,
    PrivateKey: Mobile.PrivateKey,
    Bip32PrivateKey: Mobile.Bip32PrivateKey,
    ByronAddress: Mobile.ByronAddress,
    TransactionOutput: Mobile.TransactionOutput,
    StakeCredential: Mobile.StakeCredential,
    StakeRegistration: Mobile.StakeRegistration,
    StakeDeregistration: Mobile.StakeDeregistration,
    StakeDelegation: Mobile.StakeDelegation,
    Certificate: Mobile.Certificate,
    Certificates: Mobile.Certificates,
    RewardAddress: Mobile.RewardAddress,
    RewardAddresses: Mobile.RewardAddresses,
    Withdrawals: Mobile.Withdrawals,
    TransactionInputs: Mobile.TransactionInputs,
    TransactionOutputs: Mobile.TransactionOutputs,
    TransactionBody: Mobile.TransactionBody,
    TransactionBuilder: Mobile.TransactionBuilder,
    BaseAddress: Mobile.BaseAddress,
    PointerAddress: Mobile.PointerAddress,
    EnterpriseAddress: Mobile.EnterpriseAddress,
    Pointer: Mobile.Pointer,
    Vkey: Mobile.Vkey,
    Ed25519Signature: Mobile.Ed25519Signature,
    Vkeywitness: Mobile.Vkeywitness,
    Vkeywitnesses: Mobile.Vkeywitnesses,
    BootstrapWitness: Mobile.BootstrapWitness,
    BootstrapWitnesses: Mobile.BootstrapWitnesses,
    TransactionWitnessSet: Mobile.TransactionWitnessSet,
    Transaction: Mobile.Transaction,
    NetworkInfo: Mobile.NetworkInfo,
    MetadataList: Mobile.MetadataList,
    TransactionMetadatumLabels: Mobile.TransactionMetadatumLabels,
    MetadataMap: Mobile.MetadataMap,
    Int: Mobile.Int,
    NativeScript: Mobile.NativeScript,
    NativeScripts: Mobile.NativeScripts,
    PlutusScript: Mobile.PlutusScript,
    PlutusScripts: Mobile.PlutusScripts
  })
}

namespace Mobile {
  abstract class WasmProxy<T> {
    private _wasm: T | undefined

    get internalWasm(): T | undefined {
      return this._wasm
    }

    get wasm(): T {
      if (this._wasm) return this._wasm
      throw new Error('Trying to access undefined WASM object')
    }

    constructor(wasm: T | undefined) {
      this._wasm = wasm
    }

    hasValue(): boolean {
      if (this._wasm) {
        return true
      } else {
        return false
      }
    }
  }

  abstract class Ptr<T extends WasmV4.Ptr> extends WasmProxy<T> {
    constructor(wasm: T | undefined) {
      super(wasm)
    }

    async free(): Promise<void> {
      return await this.wasm.free()
    }
  }

  export class BigNum
    extends Ptr<WasmV4.BigNum>
    implements WasmContract.BigNum
  {
    toBytes(): Promise<Uint8Array> {
      throw WasmContract.EXCEPTIONS.NOT_IMPLEMENTED
    }
    toStr(): Promise<string> {
      return this.wasm.to_str()
    }
    // ToDo: implement once we have this function available in the react-native implementation of serilib
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    checkedMul(other: BigNum): Promise<BigNum> {
      throw WasmContract.EXCEPTIONS.NOT_IMPLEMENTED
    }
    async checkedAdd(other: BigNum): Promise<BigNum> {
      const wasmBigNum = await this.wasm.checked_add(other.wasm)
      return new BigNum(wasmBigNum)
    }
    async checkedSub(other: BigNum): Promise<BigNum> {
      const wasmBigNum = await this.wasm.checked_sub(other.wasm)
      return new BigNum(wasmBigNum)
    }
    async clampedSub(other: BigNum): Promise<BigNum> {
      const wasmBigNum = await this.wasm.clamped_sub(other.wasm)
      return new BigNum(wasmBigNum)
    }
    compare(rhs_value: BigNum): Promise<number> {
      return this.wasm.compare(rhs_value.wasm)
    }

    // ToDo: implement once we have this function available in the react-native implementation of serilib
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static fromBytes(bytes: Uint8Array): Promise<BigNum> {
      throw WasmContract.EXCEPTIONS.NOT_IMPLEMENTED
    }

    static async fromStr(string: string): Promise<BigNum> {
      const wasmBigNum = await WasmV4.BigNum.from_str(string)
      return new BigNum(wasmBigNum)
    }
  }

  export class LinearFee
    extends Ptr<WasmV4.LinearFee>
    implements WasmContract.LinearFee
  {
    async constant(): Promise<BigNum> {
      const constant = await this.wasm.constant()
      return new BigNum(constant)
    }
    async coefficient(): Promise<BigNum> {
      const coefficient = await this.wasm.coefficient()
      return new BigNum(coefficient)
    }
    static async new(
      coefficient: BigNum,
      constant: BigNum
    ): Promise<LinearFee> {
      const wasmLinearFee = await WasmV4.LinearFee.new(
        coefficient.wasm,
        constant.wasm
      )
      return Promise.resolve(new LinearFee(wasmLinearFee))
    }
  }

  export class GeneralTransactionMetadata
    extends Ptr<WasmV4.GeneralTransactionMetadata>
    implements WasmContract.GeneralTransactionMetadata
  {
    async toBytes(): Promise<Uint8Array> {
      return await this.wasm.to_bytes()
    }

    async len(): Promise<number> {
      return await this.wasm.len()
    }

    async insert(
      key: BigNum,
      value: TransactionMetadatum
    ): Promise<TransactionMetadatum> {
      return new TransactionMetadatum(
        await this.wasm.insert(key.wasm, value.wasm)
      )
    }

    async get(key: BigNum): Promise<TransactionMetadatum> {
      return new TransactionMetadatum(await this.wasm.get(key.wasm))
    }

    async keys(): Promise<TransactionMetadatumLabels> {
      return new TransactionMetadatumLabels(await this.wasm.keys())
    }

    static async new(): Promise<GeneralTransactionMetadata> {
      const wasm = await WasmV4.GeneralTransactionMetadata.new()
      return new GeneralTransactionMetadata(wasm)
    }

    static async fromBytes(
      bytes: Uint8Array
    ): Promise<GeneralTransactionMetadata> {
      const wasm = await WasmV4.GeneralTransactionMetadata.from_bytes(bytes)
      return Promise.resolve(new GeneralTransactionMetadata(wasm))
    }
  }

  export class TransactionMetadatumLabels
    extends Ptr<WasmV4.TransactionMetadatumLabels>
    implements WasmContract.TransactionMetadatumLabels
  {
    async toBytes(): Promise<Uint8Array> {
      return await this.wasm.to_bytes()
    }

    async len(): Promise<number> {
      return await this.wasm.len()
    }

    async get(index: number): Promise<BigNum> {
      return new BigNum(await this.wasm.get(index))
    }

    async add(elem: BigNum): Promise<void> {
      return await this.wasm.add(elem.wasm)
    }

    static async fromBytes(
      bytes: Uint8Array
    ): Promise<TransactionMetadatumLabels> {
      return new TransactionMetadatumLabels(
        await WasmV4.TransactionMetadatumLabels.from_bytes(bytes)
      )
    }

    static async new(): Promise<TransactionMetadatumLabels> {
      return new TransactionMetadatumLabels(
        await WasmV4.TransactionMetadatumLabels.new()
      )
    }
  }

  export class MetadataMap
    extends Ptr<WasmV4.MetadataMap>
    implements WasmContract.MetadataMap
  {
    async toBytes(): Promise<Uint8Array> {
      throw WasmContract.EXCEPTIONS.NOT_IMPLEMENTED
    }

    len(): Promise<number> {
      return Promise.resolve(this.wasm.len())
    }

    async insert(
      key: TransactionMetadatum,
      value: TransactionMetadatum
    ): Promise<TransactionMetadatum | undefined> {
      const wasm = await this.wasm.insert(key.wasm, value.wasm)
      if (wasm) {
        return Promise.resolve(new TransactionMetadatum(wasm))
      } else {
        return Promise.resolve(undefined)
      }
    }

    async insertStr(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      key: string,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      value: TransactionMetadatum
    ): Promise<TransactionMetadatum | undefined> {
      throw WasmContract.EXCEPTIONS.NOT_IMPLEMENTED
    }

    async insertI32(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      key: number,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      value: TransactionMetadatum
    ): Promise<TransactionMetadatum | undefined> {
      throw WasmContract.EXCEPTIONS.NOT_IMPLEMENTED
    }

    async get(key: TransactionMetadatum): Promise<TransactionMetadatum> {
      return new TransactionMetadatum(await this.wasm.get(key.wasm))
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getStr(key: string): Promise<TransactionMetadatum> {
      throw WasmContract.EXCEPTIONS.NOT_IMPLEMENTED
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getI32(key: number): Promise<TransactionMetadatum> {
      throw WasmContract.EXCEPTIONS.NOT_IMPLEMENTED
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async has(key: TransactionMetadatum): Promise<boolean> {
      throw WasmContract.EXCEPTIONS.NOT_IMPLEMENTED
    }

    async keys(): Promise<MetadataList> {
      return new MetadataList(await this.wasm.keys())
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static async fromBytes(bytes: Uint8Array): Promise<MetadataMap> {
      throw WasmContract.EXCEPTIONS.NOT_IMPLEMENTED
    }

    static async new(): Promise<MetadataMap> {
      throw WasmContract.EXCEPTIONS.NOT_IMPLEMENTED
    }
  }

  export class Int extends Ptr<WasmV4.Int> implements WasmContract.Int {
    async isPositive(): Promise<boolean> {
      throw WasmContract.EXCEPTIONS.NOT_IMPLEMENTED
    }

    async asPositive(): Promise<BigNum | undefined> {
      throw WasmContract.EXCEPTIONS.NOT_IMPLEMENTED
    }

    async asNegative(): Promise<BigNum | undefined> {
      throw WasmContract.EXCEPTIONS.NOT_IMPLEMENTED
    }

    async asI32(): Promise<number | undefined> {
      return await this.wasm.as_i32()
    }

    static async new(x: BigNum): Promise<Int> {
      return new Int(await WasmV4.Int.new(x.wasm))
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static async newNegative(x: BigNum): Promise<Int> {
      throw WasmContract.EXCEPTIONS.NOT_IMPLEMENTED
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static async newI32(x: number): Promise<Int> {
      throw WasmContract.EXCEPTIONS.NOT_IMPLEMENTED
    }
  }

  export class TransactionMetadatum
    extends Ptr<WasmV4.TransactionMetadatum>
    implements WasmContract.TransactionMetadatum
  {
    async toBytes(): Promise<Uint8Array> {
      return await this.wasm.to_bytes()
    }

    async kind(): Promise<number> {
      throw WasmContract.EXCEPTIONS.NOT_IMPLEMENTED
    }

    async asMap(): Promise<MetadataMap> {
      throw WasmContract.EXCEPTIONS.NOT_IMPLEMENTED
    }

    async asList(): Promise<MetadataList> {
      throw WasmContract.EXCEPTIONS.NOT_IMPLEMENTED
    }

    async asInt(): Promise<Int> {
      throw WasmContract.EXCEPTIONS.NOT_IMPLEMENTED
    }

    async asBytes(): Promise<Uint8Array> {
      return await this.wasm.to_bytes()
    }

    async asText(): Promise<string> {
      throw WasmContract.EXCEPTIONS.NOT_IMPLEMENTED
    }

    static async fromBytes(bytes: Uint8Array): Promise<TransactionMetadatum> {
      return new TransactionMetadatum(
        await WasmV4.TransactionMetadatum.from_bytes(bytes)
      )
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static async newMap(map: MetadataMap): Promise<TransactionMetadatum> {
      throw WasmContract.EXCEPTIONS.NOT_IMPLEMENTED
    }

    static async newList(list: MetadataList): Promise<TransactionMetadatum> {
      return new TransactionMetadatum(
        await WasmV4.TransactionMetadatum.new_list(list.wasm)
      )
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static async newInt(int: Int): Promise<TransactionMetadatum> {
      throw WasmContract.EXCEPTIONS.NOT_IMPLEMENTED
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static async newBytes(bytes: Uint8Array): Promise<TransactionMetadatum> {
      throw WasmContract.EXCEPTIONS.NOT_IMPLEMENTED
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static async newText(text: string): Promise<TransactionMetadatum> {
      throw WasmContract.EXCEPTIONS.NOT_IMPLEMENTED
    }
  }

  export class AuxiliaryData
    extends Ptr<WasmV4.AuxiliaryData>
    implements WasmContract.AuxiliaryData
  {
    async toBytes(): Promise<Uint8Array> {
      return Promise.resolve(
        this.wasm.to_bytes()
      )
    }

    async metadata(): Promise<GeneralTransactionMetadata> {
      const wasm = await this.wasm.metadata()
      return new GeneralTransactionMetadata(wasm)
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async setMetadata(metadata: GeneralTransactionMetadata): Promise<void> {
      throw new Error(EXCEPTIONS.NOT_IMPLEMENTED)
    }

    nativeScripts(): Promise<NativeScripts | undefined> {
      throw new Error(EXCEPTIONS.NOT_IMPLEMENTED)
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setNativeScripts(native_scripts: NativeScripts): Promise<void> {
      throw new Error(EXCEPTIONS.NOT_IMPLEMENTED)
    }

    plutusScripts(): Promise<PlutusScripts | undefined> {
      throw new Error(EXCEPTIONS.NOT_IMPLEMENTED)
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setPlutusScripts(plutus_scripts: PlutusScripts): Promise<void> {
      throw new Error(EXCEPTIONS.NOT_IMPLEMENTED)
    }

    static async fromBytes(bytes: Uint8Array): Promise<AuxiliaryData> {
      return new AuxiliaryData(
        await WasmV4.AuxiliaryData.from_bytes(bytes)
      )
    }

    static async new(
      metadata: GeneralTransactionMetadata
    ): Promise<AuxiliaryData> {
      const wasm = await WasmV4.AuxiliaryData.new(metadata.wasm)
      return new AuxiliaryData(wasm)
    }

    static async empty(): Promise<AuxiliaryData> {
      return new AuxiliaryData(undefined)
    }
  }

  export class AssetName
    extends Ptr<WasmV4.AssetName>
    implements WasmContract.AssetName
  {
    async toBytes(): Promise<Uint8Array> {
      return await this.wasm.to_bytes()
    }

    async name(): Promise<Uint8Array> {
      return await this.wasm.name()
    }

    static async fromBytes(bytes: Uint8Array): Promise<AssetName> {
      return new AssetName(await WasmV4.AssetName.from_bytes(bytes))
    }

    static async new(name: Uint8Array): Promise<AssetName> {
      return new AssetName(await WasmV4.AssetName.new(name))
    }
  }

  export class AssetNames
    extends Ptr<WasmV4.AssetNames>
    implements WasmContract.AssetNames
  {
    async len(): Promise<number> {
      return await this.wasm.len()
    }

    async get(index: number): Promise<AssetName> {
      return new AssetName(await this.wasm.get(index))
    }

    async add(item: AssetName): Promise<void> {
      await this.wasm.add(item.wasm)
    }

    static async new(): Promise<AssetNames> {
      return new AssetNames(await WasmV4.AssetNames.new())
    }
  }

  export class Assets
    extends Ptr<WasmV4.Assets>
    implements WasmContract.Assets
  {
    async len(): Promise<number> {
      return await this.wasm.len()
    }

    async insert(key: AssetName, value: BigNum): Promise<BigNum> {
      return new BigNum(await this.wasm.insert(key.wasm, value.wasm))
    }

    async get(key: AssetName): Promise<BigNum> {
      return new BigNum(await this.wasm.get(key.wasm))
    }

    async keys(): Promise<AssetNames> {
      return new AssetNames(await this.wasm.keys())
    }

    static async new(): Promise<Assets> {
      return new Assets(await WasmV4.Assets.new())
    }
  }

  export class ScriptHash
    extends WasmProxy<WasmV4.ScriptHash>
    implements WasmContract.ScriptHash
  {
    async toBytes(): Promise<Uint8Array> {
      return await this.wasm.to_bytes()
    }

    static async fromBytes(bytes: Uint8Array): Promise<ScriptHash> {
      return new ScriptHash(await WasmV4.ScriptHash.from_bytes(bytes))
    }
  }

  export class ScriptHashes
    extends WasmProxy<WasmV4.ScriptHashes>
    implements WasmContract.ScriptHashes
  {
    async toBytes(): Promise<Uint8Array> {
      return await this.wasm.to_bytes()
    }

    async len(): Promise<number> {
      return await this.wasm.len()
    }

    async get(index: number): Promise<ScriptHash> {
      return new ScriptHash(await this.wasm.get(index))
    }

    async add(item: ScriptHash): Promise<void> {
      await this.wasm.add(item.wasm)
    }

    static async fromBytes(bytes: Uint8Array): Promise<ScriptHashes> {
      return new ScriptHashes(await WasmV4.ScriptHashes.from_bytes(bytes))
    }

    static async new(): Promise<ScriptHashes> {
      return new ScriptHashes(await WasmV4.ScriptHashes.new())
    }
  }

  type PolicyID = ScriptHash

  type PolicyIDs = ScriptHashes

  export class MultiAsset
    extends Ptr<WasmV4.MultiAsset>
    implements WasmContract.MultiAsset
  {
    async len(): Promise<number> {
      return await this.wasm.len()
    }

    async insert(key: PolicyID, value: Assets): Promise<Assets> {
      return new Assets(await this.wasm.insert(key.wasm, value.wasm))
    }

    async get(key: PolicyID): Promise<Assets> {
      return new Assets(await this.wasm.get(key.wasm))
    }

    async keys(): Promise<PolicyIDs> {
      return new ScriptHashes(await this.wasm.keys())
    }

    async sub(rhs: MultiAsset): Promise<MultiAsset> {
      return new MultiAsset(await this.wasm.sub(rhs.wasm))
    }

    static async new(): Promise<MultiAsset> {
      return new MultiAsset(await WasmV4.MultiAsset.new())
    }
  }

  export class Ed25519KeyHash
    extends Ptr<WasmV4.Ed25519KeyHash>
    implements WasmContract.Ed25519KeyHash
  {
    async toBytes(): Promise<Uint8Array> {
      return await this.wasm.to_bytes()
    }

    static async fromBytes(bytes: Uint8Array): Promise<Ed25519KeyHash> {
      return new Ed25519KeyHash(await WasmV4.Ed25519KeyHash.from_bytes(bytes))
    }
  }

  export class TransactionHash
    extends Ptr<WasmV4.TransactionHash>
    implements WasmContract.TransactionHash
  {
    async toBytes(): Promise<Uint8Array> {
      return await this.wasm.to_bytes()
    }

    static async fromBytes(bytes: Uint8Array): Promise<TransactionHash> {
      return new TransactionHash(await WasmV4.TransactionHash.from_bytes(bytes))
    }
  }

  export class TransactionInput
    extends Ptr<WasmV4.TransactionInput>
    implements WasmContract.TransactionInput
  {
    async toBytes(): Promise<Uint8Array> {
      return this.wasm.to_bytes()
    }

    async transactionId(): Promise<TransactionHash> {
      return new TransactionHash(await this.wasm.transaction_id())
    }

    async index(): Promise<number> {
      return await this.wasm.index()
    }

    static async new(
      transactionId: TransactionHash,
      index: number
    ): Promise<TransactionInput> {
      return new TransactionInput(
        await WasmV4.TransactionInput.new(transactionId.wasm, index)
      )
    }

    static async fromBytes(bytes: Uint8Array): Promise<TransactionInput> {
      return new TransactionInput(
        await WasmV4.TransactionInput.from_bytes(bytes)
      )
    }
  }

  export class Value extends Ptr<WasmV4.Value> implements WasmContract.Value {
    async coin(): Promise<BigNum> {
      return new BigNum(await this.wasm.coin())
    }

    async setCoin(coin: BigNum): Promise<void> {
      return await this.wasm.set_coin(coin.wasm)
    }

    async multiasset(): Promise<MultiAsset> {
      return new MultiAsset(await this.wasm.multiasset())
    }

    async setMultiasset(multiasset: MultiAsset): Promise<void> {
      return await this.wasm.set_multiasset(multiasset.wasm)
    }

    async checkedAdd(rhs: Value): Promise<Value> {
      return new Value(await this.wasm.checked_add(rhs.wasm))
    }

    async checkedSub(rhs: Value): Promise<Value> {
      return new Value(await this.wasm.checked_sub(rhs.wasm))
    }

    async clampedSub(rhs: Value): Promise<Value> {
      return new Value(await this.wasm.clamped_sub(rhs.wasm))
    }

    async compare(rhs: Value): Promise<number> {
      return await this.wasm.compare(rhs.wasm)
    }

    static async new(coin: BigNum): Promise<Value> {
      return new Value(await WasmV4.Value.new(coin.wasm))
    }
  }

  export class Address
    extends Ptr<WasmV4.Address>
    implements WasmContract.Address
  {
    async toBytes(): Promise<Uint8Array> {
      return await this.wasm.to_bytes()
    }

    async toBech32(prefix?: string): Promise<string> {
      return await this.wasm.to_bech32(prefix)
    }

    async networkId(): Promise<number> {
      return await this.wasm.network_id()
    }

    static async fromBytes(bytes: Uint8Array): Promise<Address> {
      return new Address(await WasmV4.Address.from_bytes(bytes))
    }

    static async fromBech32(string: string): Promise<Address> {
      return new Address(await WasmV4.Address.from_bech32(string))
    }
  }

  export class PublicKey
    extends Ptr<WasmV4.PublicKey>
    implements WasmContract.PublicKey
  {
    async toBech32(): Promise<string> {
      return await this.wasm.to_bech32()
    }

    async asBytes(): Promise<Uint8Array> {
      return await this.wasm.as_bytes()
    }

    async hash(): Promise<Ed25519KeyHash> {
      return new Ed25519KeyHash(await this.wasm.hash())
    }

    static async fromBech32(bech32_str: string): Promise<PublicKey> {
      return new PublicKey(await WasmV4.PublicKey.from_bech32(bech32_str))
    }

    static async fromBytes(bytes: Uint8Array): Promise<PublicKey> {
      return new PublicKey(await WasmV4.PublicKey.from_bytes(bytes))
    }
  }

  export class Bip32PublicKey
    extends Ptr<WasmV4.Bip32PublicKey>
    implements WasmContract.Bip32PublicKey
  {
    async derive(index: number): Promise<Bip32PublicKey> {
      return new Bip32PublicKey(await this.wasm.derive(index))
    }

    async toRawKey(): Promise<PublicKey> {
      return new PublicKey(await this.wasm.to_raw_key())
    }

    async asBytes(): Promise<Uint8Array> {
      return await this.wasm.as_bytes()
    }

    async toBech32(): Promise<string> {
      return await this.wasm.to_bech32()
    }

    async chaincode(): Promise<Uint8Array> {
      return await this.wasm.chaincode()
    }

    static async fromBech32(bech32_str: string): Promise<Bip32PublicKey> {
      return new Bip32PublicKey(
        await WasmV4.Bip32PublicKey.from_bech32(bech32_str)
      )
    }

    static async fromBytes(bytes: Uint8Array): Promise<Bip32PublicKey> {
      return new Bip32PublicKey(await WasmV4.Bip32PublicKey.from_bytes(bytes))
    }
  }

  export class PrivateKey
    extends Ptr<WasmV4.PrivateKey>
    implements WasmContract.PrivateKey
  {
    async toPublic(): Promise<PublicKey> {
      return new PublicKey(await this.wasm.to_public())
    }

    async asBytes(): Promise<Uint8Array> {
      return await this.wasm.as_bytes()
    }

    async sign(message: Uint8Array): Promise<Ed25519Signature> {
      return new Ed25519Signature(await this.wasm.sign(message))
    }

    static async fromExtendedBytes(bytes: Uint8Array): Promise<PrivateKey> {
      return new PrivateKey(
        (await WasmV4.PrivateKey.from_extended_bytes(bytes)) as any
      )
    }

    static async fromNormalBytes(bytes: Uint8Array): Promise<PrivateKey> {
      return new PrivateKey(
        (await WasmV4.PrivateKey.from_normal_bytes(bytes)) as any
      )
    }
  }

  export class Bip32PrivateKey
    extends Ptr<WasmV4.Bip32PrivateKey>
    implements WasmContract.Bip32PrivateKey
  {
    async derive(index: number): Promise<Bip32PrivateKey> {
      return new Bip32PrivateKey(await this.wasm.derive(index))
    }

    async toRawKey(): Promise<PrivateKey> {
      return new PrivateKey(await this.wasm.to_raw_key())
    }

    async toPublic(): Promise<Bip32PublicKey> {
      return new Bip32PublicKey(await this.wasm.to_public())
    }

    async asBytes(): Promise<Uint8Array> {
      return await this.wasm.as_bytes()
    }

    async toBech32(): Promise<string> {
      return await this.wasm.to_bech32()
    }

    static async fromBip39Entropy(
      entropy: Uint8Array,
      password: Uint8Array
    ): Promise<Bip32PrivateKey> {
      return new Bip32PrivateKey(
        await WasmV4.Bip32PrivateKey.from_bip39_entropy(entropy, password)
      )
    }

    static async fromBech32(bech32Str: string): Promise<Bip32PrivateKey> {
      return new Bip32PrivateKey(
        await WasmV4.Bip32PrivateKey.from_bech32(bech32Str)
      )
    }

    static async fromBytes(bytes: Uint8Array): Promise<Bip32PrivateKey> {
      return new Bip32PrivateKey(await WasmV4.Bip32PrivateKey.from_bytes(bytes))
    }

    static async generateEd25519Bip32(): Promise<Bip32PrivateKey> {
      return new Bip32PrivateKey(
        await WasmV4.Bip32PrivateKey.generate_ed25519_bip32()
      )
    }
  }

  export class ByronAddress
    extends Ptr<WasmV4.ByronAddress>
    implements WasmContract.ByronAddress
  {
    async toBase58(): Promise<string> {
      return await this.wasm.to_base58()
    }

    async toAddress(): Promise<Address> {
      return new Address(await this.wasm.to_address())
    }

    async byronProtocolMagic(): Promise<number> {
      return await this.wasm.byron_protocol_magic()
    }

    async attributes(): Promise<Uint8Array> {
      return await this.wasm.attributes()
    }

    static async icarusFromKey(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      key: Bip32PublicKey,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      protocolMagic: number
    ): Promise<ByronAddress> {
      throw WasmContract.EXCEPTIONS.NOT_IMPLEMENTED
    }

    static async fromBase58(string: string): Promise<ByronAddress> {
      return new ByronAddress(await WasmV4.ByronAddress.from_base58(string))
    }

    static async isValid(string: string): Promise<boolean> {
      return await WasmV4.ByronAddress.is_valid(string)
    }

    static async fromAddress(addr: Address): Promise<ByronAddress> {
      return new ByronAddress(await WasmV4.ByronAddress.from_address(addr.wasm))
    }
  }

  export class TransactionOutput
    extends Ptr<WasmV4.TransactionOutput>
    implements WasmContract.TransactionOutput
  {
    async toBytes(): Promise<Uint8Array> {
      return await this.wasm.to_bytes()
    }

    async address(): Promise<Address> {
      return new Address(await this.wasm.address())
    }

    async amount(): Promise<Value> {
      return new Value(await this.wasm.amount())
    }

    static async fromBytes(bytes: Uint8Array): Promise<TransactionOutput> {
      return new TransactionOutput(
        await WasmV4.TransactionOutput.from_bytes(bytes)
      )
    }

    static async new(
      address: Address,
      amount: Value
    ): Promise<TransactionOutput> {
      return new TransactionOutput(
        await WasmV4.TransactionOutput.new(address.wasm, amount.wasm)
      )
    }
  }

  export class StakeCredential
    extends Ptr<WasmV4.StakeCredential>
    implements WasmContract.StakeCredential
  {
    async toBytes(): Promise<Uint8Array> {
      return await this.wasm.to_bytes()
    }

    async toKeyhash(): Promise<Ed25519KeyHash> {
      return new Ed25519KeyHash(await this.wasm.to_keyhash())
    }

    async toScripthash(): Promise<ScriptHash> {
      return new ScriptHash(await this.wasm.to_scripthash())
    }

    async kind(): Promise<number> {
      return await this.wasm.kind()
    }

    static async fromBytes(bytes: Uint8Array): Promise<StakeCredential> {
      return new StakeCredential(await WasmV4.StakeCredential.from_bytes(bytes))
    }

    static async fromKeyhash(hash: Ed25519KeyHash): Promise<StakeCredential> {
      return new StakeCredential(
        await WasmV4.StakeCredential.from_keyhash(hash.wasm)
      )
    }

    static async fromScripthash(hash: ScriptHash): Promise<StakeCredential> {
      return new StakeCredential(
        await WasmV4.StakeCredential.from_scripthash(hash.wasm)
      )
    }
  }

  export class StakeRegistration
    extends Ptr<WasmV4.StakeRegistration>
    implements WasmContract.StakeRegistration
  {
    async toBytes(): Promise<Uint8Array> {
      return await this.wasm.to_bytes()
    }

    async stakeCredential(): Promise<StakeCredential> {
      return new StakeCredential(await this.wasm.stake_credential())
    }

    static async new(
      stakeCredential: StakeCredential
    ): Promise<StakeRegistration> {
      return new StakeRegistration(
        await WasmV4.StakeRegistration.new(stakeCredential.wasm)
      )
    }

    static async fromBytes(bytes: Uint8Array): Promise<StakeRegistration> {
      return new StakeRegistration(
        await WasmV4.StakeRegistration.from_bytes(bytes)
      )
    }
  }

  export class StakeDeregistration
    extends Ptr<WasmV4.StakeDeregistration>
    implements WasmContract.StakeDeregistration
  {
    async toBytes(): Promise<Uint8Array> {
      return await this.wasm.to_bytes()
    }

    async stakeCredential(): Promise<StakeCredential> {
      return new StakeCredential(await this.wasm.stake_credential())
    }

    static async new(
      stakeCredential: StakeCredential
    ): Promise<StakeDeregistration> {
      return new StakeDeregistration(
        await WasmV4.StakeDeregistration.new(stakeCredential.wasm)
      )
    }

    static async fromBytes(bytes: Uint8Array): Promise<StakeDeregistration> {
      return new StakeDeregistration(
        await WasmV4.StakeDeregistration.from_bytes(bytes)
      )
    }
  }

  export class StakeDelegation
    extends Ptr<WasmV4.StakeDelegation>
    implements WasmContract.StakeDelegation
  {
    async toBytes(): Promise<Uint8Array> {
      return await this.wasm.to_bytes()
    }

    async stakeCredential(): Promise<StakeCredential> {
      return new StakeCredential(await this.wasm.stake_credential())
    }

    async poolKeyhash(): Promise<Ed25519KeyHash> {
      return new Ed25519KeyHash(await this.wasm.pool_keyhash())
    }

    static async new(
      stakeCredential: StakeCredential,
      poolKeyHash: Ed25519KeyHash
    ): Promise<StakeDelegation> {
      return new StakeDelegation(
        await WasmV4.StakeDelegation.new(stakeCredential.wasm, poolKeyHash.wasm)
      )
    }

    static async fromBytes(bytes: Uint8Array): Promise<StakeDelegation> {
      return new StakeDelegation(await WasmV4.StakeDelegation.from_bytes(bytes))
    }
  }

  export class Certificate
    extends Ptr<WasmV4.Certificate>
    implements WasmContract.Certificate
  {
    async toBytes(): Promise<Uint8Array> {
      return await this.wasm.to_bytes()
    }

    async asStakeRegistration(): Promise<StakeRegistration> {
      return new StakeRegistration(await this.wasm.as_stake_registration())
    }

    async asStakeDeregistration(): Promise<StakeDeregistration> {
      return new StakeDeregistration(await this.wasm.as_stake_deregistration())
    }

    async asStakeDelegation(): Promise<StakeDelegation> {
      return new StakeDelegation(await this.wasm.as_stake_delegation())
    }

    static async fromBytes(bytes: Uint8Array): Promise<Certificate> {
      return new Certificate(await WasmV4.Certificate.from_bytes(bytes))
    }

    static async newStakeRegistration(
      stakeRegistration: StakeRegistration
    ): Promise<Certificate> {
      return new Certificate(
        await WasmV4.Certificate.new_stake_registration(stakeRegistration.wasm)
      )
    }

    static async newStakeDeregistration(
      stakeDeregistration: StakeDeregistration
    ): Promise<Certificate> {
      return new Certificate(
        await WasmV4.Certificate.new_stake_deregistration(
          stakeDeregistration.wasm
        )
      )
    }

    static async newStakeDelegation(
      stakeDelegation: StakeDelegation
    ): Promise<Certificate> {
      return new Certificate(
        await WasmV4.Certificate.new_stake_delegation(stakeDelegation.wasm)
      )
    }
  }

  export class Certificates
    extends Ptr<WasmV4.Certificates>
    implements WasmContract.Certificates
  {
    async toBytes(): Promise<Uint8Array> {
      return await this.wasm.to_bytes()
    }

    async len(): Promise<number> {
      return await this.wasm.len()
    }

    async get(index: number): Promise<Certificate> {
      return new Certificate(await this.wasm.get(index))
    }

    async add(item: Certificate): Promise<void> {
      return await this.wasm.add(item.wasm)
    }

    static async fromBytes(bytes: Uint8Array): Promise<Certificates> {
      return new Certificates(await WasmV4.Certificates.from_bytes(bytes))
    }

    static async new(): Promise<Certificates> {
      return new Certificates(await WasmV4.Certificates.new())
    }
  }

  export class RewardAddress
    extends Ptr<WasmV4.RewardAddress>
    implements WasmContract.RewardAddress
  {
    async paymentCred(): Promise<StakeCredential> {
      return new StakeCredential(await this.wasm.payment_cred())
    }

    async toAddress(): Promise<Address> {
      return new Address(await this.wasm.to_address())
    }

    static async fromAddress(addr: Address): Promise<RewardAddress> {
      return new RewardAddress(
        await WasmV4.RewardAddress.from_address(addr.wasm)
      )
    }

    static async new(
      network: number,
      payment: StakeCredential
    ): Promise<RewardAddress> {
      return new RewardAddress(
        await WasmV4.RewardAddress.new(network, payment.wasm)
      )
    }
  }

  export class RewardAddresses
    extends Ptr<WasmV4.RewardAddresses>
    implements WasmContract.RewardAddresses
  {
    async len(): Promise<number> {
      return await this.wasm.len()
    }

    async get(index: number): Promise<RewardAddress> {
      return new RewardAddress(await this.wasm.get(index))
    }

    async add(item: RewardAddress): Promise<void> {
      return await this.wasm.add(item.wasm)
    }

    static async new(): Promise<RewardAddresses> {
      return new RewardAddresses(await WasmV4.RewardAddresses.new())
    }
  }

  export class Withdrawals
    extends Ptr<WasmV4.Withdrawals>
    implements WasmContract.Withdrawals
  {
    async len(): Promise<number> {
      return await this.wasm.len()
    }

    async insert(key: RewardAddress, value: BigNum): Promise<BigNum> {
      return new BigNum(await this.wasm.insert(key.wasm, value.wasm))
    }

    async get(key: RewardAddress): Promise<BigNum> {
      return new BigNum(await this.wasm.get(key.wasm))
    }

    async keys(): Promise<RewardAddresses> {
      return new RewardAddresses(await this.wasm.keys())
    }

    static async new(): Promise<Withdrawals> {
      return new Withdrawals(await WasmV4.Withdrawals.new())
    }
  }

  export class TransactionInputs
    extends Ptr<WasmV4.TransactionInputs>
    implements WasmContract.TransactionInputs
  {
    async len(): Promise<number> {
      return await this.wasm.len()
    }

    async get(index: number): Promise<TransactionInput> {
      return new TransactionInput(await this.wasm.get(index))
    }
  }

  export class TransactionOutputs
    extends Ptr<WasmV4.TransactionOutputs>
    implements WasmContract.TransactionOutputs
  {
    async len(): Promise<number> {
      return await this.wasm.len()
    }

    async get(index: number): Promise<TransactionOutput> {
      return new TransactionOutput(await this.wasm.get(index))
    }
  }

  export type Optional<T> = T

  export class TransactionBody
    extends Ptr<WasmV4.TransactionBody>
    implements WasmContract.TransactionBody
  {
    async toBytes(): Promise<Uint8Array> {
      return await this.wasm.to_bytes()
    }

    async inputs(): Promise<TransactionInputs> {
      return new TransactionInputs(await this.wasm.inputs())
    }

    async outputs(): Promise<TransactionOutputs> {
      return new TransactionOutputs(await this.wasm.outputs())
    }

    async fee(): Promise<BigNum> {
      return new BigNum(await this.wasm.fee())
    }

    async ttl(): Promise<Optional<number | undefined>> {
      return await this.wasm.ttl()
    }

    async certs(): Promise<Certificates> {
      return Promise.resolve(new Certificates(await this.wasm.certs()))
    }

    async withdrawals(): Promise<Withdrawals> {
      return Promise.resolve(new Withdrawals(await this.wasm.withdrawals()))
    }

    static async fromBytes(bytes: Uint8Array): Promise<TransactionBody> {
      return Promise.resolve(
        new TransactionBody(await WasmV4.TransactionBody.from_bytes(bytes))
      )
    }
  }

  export class TransactionBuilder
    extends Ptr<WasmV4.TransactionBuilder>
    implements WasmContract.TransactionBuilder
  {
    async addKeyInput(
      hash: Ed25519KeyHash,
      input: TransactionInput,
      amount: Value
    ): Promise<void> {
      return await this.wasm.add_key_input(hash.wasm, input.wasm, amount.wasm)
    }

    async addBootstrapInput(
      hash: ByronAddress,
      input: TransactionInput,
      amount: Value
    ): Promise<void> {
      return await this.wasm.add_bootstrap_input(
        hash.wasm,
        input.wasm,
        amount.wasm
      )
    }

    async addInput(
      address: Address,
      input: TransactionInput,
      amount: Value
    ): Promise<void> {
      return await this.wasm.add_input(address.wasm, input.wasm, amount.wasm)
    }

    async feeForInput(
      address: Address,
      input: TransactionInput,
      amount: Value
    ): Promise<BigNum> {
      return new BigNum(
        await this.wasm.fee_for_input(address.wasm, input.wasm, amount.wasm)
      )
    }

    async addOutput(output: TransactionOutput): Promise<void> {
      return await this.wasm.add_output(output.wasm)
    }

    async feeForOutput(output: TransactionOutput): Promise<BigNum> {
      return new BigNum(await this.wasm.fee_for_output(output.wasm))
    }

    async setFee(fee: BigNum): Promise<void> {
      return await this.wasm.set_fee(fee.wasm)
    }

    async setTtl(ttl: number): Promise<void> {
      return await this.wasm.set_ttl(ttl)
    }

    async setValidityStartInterval(
      validityStartInterval: number
    ): Promise<void> {
      return await this.wasm.set_validity_start_interval(validityStartInterval)
    }

    async setCerts(certs: Certificates): Promise<void> {
      return await this.wasm.set_certs(certs.wasm)
    }

    async setWithdrawals(withdrawals: Withdrawals): Promise<void> {
      return await this.wasm.set_withdrawals(withdrawals.wasm)
    }

    async setAuxiliaryData(auxiliary: AuxiliaryData): Promise<void> {
      return await this.wasm.set_auxiliary_data(auxiliary.wasm)
    }

    async getExplicitInput(): Promise<Value> {
      return new Value(await this.wasm.get_explicit_input())
    }

    async getImplicitInput(): Promise<Value> {
      return new Value(await this.wasm.get_implicit_input())
    }

    async getExplicitOutput(): Promise<Value> {
      return new Value(await this.wasm.get_explicit_output())
    }

    async getDeposit(): Promise<BigNum> {
      return new BigNum(await this.wasm.get_deposit())
    }

    async getFeeIfSet(): Promise<BigNum> {
      return new BigNum(await this.wasm.get_fee_if_set())
    }

    async addChangeIfNeeded(address: Address): Promise<boolean> {
      return await this.wasm.add_change_if_needed(address.wasm)
    }

    async build(): Promise<TransactionBody> {
      return new TransactionBody(await this.wasm.build())
    }

    async minFee(): Promise<BigNum> {
      return new BigNum(await this.wasm.min_fee())
    }

    static async new(
      linearFee: LinearFee,
      minimumUtxoVal: BigNum,
      poolDeposit: BigNum,
      keyDeposit: BigNum
    ): Promise<TransactionBuilder> {
      return new TransactionBuilder(
        await WasmV4.TransactionBuilder.new(
          linearFee.wasm,
          minimumUtxoVal.wasm,
          poolDeposit.wasm,
          keyDeposit.wasm,
          5000,
          16384
        )
      )
    }
  }

  export class BaseAddress
    extends Ptr<WasmV4.BaseAddress>
    implements WasmContract.BaseAddress
  {
    async paymentCred(): Promise<StakeCredential> {
      return new StakeCredential(await this.wasm.payment_cred())
    }

    async stakeCred(): Promise<StakeCredential> {
      return new StakeCredential(await this.wasm.stake_cred())
    }

    async toAddress(): Promise<Address> {
      return new Address(await this.wasm.to_address())
    }

    static async fromAddress(addr: Address): Promise<BaseAddress> {
      return new BaseAddress(await WasmV4.BaseAddress.from_address(addr.wasm))
    }

    static async new(
      network: number,
      payment: StakeCredential,
      stake: StakeCredential
    ): Promise<BaseAddress> {
      return new BaseAddress(
        await WasmV4.BaseAddress.new(network, payment.wasm, stake.wasm)
      )
    }
  }

  // ToDo: add docs to core lib mentioning this class is not available on the mobile implementation
  export class PointerAddress implements WasmContract.PointerAddress {
    constructor() {
      throw new Error('PointerAddress is not implemented on mobile')
    }

    free(): Promise<void> {
      throw new Error('Method not implemented.')
    }

    hasValue(): boolean {
      throw new Error('Method not implemented.')
    }

    paymentCred(): Promise<StakeCredential> {
      throw new Error('Method not implemented.')
    }

    stakePointer(): Promise<Pointer> {
      throw new Error('Method not implemented.')
    }

    toAddress(): Promise<Address> {
      throw new Error('Method not implemented.')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static fromAddress(addr: Address): Promise<PointerAddress> {
      throw new Error('Method not implemented.')
    }

    static new(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      network: number,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      payment: StakeCredential,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      stake: Pointer
    ): Promise<PointerAddress> {
      throw new Error('Method not implemented.')
    }
  }

  // ToDo: add docs to core lib mentioning this class can be instantiated on mobile, but none of the other methods is implemented
  export class EnterpriseAddress
    extends Ptr<WasmV4.EnterpriseAddress>
    implements WasmContract.EnterpriseAddress
  {
    constructor(wasm: WasmV4.EnterpriseAddress) {
      super(wasm)
      throw new Error('EnterpriseAddress is not implemented on mobile')
    }

    paymentCred(): Promise<StakeCredential> {
      throw new Error('Method not implemented.')
    }

    toAddress(): Promise<Address> {
      throw new Error('Method not implemented.')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static fromAddress(addr: Address): Promise<EnterpriseAddress> {
      throw new Error('Method not implemented.')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static new(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      network: number,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      payment: StakeCredential
    ): Promise<EnterpriseAddress> {
      throw new Error('Method not implemented.')
    }
  }

  // ToDo: add docs to core lib mentioning this class is not available on the mobile implementation
  export class Pointer implements WasmContract.Pointer {
    constructor() {
      throw new Error('Pointer is not implemented on mobile')
    }

    free(): Promise<void> {
      throw new Error('Method not implemented.')
    }

    hasValue(): boolean {
      throw new Error('Method not implemented.')
    }

    slot(): Promise<number> {
      throw new Error('Method not implemented.')
    }

    txIndex(): Promise<number> {
      throw new Error('Method not implemented.')
    }

    certIndex(): Promise<number> {
      throw new Error('Method not implemented.')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static new(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      slot: number,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      txIndex: number,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      certIndex: number
    ): Promise<Pointer> {
      throw new Error('Method not implemented.')
    }
  }

  export class Vkey extends Ptr<WasmV4.Vkey> implements WasmContract.Vkey {
    static async new(pk: PublicKey): Promise<Vkey> {
      return new Vkey(await WasmV4.Vkey.new(pk.wasm))
    }
  }

  export class Ed25519Signature
    extends Ptr<WasmV4.Ed25519Signature>
    implements WasmContract.Ed25519Signature
  {
    async toBytes(): Promise<Uint8Array> {
      return await this.wasm.to_bytes()
    }

    async toHex(): Promise<string> {
      return await this.wasm.to_hex()
    }

    static async fromBytes(bytes: Uint8Array): Promise<Ed25519Signature> {
      return new Ed25519Signature(
        await WasmV4.Ed25519Signature.from_bytes(bytes)
      )
    }
  }

  export class Vkeywitness
    extends Ptr<WasmV4.Vkeywitness>
    implements WasmContract.Vkeywitness
  {
    async toBytes(): Promise<Uint8Array> {
      return await this.wasm.to_bytes()
    }

    async signature(): Promise<Ed25519Signature> {
      return new Ed25519Signature(await this.wasm.signature())
    }

    static async fromBytes(bytes: Uint8Array): Promise<Vkeywitness> {
      return new Vkeywitness(await WasmV4.Vkeywitness.from_bytes(bytes))
    }

    static async new(
      vkey: Vkey,
      signature: Ed25519Signature
    ): Promise<Vkeywitness> {
      return new Vkeywitness(
        await WasmV4.Vkeywitness.new(vkey.wasm, signature.wasm)
      )
    }
  }

  export class Vkeywitnesses
    extends Ptr<WasmV4.Vkeywitnesses>
    implements WasmContract.Vkeywitnesses
  {
    async len(): Promise<number> {
      return await this.wasm.len()
    }

    async add(item: Vkeywitness): Promise<void> {
      return await this.wasm.add(item.wasm)
    }

    static async new(): Promise<Vkeywitnesses> {
      return new Vkeywitnesses(await WasmV4.Vkeywitnesses.new())
    }
  }

  export class BootstrapWitness
    extends Ptr<WasmV4.BootstrapWitness>
    implements WasmContract.BootstrapWitness
  {
    async toBytes(): Promise<Uint8Array> {
      return await this.wasm.to_bytes()
    }

    static async fromBytes(bytes: Uint8Array): Promise<BootstrapWitness> {
      return new BootstrapWitness(
        await WasmV4.BootstrapWitness.from_bytes(bytes)
      )
    }

    static async new(
      vkey: Vkey,
      signature: Ed25519Signature,
      chainCode: Uint8Array,
      attributes: Uint8Array
    ): Promise<BootstrapWitness> {
      return new BootstrapWitness(
        await WasmV4.BootstrapWitness.new(
          vkey.wasm,
          signature.wasm,
          chainCode,
          attributes
        )
      )
    }
  }

  export class BootstrapWitnesses
    extends Ptr<WasmV4.BootstrapWitnesses>
    implements WasmContract.BootstrapWitnesses
  {
    async len(): Promise<number> {
      return await this.wasm.len()
    }

    async add(item: BootstrapWitness): Promise<void> {
      return await this.wasm.add(item.wasm)
    }

    static async new(): Promise<BootstrapWitnesses> {
      return new BootstrapWitnesses(await WasmV4.BootstrapWitnesses.new())
    }
  }

  export class TransactionWitnessSet
    extends Ptr<WasmV4.TransactionWitnessSet>
    implements WasmContract.TransactionWitnessSet
  {
    async setBootstraps(bootstraps: BootstrapWitnesses): Promise<void> {
      return await this.wasm.set_bootstraps(bootstraps.wasm)
    }

    async setVkeys(vkeywitnesses: Vkeywitnesses): Promise<void> {
      return await this.wasm.set_vkeys(vkeywitnesses.wasm)
    }

    static async new(): Promise<TransactionWitnessSet> {
      return new TransactionWitnessSet(await WasmV4.TransactionWitnessSet.new())
    }
  }

  export class Transaction
    extends Ptr<WasmV4.Transaction>
    implements WasmContract.Transaction
  {
    async body(): Promise<TransactionBody> {
      return new TransactionBody(await this.wasm.body())
    }

    async toBytes(): Promise<Uint8Array> {
      const anyWasm = this.wasm as any
      return await anyWasm.to_bytes()
    }

    static async new(
      body: TransactionBody,
      witnessSet: TransactionWitnessSet,
      auxiliary: AuxiliaryData
    ): Promise<Transaction> {
      return new Transaction(
        await WasmV4.Transaction.new(
          body.wasm,
          witnessSet.wasm,
          auxiliary.internalWasm
        )
      )
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static fromBytes(bytes: Uint8Array): Promise<Transaction> {
      // method missing from the Wasm object
      throw new Error(EXCEPTIONS.NOT_IMPLEMENTED)
    }
  }

  /**
   * `NetworkInfo` is not exported by @emurgo/react-native-haskell-shelley,
   * so we create our own fake implementation. The calls made to this object are not
   * proxied to WASM.
   */
  export class NetworkInfo
    extends Ptr<any>
    implements WasmContract.NetworkInfo
  {
    private _networkId: number
    private _protocolMagic: number

    networkId(): Promise<number> {
      return Promise.resolve(this._networkId)
    }

    protocolMagic(): Promise<number> {
      return Promise.resolve(this._protocolMagic)
    }

    static new(networkId: number, protocolMagic: number): Promise<NetworkInfo> {
      const networkInfo = new NetworkInfo(undefined)
      networkInfo._networkId = networkId
      networkInfo._protocolMagic = protocolMagic
      return Promise.resolve(networkInfo)
    }

    static async testnet(): Promise<NetworkInfo> {
      const networkInfo = new NetworkInfo(undefined)
      networkInfo._networkId = 0
      networkInfo._protocolMagic = 1097911063
      return Promise.resolve(networkInfo)
    }

    static async mainnet(): Promise<NetworkInfo> {
      const networkInfo = new NetworkInfo(undefined)
      networkInfo._networkId = 1
      networkInfo._protocolMagic = 764824073
      return Promise.resolve(networkInfo)
    }
  }

  export class MetadataList
    extends Ptr<WasmV4.MetadataList>
    implements WasmContract.MetadataList
  {
    static async new(): Promise<MetadataList> {
      return new MetadataList(await WasmV4.MetadataList.new())
    }

    static async fromBytes(bytes: Uint8Array): Promise<MetadataList> {
      return new MetadataList(await WasmV4.MetadataList.from_bytes(bytes))
    }

    async len(): Promise<number> {
      return await this.wasm.len()
    }

    async get(index: number): Promise<TransactionMetadatum> {
      return new TransactionMetadatum(await this.wasm.get(index))
    }

    async add(item: TransactionMetadatum): Promise<void> {
      await this.wasm.add(item.wasm)
    }

    async toBytes(): Promise<Uint8Array> {
      return await this.wasm.to_bytes()
    }
  }

  /**
   * WARNING! This type is here to comply with the exported interface, but it is not implemented
   */
  export class NativeScript
    extends Ptr<never>
    implements WasmContract.NativeScript
  {
    toBytes(): Promise<Uint8Array> {
      throw new Error(EXCEPTIONS.NOT_IMPLEMENTED)
    }
  
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    hash(namespace: number): Promise<Ed25519KeyHash> {
      throw new Error(EXCEPTIONS.NOT_IMPLEMENTED)
    }
  
    kind(): Promise<number> {
      throw new Error(EXCEPTIONS.NOT_IMPLEMENTED)
    }
  
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static fromBytes(bytes: Uint8Array): Promise<NativeScript> {
      throw new Error(EXCEPTIONS.NOT_IMPLEMENTED)
    }
  }
  
  /**
   * WARNING! This type is here to comply with the exported interface, but it is not implemented
   */
  export class NativeScripts
    extends Ptr<never>
    implements WasmContract.NativeScripts
  {
    len(): Promise<number> {
      throw new Error(EXCEPTIONS.NOT_IMPLEMENTED)
    }
  
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    get(index: number): Promise<NativeScript> {
      throw new Error(EXCEPTIONS.NOT_IMPLEMENTED)
    }
  
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    add(elem: NativeScript): Promise<void> {
      throw new Error(EXCEPTIONS.NOT_IMPLEMENTED)
    }
  
    static new(): Promise<NativeScripts> {
      throw new Error(EXCEPTIONS.NOT_IMPLEMENTED)
    }
  }
  
  /**
   * WARNING! This type is here to comply with the exported interface, but it is not implemented
   */
  export class PlutusScript
    extends Ptr<never>
    implements WasmContract.PlutusScript
  {
    toBytes(): Promise<Uint8Array> {
      throw new Error(EXCEPTIONS.NOT_IMPLEMENTED)
    }
  
    bytes(): Promise<Uint8Array> {
      throw new Error(EXCEPTIONS.NOT_IMPLEMENTED)
    }
  
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static fromBytes(bytes: Uint8Array): Promise<PlutusScript> {
      throw new Error(EXCEPTIONS.NOT_IMPLEMENTED)
    }
  
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static new(bytes: Uint8Array): Promise<PlutusScript> {
      throw new Error(EXCEPTIONS.NOT_IMPLEMENTED)
    }
  }
  
  /**
   * WARNING! This type is here to comply with the exported interface, but it is not implemented
   */
  export class PlutusScripts
    extends Ptr<never>
    implements WasmContract.PlutusScripts
  {
    toBytes(): Promise<Uint8Array> {
      throw new Error(EXCEPTIONS.NOT_IMPLEMENTED)
    }
  
    len(): Promise<number> {
      throw new Error(EXCEPTIONS.NOT_IMPLEMENTED)
    }
  
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    get(index: number): Promise<PlutusScript> {
      throw new Error(EXCEPTIONS.NOT_IMPLEMENTED)
    }
  
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    add(elem: PlutusScript): Promise<void> {
      throw new Error(EXCEPTIONS.NOT_IMPLEMENTED)
    }
  
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static fromBytes(bytes: Uint8Array): Promise<PlutusScripts> {
      throw new Error(EXCEPTIONS.NOT_IMPLEMENTED)
    }
  
    static new(): Promise<PlutusScripts> {
      throw new Error(EXCEPTIONS.NOT_IMPLEMENTED)
    }
  }
}
