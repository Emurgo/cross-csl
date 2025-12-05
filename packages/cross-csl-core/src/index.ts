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

export const freeContext = (context: string) => {
  if (pointers[context]) {
    for (const pointer of pointers[context]) {
      if (pointer.free) {
        pointer.free();
      }
    }
    delete pointers[context];
  }
};

export const switchContext = (from: string, to: string) => {
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
   * @returns {void}
   */
  abstract free(): void;
}

export abstract class Ptr<T extends { free: () => any }> extends WasmProxy<T> {
  constructor(wasm: T | undefined, ctx: string) {
    super(wasm, ctx);
  }

  free(): void {
    return this.wasm.free();
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
  calculateExUnitsCeilCost(exUnits: ExUnits, exUnitPrices: ExUnitPrices): BigNum;
  createSendAll(address: Address, utxos: TransactionUnspentOutputs, config: TransactionBuilderConfig): TransactionBatchList;
  decodeArbitraryBytesFromMetadatum(metadata: TransactionMetadatum): Uint8Array;
  decodeMetadatumToJsonStr(metadatum: TransactionMetadatum, schema: MetadataJsonSchema): string;
  decodePlutusDatumToJsonStr(datum: PlutusData, schema: PlutusDatumSchema): string;
  decryptWithPassword(password: string, data: string): string;
  encodeArbitraryBytesAsMetadatum(bytes: Uint8Array): TransactionMetadatum;
  encodeJsonStrToMetadatum(json: string, schema: MetadataJsonSchema): TransactionMetadatum;
  encodeJsonStrToNativeScript(json: string, selfXpub: string, schema: ScriptSchema): NativeScript;
  encodeJsonStrToPlutusDatum(json: string, schema: PlutusDatumSchema): PlutusData;
  encryptWithPassword(password: string, salt: string, nonce: string, data: string): string;
  getDeposit(txbody: TransactionBody, poolDeposit: BigNum, keyDeposit: BigNum): BigNum;
  getImplicitInput(txbody: TransactionBody, poolDeposit: BigNum, keyDeposit: BigNum): Value;
  hasTransactionSetTag(txBytes: Uint8Array): TransactionSetsState;
  hashAuxiliaryData(auxiliaryData: AuxiliaryData): AuxiliaryDataHash;
  hashPlutusData(plutusData: PlutusData): DataHash;
  hashScriptData(redeemers: Redeemers, costModels: Costmdls, datums: Optional<PlutusList>): ScriptDataHash;
  makeDaedalusBootstrapWitness(txBodyHash: TransactionHash, addr: ByronAddress, key: LegacyDaedalusPrivateKey): BootstrapWitness;
  makeIcarusBootstrapWitness(txBodyHash: TransactionHash, addr: ByronAddress, key: Bip32PrivateKey): BootstrapWitness;
  makeVkeyWitness(txBodyHash: TransactionHash, sk: PrivateKey): Vkeywitness;
  minAdaForOutput(output: TransactionOutput, dataCost: DataCost): BigNum;
  minFee(tx: Transaction, linearFee: LinearFee): BigNum;
  minRefScriptFee(totalRefScriptsSize: number, refScriptCoinsPerByte: UnitInterval): BigNum;
  minScriptFee(tx: Transaction, exUnitPrices: ExUnitPrices): BigNum;
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
  ByronAddressType: typeof ByronAddressType;
  CborContainerType: typeof CborContainerType;
  CborSetType: typeof CborSetType;
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
  TransactionSetsState: typeof TransactionSetsState;
  VoteKind: typeof VoteKind;
  VoterKind: typeof VoterKind;
}

export abstract class Address extends _Ptr {
  /**
  * @param {Uint8Array} data
  * @returns {Address}
  */
  static fromBytes(data: Uint8Array): Address {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {Address}
  */
  static fromJson(json: string): Address {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {AddressKind}
  */
  abstract kind(): AddressKind;

  /**
  * @returns {Optional<Credential>}
  */
  abstract paymentCred(): Optional<Credential>;

  /**
  * @returns {boolean}
  */
  abstract isMalformed(): boolean;

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {Address}
  */
  static fromHex(hexStr: string): Address {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Optional<string>} prefix
  * @returns {string}
  */
  abstract toBech32(prefix: Optional<string>): string;

  /**
  * @param {string} bechStr
  * @returns {Address}
  */
  static fromBech32(bechStr: string): Address {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract networkId(): number;

}

export abstract class Anchor extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {Anchor}
  */
  static fromBytes(bytes: Uint8Array): Anchor {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {Anchor}
  */
  static fromHex(hexStr: string): Anchor {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {Anchor}
  */
  static fromJson(json: string): Anchor {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {URL}
  */
  abstract url(): URL;

  /**
  * @returns {AnchorDataHash}
  */
  abstract anchorDataHash(): AnchorDataHash;

  /**
  * @param {URL} anchorUrl
  * @param {AnchorDataHash} anchorDataHash
  * @returns {Anchor}
  */
  static new(anchorUrl: URL, anchorDataHash: AnchorDataHash): Anchor {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class AnchorDataHash extends _Ptr {
  /**
  * @param {Uint8Array} bytes
  * @returns {AnchorDataHash}
  */
  static fromBytes(bytes: Uint8Array): AnchorDataHash {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {string} prefix
  * @returns {string}
  */
  abstract toBech32(prefix: string): string;

  /**
  * @param {string} bechStr
  * @returns {AnchorDataHash}
  */
  static fromBech32(bechStr: string): AnchorDataHash {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hex
  * @returns {AnchorDataHash}
  */
  static fromHex(hex: string): AnchorDataHash {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class AssetName extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {AssetName}
  */
  static fromBytes(bytes: Uint8Array): AssetName {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {AssetName}
  */
  static fromHex(hexStr: string): AssetName {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {AssetName}
  */
  static fromJson(json: string): AssetName {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Uint8Array} name
  * @returns {AssetName}
  */
  static new(name: Uint8Array): AssetName {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Uint8Array}
  */
  abstract name(): Uint8Array;

}

export abstract class AssetNames extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {AssetNames}
  */
  static fromBytes(bytes: Uint8Array): AssetNames {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {AssetNames}
  */
  static fromHex(hexStr: string): AssetNames {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {AssetNames}
  */
  static fromJson(json: string): AssetNames {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {AssetNames}
  */
  static new(): AssetNames {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {number} index
  * @returns {AssetName}
  */
  abstract get(index: number): AssetName;

  /**
  * @param {AssetName} elem
  */
  abstract add(elem: AssetName): void;

}

export abstract class Assets extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {Assets}
  */
  static fromBytes(bytes: Uint8Array): Assets {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {Assets}
  */
  static fromHex(hexStr: string): Assets {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {Assets}
  */
  static fromJson(json: string): Assets {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Assets}
  */
  static new(): Assets {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {AssetName} key
  * @param {BigNum} value
  * @returns {Optional<BigNum>}
  */
  abstract insert(key: AssetName, value: BigNum): Optional<BigNum>;

  /**
  * @param {AssetName} key
  * @returns {Optional<BigNum>}
  */
  abstract get(key: AssetName): Optional<BigNum>;

  /**
  * @returns {AssetNames}
  */
  abstract keys(): AssetNames;

}

export abstract class AuxiliaryData extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {AuxiliaryData}
  */
  static fromBytes(bytes: Uint8Array): AuxiliaryData {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {AuxiliaryData}
  */
  static fromHex(hexStr: string): AuxiliaryData {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {AuxiliaryData}
  */
  static fromJson(json: string): AuxiliaryData {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {AuxiliaryData}
  */
  static new(): AuxiliaryData {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Optional<GeneralTransactionMetadata>}
  */
  abstract metadata(): Optional<GeneralTransactionMetadata>;

  /**
  * @param {GeneralTransactionMetadata} metadata
  */
  abstract setMetadata(metadata: GeneralTransactionMetadata): void;

  /**
  * @returns {Optional<NativeScripts>}
  */
  abstract nativeScripts(): Optional<NativeScripts>;

  /**
  * @param {NativeScripts} nativeScripts
  */
  abstract setNativeScripts(nativeScripts: NativeScripts): void;

  /**
  * @returns {Optional<PlutusScripts>}
  */
  abstract plutusScripts(): Optional<PlutusScripts>;

  /**
  * @param {PlutusScripts} plutusScripts
  */
  abstract setPlutusScripts(plutusScripts: PlutusScripts): void;

  /**
  * @returns {boolean}
  */
  abstract preferAlonzoFormat(): boolean;

  /**
  * @param {boolean} prefer
  */
  abstract setPreferAlonzoFormat(prefer: boolean): void;

}

export abstract class AuxiliaryDataHash extends _Ptr {
  /**
  * @param {Uint8Array} bytes
  * @returns {AuxiliaryDataHash}
  */
  static fromBytes(bytes: Uint8Array): AuxiliaryDataHash {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {string} prefix
  * @returns {string}
  */
  abstract toBech32(prefix: string): string;

  /**
  * @param {string} bechStr
  * @returns {AuxiliaryDataHash}
  */
  static fromBech32(bechStr: string): AuxiliaryDataHash {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hex
  * @returns {AuxiliaryDataHash}
  */
  static fromHex(hex: string): AuxiliaryDataHash {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class AuxiliaryDataSet extends _Ptr {
  /**
  * @returns {AuxiliaryDataSet}
  */
  static new(): AuxiliaryDataSet {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {number} txIndex
  * @param {AuxiliaryData} data
  * @returns {Optional<AuxiliaryData>}
  */
  abstract insert(txIndex: number, data: AuxiliaryData): Optional<AuxiliaryData>;

  /**
  * @param {number} txIndex
  * @returns {Optional<AuxiliaryData>}
  */
  abstract get(txIndex: number): Optional<AuxiliaryData>;

  /**
  * @returns {Uint32Array}
  */
  abstract indices(): Uint32Array;

}

export abstract class BaseAddress extends _Ptr {
  /**
  * @param {number} network
  * @param {Credential} payment
  * @param {Credential} stake
  * @returns {BaseAddress}
  */
  static new(network: number, payment: Credential, stake: Credential): BaseAddress {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Credential}
  */
  abstract paymentCred(): Credential;

  /**
  * @returns {Credential}
  */
  abstract stakeCred(): Credential;

  /**
  * @returns {Address}
  */
  abstract toAddress(): Address;

  /**
  * @param {Address} addr
  * @returns {Optional<BaseAddress>}
  */
  static fromAddress(addr: Address): Optional<BaseAddress> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract networkId(): number;

}

export abstract class BigInt extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {BigInt}
  */
  static fromBytes(bytes: Uint8Array): BigInt {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {BigInt}
  */
  static fromHex(hexStr: string): BigInt {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {BigInt}
  */
  static fromJson(json: string): BigInt {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {boolean}
  */
  abstract isZero(): boolean;

  /**
  * @returns {Optional<BigNum>}
  */
  abstract asU64(): Optional<BigNum>;

  /**
  * @returns {Optional<Int>}
  */
  abstract asInt(): Optional<Int>;

  /**
  * @param {string} text
  * @returns {BigInt}
  */
  static fromStr(text: string): BigInt {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toStr(): string;

  /**
  * @param {BigInt} other
  * @returns {BigInt}
  */
  abstract add(other: BigInt): BigInt;

  /**
  * @param {BigInt} other
  * @returns {BigInt}
  */
  abstract sub(other: BigInt): BigInt;

  /**
  * @param {BigInt} other
  * @returns {BigInt}
  */
  abstract mul(other: BigInt): BigInt;

  /**
  * @param {number} exp
  * @returns {BigInt}
  */
  abstract pow(exp: number): BigInt;

  /**
  * @returns {BigInt}
  */
  static one(): BigInt {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {BigInt}
  */
  static zero(): BigInt {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {BigInt}
  */
  abstract abs(): BigInt;

  /**
  * @returns {BigInt}
  */
  abstract increment(): BigInt;

  /**
  * @param {BigInt} other
  * @returns {BigInt}
  */
  abstract divCeil(other: BigInt): BigInt;

  /**
  * @param {BigInt} other
  * @returns {BigInt}
  */
  abstract divFloor(other: BigInt): BigInt;

}

export abstract class BigNum extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {BigNum}
  */
  static fromBytes(bytes: Uint8Array): BigNum {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {BigNum}
  */
  static fromHex(hexStr: string): BigNum {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {BigNum}
  */
  static fromJson(json: string): BigNum {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {string} string
  * @returns {BigNum}
  */
  static fromStr(string: string): BigNum {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toStr(): string;

  /**
  * @returns {BigNum}
  */
  static zero(): BigNum {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {BigNum}
  */
  static one(): BigNum {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {boolean}
  */
  abstract isZero(): boolean;

  /**
  * @param {BigNum} other
  * @returns {BigNum}
  */
  abstract divFloor(other: BigNum): BigNum;

  /**
  * @param {BigNum} other
  * @returns {BigNum}
  */
  abstract checkedMul(other: BigNum): BigNum;

  /**
  * @param {BigNum} other
  * @returns {BigNum}
  */
  abstract checkedAdd(other: BigNum): BigNum;

  /**
  * @param {BigNum} other
  * @returns {BigNum}
  */
  abstract checkedSub(other: BigNum): BigNum;

  /**
  * @param {BigNum} other
  * @returns {BigNum}
  */
  abstract clampedSub(other: BigNum): BigNum;

  /**
  * @param {BigNum} rhsValue
  * @returns {number}
  */
  abstract compare(rhsValue: BigNum): number;

  /**
  * @param {BigNum} rhsValue
  * @returns {boolean}
  */
  abstract lessThan(rhsValue: BigNum): boolean;

  /**
  * @returns {BigNum}
  */
  static maxValue(): BigNum {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {BigNum} a
  * @param {BigNum} b
  * @returns {BigNum}
  */
  static max(a: BigNum, b: BigNum): BigNum {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class Bip32PrivateKey extends _Ptr {
  /**
  * @param {number} index
  * @returns {Bip32PrivateKey}
  */
  abstract derive(index: number): Bip32PrivateKey;

  /**
  * @param {Uint8Array} bytes
  * @returns {Bip32PrivateKey}
  */
  static from_128Xprv(bytes: Uint8Array): Bip32PrivateKey {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Uint8Array}
  */
  abstract to_128Xprv(): Uint8Array;

  /**
  * @returns {Bip32PrivateKey}
  */
  static generateEd25519Bip32(): Bip32PrivateKey {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {PrivateKey}
  */
  abstract toRawKey(): PrivateKey;

  /**
  * @returns {Bip32PublicKey}
  */
  abstract toPublic(): Bip32PublicKey;

  /**
  * @param {Uint8Array} bytes
  * @returns {Bip32PrivateKey}
  */
  static fromBytes(bytes: Uint8Array): Bip32PrivateKey {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Uint8Array}
  */
  abstract asBytes(): Uint8Array;

  /**
  * @param {string} bech32Str
  * @returns {Bip32PrivateKey}
  */
  static fromBech32(bech32Str: string): Bip32PrivateKey {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toBech32(): string;

  /**
  * @param {Uint8Array} entropy
  * @param {Uint8Array} password
  * @returns {Bip32PrivateKey}
  */
  static fromBip39Entropy(entropy: Uint8Array, password: Uint8Array): Bip32PrivateKey {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Uint8Array}
  */
  abstract chaincode(): Uint8Array;

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {Bip32PrivateKey}
  */
  static fromHex(hexStr: string): Bip32PrivateKey {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class Bip32PublicKey extends _Ptr {
  /**
  * @param {number} index
  * @returns {Bip32PublicKey}
  */
  abstract derive(index: number): Bip32PublicKey;

  /**
  * @returns {PublicKey}
  */
  abstract toRawKey(): PublicKey;

  /**
  * @param {Uint8Array} bytes
  * @returns {Bip32PublicKey}
  */
  static fromBytes(bytes: Uint8Array): Bip32PublicKey {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Uint8Array}
  */
  abstract asBytes(): Uint8Array;

  /**
  * @param {string} bech32Str
  * @returns {Bip32PublicKey}
  */
  static fromBech32(bech32Str: string): Bip32PublicKey {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toBech32(): string;

  /**
  * @returns {Uint8Array}
  */
  abstract chaincode(): Uint8Array;

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {Bip32PublicKey}
  */
  static fromHex(hexStr: string): Bip32PublicKey {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class Block extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {Block}
  */
  static fromBytes(bytes: Uint8Array): Block {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {Block}
  */
  static fromHex(hexStr: string): Block {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {Block}
  */
  static fromJson(json: string): Block {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Header}
  */
  abstract header(): Header;

  /**
  * @returns {TransactionBodies}
  */
  abstract transactionBodies(): TransactionBodies;

  /**
  * @returns {TransactionWitnessSets}
  */
  abstract transactionWitnessSets(): TransactionWitnessSets;

  /**
  * @returns {AuxiliaryDataSet}
  */
  abstract auxiliaryDataSet(): AuxiliaryDataSet;

  /**
  * @returns {Uint32Array}
  */
  abstract invalidTransactions(): Uint32Array;

  /**
  * @param {Header} header
  * @param {TransactionBodies} transactionBodies
  * @param {TransactionWitnessSets} transactionWitnessSets
  * @param {AuxiliaryDataSet} auxiliaryDataSet
  * @param {Uint32Array} invalidTransactions
  * @returns {Block}
  */
  static new(header: Header, transactionBodies: TransactionBodies, transactionWitnessSets: TransactionWitnessSets, auxiliaryDataSet: AuxiliaryDataSet, invalidTransactions: Uint32Array): Block {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class BlockHash extends _Ptr {
  /**
  * @param {Uint8Array} bytes
  * @returns {BlockHash}
  */
  static fromBytes(bytes: Uint8Array): BlockHash {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {string} prefix
  * @returns {string}
  */
  abstract toBech32(prefix: string): string;

  /**
  * @param {string} bechStr
  * @returns {BlockHash}
  */
  static fromBech32(bechStr: string): BlockHash {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hex
  * @returns {BlockHash}
  */
  static fromHex(hex: string): BlockHash {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class BootstrapWitness extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {BootstrapWitness}
  */
  static fromBytes(bytes: Uint8Array): BootstrapWitness {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {BootstrapWitness}
  */
  static fromHex(hexStr: string): BootstrapWitness {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {BootstrapWitness}
  */
  static fromJson(json: string): BootstrapWitness {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Vkey}
  */
  abstract vkey(): Vkey;

  /**
  * @returns {Ed25519Signature}
  */
  abstract signature(): Ed25519Signature;

  /**
  * @returns {Uint8Array}
  */
  abstract chainCode(): Uint8Array;

  /**
  * @returns {Uint8Array}
  */
  abstract attributes(): Uint8Array;

  /**
  * @param {Vkey} vkey
  * @param {Ed25519Signature} signature
  * @param {Uint8Array} chainCode
  * @param {Uint8Array} attributes
  * @returns {BootstrapWitness}
  */
  static new(vkey: Vkey, signature: Ed25519Signature, chainCode: Uint8Array, attributes: Uint8Array): BootstrapWitness {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class BootstrapWitnesses extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {BootstrapWitnesses}
  */
  static fromBytes(bytes: Uint8Array): BootstrapWitnesses {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {BootstrapWitnesses}
  */
  static fromHex(hexStr: string): BootstrapWitnesses {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {BootstrapWitnesses}
  */
  static fromJson(json: string): BootstrapWitnesses {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {BootstrapWitnesses}
  */
  static new(): BootstrapWitnesses {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {number} index
  * @returns {BootstrapWitness}
  */
  abstract get(index: number): BootstrapWitness;

  /**
  * @param {BootstrapWitness} witness
  * @returns {boolean}
  */
  abstract add(witness: BootstrapWitness): boolean;

}

export abstract class ByronAddress extends _Ptr {
  /**
  * @returns {string}
  */
  abstract toBase58(): string;

  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {ByronAddress}
  */
  static fromBytes(bytes: Uint8Array): ByronAddress {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract byronProtocolMagic(): number;

  /**
  * @returns {ByronAddressType}
  */
  abstract byronAddressKind(): ByronAddressType;

  /**
  * @returns {Uint8Array}
  */
  abstract attributes(): Uint8Array;

  /**
  * @returns {number}
  */
  abstract networkId(): number;

  /**
  * @param {string} s
  * @returns {ByronAddress}
  */
  static fromBase58(s: string): ByronAddress {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Bip32PublicKey} key
  * @param {number} protocolMagic
  * @returns {ByronAddress}
  */
  static icarusFromKey(key: Bip32PublicKey, protocolMagic: number): ByronAddress {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {string} s
  * @returns {boolean}
  */
  static isValid(s: string): boolean {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Address}
  */
  abstract toAddress(): Address;

  /**
  * @param {Address} addr
  * @returns {Optional<ByronAddress>}
  */
  static fromAddress(addr: Address): Optional<ByronAddress> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class Certificate extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {Certificate}
  */
  static fromBytes(bytes: Uint8Array): Certificate {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {Certificate}
  */
  static fromHex(hexStr: string): Certificate {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {Certificate}
  */
  static fromJson(json: string): Certificate {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {StakeRegistration} stakeRegistration
  * @returns {Certificate}
  */
  static newStakeRegistration(stakeRegistration: StakeRegistration): Certificate {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {StakeRegistration} stakeRegistration
  * @returns {Certificate}
  */
  static newRegCert(stakeRegistration: StakeRegistration): Certificate {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {StakeDeregistration} stakeDeregistration
  * @returns {Certificate}
  */
  static newStakeDeregistration(stakeDeregistration: StakeDeregistration): Certificate {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {StakeDeregistration} stakeDeregistration
  * @returns {Certificate}
  */
  static newUnregCert(stakeDeregistration: StakeDeregistration): Certificate {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {StakeDelegation} stakeDelegation
  * @returns {Certificate}
  */
  static newStakeDelegation(stakeDelegation: StakeDelegation): Certificate {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {PoolRegistration} poolRegistration
  * @returns {Certificate}
  */
  static newPoolRegistration(poolRegistration: PoolRegistration): Certificate {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {PoolRetirement} poolRetirement
  * @returns {Certificate}
  */
  static newPoolRetirement(poolRetirement: PoolRetirement): Certificate {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {GenesisKeyDelegation} genesisKeyDelegation
  * @returns {Certificate}
  */
  static newGenesisKeyDelegation(genesisKeyDelegation: GenesisKeyDelegation): Certificate {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {MoveInstantaneousRewardsCert} moveInstantaneousRewardsCert
  * @returns {Certificate}
  */
  static newMoveInstantaneousRewardsCert(moveInstantaneousRewardsCert: MoveInstantaneousRewardsCert): Certificate {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {CommitteeHotAuth} committeeHotAuth
  * @returns {Certificate}
  */
  static newCommitteeHotAuth(committeeHotAuth: CommitteeHotAuth): Certificate {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {CommitteeColdResign} committeeColdResign
  * @returns {Certificate}
  */
  static newCommitteeColdResign(committeeColdResign: CommitteeColdResign): Certificate {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {DRepDeregistration} drepDeregistration
  * @returns {Certificate}
  */
  static newDrepDeregistration(drepDeregistration: DRepDeregistration): Certificate {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {DRepRegistration} drepRegistration
  * @returns {Certificate}
  */
  static newDrepRegistration(drepRegistration: DRepRegistration): Certificate {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {DRepUpdate} drepUpdate
  * @returns {Certificate}
  */
  static newDrepUpdate(drepUpdate: DRepUpdate): Certificate {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {StakeAndVoteDelegation} stakeAndVoteDelegation
  * @returns {Certificate}
  */
  static newStakeAndVoteDelegation(stakeAndVoteDelegation: StakeAndVoteDelegation): Certificate {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {StakeRegistrationAndDelegation} stakeRegistrationAndDelegation
  * @returns {Certificate}
  */
  static newStakeRegistrationAndDelegation(stakeRegistrationAndDelegation: StakeRegistrationAndDelegation): Certificate {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {StakeVoteRegistrationAndDelegation} stakeVoteRegistrationAndDelegation
  * @returns {Certificate}
  */
  static newStakeVoteRegistrationAndDelegation(stakeVoteRegistrationAndDelegation: StakeVoteRegistrationAndDelegation): Certificate {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {VoteDelegation} voteDelegation
  * @returns {Certificate}
  */
  static newVoteDelegation(voteDelegation: VoteDelegation): Certificate {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {VoteRegistrationAndDelegation} voteRegistrationAndDelegation
  * @returns {Certificate}
  */
  static newVoteRegistrationAndDelegation(voteRegistrationAndDelegation: VoteRegistrationAndDelegation): Certificate {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {CertificateKind}
  */
  abstract kind(): CertificateKind;

  /**
  * @returns {Optional<StakeRegistration>}
  */
  abstract asStakeRegistration(): Optional<StakeRegistration>;

  /**
  * @returns {Optional<StakeRegistration>}
  */
  abstract asRegCert(): Optional<StakeRegistration>;

  /**
  * @returns {Optional<StakeDeregistration>}
  */
  abstract asStakeDeregistration(): Optional<StakeDeregistration>;

  /**
  * @returns {Optional<StakeDeregistration>}
  */
  abstract asUnregCert(): Optional<StakeDeregistration>;

  /**
  * @returns {Optional<StakeDelegation>}
  */
  abstract asStakeDelegation(): Optional<StakeDelegation>;

  /**
  * @returns {Optional<PoolRegistration>}
  */
  abstract asPoolRegistration(): Optional<PoolRegistration>;

  /**
  * @returns {Optional<PoolRetirement>}
  */
  abstract asPoolRetirement(): Optional<PoolRetirement>;

  /**
  * @returns {Optional<GenesisKeyDelegation>}
  */
  abstract asGenesisKeyDelegation(): Optional<GenesisKeyDelegation>;

  /**
  * @returns {Optional<MoveInstantaneousRewardsCert>}
  */
  abstract asMoveInstantaneousRewardsCert(): Optional<MoveInstantaneousRewardsCert>;

  /**
  * @returns {Optional<CommitteeHotAuth>}
  */
  abstract asCommitteeHotAuth(): Optional<CommitteeHotAuth>;

  /**
  * @returns {Optional<CommitteeColdResign>}
  */
  abstract asCommitteeColdResign(): Optional<CommitteeColdResign>;

  /**
  * @returns {Optional<DRepDeregistration>}
  */
  abstract asDrepDeregistration(): Optional<DRepDeregistration>;

  /**
  * @returns {Optional<DRepRegistration>}
  */
  abstract asDrepRegistration(): Optional<DRepRegistration>;

  /**
  * @returns {Optional<DRepUpdate>}
  */
  abstract asDrepUpdate(): Optional<DRepUpdate>;

  /**
  * @returns {Optional<StakeAndVoteDelegation>}
  */
  abstract asStakeAndVoteDelegation(): Optional<StakeAndVoteDelegation>;

  /**
  * @returns {Optional<StakeRegistrationAndDelegation>}
  */
  abstract asStakeRegistrationAndDelegation(): Optional<StakeRegistrationAndDelegation>;

  /**
  * @returns {Optional<StakeVoteRegistrationAndDelegation>}
  */
  abstract asStakeVoteRegistrationAndDelegation(): Optional<StakeVoteRegistrationAndDelegation>;

  /**
  * @returns {Optional<VoteDelegation>}
  */
  abstract asVoteDelegation(): Optional<VoteDelegation>;

  /**
  * @returns {Optional<VoteRegistrationAndDelegation>}
  */
  abstract asVoteRegistrationAndDelegation(): Optional<VoteRegistrationAndDelegation>;

  /**
  * @returns {boolean}
  */
  abstract hasRequiredScriptWitness(): boolean;

}

export abstract class Certificates extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {Certificates}
  */
  static fromBytes(bytes: Uint8Array): Certificates {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {Certificates}
  */
  static fromHex(hexStr: string): Certificates {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {Certificates}
  */
  static fromJson(json: string): Certificates {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Certificates}
  */
  static new(): Certificates {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {number} index
  * @returns {Certificate}
  */
  abstract get(index: number): Certificate;

  /**
  * @param {Certificate} elem
  * @returns {boolean}
  */
  abstract add(elem: Certificate): boolean;

}

export abstract class CertificatesBuilder extends _Ptr {
  /**
  * @returns {CertificatesBuilder}
  */
  static new(): CertificatesBuilder {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Certificate} cert
  * @returns {void}
  */
  abstract add(cert: Certificate): void;

  /**
  * @param {Certificate} cert
  * @param {PlutusWitness} witness
  * @returns {void}
  */
  abstract addWithPlutusWitness(cert: Certificate, witness: PlutusWitness): void;

  /**
  * @param {Certificate} cert
  * @param {NativeScriptSource} nativeScriptSource
  * @returns {void}
  */
  abstract addWithNativeScript(cert: Certificate, nativeScriptSource: NativeScriptSource): void;

  /**
  * @returns {PlutusWitnesses}
  */
  abstract getPlutusWitnesses(): PlutusWitnesses;

  /**
  * @returns {TransactionInputs}
  */
  abstract getRefInputs(): TransactionInputs;

  /**
  * @returns {NativeScripts}
  */
  abstract getNativeScripts(): NativeScripts;

  /**
  * @param {BigNum} poolDeposit
  * @param {BigNum} keyDeposit
  * @returns {Value}
  */
  abstract getCertificatesRefund(poolDeposit: BigNum, keyDeposit: BigNum): Value;

  /**
  * @param {BigNum} poolDeposit
  * @param {BigNum} keyDeposit
  * @returns {BigNum}
  */
  abstract getCertificatesDeposit(poolDeposit: BigNum, keyDeposit: BigNum): BigNum;

  /**
  * @returns {boolean}
  */
  abstract hasPlutusScripts(): boolean;

  /**
  * @returns {Certificates}
  */
  abstract build(): Certificates;

}

export abstract class ChangeConfig extends _Ptr {
  /**
  * @param {Address} address
  * @returns {ChangeConfig}
  */
  static new(address: Address): ChangeConfig {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Address} address
  * @returns {ChangeConfig}
  */
  abstract changeAddress(address: Address): ChangeConfig;

  /**
  * @param {OutputDatum} plutusData
  * @returns {ChangeConfig}
  */
  abstract changePlutusData(plutusData: OutputDatum): ChangeConfig;

  /**
  * @param {ScriptRef} scriptRef
  * @returns {ChangeConfig}
  */
  abstract changeScriptRef(scriptRef: ScriptRef): ChangeConfig;

}

export abstract class Committee extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {Committee}
  */
  static fromBytes(bytes: Uint8Array): Committee {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {Committee}
  */
  static fromHex(hexStr: string): Committee {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {Committee}
  */
  static fromJson(json: string): Committee {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {UnitInterval} quorumThreshold
  * @returns {Committee}
  */
  static new(quorumThreshold: UnitInterval): Committee {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Credentials}
  */
  abstract membersKeys(): Credentials;

  /**
  * @returns {UnitInterval}
  */
  abstract quorumThreshold(): UnitInterval;

  /**
  * @param {Credential} committeeColdCredential
  * @param {number} epoch
  */
  abstract addMember(committeeColdCredential: Credential, epoch: number): void;

  /**
  * @param {Credential} committeeColdCredential
  * @returns {Optional<number>}
  */
  abstract getMemberEpoch(committeeColdCredential: Credential): Optional<number>;

}

export abstract class CommitteeColdResign extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {CommitteeColdResign}
  */
  static fromBytes(bytes: Uint8Array): CommitteeColdResign {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {CommitteeColdResign}
  */
  static fromHex(hexStr: string): CommitteeColdResign {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {CommitteeColdResign}
  */
  static fromJson(json: string): CommitteeColdResign {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Credential}
  */
  abstract committeeColdCredential(): Credential;

  /**
  * @returns {Optional<Anchor>}
  */
  abstract anchor(): Optional<Anchor>;

  /**
  * @param {Credential} committeeColdCredential
  * @returns {CommitteeColdResign}
  */
  static new(committeeColdCredential: Credential): CommitteeColdResign {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Credential} committeeColdCredential
  * @param {Anchor} anchor
  * @returns {CommitteeColdResign}
  */
  static newWithAnchor(committeeColdCredential: Credential, anchor: Anchor): CommitteeColdResign {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {boolean}
  */
  abstract hasScriptCredentials(): boolean;

}

export abstract class CommitteeHotAuth extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {CommitteeHotAuth}
  */
  static fromBytes(bytes: Uint8Array): CommitteeHotAuth {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {CommitteeHotAuth}
  */
  static fromHex(hexStr: string): CommitteeHotAuth {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {CommitteeHotAuth}
  */
  static fromJson(json: string): CommitteeHotAuth {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Credential}
  */
  abstract committeeColdCredential(): Credential;

  /**
  * @returns {Credential}
  */
  abstract committeeHotCredential(): Credential;

  /**
  * @param {Credential} committeeColdCredential
  * @param {Credential} committeeHotCredential
  * @returns {CommitteeHotAuth}
  */
  static new(committeeColdCredential: Credential, committeeHotCredential: Credential): CommitteeHotAuth {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {boolean}
  */
  abstract hasScriptCredentials(): boolean;

}

export abstract class Constitution extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {Constitution}
  */
  static fromBytes(bytes: Uint8Array): Constitution {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {Constitution}
  */
  static fromHex(hexStr: string): Constitution {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {Constitution}
  */
  static fromJson(json: string): Constitution {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Anchor}
  */
  abstract anchor(): Anchor;

  /**
  * @returns {Optional<ScriptHash>}
  */
  abstract scriptHash(): Optional<ScriptHash>;

  /**
  * @param {Anchor} anchor
  * @returns {Constitution}
  */
  static new(anchor: Anchor): Constitution {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Anchor} anchor
  * @param {ScriptHash} scriptHash
  * @returns {Constitution}
  */
  static newWithScriptHash(anchor: Anchor, scriptHash: ScriptHash): Constitution {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class ConstrPlutusData extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {ConstrPlutusData}
  */
  static fromBytes(bytes: Uint8Array): ConstrPlutusData {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {ConstrPlutusData}
  */
  static fromHex(hexStr: string): ConstrPlutusData {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {BigNum}
  */
  abstract alternative(): BigNum;

  /**
  * @returns {PlutusList}
  */
  abstract data(): PlutusList;

  /**
  * @param {BigNum} alternative
  * @param {PlutusList} data
  * @returns {ConstrPlutusData}
  */
  static new(alternative: BigNum, data: PlutusList): ConstrPlutusData {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class CostModel extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {CostModel}
  */
  static fromBytes(bytes: Uint8Array): CostModel {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {CostModel}
  */
  static fromHex(hexStr: string): CostModel {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {CostModel}
  */
  static fromJson(json: string): CostModel {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {CostModel}
  */
  static new(): CostModel {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {number} operation
  * @param {Int} cost
  * @returns {Int}
  */
  abstract set(operation: number, cost: Int): Int;

  /**
  * @param {number} operation
  * @returns {Int}
  */
  abstract get(operation: number): Int;

  /**
  * @returns {number}
  */
  abstract len(): number;

}

export abstract class Costmdls extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {Costmdls}
  */
  static fromBytes(bytes: Uint8Array): Costmdls {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {Costmdls}
  */
  static fromHex(hexStr: string): Costmdls {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {Costmdls}
  */
  static fromJson(json: string): Costmdls {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Costmdls}
  */
  static new(): Costmdls {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {Language} key
  * @param {CostModel} value
  * @returns {Optional<CostModel>}
  */
  abstract insert(key: Language, value: CostModel): Optional<CostModel>;

  /**
  * @param {Language} key
  * @returns {Optional<CostModel>}
  */
  abstract get(key: Language): Optional<CostModel>;

  /**
  * @returns {Languages}
  */
  abstract keys(): Languages;

  /**
  * @param {Languages} languages
  * @returns {Costmdls}
  */
  abstract retainLanguageVersions(languages: Languages): Costmdls;

}

export abstract class Credential extends _Ptr {
  /**
  * @param {Ed25519KeyHash} hash
  * @returns {Credential}
  */
  static fromKeyhash(hash: Ed25519KeyHash): Credential {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {ScriptHash} hash
  * @returns {Credential}
  */
  static fromScripthash(hash: ScriptHash): Credential {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Optional<Ed25519KeyHash>}
  */
  abstract toKeyhash(): Optional<Ed25519KeyHash>;

  /**
  * @returns {Optional<ScriptHash>}
  */
  abstract toScripthash(): Optional<ScriptHash>;

  /**
  * @returns {CredKind}
  */
  abstract kind(): CredKind;

  /**
  * @returns {boolean}
  */
  abstract hasScriptHash(): boolean;

  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {Credential}
  */
  static fromBytes(bytes: Uint8Array): Credential {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {Credential}
  */
  static fromHex(hexStr: string): Credential {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {Credential}
  */
  static fromJson(json: string): Credential {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class Credentials extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {Credentials}
  */
  static fromBytes(bytes: Uint8Array): Credentials {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {Credentials}
  */
  static fromHex(hexStr: string): Credentials {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {Credentials}
  */
  static fromJson(json: string): Credentials {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Credentials}
  */
  static new(): Credentials {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {number} index
  * @returns {Credential}
  */
  abstract get(index: number): Credential;

  /**
  * @param {Credential} credential
  * @returns {boolean}
  */
  abstract add(credential: Credential): boolean;

}

export abstract class DNSRecordAorAAAA extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {DNSRecordAorAAAA}
  */
  static fromBytes(bytes: Uint8Array): DNSRecordAorAAAA {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {DNSRecordAorAAAA}
  */
  static fromHex(hexStr: string): DNSRecordAorAAAA {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {DNSRecordAorAAAA}
  */
  static fromJson(json: string): DNSRecordAorAAAA {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {string} dnsName
  * @returns {DNSRecordAorAAAA}
  */
  static new(dnsName: string): DNSRecordAorAAAA {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract record(): string;

}

export abstract class DNSRecordSRV extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {DNSRecordSRV}
  */
  static fromBytes(bytes: Uint8Array): DNSRecordSRV {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {DNSRecordSRV}
  */
  static fromHex(hexStr: string): DNSRecordSRV {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {DNSRecordSRV}
  */
  static fromJson(json: string): DNSRecordSRV {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {string} dnsName
  * @returns {DNSRecordSRV}
  */
  static new(dnsName: string): DNSRecordSRV {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract record(): string;

}

export abstract class DRep extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {DRep}
  */
  static fromBytes(bytes: Uint8Array): DRep {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {DRep}
  */
  static fromHex(hexStr: string): DRep {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {DRep}
  */
  static fromJson(json: string): DRep {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Ed25519KeyHash} keyHash
  * @returns {DRep}
  */
  static newKeyHash(keyHash: Ed25519KeyHash): DRep {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {ScriptHash} scriptHash
  * @returns {DRep}
  */
  static newScriptHash(scriptHash: ScriptHash): DRep {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {DRep}
  */
  static newAlwaysAbstain(): DRep {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {DRep}
  */
  static newAlwaysNoConfidence(): DRep {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Credential} cred
  * @returns {DRep}
  */
  static newFromCredential(cred: Credential): DRep {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {DRepKind}
  */
  abstract kind(): DRepKind;

  /**
  * @returns {Optional<Ed25519KeyHash>}
  */
  abstract toKeyHash(): Optional<Ed25519KeyHash>;

  /**
  * @returns {Optional<ScriptHash>}
  */
  abstract toScriptHash(): Optional<ScriptHash>;

  /**
  * @param {boolean} cip_129Format
  * @returns {string}
  */
  abstract toBech32(cip_129Format: boolean): string;

  /**
  * @param {string} bech32Str
  * @returns {DRep}
  */
  static fromBech32(bech32Str: string): DRep {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class DRepDeregistration extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {DRepDeregistration}
  */
  static fromBytes(bytes: Uint8Array): DRepDeregistration {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {DRepDeregistration}
  */
  static fromHex(hexStr: string): DRepDeregistration {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {DRepDeregistration}
  */
  static fromJson(json: string): DRepDeregistration {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Credential}
  */
  abstract votingCredential(): Credential;

  /**
  * @returns {BigNum}
  */
  abstract coin(): BigNum;

  /**
  * @param {Credential} votingCredential
  * @param {BigNum} coin
  * @returns {DRepDeregistration}
  */
  static new(votingCredential: Credential, coin: BigNum): DRepDeregistration {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {boolean}
  */
  abstract hasScriptCredentials(): boolean;

}

export abstract class DRepRegistration extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {DRepRegistration}
  */
  static fromBytes(bytes: Uint8Array): DRepRegistration {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {DRepRegistration}
  */
  static fromHex(hexStr: string): DRepRegistration {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {DRepRegistration}
  */
  static fromJson(json: string): DRepRegistration {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Credential}
  */
  abstract votingCredential(): Credential;

  /**
  * @returns {BigNum}
  */
  abstract coin(): BigNum;

  /**
  * @returns {Optional<Anchor>}
  */
  abstract anchor(): Optional<Anchor>;

  /**
  * @param {Credential} votingCredential
  * @param {BigNum} coin
  * @returns {DRepRegistration}
  */
  static new(votingCredential: Credential, coin: BigNum): DRepRegistration {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Credential} votingCredential
  * @param {BigNum} coin
  * @param {Anchor} anchor
  * @returns {DRepRegistration}
  */
  static newWithAnchor(votingCredential: Credential, coin: BigNum, anchor: Anchor): DRepRegistration {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {boolean}
  */
  abstract hasScriptCredentials(): boolean;

}

export abstract class DRepUpdate extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {DRepUpdate}
  */
  static fromBytes(bytes: Uint8Array): DRepUpdate {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {DRepUpdate}
  */
  static fromHex(hexStr: string): DRepUpdate {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {DRepUpdate}
  */
  static fromJson(json: string): DRepUpdate {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Credential}
  */
  abstract votingCredential(): Credential;

  /**
  * @returns {Optional<Anchor>}
  */
  abstract anchor(): Optional<Anchor>;

  /**
  * @param {Credential} votingCredential
  * @returns {DRepUpdate}
  */
  static new(votingCredential: Credential): DRepUpdate {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Credential} votingCredential
  * @param {Anchor} anchor
  * @returns {DRepUpdate}
  */
  static newWithAnchor(votingCredential: Credential, anchor: Anchor): DRepUpdate {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {boolean}
  */
  abstract hasScriptCredentials(): boolean;

}

export abstract class DRepVotingThresholds extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {DRepVotingThresholds}
  */
  static fromBytes(bytes: Uint8Array): DRepVotingThresholds {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {DRepVotingThresholds}
  */
  static fromHex(hexStr: string): DRepVotingThresholds {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {DRepVotingThresholds}
  */
  static fromJson(json: string): DRepVotingThresholds {
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
  * @returns {DRepVotingThresholds}
  */
  static new(motionNoConfidence: UnitInterval, committeeNormal: UnitInterval, committeeNoConfidence: UnitInterval, updateConstitution: UnitInterval, hardForkInitiation: UnitInterval, ppNetworkGroup: UnitInterval, ppEconomicGroup: UnitInterval, ppTechnicalGroup: UnitInterval, ppGovernanceGroup: UnitInterval, treasuryWithdrawal: UnitInterval): DRepVotingThresholds {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {UnitInterval} motionNoConfidence
  */
  abstract setMotionNoConfidence(motionNoConfidence: UnitInterval): void;

  /**
  * @param {UnitInterval} committeeNormal
  */
  abstract setCommitteeNormal(committeeNormal: UnitInterval): void;

  /**
  * @param {UnitInterval} committeeNoConfidence
  */
  abstract setCommitteeNoConfidence(committeeNoConfidence: UnitInterval): void;

  /**
  * @param {UnitInterval} updateConstitution
  */
  abstract setUpdateConstitution(updateConstitution: UnitInterval): void;

  /**
  * @param {UnitInterval} hardForkInitiation
  */
  abstract setHardForkInitiation(hardForkInitiation: UnitInterval): void;

  /**
  * @param {UnitInterval} ppNetworkGroup
  */
  abstract setPpNetworkGroup(ppNetworkGroup: UnitInterval): void;

  /**
  * @param {UnitInterval} ppEconomicGroup
  */
  abstract setPpEconomicGroup(ppEconomicGroup: UnitInterval): void;

  /**
  * @param {UnitInterval} ppTechnicalGroup
  */
  abstract setPpTechnicalGroup(ppTechnicalGroup: UnitInterval): void;

  /**
  * @param {UnitInterval} ppGovernanceGroup
  */
  abstract setPpGovernanceGroup(ppGovernanceGroup: UnitInterval): void;

  /**
  * @param {UnitInterval} treasuryWithdrawal
  */
  abstract setTreasuryWithdrawal(treasuryWithdrawal: UnitInterval): void;

  /**
  * @returns {UnitInterval}
  */
  abstract motionNoConfidence(): UnitInterval;

  /**
  * @returns {UnitInterval}
  */
  abstract committeeNormal(): UnitInterval;

  /**
  * @returns {UnitInterval}
  */
  abstract committeeNoConfidence(): UnitInterval;

  /**
  * @returns {UnitInterval}
  */
  abstract updateConstitution(): UnitInterval;

  /**
  * @returns {UnitInterval}
  */
  abstract hardForkInitiation(): UnitInterval;

  /**
  * @returns {UnitInterval}
  */
  abstract ppNetworkGroup(): UnitInterval;

  /**
  * @returns {UnitInterval}
  */
  abstract ppEconomicGroup(): UnitInterval;

  /**
  * @returns {UnitInterval}
  */
  abstract ppTechnicalGroup(): UnitInterval;

  /**
  * @returns {UnitInterval}
  */
  abstract ppGovernanceGroup(): UnitInterval;

  /**
  * @returns {UnitInterval}
  */
  abstract treasuryWithdrawal(): UnitInterval;

}

export abstract class DataCost extends _Ptr {
  /**
  * @param {BigNum} coinsPerByte
  * @returns {DataCost}
  */
  static newCoinsPerByte(coinsPerByte: BigNum): DataCost {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {BigNum}
  */
  abstract coinsPerByte(): BigNum;

}

export abstract class DataHash extends _Ptr {
  /**
  * @param {Uint8Array} bytes
  * @returns {DataHash}
  */
  static fromBytes(bytes: Uint8Array): DataHash {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {string} prefix
  * @returns {string}
  */
  abstract toBech32(prefix: string): string;

  /**
  * @param {string} bechStr
  * @returns {DataHash}
  */
  static fromBech32(bechStr: string): DataHash {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hex
  * @returns {DataHash}
  */
  static fromHex(hex: string): DataHash {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class DatumSource extends _Ptr {
  /**
  * @param {PlutusData} datum
  * @returns {DatumSource}
  */
  static new(datum: PlutusData): DatumSource {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {TransactionInput} input
  * @returns {DatumSource}
  */
  static newRefInput(input: TransactionInput): DatumSource {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class Ed25519KeyHash extends _Ptr {
  /**
  * @param {Uint8Array} bytes
  * @returns {Ed25519KeyHash}
  */
  static fromBytes(bytes: Uint8Array): Ed25519KeyHash {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {string} prefix
  * @returns {string}
  */
  abstract toBech32(prefix: string): string;

  /**
  * @param {string} bechStr
  * @returns {Ed25519KeyHash}
  */
  static fromBech32(bechStr: string): Ed25519KeyHash {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hex
  * @returns {Ed25519KeyHash}
  */
  static fromHex(hex: string): Ed25519KeyHash {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class Ed25519KeyHashes extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {Ed25519KeyHashes}
  */
  static fromBytes(bytes: Uint8Array): Ed25519KeyHashes {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {Ed25519KeyHashes}
  */
  static fromHex(hexStr: string): Ed25519KeyHashes {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {Ed25519KeyHashes}
  */
  static fromJson(json: string): Ed25519KeyHashes {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Ed25519KeyHashes}
  */
  static new(): Ed25519KeyHashes {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {number} index
  * @returns {Ed25519KeyHash}
  */
  abstract get(index: number): Ed25519KeyHash;

  /**
  * @param {Ed25519KeyHash} keyhash
  * @returns {boolean}
  */
  abstract add(keyhash: Ed25519KeyHash): boolean;

  /**
  * @param {Ed25519KeyHash} elem
  * @returns {boolean}
  */
  abstract contains(elem: Ed25519KeyHash): boolean;

  /**
  * @returns {Optional<Ed25519KeyHashes>}
  */
  abstract toOption(): Optional<Ed25519KeyHashes>;

}

export abstract class Ed25519Signature extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @returns {string}
  */
  abstract toBech32(): string;

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} bech32Str
  * @returns {Ed25519Signature}
  */
  static fromBech32(bech32Str: string): Ed25519Signature {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {string} input
  * @returns {Ed25519Signature}
  */
  static fromHex(input: string): Ed25519Signature {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Uint8Array} bytes
  * @returns {Ed25519Signature}
  */
  static fromBytes(bytes: Uint8Array): Ed25519Signature {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class EnterpriseAddress extends _Ptr {
  /**
  * @param {number} network
  * @param {Credential} payment
  * @returns {EnterpriseAddress}
  */
  static new(network: number, payment: Credential): EnterpriseAddress {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Credential}
  */
  abstract paymentCred(): Credential;

  /**
  * @returns {Address}
  */
  abstract toAddress(): Address;

  /**
  * @param {Address} addr
  * @returns {Optional<EnterpriseAddress>}
  */
  static fromAddress(addr: Address): Optional<EnterpriseAddress> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract networkId(): number;

}

export abstract class ExUnitPrices extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {ExUnitPrices}
  */
  static fromBytes(bytes: Uint8Array): ExUnitPrices {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {ExUnitPrices}
  */
  static fromHex(hexStr: string): ExUnitPrices {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {ExUnitPrices}
  */
  static fromJson(json: string): ExUnitPrices {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {UnitInterval}
  */
  abstract memPrice(): UnitInterval;

  /**
  * @returns {UnitInterval}
  */
  abstract stepPrice(): UnitInterval;

  /**
  * @param {UnitInterval} memPrice
  * @param {UnitInterval} stepPrice
  * @returns {ExUnitPrices}
  */
  static new(memPrice: UnitInterval, stepPrice: UnitInterval): ExUnitPrices {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class ExUnits extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {ExUnits}
  */
  static fromBytes(bytes: Uint8Array): ExUnits {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {ExUnits}
  */
  static fromHex(hexStr: string): ExUnits {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {ExUnits}
  */
  static fromJson(json: string): ExUnits {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {BigNum}
  */
  abstract mem(): BigNum;

  /**
  * @returns {BigNum}
  */
  abstract steps(): BigNum;

  /**
  * @param {BigNum} mem
  * @param {BigNum} steps
  * @returns {ExUnits}
  */
  static new(mem: BigNum, steps: BigNum): ExUnits {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class FixedBlock extends _Ptr {
  /**
  * @param {Uint8Array} bytes
  * @returns {FixedBlock}
  */
  static fromBytes(bytes: Uint8Array): FixedBlock {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {string} hexStr
  * @returns {FixedBlock}
  */
  static fromHex(hexStr: string): FixedBlock {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Header}
  */
  abstract header(): Header;

  /**
  * @returns {FixedTransactionBodies}
  */
  abstract transactionBodies(): FixedTransactionBodies;

  /**
  * @returns {TransactionWitnessSets}
  */
  abstract transactionWitnessSets(): TransactionWitnessSets;

  /**
  * @returns {AuxiliaryDataSet}
  */
  abstract auxiliaryDataSet(): AuxiliaryDataSet;

  /**
  * @returns {Uint32Array}
  */
  abstract invalidTransactions(): Uint32Array;

  /**
  * @returns {BlockHash}
  */
  abstract blockHash(): BlockHash;

}

export abstract class FixedTransaction extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {FixedTransaction}
  */
  static fromBytes(bytes: Uint8Array): FixedTransaction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {FixedTransaction}
  */
  static fromHex(hexStr: string): FixedTransaction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Uint8Array} rawBody
  * @param {Uint8Array} rawWitnessSet
  * @param {boolean} isValid
  * @returns {FixedTransaction}
  */
  static new(rawBody: Uint8Array, rawWitnessSet: Uint8Array, isValid: boolean): FixedTransaction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Uint8Array} rawBody
  * @param {Uint8Array} rawWitnessSet
  * @param {Uint8Array} rawAuxiliaryData
  * @param {boolean} isValid
  * @returns {FixedTransaction}
  */
  static newWithAuxiliary(rawBody: Uint8Array, rawWitnessSet: Uint8Array, rawAuxiliaryData: Uint8Array, isValid: boolean): FixedTransaction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Uint8Array} rawBody
  * @returns {FixedTransaction}
  */
  static newFromBodyBytes(rawBody: Uint8Array): FixedTransaction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {TransactionBody}
  */
  abstract body(): TransactionBody;

  /**
  * @returns {Uint8Array}
  */
  abstract rawBody(): Uint8Array;

  /**
  * @param {Uint8Array} rawBody
  * @returns {void}
  */
  abstract setBody(rawBody: Uint8Array): void;

  /**
  * @param {Uint8Array} rawWitnessSet
  * @returns {void}
  */
  abstract setWitnessSet(rawWitnessSet: Uint8Array): void;

  /**
  * @returns {TransactionWitnessSet}
  */
  abstract witnessSet(): TransactionWitnessSet;

  /**
  * @returns {Uint8Array}
  */
  abstract rawWitnessSet(): Uint8Array;

  /**
  * @param {boolean} valid
  */
  abstract setIsValid(valid: boolean): void;

  /**
  * @returns {boolean}
  */
  abstract isValid(): boolean;

  /**
  * @param {Uint8Array} rawAuxiliaryData
  * @returns {void}
  */
  abstract setAuxiliaryData(rawAuxiliaryData: Uint8Array): void;

  /**
  * @returns {Optional<AuxiliaryData>}
  */
  abstract auxiliaryData(): Optional<AuxiliaryData>;

  /**
  * @returns {Optional<Uint8Array>}
  */
  abstract rawAuxiliaryData(): Optional<Uint8Array>;

  /**
  * @returns {TransactionHash}
  */
  abstract transactionHash(): TransactionHash;

  /**
  * @param {Vkeywitness} vkeyWitness
  */
  abstract addVkeyWitness(vkeyWitness: Vkeywitness): void;

  /**
  * @param {BootstrapWitness} bootstrapWitness
  */
  abstract addBootstrapWitness(bootstrapWitness: BootstrapWitness): void;

  /**
  * @param {PrivateKey} privateKey
  * @returns {void}
  */
  abstract signAndAddVkeySignature(privateKey: PrivateKey): void;

  /**
  * @param {ByronAddress} addr
  * @param {Bip32PrivateKey} privateKey
  * @returns {void}
  */
  abstract signAndAddIcarusBootstrapSignature(addr: ByronAddress, privateKey: Bip32PrivateKey): void;

  /**
  * @param {ByronAddress} addr
  * @param {LegacyDaedalusPrivateKey} privateKey
  * @returns {void}
  */
  abstract signAndAddDaedalusBootstrapSignature(addr: ByronAddress, privateKey: LegacyDaedalusPrivateKey): void;

}

export abstract class FixedTransactionBodies extends _Ptr {
  /**
  * @param {Uint8Array} bytes
  * @returns {FixedTransactionBodies}
  */
  static fromBytes(bytes: Uint8Array): FixedTransactionBodies {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {string} hexStr
  * @returns {FixedTransactionBodies}
  */
  static fromHex(hexStr: string): FixedTransactionBodies {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {FixedTransactionBodies}
  */
  static new(): FixedTransactionBodies {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {number} index
  * @returns {FixedTransactionBody}
  */
  abstract get(index: number): FixedTransactionBody;

  /**
  * @param {FixedTransactionBody} elem
  */
  abstract add(elem: FixedTransactionBody): void;

}

export abstract class FixedTransactionBody extends _Ptr {
  /**
  * @param {Uint8Array} bytes
  * @returns {FixedTransactionBody}
  */
  static fromBytes(bytes: Uint8Array): FixedTransactionBody {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {string} hexStr
  * @returns {FixedTransactionBody}
  */
  static fromHex(hexStr: string): FixedTransactionBody {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {TransactionBody}
  */
  abstract transactionBody(): TransactionBody;

  /**
  * @returns {TransactionHash}
  */
  abstract txHash(): TransactionHash;

  /**
  * @returns {Uint8Array}
  */
  abstract originalBytes(): Uint8Array;

}

export abstract class FixedTxWitnessesSet extends _Ptr {
  /**
  * @returns {TransactionWitnessSet}
  */
  abstract txWitnessesSet(): TransactionWitnessSet;

  /**
  * @param {Vkeywitness} vkeyWitness
  */
  abstract addVkeyWitness(vkeyWitness: Vkeywitness): void;

  /**
  * @param {BootstrapWitness} bootstrapWitness
  */
  abstract addBootstrapWitness(bootstrapWitness: BootstrapWitness): void;

  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} data
  * @returns {FixedTxWitnessesSet}
  */
  static fromBytes(data: Uint8Array): FixedTxWitnessesSet {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class FixedVersionedBlock extends _Ptr {
  /**
  * @param {Uint8Array} bytes
  * @returns {FixedVersionedBlock}
  */
  static fromBytes(bytes: Uint8Array): FixedVersionedBlock {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {string} hexStr
  * @returns {FixedVersionedBlock}
  */
  static fromHex(hexStr: string): FixedVersionedBlock {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {FixedBlock}
  */
  abstract block(): FixedBlock;

  /**
  * @returns {BlockEra}
  */
  abstract era(): BlockEra;

}

export abstract class GeneralTransactionMetadata extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {GeneralTransactionMetadata}
  */
  static fromBytes(bytes: Uint8Array): GeneralTransactionMetadata {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {GeneralTransactionMetadata}
  */
  static fromHex(hexStr: string): GeneralTransactionMetadata {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {GeneralTransactionMetadata}
  */
  static fromJson(json: string): GeneralTransactionMetadata {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {GeneralTransactionMetadata}
  */
  static new(): GeneralTransactionMetadata {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {BigNum} key
  * @param {TransactionMetadatum} value
  * @returns {Optional<TransactionMetadatum>}
  */
  abstract insert(key: BigNum, value: TransactionMetadatum): Optional<TransactionMetadatum>;

  /**
  * @param {BigNum} key
  * @returns {Optional<TransactionMetadatum>}
  */
  abstract get(key: BigNum): Optional<TransactionMetadatum>;

  /**
  * @returns {TransactionMetadatumLabels}
  */
  abstract keys(): TransactionMetadatumLabels;

}

export abstract class GenesisDelegateHash extends _Ptr {
  /**
  * @param {Uint8Array} bytes
  * @returns {GenesisDelegateHash}
  */
  static fromBytes(bytes: Uint8Array): GenesisDelegateHash {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {string} prefix
  * @returns {string}
  */
  abstract toBech32(prefix: string): string;

  /**
  * @param {string} bechStr
  * @returns {GenesisDelegateHash}
  */
  static fromBech32(bechStr: string): GenesisDelegateHash {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hex
  * @returns {GenesisDelegateHash}
  */
  static fromHex(hex: string): GenesisDelegateHash {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class GenesisHash extends _Ptr {
  /**
  * @param {Uint8Array} bytes
  * @returns {GenesisHash}
  */
  static fromBytes(bytes: Uint8Array): GenesisHash {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {string} prefix
  * @returns {string}
  */
  abstract toBech32(prefix: string): string;

  /**
  * @param {string} bechStr
  * @returns {GenesisHash}
  */
  static fromBech32(bechStr: string): GenesisHash {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hex
  * @returns {GenesisHash}
  */
  static fromHex(hex: string): GenesisHash {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class GenesisHashes extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {GenesisHashes}
  */
  static fromBytes(bytes: Uint8Array): GenesisHashes {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {GenesisHashes}
  */
  static fromHex(hexStr: string): GenesisHashes {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {GenesisHashes}
  */
  static fromJson(json: string): GenesisHashes {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {GenesisHashes}
  */
  static new(): GenesisHashes {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {number} index
  * @returns {GenesisHash}
  */
  abstract get(index: number): GenesisHash;

  /**
  * @param {GenesisHash} elem
  */
  abstract add(elem: GenesisHash): void;

}

export abstract class GenesisKeyDelegation extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {GenesisKeyDelegation}
  */
  static fromBytes(bytes: Uint8Array): GenesisKeyDelegation {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {GenesisKeyDelegation}
  */
  static fromHex(hexStr: string): GenesisKeyDelegation {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {GenesisKeyDelegation}
  */
  static fromJson(json: string): GenesisKeyDelegation {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {GenesisHash}
  */
  abstract genesishash(): GenesisHash;

  /**
  * @returns {GenesisDelegateHash}
  */
  abstract genesisDelegateHash(): GenesisDelegateHash;

  /**
  * @returns {VRFKeyHash}
  */
  abstract vrfKeyhash(): VRFKeyHash;

  /**
  * @param {GenesisHash} genesishash
  * @param {GenesisDelegateHash} genesisDelegateHash
  * @param {VRFKeyHash} vrfKeyhash
  * @returns {GenesisKeyDelegation}
  */
  static new(genesishash: GenesisHash, genesisDelegateHash: GenesisDelegateHash, vrfKeyhash: VRFKeyHash): GenesisKeyDelegation {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class GovernanceAction extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {GovernanceAction}
  */
  static fromBytes(bytes: Uint8Array): GovernanceAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {GovernanceAction}
  */
  static fromHex(hexStr: string): GovernanceAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {GovernanceAction}
  */
  static fromJson(json: string): GovernanceAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {ParameterChangeAction} parameterChangeAction
  * @returns {GovernanceAction}
  */
  static newParameterChangeAction(parameterChangeAction: ParameterChangeAction): GovernanceAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {HardForkInitiationAction} hardForkInitiationAction
  * @returns {GovernanceAction}
  */
  static newHardForkInitiationAction(hardForkInitiationAction: HardForkInitiationAction): GovernanceAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {TreasuryWithdrawalsAction} treasuryWithdrawalsAction
  * @returns {GovernanceAction}
  */
  static newTreasuryWithdrawalsAction(treasuryWithdrawalsAction: TreasuryWithdrawalsAction): GovernanceAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {NoConfidenceAction} noConfidenceAction
  * @returns {GovernanceAction}
  */
  static newNoConfidenceAction(noConfidenceAction: NoConfidenceAction): GovernanceAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {UpdateCommitteeAction} newCommitteeAction
  * @returns {GovernanceAction}
  */
  static newNewCommitteeAction(newCommitteeAction: UpdateCommitteeAction): GovernanceAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {NewConstitutionAction} newConstitutionAction
  * @returns {GovernanceAction}
  */
  static newNewConstitutionAction(newConstitutionAction: NewConstitutionAction): GovernanceAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {InfoAction} infoAction
  * @returns {GovernanceAction}
  */
  static newInfoAction(infoAction: InfoAction): GovernanceAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {GovernanceActionKind}
  */
  abstract kind(): GovernanceActionKind;

  /**
  * @returns {Optional<ParameterChangeAction>}
  */
  abstract asParameterChangeAction(): Optional<ParameterChangeAction>;

  /**
  * @returns {Optional<HardForkInitiationAction>}
  */
  abstract asHardForkInitiationAction(): Optional<HardForkInitiationAction>;

  /**
  * @returns {Optional<TreasuryWithdrawalsAction>}
  */
  abstract asTreasuryWithdrawalsAction(): Optional<TreasuryWithdrawalsAction>;

  /**
  * @returns {Optional<NoConfidenceAction>}
  */
  abstract asNoConfidenceAction(): Optional<NoConfidenceAction>;

  /**
  * @returns {Optional<UpdateCommitteeAction>}
  */
  abstract asNewCommitteeAction(): Optional<UpdateCommitteeAction>;

  /**
  * @returns {Optional<NewConstitutionAction>}
  */
  abstract asNewConstitutionAction(): Optional<NewConstitutionAction>;

  /**
  * @returns {Optional<InfoAction>}
  */
  abstract asInfoAction(): Optional<InfoAction>;

}

export abstract class GovernanceActionId extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {GovernanceActionId}
  */
  static fromBytes(bytes: Uint8Array): GovernanceActionId {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {GovernanceActionId}
  */
  static fromHex(hexStr: string): GovernanceActionId {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {GovernanceActionId}
  */
  static fromJson(json: string): GovernanceActionId {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {TransactionHash}
  */
  abstract transactionId(): TransactionHash;

  /**
  * @returns {number}
  */
  abstract index(): number;

  /**
  * @param {TransactionHash} transactionId
  * @param {number} index
  * @returns {GovernanceActionId}
  */
  static new(transactionId: TransactionHash, index: number): GovernanceActionId {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class GovernanceActionIds extends _Ptr {
  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {GovernanceActionIds}
  */
  static fromJson(json: string): GovernanceActionIds {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {GovernanceActionIds}
  */
  static new(): GovernanceActionIds {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {GovernanceActionId} governanceActionId
  */
  abstract add(governanceActionId: GovernanceActionId): void;

  /**
  * @param {number} index
  * @returns {Optional<GovernanceActionId>}
  */
  abstract get(index: number): Optional<GovernanceActionId>;

  /**
  * @returns {number}
  */
  abstract len(): number;

}

export abstract class HardForkInitiationAction extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {HardForkInitiationAction}
  */
  static fromBytes(bytes: Uint8Array): HardForkInitiationAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {HardForkInitiationAction}
  */
  static fromHex(hexStr: string): HardForkInitiationAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {HardForkInitiationAction}
  */
  static fromJson(json: string): HardForkInitiationAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Optional<GovernanceActionId>}
  */
  abstract govActionId(): Optional<GovernanceActionId>;

  /**
  * @returns {ProtocolVersion}
  */
  abstract protocolVersion(): ProtocolVersion;

  /**
  * @param {ProtocolVersion} protocolVersion
  * @returns {HardForkInitiationAction}
  */
  static new(protocolVersion: ProtocolVersion): HardForkInitiationAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {GovernanceActionId} govActionId
  * @param {ProtocolVersion} protocolVersion
  * @returns {HardForkInitiationAction}
  */
  static newWithActionId(govActionId: GovernanceActionId, protocolVersion: ProtocolVersion): HardForkInitiationAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class Header extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {Header}
  */
  static fromBytes(bytes: Uint8Array): Header {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {Header}
  */
  static fromHex(hexStr: string): Header {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {Header}
  */
  static fromJson(json: string): Header {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {HeaderBody}
  */
  abstract headerBody(): HeaderBody;

  /**
  * @returns {KESSignature}
  */
  abstract bodySignature(): KESSignature;

  /**
  * @param {HeaderBody} headerBody
  * @param {KESSignature} bodySignature
  * @returns {Header}
  */
  static new(headerBody: HeaderBody, bodySignature: KESSignature): Header {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class HeaderBody extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {HeaderBody}
  */
  static fromBytes(bytes: Uint8Array): HeaderBody {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {HeaderBody}
  */
  static fromHex(hexStr: string): HeaderBody {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {HeaderBody}
  */
  static fromJson(json: string): HeaderBody {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract blockNumber(): number;

  /**
  * @returns {number}
  */
  abstract slot(): number;

  /**
  * @returns {BigNum}
  */
  abstract slotBignum(): BigNum;

  /**
  * @returns {Optional<BlockHash>}
  */
  abstract prevHash(): Optional<BlockHash>;

  /**
  * @returns {Vkey}
  */
  abstract issuerVkey(): Vkey;

  /**
  * @returns {VRFVKey}
  */
  abstract vrfVkey(): VRFVKey;

  /**
  * @returns {boolean}
  */
  abstract hasNonceAndLeaderVrf(): boolean;

  /**
  * @returns {Optional<VRFCert>}
  */
  abstract nonceVrfOrNothing(): Optional<VRFCert>;

  /**
  * @returns {Optional<VRFCert>}
  */
  abstract leaderVrfOrNothing(): Optional<VRFCert>;

  /**
  * @returns {boolean}
  */
  abstract hasVrfResult(): boolean;

  /**
  * @returns {Optional<VRFCert>}
  */
  abstract vrfResultOrNothing(): Optional<VRFCert>;

  /**
  * @returns {number}
  */
  abstract blockBodySize(): number;

  /**
  * @returns {BlockHash}
  */
  abstract blockBodyHash(): BlockHash;

  /**
  * @returns {OperationalCert}
  */
  abstract operationalCert(): OperationalCert;

  /**
  * @returns {ProtocolVersion}
  */
  abstract protocolVersion(): ProtocolVersion;

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
  * @returns {HeaderBody}
  */
  static new(blockNumber: number, slot: number, prevHash: Optional<BlockHash>, issuerVkey: Vkey, vrfVkey: VRFVKey, vrfResult: VRFCert, blockBodySize: number, blockBodyHash: BlockHash, operationalCert: OperationalCert, protocolVersion: ProtocolVersion): HeaderBody {
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
  * @returns {HeaderBody}
  */
  static newHeaderbody(blockNumber: number, slot: BigNum, prevHash: Optional<BlockHash>, issuerVkey: Vkey, vrfVkey: VRFVKey, vrfResult: VRFCert, blockBodySize: number, blockBodyHash: BlockHash, operationalCert: OperationalCert, protocolVersion: ProtocolVersion): HeaderBody {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class InfoAction extends _Ptr {
  /**
  * @returns {InfoAction}
  */
  static new(): InfoAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class Int extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {Int}
  */
  static fromBytes(bytes: Uint8Array): Int {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {Int}
  */
  static fromHex(hexStr: string): Int {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {Int}
  */
  static fromJson(json: string): Int {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {BigNum} x
  * @returns {Int}
  */
  static new(x: BigNum): Int {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {BigNum} x
  * @returns {Int}
  */
  static newNegative(x: BigNum): Int {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {number} x
  * @returns {Int}
  */
  static newI32(x: number): Int {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {boolean}
  */
  abstract isPositive(): boolean;

  /**
  * @returns {Optional<BigNum>}
  */
  abstract asPositive(): Optional<BigNum>;

  /**
  * @returns {Optional<BigNum>}
  */
  abstract asNegative(): Optional<BigNum>;

  /**
  * @returns {Optional<number>}
  */
  abstract asI32(): Optional<number>;

  /**
  * @returns {Optional<number>}
  */
  abstract asI32OrNothing(): Optional<number>;

  /**
  * @returns {number}
  */
  abstract asI32OrFail(): number;

  /**
  * @returns {string}
  */
  abstract toStr(): string;

  /**
  * @param {string} string
  * @returns {Int}
  */
  static fromStr(string: string): Int {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class Ipv4 extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {Ipv4}
  */
  static fromBytes(bytes: Uint8Array): Ipv4 {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {Ipv4}
  */
  static fromHex(hexStr: string): Ipv4 {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {Ipv4}
  */
  static fromJson(json: string): Ipv4 {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Uint8Array} data
  * @returns {Ipv4}
  */
  static new(data: Uint8Array): Ipv4 {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Uint8Array}
  */
  abstract ip(): Uint8Array;

}

export abstract class Ipv6 extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {Ipv6}
  */
  static fromBytes(bytes: Uint8Array): Ipv6 {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {Ipv6}
  */
  static fromHex(hexStr: string): Ipv6 {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {Ipv6}
  */
  static fromJson(json: string): Ipv6 {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Uint8Array} data
  * @returns {Ipv6}
  */
  static new(data: Uint8Array): Ipv6 {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Uint8Array}
  */
  abstract ip(): Uint8Array;

}

export abstract class KESSignature extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {KESSignature}
  */
  static fromBytes(bytes: Uint8Array): KESSignature {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class KESVKey extends _Ptr {
  /**
  * @param {Uint8Array} bytes
  * @returns {KESVKey}
  */
  static fromBytes(bytes: Uint8Array): KESVKey {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {string} prefix
  * @returns {string}
  */
  abstract toBech32(prefix: string): string;

  /**
  * @param {string} bechStr
  * @returns {KESVKey}
  */
  static fromBech32(bechStr: string): KESVKey {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hex
  * @returns {KESVKey}
  */
  static fromHex(hex: string): KESVKey {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class Language extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {Language}
  */
  static fromBytes(bytes: Uint8Array): Language {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {Language}
  */
  static fromHex(hexStr: string): Language {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {Language}
  */
  static fromJson(json: string): Language {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Language}
  */
  static newPlutusV1(): Language {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Language}
  */
  static newPlutusV2(): Language {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Language}
  */
  static newPlutusV3(): Language {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {LanguageKind}
  */
  abstract kind(): LanguageKind;

}

export abstract class Languages extends _Ptr {
  /**
  * @returns {Languages}
  */
  static new(): Languages {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {number} index
  * @returns {Language}
  */
  abstract get(index: number): Language;

  /**
  * @param {Language} elem
  */
  abstract add(elem: Language): void;

  /**
  * @returns {Languages}
  */
  static list(): Languages {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class LegacyDaedalusPrivateKey extends _Ptr {
  /**
  * @param {Uint8Array} bytes
  * @returns {LegacyDaedalusPrivateKey}
  */
  static fromBytes(bytes: Uint8Array): LegacyDaedalusPrivateKey {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Uint8Array}
  */
  abstract asBytes(): Uint8Array;

  /**
  * @returns {Uint8Array}
  */
  abstract chaincode(): Uint8Array;

}

export abstract class LinearFee extends _Ptr {
  /**
  * @returns {BigNum}
  */
  abstract constant(): BigNum;

  /**
  * @returns {BigNum}
  */
  abstract coefficient(): BigNum;

  /**
  * @param {BigNum} coefficient
  * @param {BigNum} constant
  * @returns {LinearFee}
  */
  static new(coefficient: BigNum, constant: BigNum): LinearFee {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class MIRToStakeCredentials extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {MIRToStakeCredentials}
  */
  static fromBytes(bytes: Uint8Array): MIRToStakeCredentials {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {MIRToStakeCredentials}
  */
  static fromHex(hexStr: string): MIRToStakeCredentials {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {MIRToStakeCredentials}
  */
  static fromJson(json: string): MIRToStakeCredentials {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {MIRToStakeCredentials}
  */
  static new(): MIRToStakeCredentials {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {Credential} cred
  * @param {Int} delta
  * @returns {Optional<Int>}
  */
  abstract insert(cred: Credential, delta: Int): Optional<Int>;

  /**
  * @param {Credential} cred
  * @returns {Optional<Int>}
  */
  abstract get(cred: Credential): Optional<Int>;

  /**
  * @returns {Credentials}
  */
  abstract keys(): Credentials;

}

export abstract class MalformedAddress extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract originalBytes(): Uint8Array;

  /**
  * @returns {Address}
  */
  abstract toAddress(): Address;

  /**
  * @param {Address} addr
  * @returns {Optional<MalformedAddress>}
  */
  static fromAddress(addr: Address): Optional<MalformedAddress> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class MetadataList extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {MetadataList}
  */
  static fromBytes(bytes: Uint8Array): MetadataList {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {MetadataList}
  */
  static fromHex(hexStr: string): MetadataList {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {MetadataList}
  */
  static new(): MetadataList {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {number} index
  * @returns {TransactionMetadatum}
  */
  abstract get(index: number): TransactionMetadatum;

  /**
  * @param {TransactionMetadatum} elem
  */
  abstract add(elem: TransactionMetadatum): void;

}

export abstract class MetadataMap extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {MetadataMap}
  */
  static fromBytes(bytes: Uint8Array): MetadataMap {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {MetadataMap}
  */
  static fromHex(hexStr: string): MetadataMap {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {MetadataMap}
  */
  static new(): MetadataMap {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {TransactionMetadatum} key
  * @param {TransactionMetadatum} value
  * @returns {Optional<TransactionMetadatum>}
  */
  abstract insert(key: TransactionMetadatum, value: TransactionMetadatum): Optional<TransactionMetadatum>;

  /**
  * @param {string} key
  * @param {TransactionMetadatum} value
  * @returns {Optional<TransactionMetadatum>}
  */
  abstract insertStr(key: string, value: TransactionMetadatum): Optional<TransactionMetadatum>;

  /**
  * @param {number} key
  * @param {TransactionMetadatum} value
  * @returns {Optional<TransactionMetadatum>}
  */
  abstract insertI32(key: number, value: TransactionMetadatum): Optional<TransactionMetadatum>;

  /**
  * @param {TransactionMetadatum} key
  * @returns {TransactionMetadatum}
  */
  abstract get(key: TransactionMetadatum): TransactionMetadatum;

  /**
  * @param {string} key
  * @returns {TransactionMetadatum}
  */
  abstract getStr(key: string): TransactionMetadatum;

  /**
  * @param {number} key
  * @returns {TransactionMetadatum}
  */
  abstract getI32(key: number): TransactionMetadatum;

  /**
  * @param {TransactionMetadatum} key
  * @returns {boolean}
  */
  abstract has(key: TransactionMetadatum): boolean;

  /**
  * @returns {MetadataList}
  */
  abstract keys(): MetadataList;

}

export abstract class Mint extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {Mint}
  */
  static fromBytes(bytes: Uint8Array): Mint {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {Mint}
  */
  static fromHex(hexStr: string): Mint {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {Mint}
  */
  static fromJson(json: string): Mint {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Mint}
  */
  static new(): Mint {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {ScriptHash} key
  * @param {MintAssets} value
  * @returns {Mint}
  */
  static newFromEntry(key: ScriptHash, value: MintAssets): Mint {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {ScriptHash} key
  * @param {MintAssets} value
  * @returns {Optional<MintAssets>}
  */
  abstract insert(key: ScriptHash, value: MintAssets): Optional<MintAssets>;

  /**
  * @param {ScriptHash} key
  * @returns {Optional<MintsAssets>}
  */
  abstract get(key: ScriptHash): Optional<MintsAssets>;

  /**
  * @returns {ScriptHashes}
  */
  abstract keys(): ScriptHashes;

  /**
  * @returns {MultiAsset}
  */
  abstract asPositiveMultiasset(): MultiAsset;

  /**
  * @returns {MultiAsset}
  */
  abstract asNegativeMultiasset(): MultiAsset;

}

export abstract class MintAssets extends _Ptr {
  /**
  * @returns {MintAssets}
  */
  static new(): MintAssets {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {AssetName} key
  * @param {Int} value
  * @returns {MintAssets}
  */
  static newFromEntry(key: AssetName, value: Int): MintAssets {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {AssetName} key
  * @param {Int} value
  * @returns {Optional<Int>}
  */
  abstract insert(key: AssetName, value: Int): Optional<Int>;

  /**
  * @param {AssetName} key
  * @returns {Optional<Int>}
  */
  abstract get(key: AssetName): Optional<Int>;

  /**
  * @returns {AssetNames}
  */
  abstract keys(): AssetNames;

}

export abstract class MintBuilder extends _Ptr {
  /**
  * @returns {MintBuilder}
  */
  static new(): MintBuilder {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {MintWitness} mint
  * @param {AssetName} assetName
  * @param {Int} amount
  * @returns {void}
  */
  abstract addAsset(mint: MintWitness, assetName: AssetName, amount: Int): void;

  /**
  * @param {MintWitness} mint
  * @param {AssetName} assetName
  * @param {Int} amount
  * @returns {void}
  */
  abstract setAsset(mint: MintWitness, assetName: AssetName, amount: Int): void;

  /**
  * @returns {Mint}
  */
  abstract build(): Mint;

  /**
  * @returns {NativeScripts}
  */
  abstract getNativeScripts(): NativeScripts;

  /**
  * @returns {PlutusWitnesses}
  */
  abstract getPlutusWitnesses(): PlutusWitnesses;

  /**
  * @returns {TransactionInputs}
  */
  abstract getRefInputs(): TransactionInputs;

  /**
  * @returns {Redeemers}
  */
  abstract getRedeemers(): Redeemers;

  /**
  * @returns {boolean}
  */
  abstract hasPlutusScripts(): boolean;

  /**
  * @returns {boolean}
  */
  abstract hasNativeScripts(): boolean;

}

export abstract class MintWitness extends _Ptr {
  /**
  * @param {NativeScriptSource} nativeScript
  * @returns {MintWitness}
  */
  static newNativeScript(nativeScript: NativeScriptSource): MintWitness {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {PlutusScriptSource} plutusScript
  * @param {Redeemer} redeemer
  * @returns {MintWitness}
  */
  static newPlutusScript(plutusScript: PlutusScriptSource, redeemer: Redeemer): MintWitness {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class MintsAssets extends _Ptr {
  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {MintsAssets}
  */
  static fromJson(json: string): MintsAssets {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {MintsAssets}
  */
  static new(): MintsAssets {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {MintAssets} mintAssets
  */
  abstract add(mintAssets: MintAssets): void;

  /**
  * @param {number} index
  * @returns {Optional<MintAssets>}
  */
  abstract get(index: number): Optional<MintAssets>;

  /**
  * @returns {number}
  */
  abstract len(): number;

}

export abstract class MoveInstantaneousReward extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {MoveInstantaneousReward}
  */
  static fromBytes(bytes: Uint8Array): MoveInstantaneousReward {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {MoveInstantaneousReward}
  */
  static fromHex(hexStr: string): MoveInstantaneousReward {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {MoveInstantaneousReward}
  */
  static fromJson(json: string): MoveInstantaneousReward {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {MIRPot} pot
  * @param {BigNum} amount
  * @returns {MoveInstantaneousReward}
  */
  static newToOtherPot(pot: MIRPot, amount: BigNum): MoveInstantaneousReward {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {MIRPot} pot
  * @param {MIRToStakeCredentials} amounts
  * @returns {MoveInstantaneousReward}
  */
  static newToStakeCreds(pot: MIRPot, amounts: MIRToStakeCredentials): MoveInstantaneousReward {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {MIRPot}
  */
  abstract pot(): MIRPot;

  /**
  * @returns {MIRKind}
  */
  abstract kind(): MIRKind;

  /**
  * @returns {Optional<BigNum>}
  */
  abstract asToOtherPot(): Optional<BigNum>;

  /**
  * @returns {Optional<MIRToStakeCredentials>}
  */
  abstract asToStakeCreds(): Optional<MIRToStakeCredentials>;

}

export abstract class MoveInstantaneousRewardsCert extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {MoveInstantaneousRewardsCert}
  */
  static fromBytes(bytes: Uint8Array): MoveInstantaneousRewardsCert {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {MoveInstantaneousRewardsCert}
  */
  static fromHex(hexStr: string): MoveInstantaneousRewardsCert {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {MoveInstantaneousRewardsCert}
  */
  static fromJson(json: string): MoveInstantaneousRewardsCert {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {MoveInstantaneousReward}
  */
  abstract moveInstantaneousReward(): MoveInstantaneousReward;

  /**
  * @param {MoveInstantaneousReward} moveInstantaneousReward
  * @returns {MoveInstantaneousRewardsCert}
  */
  static new(moveInstantaneousReward: MoveInstantaneousReward): MoveInstantaneousRewardsCert {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class MultiAsset extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {MultiAsset}
  */
  static fromBytes(bytes: Uint8Array): MultiAsset {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {MultiAsset}
  */
  static fromHex(hexStr: string): MultiAsset {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {MultiAsset}
  */
  static fromJson(json: string): MultiAsset {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {MultiAsset}
  */
  static new(): MultiAsset {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {ScriptHash} policyId
  * @param {Assets} assets
  * @returns {Optional<Assets>}
  */
  abstract insert(policyId: ScriptHash, assets: Assets): Optional<Assets>;

  /**
  * @param {ScriptHash} policyId
  * @returns {Optional<Assets>}
  */
  abstract get(policyId: ScriptHash): Optional<Assets>;

  /**
  * @param {ScriptHash} policyId
  * @param {AssetName} assetName
  * @param {BigNum} value
  * @returns {Optional<BigNum>}
  */
  abstract setAsset(policyId: ScriptHash, assetName: AssetName, value: BigNum): Optional<BigNum>;

  /**
  * @param {ScriptHash} policyId
  * @param {AssetName} assetName
  * @returns {BigNum}
  */
  abstract getAsset(policyId: ScriptHash, assetName: AssetName): BigNum;

  /**
  * @returns {ScriptHashes}
  */
  abstract keys(): ScriptHashes;

  /**
  * @param {MultiAsset} rhsMa
  * @returns {MultiAsset}
  */
  abstract sub(rhsMa: MultiAsset): MultiAsset;

}

export abstract class MultiHostName extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {MultiHostName}
  */
  static fromBytes(bytes: Uint8Array): MultiHostName {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {MultiHostName}
  */
  static fromHex(hexStr: string): MultiHostName {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {MultiHostName}
  */
  static fromJson(json: string): MultiHostName {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {DNSRecordSRV}
  */
  abstract dnsName(): DNSRecordSRV;

  /**
  * @param {DNSRecordSRV} dnsName
  * @returns {MultiHostName}
  */
  static new(dnsName: DNSRecordSRV): MultiHostName {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class NativeScript extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {NativeScript}
  */
  static fromBytes(bytes: Uint8Array): NativeScript {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {NativeScript}
  */
  static fromHex(hexStr: string): NativeScript {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {NativeScript}
  */
  static fromJson(json: string): NativeScript {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {ScriptHash}
  */
  abstract hash(): ScriptHash;

  /**
  * @param {ScriptPubkey} scriptPubkey
  * @returns {NativeScript}
  */
  static newScriptPubkey(scriptPubkey: ScriptPubkey): NativeScript {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {ScriptAll} scriptAll
  * @returns {NativeScript}
  */
  static newScriptAll(scriptAll: ScriptAll): NativeScript {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {ScriptAny} scriptAny
  * @returns {NativeScript}
  */
  static newScriptAny(scriptAny: ScriptAny): NativeScript {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {ScriptNOfK} scriptNOfK
  * @returns {NativeScript}
  */
  static newScriptNOfK(scriptNOfK: ScriptNOfK): NativeScript {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {TimelockStart} timelockStart
  * @returns {NativeScript}
  */
  static newTimelockStart(timelockStart: TimelockStart): NativeScript {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {TimelockExpiry} timelockExpiry
  * @returns {NativeScript}
  */
  static newTimelockExpiry(timelockExpiry: TimelockExpiry): NativeScript {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {NativeScriptKind}
  */
  abstract kind(): NativeScriptKind;

  /**
  * @returns {Optional<ScriptPubkey>}
  */
  abstract asScriptPubkey(): Optional<ScriptPubkey>;

  /**
  * @returns {Optional<ScriptAll>}
  */
  abstract asScriptAll(): Optional<ScriptAll>;

  /**
  * @returns {Optional<ScriptAny>}
  */
  abstract asScriptAny(): Optional<ScriptAny>;

  /**
  * @returns {Optional<ScriptNOfK>}
  */
  abstract asScriptNOfK(): Optional<ScriptNOfK>;

  /**
  * @returns {Optional<TimelockStart>}
  */
  abstract asTimelockStart(): Optional<TimelockStart>;

  /**
  * @returns {Optional<TimelockExpiry>}
  */
  abstract asTimelockExpiry(): Optional<TimelockExpiry>;

  /**
  * @returns {Ed25519KeyHashes}
  */
  abstract getRequiredSigners(): Ed25519KeyHashes;

}

export abstract class NativeScriptSource extends _Ptr {
  /**
  * @param {NativeScript} script
  * @returns {NativeScriptSource}
  */
  static new(script: NativeScript): NativeScriptSource {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {ScriptHash} scriptHash
  * @param {TransactionInput} input
  * @param {number} scriptSize
  * @returns {NativeScriptSource}
  */
  static newRefInput(scriptHash: ScriptHash, input: TransactionInput, scriptSize: number): NativeScriptSource {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Ed25519KeyHashes} keyHashes
  */
  abstract setRequiredSigners(keyHashes: Ed25519KeyHashes): void;

  /**
  * @returns {Optional<number>}
  */
  abstract getRefScriptSize(): Optional<number>;

}

export abstract class NativeScripts extends _Ptr {
  /**
  * @returns {NativeScripts}
  */
  static new(): NativeScripts {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {number} index
  * @returns {NativeScript}
  */
  abstract get(index: number): NativeScript;

  /**
  * @param {NativeScript} elem
  */
  abstract add(elem: NativeScript): void;

  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {NativeScripts}
  */
  static fromBytes(bytes: Uint8Array): NativeScripts {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {NativeScripts}
  */
  static fromHex(hexStr: string): NativeScripts {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {NativeScripts}
  */
  static fromJson(json: string): NativeScripts {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class NetworkId extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {NetworkId}
  */
  static fromBytes(bytes: Uint8Array): NetworkId {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {NetworkId}
  */
  static fromHex(hexStr: string): NetworkId {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {NetworkId}
  */
  static fromJson(json: string): NetworkId {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {NetworkId}
  */
  static testnet(): NetworkId {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {NetworkId}
  */
  static mainnet(): NetworkId {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {NetworkIdKind}
  */
  abstract kind(): NetworkIdKind;

}

export abstract class NetworkInfo extends _Ptr {
  /**
  * @param {number} networkId
  * @param {number} protocolMagic
  * @returns {NetworkInfo}
  */
  static new(networkId: number, protocolMagic: number): NetworkInfo {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract networkId(): number;

  /**
  * @returns {number}
  */
  abstract protocolMagic(): number;

  /**
  * @returns {NetworkInfo}
  */
  static testnetPreview(): NetworkInfo {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {NetworkInfo}
  */
  static testnetPreprod(): NetworkInfo {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {NetworkInfo}
  */
  static mainnet(): NetworkInfo {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class NewConstitutionAction extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {NewConstitutionAction}
  */
  static fromBytes(bytes: Uint8Array): NewConstitutionAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {NewConstitutionAction}
  */
  static fromHex(hexStr: string): NewConstitutionAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {NewConstitutionAction}
  */
  static fromJson(json: string): NewConstitutionAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Optional<GovernanceActionId>}
  */
  abstract govActionId(): Optional<GovernanceActionId>;

  /**
  * @returns {Constitution}
  */
  abstract constitution(): Constitution;

  /**
  * @param {Constitution} constitution
  * @returns {NewConstitutionAction}
  */
  static new(constitution: Constitution): NewConstitutionAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {GovernanceActionId} govActionId
  * @param {Constitution} constitution
  * @returns {NewConstitutionAction}
  */
  static newWithActionId(govActionId: GovernanceActionId, constitution: Constitution): NewConstitutionAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {boolean}
  */
  abstract hasScriptHash(): boolean;

}

export abstract class NoConfidenceAction extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {NoConfidenceAction}
  */
  static fromBytes(bytes: Uint8Array): NoConfidenceAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {NoConfidenceAction}
  */
  static fromHex(hexStr: string): NoConfidenceAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {NoConfidenceAction}
  */
  static fromJson(json: string): NoConfidenceAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Optional<GovernanceActionId>}
  */
  abstract govActionId(): Optional<GovernanceActionId>;

  /**
  * @returns {NoConfidenceAction}
  */
  static new(): NoConfidenceAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {GovernanceActionId} govActionId
  * @returns {NoConfidenceAction}
  */
  static newWithActionId(govActionId: GovernanceActionId): NoConfidenceAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class Nonce extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {Nonce}
  */
  static fromBytes(bytes: Uint8Array): Nonce {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {Nonce}
  */
  static fromHex(hexStr: string): Nonce {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {Nonce}
  */
  static fromJson(json: string): Nonce {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Nonce}
  */
  static newIdentity(): Nonce {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Uint8Array} hash
  * @returns {Nonce}
  */
  static newFromHash(hash: Uint8Array): Nonce {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Optional<Uint8Array>}
  */
  abstract getHash(): Optional<Uint8Array>;

}

export abstract class OperationalCert extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {OperationalCert}
  */
  static fromBytes(bytes: Uint8Array): OperationalCert {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {OperationalCert}
  */
  static fromHex(hexStr: string): OperationalCert {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {OperationalCert}
  */
  static fromJson(json: string): OperationalCert {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {KESVKey}
  */
  abstract hotVkey(): KESVKey;

  /**
  * @returns {number}
  */
  abstract sequenceNumber(): number;

  /**
  * @returns {number}
  */
  abstract kesPeriod(): number;

  /**
  * @returns {Ed25519Signature}
  */
  abstract sigma(): Ed25519Signature;

  /**
  * @param {KESVKey} hotVkey
  * @param {number} sequenceNumber
  * @param {number} kesPeriod
  * @param {Ed25519Signature} sigma
  * @returns {OperationalCert}
  */
  static new(hotVkey: KESVKey, sequenceNumber: number, kesPeriod: number, sigma: Ed25519Signature): OperationalCert {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class OutputDatum extends _Ptr {
  /**
  * @param {DataHash} dataHash
  * @returns {OutputDatum}
  */
  static newDataHash(dataHash: DataHash): OutputDatum {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {PlutusData} data
  * @returns {OutputDatum}
  */
  static newData(data: PlutusData): OutputDatum {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Optional<DataHash>}
  */
  abstract dataHash(): Optional<DataHash>;

  /**
  * @returns {Optional<PlutusData>}
  */
  abstract data(): Optional<PlutusData>;

}

export abstract class ParameterChangeAction extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {ParameterChangeAction}
  */
  static fromBytes(bytes: Uint8Array): ParameterChangeAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {ParameterChangeAction}
  */
  static fromHex(hexStr: string): ParameterChangeAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {ParameterChangeAction}
  */
  static fromJson(json: string): ParameterChangeAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Optional<GovernanceActionId>}
  */
  abstract govActionId(): Optional<GovernanceActionId>;

  /**
  * @returns {ProtocolParamUpdate}
  */
  abstract protocolParamUpdates(): ProtocolParamUpdate;

  /**
  * @returns {Optional<ScriptHash>}
  */
  abstract policyHash(): Optional<ScriptHash>;

  /**
  * @param {ProtocolParamUpdate} protocolParamUpdates
  * @returns {ParameterChangeAction}
  */
  static new(protocolParamUpdates: ProtocolParamUpdate): ParameterChangeAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {GovernanceActionId} govActionId
  * @param {ProtocolParamUpdate} protocolParamUpdates
  * @returns {ParameterChangeAction}
  */
  static newWithActionId(govActionId: GovernanceActionId, protocolParamUpdates: ProtocolParamUpdate): ParameterChangeAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {ProtocolParamUpdate} protocolParamUpdates
  * @param {ScriptHash} policyHash
  * @returns {ParameterChangeAction}
  */
  static newWithPolicyHash(protocolParamUpdates: ProtocolParamUpdate, policyHash: ScriptHash): ParameterChangeAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {GovernanceActionId} govActionId
  * @param {ProtocolParamUpdate} protocolParamUpdates
  * @param {ScriptHash} policyHash
  * @returns {ParameterChangeAction}
  */
  static newWithPolicyHashAndActionId(govActionId: GovernanceActionId, protocolParamUpdates: ProtocolParamUpdate, policyHash: ScriptHash): ParameterChangeAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class PlutusData extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {PlutusData}
  */
  static fromBytes(bytes: Uint8Array): PlutusData {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {PlutusData}
  */
  static fromHex(hexStr: string): PlutusData {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {ConstrPlutusData} constrPlutusData
  * @returns {PlutusData}
  */
  static newConstrPlutusData(constrPlutusData: ConstrPlutusData): PlutusData {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {BigNum} alternative
  * @returns {PlutusData}
  */
  static newEmptyConstrPlutusData(alternative: BigNum): PlutusData {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {BigNum} alternative
  * @param {PlutusData} plutusData
  * @returns {PlutusData}
  */
  static newSingleValueConstrPlutusData(alternative: BigNum, plutusData: PlutusData): PlutusData {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {PlutusMap} map
  * @returns {PlutusData}
  */
  static newMap(map: PlutusMap): PlutusData {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {PlutusList} list
  * @returns {PlutusData}
  */
  static newList(list: PlutusList): PlutusData {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {BigInt} integer
  * @returns {PlutusData}
  */
  static newInteger(integer: BigInt): PlutusData {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Uint8Array} bytes
  * @returns {PlutusData}
  */
  static newBytes(bytes: Uint8Array): PlutusData {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {PlutusDataKind}
  */
  abstract kind(): PlutusDataKind;

  /**
  * @returns {Optional<ConstrPlutusData>}
  */
  abstract asConstrPlutusData(): Optional<ConstrPlutusData>;

  /**
  * @returns {Optional<PlutusMap>}
  */
  abstract asMap(): Optional<PlutusMap>;

  /**
  * @returns {Optional<PlutusList>}
  */
  abstract asList(): Optional<PlutusList>;

  /**
  * @returns {Optional<BigInt>}
  */
  abstract asInteger(): Optional<BigInt>;

  /**
  * @returns {Optional<Uint8Array>}
  */
  abstract asBytes(): Optional<Uint8Array>;

  /**
  * @param {PlutusDatumSchema} schema
  * @returns {string}
  */
  abstract toJson(schema: PlutusDatumSchema): string;

  /**
  * @param {string} json
  * @param {PlutusDatumSchema} schema
  * @returns {PlutusData}
  */
  static fromJson(json: string, schema: PlutusDatumSchema): PlutusData {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Address} address
  * @returns {PlutusData}
  */
  static fromAddress(address: Address): PlutusData {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {NetworkInfo} network
  * @returns {Address}
  */
  abstract asAddress(network: NetworkInfo): Address;

}

export abstract class PlutusList extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {PlutusList}
  */
  static fromBytes(bytes: Uint8Array): PlutusList {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {PlutusList}
  */
  static fromHex(hexStr: string): PlutusList {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {PlutusList}
  */
  static new(): PlutusList {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {number} index
  * @returns {PlutusData}
  */
  abstract get(index: number): PlutusData;

  /**
  * @param {PlutusData} elem
  */
  abstract add(elem: PlutusData): void;

}

export abstract class PlutusMap extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {PlutusMap}
  */
  static fromBytes(bytes: Uint8Array): PlutusMap {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {PlutusMap}
  */
  static fromHex(hexStr: string): PlutusMap {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {PlutusMap}
  */
  static new(): PlutusMap {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {PlutusData} key
  * @param {PlutusMapValues} values
  * @returns {Optional<PlutusMapValues>}
  */
  abstract insert(key: PlutusData, values: PlutusMapValues): Optional<PlutusMapValues>;

  /**
  * @param {PlutusData} key
  * @returns {Optional<PlutusMapValues>}
  */
  abstract get(key: PlutusData): Optional<PlutusMapValues>;

  /**
  * @returns {PlutusList}
  */
  abstract keys(): PlutusList;

}

export abstract class PlutusMapValues extends _Ptr {
  /**
  * @returns {PlutusMapValues}
  */
  static new(): PlutusMapValues {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {number} index
  * @returns {Optional<PlutusData>}
  */
  abstract get(index: number): Optional<PlutusData>;

  /**
  * @param {PlutusData} elem
  */
  abstract add(elem: PlutusData): void;

}

export abstract class PlutusScript extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {PlutusScript}
  */
  static fromBytes(bytes: Uint8Array): PlutusScript {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {PlutusScript}
  */
  static fromHex(hexStr: string): PlutusScript {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Uint8Array} bytes
  * @returns {PlutusScript}
  */
  static new(bytes: Uint8Array): PlutusScript {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Uint8Array} bytes
  * @returns {PlutusScript}
  */
  static newV2(bytes: Uint8Array): PlutusScript {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Uint8Array} bytes
  * @returns {PlutusScript}
  */
  static newV3(bytes: Uint8Array): PlutusScript {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Uint8Array} bytes
  * @param {Language} language
  * @returns {PlutusScript}
  */
  static newWithVersion(bytes: Uint8Array, language: Language): PlutusScript {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Uint8Array}
  */
  abstract bytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {PlutusScript}
  */
  static fromBytesV2(bytes: Uint8Array): PlutusScript {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Uint8Array} bytes
  * @returns {PlutusScript}
  */
  static fromBytesV3(bytes: Uint8Array): PlutusScript {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Uint8Array} bytes
  * @param {Language} language
  * @returns {PlutusScript}
  */
  static fromBytesWithVersion(bytes: Uint8Array, language: Language): PlutusScript {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {string} hexStr
  * @param {Language} language
  * @returns {PlutusScript}
  */
  static fromHexWithVersion(hexStr: string, language: Language): PlutusScript {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {ScriptHash}
  */
  abstract hash(): ScriptHash;

  /**
  * @returns {Language}
  */
  abstract languageVersion(): Language;

}

export abstract class PlutusScriptSource extends _Ptr {
  /**
  * @param {PlutusScript} script
  * @returns {PlutusScriptSource}
  */
  static new(script: PlutusScript): PlutusScriptSource {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {ScriptHash} scriptHash
  * @param {TransactionInput} input
  * @param {Language} langVer
  * @param {number} scriptSize
  * @returns {PlutusScriptSource}
  */
  static newRefInput(scriptHash: ScriptHash, input: TransactionInput, langVer: Language, scriptSize: number): PlutusScriptSource {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Ed25519KeyHashes} keyHashes
  */
  abstract setRequiredSigners(keyHashes: Ed25519KeyHashes): void;

  /**
  * @returns {Optional<number>}
  */
  abstract getRefScriptSize(): Optional<number>;

}

export abstract class PlutusScripts extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {PlutusScripts}
  */
  static fromBytes(bytes: Uint8Array): PlutusScripts {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {PlutusScripts}
  */
  static fromHex(hexStr: string): PlutusScripts {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {PlutusScripts}
  */
  static fromJson(json: string): PlutusScripts {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {PlutusScripts}
  */
  static new(): PlutusScripts {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {number} index
  * @returns {PlutusScript}
  */
  abstract get(index: number): PlutusScript;

  /**
  * @param {PlutusScript} elem
  */
  abstract add(elem: PlutusScript): void;

}

export abstract class PlutusWitness extends _Ptr {
  /**
  * @param {PlutusScript} script
  * @param {PlutusData} datum
  * @param {Redeemer} redeemer
  * @returns {PlutusWitness}
  */
  static new(script: PlutusScript, datum: PlutusData, redeemer: Redeemer): PlutusWitness {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {PlutusScriptSource} script
  * @param {DatumSource} datum
  * @param {Redeemer} redeemer
  * @returns {PlutusWitness}
  */
  static newWithRef(script: PlutusScriptSource, datum: DatumSource, redeemer: Redeemer): PlutusWitness {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {PlutusScript} script
  * @param {Redeemer} redeemer
  * @returns {PlutusWitness}
  */
  static newWithoutDatum(script: PlutusScript, redeemer: Redeemer): PlutusWitness {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {PlutusScriptSource} script
  * @param {Redeemer} redeemer
  * @returns {PlutusWitness}
  */
  static newWithRefWithoutDatum(script: PlutusScriptSource, redeemer: Redeemer): PlutusWitness {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Optional<PlutusScript>}
  */
  abstract script(): Optional<PlutusScript>;

  /**
  * @returns {Optional<PlutusData>}
  */
  abstract datum(): Optional<PlutusData>;

  /**
  * @returns {Redeemer}
  */
  abstract redeemer(): Redeemer;

}

export abstract class PlutusWitnesses extends _Ptr {
  /**
  * @returns {PlutusWitnesses}
  */
  static new(): PlutusWitnesses {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {number} index
  * @returns {PlutusWitness}
  */
  abstract get(index: number): PlutusWitness;

  /**
  * @param {PlutusWitness} elem
  */
  abstract add(elem: PlutusWitness): void;

}

export abstract class Pointer extends _Ptr {
  /**
  * @param {number} slot
  * @param {number} txIndex
  * @param {number} certIndex
  * @returns {Pointer}
  */
  static new(slot: number, txIndex: number, certIndex: number): Pointer {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {BigNum} slot
  * @param {BigNum} txIndex
  * @param {BigNum} certIndex
  * @returns {Pointer}
  */
  static newPointer(slot: BigNum, txIndex: BigNum, certIndex: BigNum): Pointer {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract slot(): number;

  /**
  * @returns {number}
  */
  abstract txIndex(): number;

  /**
  * @returns {number}
  */
  abstract certIndex(): number;

  /**
  * @returns {BigNum}
  */
  abstract slotBignum(): BigNum;

  /**
  * @returns {BigNum}
  */
  abstract txIndexBignum(): BigNum;

  /**
  * @returns {BigNum}
  */
  abstract certIndexBignum(): BigNum;

}

export abstract class PointerAddress extends _Ptr {
  /**
  * @param {number} network
  * @param {Credential} payment
  * @param {Pointer} stake
  * @returns {PointerAddress}
  */
  static new(network: number, payment: Credential, stake: Pointer): PointerAddress {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Credential}
  */
  abstract paymentCred(): Credential;

  /**
  * @returns {Pointer}
  */
  abstract stakePointer(): Pointer;

  /**
  * @returns {Address}
  */
  abstract toAddress(): Address;

  /**
  * @param {Address} addr
  * @returns {Optional<PointerAddress>}
  */
  static fromAddress(addr: Address): Optional<PointerAddress> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract networkId(): number;

}

export abstract class PoolMetadata extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {PoolMetadata}
  */
  static fromBytes(bytes: Uint8Array): PoolMetadata {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {PoolMetadata}
  */
  static fromHex(hexStr: string): PoolMetadata {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {PoolMetadata}
  */
  static fromJson(json: string): PoolMetadata {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {URL}
  */
  abstract url(): URL;

  /**
  * @returns {PoolMetadataHash}
  */
  abstract poolMetadataHash(): PoolMetadataHash;

  /**
  * @param {URL} url
  * @param {PoolMetadataHash} poolMetadataHash
  * @returns {PoolMetadata}
  */
  static new(url: URL, poolMetadataHash: PoolMetadataHash): PoolMetadata {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class PoolMetadataHash extends _Ptr {
  /**
  * @param {Uint8Array} bytes
  * @returns {PoolMetadataHash}
  */
  static fromBytes(bytes: Uint8Array): PoolMetadataHash {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {string} prefix
  * @returns {string}
  */
  abstract toBech32(prefix: string): string;

  /**
  * @param {string} bechStr
  * @returns {PoolMetadataHash}
  */
  static fromBech32(bechStr: string): PoolMetadataHash {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hex
  * @returns {PoolMetadataHash}
  */
  static fromHex(hex: string): PoolMetadataHash {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class PoolParams extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {PoolParams}
  */
  static fromBytes(bytes: Uint8Array): PoolParams {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {PoolParams}
  */
  static fromHex(hexStr: string): PoolParams {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {PoolParams}
  */
  static fromJson(json: string): PoolParams {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Ed25519KeyHash}
  */
  abstract operator(): Ed25519KeyHash;

  /**
  * @returns {VRFKeyHash}
  */
  abstract vrfKeyhash(): VRFKeyHash;

  /**
  * @returns {BigNum}
  */
  abstract pledge(): BigNum;

  /**
  * @returns {BigNum}
  */
  abstract cost(): BigNum;

  /**
  * @returns {UnitInterval}
  */
  abstract margin(): UnitInterval;

  /**
  * @returns {RewardAddress}
  */
  abstract rewardAccount(): RewardAddress;

  /**
  * @returns {Ed25519KeyHashes}
  */
  abstract poolOwners(): Ed25519KeyHashes;

  /**
  * @returns {Relays}
  */
  abstract relays(): Relays;

  /**
  * @returns {Optional<PoolMetadata>}
  */
  abstract poolMetadata(): Optional<PoolMetadata>;

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
  * @returns {PoolParams}
  */
  static new(operator: Ed25519KeyHash, vrfKeyhash: VRFKeyHash, pledge: BigNum, cost: BigNum, margin: UnitInterval, rewardAccount: RewardAddress, poolOwners: Ed25519KeyHashes, relays: Relays, poolMetadata: Optional<PoolMetadata>): PoolParams {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class PoolRegistration extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {PoolRegistration}
  */
  static fromBytes(bytes: Uint8Array): PoolRegistration {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {PoolRegistration}
  */
  static fromHex(hexStr: string): PoolRegistration {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {PoolRegistration}
  */
  static fromJson(json: string): PoolRegistration {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {PoolParams}
  */
  abstract poolParams(): PoolParams;

  /**
  * @param {PoolParams} poolParams
  * @returns {PoolRegistration}
  */
  static new(poolParams: PoolParams): PoolRegistration {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class PoolRetirement extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {PoolRetirement}
  */
  static fromBytes(bytes: Uint8Array): PoolRetirement {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {PoolRetirement}
  */
  static fromHex(hexStr: string): PoolRetirement {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {PoolRetirement}
  */
  static fromJson(json: string): PoolRetirement {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Ed25519KeyHash}
  */
  abstract poolKeyhash(): Ed25519KeyHash;

  /**
  * @returns {number}
  */
  abstract epoch(): number;

  /**
  * @param {Ed25519KeyHash} poolKeyhash
  * @param {number} epoch
  * @returns {PoolRetirement}
  */
  static new(poolKeyhash: Ed25519KeyHash, epoch: number): PoolRetirement {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class PoolVotingThresholds extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {PoolVotingThresholds}
  */
  static fromBytes(bytes: Uint8Array): PoolVotingThresholds {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {PoolVotingThresholds}
  */
  static fromHex(hexStr: string): PoolVotingThresholds {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {PoolVotingThresholds}
  */
  static fromJson(json: string): PoolVotingThresholds {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {UnitInterval} motionNoConfidence
  * @param {UnitInterval} committeeNormal
  * @param {UnitInterval} committeeNoConfidence
  * @param {UnitInterval} hardForkInitiation
  * @param {UnitInterval} securityRelevantThreshold
  * @returns {PoolVotingThresholds}
  */
  static new(motionNoConfidence: UnitInterval, committeeNormal: UnitInterval, committeeNoConfidence: UnitInterval, hardForkInitiation: UnitInterval, securityRelevantThreshold: UnitInterval): PoolVotingThresholds {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {UnitInterval}
  */
  abstract motionNoConfidence(): UnitInterval;

  /**
  * @returns {UnitInterval}
  */
  abstract committeeNormal(): UnitInterval;

  /**
  * @returns {UnitInterval}
  */
  abstract committeeNoConfidence(): UnitInterval;

  /**
  * @returns {UnitInterval}
  */
  abstract hardForkInitiation(): UnitInterval;

  /**
  * @returns {UnitInterval}
  */
  abstract securityRelevantThreshold(): UnitInterval;

}

export abstract class PrivateKey extends _Ptr {
  /**
  * @returns {PublicKey}
  */
  abstract toPublic(): PublicKey;

  /**
  * @returns {PrivateKey}
  */
  static generateEd25519(): PrivateKey {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {PrivateKey}
  */
  static generateEd25519extended(): PrivateKey {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {string} bech32Str
  * @returns {PrivateKey}
  */
  static fromBech32(bech32Str: string): PrivateKey {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toBech32(): string;

  /**
  * @returns {Uint8Array}
  */
  abstract asBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {PrivateKey}
  */
  static fromExtendedBytes(bytes: Uint8Array): PrivateKey {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Uint8Array} bytes
  * @returns {PrivateKey}
  */
  static fromNormalBytes(bytes: Uint8Array): PrivateKey {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Uint8Array} message
  * @returns {Ed25519Signature}
  */
  abstract sign(message: Uint8Array): Ed25519Signature;

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {PrivateKey}
  */
  static fromHex(hexStr: string): PrivateKey {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class ProposedProtocolParameterUpdates extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {ProposedProtocolParameterUpdates}
  */
  static fromBytes(bytes: Uint8Array): ProposedProtocolParameterUpdates {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {ProposedProtocolParameterUpdates}
  */
  static fromHex(hexStr: string): ProposedProtocolParameterUpdates {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {ProposedProtocolParameterUpdates}
  */
  static fromJson(json: string): ProposedProtocolParameterUpdates {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {ProposedProtocolParameterUpdates}
  */
  static new(): ProposedProtocolParameterUpdates {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {GenesisHash} key
  * @param {ProtocolParamUpdate} value
  * @returns {Optional<ProtocolParamUpdate>}
  */
  abstract insert(key: GenesisHash, value: ProtocolParamUpdate): Optional<ProtocolParamUpdate>;

  /**
  * @param {GenesisHash} key
  * @returns {Optional<ProtocolParamUpdate>}
  */
  abstract get(key: GenesisHash): Optional<ProtocolParamUpdate>;

  /**
  * @returns {GenesisHashes}
  */
  abstract keys(): GenesisHashes;

}

export abstract class ProtocolParamUpdate extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {ProtocolParamUpdate}
  */
  static fromBytes(bytes: Uint8Array): ProtocolParamUpdate {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {ProtocolParamUpdate}
  */
  static fromHex(hexStr: string): ProtocolParamUpdate {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {ProtocolParamUpdate}
  */
  static fromJson(json: string): ProtocolParamUpdate {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {BigNum} minfeeA
  */
  abstract setMinfeeA(minfeeA: BigNum): void;

  /**
  * @returns {Optional<BigNum>}
  */
  abstract minfeeA(): Optional<BigNum>;

  /**
  * @param {BigNum} minfeeB
  */
  abstract setMinfeeB(minfeeB: BigNum): void;

  /**
  * @returns {Optional<BigNum>}
  */
  abstract minfeeB(): Optional<BigNum>;

  /**
  * @param {number} maxBlockBodySize
  */
  abstract setMaxBlockBodySize(maxBlockBodySize: number): void;

  /**
  * @returns {Optional<number>}
  */
  abstract maxBlockBodySize(): Optional<number>;

  /**
  * @param {number} maxTxSize
  */
  abstract setMaxTxSize(maxTxSize: number): void;

  /**
  * @returns {Optional<number>}
  */
  abstract maxTxSize(): Optional<number>;

  /**
  * @param {number} maxBlockHeaderSize
  */
  abstract setMaxBlockHeaderSize(maxBlockHeaderSize: number): void;

  /**
  * @returns {Optional<number>}
  */
  abstract maxBlockHeaderSize(): Optional<number>;

  /**
  * @param {BigNum} keyDeposit
  */
  abstract setKeyDeposit(keyDeposit: BigNum): void;

  /**
  * @returns {Optional<BigNum>}
  */
  abstract keyDeposit(): Optional<BigNum>;

  /**
  * @param {BigNum} poolDeposit
  */
  abstract setPoolDeposit(poolDeposit: BigNum): void;

  /**
  * @returns {Optional<BigNum>}
  */
  abstract poolDeposit(): Optional<BigNum>;

  /**
  * @param {number} maxEpoch
  */
  abstract setMaxEpoch(maxEpoch: number): void;

  /**
  * @returns {Optional<number>}
  */
  abstract maxEpoch(): Optional<number>;

  /**
  * @param {number} nOpt
  */
  abstract setNOpt(nOpt: number): void;

  /**
  * @returns {Optional<number>}
  */
  abstract nOpt(): Optional<number>;

  /**
  * @param {UnitInterval} poolPledgeInfluence
  */
  abstract setPoolPledgeInfluence(poolPledgeInfluence: UnitInterval): void;

  /**
  * @returns {Optional<UnitInterval>}
  */
  abstract poolPledgeInfluence(): Optional<UnitInterval>;

  /**
  * @param {UnitInterval} expansionRate
  */
  abstract setExpansionRate(expansionRate: UnitInterval): void;

  /**
  * @returns {Optional<UnitInterval>}
  */
  abstract expansionRate(): Optional<UnitInterval>;

  /**
  * @param {UnitInterval} treasuryGrowthRate
  */
  abstract setTreasuryGrowthRate(treasuryGrowthRate: UnitInterval): void;

  /**
  * @returns {Optional<UnitInterval>}
  */
  abstract treasuryGrowthRate(): Optional<UnitInterval>;

  /**
  * @returns {Optional<UnitInterval>}
  */
  abstract d(): Optional<UnitInterval>;

  /**
  * @returns {Optional<Nonce>}
  */
  abstract extraEntropy(): Optional<Nonce>;

  /**
  * @param {ProtocolVersion} protocolVersion
  */
  abstract setProtocolVersion(protocolVersion: ProtocolVersion): void;

  /**
  * @returns {Optional<ProtocolVersion>}
  */
  abstract protocolVersion(): Optional<ProtocolVersion>;

  /**
  * @param {BigNum} minPoolCost
  */
  abstract setMinPoolCost(minPoolCost: BigNum): void;

  /**
  * @returns {Optional<BigNum>}
  */
  abstract minPoolCost(): Optional<BigNum>;

  /**
  * @param {BigNum} adaPerUtxoByte
  */
  abstract setAdaPerUtxoByte(adaPerUtxoByte: BigNum): void;

  /**
  * @returns {Optional<BigNum>}
  */
  abstract adaPerUtxoByte(): Optional<BigNum>;

  /**
  * @param {Costmdls} costModels
  */
  abstract setCostModels(costModels: Costmdls): void;

  /**
  * @returns {Optional<Costmdls>}
  */
  abstract costModels(): Optional<Costmdls>;

  /**
  * @param {ExUnitPrices} executionCosts
  */
  abstract setExecutionCosts(executionCosts: ExUnitPrices): void;

  /**
  * @returns {Optional<ExUnitPrices>}
  */
  abstract executionCosts(): Optional<ExUnitPrices>;

  /**
  * @param {ExUnits} maxTxExUnits
  */
  abstract setMaxTxExUnits(maxTxExUnits: ExUnits): void;

  /**
  * @returns {Optional<ExUnits>}
  */
  abstract maxTxExUnits(): Optional<ExUnits>;

  /**
  * @param {ExUnits} maxBlockExUnits
  */
  abstract setMaxBlockExUnits(maxBlockExUnits: ExUnits): void;

  /**
  * @returns {Optional<ExUnits>}
  */
  abstract maxBlockExUnits(): Optional<ExUnits>;

  /**
  * @param {number} maxValueSize
  */
  abstract setMaxValueSize(maxValueSize: number): void;

  /**
  * @returns {Optional<number>}
  */
  abstract maxValueSize(): Optional<number>;

  /**
  * @param {number} collateralPercentage
  */
  abstract setCollateralPercentage(collateralPercentage: number): void;

  /**
  * @returns {Optional<number>}
  */
  abstract collateralPercentage(): Optional<number>;

  /**
  * @param {number} maxCollateralInputs
  */
  abstract setMaxCollateralInputs(maxCollateralInputs: number): void;

  /**
  * @returns {Optional<number>}
  */
  abstract maxCollateralInputs(): Optional<number>;

  /**
  * @param {PoolVotingThresholds} poolVotingThresholds
  */
  abstract setPoolVotingThresholds(poolVotingThresholds: PoolVotingThresholds): void;

  /**
  * @returns {Optional<PoolVotingThresholds>}
  */
  abstract poolVotingThresholds(): Optional<PoolVotingThresholds>;

  /**
  * @param {DRepVotingThresholds} drepVotingThresholds
  */
  abstract setDrepVotingThresholds(drepVotingThresholds: DRepVotingThresholds): void;

  /**
  * @returns {Optional<DRepVotingThresholds>}
  */
  abstract drepVotingThresholds(): Optional<DRepVotingThresholds>;

  /**
  * @param {number} minCommitteeSize
  */
  abstract setMinCommitteeSize(minCommitteeSize: number): void;

  /**
  * @returns {Optional<number>}
  */
  abstract minCommitteeSize(): Optional<number>;

  /**
  * @param {number} committeeTermLimit
  */
  abstract setCommitteeTermLimit(committeeTermLimit: number): void;

  /**
  * @returns {Optional<number>}
  */
  abstract committeeTermLimit(): Optional<number>;

  /**
  * @param {number} governanceActionValidityPeriod
  */
  abstract setGovernanceActionValidityPeriod(governanceActionValidityPeriod: number): void;

  /**
  * @returns {Optional<number>}
  */
  abstract governanceActionValidityPeriod(): Optional<number>;

  /**
  * @param {BigNum} governanceActionDeposit
  */
  abstract setGovernanceActionDeposit(governanceActionDeposit: BigNum): void;

  /**
  * @returns {Optional<BigNum>}
  */
  abstract governanceActionDeposit(): Optional<BigNum>;

  /**
  * @param {BigNum} drepDeposit
  */
  abstract setDrepDeposit(drepDeposit: BigNum): void;

  /**
  * @returns {Optional<BigNum>}
  */
  abstract drepDeposit(): Optional<BigNum>;

  /**
  * @param {number} drepInactivityPeriod
  */
  abstract setDrepInactivityPeriod(drepInactivityPeriod: number): void;

  /**
  * @returns {Optional<number>}
  */
  abstract drepInactivityPeriod(): Optional<number>;

  /**
  * @param {UnitInterval} refScriptCoinsPerByte
  */
  abstract setRefScriptCoinsPerByte(refScriptCoinsPerByte: UnitInterval): void;

  /**
  * @returns {Optional<UnitInterval>}
  */
  abstract refScriptCoinsPerByte(): Optional<UnitInterval>;

  /**
  * @returns {ProtocolParamUpdate}
  */
  static new(): ProtocolParamUpdate {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class ProtocolVersion extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {ProtocolVersion}
  */
  static fromBytes(bytes: Uint8Array): ProtocolVersion {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {ProtocolVersion}
  */
  static fromHex(hexStr: string): ProtocolVersion {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {ProtocolVersion}
  */
  static fromJson(json: string): ProtocolVersion {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract major(): number;

  /**
  * @returns {number}
  */
  abstract minor(): number;

  /**
  * @param {number} major
  * @param {number} minor
  * @returns {ProtocolVersion}
  */
  static new(major: number, minor: number): ProtocolVersion {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class PublicKey extends _Ptr {
  /**
  * @param {string} bech32Str
  * @returns {PublicKey}
  */
  static fromBech32(bech32Str: string): PublicKey {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toBech32(): string;

  /**
  * @returns {Uint8Array}
  */
  abstract asBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {PublicKey}
  */
  static fromBytes(bytes: Uint8Array): PublicKey {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Uint8Array} data
  * @param {Ed25519Signature} signature
  * @returns {boolean}
  */
  abstract verify(data: Uint8Array, signature: Ed25519Signature): boolean;

  /**
  * @returns {Ed25519KeyHash}
  */
  abstract hash(): Ed25519KeyHash;

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {PublicKey}
  */
  static fromHex(hexStr: string): PublicKey {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class PublicKeys extends _Ptr {
  /**
  * @returns {PublicKeys}
  */
  static new(): PublicKeys {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract size(): number;

  /**
  * @param {number} index
  * @returns {PublicKey}
  */
  abstract get(index: number): PublicKey;

  /**
  * @param {PublicKey} key
  */
  abstract add(key: PublicKey): void;

}

export abstract class Redeemer extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {Redeemer}
  */
  static fromBytes(bytes: Uint8Array): Redeemer {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {Redeemer}
  */
  static fromHex(hexStr: string): Redeemer {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {Redeemer}
  */
  static fromJson(json: string): Redeemer {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {RedeemerTag}
  */
  abstract tag(): RedeemerTag;

  /**
  * @returns {BigNum}
  */
  abstract index(): BigNum;

  /**
  * @returns {PlutusData}
  */
  abstract data(): PlutusData;

  /**
  * @returns {ExUnits}
  */
  abstract exUnits(): ExUnits;

  /**
  * @param {RedeemerTag} tag
  * @param {BigNum} index
  * @param {PlutusData} data
  * @param {ExUnits} exUnits
  * @returns {Redeemer}
  */
  static new(tag: RedeemerTag, index: BigNum, data: PlutusData, exUnits: ExUnits): Redeemer {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class RedeemerTag extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {RedeemerTag}
  */
  static fromBytes(bytes: Uint8Array): RedeemerTag {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {RedeemerTag}
  */
  static fromHex(hexStr: string): RedeemerTag {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {RedeemerTag}
  */
  static fromJson(json: string): RedeemerTag {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {RedeemerTag}
  */
  static newSpend(): RedeemerTag {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {RedeemerTag}
  */
  static newMint(): RedeemerTag {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {RedeemerTag}
  */
  static newCert(): RedeemerTag {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {RedeemerTag}
  */
  static newReward(): RedeemerTag {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {RedeemerTag}
  */
  static newVote(): RedeemerTag {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {RedeemerTag}
  */
  static newVotingProposal(): RedeemerTag {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {RedeemerTagKind}
  */
  abstract kind(): RedeemerTagKind;

}

export abstract class Redeemers extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {Redeemers}
  */
  static fromBytes(bytes: Uint8Array): Redeemers {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {Redeemers}
  */
  static fromHex(hexStr: string): Redeemers {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {Redeemers}
  */
  static fromJson(json: string): Redeemers {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Redeemers}
  */
  static new(): Redeemers {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {number} index
  * @returns {Redeemer}
  */
  abstract get(index: number): Redeemer;

  /**
  * @param {Redeemer} elem
  */
  abstract add(elem: Redeemer): void;

  /**
  * @returns {CborContainerType}
  */
  abstract getContainerType(): CborContainerType;

  /**
  * @returns {ExUnits}
  */
  abstract totalExUnits(): ExUnits;

}

export abstract class Relay extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {Relay}
  */
  static fromBytes(bytes: Uint8Array): Relay {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {Relay}
  */
  static fromHex(hexStr: string): Relay {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {Relay}
  */
  static fromJson(json: string): Relay {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {SingleHostAddr} singleHostAddr
  * @returns {Relay}
  */
  static newSingleHostAddr(singleHostAddr: SingleHostAddr): Relay {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {SingleHostName} singleHostName
  * @returns {Relay}
  */
  static newSingleHostName(singleHostName: SingleHostName): Relay {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {MultiHostName} multiHostName
  * @returns {Relay}
  */
  static newMultiHostName(multiHostName: MultiHostName): Relay {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {RelayKind}
  */
  abstract kind(): RelayKind;

  /**
  * @returns {Optional<SingleHostAddr>}
  */
  abstract asSingleHostAddr(): Optional<SingleHostAddr>;

  /**
  * @returns {Optional<SingleHostName>}
  */
  abstract asSingleHostName(): Optional<SingleHostName>;

  /**
  * @returns {Optional<MultiHostName>}
  */
  abstract asMultiHostName(): Optional<MultiHostName>;

}

export abstract class Relays extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {Relays}
  */
  static fromBytes(bytes: Uint8Array): Relays {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {Relays}
  */
  static fromHex(hexStr: string): Relays {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {Relays}
  */
  static fromJson(json: string): Relays {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Relays}
  */
  static new(): Relays {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {number} index
  * @returns {Relay}
  */
  abstract get(index: number): Relay;

  /**
  * @param {Relay} elem
  */
  abstract add(elem: Relay): void;

}

export abstract class RewardAddress extends _Ptr {
  /**
  * @param {number} network
  * @param {Credential} payment
  * @returns {RewardAddress}
  */
  static new(network: number, payment: Credential): RewardAddress {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Credential}
  */
  abstract paymentCred(): Credential;

  /**
  * @returns {Address}
  */
  abstract toAddress(): Address;

  /**
  * @param {Address} addr
  * @returns {Optional<RewardAddress>}
  */
  static fromAddress(addr: Address): Optional<RewardAddress> {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract networkId(): number;

}

export abstract class RewardAddresses extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {RewardAddresses}
  */
  static fromBytes(bytes: Uint8Array): RewardAddresses {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {RewardAddresses}
  */
  static fromHex(hexStr: string): RewardAddresses {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {RewardAddresses}
  */
  static fromJson(json: string): RewardAddresses {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {RewardAddresses}
  */
  static new(): RewardAddresses {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {number} index
  * @returns {RewardAddress}
  */
  abstract get(index: number): RewardAddress;

  /**
  * @param {RewardAddress} elem
  */
  abstract add(elem: RewardAddress): void;

}

export abstract class ScriptAll extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {ScriptAll}
  */
  static fromBytes(bytes: Uint8Array): ScriptAll {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {ScriptAll}
  */
  static fromHex(hexStr: string): ScriptAll {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {ScriptAll}
  */
  static fromJson(json: string): ScriptAll {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {NativeScripts}
  */
  abstract nativeScripts(): NativeScripts;

  /**
  * @param {NativeScripts} nativeScripts
  * @returns {ScriptAll}
  */
  static new(nativeScripts: NativeScripts): ScriptAll {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class ScriptAny extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {ScriptAny}
  */
  static fromBytes(bytes: Uint8Array): ScriptAny {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {ScriptAny}
  */
  static fromHex(hexStr: string): ScriptAny {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {ScriptAny}
  */
  static fromJson(json: string): ScriptAny {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {NativeScripts}
  */
  abstract nativeScripts(): NativeScripts;

  /**
  * @param {NativeScripts} nativeScripts
  * @returns {ScriptAny}
  */
  static new(nativeScripts: NativeScripts): ScriptAny {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class ScriptDataHash extends _Ptr {
  /**
  * @param {Uint8Array} bytes
  * @returns {ScriptDataHash}
  */
  static fromBytes(bytes: Uint8Array): ScriptDataHash {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {string} prefix
  * @returns {string}
  */
  abstract toBech32(prefix: string): string;

  /**
  * @param {string} bechStr
  * @returns {ScriptDataHash}
  */
  static fromBech32(bechStr: string): ScriptDataHash {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hex
  * @returns {ScriptDataHash}
  */
  static fromHex(hex: string): ScriptDataHash {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class ScriptHash extends _Ptr {
  /**
  * @param {Uint8Array} bytes
  * @returns {ScriptHash}
  */
  static fromBytes(bytes: Uint8Array): ScriptHash {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {string} prefix
  * @returns {string}
  */
  abstract toBech32(prefix: string): string;

  /**
  * @param {string} bechStr
  * @returns {ScriptHash}
  */
  static fromBech32(bechStr: string): ScriptHash {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hex
  * @returns {ScriptHash}
  */
  static fromHex(hex: string): ScriptHash {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class ScriptHashes extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {ScriptHashes}
  */
  static fromBytes(bytes: Uint8Array): ScriptHashes {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {ScriptHashes}
  */
  static fromHex(hexStr: string): ScriptHashes {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {ScriptHashes}
  */
  static fromJson(json: string): ScriptHashes {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {ScriptHashes}
  */
  static new(): ScriptHashes {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {number} index
  * @returns {ScriptHash}
  */
  abstract get(index: number): ScriptHash;

  /**
  * @param {ScriptHash} elem
  */
  abstract add(elem: ScriptHash): void;

}

export abstract class ScriptNOfK extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {ScriptNOfK}
  */
  static fromBytes(bytes: Uint8Array): ScriptNOfK {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {ScriptNOfK}
  */
  static fromHex(hexStr: string): ScriptNOfK {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {ScriptNOfK}
  */
  static fromJson(json: string): ScriptNOfK {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract n(): number;

  /**
  * @returns {NativeScripts}
  */
  abstract nativeScripts(): NativeScripts;

  /**
  * @param {number} n
  * @param {NativeScripts} nativeScripts
  * @returns {ScriptNOfK}
  */
  static new(n: number, nativeScripts: NativeScripts): ScriptNOfK {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class ScriptPubkey extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {ScriptPubkey}
  */
  static fromBytes(bytes: Uint8Array): ScriptPubkey {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {ScriptPubkey}
  */
  static fromHex(hexStr: string): ScriptPubkey {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {ScriptPubkey}
  */
  static fromJson(json: string): ScriptPubkey {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Ed25519KeyHash}
  */
  abstract addrKeyhash(): Ed25519KeyHash;

  /**
  * @param {Ed25519KeyHash} addrKeyhash
  * @returns {ScriptPubkey}
  */
  static new(addrKeyhash: Ed25519KeyHash): ScriptPubkey {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class ScriptRef extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {ScriptRef}
  */
  static fromBytes(bytes: Uint8Array): ScriptRef {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {ScriptRef}
  */
  static fromHex(hexStr: string): ScriptRef {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {ScriptRef}
  */
  static fromJson(json: string): ScriptRef {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {NativeScript} nativeScript
  * @returns {ScriptRef}
  */
  static newNativeScript(nativeScript: NativeScript): ScriptRef {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {PlutusScript} plutusScript
  * @returns {ScriptRef}
  */
  static newPlutusScript(plutusScript: PlutusScript): ScriptRef {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {boolean}
  */
  abstract isNativeScript(): boolean;

  /**
  * @returns {boolean}
  */
  abstract isPlutusScript(): boolean;

  /**
  * @returns {Optional<NativeScript>}
  */
  abstract nativeScript(): Optional<NativeScript>;

  /**
  * @returns {Optional<PlutusScript>}
  */
  abstract plutusScript(): Optional<PlutusScript>;

  /**
  * @returns {Uint8Array}
  */
  abstract toUnwrappedBytes(): Uint8Array;

}

export abstract class SingleHostAddr extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {SingleHostAddr}
  */
  static fromBytes(bytes: Uint8Array): SingleHostAddr {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {SingleHostAddr}
  */
  static fromHex(hexStr: string): SingleHostAddr {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {SingleHostAddr}
  */
  static fromJson(json: string): SingleHostAddr {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Optional<number>}
  */
  abstract port(): Optional<number>;

  /**
  * @returns {Optional<Ipv4>}
  */
  abstract ipv4(): Optional<Ipv4>;

  /**
  * @returns {Optional<Ipv6>}
  */
  abstract ipv6(): Optional<Ipv6>;

  /**
  * @param {Optional<number>} port
  * @param {Optional<Ipv4>} ipv4
  * @param {Optional<Ipv6>} ipv6
  * @returns {SingleHostAddr}
  */
  static new(port: Optional<number>, ipv4: Optional<Ipv4>, ipv6: Optional<Ipv6>): SingleHostAddr {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class SingleHostName extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {SingleHostName}
  */
  static fromBytes(bytes: Uint8Array): SingleHostName {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {SingleHostName}
  */
  static fromHex(hexStr: string): SingleHostName {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {SingleHostName}
  */
  static fromJson(json: string): SingleHostName {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Optional<number>}
  */
  abstract port(): Optional<number>;

  /**
  * @returns {DNSRecordAorAAAA}
  */
  abstract dnsName(): DNSRecordAorAAAA;

  /**
  * @param {Optional<number>} port
  * @param {DNSRecordAorAAAA} dnsName
  * @returns {SingleHostName}
  */
  static new(port: Optional<number>, dnsName: DNSRecordAorAAAA): SingleHostName {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class StakeAndVoteDelegation extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {StakeAndVoteDelegation}
  */
  static fromBytes(bytes: Uint8Array): StakeAndVoteDelegation {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {StakeAndVoteDelegation}
  */
  static fromHex(hexStr: string): StakeAndVoteDelegation {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {StakeAndVoteDelegation}
  */
  static fromJson(json: string): StakeAndVoteDelegation {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Credential}
  */
  abstract stakeCredential(): Credential;

  /**
  * @returns {Ed25519KeyHash}
  */
  abstract poolKeyhash(): Ed25519KeyHash;

  /**
  * @returns {DRep}
  */
  abstract drep(): DRep;

  /**
  * @param {Credential} stakeCredential
  * @param {Ed25519KeyHash} poolKeyhash
  * @param {DRep} drep
  * @returns {StakeAndVoteDelegation}
  */
  static new(stakeCredential: Credential, poolKeyhash: Ed25519KeyHash, drep: DRep): StakeAndVoteDelegation {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {boolean}
  */
  abstract hasScriptCredentials(): boolean;

}

export abstract class StakeDelegation extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {StakeDelegation}
  */
  static fromBytes(bytes: Uint8Array): StakeDelegation {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {StakeDelegation}
  */
  static fromHex(hexStr: string): StakeDelegation {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {StakeDelegation}
  */
  static fromJson(json: string): StakeDelegation {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Credential}
  */
  abstract stakeCredential(): Credential;

  /**
  * @returns {Ed25519KeyHash}
  */
  abstract poolKeyhash(): Ed25519KeyHash;

  /**
  * @param {Credential} stakeCredential
  * @param {Ed25519KeyHash} poolKeyhash
  * @returns {StakeDelegation}
  */
  static new(stakeCredential: Credential, poolKeyhash: Ed25519KeyHash): StakeDelegation {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {boolean}
  */
  abstract hasScriptCredentials(): boolean;

}

export abstract class StakeDeregistration extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {StakeDeregistration}
  */
  static fromBytes(bytes: Uint8Array): StakeDeregistration {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {StakeDeregistration}
  */
  static fromHex(hexStr: string): StakeDeregistration {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {StakeDeregistration}
  */
  static fromJson(json: string): StakeDeregistration {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Credential}
  */
  abstract stakeCredential(): Credential;

  /**
  * @returns {Optional<BigNum>}
  */
  abstract coin(): Optional<BigNum>;

  /**
  * @param {Credential} stakeCredential
  * @returns {StakeDeregistration}
  */
  static new(stakeCredential: Credential): StakeDeregistration {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Credential} stakeCredential
  * @param {BigNum} coin
  * @returns {StakeDeregistration}
  */
  static newWithExplicitRefund(stakeCredential: Credential, coin: BigNum): StakeDeregistration {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {boolean}
  */
  abstract hasScriptCredentials(): boolean;

}

export abstract class StakeRegistration extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {StakeRegistration}
  */
  static fromBytes(bytes: Uint8Array): StakeRegistration {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {StakeRegistration}
  */
  static fromHex(hexStr: string): StakeRegistration {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {StakeRegistration}
  */
  static fromJson(json: string): StakeRegistration {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Credential}
  */
  abstract stakeCredential(): Credential;

  /**
  * @returns {Optional<BigNum>}
  */
  abstract coin(): Optional<BigNum>;

  /**
  * @param {Credential} stakeCredential
  * @returns {StakeRegistration}
  */
  static new(stakeCredential: Credential): StakeRegistration {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Credential} stakeCredential
  * @param {BigNum} coin
  * @returns {StakeRegistration}
  */
  static newWithExplicitDeposit(stakeCredential: Credential, coin: BigNum): StakeRegistration {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {boolean}
  */
  abstract hasScriptCredentials(): boolean;

}

export abstract class StakeRegistrationAndDelegation extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {StakeRegistrationAndDelegation}
  */
  static fromBytes(bytes: Uint8Array): StakeRegistrationAndDelegation {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {StakeRegistrationAndDelegation}
  */
  static fromHex(hexStr: string): StakeRegistrationAndDelegation {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {StakeRegistrationAndDelegation}
  */
  static fromJson(json: string): StakeRegistrationAndDelegation {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Credential}
  */
  abstract stakeCredential(): Credential;

  /**
  * @returns {Ed25519KeyHash}
  */
  abstract poolKeyhash(): Ed25519KeyHash;

  /**
  * @returns {BigNum}
  */
  abstract coin(): BigNum;

  /**
  * @param {Credential} stakeCredential
  * @param {Ed25519KeyHash} poolKeyhash
  * @param {BigNum} coin
  * @returns {StakeRegistrationAndDelegation}
  */
  static new(stakeCredential: Credential, poolKeyhash: Ed25519KeyHash, coin: BigNum): StakeRegistrationAndDelegation {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {boolean}
  */
  abstract hasScriptCredentials(): boolean;

}

export abstract class StakeVoteRegistrationAndDelegation extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {StakeVoteRegistrationAndDelegation}
  */
  static fromBytes(bytes: Uint8Array): StakeVoteRegistrationAndDelegation {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {StakeVoteRegistrationAndDelegation}
  */
  static fromHex(hexStr: string): StakeVoteRegistrationAndDelegation {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {StakeVoteRegistrationAndDelegation}
  */
  static fromJson(json: string): StakeVoteRegistrationAndDelegation {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Credential}
  */
  abstract stakeCredential(): Credential;

  /**
  * @returns {Ed25519KeyHash}
  */
  abstract poolKeyhash(): Ed25519KeyHash;

  /**
  * @returns {DRep}
  */
  abstract drep(): DRep;

  /**
  * @returns {BigNum}
  */
  abstract coin(): BigNum;

  /**
  * @param {Credential} stakeCredential
  * @param {Ed25519KeyHash} poolKeyhash
  * @param {DRep} drep
  * @param {BigNum} coin
  * @returns {StakeVoteRegistrationAndDelegation}
  */
  static new(stakeCredential: Credential, poolKeyhash: Ed25519KeyHash, drep: DRep, coin: BigNum): StakeVoteRegistrationAndDelegation {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {boolean}
  */
  abstract hasScriptCredentials(): boolean;

}

export abstract class Strings extends _Ptr {
  /**
  * @returns {Strings}
  */
  static new(): Strings {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {number} index
  * @returns {string}
  */
  abstract get(index: number): string;

  /**
  * @param {string} elem
  */
  abstract add(elem: string): void;

}

export abstract class TimelockExpiry extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {TimelockExpiry}
  */
  static fromBytes(bytes: Uint8Array): TimelockExpiry {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {TimelockExpiry}
  */
  static fromHex(hexStr: string): TimelockExpiry {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {TimelockExpiry}
  */
  static fromJson(json: string): TimelockExpiry {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract slot(): number;

  /**
  * @returns {BigNum}
  */
  abstract slotBignum(): BigNum;

  /**
  * @param {number} slot
  * @returns {TimelockExpiry}
  */
  static new(slot: number): TimelockExpiry {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {BigNum} slot
  * @returns {TimelockExpiry}
  */
  static newTimelockexpiry(slot: BigNum): TimelockExpiry {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class TimelockStart extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {TimelockStart}
  */
  static fromBytes(bytes: Uint8Array): TimelockStart {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {TimelockStart}
  */
  static fromHex(hexStr: string): TimelockStart {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {TimelockStart}
  */
  static fromJson(json: string): TimelockStart {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract slot(): number;

  /**
  * @returns {BigNum}
  */
  abstract slotBignum(): BigNum;

  /**
  * @param {number} slot
  * @returns {TimelockStart}
  */
  static new(slot: number): TimelockStart {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {BigNum} slot
  * @returns {TimelockStart}
  */
  static newTimelockstart(slot: BigNum): TimelockStart {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class Transaction extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {Transaction}
  */
  static fromBytes(bytes: Uint8Array): Transaction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {Transaction}
  */
  static fromHex(hexStr: string): Transaction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {Transaction}
  */
  static fromJson(json: string): Transaction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {TransactionBody}
  */
  abstract body(): TransactionBody;

  /**
  * @returns {TransactionWitnessSet}
  */
  abstract witnessSet(): TransactionWitnessSet;

  /**
  * @returns {boolean}
  */
  abstract isValid(): boolean;

  /**
  * @returns {Optional<AuxiliaryData>}
  */
  abstract auxiliaryData(): Optional<AuxiliaryData>;

  /**
  * @param {boolean} valid
  */
  abstract setIsValid(valid: boolean): void;

  /**
  * @param {TransactionBody} body
  * @param {TransactionWitnessSet} witnessSet
  * @param {Optional<AuxiliaryData>} auxiliaryData
  * @returns {Transaction}
  */
  static new(body: TransactionBody, witnessSet: TransactionWitnessSet, auxiliaryData: Optional<AuxiliaryData>): Transaction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class TransactionBatch extends _Ptr {
  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {number} index
  * @returns {Transaction}
  */
  abstract get(index: number): Transaction;

}

export abstract class TransactionBatchList extends _Ptr {
  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {number} index
  * @returns {TransactionBatch}
  */
  abstract get(index: number): TransactionBatch;

}

export abstract class TransactionBodies extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {TransactionBodies}
  */
  static fromBytes(bytes: Uint8Array): TransactionBodies {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {TransactionBodies}
  */
  static fromHex(hexStr: string): TransactionBodies {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {TransactionBodies}
  */
  static fromJson(json: string): TransactionBodies {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {TransactionBodies}
  */
  static new(): TransactionBodies {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {number} index
  * @returns {TransactionBody}
  */
  abstract get(index: number): TransactionBody;

  /**
  * @param {TransactionBody} elem
  */
  abstract add(elem: TransactionBody): void;

}

export abstract class TransactionBody extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {TransactionBody}
  */
  static fromBytes(bytes: Uint8Array): TransactionBody {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {TransactionBody}
  */
  static fromHex(hexStr: string): TransactionBody {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {TransactionBody}
  */
  static fromJson(json: string): TransactionBody {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {TransactionInputs}
  */
  abstract inputs(): TransactionInputs;

  /**
  * @returns {TransactionOutputs}
  */
  abstract outputs(): TransactionOutputs;

  /**
  * @returns {BigNum}
  */
  abstract fee(): BigNum;

  /**
  * @returns {Optional<number>}
  */
  abstract ttl(): Optional<number>;

  /**
  * @returns {Optional<BigNum>}
  */
  abstract ttlBignum(): Optional<BigNum>;

  /**
  * @param {BigNum} ttl
  */
  abstract setTtl(ttl: BigNum): void;

  /**
  */
  abstract removeTtl(): void;

  /**
  * @param {Certificates} certs
  */
  abstract setCerts(certs: Certificates): void;

  /**
  * @returns {Optional<Certificates>}
  */
  abstract certs(): Optional<Certificates>;

  /**
  * @param {Withdrawals} withdrawals
  */
  abstract setWithdrawals(withdrawals: Withdrawals): void;

  /**
  * @returns {Optional<Withdrawals>}
  */
  abstract withdrawals(): Optional<Withdrawals>;

  /**
  * @param {Update} update
  */
  abstract setUpdate(update: Update): void;

  /**
  * @returns {Optional<Update>}
  */
  abstract update(): Optional<Update>;

  /**
  * @param {AuxiliaryDataHash} auxiliaryDataHash
  */
  abstract setAuxiliaryDataHash(auxiliaryDataHash: AuxiliaryDataHash): void;

  /**
  * @returns {Optional<AuxiliaryDataHash>}
  */
  abstract auxiliaryDataHash(): Optional<AuxiliaryDataHash>;

  /**
  * @param {number} validityStartInterval
  */
  abstract setValidityStartInterval(validityStartInterval: number): void;

  /**
  * @param {BigNum} validityStartInterval
  */
  abstract setValidityStartIntervalBignum(validityStartInterval: BigNum): void;

  /**
  * @returns {Optional<BigNum>}
  */
  abstract validityStartIntervalBignum(): Optional<BigNum>;

  /**
  * @returns {Optional<number>}
  */
  abstract validityStartInterval(): Optional<number>;

  /**
  * @param {Mint} mint
  */
  abstract setMint(mint: Mint): void;

  /**
  * @returns {Optional<Mint>}
  */
  abstract mint(): Optional<Mint>;

  /**
  * @param {TransactionInputs} referenceInputs
  */
  abstract setReferenceInputs(referenceInputs: TransactionInputs): void;

  /**
  * @returns {Optional<TransactionInputs>}
  */
  abstract referenceInputs(): Optional<TransactionInputs>;

  /**
  * @param {ScriptDataHash} scriptDataHash
  */
  abstract setScriptDataHash(scriptDataHash: ScriptDataHash): void;

  /**
  * @returns {Optional<ScriptDataHash>}
  */
  abstract scriptDataHash(): Optional<ScriptDataHash>;

  /**
  * @param {TransactionInputs} collateral
  */
  abstract setCollateral(collateral: TransactionInputs): void;

  /**
  * @returns {Optional<TransactionInputs>}
  */
  abstract collateral(): Optional<TransactionInputs>;

  /**
  * @param {Ed25519KeyHashes} requiredSigners
  */
  abstract setRequiredSigners(requiredSigners: Ed25519KeyHashes): void;

  /**
  * @returns {Optional<Ed25519KeyHashes>}
  */
  abstract requiredSigners(): Optional<Ed25519KeyHashes>;

  /**
  * @param {NetworkId} networkId
  */
  abstract setNetworkId(networkId: NetworkId): void;

  /**
  * @returns {Optional<NetworkId>}
  */
  abstract networkId(): Optional<NetworkId>;

  /**
  * @param {TransactionOutput} collateralReturn
  */
  abstract setCollateralReturn(collateralReturn: TransactionOutput): void;

  /**
  * @returns {Optional<TransactionOutput>}
  */
  abstract collateralReturn(): Optional<TransactionOutput>;

  /**
  * @param {BigNum} totalCollateral
  */
  abstract setTotalCollateral(totalCollateral: BigNum): void;

  /**
  * @returns {Optional<BigNum>}
  */
  abstract totalCollateral(): Optional<BigNum>;

  /**
  * @param {VotingProcedures} votingProcedures
  */
  abstract setVotingProcedures(votingProcedures: VotingProcedures): void;

  /**
  * @returns {Optional<VotingProcedures>}
  */
  abstract votingProcedures(): Optional<VotingProcedures>;

  /**
  * @param {VotingProposals} votingProposals
  */
  abstract setVotingProposals(votingProposals: VotingProposals): void;

  /**
  * @returns {Optional<VotingProposals>}
  */
  abstract votingProposals(): Optional<VotingProposals>;

  /**
  * @param {BigNum} donation
  */
  abstract setDonation(donation: BigNum): void;

  /**
  * @returns {Optional<BigNum>}
  */
  abstract donation(): Optional<BigNum>;

  /**
  * @param {BigNum} currentTreasuryValue
  */
  abstract setCurrentTreasuryValue(currentTreasuryValue: BigNum): void;

  /**
  * @returns {Optional<BigNum>}
  */
  abstract currentTreasuryValue(): Optional<BigNum>;

  /**
  * @param {TransactionInputs} inputs
  * @param {TransactionOutputs} outputs
  * @param {BigNum} fee
  * @param {Optional<number>} ttl
  * @returns {TransactionBody}
  */
  static new(inputs: TransactionInputs, outputs: TransactionOutputs, fee: BigNum, ttl: Optional<number>): TransactionBody {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {TransactionInputs} inputs
  * @param {TransactionOutputs} outputs
  * @param {BigNum} fee
  * @returns {TransactionBody}
  */
  static newTxBody(inputs: TransactionInputs, outputs: TransactionOutputs, fee: BigNum): TransactionBody {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class TransactionBuilder extends _Ptr {
  /**
  * @param {TransactionUnspentOutputs} inputs
  * @param {CoinSelectionStrategyCIP2} strategy
  * @returns {void}
  */
  abstract addInputsFrom(inputs: TransactionUnspentOutputs, strategy: CoinSelectionStrategyCIP2): void;

  /**
  * @param {TxInputsBuilder} inputs
  */
  abstract setInputs(inputs: TxInputsBuilder): void;

  /**
  * @param {TxInputsBuilder} collateral
  */
  abstract setCollateral(collateral: TxInputsBuilder): void;

  /**
  * @param {TransactionOutput} collateralReturn
  */
  abstract setCollateralReturn(collateralReturn: TransactionOutput): void;

  /**
  */
  abstract removeCollateralReturn(): void;

  /**
  * @param {TransactionOutput} collateralReturn
  * @returns {void}
  */
  abstract setCollateralReturnAndTotal(collateralReturn: TransactionOutput): void;

  /**
  * @param {BigNum} totalCollateral
  */
  abstract setTotalCollateral(totalCollateral: BigNum): void;

  /**
  */
  abstract removeTotalCollateral(): void;

  /**
  * @param {BigNum} totalCollateral
  * @param {Address} returnAddress
  * @returns {void}
  */
  abstract setTotalCollateralAndReturn(totalCollateral: BigNum, returnAddress: Address): void;

  /**
  * @param {TransactionInput} referenceInput
  */
  abstract addReferenceInput(referenceInput: TransactionInput): void;

  /**
  * @param {TransactionInput} referenceInput
  * @param {number} scriptSize
  */
  abstract addScriptReferenceInput(referenceInput: TransactionInput, scriptSize: number): void;

  /**
  * @param {Ed25519KeyHash} hash
  * @param {TransactionInput} input
  * @param {Value} amount
  */
  abstract addKeyInput(hash: Ed25519KeyHash, input: TransactionInput, amount: Value): void;

  /**
  * @param {NativeScript} script
  * @param {TransactionInput} input
  * @param {Value} amount
  */
  abstract addNativeScriptInput(script: NativeScript, input: TransactionInput, amount: Value): void;

  /**
  * @param {PlutusWitness} witness
  * @param {TransactionInput} input
  * @param {Value} amount
  */
  abstract addPlutusScriptInput(witness: PlutusWitness, input: TransactionInput, amount: Value): void;

  /**
  * @param {ByronAddress} hash
  * @param {TransactionInput} input
  * @param {Value} amount
  */
  abstract addBootstrapInput(hash: ByronAddress, input: TransactionInput, amount: Value): void;

  /**
  * @param {Address} address
  * @param {TransactionInput} input
  * @param {Value} amount
  * @returns {void}
  */
  abstract addRegularInput(address: Address, input: TransactionInput, amount: Value): void;

  /**
  * @param {TransactionUnspentOutputs} inputs
  * @param {CoinSelectionStrategyCIP2} strategy
  * @param {ChangeConfig} changeConfig
  * @returns {boolean}
  */
  abstract addInputsFromAndChange(inputs: TransactionUnspentOutputs, strategy: CoinSelectionStrategyCIP2, changeConfig: ChangeConfig): boolean;

  /**
  * @param {TransactionUnspentOutputs} inputs
  * @param {CoinSelectionStrategyCIP2} strategy
  * @param {ChangeConfig} changeConfig
  * @param {BigNum} collateralPercentage
  * @returns {void}
  */
  abstract addInputsFromAndChangeWithCollateralReturn(inputs: TransactionUnspentOutputs, strategy: CoinSelectionStrategyCIP2, changeConfig: ChangeConfig, collateralPercentage: BigNum): void;

  /**
  * @returns {Optional<NativeScripts>}
  */
  abstract getNativeInputScripts(): Optional<NativeScripts>;

  /**
  * @returns {Optional<PlutusWitnesses>}
  */
  abstract getPlutusInputScripts(): Optional<PlutusWitnesses>;

  /**
  * @param {Address} address
  * @param {TransactionInput} input
  * @param {Value} amount
  * @returns {BigNum}
  */
  abstract feeForInput(address: Address, input: TransactionInput, amount: Value): BigNum;

  /**
  * @param {TransactionOutput} output
  * @returns {void}
  */
  abstract addOutput(output: TransactionOutput): void;

  /**
  * @param {TransactionOutput} output
  * @returns {BigNum}
  */
  abstract feeForOutput(output: TransactionOutput): BigNum;

  /**
  * @param {BigNum} fee
  */
  abstract setFee(fee: BigNum): void;

  /**
  * @param {BigNum} fee
  */
  abstract setMinFee(fee: BigNum): void;

  /**
  * @param {number} ttl
  */
  abstract setTtl(ttl: number): void;

  /**
  * @param {BigNum} ttl
  */
  abstract setTtlBignum(ttl: BigNum): void;

  /**
  */
  abstract removeTtl(): void;

  /**
  * @param {number} validityStartInterval
  */
  abstract setValidityStartInterval(validityStartInterval: number): void;

  /**
  * @param {BigNum} validityStartInterval
  */
  abstract setValidityStartIntervalBignum(validityStartInterval: BigNum): void;

  /**
  */
  abstract removeValidityStartInterval(): void;

  /**
  * @param {Certificates} certs
  * @returns {void}
  */
  abstract setCerts(certs: Certificates): void;

  /**
  */
  abstract removeCerts(): void;

  /**
  * @param {CertificatesBuilder} certs
  */
  abstract setCertsBuilder(certs: CertificatesBuilder): void;

  /**
  * @param {Withdrawals} withdrawals
  * @returns {void}
  */
  abstract setWithdrawals(withdrawals: Withdrawals): void;

  /**
  * @param {WithdrawalsBuilder} withdrawals
  */
  abstract setWithdrawalsBuilder(withdrawals: WithdrawalsBuilder): void;

  /**
  * @param {VotingBuilder} votingBuilder
  */
  abstract setVotingBuilder(votingBuilder: VotingBuilder): void;

  /**
  * @param {VotingProposalBuilder} votingProposalBuilder
  */
  abstract setVotingProposalBuilder(votingProposalBuilder: VotingProposalBuilder): void;

  /**
  */
  abstract removeWithdrawals(): void;

  /**
  * @returns {Optional<AuxiliaryData>}
  */
  abstract getAuxiliaryData(): Optional<AuxiliaryData>;

  /**
  * @param {AuxiliaryData} auxiliaryData
  */
  abstract setAuxiliaryData(auxiliaryData: AuxiliaryData): void;

  /**
  */
  abstract removeAuxiliaryData(): void;

  /**
  * @param {GeneralTransactionMetadata} metadata
  */
  abstract setMetadata(metadata: GeneralTransactionMetadata): void;

  /**
  * @param {BigNum} key
  * @param {TransactionMetadatum} val
  */
  abstract addMetadatum(key: BigNum, val: TransactionMetadatum): void;

  /**
  * @param {BigNum} key
  * @param {string} val
  * @returns {void}
  */
  abstract addJsonMetadatum(key: BigNum, val: string): void;

  /**
  * @param {BigNum} key
  * @param {string} val
  * @param {MetadataJsonSchema} schema
  * @returns {void}
  */
  abstract addJsonMetadatumWithSchema(key: BigNum, val: string, schema: MetadataJsonSchema): void;

  /**
  * @param {MintBuilder} mintBuilder
  */
  abstract setMintBuilder(mintBuilder: MintBuilder): void;

  /**
  */
  abstract removeMintBuilder(): void;

  /**
  * @returns {Optional<MintBuilder>}
  */
  abstract getMintBuilder(): Optional<MintBuilder>;

  /**
  * @param {Mint} mint
  * @param {NativeScripts} mintScripts
  * @returns {void}
  */
  abstract setMint(mint: Mint, mintScripts: NativeScripts): void;

  /**
  * @returns {Optional<Mint>}
  */
  abstract getMint(): Optional<Mint>;

  /**
  * @returns {Optional<NativeScripts>}
  */
  abstract getMintScripts(): Optional<NativeScripts>;

  /**
  * @param {NativeScript} policyScript
  * @param {MintAssets} mintAssets
  * @returns {void}
  */
  abstract setMintAsset(policyScript: NativeScript, mintAssets: MintAssets): void;

  /**
  * @param {NativeScript} policyScript
  * @param {AssetName} assetName
  * @param {Int} amount
  * @returns {void}
  */
  abstract addMintAsset(policyScript: NativeScript, assetName: AssetName, amount: Int): void;

  /**
  * @param {NativeScript} policyScript
  * @param {AssetName} assetName
  * @param {Int} amount
  * @param {TransactionOutputAmountBuilder} outputBuilder
  * @param {BigNum} outputCoin
  * @returns {void}
  */
  abstract addMintAssetAndOutput(policyScript: NativeScript, assetName: AssetName, amount: Int, outputBuilder: TransactionOutputAmountBuilder, outputCoin: BigNum): void;

  /**
  * @param {NativeScript} policyScript
  * @param {AssetName} assetName
  * @param {Int} amount
  * @param {TransactionOutputAmountBuilder} outputBuilder
  * @returns {void}
  */
  abstract addMintAssetAndOutputMinRequiredCoin(policyScript: NativeScript, assetName: AssetName, amount: Int, outputBuilder: TransactionOutputAmountBuilder): void;

  /**
  * @param {PlutusData} datum
  */
  abstract addExtraWitnessDatum(datum: PlutusData): void;

  /**
  * @returns {Optional<PlutusList>}
  */
  abstract getExtraWitnessDatums(): Optional<PlutusList>;

  /**
  * @param {BigNum} donation
  */
  abstract setDonation(donation: BigNum): void;

  /**
  * @returns {Optional<BigNum>}
  */
  abstract getDonation(): Optional<BigNum>;

  /**
  * @param {BigNum} currentTreasuryValue
  * @returns {void}
  */
  abstract setCurrentTreasuryValue(currentTreasuryValue: BigNum): void;

  /**
  * @returns {Optional<BigNum>}
  */
  abstract getCurrentTreasuryValue(): Optional<BigNum>;

  /**
  * @param {TransactionBuilderConfig} cfg
  * @returns {TransactionBuilder}
  */
  static new(cfg: TransactionBuilderConfig): TransactionBuilder {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {TransactionInputs}
  */
  abstract getReferenceInputs(): TransactionInputs;

  /**
  * @returns {Value}
  */
  abstract getExplicitInput(): Value;

  /**
  * @returns {Value}
  */
  abstract getImplicitInput(): Value;

  /**
  * @returns {Value}
  */
  abstract getTotalInput(): Value;

  /**
  * @returns {Value}
  */
  abstract getTotalOutput(): Value;

  /**
  * @returns {Value}
  */
  abstract getExplicitOutput(): Value;

  /**
  * @returns {BigNum}
  */
  abstract getDeposit(): BigNum;

  /**
  * @returns {Optional<BigNum>}
  */
  abstract getFeeIfSet(): Optional<BigNum>;

  /**
  * @param {Address} address
  * @returns {boolean}
  */
  abstract addChangeIfNeeded(address: Address): boolean;

  /**
  * @param {Address} address
  * @param {OutputDatum} plutusData
  * @returns {boolean}
  */
  abstract addChangeIfNeededWithDatum(address: Address, plutusData: OutputDatum): boolean;

  /**
  * @param {Costmdls} costModels
  * @returns {void}
  */
  abstract calcScriptDataHash(costModels: Costmdls): void;

  /**
  * @param {ScriptDataHash} hash
  */
  abstract setScriptDataHash(hash: ScriptDataHash): void;

  /**
  */
  abstract removeScriptDataHash(): void;

  /**
  * @param {Ed25519KeyHash} key
  */
  abstract addRequiredSigner(key: Ed25519KeyHash): void;

  /**
  * @returns {number}
  */
  abstract fullSize(): number;

  /**
  * @returns {Uint32Array}
  */
  abstract outputSizes(): Uint32Array;

  /**
  * @returns {TransactionBody}
  */
  abstract build(): TransactionBody;

  /**
  * @returns {Transaction}
  */
  abstract buildTx(): Transaction;

  /**
  * @returns {Transaction}
  */
  abstract buildTxUnsafe(): Transaction;

  /**
  * @returns {BigNum}
  */
  abstract minFee(): BigNum;

}

export abstract class TransactionBuilderConfig extends _Ptr {
}

export abstract class TransactionBuilderConfigBuilder extends _Ptr {
  /**
  * @returns {TransactionBuilderConfigBuilder}
  */
  static new(): TransactionBuilderConfigBuilder {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {LinearFee} feeAlgo
  * @returns {TransactionBuilderConfigBuilder}
  */
  abstract feeAlgo(feeAlgo: LinearFee): TransactionBuilderConfigBuilder;

  /**
  * @param {BigNum} coinsPerUtxoByte
  * @returns {TransactionBuilderConfigBuilder}
  */
  abstract coinsPerUtxoByte(coinsPerUtxoByte: BigNum): TransactionBuilderConfigBuilder;

  /**
  * @param {ExUnitPrices} exUnitPrices
  * @returns {TransactionBuilderConfigBuilder}
  */
  abstract exUnitPrices(exUnitPrices: ExUnitPrices): TransactionBuilderConfigBuilder;

  /**
  * @param {BigNum} poolDeposit
  * @returns {TransactionBuilderConfigBuilder}
  */
  abstract poolDeposit(poolDeposit: BigNum): TransactionBuilderConfigBuilder;

  /**
  * @param {BigNum} keyDeposit
  * @returns {TransactionBuilderConfigBuilder}
  */
  abstract keyDeposit(keyDeposit: BigNum): TransactionBuilderConfigBuilder;

  /**
  * @param {number} maxValueSize
  * @returns {TransactionBuilderConfigBuilder}
  */
  abstract maxValueSize(maxValueSize: number): TransactionBuilderConfigBuilder;

  /**
  * @param {number} maxTxSize
  * @returns {TransactionBuilderConfigBuilder}
  */
  abstract maxTxSize(maxTxSize: number): TransactionBuilderConfigBuilder;

  /**
  * @param {UnitInterval} refScriptCoinsPerByte
  * @returns {TransactionBuilderConfigBuilder}
  */
  abstract refScriptCoinsPerByte(refScriptCoinsPerByte: UnitInterval): TransactionBuilderConfigBuilder;

  /**
  * @param {boolean} preferPureChange
  * @returns {TransactionBuilderConfigBuilder}
  */
  abstract preferPureChange(preferPureChange: boolean): TransactionBuilderConfigBuilder;

  /**
  * @param {boolean} deduplicateExplicitRefInputsWithRegularInputs
  * @returns {TransactionBuilderConfigBuilder}
  */
  abstract deduplicateExplicitRefInputsWithRegularInputs(deduplicateExplicitRefInputsWithRegularInputs: boolean): TransactionBuilderConfigBuilder;

  /**
  * @param {boolean} doNotBurnExtraChange
  * @returns {TransactionBuilderConfigBuilder}
  */
  abstract doNotBurnExtraChange(doNotBurnExtraChange: boolean): TransactionBuilderConfigBuilder;

  /**
  * @returns {TransactionBuilderConfig}
  */
  abstract build(): TransactionBuilderConfig;

}

export abstract class TransactionHash extends _Ptr {
  /**
  * @param {Uint8Array} bytes
  * @returns {TransactionHash}
  */
  static fromBytes(bytes: Uint8Array): TransactionHash {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {string} prefix
  * @returns {string}
  */
  abstract toBech32(prefix: string): string;

  /**
  * @param {string} bechStr
  * @returns {TransactionHash}
  */
  static fromBech32(bechStr: string): TransactionHash {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hex
  * @returns {TransactionHash}
  */
  static fromHex(hex: string): TransactionHash {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class TransactionInput extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {TransactionInput}
  */
  static fromBytes(bytes: Uint8Array): TransactionInput {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {TransactionInput}
  */
  static fromHex(hexStr: string): TransactionInput {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {TransactionInput}
  */
  static fromJson(json: string): TransactionInput {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {TransactionHash}
  */
  abstract transactionId(): TransactionHash;

  /**
  * @returns {number}
  */
  abstract index(): number;

  /**
  * @param {TransactionHash} transactionId
  * @param {number} index
  * @returns {TransactionInput}
  */
  static new(transactionId: TransactionHash, index: number): TransactionInput {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class TransactionInputs extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {TransactionInputs}
  */
  static fromBytes(bytes: Uint8Array): TransactionInputs {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {TransactionInputs}
  */
  static fromHex(hexStr: string): TransactionInputs {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {TransactionInputs}
  */
  static fromJson(json: string): TransactionInputs {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {TransactionInputs}
  */
  static new(): TransactionInputs {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {number} index
  * @returns {TransactionInput}
  */
  abstract get(index: number): TransactionInput;

  /**
  * @param {TransactionInput} input
  * @returns {boolean}
  */
  abstract add(input: TransactionInput): boolean;

  /**
  * @returns {Optional<TransactionInputs>}
  */
  abstract toOption(): Optional<TransactionInputs>;

}

export abstract class TransactionMetadatum extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {TransactionMetadatum}
  */
  static fromBytes(bytes: Uint8Array): TransactionMetadatum {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {TransactionMetadatum}
  */
  static fromHex(hexStr: string): TransactionMetadatum {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {MetadataMap} map
  * @returns {TransactionMetadatum}
  */
  static newMap(map: MetadataMap): TransactionMetadatum {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {MetadataList} list
  * @returns {TransactionMetadatum}
  */
  static newList(list: MetadataList): TransactionMetadatum {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Int} intValue
  * @returns {TransactionMetadatum}
  */
  static newInt(intValue: Int): TransactionMetadatum {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Uint8Array} bytes
  * @returns {TransactionMetadatum}
  */
  static newBytes(bytes: Uint8Array): TransactionMetadatum {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {string} text
  * @returns {TransactionMetadatum}
  */
  static newText(text: string): TransactionMetadatum {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {TransactionMetadatumKind}
  */
  abstract kind(): TransactionMetadatumKind;

  /**
  * @returns {MetadataMap}
  */
  abstract asMap(): MetadataMap;

  /**
  * @returns {MetadataList}
  */
  abstract asList(): MetadataList;

  /**
  * @returns {Int}
  */
  abstract asInt(): Int;

  /**
  * @returns {Uint8Array}
  */
  abstract asBytes(): Uint8Array;

  /**
  * @returns {string}
  */
  abstract asText(): string;

}

export abstract class TransactionMetadatumLabels extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {TransactionMetadatumLabels}
  */
  static fromBytes(bytes: Uint8Array): TransactionMetadatumLabels {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {TransactionMetadatumLabels}
  */
  static fromHex(hexStr: string): TransactionMetadatumLabels {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {TransactionMetadatumLabels}
  */
  static new(): TransactionMetadatumLabels {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {number} index
  * @returns {BigNum}
  */
  abstract get(index: number): BigNum;

  /**
  * @param {BigNum} elem
  */
  abstract add(elem: BigNum): void;

}

export abstract class TransactionOutput extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {TransactionOutput}
  */
  static fromBytes(bytes: Uint8Array): TransactionOutput {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {TransactionOutput}
  */
  static fromHex(hexStr: string): TransactionOutput {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {TransactionOutput}
  */
  static fromJson(json: string): TransactionOutput {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Address}
  */
  abstract address(): Address;

  /**
  * @returns {Value}
  */
  abstract amount(): Value;

  /**
  * @returns {Optional<DataHash>}
  */
  abstract dataHash(): Optional<DataHash>;

  /**
  * @returns {Optional<PlutusData>}
  */
  abstract plutusData(): Optional<PlutusData>;

  /**
  * @returns {Optional<ScriptRef>}
  */
  abstract scriptRef(): Optional<ScriptRef>;

  /**
  * @param {ScriptRef} scriptRef
  */
  abstract setScriptRef(scriptRef: ScriptRef): void;

  /**
  * @param {PlutusData} data
  */
  abstract setPlutusData(data: PlutusData): void;

  /**
  * @param {DataHash} dataHash
  */
  abstract setDataHash(dataHash: DataHash): void;

  /**
  * @returns {boolean}
  */
  abstract hasPlutusData(): boolean;

  /**
  * @returns {boolean}
  */
  abstract hasDataHash(): boolean;

  /**
  * @returns {boolean}
  */
  abstract hasScriptRef(): boolean;

  /**
  * @param {Address} address
  * @param {Value} amount
  * @returns {TransactionOutput}
  */
  static new(address: Address, amount: Value): TransactionOutput {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Optional<CborContainerType>}
  */
  abstract serializationFormat(): Optional<CborContainerType>;

}

export abstract class TransactionOutputAmountBuilder extends _Ptr {
  /**
  * @param {Value} amount
  * @returns {TransactionOutputAmountBuilder}
  */
  abstract withValue(amount: Value): TransactionOutputAmountBuilder;

  /**
  * @param {BigNum} coin
  * @returns {TransactionOutputAmountBuilder}
  */
  abstract withCoin(coin: BigNum): TransactionOutputAmountBuilder;

  /**
  * @param {BigNum} coin
  * @param {MultiAsset} multiasset
  * @returns {TransactionOutputAmountBuilder}
  */
  abstract withCoinAndAsset(coin: BigNum, multiasset: MultiAsset): TransactionOutputAmountBuilder;

  /**
  * @param {MultiAsset} multiasset
  * @param {DataCost} dataCost
  * @returns {TransactionOutputAmountBuilder}
  */
  abstract withAssetAndMinRequiredCoinByUtxoCost(multiasset: MultiAsset, dataCost: DataCost): TransactionOutputAmountBuilder;

  /**
  * @returns {TransactionOutput}
  */
  abstract build(): TransactionOutput;

}

export abstract class TransactionOutputBuilder extends _Ptr {
  /**
  * @returns {TransactionOutputBuilder}
  */
  static new(): TransactionOutputBuilder {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Address} address
  * @returns {TransactionOutputBuilder}
  */
  abstract withAddress(address: Address): TransactionOutputBuilder;

  /**
  * @param {DataHash} dataHash
  * @returns {TransactionOutputBuilder}
  */
  abstract withDataHash(dataHash: DataHash): TransactionOutputBuilder;

  /**
  * @param {PlutusData} data
  * @returns {TransactionOutputBuilder}
  */
  abstract withPlutusData(data: PlutusData): TransactionOutputBuilder;

  /**
  * @param {ScriptRef} scriptRef
  * @returns {TransactionOutputBuilder}
  */
  abstract withScriptRef(scriptRef: ScriptRef): TransactionOutputBuilder;

  /**
  * @returns {TransactionOutputAmountBuilder}
  */
  abstract next(): TransactionOutputAmountBuilder;

}

export abstract class TransactionOutputs extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {TransactionOutputs}
  */
  static fromBytes(bytes: Uint8Array): TransactionOutputs {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {TransactionOutputs}
  */
  static fromHex(hexStr: string): TransactionOutputs {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {TransactionOutputs}
  */
  static fromJson(json: string): TransactionOutputs {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {TransactionOutputs}
  */
  static new(): TransactionOutputs {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {number} index
  * @returns {TransactionOutput}
  */
  abstract get(index: number): TransactionOutput;

  /**
  * @param {TransactionOutput} elem
  */
  abstract add(elem: TransactionOutput): void;

}

export abstract class TransactionUnspentOutput extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {TransactionUnspentOutput}
  */
  static fromBytes(bytes: Uint8Array): TransactionUnspentOutput {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {TransactionUnspentOutput}
  */
  static fromHex(hexStr: string): TransactionUnspentOutput {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {TransactionUnspentOutput}
  */
  static fromJson(json: string): TransactionUnspentOutput {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {TransactionInput} input
  * @param {TransactionOutput} output
  * @returns {TransactionUnspentOutput}
  */
  static new(input: TransactionInput, output: TransactionOutput): TransactionUnspentOutput {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {TransactionInput}
  */
  abstract input(): TransactionInput;

  /**
  * @returns {TransactionOutput}
  */
  abstract output(): TransactionOutput;

}

export abstract class TransactionUnspentOutputs extends _Ptr {
  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {TransactionUnspentOutputs}
  */
  static fromJson(json: string): TransactionUnspentOutputs {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {TransactionUnspentOutputs}
  */
  static new(): TransactionUnspentOutputs {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {number} index
  * @returns {TransactionUnspentOutput}
  */
  abstract get(index: number): TransactionUnspentOutput;

  /**
  * @param {TransactionUnspentOutput} elem
  */
  abstract add(elem: TransactionUnspentOutput): void;

}

export abstract class TransactionWitnessSet extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {TransactionWitnessSet}
  */
  static fromBytes(bytes: Uint8Array): TransactionWitnessSet {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {TransactionWitnessSet}
  */
  static fromHex(hexStr: string): TransactionWitnessSet {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {TransactionWitnessSet}
  */
  static fromJson(json: string): TransactionWitnessSet {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Vkeywitnesses} vkeys
  */
  abstract setVkeys(vkeys: Vkeywitnesses): void;

  /**
  * @returns {Optional<Vkeywitnesses>}
  */
  abstract vkeys(): Optional<Vkeywitnesses>;

  /**
  * @param {NativeScripts} nativeScripts
  */
  abstract setNativeScripts(nativeScripts: NativeScripts): void;

  /**
  * @returns {Optional<NativeScripts>}
  */
  abstract nativeScripts(): Optional<NativeScripts>;

  /**
  * @param {BootstrapWitnesses} bootstraps
  */
  abstract setBootstraps(bootstraps: BootstrapWitnesses): void;

  /**
  * @returns {Optional<BootstrapWitnesses>}
  */
  abstract bootstraps(): Optional<BootstrapWitnesses>;

  /**
  * @param {PlutusScripts} plutusScripts
  */
  abstract setPlutusScripts(plutusScripts: PlutusScripts): void;

  /**
  * @returns {Optional<PlutusScripts>}
  */
  abstract plutusScripts(): Optional<PlutusScripts>;

  /**
  * @param {PlutusList} plutusData
  */
  abstract setPlutusData(plutusData: PlutusList): void;

  /**
  * @returns {Optional<PlutusList>}
  */
  abstract plutusData(): Optional<PlutusList>;

  /**
  * @param {Redeemers} redeemers
  */
  abstract setRedeemers(redeemers: Redeemers): void;

  /**
  * @returns {Optional<Redeemers>}
  */
  abstract redeemers(): Optional<Redeemers>;

  /**
  * @returns {TransactionWitnessSet}
  */
  static new(): TransactionWitnessSet {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class TransactionWitnessSets extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {TransactionWitnessSets}
  */
  static fromBytes(bytes: Uint8Array): TransactionWitnessSets {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {TransactionWitnessSets}
  */
  static fromHex(hexStr: string): TransactionWitnessSets {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {TransactionWitnessSets}
  */
  static fromJson(json: string): TransactionWitnessSets {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {TransactionWitnessSets}
  */
  static new(): TransactionWitnessSets {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {number} index
  * @returns {TransactionWitnessSet}
  */
  abstract get(index: number): TransactionWitnessSet;

  /**
  * @param {TransactionWitnessSet} elem
  */
  abstract add(elem: TransactionWitnessSet): void;

}

export abstract class TreasuryWithdrawals extends _Ptr {
  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {TreasuryWithdrawals}
  */
  static fromJson(json: string): TreasuryWithdrawals {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {TreasuryWithdrawals}
  */
  static new(): TreasuryWithdrawals {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {RewardAddress} key
  * @returns {Optional<BigNum>}
  */
  abstract get(key: RewardAddress): Optional<BigNum>;

  /**
  * @param {RewardAddress} key
  * @param {BigNum} value
  */
  abstract insert(key: RewardAddress, value: BigNum): void;

  /**
  * @returns {RewardAddresses}
  */
  abstract keys(): RewardAddresses;

  /**
  * @returns {number}
  */
  abstract len(): number;

}

export abstract class TreasuryWithdrawalsAction extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {TreasuryWithdrawalsAction}
  */
  static fromBytes(bytes: Uint8Array): TreasuryWithdrawalsAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {TreasuryWithdrawalsAction}
  */
  static fromHex(hexStr: string): TreasuryWithdrawalsAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {TreasuryWithdrawalsAction}
  */
  static fromJson(json: string): TreasuryWithdrawalsAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {TreasuryWithdrawals}
  */
  abstract withdrawals(): TreasuryWithdrawals;

  /**
  * @returns {Optional<ScriptHash>}
  */
  abstract policyHash(): Optional<ScriptHash>;

  /**
  * @param {TreasuryWithdrawals} withdrawals
  * @returns {TreasuryWithdrawalsAction}
  */
  static new(withdrawals: TreasuryWithdrawals): TreasuryWithdrawalsAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {TreasuryWithdrawals} withdrawals
  * @param {ScriptHash} policyHash
  * @returns {TreasuryWithdrawalsAction}
  */
  static newWithPolicyHash(withdrawals: TreasuryWithdrawals, policyHash: ScriptHash): TreasuryWithdrawalsAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class TxInputsBuilder extends _Ptr {
  /**
  * @returns {TxInputsBuilder}
  */
  static new(): TxInputsBuilder {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {TransactionUnspentOutput} utxo
  * @returns {void}
  */
  abstract addRegularUtxo(utxo: TransactionUnspentOutput): void;

  /**
  * @param {TransactionUnspentOutput} utxo
  * @param {PlutusWitness} witness
  * @returns {void}
  */
  abstract addPlutusScriptUtxo(utxo: TransactionUnspentOutput, witness: PlutusWitness): void;

  /**
  * @param {TransactionUnspentOutput} utxo
  * @param {NativeScriptSource} witness
  * @returns {void}
  */
  abstract addNativeScriptUtxo(utxo: TransactionUnspentOutput, witness: NativeScriptSource): void;

  /**
  * @param {Ed25519KeyHash} hash
  * @param {TransactionInput} input
  * @param {Value} amount
  */
  abstract addKeyInput(hash: Ed25519KeyHash, input: TransactionInput, amount: Value): void;

  /**
  * @param {NativeScriptSource} script
  * @param {TransactionInput} input
  * @param {Value} amount
  */
  abstract addNativeScriptInput(script: NativeScriptSource, input: TransactionInput, amount: Value): void;

  /**
  * @param {PlutusWitness} witness
  * @param {TransactionInput} input
  * @param {Value} amount
  */
  abstract addPlutusScriptInput(witness: PlutusWitness, input: TransactionInput, amount: Value): void;

  /**
  * @param {ByronAddress} address
  * @param {TransactionInput} input
  * @param {Value} amount
  */
  abstract addBootstrapInput(address: ByronAddress, input: TransactionInput, amount: Value): void;

  /**
  * @param {Address} address
  * @param {TransactionInput} input
  * @param {Value} amount
  * @returns {void}
  */
  abstract addRegularInput(address: Address, input: TransactionInput, amount: Value): void;

  /**
  * @returns {TransactionInputs}
  */
  abstract getRefInputs(): TransactionInputs;

  /**
  * @returns {Optional<NativeScripts>}
  */
  abstract getNativeInputScripts(): Optional<NativeScripts>;

  /**
  * @returns {Optional<PlutusWitnesses>}
  */
  abstract getPlutusInputScripts(): Optional<PlutusWitnesses>;

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {Ed25519KeyHash} key
  */
  abstract addRequiredSigner(key: Ed25519KeyHash): void;

  /**
  * @param {Ed25519KeyHashes} keys
  */
  abstract addRequiredSigners(keys: Ed25519KeyHashes): void;

  /**
  * @returns {Value}
  */
  abstract totalValue(): Value;

  /**
  * @returns {TransactionInputs}
  */
  abstract inputs(): TransactionInputs;

  /**
  * @returns {Optional<TransactionInputs>}
  */
  abstract inputsOption(): Optional<TransactionInputs>;

}

export abstract class URL extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {URL}
  */
  static fromBytes(bytes: Uint8Array): URL {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {URL}
  */
  static fromHex(hexStr: string): URL {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {URL}
  */
  static fromJson(json: string): URL {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {string} url
  * @returns {URL}
  */
  static new(url: string): URL {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract url(): string;

}

export abstract class UnitInterval extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {UnitInterval}
  */
  static fromBytes(bytes: Uint8Array): UnitInterval {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {UnitInterval}
  */
  static fromHex(hexStr: string): UnitInterval {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {UnitInterval}
  */
  static fromJson(json: string): UnitInterval {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {BigNum}
  */
  abstract numerator(): BigNum;

  /**
  * @returns {BigNum}
  */
  abstract denominator(): BigNum;

  /**
  * @param {BigNum} numerator
  * @param {BigNum} denominator
  * @returns {UnitInterval}
  */
  static new(numerator: BigNum, denominator: BigNum): UnitInterval {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class Update extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {Update}
  */
  static fromBytes(bytes: Uint8Array): Update {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {Update}
  */
  static fromHex(hexStr: string): Update {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {Update}
  */
  static fromJson(json: string): Update {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {ProposedProtocolParameterUpdates}
  */
  abstract proposedProtocolParameterUpdates(): ProposedProtocolParameterUpdates;

  /**
  * @returns {number}
  */
  abstract epoch(): number;

  /**
  * @param {ProposedProtocolParameterUpdates} proposedProtocolParameterUpdates
  * @param {number} epoch
  * @returns {Update}
  */
  static new(proposedProtocolParameterUpdates: ProposedProtocolParameterUpdates, epoch: number): Update {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class UpdateCommitteeAction extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {UpdateCommitteeAction}
  */
  static fromBytes(bytes: Uint8Array): UpdateCommitteeAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {UpdateCommitteeAction}
  */
  static fromHex(hexStr: string): UpdateCommitteeAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {UpdateCommitteeAction}
  */
  static fromJson(json: string): UpdateCommitteeAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Optional<GovernanceActionId>}
  */
  abstract govActionId(): Optional<GovernanceActionId>;

  /**
  * @returns {Committee}
  */
  abstract committee(): Committee;

  /**
  * @returns {Credentials}
  */
  abstract membersToRemove(): Credentials;

  /**
  * @param {Committee} committee
  * @param {Credentials} membersToRemove
  * @returns {UpdateCommitteeAction}
  */
  static new(committee: Committee, membersToRemove: Credentials): UpdateCommitteeAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {GovernanceActionId} govActionId
  * @param {Committee} committee
  * @param {Credentials} membersToRemove
  * @returns {UpdateCommitteeAction}
  */
  static newWithActionId(govActionId: GovernanceActionId, committee: Committee, membersToRemove: Credentials): UpdateCommitteeAction {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class VRFCert extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {VRFCert}
  */
  static fromBytes(bytes: Uint8Array): VRFCert {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {VRFCert}
  */
  static fromHex(hexStr: string): VRFCert {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {VRFCert}
  */
  static fromJson(json: string): VRFCert {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Uint8Array}
  */
  abstract output(): Uint8Array;

  /**
  * @returns {Uint8Array}
  */
  abstract proof(): Uint8Array;

  /**
  * @param {Uint8Array} output
  * @param {Uint8Array} proof
  * @returns {VRFCert}
  */
  static new(output: Uint8Array, proof: Uint8Array): VRFCert {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class VRFKeyHash extends _Ptr {
  /**
  * @param {Uint8Array} bytes
  * @returns {VRFKeyHash}
  */
  static fromBytes(bytes: Uint8Array): VRFKeyHash {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {string} prefix
  * @returns {string}
  */
  abstract toBech32(prefix: string): string;

  /**
  * @param {string} bechStr
  * @returns {VRFKeyHash}
  */
  static fromBech32(bechStr: string): VRFKeyHash {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hex
  * @returns {VRFKeyHash}
  */
  static fromHex(hex: string): VRFKeyHash {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class VRFVKey extends _Ptr {
  /**
  * @param {Uint8Array} bytes
  * @returns {VRFVKey}
  */
  static fromBytes(bytes: Uint8Array): VRFVKey {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {string} prefix
  * @returns {string}
  */
  abstract toBech32(prefix: string): string;

  /**
  * @param {string} bechStr
  * @returns {VRFVKey}
  */
  static fromBech32(bechStr: string): VRFVKey {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hex
  * @returns {VRFVKey}
  */
  static fromHex(hex: string): VRFVKey {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class Value extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {Value}
  */
  static fromBytes(bytes: Uint8Array): Value {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {Value}
  */
  static fromHex(hexStr: string): Value {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {Value}
  */
  static fromJson(json: string): Value {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {BigNum} coin
  * @returns {Value}
  */
  static new(coin: BigNum): Value {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {MultiAsset} multiasset
  * @returns {Value}
  */
  static newFromAssets(multiasset: MultiAsset): Value {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {BigNum} coin
  * @param {MultiAsset} multiasset
  * @returns {Value}
  */
  static newWithAssets(coin: BigNum, multiasset: MultiAsset): Value {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Value}
  */
  static zero(): Value {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {boolean}
  */
  abstract isZero(): boolean;

  /**
  * @returns {BigNum}
  */
  abstract coin(): BigNum;

  /**
  * @param {BigNum} coin
  */
  abstract setCoin(coin: BigNum): void;

  /**
  * @returns {Optional<MultiAsset>}
  */
  abstract multiasset(): Optional<MultiAsset>;

  /**
  * @param {MultiAsset} multiasset
  */
  abstract setMultiasset(multiasset: MultiAsset): void;

  /**
  * @param {Value} rhs
  * @returns {Value}
  */
  abstract checkedAdd(rhs: Value): Value;

  /**
  * @param {Value} rhsValue
  * @returns {Value}
  */
  abstract checkedSub(rhsValue: Value): Value;

  /**
  * @param {Value} rhsValue
  * @returns {Value}
  */
  abstract clampedSub(rhsValue: Value): Value;

  /**
  * @param {Value} rhsValue
  * @returns {Optional<number>}
  */
  abstract compare(rhsValue: Value): Optional<number>;

}

export abstract class VersionedBlock extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {VersionedBlock}
  */
  static fromBytes(bytes: Uint8Array): VersionedBlock {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {VersionedBlock}
  */
  static fromHex(hexStr: string): VersionedBlock {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {VersionedBlock}
  */
  static fromJson(json: string): VersionedBlock {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Block} block
  * @param {number} eraCode
  * @returns {VersionedBlock}
  */
  static new(block: Block, eraCode: number): VersionedBlock {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Block}
  */
  abstract block(): Block;

  /**
  * @returns {BlockEra}
  */
  abstract era(): BlockEra;

}

export abstract class Vkey extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {Vkey}
  */
  static fromBytes(bytes: Uint8Array): Vkey {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {Vkey}
  */
  static fromHex(hexStr: string): Vkey {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {Vkey}
  */
  static fromJson(json: string): Vkey {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {PublicKey} pk
  * @returns {Vkey}
  */
  static new(pk: PublicKey): Vkey {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {PublicKey}
  */
  abstract publicKey(): PublicKey;

}

export abstract class Vkeys extends _Ptr {
  /**
  * @returns {Vkeys}
  */
  static new(): Vkeys {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {number} index
  * @returns {Vkey}
  */
  abstract get(index: number): Vkey;

  /**
  * @param {Vkey} elem
  */
  abstract add(elem: Vkey): void;

}

export abstract class Vkeywitness extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {Vkeywitness}
  */
  static fromBytes(bytes: Uint8Array): Vkeywitness {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {Vkeywitness}
  */
  static fromHex(hexStr: string): Vkeywitness {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {Vkeywitness}
  */
  static fromJson(json: string): Vkeywitness {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Vkey} vkey
  * @param {Ed25519Signature} signature
  * @returns {Vkeywitness}
  */
  static new(vkey: Vkey, signature: Ed25519Signature): Vkeywitness {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Vkey}
  */
  abstract vkey(): Vkey;

  /**
  * @returns {Ed25519Signature}
  */
  abstract signature(): Ed25519Signature;

}

export abstract class Vkeywitnesses extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {Vkeywitnesses}
  */
  static fromBytes(bytes: Uint8Array): Vkeywitnesses {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {Vkeywitnesses}
  */
  static fromHex(hexStr: string): Vkeywitnesses {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {Vkeywitnesses}
  */
  static fromJson(json: string): Vkeywitnesses {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Vkeywitnesses}
  */
  static new(): Vkeywitnesses {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {number} index
  * @returns {Vkeywitness}
  */
  abstract get(index: number): Vkeywitness;

  /**
  * @param {Vkeywitness} witness
  * @returns {boolean}
  */
  abstract add(witness: Vkeywitness): boolean;

}

export abstract class VoteDelegation extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {VoteDelegation}
  */
  static fromBytes(bytes: Uint8Array): VoteDelegation {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {VoteDelegation}
  */
  static fromHex(hexStr: string): VoteDelegation {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {VoteDelegation}
  */
  static fromJson(json: string): VoteDelegation {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Credential}
  */
  abstract stakeCredential(): Credential;

  /**
  * @returns {DRep}
  */
  abstract drep(): DRep;

  /**
  * @param {Credential} stakeCredential
  * @param {DRep} drep
  * @returns {VoteDelegation}
  */
  static new(stakeCredential: Credential, drep: DRep): VoteDelegation {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {boolean}
  */
  abstract hasScriptCredentials(): boolean;

}

export abstract class VoteRegistrationAndDelegation extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {VoteRegistrationAndDelegation}
  */
  static fromBytes(bytes: Uint8Array): VoteRegistrationAndDelegation {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {VoteRegistrationAndDelegation}
  */
  static fromHex(hexStr: string): VoteRegistrationAndDelegation {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {VoteRegistrationAndDelegation}
  */
  static fromJson(json: string): VoteRegistrationAndDelegation {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Credential}
  */
  abstract stakeCredential(): Credential;

  /**
  * @returns {DRep}
  */
  abstract drep(): DRep;

  /**
  * @returns {BigNum}
  */
  abstract coin(): BigNum;

  /**
  * @param {Credential} stakeCredential
  * @param {DRep} drep
  * @param {BigNum} coin
  * @returns {VoteRegistrationAndDelegation}
  */
  static new(stakeCredential: Credential, drep: DRep, coin: BigNum): VoteRegistrationAndDelegation {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {boolean}
  */
  abstract hasScriptCredentials(): boolean;

}

export abstract class Voter extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {Voter}
  */
  static fromBytes(bytes: Uint8Array): Voter {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {Voter}
  */
  static fromHex(hexStr: string): Voter {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {Voter}
  */
  static fromJson(json: string): Voter {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Credential} cred
  * @returns {Voter}
  */
  static newConstitutionalCommitteeHotCredential(cred: Credential): Voter {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Credential} cred
  * @returns {Voter}
  */
  static newDrepCredential(cred: Credential): Voter {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Ed25519KeyHash} keyHash
  * @returns {Voter}
  */
  static newStakePoolKeyHash(keyHash: Ed25519KeyHash): Voter {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {VoterKind}
  */
  abstract kind(): VoterKind;

  /**
  * @returns {Optional<Credential>}
  */
  abstract toConstitutionalCommitteeHotCredential(): Optional<Credential>;

  /**
  * @returns {Optional<Credential>}
  */
  abstract toDrepCredential(): Optional<Credential>;

  /**
  * @returns {Optional<Ed25519KeyHash>}
  */
  abstract toStakePoolKeyHash(): Optional<Ed25519KeyHash>;

  /**
  * @returns {boolean}
  */
  abstract hasScriptCredentials(): boolean;

  /**
  * @returns {Optional<Ed25519KeyHash>}
  */
  abstract toKeyHash(): Optional<Ed25519KeyHash>;

}

export abstract class Voters extends _Ptr {
  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {Voters}
  */
  static fromJson(json: string): Voters {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Voters}
  */
  static new(): Voters {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Voter} voter
  */
  abstract add(voter: Voter): void;

  /**
  * @param {number} index
  * @returns {Optional<Voter>}
  */
  abstract get(index: number): Optional<Voter>;

  /**
  * @returns {number}
  */
  abstract len(): number;

}

export abstract class VotingBuilder extends _Ptr {
  /**
  * @returns {VotingBuilder}
  */
  static new(): VotingBuilder {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Voter} voter
  * @param {GovernanceActionId} govActionId
  * @param {VotingProcedure} votingProcedure
  * @returns {void}
  */
  abstract add(voter: Voter, govActionId: GovernanceActionId, votingProcedure: VotingProcedure): void;

  /**
  * @param {Voter} voter
  * @param {GovernanceActionId} govActionId
  * @param {VotingProcedure} votingProcedure
  * @param {PlutusWitness} witness
  * @returns {void}
  */
  abstract addWithPlutusWitness(voter: Voter, govActionId: GovernanceActionId, votingProcedure: VotingProcedure, witness: PlutusWitness): void;

  /**
  * @param {Voter} voter
  * @param {GovernanceActionId} govActionId
  * @param {VotingProcedure} votingProcedure
  * @param {NativeScriptSource} nativeScriptSource
  * @returns {void}
  */
  abstract addWithNativeScript(voter: Voter, govActionId: GovernanceActionId, votingProcedure: VotingProcedure, nativeScriptSource: NativeScriptSource): void;

  /**
  * @returns {PlutusWitnesses}
  */
  abstract getPlutusWitnesses(): PlutusWitnesses;

  /**
  * @returns {TransactionInputs}
  */
  abstract getRefInputs(): TransactionInputs;

  /**
  * @returns {NativeScripts}
  */
  abstract getNativeScripts(): NativeScripts;

  /**
  * @returns {boolean}
  */
  abstract hasPlutusScripts(): boolean;

  /**
  * @returns {VotingProcedures}
  */
  abstract build(): VotingProcedures;

}

export abstract class VotingProcedure extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {VotingProcedure}
  */
  static fromBytes(bytes: Uint8Array): VotingProcedure {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {VotingProcedure}
  */
  static fromHex(hexStr: string): VotingProcedure {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {VotingProcedure}
  */
  static fromJson(json: string): VotingProcedure {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {VoteKind} vote
  * @returns {VotingProcedure}
  */
  static new(vote: VoteKind): VotingProcedure {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {VoteKind} vote
  * @param {Anchor} anchor
  * @returns {VotingProcedure}
  */
  static newWithAnchor(vote: VoteKind, anchor: Anchor): VotingProcedure {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {VoteKind}
  */
  abstract voteKind(): VoteKind;

  /**
  * @returns {Optional<Anchor>}
  */
  abstract anchor(): Optional<Anchor>;

}

export abstract class VotingProcedures extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {VotingProcedures}
  */
  static fromBytes(bytes: Uint8Array): VotingProcedures {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {VotingProcedures}
  */
  static fromHex(hexStr: string): VotingProcedures {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {VotingProcedures}
  */
  static fromJson(json: string): VotingProcedures {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {VotingProcedures}
  */
  static new(): VotingProcedures {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {Voter} voter
  * @param {GovernanceActionId} governanceActionId
  * @param {VotingProcedure} votingProcedure
  */
  abstract insert(voter: Voter, governanceActionId: GovernanceActionId, votingProcedure: VotingProcedure): void;

  /**
  * @param {Voter} voter
  * @param {GovernanceActionId} governanceActionId
  * @returns {Optional<VotingProcedure>}
  */
  abstract get(voter: Voter, governanceActionId: GovernanceActionId): Optional<VotingProcedure>;

  /**
  * @returns {Voters}
  */
  abstract getVoters(): Voters;

  /**
  * @param {Voter} voter
  * @returns {GovernanceActionIds}
  */
  abstract getGovernanceActionIdsByVoter(voter: Voter): GovernanceActionIds;

}

export abstract class VotingProposal extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {VotingProposal}
  */
  static fromBytes(bytes: Uint8Array): VotingProposal {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {VotingProposal}
  */
  static fromHex(hexStr: string): VotingProposal {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {VotingProposal}
  */
  static fromJson(json: string): VotingProposal {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {GovernanceAction}
  */
  abstract governanceAction(): GovernanceAction;

  /**
  * @returns {Anchor}
  */
  abstract anchor(): Anchor;

  /**
  * @returns {RewardAddress}
  */
  abstract rewardAccount(): RewardAddress;

  /**
  * @returns {BigNum}
  */
  abstract deposit(): BigNum;

  /**
  * @param {GovernanceAction} governanceAction
  * @param {Anchor} anchor
  * @param {RewardAddress} rewardAccount
  * @param {BigNum} deposit
  * @returns {VotingProposal}
  */
  static new(governanceAction: GovernanceAction, anchor: Anchor, rewardAccount: RewardAddress, deposit: BigNum): VotingProposal {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

}

export abstract class VotingProposalBuilder extends _Ptr {
  /**
  * @returns {VotingProposalBuilder}
  */
  static new(): VotingProposalBuilder {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {VotingProposal} proposal
  * @returns {void}
  */
  abstract add(proposal: VotingProposal): void;

  /**
  * @param {VotingProposal} proposal
  * @param {PlutusWitness} witness
  * @returns {void}
  */
  abstract addWithPlutusWitness(proposal: VotingProposal, witness: PlutusWitness): void;

  /**
  * @returns {PlutusWitnesses}
  */
  abstract getPlutusWitnesses(): PlutusWitnesses;

  /**
  * @returns {TransactionInputs}
  */
  abstract getRefInputs(): TransactionInputs;

  /**
  * @returns {boolean}
  */
  abstract hasPlutusScripts(): boolean;

  /**
  * @returns {VotingProposals}
  */
  abstract build(): VotingProposals;

}

export abstract class VotingProposals extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {VotingProposals}
  */
  static fromBytes(bytes: Uint8Array): VotingProposals {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {VotingProposals}
  */
  static fromHex(hexStr: string): VotingProposals {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {VotingProposals}
  */
  static fromJson(json: string): VotingProposals {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {VotingProposals}
  */
  static new(): VotingProposals {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {number} index
  * @returns {VotingProposal}
  */
  abstract get(index: number): VotingProposal;

  /**
  * @param {VotingProposal} proposal
  * @returns {boolean}
  */
  abstract add(proposal: VotingProposal): boolean;

  /**
  * @param {VotingProposal} elem
  * @returns {boolean}
  */
  abstract contains(elem: VotingProposal): boolean;

  /**
  * @returns {Optional<VotingProposals>}
  */
  abstract toOption(): Optional<VotingProposals>;

}

export abstract class Withdrawals extends _Ptr {
  /**
  * @returns {Uint8Array}
  */
  abstract toBytes(): Uint8Array;

  /**
  * @param {Uint8Array} bytes
  * @returns {Withdrawals}
  */
  static fromBytes(bytes: Uint8Array): Withdrawals {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toHex(): string;

  /**
  * @param {string} hexStr
  * @returns {Withdrawals}
  */
  static fromHex(hexStr: string): Withdrawals {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {string}
  */
  abstract toJson(): string;

  /**
  * @param {string} json
  * @returns {Withdrawals}
  */
  static fromJson(json: string): Withdrawals {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {Withdrawals}
  */
  static new(): Withdrawals {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @returns {number}
  */
  abstract len(): number;

  /**
  * @param {RewardAddress} key
  * @param {BigNum} value
  * @returns {Optional<BigNum>}
  */
  abstract insert(key: RewardAddress, value: BigNum): Optional<BigNum>;

  /**
  * @param {RewardAddress} key
  * @returns {Optional<BigNum>}
  */
  abstract get(key: RewardAddress): Optional<BigNum>;

  /**
  * @returns {RewardAddresses}
  */
  abstract keys(): RewardAddresses;

}

export abstract class WithdrawalsBuilder extends _Ptr {
  /**
  * @returns {WithdrawalsBuilder}
  */
  static new(): WithdrawalsBuilder {
    throw new Error(EXCEPTIONS.SHOULD_BE_OVERWRITTEN);
  }

  /**
  * @param {RewardAddress} address
  * @param {BigNum} coin
  * @returns {void}
  */
  abstract add(address: RewardAddress, coin: BigNum): void;

  /**
  * @param {RewardAddress} address
  * @param {BigNum} coin
  * @param {PlutusWitness} witness
  * @returns {void}
  */
  abstract addWithPlutusWitness(address: RewardAddress, coin: BigNum, witness: PlutusWitness): void;

  /**
  * @param {RewardAddress} address
  * @param {BigNum} coin
  * @param {NativeScriptSource} nativeScriptSource
  * @returns {void}
  */
  abstract addWithNativeScript(address: RewardAddress, coin: BigNum, nativeScriptSource: NativeScriptSource): void;

  /**
  * @returns {PlutusWitnesses}
  */
  abstract getPlutusWitnesses(): PlutusWitnesses;

  /**
  * @returns {TransactionInputs}
  */
  abstract getRefInputs(): TransactionInputs;

  /**
  * @returns {NativeScripts}
  */
  abstract getNativeScripts(): NativeScripts;

  /**
  * @returns {Value}
  */
  abstract getTotalWithdrawals(): Value;

  /**
  * @returns {boolean}
  */
  abstract hasPlutusScripts(): boolean;

  /**
  * @returns {Withdrawals}
  */
  abstract build(): Withdrawals;

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

export enum ByronAddressType {
  ATPubKey = 0,
  ATScript = 1,
  ATRedeem = 2,
}

export enum CborContainerType {
  Array = 0,
  Map = 1,
}

export enum CborSetType {
  Tagged = 0,
  Untagged = 1,
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

export enum TransactionSetsState {
  AllSetsHaveTag = 0,
  AllSetsHaveNoTag = 1,
  MixedSets = 2,
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

