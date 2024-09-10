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

export type Optional<T> = T | undefined;

/*
  The classes defined here act like placeholders just so we can export the types.
  By doing this, we can generate kind off an "abstract namespace", so the platform
    specific versions of cross-csl can pass in the appropriate types.
  Client code of cross-csl can then interact with the specific types without having
    to explicitly know that by calling factory methods or other overheads.
*/
export interface WasmModuleProxy {
  calculateExUnitsCeilCost(exUnits: ExUnits, exUnitPrices: ExUnitPrices): Promise<BigNum>;
  createSendAll(address: Address, utxos: TransactionUnspentOutputs, config: TransactionBuilderConfig): Promise<TransactionBatchList>;
  decodeArbitraryBytesFromMetadatum(metadata: TransactionMetadatum): Promise<Uint8Array>;
  decodeMetadatumToJsonStr(metadatum: TransactionMetadatum, schema: MetadataJsonSchema): Promise<string>;
  decodePlutusDatumToJsonStr(datum: PlutusData, schema: PlutusDatumSchema): Promise<string>;
  decryptWithPassword(password: string, data: string): Promise<string>;
  encodeArbitraryBytesAsMetadatum(bytes: Uint8Array): Promise<TransactionMetadatum>;
  encodeJsonStrToMetadatum(json: string, schema: MetadataJsonSchema): Promise<TransactionMetadatum>;
  encodeJsonStrToNativeScript(json: string, selfXpub: string, schema: ScriptSchema): Promise<NativeScript>;
  encodeJsonStrToPlutusDatum(json: string, schema: PlutusDatumSchema): Promise<PlutusData>;
  encryptWithPassword(password: string, salt: string, nonce: string, data: string): Promise<string>;
  getDeposit(txbody: TransactionBody, poolDeposit: BigNum, keyDeposit: BigNum): Promise<BigNum>;
  getImplicitInput(txbody: TransactionBody, poolDeposit: BigNum, keyDeposit: BigNum): Promise<Value>;
  hashAuxiliaryData(auxiliaryData: AuxiliaryData): Promise<AuxiliaryDataHash>;
  hashPlutusData(plutusData: PlutusData): Promise<DataHash>;
  hashScriptData(redeemers: Redeemers, costModels: Costmdls, datums: Optional<PlutusList>): Promise<ScriptDataHash>;
  hashTransaction(txBody: TransactionBody): Promise<TransactionHash>;
  makeDaedalusBootstrapWitness(txBodyHash: TransactionHash, addr: ByronAddress, key: LegacyDaedalusPrivateKey): Promise<BootstrapWitness>;
  makeIcarusBootstrapWitness(txBodyHash: TransactionHash, addr: ByronAddress, key: Bip32PrivateKey): Promise<BootstrapWitness>;
  makeVkeyWitness(txBodyHash: TransactionHash, sk: PrivateKey): Promise<Vkeywitness>;
  minAdaForOutput(output: TransactionOutput, dataCost: DataCost): Promise<BigNum>;
  minFee(tx: Transaction, linearFee: LinearFee): Promise<BigNum>;
  minRefScriptFee(totalRefScriptsSize: number, refScriptCoinsPerByte: UnitInterval): Promise<BigNum>;
  minScriptFee(tx: Transaction, exUnitPrices: ExUnitPrices): Promise<BigNum>;
  Address: typeof Address;
  Anchor: typeof Anchor;
  AnchorDataHash: typeof AnchorDataHash;
  AssetName: typeof AssetName;
  AssetNames: typeof AssetNames;
  Assets: typeof Assets;
  AuxiliaryData: typeof AuxiliaryData;
  AuxiliaryDataHash: typeof AuxiliaryDataHash;
  AuxiliaryDataSet: typeof AuxiliaryDataSet;
  BaseAddress: typeof BaseAddress;
  BigInt: typeof BigInt;
  BigNum: typeof BigNum;
  Bip32PrivateKey: typeof Bip32PrivateKey;
  Bip32PublicKey: typeof Bip32PublicKey;
  Block: typeof Block;
  BlockHash: typeof BlockHash;
  BootstrapWitness: typeof BootstrapWitness;
  BootstrapWitnesses: typeof BootstrapWitnesses;
  ByronAddress: typeof ByronAddress;
  Certificate: typeof Certificate;
  Certificates: typeof Certificates;
  CertificatesBuilder: typeof CertificatesBuilder;
  ChangeConfig: typeof ChangeConfig;
  Committee: typeof Committee;
  CommitteeColdResign: typeof CommitteeColdResign;
  CommitteeHotAuth: typeof CommitteeHotAuth;
  Constitution: typeof Constitution;
  ConstrPlutusData: typeof ConstrPlutusData;
  CostModel: typeof CostModel;
  Costmdls: typeof Costmdls;
  Credential: typeof Credential;
  Credentials: typeof Credentials;
  DNSRecordAorAAAA: typeof DNSRecordAorAAAA;
  DNSRecordSRV: typeof DNSRecordSRV;
  DRep: typeof DRep;
  DRepDeregistration: typeof DRepDeregistration;
  DRepRegistration: typeof DRepRegistration;
  DRepUpdate: typeof DRepUpdate;
  DRepVotingThresholds: typeof DRepVotingThresholds;
  DataCost: typeof DataCost;
  DataHash: typeof DataHash;
  DatumSource: typeof DatumSource;
  Ed25519KeyHash: typeof Ed25519KeyHash;
  Ed25519KeyHashes: typeof Ed25519KeyHashes;
  Ed25519Signature: typeof Ed25519Signature;
  EnterpriseAddress: typeof EnterpriseAddress;
  ExUnitPrices: typeof ExUnitPrices;
  ExUnits: typeof ExUnits;
  FixedBlock: typeof FixedBlock;
  FixedTransaction: typeof FixedTransaction;
  FixedTransactionBodies: typeof FixedTransactionBodies;
  FixedTransactionBody: typeof FixedTransactionBody;
  FixedTxWitnessesSet: typeof FixedTxWitnessesSet;
  FixedVersionedBlock: typeof FixedVersionedBlock;
  GeneralTransactionMetadata: typeof GeneralTransactionMetadata;
  GenesisDelegateHash: typeof GenesisDelegateHash;
  GenesisHash: typeof GenesisHash;
  GenesisHashes: typeof GenesisHashes;
  GenesisKeyDelegation: typeof GenesisKeyDelegation;
  GovernanceAction: typeof GovernanceAction;
  GovernanceActionId: typeof GovernanceActionId;
  GovernanceActionIds: typeof GovernanceActionIds;
  HardForkInitiationAction: typeof HardForkInitiationAction;
  Header: typeof Header;
  HeaderBody: typeof HeaderBody;
  InfoAction: typeof InfoAction;
  Int: typeof Int;
  Ipv4: typeof Ipv4;
  Ipv6: typeof Ipv6;
  KESSignature: typeof KESSignature;
  KESVKey: typeof KESVKey;
  Language: typeof Language;
  Languages: typeof Languages;
  LegacyDaedalusPrivateKey: typeof LegacyDaedalusPrivateKey;
  LinearFee: typeof LinearFee;
  MIRToStakeCredentials: typeof MIRToStakeCredentials;
  MalformedAddress: typeof MalformedAddress;
  MetadataList: typeof MetadataList;
  MetadataMap: typeof MetadataMap;
  Mint: typeof Mint;
  MintAssets: typeof MintAssets;
  MintBuilder: typeof MintBuilder;
  MintWitness: typeof MintWitness;
  MintsAssets: typeof MintsAssets;
  MoveInstantaneousReward: typeof MoveInstantaneousReward;
  MoveInstantaneousRewardsCert: typeof MoveInstantaneousRewardsCert;
  MultiAsset: typeof MultiAsset;
  MultiHostName: typeof MultiHostName;
  NativeScript: typeof NativeScript;
  NativeScriptSource: typeof NativeScriptSource;
  NativeScripts: typeof NativeScripts;
  NetworkId: typeof NetworkId;
  NetworkInfo: typeof NetworkInfo;
  NewConstitutionAction: typeof NewConstitutionAction;
  NoConfidenceAction: typeof NoConfidenceAction;
  Nonce: typeof Nonce;
  OperationalCert: typeof OperationalCert;
  OutputDatum: typeof OutputDatum;
  ParameterChangeAction: typeof ParameterChangeAction;
  PlutusData: typeof PlutusData;
  PlutusList: typeof PlutusList;
  PlutusMap: typeof PlutusMap;
  PlutusMapValues: typeof PlutusMapValues;
  PlutusScript: typeof PlutusScript;
  PlutusScriptSource: typeof PlutusScriptSource;
  PlutusScripts: typeof PlutusScripts;
  PlutusWitness: typeof PlutusWitness;
  PlutusWitnesses: typeof PlutusWitnesses;
  Pointer: typeof Pointer;
  PointerAddress: typeof PointerAddress;
  PoolMetadata: typeof PoolMetadata;
  PoolMetadataHash: typeof PoolMetadataHash;
  PoolParams: typeof PoolParams;
  PoolRegistration: typeof PoolRegistration;
  PoolRetirement: typeof PoolRetirement;
  PoolVotingThresholds: typeof PoolVotingThresholds;
  PrivateKey: typeof PrivateKey;
  ProposedProtocolParameterUpdates: typeof ProposedProtocolParameterUpdates;
  ProtocolParamUpdate: typeof ProtocolParamUpdate;
  ProtocolVersion: typeof ProtocolVersion;
  PublicKey: typeof PublicKey;
  PublicKeys: typeof PublicKeys;
  Redeemer: typeof Redeemer;
  RedeemerTag: typeof RedeemerTag;
  Redeemers: typeof Redeemers;
  Relay: typeof Relay;
  Relays: typeof Relays;
  RewardAddress: typeof RewardAddress;
  RewardAddresses: typeof RewardAddresses;
  ScriptAll: typeof ScriptAll;
  ScriptAny: typeof ScriptAny;
  ScriptDataHash: typeof ScriptDataHash;
  ScriptHash: typeof ScriptHash;
  ScriptHashes: typeof ScriptHashes;
  ScriptNOfK: typeof ScriptNOfK;
  ScriptPubkey: typeof ScriptPubkey;
  ScriptRef: typeof ScriptRef;
  SingleHostAddr: typeof SingleHostAddr;
  SingleHostName: typeof SingleHostName;
  StakeAndVoteDelegation: typeof StakeAndVoteDelegation;
  StakeDelegation: typeof StakeDelegation;
  StakeDeregistration: typeof StakeDeregistration;
  StakeRegistration: typeof StakeRegistration;
  StakeRegistrationAndDelegation: typeof StakeRegistrationAndDelegation;
  StakeVoteRegistrationAndDelegation: typeof StakeVoteRegistrationAndDelegation;
  Strings: typeof Strings;
  TimelockExpiry: typeof TimelockExpiry;
  TimelockStart: typeof TimelockStart;
  Transaction: typeof Transaction;
  TransactionBatch: typeof TransactionBatch;
  TransactionBatchList: typeof TransactionBatchList;
  TransactionBodies: typeof TransactionBodies;
  TransactionBody: typeof TransactionBody;
  TransactionBuilder: typeof TransactionBuilder;
  TransactionBuilderConfig: typeof TransactionBuilderConfig;
  TransactionBuilderConfigBuilder: typeof TransactionBuilderConfigBuilder;
  TransactionHash: typeof TransactionHash;
  TransactionInput: typeof TransactionInput;
  TransactionInputs: typeof TransactionInputs;
  TransactionMetadatum: typeof TransactionMetadatum;
  TransactionMetadatumLabels: typeof TransactionMetadatumLabels;
  TransactionOutput: typeof TransactionOutput;
  TransactionOutputAmountBuilder: typeof TransactionOutputAmountBuilder;
  TransactionOutputBuilder: typeof TransactionOutputBuilder;
  TransactionOutputs: typeof TransactionOutputs;
  TransactionUnspentOutput: typeof TransactionUnspentOutput;
  TransactionUnspentOutputs: typeof TransactionUnspentOutputs;
  TransactionWitnessSet: typeof TransactionWitnessSet;
  TransactionWitnessSets: typeof TransactionWitnessSets;
  TreasuryWithdrawals: typeof TreasuryWithdrawals;
  TreasuryWithdrawalsAction: typeof TreasuryWithdrawalsAction;
  TxBuilderConstants: typeof TxBuilderConstants;
  TxInputsBuilder: typeof TxInputsBuilder;
  URL: typeof URL;
  UnitInterval: typeof UnitInterval;
  Update: typeof Update;
  UpdateCommitteeAction: typeof UpdateCommitteeAction;
  VRFCert: typeof VRFCert;
  VRFKeyHash: typeof VRFKeyHash;
  VRFVKey: typeof VRFVKey;
  Value: typeof Value;
  VersionedBlock: typeof VersionedBlock;
  Vkey: typeof Vkey;
  Vkeys: typeof Vkeys;
  Vkeywitness: typeof Vkeywitness;
  Vkeywitnesses: typeof Vkeywitnesses;
  VoteDelegation: typeof VoteDelegation;
  VoteRegistrationAndDelegation: typeof VoteRegistrationAndDelegation;
  Voter: typeof Voter;
  Voters: typeof Voters;
  VotingBuilder: typeof VotingBuilder;
  VotingProcedure: typeof VotingProcedure;
  VotingProcedures: typeof VotingProcedures;
  VotingProposal: typeof VotingProposal;
  VotingProposalBuilder: typeof VotingProposalBuilder;
  VotingProposals: typeof VotingProposals;
  Withdrawals: typeof Withdrawals;
  WithdrawalsBuilder: typeof WithdrawalsBuilder;
  AddressKind: typeof AddressKind;
  BlockEra: typeof BlockEra;
  CborContainerType: typeof CborContainerType;
  CertificateKind: typeof CertificateKind;
  CoinSelectionStrategyCIP2: typeof CoinSelectionStrategyCIP2;
  CredKind: typeof CredKind;
  DRepKind: typeof DRepKind;
  GovernanceActionKind: typeof GovernanceActionKind;
  LanguageKind: typeof LanguageKind;
  MIRKind: typeof MIRKind;
  MIRPot: typeof MIRPot;
  MetadataJsonSchema: typeof MetadataJsonSchema;
  NativeScriptKind: typeof NativeScriptKind;
  NetworkIdKind: typeof NetworkIdKind;
  PlutusDataKind: typeof PlutusDataKind;
  PlutusDatumSchema: typeof PlutusDatumSchema;
  RedeemerTagKind: typeof RedeemerTagKind;
  RelayKind: typeof RelayKind;
  ScriptHashNamespace: typeof ScriptHashNamespace;
  ScriptSchema: typeof ScriptSchema;
  TransactionMetadatumKind: typeof TransactionMetadatumKind;
  VoteKind: typeof VoteKind;
  VoterKind: typeof VoterKind;
}

export abstract class Address extends _Ptr {
  /**
  * @param {Uint8Array} data
  * @returns {Promise<Address>}
  */
  static fromBytes(data: Uint8Array): Promise<Address> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<Address>}
  */
  static fromJson(json: string): Promise<Address> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<AddressKind>}
  */
  abstract kind(): Promise<AddressKind>;

  /**
  * @returns {Promise<Optional<Credential>>}
  */
  abstract paymentCred(): Promise<Optional<Credential>>;

  /**
  * @returns {Promise<boolean>}
  */
  abstract isMalformed(): Promise<boolean>;

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<Address>}
  */
  static fromHex(hexStr: string): Promise<Address> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Optional<string>} prefix
  * @returns {Promise<string>}
  */
  abstract toBech32(prefix: Optional<string>): Promise<string>;

  /**
  * @param {string} bechStr
  * @returns {Promise<Address>}
  */
  static fromBech32(bechStr: string): Promise<Address> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract networkId(): Promise<number>;

}

export abstract class Anchor extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<Anchor>}
  */
  static fromBytes(bytes: Uint8Array): Promise<Anchor> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<Anchor>}
  */
  static fromHex(hexStr: string): Promise<Anchor> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<Anchor>}
  */
  static fromJson(json: string): Promise<Anchor> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<URL>}
  */
  abstract url(): Promise<URL>;

  /**
  * @returns {Promise<AnchorDataHash>}
  */
  abstract anchorDataHash(): Promise<AnchorDataHash>;

  /**
  * @param {URL} anchorUrl
  * @param {AnchorDataHash} anchorDataHash
  * @returns {Promise<Anchor>}
  */
  static new(anchorUrl: URL, anchorDataHash: AnchorDataHash): Promise<Anchor> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class AnchorDataHash extends _Ptr {
  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<AnchorDataHash>}
  */
  static fromBytes(bytes: Uint8Array): Promise<AnchorDataHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {string} prefix
  * @returns {Promise<string>}
  */
  abstract toBech32(prefix: string): Promise<string>;

  /**
  * @param {string} bechStr
  * @returns {Promise<AnchorDataHash>}
  */
  static fromBech32(bechStr: string): Promise<AnchorDataHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hex
  * @returns {Promise<AnchorDataHash>}
  */
  static fromHex(hex: string): Promise<AnchorDataHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class AssetName extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<AssetName>}
  */
  static fromBytes(bytes: Uint8Array): Promise<AssetName> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<AssetName>}
  */
  static fromHex(hexStr: string): Promise<AssetName> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<AssetName>}
  */
  static fromJson(json: string): Promise<AssetName> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Uint8Array} name
  * @returns {Promise<AssetName>}
  */
  static new(name: Uint8Array): Promise<AssetName> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract name(): Promise<Uint8Array>;

}

export abstract class AssetNames extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<AssetNames>}
  */
  static fromBytes(bytes: Uint8Array): Promise<AssetNames> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<AssetNames>}
  */
  static fromHex(hexStr: string): Promise<AssetNames> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<AssetNames>}
  */
  static fromJson(json: string): Promise<AssetNames> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<AssetNames>}
  */
  static new(): Promise<AssetNames> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {number} index
  * @returns {Promise<AssetName>}
  */
  abstract get(index: number): Promise<AssetName>;

  /**
  * @param {AssetName} elem
  */
  abstract add(elem: AssetName): Promise<void>;

}

export abstract class Assets extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<Assets>}
  */
  static fromBytes(bytes: Uint8Array): Promise<Assets> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<Assets>}
  */
  static fromHex(hexStr: string): Promise<Assets> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<Assets>}
  */
  static fromJson(json: string): Promise<Assets> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Assets>}
  */
  static new(): Promise<Assets> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {AssetName} key
  * @param {BigNum} value
  * @returns {Promise<Optional<BigNum>>}
  */
  abstract insert(key: AssetName, value: BigNum): Promise<Optional<BigNum>>;

  /**
  * @param {AssetName} key
  * @returns {Promise<Optional<BigNum>>}
  */
  abstract get(key: AssetName): Promise<Optional<BigNum>>;

  /**
  * @returns {Promise<AssetNames>}
  */
  abstract keys(): Promise<AssetNames>;

}

export abstract class AuxiliaryData extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<AuxiliaryData>}
  */
  static fromBytes(bytes: Uint8Array): Promise<AuxiliaryData> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<AuxiliaryData>}
  */
  static fromHex(hexStr: string): Promise<AuxiliaryData> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<AuxiliaryData>}
  */
  static fromJson(json: string): Promise<AuxiliaryData> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<AuxiliaryData>}
  */
  static new(): Promise<AuxiliaryData> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Optional<GeneralTransactionMetadata>>}
  */
  abstract metadata(): Promise<Optional<GeneralTransactionMetadata>>;

  /**
  * @param {GeneralTransactionMetadata} metadata
  */
  abstract setMetadata(metadata: GeneralTransactionMetadata): Promise<void>;

  /**
  * @returns {Promise<Optional<NativeScripts>>}
  */
  abstract nativeScripts(): Promise<Optional<NativeScripts>>;

  /**
  * @param {NativeScripts} nativeScripts
  */
  abstract setNativeScripts(nativeScripts: NativeScripts): Promise<void>;

  /**
  * @returns {Promise<Optional<PlutusScripts>>}
  */
  abstract plutusScripts(): Promise<Optional<PlutusScripts>>;

  /**
  * @param {PlutusScripts} plutusScripts
  */
  abstract setPlutusScripts(plutusScripts: PlutusScripts): Promise<void>;

  /**
  * @returns {Promise<boolean>}
  */
  abstract preferAlonzoFormat(): Promise<boolean>;

  /**
  * @param {boolean} prefer
  */
  abstract setPreferAlonzoFormat(prefer: boolean): Promise<void>;

}

export abstract class AuxiliaryDataHash extends _Ptr {
  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<AuxiliaryDataHash>}
  */
  static fromBytes(bytes: Uint8Array): Promise<AuxiliaryDataHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {string} prefix
  * @returns {Promise<string>}
  */
  abstract toBech32(prefix: string): Promise<string>;

  /**
  * @param {string} bechStr
  * @returns {Promise<AuxiliaryDataHash>}
  */
  static fromBech32(bechStr: string): Promise<AuxiliaryDataHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hex
  * @returns {Promise<AuxiliaryDataHash>}
  */
  static fromHex(hex: string): Promise<AuxiliaryDataHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class AuxiliaryDataSet extends _Ptr {
  /**
  * @returns {Promise<AuxiliaryDataSet>}
  */
  static new(): Promise<AuxiliaryDataSet> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {number} txIndex
  * @param {AuxiliaryData} data
  * @returns {Promise<Optional<AuxiliaryData>>}
  */
  abstract insert(txIndex: number, data: AuxiliaryData): Promise<Optional<AuxiliaryData>>;

  /**
  * @param {number} txIndex
  * @returns {Promise<Optional<AuxiliaryData>>}
  */
  abstract get(txIndex: number): Promise<Optional<AuxiliaryData>>;

  /**
  * @returns {Promise<Uint32Array>}
  */
  abstract indices(): Promise<Uint32Array>;

}

export abstract class BaseAddress extends _Ptr {
  /**
  * @param {number} network
  * @param {Credential} payment
  * @param {Credential} stake
  * @returns {Promise<BaseAddress>}
  */
  static new(network: number, payment: Credential, stake: Credential): Promise<BaseAddress> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Credential>}
  */
  abstract paymentCred(): Promise<Credential>;

  /**
  * @returns {Promise<Credential>}
  */
  abstract stakeCred(): Promise<Credential>;

  /**
  * @returns {Promise<Address>}
  */
  abstract toAddress(): Promise<Address>;

  /**
  * @param {Address} addr
  * @returns {Promise<Optional<BaseAddress>>}
  */
  static fromAddress(addr: Address): Promise<Optional<BaseAddress>> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract networkId(): Promise<number>;

}

export abstract class BigInt extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<BigInt>}
  */
  static fromBytes(bytes: Uint8Array): Promise<BigInt> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<BigInt>}
  */
  static fromHex(hexStr: string): Promise<BigInt> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<BigInt>}
  */
  static fromJson(json: string): Promise<BigInt> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<boolean>}
  */
  abstract isZero(): Promise<boolean>;

  /**
  * @returns {Promise<Optional<BigNum>>}
  */
  abstract asU64(): Promise<Optional<BigNum>>;

  /**
  * @returns {Promise<Optional<Int>>}
  */
  abstract asInt(): Promise<Optional<Int>>;

  /**
  * @param {string} text
  * @returns {Promise<BigInt>}
  */
  static fromStr(text: string): Promise<BigInt> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toStr(): Promise<string>;

  /**
  * @param {BigInt} other
  * @returns {Promise<BigInt>}
  */
  abstract add(other: BigInt): Promise<BigInt>;

  /**
  * @param {BigInt} other
  * @returns {Promise<BigInt>}
  */
  abstract sub(other: BigInt): Promise<BigInt>;

  /**
  * @param {BigInt} other
  * @returns {Promise<BigInt>}
  */
  abstract mul(other: BigInt): Promise<BigInt>;

  /**
  * @param {number} exp
  * @returns {Promise<BigInt>}
  */
  abstract pow(exp: number): Promise<BigInt>;

  /**
  * @returns {Promise<BigInt>}
  */
  static one(): Promise<BigInt> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<BigInt>}
  */
  static zero(): Promise<BigInt> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<BigInt>}
  */
  abstract abs(): Promise<BigInt>;

  /**
  * @returns {Promise<BigInt>}
  */
  abstract increment(): Promise<BigInt>;

  /**
  * @param {BigInt} other
  * @returns {Promise<BigInt>}
  */
  abstract divCeil(other: BigInt): Promise<BigInt>;

  /**
  * @param {BigInt} other
  * @returns {Promise<BigInt>}
  */
  abstract divFloor(other: BigInt): Promise<BigInt>;

}

export abstract class BigNum extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<BigNum>}
  */
  static fromBytes(bytes: Uint8Array): Promise<BigNum> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<BigNum>}
  */
  static fromHex(hexStr: string): Promise<BigNum> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<BigNum>}
  */
  static fromJson(json: string): Promise<BigNum> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {string} string
  * @returns {Promise<BigNum>}
  */
  static fromStr(string: string): Promise<BigNum> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toStr(): Promise<string>;

  /**
  * @returns {Promise<BigNum>}
  */
  static zero(): Promise<BigNum> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<BigNum>}
  */
  static one(): Promise<BigNum> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<boolean>}
  */
  abstract isZero(): Promise<boolean>;

  /**
  * @param {BigNum} other
  * @returns {Promise<BigNum>}
  */
  abstract divFloor(other: BigNum): Promise<BigNum>;

  /**
  * @param {BigNum} other
  * @returns {Promise<BigNum>}
  */
  abstract checkedMul(other: BigNum): Promise<BigNum>;

  /**
  * @param {BigNum} other
  * @returns {Promise<BigNum>}
  */
  abstract checkedAdd(other: BigNum): Promise<BigNum>;

  /**
  * @param {BigNum} other
  * @returns {Promise<BigNum>}
  */
  abstract checkedSub(other: BigNum): Promise<BigNum>;

  /**
  * @param {BigNum} other
  * @returns {Promise<BigNum>}
  */
  abstract clampedSub(other: BigNum): Promise<BigNum>;

  /**
  * @param {BigNum} rhsValue
  * @returns {Promise<number>}
  */
  abstract compare(rhsValue: BigNum): Promise<number>;

  /**
  * @param {BigNum} rhsValue
  * @returns {Promise<boolean>}
  */
  abstract lessThan(rhsValue: BigNum): Promise<boolean>;

  /**
  * @returns {Promise<BigNum>}
  */
  static maxValue(): Promise<BigNum> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {BigNum} a
  * @param {BigNum} b
  * @returns {Promise<BigNum>}
  */
  static max(a: BigNum, b: BigNum): Promise<BigNum> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class Bip32PrivateKey extends _Ptr {
  /**
  * @param {number} index
  * @returns {Promise<Bip32PrivateKey>}
  */
  abstract derive(index: number): Promise<Bip32PrivateKey>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<Bip32PrivateKey>}
  */
  static from_128Xprv(bytes: Uint8Array): Promise<Bip32PrivateKey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract to_128Xprv(): Promise<Uint8Array>;

  /**
  * @returns {Promise<Bip32PrivateKey>}
  */
  static generateEd25519Bip32(): Promise<Bip32PrivateKey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<PrivateKey>}
  */
  abstract toRawKey(): Promise<PrivateKey>;

  /**
  * @returns {Promise<Bip32PublicKey>}
  */
  abstract toPublic(): Promise<Bip32PublicKey>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<Bip32PrivateKey>}
  */
  static fromBytes(bytes: Uint8Array): Promise<Bip32PrivateKey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract asBytes(): Promise<Uint8Array>;

  /**
  * @param {string} bech32Str
  * @returns {Promise<Bip32PrivateKey>}
  */
  static fromBech32(bech32Str: string): Promise<Bip32PrivateKey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toBech32(): Promise<string>;

  /**
  * @param {Uint8Array} entropy
  * @param {Uint8Array} password
  * @returns {Promise<Bip32PrivateKey>}
  */
  static fromBip39Entropy(entropy: Uint8Array, password: Uint8Array): Promise<Bip32PrivateKey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract chaincode(): Promise<Uint8Array>;

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<Bip32PrivateKey>}
  */
  static fromHex(hexStr: string): Promise<Bip32PrivateKey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class Bip32PublicKey extends _Ptr {
  /**
  * @param {number} index
  * @returns {Promise<Bip32PublicKey>}
  */
  abstract derive(index: number): Promise<Bip32PublicKey>;

  /**
  * @returns {Promise<PublicKey>}
  */
  abstract toRawKey(): Promise<PublicKey>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<Bip32PublicKey>}
  */
  static fromBytes(bytes: Uint8Array): Promise<Bip32PublicKey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract asBytes(): Promise<Uint8Array>;

  /**
  * @param {string} bech32Str
  * @returns {Promise<Bip32PublicKey>}
  */
  static fromBech32(bech32Str: string): Promise<Bip32PublicKey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toBech32(): Promise<string>;

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract chaincode(): Promise<Uint8Array>;

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<Bip32PublicKey>}
  */
  static fromHex(hexStr: string): Promise<Bip32PublicKey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class Block extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<Block>}
  */
  static fromBytes(bytes: Uint8Array): Promise<Block> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<Block>}
  */
  static fromHex(hexStr: string): Promise<Block> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<Block>}
  */
  static fromJson(json: string): Promise<Block> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Header>}
  */
  abstract header(): Promise<Header>;

  /**
  * @returns {Promise<TransactionBodies>}
  */
  abstract transactionBodies(): Promise<TransactionBodies>;

  /**
  * @returns {Promise<TransactionWitnessSets>}
  */
  abstract transactionWitnessSets(): Promise<TransactionWitnessSets>;

  /**
  * @returns {Promise<AuxiliaryDataSet>}
  */
  abstract auxiliaryDataSet(): Promise<AuxiliaryDataSet>;

  /**
  * @returns {Promise<Uint32Array>}
  */
  abstract invalidTransactions(): Promise<Uint32Array>;

  /**
  * @param {Header} header
  * @param {TransactionBodies} transactionBodies
  * @param {TransactionWitnessSets} transactionWitnessSets
  * @param {AuxiliaryDataSet} auxiliaryDataSet
  * @param {Uint32Array} invalidTransactions
  * @returns {Promise<Block>}
  */
  static new(header: Header, transactionBodies: TransactionBodies, transactionWitnessSets: TransactionWitnessSets, auxiliaryDataSet: AuxiliaryDataSet, invalidTransactions: Uint32Array): Promise<Block> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class BlockHash extends _Ptr {
  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<BlockHash>}
  */
  static fromBytes(bytes: Uint8Array): Promise<BlockHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {string} prefix
  * @returns {Promise<string>}
  */
  abstract toBech32(prefix: string): Promise<string>;

  /**
  * @param {string} bechStr
  * @returns {Promise<BlockHash>}
  */
  static fromBech32(bechStr: string): Promise<BlockHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hex
  * @returns {Promise<BlockHash>}
  */
  static fromHex(hex: string): Promise<BlockHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class BootstrapWitness extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<BootstrapWitness>}
  */
  static fromBytes(bytes: Uint8Array): Promise<BootstrapWitness> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<BootstrapWitness>}
  */
  static fromHex(hexStr: string): Promise<BootstrapWitness> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<BootstrapWitness>}
  */
  static fromJson(json: string): Promise<BootstrapWitness> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Vkey>}
  */
  abstract vkey(): Promise<Vkey>;

  /**
  * @returns {Promise<Ed25519Signature>}
  */
  abstract signature(): Promise<Ed25519Signature>;

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract chainCode(): Promise<Uint8Array>;

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract attributes(): Promise<Uint8Array>;

  /**
  * @param {Vkey} vkey
  * @param {Ed25519Signature} signature
  * @param {Uint8Array} chainCode
  * @param {Uint8Array} attributes
  * @returns {Promise<BootstrapWitness>}
  */
  static new(vkey: Vkey, signature: Ed25519Signature, chainCode: Uint8Array, attributes: Uint8Array): Promise<BootstrapWitness> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class BootstrapWitnesses extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<BootstrapWitnesses>}
  */
  static fromBytes(bytes: Uint8Array): Promise<BootstrapWitnesses> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<BootstrapWitnesses>}
  */
  static fromHex(hexStr: string): Promise<BootstrapWitnesses> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<BootstrapWitnesses>}
  */
  static fromJson(json: string): Promise<BootstrapWitnesses> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<BootstrapWitnesses>}
  */
  static new(): Promise<BootstrapWitnesses> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {number} index
  * @returns {Promise<BootstrapWitness>}
  */
  abstract get(index: number): Promise<BootstrapWitness>;

  /**
  * @param {BootstrapWitness} elem
  * @returns {Promise<boolean>}
  */
  abstract add(elem: BootstrapWitness): Promise<boolean>;

}

export abstract class ByronAddress extends _Ptr {
  /**
  * @returns {Promise<string>}
  */
  abstract toBase58(): Promise<string>;

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<ByronAddress>}
  */
  static fromBytes(bytes: Uint8Array): Promise<ByronAddress> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract byronProtocolMagic(): Promise<number>;

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract attributes(): Promise<Uint8Array>;

  /**
  * @returns {Promise<number>}
  */
  abstract networkId(): Promise<number>;

  /**
  * @param {string} s
  * @returns {Promise<ByronAddress>}
  */
  static fromBase58(s: string): Promise<ByronAddress> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Bip32PublicKey} key
  * @param {number} protocolMagic
  * @returns {Promise<ByronAddress>}
  */
  static icarusFromKey(key: Bip32PublicKey, protocolMagic: number): Promise<ByronAddress> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {string} s
  * @returns {Promise<boolean>}
  */
  static isValid(s: string): Promise<boolean> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Address>}
  */
  abstract toAddress(): Promise<Address>;

  /**
  * @param {Address} addr
  * @returns {Promise<Optional<ByronAddress>>}
  */
  static fromAddress(addr: Address): Promise<Optional<ByronAddress>> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class Certificate extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<Certificate>}
  */
  static fromBytes(bytes: Uint8Array): Promise<Certificate> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<Certificate>}
  */
  static fromHex(hexStr: string): Promise<Certificate> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<Certificate>}
  */
  static fromJson(json: string): Promise<Certificate> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {StakeRegistration} stakeRegistration
  * @returns {Promise<Certificate>}
  */
  static newStakeRegistration(stakeRegistration: StakeRegistration): Promise<Certificate> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {StakeRegistration} stakeRegistration
  * @returns {Promise<Certificate>}
  */
  static newRegCert(stakeRegistration: StakeRegistration): Promise<Certificate> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {StakeDeregistration} stakeDeregistration
  * @returns {Promise<Certificate>}
  */
  static newStakeDeregistration(stakeDeregistration: StakeDeregistration): Promise<Certificate> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {StakeDeregistration} stakeDeregistration
  * @returns {Promise<Certificate>}
  */
  static newUnregCert(stakeDeregistration: StakeDeregistration): Promise<Certificate> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {StakeDelegation} stakeDelegation
  * @returns {Promise<Certificate>}
  */
  static newStakeDelegation(stakeDelegation: StakeDelegation): Promise<Certificate> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {PoolRegistration} poolRegistration
  * @returns {Promise<Certificate>}
  */
  static newPoolRegistration(poolRegistration: PoolRegistration): Promise<Certificate> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {PoolRetirement} poolRetirement
  * @returns {Promise<Certificate>}
  */
  static newPoolRetirement(poolRetirement: PoolRetirement): Promise<Certificate> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {GenesisKeyDelegation} genesisKeyDelegation
  * @returns {Promise<Certificate>}
  */
  static newGenesisKeyDelegation(genesisKeyDelegation: GenesisKeyDelegation): Promise<Certificate> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {MoveInstantaneousRewardsCert} moveInstantaneousRewardsCert
  * @returns {Promise<Certificate>}
  */
  static newMoveInstantaneousRewardsCert(moveInstantaneousRewardsCert: MoveInstantaneousRewardsCert): Promise<Certificate> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {CommitteeHotAuth} committeeHotAuth
  * @returns {Promise<Certificate>}
  */
  static newCommitteeHotAuth(committeeHotAuth: CommitteeHotAuth): Promise<Certificate> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {CommitteeColdResign} committeeColdResign
  * @returns {Promise<Certificate>}
  */
  static newCommitteeColdResign(committeeColdResign: CommitteeColdResign): Promise<Certificate> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {DRepDeregistration} drepDeregistration
  * @returns {Promise<Certificate>}
  */
  static newDrepDeregistration(drepDeregistration: DRepDeregistration): Promise<Certificate> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {DRepRegistration} drepRegistration
  * @returns {Promise<Certificate>}
  */
  static newDrepRegistration(drepRegistration: DRepRegistration): Promise<Certificate> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {DRepUpdate} drepUpdate
  * @returns {Promise<Certificate>}
  */
  static newDrepUpdate(drepUpdate: DRepUpdate): Promise<Certificate> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {StakeAndVoteDelegation} stakeAndVoteDelegation
  * @returns {Promise<Certificate>}
  */
  static newStakeAndVoteDelegation(stakeAndVoteDelegation: StakeAndVoteDelegation): Promise<Certificate> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {StakeRegistrationAndDelegation} stakeRegistrationAndDelegation
  * @returns {Promise<Certificate>}
  */
  static newStakeRegistrationAndDelegation(stakeRegistrationAndDelegation: StakeRegistrationAndDelegation): Promise<Certificate> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {StakeVoteRegistrationAndDelegation} stakeVoteRegistrationAndDelegation
  * @returns {Promise<Certificate>}
  */
  static newStakeVoteRegistrationAndDelegation(stakeVoteRegistrationAndDelegation: StakeVoteRegistrationAndDelegation): Promise<Certificate> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {VoteDelegation} voteDelegation
  * @returns {Promise<Certificate>}
  */
  static newVoteDelegation(voteDelegation: VoteDelegation): Promise<Certificate> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {VoteRegistrationAndDelegation} voteRegistrationAndDelegation
  * @returns {Promise<Certificate>}
  */
  static newVoteRegistrationAndDelegation(voteRegistrationAndDelegation: VoteRegistrationAndDelegation): Promise<Certificate> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<CertificateKind>}
  */
  abstract kind(): Promise<CertificateKind>;

  /**
  * @returns {Promise<Optional<StakeRegistration>>}
  */
  abstract asStakeRegistration(): Promise<Optional<StakeRegistration>>;

  /**
  * @returns {Promise<Optional<StakeRegistration>>}
  */
  abstract asRegCert(): Promise<Optional<StakeRegistration>>;

  /**
  * @returns {Promise<Optional<StakeDeregistration>>}
  */
  abstract asStakeDeregistration(): Promise<Optional<StakeDeregistration>>;

  /**
  * @returns {Promise<Optional<StakeDeregistration>>}
  */
  abstract asUnregCert(): Promise<Optional<StakeDeregistration>>;

  /**
  * @returns {Promise<Optional<StakeDelegation>>}
  */
  abstract asStakeDelegation(): Promise<Optional<StakeDelegation>>;

  /**
  * @returns {Promise<Optional<PoolRegistration>>}
  */
  abstract asPoolRegistration(): Promise<Optional<PoolRegistration>>;

  /**
  * @returns {Promise<Optional<PoolRetirement>>}
  */
  abstract asPoolRetirement(): Promise<Optional<PoolRetirement>>;

  /**
  * @returns {Promise<Optional<GenesisKeyDelegation>>}
  */
  abstract asGenesisKeyDelegation(): Promise<Optional<GenesisKeyDelegation>>;

  /**
  * @returns {Promise<Optional<MoveInstantaneousRewardsCert>>}
  */
  abstract asMoveInstantaneousRewardsCert(): Promise<Optional<MoveInstantaneousRewardsCert>>;

  /**
  * @returns {Promise<Optional<CommitteeHotAuth>>}
  */
  abstract asCommitteeHotAuth(): Promise<Optional<CommitteeHotAuth>>;

  /**
  * @returns {Promise<Optional<CommitteeColdResign>>}
  */
  abstract asCommitteeColdResign(): Promise<Optional<CommitteeColdResign>>;

  /**
  * @returns {Promise<Optional<DRepDeregistration>>}
  */
  abstract asDrepDeregistration(): Promise<Optional<DRepDeregistration>>;

  /**
  * @returns {Promise<Optional<DRepRegistration>>}
  */
  abstract asDrepRegistration(): Promise<Optional<DRepRegistration>>;

  /**
  * @returns {Promise<Optional<DRepUpdate>>}
  */
  abstract asDrepUpdate(): Promise<Optional<DRepUpdate>>;

  /**
  * @returns {Promise<Optional<StakeAndVoteDelegation>>}
  */
  abstract asStakeAndVoteDelegation(): Promise<Optional<StakeAndVoteDelegation>>;

  /**
  * @returns {Promise<Optional<StakeRegistrationAndDelegation>>}
  */
  abstract asStakeRegistrationAndDelegation(): Promise<Optional<StakeRegistrationAndDelegation>>;

  /**
  * @returns {Promise<Optional<StakeVoteRegistrationAndDelegation>>}
  */
  abstract asStakeVoteRegistrationAndDelegation(): Promise<Optional<StakeVoteRegistrationAndDelegation>>;

  /**
  * @returns {Promise<Optional<VoteDelegation>>}
  */
  abstract asVoteDelegation(): Promise<Optional<VoteDelegation>>;

  /**
  * @returns {Promise<Optional<VoteRegistrationAndDelegation>>}
  */
  abstract asVoteRegistrationAndDelegation(): Promise<Optional<VoteRegistrationAndDelegation>>;

  /**
  * @returns {Promise<boolean>}
  */
  abstract hasRequiredScriptWitness(): Promise<boolean>;

}

export abstract class Certificates extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<Certificates>}
  */
  static fromBytes(bytes: Uint8Array): Promise<Certificates> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<Certificates>}
  */
  static fromHex(hexStr: string): Promise<Certificates> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<Certificates>}
  */
  static fromJson(json: string): Promise<Certificates> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Certificates>}
  */
  static new(): Promise<Certificates> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {number} index
  * @returns {Promise<Certificate>}
  */
  abstract get(index: number): Promise<Certificate>;

  /**
  * @param {Certificate} elem
  * @returns {Promise<boolean>}
  */
  abstract add(elem: Certificate): Promise<boolean>;

}

export abstract class CertificatesBuilder extends _Ptr {
  /**
  * @returns {Promise<CertificatesBuilder>}
  */
  static new(): Promise<CertificatesBuilder> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Certificate} cert
  * @returns {Promise<void>}
  */
  abstract add(cert: Certificate): Promise<void>;

  /**
  * @param {Certificate} cert
  * @param {PlutusWitness} witness
  * @returns {Promise<void>}
  */
  abstract addWithPlutusWitness(cert: Certificate, witness: PlutusWitness): Promise<void>;

  /**
  * @param {Certificate} cert
  * @param {NativeScriptSource} nativeScriptSource
  * @returns {Promise<void>}
  */
  abstract addWithNativeScript(cert: Certificate, nativeScriptSource: NativeScriptSource): Promise<void>;

  /**
  * @returns {Promise<PlutusWitnesses>}
  */
  abstract getPlutusWitnesses(): Promise<PlutusWitnesses>;

  /**
  * @returns {Promise<TransactionInputs>}
  */
  abstract getRefInputs(): Promise<TransactionInputs>;

  /**
  * @returns {Promise<NativeScripts>}
  */
  abstract getNativeScripts(): Promise<NativeScripts>;

  /**
  * @param {BigNum} poolDeposit
  * @param {BigNum} keyDeposit
  * @returns {Promise<Value>}
  */
  abstract getCertificatesRefund(poolDeposit: BigNum, keyDeposit: BigNum): Promise<Value>;

  /**
  * @param {BigNum} poolDeposit
  * @param {BigNum} keyDeposit
  * @returns {Promise<BigNum>}
  */
  abstract getCertificatesDeposit(poolDeposit: BigNum, keyDeposit: BigNum): Promise<BigNum>;

  /**
  * @returns {Promise<boolean>}
  */
  abstract hasPlutusScripts(): Promise<boolean>;

  /**
  * @returns {Promise<Certificates>}
  */
  abstract build(): Promise<Certificates>;

}

export abstract class ChangeConfig extends _Ptr {
  /**
  * @param {Address} address
  * @returns {Promise<ChangeConfig>}
  */
  static new(address: Address): Promise<ChangeConfig> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Address} address
  * @returns {Promise<ChangeConfig>}
  */
  abstract changeAddress(address: Address): Promise<ChangeConfig>;

  /**
  * @param {OutputDatum} plutusData
  * @returns {Promise<ChangeConfig>}
  */
  abstract changePlutusData(plutusData: OutputDatum): Promise<ChangeConfig>;

  /**
  * @param {ScriptRef} scriptRef
  * @returns {Promise<ChangeConfig>}
  */
  abstract changeScriptRef(scriptRef: ScriptRef): Promise<ChangeConfig>;

}

export abstract class Committee extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<Committee>}
  */
  static fromBytes(bytes: Uint8Array): Promise<Committee> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<Committee>}
  */
  static fromHex(hexStr: string): Promise<Committee> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<Committee>}
  */
  static fromJson(json: string): Promise<Committee> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {UnitInterval} quorumThreshold
  * @returns {Promise<Committee>}
  */
  static new(quorumThreshold: UnitInterval): Promise<Committee> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Credentials>}
  */
  abstract membersKeys(): Promise<Credentials>;

  /**
  * @returns {Promise<UnitInterval>}
  */
  abstract quorumThreshold(): Promise<UnitInterval>;

  /**
  * @param {Credential} committeeColdCredential
  * @param {number} epoch
  */
  abstract addMember(committeeColdCredential: Credential, epoch: number): Promise<void>;

  /**
  * @param {Credential} committeeColdCredential
  * @returns {Promise<Optional<number>>}
  */
  abstract getMemberEpoch(committeeColdCredential: Credential): Promise<Optional<number>>;

}

export abstract class CommitteeColdResign extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<CommitteeColdResign>}
  */
  static fromBytes(bytes: Uint8Array): Promise<CommitteeColdResign> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<CommitteeColdResign>}
  */
  static fromHex(hexStr: string): Promise<CommitteeColdResign> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<CommitteeColdResign>}
  */
  static fromJson(json: string): Promise<CommitteeColdResign> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Credential>}
  */
  abstract committeeColdCredential(): Promise<Credential>;

  /**
  * @returns {Promise<Optional<Anchor>>}
  */
  abstract anchor(): Promise<Optional<Anchor>>;

  /**
  * @param {Credential} committeeColdCredential
  * @returns {Promise<CommitteeColdResign>}
  */
  static new(committeeColdCredential: Credential): Promise<CommitteeColdResign> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Credential} committeeColdCredential
  * @param {Anchor} anchor
  * @returns {Promise<CommitteeColdResign>}
  */
  static newWithAnchor(committeeColdCredential: Credential, anchor: Anchor): Promise<CommitteeColdResign> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<boolean>}
  */
  abstract hasScriptCredentials(): Promise<boolean>;

}

export abstract class CommitteeHotAuth extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<CommitteeHotAuth>}
  */
  static fromBytes(bytes: Uint8Array): Promise<CommitteeHotAuth> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<CommitteeHotAuth>}
  */
  static fromHex(hexStr: string): Promise<CommitteeHotAuth> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<CommitteeHotAuth>}
  */
  static fromJson(json: string): Promise<CommitteeHotAuth> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Credential>}
  */
  abstract committeeColdCredential(): Promise<Credential>;

  /**
  * @returns {Promise<Credential>}
  */
  abstract committeeHotCredential(): Promise<Credential>;

  /**
  * @param {Credential} committeeColdCredential
  * @param {Credential} committeeHotCredential
  * @returns {Promise<CommitteeHotAuth>}
  */
  static new(committeeColdCredential: Credential, committeeHotCredential: Credential): Promise<CommitteeHotAuth> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<boolean>}
  */
  abstract hasScriptCredentials(): Promise<boolean>;

}

export abstract class Constitution extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<Constitution>}
  */
  static fromBytes(bytes: Uint8Array): Promise<Constitution> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<Constitution>}
  */
  static fromHex(hexStr: string): Promise<Constitution> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<Constitution>}
  */
  static fromJson(json: string): Promise<Constitution> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Anchor>}
  */
  abstract anchor(): Promise<Anchor>;

  /**
  * @returns {Promise<Optional<ScriptHash>>}
  */
  abstract scriptHash(): Promise<Optional<ScriptHash>>;

  /**
  * @param {Anchor} anchor
  * @returns {Promise<Constitution>}
  */
  static new(anchor: Anchor): Promise<Constitution> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Anchor} anchor
  * @param {ScriptHash} scriptHash
  * @returns {Promise<Constitution>}
  */
  static newWithScriptHash(anchor: Anchor, scriptHash: ScriptHash): Promise<Constitution> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class ConstrPlutusData extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<ConstrPlutusData>}
  */
  static fromBytes(bytes: Uint8Array): Promise<ConstrPlutusData> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<ConstrPlutusData>}
  */
  static fromHex(hexStr: string): Promise<ConstrPlutusData> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<BigNum>}
  */
  abstract alternative(): Promise<BigNum>;

  /**
  * @returns {Promise<PlutusList>}
  */
  abstract data(): Promise<PlutusList>;

  /**
  * @param {BigNum} alternative
  * @param {PlutusList} data
  * @returns {Promise<ConstrPlutusData>}
  */
  static new(alternative: BigNum, data: PlutusList): Promise<ConstrPlutusData> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class CostModel extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<CostModel>}
  */
  static fromBytes(bytes: Uint8Array): Promise<CostModel> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<CostModel>}
  */
  static fromHex(hexStr: string): Promise<CostModel> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<CostModel>}
  */
  static fromJson(json: string): Promise<CostModel> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<CostModel>}
  */
  static new(): Promise<CostModel> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {number} operation
  * @param {Int} cost
  * @returns {Promise<Int>}
  */
  abstract set(operation: number, cost: Int): Promise<Int>;

  /**
  * @param {number} operation
  * @returns {Promise<Int>}
  */
  abstract get(operation: number): Promise<Int>;

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

}

export abstract class Costmdls extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<Costmdls>}
  */
  static fromBytes(bytes: Uint8Array): Promise<Costmdls> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<Costmdls>}
  */
  static fromHex(hexStr: string): Promise<Costmdls> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<Costmdls>}
  */
  static fromJson(json: string): Promise<Costmdls> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Costmdls>}
  */
  static new(): Promise<Costmdls> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {Language} key
  * @param {CostModel} value
  * @returns {Promise<Optional<CostModel>>}
  */
  abstract insert(key: Language, value: CostModel): Promise<Optional<CostModel>>;

  /**
  * @param {Language} key
  * @returns {Promise<Optional<CostModel>>}
  */
  abstract get(key: Language): Promise<Optional<CostModel>>;

  /**
  * @returns {Promise<Languages>}
  */
  abstract keys(): Promise<Languages>;

  /**
  * @param {Languages} languages
  * @returns {Promise<Costmdls>}
  */
  abstract retainLanguageVersions(languages: Languages): Promise<Costmdls>;

}

export abstract class Credential extends _Ptr {
  /**
  * @param {Ed25519KeyHash} hash
  * @returns {Promise<Credential>}
  */
  static fromKeyhash(hash: Ed25519KeyHash): Promise<Credential> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {ScriptHash} hash
  * @returns {Promise<Credential>}
  */
  static fromScripthash(hash: ScriptHash): Promise<Credential> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Optional<Ed25519KeyHash>>}
  */
  abstract toKeyhash(): Promise<Optional<Ed25519KeyHash>>;

  /**
  * @returns {Promise<Optional<ScriptHash>>}
  */
  abstract toScripthash(): Promise<Optional<ScriptHash>>;

  /**
  * @returns {Promise<CredKind>}
  */
  abstract kind(): Promise<CredKind>;

  /**
  * @returns {Promise<boolean>}
  */
  abstract hasScriptHash(): Promise<boolean>;

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<Credential>}
  */
  static fromBytes(bytes: Uint8Array): Promise<Credential> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<Credential>}
  */
  static fromHex(hexStr: string): Promise<Credential> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<Credential>}
  */
  static fromJson(json: string): Promise<Credential> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class Credentials extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<Credentials>}
  */
  static fromBytes(bytes: Uint8Array): Promise<Credentials> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<Credentials>}
  */
  static fromHex(hexStr: string): Promise<Credentials> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<Credentials>}
  */
  static fromJson(json: string): Promise<Credentials> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Credentials>}
  */
  static new(): Promise<Credentials> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {number} index
  * @returns {Promise<Credential>}
  */
  abstract get(index: number): Promise<Credential>;

  /**
  * @param {Credential} elem
  * @returns {Promise<boolean>}
  */
  abstract add(elem: Credential): Promise<boolean>;

}

export abstract class DNSRecordAorAAAA extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<DNSRecordAorAAAA>}
  */
  static fromBytes(bytes: Uint8Array): Promise<DNSRecordAorAAAA> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<DNSRecordAorAAAA>}
  */
  static fromHex(hexStr: string): Promise<DNSRecordAorAAAA> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<DNSRecordAorAAAA>}
  */
  static fromJson(json: string): Promise<DNSRecordAorAAAA> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {string} dnsName
  * @returns {Promise<DNSRecordAorAAAA>}
  */
  static new(dnsName: string): Promise<DNSRecordAorAAAA> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract record(): Promise<string>;

}

export abstract class DNSRecordSRV extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<DNSRecordSRV>}
  */
  static fromBytes(bytes: Uint8Array): Promise<DNSRecordSRV> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<DNSRecordSRV>}
  */
  static fromHex(hexStr: string): Promise<DNSRecordSRV> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<DNSRecordSRV>}
  */
  static fromJson(json: string): Promise<DNSRecordSRV> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {string} dnsName
  * @returns {Promise<DNSRecordSRV>}
  */
  static new(dnsName: string): Promise<DNSRecordSRV> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract record(): Promise<string>;

}

export abstract class DRep extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<DRep>}
  */
  static fromBytes(bytes: Uint8Array): Promise<DRep> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<DRep>}
  */
  static fromHex(hexStr: string): Promise<DRep> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<DRep>}
  */
  static fromJson(json: string): Promise<DRep> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Ed25519KeyHash} keyHash
  * @returns {Promise<DRep>}
  */
  static newKeyHash(keyHash: Ed25519KeyHash): Promise<DRep> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {ScriptHash} scriptHash
  * @returns {Promise<DRep>}
  */
  static newScriptHash(scriptHash: ScriptHash): Promise<DRep> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<DRep>}
  */
  static newAlwaysAbstain(): Promise<DRep> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<DRep>}
  */
  static newAlwaysNoConfidence(): Promise<DRep> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Credential} cred
  * @returns {Promise<DRep>}
  */
  static newFromCredential(cred: Credential): Promise<DRep> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<DRepKind>}
  */
  abstract kind(): Promise<DRepKind>;

  /**
  * @returns {Promise<Optional<Ed25519KeyHash>>}
  */
  abstract toKeyHash(): Promise<Optional<Ed25519KeyHash>>;

  /**
  * @returns {Promise<Optional<ScriptHash>>}
  */
  abstract toScriptHash(): Promise<Optional<ScriptHash>>;

  /**
  * @returns {Promise<string>}
  */
  abstract toBech32(): Promise<string>;

  /**
  * @param {string} bech32Str
  * @returns {Promise<DRep>}
  */
  static fromBech32(bech32Str: string): Promise<DRep> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class DRepDeregistration extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<DRepDeregistration>}
  */
  static fromBytes(bytes: Uint8Array): Promise<DRepDeregistration> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<DRepDeregistration>}
  */
  static fromHex(hexStr: string): Promise<DRepDeregistration> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<DRepDeregistration>}
  */
  static fromJson(json: string): Promise<DRepDeregistration> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Credential>}
  */
  abstract votingCredential(): Promise<Credential>;

  /**
  * @returns {Promise<BigNum>}
  */
  abstract coin(): Promise<BigNum>;

  /**
  * @param {Credential} votingCredential
  * @param {BigNum} coin
  * @returns {Promise<DRepDeregistration>}
  */
  static new(votingCredential: Credential, coin: BigNum): Promise<DRepDeregistration> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<boolean>}
  */
  abstract hasScriptCredentials(): Promise<boolean>;

}

export abstract class DRepRegistration extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<DRepRegistration>}
  */
  static fromBytes(bytes: Uint8Array): Promise<DRepRegistration> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<DRepRegistration>}
  */
  static fromHex(hexStr: string): Promise<DRepRegistration> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<DRepRegistration>}
  */
  static fromJson(json: string): Promise<DRepRegistration> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Credential>}
  */
  abstract votingCredential(): Promise<Credential>;

  /**
  * @returns {Promise<BigNum>}
  */
  abstract coin(): Promise<BigNum>;

  /**
  * @returns {Promise<Optional<Anchor>>}
  */
  abstract anchor(): Promise<Optional<Anchor>>;

  /**
  * @param {Credential} votingCredential
  * @param {BigNum} coin
  * @returns {Promise<DRepRegistration>}
  */
  static new(votingCredential: Credential, coin: BigNum): Promise<DRepRegistration> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Credential} votingCredential
  * @param {BigNum} coin
  * @param {Anchor} anchor
  * @returns {Promise<DRepRegistration>}
  */
  static newWithAnchor(votingCredential: Credential, coin: BigNum, anchor: Anchor): Promise<DRepRegistration> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<boolean>}
  */
  abstract hasScriptCredentials(): Promise<boolean>;

}

export abstract class DRepUpdate extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<DRepUpdate>}
  */
  static fromBytes(bytes: Uint8Array): Promise<DRepUpdate> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<DRepUpdate>}
  */
  static fromHex(hexStr: string): Promise<DRepUpdate> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<DRepUpdate>}
  */
  static fromJson(json: string): Promise<DRepUpdate> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Credential>}
  */
  abstract votingCredential(): Promise<Credential>;

  /**
  * @returns {Promise<Optional<Anchor>>}
  */
  abstract anchor(): Promise<Optional<Anchor>>;

  /**
  * @param {Credential} votingCredential
  * @returns {Promise<DRepUpdate>}
  */
  static new(votingCredential: Credential): Promise<DRepUpdate> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Credential} votingCredential
  * @param {Anchor} anchor
  * @returns {Promise<DRepUpdate>}
  */
  static newWithAnchor(votingCredential: Credential, anchor: Anchor): Promise<DRepUpdate> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<boolean>}
  */
  abstract hasScriptCredentials(): Promise<boolean>;

}

export abstract class DRepVotingThresholds extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<DRepVotingThresholds>}
  */
  static fromBytes(bytes: Uint8Array): Promise<DRepVotingThresholds> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<DRepVotingThresholds>}
  */
  static fromHex(hexStr: string): Promise<DRepVotingThresholds> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<DRepVotingThresholds>}
  */
  static fromJson(json: string): Promise<DRepVotingThresholds> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {UnitInterval} motionNoConfidence
  * @param {UnitInterval} committeeNormal
  * @param {UnitInterval} committeeNoConfidence
  * @param {UnitInterval} updateConstitution
  * @param {UnitInterval} hardForkInitiation
  * @param {UnitInterval} ppNetworkGroup
  * @param {UnitInterval} ppEconomicGroup
  * @param {UnitInterval} ppTechnicalGroup
  * @param {UnitInterval} ppGovernanceGroup
  * @param {UnitInterval} treasuryWithdrawal
  * @returns {Promise<DRepVotingThresholds>}
  */
  static new(motionNoConfidence: UnitInterval, committeeNormal: UnitInterval, committeeNoConfidence: UnitInterval, updateConstitution: UnitInterval, hardForkInitiation: UnitInterval, ppNetworkGroup: UnitInterval, ppEconomicGroup: UnitInterval, ppTechnicalGroup: UnitInterval, ppGovernanceGroup: UnitInterval, treasuryWithdrawal: UnitInterval): Promise<DRepVotingThresholds> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {UnitInterval} motionNoConfidence
  */
  abstract setMotionNoConfidence(motionNoConfidence: UnitInterval): Promise<void>;

  /**
  * @param {UnitInterval} committeeNormal
  */
  abstract setCommitteeNormal(committeeNormal: UnitInterval): Promise<void>;

  /**
  * @param {UnitInterval} committeeNoConfidence
  */
  abstract setCommitteeNoConfidence(committeeNoConfidence: UnitInterval): Promise<void>;

  /**
  * @param {UnitInterval} updateConstitution
  */
  abstract setUpdateConstitution(updateConstitution: UnitInterval): Promise<void>;

  /**
  * @param {UnitInterval} hardForkInitiation
  */
  abstract setHardForkInitiation(hardForkInitiation: UnitInterval): Promise<void>;

  /**
  * @param {UnitInterval} ppNetworkGroup
  */
  abstract setPpNetworkGroup(ppNetworkGroup: UnitInterval): Promise<void>;

  /**
  * @param {UnitInterval} ppEconomicGroup
  */
  abstract setPpEconomicGroup(ppEconomicGroup: UnitInterval): Promise<void>;

  /**
  * @param {UnitInterval} ppTechnicalGroup
  */
  abstract setPpTechnicalGroup(ppTechnicalGroup: UnitInterval): Promise<void>;

  /**
  * @param {UnitInterval} ppGovernanceGroup
  */
  abstract setPpGovernanceGroup(ppGovernanceGroup: UnitInterval): Promise<void>;

  /**
  * @param {UnitInterval} treasuryWithdrawal
  */
  abstract setTreasuryWithdrawal(treasuryWithdrawal: UnitInterval): Promise<void>;

  /**
  * @returns {Promise<UnitInterval>}
  */
  abstract motionNoConfidence(): Promise<UnitInterval>;

  /**
  * @returns {Promise<UnitInterval>}
  */
  abstract committeeNormal(): Promise<UnitInterval>;

  /**
  * @returns {Promise<UnitInterval>}
  */
  abstract committeeNoConfidence(): Promise<UnitInterval>;

  /**
  * @returns {Promise<UnitInterval>}
  */
  abstract updateConstitution(): Promise<UnitInterval>;

  /**
  * @returns {Promise<UnitInterval>}
  */
  abstract hardForkInitiation(): Promise<UnitInterval>;

  /**
  * @returns {Promise<UnitInterval>}
  */
  abstract ppNetworkGroup(): Promise<UnitInterval>;

  /**
  * @returns {Promise<UnitInterval>}
  */
  abstract ppEconomicGroup(): Promise<UnitInterval>;

  /**
  * @returns {Promise<UnitInterval>}
  */
  abstract ppTechnicalGroup(): Promise<UnitInterval>;

  /**
  * @returns {Promise<UnitInterval>}
  */
  abstract ppGovernanceGroup(): Promise<UnitInterval>;

  /**
  * @returns {Promise<UnitInterval>}
  */
  abstract treasuryWithdrawal(): Promise<UnitInterval>;

}

export abstract class DataCost extends _Ptr {
  /**
  * @param {BigNum} coinsPerByte
  * @returns {Promise<DataCost>}
  */
  static newCoinsPerByte(coinsPerByte: BigNum): Promise<DataCost> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<BigNum>}
  */
  abstract coinsPerByte(): Promise<BigNum>;

}

export abstract class DataHash extends _Ptr {
  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<DataHash>}
  */
  static fromBytes(bytes: Uint8Array): Promise<DataHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {string} prefix
  * @returns {Promise<string>}
  */
  abstract toBech32(prefix: string): Promise<string>;

  /**
  * @param {string} bechStr
  * @returns {Promise<DataHash>}
  */
  static fromBech32(bechStr: string): Promise<DataHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hex
  * @returns {Promise<DataHash>}
  */
  static fromHex(hex: string): Promise<DataHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class DatumSource extends _Ptr {
  /**
  * @param {PlutusData} datum
  * @returns {Promise<DatumSource>}
  */
  static new(datum: PlutusData): Promise<DatumSource> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {TransactionInput} input
  * @returns {Promise<DatumSource>}
  */
  static newRefInput(input: TransactionInput): Promise<DatumSource> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class Ed25519KeyHash extends _Ptr {
  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<Ed25519KeyHash>}
  */
  static fromBytes(bytes: Uint8Array): Promise<Ed25519KeyHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {string} prefix
  * @returns {Promise<string>}
  */
  abstract toBech32(prefix: string): Promise<string>;

  /**
  * @param {string} bechStr
  * @returns {Promise<Ed25519KeyHash>}
  */
  static fromBech32(bechStr: string): Promise<Ed25519KeyHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hex
  * @returns {Promise<Ed25519KeyHash>}
  */
  static fromHex(hex: string): Promise<Ed25519KeyHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class Ed25519KeyHashes extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<Ed25519KeyHashes>}
  */
  static fromBytes(bytes: Uint8Array): Promise<Ed25519KeyHashes> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<Ed25519KeyHashes>}
  */
  static fromHex(hexStr: string): Promise<Ed25519KeyHashes> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<Ed25519KeyHashes>}
  */
  static fromJson(json: string): Promise<Ed25519KeyHashes> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Ed25519KeyHashes>}
  */
  static new(): Promise<Ed25519KeyHashes> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {number} index
  * @returns {Promise<Ed25519KeyHash>}
  */
  abstract get(index: number): Promise<Ed25519KeyHash>;

  /**
  * @param {Ed25519KeyHash} elem
  * @returns {Promise<boolean>}
  */
  abstract add(elem: Ed25519KeyHash): Promise<boolean>;

  /**
  * @param {Ed25519KeyHash} elem
  * @returns {Promise<boolean>}
  */
  abstract contains(elem: Ed25519KeyHash): Promise<boolean>;

  /**
  * @returns {Promise<Optional<Ed25519KeyHashes>>}
  */
  abstract toOption(): Promise<Optional<Ed25519KeyHashes>>;

}

export abstract class Ed25519Signature extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @returns {Promise<string>}
  */
  abstract toBech32(): Promise<string>;

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} bech32Str
  * @returns {Promise<Ed25519Signature>}
  */
  static fromBech32(bech32Str: string): Promise<Ed25519Signature> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {string} input
  * @returns {Promise<Ed25519Signature>}
  */
  static fromHex(input: string): Promise<Ed25519Signature> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<Ed25519Signature>}
  */
  static fromBytes(bytes: Uint8Array): Promise<Ed25519Signature> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class EnterpriseAddress extends _Ptr {
  /**
  * @param {number} network
  * @param {Credential} payment
  * @returns {Promise<EnterpriseAddress>}
  */
  static new(network: number, payment: Credential): Promise<EnterpriseAddress> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Credential>}
  */
  abstract paymentCred(): Promise<Credential>;

  /**
  * @returns {Promise<Address>}
  */
  abstract toAddress(): Promise<Address>;

  /**
  * @param {Address} addr
  * @returns {Promise<Optional<EnterpriseAddress>>}
  */
  static fromAddress(addr: Address): Promise<Optional<EnterpriseAddress>> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract networkId(): Promise<number>;

}

export abstract class ExUnitPrices extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<ExUnitPrices>}
  */
  static fromBytes(bytes: Uint8Array): Promise<ExUnitPrices> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<ExUnitPrices>}
  */
  static fromHex(hexStr: string): Promise<ExUnitPrices> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<ExUnitPrices>}
  */
  static fromJson(json: string): Promise<ExUnitPrices> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<UnitInterval>}
  */
  abstract memPrice(): Promise<UnitInterval>;

  /**
  * @returns {Promise<UnitInterval>}
  */
  abstract stepPrice(): Promise<UnitInterval>;

  /**
  * @param {UnitInterval} memPrice
  * @param {UnitInterval} stepPrice
  * @returns {Promise<ExUnitPrices>}
  */
  static new(memPrice: UnitInterval, stepPrice: UnitInterval): Promise<ExUnitPrices> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class ExUnits extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<ExUnits>}
  */
  static fromBytes(bytes: Uint8Array): Promise<ExUnits> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<ExUnits>}
  */
  static fromHex(hexStr: string): Promise<ExUnits> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<ExUnits>}
  */
  static fromJson(json: string): Promise<ExUnits> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<BigNum>}
  */
  abstract mem(): Promise<BigNum>;

  /**
  * @returns {Promise<BigNum>}
  */
  abstract steps(): Promise<BigNum>;

  /**
  * @param {BigNum} mem
  * @param {BigNum} steps
  * @returns {Promise<ExUnits>}
  */
  static new(mem: BigNum, steps: BigNum): Promise<ExUnits> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class FixedBlock extends _Ptr {
  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<FixedBlock>}
  */
  static fromBytes(bytes: Uint8Array): Promise<FixedBlock> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {string} hexStr
  * @returns {Promise<FixedBlock>}
  */
  static fromHex(hexStr: string): Promise<FixedBlock> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Header>}
  */
  abstract header(): Promise<Header>;

  /**
  * @returns {Promise<FixedTransactionBodies>}
  */
  abstract transactionBodies(): Promise<FixedTransactionBodies>;

  /**
  * @returns {Promise<TransactionWitnessSets>}
  */
  abstract transactionWitnessSets(): Promise<TransactionWitnessSets>;

  /**
  * @returns {Promise<AuxiliaryDataSet>}
  */
  abstract auxiliaryDataSet(): Promise<AuxiliaryDataSet>;

  /**
  * @returns {Promise<Uint32Array>}
  */
  abstract invalidTransactions(): Promise<Uint32Array>;

  /**
  * @returns {Promise<BlockHash>}
  */
  abstract blockHash(): Promise<BlockHash>;

}

export abstract class FixedTransaction extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<FixedTransaction>}
  */
  static fromBytes(bytes: Uint8Array): Promise<FixedTransaction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<FixedTransaction>}
  */
  static fromHex(hexStr: string): Promise<FixedTransaction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Uint8Array} rawBody
  * @param {Uint8Array} rawWitnessSet
  * @param {boolean} isValid
  * @returns {Promise<FixedTransaction>}
  */
  static new(rawBody: Uint8Array, rawWitnessSet: Uint8Array, isValid: boolean): Promise<FixedTransaction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Uint8Array} rawBody
  * @param {Uint8Array} rawWitnessSet
  * @param {Uint8Array} rawAuxiliaryData
  * @param {boolean} isValid
  * @returns {Promise<FixedTransaction>}
  */
  static newWithAuxiliary(rawBody: Uint8Array, rawWitnessSet: Uint8Array, rawAuxiliaryData: Uint8Array, isValid: boolean): Promise<FixedTransaction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<TransactionBody>}
  */
  abstract body(): Promise<TransactionBody>;

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract rawBody(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} rawBody
  * @returns {Promise<void>}
  */
  abstract setBody(rawBody: Uint8Array): Promise<void>;

  /**
  * @param {Uint8Array} rawWitnessSet
  * @returns {Promise<void>}
  */
  abstract setWitnessSet(rawWitnessSet: Uint8Array): Promise<void>;

  /**
  * @returns {Promise<TransactionWitnessSet>}
  */
  abstract witnessSet(): Promise<TransactionWitnessSet>;

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract rawWitnessSet(): Promise<Uint8Array>;

  /**
  * @param {boolean} valid
  */
  abstract setIsValid(valid: boolean): Promise<void>;

  /**
  * @returns {Promise<boolean>}
  */
  abstract isValid(): Promise<boolean>;

  /**
  * @param {Uint8Array} rawAuxiliaryData
  * @returns {Promise<void>}
  */
  abstract setAuxiliaryData(rawAuxiliaryData: Uint8Array): Promise<void>;

  /**
  * @returns {Promise<Optional<AuxiliaryData>>}
  */
  abstract auxiliaryData(): Promise<Optional<AuxiliaryData>>;

  /**
  * @returns {Promise<Optional<Uint8Array>>}
  */
  abstract rawAuxiliaryData(): Promise<Optional<Uint8Array>>;

  /**
  * @returns {Promise<TransactionHash>}
  */
  abstract transactionHash(): Promise<TransactionHash>;

  /**
  * @param {Vkeywitness} vkeyWitness
  */
  abstract addVkeyWitness(vkeyWitness: Vkeywitness): Promise<void>;

  /**
  * @param {BootstrapWitness} bootstrapWitness
  */
  abstract addBootstrapWitness(bootstrapWitness: BootstrapWitness): Promise<void>;

  /**
  * @param {PrivateKey} privateKey
  * @returns {Promise<void>}
  */
  abstract signAndAddVkeySignature(privateKey: PrivateKey): Promise<void>;

  /**
  * @param {ByronAddress} addr
  * @param {Bip32PrivateKey} privateKey
  * @returns {Promise<void>}
  */
  abstract signAndAddIcarusBootstrapSignature(addr: ByronAddress, privateKey: Bip32PrivateKey): Promise<void>;

  /**
  * @param {ByronAddress} addr
  * @param {LegacyDaedalusPrivateKey} privateKey
  * @returns {Promise<void>}
  */
  abstract signAndAddDaedalusBootstrapSignature(addr: ByronAddress, privateKey: LegacyDaedalusPrivateKey): Promise<void>;

}

export abstract class FixedTransactionBodies extends _Ptr {
  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<FixedTransactionBodies>}
  */
  static fromBytes(bytes: Uint8Array): Promise<FixedTransactionBodies> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {string} hexStr
  * @returns {Promise<FixedTransactionBodies>}
  */
  static fromHex(hexStr: string): Promise<FixedTransactionBodies> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<FixedTransactionBodies>}
  */
  static new(): Promise<FixedTransactionBodies> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {number} index
  * @returns {Promise<FixedTransactionBody>}
  */
  abstract get(index: number): Promise<FixedTransactionBody>;

  /**
  * @param {FixedTransactionBody} elem
  */
  abstract add(elem: FixedTransactionBody): Promise<void>;

}

export abstract class FixedTransactionBody extends _Ptr {
  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<FixedTransactionBody>}
  */
  static fromBytes(bytes: Uint8Array): Promise<FixedTransactionBody> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {string} hexStr
  * @returns {Promise<FixedTransactionBody>}
  */
  static fromHex(hexStr: string): Promise<FixedTransactionBody> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<TransactionBody>}
  */
  abstract transactionBody(): Promise<TransactionBody>;

  /**
  * @returns {Promise<TransactionHash>}
  */
  abstract txHash(): Promise<TransactionHash>;

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract originalBytes(): Promise<Uint8Array>;

}

export abstract class FixedTxWitnessesSet extends _Ptr {
  /**
  * @returns {Promise<TransactionWitnessSet>}
  */
  abstract txWitnessesSet(): Promise<TransactionWitnessSet>;

  /**
  * @param {Vkeywitness} vkeyWitness
  */
  abstract addVkeyWitness(vkeyWitness: Vkeywitness): Promise<void>;

  /**
  * @param {BootstrapWitness} bootstrapWitness
  */
  abstract addBootstrapWitness(bootstrapWitness: BootstrapWitness): Promise<void>;

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} data
  * @returns {Promise<FixedTxWitnessesSet>}
  */
  static fromBytes(data: Uint8Array): Promise<FixedTxWitnessesSet> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class FixedVersionedBlock extends _Ptr {
  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<FixedVersionedBlock>}
  */
  static fromBytes(bytes: Uint8Array): Promise<FixedVersionedBlock> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {string} hexStr
  * @returns {Promise<FixedVersionedBlock>}
  */
  static fromHex(hexStr: string): Promise<FixedVersionedBlock> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<FixedBlock>}
  */
  abstract block(): Promise<FixedBlock>;

  /**
  * @returns {Promise<BlockEra>}
  */
  abstract era(): Promise<BlockEra>;

}

export abstract class GeneralTransactionMetadata extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<GeneralTransactionMetadata>}
  */
  static fromBytes(bytes: Uint8Array): Promise<GeneralTransactionMetadata> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<GeneralTransactionMetadata>}
  */
  static fromHex(hexStr: string): Promise<GeneralTransactionMetadata> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<GeneralTransactionMetadata>}
  */
  static fromJson(json: string): Promise<GeneralTransactionMetadata> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<GeneralTransactionMetadata>}
  */
  static new(): Promise<GeneralTransactionMetadata> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {BigNum} key
  * @param {TransactionMetadatum} value
  * @returns {Promise<Optional<TransactionMetadatum>>}
  */
  abstract insert(key: BigNum, value: TransactionMetadatum): Promise<Optional<TransactionMetadatum>>;

  /**
  * @param {BigNum} key
  * @returns {Promise<Optional<TransactionMetadatum>>}
  */
  abstract get(key: BigNum): Promise<Optional<TransactionMetadatum>>;

  /**
  * @returns {Promise<TransactionMetadatumLabels>}
  */
  abstract keys(): Promise<TransactionMetadatumLabels>;

}

export abstract class GenesisDelegateHash extends _Ptr {
  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<GenesisDelegateHash>}
  */
  static fromBytes(bytes: Uint8Array): Promise<GenesisDelegateHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {string} prefix
  * @returns {Promise<string>}
  */
  abstract toBech32(prefix: string): Promise<string>;

  /**
  * @param {string} bechStr
  * @returns {Promise<GenesisDelegateHash>}
  */
  static fromBech32(bechStr: string): Promise<GenesisDelegateHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hex
  * @returns {Promise<GenesisDelegateHash>}
  */
  static fromHex(hex: string): Promise<GenesisDelegateHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class GenesisHash extends _Ptr {
  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<GenesisHash>}
  */
  static fromBytes(bytes: Uint8Array): Promise<GenesisHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {string} prefix
  * @returns {Promise<string>}
  */
  abstract toBech32(prefix: string): Promise<string>;

  /**
  * @param {string} bechStr
  * @returns {Promise<GenesisHash>}
  */
  static fromBech32(bechStr: string): Promise<GenesisHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hex
  * @returns {Promise<GenesisHash>}
  */
  static fromHex(hex: string): Promise<GenesisHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class GenesisHashes extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<GenesisHashes>}
  */
  static fromBytes(bytes: Uint8Array): Promise<GenesisHashes> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<GenesisHashes>}
  */
  static fromHex(hexStr: string): Promise<GenesisHashes> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<GenesisHashes>}
  */
  static fromJson(json: string): Promise<GenesisHashes> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<GenesisHashes>}
  */
  static new(): Promise<GenesisHashes> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {number} index
  * @returns {Promise<GenesisHash>}
  */
  abstract get(index: number): Promise<GenesisHash>;

  /**
  * @param {GenesisHash} elem
  */
  abstract add(elem: GenesisHash): Promise<void>;

}

export abstract class GenesisKeyDelegation extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<GenesisKeyDelegation>}
  */
  static fromBytes(bytes: Uint8Array): Promise<GenesisKeyDelegation> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<GenesisKeyDelegation>}
  */
  static fromHex(hexStr: string): Promise<GenesisKeyDelegation> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<GenesisKeyDelegation>}
  */
  static fromJson(json: string): Promise<GenesisKeyDelegation> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<GenesisHash>}
  */
  abstract genesishash(): Promise<GenesisHash>;

  /**
  * @returns {Promise<GenesisDelegateHash>}
  */
  abstract genesisDelegateHash(): Promise<GenesisDelegateHash>;

  /**
  * @returns {Promise<VRFKeyHash>}
  */
  abstract vrfKeyhash(): Promise<VRFKeyHash>;

  /**
  * @param {GenesisHash} genesishash
  * @param {GenesisDelegateHash} genesisDelegateHash
  * @param {VRFKeyHash} vrfKeyhash
  * @returns {Promise<GenesisKeyDelegation>}
  */
  static new(genesishash: GenesisHash, genesisDelegateHash: GenesisDelegateHash, vrfKeyhash: VRFKeyHash): Promise<GenesisKeyDelegation> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class GovernanceAction extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<GovernanceAction>}
  */
  static fromBytes(bytes: Uint8Array): Promise<GovernanceAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<GovernanceAction>}
  */
  static fromHex(hexStr: string): Promise<GovernanceAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<GovernanceAction>}
  */
  static fromJson(json: string): Promise<GovernanceAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {ParameterChangeAction} parameterChangeAction
  * @returns {Promise<GovernanceAction>}
  */
  static newParameterChangeAction(parameterChangeAction: ParameterChangeAction): Promise<GovernanceAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {HardForkInitiationAction} hardForkInitiationAction
  * @returns {Promise<GovernanceAction>}
  */
  static newHardForkInitiationAction(hardForkInitiationAction: HardForkInitiationAction): Promise<GovernanceAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {TreasuryWithdrawalsAction} treasuryWithdrawalsAction
  * @returns {Promise<GovernanceAction>}
  */
  static newTreasuryWithdrawalsAction(treasuryWithdrawalsAction: TreasuryWithdrawalsAction): Promise<GovernanceAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {NoConfidenceAction} noConfidenceAction
  * @returns {Promise<GovernanceAction>}
  */
  static newNoConfidenceAction(noConfidenceAction: NoConfidenceAction): Promise<GovernanceAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {UpdateCommitteeAction} newCommitteeAction
  * @returns {Promise<GovernanceAction>}
  */
  static newNewCommitteeAction(newCommitteeAction: UpdateCommitteeAction): Promise<GovernanceAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {NewConstitutionAction} newConstitutionAction
  * @returns {Promise<GovernanceAction>}
  */
  static newNewConstitutionAction(newConstitutionAction: NewConstitutionAction): Promise<GovernanceAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {InfoAction} infoAction
  * @returns {Promise<GovernanceAction>}
  */
  static newInfoAction(infoAction: InfoAction): Promise<GovernanceAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<GovernanceActionKind>}
  */
  abstract kind(): Promise<GovernanceActionKind>;

  /**
  * @returns {Promise<Optional<ParameterChangeAction>>}
  */
  abstract asParameterChangeAction(): Promise<Optional<ParameterChangeAction>>;

  /**
  * @returns {Promise<Optional<HardForkInitiationAction>>}
  */
  abstract asHardForkInitiationAction(): Promise<Optional<HardForkInitiationAction>>;

  /**
  * @returns {Promise<Optional<TreasuryWithdrawalsAction>>}
  */
  abstract asTreasuryWithdrawalsAction(): Promise<Optional<TreasuryWithdrawalsAction>>;

  /**
  * @returns {Promise<Optional<NoConfidenceAction>>}
  */
  abstract asNoConfidenceAction(): Promise<Optional<NoConfidenceAction>>;

  /**
  * @returns {Promise<Optional<UpdateCommitteeAction>>}
  */
  abstract asNewCommitteeAction(): Promise<Optional<UpdateCommitteeAction>>;

  /**
  * @returns {Promise<Optional<NewConstitutionAction>>}
  */
  abstract asNewConstitutionAction(): Promise<Optional<NewConstitutionAction>>;

  /**
  * @returns {Promise<Optional<InfoAction>>}
  */
  abstract asInfoAction(): Promise<Optional<InfoAction>>;

}

export abstract class GovernanceActionId extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<GovernanceActionId>}
  */
  static fromBytes(bytes: Uint8Array): Promise<GovernanceActionId> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<GovernanceActionId>}
  */
  static fromHex(hexStr: string): Promise<GovernanceActionId> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<GovernanceActionId>}
  */
  static fromJson(json: string): Promise<GovernanceActionId> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<TransactionHash>}
  */
  abstract transactionId(): Promise<TransactionHash>;

  /**
  * @returns {Promise<number>}
  */
  abstract index(): Promise<number>;

  /**
  * @param {TransactionHash} transactionId
  * @param {number} index
  * @returns {Promise<GovernanceActionId>}
  */
  static new(transactionId: TransactionHash, index: number): Promise<GovernanceActionId> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class GovernanceActionIds extends _Ptr {
  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<GovernanceActionIds>}
  */
  static fromJson(json: string): Promise<GovernanceActionIds> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<GovernanceActionIds>}
  */
  static new(): Promise<GovernanceActionIds> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {GovernanceActionId} governanceActionId
  */
  abstract add(governanceActionId: GovernanceActionId): Promise<void>;

  /**
  * @param {number} index
  * @returns {Promise<Optional<GovernanceActionId>>}
  */
  abstract get(index: number): Promise<Optional<GovernanceActionId>>;

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

}

export abstract class HardForkInitiationAction extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<HardForkInitiationAction>}
  */
  static fromBytes(bytes: Uint8Array): Promise<HardForkInitiationAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<HardForkInitiationAction>}
  */
  static fromHex(hexStr: string): Promise<HardForkInitiationAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<HardForkInitiationAction>}
  */
  static fromJson(json: string): Promise<HardForkInitiationAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Optional<GovernanceActionId>>}
  */
  abstract govActionId(): Promise<Optional<GovernanceActionId>>;

  /**
  * @returns {Promise<ProtocolVersion>}
  */
  abstract protocolVersion(): Promise<ProtocolVersion>;

  /**
  * @param {ProtocolVersion} protocolVersion
  * @returns {Promise<HardForkInitiationAction>}
  */
  static new(protocolVersion: ProtocolVersion): Promise<HardForkInitiationAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {GovernanceActionId} govActionId
  * @param {ProtocolVersion} protocolVersion
  * @returns {Promise<HardForkInitiationAction>}
  */
  static newWithActionId(govActionId: GovernanceActionId, protocolVersion: ProtocolVersion): Promise<HardForkInitiationAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class Header extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<Header>}
  */
  static fromBytes(bytes: Uint8Array): Promise<Header> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<Header>}
  */
  static fromHex(hexStr: string): Promise<Header> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<Header>}
  */
  static fromJson(json: string): Promise<Header> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<HeaderBody>}
  */
  abstract headerBody(): Promise<HeaderBody>;

  /**
  * @returns {Promise<KESSignature>}
  */
  abstract bodySignature(): Promise<KESSignature>;

  /**
  * @param {HeaderBody} headerBody
  * @param {KESSignature} bodySignature
  * @returns {Promise<Header>}
  */
  static new(headerBody: HeaderBody, bodySignature: KESSignature): Promise<Header> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class HeaderBody extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<HeaderBody>}
  */
  static fromBytes(bytes: Uint8Array): Promise<HeaderBody> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<HeaderBody>}
  */
  static fromHex(hexStr: string): Promise<HeaderBody> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<HeaderBody>}
  */
  static fromJson(json: string): Promise<HeaderBody> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract blockNumber(): Promise<number>;

  /**
  * @returns {Promise<number>}
  */
  abstract slot(): Promise<number>;

  /**
  * @returns {Promise<BigNum>}
  */
  abstract slotBignum(): Promise<BigNum>;

  /**
  * @returns {Promise<Optional<BlockHash>>}
  */
  abstract prevHash(): Promise<Optional<BlockHash>>;

  /**
  * @returns {Promise<Vkey>}
  */
  abstract issuerVkey(): Promise<Vkey>;

  /**
  * @returns {Promise<VRFVKey>}
  */
  abstract vrfVkey(): Promise<VRFVKey>;

  /**
  * @returns {Promise<boolean>}
  */
  abstract hasNonceAndLeaderVrf(): Promise<boolean>;

  /**
  * @returns {Promise<Optional<VRFCert>>}
  */
  abstract nonceVrfOrNothing(): Promise<Optional<VRFCert>>;

  /**
  * @returns {Promise<Optional<VRFCert>>}
  */
  abstract leaderVrfOrNothing(): Promise<Optional<VRFCert>>;

  /**
  * @returns {Promise<boolean>}
  */
  abstract hasVrfResult(): Promise<boolean>;

  /**
  * @returns {Promise<Optional<VRFCert>>}
  */
  abstract vrfResultOrNothing(): Promise<Optional<VRFCert>>;

  /**
  * @returns {Promise<number>}
  */
  abstract blockBodySize(): Promise<number>;

  /**
  * @returns {Promise<BlockHash>}
  */
  abstract blockBodyHash(): Promise<BlockHash>;

  /**
  * @returns {Promise<OperationalCert>}
  */
  abstract operationalCert(): Promise<OperationalCert>;

  /**
  * @returns {Promise<ProtocolVersion>}
  */
  abstract protocolVersion(): Promise<ProtocolVersion>;

  /**
  * @param {number} blockNumber
  * @param {number} slot
  * @param {Optional<BlockHash>} prevHash
  * @param {Vkey} issuerVkey
  * @param {VRFVKey} vrfVkey
  * @param {VRFCert} vrfResult
  * @param {number} blockBodySize
  * @param {BlockHash} blockBodyHash
  * @param {OperationalCert} operationalCert
  * @param {ProtocolVersion} protocolVersion
  * @returns {Promise<HeaderBody>}
  */
  static new(blockNumber: number, slot: number, prevHash: Optional<BlockHash>, issuerVkey: Vkey, vrfVkey: VRFVKey, vrfResult: VRFCert, blockBodySize: number, blockBodyHash: BlockHash, operationalCert: OperationalCert, protocolVersion: ProtocolVersion): Promise<HeaderBody> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {number} blockNumber
  * @param {BigNum} slot
  * @param {Optional<BlockHash>} prevHash
  * @param {Vkey} issuerVkey
  * @param {VRFVKey} vrfVkey
  * @param {VRFCert} vrfResult
  * @param {number} blockBodySize
  * @param {BlockHash} blockBodyHash
  * @param {OperationalCert} operationalCert
  * @param {ProtocolVersion} protocolVersion
  * @returns {Promise<HeaderBody>}
  */
  static newHeaderbody(blockNumber: number, slot: BigNum, prevHash: Optional<BlockHash>, issuerVkey: Vkey, vrfVkey: VRFVKey, vrfResult: VRFCert, blockBodySize: number, blockBodyHash: BlockHash, operationalCert: OperationalCert, protocolVersion: ProtocolVersion): Promise<HeaderBody> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class InfoAction extends _Ptr {
  /**
  * @returns {Promise<InfoAction>}
  */
  static new(): Promise<InfoAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class Int extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<Int>}
  */
  static fromBytes(bytes: Uint8Array): Promise<Int> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<Int>}
  */
  static fromHex(hexStr: string): Promise<Int> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<Int>}
  */
  static fromJson(json: string): Promise<Int> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {BigNum} x
  * @returns {Promise<Int>}
  */
  static new(x: BigNum): Promise<Int> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {BigNum} x
  * @returns {Promise<Int>}
  */
  static newNegative(x: BigNum): Promise<Int> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {number} x
  * @returns {Promise<Int>}
  */
  static newI32(x: number): Promise<Int> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<boolean>}
  */
  abstract isPositive(): Promise<boolean>;

  /**
  * @returns {Promise<Optional<BigNum>>}
  */
  abstract asPositive(): Promise<Optional<BigNum>>;

  /**
  * @returns {Promise<Optional<BigNum>>}
  */
  abstract asNegative(): Promise<Optional<BigNum>>;

  /**
  * @returns {Promise<Optional<number>>}
  */
  abstract asI32(): Promise<Optional<number>>;

  /**
  * @returns {Promise<Optional<number>>}
  */
  abstract asI32OrNothing(): Promise<Optional<number>>;

  /**
  * @returns {Promise<number>}
  */
  abstract asI32OrFail(): Promise<number>;

  /**
  * @returns {Promise<string>}
  */
  abstract toStr(): Promise<string>;

  /**
  * @param {string} string
  * @returns {Promise<Int>}
  */
  static fromStr(string: string): Promise<Int> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class Ipv4 extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<Ipv4>}
  */
  static fromBytes(bytes: Uint8Array): Promise<Ipv4> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<Ipv4>}
  */
  static fromHex(hexStr: string): Promise<Ipv4> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<Ipv4>}
  */
  static fromJson(json: string): Promise<Ipv4> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Uint8Array} data
  * @returns {Promise<Ipv4>}
  */
  static new(data: Uint8Array): Promise<Ipv4> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract ip(): Promise<Uint8Array>;

}

export abstract class Ipv6 extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<Ipv6>}
  */
  static fromBytes(bytes: Uint8Array): Promise<Ipv6> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<Ipv6>}
  */
  static fromHex(hexStr: string): Promise<Ipv6> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<Ipv6>}
  */
  static fromJson(json: string): Promise<Ipv6> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Uint8Array} data
  * @returns {Promise<Ipv6>}
  */
  static new(data: Uint8Array): Promise<Ipv6> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract ip(): Promise<Uint8Array>;

}

export abstract class KESSignature extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<KESSignature>}
  */
  static fromBytes(bytes: Uint8Array): Promise<KESSignature> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class KESVKey extends _Ptr {
  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<KESVKey>}
  */
  static fromBytes(bytes: Uint8Array): Promise<KESVKey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {string} prefix
  * @returns {Promise<string>}
  */
  abstract toBech32(prefix: string): Promise<string>;

  /**
  * @param {string} bechStr
  * @returns {Promise<KESVKey>}
  */
  static fromBech32(bechStr: string): Promise<KESVKey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hex
  * @returns {Promise<KESVKey>}
  */
  static fromHex(hex: string): Promise<KESVKey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class Language extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<Language>}
  */
  static fromBytes(bytes: Uint8Array): Promise<Language> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<Language>}
  */
  static fromHex(hexStr: string): Promise<Language> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<Language>}
  */
  static fromJson(json: string): Promise<Language> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Language>}
  */
  static newPlutusV1(): Promise<Language> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Language>}
  */
  static newPlutusV2(): Promise<Language> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Language>}
  */
  static newPlutusV3(): Promise<Language> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<LanguageKind>}
  */
  abstract kind(): Promise<LanguageKind>;

}

export abstract class Languages extends _Ptr {
  /**
  * @returns {Promise<Languages>}
  */
  static new(): Promise<Languages> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {number} index
  * @returns {Promise<Language>}
  */
  abstract get(index: number): Promise<Language>;

  /**
  * @param {Language} elem
  */
  abstract add(elem: Language): Promise<void>;

  /**
  * @returns {Promise<Languages>}
  */
  static list(): Promise<Languages> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class LegacyDaedalusPrivateKey extends _Ptr {
  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<LegacyDaedalusPrivateKey>}
  */
  static fromBytes(bytes: Uint8Array): Promise<LegacyDaedalusPrivateKey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract asBytes(): Promise<Uint8Array>;

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract chaincode(): Promise<Uint8Array>;

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

export abstract class MIRToStakeCredentials extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<MIRToStakeCredentials>}
  */
  static fromBytes(bytes: Uint8Array): Promise<MIRToStakeCredentials> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<MIRToStakeCredentials>}
  */
  static fromHex(hexStr: string): Promise<MIRToStakeCredentials> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<MIRToStakeCredentials>}
  */
  static fromJson(json: string): Promise<MIRToStakeCredentials> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<MIRToStakeCredentials>}
  */
  static new(): Promise<MIRToStakeCredentials> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {Credential} cred
  * @param {Int} delta
  * @returns {Promise<Optional<Int>>}
  */
  abstract insert(cred: Credential, delta: Int): Promise<Optional<Int>>;

  /**
  * @param {Credential} cred
  * @returns {Promise<Optional<Int>>}
  */
  abstract get(cred: Credential): Promise<Optional<Int>>;

  /**
  * @returns {Promise<Credentials>}
  */
  abstract keys(): Promise<Credentials>;

}

export abstract class MalformedAddress extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract originalBytes(): Promise<Uint8Array>;

  /**
  * @returns {Promise<Address>}
  */
  abstract toAddress(): Promise<Address>;

  /**
  * @param {Address} addr
  * @returns {Promise<Optional<MalformedAddress>>}
  */
  static fromAddress(addr: Address): Promise<Optional<MalformedAddress>> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class MetadataList extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<MetadataList>}
  */
  static fromBytes(bytes: Uint8Array): Promise<MetadataList> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<MetadataList>}
  */
  static fromHex(hexStr: string): Promise<MetadataList> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<MetadataList>}
  */
  static new(): Promise<MetadataList> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {number} index
  * @returns {Promise<TransactionMetadatum>}
  */
  abstract get(index: number): Promise<TransactionMetadatum>;

  /**
  * @param {TransactionMetadatum} elem
  */
  abstract add(elem: TransactionMetadatum): Promise<void>;

}

export abstract class MetadataMap extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<MetadataMap>}
  */
  static fromBytes(bytes: Uint8Array): Promise<MetadataMap> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<MetadataMap>}
  */
  static fromHex(hexStr: string): Promise<MetadataMap> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<MetadataMap>}
  */
  static new(): Promise<MetadataMap> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {TransactionMetadatum} key
  * @param {TransactionMetadatum} value
  * @returns {Promise<Optional<TransactionMetadatum>>}
  */
  abstract insert(key: TransactionMetadatum, value: TransactionMetadatum): Promise<Optional<TransactionMetadatum>>;

  /**
  * @param {string} key
  * @param {TransactionMetadatum} value
  * @returns {Promise<Optional<TransactionMetadatum>>}
  */
  abstract insertStr(key: string, value: TransactionMetadatum): Promise<Optional<TransactionMetadatum>>;

  /**
  * @param {number} key
  * @param {TransactionMetadatum} value
  * @returns {Promise<Optional<TransactionMetadatum>>}
  */
  abstract insertI32(key: number, value: TransactionMetadatum): Promise<Optional<TransactionMetadatum>>;

  /**
  * @param {TransactionMetadatum} key
  * @returns {Promise<TransactionMetadatum>}
  */
  abstract get(key: TransactionMetadatum): Promise<TransactionMetadatum>;

  /**
  * @param {string} key
  * @returns {Promise<TransactionMetadatum>}
  */
  abstract getStr(key: string): Promise<TransactionMetadatum>;

  /**
  * @param {number} key
  * @returns {Promise<TransactionMetadatum>}
  */
  abstract getI32(key: number): Promise<TransactionMetadatum>;

  /**
  * @param {TransactionMetadatum} key
  * @returns {Promise<boolean>}
  */
  abstract has(key: TransactionMetadatum): Promise<boolean>;

  /**
  * @returns {Promise<MetadataList>}
  */
  abstract keys(): Promise<MetadataList>;

}

export abstract class Mint extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<Mint>}
  */
  static fromBytes(bytes: Uint8Array): Promise<Mint> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<Mint>}
  */
  static fromHex(hexStr: string): Promise<Mint> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<Mint>}
  */
  static fromJson(json: string): Promise<Mint> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Mint>}
  */
  static new(): Promise<Mint> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {ScriptHash} key
  * @param {MintAssets} value
  * @returns {Promise<Mint>}
  */
  static newFromEntry(key: ScriptHash, value: MintAssets): Promise<Mint> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {ScriptHash} key
  * @param {MintAssets} value
  * @returns {Promise<Optional<MintAssets>>}
  */
  abstract insert(key: ScriptHash, value: MintAssets): Promise<Optional<MintAssets>>;

  /**
  * @param {ScriptHash} key
  * @returns {Promise<Optional<MintsAssets>>}
  */
  abstract get(key: ScriptHash): Promise<Optional<MintsAssets>>;

  /**
  * @returns {Promise<ScriptHashes>}
  */
  abstract keys(): Promise<ScriptHashes>;

  /**
  * @returns {Promise<MultiAsset>}
  */
  abstract asPositiveMultiasset(): Promise<MultiAsset>;

  /**
  * @returns {Promise<MultiAsset>}
  */
  abstract asNegativeMultiasset(): Promise<MultiAsset>;

}

export abstract class MintAssets extends _Ptr {
  /**
  * @returns {Promise<MintAssets>}
  */
  static new(): Promise<MintAssets> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {AssetName} key
  * @param {Int} value
  * @returns {Promise<MintAssets>}
  */
  static newFromEntry(key: AssetName, value: Int): Promise<MintAssets> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {AssetName} key
  * @param {Int} value
  * @returns {Promise<Optional<Int>>}
  */
  abstract insert(key: AssetName, value: Int): Promise<Optional<Int>>;

  /**
  * @param {AssetName} key
  * @returns {Promise<Optional<Int>>}
  */
  abstract get(key: AssetName): Promise<Optional<Int>>;

  /**
  * @returns {Promise<AssetNames>}
  */
  abstract keys(): Promise<AssetNames>;

}

export abstract class MintBuilder extends _Ptr {
  /**
  * @returns {Promise<MintBuilder>}
  */
  static new(): Promise<MintBuilder> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {MintWitness} mint
  * @param {AssetName} assetName
  * @param {Int} amount
  * @returns {Promise<void>}
  */
  abstract addAsset(mint: MintWitness, assetName: AssetName, amount: Int): Promise<void>;

  /**
  * @param {MintWitness} mint
  * @param {AssetName} assetName
  * @param {Int} amount
  * @returns {Promise<void>}
  */
  abstract setAsset(mint: MintWitness, assetName: AssetName, amount: Int): Promise<void>;

  /**
  * @returns {Promise<Mint>}
  */
  abstract build(): Promise<Mint>;

  /**
  * @returns {Promise<NativeScripts>}
  */
  abstract getNativeScripts(): Promise<NativeScripts>;

  /**
  * @returns {Promise<PlutusWitnesses>}
  */
  abstract getPlutusWitnesses(): Promise<PlutusWitnesses>;

  /**
  * @returns {Promise<TransactionInputs>}
  */
  abstract getRefInputs(): Promise<TransactionInputs>;

  /**
  * @returns {Promise<Redeemers>}
  */
  abstract getRedeemers(): Promise<Redeemers>;

  /**
  * @returns {Promise<boolean>}
  */
  abstract hasPlutusScripts(): Promise<boolean>;

  /**
  * @returns {Promise<boolean>}
  */
  abstract hasNativeScripts(): Promise<boolean>;

}

export abstract class MintWitness extends _Ptr {
  /**
  * @param {NativeScriptSource} nativeScript
  * @returns {Promise<MintWitness>}
  */
  static newNativeScript(nativeScript: NativeScriptSource): Promise<MintWitness> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {PlutusScriptSource} plutusScript
  * @param {Redeemer} redeemer
  * @returns {Promise<MintWitness>}
  */
  static newPlutusScript(plutusScript: PlutusScriptSource, redeemer: Redeemer): Promise<MintWitness> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class MintsAssets extends _Ptr {
  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<MintsAssets>}
  */
  static fromJson(json: string): Promise<MintsAssets> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<MintsAssets>}
  */
  static new(): Promise<MintsAssets> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {MintAssets} mintAssets
  */
  abstract add(mintAssets: MintAssets): Promise<void>;

  /**
  * @param {number} index
  * @returns {Promise<Optional<MintAssets>>}
  */
  abstract get(index: number): Promise<Optional<MintAssets>>;

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

}

export abstract class MoveInstantaneousReward extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<MoveInstantaneousReward>}
  */
  static fromBytes(bytes: Uint8Array): Promise<MoveInstantaneousReward> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<MoveInstantaneousReward>}
  */
  static fromHex(hexStr: string): Promise<MoveInstantaneousReward> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<MoveInstantaneousReward>}
  */
  static fromJson(json: string): Promise<MoveInstantaneousReward> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {MIRPot} pot
  * @param {BigNum} amount
  * @returns {Promise<MoveInstantaneousReward>}
  */
  static newToOtherPot(pot: MIRPot, amount: BigNum): Promise<MoveInstantaneousReward> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {MIRPot} pot
  * @param {MIRToStakeCredentials} amounts
  * @returns {Promise<MoveInstantaneousReward>}
  */
  static newToStakeCreds(pot: MIRPot, amounts: MIRToStakeCredentials): Promise<MoveInstantaneousReward> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<MIRPot>}
  */
  abstract pot(): Promise<MIRPot>;

  /**
  * @returns {Promise<MIRKind>}
  */
  abstract kind(): Promise<MIRKind>;

  /**
  * @returns {Promise<Optional<BigNum>>}
  */
  abstract asToOtherPot(): Promise<Optional<BigNum>>;

  /**
  * @returns {Promise<Optional<MIRToStakeCredentials>>}
  */
  abstract asToStakeCreds(): Promise<Optional<MIRToStakeCredentials>>;

}

export abstract class MoveInstantaneousRewardsCert extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<MoveInstantaneousRewardsCert>}
  */
  static fromBytes(bytes: Uint8Array): Promise<MoveInstantaneousRewardsCert> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<MoveInstantaneousRewardsCert>}
  */
  static fromHex(hexStr: string): Promise<MoveInstantaneousRewardsCert> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<MoveInstantaneousRewardsCert>}
  */
  static fromJson(json: string): Promise<MoveInstantaneousRewardsCert> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<MoveInstantaneousReward>}
  */
  abstract moveInstantaneousReward(): Promise<MoveInstantaneousReward>;

  /**
  * @param {MoveInstantaneousReward} moveInstantaneousReward
  * @returns {Promise<MoveInstantaneousRewardsCert>}
  */
  static new(moveInstantaneousReward: MoveInstantaneousReward): Promise<MoveInstantaneousRewardsCert> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class MultiAsset extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<MultiAsset>}
  */
  static fromBytes(bytes: Uint8Array): Promise<MultiAsset> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<MultiAsset>}
  */
  static fromHex(hexStr: string): Promise<MultiAsset> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<MultiAsset>}
  */
  static fromJson(json: string): Promise<MultiAsset> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<MultiAsset>}
  */
  static new(): Promise<MultiAsset> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {ScriptHash} policyId
  * @param {Assets} assets
  * @returns {Promise<Optional<Assets>>}
  */
  abstract insert(policyId: ScriptHash, assets: Assets): Promise<Optional<Assets>>;

  /**
  * @param {ScriptHash} policyId
  * @returns {Promise<Optional<Assets>>}
  */
  abstract get(policyId: ScriptHash): Promise<Optional<Assets>>;

  /**
  * @param {ScriptHash} policyId
  * @param {AssetName} assetName
  * @param {BigNum} value
  * @returns {Promise<Optional<BigNum>>}
  */
  abstract setAsset(policyId: ScriptHash, assetName: AssetName, value: BigNum): Promise<Optional<BigNum>>;

  /**
  * @param {ScriptHash} policyId
  * @param {AssetName} assetName
  * @returns {Promise<BigNum>}
  */
  abstract getAsset(policyId: ScriptHash, assetName: AssetName): Promise<BigNum>;

  /**
  * @returns {Promise<ScriptHashes>}
  */
  abstract keys(): Promise<ScriptHashes>;

  /**
  * @param {MultiAsset} rhsMa
  * @returns {Promise<MultiAsset>}
  */
  abstract sub(rhsMa: MultiAsset): Promise<MultiAsset>;

}

export abstract class MultiHostName extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<MultiHostName>}
  */
  static fromBytes(bytes: Uint8Array): Promise<MultiHostName> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<MultiHostName>}
  */
  static fromHex(hexStr: string): Promise<MultiHostName> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<MultiHostName>}
  */
  static fromJson(json: string): Promise<MultiHostName> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<DNSRecordSRV>}
  */
  abstract dnsName(): Promise<DNSRecordSRV>;

  /**
  * @param {DNSRecordSRV} dnsName
  * @returns {Promise<MultiHostName>}
  */
  static new(dnsName: DNSRecordSRV): Promise<MultiHostName> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class NativeScript extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<NativeScript>}
  */
  static fromBytes(bytes: Uint8Array): Promise<NativeScript> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<NativeScript>}
  */
  static fromHex(hexStr: string): Promise<NativeScript> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<NativeScript>}
  */
  static fromJson(json: string): Promise<NativeScript> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<ScriptHash>}
  */
  abstract hash(): Promise<ScriptHash>;

  /**
  * @param {ScriptPubkey} scriptPubkey
  * @returns {Promise<NativeScript>}
  */
  static newScriptPubkey(scriptPubkey: ScriptPubkey): Promise<NativeScript> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {ScriptAll} scriptAll
  * @returns {Promise<NativeScript>}
  */
  static newScriptAll(scriptAll: ScriptAll): Promise<NativeScript> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {ScriptAny} scriptAny
  * @returns {Promise<NativeScript>}
  */
  static newScriptAny(scriptAny: ScriptAny): Promise<NativeScript> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {ScriptNOfK} scriptNOfK
  * @returns {Promise<NativeScript>}
  */
  static newScriptNOfK(scriptNOfK: ScriptNOfK): Promise<NativeScript> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {TimelockStart} timelockStart
  * @returns {Promise<NativeScript>}
  */
  static newTimelockStart(timelockStart: TimelockStart): Promise<NativeScript> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {TimelockExpiry} timelockExpiry
  * @returns {Promise<NativeScript>}
  */
  static newTimelockExpiry(timelockExpiry: TimelockExpiry): Promise<NativeScript> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<NativeScriptKind>}
  */
  abstract kind(): Promise<NativeScriptKind>;

  /**
  * @returns {Promise<Optional<ScriptPubkey>>}
  */
  abstract asScriptPubkey(): Promise<Optional<ScriptPubkey>>;

  /**
  * @returns {Promise<Optional<ScriptAll>>}
  */
  abstract asScriptAll(): Promise<Optional<ScriptAll>>;

  /**
  * @returns {Promise<Optional<ScriptAny>>}
  */
  abstract asScriptAny(): Promise<Optional<ScriptAny>>;

  /**
  * @returns {Promise<Optional<ScriptNOfK>>}
  */
  abstract asScriptNOfK(): Promise<Optional<ScriptNOfK>>;

  /**
  * @returns {Promise<Optional<TimelockStart>>}
  */
  abstract asTimelockStart(): Promise<Optional<TimelockStart>>;

  /**
  * @returns {Promise<Optional<TimelockExpiry>>}
  */
  abstract asTimelockExpiry(): Promise<Optional<TimelockExpiry>>;

  /**
  * @returns {Promise<Ed25519KeyHashes>}
  */
  abstract getRequiredSigners(): Promise<Ed25519KeyHashes>;

}

export abstract class NativeScriptSource extends _Ptr {
  /**
  * @param {NativeScript} script
  * @returns {Promise<NativeScriptSource>}
  */
  static new(script: NativeScript): Promise<NativeScriptSource> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {ScriptHash} scriptHash
  * @param {TransactionInput} input
  * @param {number} scriptSize
  * @returns {Promise<NativeScriptSource>}
  */
  static newRefInput(scriptHash: ScriptHash, input: TransactionInput, scriptSize: number): Promise<NativeScriptSource> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Ed25519KeyHashes} keyHashes
  */
  abstract setRequiredSigners(keyHashes: Ed25519KeyHashes): Promise<void>;

  /**
  * @returns {Promise<Optional<number>>}
  */
  abstract getRefScriptSize(): Promise<Optional<number>>;

}

export abstract class NativeScripts extends _Ptr {
  /**
  * @returns {Promise<NativeScripts>}
  */
  static new(): Promise<NativeScripts> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {number} index
  * @returns {Promise<NativeScript>}
  */
  abstract get(index: number): Promise<NativeScript>;

  /**
  * @param {NativeScript} elem
  */
  abstract add(elem: NativeScript): Promise<void>;

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<NativeScripts>}
  */
  static fromBytes(bytes: Uint8Array): Promise<NativeScripts> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<NativeScripts>}
  */
  static fromHex(hexStr: string): Promise<NativeScripts> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<NativeScripts>}
  */
  static fromJson(json: string): Promise<NativeScripts> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class NetworkId extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<NetworkId>}
  */
  static fromBytes(bytes: Uint8Array): Promise<NetworkId> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<NetworkId>}
  */
  static fromHex(hexStr: string): Promise<NetworkId> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<NetworkId>}
  */
  static fromJson(json: string): Promise<NetworkId> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<NetworkId>}
  */
  static testnet(): Promise<NetworkId> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<NetworkId>}
  */
  static mainnet(): Promise<NetworkId> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<NetworkIdKind>}
  */
  abstract kind(): Promise<NetworkIdKind>;

}

export abstract class NetworkInfo extends _Ptr {
  /**
  * @param {number} networkId
  * @param {number} protocolMagic
  * @returns {Promise<NetworkInfo>}
  */
  static new(networkId: number, protocolMagic: number): Promise<NetworkInfo> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract networkId(): Promise<number>;

  /**
  * @returns {Promise<number>}
  */
  abstract protocolMagic(): Promise<number>;

  /**
  * @returns {Promise<NetworkInfo>}
  */
  static testnetPreview(): Promise<NetworkInfo> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<NetworkInfo>}
  */
  static testnetPreprod(): Promise<NetworkInfo> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<NetworkInfo>}
  */
  static mainnet(): Promise<NetworkInfo> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class NewConstitutionAction extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<NewConstitutionAction>}
  */
  static fromBytes(bytes: Uint8Array): Promise<NewConstitutionAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<NewConstitutionAction>}
  */
  static fromHex(hexStr: string): Promise<NewConstitutionAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<NewConstitutionAction>}
  */
  static fromJson(json: string): Promise<NewConstitutionAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Optional<GovernanceActionId>>}
  */
  abstract govActionId(): Promise<Optional<GovernanceActionId>>;

  /**
  * @returns {Promise<Constitution>}
  */
  abstract constitution(): Promise<Constitution>;

  /**
  * @param {Constitution} constitution
  * @returns {Promise<NewConstitutionAction>}
  */
  static new(constitution: Constitution): Promise<NewConstitutionAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {GovernanceActionId} govActionId
  * @param {Constitution} constitution
  * @returns {Promise<NewConstitutionAction>}
  */
  static newWithActionId(govActionId: GovernanceActionId, constitution: Constitution): Promise<NewConstitutionAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<boolean>}
  */
  abstract hasScriptHash(): Promise<boolean>;

}

export abstract class NoConfidenceAction extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<NoConfidenceAction>}
  */
  static fromBytes(bytes: Uint8Array): Promise<NoConfidenceAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<NoConfidenceAction>}
  */
  static fromHex(hexStr: string): Promise<NoConfidenceAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<NoConfidenceAction>}
  */
  static fromJson(json: string): Promise<NoConfidenceAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Optional<GovernanceActionId>>}
  */
  abstract govActionId(): Promise<Optional<GovernanceActionId>>;

  /**
  * @returns {Promise<NoConfidenceAction>}
  */
  static new(): Promise<NoConfidenceAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {GovernanceActionId} govActionId
  * @returns {Promise<NoConfidenceAction>}
  */
  static newWithActionId(govActionId: GovernanceActionId): Promise<NoConfidenceAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class Nonce extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<Nonce>}
  */
  static fromBytes(bytes: Uint8Array): Promise<Nonce> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<Nonce>}
  */
  static fromHex(hexStr: string): Promise<Nonce> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<Nonce>}
  */
  static fromJson(json: string): Promise<Nonce> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Nonce>}
  */
  static newIdentity(): Promise<Nonce> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Uint8Array} hash
  * @returns {Promise<Nonce>}
  */
  static newFromHash(hash: Uint8Array): Promise<Nonce> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Optional<Uint8Array>>}
  */
  abstract getHash(): Promise<Optional<Uint8Array>>;

}

export abstract class OperationalCert extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<OperationalCert>}
  */
  static fromBytes(bytes: Uint8Array): Promise<OperationalCert> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<OperationalCert>}
  */
  static fromHex(hexStr: string): Promise<OperationalCert> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<OperationalCert>}
  */
  static fromJson(json: string): Promise<OperationalCert> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<KESVKey>}
  */
  abstract hotVkey(): Promise<KESVKey>;

  /**
  * @returns {Promise<number>}
  */
  abstract sequenceNumber(): Promise<number>;

  /**
  * @returns {Promise<number>}
  */
  abstract kesPeriod(): Promise<number>;

  /**
  * @returns {Promise<Ed25519Signature>}
  */
  abstract sigma(): Promise<Ed25519Signature>;

  /**
  * @param {KESVKey} hotVkey
  * @param {number} sequenceNumber
  * @param {number} kesPeriod
  * @param {Ed25519Signature} sigma
  * @returns {Promise<OperationalCert>}
  */
  static new(hotVkey: KESVKey, sequenceNumber: number, kesPeriod: number, sigma: Ed25519Signature): Promise<OperationalCert> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class OutputDatum extends _Ptr {
  /**
  * @param {DataHash} dataHash
  * @returns {Promise<OutputDatum>}
  */
  static newDataHash(dataHash: DataHash): Promise<OutputDatum> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {PlutusData} data
  * @returns {Promise<OutputDatum>}
  */
  static newData(data: PlutusData): Promise<OutputDatum> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Optional<DataHash>>}
  */
  abstract dataHash(): Promise<Optional<DataHash>>;

  /**
  * @returns {Promise<Optional<PlutusData>>}
  */
  abstract data(): Promise<Optional<PlutusData>>;

}

export abstract class ParameterChangeAction extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<ParameterChangeAction>}
  */
  static fromBytes(bytes: Uint8Array): Promise<ParameterChangeAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<ParameterChangeAction>}
  */
  static fromHex(hexStr: string): Promise<ParameterChangeAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<ParameterChangeAction>}
  */
  static fromJson(json: string): Promise<ParameterChangeAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Optional<GovernanceActionId>>}
  */
  abstract govActionId(): Promise<Optional<GovernanceActionId>>;

  /**
  * @returns {Promise<ProtocolParamUpdate>}
  */
  abstract protocolParamUpdates(): Promise<ProtocolParamUpdate>;

  /**
  * @returns {Promise<Optional<ScriptHash>>}
  */
  abstract policyHash(): Promise<Optional<ScriptHash>>;

  /**
  * @param {ProtocolParamUpdate} protocolParamUpdates
  * @returns {Promise<ParameterChangeAction>}
  */
  static new(protocolParamUpdates: ProtocolParamUpdate): Promise<ParameterChangeAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {GovernanceActionId} govActionId
  * @param {ProtocolParamUpdate} protocolParamUpdates
  * @returns {Promise<ParameterChangeAction>}
  */
  static newWithActionId(govActionId: GovernanceActionId, protocolParamUpdates: ProtocolParamUpdate): Promise<ParameterChangeAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {ProtocolParamUpdate} protocolParamUpdates
  * @param {ScriptHash} policyHash
  * @returns {Promise<ParameterChangeAction>}
  */
  static newWithPolicyHash(protocolParamUpdates: ProtocolParamUpdate, policyHash: ScriptHash): Promise<ParameterChangeAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {GovernanceActionId} govActionId
  * @param {ProtocolParamUpdate} protocolParamUpdates
  * @param {ScriptHash} policyHash
  * @returns {Promise<ParameterChangeAction>}
  */
  static newWithPolicyHashAndActionId(govActionId: GovernanceActionId, protocolParamUpdates: ProtocolParamUpdate, policyHash: ScriptHash): Promise<ParameterChangeAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class PlutusData extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<PlutusData>}
  */
  static fromBytes(bytes: Uint8Array): Promise<PlutusData> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<PlutusData>}
  */
  static fromHex(hexStr: string): Promise<PlutusData> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {ConstrPlutusData} constrPlutusData
  * @returns {Promise<PlutusData>}
  */
  static newConstrPlutusData(constrPlutusData: ConstrPlutusData): Promise<PlutusData> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {BigNum} alternative
  * @returns {Promise<PlutusData>}
  */
  static newEmptyConstrPlutusData(alternative: BigNum): Promise<PlutusData> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {BigNum} alternative
  * @param {PlutusData} plutusData
  * @returns {Promise<PlutusData>}
  */
  static newSingleValueConstrPlutusData(alternative: BigNum, plutusData: PlutusData): Promise<PlutusData> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {PlutusMap} map
  * @returns {Promise<PlutusData>}
  */
  static newMap(map: PlutusMap): Promise<PlutusData> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {PlutusList} list
  * @returns {Promise<PlutusData>}
  */
  static newList(list: PlutusList): Promise<PlutusData> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {BigInt} integer
  * @returns {Promise<PlutusData>}
  */
  static newInteger(integer: BigInt): Promise<PlutusData> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<PlutusData>}
  */
  static newBytes(bytes: Uint8Array): Promise<PlutusData> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<PlutusDataKind>}
  */
  abstract kind(): Promise<PlutusDataKind>;

  /**
  * @returns {Promise<Optional<ConstrPlutusData>>}
  */
  abstract asConstrPlutusData(): Promise<Optional<ConstrPlutusData>>;

  /**
  * @returns {Promise<Optional<PlutusMap>>}
  */
  abstract asMap(): Promise<Optional<PlutusMap>>;

  /**
  * @returns {Promise<Optional<PlutusList>>}
  */
  abstract asList(): Promise<Optional<PlutusList>>;

  /**
  * @returns {Promise<Optional<BigInt>>}
  */
  abstract asInteger(): Promise<Optional<BigInt>>;

  /**
  * @returns {Promise<Optional<Uint8Array>>}
  */
  abstract asBytes(): Promise<Optional<Uint8Array>>;

  /**
  * @param {PlutusDatumSchema} schema
  * @returns {Promise<string>}
  */
  abstract toJson(schema: PlutusDatumSchema): Promise<string>;

  /**
  * @param {string} json
  * @param {PlutusDatumSchema} schema
  * @returns {Promise<PlutusData>}
  */
  static fromJson(json: string, schema: PlutusDatumSchema): Promise<PlutusData> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Address} address
  * @returns {Promise<PlutusData>}
  */
  static fromAddress(address: Address): Promise<PlutusData> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class PlutusList extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<PlutusList>}
  */
  static fromBytes(bytes: Uint8Array): Promise<PlutusList> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<PlutusList>}
  */
  static fromHex(hexStr: string): Promise<PlutusList> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<PlutusList>}
  */
  static new(): Promise<PlutusList> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {number} index
  * @returns {Promise<PlutusData>}
  */
  abstract get(index: number): Promise<PlutusData>;

  /**
  * @param {PlutusData} elem
  */
  abstract add(elem: PlutusData): Promise<void>;

}

export abstract class PlutusMap extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<PlutusMap>}
  */
  static fromBytes(bytes: Uint8Array): Promise<PlutusMap> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<PlutusMap>}
  */
  static fromHex(hexStr: string): Promise<PlutusMap> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<PlutusMap>}
  */
  static new(): Promise<PlutusMap> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {PlutusData} key
  * @param {PlutusMapValues} values
  * @returns {Promise<Optional<PlutusMapValues>>}
  */
  abstract insert(key: PlutusData, values: PlutusMapValues): Promise<Optional<PlutusMapValues>>;

  /**
  * @param {PlutusData} key
  * @returns {Promise<Optional<PlutusMapValues>>}
  */
  abstract get(key: PlutusData): Promise<Optional<PlutusMapValues>>;

  /**
  * @returns {Promise<PlutusList>}
  */
  abstract keys(): Promise<PlutusList>;

}

export abstract class PlutusMapValues extends _Ptr {
  /**
  * @returns {Promise<PlutusMapValues>}
  */
  static new(): Promise<PlutusMapValues> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {number} index
  * @returns {Promise<Optional<PlutusData>>}
  */
  abstract get(index: number): Promise<Optional<PlutusData>>;

  /**
  * @param {PlutusData} elem
  */
  abstract add(elem: PlutusData): Promise<void>;

}

export abstract class PlutusScript extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<PlutusScript>}
  */
  static fromBytes(bytes: Uint8Array): Promise<PlutusScript> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<PlutusScript>}
  */
  static fromHex(hexStr: string): Promise<PlutusScript> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<PlutusScript>}
  */
  static new(bytes: Uint8Array): Promise<PlutusScript> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<PlutusScript>}
  */
  static newV2(bytes: Uint8Array): Promise<PlutusScript> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<PlutusScript>}
  */
  static newV3(bytes: Uint8Array): Promise<PlutusScript> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Uint8Array} bytes
  * @param {Language} language
  * @returns {Promise<PlutusScript>}
  */
  static newWithVersion(bytes: Uint8Array, language: Language): Promise<PlutusScript> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract bytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<PlutusScript>}
  */
  static fromBytesV2(bytes: Uint8Array): Promise<PlutusScript> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<PlutusScript>}
  */
  static fromBytesV3(bytes: Uint8Array): Promise<PlutusScript> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Uint8Array} bytes
  * @param {Language} language
  * @returns {Promise<PlutusScript>}
  */
  static fromBytesWithVersion(bytes: Uint8Array, language: Language): Promise<PlutusScript> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {string} hexStr
  * @param {Language} language
  * @returns {Promise<PlutusScript>}
  */
  static fromHexWithVersion(hexStr: string, language: Language): Promise<PlutusScript> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<ScriptHash>}
  */
  abstract hash(): Promise<ScriptHash>;

  /**
  * @returns {Promise<Language>}
  */
  abstract languageVersion(): Promise<Language>;

}

export abstract class PlutusScriptSource extends _Ptr {
  /**
  * @param {PlutusScript} script
  * @returns {Promise<PlutusScriptSource>}
  */
  static new(script: PlutusScript): Promise<PlutusScriptSource> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {ScriptHash} scriptHash
  * @param {TransactionInput} input
  * @param {Language} langVer
  * @param {number} scriptSize
  * @returns {Promise<PlutusScriptSource>}
  */
  static newRefInput(scriptHash: ScriptHash, input: TransactionInput, langVer: Language, scriptSize: number): Promise<PlutusScriptSource> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Ed25519KeyHashes} keyHashes
  */
  abstract setRequiredSigners(keyHashes: Ed25519KeyHashes): Promise<void>;

  /**
  * @returns {Promise<Optional<number>>}
  */
  abstract getRefScriptSize(): Promise<Optional<number>>;

}

export abstract class PlutusScripts extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<PlutusScripts>}
  */
  static fromBytes(bytes: Uint8Array): Promise<PlutusScripts> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<PlutusScripts>}
  */
  static fromHex(hexStr: string): Promise<PlutusScripts> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<PlutusScripts>}
  */
  static fromJson(json: string): Promise<PlutusScripts> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<PlutusScripts>}
  */
  static new(): Promise<PlutusScripts> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {number} index
  * @returns {Promise<PlutusScript>}
  */
  abstract get(index: number): Promise<PlutusScript>;

  /**
  * @param {PlutusScript} elem
  */
  abstract add(elem: PlutusScript): Promise<void>;

}

export abstract class PlutusWitness extends _Ptr {
  /**
  * @param {PlutusScript} script
  * @param {PlutusData} datum
  * @param {Redeemer} redeemer
  * @returns {Promise<PlutusWitness>}
  */
  static new(script: PlutusScript, datum: PlutusData, redeemer: Redeemer): Promise<PlutusWitness> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {PlutusScriptSource} script
  * @param {DatumSource} datum
  * @param {Redeemer} redeemer
  * @returns {Promise<PlutusWitness>}
  */
  static newWithRef(script: PlutusScriptSource, datum: DatumSource, redeemer: Redeemer): Promise<PlutusWitness> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {PlutusScript} script
  * @param {Redeemer} redeemer
  * @returns {Promise<PlutusWitness>}
  */
  static newWithoutDatum(script: PlutusScript, redeemer: Redeemer): Promise<PlutusWitness> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {PlutusScriptSource} script
  * @param {Redeemer} redeemer
  * @returns {Promise<PlutusWitness>}
  */
  static newWithRefWithoutDatum(script: PlutusScriptSource, redeemer: Redeemer): Promise<PlutusWitness> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Optional<PlutusScript>>}
  */
  abstract script(): Promise<Optional<PlutusScript>>;

  /**
  * @returns {Promise<Optional<PlutusData>>}
  */
  abstract datum(): Promise<Optional<PlutusData>>;

  /**
  * @returns {Promise<Redeemer>}
  */
  abstract redeemer(): Promise<Redeemer>;

}

export abstract class PlutusWitnesses extends _Ptr {
  /**
  * @returns {Promise<PlutusWitnesses>}
  */
  static new(): Promise<PlutusWitnesses> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {number} index
  * @returns {Promise<PlutusWitness>}
  */
  abstract get(index: number): Promise<PlutusWitness>;

  /**
  * @param {PlutusWitness} elem
  */
  abstract add(elem: PlutusWitness): Promise<void>;

}

export abstract class Pointer extends _Ptr {
  /**
  * @param {number} slot
  * @param {number} txIndex
  * @param {number} certIndex
  * @returns {Promise<Pointer>}
  */
  static new(slot: number, txIndex: number, certIndex: number): Promise<Pointer> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {BigNum} slot
  * @param {BigNum} txIndex
  * @param {BigNum} certIndex
  * @returns {Promise<Pointer>}
  */
  static newPointer(slot: BigNum, txIndex: BigNum, certIndex: BigNum): Promise<Pointer> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract slot(): Promise<number>;

  /**
  * @returns {Promise<number>}
  */
  abstract txIndex(): Promise<number>;

  /**
  * @returns {Promise<number>}
  */
  abstract certIndex(): Promise<number>;

  /**
  * @returns {Promise<BigNum>}
  */
  abstract slotBignum(): Promise<BigNum>;

  /**
  * @returns {Promise<BigNum>}
  */
  abstract txIndexBignum(): Promise<BigNum>;

  /**
  * @returns {Promise<BigNum>}
  */
  abstract certIndexBignum(): Promise<BigNum>;

}

export abstract class PointerAddress extends _Ptr {
  /**
  * @param {number} network
  * @param {Credential} payment
  * @param {Pointer} stake
  * @returns {Promise<PointerAddress>}
  */
  static new(network: number, payment: Credential, stake: Pointer): Promise<PointerAddress> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Credential>}
  */
  abstract paymentCred(): Promise<Credential>;

  /**
  * @returns {Promise<Pointer>}
  */
  abstract stakePointer(): Promise<Pointer>;

  /**
  * @returns {Promise<Address>}
  */
  abstract toAddress(): Promise<Address>;

  /**
  * @param {Address} addr
  * @returns {Promise<Optional<PointerAddress>>}
  */
  static fromAddress(addr: Address): Promise<Optional<PointerAddress>> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract networkId(): Promise<number>;

}

export abstract class PoolMetadata extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<PoolMetadata>}
  */
  static fromBytes(bytes: Uint8Array): Promise<PoolMetadata> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<PoolMetadata>}
  */
  static fromHex(hexStr: string): Promise<PoolMetadata> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<PoolMetadata>}
  */
  static fromJson(json: string): Promise<PoolMetadata> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<URL>}
  */
  abstract url(): Promise<URL>;

  /**
  * @returns {Promise<PoolMetadataHash>}
  */
  abstract poolMetadataHash(): Promise<PoolMetadataHash>;

  /**
  * @param {URL} url
  * @param {PoolMetadataHash} poolMetadataHash
  * @returns {Promise<PoolMetadata>}
  */
  static new(url: URL, poolMetadataHash: PoolMetadataHash): Promise<PoolMetadata> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class PoolMetadataHash extends _Ptr {
  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<PoolMetadataHash>}
  */
  static fromBytes(bytes: Uint8Array): Promise<PoolMetadataHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {string} prefix
  * @returns {Promise<string>}
  */
  abstract toBech32(prefix: string): Promise<string>;

  /**
  * @param {string} bechStr
  * @returns {Promise<PoolMetadataHash>}
  */
  static fromBech32(bechStr: string): Promise<PoolMetadataHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hex
  * @returns {Promise<PoolMetadataHash>}
  */
  static fromHex(hex: string): Promise<PoolMetadataHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class PoolParams extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<PoolParams>}
  */
  static fromBytes(bytes: Uint8Array): Promise<PoolParams> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<PoolParams>}
  */
  static fromHex(hexStr: string): Promise<PoolParams> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<PoolParams>}
  */
  static fromJson(json: string): Promise<PoolParams> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Ed25519KeyHash>}
  */
  abstract operator(): Promise<Ed25519KeyHash>;

  /**
  * @returns {Promise<VRFKeyHash>}
  */
  abstract vrfKeyhash(): Promise<VRFKeyHash>;

  /**
  * @returns {Promise<BigNum>}
  */
  abstract pledge(): Promise<BigNum>;

  /**
  * @returns {Promise<BigNum>}
  */
  abstract cost(): Promise<BigNum>;

  /**
  * @returns {Promise<UnitInterval>}
  */
  abstract margin(): Promise<UnitInterval>;

  /**
  * @returns {Promise<RewardAddress>}
  */
  abstract rewardAccount(): Promise<RewardAddress>;

  /**
  * @returns {Promise<Ed25519KeyHashes>}
  */
  abstract poolOwners(): Promise<Ed25519KeyHashes>;

  /**
  * @returns {Promise<Relays>}
  */
  abstract relays(): Promise<Relays>;

  /**
  * @returns {Promise<Optional<PoolMetadata>>}
  */
  abstract poolMetadata(): Promise<Optional<PoolMetadata>>;

  /**
  * @param {Ed25519KeyHash} operator
  * @param {VRFKeyHash} vrfKeyhash
  * @param {BigNum} pledge
  * @param {BigNum} cost
  * @param {UnitInterval} margin
  * @param {RewardAddress} rewardAccount
  * @param {Ed25519KeyHashes} poolOwners
  * @param {Relays} relays
  * @param {Optional<PoolMetadata>} poolMetadata
  * @returns {Promise<PoolParams>}
  */
  static new(operator: Ed25519KeyHash, vrfKeyhash: VRFKeyHash, pledge: BigNum, cost: BigNum, margin: UnitInterval, rewardAccount: RewardAddress, poolOwners: Ed25519KeyHashes, relays: Relays, poolMetadata: Optional<PoolMetadata>): Promise<PoolParams> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class PoolRegistration extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<PoolRegistration>}
  */
  static fromBytes(bytes: Uint8Array): Promise<PoolRegistration> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<PoolRegistration>}
  */
  static fromHex(hexStr: string): Promise<PoolRegistration> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<PoolRegistration>}
  */
  static fromJson(json: string): Promise<PoolRegistration> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<PoolParams>}
  */
  abstract poolParams(): Promise<PoolParams>;

  /**
  * @param {PoolParams} poolParams
  * @returns {Promise<PoolRegistration>}
  */
  static new(poolParams: PoolParams): Promise<PoolRegistration> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class PoolRetirement extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<PoolRetirement>}
  */
  static fromBytes(bytes: Uint8Array): Promise<PoolRetirement> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<PoolRetirement>}
  */
  static fromHex(hexStr: string): Promise<PoolRetirement> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<PoolRetirement>}
  */
  static fromJson(json: string): Promise<PoolRetirement> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Ed25519KeyHash>}
  */
  abstract poolKeyhash(): Promise<Ed25519KeyHash>;

  /**
  * @returns {Promise<number>}
  */
  abstract epoch(): Promise<number>;

  /**
  * @param {Ed25519KeyHash} poolKeyhash
  * @param {number} epoch
  * @returns {Promise<PoolRetirement>}
  */
  static new(poolKeyhash: Ed25519KeyHash, epoch: number): Promise<PoolRetirement> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class PoolVotingThresholds extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<PoolVotingThresholds>}
  */
  static fromBytes(bytes: Uint8Array): Promise<PoolVotingThresholds> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<PoolVotingThresholds>}
  */
  static fromHex(hexStr: string): Promise<PoolVotingThresholds> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<PoolVotingThresholds>}
  */
  static fromJson(json: string): Promise<PoolVotingThresholds> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {UnitInterval} motionNoConfidence
  * @param {UnitInterval} committeeNormal
  * @param {UnitInterval} committeeNoConfidence
  * @param {UnitInterval} hardForkInitiation
  * @param {UnitInterval} securityRelevantThreshold
  * @returns {Promise<PoolVotingThresholds>}
  */
  static new(motionNoConfidence: UnitInterval, committeeNormal: UnitInterval, committeeNoConfidence: UnitInterval, hardForkInitiation: UnitInterval, securityRelevantThreshold: UnitInterval): Promise<PoolVotingThresholds> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<UnitInterval>}
  */
  abstract motionNoConfidence(): Promise<UnitInterval>;

  /**
  * @returns {Promise<UnitInterval>}
  */
  abstract committeeNormal(): Promise<UnitInterval>;

  /**
  * @returns {Promise<UnitInterval>}
  */
  abstract committeeNoConfidence(): Promise<UnitInterval>;

  /**
  * @returns {Promise<UnitInterval>}
  */
  abstract hardForkInitiation(): Promise<UnitInterval>;

  /**
  * @returns {Promise<UnitInterval>}
  */
  abstract securityRelevantThreshold(): Promise<UnitInterval>;

}

export abstract class PrivateKey extends _Ptr {
  /**
  * @returns {Promise<PublicKey>}
  */
  abstract toPublic(): Promise<PublicKey>;

  /**
  * @returns {Promise<PrivateKey>}
  */
  static generateEd25519(): Promise<PrivateKey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<PrivateKey>}
  */
  static generateEd25519extended(): Promise<PrivateKey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {string} bech32Str
  * @returns {Promise<PrivateKey>}
  */
  static fromBech32(bech32Str: string): Promise<PrivateKey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toBech32(): Promise<string>;

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract asBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<PrivateKey>}
  */
  static fromExtendedBytes(bytes: Uint8Array): Promise<PrivateKey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<PrivateKey>}
  */
  static fromNormalBytes(bytes: Uint8Array): Promise<PrivateKey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Uint8Array} message
  * @returns {Promise<Ed25519Signature>}
  */
  abstract sign(message: Uint8Array): Promise<Ed25519Signature>;

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<PrivateKey>}
  */
  static fromHex(hexStr: string): Promise<PrivateKey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class ProposedProtocolParameterUpdates extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<ProposedProtocolParameterUpdates>}
  */
  static fromBytes(bytes: Uint8Array): Promise<ProposedProtocolParameterUpdates> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<ProposedProtocolParameterUpdates>}
  */
  static fromHex(hexStr: string): Promise<ProposedProtocolParameterUpdates> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<ProposedProtocolParameterUpdates>}
  */
  static fromJson(json: string): Promise<ProposedProtocolParameterUpdates> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<ProposedProtocolParameterUpdates>}
  */
  static new(): Promise<ProposedProtocolParameterUpdates> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {GenesisHash} key
  * @param {ProtocolParamUpdate} value
  * @returns {Promise<Optional<ProtocolParamUpdate>>}
  */
  abstract insert(key: GenesisHash, value: ProtocolParamUpdate): Promise<Optional<ProtocolParamUpdate>>;

  /**
  * @param {GenesisHash} key
  * @returns {Promise<Optional<ProtocolParamUpdate>>}
  */
  abstract get(key: GenesisHash): Promise<Optional<ProtocolParamUpdate>>;

  /**
  * @returns {Promise<GenesisHashes>}
  */
  abstract keys(): Promise<GenesisHashes>;

}

export abstract class ProtocolParamUpdate extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<ProtocolParamUpdate>}
  */
  static fromBytes(bytes: Uint8Array): Promise<ProtocolParamUpdate> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<ProtocolParamUpdate>}
  */
  static fromHex(hexStr: string): Promise<ProtocolParamUpdate> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<ProtocolParamUpdate>}
  */
  static fromJson(json: string): Promise<ProtocolParamUpdate> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {BigNum} minfeeA
  */
  abstract setMinfeeA(minfeeA: BigNum): Promise<void>;

  /**
  * @returns {Promise<Optional<BigNum>>}
  */
  abstract minfeeA(): Promise<Optional<BigNum>>;

  /**
  * @param {BigNum} minfeeB
  */
  abstract setMinfeeB(minfeeB: BigNum): Promise<void>;

  /**
  * @returns {Promise<Optional<BigNum>>}
  */
  abstract minfeeB(): Promise<Optional<BigNum>>;

  /**
  * @param {number} maxBlockBodySize
  */
  abstract setMaxBlockBodySize(maxBlockBodySize: number): Promise<void>;

  /**
  * @returns {Promise<Optional<number>>}
  */
  abstract maxBlockBodySize(): Promise<Optional<number>>;

  /**
  * @param {number} maxTxSize
  */
  abstract setMaxTxSize(maxTxSize: number): Promise<void>;

  /**
  * @returns {Promise<Optional<number>>}
  */
  abstract maxTxSize(): Promise<Optional<number>>;

  /**
  * @param {number} maxBlockHeaderSize
  */
  abstract setMaxBlockHeaderSize(maxBlockHeaderSize: number): Promise<void>;

  /**
  * @returns {Promise<Optional<number>>}
  */
  abstract maxBlockHeaderSize(): Promise<Optional<number>>;

  /**
  * @param {BigNum} keyDeposit
  */
  abstract setKeyDeposit(keyDeposit: BigNum): Promise<void>;

  /**
  * @returns {Promise<Optional<BigNum>>}
  */
  abstract keyDeposit(): Promise<Optional<BigNum>>;

  /**
  * @param {BigNum} poolDeposit
  */
  abstract setPoolDeposit(poolDeposit: BigNum): Promise<void>;

  /**
  * @returns {Promise<Optional<BigNum>>}
  */
  abstract poolDeposit(): Promise<Optional<BigNum>>;

  /**
  * @param {number} maxEpoch
  */
  abstract setMaxEpoch(maxEpoch: number): Promise<void>;

  /**
  * @returns {Promise<Optional<number>>}
  */
  abstract maxEpoch(): Promise<Optional<number>>;

  /**
  * @param {number} nOpt
  */
  abstract setNOpt(nOpt: number): Promise<void>;

  /**
  * @returns {Promise<Optional<number>>}
  */
  abstract nOpt(): Promise<Optional<number>>;

  /**
  * @param {UnitInterval} poolPledgeInfluence
  */
  abstract setPoolPledgeInfluence(poolPledgeInfluence: UnitInterval): Promise<void>;

  /**
  * @returns {Promise<Optional<UnitInterval>>}
  */
  abstract poolPledgeInfluence(): Promise<Optional<UnitInterval>>;

  /**
  * @param {UnitInterval} expansionRate
  */
  abstract setExpansionRate(expansionRate: UnitInterval): Promise<void>;

  /**
  * @returns {Promise<Optional<UnitInterval>>}
  */
  abstract expansionRate(): Promise<Optional<UnitInterval>>;

  /**
  * @param {UnitInterval} treasuryGrowthRate
  */
  abstract setTreasuryGrowthRate(treasuryGrowthRate: UnitInterval): Promise<void>;

  /**
  * @returns {Promise<Optional<UnitInterval>>}
  */
  abstract treasuryGrowthRate(): Promise<Optional<UnitInterval>>;

  /**
  * @returns {Promise<Optional<UnitInterval>>}
  */
  abstract d(): Promise<Optional<UnitInterval>>;

  /**
  * @returns {Promise<Optional<Nonce>>}
  */
  abstract extraEntropy(): Promise<Optional<Nonce>>;

  /**
  * @param {ProtocolVersion} protocolVersion
  */
  abstract setProtocolVersion(protocolVersion: ProtocolVersion): Promise<void>;

  /**
  * @returns {Promise<Optional<ProtocolVersion>>}
  */
  abstract protocolVersion(): Promise<Optional<ProtocolVersion>>;

  /**
  * @param {BigNum} minPoolCost
  */
  abstract setMinPoolCost(minPoolCost: BigNum): Promise<void>;

  /**
  * @returns {Promise<Optional<BigNum>>}
  */
  abstract minPoolCost(): Promise<Optional<BigNum>>;

  /**
  * @param {BigNum} adaPerUtxoByte
  */
  abstract setAdaPerUtxoByte(adaPerUtxoByte: BigNum): Promise<void>;

  /**
  * @returns {Promise<Optional<BigNum>>}
  */
  abstract adaPerUtxoByte(): Promise<Optional<BigNum>>;

  /**
  * @param {Costmdls} costModels
  */
  abstract setCostModels(costModels: Costmdls): Promise<void>;

  /**
  * @returns {Promise<Optional<Costmdls>>}
  */
  abstract costModels(): Promise<Optional<Costmdls>>;

  /**
  * @param {ExUnitPrices} executionCosts
  */
  abstract setExecutionCosts(executionCosts: ExUnitPrices): Promise<void>;

  /**
  * @returns {Promise<Optional<ExUnitPrices>>}
  */
  abstract executionCosts(): Promise<Optional<ExUnitPrices>>;

  /**
  * @param {ExUnits} maxTxExUnits
  */
  abstract setMaxTxExUnits(maxTxExUnits: ExUnits): Promise<void>;

  /**
  * @returns {Promise<Optional<ExUnits>>}
  */
  abstract maxTxExUnits(): Promise<Optional<ExUnits>>;

  /**
  * @param {ExUnits} maxBlockExUnits
  */
  abstract setMaxBlockExUnits(maxBlockExUnits: ExUnits): Promise<void>;

  /**
  * @returns {Promise<Optional<ExUnits>>}
  */
  abstract maxBlockExUnits(): Promise<Optional<ExUnits>>;

  /**
  * @param {number} maxValueSize
  */
  abstract setMaxValueSize(maxValueSize: number): Promise<void>;

  /**
  * @returns {Promise<Optional<number>>}
  */
  abstract maxValueSize(): Promise<Optional<number>>;

  /**
  * @param {number} collateralPercentage
  */
  abstract setCollateralPercentage(collateralPercentage: number): Promise<void>;

  /**
  * @returns {Promise<Optional<number>>}
  */
  abstract collateralPercentage(): Promise<Optional<number>>;

  /**
  * @param {number} maxCollateralInputs
  */
  abstract setMaxCollateralInputs(maxCollateralInputs: number): Promise<void>;

  /**
  * @returns {Promise<Optional<number>>}
  */
  abstract maxCollateralInputs(): Promise<Optional<number>>;

  /**
  * @param {PoolVotingThresholds} poolVotingThresholds
  */
  abstract setPoolVotingThresholds(poolVotingThresholds: PoolVotingThresholds): Promise<void>;

  /**
  * @returns {Promise<Optional<PoolVotingThresholds>>}
  */
  abstract poolVotingThresholds(): Promise<Optional<PoolVotingThresholds>>;

  /**
  * @param {DRepVotingThresholds} drepVotingThresholds
  */
  abstract setDrepVotingThresholds(drepVotingThresholds: DRepVotingThresholds): Promise<void>;

  /**
  * @returns {Promise<Optional<DRepVotingThresholds>>}
  */
  abstract drepVotingThresholds(): Promise<Optional<DRepVotingThresholds>>;

  /**
  * @param {number} minCommitteeSize
  */
  abstract setMinCommitteeSize(minCommitteeSize: number): Promise<void>;

  /**
  * @returns {Promise<Optional<number>>}
  */
  abstract minCommitteeSize(): Promise<Optional<number>>;

  /**
  * @param {number} committeeTermLimit
  */
  abstract setCommitteeTermLimit(committeeTermLimit: number): Promise<void>;

  /**
  * @returns {Promise<Optional<number>>}
  */
  abstract committeeTermLimit(): Promise<Optional<number>>;

  /**
  * @param {number} governanceActionValidityPeriod
  */
  abstract setGovernanceActionValidityPeriod(governanceActionValidityPeriod: number): Promise<void>;

  /**
  * @returns {Promise<Optional<number>>}
  */
  abstract governanceActionValidityPeriod(): Promise<Optional<number>>;

  /**
  * @param {BigNum} governanceActionDeposit
  */
  abstract setGovernanceActionDeposit(governanceActionDeposit: BigNum): Promise<void>;

  /**
  * @returns {Promise<Optional<BigNum>>}
  */
  abstract governanceActionDeposit(): Promise<Optional<BigNum>>;

  /**
  * @param {BigNum} drepDeposit
  */
  abstract setDrepDeposit(drepDeposit: BigNum): Promise<void>;

  /**
  * @returns {Promise<Optional<BigNum>>}
  */
  abstract drepDeposit(): Promise<Optional<BigNum>>;

  /**
  * @param {number} drepInactivityPeriod
  */
  abstract setDrepInactivityPeriod(drepInactivityPeriod: number): Promise<void>;

  /**
  * @returns {Promise<Optional<number>>}
  */
  abstract drepInactivityPeriod(): Promise<Optional<number>>;

  /**
  * @param {UnitInterval} refScriptCoinsPerByte
  */
  abstract setRefScriptCoinsPerByte(refScriptCoinsPerByte: UnitInterval): Promise<void>;

  /**
  * @returns {Promise<Optional<UnitInterval>>}
  */
  abstract refScriptCoinsPerByte(): Promise<Optional<UnitInterval>>;

  /**
  * @returns {Promise<ProtocolParamUpdate>}
  */
  static new(): Promise<ProtocolParamUpdate> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class ProtocolVersion extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<ProtocolVersion>}
  */
  static fromBytes(bytes: Uint8Array): Promise<ProtocolVersion> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<ProtocolVersion>}
  */
  static fromHex(hexStr: string): Promise<ProtocolVersion> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<ProtocolVersion>}
  */
  static fromJson(json: string): Promise<ProtocolVersion> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract major(): Promise<number>;

  /**
  * @returns {Promise<number>}
  */
  abstract minor(): Promise<number>;

  /**
  * @param {number} major
  * @param {number} minor
  * @returns {Promise<ProtocolVersion>}
  */
  static new(major: number, minor: number): Promise<ProtocolVersion> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class PublicKey extends _Ptr {
  /**
  * @param {string} bech32Str
  * @returns {Promise<PublicKey>}
  */
  static fromBech32(bech32Str: string): Promise<PublicKey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toBech32(): Promise<string>;

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract asBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<PublicKey>}
  */
  static fromBytes(bytes: Uint8Array): Promise<PublicKey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Uint8Array} data
  * @param {Ed25519Signature} signature
  * @returns {Promise<boolean>}
  */
  abstract verify(data: Uint8Array, signature: Ed25519Signature): Promise<boolean>;

  /**
  * @returns {Promise<Ed25519KeyHash>}
  */
  abstract hash(): Promise<Ed25519KeyHash>;

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<PublicKey>}
  */
  static fromHex(hexStr: string): Promise<PublicKey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class PublicKeys extends _Ptr {
  /**
  * @returns {Promise<PublicKeys>}
  */
  static new(): Promise<PublicKeys> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract size(): Promise<number>;

  /**
  * @param {number} index
  * @returns {Promise<PublicKey>}
  */
  abstract get(index: number): Promise<PublicKey>;

  /**
  * @param {PublicKey} key
  */
  abstract add(key: PublicKey): Promise<void>;

}

export abstract class Redeemer extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<Redeemer>}
  */
  static fromBytes(bytes: Uint8Array): Promise<Redeemer> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<Redeemer>}
  */
  static fromHex(hexStr: string): Promise<Redeemer> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<Redeemer>}
  */
  static fromJson(json: string): Promise<Redeemer> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<RedeemerTag>}
  */
  abstract tag(): Promise<RedeemerTag>;

  /**
  * @returns {Promise<BigNum>}
  */
  abstract index(): Promise<BigNum>;

  /**
  * @returns {Promise<PlutusData>}
  */
  abstract data(): Promise<PlutusData>;

  /**
  * @returns {Promise<ExUnits>}
  */
  abstract exUnits(): Promise<ExUnits>;

  /**
  * @param {RedeemerTag} tag
  * @param {BigNum} index
  * @param {PlutusData} data
  * @param {ExUnits} exUnits
  * @returns {Promise<Redeemer>}
  */
  static new(tag: RedeemerTag, index: BigNum, data: PlutusData, exUnits: ExUnits): Promise<Redeemer> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class RedeemerTag extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<RedeemerTag>}
  */
  static fromBytes(bytes: Uint8Array): Promise<RedeemerTag> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<RedeemerTag>}
  */
  static fromHex(hexStr: string): Promise<RedeemerTag> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<RedeemerTag>}
  */
  static fromJson(json: string): Promise<RedeemerTag> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<RedeemerTag>}
  */
  static newSpend(): Promise<RedeemerTag> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<RedeemerTag>}
  */
  static newMint(): Promise<RedeemerTag> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<RedeemerTag>}
  */
  static newCert(): Promise<RedeemerTag> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<RedeemerTag>}
  */
  static newReward(): Promise<RedeemerTag> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<RedeemerTag>}
  */
  static newVote(): Promise<RedeemerTag> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<RedeemerTag>}
  */
  static newVotingProposal(): Promise<RedeemerTag> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<RedeemerTagKind>}
  */
  abstract kind(): Promise<RedeemerTagKind>;

}

export abstract class Redeemers extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<Redeemers>}
  */
  static fromBytes(bytes: Uint8Array): Promise<Redeemers> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<Redeemers>}
  */
  static fromHex(hexStr: string): Promise<Redeemers> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<Redeemers>}
  */
  static fromJson(json: string): Promise<Redeemers> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Redeemers>}
  */
  static new(): Promise<Redeemers> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {number} index
  * @returns {Promise<Redeemer>}
  */
  abstract get(index: number): Promise<Redeemer>;

  /**
  * @param {Redeemer} elem
  */
  abstract add(elem: Redeemer): Promise<void>;

  /**
  * @returns {Promise<ExUnits>}
  */
  abstract totalExUnits(): Promise<ExUnits>;

}

export abstract class Relay extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<Relay>}
  */
  static fromBytes(bytes: Uint8Array): Promise<Relay> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<Relay>}
  */
  static fromHex(hexStr: string): Promise<Relay> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<Relay>}
  */
  static fromJson(json: string): Promise<Relay> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {SingleHostAddr} singleHostAddr
  * @returns {Promise<Relay>}
  */
  static newSingleHostAddr(singleHostAddr: SingleHostAddr): Promise<Relay> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {SingleHostName} singleHostName
  * @returns {Promise<Relay>}
  */
  static newSingleHostName(singleHostName: SingleHostName): Promise<Relay> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {MultiHostName} multiHostName
  * @returns {Promise<Relay>}
  */
  static newMultiHostName(multiHostName: MultiHostName): Promise<Relay> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<RelayKind>}
  */
  abstract kind(): Promise<RelayKind>;

  /**
  * @returns {Promise<Optional<SingleHostAddr>>}
  */
  abstract asSingleHostAddr(): Promise<Optional<SingleHostAddr>>;

  /**
  * @returns {Promise<Optional<SingleHostName>>}
  */
  abstract asSingleHostName(): Promise<Optional<SingleHostName>>;

  /**
  * @returns {Promise<Optional<MultiHostName>>}
  */
  abstract asMultiHostName(): Promise<Optional<MultiHostName>>;

}

export abstract class Relays extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<Relays>}
  */
  static fromBytes(bytes: Uint8Array): Promise<Relays> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<Relays>}
  */
  static fromHex(hexStr: string): Promise<Relays> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<Relays>}
  */
  static fromJson(json: string): Promise<Relays> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Relays>}
  */
  static new(): Promise<Relays> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {number} index
  * @returns {Promise<Relay>}
  */
  abstract get(index: number): Promise<Relay>;

  /**
  * @param {Relay} elem
  */
  abstract add(elem: Relay): Promise<void>;

}

export abstract class RewardAddress extends _Ptr {
  /**
  * @param {number} network
  * @param {Credential} payment
  * @returns {Promise<RewardAddress>}
  */
  static new(network: number, payment: Credential): Promise<RewardAddress> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Credential>}
  */
  abstract paymentCred(): Promise<Credential>;

  /**
  * @returns {Promise<Address>}
  */
  abstract toAddress(): Promise<Address>;

  /**
  * @param {Address} addr
  * @returns {Promise<Optional<RewardAddress>>}
  */
  static fromAddress(addr: Address): Promise<Optional<RewardAddress>> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract networkId(): Promise<number>;

}

export abstract class RewardAddresses extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<RewardAddresses>}
  */
  static fromBytes(bytes: Uint8Array): Promise<RewardAddresses> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<RewardAddresses>}
  */
  static fromHex(hexStr: string): Promise<RewardAddresses> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<RewardAddresses>}
  */
  static fromJson(json: string): Promise<RewardAddresses> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<RewardAddresses>}
  */
  static new(): Promise<RewardAddresses> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {number} index
  * @returns {Promise<RewardAddress>}
  */
  abstract get(index: number): Promise<RewardAddress>;

  /**
  * @param {RewardAddress} elem
  */
  abstract add(elem: RewardAddress): Promise<void>;

}

export abstract class ScriptAll extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<ScriptAll>}
  */
  static fromBytes(bytes: Uint8Array): Promise<ScriptAll> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<ScriptAll>}
  */
  static fromHex(hexStr: string): Promise<ScriptAll> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<ScriptAll>}
  */
  static fromJson(json: string): Promise<ScriptAll> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<NativeScripts>}
  */
  abstract nativeScripts(): Promise<NativeScripts>;

  /**
  * @param {NativeScripts} nativeScripts
  * @returns {Promise<ScriptAll>}
  */
  static new(nativeScripts: NativeScripts): Promise<ScriptAll> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class ScriptAny extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<ScriptAny>}
  */
  static fromBytes(bytes: Uint8Array): Promise<ScriptAny> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<ScriptAny>}
  */
  static fromHex(hexStr: string): Promise<ScriptAny> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<ScriptAny>}
  */
  static fromJson(json: string): Promise<ScriptAny> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<NativeScripts>}
  */
  abstract nativeScripts(): Promise<NativeScripts>;

  /**
  * @param {NativeScripts} nativeScripts
  * @returns {Promise<ScriptAny>}
  */
  static new(nativeScripts: NativeScripts): Promise<ScriptAny> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class ScriptDataHash extends _Ptr {
  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<ScriptDataHash>}
  */
  static fromBytes(bytes: Uint8Array): Promise<ScriptDataHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {string} prefix
  * @returns {Promise<string>}
  */
  abstract toBech32(prefix: string): Promise<string>;

  /**
  * @param {string} bechStr
  * @returns {Promise<ScriptDataHash>}
  */
  static fromBech32(bechStr: string): Promise<ScriptDataHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hex
  * @returns {Promise<ScriptDataHash>}
  */
  static fromHex(hex: string): Promise<ScriptDataHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class ScriptHash extends _Ptr {
  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<ScriptHash>}
  */
  static fromBytes(bytes: Uint8Array): Promise<ScriptHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {string} prefix
  * @returns {Promise<string>}
  */
  abstract toBech32(prefix: string): Promise<string>;

  /**
  * @param {string} bechStr
  * @returns {Promise<ScriptHash>}
  */
  static fromBech32(bechStr: string): Promise<ScriptHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hex
  * @returns {Promise<ScriptHash>}
  */
  static fromHex(hex: string): Promise<ScriptHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class ScriptHashes extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<ScriptHashes>}
  */
  static fromBytes(bytes: Uint8Array): Promise<ScriptHashes> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<ScriptHashes>}
  */
  static fromHex(hexStr: string): Promise<ScriptHashes> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<ScriptHashes>}
  */
  static fromJson(json: string): Promise<ScriptHashes> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<ScriptHashes>}
  */
  static new(): Promise<ScriptHashes> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {number} index
  * @returns {Promise<ScriptHash>}
  */
  abstract get(index: number): Promise<ScriptHash>;

  /**
  * @param {ScriptHash} elem
  */
  abstract add(elem: ScriptHash): Promise<void>;

}

export abstract class ScriptNOfK extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<ScriptNOfK>}
  */
  static fromBytes(bytes: Uint8Array): Promise<ScriptNOfK> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<ScriptNOfK>}
  */
  static fromHex(hexStr: string): Promise<ScriptNOfK> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<ScriptNOfK>}
  */
  static fromJson(json: string): Promise<ScriptNOfK> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract n(): Promise<number>;

  /**
  * @returns {Promise<NativeScripts>}
  */
  abstract nativeScripts(): Promise<NativeScripts>;

  /**
  * @param {number} n
  * @param {NativeScripts} nativeScripts
  * @returns {Promise<ScriptNOfK>}
  */
  static new(n: number, nativeScripts: NativeScripts): Promise<ScriptNOfK> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class ScriptPubkey extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<ScriptPubkey>}
  */
  static fromBytes(bytes: Uint8Array): Promise<ScriptPubkey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<ScriptPubkey>}
  */
  static fromHex(hexStr: string): Promise<ScriptPubkey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<ScriptPubkey>}
  */
  static fromJson(json: string): Promise<ScriptPubkey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Ed25519KeyHash>}
  */
  abstract addrKeyhash(): Promise<Ed25519KeyHash>;

  /**
  * @param {Ed25519KeyHash} addrKeyhash
  * @returns {Promise<ScriptPubkey>}
  */
  static new(addrKeyhash: Ed25519KeyHash): Promise<ScriptPubkey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class ScriptRef extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<ScriptRef>}
  */
  static fromBytes(bytes: Uint8Array): Promise<ScriptRef> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<ScriptRef>}
  */
  static fromHex(hexStr: string): Promise<ScriptRef> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<ScriptRef>}
  */
  static fromJson(json: string): Promise<ScriptRef> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {NativeScript} nativeScript
  * @returns {Promise<ScriptRef>}
  */
  static newNativeScript(nativeScript: NativeScript): Promise<ScriptRef> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {PlutusScript} plutusScript
  * @returns {Promise<ScriptRef>}
  */
  static newPlutusScript(plutusScript: PlutusScript): Promise<ScriptRef> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<boolean>}
  */
  abstract isNativeScript(): Promise<boolean>;

  /**
  * @returns {Promise<boolean>}
  */
  abstract isPlutusScript(): Promise<boolean>;

  /**
  * @returns {Promise<Optional<NativeScript>>}
  */
  abstract nativeScript(): Promise<Optional<NativeScript>>;

  /**
  * @returns {Promise<Optional<PlutusScript>>}
  */
  abstract plutusScript(): Promise<Optional<PlutusScript>>;

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toUnwrappedBytes(): Promise<Uint8Array>;

}

export abstract class SingleHostAddr extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<SingleHostAddr>}
  */
  static fromBytes(bytes: Uint8Array): Promise<SingleHostAddr> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<SingleHostAddr>}
  */
  static fromHex(hexStr: string): Promise<SingleHostAddr> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<SingleHostAddr>}
  */
  static fromJson(json: string): Promise<SingleHostAddr> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Optional<number>>}
  */
  abstract port(): Promise<Optional<number>>;

  /**
  * @returns {Promise<Optional<Ipv4>>}
  */
  abstract ipv4(): Promise<Optional<Ipv4>>;

  /**
  * @returns {Promise<Optional<Ipv6>>}
  */
  abstract ipv6(): Promise<Optional<Ipv6>>;

  /**
  * @param {Optional<number>} port
  * @param {Optional<Ipv4>} ipv4
  * @param {Optional<Ipv6>} ipv6
  * @returns {Promise<SingleHostAddr>}
  */
  static new(port: Optional<number>, ipv4: Optional<Ipv4>, ipv6: Optional<Ipv6>): Promise<SingleHostAddr> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class SingleHostName extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<SingleHostName>}
  */
  static fromBytes(bytes: Uint8Array): Promise<SingleHostName> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<SingleHostName>}
  */
  static fromHex(hexStr: string): Promise<SingleHostName> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<SingleHostName>}
  */
  static fromJson(json: string): Promise<SingleHostName> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Optional<number>>}
  */
  abstract port(): Promise<Optional<number>>;

  /**
  * @returns {Promise<DNSRecordAorAAAA>}
  */
  abstract dnsName(): Promise<DNSRecordAorAAAA>;

  /**
  * @param {Optional<number>} port
  * @param {DNSRecordAorAAAA} dnsName
  * @returns {Promise<SingleHostName>}
  */
  static new(port: Optional<number>, dnsName: DNSRecordAorAAAA): Promise<SingleHostName> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class StakeAndVoteDelegation extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<StakeAndVoteDelegation>}
  */
  static fromBytes(bytes: Uint8Array): Promise<StakeAndVoteDelegation> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<StakeAndVoteDelegation>}
  */
  static fromHex(hexStr: string): Promise<StakeAndVoteDelegation> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<StakeAndVoteDelegation>}
  */
  static fromJson(json: string): Promise<StakeAndVoteDelegation> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Credential>}
  */
  abstract stakeCredential(): Promise<Credential>;

  /**
  * @returns {Promise<Ed25519KeyHash>}
  */
  abstract poolKeyhash(): Promise<Ed25519KeyHash>;

  /**
  * @returns {Promise<DRep>}
  */
  abstract drep(): Promise<DRep>;

  /**
  * @param {Credential} stakeCredential
  * @param {Ed25519KeyHash} poolKeyhash
  * @param {DRep} drep
  * @returns {Promise<StakeAndVoteDelegation>}
  */
  static new(stakeCredential: Credential, poolKeyhash: Ed25519KeyHash, drep: DRep): Promise<StakeAndVoteDelegation> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<boolean>}
  */
  abstract hasScriptCredentials(): Promise<boolean>;

}

export abstract class StakeDelegation extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<StakeDelegation>}
  */
  static fromBytes(bytes: Uint8Array): Promise<StakeDelegation> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<StakeDelegation>}
  */
  static fromHex(hexStr: string): Promise<StakeDelegation> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<StakeDelegation>}
  */
  static fromJson(json: string): Promise<StakeDelegation> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Credential>}
  */
  abstract stakeCredential(): Promise<Credential>;

  /**
  * @returns {Promise<Ed25519KeyHash>}
  */
  abstract poolKeyhash(): Promise<Ed25519KeyHash>;

  /**
  * @param {Credential} stakeCredential
  * @param {Ed25519KeyHash} poolKeyhash
  * @returns {Promise<StakeDelegation>}
  */
  static new(stakeCredential: Credential, poolKeyhash: Ed25519KeyHash): Promise<StakeDelegation> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<boolean>}
  */
  abstract hasScriptCredentials(): Promise<boolean>;

}

export abstract class StakeDeregistration extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<StakeDeregistration>}
  */
  static fromBytes(bytes: Uint8Array): Promise<StakeDeregistration> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<StakeDeregistration>}
  */
  static fromHex(hexStr: string): Promise<StakeDeregistration> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<StakeDeregistration>}
  */
  static fromJson(json: string): Promise<StakeDeregistration> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Credential>}
  */
  abstract stakeCredential(): Promise<Credential>;

  /**
  * @returns {Promise<Optional<BigNum>>}
  */
  abstract coin(): Promise<Optional<BigNum>>;

  /**
  * @param {Credential} stakeCredential
  * @returns {Promise<StakeDeregistration>}
  */
  static new(stakeCredential: Credential): Promise<StakeDeregistration> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Credential} stakeCredential
  * @param {BigNum} coin
  * @returns {Promise<StakeDeregistration>}
  */
  static newWithExplicitRefund(stakeCredential: Credential, coin: BigNum): Promise<StakeDeregistration> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<boolean>}
  */
  abstract hasScriptCredentials(): Promise<boolean>;

}

export abstract class StakeRegistration extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<StakeRegistration>}
  */
  static fromBytes(bytes: Uint8Array): Promise<StakeRegistration> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<StakeRegistration>}
  */
  static fromHex(hexStr: string): Promise<StakeRegistration> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<StakeRegistration>}
  */
  static fromJson(json: string): Promise<StakeRegistration> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Credential>}
  */
  abstract stakeCredential(): Promise<Credential>;

  /**
  * @returns {Promise<Optional<BigNum>>}
  */
  abstract coin(): Promise<Optional<BigNum>>;

  /**
  * @param {Credential} stakeCredential
  * @returns {Promise<StakeRegistration>}
  */
  static new(stakeCredential: Credential): Promise<StakeRegistration> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Credential} stakeCredential
  * @param {BigNum} coin
  * @returns {Promise<StakeRegistration>}
  */
  static newWithExplicitDeposit(stakeCredential: Credential, coin: BigNum): Promise<StakeRegistration> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<boolean>}
  */
  abstract hasScriptCredentials(): Promise<boolean>;

}

export abstract class StakeRegistrationAndDelegation extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<StakeRegistrationAndDelegation>}
  */
  static fromBytes(bytes: Uint8Array): Promise<StakeRegistrationAndDelegation> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<StakeRegistrationAndDelegation>}
  */
  static fromHex(hexStr: string): Promise<StakeRegistrationAndDelegation> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<StakeRegistrationAndDelegation>}
  */
  static fromJson(json: string): Promise<StakeRegistrationAndDelegation> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Credential>}
  */
  abstract stakeCredential(): Promise<Credential>;

  /**
  * @returns {Promise<Ed25519KeyHash>}
  */
  abstract poolKeyhash(): Promise<Ed25519KeyHash>;

  /**
  * @returns {Promise<BigNum>}
  */
  abstract coin(): Promise<BigNum>;

  /**
  * @param {Credential} stakeCredential
  * @param {Ed25519KeyHash} poolKeyhash
  * @param {BigNum} coin
  * @returns {Promise<StakeRegistrationAndDelegation>}
  */
  static new(stakeCredential: Credential, poolKeyhash: Ed25519KeyHash, coin: BigNum): Promise<StakeRegistrationAndDelegation> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<boolean>}
  */
  abstract hasScriptCredentials(): Promise<boolean>;

}

export abstract class StakeVoteRegistrationAndDelegation extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<StakeVoteRegistrationAndDelegation>}
  */
  static fromBytes(bytes: Uint8Array): Promise<StakeVoteRegistrationAndDelegation> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<StakeVoteRegistrationAndDelegation>}
  */
  static fromHex(hexStr: string): Promise<StakeVoteRegistrationAndDelegation> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<StakeVoteRegistrationAndDelegation>}
  */
  static fromJson(json: string): Promise<StakeVoteRegistrationAndDelegation> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Credential>}
  */
  abstract stakeCredential(): Promise<Credential>;

  /**
  * @returns {Promise<Ed25519KeyHash>}
  */
  abstract poolKeyhash(): Promise<Ed25519KeyHash>;

  /**
  * @returns {Promise<DRep>}
  */
  abstract drep(): Promise<DRep>;

  /**
  * @returns {Promise<BigNum>}
  */
  abstract coin(): Promise<BigNum>;

  /**
  * @param {Credential} stakeCredential
  * @param {Ed25519KeyHash} poolKeyhash
  * @param {DRep} drep
  * @param {BigNum} coin
  * @returns {Promise<StakeVoteRegistrationAndDelegation>}
  */
  static new(stakeCredential: Credential, poolKeyhash: Ed25519KeyHash, drep: DRep, coin: BigNum): Promise<StakeVoteRegistrationAndDelegation> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<boolean>}
  */
  abstract hasScriptCredentials(): Promise<boolean>;

}

export abstract class Strings extends _Ptr {
  /**
  * @returns {Promise<Strings>}
  */
  static new(): Promise<Strings> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {number} index
  * @returns {Promise<string>}
  */
  abstract get(index: number): Promise<string>;

  /**
  * @param {string} elem
  */
  abstract add(elem: string): Promise<void>;

}

export abstract class TimelockExpiry extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<TimelockExpiry>}
  */
  static fromBytes(bytes: Uint8Array): Promise<TimelockExpiry> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<TimelockExpiry>}
  */
  static fromHex(hexStr: string): Promise<TimelockExpiry> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<TimelockExpiry>}
  */
  static fromJson(json: string): Promise<TimelockExpiry> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract slot(): Promise<number>;

  /**
  * @returns {Promise<BigNum>}
  */
  abstract slotBignum(): Promise<BigNum>;

  /**
  * @param {number} slot
  * @returns {Promise<TimelockExpiry>}
  */
  static new(slot: number): Promise<TimelockExpiry> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {BigNum} slot
  * @returns {Promise<TimelockExpiry>}
  */
  static newTimelockexpiry(slot: BigNum): Promise<TimelockExpiry> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class TimelockStart extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<TimelockStart>}
  */
  static fromBytes(bytes: Uint8Array): Promise<TimelockStart> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<TimelockStart>}
  */
  static fromHex(hexStr: string): Promise<TimelockStart> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<TimelockStart>}
  */
  static fromJson(json: string): Promise<TimelockStart> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract slot(): Promise<number>;

  /**
  * @returns {Promise<BigNum>}
  */
  abstract slotBignum(): Promise<BigNum>;

  /**
  * @param {number} slot
  * @returns {Promise<TimelockStart>}
  */
  static new(slot: number): Promise<TimelockStart> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {BigNum} slot
  * @returns {Promise<TimelockStart>}
  */
  static newTimelockstart(slot: BigNum): Promise<TimelockStart> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class Transaction extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<Transaction>}
  */
  static fromBytes(bytes: Uint8Array): Promise<Transaction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<Transaction>}
  */
  static fromHex(hexStr: string): Promise<Transaction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<Transaction>}
  */
  static fromJson(json: string): Promise<Transaction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<TransactionBody>}
  */
  abstract body(): Promise<TransactionBody>;

  /**
  * @returns {Promise<TransactionWitnessSet>}
  */
  abstract witnessSet(): Promise<TransactionWitnessSet>;

  /**
  * @returns {Promise<boolean>}
  */
  abstract isValid(): Promise<boolean>;

  /**
  * @returns {Promise<Optional<AuxiliaryData>>}
  */
  abstract auxiliaryData(): Promise<Optional<AuxiliaryData>>;

  /**
  * @param {boolean} valid
  */
  abstract setIsValid(valid: boolean): Promise<void>;

  /**
  * @param {TransactionBody} body
  * @param {TransactionWitnessSet} witnessSet
  * @param {Optional<AuxiliaryData>} auxiliaryData
  * @returns {Promise<Transaction>}
  */
  static new(body: TransactionBody, witnessSet: TransactionWitnessSet, auxiliaryData: Optional<AuxiliaryData>): Promise<Transaction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class TransactionBatch extends _Ptr {
  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {number} index
  * @returns {Promise<Transaction>}
  */
  abstract get(index: number): Promise<Transaction>;

}

export abstract class TransactionBatchList extends _Ptr {
  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {number} index
  * @returns {Promise<TransactionBatch>}
  */
  abstract get(index: number): Promise<TransactionBatch>;

}

export abstract class TransactionBodies extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<TransactionBodies>}
  */
  static fromBytes(bytes: Uint8Array): Promise<TransactionBodies> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<TransactionBodies>}
  */
  static fromHex(hexStr: string): Promise<TransactionBodies> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<TransactionBodies>}
  */
  static fromJson(json: string): Promise<TransactionBodies> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<TransactionBodies>}
  */
  static new(): Promise<TransactionBodies> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {number} index
  * @returns {Promise<TransactionBody>}
  */
  abstract get(index: number): Promise<TransactionBody>;

  /**
  * @param {TransactionBody} elem
  */
  abstract add(elem: TransactionBody): Promise<void>;

}

export abstract class TransactionBody extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<TransactionBody>}
  */
  static fromBytes(bytes: Uint8Array): Promise<TransactionBody> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<TransactionBody>}
  */
  static fromHex(hexStr: string): Promise<TransactionBody> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<TransactionBody>}
  */
  static fromJson(json: string): Promise<TransactionBody> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<TransactionInputs>}
  */
  abstract inputs(): Promise<TransactionInputs>;

  /**
  * @returns {Promise<TransactionOutputs>}
  */
  abstract outputs(): Promise<TransactionOutputs>;

  /**
  * @returns {Promise<BigNum>}
  */
  abstract fee(): Promise<BigNum>;

  /**
  * @returns {Promise<Optional<number>>}
  */
  abstract ttl(): Promise<Optional<number>>;

  /**
  * @returns {Promise<Optional<BigNum>>}
  */
  abstract ttlBignum(): Promise<Optional<BigNum>>;

  /**
  * @param {BigNum} ttl
  */
  abstract setTtl(ttl: BigNum): Promise<void>;

  /**
  */
  abstract removeTtl(): Promise<void>;

  /**
  * @param {Certificates} certs
  */
  abstract setCerts(certs: Certificates): Promise<void>;

  /**
  * @returns {Promise<Optional<Certificates>>}
  */
  abstract certs(): Promise<Optional<Certificates>>;

  /**
  * @param {Withdrawals} withdrawals
  */
  abstract setWithdrawals(withdrawals: Withdrawals): Promise<void>;

  /**
  * @returns {Promise<Optional<Withdrawals>>}
  */
  abstract withdrawals(): Promise<Optional<Withdrawals>>;

  /**
  * @param {Update} update
  */
  abstract setUpdate(update: Update): Promise<void>;

  /**
  * @returns {Promise<Optional<Update>>}
  */
  abstract update(): Promise<Optional<Update>>;

  /**
  * @param {AuxiliaryDataHash} auxiliaryDataHash
  */
  abstract setAuxiliaryDataHash(auxiliaryDataHash: AuxiliaryDataHash): Promise<void>;

  /**
  * @returns {Promise<Optional<AuxiliaryDataHash>>}
  */
  abstract auxiliaryDataHash(): Promise<Optional<AuxiliaryDataHash>>;

  /**
  * @param {number} validityStartInterval
  */
  abstract setValidityStartInterval(validityStartInterval: number): Promise<void>;

  /**
  * @param {BigNum} validityStartInterval
  */
  abstract setValidityStartIntervalBignum(validityStartInterval: BigNum): Promise<void>;

  /**
  * @returns {Promise<Optional<BigNum>>}
  */
  abstract validityStartIntervalBignum(): Promise<Optional<BigNum>>;

  /**
  * @returns {Promise<Optional<number>>}
  */
  abstract validityStartInterval(): Promise<Optional<number>>;

  /**
  * @param {Mint} mint
  */
  abstract setMint(mint: Mint): Promise<void>;

  /**
  * @returns {Promise<Optional<Mint>>}
  */
  abstract mint(): Promise<Optional<Mint>>;

  /**
  * @param {TransactionInputs} referenceInputs
  */
  abstract setReferenceInputs(referenceInputs: TransactionInputs): Promise<void>;

  /**
  * @returns {Promise<Optional<TransactionInputs>>}
  */
  abstract referenceInputs(): Promise<Optional<TransactionInputs>>;

  /**
  * @param {ScriptDataHash} scriptDataHash
  */
  abstract setScriptDataHash(scriptDataHash: ScriptDataHash): Promise<void>;

  /**
  * @returns {Promise<Optional<ScriptDataHash>>}
  */
  abstract scriptDataHash(): Promise<Optional<ScriptDataHash>>;

  /**
  * @param {TransactionInputs} collateral
  */
  abstract setCollateral(collateral: TransactionInputs): Promise<void>;

  /**
  * @returns {Promise<Optional<TransactionInputs>>}
  */
  abstract collateral(): Promise<Optional<TransactionInputs>>;

  /**
  * @param {Ed25519KeyHashes} requiredSigners
  */
  abstract setRequiredSigners(requiredSigners: Ed25519KeyHashes): Promise<void>;

  /**
  * @returns {Promise<Optional<Ed25519KeyHashes>>}
  */
  abstract requiredSigners(): Promise<Optional<Ed25519KeyHashes>>;

  /**
  * @param {NetworkId} networkId
  */
  abstract setNetworkId(networkId: NetworkId): Promise<void>;

  /**
  * @returns {Promise<Optional<NetworkId>>}
  */
  abstract networkId(): Promise<Optional<NetworkId>>;

  /**
  * @param {TransactionOutput} collateralReturn
  */
  abstract setCollateralReturn(collateralReturn: TransactionOutput): Promise<void>;

  /**
  * @returns {Promise<Optional<TransactionOutput>>}
  */
  abstract collateralReturn(): Promise<Optional<TransactionOutput>>;

  /**
  * @param {BigNum} totalCollateral
  */
  abstract setTotalCollateral(totalCollateral: BigNum): Promise<void>;

  /**
  * @returns {Promise<Optional<BigNum>>}
  */
  abstract totalCollateral(): Promise<Optional<BigNum>>;

  /**
  * @param {VotingProcedures} votingProcedures
  */
  abstract setVotingProcedures(votingProcedures: VotingProcedures): Promise<void>;

  /**
  * @returns {Promise<Optional<VotingProcedures>>}
  */
  abstract votingProcedures(): Promise<Optional<VotingProcedures>>;

  /**
  * @param {VotingProposals} votingProposals
  */
  abstract setVotingProposals(votingProposals: VotingProposals): Promise<void>;

  /**
  * @returns {Promise<Optional<VotingProposals>>}
  */
  abstract votingProposals(): Promise<Optional<VotingProposals>>;

  /**
  * @param {BigNum} donation
  */
  abstract setDonation(donation: BigNum): Promise<void>;

  /**
  * @returns {Promise<Optional<BigNum>>}
  */
  abstract donation(): Promise<Optional<BigNum>>;

  /**
  * @param {BigNum} currentTreasuryValue
  */
  abstract setCurrentTreasuryValue(currentTreasuryValue: BigNum): Promise<void>;

  /**
  * @returns {Promise<Optional<BigNum>>}
  */
  abstract currentTreasuryValue(): Promise<Optional<BigNum>>;

  /**
  * @param {TransactionInputs} inputs
  * @param {TransactionOutputs} outputs
  * @param {BigNum} fee
  * @param {Optional<number>} ttl
  * @returns {Promise<TransactionBody>}
  */
  static new(inputs: TransactionInputs, outputs: TransactionOutputs, fee: BigNum, ttl: Optional<number>): Promise<TransactionBody> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {TransactionInputs} inputs
  * @param {TransactionOutputs} outputs
  * @param {BigNum} fee
  * @returns {Promise<TransactionBody>}
  */
  static newTxBody(inputs: TransactionInputs, outputs: TransactionOutputs, fee: BigNum): Promise<TransactionBody> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class TransactionBuilder extends _Ptr {
  /**
  * @param {TransactionUnspentOutputs} inputs
  * @param {CoinSelectionStrategyCIP2} strategy
  * @returns {Promise<void>}
  */
  abstract addInputsFrom(inputs: TransactionUnspentOutputs, strategy: CoinSelectionStrategyCIP2): Promise<void>;

  /**
  * @param {TxInputsBuilder} inputs
  */
  abstract setInputs(inputs: TxInputsBuilder): Promise<void>;

  /**
  * @param {TxInputsBuilder} collateral
  */
  abstract setCollateral(collateral: TxInputsBuilder): Promise<void>;

  /**
  * @param {TransactionOutput} collateralReturn
  */
  abstract setCollateralReturn(collateralReturn: TransactionOutput): Promise<void>;

  /**
  */
  abstract removeCollateralReturn(): Promise<void>;

  /**
  * @param {TransactionOutput} collateralReturn
  * @returns {Promise<void>}
  */
  abstract setCollateralReturnAndTotal(collateralReturn: TransactionOutput): Promise<void>;

  /**
  * @param {BigNum} totalCollateral
  */
  abstract setTotalCollateral(totalCollateral: BigNum): Promise<void>;

  /**
  */
  abstract removeTotalCollateral(): Promise<void>;

  /**
  * @param {BigNum} totalCollateral
  * @param {Address} returnAddress
  * @returns {Promise<void>}
  */
  abstract setTotalCollateralAndReturn(totalCollateral: BigNum, returnAddress: Address): Promise<void>;

  /**
  * @param {TransactionInput} referenceInput
  */
  abstract addReferenceInput(referenceInput: TransactionInput): Promise<void>;

  /**
  * @param {TransactionInput} referenceInput
  * @param {number} scriptSize
  */
  abstract addScriptReferenceInput(referenceInput: TransactionInput, scriptSize: number): Promise<void>;

  /**
  * @param {Ed25519KeyHash} hash
  * @param {TransactionInput} input
  * @param {Value} amount
  */
  abstract addKeyInput(hash: Ed25519KeyHash, input: TransactionInput, amount: Value): Promise<void>;

  /**
  * @param {NativeScript} script
  * @param {TransactionInput} input
  * @param {Value} amount
  */
  abstract addNativeScriptInput(script: NativeScript, input: TransactionInput, amount: Value): Promise<void>;

  /**
  * @param {PlutusWitness} witness
  * @param {TransactionInput} input
  * @param {Value} amount
  */
  abstract addPlutusScriptInput(witness: PlutusWitness, input: TransactionInput, amount: Value): Promise<void>;

  /**
  * @param {ByronAddress} hash
  * @param {TransactionInput} input
  * @param {Value} amount
  */
  abstract addBootstrapInput(hash: ByronAddress, input: TransactionInput, amount: Value): Promise<void>;

  /**
  * @param {Address} address
  * @param {TransactionInput} input
  * @param {Value} amount
  * @returns {Promise<void>}
  */
  abstract addRegularInput(address: Address, input: TransactionInput, amount: Value): Promise<void>;

  /**
  * @param {TransactionUnspentOutputs} inputs
  * @param {CoinSelectionStrategyCIP2} strategy
  * @param {ChangeConfig} changeConfig
  * @returns {Promise<boolean>}
  */
  abstract addInputsFromAndChange(inputs: TransactionUnspentOutputs, strategy: CoinSelectionStrategyCIP2, changeConfig: ChangeConfig): Promise<boolean>;

  /**
  * @param {TransactionUnspentOutputs} inputs
  * @param {CoinSelectionStrategyCIP2} strategy
  * @param {ChangeConfig} changeConfig
  * @param {BigNum} collateralPercentage
  * @returns {Promise<void>}
  */
  abstract addInputsFromAndChangeWithCollateralReturn(inputs: TransactionUnspentOutputs, strategy: CoinSelectionStrategyCIP2, changeConfig: ChangeConfig, collateralPercentage: BigNum): Promise<void>;

  /**
  * @returns {Promise<Optional<NativeScripts>>}
  */
  abstract getNativeInputScripts(): Promise<Optional<NativeScripts>>;

  /**
  * @returns {Promise<Optional<PlutusWitnesses>>}
  */
  abstract getPlutusInputScripts(): Promise<Optional<PlutusWitnesses>>;

  /**
  * @param {Address} address
  * @param {TransactionInput} input
  * @param {Value} amount
  * @returns {Promise<BigNum>}
  */
  abstract feeForInput(address: Address, input: TransactionInput, amount: Value): Promise<BigNum>;

  /**
  * @param {TransactionOutput} output
  * @returns {Promise<void>}
  */
  abstract addOutput(output: TransactionOutput): Promise<void>;

  /**
  * @param {TransactionOutput} output
  * @returns {Promise<BigNum>}
  */
  abstract feeForOutput(output: TransactionOutput): Promise<BigNum>;

  /**
  * @param {BigNum} fee
  */
  abstract setFee(fee: BigNum): Promise<void>;

  /**
  * @param {number} ttl
  */
  abstract setTtl(ttl: number): Promise<void>;

  /**
  * @param {BigNum} ttl
  */
  abstract setTtlBignum(ttl: BigNum): Promise<void>;

  /**
  */
  abstract removeTtl(): Promise<void>;

  /**
  * @param {number} validityStartInterval
  */
  abstract setValidityStartInterval(validityStartInterval: number): Promise<void>;

  /**
  * @param {BigNum} validityStartInterval
  */
  abstract setValidityStartIntervalBignum(validityStartInterval: BigNum): Promise<void>;

  /**
  */
  abstract removeValidityStartInterval(): Promise<void>;

  /**
  * @param {Certificates} certs
  * @returns {Promise<void>}
  */
  abstract setCerts(certs: Certificates): Promise<void>;

  /**
  */
  abstract removeCerts(): Promise<void>;

  /**
  * @param {CertificatesBuilder} certs
  */
  abstract setCertsBuilder(certs: CertificatesBuilder): Promise<void>;

  /**
  * @param {Withdrawals} withdrawals
  * @returns {Promise<void>}
  */
  abstract setWithdrawals(withdrawals: Withdrawals): Promise<void>;

  /**
  * @param {WithdrawalsBuilder} withdrawals
  */
  abstract setWithdrawalsBuilder(withdrawals: WithdrawalsBuilder): Promise<void>;

  /**
  * @param {VotingBuilder} votingBuilder
  */
  abstract setVotingBuilder(votingBuilder: VotingBuilder): Promise<void>;

  /**
  * @param {VotingProposalBuilder} votingProposalBuilder
  */
  abstract setVotingProposalBuilder(votingProposalBuilder: VotingProposalBuilder): Promise<void>;

  /**
  */
  abstract removeWithdrawals(): Promise<void>;

  /**
  * @returns {Promise<Optional<AuxiliaryData>>}
  */
  abstract getAuxiliaryData(): Promise<Optional<AuxiliaryData>>;

  /**
  * @param {AuxiliaryData} auxiliaryData
  */
  abstract setAuxiliaryData(auxiliaryData: AuxiliaryData): Promise<void>;

  /**
  */
  abstract removeAuxiliaryData(): Promise<void>;

  /**
  * @param {GeneralTransactionMetadata} metadata
  */
  abstract setMetadata(metadata: GeneralTransactionMetadata): Promise<void>;

  /**
  * @param {BigNum} key
  * @param {TransactionMetadatum} val
  */
  abstract addMetadatum(key: BigNum, val: TransactionMetadatum): Promise<void>;

  /**
  * @param {BigNum} key
  * @param {string} val
  * @returns {Promise<void>}
  */
  abstract addJsonMetadatum(key: BigNum, val: string): Promise<void>;

  /**
  * @param {BigNum} key
  * @param {string} val
  * @param {MetadataJsonSchema} schema
  * @returns {Promise<void>}
  */
  abstract addJsonMetadatumWithSchema(key: BigNum, val: string, schema: MetadataJsonSchema): Promise<void>;

  /**
  * @param {MintBuilder} mintBuilder
  */
  abstract setMintBuilder(mintBuilder: MintBuilder): Promise<void>;

  /**
  */
  abstract removeMintBuilder(): Promise<void>;

  /**
  * @returns {Promise<Optional<MintBuilder>>}
  */
  abstract getMintBuilder(): Promise<Optional<MintBuilder>>;

  /**
  * @param {Mint} mint
  * @param {NativeScripts} mintScripts
  * @returns {Promise<void>}
  */
  abstract setMint(mint: Mint, mintScripts: NativeScripts): Promise<void>;

  /**
  * @returns {Promise<Optional<Mint>>}
  */
  abstract getMint(): Promise<Optional<Mint>>;

  /**
  * @returns {Promise<Optional<NativeScripts>>}
  */
  abstract getMintScripts(): Promise<Optional<NativeScripts>>;

  /**
  * @param {NativeScript} policyScript
  * @param {MintAssets} mintAssets
  * @returns {Promise<void>}
  */
  abstract setMintAsset(policyScript: NativeScript, mintAssets: MintAssets): Promise<void>;

  /**
  * @param {NativeScript} policyScript
  * @param {AssetName} assetName
  * @param {Int} amount
  * @returns {Promise<void>}
  */
  abstract addMintAsset(policyScript: NativeScript, assetName: AssetName, amount: Int): Promise<void>;

  /**
  * @param {NativeScript} policyScript
  * @param {AssetName} assetName
  * @param {Int} amount
  * @param {TransactionOutputAmountBuilder} outputBuilder
  * @param {BigNum} outputCoin
  * @returns {Promise<void>}
  */
  abstract addMintAssetAndOutput(policyScript: NativeScript, assetName: AssetName, amount: Int, outputBuilder: TransactionOutputAmountBuilder, outputCoin: BigNum): Promise<void>;

  /**
  * @param {NativeScript} policyScript
  * @param {AssetName} assetName
  * @param {Int} amount
  * @param {TransactionOutputAmountBuilder} outputBuilder
  * @returns {Promise<void>}
  */
  abstract addMintAssetAndOutputMinRequiredCoin(policyScript: NativeScript, assetName: AssetName, amount: Int, outputBuilder: TransactionOutputAmountBuilder): Promise<void>;

  /**
  * @param {PlutusData} datum
  */
  abstract addExtraWitnessDatum(datum: PlutusData): Promise<void>;

  /**
  * @returns {Promise<Optional<PlutusList>>}
  */
  abstract getExtraWitnessDatums(): Promise<Optional<PlutusList>>;

  /**
  * @param {BigNum} donation
  */
  abstract setDonation(donation: BigNum): Promise<void>;

  /**
  * @returns {Promise<Optional<BigNum>>}
  */
  abstract getDonation(): Promise<Optional<BigNum>>;

  /**
  * @param {BigNum} currentTreasuryValue
  * @returns {Promise<void>}
  */
  abstract setCurrentTreasuryValue(currentTreasuryValue: BigNum): Promise<void>;

  /**
  * @returns {Promise<Optional<BigNum>>}
  */
  abstract getCurrentTreasuryValue(): Promise<Optional<BigNum>>;

  /**
  * @param {TransactionBuilderConfig} cfg
  * @returns {Promise<TransactionBuilder>}
  */
  static new(cfg: TransactionBuilderConfig): Promise<TransactionBuilder> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<TransactionInputs>}
  */
  abstract getReferenceInputs(): Promise<TransactionInputs>;

  /**
  * @returns {Promise<Value>}
  */
  abstract getExplicitInput(): Promise<Value>;

  /**
  * @returns {Promise<Value>}
  */
  abstract getImplicitInput(): Promise<Value>;

  /**
  * @returns {Promise<Value>}
  */
  abstract getTotalInput(): Promise<Value>;

  /**
  * @returns {Promise<Value>}
  */
  abstract getTotalOutput(): Promise<Value>;

  /**
  * @returns {Promise<Value>}
  */
  abstract getExplicitOutput(): Promise<Value>;

  /**
  * @returns {Promise<BigNum>}
  */
  abstract getDeposit(): Promise<BigNum>;

  /**
  * @returns {Promise<Optional<BigNum>>}
  */
  abstract getFeeIfSet(): Promise<Optional<BigNum>>;

  /**
  * @param {Address} address
  * @returns {Promise<boolean>}
  */
  abstract addChangeIfNeeded(address: Address): Promise<boolean>;

  /**
  * @param {Address} address
  * @param {OutputDatum} plutusData
  * @returns {Promise<boolean>}
  */
  abstract addChangeIfNeededWithDatum(address: Address, plutusData: OutputDatum): Promise<boolean>;

  /**
  * @param {Costmdls} costModels
  * @returns {Promise<void>}
  */
  abstract calcScriptDataHash(costModels: Costmdls): Promise<void>;

  /**
  * @param {ScriptDataHash} hash
  */
  abstract setScriptDataHash(hash: ScriptDataHash): Promise<void>;

  /**
  */
  abstract removeScriptDataHash(): Promise<void>;

  /**
  * @param {Ed25519KeyHash} key
  */
  abstract addRequiredSigner(key: Ed25519KeyHash): Promise<void>;

  /**
  * @returns {Promise<number>}
  */
  abstract fullSize(): Promise<number>;

  /**
  * @returns {Promise<Uint32Array>}
  */
  abstract outputSizes(): Promise<Uint32Array>;

  /**
  * @returns {Promise<TransactionBody>}
  */
  abstract build(): Promise<TransactionBody>;

  /**
  * @returns {Promise<Transaction>}
  */
  abstract buildTx(): Promise<Transaction>;

  /**
  * @returns {Promise<Transaction>}
  */
  abstract buildTxUnsafe(): Promise<Transaction>;

  /**
  * @returns {Promise<BigNum>}
  */
  abstract minFee(): Promise<BigNum>;

}

export abstract class TransactionBuilderConfig extends _Ptr {
}

export abstract class TransactionBuilderConfigBuilder extends _Ptr {
  /**
  * @returns {Promise<TransactionBuilderConfigBuilder>}
  */
  static new(): Promise<TransactionBuilderConfigBuilder> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {LinearFee} feeAlgo
  * @returns {Promise<TransactionBuilderConfigBuilder>}
  */
  abstract feeAlgo(feeAlgo: LinearFee): Promise<TransactionBuilderConfigBuilder>;

  /**
  * @param {BigNum} coinsPerUtxoByte
  * @returns {Promise<TransactionBuilderConfigBuilder>}
  */
  abstract coinsPerUtxoByte(coinsPerUtxoByte: BigNum): Promise<TransactionBuilderConfigBuilder>;

  /**
  * @param {ExUnitPrices} exUnitPrices
  * @returns {Promise<TransactionBuilderConfigBuilder>}
  */
  abstract exUnitPrices(exUnitPrices: ExUnitPrices): Promise<TransactionBuilderConfigBuilder>;

  /**
  * @param {BigNum} poolDeposit
  * @returns {Promise<TransactionBuilderConfigBuilder>}
  */
  abstract poolDeposit(poolDeposit: BigNum): Promise<TransactionBuilderConfigBuilder>;

  /**
  * @param {BigNum} keyDeposit
  * @returns {Promise<TransactionBuilderConfigBuilder>}
  */
  abstract keyDeposit(keyDeposit: BigNum): Promise<TransactionBuilderConfigBuilder>;

  /**
  * @param {number} maxValueSize
  * @returns {Promise<TransactionBuilderConfigBuilder>}
  */
  abstract maxValueSize(maxValueSize: number): Promise<TransactionBuilderConfigBuilder>;

  /**
  * @param {number} maxTxSize
  * @returns {Promise<TransactionBuilderConfigBuilder>}
  */
  abstract maxTxSize(maxTxSize: number): Promise<TransactionBuilderConfigBuilder>;

  /**
  * @param {UnitInterval} refScriptCoinsPerByte
  * @returns {Promise<TransactionBuilderConfigBuilder>}
  */
  abstract refScriptCoinsPerByte(refScriptCoinsPerByte: UnitInterval): Promise<TransactionBuilderConfigBuilder>;

  /**
  * @param {boolean} preferPureChange
  * @returns {Promise<TransactionBuilderConfigBuilder>}
  */
  abstract preferPureChange(preferPureChange: boolean): Promise<TransactionBuilderConfigBuilder>;

  /**
  * @param {boolean} deduplicateExplicitRefInputsWithRegularInputs
  * @returns {Promise<TransactionBuilderConfigBuilder>}
  */
  abstract deduplicateExplicitRefInputsWithRegularInputs(deduplicateExplicitRefInputsWithRegularInputs: boolean): Promise<TransactionBuilderConfigBuilder>;

  /**
  * @returns {Promise<TransactionBuilderConfig>}
  */
  abstract build(): Promise<TransactionBuilderConfig>;

}

export abstract class TransactionHash extends _Ptr {
  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<TransactionHash>}
  */
  static fromBytes(bytes: Uint8Array): Promise<TransactionHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {string} prefix
  * @returns {Promise<string>}
  */
  abstract toBech32(prefix: string): Promise<string>;

  /**
  * @param {string} bechStr
  * @returns {Promise<TransactionHash>}
  */
  static fromBech32(bechStr: string): Promise<TransactionHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hex
  * @returns {Promise<TransactionHash>}
  */
  static fromHex(hex: string): Promise<TransactionHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class TransactionInput extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<TransactionInput>}
  */
  static fromBytes(bytes: Uint8Array): Promise<TransactionInput> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<TransactionInput>}
  */
  static fromHex(hexStr: string): Promise<TransactionInput> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<TransactionInput>}
  */
  static fromJson(json: string): Promise<TransactionInput> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<TransactionHash>}
  */
  abstract transactionId(): Promise<TransactionHash>;

  /**
  * @returns {Promise<number>}
  */
  abstract index(): Promise<number>;

  /**
  * @param {TransactionHash} transactionId
  * @param {number} index
  * @returns {Promise<TransactionInput>}
  */
  static new(transactionId: TransactionHash, index: number): Promise<TransactionInput> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class TransactionInputs extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<TransactionInputs>}
  */
  static fromBytes(bytes: Uint8Array): Promise<TransactionInputs> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<TransactionInputs>}
  */
  static fromHex(hexStr: string): Promise<TransactionInputs> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<TransactionInputs>}
  */
  static fromJson(json: string): Promise<TransactionInputs> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<TransactionInputs>}
  */
  static new(): Promise<TransactionInputs> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {number} index
  * @returns {Promise<TransactionInput>}
  */
  abstract get(index: number): Promise<TransactionInput>;

  /**
  * @param {TransactionInput} elem
  * @returns {Promise<boolean>}
  */
  abstract add(elem: TransactionInput): Promise<boolean>;

  /**
  * @returns {Promise<Optional<TransactionInputs>>}
  */
  abstract toOption(): Promise<Optional<TransactionInputs>>;

}

export abstract class TransactionMetadatum extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<TransactionMetadatum>}
  */
  static fromBytes(bytes: Uint8Array): Promise<TransactionMetadatum> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<TransactionMetadatum>}
  */
  static fromHex(hexStr: string): Promise<TransactionMetadatum> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {MetadataMap} map
  * @returns {Promise<TransactionMetadatum>}
  */
  static newMap(map: MetadataMap): Promise<TransactionMetadatum> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {MetadataList} list
  * @returns {Promise<TransactionMetadatum>}
  */
  static newList(list: MetadataList): Promise<TransactionMetadatum> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Int} intValue
  * @returns {Promise<TransactionMetadatum>}
  */
  static newInt(intValue: Int): Promise<TransactionMetadatum> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<TransactionMetadatum>}
  */
  static newBytes(bytes: Uint8Array): Promise<TransactionMetadatum> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {string} text
  * @returns {Promise<TransactionMetadatum>}
  */
  static newText(text: string): Promise<TransactionMetadatum> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<TransactionMetadatumKind>}
  */
  abstract kind(): Promise<TransactionMetadatumKind>;

  /**
  * @returns {Promise<MetadataMap>}
  */
  abstract asMap(): Promise<MetadataMap>;

  /**
  * @returns {Promise<MetadataList>}
  */
  abstract asList(): Promise<MetadataList>;

  /**
  * @returns {Promise<Int>}
  */
  abstract asInt(): Promise<Int>;

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract asBytes(): Promise<Uint8Array>;

  /**
  * @returns {Promise<string>}
  */
  abstract asText(): Promise<string>;

}

export abstract class TransactionMetadatumLabels extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<TransactionMetadatumLabels>}
  */
  static fromBytes(bytes: Uint8Array): Promise<TransactionMetadatumLabels> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<TransactionMetadatumLabels>}
  */
  static fromHex(hexStr: string): Promise<TransactionMetadatumLabels> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<TransactionMetadatumLabels>}
  */
  static new(): Promise<TransactionMetadatumLabels> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {number} index
  * @returns {Promise<BigNum>}
  */
  abstract get(index: number): Promise<BigNum>;

  /**
  * @param {BigNum} elem
  */
  abstract add(elem: BigNum): Promise<void>;

}

export abstract class TransactionOutput extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<TransactionOutput>}
  */
  static fromBytes(bytes: Uint8Array): Promise<TransactionOutput> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<TransactionOutput>}
  */
  static fromHex(hexStr: string): Promise<TransactionOutput> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<TransactionOutput>}
  */
  static fromJson(json: string): Promise<TransactionOutput> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Address>}
  */
  abstract address(): Promise<Address>;

  /**
  * @returns {Promise<Value>}
  */
  abstract amount(): Promise<Value>;

  /**
  * @returns {Promise<Optional<DataHash>>}
  */
  abstract dataHash(): Promise<Optional<DataHash>>;

  /**
  * @returns {Promise<Optional<PlutusData>>}
  */
  abstract plutusData(): Promise<Optional<PlutusData>>;

  /**
  * @returns {Promise<Optional<ScriptRef>>}
  */
  abstract scriptRef(): Promise<Optional<ScriptRef>>;

  /**
  * @param {ScriptRef} scriptRef
  */
  abstract setScriptRef(scriptRef: ScriptRef): Promise<void>;

  /**
  * @param {PlutusData} data
  */
  abstract setPlutusData(data: PlutusData): Promise<void>;

  /**
  * @param {DataHash} dataHash
  */
  abstract setDataHash(dataHash: DataHash): Promise<void>;

  /**
  * @returns {Promise<boolean>}
  */
  abstract hasPlutusData(): Promise<boolean>;

  /**
  * @returns {Promise<boolean>}
  */
  abstract hasDataHash(): Promise<boolean>;

  /**
  * @returns {Promise<boolean>}
  */
  abstract hasScriptRef(): Promise<boolean>;

  /**
  * @param {Address} address
  * @param {Value} amount
  * @returns {Promise<TransactionOutput>}
  */
  static new(address: Address, amount: Value): Promise<TransactionOutput> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Optional<CborContainerType>>}
  */
  abstract serializationFormat(): Promise<Optional<CborContainerType>>;

}

export abstract class TransactionOutputAmountBuilder extends _Ptr {
  /**
  * @param {Value} amount
  * @returns {Promise<TransactionOutputAmountBuilder>}
  */
  abstract withValue(amount: Value): Promise<TransactionOutputAmountBuilder>;

  /**
  * @param {BigNum} coin
  * @returns {Promise<TransactionOutputAmountBuilder>}
  */
  abstract withCoin(coin: BigNum): Promise<TransactionOutputAmountBuilder>;

  /**
  * @param {BigNum} coin
  * @param {MultiAsset} multiasset
  * @returns {Promise<TransactionOutputAmountBuilder>}
  */
  abstract withCoinAndAsset(coin: BigNum, multiasset: MultiAsset): Promise<TransactionOutputAmountBuilder>;

  /**
  * @param {MultiAsset} multiasset
  * @param {DataCost} dataCost
  * @returns {Promise<TransactionOutputAmountBuilder>}
  */
  abstract withAssetAndMinRequiredCoinByUtxoCost(multiasset: MultiAsset, dataCost: DataCost): Promise<TransactionOutputAmountBuilder>;

  /**
  * @returns {Promise<TransactionOutput>}
  */
  abstract build(): Promise<TransactionOutput>;

}

export abstract class TransactionOutputBuilder extends _Ptr {
  /**
  * @returns {Promise<TransactionOutputBuilder>}
  */
  static new(): Promise<TransactionOutputBuilder> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Address} address
  * @returns {Promise<TransactionOutputBuilder>}
  */
  abstract withAddress(address: Address): Promise<TransactionOutputBuilder>;

  /**
  * @param {DataHash} dataHash
  * @returns {Promise<TransactionOutputBuilder>}
  */
  abstract withDataHash(dataHash: DataHash): Promise<TransactionOutputBuilder>;

  /**
  * @param {PlutusData} data
  * @returns {Promise<TransactionOutputBuilder>}
  */
  abstract withPlutusData(data: PlutusData): Promise<TransactionOutputBuilder>;

  /**
  * @param {ScriptRef} scriptRef
  * @returns {Promise<TransactionOutputBuilder>}
  */
  abstract withScriptRef(scriptRef: ScriptRef): Promise<TransactionOutputBuilder>;

  /**
  * @returns {Promise<TransactionOutputAmountBuilder>}
  */
  abstract next(): Promise<TransactionOutputAmountBuilder>;

}

export abstract class TransactionOutputs extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<TransactionOutputs>}
  */
  static fromBytes(bytes: Uint8Array): Promise<TransactionOutputs> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<TransactionOutputs>}
  */
  static fromHex(hexStr: string): Promise<TransactionOutputs> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<TransactionOutputs>}
  */
  static fromJson(json: string): Promise<TransactionOutputs> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<TransactionOutputs>}
  */
  static new(): Promise<TransactionOutputs> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {number} index
  * @returns {Promise<TransactionOutput>}
  */
  abstract get(index: number): Promise<TransactionOutput>;

  /**
  * @param {TransactionOutput} elem
  */
  abstract add(elem: TransactionOutput): Promise<void>;

}

export abstract class TransactionUnspentOutput extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<TransactionUnspentOutput>}
  */
  static fromBytes(bytes: Uint8Array): Promise<TransactionUnspentOutput> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<TransactionUnspentOutput>}
  */
  static fromHex(hexStr: string): Promise<TransactionUnspentOutput> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<TransactionUnspentOutput>}
  */
  static fromJson(json: string): Promise<TransactionUnspentOutput> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {TransactionInput} input
  * @param {TransactionOutput} output
  * @returns {Promise<TransactionUnspentOutput>}
  */
  static new(input: TransactionInput, output: TransactionOutput): Promise<TransactionUnspentOutput> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<TransactionInput>}
  */
  abstract input(): Promise<TransactionInput>;

  /**
  * @returns {Promise<TransactionOutput>}
  */
  abstract output(): Promise<TransactionOutput>;

}

export abstract class TransactionUnspentOutputs extends _Ptr {
  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<TransactionUnspentOutputs>}
  */
  static fromJson(json: string): Promise<TransactionUnspentOutputs> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<TransactionUnspentOutputs>}
  */
  static new(): Promise<TransactionUnspentOutputs> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {number} index
  * @returns {Promise<TransactionUnspentOutput>}
  */
  abstract get(index: number): Promise<TransactionUnspentOutput>;

  /**
  * @param {TransactionUnspentOutput} elem
  */
  abstract add(elem: TransactionUnspentOutput): Promise<void>;

}

export abstract class TransactionWitnessSet extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<TransactionWitnessSet>}
  */
  static fromBytes(bytes: Uint8Array): Promise<TransactionWitnessSet> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<TransactionWitnessSet>}
  */
  static fromHex(hexStr: string): Promise<TransactionWitnessSet> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<TransactionWitnessSet>}
  */
  static fromJson(json: string): Promise<TransactionWitnessSet> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Vkeywitnesses} vkeys
  */
  abstract setVkeys(vkeys: Vkeywitnesses): Promise<void>;

  /**
  * @returns {Promise<Optional<Vkeywitnesses>>}
  */
  abstract vkeys(): Promise<Optional<Vkeywitnesses>>;

  /**
  * @param {NativeScripts} nativeScripts
  */
  abstract setNativeScripts(nativeScripts: NativeScripts): Promise<void>;

  /**
  * @returns {Promise<Optional<NativeScripts>>}
  */
  abstract nativeScripts(): Promise<Optional<NativeScripts>>;

  /**
  * @param {BootstrapWitnesses} bootstraps
  */
  abstract setBootstraps(bootstraps: BootstrapWitnesses): Promise<void>;

  /**
  * @returns {Promise<Optional<BootstrapWitnesses>>}
  */
  abstract bootstraps(): Promise<Optional<BootstrapWitnesses>>;

  /**
  * @param {PlutusScripts} plutusScripts
  */
  abstract setPlutusScripts(plutusScripts: PlutusScripts): Promise<void>;

  /**
  * @returns {Promise<Optional<PlutusScripts>>}
  */
  abstract plutusScripts(): Promise<Optional<PlutusScripts>>;

  /**
  * @param {PlutusList} plutusData
  */
  abstract setPlutusData(plutusData: PlutusList): Promise<void>;

  /**
  * @returns {Promise<Optional<PlutusList>>}
  */
  abstract plutusData(): Promise<Optional<PlutusList>>;

  /**
  * @param {Redeemers} redeemers
  */
  abstract setRedeemers(redeemers: Redeemers): Promise<void>;

  /**
  * @returns {Promise<Optional<Redeemers>>}
  */
  abstract redeemers(): Promise<Optional<Redeemers>>;

  /**
  * @returns {Promise<TransactionWitnessSet>}
  */
  static new(): Promise<TransactionWitnessSet> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class TransactionWitnessSets extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<TransactionWitnessSets>}
  */
  static fromBytes(bytes: Uint8Array): Promise<TransactionWitnessSets> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<TransactionWitnessSets>}
  */
  static fromHex(hexStr: string): Promise<TransactionWitnessSets> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<TransactionWitnessSets>}
  */
  static fromJson(json: string): Promise<TransactionWitnessSets> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<TransactionWitnessSets>}
  */
  static new(): Promise<TransactionWitnessSets> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {number} index
  * @returns {Promise<TransactionWitnessSet>}
  */
  abstract get(index: number): Promise<TransactionWitnessSet>;

  /**
  * @param {TransactionWitnessSet} elem
  */
  abstract add(elem: TransactionWitnessSet): Promise<void>;

}

export abstract class TreasuryWithdrawals extends _Ptr {
  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<TreasuryWithdrawals>}
  */
  static fromJson(json: string): Promise<TreasuryWithdrawals> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<TreasuryWithdrawals>}
  */
  static new(): Promise<TreasuryWithdrawals> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {RewardAddress} key
  * @returns {Promise<Optional<BigNum>>}
  */
  abstract get(key: RewardAddress): Promise<Optional<BigNum>>;

  /**
  * @param {RewardAddress} key
  * @param {BigNum} value
  */
  abstract insert(key: RewardAddress, value: BigNum): Promise<void>;

  /**
  * @returns {Promise<RewardAddresses>}
  */
  abstract keys(): Promise<RewardAddresses>;

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

}

export abstract class TreasuryWithdrawalsAction extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<TreasuryWithdrawalsAction>}
  */
  static fromBytes(bytes: Uint8Array): Promise<TreasuryWithdrawalsAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<TreasuryWithdrawalsAction>}
  */
  static fromHex(hexStr: string): Promise<TreasuryWithdrawalsAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<TreasuryWithdrawalsAction>}
  */
  static fromJson(json: string): Promise<TreasuryWithdrawalsAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<TreasuryWithdrawals>}
  */
  abstract withdrawals(): Promise<TreasuryWithdrawals>;

  /**
  * @returns {Promise<Optional<ScriptHash>>}
  */
  abstract policyHash(): Promise<Optional<ScriptHash>>;

  /**
  * @param {TreasuryWithdrawals} withdrawals
  * @returns {Promise<TreasuryWithdrawalsAction>}
  */
  static new(withdrawals: TreasuryWithdrawals): Promise<TreasuryWithdrawalsAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {TreasuryWithdrawals} withdrawals
  * @param {ScriptHash} policyHash
  * @returns {Promise<TreasuryWithdrawalsAction>}
  */
  static newWithPolicyHash(withdrawals: TreasuryWithdrawals, policyHash: ScriptHash): Promise<TreasuryWithdrawalsAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class TxBuilderConstants extends _Ptr {
  /**
  * @returns {Promise<Costmdls>}
  */
  static plutusDefaultCostModels(): Promise<Costmdls> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Costmdls>}
  */
  static plutusAlonzoCostModels(): Promise<Costmdls> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Costmdls>}
  */
  static plutusVasilCostModels(): Promise<Costmdls> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Costmdls>}
  */
  static plutusConwayCostModels(): Promise<Costmdls> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class TxInputsBuilder extends _Ptr {
  /**
  * @returns {Promise<TxInputsBuilder>}
  */
  static new(): Promise<TxInputsBuilder> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Ed25519KeyHash} hash
  * @param {TransactionInput} input
  * @param {Value} amount
  */
  abstract addKeyInput(hash: Ed25519KeyHash, input: TransactionInput, amount: Value): Promise<void>;

  /**
  * @param {NativeScriptSource} script
  * @param {TransactionInput} input
  * @param {Value} amount
  */
  abstract addNativeScriptInput(script: NativeScriptSource, input: TransactionInput, amount: Value): Promise<void>;

  /**
  * @param {PlutusWitness} witness
  * @param {TransactionInput} input
  * @param {Value} amount
  */
  abstract addPlutusScriptInput(witness: PlutusWitness, input: TransactionInput, amount: Value): Promise<void>;

  /**
  * @param {ByronAddress} address
  * @param {TransactionInput} input
  * @param {Value} amount
  */
  abstract addBootstrapInput(address: ByronAddress, input: TransactionInput, amount: Value): Promise<void>;

  /**
  * @param {Address} address
  * @param {TransactionInput} input
  * @param {Value} amount
  * @returns {Promise<void>}
  */
  abstract addRegularInput(address: Address, input: TransactionInput, amount: Value): Promise<void>;

  /**
  * @returns {Promise<TransactionInputs>}
  */
  abstract getRefInputs(): Promise<TransactionInputs>;

  /**
  * @returns {Promise<Optional<NativeScripts>>}
  */
  abstract getNativeInputScripts(): Promise<Optional<NativeScripts>>;

  /**
  * @returns {Promise<Optional<PlutusWitnesses>>}
  */
  abstract getPlutusInputScripts(): Promise<Optional<PlutusWitnesses>>;

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {Ed25519KeyHash} key
  */
  abstract addRequiredSigner(key: Ed25519KeyHash): Promise<void>;

  /**
  * @param {Ed25519KeyHashes} keys
  */
  abstract addRequiredSigners(keys: Ed25519KeyHashes): Promise<void>;

  /**
  * @returns {Promise<Value>}
  */
  abstract totalValue(): Promise<Value>;

  /**
  * @returns {Promise<TransactionInputs>}
  */
  abstract inputs(): Promise<TransactionInputs>;

  /**
  * @returns {Promise<Optional<TransactionInputs>>}
  */
  abstract inputsOption(): Promise<Optional<TransactionInputs>>;

}

export abstract class URL extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<URL>}
  */
  static fromBytes(bytes: Uint8Array): Promise<URL> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<URL>}
  */
  static fromHex(hexStr: string): Promise<URL> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<URL>}
  */
  static fromJson(json: string): Promise<URL> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {string} url
  * @returns {Promise<URL>}
  */
  static new(url: string): Promise<URL> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract url(): Promise<string>;

}

export abstract class UnitInterval extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<UnitInterval>}
  */
  static fromBytes(bytes: Uint8Array): Promise<UnitInterval> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<UnitInterval>}
  */
  static fromHex(hexStr: string): Promise<UnitInterval> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<UnitInterval>}
  */
  static fromJson(json: string): Promise<UnitInterval> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<BigNum>}
  */
  abstract numerator(): Promise<BigNum>;

  /**
  * @returns {Promise<BigNum>}
  */
  abstract denominator(): Promise<BigNum>;

  /**
  * @param {BigNum} numerator
  * @param {BigNum} denominator
  * @returns {Promise<UnitInterval>}
  */
  static new(numerator: BigNum, denominator: BigNum): Promise<UnitInterval> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class Update extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<Update>}
  */
  static fromBytes(bytes: Uint8Array): Promise<Update> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<Update>}
  */
  static fromHex(hexStr: string): Promise<Update> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<Update>}
  */
  static fromJson(json: string): Promise<Update> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<ProposedProtocolParameterUpdates>}
  */
  abstract proposedProtocolParameterUpdates(): Promise<ProposedProtocolParameterUpdates>;

  /**
  * @returns {Promise<number>}
  */
  abstract epoch(): Promise<number>;

  /**
  * @param {ProposedProtocolParameterUpdates} proposedProtocolParameterUpdates
  * @param {number} epoch
  * @returns {Promise<Update>}
  */
  static new(proposedProtocolParameterUpdates: ProposedProtocolParameterUpdates, epoch: number): Promise<Update> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class UpdateCommitteeAction extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<UpdateCommitteeAction>}
  */
  static fromBytes(bytes: Uint8Array): Promise<UpdateCommitteeAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<UpdateCommitteeAction>}
  */
  static fromHex(hexStr: string): Promise<UpdateCommitteeAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<UpdateCommitteeAction>}
  */
  static fromJson(json: string): Promise<UpdateCommitteeAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Optional<GovernanceActionId>>}
  */
  abstract govActionId(): Promise<Optional<GovernanceActionId>>;

  /**
  * @returns {Promise<Committee>}
  */
  abstract committee(): Promise<Committee>;

  /**
  * @returns {Promise<Credentials>}
  */
  abstract membersToRemove(): Promise<Credentials>;

  /**
  * @param {Committee} committee
  * @param {Credentials} membersToRemove
  * @returns {Promise<UpdateCommitteeAction>}
  */
  static new(committee: Committee, membersToRemove: Credentials): Promise<UpdateCommitteeAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {GovernanceActionId} govActionId
  * @param {Committee} committee
  * @param {Credentials} membersToRemove
  * @returns {Promise<UpdateCommitteeAction>}
  */
  static newWithActionId(govActionId: GovernanceActionId, committee: Committee, membersToRemove: Credentials): Promise<UpdateCommitteeAction> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class VRFCert extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<VRFCert>}
  */
  static fromBytes(bytes: Uint8Array): Promise<VRFCert> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<VRFCert>}
  */
  static fromHex(hexStr: string): Promise<VRFCert> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<VRFCert>}
  */
  static fromJson(json: string): Promise<VRFCert> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract output(): Promise<Uint8Array>;

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract proof(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} output
  * @param {Uint8Array} proof
  * @returns {Promise<VRFCert>}
  */
  static new(output: Uint8Array, proof: Uint8Array): Promise<VRFCert> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class VRFKeyHash extends _Ptr {
  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<VRFKeyHash>}
  */
  static fromBytes(bytes: Uint8Array): Promise<VRFKeyHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {string} prefix
  * @returns {Promise<string>}
  */
  abstract toBech32(prefix: string): Promise<string>;

  /**
  * @param {string} bechStr
  * @returns {Promise<VRFKeyHash>}
  */
  static fromBech32(bechStr: string): Promise<VRFKeyHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hex
  * @returns {Promise<VRFKeyHash>}
  */
  static fromHex(hex: string): Promise<VRFKeyHash> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class VRFVKey extends _Ptr {
  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<VRFVKey>}
  */
  static fromBytes(bytes: Uint8Array): Promise<VRFVKey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {string} prefix
  * @returns {Promise<string>}
  */
  abstract toBech32(prefix: string): Promise<string>;

  /**
  * @param {string} bechStr
  * @returns {Promise<VRFVKey>}
  */
  static fromBech32(bechStr: string): Promise<VRFVKey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hex
  * @returns {Promise<VRFVKey>}
  */
  static fromHex(hex: string): Promise<VRFVKey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class Value extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<Value>}
  */
  static fromBytes(bytes: Uint8Array): Promise<Value> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<Value>}
  */
  static fromHex(hexStr: string): Promise<Value> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<Value>}
  */
  static fromJson(json: string): Promise<Value> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {BigNum} coin
  * @returns {Promise<Value>}
  */
  static new(coin: BigNum): Promise<Value> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {MultiAsset} multiasset
  * @returns {Promise<Value>}
  */
  static newFromAssets(multiasset: MultiAsset): Promise<Value> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {BigNum} coin
  * @param {MultiAsset} multiasset
  * @returns {Promise<Value>}
  */
  static newWithAssets(coin: BigNum, multiasset: MultiAsset): Promise<Value> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Value>}
  */
  static zero(): Promise<Value> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<boolean>}
  */
  abstract isZero(): Promise<boolean>;

  /**
  * @returns {Promise<BigNum>}
  */
  abstract coin(): Promise<BigNum>;

  /**
  * @param {BigNum} coin
  */
  abstract setCoin(coin: BigNum): Promise<void>;

  /**
  * @returns {Promise<Optional<MultiAsset>>}
  */
  abstract multiasset(): Promise<Optional<MultiAsset>>;

  /**
  * @param {MultiAsset} multiasset
  */
  abstract setMultiasset(multiasset: MultiAsset): Promise<void>;

  /**
  * @param {Value} rhs
  * @returns {Promise<Value>}
  */
  abstract checkedAdd(rhs: Value): Promise<Value>;

  /**
  * @param {Value} rhsValue
  * @returns {Promise<Value>}
  */
  abstract checkedSub(rhsValue: Value): Promise<Value>;

  /**
  * @param {Value} rhsValue
  * @returns {Promise<Value>}
  */
  abstract clampedSub(rhsValue: Value): Promise<Value>;

  /**
  * @param {Value} rhsValue
  * @returns {Promise<Optional<number>>}
  */
  abstract compare(rhsValue: Value): Promise<Optional<number>>;

}

export abstract class VersionedBlock extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<VersionedBlock>}
  */
  static fromBytes(bytes: Uint8Array): Promise<VersionedBlock> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<VersionedBlock>}
  */
  static fromHex(hexStr: string): Promise<VersionedBlock> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<VersionedBlock>}
  */
  static fromJson(json: string): Promise<VersionedBlock> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Block} block
  * @param {number} eraCode
  * @returns {Promise<VersionedBlock>}
  */
  static new(block: Block, eraCode: number): Promise<VersionedBlock> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Block>}
  */
  abstract block(): Promise<Block>;

  /**
  * @returns {Promise<BlockEra>}
  */
  abstract era(): Promise<BlockEra>;

}

export abstract class Vkey extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<Vkey>}
  */
  static fromBytes(bytes: Uint8Array): Promise<Vkey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<Vkey>}
  */
  static fromHex(hexStr: string): Promise<Vkey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<Vkey>}
  */
  static fromJson(json: string): Promise<Vkey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {PublicKey} pk
  * @returns {Promise<Vkey>}
  */
  static new(pk: PublicKey): Promise<Vkey> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<PublicKey>}
  */
  abstract publicKey(): Promise<PublicKey>;

}

export abstract class Vkeys extends _Ptr {
  /**
  * @returns {Promise<Vkeys>}
  */
  static new(): Promise<Vkeys> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {number} index
  * @returns {Promise<Vkey>}
  */
  abstract get(index: number): Promise<Vkey>;

  /**
  * @param {Vkey} elem
  */
  abstract add(elem: Vkey): Promise<void>;

}

export abstract class Vkeywitness extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<Vkeywitness>}
  */
  static fromBytes(bytes: Uint8Array): Promise<Vkeywitness> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<Vkeywitness>}
  */
  static fromHex(hexStr: string): Promise<Vkeywitness> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<Vkeywitness>}
  */
  static fromJson(json: string): Promise<Vkeywitness> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Vkey} vkey
  * @param {Ed25519Signature} signature
  * @returns {Promise<Vkeywitness>}
  */
  static new(vkey: Vkey, signature: Ed25519Signature): Promise<Vkeywitness> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Vkey>}
  */
  abstract vkey(): Promise<Vkey>;

  /**
  * @returns {Promise<Ed25519Signature>}
  */
  abstract signature(): Promise<Ed25519Signature>;

}

export abstract class Vkeywitnesses extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<Vkeywitnesses>}
  */
  static fromBytes(bytes: Uint8Array): Promise<Vkeywitnesses> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<Vkeywitnesses>}
  */
  static fromHex(hexStr: string): Promise<Vkeywitnesses> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<Vkeywitnesses>}
  */
  static fromJson(json: string): Promise<Vkeywitnesses> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Vkeywitnesses>}
  */
  static new(): Promise<Vkeywitnesses> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {number} index
  * @returns {Promise<Vkeywitness>}
  */
  abstract get(index: number): Promise<Vkeywitness>;

  /**
  * @param {Vkeywitness} elem
  * @returns {Promise<boolean>}
  */
  abstract add(elem: Vkeywitness): Promise<boolean>;

}

export abstract class VoteDelegation extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<VoteDelegation>}
  */
  static fromBytes(bytes: Uint8Array): Promise<VoteDelegation> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<VoteDelegation>}
  */
  static fromHex(hexStr: string): Promise<VoteDelegation> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<VoteDelegation>}
  */
  static fromJson(json: string): Promise<VoteDelegation> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Credential>}
  */
  abstract stakeCredential(): Promise<Credential>;

  /**
  * @returns {Promise<DRep>}
  */
  abstract drep(): Promise<DRep>;

  /**
  * @param {Credential} stakeCredential
  * @param {DRep} drep
  * @returns {Promise<VoteDelegation>}
  */
  static new(stakeCredential: Credential, drep: DRep): Promise<VoteDelegation> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<boolean>}
  */
  abstract hasScriptCredentials(): Promise<boolean>;

}

export abstract class VoteRegistrationAndDelegation extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<VoteRegistrationAndDelegation>}
  */
  static fromBytes(bytes: Uint8Array): Promise<VoteRegistrationAndDelegation> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<VoteRegistrationAndDelegation>}
  */
  static fromHex(hexStr: string): Promise<VoteRegistrationAndDelegation> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<VoteRegistrationAndDelegation>}
  */
  static fromJson(json: string): Promise<VoteRegistrationAndDelegation> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Credential>}
  */
  abstract stakeCredential(): Promise<Credential>;

  /**
  * @returns {Promise<DRep>}
  */
  abstract drep(): Promise<DRep>;

  /**
  * @returns {Promise<BigNum>}
  */
  abstract coin(): Promise<BigNum>;

  /**
  * @param {Credential} stakeCredential
  * @param {DRep} drep
  * @param {BigNum} coin
  * @returns {Promise<VoteRegistrationAndDelegation>}
  */
  static new(stakeCredential: Credential, drep: DRep, coin: BigNum): Promise<VoteRegistrationAndDelegation> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<boolean>}
  */
  abstract hasScriptCredentials(): Promise<boolean>;

}

export abstract class Voter extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<Voter>}
  */
  static fromBytes(bytes: Uint8Array): Promise<Voter> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<Voter>}
  */
  static fromHex(hexStr: string): Promise<Voter> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<Voter>}
  */
  static fromJson(json: string): Promise<Voter> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Credential} cred
  * @returns {Promise<Voter>}
  */
  static newConstitutionalCommitteeHotCredential(cred: Credential): Promise<Voter> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Credential} cred
  * @returns {Promise<Voter>}
  */
  static newDrepCredential(cred: Credential): Promise<Voter> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Ed25519KeyHash} keyHash
  * @returns {Promise<Voter>}
  */
  static newStakePoolKeyHash(keyHash: Ed25519KeyHash): Promise<Voter> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<VoterKind>}
  */
  abstract kind(): Promise<VoterKind>;

  /**
  * @returns {Promise<Optional<Credential>>}
  */
  abstract toConstitutionalCommitteeHotCredential(): Promise<Optional<Credential>>;

  /**
  * @returns {Promise<Optional<Credential>>}
  */
  abstract toDrepCredential(): Promise<Optional<Credential>>;

  /**
  * @returns {Promise<Optional<Ed25519KeyHash>>}
  */
  abstract toStakePoolKeyHash(): Promise<Optional<Ed25519KeyHash>>;

  /**
  * @returns {Promise<boolean>}
  */
  abstract hasScriptCredentials(): Promise<boolean>;

  /**
  * @returns {Promise<Optional<Ed25519KeyHash>>}
  */
  abstract toKeyHash(): Promise<Optional<Ed25519KeyHash>>;

}

export abstract class Voters extends _Ptr {
  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<Voters>}
  */
  static fromJson(json: string): Promise<Voters> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Voters>}
  */
  static new(): Promise<Voters> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Voter} voter
  */
  abstract add(voter: Voter): Promise<void>;

  /**
  * @param {number} index
  * @returns {Promise<Optional<Voter>>}
  */
  abstract get(index: number): Promise<Optional<Voter>>;

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

}

export abstract class VotingBuilder extends _Ptr {
  /**
  * @returns {Promise<VotingBuilder>}
  */
  static new(): Promise<VotingBuilder> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Voter} voter
  * @param {GovernanceActionId} govActionId
  * @param {VotingProcedure} votingProcedure
  * @returns {Promise<void>}
  */
  abstract add(voter: Voter, govActionId: GovernanceActionId, votingProcedure: VotingProcedure): Promise<void>;

  /**
  * @param {Voter} voter
  * @param {GovernanceActionId} govActionId
  * @param {VotingProcedure} votingProcedure
  * @param {PlutusWitness} witness
  * @returns {Promise<void>}
  */
  abstract addWithPlutusWitness(voter: Voter, govActionId: GovernanceActionId, votingProcedure: VotingProcedure, witness: PlutusWitness): Promise<void>;

  /**
  * @param {Voter} voter
  * @param {GovernanceActionId} govActionId
  * @param {VotingProcedure} votingProcedure
  * @param {NativeScriptSource} nativeScriptSource
  * @returns {Promise<void>}
  */
  abstract addWithNativeScript(voter: Voter, govActionId: GovernanceActionId, votingProcedure: VotingProcedure, nativeScriptSource: NativeScriptSource): Promise<void>;

  /**
  * @returns {Promise<PlutusWitnesses>}
  */
  abstract getPlutusWitnesses(): Promise<PlutusWitnesses>;

  /**
  * @returns {Promise<TransactionInputs>}
  */
  abstract getRefInputs(): Promise<TransactionInputs>;

  /**
  * @returns {Promise<NativeScripts>}
  */
  abstract getNativeScripts(): Promise<NativeScripts>;

  /**
  * @returns {Promise<boolean>}
  */
  abstract hasPlutusScripts(): Promise<boolean>;

  /**
  * @returns {Promise<VotingProcedures>}
  */
  abstract build(): Promise<VotingProcedures>;

}

export abstract class VotingProcedure extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<VotingProcedure>}
  */
  static fromBytes(bytes: Uint8Array): Promise<VotingProcedure> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<VotingProcedure>}
  */
  static fromHex(hexStr: string): Promise<VotingProcedure> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<VotingProcedure>}
  */
  static fromJson(json: string): Promise<VotingProcedure> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {VoteKind} vote
  * @returns {Promise<VotingProcedure>}
  */
  static new(vote: VoteKind): Promise<VotingProcedure> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {VoteKind} vote
  * @param {Anchor} anchor
  * @returns {Promise<VotingProcedure>}
  */
  static newWithAnchor(vote: VoteKind, anchor: Anchor): Promise<VotingProcedure> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<VoteKind>}
  */
  abstract voteKind(): Promise<VoteKind>;

  /**
  * @returns {Promise<Optional<Anchor>>}
  */
  abstract anchor(): Promise<Optional<Anchor>>;

}

export abstract class VotingProcedures extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<VotingProcedures>}
  */
  static fromBytes(bytes: Uint8Array): Promise<VotingProcedures> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<VotingProcedures>}
  */
  static fromHex(hexStr: string): Promise<VotingProcedures> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<VotingProcedures>}
  */
  static fromJson(json: string): Promise<VotingProcedures> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<VotingProcedures>}
  */
  static new(): Promise<VotingProcedures> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Voter} voter
  * @param {GovernanceActionId} governanceActionId
  * @param {VotingProcedure} votingProcedure
  */
  abstract insert(voter: Voter, governanceActionId: GovernanceActionId, votingProcedure: VotingProcedure): Promise<void>;

  /**
  * @param {Voter} voter
  * @param {GovernanceActionId} governanceActionId
  * @returns {Promise<Optional<VotingProcedure>>}
  */
  abstract get(voter: Voter, governanceActionId: GovernanceActionId): Promise<Optional<VotingProcedure>>;

  /**
  * @returns {Promise<Voters>}
  */
  abstract getVoters(): Promise<Voters>;

  /**
  * @param {Voter} voter
  * @returns {Promise<GovernanceActionIds>}
  */
  abstract getGovernanceActionIdsByVoter(voter: Voter): Promise<GovernanceActionIds>;

}

export abstract class VotingProposal extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<VotingProposal>}
  */
  static fromBytes(bytes: Uint8Array): Promise<VotingProposal> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<VotingProposal>}
  */
  static fromHex(hexStr: string): Promise<VotingProposal> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<VotingProposal>}
  */
  static fromJson(json: string): Promise<VotingProposal> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<GovernanceAction>}
  */
  abstract governanceAction(): Promise<GovernanceAction>;

  /**
  * @returns {Promise<Anchor>}
  */
  abstract anchor(): Promise<Anchor>;

  /**
  * @returns {Promise<RewardAddress>}
  */
  abstract rewardAccount(): Promise<RewardAddress>;

  /**
  * @returns {Promise<BigNum>}
  */
  abstract deposit(): Promise<BigNum>;

  /**
  * @param {GovernanceAction} governanceAction
  * @param {Anchor} anchor
  * @param {RewardAddress} rewardAccount
  * @param {BigNum} deposit
  * @returns {Promise<VotingProposal>}
  */
  static new(governanceAction: GovernanceAction, anchor: Anchor, rewardAccount: RewardAddress, deposit: BigNum): Promise<VotingProposal> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class VotingProposalBuilder extends _Ptr {
  /**
  * @returns {Promise<VotingProposalBuilder>}
  */
  static new(): Promise<VotingProposalBuilder> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {VotingProposal} proposal
  * @returns {Promise<void>}
  */
  abstract add(proposal: VotingProposal): Promise<void>;

  /**
  * @param {VotingProposal} proposal
  * @param {PlutusWitness} witness
  * @returns {Promise<void>}
  */
  abstract addWithPlutusWitness(proposal: VotingProposal, witness: PlutusWitness): Promise<void>;

  /**
  * @returns {Promise<PlutusWitnesses>}
  */
  abstract getPlutusWitnesses(): Promise<PlutusWitnesses>;

  /**
  * @returns {Promise<TransactionInputs>}
  */
  abstract getRefInputs(): Promise<TransactionInputs>;

  /**
  * @returns {Promise<boolean>}
  */
  abstract hasPlutusScripts(): Promise<boolean>;

  /**
  * @returns {Promise<VotingProposals>}
  */
  abstract build(): Promise<VotingProposals>;

}

export abstract class VotingProposals extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<VotingProposals>}
  */
  static fromBytes(bytes: Uint8Array): Promise<VotingProposals> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<VotingProposals>}
  */
  static fromHex(hexStr: string): Promise<VotingProposals> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<VotingProposals>}
  */
  static fromJson(json: string): Promise<VotingProposals> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<VotingProposals>}
  */
  static new(): Promise<VotingProposals> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {number} index
  * @returns {Promise<VotingProposal>}
  */
  abstract get(index: number): Promise<VotingProposal>;

  /**
  * @param {VotingProposal} proposal
  * @returns {Promise<boolean>}
  */
  abstract add(proposal: VotingProposal): Promise<boolean>;

}

export abstract class Withdrawals extends _Ptr {
  /**
  * @returns {Promise<Uint8Array>}
  */
  abstract toBytes(): Promise<Uint8Array>;

  /**
  * @param {Uint8Array} bytes
  * @returns {Promise<Withdrawals>}
  */
  static fromBytes(bytes: Uint8Array): Promise<Withdrawals> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toHex(): Promise<string>;

  /**
  * @param {string} hexStr
  * @returns {Promise<Withdrawals>}
  */
  static fromHex(hexStr: string): Promise<Withdrawals> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<string>}
  */
  abstract toJson(): Promise<string>;

  /**
  * @param {string} json
  * @returns {Promise<Withdrawals>}
  */
  static fromJson(json: string): Promise<Withdrawals> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<Withdrawals>}
  */
  static new(): Promise<Withdrawals> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Promise<number>}
  */
  abstract len(): Promise<number>;

  /**
  * @param {RewardAddress} key
  * @param {BigNum} value
  * @returns {Promise<Optional<BigNum>>}
  */
  abstract insert(key: RewardAddress, value: BigNum): Promise<Optional<BigNum>>;

  /**
  * @param {RewardAddress} key
  * @returns {Promise<Optional<BigNum>>}
  */
  abstract get(key: RewardAddress): Promise<Optional<BigNum>>;

  /**
  * @returns {Promise<RewardAddresses>}
  */
  abstract keys(): Promise<RewardAddresses>;

}

export abstract class WithdrawalsBuilder extends _Ptr {
  /**
  * @returns {Promise<WithdrawalsBuilder>}
  */
  static new(): Promise<WithdrawalsBuilder> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {RewardAddress} address
  * @param {BigNum} coin
  * @returns {Promise<void>}
  */
  abstract add(address: RewardAddress, coin: BigNum): Promise<void>;

  /**
  * @param {RewardAddress} address
  * @param {BigNum} coin
  * @param {PlutusWitness} witness
  * @returns {Promise<void>}
  */
  abstract addWithPlutusWitness(address: RewardAddress, coin: BigNum, witness: PlutusWitness): Promise<void>;

  /**
  * @param {RewardAddress} address
  * @param {BigNum} coin
  * @param {NativeScriptSource} nativeScriptSource
  * @returns {Promise<void>}
  */
  abstract addWithNativeScript(address: RewardAddress, coin: BigNum, nativeScriptSource: NativeScriptSource): Promise<void>;

  /**
  * @returns {Promise<PlutusWitnesses>}
  */
  abstract getPlutusWitnesses(): Promise<PlutusWitnesses>;

  /**
  * @returns {Promise<TransactionInputs>}
  */
  abstract getRefInputs(): Promise<TransactionInputs>;

  /**
  * @returns {Promise<NativeScripts>}
  */
  abstract getNativeScripts(): Promise<NativeScripts>;

  /**
  * @returns {Promise<Value>}
  */
  abstract getTotalWithdrawals(): Promise<Value>;

  /**
  * @returns {Promise<boolean>}
  */
  abstract hasPlutusScripts(): Promise<boolean>;

  /**
  * @returns {Promise<Withdrawals>}
  */
  abstract build(): Promise<Withdrawals>;

}

export enum AddressKind {
  Base = 0,
  Pointer = 1,
  Enterprise = 2,
  Reward = 3,
  Byron = 4,
  Malformed = 5,
}

export enum BlockEra {
  Byron = 0,
  Shelley = 1,
  Allegra = 2,
  Mary = 3,
  Alonzo = 4,
  Babbage = 5,
  Conway = 6,
  Unknown = 7,
}

export enum CborContainerType {
  Array = 0,
  Map = 1,
}

export enum CertificateKind {
  StakeRegistration = 0,
  StakeDeregistration = 1,
  StakeDelegation = 2,
  PoolRegistration = 3,
  PoolRetirement = 4,
  GenesisKeyDelegation = 5,
  MoveInstantaneousRewardsCert = 6,
  CommitteeHotAuth = 7,
  CommitteeColdResign = 8,
  DRepDeregistration = 9,
  DRepRegistration = 10,
  DRepUpdate = 11,
  StakeAndVoteDelegation = 12,
  StakeRegistrationAndDelegation = 13,
  StakeVoteRegistrationAndDelegation = 14,
  VoteDelegation = 15,
  VoteRegistrationAndDelegation = 16,
}

export enum CoinSelectionStrategyCIP2 {
  LargestFirst = 0,
  RandomImprove = 1,
  LargestFirstMultiAsset = 2,
  RandomImproveMultiAsset = 3,
}

export enum CredKind {
  Key = 0,
  Script = 1,
}

export enum DRepKind {
  KeyHash = 0,
  ScriptHash = 1,
  AlwaysAbstain = 2,
  AlwaysNoConfidence = 3,
}

export enum GovernanceActionKind {
  ParameterChangeAction = 0,
  HardForkInitiationAction = 1,
  TreasuryWithdrawalsAction = 2,
  NoConfidenceAction = 3,
  UpdateCommitteeAction = 4,
  NewConstitutionAction = 5,
  InfoAction = 6,
}

export enum LanguageKind {
  PlutusV1 = 0,
  PlutusV2 = 1,
  PlutusV3 = 2,
}

export enum MIRKind {
  ToOtherPot = 0,
  ToStakeCredentials = 1,
}

export enum MIRPot {
  Reserves = 0,
  Treasury = 1,
}

export enum MetadataJsonSchema {
  NoConversions = 0,
  BasicConversions = 1,
  DetailedSchema = 2,
}

export enum NativeScriptKind {
  ScriptPubkey = 0,
  ScriptAll = 1,
  ScriptAny = 2,
  ScriptNOfK = 3,
  TimelockStart = 4,
  TimelockExpiry = 5,
}

export enum NetworkIdKind {
  Testnet = 0,
  Mainnet = 1,
}

export enum PlutusDataKind {
  ConstrPlutusData = 0,
  Map = 1,
  List = 2,
  Integer = 3,
  Bytes = 4,
}

export enum PlutusDatumSchema {
  BasicConversions = 0,
  DetailedSchema = 1,
}

export enum RedeemerTagKind {
  Spend = 0,
  Mint = 1,
  Cert = 2,
  Reward = 3,
  Vote = 4,
  VotingProposal = 5,
}

export enum RelayKind {
  SingleHostAddr = 0,
  SingleHostName = 1,
  MultiHostName = 2,
}

export enum ScriptHashNamespace {
  NativeScript = 0,
  PlutusScript = 1,
  PlutusScriptV2 = 2,
  PlutusScriptV3 = 3,
}

export enum ScriptSchema {
  Wallet = 0,
  Node = 1,
}

export enum TransactionMetadatumKind {
  MetadataMap = 0,
  MetadataList = 1,
  Int = 2,
  Bytes = 3,
  Text = 4,
}

export enum VoteKind {
  No = 0,
  Yes = 1,
  Abstain = 2,
}

export enum VoterKind {
  ConstitutionalCommitteeHotKeyHash = 0,
  ConstitutionalCommitteeHotScriptHash = 1,
  DRepKeyHash = 2,
  DRepScriptHash = 3,
  StakingPoolKeyHash = 4,
}

