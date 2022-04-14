import * as WasmV4 from '@emurgo/cardano-serialization-lib-nodejs'

import { IYoroiLib, createYoroiLib, WasmContract } from '@emurgo/yoroi-lib-core'

export const init = (): IYoroiLib => {
  return createYoroiLib({
    encryptWithPassword: (
      password: string,
      salt: string,
      nonce: string,
      data: string
    ) => {
      return Promise.resolve(
        WasmV4.encrypt_with_password(password, salt, nonce, data)
      )
    },
    decryptWithPassword: (password: string, salt: string) => {
      return Promise.resolve(WasmV4.decrypt_with_password(password, salt))
    },
    encodeJsonStrToMetadatum: (json: string, schema: number) => {
      const wasm = WasmV4.encode_json_str_to_metadatum(json, schema)
      return Promise.resolve(new NodeJs.TransactionMetadatum(wasm))
    },
    minAdaRequired: (value: NodeJs.Value, minimumUtxoVal: NodeJs.BigNum) => {
      return Promise.resolve(
        new NodeJs.BigNum(
          WasmV4.min_ada_required(value.wasm, minimumUtxoVal.wasm)
        )
      )
    },
    hashTransaction: (txBody: NodeJs.TransactionBody) => {
      return Promise.resolve(
        new NodeJs.TransactionHash(WasmV4.hash_transaction(txBody.wasm))
      )
    },
    makeVkeyWitness: (
      txBodyHash: NodeJs.TransactionHash,
      sk: NodeJs.PrivateKey
    ) => {
      return Promise.resolve(
        new NodeJs.Vkeywitness(
          WasmV4.make_vkey_witness(txBodyHash.wasm, sk.wasm)
        )
      )
    },
    makeIcarusBootstrapWitness: (
      txBodyHash: NodeJs.TransactionHash,
      addr: NodeJs.ByronAddress,
      key: NodeJs.Bip32PrivateKey
    ) => {
      return Promise.resolve(
        new NodeJs.BootstrapWitness(
          WasmV4.make_icarus_bootstrap_witness(
            txBodyHash.wasm,
            addr.wasm,
            key.wasm
          )
        )
      )
    },
    decodeMetadatumToJsonStr: (
      metadatum: NodeJs.TransactionMetadatum,
      schema: number
    ) => {
      return Promise.resolve(
        WasmV4.decode_metadatum_to_json_str(metadatum.wasm, schema)
      )
    },
    BigNum: NodeJs.BigNum,
    LinearFee: NodeJs.LinearFee,
    GeneralTransactionMetadata: NodeJs.GeneralTransactionMetadata,
    TransactionMetadatum: NodeJs.TransactionMetadatum,
    AuxiliaryData: NodeJs.AuxiliaryData,
    AssetName: NodeJs.AssetName,
    AssetNames: NodeJs.AssetNames,
    Assets: NodeJs.Assets,
    ScriptHash: NodeJs.ScriptHash,
    ScriptHashes: NodeJs.ScriptHashes,
    MultiAsset: NodeJs.MultiAsset,
    Ed25519KeyHash: NodeJs.Ed25519KeyHash,
    TransactionHash: NodeJs.TransactionHash,
    TransactionInput: NodeJs.TransactionInput,
    Value: NodeJs.Value,
    Address: NodeJs.Address,
    PublicKey: NodeJs.PublicKey,
    Bip32PublicKey: NodeJs.Bip32PublicKey,
    PrivateKey: NodeJs.PrivateKey,
    Bip32PrivateKey: NodeJs.Bip32PrivateKey,
    ByronAddress: NodeJs.ByronAddress,
    TransactionOutput: NodeJs.TransactionOutput,
    StakeCredential: NodeJs.StakeCredential,
    StakeRegistration: NodeJs.StakeRegistration,
    StakeDeregistration: NodeJs.StakeDeregistration,
    StakeDelegation: NodeJs.StakeDelegation,
    Certificate: NodeJs.Certificate,
    Certificates: NodeJs.Certificates,
    RewardAddress: NodeJs.RewardAddress,
    RewardAddresses: NodeJs.RewardAddresses,
    Withdrawals: NodeJs.Withdrawals,
    TransactionInputs: NodeJs.TransactionInputs,
    TransactionOutputs: NodeJs.TransactionOutputs,
    TransactionBody: NodeJs.TransactionBody,
    TransactionBuilder: NodeJs.TransactionBuilder,
    BaseAddress: NodeJs.BaseAddress,
    PointerAddress: NodeJs.PointerAddress,
    EnterpriseAddress: NodeJs.EnterpriseAddress,
    Pointer: NodeJs.Pointer,
    Vkey: NodeJs.Vkey,
    Ed25519Signature: NodeJs.Ed25519Signature,
    Vkeywitness: NodeJs.Vkeywitness,
    Vkeywitnesses: NodeJs.Vkeywitnesses,
    BootstrapWitness: NodeJs.BootstrapWitness,
    BootstrapWitnesses: NodeJs.BootstrapWitnesses,
    TransactionWitnessSet: NodeJs.TransactionWitnessSet,
    Transaction: NodeJs.Transaction,
    NetworkInfo: NodeJs.NetworkInfo,
    MetadataList: NodeJs.MetadataList,
    TransactionMetadatumLabels: NodeJs.TransactionMetadatumLabels,
    MetadataMap: NodeJs.MetadataMap,
    Int: NodeJs.Int
  })
}

namespace NodeJs {
  export abstract class WasmProxy<T> implements WasmContract.WasmProxy {
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

  export abstract class Ptr<
    T extends { free: () => any }
  > extends WasmProxy<T> {
    constructor(wasm: T | undefined) {
      super(wasm)
    }

    free(): Promise<void> {
      return Promise.resolve(this.wasm.free())
    }
  }

  export class BigNum
    extends Ptr<WasmV4.BigNum>
    implements WasmContract.BigNum
  {
    toBytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }
    toStr(): Promise<string> {
      return Promise.resolve(this.wasm.to_str())
    }
    checkedMul(other: BigNum): Promise<BigNum> {
      const wasmBigNum = this.wasm.checked_mul(other.wasm)
      return Promise.resolve(new BigNum(wasmBigNum))
    }
    checkedAdd(other: BigNum): Promise<BigNum> {
      const wasmBigNum = this.wasm.checked_add(other.wasm)
      return Promise.resolve(new BigNum(wasmBigNum))
    }
    checkedSub(other: BigNum): Promise<BigNum> {
      const wasmBigNum = this.wasm.checked_sub(other.wasm)
      return Promise.resolve(new BigNum(wasmBigNum))
    }
    clampedSub(other: BigNum): Promise<BigNum> {
      const wasmBigNum = this.wasm.clamped_sub(other.wasm)
      return Promise.resolve(new BigNum(wasmBigNum))
    }
    compare(rhs_value: BigNum): Promise<number> {
      return Promise.resolve(this.wasm.compare(rhs_value.wasm))
    }

    static fromBytes(bytes: Uint8Array): Promise<BigNum> {
      return Promise.resolve(new BigNum(WasmV4.BigNum.from_bytes(bytes)))
    }

    static fromStr(string: string): Promise<BigNum> {
      return Promise.resolve(new BigNum(WasmV4.BigNum.from_str(string)))
    }
  }

  export class LinearFee
    extends Ptr<WasmV4.LinearFee>
    implements WasmContract.LinearFee
  {
    free(): Promise<void> {
      return Promise.resolve(this.wasm.free())
    }
    constant(): Promise<BigNum> {
      return Promise.resolve(new BigNum(this.wasm.constant()))
    }
    coefficient(): Promise<BigNum> {
      return Promise.resolve(new BigNum(this.wasm.coefficient()))
    }
    static new(coefficient: BigNum, constant: BigNum): Promise<LinearFee> {
      const wasmLinearFee = WasmV4.LinearFee.new(
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
    toBytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }

    len(): Promise<number> {
      return Promise.resolve(this.wasm.len())
    }

    insert(
      key: BigNum,
      value: TransactionMetadatum
    ): Promise<TransactionMetadatum> {
      return Promise.resolve(
        new TransactionMetadatum(this.wasm.insert(key.wasm, value.wasm))
      )
    }

    get(key: BigNum): Promise<TransactionMetadatum> {
      return Promise.resolve(new TransactionMetadatum(this.wasm.get(key.wasm)))
    }

    keys(): Promise<TransactionMetadatumLabels> {
      return Promise.resolve(new TransactionMetadatumLabels(this.wasm.keys()))
    }

    static new(): Promise<GeneralTransactionMetadata> {
      const wasm = WasmV4.GeneralTransactionMetadata.new()
      return Promise.resolve(new GeneralTransactionMetadata(wasm))
    }

    static fromBytes(bytes: Uint8Array): Promise<GeneralTransactionMetadata> {
      const wasm = WasmV4.GeneralTransactionMetadata.from_bytes(bytes)
      return Promise.resolve(new GeneralTransactionMetadata(wasm))
    }
  }

  export class TransactionMetadatumLabels
    extends Ptr<WasmV4.TransactionMetadatumLabels>
    implements WasmContract.TransactionMetadatumLabels
  {
    toBytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }

    len(): Promise<number> {
      return Promise.resolve(this.wasm.len())
    }

    get(index: number): Promise<BigNum> {
      return Promise.resolve(new BigNum(this.wasm.get(index)))
    }

    add(elem: BigNum): Promise<void> {
      return Promise.resolve(this.wasm.add(elem.wasm))
    }

    static fromBytes(bytes: Uint8Array): Promise<TransactionMetadatumLabels> {
      return Promise.resolve(
        new TransactionMetadatumLabels(
          WasmV4.TransactionMetadatumLabels.from_bytes(bytes)
        )
      )
    }

    static new(): Promise<TransactionMetadatumLabels> {
      return Promise.resolve(
        new TransactionMetadatumLabels(WasmV4.TransactionMetadatumLabels.new())
      )
    }
  }

  export class MetadataMap
    extends Ptr<WasmV4.MetadataMap>
    implements WasmContract.MetadataMap
  {
    toBytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }

    len(): Promise<number> {
      return Promise.resolve(this.wasm.len())
    }

    insert(
      key: TransactionMetadatum,
      value: TransactionMetadatum
    ): Promise<TransactionMetadatum | undefined> {
      const wasm = this.wasm.insert(key.wasm, value.wasm)
      if (wasm) {
        return Promise.resolve(new TransactionMetadatum(wasm))
      } else {
        return Promise.resolve(undefined)
      }
    }

    insertStr(
      key: string,
      value: TransactionMetadatum
    ): Promise<TransactionMetadatum | undefined> {
      const wasm = this.wasm.insert_str(key, value.wasm)
      if (wasm) {
        return Promise.resolve(new TransactionMetadatum(wasm))
      } else {
        return Promise.resolve(undefined)
      }
    }

    insertI32(
      key: number,
      value: TransactionMetadatum
    ): Promise<TransactionMetadatum | undefined> {
      const wasm = this.wasm.insert_i32(key, value.wasm)
      if (wasm) {
        return Promise.resolve(new TransactionMetadatum(wasm))
      } else {
        return Promise.resolve(undefined)
      }
    }

    get(key: TransactionMetadatum): Promise<TransactionMetadatum> {
      return Promise.resolve(new TransactionMetadatum(this.wasm.get(key.wasm)))
    }

    getStr(key: string): Promise<TransactionMetadatum> {
      return Promise.resolve(new TransactionMetadatum(this.wasm.get_str(key)))
    }

    getI32(key: number): Promise<TransactionMetadatum> {
      return Promise.resolve(new TransactionMetadatum(this.wasm.get_i32(key)))
    }

    has(key: TransactionMetadatum): Promise<boolean> {
      return Promise.resolve(this.wasm.has(key.wasm))
    }

    keys(): Promise<MetadataList> {
      return Promise.resolve(new MetadataList(this.wasm.keys()))
    }

    static fromBytes(bytes: Uint8Array): Promise<MetadataMap> {
      return Promise.resolve(
        new MetadataMap(WasmV4.MetadataMap.from_bytes(bytes))
      )
    }

    static new(): Promise<MetadataMap> {
      return Promise.resolve(new MetadataMap(WasmV4.MetadataMap.new()))
    }
  }

  export class Int extends Ptr<WasmV4.Int> implements WasmContract.Int {
    isPositive(): Promise<boolean> {
      return Promise.resolve(this.wasm.is_positive())
    }

    asPositive(): Promise<BigNum | undefined> {
      const wasm = this.wasm.as_positive()
      if (wasm) {
        return Promise.resolve(new BigNum(wasm))
      } else {
        return Promise.resolve(undefined)
      }
    }

    asNegative(): Promise<BigNum | undefined> {
      const wasm = this.wasm.as_negative()
      if (wasm) {
        return Promise.resolve(new BigNum(wasm))
      } else {
        return Promise.resolve(undefined)
      }
    }

    asI32(): Promise<number | undefined> {
      return Promise.resolve(this.wasm.as_i32())
    }

    static new(x: BigNum): Promise<Int> {
      return Promise.resolve(new Int(WasmV4.Int.new(x.wasm)))
    }

    static newNegative(x: BigNum): Promise<Int> {
      return Promise.resolve(new Int(WasmV4.Int.new_negative(x.wasm)))
    }

    static newI32(x: number): Promise<Int> {
      return Promise.resolve(new Int(WasmV4.Int.new_i32(x)))
    }
  }

  export class TransactionMetadatum
    extends Ptr<WasmV4.TransactionMetadatum>
    implements WasmContract.TransactionMetadatum
  {
    toBytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }

    kind(): Promise<number> {
      return Promise.resolve(this.wasm.kind())
    }

    asMap(): Promise<MetadataMap> {
      return Promise.resolve(new MetadataMap(this.wasm.as_map()))
    }

    asList(): Promise<MetadataList> {
      return Promise.resolve(new MetadataList(this.wasm.as_list()))
    }

    asInt(): Promise<Int> {
      return Promise.resolve(new Int(this.wasm.as_int()))
    }

    asBytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }

    asText(): Promise<string> {
      return Promise.resolve(this.wasm.as_text())
    }

    static fromBytes(bytes: Uint8Array): Promise<TransactionMetadatum> {
      return Promise.resolve(
        new TransactionMetadatum(WasmV4.TransactionMetadatum.from_bytes(bytes))
      )
    }

    static newMap(map: MetadataMap): Promise<TransactionMetadatum> {
      return Promise.resolve(
        new TransactionMetadatum(WasmV4.TransactionMetadatum.new_map(map.wasm))
      )
    }

    static newList(list: MetadataList): Promise<TransactionMetadatum> {
      return Promise.resolve(
        new TransactionMetadatum(
          WasmV4.TransactionMetadatum.new_list(list.wasm)
        )
      )
    }

    static newInt(int: Int): Promise<TransactionMetadatum> {
      return Promise.resolve(
        new TransactionMetadatum(WasmV4.TransactionMetadatum.new_int(int.wasm))
      )
    }

    static newBytes(bytes: Uint8Array): Promise<TransactionMetadatum> {
      return Promise.resolve(
        new TransactionMetadatum(WasmV4.TransactionMetadatum.new_bytes(bytes))
      )
    }

    static newText(text: string): Promise<TransactionMetadatum> {
      return Promise.resolve(
        new TransactionMetadatum(WasmV4.TransactionMetadatum.new_text(text))
      )
    }
  }

  export class AuxiliaryData
    extends Ptr<WasmV4.AuxiliaryData>
    implements WasmContract.AuxiliaryData
  {
    metadata(): Promise<GeneralTransactionMetadata> {
      const wasm = this.wasm.metadata()
      return Promise.resolve(new GeneralTransactionMetadata(wasm))
    }

    static new(metadata: GeneralTransactionMetadata): Promise<AuxiliaryData> {
      const wasm = WasmV4.AuxiliaryData.new()
      wasm.set_metadata(metadata.wasm)
      return Promise.resolve(new AuxiliaryData(wasm))
    }

    static empty(): Promise<AuxiliaryData> {
      return Promise.resolve(new AuxiliaryData(undefined))
    }
  }

  export class AssetName
    extends Ptr<WasmV4.AssetName>
    implements WasmContract.AssetName
  {
    toBytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }
    name(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.name())
    }

    static fromBytes(bytes: Uint8Array): Promise<AssetName> {
      return Promise.resolve(new AssetName(WasmV4.AssetName.from_bytes(bytes)))
    }

    static new(name: Uint8Array): Promise<AssetName> {
      return Promise.resolve(new AssetName(WasmV4.AssetName.new(name)))
    }
  }

  export class AssetNames
    extends Ptr<WasmV4.AssetNames>
    implements WasmContract.AssetNames
  {
    len(): Promise<number> {
      return Promise.resolve(this.wasm.len())
    }

    get(index: number): Promise<AssetName> {
      return Promise.resolve(new AssetName(this.wasm.get(index)))
    }

    add(item: AssetName): Promise<void> {
      return Promise.resolve(this.wasm.add(item.wasm))
    }

    static new(): Promise<AssetNames> {
      return Promise.resolve(new AssetNames(WasmV4.AssetNames.new()))
    }
  }

  export class Assets
    extends Ptr<WasmV4.Assets>
    implements WasmContract.Assets
  {
    len(): Promise<number> {
      return Promise.resolve(this.wasm.len())
    }

    insert(key: AssetName, value: BigNum): Promise<BigNum> {
      return Promise.resolve(new BigNum(this.wasm.insert(key.wasm, value.wasm)))
    }

    get(key: AssetName): Promise<BigNum> {
      return Promise.resolve(new BigNum(this.wasm.get(key.wasm)))
    }

    keys(): Promise<AssetNames> {
      return Promise.resolve(new AssetNames(this.wasm.keys()))
    }

    static new(): Promise<Assets> {
      return Promise.resolve(new Assets(WasmV4.Assets.new()))
    }
  }

  export class ScriptHash
    extends WasmProxy<WasmV4.ScriptHash>
    implements WasmContract.ScriptHash
  {
    toBytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }

    static fromBytes(bytes: Uint8Array): Promise<ScriptHash> {
      return Promise.resolve(
        new ScriptHash(WasmV4.ScriptHash.from_bytes(bytes))
      )
    }
  }

  export class ScriptHashes
    extends WasmProxy<WasmV4.ScriptHashes>
    implements WasmContract.ScriptHashes
  {
    toBytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }

    len(): Promise<number> {
      return Promise.resolve(this.wasm.len())
    }

    get(index: number): Promise<ScriptHash> {
      return Promise.resolve(new ScriptHash(this.wasm.get(index)))
    }

    add(item: ScriptHash): Promise<void> {
      return Promise.resolve(this.wasm.add(item.wasm))
    }

    static fromBytes(bytes: Uint8Array): Promise<ScriptHashes> {
      return Promise.resolve(
        new ScriptHashes(WasmV4.ScriptHashes.from_bytes(bytes))
      )
    }

    static new(): Promise<ScriptHashes> {
      return Promise.resolve(new ScriptHashes(WasmV4.ScriptHashes.new()))
    }
  }

  type PolicyID = ScriptHash

  type PolicyIDs = ScriptHashes

  export class MultiAsset
    extends Ptr<WasmV4.MultiAsset>
    implements WasmContract.MultiAsset
  {
    len(): Promise<number> {
      return Promise.resolve(this.wasm.len())
    }

    insert(key: PolicyID, value: Assets): Promise<Assets> {
      return Promise.resolve(new Assets(this.wasm.insert(key.wasm, value.wasm)))
    }

    get(key: PolicyID): Promise<Assets> {
      return Promise.resolve(new Assets(this.wasm.get(key.wasm)))
    }

    keys(): Promise<PolicyIDs> {
      return Promise.resolve(new ScriptHashes(this.wasm.keys()))
    }

    sub(rhs: MultiAsset): Promise<MultiAsset> {
      return Promise.resolve(new MultiAsset(this.wasm.sub(rhs.wasm)))
    }

    static new(): Promise<MultiAsset> {
      return Promise.resolve(new MultiAsset(WasmV4.MultiAsset.new()))
    }
  }

  export class Ed25519KeyHash
    extends Ptr<WasmV4.Ed25519KeyHash>
    implements WasmContract.Ed25519KeyHash
  {
    toBytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }

    static fromBytes(bytes: Uint8Array): Promise<Ed25519KeyHash> {
      return Promise.resolve(
        new Ed25519KeyHash(WasmV4.Ed25519KeyHash.from_bytes(bytes))
      )
    }
  }

  export class TransactionHash
    extends Ptr<WasmV4.TransactionHash>
    implements WasmContract.TransactionHash
  {
    toBytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }

    static fromBytes(bytes: Uint8Array): Promise<TransactionHash> {
      return Promise.resolve(
        new TransactionHash(WasmV4.TransactionHash.from_bytes(bytes))
      )
    }
  }

  export class TransactionInput
    extends Ptr<WasmV4.TransactionInput>
    implements WasmContract.TransactionInput
  {
    toBytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }

    transactionId(): Promise<TransactionHash> {
      return Promise.resolve(new TransactionHash(this.wasm.transaction_id()))
    }

    index(): Promise<number> {
      return Promise.resolve(this.wasm.index())
    }

    static new(
      transactionId: TransactionHash,
      index: number
    ): Promise<TransactionInput> {
      return Promise.resolve(
        new TransactionInput(
          WasmV4.TransactionInput.new(transactionId.wasm, index)
        )
      )
    }

    static fromBytes(bytes: Uint8Array): Promise<TransactionInput> {
      return Promise.resolve(
        new TransactionInput(WasmV4.TransactionInput.from_bytes(bytes))
      )
    }
  }

  export class Value extends Ptr<WasmV4.Value> implements WasmContract.Value {
    coin(): Promise<BigNum> {
      return Promise.resolve(new BigNum(this.wasm.coin()))
    }

    setCoin(coin: BigNum): Promise<void> {
      return Promise.resolve(this.wasm.set_coin(coin.wasm))
    }

    multiasset(): Promise<MultiAsset> {
      return Promise.resolve(new MultiAsset(this.wasm.multiasset()))
    }

    setMultiasset(multiasset: MultiAsset): Promise<void> {
      return Promise.resolve(this.wasm.set_multiasset(multiasset.wasm))
    }

    checkedAdd(rhs: Value): Promise<Value> {
      return Promise.resolve(new Value(this.wasm.checked_add(rhs.wasm)))
    }

    checkedSub(rhs: Value): Promise<Value> {
      return Promise.resolve(new Value(this.wasm.checked_sub(rhs.wasm)))
    }

    clampedSub(rhs: Value): Promise<Value> {
      return Promise.resolve(new Value(this.wasm.clamped_sub(rhs.wasm)))
    }

    compare(rhs: Value): Promise<number | undefined> {
      return Promise.resolve(this.wasm.compare(rhs.wasm))
    }

    static new(coin: BigNum): Promise<Value> {
      return Promise.resolve(new Value(WasmV4.Value.new(coin.wasm)))
    }
  }

  export class Address
    extends Ptr<WasmV4.Address>
    implements WasmContract.Address
  {
    toBytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }

    toBech32(prefix?: string): Promise<string> {
      return Promise.resolve(this.wasm.to_bech32(prefix))
    }

    networkId(): Promise<number> {
      return Promise.resolve(this.wasm.network_id())
    }

    static fromBytes(bytes: Uint8Array): Promise<Address> {
      return Promise.resolve(new Address(WasmV4.Address.from_bytes(bytes)))
    }

    static fromBech32(string: string): Promise<Address> {
      return Promise.resolve(new Address(WasmV4.Address.from_bech32(string)))
    }
  }

  export class PublicKey
    extends Ptr<WasmV4.PublicKey>
    implements WasmContract.PublicKey
  {
    toBech32(): Promise<string> {
      return Promise.resolve(this.wasm.to_bech32())
    }

    asBytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.as_bytes())
    }

    hash(): Promise<Ed25519KeyHash> {
      return Promise.resolve(new Ed25519KeyHash(this.wasm.hash()))
    }

    static fromBech32(bech32_str: string): Promise<PublicKey> {
      return Promise.resolve(
        new PublicKey(WasmV4.PublicKey.from_bech32(bech32_str))
      )
    }

    static fromBytes(bytes: Uint8Array): Promise<PublicKey> {
      return Promise.resolve(new PublicKey(WasmV4.PublicKey.from_bytes(bytes)))
    }
  }

  export class Bip32PublicKey
    extends Ptr<WasmV4.Bip32PublicKey>
    implements WasmContract.Bip32PublicKey
  {
    derive(index: number): Promise<Bip32PublicKey> {
      return Promise.resolve(new Bip32PublicKey(this.wasm.derive(index)))
    }

    toRawKey(): Promise<PublicKey> {
      return Promise.resolve(new PublicKey(this.wasm.to_raw_key()))
    }

    asBytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.as_bytes())
    }

    toBech32(): Promise<string> {
      return Promise.resolve(this.wasm.to_bech32())
    }

    chaincode(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.chaincode())
    }

    static fromBech32(bech32_str: string): Promise<Bip32PublicKey> {
      return Promise.resolve(
        new Bip32PublicKey(WasmV4.Bip32PublicKey.from_bech32(bech32_str))
      )
    }

    static fromBytes(bytes: Uint8Array): Promise<Bip32PublicKey> {
      return Promise.resolve(
        new Bip32PublicKey(WasmV4.Bip32PublicKey.from_bytes(bytes))
      )
    }
  }

  export class PrivateKey
    extends Ptr<WasmV4.PrivateKey>
    implements WasmContract.PrivateKey
  {
    toPublic(): Promise<PublicKey> {
      return Promise.resolve(new PublicKey(this.wasm.to_public()))
    }

    asBytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.as_bytes())
    }

    sign(message: Uint8Array): Promise<Ed25519Signature> {
      return Promise.resolve(new Ed25519Signature(this.wasm.sign(message)))
    }

    static fromExtendedBytes(bytes: Uint8Array): Promise<PrivateKey> {
      return Promise.resolve(
        new PrivateKey(WasmV4.PrivateKey.from_extended_bytes(bytes))
      )
    }

    static fromNormalBytes(bytes: Uint8Array): Promise<PrivateKey> {
      return Promise.resolve(
        new PrivateKey(WasmV4.PrivateKey.from_normal_bytes(bytes))
      )
    }
  }

  export class Bip32PrivateKey
    extends Ptr<WasmV4.Bip32PrivateKey>
    implements WasmContract.Bip32PrivateKey
  {
    derive(index: number): Promise<Bip32PrivateKey> {
      return Promise.resolve(new Bip32PrivateKey(this.wasm.derive(index)))
    }

    toRawKey(): Promise<PrivateKey> {
      return Promise.resolve(new PrivateKey(this.wasm.to_raw_key()))
    }

    toPublic(): Promise<Bip32PublicKey> {
      return Promise.resolve(new Bip32PublicKey(this.wasm.to_public()))
    }

    asBytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.as_bytes())
    }

    toBech32(): Promise<string> {
      return Promise.resolve(this.wasm.to_bech32())
    }

    static fromBip39Entropy(
      entropy: Uint8Array,
      password: Uint8Array
    ): Promise<Bip32PrivateKey> {
      return Promise.resolve(
        new Bip32PrivateKey(
          WasmV4.Bip32PrivateKey.from_bip39_entropy(entropy, password)
        )
      )
    }

    static fromBech32(bech32Str: string): Promise<Bip32PrivateKey> {
      return Promise.resolve(
        new Bip32PrivateKey(WasmV4.Bip32PrivateKey.from_bech32(bech32Str))
      )
    }

    static fromBytes(bytes: Uint8Array): Promise<Bip32PrivateKey> {
      return Promise.resolve(
        new Bip32PrivateKey(WasmV4.Bip32PrivateKey.from_bytes(bytes))
      )
    }

    static generateEd25519Bip32(): Promise<Bip32PrivateKey> {
      return Promise.resolve(
        new Bip32PrivateKey(WasmV4.Bip32PrivateKey.generate_ed25519_bip32())
      )
    }
  }

  export class ByronAddress
    extends Ptr<WasmV4.ByronAddress>
    implements WasmContract.ByronAddress
  {
    toBase58(): Promise<string> {
      return Promise.resolve(this.wasm.to_base58())
    }

    toAddress(): Promise<Address> {
      return Promise.resolve(new Address(this.wasm.to_address()))
    }

    byronProtocolMagic(): Promise<number> {
      return Promise.resolve(this.wasm.byron_protocol_magic())
    }

    attributes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.attributes())
    }

    static icarusFromKey(
      key: Bip32PublicKey,
      protocolMagic: number
    ): Promise<ByronAddress> {
      return Promise.resolve(
        new ByronAddress(
          WasmV4.ByronAddress.icarus_from_key(key.wasm, protocolMagic)
        )
      )
    }

    static fromBase58(string: string): Promise<ByronAddress> {
      return Promise.resolve(
        new ByronAddress(WasmV4.ByronAddress.from_base58(string))
      )
    }

    static isValid(string: string): Promise<boolean> {
      return Promise.resolve(WasmV4.ByronAddress.is_valid(string))
    }

    static fromAddress(addr: Address): Promise<ByronAddress> {
      return Promise.resolve(
        new ByronAddress(WasmV4.ByronAddress.from_address(addr.wasm))
      )
    }
  }

  export class TransactionOutput
    extends Ptr<WasmV4.TransactionOutput>
    implements WasmContract.TransactionOutput
  {
    toBytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }

    address(): Promise<Address> {
      return Promise.resolve(new Address(this.wasm.address()))
    }

    amount(): Promise<Value> {
      return Promise.resolve(new Value(this.wasm.amount()))
    }

    static fromBytes(bytes: Uint8Array): Promise<TransactionOutput> {
      return Promise.resolve(
        new TransactionOutput(WasmV4.TransactionOutput.from_bytes(bytes))
      )
    }

    static new(address: Address, amount: Value): Promise<TransactionOutput> {
      return Promise.resolve(
        new TransactionOutput(
          WasmV4.TransactionOutput.new(address.wasm, amount.wasm)
        )
      )
    }
  }

  export class StakeCredential
    extends Ptr<WasmV4.StakeCredential>
    implements WasmContract.StakeCredential
  {
    toBytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }

    toKeyhash(): Promise<Ed25519KeyHash> {
      return Promise.resolve(new Ed25519KeyHash(this.wasm.to_keyhash()))
    }

    toScripthash(): Promise<ScriptHash> {
      return Promise.resolve(new ScriptHash(this.wasm.to_scripthash()))
    }

    kind(): Promise<number> {
      return Promise.resolve(this.wasm.kind())
    }

    static fromBytes(bytes: Uint8Array): Promise<StakeCredential> {
      return Promise.resolve(
        new StakeCredential(WasmV4.StakeCredential.from_bytes(bytes))
      )
    }

    static fromKeyhash(hash: Ed25519KeyHash): Promise<StakeCredential> {
      return Promise.resolve(
        new StakeCredential(WasmV4.StakeCredential.from_keyhash(hash.wasm))
      )
    }

    static fromScripthash(hash: ScriptHash): Promise<StakeCredential> {
      return Promise.resolve(
        new StakeCredential(WasmV4.StakeCredential.from_scripthash(hash.wasm))
      )
    }
  }

  export class StakeRegistration
    extends Ptr<WasmV4.StakeRegistration>
    implements WasmContract.StakeRegistration
  {
    toBytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }

    stakeCredential(): Promise<StakeCredential> {
      return Promise.resolve(new StakeCredential(this.wasm.stake_credential()))
    }

    static new(stakeCredential: StakeCredential): Promise<StakeRegistration> {
      return Promise.resolve(
        new StakeRegistration(
          WasmV4.StakeRegistration.new(stakeCredential.wasm)
        )
      )
    }

    static fromBytes(bytes: Uint8Array): Promise<StakeRegistration> {
      return Promise.resolve(
        new StakeRegistration(WasmV4.StakeRegistration.from_bytes(bytes))
      )
    }
  }

  export class StakeDeregistration
    extends Ptr<WasmV4.StakeDeregistration>
    implements WasmContract.StakeDeregistration
  {
    toBytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }

    stakeCredential(): Promise<StakeCredential> {
      return Promise.resolve(new StakeCredential(this.wasm.stake_credential()))
    }

    static new(stakeCredential: StakeCredential): Promise<StakeDeregistration> {
      return Promise.resolve(
        new StakeDeregistration(
          WasmV4.StakeDeregistration.new(stakeCredential.wasm)
        )
      )
    }

    static fromBytes(bytes: Uint8Array): Promise<StakeDeregistration> {
      return Promise.resolve(
        new StakeDeregistration(WasmV4.StakeDeregistration.from_bytes(bytes))
      )
    }
  }

  export class StakeDelegation
    extends Ptr<WasmV4.StakeDelegation>
    implements WasmContract.StakeDelegation
  {
    toBytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }

    stakeCredential(): Promise<StakeCredential> {
      return Promise.resolve(new StakeCredential(this.wasm.stake_credential()))
    }

    poolKeyhash(): Promise<Ed25519KeyHash> {
      return Promise.resolve(new Ed25519KeyHash(this.wasm.pool_keyhash()))
    }

    static new(
      stakeCredential: StakeCredential,
      poolKeyHash: Ed25519KeyHash
    ): Promise<StakeDelegation> {
      return Promise.resolve(
        new StakeDelegation(
          WasmV4.StakeDelegation.new(stakeCredential.wasm, poolKeyHash.wasm)
        )
      )
    }

    static fromBytes(bytes: Uint8Array): Promise<StakeDelegation> {
      return Promise.resolve(
        new StakeDelegation(WasmV4.StakeDelegation.from_bytes(bytes))
      )
    }
  }

  export class Certificate
    extends Ptr<WasmV4.Certificate>
    implements WasmContract.Certificate
  {
    toBytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }

    asStakeRegistration(): Promise<StakeRegistration> {
      return Promise.resolve(
        new StakeRegistration(this.wasm.as_stake_registration())
      )
    }

    asStakeDeregistration(): Promise<StakeDeregistration> {
      return Promise.resolve(
        new StakeDeregistration(this.wasm.as_stake_deregistration())
      )
    }

    asStakeDelegation(): Promise<StakeDelegation> {
      return Promise.resolve(
        new StakeDelegation(this.wasm.as_stake_delegation())
      )
    }

    static fromBytes(bytes: Uint8Array): Promise<Certificate> {
      return Promise.resolve(
        new Certificate(WasmV4.Certificate.from_bytes(bytes))
      )
    }

    static newStakeRegistration(
      stakeRegistration: StakeRegistration
    ): Promise<Certificate> {
      return Promise.resolve(
        new Certificate(
          WasmV4.Certificate.new_stake_registration(stakeRegistration.wasm)
        )
      )
    }

    static newStakeDeregistration(
      stakeDeregistration: StakeDeregistration
    ): Promise<Certificate> {
      return Promise.resolve(
        new Certificate(
          WasmV4.Certificate.new_stake_deregistration(stakeDeregistration.wasm)
        )
      )
    }

    static newStakeDelegation(
      stakeDelegation: StakeDelegation
    ): Promise<Certificate> {
      return Promise.resolve(
        new Certificate(
          WasmV4.Certificate.new_stake_delegation(stakeDelegation.wasm)
        )
      )
    }
  }

  export class Certificates
    extends Ptr<WasmV4.Certificates>
    implements WasmContract.Certificates
  {
    toBytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }

    len(): Promise<number> {
      return Promise.resolve(this.wasm.len())
    }

    get(index: number): Promise<Certificate> {
      return Promise.resolve(new Certificate(this.wasm.get(index)))
    }

    add(item: Certificate): Promise<void> {
      return Promise.resolve(this.wasm.add(item.wasm))
    }

    static fromBytes(bytes: Uint8Array): Promise<Certificates> {
      return Promise.resolve(
        new Certificates(WasmV4.Certificates.from_bytes(bytes))
      )
    }

    static new(): Promise<Certificates> {
      return Promise.resolve(new Certificates(WasmV4.Certificates.new()))
    }
  }

  export class RewardAddress
    extends Ptr<WasmV4.RewardAddress>
    implements WasmContract.RewardAddress
  {
    paymentCred(): Promise<StakeCredential> {
      return Promise.resolve(new StakeCredential(this.wasm.payment_cred()))
    }

    toAddress(): Promise<Address> {
      return Promise.resolve(new Address(this.wasm.to_address()))
    }

    static fromAddress(addr: Address): Promise<RewardAddress> {
      return Promise.resolve(
        new RewardAddress(WasmV4.RewardAddress.from_address(addr.wasm))
      )
    }

    static new(
      network: number,
      payment: StakeCredential
    ): Promise<RewardAddress> {
      return Promise.resolve(
        new RewardAddress(WasmV4.RewardAddress.new(network, payment.wasm))
      )
    }
  }

  export class RewardAddresses
    extends Ptr<WasmV4.RewardAddresses>
    implements WasmContract.RewardAddresses
  {
    len(): Promise<number> {
      return Promise.resolve(this.wasm.len())
    }

    get(index: number): Promise<RewardAddress> {
      return Promise.resolve(new RewardAddress(this.wasm.get(index)))
    }

    add(item: RewardAddress): Promise<void> {
      return Promise.resolve(this.wasm.add(item.wasm))
    }

    static new(): Promise<RewardAddresses> {
      return Promise.resolve(new RewardAddresses(WasmV4.RewardAddresses.new()))
    }
  }

  export class Withdrawals
    extends Ptr<WasmV4.Withdrawals>
    implements WasmContract.Withdrawals
  {
    len(): Promise<number> {
      return Promise.resolve(this.wasm.len())
    }

    insert(key: RewardAddress, value: BigNum): Promise<BigNum> {
      return Promise.resolve(new BigNum(this.wasm.insert(key.wasm, value.wasm)))
    }

    get(key: RewardAddress): Promise<BigNum> {
      return Promise.resolve(new BigNum(this.wasm.get(key.wasm)))
    }

    keys(): Promise<RewardAddresses> {
      return Promise.resolve(new RewardAddresses(this.wasm.keys()))
    }

    static new(): Promise<Withdrawals> {
      return Promise.resolve(new Withdrawals(WasmV4.Withdrawals.new()))
    }
  }

  export class TransactionInputs
    extends Ptr<WasmV4.TransactionInputs>
    implements WasmContract.TransactionInputs
  {
    len(): Promise<number> {
      return Promise.resolve(this.wasm.len())
    }

    get(index: number): Promise<TransactionInput> {
      return Promise.resolve(new TransactionInput(this.wasm.get(index)))
    }
  }

  export class TransactionOutputs
    extends Ptr<WasmV4.TransactionOutputs>
    implements WasmContract.TransactionOutputs
  {
    len(): Promise<number> {
      return Promise.resolve(this.wasm.len())
    }

    get(index: number): Promise<TransactionOutput> {
      return Promise.resolve(new TransactionOutput(this.wasm.get(index)))
    }
  }

  export type Optional<T> = T

  export class TransactionBody
    extends Ptr<WasmV4.TransactionBody>
    implements WasmContract.TransactionBody
  {
    toBytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }

    inputs(): Promise<TransactionInputs> {
      return Promise.resolve(new TransactionInputs(this.wasm.inputs()))
    }

    outputs(): Promise<TransactionOutputs> {
      return Promise.resolve(new TransactionOutputs(this.wasm.outputs()))
    }

    fee(): Promise<BigNum> {
      return Promise.resolve(new BigNum(this.wasm.fee()))
    }

    ttl(): Promise<Optional<number | undefined>> {
      return Promise.resolve(this.wasm.ttl())
    }

    certs(): Promise<Certificates> {
      return Promise.resolve(new Certificates(this.wasm.certs()))
    }

    withdrawals(): Promise<Withdrawals> {
      return Promise.resolve(new Withdrawals(this.wasm.withdrawals()))
    }

    static fromBytes(bytes: Uint8Array): Promise<TransactionBody> {
      return Promise.resolve(
        new TransactionBody(WasmV4.TransactionBody.from_bytes(bytes))
      )
    }
  }

  export class TransactionBuilder
    extends Ptr<WasmV4.TransactionBuilder>
    implements WasmContract.TransactionBuilder
  {
    addKeyInput(
      hash: Ed25519KeyHash,
      input: TransactionInput,
      amount: Value
    ): Promise<void> {
      return Promise.resolve(
        this.wasm.add_key_input(hash.wasm, input.wasm, amount.wasm)
      )
    }

    addBootstrapInput(
      hash: ByronAddress,
      input: TransactionInput,
      amount: Value
    ): Promise<void> {
      return Promise.resolve(
        this.wasm.add_bootstrap_input(hash.wasm, input.wasm, amount.wasm)
      )
    }

    addInput(
      address: Address,
      input: TransactionInput,
      amount: Value
    ): Promise<void> {
      return Promise.resolve(
        this.wasm.add_input(address.wasm, input.wasm, amount.wasm)
      )
    }

    feeForInput(
      address: Address,
      input: TransactionInput,
      amount: Value
    ): Promise<BigNum> {
      return Promise.resolve(
        new BigNum(
          this.wasm.fee_for_input(address.wasm, input.wasm, amount.wasm)
        )
      )
    }

    addOutput(output: TransactionOutput): Promise<void> {
      return Promise.resolve(this.wasm.add_output(output.wasm))
    }

    feeForOutput(output: TransactionOutput): Promise<BigNum> {
      return Promise.resolve(new BigNum(this.wasm.fee_for_output(output.wasm)))
    }

    setFee(fee: BigNum): Promise<void> {
      return Promise.resolve(this.wasm.set_fee(fee.wasm))
    }

    setTtl(ttl: number): Promise<void> {
      return Promise.resolve(this.wasm.set_ttl(ttl))
    }

    setValidityStartInterval(validityStartInterval: number): Promise<void> {
      return Promise.resolve(
        this.wasm.set_validity_start_interval(validityStartInterval)
      )
    }

    setCerts(certs: Certificates): Promise<void> {
      return Promise.resolve(this.wasm.set_certs(certs.wasm))
    }

    setWithdrawals(withdrawals: Withdrawals): Promise<void> {
      return Promise.resolve(this.wasm.set_withdrawals(withdrawals.wasm))
    }

    setAuxiliaryData(auxiliary: AuxiliaryData): Promise<void> {
      return Promise.resolve(this.wasm.set_auxiliary_data(auxiliary.wasm))
    }

    getExplicitInput(): Promise<Value> {
      return Promise.resolve(new Value(this.wasm.get_explicit_input()))
    }

    getImplicitInput(): Promise<Value> {
      return Promise.resolve(new Value(this.wasm.get_implicit_input()))
    }

    getExplicitOutput(): Promise<Value> {
      return Promise.resolve(new Value(this.wasm.get_explicit_output()))
    }

    getDeposit(): Promise<BigNum> {
      return Promise.resolve(new BigNum(this.wasm.get_deposit()))
    }

    getFeeIfSet(): Promise<BigNum> {
      return Promise.resolve(new BigNum(this.wasm.get_fee_if_set()))
    }

    addChangeIfNeeded(address: Address): Promise<boolean> {
      return Promise.resolve(this.wasm.add_change_if_needed(address.wasm))
    }

    build(): Promise<TransactionBody> {
      return Promise.resolve(new TransactionBody(this.wasm.build()))
    }

    minFee(): Promise<BigNum> {
      return Promise.resolve(new BigNum(this.wasm.min_fee()))
    }

    static new(
      linearFee: LinearFee,
      minimumUtxoVal: BigNum,
      poolDeposit: BigNum,
      keyDeposit: BigNum
    ): Promise<TransactionBuilder> {
      return Promise.resolve(
        new TransactionBuilder(
          WasmV4.TransactionBuilder.new(
            linearFee.wasm,
            minimumUtxoVal.wasm,
            poolDeposit.wasm,
            keyDeposit.wasm,
            5000,
            16384
          )
        )
      )
    }
  }

  export class BaseAddress
    extends Ptr<WasmV4.BaseAddress>
    implements WasmContract.BaseAddress
  {
    paymentCred(): Promise<StakeCredential> {
      return Promise.resolve(new StakeCredential(this.wasm.payment_cred()))
    }

    stakeCred(): Promise<StakeCredential> {
      return Promise.resolve(new StakeCredential(this.wasm.stake_cred()))
    }

    toAddress(): Promise<Address> {
      return Promise.resolve(new Address(this.wasm.to_address()))
    }

    static fromAddress(addr: Address): Promise<BaseAddress> {
      return Promise.resolve(
        new BaseAddress(WasmV4.BaseAddress.from_address(addr.wasm))
      )
    }

    static new(
      network: number,
      payment: StakeCredential,
      stake: StakeCredential
    ): Promise<BaseAddress> {
      return Promise.resolve(
        new BaseAddress(
          WasmV4.BaseAddress.new(network, payment.wasm, stake.wasm)
        )
      )
    }
  }

  export class PointerAddress
    extends Ptr<WasmV4.PointerAddress>
    implements WasmContract.PointerAddress
  {
    paymentCred(): Promise<StakeCredential> {
      return Promise.resolve(new StakeCredential(this.wasm.payment_cred()))
    }

    stakePointer(): Promise<Pointer> {
      return Promise.resolve(new Pointer(this.wasm.stake_pointer()))
    }

    toAddress(): Promise<Address> {
      return Promise.resolve(new Address(this.wasm.to_address()))
    }

    static fromAddress(addr: Address): Promise<PointerAddress> {
      return Promise.resolve(
        new PointerAddress(WasmV4.PointerAddress.from_address(addr.wasm))
      )
    }

    static new(
      network: number,
      payment: StakeCredential,
      stake: Pointer
    ): Promise<PointerAddress> {
      return Promise.resolve(
        new PointerAddress(
          WasmV4.PointerAddress.new(network, payment.wasm, stake.wasm)
        )
      )
    }
  }

  export class EnterpriseAddress
    extends Ptr<WasmV4.EnterpriseAddress>
    implements WasmContract.EnterpriseAddress
  {
    paymentCred(): Promise<StakeCredential> {
      return Promise.resolve(new StakeCredential(this.wasm.payment_cred()))
    }

    toAddress(): Promise<Address> {
      return Promise.resolve(new Address(this.wasm.to_address()))
    }

    static fromAddress(addr: Address): Promise<EnterpriseAddress> {
      return Promise.resolve(
        new EnterpriseAddress(WasmV4.EnterpriseAddress.from_address(addr.wasm))
      )
    }

    static new(
      network: number,
      payment: StakeCredential
    ): Promise<EnterpriseAddress> {
      return Promise.resolve(
        new EnterpriseAddress(
          WasmV4.EnterpriseAddress.new(network, payment.wasm)
        )
      )
    }
  }

  export class Pointer
    extends Ptr<WasmV4.Pointer>
    implements WasmContract.Pointer
  {
    slot(): Promise<number> {
      return Promise.resolve(this.wasm.slot())
    }

    txIndex(): Promise<number> {
      return Promise.resolve(this.wasm.tx_index())
    }

    certIndex(): Promise<number> {
      return Promise.resolve(this.wasm.cert_index())
    }

    static new(
      slot: number,
      txIndex: number,
      certIndex: number
    ): Promise<Pointer> {
      return Promise.resolve(
        new Pointer(WasmV4.Pointer.new(slot, txIndex, certIndex))
      )
    }
  }

  // witnesses things

  export class Vkey extends Ptr<WasmV4.Vkey> implements WasmContract.Vkey {
    static new(pk: PublicKey): Promise<Vkey> {
      return Promise.resolve(new Vkey(WasmV4.Vkey.new(pk.wasm)))
    }
  }

  export class Ed25519Signature
    extends Ptr<WasmV4.Ed25519Signature>
    implements WasmContract.Ed25519Signature
  {
    toBytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }

    toHex(): Promise<string> {
      return Promise.resolve(this.wasm.to_hex())
    }

    static fromBytes(bytes: Uint8Array): Promise<Ed25519Signature> {
      return Promise.resolve(
        new Ed25519Signature(WasmV4.Ed25519Signature.from_bytes(bytes))
      )
    }
  }

  export class Vkeywitness
    extends Ptr<WasmV4.Vkeywitness>
    implements WasmContract.Vkeywitness
  {
    toBytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }

    signature(): Promise<Ed25519Signature> {
      return Promise.resolve(new Ed25519Signature(this.wasm.signature()))
    }

    static fromBytes(bytes: Uint8Array): Promise<Vkeywitness> {
      return Promise.resolve(
        new Vkeywitness(WasmV4.Vkeywitness.from_bytes(bytes))
      )
    }

    static new(vkey: Vkey, signature: Ed25519Signature): Promise<Vkeywitness> {
      return Promise.resolve(
        new Vkeywitness(WasmV4.Vkeywitness.new(vkey.wasm, signature.wasm))
      )
    }
  }

  export class Vkeywitnesses
    extends Ptr<WasmV4.Vkeywitnesses>
    implements WasmContract.Vkeywitnesses
  {
    len(): Promise<number> {
      return Promise.resolve(this.wasm.len())
    }

    add(item: Vkeywitness): Promise<void> {
      return Promise.resolve(this.wasm.add(item.wasm))
    }

    static new(): Promise<Vkeywitnesses> {
      return Promise.resolve(new Vkeywitnesses(WasmV4.Vkeywitnesses.new()))
    }
  }

  export class BootstrapWitness
    extends Ptr<WasmV4.BootstrapWitness>
    implements WasmContract.BootstrapWitness
  {
    toBytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }

    static fromBytes(bytes: Uint8Array): Promise<BootstrapWitness> {
      return Promise.resolve(
        new BootstrapWitness(WasmV4.BootstrapWitness.from_bytes(bytes))
      )
    }

    static new(
      vkey: Vkey,
      signature: Ed25519Signature,
      chainCode: Uint8Array,
      attributes: Uint8Array
    ): Promise<BootstrapWitness> {
      return Promise.resolve(
        new BootstrapWitness(
          WasmV4.BootstrapWitness.new(
            vkey.wasm,
            signature.wasm,
            chainCode,
            attributes
          )
        )
      )
    }
  }

  export class BootstrapWitnesses
    extends Ptr<WasmV4.BootstrapWitnesses>
    implements WasmContract.BootstrapWitnesses
  {
    len(): Promise<number> {
      return Promise.resolve(this.wasm.len())
    }

    add(item: BootstrapWitness): Promise<void> {
      return Promise.resolve(this.wasm.add(item.wasm))
    }

    static new(): Promise<BootstrapWitnesses> {
      return Promise.resolve(
        new BootstrapWitnesses(WasmV4.BootstrapWitnesses.new())
      )
    }
  }

  export class TransactionWitnessSet
    extends Ptr<WasmV4.TransactionWitnessSet>
    implements WasmContract.TransactionWitnessSet
  {
    setBootstraps(bootstraps: BootstrapWitnesses): Promise<void> {
      return Promise.resolve(this.wasm.set_bootstraps(bootstraps.wasm))
    }

    setVkeys(vkeywitnesses: Vkeywitnesses): Promise<void> {
      return Promise.resolve(this.wasm.set_vkeys(vkeywitnesses.wasm))
    }

    static new(): Promise<TransactionWitnessSet> {
      return Promise.resolve(
        new TransactionWitnessSet(WasmV4.TransactionWitnessSet.new())
      )
    }
  }

  export class Transaction
    extends Ptr<WasmV4.Transaction>
    implements WasmContract.Transaction
  {
    body(): Promise<TransactionBody> {
      return Promise.resolve(new TransactionBody(this.wasm.body()))
    }

    toBytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }

    static new(
      body: TransactionBody,
      witnessSet: TransactionWitnessSet,
      auxiliary: AuxiliaryData
    ): Promise<Transaction> {
      return Promise.resolve(
        new Transaction(
          WasmV4.Transaction.new(
            body.wasm,
            witnessSet.wasm,
            auxiliary.internalWasm
          )
        )
      )
    }

    static fromBytes(bytes: Uint8Array): Promise<Transaction> {
      return Promise.resolve(
        new Transaction(WasmV4.Transaction.from_bytes(bytes))
      )
    }
  }

  export class NetworkInfo
    extends Ptr<WasmV4.NetworkInfo>
    implements WasmContract.NetworkInfo
  {
    networkId(): Promise<number> {
      return Promise.resolve(this.wasm.network_id())
    }

    protocolMagic(): Promise<number> {
      return Promise.resolve(this.wasm.protocol_magic())
    }

    static new(networkId: number, protocolMagic: number): Promise<NetworkInfo> {
      return Promise.resolve(
        new NetworkInfo(WasmV4.NetworkInfo.new(networkId, protocolMagic))
      )
    }

    static testnet(): Promise<NetworkInfo> {
      return Promise.resolve(new NetworkInfo(WasmV4.NetworkInfo.testnet()))
    }

    static mainnet(): Promise<NetworkInfo> {
      return Promise.resolve(new NetworkInfo(WasmV4.NetworkInfo.mainnet()))
    }
  }

  export class MetadataList
    extends Ptr<WasmV4.MetadataList>
    implements WasmContract.MetadataList
  {
    static new(): Promise<MetadataList> {
      return Promise.resolve(new MetadataList(WasmV4.MetadataList.new()))
    }

    static fromBytes(bytes: Uint8Array): Promise<MetadataList> {
      return Promise.resolve(
        new MetadataList(WasmV4.MetadataList.from_bytes(bytes))
      )
    }

    len(): Promise<number> {
      return Promise.resolve(this.wasm.len())
    }

    get(index: number): Promise<TransactionMetadatum> {
      return Promise.resolve(new TransactionMetadatum(this.wasm.get(index)))
    }

    add(item: TransactionMetadatum): Promise<void> {
      return Promise.resolve(this.wasm.add(item.wasm))
    }

    toBytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }
  }
}
