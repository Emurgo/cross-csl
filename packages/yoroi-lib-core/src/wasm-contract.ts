export const EXCEPTIONS = {
  NOT_IMPLEMENTED: 'not implemented',
  SHOULD_BE_OVERWRITTEN: 'should be overwritten by implementations'
};

export interface WasmContract {
  encryptWithPassword(
    password: string,
    salt: string,
    nonce: string,
    data: string
  ): Promise<string>;
  decryptWithPassword(password: string, data: string): Promise<string>;
  encodeJsonStrToMetadatum(
    json: string,
    schema: number
  ): Promise<TransactionMetadatum>;
  minAdaRequired(value: Value, minimumUtxoVal: BigNum): Promise<BigNum>;
  BigNum: typeof BigNum;
  LinearFee: typeof LinearFee;
  GeneralTransactionMetadata: typeof GeneralTransactionMetadata;
  TransactionMetadatum: typeof TransactionMetadatum;
  AuxiliaryData: typeof AuxiliaryData;
  AssetName: typeof AssetName;
  AssetNames: typeof AssetNames;
  Assets: typeof Assets;
  ScriptHash: typeof ScriptHash;
  ScriptHashes: typeof ScriptHashes;
  MultiAsset: typeof MultiAsset;
  Ed25519KeyHash: typeof Ed25519KeyHash;
  TransactionHash: typeof TransactionHash;
  TransactionInput: typeof TransactionInput;
  Value: typeof Value;
  Address: typeof Address;
  PublicKey: typeof PublicKey;
  Bip32PublicKey: typeof Bip32PublicKey;
  ByronAddress: typeof ByronAddress;
  TransactionOutput: typeof TransactionOutput;
  StakeCredential: typeof StakeCredential;
  StakeRegistration: typeof StakeRegistration;
  StakeDeregistration: typeof StakeDeregistration;
  StakeDelegation: typeof StakeDelegation;
  Certificate: typeof Certificate;
  Certificates: typeof Certificates;
  RewardAddress: typeof RewardAddress;
  RewardAddresses: typeof RewardAddresses;
  Withdrawals: typeof Withdrawals;
  TransactionInputs: typeof TransactionInputs;
  TransactionOutputs: typeof TransactionOutputs;
  TransactionBody: typeof TransactionBody;
  TransactionBuilder: typeof TransactionBuilder;
}

export abstract class WasmProxy {
  constructor(wasm: any) {}

  abstract hasValue(): boolean
}

export abstract class Ptr extends WasmProxy {
  constructor(wasm: any) {
    super(wasm);
  }
  /**
   * Frees the pointer
   * @returns {Promise<void>}
   */
  abstract free(): Promise<void>;
}

/*
  The classes defined here act like placeholders just so we can export the types.
  By doing this, we can generate kind off an "abstract namespace", so the platform
    specific versions of yoroi-lib can pass in the appropriate types.
  Client code of yoroi-lib can then interact with the specific types without having
    to explicitly know that by calling factory methods or other overheads.
*/

export abstract class BigNum extends Ptr {
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
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }
  /**
   * @param {string} string
   * @returns {BigNum}
   */
  static fromStr(string: string): Promise<BigNum> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }
}

export abstract class LinearFee extends Ptr {
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
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }
}

export abstract class GeneralTransactionMetadata extends Ptr {
  abstract insert(
    key: BigNum,
    value: TransactionMetadatum
  ): Promise<TransactionMetadatum | undefined>;
  abstract get(key: BigNum): Promise<TransactionMetadatum | undefined>;

  static new(): Promise<GeneralTransactionMetadata> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }
}

export abstract class TransactionMetadatum extends Ptr {
  abstract toBytes(): Promise<Uint8Array>;
}

export abstract class AuxiliaryData extends Ptr {
  abstract metadata(): Promise<GeneralTransactionMetadata>;

  static new(metadata: GeneralTransactionMetadata): Promise<AuxiliaryData> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }
}

export abstract class AssetName extends Ptr {
  abstract toBytes(): Promise<Uint8Array>;
  abstract name(): Promise<Uint8Array>;

  static fromBytes(bytes: Uint8Array): Promise<AssetName> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }
  static new(name: Uint8Array): Promise<AssetName> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }
}

export abstract class AssetNames extends Ptr {
  abstract len(): Promise<number>;
  abstract get(index: number): Promise<AssetName>;
  abstract add(item: AssetName): Promise<void>;

  static new(): Promise<AssetNames> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }
}

export abstract class Assets extends Ptr {
  abstract len(): Promise<number>;
  abstract insert(key: AssetName, value: BigNum): Promise<BigNum>;
  abstract get(key: AssetName): Promise<BigNum | undefined>;
  abstract keys(): Promise<AssetNames>;

  static new(): Promise<Assets> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }
}

export abstract class ScriptHash extends WasmProxy {
  abstract toBytes(): Promise<Uint8Array>;
  static fromBytes(bytes: Uint8Array): Promise<ScriptHash> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }
}

export abstract class ScriptHashes extends WasmProxy {
  abstract toBytes(): Promise<Uint8Array>;
  abstract len(): Promise<number>;
  abstract get(index: number): Promise<ScriptHash>;
  abstract add(item: ScriptHash): Promise<void>;

  static fromBytes(bytes: Uint8Array): Promise<ScriptHashes> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }
  static new(): Promise<ScriptHashes> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }
}

export type PolicyID = ScriptHash;

export type PolicyIDs = ScriptHashes;

export abstract class MultiAsset extends Ptr {
  abstract len(): Promise<number>;
  abstract insert(key: PolicyID, value: Assets): Promise<Assets>;
  abstract get(key: PolicyID): Promise<Assets | undefined>;
  abstract keys(): Promise<PolicyIDs>;
  abstract sub(rhs: MultiAsset): Promise<MultiAsset>;

  static new(): Promise<MultiAsset> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }
}

export abstract class Ed25519KeyHash extends Ptr {
  abstract toBytes(): Promise<Uint8Array>;

  static fromBytes(bytes: Uint8Array): Promise<Ed25519KeyHash> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }
}

export abstract class TransactionHash extends Ptr {
  abstract toBytes(): Promise<Uint8Array>;

  static fromBytes(bytes: Uint8Array): Promise<TransactionHash> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }
}

export abstract class TransactionInput extends Ptr {
  abstract toBytes(): Promise<Uint8Array>;

  abstract transactionId(): Promise<TransactionHash>;

  abstract index(): Promise<number>;

  static new(
    transactionId: TransactionHash,
    index: number
  ): Promise<TransactionInput> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }

  static fromBytes(bytes: Uint8Array): Promise<TransactionInput> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }
}

export abstract class Value extends Ptr {
  abstract coin(): Promise<BigNum>;

  abstract setCoin(coin: BigNum): Promise<void>;

  abstract multiasset(): Promise<MultiAsset | undefined>;

  abstract setMultiasset(multiasset: MultiAsset): Promise<void>;

  abstract checkedAdd(rhs: Value): Promise<Value>;

  abstract checkedSub(rhs: Value): Promise<Value>;

  abstract clampedSub(rhs: Value): Promise<Value>;

  abstract compare(rhs: Value): Promise<number>;

  static new(coin: BigNum): Promise<Value> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }
}

export abstract class Address extends Ptr {
  abstract toBytes(): Promise<Uint8Array>;

  abstract toBech32(prefix?: string): Promise<string>;

  abstract networkId(): Promise<number>;

  static fromBytes(bytes: Uint8Array): Promise<Address> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }

  static fromBech32(string: string): Promise<Address> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }
}

export abstract class PublicKey extends Ptr {
  abstract toBech32(): Promise<string>;

  abstract asBytes(): Promise<Uint8Array>;

  abstract hash(): Promise<Ed25519KeyHash>;

  static fromBech32(bech32_str: string): Promise<PublicKey> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }

  static fromBytes(bytes: Uint8Array): Promise<PublicKey> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }
}

export abstract class Bip32PublicKey extends Ptr {
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
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }

  static fromBytes(bytes: Uint8Array): Promise<Bip32PublicKey> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }
}

export abstract class ByronAddress extends Ptr {
  abstract toBase58(): Promise<string>;

  abstract toAddress(): Promise<Address>;

  abstract byronProtocolMagic(): Promise<number>;

  abstract attributes(): Promise<Uint8Array>;

  abstract icarusFromKey(
    key: Bip32PublicKey,
    protocolMagic: number
  ): Promise<ByronAddress>;

  static fromBase58(string: string): Promise<ByronAddress> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }

  static isValid(string: string): Promise<boolean> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }

  static fromAddress(addr: Address): Promise<ByronAddress | undefined> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }
}

export abstract class TransactionOutput extends Ptr {
  abstract toBytes(): Promise<Uint8Array>;

  abstract address(): Promise<Address>;

  abstract amount(): Promise<Value>;

  static fromBytes(bytes: Uint8Array): Promise<TransactionOutput> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }

  static new(address: Address, amount: Value): Promise<TransactionOutput> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }
}

export abstract class StakeCredential extends Ptr {
  abstract toBytes(): Promise<Uint8Array>;

  abstract toKeyhash(): Promise<Ed25519KeyHash | undefined>;

  abstract toScripthash(): Promise<ScriptHash | undefined>;

  abstract kind(): Promise<number>;

  static fromBytes(bytes: Uint8Array): Promise<StakeCredential> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }

  static fromKeyhash(hash: Ed25519KeyHash): Promise<StakeCredential> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }

  static fromScripthash(hash: ScriptHash): Promise<StakeCredential> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }
}

export abstract class StakeRegistration extends Ptr {
  abstract toBytes(): Promise<Uint8Array>;

  abstract stakeCredential(): Promise<StakeCredential>;

  static new(stakeCredential: StakeCredential): Promise<StakeRegistration> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }

  static fromBytes(bytes: Uint8Array): Promise<StakeRegistration> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }
}

export abstract class StakeDeregistration extends Ptr {
  abstract toBytes(): Promise<Uint8Array>;

  abstract stakeCredential(): Promise<StakeCredential>;

  static new(stakeCredential: StakeCredential): Promise<StakeDeregistration> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }

  static fromBytes(bytes: Uint8Array): Promise<StakeDeregistration> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }
}

export abstract class StakeDelegation extends Ptr {
  abstract toBytes(): Promise<Uint8Array>;

  abstract stakeCredential(): Promise<StakeCredential>;

  abstract poolKeyhash(): Promise<Ed25519KeyHash>;

  static new(
    stakeCredential: StakeCredential,
    poolKeyHash: Ed25519KeyHash
  ): Promise<StakeDelegation> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }

  static fromBytes(bytes: Uint8Array): Promise<StakeDelegation> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }
}

export abstract class Certificate extends Ptr {
  abstract toBytes(): Promise<Uint8Array>;

  abstract asStakeRegistration(): Promise<StakeRegistration | undefined>;

  abstract asStakeDeregistration(): Promise<StakeDeregistration | undefined>;

  abstract asStakeDelegation(): Promise<StakeDelegation | undefined>;

  static fromBytes(bytes: Uint8Array): Promise<Certificate> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }

  static newStakeRegistration(
    stakeRegistration: StakeRegistration
  ): Promise<Certificate> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }

  static newStakeDeregistration(
    stakeDeregistration: StakeDeregistration
  ): Promise<Certificate> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }

  static newStakeDelegation(
    stakeDelegation: StakeDelegation
  ): Promise<Certificate> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }
}

export abstract class Certificates extends Ptr {
  abstract toBytes(): Promise<Uint8Array>;

  abstract len(): Promise<number>;

  abstract get(index: number): Promise<Certificate>;

  abstract add(item: Certificate): Promise<void>;

  static fromBytes(bytes: Uint8Array): Promise<Certificates> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }

  static new(): Promise<Certificates> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }
}

export abstract class RewardAddress extends Ptr {
  abstract paymentCred(): Promise<StakeCredential>;

  abstract toAddress(): Promise<Address>;

  static fromAddress(addr: Address): Promise<RewardAddress | undefined> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }

  static new(
    network: number,
    payment: StakeCredential
  ): Promise<RewardAddress> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }
}

export abstract class RewardAddresses extends Ptr {
  abstract len(): Promise<number>;

  abstract get(index: number): Promise<RewardAddress>;

  abstract add(item: RewardAddress): Promise<void>;

  static new(): Promise<RewardAddresses> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }
}

export abstract class Withdrawals extends Ptr {
  abstract len(): Promise<number>;

  abstract insert(key: RewardAddress, value: BigNum): Promise<BigNum>;

  abstract get(key: RewardAddress): Promise<BigNum | undefined>;

  abstract keys(): Promise<RewardAddresses>;

  static new(): Promise<Withdrawals> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }
}

export abstract class TransactionInputs extends Ptr {
  abstract len(): Promise<number>;

  abstract get(index: number): Promise<TransactionInput>;
}

export abstract class TransactionOutputs extends Ptr {
  abstract len(): Promise<number>;

  abstract get(index: number): Promise<TransactionOutput>;
}

export type Optional<T> = T | undefined;

export abstract class TransactionBody extends Ptr {
  abstract toBytes(): Promise<Uint8Array>;

  abstract inputs(): Promise<TransactionInputs>;

  abstract outputs(): Promise<TransactionOutputs>;

  abstract fee(): Promise<BigNum>;

  abstract ttl(): Promise<Optional<number>>;

  abstract certs(): Promise<Certificates>;

  abstract withdrawals(): Promise<Withdrawals>;

  static fromBytes(bytes: Uint8Array): Promise<TransactionBody> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }
}

export abstract class TransactionBuilder extends Ptr {
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

  abstract getExplicitInput(): Promise<Value>;

  abstract getImplicitInput(): Promise<Value>;

  abstract getExplicitOutput(): Promise<Value>;

  abstract getDeposit(): Promise<BigNum>;

  abstract getFeeIfSet(): Promise<BigNum>;

  abstract addChangeIfNeeded(address: Address): Promise<boolean>;

  abstract build(): Promise<TransactionBody>;

  abstract minFee(): Promise<BigNum>;

  static new(
    linearFee: LinearFee,
    minimumUtxoVal: BigNum,
    poolDeposit: BigNum,
    keyDeposit: BigNum
  ): Promise<TransactionBuilder> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN;
  }
}
