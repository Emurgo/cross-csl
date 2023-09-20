// this file contains several "abstract static" methods.
// This is not an actual feature of TS, but we define the static methods in the abstract classes
// and simply override them in the implementations so they can be exposed in the namespace,
// so essentially these static methods work as some sort of "loose" contract.
// This means we will have several warnings here related to unsed vars, and that's why we disable
// them for the whole file.
// Please don't use this as an excuse to start supressing warnings around, be really mindful
// of what you supress. In this case, it makes perfect sense, because this is essentially
// just a file with a bunch of contracts with no actual logic.
/* eslint-disable @typescript-eslint/no-unused-vars */
export const EXCEPTIONS = {
  NOT_IMPLEMENTED: 'not implemented',
  SHOULD_BE_OVERWRITTEN: 'should be overwritten by implementations'
};

export interface WasmModuleProxy {
  encryptWithPassword(
    password: string,
    salt: string,
    nonce: string,
    data: string
  ): Promise<string>
  decryptWithPassword(password: string, data: string): Promise<string>
  encodeJsonStrToMetadatum(
    json: string,
    schema: number
  ): Promise<TransactionMetadatum>
  minAdaRequired(
    value: Value,
    hasDataHash: boolean,
    coinsPerUtxoWord: BigNum
  ): Promise<BigNum>
  minAdaForOutput(
    output: TransactionOutput,
    dataCost: DataCost
  ): Promise<BigNum>
  hashTransaction(txBody: TransactionBody): Promise<TransactionHash>
  hashPlutusData(plutusData: PlutusData): Promise<DataHash>
  hashScriptData(
    redeemers: Redeemers,
    costModels: Costmdls,
    datums?: PlutusList
  ): Promise<ScriptDataHash>
  makeVkeyWitness(
    txBodyHash: TransactionHash,
    sk: PrivateKey
  ): Promise<Vkeywitness>
  makeIcarusBootstrapWitness(
    txBodyHash: TransactionHash,
    addr: ByronAddress,
    key: Bip32PrivateKey
  ): Promise<BootstrapWitness>
  decodeMetadatumToJsonStr(
    metadatum: TransactionMetadatum,
    schema: number
  ): Promise<string>
  BigNum: typeof BigNum
  LinearFee: typeof LinearFee
  GeneralTransactionMetadata: typeof GeneralTransactionMetadata
  TransactionMetadatum: typeof TransactionMetadatum
  AuxiliaryData: typeof AuxiliaryData
  AssetName: typeof AssetName
  AssetNames: typeof AssetNames
  Assets: typeof Assets
  ScriptHash: typeof ScriptHash
  ScriptHashes: typeof ScriptHashes
  MultiAsset: typeof MultiAsset
  Ed25519KeyHash: typeof Ed25519KeyHash
  TransactionHash: typeof TransactionHash
  TransactionInput: typeof TransactionInput
  Value: typeof Value
  Address: typeof Address
  PublicKey: typeof PublicKey
  Bip32PublicKey: typeof Bip32PublicKey
  PrivateKey: typeof PrivateKey
  Bip32PrivateKey: typeof Bip32PrivateKey
  ByronAddress: typeof ByronAddress
  TransactionOutput: typeof TransactionOutput
  DataHash: typeof DataHash
  PlutusData: typeof PlutusData
  PlutusList: typeof PlutusList
  Redeemer: typeof Redeemer
  RedeemerTag: typeof RedeemerTag
  ExUnits: typeof ExUnits
  Redeemers: typeof Redeemers
  CostModel: typeof CostModel
  Costmdls: typeof Costmdls
  Language: typeof Language
  Languages: typeof Languages
  ScriptDataHash: typeof ScriptDataHash
  StakeCredential: typeof StakeCredential
  StakeRegistration: typeof StakeRegistration
  StakeDeregistration: typeof StakeDeregistration
  StakeDelegation: typeof StakeDelegation
  Certificate: typeof Certificate
  Certificates: typeof Certificates
  RewardAddress: typeof RewardAddress
  RewardAddresses: typeof RewardAddresses
  Withdrawals: typeof Withdrawals
  TransactionInputs: typeof TransactionInputs
  TransactionOutputs: typeof TransactionOutputs
  TransactionBody: typeof TransactionBody
  TransactionBuilder: typeof TransactionBuilder
  BaseAddress: typeof BaseAddress
  PointerAddress: typeof PointerAddress
  EnterpriseAddress: typeof EnterpriseAddress
  Pointer: typeof Pointer
  Vkey: typeof Vkey
  Ed25519Signature: typeof Ed25519Signature
  Vkeywitness: typeof Vkeywitness
  Vkeywitnesses: typeof Vkeywitnesses
  BootstrapWitness: typeof BootstrapWitness
  BootstrapWitnesses: typeof BootstrapWitnesses
  TransactionWitnessSet: typeof TransactionWitnessSet
  Transaction: typeof Transaction
  NetworkInfo: typeof NetworkInfo
  MetadataList: typeof MetadataList
  TransactionMetadatumLabels: typeof TransactionMetadatumLabels
  MetadataMap: typeof MetadataMap
  Int: typeof Int
  NativeScript: typeof NativeScript
  NativeScripts: typeof NativeScripts
  PlutusScript: typeof PlutusScript
  PlutusScripts: typeof PlutusScripts
  TxInputsBuilder: typeof TxInputsBuilder
  DataCost: typeof DataCost
}

const pointers: Record<string, any[]> = {};

export const freeContext = async (context: string) => {
  if (pointers[context]) {
    for (const pointer of pointers[context]) {
      if (pointer.free) {
        await pointer.free();
      }
    }
    delete pointers[context];
  }
};

export const switchContext = async (from: string, to: string) => {
  if (pointers[from]) {
    if (!pointers[to]) {
      pointers[to] = [];
    }
    pointers[to] = pointers[to].concat(pointers[from]);
    delete pointers[from];
  }
};

export abstract class _WasmProxy {
  public _wasm: any | undefined;
  get wasm(): any {
    if (this._wasm) return this._wasm;
    throw new Error('Trying to access undefined WASM object');
  }

  // this constructor is here just to enforce it in the implementing classes
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(wasm: any | undefined, ctx: string) {}

  abstract hasValue(): boolean;
}

export abstract class WasmProxy<T> implements _WasmProxy {
  public _wasm: T | undefined;

  get internalWasm(): T | undefined {
    return this._wasm;
  }

  get wasm(): T {
    if (this._wasm) return this._wasm;
    throw new Error('Trying to access undefined WASM object');
  }

  constructor(wasm: T | undefined, ctx: string) {
    if (wasm) {
      if (!pointers[ctx]) {
        pointers[ctx] = [];
      }

      pointers[ctx].push(wasm);
    }

    this._wasm = wasm;
  }

  hasValue(): boolean {
    if (this._wasm) {
      return true;
    } else {
      return false;
    }
  }
}

export abstract class _Ptr extends _WasmProxy {
  constructor(wasm: any | undefined, ctx: string) {
    super(wasm, ctx);
  }
  /**
   * Frees the pointer
   * @returns {Promise<void>}
   */
  abstract free(): Promise<void>;
}

export abstract class Ptr<T extends { free: () => any }> extends WasmProxy<T> {
  constructor(wasm: T | undefined, ctx: string) {
    super(wasm, ctx);
  }

  free(): Promise<void> {
    return Promise.resolve(this.wasm.free());
  }
}

/*
  The classes defined here act like placeholders just so we can export the types.
  By doing this, we can generate kind off an "abstract namespace", so the platform
    specific versions of cross-csl can pass in the appropriate types.
  Client code of cross-csl can then interact with the specific types without having
    to explicitly know that by calling factory methods or other overheads.
*/

export abstract class BigNum extends _Ptr {
  abstract toBytes(): Promise<Uint8Array>;
  /**
   * @returns {string}
   */
  abstract toStr(): Promise<string>;
  /**
   * @param {BigNum} other
   * @returns {BigNum}
   */
  abstract checkedMul(other: BigNum): Promise<BigNum>;
  /**
   * @param {BigNum} other
   * @returns {BigNum}
   */
  abstract checkedAdd(other: BigNum): Promise<BigNum>;
  /**
   * @param {BigNum} other
   * @returns {BigNum}
   */
  abstract checkedSub(other: BigNum): Promise<BigNum>;
  /**
   * returns 0 if it would otherwise underflow
   * @param {BigNum} other
   * @returns {BigNum}
   */
  abstract clampedSub(other: BigNum): Promise<BigNum>;
  /**
   * @param {BigNum} rhs_value
   * @returns {number}
   */
  abstract compare(rhs_value: BigNum): Promise<number>;

  /**
   * @param {Uint8Array} bytes
   * @returns {BigNum}
   */
  static fromBytes(bytes: Uint8Array): Promise<BigNum> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
  /**
   * @param {string} string
   * @returns {BigNum}
   */
  static fromStr(string: string): Promise<BigNum> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class LinearFee extends _Ptr {
  /**
   * @returns {Promise<BigNum>}
   */
  abstract constant(): Promise<BigNum>;

  /**
   * @returns {Promise<BigNum>}
   */
  abstract coefficient(): Promise<BigNum>;

  /**
   * @param {BigNum} coefficient
   * @param {BigNum} constant
   * @returns {Promise<LinearFee>}
   */
  static new(coefficient: BigNum, constant: BigNum): Promise<LinearFee> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class GeneralTransactionMetadata extends _Ptr {
  abstract toBytes(): Promise<Uint8Array>;

  abstract len(): Promise<number>;

  abstract insert(
    key: BigNum,
    value: TransactionMetadatum
  ): Promise<TransactionMetadatum>;

  abstract get(key: BigNum): Promise<TransactionMetadatum>;

  abstract keys(): Promise<TransactionMetadatumLabels>;

  static new(): Promise<GeneralTransactionMetadata> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static fromBytes(bytes: Uint8Array): Promise<GeneralTransactionMetadata> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class TransactionMetadatumLabels extends _Ptr {
  abstract toBytes(): Promise<Uint8Array>;

  abstract len(): Promise<number>;

  abstract get(index: number): Promise<BigNum>;

  abstract add(elem: BigNum): Promise<void>;

  static fromBytes(bytes: Uint8Array): Promise<TransactionMetadatumLabels> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static new(): Promise<TransactionMetadatumLabels> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class MetadataMap extends _Ptr {
  abstract free(): Promise<void>;

  abstract toBytes(): Promise<Uint8Array>;

  abstract len(): Promise<number>;

  abstract insert(
    key: TransactionMetadatum,
    value: TransactionMetadatum
  ): Promise<TransactionMetadatum | undefined>;

  abstract insertStr(
    key: string,
    value: TransactionMetadatum
  ): Promise<TransactionMetadatum | undefined>;

  abstract insertI32(
    key: number,
    value: TransactionMetadatum
  ): Promise<TransactionMetadatum | undefined>;

  abstract get(key: TransactionMetadatum): Promise<TransactionMetadatum>;

  abstract getStr(key: string): Promise<TransactionMetadatum>;

  abstract getI32(key: number): Promise<TransactionMetadatum>;

  abstract has(key: TransactionMetadatum): Promise<boolean>;

  abstract keys(): Promise<MetadataList>;

  static fromBytes(bytes: Uint8Array): Promise<MetadataMap> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static new(): Promise<MetadataMap> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class Int extends _Ptr {
  abstract isPositive(): Promise<boolean>;

  abstract asPositive(): Promise<BigNum | undefined>;

  abstract asNegative(): Promise<BigNum | undefined>;

  abstract asI32(): Promise<number | undefined>;

  static new(x: BigNum): Promise<Int> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static newNegative(x: BigNum): Promise<Int> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static newI32(x: number): Promise<Int> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class TransactionMetadatum extends _Ptr {
  abstract toBytes(): Promise<Uint8Array>;

  abstract kind(): Promise<number>;

  abstract asMap(): Promise<MetadataMap>;

  abstract asList(): Promise<MetadataList>;

  abstract asInt(): Promise<Int>;

  abstract asBytes(): Promise<Uint8Array>;

  abstract asText(): Promise<string>;

  static fromBytes(bytes: Uint8Array): Promise<TransactionMetadatum> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static newMap(map: MetadataMap): Promise<TransactionMetadatum> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static newList(list: MetadataList): Promise<TransactionMetadatum> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static newInt(int: Int): Promise<TransactionMetadatum> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static newBytes(bytes: Uint8Array): Promise<TransactionMetadatum> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static newText(text: string): Promise<TransactionMetadatum> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class AuxiliaryData extends _Ptr {
  abstract toBytes(): Promise<Uint8Array>;

  abstract metadata(): Promise<GeneralTransactionMetadata>;

  abstract setMetadata(metadata: GeneralTransactionMetadata): Promise<void>;

  abstract nativeScripts(): Promise<NativeScripts | undefined>;

  abstract setNativeScripts(native_scripts: NativeScripts): Promise<void>;

  abstract plutusScripts(): Promise<PlutusScripts | undefined>;

  abstract setPlutusScripts(plutus_scripts: PlutusScripts): Promise<void>;

  static fromBytes(bytes: Uint8Array): Promise<AuxiliaryData> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static new(metadata?: GeneralTransactionMetadata): Promise<AuxiliaryData> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static empty(): Promise<AuxiliaryData> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class AssetName extends _Ptr {
  abstract toBytes(): Promise<Uint8Array>;
  abstract name(): Promise<Uint8Array>;

  static fromBytes(bytes: Uint8Array): Promise<AssetName> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
  static new(name: Uint8Array): Promise<AssetName> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class AssetNames extends _Ptr {
  abstract len(): Promise<number>;
  abstract get(index: number): Promise<AssetName>;
  abstract add(item: AssetName): Promise<void>;

  static new(): Promise<AssetNames> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class Assets extends _Ptr {
  abstract len(): Promise<number>;
  abstract insert(key: AssetName, value: BigNum): Promise<BigNum>;
  abstract get(key: AssetName): Promise<BigNum>;
  abstract keys(): Promise<AssetNames>;

  static new(): Promise<Assets> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class ScriptHash extends _WasmProxy {
  abstract toBytes(): Promise<Uint8Array>;
  static fromBytes(bytes: Uint8Array): Promise<ScriptHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class ScriptHashes extends _WasmProxy {
  abstract toBytes(): Promise<Uint8Array>;
  abstract len(): Promise<number>;
  abstract get(index: number): Promise<ScriptHash>;
  abstract add(item: ScriptHash): Promise<void>;

  static fromBytes(bytes: Uint8Array): Promise<ScriptHashes> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
  static new(): Promise<ScriptHashes> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export type PolicyID = ScriptHash;

export type PolicyIDs = ScriptHashes;

export abstract class MultiAsset extends _Ptr {
  abstract len(): Promise<number>;
  abstract insert(key: PolicyID, value: Assets): Promise<Assets>;
  abstract get(key: PolicyID): Promise<Assets>;
  abstract keys(): Promise<PolicyIDs>;
  abstract sub(rhs: MultiAsset): Promise<MultiAsset>;

  static new(): Promise<MultiAsset> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class Ed25519KeyHash extends _Ptr {
  abstract toBytes(): Promise<Uint8Array>;

  static fromBytes(bytes: Uint8Array): Promise<Ed25519KeyHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class TransactionHash extends _Ptr {
  abstract toBytes(): Promise<Uint8Array>;

  static fromBytes(bytes: Uint8Array): Promise<TransactionHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class TransactionInput extends _Ptr {
  abstract toBytes(): Promise<Uint8Array>;

  abstract transactionId(): Promise<TransactionHash>;

  abstract index(): Promise<number>;

  static new(
    transactionId: TransactionHash,
    index: number
  ): Promise<TransactionInput> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static fromBytes(bytes: Uint8Array): Promise<TransactionInput> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class Value extends _Ptr {
  abstract coin(): Promise<BigNum>;

  abstract setCoin(coin: BigNum): Promise<void>;

  abstract multiasset(): Promise<MultiAsset>;

  abstract setMultiasset(multiasset: MultiAsset): Promise<void>;

  abstract checkedAdd(rhs: Value): Promise<Value>;

  abstract checkedSub(rhs: Value): Promise<Value>;

  abstract clampedSub(rhs: Value): Promise<Value>;

  abstract compare(rhs: Value): Promise<number | undefined>;

  static new(coin: BigNum): Promise<Value> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class Address extends _Ptr {
  abstract toBytes(): Promise<Uint8Array>;

  abstract toBech32(prefix?: string): Promise<string>;

  abstract networkId(): Promise<number>;

  static fromBytes(bytes: Uint8Array): Promise<Address> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static fromBech32(string: string): Promise<Address> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class PublicKey extends _Ptr {
  abstract toBech32(): Promise<string>;

  abstract asBytes(): Promise<Uint8Array>;

  abstract hash(): Promise<Ed25519KeyHash>;

  static fromBech32(bech32_str: string): Promise<PublicKey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static fromBytes(bytes: Uint8Array): Promise<PublicKey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class Bip32PublicKey extends _Ptr {
  /**
   * derive this private key with the given index.
   *
   * # Security considerations
   *
   * * hard derivation index cannot be soft derived with the public key
   *
   * # Hard derivation vs Soft derivation
   *
   * If you pass an index below 0x80000000 then it is a soft derivation.
   * The advantage of soft derivation is that it is possible to derive the
   * public key too. I.e. derivation the private key with a soft derivation
   * index and then retrieving the associated public key is equivalent to
   * deriving the public key associated to the parent private key.
   *
   * Hard derivation index does not allow public key derivation.
   *
   * This is why deriving the private key should not fail while deriving
   * the public key may fail (if the derivation index is invalid).
   * @param {number} index
   * @returns {Promise<Bip32PublicKey>}
   */
  abstract derive(index: number): Promise<Bip32PublicKey>;

  abstract toRawKey(): Promise<PublicKey>;

  abstract asBytes(): Promise<Uint8Array>;

  abstract toBech32(): Promise<string>;

  abstract chaincode(): Promise<Uint8Array>;

  static fromBech32(bech32_str: string): Promise<Bip32PublicKey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static fromBytes(bytes: Uint8Array): Promise<Bip32PublicKey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class PrivateKey extends _Ptr {
  abstract toPublic(): Promise<PublicKey>;

  abstract toBech32(): Promise<string>;

  abstract asBytes(): Promise<Uint8Array>;

  abstract sign(message: Uint8Array): Promise<Ed25519Signature>;

  static fromExtendedBytes(bytes: Uint8Array): Promise<PrivateKey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static fromNormalBytes(bytes: Uint8Array): Promise<PrivateKey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static generateEd25519(): Promise<PrivateKey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static generateEd25519extended(): Promise<PrivateKey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class Bip32PrivateKey extends _Ptr {
  /**
   * derive this private key with the given index.
   *
   * # Security considerations
   *
   * * hard derivation index cannot be soft derived with the public key
   *
   * # Hard derivation vs Soft derivation
   *
   * If you pass an index below 0x80000000 then it is a soft derivation.
   * The advantage of soft derivation is that it is possible to derive the
   * public key too. I.e. derivation the private key with a soft derivation
   * index and then retrieving the associated public key is equivalent to
   * deriving the public key associated to the parent private key.
   *
   * Hard derivation index does not allow public key derivation.
   *
   * This is why deriving the private key should not fail while deriving
   * the public key may fail (if the derivation index is invalid).
   * @param {number} index
   * @returns {Promise<Bip32PrivateKey>}
   */
  abstract derive(index: number): Promise<Bip32PrivateKey>;

  abstract toRawKey(): Promise<PrivateKey>;

  abstract toPublic(): Promise<Bip32PublicKey>;

  abstract asBytes(): Promise<Uint8Array>;

  abstract toBech32(): Promise<string>;

  static fromBip39Entropy(
    entropy: Uint8Array,
    password: Uint8Array
  ): Promise<Bip32PrivateKey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static fromBech32(bech32Str: string): Promise<Bip32PrivateKey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static fromBytes(bytes: Uint8Array): Promise<Bip32PrivateKey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static generateEd25519Bip32(): Promise<Bip32PrivateKey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class ByronAddress extends _Ptr {
  abstract toBase58(): Promise<string>;

  abstract toAddress(): Promise<Address>;

  abstract byronProtocolMagic(): Promise<number>;

  abstract attributes(): Promise<Uint8Array>;

  static icarusFromKey(
    key: Bip32PublicKey,
    protocolMagic: number
  ): Promise<ByronAddress> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static fromBase58(string: string): Promise<ByronAddress> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static isValid(string: string): Promise<boolean> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static fromAddress(addr: Address): Promise<ByronAddress> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class TransactionOutput extends _Ptr {
  static fromBytes(bytes: Uint8Array): Promise<TransactionOutput> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  abstract toBytes(): Promise<Uint8Array>;

  static fromHex(hex: string): Promise<TransactionOutput> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  abstract toHex(): Promise<string>;

  abstract address(): Promise<Address>;

  abstract amount(): Promise<Value>;

  abstract hasPlutusData(): Promise<boolean>;

  abstract setPlutusData(plutusData: PlutusData): Promise<void>;

  abstract plutusData(): Promise<PlutusData | undefined>;

  abstract hasDataHash(): Promise<boolean>;

  abstract setDataHash(dataHash: DataHash): Promise<void>;

  abstract dataHash(): Promise<DataHash | undefined>;

  static new(address: Address, amount: Value): Promise<TransactionOutput> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class DataHash extends _Ptr {
  static fromBytes(bytes: Uint8Array): Promise<DataHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  abstract toBytes(): Promise<Uint8Array>;

  static fromHex(hex: string): Promise<DataHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  abstract toHex(): Promise<string>;

  static fromBech32(bech: string): Promise<DataHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  abstract toBech32(prefix: string): Promise<string>;
}

export abstract class PlutusData extends _Ptr {
  static fromBytes(bytes: Uint8Array): Promise<PlutusData> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  abstract toBytes(): Promise<Uint8Array>;

  static fromHex(hex: string): Promise<PlutusData> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  abstract toHex(): Promise<string>;
}

export abstract class PlutusList extends _Ptr {
  static fromBytes(bytes: Uint8Array): Promise<PlutusList> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  abstract toBytes(): Promise<Uint8Array>;

  static fromHex(hex: string): Promise<PlutusList> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  abstract toHex(): Promise<string>;

  static new(): Promise<PlutusList> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  abstract len(): Promise<number>;

  abstract get(index: number): Promise<PlutusData>;

  abstract add(elem: PlutusData): Promise<void>;
}

export abstract class ExUnits extends _Ptr {
  static fromBytes(bytes: Uint8Array): Promise<ExUnits> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  abstract toBytes(): Promise<Uint8Array>;

  static fromHex(hex: string): Promise<ExUnits> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  abstract toHex(): Promise<string>;

  abstract mem(): Promise<BigNum>;

  abstract steps(): Promise<BigNum>;

  static new(mem: BigNum, steps: BigNum): Promise<ExUnits> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class Redeemer extends _Ptr {
  static fromBytes(bytes: Uint8Array): Promise<Redeemer> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  abstract toBytes(): Promise<Uint8Array>;

  static fromHex(hex: string): Promise<Redeemer> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  abstract toHex(): Promise<string>;

  abstract tag(): Promise<RedeemerTag>;

  abstract index(): Promise<BigNum>;

  abstract data(): Promise<PlutusData>;

  abstract exUnits(): Promise<ExUnits>;

  static new(
    tag: RedeemerTag,
    index: BigNum,
    data: PlutusData,
    ex_units: ExUnits
  ): Promise<Redeemer> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class RedeemerTag extends _Ptr {
  static fromBytes(bytes: Uint8Array): Promise<RedeemerTag> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  abstract toBytes(): Promise<Uint8Array>;

  static fromHex(hex: string): Promise<RedeemerTag> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  abstract toHex(): Promise<string>;

  static newSpend(): Promise<RedeemerTag> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static newMint(): Promise<RedeemerTag> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static newCert(): Promise<RedeemerTag> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static newReward(): Promise<RedeemerTag> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  abstract kind(): Promise<number>;
}

export abstract class Redeemers extends _Ptr {
  static fromBytes(bytes: Uint8Array): Promise<Redeemers> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  abstract toBytes(): Promise<Uint8Array>;

  static fromHex(hex: string): Promise<Redeemers> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  abstract toHex(): Promise<string>;

  static new(): Promise<Redeemers> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  abstract len(): Promise<number>;

  abstract get(index: number): Promise<Redeemer>;

  abstract add(elem: Redeemer): Promise<void>;

  abstract totalExUnits(): Promise<ExUnits>;
}

export abstract class CostModel extends _Ptr {
  static fromBytes(bytes: Uint8Array): Promise<CostModel> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  abstract toBytes(): Promise<Uint8Array>;

  static fromHex(hex: string): Promise<CostModel> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  abstract toHex(): Promise<string>;

  static new(): Promise<CostModel> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  abstract set(operation: number, cost: Int): Promise<Int>;

  abstract get(operation: number): Promise<Int>;

  abstract len(): Promise<number>;
}

export abstract class Costmdls extends _Ptr {
  static fromBytes(bytes: Uint8Array): Promise<Costmdls> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  abstract toBytes(): Promise<Uint8Array>;

  static fromHex(hex: string): Promise<Costmdls> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  abstract toHex(): Promise<string>;

  static new(): Promise<Costmdls> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  abstract len(): Promise<number>;

  abstract insert(
    key: Language,
    value: CostModel
  ): Promise<CostModel | undefined>;

  abstract get(key: Language): Promise<CostModel | undefined>;

  abstract keys(): Promise<Languages>;

  abstract retainLanguageVersions(languages: Languages): Promise<Costmdls>;
}

export abstract class Language extends _Ptr {
  static fromBytes(bytes: Uint8Array): Promise<Language> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  abstract toBytes(): Promise<Uint8Array>;

  static fromHex(hex: string): Promise<Language> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  abstract toHex(): Promise<string>;

  static newPlutusV1(): Promise<Language> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static newPlutusV2(): Promise<Language> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  abstract kind(): Promise<number>;
}

export abstract class Languages extends _Ptr {
  static new(): Promise<Languages> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  abstract len(): Promise<number>;

  abstract get(index: number): Promise<Language>;

  abstract add(elem: Language): Promise<void>;

  static list(): Promise<Languages> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class ScriptDataHash extends _Ptr {
  static fromBytes(bytes: Uint8Array): Promise<ScriptDataHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  abstract toBytes(): Promise<Uint8Array>;

  static fromHex(hex: string): Promise<ScriptDataHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  abstract toHex(): Promise<string>;

  static fromBech32(str: string): Promise<ScriptDataHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  abstract toBech32(prefix: string): Promise<string>;
}

export abstract class StakeCredential extends _Ptr {
  abstract toBytes(): Promise<Uint8Array>;

  abstract toKeyhash(): Promise<Ed25519KeyHash>;

  abstract toScripthash(): Promise<ScriptHash>;

  abstract kind(): Promise<number>;

  static fromBytes(bytes: Uint8Array): Promise<StakeCredential> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static fromKeyhash(hash: Ed25519KeyHash): Promise<StakeCredential> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static fromScripthash(hash: ScriptHash): Promise<StakeCredential> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class StakeRegistration extends _Ptr {
  abstract toBytes(): Promise<Uint8Array>;

  abstract stakeCredential(): Promise<StakeCredential>;

  static new(stakeCredential: StakeCredential): Promise<StakeRegistration> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static fromBytes(bytes: Uint8Array): Promise<StakeRegistration> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class StakeDeregistration extends _Ptr {
  abstract toBytes(): Promise<Uint8Array>;

  abstract stakeCredential(): Promise<StakeCredential>;

  static new(stakeCredential: StakeCredential): Promise<StakeDeregistration> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static fromBytes(bytes: Uint8Array): Promise<StakeDeregistration> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class StakeDelegation extends _Ptr {
  abstract toBytes(): Promise<Uint8Array>;

  abstract stakeCredential(): Promise<StakeCredential>;

  abstract poolKeyhash(): Promise<Ed25519KeyHash>;

  static new(
    stakeCredential: StakeCredential,
    poolKeyHash: Ed25519KeyHash
  ): Promise<StakeDelegation> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static fromBytes(bytes: Uint8Array): Promise<StakeDelegation> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class Certificate extends _Ptr {
  abstract toBytes(): Promise<Uint8Array>;

  abstract asStakeRegistration(): Promise<StakeRegistration>;

  abstract asStakeDeregistration(): Promise<StakeDeregistration>;

  abstract asStakeDelegation(): Promise<StakeDelegation>;

  static fromBytes(bytes: Uint8Array): Promise<Certificate> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static newStakeRegistration(
    stakeRegistration: StakeRegistration
  ): Promise<Certificate> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static newStakeDeregistration(
    stakeDeregistration: StakeDeregistration
  ): Promise<Certificate> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static newStakeDelegation(
    stakeDelegation: StakeDelegation
  ): Promise<Certificate> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class Certificates extends _Ptr {
  abstract toBytes(): Promise<Uint8Array>;

  abstract len(): Promise<number>;

  abstract get(index: number): Promise<Certificate>;

  abstract add(item: Certificate): Promise<void>;

  static fromBytes(bytes: Uint8Array): Promise<Certificates> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static new(): Promise<Certificates> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class RewardAddress extends _Ptr {
  abstract paymentCred(): Promise<StakeCredential>;

  abstract toAddress(): Promise<Address>;

  static fromAddress(addr: Address): Promise<RewardAddress> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static new(
    network: number,
    payment: StakeCredential
  ): Promise<RewardAddress> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class RewardAddresses extends _Ptr {
  abstract toBytes(): Promise<Uint8Array>;

  abstract len(): Promise<number>;

  abstract get(index: number): Promise<RewardAddress>;

  abstract add(item: RewardAddress): Promise<void>;

  static fromBytes(bytes: Uint8Array): Promise<RewardAddresses> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static new(): Promise<RewardAddresses> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class Withdrawals extends _Ptr {
  abstract toBytes(): Promise<Uint8Array>;

  abstract len(): Promise<number>;

  abstract insert(key: RewardAddress, value: BigNum): Promise<BigNum>;

  abstract get(key: RewardAddress): Promise<BigNum>;

  abstract keys(): Promise<RewardAddresses>;

  static new(): Promise<Withdrawals> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static fromBytes(bytes: Uint8Array): Promise<Withdrawals> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class TransactionInputs extends _Ptr {
  abstract len(): Promise<number>;

  abstract get(index: number): Promise<TransactionInput>;
}

export abstract class TransactionOutputs extends _Ptr {
  abstract len(): Promise<number>;

  abstract get(index: number): Promise<TransactionOutput>;
}

export type Optional<T> = T;

export abstract class TransactionBody extends _Ptr {
  abstract toBytes(): Promise<Uint8Array>;

  abstract inputs(): Promise<TransactionInputs>;

  abstract outputs(): Promise<TransactionOutputs>;

  abstract fee(): Promise<BigNum>;

  abstract ttl(): Promise<Optional<number | undefined>>;

  abstract certs(): Promise<Certificates>;

  abstract withdrawals(): Promise<Withdrawals>;

  abstract scriptDataHash(): Promise<ScriptDataHash | undefined>;

  abstract setScriptDataHash(script_data_hash: ScriptDataHash): Promise<void>;

  abstract collateral(): Promise<TransactionInputs | undefined>;

  static fromBytes(bytes: Uint8Array): Promise<TransactionBody> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class TransactionBuilder extends _Ptr {
  abstract addKeyInput(
    hash: Ed25519KeyHash,
    input: TransactionInput,
    amount: Value
  ): Promise<void>;

  abstract addBootstrapInput(
    hash: ByronAddress,
    input: TransactionInput,
    amount: Value
  ): Promise<void>;

  abstract addInput(
    address: Address,
    input: TransactionInput,
    amount: Value
  ): Promise<void>;

  abstract feeForInput(
    address: Address,
    input: TransactionInput,
    amount: Value
  ): Promise<BigNum>;

  abstract addOutput(output: TransactionOutput): Promise<void>;

  abstract feeForOutput(output: TransactionOutput): Promise<BigNum>;

  abstract setFee(fee: BigNum): Promise<void>;

  abstract setTtl(ttl: number): Promise<void>;

  abstract setValidityStartInterval(
    validityStartInterval: number
  ): Promise<void>;

  abstract setCerts(certs: Certificates): Promise<void>;

  abstract setWithdrawals(withdrawals: Withdrawals): Promise<void>;

  abstract setAuxiliaryData(auxiliary: AuxiliaryData): Promise<void>;

  abstract setScriptDataHash(script_data_hash: ScriptDataHash): Promise<void>;

  abstract getExplicitInput(): Promise<Value>;

  abstract getImplicitInput(): Promise<Value>;

  abstract getExplicitOutput(): Promise<Value>;

  abstract getTotalInput(): Promise<Value>;

  abstract getTotalOutput(): Promise<Value>;

  abstract getDeposit(): Promise<BigNum>;

  abstract getFeeIfSet(): Promise<BigNum>;

  abstract addChangeIfNeeded(address: Address): Promise<boolean>;

  abstract build(): Promise<TransactionBody>;

  abstract minFee(): Promise<BigNum>;

  abstract addMintAsset(
    mintScript: NativeScript,
    mintName: AssetName,
    amount: Int
  ): Promise<void>;

  abstract addJsonMetadatum(key: BigNum, value: string): Promise<void>;

  abstract getAuxiliaryData(): Promise<AuxiliaryData | void>;

  abstract addRequiredSigner(requiredSigner: Ed25519KeyHash): Promise<void>;

  abstract addNativeScriptInput(
    nativeScript: NativeScript,
    input: TransactionInput,
    amount: Value
  ): Promise<void>;

  abstract addPlutusScriptInput(
    plutusScript: PlutusScript,
    datum: string,
    redeemer: string,
    input: TransactionInput,
    amount: Value
  ): Promise<void>;

  abstract setCollateral(txInputsBuilder: TxInputsBuilder): Promise<void>;

  abstract calcScriptDataHash(costModel: 'vasil' | 'default'): Promise<void>;

  static new(
    linearFee: LinearFee,
    poolDeposit: BigNum,
    keyDeposit: BigNum,
    coinsPerUtxoWord: BigNum
  ): Promise<TransactionBuilder> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class BaseAddress extends _Ptr {
  abstract paymentCred(): Promise<StakeCredential>;

  abstract stakeCred(): Promise<StakeCredential>;

  abstract toAddress(): Promise<Address>;

  static fromAddress(addr: Address): Promise<BaseAddress> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static new(
    network: number,
    payment: StakeCredential,
    stake: StakeCredential
  ): Promise<BaseAddress> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class PointerAddress extends _Ptr {
  abstract paymentCred(): Promise<StakeCredential>;

  abstract stakePointer(): Promise<Pointer>;

  abstract toAddress(): Promise<Address>;

  static fromAddress(addr: Address): Promise<PointerAddress> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static new(
    network: number,
    payment: StakeCredential,
    stake: Pointer
  ): Promise<PointerAddress> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class EnterpriseAddress extends _Ptr {
  abstract paymentCred(): Promise<StakeCredential>;

  abstract toAddress(): Promise<Address>;

  static fromAddress(addr: Address): Promise<EnterpriseAddress> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static new(
    network: number,
    payment: StakeCredential
  ): Promise<EnterpriseAddress> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class Pointer extends _Ptr {
  abstract slot(): Promise<number>;

  abstract txIndex(): Promise<number>;

  abstract certIndex(): Promise<number>;

  static new(
    slot: number,
    txIndex: number,
    certIndex: number
  ): Promise<Pointer> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class Vkey extends _Ptr {
  static new(pk: PublicKey): Promise<Vkey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class Ed25519Signature extends _Ptr {
  abstract toBytes(): Promise<Uint8Array>;

  abstract toHex(): Promise<string>;

  static fromBytes(bytes: Uint8Array): Promise<Ed25519Signature> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class Vkeywitness extends _Ptr {
  abstract toBytes(): Promise<Uint8Array>;

  abstract signature(): Promise<Ed25519Signature>;

  static fromBytes(bytes: Uint8Array): Promise<Vkeywitness> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static new(vkey: Vkey, signature: Ed25519Signature): Promise<Vkeywitness> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class Vkeywitnesses extends _Ptr {
  abstract len(): Promise<number>;

  abstract add(item: Vkeywitness): Promise<void>;

  abstract get(index: number): Promise<Vkeywitness>;

  static new(): Promise<Vkeywitnesses> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class BootstrapWitness extends _Ptr {
  abstract toBytes(): Promise<Uint8Array>;

  static fromBytes(bytes: Uint8Array): Promise<BootstrapWitness> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static new(
    vkey: Vkey,
    signature: Ed25519Signature,
    chainCode: Uint8Array,
    attributes: Uint8Array
  ): Promise<BootstrapWitness> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class BootstrapWitnesses extends _Ptr {
  abstract len(): Promise<number>;

  abstract add(item: BootstrapWitness): Promise<void>;

  abstract get(index: number): Promise<BootstrapWitness>;

  static new(): Promise<BootstrapWitnesses> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class TransactionWitnessSet extends _Ptr {
  static fromBytes(bytes: Uint8Array): Promise<TransactionWitnessSet> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  abstract toBytes(): Promise<Uint8Array>;

  static fromHex(hex: string): Promise<TransactionWitnessSet> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  abstract toHex(): Promise<string>;

  abstract setBootstraps(bootstraps: BootstrapWitnesses): Promise<void>;

  abstract bootstraps(): Promise<BootstrapWitnesses>;

  abstract setPlutusData(plutusData: PlutusList): Promise<void>;

  abstract plutusData(): Promise<PlutusList | undefined>;

  abstract setVkeys(vkeywitnesses: Vkeywitnesses): Promise<void>;

  abstract vkeys(): Promise<Vkeywitnesses>;

  static new(): Promise<TransactionWitnessSet> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class Transaction extends _Ptr {
  abstract body(): Promise<TransactionBody>;

  abstract witnessSet(): Promise<TransactionWitnessSet>;

  abstract isValid(): Promise<boolean>;

  abstract toBytes(): Promise<Uint8Array>;

  abstract auxiliaryData(): Promise<AuxiliaryData>;

  static new(
    body: TransactionBody,
    witnessSet: TransactionWitnessSet,
    auxiliary?: AuxiliaryData
  ): Promise<Transaction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static fromBytes(bytes: Uint8Array): Promise<Transaction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class NetworkInfo extends _Ptr {
  abstract networkId(): Promise<number>;

  abstract protocolMagic(): Promise<number>;

  static new(networkId: number, protocolMagic: number): Promise<NetworkInfo> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static testnet(): Promise<NetworkInfo> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static testnetPreview(): Promise<NetworkInfo> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static testnetPreprod(): Promise<NetworkInfo> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static mainnet(): Promise<NetworkInfo> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class MetadataList extends _Ptr {
  static new(): Promise<MetadataList> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static fromBytes(bytes: Uint8Array): Promise<MetadataList> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  abstract len(): Promise<number>;

  abstract get(index: number): Promise<TransactionMetadatum>;

  abstract add(item: TransactionMetadatum): Promise<void>;

  abstract toBytes(): Promise<Uint8Array>;
}

export abstract class NativeScript extends _Ptr {
  abstract toBytes(): Promise<Uint8Array>;

  abstract hash(): Promise<Ed25519KeyHash>;

  abstract kind(): Promise<number>;

  // ToDo: uncomment these functions. For now we need this only for AuxiliaryData
  // abstract as_script_pubkey(): ScriptPubkey | undefined

  // abstract as_script_all(): ScriptAll | undefined

  // abstract as_script_any(): ScriptAny | undefined

  // abstract as_script_n_of_k(): ScriptNOfK | undefined

  // abstract as_timelock_start(): TimelockStart | undefined

  // abstract as_timelock_expiry(): TimelockExpiry | undefined

  static fromBytes(bytes: Uint8Array): Promise<NativeScript> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  // ToDo: uncomment these functions. For now we need this only for AuxiliaryData
  // static new_script_pubkey(script_pubkey: ScriptPubkey): NativeScript

  // static new_script_all(script_all: ScriptAll): NativeScript

  // static new_script_any(script_any: ScriptAny): NativeScript

  // static new_script_n_of_k(script_n_of_k: ScriptNOfK): NativeScript

  // static new_timelock_start(timelock_start: TimelockStart): NativeScript

  // static new_timelock_expiry(timelock_expiry: TimelockExpiry): NativeScript
}

export abstract class NativeScripts extends _Ptr {
  abstract len(): Promise<number>;

  abstract get(index: number): Promise<NativeScript>;

  abstract add(elem: NativeScript): Promise<void>;

  static new(): Promise<NativeScripts> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class PlutusScript extends _Ptr {
  abstract toBytes(): Promise<Uint8Array>;

  abstract bytes(): Promise<Uint8Array>;

  static fromBytes(bytes: Uint8Array): Promise<PlutusScript> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static new(bytes: Uint8Array): Promise<PlutusScript> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class PlutusScripts extends _Ptr {
  abstract toBytes(): Promise<Uint8Array>;

  abstract len(): Promise<number>;

  abstract get(index: number): Promise<PlutusScript>;

  abstract add(elem: PlutusScript): Promise<void>;

  static fromBytes(bytes: Uint8Array): Promise<PlutusScripts> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static new(): Promise<PlutusScripts> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class TxInputsBuilder extends _Ptr {
  abstract addInput(
    address: Address,
    input: TransactionInput,
    amount: Value
  ): Promise<void>;

  static new(): Promise<TxInputsBuilder> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }
}

export abstract class DataCost extends _Ptr {
  static newCoinsPerWord(coinsPerWord: BigNum): Promise<DataCost> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  static newCoinsPerByte(coinsPerByte: BigNum): Promise<DataCost> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  abstract coinsPerByte(): Promise<BigNum>;
}
