import * as WasmV4 from '@emurgo/cardano-serialization-lib-browser';
import * as WasmContract from '@emurgo/cross-csl-core';

const { Ptr } = WasmContract;
import type { Optional } from '@emurgo/cross-csl-core';

export const init = (ctx: string): WasmContract.WasmModuleProxy => {
  return new WasmModuleProxy(ctx);
};

export class WasmModuleProxy implements WasmContract.WasmModuleProxy {
  private _ctx: string;

  constructor(ctx: string) {
    this._ctx = ctx;
  }

  calculateExUnitsCeilCost(exUnits: WasmContract.ExUnits, exUnitPrices: WasmContract.ExUnitPrices): WasmContract.BigNum {
    const ret = WasmV4.calculate_ex_units_ceil_cost(exUnits.wasm, exUnitPrices.wasm);
    return new this.BigNum(ret, this._ctx);
  }

  createSendAll(address: WasmContract.Address, utxos: WasmContract.TransactionUnspentOutputs, config: WasmContract.TransactionBuilderConfig): WasmContract.TransactionBatchList {
    const ret = WasmV4.create_send_all(address.wasm, utxos.wasm, config.wasm);
    return new this.TransactionBatchList(ret, this._ctx);
  }

  decodeArbitraryBytesFromMetadatum(metadata: WasmContract.TransactionMetadatum): Uint8Array {
    return WasmV4.decode_arbitrary_bytes_from_metadatum(metadata.wasm);
  }

  decodeMetadatumToJsonStr(metadatum: WasmContract.TransactionMetadatum, schema: WasmContract.MetadataJsonSchema): string {
    return WasmV4.decode_metadatum_to_json_str(metadatum.wasm, schema);
  }

  decodePlutusDatumToJsonStr(datum: WasmContract.PlutusData, schema: WasmContract.PlutusDatumSchema): string {
    return WasmV4.decode_plutus_datum_to_json_str(datum.wasm, schema);
  }

  decryptWithPassword(password: string, data: string): string {
    return WasmV4.decrypt_with_password(password, data);
  }

  encodeArbitraryBytesAsMetadatum(bytes: Uint8Array): WasmContract.TransactionMetadatum {
    const ret = WasmV4.encode_arbitrary_bytes_as_metadatum(bytes);
    return new this.TransactionMetadatum(ret, this._ctx);
  }

  encodeJsonStrToMetadatum(json: string, schema: WasmContract.MetadataJsonSchema): WasmContract.TransactionMetadatum {
    const ret = WasmV4.encode_json_str_to_metadatum(json, schema);
    return new this.TransactionMetadatum(ret, this._ctx);
  }

  encodeJsonStrToNativeScript(json: string, selfXpub: string, schema: WasmContract.ScriptSchema): WasmContract.NativeScript {
    const ret = WasmV4.encode_json_str_to_native_script(json, selfXpub, schema);
    return new this.NativeScript(ret, this._ctx);
  }

  encodeJsonStrToPlutusDatum(json: string, schema: WasmContract.PlutusDatumSchema): WasmContract.PlutusData {
    const ret = WasmV4.encode_json_str_to_plutus_datum(json, schema);
    return new this.PlutusData(ret, this._ctx);
  }

  encryptWithPassword(password: string, salt: string, nonce: string, data: string): string {
    return WasmV4.encrypt_with_password(password, salt, nonce, data);
  }

  getDeposit(txbody: WasmContract.TransactionBody, poolDeposit: WasmContract.BigNum, keyDeposit: WasmContract.BigNum): WasmContract.BigNum {
    const ret = WasmV4.get_deposit(txbody.wasm, poolDeposit.wasm, keyDeposit.wasm);
    return new this.BigNum(ret, this._ctx);
  }

  getImplicitInput(txbody: WasmContract.TransactionBody, poolDeposit: WasmContract.BigNum, keyDeposit: WasmContract.BigNum): WasmContract.Value {
    const ret = WasmV4.get_implicit_input(txbody.wasm, poolDeposit.wasm, keyDeposit.wasm);
    return new this.Value(ret, this._ctx);
  }

  hasTransactionSetTag(txBytes: Uint8Array): WasmContract.TransactionSetsState {
    return WasmV4.has_transaction_set_tag(txBytes);
  }

  hashAuxiliaryData(auxiliaryData: WasmContract.AuxiliaryData): WasmContract.AuxiliaryDataHash {
    const ret = WasmV4.hash_auxiliary_data(auxiliaryData.wasm);
    return new this.AuxiliaryDataHash(ret, this._ctx);
  }

  hashPlutusData(plutusData: WasmContract.PlutusData): WasmContract.DataHash {
    const ret = WasmV4.hash_plutus_data(plutusData.wasm);
    return new this.DataHash(ret, this._ctx);
  }

  hashScriptData(redeemers: WasmContract.Redeemers, costModels: WasmContract.Costmdls, datums: Optional<WasmContract.PlutusList>): WasmContract.ScriptDataHash {
    const ret = WasmV4.hash_script_data(redeemers.wasm, costModels.wasm, datums?.wasm);
    return new this.ScriptDataHash(ret, this._ctx);
  }

  makeDaedalusBootstrapWitness(txBodyHash: WasmContract.TransactionHash, addr: WasmContract.ByronAddress, key: WasmContract.LegacyDaedalusPrivateKey): WasmContract.BootstrapWitness {
    const ret = WasmV4.make_daedalus_bootstrap_witness(txBodyHash.wasm, addr.wasm, key.wasm);
    return new this.BootstrapWitness(ret, this._ctx);
  }

  makeIcarusBootstrapWitness(txBodyHash: WasmContract.TransactionHash, addr: WasmContract.ByronAddress, key: WasmContract.Bip32PrivateKey): WasmContract.BootstrapWitness {
    const ret = WasmV4.make_icarus_bootstrap_witness(txBodyHash.wasm, addr.wasm, key.wasm);
    return new this.BootstrapWitness(ret, this._ctx);
  }

  makeVkeyWitness(txBodyHash: WasmContract.TransactionHash, sk: WasmContract.PrivateKey): WasmContract.Vkeywitness {
    const ret = WasmV4.make_vkey_witness(txBodyHash.wasm, sk.wasm);
    return new this.Vkeywitness(ret, this._ctx);
  }

  minAdaForOutput(output: WasmContract.TransactionOutput, dataCost: WasmContract.DataCost): WasmContract.BigNum {
    const ret = WasmV4.min_ada_for_output(output.wasm, dataCost.wasm);
    return new this.BigNum(ret, this._ctx);
  }

  minFee(tx: WasmContract.Transaction, linearFee: WasmContract.LinearFee): WasmContract.BigNum {
    const ret = WasmV4.min_fee(tx.wasm, linearFee.wasm);
    return new this.BigNum(ret, this._ctx);
  }

  minRefScriptFee(totalRefScriptsSize: number, refScriptCoinsPerByte: WasmContract.UnitInterval): WasmContract.BigNum {
    const ret = WasmV4.min_ref_script_fee(totalRefScriptsSize, refScriptCoinsPerByte.wasm);
    return new this.BigNum(ret, this._ctx);
  }

  minScriptFee(tx: WasmContract.Transaction, exUnitPrices: WasmContract.ExUnitPrices): WasmContract.BigNum {
    const ret = WasmV4.min_script_fee(tx.wasm, exUnitPrices.wasm);
    return new this.BigNum(ret, this._ctx);
  }

  public Address = (() => {
    const $outer = this;

    class Address
      extends Ptr<WasmV4.Address>
      implements WasmContract.Address
    {

      static fromBytes(data: Uint8Array): WasmContract.Address {
        const ret = WasmV4.Address.from_bytes(data);
        return new $outer.Address(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.Address {
        const ret = WasmV4.Address.from_json(json);
        return new $outer.Address(ret, $outer._ctx);
      }

      kind(): WasmContract.AddressKind {
        return this.wasm.kind();
      }

      paymentCred(): Optional<WasmContract.Credential> {
        const ret = this.wasm.payment_cred();
        if (ret == null) return undefined;
        return new $outer.Credential(ret, $outer._ctx);
      }

      isMalformed(): boolean {
        return this.wasm.is_malformed();
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.Address {
        const ret = WasmV4.Address.from_hex(hexStr);
        return new $outer.Address(ret, $outer._ctx);
      }

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      toBech32(prefix: Optional<string>): string {
        return this.wasm.to_bech32(prefix);
      }

      static fromBech32(bechStr: string): WasmContract.Address {
        const ret = WasmV4.Address.from_bech32(bechStr);
        return new $outer.Address(ret, $outer._ctx);
      }

      networkId(): number {
        return this.wasm.network_id();
      }

    }
    return Address;
  })();

  public Anchor = (() => {
    const $outer = this;

    class Anchor
      extends Ptr<WasmV4.Anchor>
      implements WasmContract.Anchor
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.Anchor {
        const ret = WasmV4.Anchor.from_bytes(bytes);
        return new $outer.Anchor(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.Anchor {
        const ret = WasmV4.Anchor.from_hex(hexStr);
        return new $outer.Anchor(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.Anchor {
        const ret = WasmV4.Anchor.from_json(json);
        return new $outer.Anchor(ret, $outer._ctx);
      }

      url(): WasmContract.URL {
        const ret = this.wasm.url();
        return new $outer.URL(ret, $outer._ctx);
      }

      anchorDataHash(): WasmContract.AnchorDataHash {
        const ret = this.wasm.anchor_data_hash();
        return new $outer.AnchorDataHash(ret, $outer._ctx);
      }

      static new(anchorUrl: WasmContract.URL, anchorDataHash: WasmContract.AnchorDataHash): WasmContract.Anchor {
        const ret = WasmV4.Anchor.new(anchorUrl.wasm, anchorDataHash.wasm);
        return new $outer.Anchor(ret, $outer._ctx);
      }

    }
    return Anchor;
  })();

  public AnchorDataHash = (() => {
    const $outer = this;

    class AnchorDataHash
      extends Ptr<WasmV4.AnchorDataHash>
      implements WasmContract.AnchorDataHash
    {

      static fromBytes(bytes: Uint8Array): WasmContract.AnchorDataHash {
        const ret = WasmV4.AnchorDataHash.from_bytes(bytes);
        return new $outer.AnchorDataHash(ret, $outer._ctx);
      }

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      toBech32(prefix: string): string {
        return this.wasm.to_bech32(prefix);
      }

      static fromBech32(bechStr: string): WasmContract.AnchorDataHash {
        const ret = WasmV4.AnchorDataHash.from_bech32(bechStr);
        return new $outer.AnchorDataHash(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hex: string): WasmContract.AnchorDataHash {
        const ret = WasmV4.AnchorDataHash.from_hex(hex);
        return new $outer.AnchorDataHash(ret, $outer._ctx);
      }

    }
    return AnchorDataHash;
  })();

  public AssetName = (() => {
    const $outer = this;

    class AssetName
      extends Ptr<WasmV4.AssetName>
      implements WasmContract.AssetName
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.AssetName {
        const ret = WasmV4.AssetName.from_bytes(bytes);
        return new $outer.AssetName(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.AssetName {
        const ret = WasmV4.AssetName.from_hex(hexStr);
        return new $outer.AssetName(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.AssetName {
        const ret = WasmV4.AssetName.from_json(json);
        return new $outer.AssetName(ret, $outer._ctx);
      }

      static new(name: Uint8Array): WasmContract.AssetName {
        const ret = WasmV4.AssetName.new(name);
        return new $outer.AssetName(ret, $outer._ctx);
      }

      name(): Uint8Array {
        return this.wasm.name();
      }

    }
    return AssetName;
  })();

  public AssetNames = (() => {
    const $outer = this;

    class AssetNames
      extends Ptr<WasmV4.AssetNames>
      implements WasmContract.AssetNames
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.AssetNames {
        const ret = WasmV4.AssetNames.from_bytes(bytes);
        return new $outer.AssetNames(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.AssetNames {
        const ret = WasmV4.AssetNames.from_hex(hexStr);
        return new $outer.AssetNames(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.AssetNames {
        const ret = WasmV4.AssetNames.from_json(json);
        return new $outer.AssetNames(ret, $outer._ctx);
      }

      static new(): WasmContract.AssetNames {
        const ret = WasmV4.AssetNames.new();
        return new $outer.AssetNames(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      get(index: number): WasmContract.AssetName {
        const ret = this.wasm.get(index);
        return new $outer.AssetName(ret, $outer._ctx);
      }

      add(elem: WasmContract.AssetName): void {
        return this.wasm.add(elem.wasm);
      }

    }
    return AssetNames;
  })();

  public Assets = (() => {
    const $outer = this;

    class Assets
      extends Ptr<WasmV4.Assets>
      implements WasmContract.Assets
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.Assets {
        const ret = WasmV4.Assets.from_bytes(bytes);
        return new $outer.Assets(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.Assets {
        const ret = WasmV4.Assets.from_hex(hexStr);
        return new $outer.Assets(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.Assets {
        const ret = WasmV4.Assets.from_json(json);
        return new $outer.Assets(ret, $outer._ctx);
      }

      static new(): WasmContract.Assets {
        const ret = WasmV4.Assets.new();
        return new $outer.Assets(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      insert(key: WasmContract.AssetName, value: WasmContract.BigNum): Optional<WasmContract.BigNum> {
        const ret = this.wasm.insert(key.wasm, value.wasm);
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      get(key: WasmContract.AssetName): Optional<WasmContract.BigNum> {
        const ret = this.wasm.get(key.wasm);
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      keys(): WasmContract.AssetNames {
        const ret = this.wasm.keys();
        return new $outer.AssetNames(ret, $outer._ctx);
      }

    }
    return Assets;
  })();

  public AuxiliaryData = (() => {
    const $outer = this;

    class AuxiliaryData
      extends Ptr<WasmV4.AuxiliaryData>
      implements WasmContract.AuxiliaryData
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.AuxiliaryData {
        const ret = WasmV4.AuxiliaryData.from_bytes(bytes);
        return new $outer.AuxiliaryData(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.AuxiliaryData {
        const ret = WasmV4.AuxiliaryData.from_hex(hexStr);
        return new $outer.AuxiliaryData(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.AuxiliaryData {
        const ret = WasmV4.AuxiliaryData.from_json(json);
        return new $outer.AuxiliaryData(ret, $outer._ctx);
      }

      static new(): WasmContract.AuxiliaryData {
        const ret = WasmV4.AuxiliaryData.new();
        return new $outer.AuxiliaryData(ret, $outer._ctx);
      }

      metadata(): Optional<WasmContract.GeneralTransactionMetadata> {
        const ret = this.wasm.metadata();
        if (ret == null) return undefined;
        return new $outer.GeneralTransactionMetadata(ret, $outer._ctx);
      }

      setMetadata(metadata: WasmContract.GeneralTransactionMetadata): void {
        return this.wasm.set_metadata(metadata.wasm);
      }

      nativeScripts(): Optional<WasmContract.NativeScripts> {
        const ret = this.wasm.native_scripts();
        if (ret == null) return undefined;
        return new $outer.NativeScripts(ret, $outer._ctx);
      }

      setNativeScripts(nativeScripts: WasmContract.NativeScripts): void {
        return this.wasm.set_native_scripts(nativeScripts.wasm);
      }

      plutusScripts(): Optional<WasmContract.PlutusScripts> {
        const ret = this.wasm.plutus_scripts();
        if (ret == null) return undefined;
        return new $outer.PlutusScripts(ret, $outer._ctx);
      }

      setPlutusScripts(plutusScripts: WasmContract.PlutusScripts): void {
        return this.wasm.set_plutus_scripts(plutusScripts.wasm);
      }

      preferAlonzoFormat(): boolean {
        return this.wasm.prefer_alonzo_format();
      }

      setPreferAlonzoFormat(prefer: boolean): void {
        return this.wasm.set_prefer_alonzo_format(prefer);
      }

    }
    return AuxiliaryData;
  })();

  public AuxiliaryDataHash = (() => {
    const $outer = this;

    class AuxiliaryDataHash
      extends Ptr<WasmV4.AuxiliaryDataHash>
      implements WasmContract.AuxiliaryDataHash
    {

      static fromBytes(bytes: Uint8Array): WasmContract.AuxiliaryDataHash {
        const ret = WasmV4.AuxiliaryDataHash.from_bytes(bytes);
        return new $outer.AuxiliaryDataHash(ret, $outer._ctx);
      }

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      toBech32(prefix: string): string {
        return this.wasm.to_bech32(prefix);
      }

      static fromBech32(bechStr: string): WasmContract.AuxiliaryDataHash {
        const ret = WasmV4.AuxiliaryDataHash.from_bech32(bechStr);
        return new $outer.AuxiliaryDataHash(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hex: string): WasmContract.AuxiliaryDataHash {
        const ret = WasmV4.AuxiliaryDataHash.from_hex(hex);
        return new $outer.AuxiliaryDataHash(ret, $outer._ctx);
      }

    }
    return AuxiliaryDataHash;
  })();

  public AuxiliaryDataSet = (() => {
    const $outer = this;

    class AuxiliaryDataSet
      extends Ptr<WasmV4.AuxiliaryDataSet>
      implements WasmContract.AuxiliaryDataSet
    {

      static new(): WasmContract.AuxiliaryDataSet {
        const ret = WasmV4.AuxiliaryDataSet.new();
        return new $outer.AuxiliaryDataSet(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      insert(txIndex: number, data: WasmContract.AuxiliaryData): Optional<WasmContract.AuxiliaryData> {
        const ret = this.wasm.insert(txIndex, data.wasm);
        if (ret == null) return undefined;
        return new $outer.AuxiliaryData(ret, $outer._ctx);
      }

      get(txIndex: number): Optional<WasmContract.AuxiliaryData> {
        const ret = this.wasm.get(txIndex);
        if (ret == null) return undefined;
        return new $outer.AuxiliaryData(ret, $outer._ctx);
      }

      indices(): Uint32Array {
        return this.wasm.indices();
      }

    }
    return AuxiliaryDataSet;
  })();

  public BaseAddress = (() => {
    const $outer = this;

    class BaseAddress
      extends Ptr<WasmV4.BaseAddress>
      implements WasmContract.BaseAddress
    {

      static new(network: number, payment: WasmContract.Credential, stake: WasmContract.Credential): WasmContract.BaseAddress {
        const ret = WasmV4.BaseAddress.new(network, payment.wasm, stake.wasm);
        return new $outer.BaseAddress(ret, $outer._ctx);
      }

      paymentCred(): WasmContract.Credential {
        const ret = this.wasm.payment_cred();
        return new $outer.Credential(ret, $outer._ctx);
      }

      stakeCred(): WasmContract.Credential {
        const ret = this.wasm.stake_cred();
        return new $outer.Credential(ret, $outer._ctx);
      }

      toAddress(): WasmContract.Address {
        const ret = this.wasm.to_address();
        return new $outer.Address(ret, $outer._ctx);
      }

      static fromAddress(addr: WasmContract.Address): Optional<WasmContract.BaseAddress> {
        const ret = WasmV4.BaseAddress.from_address(addr.wasm);
        if (ret == null) return undefined;
        return new $outer.BaseAddress(ret, $outer._ctx);
      }

      networkId(): number {
        return this.wasm.network_id();
      }

    }
    return BaseAddress;
  })();

  public BigInt = (() => {
    const $outer = this;

    class BigInt
      extends Ptr<WasmV4.BigInt>
      implements WasmContract.BigInt
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.BigInt {
        const ret = WasmV4.BigInt.from_bytes(bytes);
        return new $outer.BigInt(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.BigInt {
        const ret = WasmV4.BigInt.from_hex(hexStr);
        return new $outer.BigInt(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.BigInt {
        const ret = WasmV4.BigInt.from_json(json);
        return new $outer.BigInt(ret, $outer._ctx);
      }

      isZero(): boolean {
        return this.wasm.is_zero();
      }

      asU64(): Optional<WasmContract.BigNum> {
        const ret = this.wasm.as_u64();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      asInt(): Optional<WasmContract.Int> {
        const ret = this.wasm.as_int();
        if (ret == null) return undefined;
        return new $outer.Int(ret, $outer._ctx);
      }

      static fromStr(text: string): WasmContract.BigInt {
        const ret = WasmV4.BigInt.from_str(text);
        return new $outer.BigInt(ret, $outer._ctx);
      }

      toStr(): string {
        return this.wasm.to_str();
      }

      add(other: WasmContract.BigInt): WasmContract.BigInt {
        const ret = this.wasm.add(other.wasm);
        return new $outer.BigInt(ret, $outer._ctx);
      }

      sub(other: WasmContract.BigInt): WasmContract.BigInt {
        const ret = this.wasm.sub(other.wasm);
        return new $outer.BigInt(ret, $outer._ctx);
      }

      mul(other: WasmContract.BigInt): WasmContract.BigInt {
        const ret = this.wasm.mul(other.wasm);
        return new $outer.BigInt(ret, $outer._ctx);
      }

      pow(exp: number): WasmContract.BigInt {
        const ret = this.wasm.pow(exp);
        return new $outer.BigInt(ret, $outer._ctx);
      }

      static one(): WasmContract.BigInt {
        const ret = WasmV4.BigInt.one();
        return new $outer.BigInt(ret, $outer._ctx);
      }

      static zero(): WasmContract.BigInt {
        const ret = WasmV4.BigInt.zero();
        return new $outer.BigInt(ret, $outer._ctx);
      }

      abs(): WasmContract.BigInt {
        const ret = this.wasm.abs();
        return new $outer.BigInt(ret, $outer._ctx);
      }

      increment(): WasmContract.BigInt {
        const ret = this.wasm.increment();
        return new $outer.BigInt(ret, $outer._ctx);
      }

      divCeil(other: WasmContract.BigInt): WasmContract.BigInt {
        const ret = this.wasm.div_ceil(other.wasm);
        return new $outer.BigInt(ret, $outer._ctx);
      }

      divFloor(other: WasmContract.BigInt): WasmContract.BigInt {
        const ret = this.wasm.div_floor(other.wasm);
        return new $outer.BigInt(ret, $outer._ctx);
      }

    }
    return BigInt;
  })();

  public BigNum = (() => {
    const $outer = this;

    class BigNum
      extends Ptr<WasmV4.BigNum>
      implements WasmContract.BigNum
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.BigNum {
        const ret = WasmV4.BigNum.from_bytes(bytes);
        return new $outer.BigNum(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.BigNum {
        const ret = WasmV4.BigNum.from_hex(hexStr);
        return new $outer.BigNum(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.BigNum {
        const ret = WasmV4.BigNum.from_json(json);
        return new $outer.BigNum(ret, $outer._ctx);
      }

      static fromStr(string: string): WasmContract.BigNum {
        const ret = WasmV4.BigNum.from_str(string);
        return new $outer.BigNum(ret, $outer._ctx);
      }

      toStr(): string {
        return this.wasm.to_str();
      }

      static zero(): WasmContract.BigNum {
        const ret = WasmV4.BigNum.zero();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      static one(): WasmContract.BigNum {
        const ret = WasmV4.BigNum.one();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      isZero(): boolean {
        return this.wasm.is_zero();
      }

      divFloor(other: WasmContract.BigNum): WasmContract.BigNum {
        const ret = this.wasm.div_floor(other.wasm);
        return new $outer.BigNum(ret, $outer._ctx);
      }

      checkedMul(other: WasmContract.BigNum): WasmContract.BigNum {
        const ret = this.wasm.checked_mul(other.wasm);
        return new $outer.BigNum(ret, $outer._ctx);
      }

      checkedAdd(other: WasmContract.BigNum): WasmContract.BigNum {
        const ret = this.wasm.checked_add(other.wasm);
        return new $outer.BigNum(ret, $outer._ctx);
      }

      checkedSub(other: WasmContract.BigNum): WasmContract.BigNum {
        const ret = this.wasm.checked_sub(other.wasm);
        return new $outer.BigNum(ret, $outer._ctx);
      }

      clampedSub(other: WasmContract.BigNum): WasmContract.BigNum {
        const ret = this.wasm.clamped_sub(other.wasm);
        return new $outer.BigNum(ret, $outer._ctx);
      }

      compare(rhsValue: WasmContract.BigNum): number {
        return this.wasm.compare(rhsValue.wasm);
      }

      lessThan(rhsValue: WasmContract.BigNum): boolean {
        return this.wasm.less_than(rhsValue.wasm);
      }

      static maxValue(): WasmContract.BigNum {
        const ret = WasmV4.BigNum.max_value();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      static max(a: WasmContract.BigNum, b: WasmContract.BigNum): WasmContract.BigNum {
        const ret = WasmV4.BigNum.max(a.wasm, b.wasm);
        return new $outer.BigNum(ret, $outer._ctx);
      }

    }
    return BigNum;
  })();

  public Bip32PrivateKey = (() => {
    const $outer = this;

    class Bip32PrivateKey
      extends Ptr<WasmV4.Bip32PrivateKey>
      implements WasmContract.Bip32PrivateKey
    {

      derive(index: number): WasmContract.Bip32PrivateKey {
        const ret = this.wasm.derive(index);
        return new $outer.Bip32PrivateKey(ret, $outer._ctx);
      }

      static from_128Xprv(bytes: Uint8Array): WasmContract.Bip32PrivateKey {
        const ret = WasmV4.Bip32PrivateKey.from_128_xprv(bytes);
        return new $outer.Bip32PrivateKey(ret, $outer._ctx);
      }

      to_128Xprv(): Uint8Array {
        return this.wasm.to_128_xprv();
      }

      static generateEd25519Bip32(): WasmContract.Bip32PrivateKey {
        const ret = WasmV4.Bip32PrivateKey.generate_ed25519_bip32();
        return new $outer.Bip32PrivateKey(ret, $outer._ctx);
      }

      toRawKey(): WasmContract.PrivateKey {
        const ret = this.wasm.to_raw_key();
        return new $outer.PrivateKey(ret, $outer._ctx);
      }

      toPublic(): WasmContract.Bip32PublicKey {
        const ret = this.wasm.to_public();
        return new $outer.Bip32PublicKey(ret, $outer._ctx);
      }

      static fromBytes(bytes: Uint8Array): WasmContract.Bip32PrivateKey {
        const ret = WasmV4.Bip32PrivateKey.from_bytes(bytes);
        return new $outer.Bip32PrivateKey(ret, $outer._ctx);
      }

      asBytes(): Uint8Array {
        return this.wasm.as_bytes();
      }

      static fromBech32(bech32Str: string): WasmContract.Bip32PrivateKey {
        const ret = WasmV4.Bip32PrivateKey.from_bech32(bech32Str);
        return new $outer.Bip32PrivateKey(ret, $outer._ctx);
      }

      toBech32(): string {
        return this.wasm.to_bech32();
      }

      static fromBip39Entropy(entropy: Uint8Array, password: Uint8Array): WasmContract.Bip32PrivateKey {
        const ret = WasmV4.Bip32PrivateKey.from_bip39_entropy(entropy, password);
        return new $outer.Bip32PrivateKey(ret, $outer._ctx);
      }

      chaincode(): Uint8Array {
        return this.wasm.chaincode();
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.Bip32PrivateKey {
        const ret = WasmV4.Bip32PrivateKey.from_hex(hexStr);
        return new $outer.Bip32PrivateKey(ret, $outer._ctx);
      }

    }
    return Bip32PrivateKey;
  })();

  public Bip32PublicKey = (() => {
    const $outer = this;

    class Bip32PublicKey
      extends Ptr<WasmV4.Bip32PublicKey>
      implements WasmContract.Bip32PublicKey
    {

      derive(index: number): WasmContract.Bip32PublicKey {
        const ret = this.wasm.derive(index);
        return new $outer.Bip32PublicKey(ret, $outer._ctx);
      }

      toRawKey(): WasmContract.PublicKey {
        const ret = this.wasm.to_raw_key();
        return new $outer.PublicKey(ret, $outer._ctx);
      }

      static fromBytes(bytes: Uint8Array): WasmContract.Bip32PublicKey {
        const ret = WasmV4.Bip32PublicKey.from_bytes(bytes);
        return new $outer.Bip32PublicKey(ret, $outer._ctx);
      }

      asBytes(): Uint8Array {
        return this.wasm.as_bytes();
      }

      static fromBech32(bech32Str: string): WasmContract.Bip32PublicKey {
        const ret = WasmV4.Bip32PublicKey.from_bech32(bech32Str);
        return new $outer.Bip32PublicKey(ret, $outer._ctx);
      }

      toBech32(): string {
        return this.wasm.to_bech32();
      }

      chaincode(): Uint8Array {
        return this.wasm.chaincode();
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.Bip32PublicKey {
        const ret = WasmV4.Bip32PublicKey.from_hex(hexStr);
        return new $outer.Bip32PublicKey(ret, $outer._ctx);
      }

    }
    return Bip32PublicKey;
  })();

  public Block = (() => {
    const $outer = this;

    class Block
      extends Ptr<WasmV4.Block>
      implements WasmContract.Block
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.Block {
        const ret = WasmV4.Block.from_bytes(bytes);
        return new $outer.Block(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.Block {
        const ret = WasmV4.Block.from_hex(hexStr);
        return new $outer.Block(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.Block {
        const ret = WasmV4.Block.from_json(json);
        return new $outer.Block(ret, $outer._ctx);
      }

      header(): WasmContract.Header {
        const ret = this.wasm.header();
        return new $outer.Header(ret, $outer._ctx);
      }

      transactionBodies(): WasmContract.TransactionBodies {
        const ret = this.wasm.transaction_bodies();
        return new $outer.TransactionBodies(ret, $outer._ctx);
      }

      transactionWitnessSets(): WasmContract.TransactionWitnessSets {
        const ret = this.wasm.transaction_witness_sets();
        return new $outer.TransactionWitnessSets(ret, $outer._ctx);
      }

      auxiliaryDataSet(): WasmContract.AuxiliaryDataSet {
        const ret = this.wasm.auxiliary_data_set();
        return new $outer.AuxiliaryDataSet(ret, $outer._ctx);
      }

      invalidTransactions(): Uint32Array {
        return this.wasm.invalid_transactions();
      }

      static new(header: WasmContract.Header, transactionBodies: WasmContract.TransactionBodies, transactionWitnessSets: WasmContract.TransactionWitnessSets, auxiliaryDataSet: WasmContract.AuxiliaryDataSet, invalidTransactions: Uint32Array): WasmContract.Block {
        const ret = WasmV4.Block.new(header.wasm, transactionBodies.wasm, transactionWitnessSets.wasm, auxiliaryDataSet.wasm, invalidTransactions);
        return new $outer.Block(ret, $outer._ctx);
      }

    }
    return Block;
  })();

  public BlockHash = (() => {
    const $outer = this;

    class BlockHash
      extends Ptr<WasmV4.BlockHash>
      implements WasmContract.BlockHash
    {

      static fromBytes(bytes: Uint8Array): WasmContract.BlockHash {
        const ret = WasmV4.BlockHash.from_bytes(bytes);
        return new $outer.BlockHash(ret, $outer._ctx);
      }

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      toBech32(prefix: string): string {
        return this.wasm.to_bech32(prefix);
      }

      static fromBech32(bechStr: string): WasmContract.BlockHash {
        const ret = WasmV4.BlockHash.from_bech32(bechStr);
        return new $outer.BlockHash(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hex: string): WasmContract.BlockHash {
        const ret = WasmV4.BlockHash.from_hex(hex);
        return new $outer.BlockHash(ret, $outer._ctx);
      }

    }
    return BlockHash;
  })();

  public BootstrapWitness = (() => {
    const $outer = this;

    class BootstrapWitness
      extends Ptr<WasmV4.BootstrapWitness>
      implements WasmContract.BootstrapWitness
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.BootstrapWitness {
        const ret = WasmV4.BootstrapWitness.from_bytes(bytes);
        return new $outer.BootstrapWitness(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.BootstrapWitness {
        const ret = WasmV4.BootstrapWitness.from_hex(hexStr);
        return new $outer.BootstrapWitness(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.BootstrapWitness {
        const ret = WasmV4.BootstrapWitness.from_json(json);
        return new $outer.BootstrapWitness(ret, $outer._ctx);
      }

      vkey(): WasmContract.Vkey {
        const ret = this.wasm.vkey();
        return new $outer.Vkey(ret, $outer._ctx);
      }

      signature(): WasmContract.Ed25519Signature {
        const ret = this.wasm.signature();
        return new $outer.Ed25519Signature(ret, $outer._ctx);
      }

      chainCode(): Uint8Array {
        return this.wasm.chain_code();
      }

      attributes(): Uint8Array {
        return this.wasm.attributes();
      }

      static new(vkey: WasmContract.Vkey, signature: WasmContract.Ed25519Signature, chainCode: Uint8Array, attributes: Uint8Array): WasmContract.BootstrapWitness {
        const ret = WasmV4.BootstrapWitness.new(vkey.wasm, signature.wasm, chainCode, attributes);
        return new $outer.BootstrapWitness(ret, $outer._ctx);
      }

    }
    return BootstrapWitness;
  })();

  public BootstrapWitnesses = (() => {
    const $outer = this;

    class BootstrapWitnesses
      extends Ptr<WasmV4.BootstrapWitnesses>
      implements WasmContract.BootstrapWitnesses
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.BootstrapWitnesses {
        const ret = WasmV4.BootstrapWitnesses.from_bytes(bytes);
        return new $outer.BootstrapWitnesses(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.BootstrapWitnesses {
        const ret = WasmV4.BootstrapWitnesses.from_hex(hexStr);
        return new $outer.BootstrapWitnesses(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.BootstrapWitnesses {
        const ret = WasmV4.BootstrapWitnesses.from_json(json);
        return new $outer.BootstrapWitnesses(ret, $outer._ctx);
      }

      static new(): WasmContract.BootstrapWitnesses {
        const ret = WasmV4.BootstrapWitnesses.new();
        return new $outer.BootstrapWitnesses(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      get(index: number): WasmContract.BootstrapWitness {
        const ret = this.wasm.get(index);
        return new $outer.BootstrapWitness(ret, $outer._ctx);
      }

      add(witness: WasmContract.BootstrapWitness): boolean {
        return this.wasm.add(witness.wasm);
      }

    }
    return BootstrapWitnesses;
  })();

  public ByronAddress = (() => {
    const $outer = this;

    class ByronAddress
      extends Ptr<WasmV4.ByronAddress>
      implements WasmContract.ByronAddress
    {

      toBase58(): string {
        return this.wasm.to_base58();
      }

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.ByronAddress {
        const ret = WasmV4.ByronAddress.from_bytes(bytes);
        return new $outer.ByronAddress(ret, $outer._ctx);
      }

      byronProtocolMagic(): number {
        return this.wasm.byron_protocol_magic();
      }

      byronAddressKind(): WasmContract.ByronAddressType {
        return this.wasm.byron_address_kind();
      }

      attributes(): Uint8Array {
        return this.wasm.attributes();
      }

      networkId(): number {
        return this.wasm.network_id();
      }

      static fromBase58(s: string): WasmContract.ByronAddress {
        const ret = WasmV4.ByronAddress.from_base58(s);
        return new $outer.ByronAddress(ret, $outer._ctx);
      }

      static icarusFromKey(key: WasmContract.Bip32PublicKey, protocolMagic: number): WasmContract.ByronAddress {
        const ret = WasmV4.ByronAddress.icarus_from_key(key.wasm, protocolMagic);
        return new $outer.ByronAddress(ret, $outer._ctx);
      }

      static isValid(s: string): boolean {
        return WasmV4.ByronAddress.is_valid(s);
      }

      toAddress(): WasmContract.Address {
        const ret = this.wasm.to_address();
        return new $outer.Address(ret, $outer._ctx);
      }

      static fromAddress(addr: WasmContract.Address): Optional<WasmContract.ByronAddress> {
        const ret = WasmV4.ByronAddress.from_address(addr.wasm);
        if (ret == null) return undefined;
        return new $outer.ByronAddress(ret, $outer._ctx);
      }

    }
    return ByronAddress;
  })();

  public Certificate = (() => {
    const $outer = this;

    class Certificate
      extends Ptr<WasmV4.Certificate>
      implements WasmContract.Certificate
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.Certificate {
        const ret = WasmV4.Certificate.from_bytes(bytes);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.Certificate {
        const ret = WasmV4.Certificate.from_hex(hexStr);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.Certificate {
        const ret = WasmV4.Certificate.from_json(json);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      static newStakeRegistration(stakeRegistration: WasmContract.StakeRegistration): WasmContract.Certificate {
        const ret = WasmV4.Certificate.new_stake_registration(stakeRegistration.wasm);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      static newRegCert(stakeRegistration: WasmContract.StakeRegistration): WasmContract.Certificate {
        const ret = WasmV4.Certificate.new_reg_cert(stakeRegistration.wasm);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      static newStakeDeregistration(stakeDeregistration: WasmContract.StakeDeregistration): WasmContract.Certificate {
        const ret = WasmV4.Certificate.new_stake_deregistration(stakeDeregistration.wasm);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      static newUnregCert(stakeDeregistration: WasmContract.StakeDeregistration): WasmContract.Certificate {
        const ret = WasmV4.Certificate.new_unreg_cert(stakeDeregistration.wasm);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      static newStakeDelegation(stakeDelegation: WasmContract.StakeDelegation): WasmContract.Certificate {
        const ret = WasmV4.Certificate.new_stake_delegation(stakeDelegation.wasm);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      static newPoolRegistration(poolRegistration: WasmContract.PoolRegistration): WasmContract.Certificate {
        const ret = WasmV4.Certificate.new_pool_registration(poolRegistration.wasm);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      static newPoolRetirement(poolRetirement: WasmContract.PoolRetirement): WasmContract.Certificate {
        const ret = WasmV4.Certificate.new_pool_retirement(poolRetirement.wasm);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      static newGenesisKeyDelegation(genesisKeyDelegation: WasmContract.GenesisKeyDelegation): WasmContract.Certificate {
        const ret = WasmV4.Certificate.new_genesis_key_delegation(genesisKeyDelegation.wasm);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      static newMoveInstantaneousRewardsCert(moveInstantaneousRewardsCert: WasmContract.MoveInstantaneousRewardsCert): WasmContract.Certificate {
        const ret = WasmV4.Certificate.new_move_instantaneous_rewards_cert(moveInstantaneousRewardsCert.wasm);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      static newCommitteeHotAuth(committeeHotAuth: WasmContract.CommitteeHotAuth): WasmContract.Certificate {
        const ret = WasmV4.Certificate.new_committee_hot_auth(committeeHotAuth.wasm);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      static newCommitteeColdResign(committeeColdResign: WasmContract.CommitteeColdResign): WasmContract.Certificate {
        const ret = WasmV4.Certificate.new_committee_cold_resign(committeeColdResign.wasm);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      static newDrepDeregistration(drepDeregistration: WasmContract.DRepDeregistration): WasmContract.Certificate {
        const ret = WasmV4.Certificate.new_drep_deregistration(drepDeregistration.wasm);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      static newDrepRegistration(drepRegistration: WasmContract.DRepRegistration): WasmContract.Certificate {
        const ret = WasmV4.Certificate.new_drep_registration(drepRegistration.wasm);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      static newDrepUpdate(drepUpdate: WasmContract.DRepUpdate): WasmContract.Certificate {
        const ret = WasmV4.Certificate.new_drep_update(drepUpdate.wasm);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      static newStakeAndVoteDelegation(stakeAndVoteDelegation: WasmContract.StakeAndVoteDelegation): WasmContract.Certificate {
        const ret = WasmV4.Certificate.new_stake_and_vote_delegation(stakeAndVoteDelegation.wasm);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      static newStakeRegistrationAndDelegation(stakeRegistrationAndDelegation: WasmContract.StakeRegistrationAndDelegation): WasmContract.Certificate {
        const ret = WasmV4.Certificate.new_stake_registration_and_delegation(stakeRegistrationAndDelegation.wasm);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      static newStakeVoteRegistrationAndDelegation(stakeVoteRegistrationAndDelegation: WasmContract.StakeVoteRegistrationAndDelegation): WasmContract.Certificate {
        const ret = WasmV4.Certificate.new_stake_vote_registration_and_delegation(stakeVoteRegistrationAndDelegation.wasm);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      static newVoteDelegation(voteDelegation: WasmContract.VoteDelegation): WasmContract.Certificate {
        const ret = WasmV4.Certificate.new_vote_delegation(voteDelegation.wasm);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      static newVoteRegistrationAndDelegation(voteRegistrationAndDelegation: WasmContract.VoteRegistrationAndDelegation): WasmContract.Certificate {
        const ret = WasmV4.Certificate.new_vote_registration_and_delegation(voteRegistrationAndDelegation.wasm);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      kind(): WasmContract.CertificateKind {
        return this.wasm.kind();
      }

      asStakeRegistration(): Optional<WasmContract.StakeRegistration> {
        const ret = this.wasm.as_stake_registration();
        if (ret == null) return undefined;
        return new $outer.StakeRegistration(ret, $outer._ctx);
      }

      asRegCert(): Optional<WasmContract.StakeRegistration> {
        const ret = this.wasm.as_reg_cert();
        if (ret == null) return undefined;
        return new $outer.StakeRegistration(ret, $outer._ctx);
      }

      asStakeDeregistration(): Optional<WasmContract.StakeDeregistration> {
        const ret = this.wasm.as_stake_deregistration();
        if (ret == null) return undefined;
        return new $outer.StakeDeregistration(ret, $outer._ctx);
      }

      asUnregCert(): Optional<WasmContract.StakeDeregistration> {
        const ret = this.wasm.as_unreg_cert();
        if (ret == null) return undefined;
        return new $outer.StakeDeregistration(ret, $outer._ctx);
      }

      asStakeDelegation(): Optional<WasmContract.StakeDelegation> {
        const ret = this.wasm.as_stake_delegation();
        if (ret == null) return undefined;
        return new $outer.StakeDelegation(ret, $outer._ctx);
      }

      asPoolRegistration(): Optional<WasmContract.PoolRegistration> {
        const ret = this.wasm.as_pool_registration();
        if (ret == null) return undefined;
        return new $outer.PoolRegistration(ret, $outer._ctx);
      }

      asPoolRetirement(): Optional<WasmContract.PoolRetirement> {
        const ret = this.wasm.as_pool_retirement();
        if (ret == null) return undefined;
        return new $outer.PoolRetirement(ret, $outer._ctx);
      }

      asGenesisKeyDelegation(): Optional<WasmContract.GenesisKeyDelegation> {
        const ret = this.wasm.as_genesis_key_delegation();
        if (ret == null) return undefined;
        return new $outer.GenesisKeyDelegation(ret, $outer._ctx);
      }

      asMoveInstantaneousRewardsCert(): Optional<WasmContract.MoveInstantaneousRewardsCert> {
        const ret = this.wasm.as_move_instantaneous_rewards_cert();
        if (ret == null) return undefined;
        return new $outer.MoveInstantaneousRewardsCert(ret, $outer._ctx);
      }

      asCommitteeHotAuth(): Optional<WasmContract.CommitteeHotAuth> {
        const ret = this.wasm.as_committee_hot_auth();
        if (ret == null) return undefined;
        return new $outer.CommitteeHotAuth(ret, $outer._ctx);
      }

      asCommitteeColdResign(): Optional<WasmContract.CommitteeColdResign> {
        const ret = this.wasm.as_committee_cold_resign();
        if (ret == null) return undefined;
        return new $outer.CommitteeColdResign(ret, $outer._ctx);
      }

      asDrepDeregistration(): Optional<WasmContract.DRepDeregistration> {
        const ret = this.wasm.as_drep_deregistration();
        if (ret == null) return undefined;
        return new $outer.DRepDeregistration(ret, $outer._ctx);
      }

      asDrepRegistration(): Optional<WasmContract.DRepRegistration> {
        const ret = this.wasm.as_drep_registration();
        if (ret == null) return undefined;
        return new $outer.DRepRegistration(ret, $outer._ctx);
      }

      asDrepUpdate(): Optional<WasmContract.DRepUpdate> {
        const ret = this.wasm.as_drep_update();
        if (ret == null) return undefined;
        return new $outer.DRepUpdate(ret, $outer._ctx);
      }

      asStakeAndVoteDelegation(): Optional<WasmContract.StakeAndVoteDelegation> {
        const ret = this.wasm.as_stake_and_vote_delegation();
        if (ret == null) return undefined;
        return new $outer.StakeAndVoteDelegation(ret, $outer._ctx);
      }

      asStakeRegistrationAndDelegation(): Optional<WasmContract.StakeRegistrationAndDelegation> {
        const ret = this.wasm.as_stake_registration_and_delegation();
        if (ret == null) return undefined;
        return new $outer.StakeRegistrationAndDelegation(ret, $outer._ctx);
      }

      asStakeVoteRegistrationAndDelegation(): Optional<WasmContract.StakeVoteRegistrationAndDelegation> {
        const ret = this.wasm.as_stake_vote_registration_and_delegation();
        if (ret == null) return undefined;
        return new $outer.StakeVoteRegistrationAndDelegation(ret, $outer._ctx);
      }

      asVoteDelegation(): Optional<WasmContract.VoteDelegation> {
        const ret = this.wasm.as_vote_delegation();
        if (ret == null) return undefined;
        return new $outer.VoteDelegation(ret, $outer._ctx);
      }

      asVoteRegistrationAndDelegation(): Optional<WasmContract.VoteRegistrationAndDelegation> {
        const ret = this.wasm.as_vote_registration_and_delegation();
        if (ret == null) return undefined;
        return new $outer.VoteRegistrationAndDelegation(ret, $outer._ctx);
      }

      hasRequiredScriptWitness(): boolean {
        return this.wasm.has_required_script_witness();
      }

    }
    return Certificate;
  })();

  public Certificates = (() => {
    const $outer = this;

    class Certificates
      extends Ptr<WasmV4.Certificates>
      implements WasmContract.Certificates
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.Certificates {
        const ret = WasmV4.Certificates.from_bytes(bytes);
        return new $outer.Certificates(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.Certificates {
        const ret = WasmV4.Certificates.from_hex(hexStr);
        return new $outer.Certificates(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.Certificates {
        const ret = WasmV4.Certificates.from_json(json);
        return new $outer.Certificates(ret, $outer._ctx);
      }

      static new(): WasmContract.Certificates {
        const ret = WasmV4.Certificates.new();
        return new $outer.Certificates(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      get(index: number): WasmContract.Certificate {
        const ret = this.wasm.get(index);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      add(elem: WasmContract.Certificate): boolean {
        return this.wasm.add(elem.wasm);
      }

    }
    return Certificates;
  })();

  public CertificatesBuilder = (() => {
    const $outer = this;

    class CertificatesBuilder
      extends Ptr<WasmV4.CertificatesBuilder>
      implements WasmContract.CertificatesBuilder
    {

      static new(): WasmContract.CertificatesBuilder {
        const ret = WasmV4.CertificatesBuilder.new();
        return new $outer.CertificatesBuilder(ret, $outer._ctx);
      }

      add(cert: WasmContract.Certificate): void {
        return this.wasm.add(cert.wasm);
      }

      addWithPlutusWitness(cert: WasmContract.Certificate, witness: WasmContract.PlutusWitness): void {
        return this.wasm.add_with_plutus_witness(cert.wasm, witness.wasm);
      }

      addWithNativeScript(cert: WasmContract.Certificate, nativeScriptSource: WasmContract.NativeScriptSource): void {
        return this.wasm.add_with_native_script(cert.wasm, nativeScriptSource.wasm);
      }

      getPlutusWitnesses(): WasmContract.PlutusWitnesses {
        const ret = this.wasm.get_plutus_witnesses();
        return new $outer.PlutusWitnesses(ret, $outer._ctx);
      }

      getRefInputs(): WasmContract.TransactionInputs {
        const ret = this.wasm.get_ref_inputs();
        return new $outer.TransactionInputs(ret, $outer._ctx);
      }

      getNativeScripts(): WasmContract.NativeScripts {
        const ret = this.wasm.get_native_scripts();
        return new $outer.NativeScripts(ret, $outer._ctx);
      }

      getCertificatesRefund(poolDeposit: WasmContract.BigNum, keyDeposit: WasmContract.BigNum): WasmContract.Value {
        const ret = this.wasm.get_certificates_refund(poolDeposit.wasm, keyDeposit.wasm);
        return new $outer.Value(ret, $outer._ctx);
      }

      getCertificatesDeposit(poolDeposit: WasmContract.BigNum, keyDeposit: WasmContract.BigNum): WasmContract.BigNum {
        const ret = this.wasm.get_certificates_deposit(poolDeposit.wasm, keyDeposit.wasm);
        return new $outer.BigNum(ret, $outer._ctx);
      }

      hasPlutusScripts(): boolean {
        return this.wasm.has_plutus_scripts();
      }

      build(): WasmContract.Certificates {
        const ret = this.wasm.build();
        return new $outer.Certificates(ret, $outer._ctx);
      }

    }
    return CertificatesBuilder;
  })();

  public ChangeConfig = (() => {
    const $outer = this;

    class ChangeConfig
      extends Ptr<WasmV4.ChangeConfig>
      implements WasmContract.ChangeConfig
    {

      static new(address: WasmContract.Address): WasmContract.ChangeConfig {
        const ret = WasmV4.ChangeConfig.new(address.wasm);
        return new $outer.ChangeConfig(ret, $outer._ctx);
      }

      changeAddress(address: WasmContract.Address): WasmContract.ChangeConfig {
        const ret = this.wasm.change_address(address.wasm);
        return new $outer.ChangeConfig(ret, $outer._ctx);
      }

      changePlutusData(plutusData: WasmContract.OutputDatum): WasmContract.ChangeConfig {
        const ret = this.wasm.change_plutus_data(plutusData.wasm);
        return new $outer.ChangeConfig(ret, $outer._ctx);
      }

      changeScriptRef(scriptRef: WasmContract.ScriptRef): WasmContract.ChangeConfig {
        const ret = this.wasm.change_script_ref(scriptRef.wasm);
        return new $outer.ChangeConfig(ret, $outer._ctx);
      }

    }
    return ChangeConfig;
  })();

  public Committee = (() => {
    const $outer = this;

    class Committee
      extends Ptr<WasmV4.Committee>
      implements WasmContract.Committee
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.Committee {
        const ret = WasmV4.Committee.from_bytes(bytes);
        return new $outer.Committee(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.Committee {
        const ret = WasmV4.Committee.from_hex(hexStr);
        return new $outer.Committee(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.Committee {
        const ret = WasmV4.Committee.from_json(json);
        return new $outer.Committee(ret, $outer._ctx);
      }

      static new(quorumThreshold: WasmContract.UnitInterval): WasmContract.Committee {
        const ret = WasmV4.Committee.new(quorumThreshold.wasm);
        return new $outer.Committee(ret, $outer._ctx);
      }

      membersKeys(): WasmContract.Credentials {
        const ret = this.wasm.members_keys();
        return new $outer.Credentials(ret, $outer._ctx);
      }

      quorumThreshold(): WasmContract.UnitInterval {
        const ret = this.wasm.quorum_threshold();
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      addMember(committeeColdCredential: WasmContract.Credential, epoch: number): void {
        return this.wasm.add_member(committeeColdCredential.wasm, epoch);
      }

      getMemberEpoch(committeeColdCredential: WasmContract.Credential): Optional<number> {
        return this.wasm.get_member_epoch(committeeColdCredential.wasm);
      }

    }
    return Committee;
  })();

  public CommitteeColdResign = (() => {
    const $outer = this;

    class CommitteeColdResign
      extends Ptr<WasmV4.CommitteeColdResign>
      implements WasmContract.CommitteeColdResign
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.CommitteeColdResign {
        const ret = WasmV4.CommitteeColdResign.from_bytes(bytes);
        return new $outer.CommitteeColdResign(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.CommitteeColdResign {
        const ret = WasmV4.CommitteeColdResign.from_hex(hexStr);
        return new $outer.CommitteeColdResign(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.CommitteeColdResign {
        const ret = WasmV4.CommitteeColdResign.from_json(json);
        return new $outer.CommitteeColdResign(ret, $outer._ctx);
      }

      committeeColdCredential(): WasmContract.Credential {
        const ret = this.wasm.committee_cold_credential();
        return new $outer.Credential(ret, $outer._ctx);
      }

      anchor(): Optional<WasmContract.Anchor> {
        const ret = this.wasm.anchor();
        if (ret == null) return undefined;
        return new $outer.Anchor(ret, $outer._ctx);
      }

      static new(committeeColdCredential: WasmContract.Credential): WasmContract.CommitteeColdResign {
        const ret = WasmV4.CommitteeColdResign.new(committeeColdCredential.wasm);
        return new $outer.CommitteeColdResign(ret, $outer._ctx);
      }

      static newWithAnchor(committeeColdCredential: WasmContract.Credential, anchor: WasmContract.Anchor): WasmContract.CommitteeColdResign {
        const ret = WasmV4.CommitteeColdResign.new_with_anchor(committeeColdCredential.wasm, anchor.wasm);
        return new $outer.CommitteeColdResign(ret, $outer._ctx);
      }

      hasScriptCredentials(): boolean {
        return this.wasm.has_script_credentials();
      }

    }
    return CommitteeColdResign;
  })();

  public CommitteeHotAuth = (() => {
    const $outer = this;

    class CommitteeHotAuth
      extends Ptr<WasmV4.CommitteeHotAuth>
      implements WasmContract.CommitteeHotAuth
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.CommitteeHotAuth {
        const ret = WasmV4.CommitteeHotAuth.from_bytes(bytes);
        return new $outer.CommitteeHotAuth(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.CommitteeHotAuth {
        const ret = WasmV4.CommitteeHotAuth.from_hex(hexStr);
        return new $outer.CommitteeHotAuth(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.CommitteeHotAuth {
        const ret = WasmV4.CommitteeHotAuth.from_json(json);
        return new $outer.CommitteeHotAuth(ret, $outer._ctx);
      }

      committeeColdCredential(): WasmContract.Credential {
        const ret = this.wasm.committee_cold_credential();
        return new $outer.Credential(ret, $outer._ctx);
      }

      committeeHotCredential(): WasmContract.Credential {
        const ret = this.wasm.committee_hot_credential();
        return new $outer.Credential(ret, $outer._ctx);
      }

      static new(committeeColdCredential: WasmContract.Credential, committeeHotCredential: WasmContract.Credential): WasmContract.CommitteeHotAuth {
        const ret = WasmV4.CommitteeHotAuth.new(committeeColdCredential.wasm, committeeHotCredential.wasm);
        return new $outer.CommitteeHotAuth(ret, $outer._ctx);
      }

      hasScriptCredentials(): boolean {
        return this.wasm.has_script_credentials();
      }

    }
    return CommitteeHotAuth;
  })();

  public Constitution = (() => {
    const $outer = this;

    class Constitution
      extends Ptr<WasmV4.Constitution>
      implements WasmContract.Constitution
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.Constitution {
        const ret = WasmV4.Constitution.from_bytes(bytes);
        return new $outer.Constitution(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.Constitution {
        const ret = WasmV4.Constitution.from_hex(hexStr);
        return new $outer.Constitution(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.Constitution {
        const ret = WasmV4.Constitution.from_json(json);
        return new $outer.Constitution(ret, $outer._ctx);
      }

      anchor(): WasmContract.Anchor {
        const ret = this.wasm.anchor();
        return new $outer.Anchor(ret, $outer._ctx);
      }

      scriptHash(): Optional<WasmContract.ScriptHash> {
        const ret = this.wasm.script_hash();
        if (ret == null) return undefined;
        return new $outer.ScriptHash(ret, $outer._ctx);
      }

      static new(anchor: WasmContract.Anchor): WasmContract.Constitution {
        const ret = WasmV4.Constitution.new(anchor.wasm);
        return new $outer.Constitution(ret, $outer._ctx);
      }

      static newWithScriptHash(anchor: WasmContract.Anchor, scriptHash: WasmContract.ScriptHash): WasmContract.Constitution {
        const ret = WasmV4.Constitution.new_with_script_hash(anchor.wasm, scriptHash.wasm);
        return new $outer.Constitution(ret, $outer._ctx);
      }

    }
    return Constitution;
  })();

  public ConstrPlutusData = (() => {
    const $outer = this;

    class ConstrPlutusData
      extends Ptr<WasmV4.ConstrPlutusData>
      implements WasmContract.ConstrPlutusData
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.ConstrPlutusData {
        const ret = WasmV4.ConstrPlutusData.from_bytes(bytes);
        return new $outer.ConstrPlutusData(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.ConstrPlutusData {
        const ret = WasmV4.ConstrPlutusData.from_hex(hexStr);
        return new $outer.ConstrPlutusData(ret, $outer._ctx);
      }

      alternative(): WasmContract.BigNum {
        const ret = this.wasm.alternative();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      data(): WasmContract.PlutusList {
        const ret = this.wasm.data();
        return new $outer.PlutusList(ret, $outer._ctx);
      }

      static new(alternative: WasmContract.BigNum, data: WasmContract.PlutusList): WasmContract.ConstrPlutusData {
        const ret = WasmV4.ConstrPlutusData.new(alternative.wasm, data.wasm);
        return new $outer.ConstrPlutusData(ret, $outer._ctx);
      }

    }
    return ConstrPlutusData;
  })();

  public CostModel = (() => {
    const $outer = this;

    class CostModel
      extends Ptr<WasmV4.CostModel>
      implements WasmContract.CostModel
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.CostModel {
        const ret = WasmV4.CostModel.from_bytes(bytes);
        return new $outer.CostModel(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.CostModel {
        const ret = WasmV4.CostModel.from_hex(hexStr);
        return new $outer.CostModel(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.CostModel {
        const ret = WasmV4.CostModel.from_json(json);
        return new $outer.CostModel(ret, $outer._ctx);
      }

      static new(): WasmContract.CostModel {
        const ret = WasmV4.CostModel.new();
        return new $outer.CostModel(ret, $outer._ctx);
      }

      set(operation: number, cost: WasmContract.Int): WasmContract.Int {
        const ret = this.wasm.set(operation, cost.wasm);
        return new $outer.Int(ret, $outer._ctx);
      }

      get(operation: number): WasmContract.Int {
        const ret = this.wasm.get(operation);
        return new $outer.Int(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

    }
    return CostModel;
  })();

  public Costmdls = (() => {
    const $outer = this;

    class Costmdls
      extends Ptr<WasmV4.Costmdls>
      implements WasmContract.Costmdls
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.Costmdls {
        const ret = WasmV4.Costmdls.from_bytes(bytes);
        return new $outer.Costmdls(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.Costmdls {
        const ret = WasmV4.Costmdls.from_hex(hexStr);
        return new $outer.Costmdls(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.Costmdls {
        const ret = WasmV4.Costmdls.from_json(json);
        return new $outer.Costmdls(ret, $outer._ctx);
      }

      static new(): WasmContract.Costmdls {
        const ret = WasmV4.Costmdls.new();
        return new $outer.Costmdls(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      insert(key: WasmContract.Language, value: WasmContract.CostModel): Optional<WasmContract.CostModel> {
        const ret = this.wasm.insert(key.wasm, value.wasm);
        if (ret == null) return undefined;
        return new $outer.CostModel(ret, $outer._ctx);
      }

      get(key: WasmContract.Language): Optional<WasmContract.CostModel> {
        const ret = this.wasm.get(key.wasm);
        if (ret == null) return undefined;
        return new $outer.CostModel(ret, $outer._ctx);
      }

      keys(): WasmContract.Languages {
        const ret = this.wasm.keys();
        return new $outer.Languages(ret, $outer._ctx);
      }

      retainLanguageVersions(languages: WasmContract.Languages): WasmContract.Costmdls {
        const ret = this.wasm.retain_language_versions(languages.wasm);
        return new $outer.Costmdls(ret, $outer._ctx);
      }

    }
    return Costmdls;
  })();

  public Credential = (() => {
    const $outer = this;

    class Credential
      extends Ptr<WasmV4.Credential>
      implements WasmContract.Credential
    {

      static fromKeyhash(hash: WasmContract.Ed25519KeyHash): WasmContract.Credential {
        const ret = WasmV4.Credential.from_keyhash(hash.wasm);
        return new $outer.Credential(ret, $outer._ctx);
      }

      static fromScripthash(hash: WasmContract.ScriptHash): WasmContract.Credential {
        const ret = WasmV4.Credential.from_scripthash(hash.wasm);
        return new $outer.Credential(ret, $outer._ctx);
      }

      toKeyhash(): Optional<WasmContract.Ed25519KeyHash> {
        const ret = this.wasm.to_keyhash();
        if (ret == null) return undefined;
        return new $outer.Ed25519KeyHash(ret, $outer._ctx);
      }

      toScripthash(): Optional<WasmContract.ScriptHash> {
        const ret = this.wasm.to_scripthash();
        if (ret == null) return undefined;
        return new $outer.ScriptHash(ret, $outer._ctx);
      }

      kind(): WasmContract.CredKind {
        return this.wasm.kind();
      }

      hasScriptHash(): boolean {
        return this.wasm.has_script_hash();
      }

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.Credential {
        const ret = WasmV4.Credential.from_bytes(bytes);
        return new $outer.Credential(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.Credential {
        const ret = WasmV4.Credential.from_hex(hexStr);
        return new $outer.Credential(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.Credential {
        const ret = WasmV4.Credential.from_json(json);
        return new $outer.Credential(ret, $outer._ctx);
      }

    }
    return Credential;
  })();

  public Credentials = (() => {
    const $outer = this;

    class Credentials
      extends Ptr<WasmV4.Credentials>
      implements WasmContract.Credentials
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.Credentials {
        const ret = WasmV4.Credentials.from_bytes(bytes);
        return new $outer.Credentials(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.Credentials {
        const ret = WasmV4.Credentials.from_hex(hexStr);
        return new $outer.Credentials(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.Credentials {
        const ret = WasmV4.Credentials.from_json(json);
        return new $outer.Credentials(ret, $outer._ctx);
      }

      static new(): WasmContract.Credentials {
        const ret = WasmV4.Credentials.new();
        return new $outer.Credentials(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      get(index: number): WasmContract.Credential {
        const ret = this.wasm.get(index);
        return new $outer.Credential(ret, $outer._ctx);
      }

      add(credential: WasmContract.Credential): boolean {
        return this.wasm.add(credential.wasm);
      }

    }
    return Credentials;
  })();

  public DNSRecordAorAAAA = (() => {
    const $outer = this;

    class DNSRecordAorAAAA
      extends Ptr<WasmV4.DNSRecordAorAAAA>
      implements WasmContract.DNSRecordAorAAAA
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.DNSRecordAorAAAA {
        const ret = WasmV4.DNSRecordAorAAAA.from_bytes(bytes);
        return new $outer.DNSRecordAorAAAA(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.DNSRecordAorAAAA {
        const ret = WasmV4.DNSRecordAorAAAA.from_hex(hexStr);
        return new $outer.DNSRecordAorAAAA(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.DNSRecordAorAAAA {
        const ret = WasmV4.DNSRecordAorAAAA.from_json(json);
        return new $outer.DNSRecordAorAAAA(ret, $outer._ctx);
      }

      static new(dnsName: string): WasmContract.DNSRecordAorAAAA {
        const ret = WasmV4.DNSRecordAorAAAA.new(dnsName);
        return new $outer.DNSRecordAorAAAA(ret, $outer._ctx);
      }

      record(): string {
        return this.wasm.record();
      }

    }
    return DNSRecordAorAAAA;
  })();

  public DNSRecordSRV = (() => {
    const $outer = this;

    class DNSRecordSRV
      extends Ptr<WasmV4.DNSRecordSRV>
      implements WasmContract.DNSRecordSRV
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.DNSRecordSRV {
        const ret = WasmV4.DNSRecordSRV.from_bytes(bytes);
        return new $outer.DNSRecordSRV(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.DNSRecordSRV {
        const ret = WasmV4.DNSRecordSRV.from_hex(hexStr);
        return new $outer.DNSRecordSRV(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.DNSRecordSRV {
        const ret = WasmV4.DNSRecordSRV.from_json(json);
        return new $outer.DNSRecordSRV(ret, $outer._ctx);
      }

      static new(dnsName: string): WasmContract.DNSRecordSRV {
        const ret = WasmV4.DNSRecordSRV.new(dnsName);
        return new $outer.DNSRecordSRV(ret, $outer._ctx);
      }

      record(): string {
        return this.wasm.record();
      }

    }
    return DNSRecordSRV;
  })();

  public DRep = (() => {
    const $outer = this;

    class DRep
      extends Ptr<WasmV4.DRep>
      implements WasmContract.DRep
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.DRep {
        const ret = WasmV4.DRep.from_bytes(bytes);
        return new $outer.DRep(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.DRep {
        const ret = WasmV4.DRep.from_hex(hexStr);
        return new $outer.DRep(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.DRep {
        const ret = WasmV4.DRep.from_json(json);
        return new $outer.DRep(ret, $outer._ctx);
      }

      static newKeyHash(keyHash: WasmContract.Ed25519KeyHash): WasmContract.DRep {
        const ret = WasmV4.DRep.new_key_hash(keyHash.wasm);
        return new $outer.DRep(ret, $outer._ctx);
      }

      static newScriptHash(scriptHash: WasmContract.ScriptHash): WasmContract.DRep {
        const ret = WasmV4.DRep.new_script_hash(scriptHash.wasm);
        return new $outer.DRep(ret, $outer._ctx);
      }

      static newAlwaysAbstain(): WasmContract.DRep {
        const ret = WasmV4.DRep.new_always_abstain();
        return new $outer.DRep(ret, $outer._ctx);
      }

      static newAlwaysNoConfidence(): WasmContract.DRep {
        const ret = WasmV4.DRep.new_always_no_confidence();
        return new $outer.DRep(ret, $outer._ctx);
      }

      static newFromCredential(cred: WasmContract.Credential): WasmContract.DRep {
        const ret = WasmV4.DRep.new_from_credential(cred.wasm);
        return new $outer.DRep(ret, $outer._ctx);
      }

      kind(): WasmContract.DRepKind {
        return this.wasm.kind();
      }

      toKeyHash(): Optional<WasmContract.Ed25519KeyHash> {
        const ret = this.wasm.to_key_hash();
        if (ret == null) return undefined;
        return new $outer.Ed25519KeyHash(ret, $outer._ctx);
      }

      toScriptHash(): Optional<WasmContract.ScriptHash> {
        const ret = this.wasm.to_script_hash();
        if (ret == null) return undefined;
        return new $outer.ScriptHash(ret, $outer._ctx);
      }

      toBech32(cip_129Format: boolean): string {
        return this.wasm.to_bech32(cip_129Format);
      }

      static fromBech32(bech32Str: string): WasmContract.DRep {
        const ret = WasmV4.DRep.from_bech32(bech32Str);
        return new $outer.DRep(ret, $outer._ctx);
      }

    }
    return DRep;
  })();

  public DRepDeregistration = (() => {
    const $outer = this;

    class DRepDeregistration
      extends Ptr<WasmV4.DRepDeregistration>
      implements WasmContract.DRepDeregistration
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.DRepDeregistration {
        const ret = WasmV4.DRepDeregistration.from_bytes(bytes);
        return new $outer.DRepDeregistration(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.DRepDeregistration {
        const ret = WasmV4.DRepDeregistration.from_hex(hexStr);
        return new $outer.DRepDeregistration(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.DRepDeregistration {
        const ret = WasmV4.DRepDeregistration.from_json(json);
        return new $outer.DRepDeregistration(ret, $outer._ctx);
      }

      votingCredential(): WasmContract.Credential {
        const ret = this.wasm.voting_credential();
        return new $outer.Credential(ret, $outer._ctx);
      }

      coin(): WasmContract.BigNum {
        const ret = this.wasm.coin();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      static new(votingCredential: WasmContract.Credential, coin: WasmContract.BigNum): WasmContract.DRepDeregistration {
        const ret = WasmV4.DRepDeregistration.new(votingCredential.wasm, coin.wasm);
        return new $outer.DRepDeregistration(ret, $outer._ctx);
      }

      hasScriptCredentials(): boolean {
        return this.wasm.has_script_credentials();
      }

    }
    return DRepDeregistration;
  })();

  public DRepRegistration = (() => {
    const $outer = this;

    class DRepRegistration
      extends Ptr<WasmV4.DRepRegistration>
      implements WasmContract.DRepRegistration
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.DRepRegistration {
        const ret = WasmV4.DRepRegistration.from_bytes(bytes);
        return new $outer.DRepRegistration(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.DRepRegistration {
        const ret = WasmV4.DRepRegistration.from_hex(hexStr);
        return new $outer.DRepRegistration(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.DRepRegistration {
        const ret = WasmV4.DRepRegistration.from_json(json);
        return new $outer.DRepRegistration(ret, $outer._ctx);
      }

      votingCredential(): WasmContract.Credential {
        const ret = this.wasm.voting_credential();
        return new $outer.Credential(ret, $outer._ctx);
      }

      coin(): WasmContract.BigNum {
        const ret = this.wasm.coin();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      anchor(): Optional<WasmContract.Anchor> {
        const ret = this.wasm.anchor();
        if (ret == null) return undefined;
        return new $outer.Anchor(ret, $outer._ctx);
      }

      static new(votingCredential: WasmContract.Credential, coin: WasmContract.BigNum): WasmContract.DRepRegistration {
        const ret = WasmV4.DRepRegistration.new(votingCredential.wasm, coin.wasm);
        return new $outer.DRepRegistration(ret, $outer._ctx);
      }

      static newWithAnchor(votingCredential: WasmContract.Credential, coin: WasmContract.BigNum, anchor: WasmContract.Anchor): WasmContract.DRepRegistration {
        const ret = WasmV4.DRepRegistration.new_with_anchor(votingCredential.wasm, coin.wasm, anchor.wasm);
        return new $outer.DRepRegistration(ret, $outer._ctx);
      }

      hasScriptCredentials(): boolean {
        return this.wasm.has_script_credentials();
      }

    }
    return DRepRegistration;
  })();

  public DRepUpdate = (() => {
    const $outer = this;

    class DRepUpdate
      extends Ptr<WasmV4.DRepUpdate>
      implements WasmContract.DRepUpdate
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.DRepUpdate {
        const ret = WasmV4.DRepUpdate.from_bytes(bytes);
        return new $outer.DRepUpdate(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.DRepUpdate {
        const ret = WasmV4.DRepUpdate.from_hex(hexStr);
        return new $outer.DRepUpdate(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.DRepUpdate {
        const ret = WasmV4.DRepUpdate.from_json(json);
        return new $outer.DRepUpdate(ret, $outer._ctx);
      }

      votingCredential(): WasmContract.Credential {
        const ret = this.wasm.voting_credential();
        return new $outer.Credential(ret, $outer._ctx);
      }

      anchor(): Optional<WasmContract.Anchor> {
        const ret = this.wasm.anchor();
        if (ret == null) return undefined;
        return new $outer.Anchor(ret, $outer._ctx);
      }

      static new(votingCredential: WasmContract.Credential): WasmContract.DRepUpdate {
        const ret = WasmV4.DRepUpdate.new(votingCredential.wasm);
        return new $outer.DRepUpdate(ret, $outer._ctx);
      }

      static newWithAnchor(votingCredential: WasmContract.Credential, anchor: WasmContract.Anchor): WasmContract.DRepUpdate {
        const ret = WasmV4.DRepUpdate.new_with_anchor(votingCredential.wasm, anchor.wasm);
        return new $outer.DRepUpdate(ret, $outer._ctx);
      }

      hasScriptCredentials(): boolean {
        return this.wasm.has_script_credentials();
      }

    }
    return DRepUpdate;
  })();

  public DRepVotingThresholds = (() => {
    const $outer = this;

    class DRepVotingThresholds
      extends Ptr<WasmV4.DRepVotingThresholds>
      implements WasmContract.DRepVotingThresholds
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.DRepVotingThresholds {
        const ret = WasmV4.DRepVotingThresholds.from_bytes(bytes);
        return new $outer.DRepVotingThresholds(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.DRepVotingThresholds {
        const ret = WasmV4.DRepVotingThresholds.from_hex(hexStr);
        return new $outer.DRepVotingThresholds(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.DRepVotingThresholds {
        const ret = WasmV4.DRepVotingThresholds.from_json(json);
        return new $outer.DRepVotingThresholds(ret, $outer._ctx);
      }

      static new(motionNoConfidence: WasmContract.UnitInterval, committeeNormal: WasmContract.UnitInterval, committeeNoConfidence: WasmContract.UnitInterval, updateConstitution: WasmContract.UnitInterval, hardForkInitiation: WasmContract.UnitInterval, ppNetworkGroup: WasmContract.UnitInterval, ppEconomicGroup: WasmContract.UnitInterval, ppTechnicalGroup: WasmContract.UnitInterval, ppGovernanceGroup: WasmContract.UnitInterval, treasuryWithdrawal: WasmContract.UnitInterval): WasmContract.DRepVotingThresholds {
        const ret = WasmV4.DRepVotingThresholds.new(motionNoConfidence.wasm, committeeNormal.wasm, committeeNoConfidence.wasm, updateConstitution.wasm, hardForkInitiation.wasm, ppNetworkGroup.wasm, ppEconomicGroup.wasm, ppTechnicalGroup.wasm, ppGovernanceGroup.wasm, treasuryWithdrawal.wasm);
        return new $outer.DRepVotingThresholds(ret, $outer._ctx);
      }

      setMotionNoConfidence(motionNoConfidence: WasmContract.UnitInterval): void {
        return this.wasm.set_motion_no_confidence(motionNoConfidence.wasm);
      }

      setCommitteeNormal(committeeNormal: WasmContract.UnitInterval): void {
        return this.wasm.set_committee_normal(committeeNormal.wasm);
      }

      setCommitteeNoConfidence(committeeNoConfidence: WasmContract.UnitInterval): void {
        return this.wasm.set_committee_no_confidence(committeeNoConfidence.wasm);
      }

      setUpdateConstitution(updateConstitution: WasmContract.UnitInterval): void {
        return this.wasm.set_update_constitution(updateConstitution.wasm);
      }

      setHardForkInitiation(hardForkInitiation: WasmContract.UnitInterval): void {
        return this.wasm.set_hard_fork_initiation(hardForkInitiation.wasm);
      }

      setPpNetworkGroup(ppNetworkGroup: WasmContract.UnitInterval): void {
        return this.wasm.set_pp_network_group(ppNetworkGroup.wasm);
      }

      setPpEconomicGroup(ppEconomicGroup: WasmContract.UnitInterval): void {
        return this.wasm.set_pp_economic_group(ppEconomicGroup.wasm);
      }

      setPpTechnicalGroup(ppTechnicalGroup: WasmContract.UnitInterval): void {
        return this.wasm.set_pp_technical_group(ppTechnicalGroup.wasm);
      }

      setPpGovernanceGroup(ppGovernanceGroup: WasmContract.UnitInterval): void {
        return this.wasm.set_pp_governance_group(ppGovernanceGroup.wasm);
      }

      setTreasuryWithdrawal(treasuryWithdrawal: WasmContract.UnitInterval): void {
        return this.wasm.set_treasury_withdrawal(treasuryWithdrawal.wasm);
      }

      motionNoConfidence(): WasmContract.UnitInterval {
        const ret = this.wasm.motion_no_confidence();
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      committeeNormal(): WasmContract.UnitInterval {
        const ret = this.wasm.committee_normal();
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      committeeNoConfidence(): WasmContract.UnitInterval {
        const ret = this.wasm.committee_no_confidence();
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      updateConstitution(): WasmContract.UnitInterval {
        const ret = this.wasm.update_constitution();
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      hardForkInitiation(): WasmContract.UnitInterval {
        const ret = this.wasm.hard_fork_initiation();
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      ppNetworkGroup(): WasmContract.UnitInterval {
        const ret = this.wasm.pp_network_group();
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      ppEconomicGroup(): WasmContract.UnitInterval {
        const ret = this.wasm.pp_economic_group();
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      ppTechnicalGroup(): WasmContract.UnitInterval {
        const ret = this.wasm.pp_technical_group();
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      ppGovernanceGroup(): WasmContract.UnitInterval {
        const ret = this.wasm.pp_governance_group();
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      treasuryWithdrawal(): WasmContract.UnitInterval {
        const ret = this.wasm.treasury_withdrawal();
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

    }
    return DRepVotingThresholds;
  })();

  public DataCost = (() => {
    const $outer = this;

    class DataCost
      extends Ptr<WasmV4.DataCost>
      implements WasmContract.DataCost
    {

      static newCoinsPerByte(coinsPerByte: WasmContract.BigNum): WasmContract.DataCost {
        const ret = WasmV4.DataCost.new_coins_per_byte(coinsPerByte.wasm);
        return new $outer.DataCost(ret, $outer._ctx);
      }

      coinsPerByte(): WasmContract.BigNum {
        const ret = this.wasm.coins_per_byte();
        return new $outer.BigNum(ret, $outer._ctx);
      }

    }
    return DataCost;
  })();

  public DataHash = (() => {
    const $outer = this;

    class DataHash
      extends Ptr<WasmV4.DataHash>
      implements WasmContract.DataHash
    {

      static fromBytes(bytes: Uint8Array): WasmContract.DataHash {
        const ret = WasmV4.DataHash.from_bytes(bytes);
        return new $outer.DataHash(ret, $outer._ctx);
      }

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      toBech32(prefix: string): string {
        return this.wasm.to_bech32(prefix);
      }

      static fromBech32(bechStr: string): WasmContract.DataHash {
        const ret = WasmV4.DataHash.from_bech32(bechStr);
        return new $outer.DataHash(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hex: string): WasmContract.DataHash {
        const ret = WasmV4.DataHash.from_hex(hex);
        return new $outer.DataHash(ret, $outer._ctx);
      }

    }
    return DataHash;
  })();

  public DatumSource = (() => {
    const $outer = this;

    class DatumSource
      extends Ptr<WasmV4.DatumSource>
      implements WasmContract.DatumSource
    {

      static new(datum: WasmContract.PlutusData): WasmContract.DatumSource {
        const ret = WasmV4.DatumSource.new(datum.wasm);
        return new $outer.DatumSource(ret, $outer._ctx);
      }

      static newRefInput(input: WasmContract.TransactionInput): WasmContract.DatumSource {
        const ret = WasmV4.DatumSource.new_ref_input(input.wasm);
        return new $outer.DatumSource(ret, $outer._ctx);
      }

    }
    return DatumSource;
  })();

  public Ed25519KeyHash = (() => {
    const $outer = this;

    class Ed25519KeyHash
      extends Ptr<WasmV4.Ed25519KeyHash>
      implements WasmContract.Ed25519KeyHash
    {

      static fromBytes(bytes: Uint8Array): WasmContract.Ed25519KeyHash {
        const ret = WasmV4.Ed25519KeyHash.from_bytes(bytes);
        return new $outer.Ed25519KeyHash(ret, $outer._ctx);
      }

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      toBech32(prefix: string): string {
        return this.wasm.to_bech32(prefix);
      }

      static fromBech32(bechStr: string): WasmContract.Ed25519KeyHash {
        const ret = WasmV4.Ed25519KeyHash.from_bech32(bechStr);
        return new $outer.Ed25519KeyHash(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hex: string): WasmContract.Ed25519KeyHash {
        const ret = WasmV4.Ed25519KeyHash.from_hex(hex);
        return new $outer.Ed25519KeyHash(ret, $outer._ctx);
      }

    }
    return Ed25519KeyHash;
  })();

  public Ed25519KeyHashes = (() => {
    const $outer = this;

    class Ed25519KeyHashes
      extends Ptr<WasmV4.Ed25519KeyHashes>
      implements WasmContract.Ed25519KeyHashes
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.Ed25519KeyHashes {
        const ret = WasmV4.Ed25519KeyHashes.from_bytes(bytes);
        return new $outer.Ed25519KeyHashes(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.Ed25519KeyHashes {
        const ret = WasmV4.Ed25519KeyHashes.from_hex(hexStr);
        return new $outer.Ed25519KeyHashes(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.Ed25519KeyHashes {
        const ret = WasmV4.Ed25519KeyHashes.from_json(json);
        return new $outer.Ed25519KeyHashes(ret, $outer._ctx);
      }

      static new(): WasmContract.Ed25519KeyHashes {
        const ret = WasmV4.Ed25519KeyHashes.new();
        return new $outer.Ed25519KeyHashes(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      get(index: number): WasmContract.Ed25519KeyHash {
        const ret = this.wasm.get(index);
        return new $outer.Ed25519KeyHash(ret, $outer._ctx);
      }

      add(keyhash: WasmContract.Ed25519KeyHash): boolean {
        return this.wasm.add(keyhash.wasm);
      }

      contains(elem: WasmContract.Ed25519KeyHash): boolean {
        return this.wasm.contains(elem.wasm);
      }

      toOption(): Optional<WasmContract.Ed25519KeyHashes> {
        const ret = this.wasm.to_option();
        if (ret == null) return undefined;
        return new $outer.Ed25519KeyHashes(ret, $outer._ctx);
      }

    }
    return Ed25519KeyHashes;
  })();

  public Ed25519Signature = (() => {
    const $outer = this;

    class Ed25519Signature
      extends Ptr<WasmV4.Ed25519Signature>
      implements WasmContract.Ed25519Signature
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      toBech32(): string {
        return this.wasm.to_bech32();
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromBech32(bech32Str: string): WasmContract.Ed25519Signature {
        const ret = WasmV4.Ed25519Signature.from_bech32(bech32Str);
        return new $outer.Ed25519Signature(ret, $outer._ctx);
      }

      static fromHex(input: string): WasmContract.Ed25519Signature {
        const ret = WasmV4.Ed25519Signature.from_hex(input);
        return new $outer.Ed25519Signature(ret, $outer._ctx);
      }

      static fromBytes(bytes: Uint8Array): WasmContract.Ed25519Signature {
        const ret = WasmV4.Ed25519Signature.from_bytes(bytes);
        return new $outer.Ed25519Signature(ret, $outer._ctx);
      }

    }
    return Ed25519Signature;
  })();

  public EnterpriseAddress = (() => {
    const $outer = this;

    class EnterpriseAddress
      extends Ptr<WasmV4.EnterpriseAddress>
      implements WasmContract.EnterpriseAddress
    {

      static new(network: number, payment: WasmContract.Credential): WasmContract.EnterpriseAddress {
        const ret = WasmV4.EnterpriseAddress.new(network, payment.wasm);
        return new $outer.EnterpriseAddress(ret, $outer._ctx);
      }

      paymentCred(): WasmContract.Credential {
        const ret = this.wasm.payment_cred();
        return new $outer.Credential(ret, $outer._ctx);
      }

      toAddress(): WasmContract.Address {
        const ret = this.wasm.to_address();
        return new $outer.Address(ret, $outer._ctx);
      }

      static fromAddress(addr: WasmContract.Address): Optional<WasmContract.EnterpriseAddress> {
        const ret = WasmV4.EnterpriseAddress.from_address(addr.wasm);
        if (ret == null) return undefined;
        return new $outer.EnterpriseAddress(ret, $outer._ctx);
      }

      networkId(): number {
        return this.wasm.network_id();
      }

    }
    return EnterpriseAddress;
  })();

  public ExUnitPrices = (() => {
    const $outer = this;

    class ExUnitPrices
      extends Ptr<WasmV4.ExUnitPrices>
      implements WasmContract.ExUnitPrices
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.ExUnitPrices {
        const ret = WasmV4.ExUnitPrices.from_bytes(bytes);
        return new $outer.ExUnitPrices(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.ExUnitPrices {
        const ret = WasmV4.ExUnitPrices.from_hex(hexStr);
        return new $outer.ExUnitPrices(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.ExUnitPrices {
        const ret = WasmV4.ExUnitPrices.from_json(json);
        return new $outer.ExUnitPrices(ret, $outer._ctx);
      }

      memPrice(): WasmContract.UnitInterval {
        const ret = this.wasm.mem_price();
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      stepPrice(): WasmContract.UnitInterval {
        const ret = this.wasm.step_price();
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      static new(memPrice: WasmContract.UnitInterval, stepPrice: WasmContract.UnitInterval): WasmContract.ExUnitPrices {
        const ret = WasmV4.ExUnitPrices.new(memPrice.wasm, stepPrice.wasm);
        return new $outer.ExUnitPrices(ret, $outer._ctx);
      }

    }
    return ExUnitPrices;
  })();

  public ExUnits = (() => {
    const $outer = this;

    class ExUnits
      extends Ptr<WasmV4.ExUnits>
      implements WasmContract.ExUnits
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.ExUnits {
        const ret = WasmV4.ExUnits.from_bytes(bytes);
        return new $outer.ExUnits(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.ExUnits {
        const ret = WasmV4.ExUnits.from_hex(hexStr);
        return new $outer.ExUnits(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.ExUnits {
        const ret = WasmV4.ExUnits.from_json(json);
        return new $outer.ExUnits(ret, $outer._ctx);
      }

      mem(): WasmContract.BigNum {
        const ret = this.wasm.mem();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      steps(): WasmContract.BigNum {
        const ret = this.wasm.steps();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      static new(mem: WasmContract.BigNum, steps: WasmContract.BigNum): WasmContract.ExUnits {
        const ret = WasmV4.ExUnits.new(mem.wasm, steps.wasm);
        return new $outer.ExUnits(ret, $outer._ctx);
      }

    }
    return ExUnits;
  })();

  public FixedBlock = (() => {
    const $outer = this;

    class FixedBlock
      extends Ptr<WasmV4.FixedBlock>
      implements WasmContract.FixedBlock
    {

      static fromBytes(bytes: Uint8Array): WasmContract.FixedBlock {
        const ret = WasmV4.FixedBlock.from_bytes(bytes);
        return new $outer.FixedBlock(ret, $outer._ctx);
      }

      static fromHex(hexStr: string): WasmContract.FixedBlock {
        const ret = WasmV4.FixedBlock.from_hex(hexStr);
        return new $outer.FixedBlock(ret, $outer._ctx);
      }

      header(): WasmContract.Header {
        const ret = this.wasm.header();
        return new $outer.Header(ret, $outer._ctx);
      }

      transactionBodies(): WasmContract.FixedTransactionBodies {
        const ret = this.wasm.transaction_bodies();
        return new $outer.FixedTransactionBodies(ret, $outer._ctx);
      }

      transactionWitnessSets(): WasmContract.TransactionWitnessSets {
        const ret = this.wasm.transaction_witness_sets();
        return new $outer.TransactionWitnessSets(ret, $outer._ctx);
      }

      auxiliaryDataSet(): WasmContract.AuxiliaryDataSet {
        const ret = this.wasm.auxiliary_data_set();
        return new $outer.AuxiliaryDataSet(ret, $outer._ctx);
      }

      invalidTransactions(): Uint32Array {
        return this.wasm.invalid_transactions();
      }

      blockHash(): WasmContract.BlockHash {
        const ret = this.wasm.block_hash();
        return new $outer.BlockHash(ret, $outer._ctx);
      }

    }
    return FixedBlock;
  })();

  public FixedTransaction = (() => {
    const $outer = this;

    class FixedTransaction
      extends Ptr<WasmV4.FixedTransaction>
      implements WasmContract.FixedTransaction
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.FixedTransaction {
        const ret = WasmV4.FixedTransaction.from_bytes(bytes);
        return new $outer.FixedTransaction(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.FixedTransaction {
        const ret = WasmV4.FixedTransaction.from_hex(hexStr);
        return new $outer.FixedTransaction(ret, $outer._ctx);
      }

      static new(rawBody: Uint8Array, rawWitnessSet: Uint8Array, isValid: boolean): WasmContract.FixedTransaction {
        const ret = WasmV4.FixedTransaction.new(rawBody, rawWitnessSet, isValid);
        return new $outer.FixedTransaction(ret, $outer._ctx);
      }

      static newWithAuxiliary(rawBody: Uint8Array, rawWitnessSet: Uint8Array, rawAuxiliaryData: Uint8Array, isValid: boolean): WasmContract.FixedTransaction {
        const ret = WasmV4.FixedTransaction.new_with_auxiliary(rawBody, rawWitnessSet, rawAuxiliaryData, isValid);
        return new $outer.FixedTransaction(ret, $outer._ctx);
      }

      static newFromBodyBytes(rawBody: Uint8Array): WasmContract.FixedTransaction {
        const ret = WasmV4.FixedTransaction.new_from_body_bytes(rawBody);
        return new $outer.FixedTransaction(ret, $outer._ctx);
      }

      body(): WasmContract.TransactionBody {
        const ret = this.wasm.body();
        return new $outer.TransactionBody(ret, $outer._ctx);
      }

      rawBody(): Uint8Array {
        return this.wasm.raw_body();
      }

      setBody(rawBody: Uint8Array): void {
        return this.wasm.set_body(rawBody);
      }

      setWitnessSet(rawWitnessSet: Uint8Array): void {
        return this.wasm.set_witness_set(rawWitnessSet);
      }

      witnessSet(): WasmContract.TransactionWitnessSet {
        const ret = this.wasm.witness_set();
        return new $outer.TransactionWitnessSet(ret, $outer._ctx);
      }

      rawWitnessSet(): Uint8Array {
        return this.wasm.raw_witness_set();
      }

      setIsValid(valid: boolean): void {
        return this.wasm.set_is_valid(valid);
      }

      isValid(): boolean {
        return this.wasm.is_valid();
      }

      setAuxiliaryData(rawAuxiliaryData: Uint8Array): void {
        return this.wasm.set_auxiliary_data(rawAuxiliaryData);
      }

      auxiliaryData(): Optional<WasmContract.AuxiliaryData> {
        const ret = this.wasm.auxiliary_data();
        if (ret == null) return undefined;
        return new $outer.AuxiliaryData(ret, $outer._ctx);
      }

      rawAuxiliaryData(): Optional<Uint8Array> {
        return this.wasm.raw_auxiliary_data();
      }

      transactionHash(): WasmContract.TransactionHash {
        const ret = this.wasm.transaction_hash();
        return new $outer.TransactionHash(ret, $outer._ctx);
      }

      addVkeyWitness(vkeyWitness: WasmContract.Vkeywitness): void {
        return this.wasm.add_vkey_witness(vkeyWitness.wasm);
      }

      addBootstrapWitness(bootstrapWitness: WasmContract.BootstrapWitness): void {
        return this.wasm.add_bootstrap_witness(bootstrapWitness.wasm);
      }

      signAndAddVkeySignature(privateKey: WasmContract.PrivateKey): void {
        return this.wasm.sign_and_add_vkey_signature(privateKey.wasm);
      }

      signAndAddIcarusBootstrapSignature(addr: WasmContract.ByronAddress, privateKey: WasmContract.Bip32PrivateKey): void {
        return this.wasm.sign_and_add_icarus_bootstrap_signature(addr.wasm, privateKey.wasm);
      }

      signAndAddDaedalusBootstrapSignature(addr: WasmContract.ByronAddress, privateKey: WasmContract.LegacyDaedalusPrivateKey): void {
        return this.wasm.sign_and_add_daedalus_bootstrap_signature(addr.wasm, privateKey.wasm);
      }

    }
    return FixedTransaction;
  })();

  public FixedTransactionBodies = (() => {
    const $outer = this;

    class FixedTransactionBodies
      extends Ptr<WasmV4.FixedTransactionBodies>
      implements WasmContract.FixedTransactionBodies
    {

      static fromBytes(bytes: Uint8Array): WasmContract.FixedTransactionBodies {
        const ret = WasmV4.FixedTransactionBodies.from_bytes(bytes);
        return new $outer.FixedTransactionBodies(ret, $outer._ctx);
      }

      static fromHex(hexStr: string): WasmContract.FixedTransactionBodies {
        const ret = WasmV4.FixedTransactionBodies.from_hex(hexStr);
        return new $outer.FixedTransactionBodies(ret, $outer._ctx);
      }

      static new(): WasmContract.FixedTransactionBodies {
        const ret = WasmV4.FixedTransactionBodies.new();
        return new $outer.FixedTransactionBodies(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      get(index: number): WasmContract.FixedTransactionBody {
        const ret = this.wasm.get(index);
        return new $outer.FixedTransactionBody(ret, $outer._ctx);
      }

      add(elem: WasmContract.FixedTransactionBody): void {
        return this.wasm.add(elem.wasm);
      }

    }
    return FixedTransactionBodies;
  })();

  public FixedTransactionBody = (() => {
    const $outer = this;

    class FixedTransactionBody
      extends Ptr<WasmV4.FixedTransactionBody>
      implements WasmContract.FixedTransactionBody
    {

      static fromBytes(bytes: Uint8Array): WasmContract.FixedTransactionBody {
        const ret = WasmV4.FixedTransactionBody.from_bytes(bytes);
        return new $outer.FixedTransactionBody(ret, $outer._ctx);
      }

      static fromHex(hexStr: string): WasmContract.FixedTransactionBody {
        const ret = WasmV4.FixedTransactionBody.from_hex(hexStr);
        return new $outer.FixedTransactionBody(ret, $outer._ctx);
      }

      transactionBody(): WasmContract.TransactionBody {
        const ret = this.wasm.transaction_body();
        return new $outer.TransactionBody(ret, $outer._ctx);
      }

      txHash(): WasmContract.TransactionHash {
        const ret = this.wasm.tx_hash();
        return new $outer.TransactionHash(ret, $outer._ctx);
      }

      originalBytes(): Uint8Array {
        return this.wasm.original_bytes();
      }

    }
    return FixedTransactionBody;
  })();

  public FixedTxWitnessesSet = (() => {
    const $outer = this;

    class FixedTxWitnessesSet
      extends Ptr<WasmV4.FixedTxWitnessesSet>
      implements WasmContract.FixedTxWitnessesSet
    {

      txWitnessesSet(): WasmContract.TransactionWitnessSet {
        const ret = this.wasm.tx_witnesses_set();
        return new $outer.TransactionWitnessSet(ret, $outer._ctx);
      }

      addVkeyWitness(vkeyWitness: WasmContract.Vkeywitness): void {
        return this.wasm.add_vkey_witness(vkeyWitness.wasm);
      }

      addBootstrapWitness(bootstrapWitness: WasmContract.BootstrapWitness): void {
        return this.wasm.add_bootstrap_witness(bootstrapWitness.wasm);
      }

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(data: Uint8Array): WasmContract.FixedTxWitnessesSet {
        const ret = WasmV4.FixedTxWitnessesSet.from_bytes(data);
        return new $outer.FixedTxWitnessesSet(ret, $outer._ctx);
      }

    }
    return FixedTxWitnessesSet;
  })();

  public FixedVersionedBlock = (() => {
    const $outer = this;

    class FixedVersionedBlock
      extends Ptr<WasmV4.FixedVersionedBlock>
      implements WasmContract.FixedVersionedBlock
    {

      static fromBytes(bytes: Uint8Array): WasmContract.FixedVersionedBlock {
        const ret = WasmV4.FixedVersionedBlock.from_bytes(bytes);
        return new $outer.FixedVersionedBlock(ret, $outer._ctx);
      }

      static fromHex(hexStr: string): WasmContract.FixedVersionedBlock {
        const ret = WasmV4.FixedVersionedBlock.from_hex(hexStr);
        return new $outer.FixedVersionedBlock(ret, $outer._ctx);
      }

      block(): WasmContract.FixedBlock {
        const ret = this.wasm.block();
        return new $outer.FixedBlock(ret, $outer._ctx);
      }

      era(): WasmContract.BlockEra {
        return this.wasm.era();
      }

    }
    return FixedVersionedBlock;
  })();

  public GeneralTransactionMetadata = (() => {
    const $outer = this;

    class GeneralTransactionMetadata
      extends Ptr<WasmV4.GeneralTransactionMetadata>
      implements WasmContract.GeneralTransactionMetadata
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.GeneralTransactionMetadata {
        const ret = WasmV4.GeneralTransactionMetadata.from_bytes(bytes);
        return new $outer.GeneralTransactionMetadata(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.GeneralTransactionMetadata {
        const ret = WasmV4.GeneralTransactionMetadata.from_hex(hexStr);
        return new $outer.GeneralTransactionMetadata(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.GeneralTransactionMetadata {
        const ret = WasmV4.GeneralTransactionMetadata.from_json(json);
        return new $outer.GeneralTransactionMetadata(ret, $outer._ctx);
      }

      static new(): WasmContract.GeneralTransactionMetadata {
        const ret = WasmV4.GeneralTransactionMetadata.new();
        return new $outer.GeneralTransactionMetadata(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      insert(key: WasmContract.BigNum, value: WasmContract.TransactionMetadatum): Optional<WasmContract.TransactionMetadatum> {
        const ret = this.wasm.insert(key.wasm, value.wasm);
        if (ret == null) return undefined;
        return new $outer.TransactionMetadatum(ret, $outer._ctx);
      }

      get(key: WasmContract.BigNum): Optional<WasmContract.TransactionMetadatum> {
        const ret = this.wasm.get(key.wasm);
        if (ret == null) return undefined;
        return new $outer.TransactionMetadatum(ret, $outer._ctx);
      }

      keys(): WasmContract.TransactionMetadatumLabels {
        const ret = this.wasm.keys();
        return new $outer.TransactionMetadatumLabels(ret, $outer._ctx);
      }

    }
    return GeneralTransactionMetadata;
  })();

  public GenesisDelegateHash = (() => {
    const $outer = this;

    class GenesisDelegateHash
      extends Ptr<WasmV4.GenesisDelegateHash>
      implements WasmContract.GenesisDelegateHash
    {

      static fromBytes(bytes: Uint8Array): WasmContract.GenesisDelegateHash {
        const ret = WasmV4.GenesisDelegateHash.from_bytes(bytes);
        return new $outer.GenesisDelegateHash(ret, $outer._ctx);
      }

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      toBech32(prefix: string): string {
        return this.wasm.to_bech32(prefix);
      }

      static fromBech32(bechStr: string): WasmContract.GenesisDelegateHash {
        const ret = WasmV4.GenesisDelegateHash.from_bech32(bechStr);
        return new $outer.GenesisDelegateHash(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hex: string): WasmContract.GenesisDelegateHash {
        const ret = WasmV4.GenesisDelegateHash.from_hex(hex);
        return new $outer.GenesisDelegateHash(ret, $outer._ctx);
      }

    }
    return GenesisDelegateHash;
  })();

  public GenesisHash = (() => {
    const $outer = this;

    class GenesisHash
      extends Ptr<WasmV4.GenesisHash>
      implements WasmContract.GenesisHash
    {

      static fromBytes(bytes: Uint8Array): WasmContract.GenesisHash {
        const ret = WasmV4.GenesisHash.from_bytes(bytes);
        return new $outer.GenesisHash(ret, $outer._ctx);
      }

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      toBech32(prefix: string): string {
        return this.wasm.to_bech32(prefix);
      }

      static fromBech32(bechStr: string): WasmContract.GenesisHash {
        const ret = WasmV4.GenesisHash.from_bech32(bechStr);
        return new $outer.GenesisHash(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hex: string): WasmContract.GenesisHash {
        const ret = WasmV4.GenesisHash.from_hex(hex);
        return new $outer.GenesisHash(ret, $outer._ctx);
      }

    }
    return GenesisHash;
  })();

  public GenesisHashes = (() => {
    const $outer = this;

    class GenesisHashes
      extends Ptr<WasmV4.GenesisHashes>
      implements WasmContract.GenesisHashes
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.GenesisHashes {
        const ret = WasmV4.GenesisHashes.from_bytes(bytes);
        return new $outer.GenesisHashes(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.GenesisHashes {
        const ret = WasmV4.GenesisHashes.from_hex(hexStr);
        return new $outer.GenesisHashes(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.GenesisHashes {
        const ret = WasmV4.GenesisHashes.from_json(json);
        return new $outer.GenesisHashes(ret, $outer._ctx);
      }

      static new(): WasmContract.GenesisHashes {
        const ret = WasmV4.GenesisHashes.new();
        return new $outer.GenesisHashes(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      get(index: number): WasmContract.GenesisHash {
        const ret = this.wasm.get(index);
        return new $outer.GenesisHash(ret, $outer._ctx);
      }

      add(elem: WasmContract.GenesisHash): void {
        return this.wasm.add(elem.wasm);
      }

    }
    return GenesisHashes;
  })();

  public GenesisKeyDelegation = (() => {
    const $outer = this;

    class GenesisKeyDelegation
      extends Ptr<WasmV4.GenesisKeyDelegation>
      implements WasmContract.GenesisKeyDelegation
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.GenesisKeyDelegation {
        const ret = WasmV4.GenesisKeyDelegation.from_bytes(bytes);
        return new $outer.GenesisKeyDelegation(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.GenesisKeyDelegation {
        const ret = WasmV4.GenesisKeyDelegation.from_hex(hexStr);
        return new $outer.GenesisKeyDelegation(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.GenesisKeyDelegation {
        const ret = WasmV4.GenesisKeyDelegation.from_json(json);
        return new $outer.GenesisKeyDelegation(ret, $outer._ctx);
      }

      genesishash(): WasmContract.GenesisHash {
        const ret = this.wasm.genesishash();
        return new $outer.GenesisHash(ret, $outer._ctx);
      }

      genesisDelegateHash(): WasmContract.GenesisDelegateHash {
        const ret = this.wasm.genesis_delegate_hash();
        return new $outer.GenesisDelegateHash(ret, $outer._ctx);
      }

      vrfKeyhash(): WasmContract.VRFKeyHash {
        const ret = this.wasm.vrf_keyhash();
        return new $outer.VRFKeyHash(ret, $outer._ctx);
      }

      static new(genesishash: WasmContract.GenesisHash, genesisDelegateHash: WasmContract.GenesisDelegateHash, vrfKeyhash: WasmContract.VRFKeyHash): WasmContract.GenesisKeyDelegation {
        const ret = WasmV4.GenesisKeyDelegation.new(genesishash.wasm, genesisDelegateHash.wasm, vrfKeyhash.wasm);
        return new $outer.GenesisKeyDelegation(ret, $outer._ctx);
      }

    }
    return GenesisKeyDelegation;
  })();

  public GovernanceAction = (() => {
    const $outer = this;

    class GovernanceAction
      extends Ptr<WasmV4.GovernanceAction>
      implements WasmContract.GovernanceAction
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.GovernanceAction {
        const ret = WasmV4.GovernanceAction.from_bytes(bytes);
        return new $outer.GovernanceAction(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.GovernanceAction {
        const ret = WasmV4.GovernanceAction.from_hex(hexStr);
        return new $outer.GovernanceAction(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.GovernanceAction {
        const ret = WasmV4.GovernanceAction.from_json(json);
        return new $outer.GovernanceAction(ret, $outer._ctx);
      }

      static newParameterChangeAction(parameterChangeAction: WasmContract.ParameterChangeAction): WasmContract.GovernanceAction {
        const ret = WasmV4.GovernanceAction.new_parameter_change_action(parameterChangeAction.wasm);
        return new $outer.GovernanceAction(ret, $outer._ctx);
      }

      static newHardForkInitiationAction(hardForkInitiationAction: WasmContract.HardForkInitiationAction): WasmContract.GovernanceAction {
        const ret = WasmV4.GovernanceAction.new_hard_fork_initiation_action(hardForkInitiationAction.wasm);
        return new $outer.GovernanceAction(ret, $outer._ctx);
      }

      static newTreasuryWithdrawalsAction(treasuryWithdrawalsAction: WasmContract.TreasuryWithdrawalsAction): WasmContract.GovernanceAction {
        const ret = WasmV4.GovernanceAction.new_treasury_withdrawals_action(treasuryWithdrawalsAction.wasm);
        return new $outer.GovernanceAction(ret, $outer._ctx);
      }

      static newNoConfidenceAction(noConfidenceAction: WasmContract.NoConfidenceAction): WasmContract.GovernanceAction {
        const ret = WasmV4.GovernanceAction.new_no_confidence_action(noConfidenceAction.wasm);
        return new $outer.GovernanceAction(ret, $outer._ctx);
      }

      static newNewCommitteeAction(newCommitteeAction: WasmContract.UpdateCommitteeAction): WasmContract.GovernanceAction {
        const ret = WasmV4.GovernanceAction.new_new_committee_action(newCommitteeAction.wasm);
        return new $outer.GovernanceAction(ret, $outer._ctx);
      }

      static newNewConstitutionAction(newConstitutionAction: WasmContract.NewConstitutionAction): WasmContract.GovernanceAction {
        const ret = WasmV4.GovernanceAction.new_new_constitution_action(newConstitutionAction.wasm);
        return new $outer.GovernanceAction(ret, $outer._ctx);
      }

      static newInfoAction(infoAction: WasmContract.InfoAction): WasmContract.GovernanceAction {
        const ret = WasmV4.GovernanceAction.new_info_action(infoAction.wasm);
        return new $outer.GovernanceAction(ret, $outer._ctx);
      }

      kind(): WasmContract.GovernanceActionKind {
        return this.wasm.kind();
      }

      asParameterChangeAction(): Optional<WasmContract.ParameterChangeAction> {
        const ret = this.wasm.as_parameter_change_action();
        if (ret == null) return undefined;
        return new $outer.ParameterChangeAction(ret, $outer._ctx);
      }

      asHardForkInitiationAction(): Optional<WasmContract.HardForkInitiationAction> {
        const ret = this.wasm.as_hard_fork_initiation_action();
        if (ret == null) return undefined;
        return new $outer.HardForkInitiationAction(ret, $outer._ctx);
      }

      asTreasuryWithdrawalsAction(): Optional<WasmContract.TreasuryWithdrawalsAction> {
        const ret = this.wasm.as_treasury_withdrawals_action();
        if (ret == null) return undefined;
        return new $outer.TreasuryWithdrawalsAction(ret, $outer._ctx);
      }

      asNoConfidenceAction(): Optional<WasmContract.NoConfidenceAction> {
        const ret = this.wasm.as_no_confidence_action();
        if (ret == null) return undefined;
        return new $outer.NoConfidenceAction(ret, $outer._ctx);
      }

      asNewCommitteeAction(): Optional<WasmContract.UpdateCommitteeAction> {
        const ret = this.wasm.as_new_committee_action();
        if (ret == null) return undefined;
        return new $outer.UpdateCommitteeAction(ret, $outer._ctx);
      }

      asNewConstitutionAction(): Optional<WasmContract.NewConstitutionAction> {
        const ret = this.wasm.as_new_constitution_action();
        if (ret == null) return undefined;
        return new $outer.NewConstitutionAction(ret, $outer._ctx);
      }

      asInfoAction(): Optional<WasmContract.InfoAction> {
        const ret = this.wasm.as_info_action();
        if (ret == null) return undefined;
        return new $outer.InfoAction(ret, $outer._ctx);
      }

    }
    return GovernanceAction;
  })();

  public GovernanceActionId = (() => {
    const $outer = this;

    class GovernanceActionId
      extends Ptr<WasmV4.GovernanceActionId>
      implements WasmContract.GovernanceActionId
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.GovernanceActionId {
        const ret = WasmV4.GovernanceActionId.from_bytes(bytes);
        return new $outer.GovernanceActionId(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.GovernanceActionId {
        const ret = WasmV4.GovernanceActionId.from_hex(hexStr);
        return new $outer.GovernanceActionId(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.GovernanceActionId {
        const ret = WasmV4.GovernanceActionId.from_json(json);
        return new $outer.GovernanceActionId(ret, $outer._ctx);
      }

      transactionId(): WasmContract.TransactionHash {
        const ret = this.wasm.transaction_id();
        return new $outer.TransactionHash(ret, $outer._ctx);
      }

      index(): number {
        return this.wasm.index();
      }

      static new(transactionId: WasmContract.TransactionHash, index: number): WasmContract.GovernanceActionId {
        const ret = WasmV4.GovernanceActionId.new(transactionId.wasm, index);
        return new $outer.GovernanceActionId(ret, $outer._ctx);
      }

    }
    return GovernanceActionId;
  })();

  public GovernanceActionIds = (() => {
    const $outer = this;

    class GovernanceActionIds
      extends Ptr<WasmV4.GovernanceActionIds>
      implements WasmContract.GovernanceActionIds
    {

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.GovernanceActionIds {
        const ret = WasmV4.GovernanceActionIds.from_json(json);
        return new $outer.GovernanceActionIds(ret, $outer._ctx);
      }

      static new(): WasmContract.GovernanceActionIds {
        const ret = WasmV4.GovernanceActionIds.new();
        return new $outer.GovernanceActionIds(ret, $outer._ctx);
      }

      add(governanceActionId: WasmContract.GovernanceActionId): void {
        return this.wasm.add(governanceActionId.wasm);
      }

      get(index: number): Optional<WasmContract.GovernanceActionId> {
        const ret = this.wasm.get(index);
        if (ret == null) return undefined;
        return new $outer.GovernanceActionId(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

    }
    return GovernanceActionIds;
  })();

  public HardForkInitiationAction = (() => {
    const $outer = this;

    class HardForkInitiationAction
      extends Ptr<WasmV4.HardForkInitiationAction>
      implements WasmContract.HardForkInitiationAction
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.HardForkInitiationAction {
        const ret = WasmV4.HardForkInitiationAction.from_bytes(bytes);
        return new $outer.HardForkInitiationAction(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.HardForkInitiationAction {
        const ret = WasmV4.HardForkInitiationAction.from_hex(hexStr);
        return new $outer.HardForkInitiationAction(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.HardForkInitiationAction {
        const ret = WasmV4.HardForkInitiationAction.from_json(json);
        return new $outer.HardForkInitiationAction(ret, $outer._ctx);
      }

      govActionId(): Optional<WasmContract.GovernanceActionId> {
        const ret = this.wasm.gov_action_id();
        if (ret == null) return undefined;
        return new $outer.GovernanceActionId(ret, $outer._ctx);
      }

      protocolVersion(): WasmContract.ProtocolVersion {
        const ret = this.wasm.protocol_version();
        return new $outer.ProtocolVersion(ret, $outer._ctx);
      }

      static new(protocolVersion: WasmContract.ProtocolVersion): WasmContract.HardForkInitiationAction {
        const ret = WasmV4.HardForkInitiationAction.new(protocolVersion.wasm);
        return new $outer.HardForkInitiationAction(ret, $outer._ctx);
      }

      static newWithActionId(govActionId: WasmContract.GovernanceActionId, protocolVersion: WasmContract.ProtocolVersion): WasmContract.HardForkInitiationAction {
        const ret = WasmV4.HardForkInitiationAction.new_with_action_id(govActionId.wasm, protocolVersion.wasm);
        return new $outer.HardForkInitiationAction(ret, $outer._ctx);
      }

    }
    return HardForkInitiationAction;
  })();

  public Header = (() => {
    const $outer = this;

    class Header
      extends Ptr<WasmV4.Header>
      implements WasmContract.Header
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.Header {
        const ret = WasmV4.Header.from_bytes(bytes);
        return new $outer.Header(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.Header {
        const ret = WasmV4.Header.from_hex(hexStr);
        return new $outer.Header(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.Header {
        const ret = WasmV4.Header.from_json(json);
        return new $outer.Header(ret, $outer._ctx);
      }

      headerBody(): WasmContract.HeaderBody {
        const ret = this.wasm.header_body();
        return new $outer.HeaderBody(ret, $outer._ctx);
      }

      bodySignature(): WasmContract.KESSignature {
        const ret = this.wasm.body_signature();
        return new $outer.KESSignature(ret, $outer._ctx);
      }

      static new(headerBody: WasmContract.HeaderBody, bodySignature: WasmContract.KESSignature): WasmContract.Header {
        const ret = WasmV4.Header.new(headerBody.wasm, bodySignature.wasm);
        return new $outer.Header(ret, $outer._ctx);
      }

    }
    return Header;
  })();

  public HeaderBody = (() => {
    const $outer = this;

    class HeaderBody
      extends Ptr<WasmV4.HeaderBody>
      implements WasmContract.HeaderBody
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.HeaderBody {
        const ret = WasmV4.HeaderBody.from_bytes(bytes);
        return new $outer.HeaderBody(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.HeaderBody {
        const ret = WasmV4.HeaderBody.from_hex(hexStr);
        return new $outer.HeaderBody(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.HeaderBody {
        const ret = WasmV4.HeaderBody.from_json(json);
        return new $outer.HeaderBody(ret, $outer._ctx);
      }

      blockNumber(): number {
        return this.wasm.block_number();
      }

      slot(): number {
        return this.wasm.slot();
      }

      slotBignum(): WasmContract.BigNum {
        const ret = this.wasm.slot_bignum();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      prevHash(): Optional<WasmContract.BlockHash> {
        const ret = this.wasm.prev_hash();
        if (ret == null) return undefined;
        return new $outer.BlockHash(ret, $outer._ctx);
      }

      issuerVkey(): WasmContract.Vkey {
        const ret = this.wasm.issuer_vkey();
        return new $outer.Vkey(ret, $outer._ctx);
      }

      vrfVkey(): WasmContract.VRFVKey {
        const ret = this.wasm.vrf_vkey();
        return new $outer.VRFVKey(ret, $outer._ctx);
      }

      hasNonceAndLeaderVrf(): boolean {
        return this.wasm.has_nonce_and_leader_vrf();
      }

      nonceVrfOrNothing(): Optional<WasmContract.VRFCert> {
        const ret = this.wasm.nonce_vrf_or_nothing();
        if (ret == null) return undefined;
        return new $outer.VRFCert(ret, $outer._ctx);
      }

      leaderVrfOrNothing(): Optional<WasmContract.VRFCert> {
        const ret = this.wasm.leader_vrf_or_nothing();
        if (ret == null) return undefined;
        return new $outer.VRFCert(ret, $outer._ctx);
      }

      hasVrfResult(): boolean {
        return this.wasm.has_vrf_result();
      }

      vrfResultOrNothing(): Optional<WasmContract.VRFCert> {
        const ret = this.wasm.vrf_result_or_nothing();
        if (ret == null) return undefined;
        return new $outer.VRFCert(ret, $outer._ctx);
      }

      blockBodySize(): number {
        return this.wasm.block_body_size();
      }

      blockBodyHash(): WasmContract.BlockHash {
        const ret = this.wasm.block_body_hash();
        return new $outer.BlockHash(ret, $outer._ctx);
      }

      operationalCert(): WasmContract.OperationalCert {
        const ret = this.wasm.operational_cert();
        return new $outer.OperationalCert(ret, $outer._ctx);
      }

      protocolVersion(): WasmContract.ProtocolVersion {
        const ret = this.wasm.protocol_version();
        return new $outer.ProtocolVersion(ret, $outer._ctx);
      }

      static new(blockNumber: number, slot: number, prevHash: Optional<WasmContract.BlockHash>, issuerVkey: WasmContract.Vkey, vrfVkey: WasmContract.VRFVKey, vrfResult: WasmContract.VRFCert, blockBodySize: number, blockBodyHash: WasmContract.BlockHash, operationalCert: WasmContract.OperationalCert, protocolVersion: WasmContract.ProtocolVersion): WasmContract.HeaderBody {
        const ret = WasmV4.HeaderBody.new(blockNumber, slot, prevHash?.wasm, issuerVkey.wasm, vrfVkey.wasm, vrfResult.wasm, blockBodySize, blockBodyHash.wasm, operationalCert.wasm, protocolVersion.wasm);
        return new $outer.HeaderBody(ret, $outer._ctx);
      }

      static newHeaderbody(blockNumber: number, slot: WasmContract.BigNum, prevHash: Optional<WasmContract.BlockHash>, issuerVkey: WasmContract.Vkey, vrfVkey: WasmContract.VRFVKey, vrfResult: WasmContract.VRFCert, blockBodySize: number, blockBodyHash: WasmContract.BlockHash, operationalCert: WasmContract.OperationalCert, protocolVersion: WasmContract.ProtocolVersion): WasmContract.HeaderBody {
        const ret = WasmV4.HeaderBody.new_headerbody(blockNumber, slot.wasm, prevHash?.wasm, issuerVkey.wasm, vrfVkey.wasm, vrfResult.wasm, blockBodySize, blockBodyHash.wasm, operationalCert.wasm, protocolVersion.wasm);
        return new $outer.HeaderBody(ret, $outer._ctx);
      }

    }
    return HeaderBody;
  })();

  public InfoAction = (() => {
    const $outer = this;

    class InfoAction
      extends Ptr<WasmV4.InfoAction>
      implements WasmContract.InfoAction
    {

      static new(): WasmContract.InfoAction {
        const ret = WasmV4.InfoAction.new();
        return new $outer.InfoAction(ret, $outer._ctx);
      }

    }
    return InfoAction;
  })();

  public Int = (() => {
    const $outer = this;

    class Int
      extends Ptr<WasmV4.Int>
      implements WasmContract.Int
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.Int {
        const ret = WasmV4.Int.from_bytes(bytes);
        return new $outer.Int(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.Int {
        const ret = WasmV4.Int.from_hex(hexStr);
        return new $outer.Int(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.Int {
        const ret = WasmV4.Int.from_json(json);
        return new $outer.Int(ret, $outer._ctx);
      }

      static new(x: WasmContract.BigNum): WasmContract.Int {
        const ret = WasmV4.Int.new(x.wasm);
        return new $outer.Int(ret, $outer._ctx);
      }

      static newNegative(x: WasmContract.BigNum): WasmContract.Int {
        const ret = WasmV4.Int.new_negative(x.wasm);
        return new $outer.Int(ret, $outer._ctx);
      }

      static newI32(x: number): WasmContract.Int {
        const ret = WasmV4.Int.new_i32(x);
        return new $outer.Int(ret, $outer._ctx);
      }

      isPositive(): boolean {
        return this.wasm.is_positive();
      }

      asPositive(): Optional<WasmContract.BigNum> {
        const ret = this.wasm.as_positive();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      asNegative(): Optional<WasmContract.BigNum> {
        const ret = this.wasm.as_negative();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      asI32(): Optional<number> {
        return this.wasm.as_i32();
      }

      asI32OrNothing(): Optional<number> {
        return this.wasm.as_i32_or_nothing();
      }

      asI32OrFail(): number {
        return this.wasm.as_i32_or_fail();
      }

      toStr(): string {
        return this.wasm.to_str();
      }

      static fromStr(string: string): WasmContract.Int {
        const ret = WasmV4.Int.from_str(string);
        return new $outer.Int(ret, $outer._ctx);
      }

    }
    return Int;
  })();

  public Ipv4 = (() => {
    const $outer = this;

    class Ipv4
      extends Ptr<WasmV4.Ipv4>
      implements WasmContract.Ipv4
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.Ipv4 {
        const ret = WasmV4.Ipv4.from_bytes(bytes);
        return new $outer.Ipv4(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.Ipv4 {
        const ret = WasmV4.Ipv4.from_hex(hexStr);
        return new $outer.Ipv4(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.Ipv4 {
        const ret = WasmV4.Ipv4.from_json(json);
        return new $outer.Ipv4(ret, $outer._ctx);
      }

      static new(data: Uint8Array): WasmContract.Ipv4 {
        const ret = WasmV4.Ipv4.new(data);
        return new $outer.Ipv4(ret, $outer._ctx);
      }

      ip(): Uint8Array {
        return this.wasm.ip();
      }

    }
    return Ipv4;
  })();

  public Ipv6 = (() => {
    const $outer = this;

    class Ipv6
      extends Ptr<WasmV4.Ipv6>
      implements WasmContract.Ipv6
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.Ipv6 {
        const ret = WasmV4.Ipv6.from_bytes(bytes);
        return new $outer.Ipv6(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.Ipv6 {
        const ret = WasmV4.Ipv6.from_hex(hexStr);
        return new $outer.Ipv6(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.Ipv6 {
        const ret = WasmV4.Ipv6.from_json(json);
        return new $outer.Ipv6(ret, $outer._ctx);
      }

      static new(data: Uint8Array): WasmContract.Ipv6 {
        const ret = WasmV4.Ipv6.new(data);
        return new $outer.Ipv6(ret, $outer._ctx);
      }

      ip(): Uint8Array {
        return this.wasm.ip();
      }

    }
    return Ipv6;
  })();

  public KESSignature = (() => {
    const $outer = this;

    class KESSignature
      extends Ptr<WasmV4.KESSignature>
      implements WasmContract.KESSignature
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.KESSignature {
        const ret = WasmV4.KESSignature.from_bytes(bytes);
        return new $outer.KESSignature(ret, $outer._ctx);
      }

    }
    return KESSignature;
  })();

  public KESVKey = (() => {
    const $outer = this;

    class KESVKey
      extends Ptr<WasmV4.KESVKey>
      implements WasmContract.KESVKey
    {

      static fromBytes(bytes: Uint8Array): WasmContract.KESVKey {
        const ret = WasmV4.KESVKey.from_bytes(bytes);
        return new $outer.KESVKey(ret, $outer._ctx);
      }

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      toBech32(prefix: string): string {
        return this.wasm.to_bech32(prefix);
      }

      static fromBech32(bechStr: string): WasmContract.KESVKey {
        const ret = WasmV4.KESVKey.from_bech32(bechStr);
        return new $outer.KESVKey(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hex: string): WasmContract.KESVKey {
        const ret = WasmV4.KESVKey.from_hex(hex);
        return new $outer.KESVKey(ret, $outer._ctx);
      }

    }
    return KESVKey;
  })();

  public Language = (() => {
    const $outer = this;

    class Language
      extends Ptr<WasmV4.Language>
      implements WasmContract.Language
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.Language {
        const ret = WasmV4.Language.from_bytes(bytes);
        return new $outer.Language(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.Language {
        const ret = WasmV4.Language.from_hex(hexStr);
        return new $outer.Language(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.Language {
        const ret = WasmV4.Language.from_json(json);
        return new $outer.Language(ret, $outer._ctx);
      }

      static newPlutusV1(): WasmContract.Language {
        const ret = WasmV4.Language.new_plutus_v1();
        return new $outer.Language(ret, $outer._ctx);
      }

      static newPlutusV2(): WasmContract.Language {
        const ret = WasmV4.Language.new_plutus_v2();
        return new $outer.Language(ret, $outer._ctx);
      }

      static newPlutusV3(): WasmContract.Language {
        const ret = WasmV4.Language.new_plutus_v3();
        return new $outer.Language(ret, $outer._ctx);
      }

      kind(): WasmContract.LanguageKind {
        return this.wasm.kind();
      }

    }
    return Language;
  })();

  public Languages = (() => {
    const $outer = this;

    class Languages
      extends Ptr<WasmV4.Languages>
      implements WasmContract.Languages
    {

      static new(): WasmContract.Languages {
        const ret = WasmV4.Languages.new();
        return new $outer.Languages(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      get(index: number): WasmContract.Language {
        const ret = this.wasm.get(index);
        return new $outer.Language(ret, $outer._ctx);
      }

      add(elem: WasmContract.Language): void {
        return this.wasm.add(elem.wasm);
      }

      static list(): WasmContract.Languages {
        const ret = WasmV4.Languages.list();
        return new $outer.Languages(ret, $outer._ctx);
      }

    }
    return Languages;
  })();

  public LegacyDaedalusPrivateKey = (() => {
    const $outer = this;

    class LegacyDaedalusPrivateKey
      extends Ptr<WasmV4.LegacyDaedalusPrivateKey>
      implements WasmContract.LegacyDaedalusPrivateKey
    {

      static fromBytes(bytes: Uint8Array): WasmContract.LegacyDaedalusPrivateKey {
        const ret = WasmV4.LegacyDaedalusPrivateKey.from_bytes(bytes);
        return new $outer.LegacyDaedalusPrivateKey(ret, $outer._ctx);
      }

      asBytes(): Uint8Array {
        return this.wasm.as_bytes();
      }

      chaincode(): Uint8Array {
        return this.wasm.chaincode();
      }

    }
    return LegacyDaedalusPrivateKey;
  })();

  public LinearFee = (() => {
    const $outer = this;

    class LinearFee
      extends Ptr<WasmV4.LinearFee>
      implements WasmContract.LinearFee
    {

      constant(): WasmContract.BigNum {
        const ret = this.wasm.constant();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      coefficient(): WasmContract.BigNum {
        const ret = this.wasm.coefficient();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      static new(coefficient: WasmContract.BigNum, constant: WasmContract.BigNum): WasmContract.LinearFee {
        const ret = WasmV4.LinearFee.new(coefficient.wasm, constant.wasm);
        return new $outer.LinearFee(ret, $outer._ctx);
      }

    }
    return LinearFee;
  })();

  public MIRToStakeCredentials = (() => {
    const $outer = this;

    class MIRToStakeCredentials
      extends Ptr<WasmV4.MIRToStakeCredentials>
      implements WasmContract.MIRToStakeCredentials
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.MIRToStakeCredentials {
        const ret = WasmV4.MIRToStakeCredentials.from_bytes(bytes);
        return new $outer.MIRToStakeCredentials(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.MIRToStakeCredentials {
        const ret = WasmV4.MIRToStakeCredentials.from_hex(hexStr);
        return new $outer.MIRToStakeCredentials(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.MIRToStakeCredentials {
        const ret = WasmV4.MIRToStakeCredentials.from_json(json);
        return new $outer.MIRToStakeCredentials(ret, $outer._ctx);
      }

      static new(): WasmContract.MIRToStakeCredentials {
        const ret = WasmV4.MIRToStakeCredentials.new();
        return new $outer.MIRToStakeCredentials(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      insert(cred: WasmContract.Credential, delta: WasmContract.Int): Optional<WasmContract.Int> {
        const ret = this.wasm.insert(cred.wasm, delta.wasm);
        if (ret == null) return undefined;
        return new $outer.Int(ret, $outer._ctx);
      }

      get(cred: WasmContract.Credential): Optional<WasmContract.Int> {
        const ret = this.wasm.get(cred.wasm);
        if (ret == null) return undefined;
        return new $outer.Int(ret, $outer._ctx);
      }

      keys(): WasmContract.Credentials {
        const ret = this.wasm.keys();
        return new $outer.Credentials(ret, $outer._ctx);
      }

    }
    return MIRToStakeCredentials;
  })();

  public MalformedAddress = (() => {
    const $outer = this;

    class MalformedAddress
      extends Ptr<WasmV4.MalformedAddress>
      implements WasmContract.MalformedAddress
    {

      originalBytes(): Uint8Array {
        return this.wasm.original_bytes();
      }

      toAddress(): WasmContract.Address {
        const ret = this.wasm.to_address();
        return new $outer.Address(ret, $outer._ctx);
      }

      static fromAddress(addr: WasmContract.Address): Optional<WasmContract.MalformedAddress> {
        const ret = WasmV4.MalformedAddress.from_address(addr.wasm);
        if (ret == null) return undefined;
        return new $outer.MalformedAddress(ret, $outer._ctx);
      }

    }
    return MalformedAddress;
  })();

  public MetadataList = (() => {
    const $outer = this;

    class MetadataList
      extends Ptr<WasmV4.MetadataList>
      implements WasmContract.MetadataList
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.MetadataList {
        const ret = WasmV4.MetadataList.from_bytes(bytes);
        return new $outer.MetadataList(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.MetadataList {
        const ret = WasmV4.MetadataList.from_hex(hexStr);
        return new $outer.MetadataList(ret, $outer._ctx);
      }

      static new(): WasmContract.MetadataList {
        const ret = WasmV4.MetadataList.new();
        return new $outer.MetadataList(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      get(index: number): WasmContract.TransactionMetadatum {
        const ret = this.wasm.get(index);
        return new $outer.TransactionMetadatum(ret, $outer._ctx);
      }

      add(elem: WasmContract.TransactionMetadatum): void {
        return this.wasm.add(elem.wasm);
      }

    }
    return MetadataList;
  })();

  public MetadataMap = (() => {
    const $outer = this;

    class MetadataMap
      extends Ptr<WasmV4.MetadataMap>
      implements WasmContract.MetadataMap
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.MetadataMap {
        const ret = WasmV4.MetadataMap.from_bytes(bytes);
        return new $outer.MetadataMap(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.MetadataMap {
        const ret = WasmV4.MetadataMap.from_hex(hexStr);
        return new $outer.MetadataMap(ret, $outer._ctx);
      }

      static new(): WasmContract.MetadataMap {
        const ret = WasmV4.MetadataMap.new();
        return new $outer.MetadataMap(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      insert(key: WasmContract.TransactionMetadatum, value: WasmContract.TransactionMetadatum): Optional<WasmContract.TransactionMetadatum> {
        const ret = this.wasm.insert(key.wasm, value.wasm);
        if (ret == null) return undefined;
        return new $outer.TransactionMetadatum(ret, $outer._ctx);
      }

      insertStr(key: string, value: WasmContract.TransactionMetadatum): Optional<WasmContract.TransactionMetadatum> {
        const ret = this.wasm.insert_str(key, value.wasm);
        if (ret == null) return undefined;
        return new $outer.TransactionMetadatum(ret, $outer._ctx);
      }

      insertI32(key: number, value: WasmContract.TransactionMetadatum): Optional<WasmContract.TransactionMetadatum> {
        const ret = this.wasm.insert_i32(key, value.wasm);
        if (ret == null) return undefined;
        return new $outer.TransactionMetadatum(ret, $outer._ctx);
      }

      get(key: WasmContract.TransactionMetadatum): WasmContract.TransactionMetadatum {
        const ret = this.wasm.get(key.wasm);
        return new $outer.TransactionMetadatum(ret, $outer._ctx);
      }

      getStr(key: string): WasmContract.TransactionMetadatum {
        const ret = this.wasm.get_str(key);
        return new $outer.TransactionMetadatum(ret, $outer._ctx);
      }

      getI32(key: number): WasmContract.TransactionMetadatum {
        const ret = this.wasm.get_i32(key);
        return new $outer.TransactionMetadatum(ret, $outer._ctx);
      }

      has(key: WasmContract.TransactionMetadatum): boolean {
        return this.wasm.has(key.wasm);
      }

      keys(): WasmContract.MetadataList {
        const ret = this.wasm.keys();
        return new $outer.MetadataList(ret, $outer._ctx);
      }

    }
    return MetadataMap;
  })();

  public Mint = (() => {
    const $outer = this;

    class Mint
      extends Ptr<WasmV4.Mint>
      implements WasmContract.Mint
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.Mint {
        const ret = WasmV4.Mint.from_bytes(bytes);
        return new $outer.Mint(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.Mint {
        const ret = WasmV4.Mint.from_hex(hexStr);
        return new $outer.Mint(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.Mint {
        const ret = WasmV4.Mint.from_json(json);
        return new $outer.Mint(ret, $outer._ctx);
      }

      static new(): WasmContract.Mint {
        const ret = WasmV4.Mint.new();
        return new $outer.Mint(ret, $outer._ctx);
      }

      static newFromEntry(key: WasmContract.ScriptHash, value: WasmContract.MintAssets): WasmContract.Mint {
        const ret = WasmV4.Mint.new_from_entry(key.wasm, value.wasm);
        return new $outer.Mint(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      insert(key: WasmContract.ScriptHash, value: WasmContract.MintAssets): Optional<WasmContract.MintAssets> {
        const ret = this.wasm.insert(key.wasm, value.wasm);
        if (ret == null) return undefined;
        return new $outer.MintAssets(ret, $outer._ctx);
      }

      get(key: WasmContract.ScriptHash): Optional<WasmContract.MintsAssets> {
        const ret = this.wasm.get(key.wasm);
        if (ret == null) return undefined;
        return new $outer.MintsAssets(ret, $outer._ctx);
      }

      keys(): WasmContract.ScriptHashes {
        const ret = this.wasm.keys();
        return new $outer.ScriptHashes(ret, $outer._ctx);
      }

      asPositiveMultiasset(): WasmContract.MultiAsset {
        const ret = this.wasm.as_positive_multiasset();
        return new $outer.MultiAsset(ret, $outer._ctx);
      }

      asNegativeMultiasset(): WasmContract.MultiAsset {
        const ret = this.wasm.as_negative_multiasset();
        return new $outer.MultiAsset(ret, $outer._ctx);
      }

    }
    return Mint;
  })();

  public MintAssets = (() => {
    const $outer = this;

    class MintAssets
      extends Ptr<WasmV4.MintAssets>
      implements WasmContract.MintAssets
    {

      static new(): WasmContract.MintAssets {
        const ret = WasmV4.MintAssets.new();
        return new $outer.MintAssets(ret, $outer._ctx);
      }

      static newFromEntry(key: WasmContract.AssetName, value: WasmContract.Int): WasmContract.MintAssets {
        const ret = WasmV4.MintAssets.new_from_entry(key.wasm, value.wasm);
        return new $outer.MintAssets(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      insert(key: WasmContract.AssetName, value: WasmContract.Int): Optional<WasmContract.Int> {
        const ret = this.wasm.insert(key.wasm, value.wasm);
        if (ret == null) return undefined;
        return new $outer.Int(ret, $outer._ctx);
      }

      get(key: WasmContract.AssetName): Optional<WasmContract.Int> {
        const ret = this.wasm.get(key.wasm);
        if (ret == null) return undefined;
        return new $outer.Int(ret, $outer._ctx);
      }

      keys(): WasmContract.AssetNames {
        const ret = this.wasm.keys();
        return new $outer.AssetNames(ret, $outer._ctx);
      }

    }
    return MintAssets;
  })();

  public MintBuilder = (() => {
    const $outer = this;

    class MintBuilder
      extends Ptr<WasmV4.MintBuilder>
      implements WasmContract.MintBuilder
    {

      static new(): WasmContract.MintBuilder {
        const ret = WasmV4.MintBuilder.new();
        return new $outer.MintBuilder(ret, $outer._ctx);
      }

      addAsset(mint: WasmContract.MintWitness, assetName: WasmContract.AssetName, amount: WasmContract.Int): void {
        return this.wasm.add_asset(mint.wasm, assetName.wasm, amount.wasm);
      }

      setAsset(mint: WasmContract.MintWitness, assetName: WasmContract.AssetName, amount: WasmContract.Int): void {
        return this.wasm.set_asset(mint.wasm, assetName.wasm, amount.wasm);
      }

      build(): WasmContract.Mint {
        const ret = this.wasm.build();
        return new $outer.Mint(ret, $outer._ctx);
      }

      getNativeScripts(): WasmContract.NativeScripts {
        const ret = this.wasm.get_native_scripts();
        return new $outer.NativeScripts(ret, $outer._ctx);
      }

      getPlutusWitnesses(): WasmContract.PlutusWitnesses {
        const ret = this.wasm.get_plutus_witnesses();
        return new $outer.PlutusWitnesses(ret, $outer._ctx);
      }

      getRefInputs(): WasmContract.TransactionInputs {
        const ret = this.wasm.get_ref_inputs();
        return new $outer.TransactionInputs(ret, $outer._ctx);
      }

      getRedeemers(): WasmContract.Redeemers {
        const ret = this.wasm.get_redeemers();
        return new $outer.Redeemers(ret, $outer._ctx);
      }

      hasPlutusScripts(): boolean {
        return this.wasm.has_plutus_scripts();
      }

      hasNativeScripts(): boolean {
        return this.wasm.has_native_scripts();
      }

    }
    return MintBuilder;
  })();

  public MintWitness = (() => {
    const $outer = this;

    class MintWitness
      extends Ptr<WasmV4.MintWitness>
      implements WasmContract.MintWitness
    {

      static newNativeScript(nativeScript: WasmContract.NativeScriptSource): WasmContract.MintWitness {
        const ret = WasmV4.MintWitness.new_native_script(nativeScript.wasm);
        return new $outer.MintWitness(ret, $outer._ctx);
      }

      static newPlutusScript(plutusScript: WasmContract.PlutusScriptSource, redeemer: WasmContract.Redeemer): WasmContract.MintWitness {
        const ret = WasmV4.MintWitness.new_plutus_script(plutusScript.wasm, redeemer.wasm);
        return new $outer.MintWitness(ret, $outer._ctx);
      }

    }
    return MintWitness;
  })();

  public MintsAssets = (() => {
    const $outer = this;

    class MintsAssets
      extends Ptr<WasmV4.MintsAssets>
      implements WasmContract.MintsAssets
    {

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.MintsAssets {
        const ret = WasmV4.MintsAssets.from_json(json);
        return new $outer.MintsAssets(ret, $outer._ctx);
      }

      static new(): WasmContract.MintsAssets {
        const ret = WasmV4.MintsAssets.new();
        return new $outer.MintsAssets(ret, $outer._ctx);
      }

      add(mintAssets: WasmContract.MintAssets): void {
        return this.wasm.add(mintAssets.wasm);
      }

      get(index: number): Optional<WasmContract.MintAssets> {
        const ret = this.wasm.get(index);
        if (ret == null) return undefined;
        return new $outer.MintAssets(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

    }
    return MintsAssets;
  })();

  public MoveInstantaneousReward = (() => {
    const $outer = this;

    class MoveInstantaneousReward
      extends Ptr<WasmV4.MoveInstantaneousReward>
      implements WasmContract.MoveInstantaneousReward
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.MoveInstantaneousReward {
        const ret = WasmV4.MoveInstantaneousReward.from_bytes(bytes);
        return new $outer.MoveInstantaneousReward(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.MoveInstantaneousReward {
        const ret = WasmV4.MoveInstantaneousReward.from_hex(hexStr);
        return new $outer.MoveInstantaneousReward(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.MoveInstantaneousReward {
        const ret = WasmV4.MoveInstantaneousReward.from_json(json);
        return new $outer.MoveInstantaneousReward(ret, $outer._ctx);
      }

      static newToOtherPot(pot: WasmContract.MIRPot, amount: WasmContract.BigNum): WasmContract.MoveInstantaneousReward {
        const ret = WasmV4.MoveInstantaneousReward.new_to_other_pot(pot, amount.wasm);
        return new $outer.MoveInstantaneousReward(ret, $outer._ctx);
      }

      static newToStakeCreds(pot: WasmContract.MIRPot, amounts: WasmContract.MIRToStakeCredentials): WasmContract.MoveInstantaneousReward {
        const ret = WasmV4.MoveInstantaneousReward.new_to_stake_creds(pot, amounts.wasm);
        return new $outer.MoveInstantaneousReward(ret, $outer._ctx);
      }

      pot(): WasmContract.MIRPot {
        return this.wasm.pot();
      }

      kind(): WasmContract.MIRKind {
        return this.wasm.kind();
      }

      asToOtherPot(): Optional<WasmContract.BigNum> {
        const ret = this.wasm.as_to_other_pot();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      asToStakeCreds(): Optional<WasmContract.MIRToStakeCredentials> {
        const ret = this.wasm.as_to_stake_creds();
        if (ret == null) return undefined;
        return new $outer.MIRToStakeCredentials(ret, $outer._ctx);
      }

    }
    return MoveInstantaneousReward;
  })();

  public MoveInstantaneousRewardsCert = (() => {
    const $outer = this;

    class MoveInstantaneousRewardsCert
      extends Ptr<WasmV4.MoveInstantaneousRewardsCert>
      implements WasmContract.MoveInstantaneousRewardsCert
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.MoveInstantaneousRewardsCert {
        const ret = WasmV4.MoveInstantaneousRewardsCert.from_bytes(bytes);
        return new $outer.MoveInstantaneousRewardsCert(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.MoveInstantaneousRewardsCert {
        const ret = WasmV4.MoveInstantaneousRewardsCert.from_hex(hexStr);
        return new $outer.MoveInstantaneousRewardsCert(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.MoveInstantaneousRewardsCert {
        const ret = WasmV4.MoveInstantaneousRewardsCert.from_json(json);
        return new $outer.MoveInstantaneousRewardsCert(ret, $outer._ctx);
      }

      moveInstantaneousReward(): WasmContract.MoveInstantaneousReward {
        const ret = this.wasm.move_instantaneous_reward();
        return new $outer.MoveInstantaneousReward(ret, $outer._ctx);
      }

      static new(moveInstantaneousReward: WasmContract.MoveInstantaneousReward): WasmContract.MoveInstantaneousRewardsCert {
        const ret = WasmV4.MoveInstantaneousRewardsCert.new(moveInstantaneousReward.wasm);
        return new $outer.MoveInstantaneousRewardsCert(ret, $outer._ctx);
      }

    }
    return MoveInstantaneousRewardsCert;
  })();

  public MultiAsset = (() => {
    const $outer = this;

    class MultiAsset
      extends Ptr<WasmV4.MultiAsset>
      implements WasmContract.MultiAsset
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.MultiAsset {
        const ret = WasmV4.MultiAsset.from_bytes(bytes);
        return new $outer.MultiAsset(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.MultiAsset {
        const ret = WasmV4.MultiAsset.from_hex(hexStr);
        return new $outer.MultiAsset(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.MultiAsset {
        const ret = WasmV4.MultiAsset.from_json(json);
        return new $outer.MultiAsset(ret, $outer._ctx);
      }

      static new(): WasmContract.MultiAsset {
        const ret = WasmV4.MultiAsset.new();
        return new $outer.MultiAsset(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      insert(policyId: WasmContract.ScriptHash, assets: WasmContract.Assets): Optional<WasmContract.Assets> {
        const ret = this.wasm.insert(policyId.wasm, assets.wasm);
        if (ret == null) return undefined;
        return new $outer.Assets(ret, $outer._ctx);
      }

      get(policyId: WasmContract.ScriptHash): Optional<WasmContract.Assets> {
        const ret = this.wasm.get(policyId.wasm);
        if (ret == null) return undefined;
        return new $outer.Assets(ret, $outer._ctx);
      }

      setAsset(policyId: WasmContract.ScriptHash, assetName: WasmContract.AssetName, value: WasmContract.BigNum): Optional<WasmContract.BigNum> {
        const ret = this.wasm.set_asset(policyId.wasm, assetName.wasm, value.wasm);
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      getAsset(policyId: WasmContract.ScriptHash, assetName: WasmContract.AssetName): WasmContract.BigNum {
        const ret = this.wasm.get_asset(policyId.wasm, assetName.wasm);
        return new $outer.BigNum(ret, $outer._ctx);
      }

      keys(): WasmContract.ScriptHashes {
        const ret = this.wasm.keys();
        return new $outer.ScriptHashes(ret, $outer._ctx);
      }

      sub(rhsMa: WasmContract.MultiAsset): WasmContract.MultiAsset {
        const ret = this.wasm.sub(rhsMa.wasm);
        return new $outer.MultiAsset(ret, $outer._ctx);
      }

    }
    return MultiAsset;
  })();

  public MultiHostName = (() => {
    const $outer = this;

    class MultiHostName
      extends Ptr<WasmV4.MultiHostName>
      implements WasmContract.MultiHostName
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.MultiHostName {
        const ret = WasmV4.MultiHostName.from_bytes(bytes);
        return new $outer.MultiHostName(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.MultiHostName {
        const ret = WasmV4.MultiHostName.from_hex(hexStr);
        return new $outer.MultiHostName(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.MultiHostName {
        const ret = WasmV4.MultiHostName.from_json(json);
        return new $outer.MultiHostName(ret, $outer._ctx);
      }

      dnsName(): WasmContract.DNSRecordSRV {
        const ret = this.wasm.dns_name();
        return new $outer.DNSRecordSRV(ret, $outer._ctx);
      }

      static new(dnsName: WasmContract.DNSRecordSRV): WasmContract.MultiHostName {
        const ret = WasmV4.MultiHostName.new(dnsName.wasm);
        return new $outer.MultiHostName(ret, $outer._ctx);
      }

    }
    return MultiHostName;
  })();

  public NativeScript = (() => {
    const $outer = this;

    class NativeScript
      extends Ptr<WasmV4.NativeScript>
      implements WasmContract.NativeScript
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.NativeScript {
        const ret = WasmV4.NativeScript.from_bytes(bytes);
        return new $outer.NativeScript(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.NativeScript {
        const ret = WasmV4.NativeScript.from_hex(hexStr);
        return new $outer.NativeScript(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.NativeScript {
        const ret = WasmV4.NativeScript.from_json(json);
        return new $outer.NativeScript(ret, $outer._ctx);
      }

      hash(): WasmContract.ScriptHash {
        const ret = this.wasm.hash();
        return new $outer.ScriptHash(ret, $outer._ctx);
      }

      static newScriptPubkey(scriptPubkey: WasmContract.ScriptPubkey): WasmContract.NativeScript {
        const ret = WasmV4.NativeScript.new_script_pubkey(scriptPubkey.wasm);
        return new $outer.NativeScript(ret, $outer._ctx);
      }

      static newScriptAll(scriptAll: WasmContract.ScriptAll): WasmContract.NativeScript {
        const ret = WasmV4.NativeScript.new_script_all(scriptAll.wasm);
        return new $outer.NativeScript(ret, $outer._ctx);
      }

      static newScriptAny(scriptAny: WasmContract.ScriptAny): WasmContract.NativeScript {
        const ret = WasmV4.NativeScript.new_script_any(scriptAny.wasm);
        return new $outer.NativeScript(ret, $outer._ctx);
      }

      static newScriptNOfK(scriptNOfK: WasmContract.ScriptNOfK): WasmContract.NativeScript {
        const ret = WasmV4.NativeScript.new_script_n_of_k(scriptNOfK.wasm);
        return new $outer.NativeScript(ret, $outer._ctx);
      }

      static newTimelockStart(timelockStart: WasmContract.TimelockStart): WasmContract.NativeScript {
        const ret = WasmV4.NativeScript.new_timelock_start(timelockStart.wasm);
        return new $outer.NativeScript(ret, $outer._ctx);
      }

      static newTimelockExpiry(timelockExpiry: WasmContract.TimelockExpiry): WasmContract.NativeScript {
        const ret = WasmV4.NativeScript.new_timelock_expiry(timelockExpiry.wasm);
        return new $outer.NativeScript(ret, $outer._ctx);
      }

      kind(): WasmContract.NativeScriptKind {
        return this.wasm.kind();
      }

      asScriptPubkey(): Optional<WasmContract.ScriptPubkey> {
        const ret = this.wasm.as_script_pubkey();
        if (ret == null) return undefined;
        return new $outer.ScriptPubkey(ret, $outer._ctx);
      }

      asScriptAll(): Optional<WasmContract.ScriptAll> {
        const ret = this.wasm.as_script_all();
        if (ret == null) return undefined;
        return new $outer.ScriptAll(ret, $outer._ctx);
      }

      asScriptAny(): Optional<WasmContract.ScriptAny> {
        const ret = this.wasm.as_script_any();
        if (ret == null) return undefined;
        return new $outer.ScriptAny(ret, $outer._ctx);
      }

      asScriptNOfK(): Optional<WasmContract.ScriptNOfK> {
        const ret = this.wasm.as_script_n_of_k();
        if (ret == null) return undefined;
        return new $outer.ScriptNOfK(ret, $outer._ctx);
      }

      asTimelockStart(): Optional<WasmContract.TimelockStart> {
        const ret = this.wasm.as_timelock_start();
        if (ret == null) return undefined;
        return new $outer.TimelockStart(ret, $outer._ctx);
      }

      asTimelockExpiry(): Optional<WasmContract.TimelockExpiry> {
        const ret = this.wasm.as_timelock_expiry();
        if (ret == null) return undefined;
        return new $outer.TimelockExpiry(ret, $outer._ctx);
      }

      getRequiredSigners(): WasmContract.Ed25519KeyHashes {
        const ret = this.wasm.get_required_signers();
        return new $outer.Ed25519KeyHashes(ret, $outer._ctx);
      }

    }
    return NativeScript;
  })();

  public NativeScriptSource = (() => {
    const $outer = this;

    class NativeScriptSource
      extends Ptr<WasmV4.NativeScriptSource>
      implements WasmContract.NativeScriptSource
    {

      static new(script: WasmContract.NativeScript): WasmContract.NativeScriptSource {
        const ret = WasmV4.NativeScriptSource.new(script.wasm);
        return new $outer.NativeScriptSource(ret, $outer._ctx);
      }

      static newRefInput(scriptHash: WasmContract.ScriptHash, input: WasmContract.TransactionInput, scriptSize: number): WasmContract.NativeScriptSource {
        const ret = WasmV4.NativeScriptSource.new_ref_input(scriptHash.wasm, input.wasm, scriptSize);
        return new $outer.NativeScriptSource(ret, $outer._ctx);
      }

      setRequiredSigners(keyHashes: WasmContract.Ed25519KeyHashes): void {
        return this.wasm.set_required_signers(keyHashes.wasm);
      }

      getRefScriptSize(): Optional<number> {
        return this.wasm.get_ref_script_size();
      }

    }
    return NativeScriptSource;
  })();

  public NativeScripts = (() => {
    const $outer = this;

    class NativeScripts
      extends Ptr<WasmV4.NativeScripts>
      implements WasmContract.NativeScripts
    {

      static new(): WasmContract.NativeScripts {
        const ret = WasmV4.NativeScripts.new();
        return new $outer.NativeScripts(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      get(index: number): WasmContract.NativeScript {
        const ret = this.wasm.get(index);
        return new $outer.NativeScript(ret, $outer._ctx);
      }

      add(elem: WasmContract.NativeScript): void {
        return this.wasm.add(elem.wasm);
      }

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.NativeScripts {
        const ret = WasmV4.NativeScripts.from_bytes(bytes);
        return new $outer.NativeScripts(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.NativeScripts {
        const ret = WasmV4.NativeScripts.from_hex(hexStr);
        return new $outer.NativeScripts(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.NativeScripts {
        const ret = WasmV4.NativeScripts.from_json(json);
        return new $outer.NativeScripts(ret, $outer._ctx);
      }

    }
    return NativeScripts;
  })();

  public NetworkId = (() => {
    const $outer = this;

    class NetworkId
      extends Ptr<WasmV4.NetworkId>
      implements WasmContract.NetworkId
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.NetworkId {
        const ret = WasmV4.NetworkId.from_bytes(bytes);
        return new $outer.NetworkId(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.NetworkId {
        const ret = WasmV4.NetworkId.from_hex(hexStr);
        return new $outer.NetworkId(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.NetworkId {
        const ret = WasmV4.NetworkId.from_json(json);
        return new $outer.NetworkId(ret, $outer._ctx);
      }

      static testnet(): WasmContract.NetworkId {
        const ret = WasmV4.NetworkId.testnet();
        return new $outer.NetworkId(ret, $outer._ctx);
      }

      static mainnet(): WasmContract.NetworkId {
        const ret = WasmV4.NetworkId.mainnet();
        return new $outer.NetworkId(ret, $outer._ctx);
      }

      kind(): WasmContract.NetworkIdKind {
        return this.wasm.kind();
      }

    }
    return NetworkId;
  })();

  public NetworkInfo = (() => {
    const $outer = this;

    class NetworkInfo
      extends Ptr<WasmV4.NetworkInfo>
      implements WasmContract.NetworkInfo
    {

      static new(networkId: number, protocolMagic: number): WasmContract.NetworkInfo {
        const ret = WasmV4.NetworkInfo.new(networkId, protocolMagic);
        return new $outer.NetworkInfo(ret, $outer._ctx);
      }

      networkId(): number {
        return this.wasm.network_id();
      }

      protocolMagic(): number {
        return this.wasm.protocol_magic();
      }

      static testnetPreview(): WasmContract.NetworkInfo {
        const ret = WasmV4.NetworkInfo.testnet_preview();
        return new $outer.NetworkInfo(ret, $outer._ctx);
      }

      static testnetPreprod(): WasmContract.NetworkInfo {
        const ret = WasmV4.NetworkInfo.testnet_preprod();
        return new $outer.NetworkInfo(ret, $outer._ctx);
      }

      static mainnet(): WasmContract.NetworkInfo {
        const ret = WasmV4.NetworkInfo.mainnet();
        return new $outer.NetworkInfo(ret, $outer._ctx);
      }

    }
    return NetworkInfo;
  })();

  public NewConstitutionAction = (() => {
    const $outer = this;

    class NewConstitutionAction
      extends Ptr<WasmV4.NewConstitutionAction>
      implements WasmContract.NewConstitutionAction
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.NewConstitutionAction {
        const ret = WasmV4.NewConstitutionAction.from_bytes(bytes);
        return new $outer.NewConstitutionAction(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.NewConstitutionAction {
        const ret = WasmV4.NewConstitutionAction.from_hex(hexStr);
        return new $outer.NewConstitutionAction(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.NewConstitutionAction {
        const ret = WasmV4.NewConstitutionAction.from_json(json);
        return new $outer.NewConstitutionAction(ret, $outer._ctx);
      }

      govActionId(): Optional<WasmContract.GovernanceActionId> {
        const ret = this.wasm.gov_action_id();
        if (ret == null) return undefined;
        return new $outer.GovernanceActionId(ret, $outer._ctx);
      }

      constitution(): WasmContract.Constitution {
        const ret = this.wasm.constitution();
        return new $outer.Constitution(ret, $outer._ctx);
      }

      static new(constitution: WasmContract.Constitution): WasmContract.NewConstitutionAction {
        const ret = WasmV4.NewConstitutionAction.new(constitution.wasm);
        return new $outer.NewConstitutionAction(ret, $outer._ctx);
      }

      static newWithActionId(govActionId: WasmContract.GovernanceActionId, constitution: WasmContract.Constitution): WasmContract.NewConstitutionAction {
        const ret = WasmV4.NewConstitutionAction.new_with_action_id(govActionId.wasm, constitution.wasm);
        return new $outer.NewConstitutionAction(ret, $outer._ctx);
      }

      hasScriptHash(): boolean {
        return this.wasm.has_script_hash();
      }

    }
    return NewConstitutionAction;
  })();

  public NoConfidenceAction = (() => {
    const $outer = this;

    class NoConfidenceAction
      extends Ptr<WasmV4.NoConfidenceAction>
      implements WasmContract.NoConfidenceAction
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.NoConfidenceAction {
        const ret = WasmV4.NoConfidenceAction.from_bytes(bytes);
        return new $outer.NoConfidenceAction(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.NoConfidenceAction {
        const ret = WasmV4.NoConfidenceAction.from_hex(hexStr);
        return new $outer.NoConfidenceAction(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.NoConfidenceAction {
        const ret = WasmV4.NoConfidenceAction.from_json(json);
        return new $outer.NoConfidenceAction(ret, $outer._ctx);
      }

      govActionId(): Optional<WasmContract.GovernanceActionId> {
        const ret = this.wasm.gov_action_id();
        if (ret == null) return undefined;
        return new $outer.GovernanceActionId(ret, $outer._ctx);
      }

      static new(): WasmContract.NoConfidenceAction {
        const ret = WasmV4.NoConfidenceAction.new();
        return new $outer.NoConfidenceAction(ret, $outer._ctx);
      }

      static newWithActionId(govActionId: WasmContract.GovernanceActionId): WasmContract.NoConfidenceAction {
        const ret = WasmV4.NoConfidenceAction.new_with_action_id(govActionId.wasm);
        return new $outer.NoConfidenceAction(ret, $outer._ctx);
      }

    }
    return NoConfidenceAction;
  })();

  public Nonce = (() => {
    const $outer = this;

    class Nonce
      extends Ptr<WasmV4.Nonce>
      implements WasmContract.Nonce
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.Nonce {
        const ret = WasmV4.Nonce.from_bytes(bytes);
        return new $outer.Nonce(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.Nonce {
        const ret = WasmV4.Nonce.from_hex(hexStr);
        return new $outer.Nonce(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.Nonce {
        const ret = WasmV4.Nonce.from_json(json);
        return new $outer.Nonce(ret, $outer._ctx);
      }

      static newIdentity(): WasmContract.Nonce {
        const ret = WasmV4.Nonce.new_identity();
        return new $outer.Nonce(ret, $outer._ctx);
      }

      static newFromHash(hash: Uint8Array): WasmContract.Nonce {
        const ret = WasmV4.Nonce.new_from_hash(hash);
        return new $outer.Nonce(ret, $outer._ctx);
      }

      getHash(): Optional<Uint8Array> {
        return this.wasm.get_hash();
      }

    }
    return Nonce;
  })();

  public OperationalCert = (() => {
    const $outer = this;

    class OperationalCert
      extends Ptr<WasmV4.OperationalCert>
      implements WasmContract.OperationalCert
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.OperationalCert {
        const ret = WasmV4.OperationalCert.from_bytes(bytes);
        return new $outer.OperationalCert(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.OperationalCert {
        const ret = WasmV4.OperationalCert.from_hex(hexStr);
        return new $outer.OperationalCert(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.OperationalCert {
        const ret = WasmV4.OperationalCert.from_json(json);
        return new $outer.OperationalCert(ret, $outer._ctx);
      }

      hotVkey(): WasmContract.KESVKey {
        const ret = this.wasm.hot_vkey();
        return new $outer.KESVKey(ret, $outer._ctx);
      }

      sequenceNumber(): number {
        return this.wasm.sequence_number();
      }

      kesPeriod(): number {
        return this.wasm.kes_period();
      }

      sigma(): WasmContract.Ed25519Signature {
        const ret = this.wasm.sigma();
        return new $outer.Ed25519Signature(ret, $outer._ctx);
      }

      static new(hotVkey: WasmContract.KESVKey, sequenceNumber: number, kesPeriod: number, sigma: WasmContract.Ed25519Signature): WasmContract.OperationalCert {
        const ret = WasmV4.OperationalCert.new(hotVkey.wasm, sequenceNumber, kesPeriod, sigma.wasm);
        return new $outer.OperationalCert(ret, $outer._ctx);
      }

    }
    return OperationalCert;
  })();

  public OutputDatum = (() => {
    const $outer = this;

    class OutputDatum
      extends Ptr<WasmV4.OutputDatum>
      implements WasmContract.OutputDatum
    {

      static newDataHash(dataHash: WasmContract.DataHash): WasmContract.OutputDatum {
        const ret = WasmV4.OutputDatum.new_data_hash(dataHash.wasm);
        return new $outer.OutputDatum(ret, $outer._ctx);
      }

      static newData(data: WasmContract.PlutusData): WasmContract.OutputDatum {
        const ret = WasmV4.OutputDatum.new_data(data.wasm);
        return new $outer.OutputDatum(ret, $outer._ctx);
      }

      dataHash(): Optional<WasmContract.DataHash> {
        const ret = this.wasm.data_hash();
        if (ret == null) return undefined;
        return new $outer.DataHash(ret, $outer._ctx);
      }

      data(): Optional<WasmContract.PlutusData> {
        const ret = this.wasm.data();
        if (ret == null) return undefined;
        return new $outer.PlutusData(ret, $outer._ctx);
      }

    }
    return OutputDatum;
  })();

  public ParameterChangeAction = (() => {
    const $outer = this;

    class ParameterChangeAction
      extends Ptr<WasmV4.ParameterChangeAction>
      implements WasmContract.ParameterChangeAction
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.ParameterChangeAction {
        const ret = WasmV4.ParameterChangeAction.from_bytes(bytes);
        return new $outer.ParameterChangeAction(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.ParameterChangeAction {
        const ret = WasmV4.ParameterChangeAction.from_hex(hexStr);
        return new $outer.ParameterChangeAction(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.ParameterChangeAction {
        const ret = WasmV4.ParameterChangeAction.from_json(json);
        return new $outer.ParameterChangeAction(ret, $outer._ctx);
      }

      govActionId(): Optional<WasmContract.GovernanceActionId> {
        const ret = this.wasm.gov_action_id();
        if (ret == null) return undefined;
        return new $outer.GovernanceActionId(ret, $outer._ctx);
      }

      protocolParamUpdates(): WasmContract.ProtocolParamUpdate {
        const ret = this.wasm.protocol_param_updates();
        return new $outer.ProtocolParamUpdate(ret, $outer._ctx);
      }

      policyHash(): Optional<WasmContract.ScriptHash> {
        const ret = this.wasm.policy_hash();
        if (ret == null) return undefined;
        return new $outer.ScriptHash(ret, $outer._ctx);
      }

      static new(protocolParamUpdates: WasmContract.ProtocolParamUpdate): WasmContract.ParameterChangeAction {
        const ret = WasmV4.ParameterChangeAction.new(protocolParamUpdates.wasm);
        return new $outer.ParameterChangeAction(ret, $outer._ctx);
      }

      static newWithActionId(govActionId: WasmContract.GovernanceActionId, protocolParamUpdates: WasmContract.ProtocolParamUpdate): WasmContract.ParameterChangeAction {
        const ret = WasmV4.ParameterChangeAction.new_with_action_id(govActionId.wasm, protocolParamUpdates.wasm);
        return new $outer.ParameterChangeAction(ret, $outer._ctx);
      }

      static newWithPolicyHash(protocolParamUpdates: WasmContract.ProtocolParamUpdate, policyHash: WasmContract.ScriptHash): WasmContract.ParameterChangeAction {
        const ret = WasmV4.ParameterChangeAction.new_with_policy_hash(protocolParamUpdates.wasm, policyHash.wasm);
        return new $outer.ParameterChangeAction(ret, $outer._ctx);
      }

      static newWithPolicyHashAndActionId(govActionId: WasmContract.GovernanceActionId, protocolParamUpdates: WasmContract.ProtocolParamUpdate, policyHash: WasmContract.ScriptHash): WasmContract.ParameterChangeAction {
        const ret = WasmV4.ParameterChangeAction.new_with_policy_hash_and_action_id(govActionId.wasm, protocolParamUpdates.wasm, policyHash.wasm);
        return new $outer.ParameterChangeAction(ret, $outer._ctx);
      }

    }
    return ParameterChangeAction;
  })();

  public PlutusData = (() => {
    const $outer = this;

    class PlutusData
      extends Ptr<WasmV4.PlutusData>
      implements WasmContract.PlutusData
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.PlutusData {
        const ret = WasmV4.PlutusData.from_bytes(bytes);
        return new $outer.PlutusData(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.PlutusData {
        const ret = WasmV4.PlutusData.from_hex(hexStr);
        return new $outer.PlutusData(ret, $outer._ctx);
      }

      static newConstrPlutusData(constrPlutusData: WasmContract.ConstrPlutusData): WasmContract.PlutusData {
        const ret = WasmV4.PlutusData.new_constr_plutus_data(constrPlutusData.wasm);
        return new $outer.PlutusData(ret, $outer._ctx);
      }

      static newEmptyConstrPlutusData(alternative: WasmContract.BigNum): WasmContract.PlutusData {
        const ret = WasmV4.PlutusData.new_empty_constr_plutus_data(alternative.wasm);
        return new $outer.PlutusData(ret, $outer._ctx);
      }

      static newSingleValueConstrPlutusData(alternative: WasmContract.BigNum, plutusData: WasmContract.PlutusData): WasmContract.PlutusData {
        const ret = WasmV4.PlutusData.new_single_value_constr_plutus_data(alternative.wasm, plutusData.wasm);
        return new $outer.PlutusData(ret, $outer._ctx);
      }

      static newMap(map: WasmContract.PlutusMap): WasmContract.PlutusData {
        const ret = WasmV4.PlutusData.new_map(map.wasm);
        return new $outer.PlutusData(ret, $outer._ctx);
      }

      static newList(list: WasmContract.PlutusList): WasmContract.PlutusData {
        const ret = WasmV4.PlutusData.new_list(list.wasm);
        return new $outer.PlutusData(ret, $outer._ctx);
      }

      static newInteger(integer: WasmContract.BigInt): WasmContract.PlutusData {
        const ret = WasmV4.PlutusData.new_integer(integer.wasm);
        return new $outer.PlutusData(ret, $outer._ctx);
      }

      static newBytes(bytes: Uint8Array): WasmContract.PlutusData {
        const ret = WasmV4.PlutusData.new_bytes(bytes);
        return new $outer.PlutusData(ret, $outer._ctx);
      }

      kind(): WasmContract.PlutusDataKind {
        return this.wasm.kind();
      }

      asConstrPlutusData(): Optional<WasmContract.ConstrPlutusData> {
        const ret = this.wasm.as_constr_plutus_data();
        if (ret == null) return undefined;
        return new $outer.ConstrPlutusData(ret, $outer._ctx);
      }

      asMap(): Optional<WasmContract.PlutusMap> {
        const ret = this.wasm.as_map();
        if (ret == null) return undefined;
        return new $outer.PlutusMap(ret, $outer._ctx);
      }

      asList(): Optional<WasmContract.PlutusList> {
        const ret = this.wasm.as_list();
        if (ret == null) return undefined;
        return new $outer.PlutusList(ret, $outer._ctx);
      }

      asInteger(): Optional<WasmContract.BigInt> {
        const ret = this.wasm.as_integer();
        if (ret == null) return undefined;
        return new $outer.BigInt(ret, $outer._ctx);
      }

      asBytes(): Optional<Uint8Array> {
        return this.wasm.as_bytes();
      }

      toJson(schema: WasmContract.PlutusDatumSchema): string {
        return this.wasm.to_json(schema);
      }

      static fromJson(json: string, schema: WasmContract.PlutusDatumSchema): WasmContract.PlutusData {
        const ret = WasmV4.PlutusData.from_json(json, schema);
        return new $outer.PlutusData(ret, $outer._ctx);
      }

      static fromAddress(address: WasmContract.Address): WasmContract.PlutusData {
        const ret = WasmV4.PlutusData.from_address(address.wasm);
        return new $outer.PlutusData(ret, $outer._ctx);
      }

      asAddress(network: WasmContract.NetworkInfo): WasmContract.Address {
        const ret = this.wasm.as_address(network.wasm);
        return new $outer.Address(ret, $outer._ctx);
      }

    }
    return PlutusData;
  })();

  public PlutusList = (() => {
    const $outer = this;

    class PlutusList
      extends Ptr<WasmV4.PlutusList>
      implements WasmContract.PlutusList
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.PlutusList {
        const ret = WasmV4.PlutusList.from_bytes(bytes);
        return new $outer.PlutusList(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.PlutusList {
        const ret = WasmV4.PlutusList.from_hex(hexStr);
        return new $outer.PlutusList(ret, $outer._ctx);
      }

      static new(): WasmContract.PlutusList {
        const ret = WasmV4.PlutusList.new();
        return new $outer.PlutusList(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      get(index: number): WasmContract.PlutusData {
        const ret = this.wasm.get(index);
        return new $outer.PlutusData(ret, $outer._ctx);
      }

      add(elem: WasmContract.PlutusData): void {
        return this.wasm.add(elem.wasm);
      }

    }
    return PlutusList;
  })();

  public PlutusMap = (() => {
    const $outer = this;

    class PlutusMap
      extends Ptr<WasmV4.PlutusMap>
      implements WasmContract.PlutusMap
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.PlutusMap {
        const ret = WasmV4.PlutusMap.from_bytes(bytes);
        return new $outer.PlutusMap(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.PlutusMap {
        const ret = WasmV4.PlutusMap.from_hex(hexStr);
        return new $outer.PlutusMap(ret, $outer._ctx);
      }

      static new(): WasmContract.PlutusMap {
        const ret = WasmV4.PlutusMap.new();
        return new $outer.PlutusMap(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      insert(key: WasmContract.PlutusData, values: WasmContract.PlutusMapValues): Optional<WasmContract.PlutusMapValues> {
        const ret = this.wasm.insert(key.wasm, values.wasm);
        if (ret == null) return undefined;
        return new $outer.PlutusMapValues(ret, $outer._ctx);
      }

      get(key: WasmContract.PlutusData): Optional<WasmContract.PlutusMapValues> {
        const ret = this.wasm.get(key.wasm);
        if (ret == null) return undefined;
        return new $outer.PlutusMapValues(ret, $outer._ctx);
      }

      keys(): WasmContract.PlutusList {
        const ret = this.wasm.keys();
        return new $outer.PlutusList(ret, $outer._ctx);
      }

    }
    return PlutusMap;
  })();

  public PlutusMapValues = (() => {
    const $outer = this;

    class PlutusMapValues
      extends Ptr<WasmV4.PlutusMapValues>
      implements WasmContract.PlutusMapValues
    {

      static new(): WasmContract.PlutusMapValues {
        const ret = WasmV4.PlutusMapValues.new();
        return new $outer.PlutusMapValues(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      get(index: number): Optional<WasmContract.PlutusData> {
        const ret = this.wasm.get(index);
        if (ret == null) return undefined;
        return new $outer.PlutusData(ret, $outer._ctx);
      }

      add(elem: WasmContract.PlutusData): void {
        return this.wasm.add(elem.wasm);
      }

    }
    return PlutusMapValues;
  })();

  public PlutusScript = (() => {
    const $outer = this;

    class PlutusScript
      extends Ptr<WasmV4.PlutusScript>
      implements WasmContract.PlutusScript
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.PlutusScript {
        const ret = WasmV4.PlutusScript.from_bytes(bytes);
        return new $outer.PlutusScript(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.PlutusScript {
        const ret = WasmV4.PlutusScript.from_hex(hexStr);
        return new $outer.PlutusScript(ret, $outer._ctx);
      }

      static new(bytes: Uint8Array): WasmContract.PlutusScript {
        const ret = WasmV4.PlutusScript.new(bytes);
        return new $outer.PlutusScript(ret, $outer._ctx);
      }

      static newV2(bytes: Uint8Array): WasmContract.PlutusScript {
        const ret = WasmV4.PlutusScript.new_v2(bytes);
        return new $outer.PlutusScript(ret, $outer._ctx);
      }

      static newV3(bytes: Uint8Array): WasmContract.PlutusScript {
        const ret = WasmV4.PlutusScript.new_v3(bytes);
        return new $outer.PlutusScript(ret, $outer._ctx);
      }

      static newWithVersion(bytes: Uint8Array, language: WasmContract.Language): WasmContract.PlutusScript {
        const ret = WasmV4.PlutusScript.new_with_version(bytes, language.wasm);
        return new $outer.PlutusScript(ret, $outer._ctx);
      }

      bytes(): Uint8Array {
        return this.wasm.bytes();
      }

      static fromBytesV2(bytes: Uint8Array): WasmContract.PlutusScript {
        const ret = WasmV4.PlutusScript.from_bytes_v2(bytes);
        return new $outer.PlutusScript(ret, $outer._ctx);
      }

      static fromBytesV3(bytes: Uint8Array): WasmContract.PlutusScript {
        const ret = WasmV4.PlutusScript.from_bytes_v3(bytes);
        return new $outer.PlutusScript(ret, $outer._ctx);
      }

      static fromBytesWithVersion(bytes: Uint8Array, language: WasmContract.Language): WasmContract.PlutusScript {
        const ret = WasmV4.PlutusScript.from_bytes_with_version(bytes, language.wasm);
        return new $outer.PlutusScript(ret, $outer._ctx);
      }

      static fromHexWithVersion(hexStr: string, language: WasmContract.Language): WasmContract.PlutusScript {
        const ret = WasmV4.PlutusScript.from_hex_with_version(hexStr, language.wasm);
        return new $outer.PlutusScript(ret, $outer._ctx);
      }

      hash(): WasmContract.ScriptHash {
        const ret = this.wasm.hash();
        return new $outer.ScriptHash(ret, $outer._ctx);
      }

      languageVersion(): WasmContract.Language {
        const ret = this.wasm.language_version();
        return new $outer.Language(ret, $outer._ctx);
      }

    }
    return PlutusScript;
  })();

  public PlutusScriptSource = (() => {
    const $outer = this;

    class PlutusScriptSource
      extends Ptr<WasmV4.PlutusScriptSource>
      implements WasmContract.PlutusScriptSource
    {

      static new(script: WasmContract.PlutusScript): WasmContract.PlutusScriptSource {
        const ret = WasmV4.PlutusScriptSource.new(script.wasm);
        return new $outer.PlutusScriptSource(ret, $outer._ctx);
      }

      static newRefInput(scriptHash: WasmContract.ScriptHash, input: WasmContract.TransactionInput, langVer: WasmContract.Language, scriptSize: number): WasmContract.PlutusScriptSource {
        const ret = WasmV4.PlutusScriptSource.new_ref_input(scriptHash.wasm, input.wasm, langVer.wasm, scriptSize);
        return new $outer.PlutusScriptSource(ret, $outer._ctx);
      }

      setRequiredSigners(keyHashes: WasmContract.Ed25519KeyHashes): void {
        return this.wasm.set_required_signers(keyHashes.wasm);
      }

      getRefScriptSize(): Optional<number> {
        return this.wasm.get_ref_script_size();
      }

    }
    return PlutusScriptSource;
  })();

  public PlutusScripts = (() => {
    const $outer = this;

    class PlutusScripts
      extends Ptr<WasmV4.PlutusScripts>
      implements WasmContract.PlutusScripts
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.PlutusScripts {
        const ret = WasmV4.PlutusScripts.from_bytes(bytes);
        return new $outer.PlutusScripts(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.PlutusScripts {
        const ret = WasmV4.PlutusScripts.from_hex(hexStr);
        return new $outer.PlutusScripts(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.PlutusScripts {
        const ret = WasmV4.PlutusScripts.from_json(json);
        return new $outer.PlutusScripts(ret, $outer._ctx);
      }

      static new(): WasmContract.PlutusScripts {
        const ret = WasmV4.PlutusScripts.new();
        return new $outer.PlutusScripts(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      get(index: number): WasmContract.PlutusScript {
        const ret = this.wasm.get(index);
        return new $outer.PlutusScript(ret, $outer._ctx);
      }

      add(elem: WasmContract.PlutusScript): void {
        return this.wasm.add(elem.wasm);
      }

    }
    return PlutusScripts;
  })();

  public PlutusWitness = (() => {
    const $outer = this;

    class PlutusWitness
      extends Ptr<WasmV4.PlutusWitness>
      implements WasmContract.PlutusWitness
    {

      static new(script: WasmContract.PlutusScript, datum: WasmContract.PlutusData, redeemer: WasmContract.Redeemer): WasmContract.PlutusWitness {
        const ret = WasmV4.PlutusWitness.new(script.wasm, datum.wasm, redeemer.wasm);
        return new $outer.PlutusWitness(ret, $outer._ctx);
      }

      static newWithRef(script: WasmContract.PlutusScriptSource, datum: WasmContract.DatumSource, redeemer: WasmContract.Redeemer): WasmContract.PlutusWitness {
        const ret = WasmV4.PlutusWitness.new_with_ref(script.wasm, datum.wasm, redeemer.wasm);
        return new $outer.PlutusWitness(ret, $outer._ctx);
      }

      static newWithoutDatum(script: WasmContract.PlutusScript, redeemer: WasmContract.Redeemer): WasmContract.PlutusWitness {
        const ret = WasmV4.PlutusWitness.new_without_datum(script.wasm, redeemer.wasm);
        return new $outer.PlutusWitness(ret, $outer._ctx);
      }

      static newWithRefWithoutDatum(script: WasmContract.PlutusScriptSource, redeemer: WasmContract.Redeemer): WasmContract.PlutusWitness {
        const ret = WasmV4.PlutusWitness.new_with_ref_without_datum(script.wasm, redeemer.wasm);
        return new $outer.PlutusWitness(ret, $outer._ctx);
      }

      script(): Optional<WasmContract.PlutusScript> {
        const ret = this.wasm.script();
        if (ret == null) return undefined;
        return new $outer.PlutusScript(ret, $outer._ctx);
      }

      datum(): Optional<WasmContract.PlutusData> {
        const ret = this.wasm.datum();
        if (ret == null) return undefined;
        return new $outer.PlutusData(ret, $outer._ctx);
      }

      redeemer(): WasmContract.Redeemer {
        const ret = this.wasm.redeemer();
        return new $outer.Redeemer(ret, $outer._ctx);
      }

    }
    return PlutusWitness;
  })();

  public PlutusWitnesses = (() => {
    const $outer = this;

    class PlutusWitnesses
      extends Ptr<WasmV4.PlutusWitnesses>
      implements WasmContract.PlutusWitnesses
    {

      static new(): WasmContract.PlutusWitnesses {
        const ret = WasmV4.PlutusWitnesses.new();
        return new $outer.PlutusWitnesses(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      get(index: number): WasmContract.PlutusWitness {
        const ret = this.wasm.get(index);
        return new $outer.PlutusWitness(ret, $outer._ctx);
      }

      add(elem: WasmContract.PlutusWitness): void {
        return this.wasm.add(elem.wasm);
      }

    }
    return PlutusWitnesses;
  })();

  public Pointer = (() => {
    const $outer = this;

    class Pointer
      extends Ptr<WasmV4.Pointer>
      implements WasmContract.Pointer
    {

      static new(slot: number, txIndex: number, certIndex: number): WasmContract.Pointer {
        const ret = WasmV4.Pointer.new(slot, txIndex, certIndex);
        return new $outer.Pointer(ret, $outer._ctx);
      }

      static newPointer(slot: WasmContract.BigNum, txIndex: WasmContract.BigNum, certIndex: WasmContract.BigNum): WasmContract.Pointer {
        const ret = WasmV4.Pointer.new_pointer(slot.wasm, txIndex.wasm, certIndex.wasm);
        return new $outer.Pointer(ret, $outer._ctx);
      }

      slot(): number {
        return this.wasm.slot();
      }

      txIndex(): number {
        return this.wasm.tx_index();
      }

      certIndex(): number {
        return this.wasm.cert_index();
      }

      slotBignum(): WasmContract.BigNum {
        const ret = this.wasm.slot_bignum();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      txIndexBignum(): WasmContract.BigNum {
        const ret = this.wasm.tx_index_bignum();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      certIndexBignum(): WasmContract.BigNum {
        const ret = this.wasm.cert_index_bignum();
        return new $outer.BigNum(ret, $outer._ctx);
      }

    }
    return Pointer;
  })();

  public PointerAddress = (() => {
    const $outer = this;

    class PointerAddress
      extends Ptr<WasmV4.PointerAddress>
      implements WasmContract.PointerAddress
    {

      static new(network: number, payment: WasmContract.Credential, stake: WasmContract.Pointer): WasmContract.PointerAddress {
        const ret = WasmV4.PointerAddress.new(network, payment.wasm, stake.wasm);
        return new $outer.PointerAddress(ret, $outer._ctx);
      }

      paymentCred(): WasmContract.Credential {
        const ret = this.wasm.payment_cred();
        return new $outer.Credential(ret, $outer._ctx);
      }

      stakePointer(): WasmContract.Pointer {
        const ret = this.wasm.stake_pointer();
        return new $outer.Pointer(ret, $outer._ctx);
      }

      toAddress(): WasmContract.Address {
        const ret = this.wasm.to_address();
        return new $outer.Address(ret, $outer._ctx);
      }

      static fromAddress(addr: WasmContract.Address): Optional<WasmContract.PointerAddress> {
        const ret = WasmV4.PointerAddress.from_address(addr.wasm);
        if (ret == null) return undefined;
        return new $outer.PointerAddress(ret, $outer._ctx);
      }

      networkId(): number {
        return this.wasm.network_id();
      }

    }
    return PointerAddress;
  })();

  public PoolMetadata = (() => {
    const $outer = this;

    class PoolMetadata
      extends Ptr<WasmV4.PoolMetadata>
      implements WasmContract.PoolMetadata
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.PoolMetadata {
        const ret = WasmV4.PoolMetadata.from_bytes(bytes);
        return new $outer.PoolMetadata(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.PoolMetadata {
        const ret = WasmV4.PoolMetadata.from_hex(hexStr);
        return new $outer.PoolMetadata(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.PoolMetadata {
        const ret = WasmV4.PoolMetadata.from_json(json);
        return new $outer.PoolMetadata(ret, $outer._ctx);
      }

      url(): WasmContract.URL {
        const ret = this.wasm.url();
        return new $outer.URL(ret, $outer._ctx);
      }

      poolMetadataHash(): WasmContract.PoolMetadataHash {
        const ret = this.wasm.pool_metadata_hash();
        return new $outer.PoolMetadataHash(ret, $outer._ctx);
      }

      static new(url: WasmContract.URL, poolMetadataHash: WasmContract.PoolMetadataHash): WasmContract.PoolMetadata {
        const ret = WasmV4.PoolMetadata.new(url.wasm, poolMetadataHash.wasm);
        return new $outer.PoolMetadata(ret, $outer._ctx);
      }

    }
    return PoolMetadata;
  })();

  public PoolMetadataHash = (() => {
    const $outer = this;

    class PoolMetadataHash
      extends Ptr<WasmV4.PoolMetadataHash>
      implements WasmContract.PoolMetadataHash
    {

      static fromBytes(bytes: Uint8Array): WasmContract.PoolMetadataHash {
        const ret = WasmV4.PoolMetadataHash.from_bytes(bytes);
        return new $outer.PoolMetadataHash(ret, $outer._ctx);
      }

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      toBech32(prefix: string): string {
        return this.wasm.to_bech32(prefix);
      }

      static fromBech32(bechStr: string): WasmContract.PoolMetadataHash {
        const ret = WasmV4.PoolMetadataHash.from_bech32(bechStr);
        return new $outer.PoolMetadataHash(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hex: string): WasmContract.PoolMetadataHash {
        const ret = WasmV4.PoolMetadataHash.from_hex(hex);
        return new $outer.PoolMetadataHash(ret, $outer._ctx);
      }

    }
    return PoolMetadataHash;
  })();

  public PoolParams = (() => {
    const $outer = this;

    class PoolParams
      extends Ptr<WasmV4.PoolParams>
      implements WasmContract.PoolParams
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.PoolParams {
        const ret = WasmV4.PoolParams.from_bytes(bytes);
        return new $outer.PoolParams(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.PoolParams {
        const ret = WasmV4.PoolParams.from_hex(hexStr);
        return new $outer.PoolParams(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.PoolParams {
        const ret = WasmV4.PoolParams.from_json(json);
        return new $outer.PoolParams(ret, $outer._ctx);
      }

      operator(): WasmContract.Ed25519KeyHash {
        const ret = this.wasm.operator();
        return new $outer.Ed25519KeyHash(ret, $outer._ctx);
      }

      vrfKeyhash(): WasmContract.VRFKeyHash {
        const ret = this.wasm.vrf_keyhash();
        return new $outer.VRFKeyHash(ret, $outer._ctx);
      }

      pledge(): WasmContract.BigNum {
        const ret = this.wasm.pledge();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      cost(): WasmContract.BigNum {
        const ret = this.wasm.cost();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      margin(): WasmContract.UnitInterval {
        const ret = this.wasm.margin();
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      rewardAccount(): WasmContract.RewardAddress {
        const ret = this.wasm.reward_account();
        return new $outer.RewardAddress(ret, $outer._ctx);
      }

      poolOwners(): WasmContract.Ed25519KeyHashes {
        const ret = this.wasm.pool_owners();
        return new $outer.Ed25519KeyHashes(ret, $outer._ctx);
      }

      relays(): WasmContract.Relays {
        const ret = this.wasm.relays();
        return new $outer.Relays(ret, $outer._ctx);
      }

      poolMetadata(): Optional<WasmContract.PoolMetadata> {
        const ret = this.wasm.pool_metadata();
        if (ret == null) return undefined;
        return new $outer.PoolMetadata(ret, $outer._ctx);
      }

      static new(operator: WasmContract.Ed25519KeyHash, vrfKeyhash: WasmContract.VRFKeyHash, pledge: WasmContract.BigNum, cost: WasmContract.BigNum, margin: WasmContract.UnitInterval, rewardAccount: WasmContract.RewardAddress, poolOwners: WasmContract.Ed25519KeyHashes, relays: WasmContract.Relays, poolMetadata: Optional<WasmContract.PoolMetadata>): WasmContract.PoolParams {
        const ret = WasmV4.PoolParams.new(operator.wasm, vrfKeyhash.wasm, pledge.wasm, cost.wasm, margin.wasm, rewardAccount.wasm, poolOwners.wasm, relays.wasm, poolMetadata?.wasm);
        return new $outer.PoolParams(ret, $outer._ctx);
      }

    }
    return PoolParams;
  })();

  public PoolRegistration = (() => {
    const $outer = this;

    class PoolRegistration
      extends Ptr<WasmV4.PoolRegistration>
      implements WasmContract.PoolRegistration
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.PoolRegistration {
        const ret = WasmV4.PoolRegistration.from_bytes(bytes);
        return new $outer.PoolRegistration(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.PoolRegistration {
        const ret = WasmV4.PoolRegistration.from_hex(hexStr);
        return new $outer.PoolRegistration(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.PoolRegistration {
        const ret = WasmV4.PoolRegistration.from_json(json);
        return new $outer.PoolRegistration(ret, $outer._ctx);
      }

      poolParams(): WasmContract.PoolParams {
        const ret = this.wasm.pool_params();
        return new $outer.PoolParams(ret, $outer._ctx);
      }

      static new(poolParams: WasmContract.PoolParams): WasmContract.PoolRegistration {
        const ret = WasmV4.PoolRegistration.new(poolParams.wasm);
        return new $outer.PoolRegistration(ret, $outer._ctx);
      }

    }
    return PoolRegistration;
  })();

  public PoolRetirement = (() => {
    const $outer = this;

    class PoolRetirement
      extends Ptr<WasmV4.PoolRetirement>
      implements WasmContract.PoolRetirement
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.PoolRetirement {
        const ret = WasmV4.PoolRetirement.from_bytes(bytes);
        return new $outer.PoolRetirement(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.PoolRetirement {
        const ret = WasmV4.PoolRetirement.from_hex(hexStr);
        return new $outer.PoolRetirement(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.PoolRetirement {
        const ret = WasmV4.PoolRetirement.from_json(json);
        return new $outer.PoolRetirement(ret, $outer._ctx);
      }

      poolKeyhash(): WasmContract.Ed25519KeyHash {
        const ret = this.wasm.pool_keyhash();
        return new $outer.Ed25519KeyHash(ret, $outer._ctx);
      }

      epoch(): number {
        return this.wasm.epoch();
      }

      static new(poolKeyhash: WasmContract.Ed25519KeyHash, epoch: number): WasmContract.PoolRetirement {
        const ret = WasmV4.PoolRetirement.new(poolKeyhash.wasm, epoch);
        return new $outer.PoolRetirement(ret, $outer._ctx);
      }

    }
    return PoolRetirement;
  })();

  public PoolVotingThresholds = (() => {
    const $outer = this;

    class PoolVotingThresholds
      extends Ptr<WasmV4.PoolVotingThresholds>
      implements WasmContract.PoolVotingThresholds
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.PoolVotingThresholds {
        const ret = WasmV4.PoolVotingThresholds.from_bytes(bytes);
        return new $outer.PoolVotingThresholds(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.PoolVotingThresholds {
        const ret = WasmV4.PoolVotingThresholds.from_hex(hexStr);
        return new $outer.PoolVotingThresholds(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.PoolVotingThresholds {
        const ret = WasmV4.PoolVotingThresholds.from_json(json);
        return new $outer.PoolVotingThresholds(ret, $outer._ctx);
      }

      static new(motionNoConfidence: WasmContract.UnitInterval, committeeNormal: WasmContract.UnitInterval, committeeNoConfidence: WasmContract.UnitInterval, hardForkInitiation: WasmContract.UnitInterval, securityRelevantThreshold: WasmContract.UnitInterval): WasmContract.PoolVotingThresholds {
        const ret = WasmV4.PoolVotingThresholds.new(motionNoConfidence.wasm, committeeNormal.wasm, committeeNoConfidence.wasm, hardForkInitiation.wasm, securityRelevantThreshold.wasm);
        return new $outer.PoolVotingThresholds(ret, $outer._ctx);
      }

      motionNoConfidence(): WasmContract.UnitInterval {
        const ret = this.wasm.motion_no_confidence();
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      committeeNormal(): WasmContract.UnitInterval {
        const ret = this.wasm.committee_normal();
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      committeeNoConfidence(): WasmContract.UnitInterval {
        const ret = this.wasm.committee_no_confidence();
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      hardForkInitiation(): WasmContract.UnitInterval {
        const ret = this.wasm.hard_fork_initiation();
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      securityRelevantThreshold(): WasmContract.UnitInterval {
        const ret = this.wasm.security_relevant_threshold();
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

    }
    return PoolVotingThresholds;
  })();

  public PrivateKey = (() => {
    const $outer = this;

    class PrivateKey
      extends Ptr<WasmV4.PrivateKey>
      implements WasmContract.PrivateKey
    {

      toPublic(): WasmContract.PublicKey {
        const ret = this.wasm.to_public();
        return new $outer.PublicKey(ret, $outer._ctx);
      }

      static generateEd25519(): WasmContract.PrivateKey {
        const ret = WasmV4.PrivateKey.generate_ed25519();
        return new $outer.PrivateKey(ret, $outer._ctx);
      }

      static generateEd25519extended(): WasmContract.PrivateKey {
        const ret = WasmV4.PrivateKey.generate_ed25519extended();
        return new $outer.PrivateKey(ret, $outer._ctx);
      }

      static fromBech32(bech32Str: string): WasmContract.PrivateKey {
        const ret = WasmV4.PrivateKey.from_bech32(bech32Str);
        return new $outer.PrivateKey(ret, $outer._ctx);
      }

      toBech32(): string {
        return this.wasm.to_bech32();
      }

      asBytes(): Uint8Array {
        return this.wasm.as_bytes();
      }

      static fromExtendedBytes(bytes: Uint8Array): WasmContract.PrivateKey {
        const ret = WasmV4.PrivateKey.from_extended_bytes(bytes);
        return new $outer.PrivateKey(ret, $outer._ctx);
      }

      static fromNormalBytes(bytes: Uint8Array): WasmContract.PrivateKey {
        const ret = WasmV4.PrivateKey.from_normal_bytes(bytes);
        return new $outer.PrivateKey(ret, $outer._ctx);
      }

      sign(message: Uint8Array): WasmContract.Ed25519Signature {
        const ret = this.wasm.sign(message);
        return new $outer.Ed25519Signature(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.PrivateKey {
        const ret = WasmV4.PrivateKey.from_hex(hexStr);
        return new $outer.PrivateKey(ret, $outer._ctx);
      }

    }
    return PrivateKey;
  })();

  public ProposedProtocolParameterUpdates = (() => {
    const $outer = this;

    class ProposedProtocolParameterUpdates
      extends Ptr<WasmV4.ProposedProtocolParameterUpdates>
      implements WasmContract.ProposedProtocolParameterUpdates
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.ProposedProtocolParameterUpdates {
        const ret = WasmV4.ProposedProtocolParameterUpdates.from_bytes(bytes);
        return new $outer.ProposedProtocolParameterUpdates(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.ProposedProtocolParameterUpdates {
        const ret = WasmV4.ProposedProtocolParameterUpdates.from_hex(hexStr);
        return new $outer.ProposedProtocolParameterUpdates(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.ProposedProtocolParameterUpdates {
        const ret = WasmV4.ProposedProtocolParameterUpdates.from_json(json);
        return new $outer.ProposedProtocolParameterUpdates(ret, $outer._ctx);
      }

      static new(): WasmContract.ProposedProtocolParameterUpdates {
        const ret = WasmV4.ProposedProtocolParameterUpdates.new();
        return new $outer.ProposedProtocolParameterUpdates(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      insert(key: WasmContract.GenesisHash, value: WasmContract.ProtocolParamUpdate): Optional<WasmContract.ProtocolParamUpdate> {
        const ret = this.wasm.insert(key.wasm, value.wasm);
        if (ret == null) return undefined;
        return new $outer.ProtocolParamUpdate(ret, $outer._ctx);
      }

      get(key: WasmContract.GenesisHash): Optional<WasmContract.ProtocolParamUpdate> {
        const ret = this.wasm.get(key.wasm);
        if (ret == null) return undefined;
        return new $outer.ProtocolParamUpdate(ret, $outer._ctx);
      }

      keys(): WasmContract.GenesisHashes {
        const ret = this.wasm.keys();
        return new $outer.GenesisHashes(ret, $outer._ctx);
      }

    }
    return ProposedProtocolParameterUpdates;
  })();

  public ProtocolParamUpdate = (() => {
    const $outer = this;

    class ProtocolParamUpdate
      extends Ptr<WasmV4.ProtocolParamUpdate>
      implements WasmContract.ProtocolParamUpdate
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.ProtocolParamUpdate {
        const ret = WasmV4.ProtocolParamUpdate.from_bytes(bytes);
        return new $outer.ProtocolParamUpdate(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.ProtocolParamUpdate {
        const ret = WasmV4.ProtocolParamUpdate.from_hex(hexStr);
        return new $outer.ProtocolParamUpdate(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.ProtocolParamUpdate {
        const ret = WasmV4.ProtocolParamUpdate.from_json(json);
        return new $outer.ProtocolParamUpdate(ret, $outer._ctx);
      }

      setMinfeeA(minfeeA: WasmContract.BigNum): void {
        return this.wasm.set_minfee_a(minfeeA.wasm);
      }

      minfeeA(): Optional<WasmContract.BigNum> {
        const ret = this.wasm.minfee_a();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      setMinfeeB(minfeeB: WasmContract.BigNum): void {
        return this.wasm.set_minfee_b(minfeeB.wasm);
      }

      minfeeB(): Optional<WasmContract.BigNum> {
        const ret = this.wasm.minfee_b();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      setMaxBlockBodySize(maxBlockBodySize: number): void {
        return this.wasm.set_max_block_body_size(maxBlockBodySize);
      }

      maxBlockBodySize(): Optional<number> {
        return this.wasm.max_block_body_size();
      }

      setMaxTxSize(maxTxSize: number): void {
        return this.wasm.set_max_tx_size(maxTxSize);
      }

      maxTxSize(): Optional<number> {
        return this.wasm.max_tx_size();
      }

      setMaxBlockHeaderSize(maxBlockHeaderSize: number): void {
        return this.wasm.set_max_block_header_size(maxBlockHeaderSize);
      }

      maxBlockHeaderSize(): Optional<number> {
        return this.wasm.max_block_header_size();
      }

      setKeyDeposit(keyDeposit: WasmContract.BigNum): void {
        return this.wasm.set_key_deposit(keyDeposit.wasm);
      }

      keyDeposit(): Optional<WasmContract.BigNum> {
        const ret = this.wasm.key_deposit();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      setPoolDeposit(poolDeposit: WasmContract.BigNum): void {
        return this.wasm.set_pool_deposit(poolDeposit.wasm);
      }

      poolDeposit(): Optional<WasmContract.BigNum> {
        const ret = this.wasm.pool_deposit();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      setMaxEpoch(maxEpoch: number): void {
        return this.wasm.set_max_epoch(maxEpoch);
      }

      maxEpoch(): Optional<number> {
        return this.wasm.max_epoch();
      }

      setNOpt(nOpt: number): void {
        return this.wasm.set_n_opt(nOpt);
      }

      nOpt(): Optional<number> {
        return this.wasm.n_opt();
      }

      setPoolPledgeInfluence(poolPledgeInfluence: WasmContract.UnitInterval): void {
        return this.wasm.set_pool_pledge_influence(poolPledgeInfluence.wasm);
      }

      poolPledgeInfluence(): Optional<WasmContract.UnitInterval> {
        const ret = this.wasm.pool_pledge_influence();
        if (ret == null) return undefined;
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      setExpansionRate(expansionRate: WasmContract.UnitInterval): void {
        return this.wasm.set_expansion_rate(expansionRate.wasm);
      }

      expansionRate(): Optional<WasmContract.UnitInterval> {
        const ret = this.wasm.expansion_rate();
        if (ret == null) return undefined;
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      setTreasuryGrowthRate(treasuryGrowthRate: WasmContract.UnitInterval): void {
        return this.wasm.set_treasury_growth_rate(treasuryGrowthRate.wasm);
      }

      treasuryGrowthRate(): Optional<WasmContract.UnitInterval> {
        const ret = this.wasm.treasury_growth_rate();
        if (ret == null) return undefined;
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      d(): Optional<WasmContract.UnitInterval> {
        const ret = this.wasm.d();
        if (ret == null) return undefined;
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      extraEntropy(): Optional<WasmContract.Nonce> {
        const ret = this.wasm.extra_entropy();
        if (ret == null) return undefined;
        return new $outer.Nonce(ret, $outer._ctx);
      }

      setProtocolVersion(protocolVersion: WasmContract.ProtocolVersion): void {
        return this.wasm.set_protocol_version(protocolVersion.wasm);
      }

      protocolVersion(): Optional<WasmContract.ProtocolVersion> {
        const ret = this.wasm.protocol_version();
        if (ret == null) return undefined;
        return new $outer.ProtocolVersion(ret, $outer._ctx);
      }

      setMinPoolCost(minPoolCost: WasmContract.BigNum): void {
        return this.wasm.set_min_pool_cost(minPoolCost.wasm);
      }

      minPoolCost(): Optional<WasmContract.BigNum> {
        const ret = this.wasm.min_pool_cost();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      setAdaPerUtxoByte(adaPerUtxoByte: WasmContract.BigNum): void {
        return this.wasm.set_ada_per_utxo_byte(adaPerUtxoByte.wasm);
      }

      adaPerUtxoByte(): Optional<WasmContract.BigNum> {
        const ret = this.wasm.ada_per_utxo_byte();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      setCostModels(costModels: WasmContract.Costmdls): void {
        return this.wasm.set_cost_models(costModels.wasm);
      }

      costModels(): Optional<WasmContract.Costmdls> {
        const ret = this.wasm.cost_models();
        if (ret == null) return undefined;
        return new $outer.Costmdls(ret, $outer._ctx);
      }

      setExecutionCosts(executionCosts: WasmContract.ExUnitPrices): void {
        return this.wasm.set_execution_costs(executionCosts.wasm);
      }

      executionCosts(): Optional<WasmContract.ExUnitPrices> {
        const ret = this.wasm.execution_costs();
        if (ret == null) return undefined;
        return new $outer.ExUnitPrices(ret, $outer._ctx);
      }

      setMaxTxExUnits(maxTxExUnits: WasmContract.ExUnits): void {
        return this.wasm.set_max_tx_ex_units(maxTxExUnits.wasm);
      }

      maxTxExUnits(): Optional<WasmContract.ExUnits> {
        const ret = this.wasm.max_tx_ex_units();
        if (ret == null) return undefined;
        return new $outer.ExUnits(ret, $outer._ctx);
      }

      setMaxBlockExUnits(maxBlockExUnits: WasmContract.ExUnits): void {
        return this.wasm.set_max_block_ex_units(maxBlockExUnits.wasm);
      }

      maxBlockExUnits(): Optional<WasmContract.ExUnits> {
        const ret = this.wasm.max_block_ex_units();
        if (ret == null) return undefined;
        return new $outer.ExUnits(ret, $outer._ctx);
      }

      setMaxValueSize(maxValueSize: number): void {
        return this.wasm.set_max_value_size(maxValueSize);
      }

      maxValueSize(): Optional<number> {
        return this.wasm.max_value_size();
      }

      setCollateralPercentage(collateralPercentage: number): void {
        return this.wasm.set_collateral_percentage(collateralPercentage);
      }

      collateralPercentage(): Optional<number> {
        return this.wasm.collateral_percentage();
      }

      setMaxCollateralInputs(maxCollateralInputs: number): void {
        return this.wasm.set_max_collateral_inputs(maxCollateralInputs);
      }

      maxCollateralInputs(): Optional<number> {
        return this.wasm.max_collateral_inputs();
      }

      setPoolVotingThresholds(poolVotingThresholds: WasmContract.PoolVotingThresholds): void {
        return this.wasm.set_pool_voting_thresholds(poolVotingThresholds.wasm);
      }

      poolVotingThresholds(): Optional<WasmContract.PoolVotingThresholds> {
        const ret = this.wasm.pool_voting_thresholds();
        if (ret == null) return undefined;
        return new $outer.PoolVotingThresholds(ret, $outer._ctx);
      }

      setDrepVotingThresholds(drepVotingThresholds: WasmContract.DRepVotingThresholds): void {
        return this.wasm.set_drep_voting_thresholds(drepVotingThresholds.wasm);
      }

      drepVotingThresholds(): Optional<WasmContract.DRepVotingThresholds> {
        const ret = this.wasm.drep_voting_thresholds();
        if (ret == null) return undefined;
        return new $outer.DRepVotingThresholds(ret, $outer._ctx);
      }

      setMinCommitteeSize(minCommitteeSize: number): void {
        return this.wasm.set_min_committee_size(minCommitteeSize);
      }

      minCommitteeSize(): Optional<number> {
        return this.wasm.min_committee_size();
      }

      setCommitteeTermLimit(committeeTermLimit: number): void {
        return this.wasm.set_committee_term_limit(committeeTermLimit);
      }

      committeeTermLimit(): Optional<number> {
        return this.wasm.committee_term_limit();
      }

      setGovernanceActionValidityPeriod(governanceActionValidityPeriod: number): void {
        return this.wasm.set_governance_action_validity_period(governanceActionValidityPeriod);
      }

      governanceActionValidityPeriod(): Optional<number> {
        return this.wasm.governance_action_validity_period();
      }

      setGovernanceActionDeposit(governanceActionDeposit: WasmContract.BigNum): void {
        return this.wasm.set_governance_action_deposit(governanceActionDeposit.wasm);
      }

      governanceActionDeposit(): Optional<WasmContract.BigNum> {
        const ret = this.wasm.governance_action_deposit();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      setDrepDeposit(drepDeposit: WasmContract.BigNum): void {
        return this.wasm.set_drep_deposit(drepDeposit.wasm);
      }

      drepDeposit(): Optional<WasmContract.BigNum> {
        const ret = this.wasm.drep_deposit();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      setDrepInactivityPeriod(drepInactivityPeriod: number): void {
        return this.wasm.set_drep_inactivity_period(drepInactivityPeriod);
      }

      drepInactivityPeriod(): Optional<number> {
        return this.wasm.drep_inactivity_period();
      }

      setRefScriptCoinsPerByte(refScriptCoinsPerByte: WasmContract.UnitInterval): void {
        return this.wasm.set_ref_script_coins_per_byte(refScriptCoinsPerByte.wasm);
      }

      refScriptCoinsPerByte(): Optional<WasmContract.UnitInterval> {
        const ret = this.wasm.ref_script_coins_per_byte();
        if (ret == null) return undefined;
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      static new(): WasmContract.ProtocolParamUpdate {
        const ret = WasmV4.ProtocolParamUpdate.new();
        return new $outer.ProtocolParamUpdate(ret, $outer._ctx);
      }

    }
    return ProtocolParamUpdate;
  })();

  public ProtocolVersion = (() => {
    const $outer = this;

    class ProtocolVersion
      extends Ptr<WasmV4.ProtocolVersion>
      implements WasmContract.ProtocolVersion
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.ProtocolVersion {
        const ret = WasmV4.ProtocolVersion.from_bytes(bytes);
        return new $outer.ProtocolVersion(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.ProtocolVersion {
        const ret = WasmV4.ProtocolVersion.from_hex(hexStr);
        return new $outer.ProtocolVersion(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.ProtocolVersion {
        const ret = WasmV4.ProtocolVersion.from_json(json);
        return new $outer.ProtocolVersion(ret, $outer._ctx);
      }

      major(): number {
        return this.wasm.major();
      }

      minor(): number {
        return this.wasm.minor();
      }

      static new(major: number, minor: number): WasmContract.ProtocolVersion {
        const ret = WasmV4.ProtocolVersion.new(major, minor);
        return new $outer.ProtocolVersion(ret, $outer._ctx);
      }

    }
    return ProtocolVersion;
  })();

  public PublicKey = (() => {
    const $outer = this;

    class PublicKey
      extends Ptr<WasmV4.PublicKey>
      implements WasmContract.PublicKey
    {

      static fromBech32(bech32Str: string): WasmContract.PublicKey {
        const ret = WasmV4.PublicKey.from_bech32(bech32Str);
        return new $outer.PublicKey(ret, $outer._ctx);
      }

      toBech32(): string {
        return this.wasm.to_bech32();
      }

      asBytes(): Uint8Array {
        return this.wasm.as_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.PublicKey {
        const ret = WasmV4.PublicKey.from_bytes(bytes);
        return new $outer.PublicKey(ret, $outer._ctx);
      }

      verify(data: Uint8Array, signature: WasmContract.Ed25519Signature): boolean {
        return this.wasm.verify(data, signature.wasm);
      }

      hash(): WasmContract.Ed25519KeyHash {
        const ret = this.wasm.hash();
        return new $outer.Ed25519KeyHash(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.PublicKey {
        const ret = WasmV4.PublicKey.from_hex(hexStr);
        return new $outer.PublicKey(ret, $outer._ctx);
      }

    }
    return PublicKey;
  })();

  public PublicKeys = (() => {
    const $outer = this;

    class PublicKeys
      extends Ptr<WasmV4.PublicKeys>
      implements WasmContract.PublicKeys
    {

      static new(): WasmContract.PublicKeys {
        const ret = new WasmV4.PublicKeys();
        return new $outer.PublicKeys(ret, $outer._ctx);
      }

      size(): number {
        return this.wasm.size();
      }

      get(index: number): WasmContract.PublicKey {
        const ret = this.wasm.get(index);
        return new $outer.PublicKey(ret, $outer._ctx);
      }

      add(key: WasmContract.PublicKey): void {
        return this.wasm.add(key.wasm);
      }

    }
    return PublicKeys;
  })();

  public Redeemer = (() => {
    const $outer = this;

    class Redeemer
      extends Ptr<WasmV4.Redeemer>
      implements WasmContract.Redeemer
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.Redeemer {
        const ret = WasmV4.Redeemer.from_bytes(bytes);
        return new $outer.Redeemer(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.Redeemer {
        const ret = WasmV4.Redeemer.from_hex(hexStr);
        return new $outer.Redeemer(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.Redeemer {
        const ret = WasmV4.Redeemer.from_json(json);
        return new $outer.Redeemer(ret, $outer._ctx);
      }

      tag(): WasmContract.RedeemerTag {
        const ret = this.wasm.tag();
        return new $outer.RedeemerTag(ret, $outer._ctx);
      }

      index(): WasmContract.BigNum {
        const ret = this.wasm.index();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      data(): WasmContract.PlutusData {
        const ret = this.wasm.data();
        return new $outer.PlutusData(ret, $outer._ctx);
      }

      exUnits(): WasmContract.ExUnits {
        const ret = this.wasm.ex_units();
        return new $outer.ExUnits(ret, $outer._ctx);
      }

      static new(tag: WasmContract.RedeemerTag, index: WasmContract.BigNum, data: WasmContract.PlutusData, exUnits: WasmContract.ExUnits): WasmContract.Redeemer {
        const ret = WasmV4.Redeemer.new(tag.wasm, index.wasm, data.wasm, exUnits.wasm);
        return new $outer.Redeemer(ret, $outer._ctx);
      }

    }
    return Redeemer;
  })();

  public RedeemerTag = (() => {
    const $outer = this;

    class RedeemerTag
      extends Ptr<WasmV4.RedeemerTag>
      implements WasmContract.RedeemerTag
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.RedeemerTag {
        const ret = WasmV4.RedeemerTag.from_bytes(bytes);
        return new $outer.RedeemerTag(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.RedeemerTag {
        const ret = WasmV4.RedeemerTag.from_hex(hexStr);
        return new $outer.RedeemerTag(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.RedeemerTag {
        const ret = WasmV4.RedeemerTag.from_json(json);
        return new $outer.RedeemerTag(ret, $outer._ctx);
      }

      static newSpend(): WasmContract.RedeemerTag {
        const ret = WasmV4.RedeemerTag.new_spend();
        return new $outer.RedeemerTag(ret, $outer._ctx);
      }

      static newMint(): WasmContract.RedeemerTag {
        const ret = WasmV4.RedeemerTag.new_mint();
        return new $outer.RedeemerTag(ret, $outer._ctx);
      }

      static newCert(): WasmContract.RedeemerTag {
        const ret = WasmV4.RedeemerTag.new_cert();
        return new $outer.RedeemerTag(ret, $outer._ctx);
      }

      static newReward(): WasmContract.RedeemerTag {
        const ret = WasmV4.RedeemerTag.new_reward();
        return new $outer.RedeemerTag(ret, $outer._ctx);
      }

      static newVote(): WasmContract.RedeemerTag {
        const ret = WasmV4.RedeemerTag.new_vote();
        return new $outer.RedeemerTag(ret, $outer._ctx);
      }

      static newVotingProposal(): WasmContract.RedeemerTag {
        const ret = WasmV4.RedeemerTag.new_voting_proposal();
        return new $outer.RedeemerTag(ret, $outer._ctx);
      }

      kind(): WasmContract.RedeemerTagKind {
        return this.wasm.kind();
      }

    }
    return RedeemerTag;
  })();

  public Redeemers = (() => {
    const $outer = this;

    class Redeemers
      extends Ptr<WasmV4.Redeemers>
      implements WasmContract.Redeemers
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.Redeemers {
        const ret = WasmV4.Redeemers.from_bytes(bytes);
        return new $outer.Redeemers(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.Redeemers {
        const ret = WasmV4.Redeemers.from_hex(hexStr);
        return new $outer.Redeemers(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.Redeemers {
        const ret = WasmV4.Redeemers.from_json(json);
        return new $outer.Redeemers(ret, $outer._ctx);
      }

      static new(): WasmContract.Redeemers {
        const ret = WasmV4.Redeemers.new();
        return new $outer.Redeemers(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      get(index: number): WasmContract.Redeemer {
        const ret = this.wasm.get(index);
        return new $outer.Redeemer(ret, $outer._ctx);
      }

      add(elem: WasmContract.Redeemer): void {
        return this.wasm.add(elem.wasm);
      }

      getContainerType(): WasmContract.CborContainerType {
        return this.wasm.get_container_type();
      }

      totalExUnits(): WasmContract.ExUnits {
        const ret = this.wasm.total_ex_units();
        return new $outer.ExUnits(ret, $outer._ctx);
      }

    }
    return Redeemers;
  })();

  public Relay = (() => {
    const $outer = this;

    class Relay
      extends Ptr<WasmV4.Relay>
      implements WasmContract.Relay
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.Relay {
        const ret = WasmV4.Relay.from_bytes(bytes);
        return new $outer.Relay(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.Relay {
        const ret = WasmV4.Relay.from_hex(hexStr);
        return new $outer.Relay(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.Relay {
        const ret = WasmV4.Relay.from_json(json);
        return new $outer.Relay(ret, $outer._ctx);
      }

      static newSingleHostAddr(singleHostAddr: WasmContract.SingleHostAddr): WasmContract.Relay {
        const ret = WasmV4.Relay.new_single_host_addr(singleHostAddr.wasm);
        return new $outer.Relay(ret, $outer._ctx);
      }

      static newSingleHostName(singleHostName: WasmContract.SingleHostName): WasmContract.Relay {
        const ret = WasmV4.Relay.new_single_host_name(singleHostName.wasm);
        return new $outer.Relay(ret, $outer._ctx);
      }

      static newMultiHostName(multiHostName: WasmContract.MultiHostName): WasmContract.Relay {
        const ret = WasmV4.Relay.new_multi_host_name(multiHostName.wasm);
        return new $outer.Relay(ret, $outer._ctx);
      }

      kind(): WasmContract.RelayKind {
        return this.wasm.kind();
      }

      asSingleHostAddr(): Optional<WasmContract.SingleHostAddr> {
        const ret = this.wasm.as_single_host_addr();
        if (ret == null) return undefined;
        return new $outer.SingleHostAddr(ret, $outer._ctx);
      }

      asSingleHostName(): Optional<WasmContract.SingleHostName> {
        const ret = this.wasm.as_single_host_name();
        if (ret == null) return undefined;
        return new $outer.SingleHostName(ret, $outer._ctx);
      }

      asMultiHostName(): Optional<WasmContract.MultiHostName> {
        const ret = this.wasm.as_multi_host_name();
        if (ret == null) return undefined;
        return new $outer.MultiHostName(ret, $outer._ctx);
      }

    }
    return Relay;
  })();

  public Relays = (() => {
    const $outer = this;

    class Relays
      extends Ptr<WasmV4.Relays>
      implements WasmContract.Relays
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.Relays {
        const ret = WasmV4.Relays.from_bytes(bytes);
        return new $outer.Relays(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.Relays {
        const ret = WasmV4.Relays.from_hex(hexStr);
        return new $outer.Relays(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.Relays {
        const ret = WasmV4.Relays.from_json(json);
        return new $outer.Relays(ret, $outer._ctx);
      }

      static new(): WasmContract.Relays {
        const ret = WasmV4.Relays.new();
        return new $outer.Relays(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      get(index: number): WasmContract.Relay {
        const ret = this.wasm.get(index);
        return new $outer.Relay(ret, $outer._ctx);
      }

      add(elem: WasmContract.Relay): void {
        return this.wasm.add(elem.wasm);
      }

    }
    return Relays;
  })();

  public RewardAddress = (() => {
    const $outer = this;

    class RewardAddress
      extends Ptr<WasmV4.RewardAddress>
      implements WasmContract.RewardAddress
    {

      static new(network: number, payment: WasmContract.Credential): WasmContract.RewardAddress {
        const ret = WasmV4.RewardAddress.new(network, payment.wasm);
        return new $outer.RewardAddress(ret, $outer._ctx);
      }

      paymentCred(): WasmContract.Credential {
        const ret = this.wasm.payment_cred();
        return new $outer.Credential(ret, $outer._ctx);
      }

      toAddress(): WasmContract.Address {
        const ret = this.wasm.to_address();
        return new $outer.Address(ret, $outer._ctx);
      }

      static fromAddress(addr: WasmContract.Address): Optional<WasmContract.RewardAddress> {
        const ret = WasmV4.RewardAddress.from_address(addr.wasm);
        if (ret == null) return undefined;
        return new $outer.RewardAddress(ret, $outer._ctx);
      }

      networkId(): number {
        return this.wasm.network_id();
      }

    }
    return RewardAddress;
  })();

  public RewardAddresses = (() => {
    const $outer = this;

    class RewardAddresses
      extends Ptr<WasmV4.RewardAddresses>
      implements WasmContract.RewardAddresses
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.RewardAddresses {
        const ret = WasmV4.RewardAddresses.from_bytes(bytes);
        return new $outer.RewardAddresses(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.RewardAddresses {
        const ret = WasmV4.RewardAddresses.from_hex(hexStr);
        return new $outer.RewardAddresses(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.RewardAddresses {
        const ret = WasmV4.RewardAddresses.from_json(json);
        return new $outer.RewardAddresses(ret, $outer._ctx);
      }

      static new(): WasmContract.RewardAddresses {
        const ret = WasmV4.RewardAddresses.new();
        return new $outer.RewardAddresses(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      get(index: number): WasmContract.RewardAddress {
        const ret = this.wasm.get(index);
        return new $outer.RewardAddress(ret, $outer._ctx);
      }

      add(elem: WasmContract.RewardAddress): void {
        return this.wasm.add(elem.wasm);
      }

    }
    return RewardAddresses;
  })();

  public ScriptAll = (() => {
    const $outer = this;

    class ScriptAll
      extends Ptr<WasmV4.ScriptAll>
      implements WasmContract.ScriptAll
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.ScriptAll {
        const ret = WasmV4.ScriptAll.from_bytes(bytes);
        return new $outer.ScriptAll(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.ScriptAll {
        const ret = WasmV4.ScriptAll.from_hex(hexStr);
        return new $outer.ScriptAll(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.ScriptAll {
        const ret = WasmV4.ScriptAll.from_json(json);
        return new $outer.ScriptAll(ret, $outer._ctx);
      }

      nativeScripts(): WasmContract.NativeScripts {
        const ret = this.wasm.native_scripts();
        return new $outer.NativeScripts(ret, $outer._ctx);
      }

      static new(nativeScripts: WasmContract.NativeScripts): WasmContract.ScriptAll {
        const ret = WasmV4.ScriptAll.new(nativeScripts.wasm);
        return new $outer.ScriptAll(ret, $outer._ctx);
      }

    }
    return ScriptAll;
  })();

  public ScriptAny = (() => {
    const $outer = this;

    class ScriptAny
      extends Ptr<WasmV4.ScriptAny>
      implements WasmContract.ScriptAny
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.ScriptAny {
        const ret = WasmV4.ScriptAny.from_bytes(bytes);
        return new $outer.ScriptAny(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.ScriptAny {
        const ret = WasmV4.ScriptAny.from_hex(hexStr);
        return new $outer.ScriptAny(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.ScriptAny {
        const ret = WasmV4.ScriptAny.from_json(json);
        return new $outer.ScriptAny(ret, $outer._ctx);
      }

      nativeScripts(): WasmContract.NativeScripts {
        const ret = this.wasm.native_scripts();
        return new $outer.NativeScripts(ret, $outer._ctx);
      }

      static new(nativeScripts: WasmContract.NativeScripts): WasmContract.ScriptAny {
        const ret = WasmV4.ScriptAny.new(nativeScripts.wasm);
        return new $outer.ScriptAny(ret, $outer._ctx);
      }

    }
    return ScriptAny;
  })();

  public ScriptDataHash = (() => {
    const $outer = this;

    class ScriptDataHash
      extends Ptr<WasmV4.ScriptDataHash>
      implements WasmContract.ScriptDataHash
    {

      static fromBytes(bytes: Uint8Array): WasmContract.ScriptDataHash {
        const ret = WasmV4.ScriptDataHash.from_bytes(bytes);
        return new $outer.ScriptDataHash(ret, $outer._ctx);
      }

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      toBech32(prefix: string): string {
        return this.wasm.to_bech32(prefix);
      }

      static fromBech32(bechStr: string): WasmContract.ScriptDataHash {
        const ret = WasmV4.ScriptDataHash.from_bech32(bechStr);
        return new $outer.ScriptDataHash(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hex: string): WasmContract.ScriptDataHash {
        const ret = WasmV4.ScriptDataHash.from_hex(hex);
        return new $outer.ScriptDataHash(ret, $outer._ctx);
      }

    }
    return ScriptDataHash;
  })();

  public ScriptHash = (() => {
    const $outer = this;

    class ScriptHash
      extends Ptr<WasmV4.ScriptHash>
      implements WasmContract.ScriptHash
    {

      static fromBytes(bytes: Uint8Array): WasmContract.ScriptHash {
        const ret = WasmV4.ScriptHash.from_bytes(bytes);
        return new $outer.ScriptHash(ret, $outer._ctx);
      }

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      toBech32(prefix: string): string {
        return this.wasm.to_bech32(prefix);
      }

      static fromBech32(bechStr: string): WasmContract.ScriptHash {
        const ret = WasmV4.ScriptHash.from_bech32(bechStr);
        return new $outer.ScriptHash(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hex: string): WasmContract.ScriptHash {
        const ret = WasmV4.ScriptHash.from_hex(hex);
        return new $outer.ScriptHash(ret, $outer._ctx);
      }

    }
    return ScriptHash;
  })();

  public ScriptHashes = (() => {
    const $outer = this;

    class ScriptHashes
      extends Ptr<WasmV4.ScriptHashes>
      implements WasmContract.ScriptHashes
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.ScriptHashes {
        const ret = WasmV4.ScriptHashes.from_bytes(bytes);
        return new $outer.ScriptHashes(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.ScriptHashes {
        const ret = WasmV4.ScriptHashes.from_hex(hexStr);
        return new $outer.ScriptHashes(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.ScriptHashes {
        const ret = WasmV4.ScriptHashes.from_json(json);
        return new $outer.ScriptHashes(ret, $outer._ctx);
      }

      static new(): WasmContract.ScriptHashes {
        const ret = WasmV4.ScriptHashes.new();
        return new $outer.ScriptHashes(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      get(index: number): WasmContract.ScriptHash {
        const ret = this.wasm.get(index);
        return new $outer.ScriptHash(ret, $outer._ctx);
      }

      add(elem: WasmContract.ScriptHash): void {
        return this.wasm.add(elem.wasm);
      }

    }
    return ScriptHashes;
  })();

  public ScriptNOfK = (() => {
    const $outer = this;

    class ScriptNOfK
      extends Ptr<WasmV4.ScriptNOfK>
      implements WasmContract.ScriptNOfK
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.ScriptNOfK {
        const ret = WasmV4.ScriptNOfK.from_bytes(bytes);
        return new $outer.ScriptNOfK(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.ScriptNOfK {
        const ret = WasmV4.ScriptNOfK.from_hex(hexStr);
        return new $outer.ScriptNOfK(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.ScriptNOfK {
        const ret = WasmV4.ScriptNOfK.from_json(json);
        return new $outer.ScriptNOfK(ret, $outer._ctx);
      }

      n(): number {
        return this.wasm.n();
      }

      nativeScripts(): WasmContract.NativeScripts {
        const ret = this.wasm.native_scripts();
        return new $outer.NativeScripts(ret, $outer._ctx);
      }

      static new(n: number, nativeScripts: WasmContract.NativeScripts): WasmContract.ScriptNOfK {
        const ret = WasmV4.ScriptNOfK.new(n, nativeScripts.wasm);
        return new $outer.ScriptNOfK(ret, $outer._ctx);
      }

    }
    return ScriptNOfK;
  })();

  public ScriptPubkey = (() => {
    const $outer = this;

    class ScriptPubkey
      extends Ptr<WasmV4.ScriptPubkey>
      implements WasmContract.ScriptPubkey
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.ScriptPubkey {
        const ret = WasmV4.ScriptPubkey.from_bytes(bytes);
        return new $outer.ScriptPubkey(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.ScriptPubkey {
        const ret = WasmV4.ScriptPubkey.from_hex(hexStr);
        return new $outer.ScriptPubkey(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.ScriptPubkey {
        const ret = WasmV4.ScriptPubkey.from_json(json);
        return new $outer.ScriptPubkey(ret, $outer._ctx);
      }

      addrKeyhash(): WasmContract.Ed25519KeyHash {
        const ret = this.wasm.addr_keyhash();
        return new $outer.Ed25519KeyHash(ret, $outer._ctx);
      }

      static new(addrKeyhash: WasmContract.Ed25519KeyHash): WasmContract.ScriptPubkey {
        const ret = WasmV4.ScriptPubkey.new(addrKeyhash.wasm);
        return new $outer.ScriptPubkey(ret, $outer._ctx);
      }

    }
    return ScriptPubkey;
  })();

  public ScriptRef = (() => {
    const $outer = this;

    class ScriptRef
      extends Ptr<WasmV4.ScriptRef>
      implements WasmContract.ScriptRef
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.ScriptRef {
        const ret = WasmV4.ScriptRef.from_bytes(bytes);
        return new $outer.ScriptRef(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.ScriptRef {
        const ret = WasmV4.ScriptRef.from_hex(hexStr);
        return new $outer.ScriptRef(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.ScriptRef {
        const ret = WasmV4.ScriptRef.from_json(json);
        return new $outer.ScriptRef(ret, $outer._ctx);
      }

      static newNativeScript(nativeScript: WasmContract.NativeScript): WasmContract.ScriptRef {
        const ret = WasmV4.ScriptRef.new_native_script(nativeScript.wasm);
        return new $outer.ScriptRef(ret, $outer._ctx);
      }

      static newPlutusScript(plutusScript: WasmContract.PlutusScript): WasmContract.ScriptRef {
        const ret = WasmV4.ScriptRef.new_plutus_script(plutusScript.wasm);
        return new $outer.ScriptRef(ret, $outer._ctx);
      }

      isNativeScript(): boolean {
        return this.wasm.is_native_script();
      }

      isPlutusScript(): boolean {
        return this.wasm.is_plutus_script();
      }

      nativeScript(): Optional<WasmContract.NativeScript> {
        const ret = this.wasm.native_script();
        if (ret == null) return undefined;
        return new $outer.NativeScript(ret, $outer._ctx);
      }

      plutusScript(): Optional<WasmContract.PlutusScript> {
        const ret = this.wasm.plutus_script();
        if (ret == null) return undefined;
        return new $outer.PlutusScript(ret, $outer._ctx);
      }

      toUnwrappedBytes(): Uint8Array {
        return this.wasm.to_unwrapped_bytes();
      }

    }
    return ScriptRef;
  })();

  public SingleHostAddr = (() => {
    const $outer = this;

    class SingleHostAddr
      extends Ptr<WasmV4.SingleHostAddr>
      implements WasmContract.SingleHostAddr
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.SingleHostAddr {
        const ret = WasmV4.SingleHostAddr.from_bytes(bytes);
        return new $outer.SingleHostAddr(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.SingleHostAddr {
        const ret = WasmV4.SingleHostAddr.from_hex(hexStr);
        return new $outer.SingleHostAddr(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.SingleHostAddr {
        const ret = WasmV4.SingleHostAddr.from_json(json);
        return new $outer.SingleHostAddr(ret, $outer._ctx);
      }

      port(): Optional<number> {
        return this.wasm.port();
      }

      ipv4(): Optional<WasmContract.Ipv4> {
        const ret = this.wasm.ipv4();
        if (ret == null) return undefined;
        return new $outer.Ipv4(ret, $outer._ctx);
      }

      ipv6(): Optional<WasmContract.Ipv6> {
        const ret = this.wasm.ipv6();
        if (ret == null) return undefined;
        return new $outer.Ipv6(ret, $outer._ctx);
      }

      static new(port: Optional<number>, ipv4: Optional<WasmContract.Ipv4>, ipv6: Optional<WasmContract.Ipv6>): WasmContract.SingleHostAddr {
        const ret = WasmV4.SingleHostAddr.new(port, ipv4?.wasm, ipv6?.wasm);
        return new $outer.SingleHostAddr(ret, $outer._ctx);
      }

    }
    return SingleHostAddr;
  })();

  public SingleHostName = (() => {
    const $outer = this;

    class SingleHostName
      extends Ptr<WasmV4.SingleHostName>
      implements WasmContract.SingleHostName
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.SingleHostName {
        const ret = WasmV4.SingleHostName.from_bytes(bytes);
        return new $outer.SingleHostName(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.SingleHostName {
        const ret = WasmV4.SingleHostName.from_hex(hexStr);
        return new $outer.SingleHostName(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.SingleHostName {
        const ret = WasmV4.SingleHostName.from_json(json);
        return new $outer.SingleHostName(ret, $outer._ctx);
      }

      port(): Optional<number> {
        return this.wasm.port();
      }

      dnsName(): WasmContract.DNSRecordAorAAAA {
        const ret = this.wasm.dns_name();
        return new $outer.DNSRecordAorAAAA(ret, $outer._ctx);
      }

      static new(port: Optional<number>, dnsName: WasmContract.DNSRecordAorAAAA): WasmContract.SingleHostName {
        const ret = WasmV4.SingleHostName.new(port, dnsName.wasm);
        return new $outer.SingleHostName(ret, $outer._ctx);
      }

    }
    return SingleHostName;
  })();

  public StakeAndVoteDelegation = (() => {
    const $outer = this;

    class StakeAndVoteDelegation
      extends Ptr<WasmV4.StakeAndVoteDelegation>
      implements WasmContract.StakeAndVoteDelegation
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.StakeAndVoteDelegation {
        const ret = WasmV4.StakeAndVoteDelegation.from_bytes(bytes);
        return new $outer.StakeAndVoteDelegation(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.StakeAndVoteDelegation {
        const ret = WasmV4.StakeAndVoteDelegation.from_hex(hexStr);
        return new $outer.StakeAndVoteDelegation(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.StakeAndVoteDelegation {
        const ret = WasmV4.StakeAndVoteDelegation.from_json(json);
        return new $outer.StakeAndVoteDelegation(ret, $outer._ctx);
      }

      stakeCredential(): WasmContract.Credential {
        const ret = this.wasm.stake_credential();
        return new $outer.Credential(ret, $outer._ctx);
      }

      poolKeyhash(): WasmContract.Ed25519KeyHash {
        const ret = this.wasm.pool_keyhash();
        return new $outer.Ed25519KeyHash(ret, $outer._ctx);
      }

      drep(): WasmContract.DRep {
        const ret = this.wasm.drep();
        return new $outer.DRep(ret, $outer._ctx);
      }

      static new(stakeCredential: WasmContract.Credential, poolKeyhash: WasmContract.Ed25519KeyHash, drep: WasmContract.DRep): WasmContract.StakeAndVoteDelegation {
        const ret = WasmV4.StakeAndVoteDelegation.new(stakeCredential.wasm, poolKeyhash.wasm, drep.wasm);
        return new $outer.StakeAndVoteDelegation(ret, $outer._ctx);
      }

      hasScriptCredentials(): boolean {
        return this.wasm.has_script_credentials();
      }

    }
    return StakeAndVoteDelegation;
  })();

  public StakeDelegation = (() => {
    const $outer = this;

    class StakeDelegation
      extends Ptr<WasmV4.StakeDelegation>
      implements WasmContract.StakeDelegation
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.StakeDelegation {
        const ret = WasmV4.StakeDelegation.from_bytes(bytes);
        return new $outer.StakeDelegation(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.StakeDelegation {
        const ret = WasmV4.StakeDelegation.from_hex(hexStr);
        return new $outer.StakeDelegation(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.StakeDelegation {
        const ret = WasmV4.StakeDelegation.from_json(json);
        return new $outer.StakeDelegation(ret, $outer._ctx);
      }

      stakeCredential(): WasmContract.Credential {
        const ret = this.wasm.stake_credential();
        return new $outer.Credential(ret, $outer._ctx);
      }

      poolKeyhash(): WasmContract.Ed25519KeyHash {
        const ret = this.wasm.pool_keyhash();
        return new $outer.Ed25519KeyHash(ret, $outer._ctx);
      }

      static new(stakeCredential: WasmContract.Credential, poolKeyhash: WasmContract.Ed25519KeyHash): WasmContract.StakeDelegation {
        const ret = WasmV4.StakeDelegation.new(stakeCredential.wasm, poolKeyhash.wasm);
        return new $outer.StakeDelegation(ret, $outer._ctx);
      }

      hasScriptCredentials(): boolean {
        return this.wasm.has_script_credentials();
      }

    }
    return StakeDelegation;
  })();

  public StakeDeregistration = (() => {
    const $outer = this;

    class StakeDeregistration
      extends Ptr<WasmV4.StakeDeregistration>
      implements WasmContract.StakeDeregistration
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.StakeDeregistration {
        const ret = WasmV4.StakeDeregistration.from_bytes(bytes);
        return new $outer.StakeDeregistration(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.StakeDeregistration {
        const ret = WasmV4.StakeDeregistration.from_hex(hexStr);
        return new $outer.StakeDeregistration(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.StakeDeregistration {
        const ret = WasmV4.StakeDeregistration.from_json(json);
        return new $outer.StakeDeregistration(ret, $outer._ctx);
      }

      stakeCredential(): WasmContract.Credential {
        const ret = this.wasm.stake_credential();
        return new $outer.Credential(ret, $outer._ctx);
      }

      coin(): Optional<WasmContract.BigNum> {
        const ret = this.wasm.coin();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      static new(stakeCredential: WasmContract.Credential): WasmContract.StakeDeregistration {
        const ret = WasmV4.StakeDeregistration.new(stakeCredential.wasm);
        return new $outer.StakeDeregistration(ret, $outer._ctx);
      }

      static newWithExplicitRefund(stakeCredential: WasmContract.Credential, coin: WasmContract.BigNum): WasmContract.StakeDeregistration {
        const ret = WasmV4.StakeDeregistration.new_with_explicit_refund(stakeCredential.wasm, coin.wasm);
        return new $outer.StakeDeregistration(ret, $outer._ctx);
      }

      hasScriptCredentials(): boolean {
        return this.wasm.has_script_credentials();
      }

    }
    return StakeDeregistration;
  })();

  public StakeRegistration = (() => {
    const $outer = this;

    class StakeRegistration
      extends Ptr<WasmV4.StakeRegistration>
      implements WasmContract.StakeRegistration
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.StakeRegistration {
        const ret = WasmV4.StakeRegistration.from_bytes(bytes);
        return new $outer.StakeRegistration(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.StakeRegistration {
        const ret = WasmV4.StakeRegistration.from_hex(hexStr);
        return new $outer.StakeRegistration(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.StakeRegistration {
        const ret = WasmV4.StakeRegistration.from_json(json);
        return new $outer.StakeRegistration(ret, $outer._ctx);
      }

      stakeCredential(): WasmContract.Credential {
        const ret = this.wasm.stake_credential();
        return new $outer.Credential(ret, $outer._ctx);
      }

      coin(): Optional<WasmContract.BigNum> {
        const ret = this.wasm.coin();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      static new(stakeCredential: WasmContract.Credential): WasmContract.StakeRegistration {
        const ret = WasmV4.StakeRegistration.new(stakeCredential.wasm);
        return new $outer.StakeRegistration(ret, $outer._ctx);
      }

      static newWithExplicitDeposit(stakeCredential: WasmContract.Credential, coin: WasmContract.BigNum): WasmContract.StakeRegistration {
        const ret = WasmV4.StakeRegistration.new_with_explicit_deposit(stakeCredential.wasm, coin.wasm);
        return new $outer.StakeRegistration(ret, $outer._ctx);
      }

      hasScriptCredentials(): boolean {
        return this.wasm.has_script_credentials();
      }

    }
    return StakeRegistration;
  })();

  public StakeRegistrationAndDelegation = (() => {
    const $outer = this;

    class StakeRegistrationAndDelegation
      extends Ptr<WasmV4.StakeRegistrationAndDelegation>
      implements WasmContract.StakeRegistrationAndDelegation
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.StakeRegistrationAndDelegation {
        const ret = WasmV4.StakeRegistrationAndDelegation.from_bytes(bytes);
        return new $outer.StakeRegistrationAndDelegation(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.StakeRegistrationAndDelegation {
        const ret = WasmV4.StakeRegistrationAndDelegation.from_hex(hexStr);
        return new $outer.StakeRegistrationAndDelegation(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.StakeRegistrationAndDelegation {
        const ret = WasmV4.StakeRegistrationAndDelegation.from_json(json);
        return new $outer.StakeRegistrationAndDelegation(ret, $outer._ctx);
      }

      stakeCredential(): WasmContract.Credential {
        const ret = this.wasm.stake_credential();
        return new $outer.Credential(ret, $outer._ctx);
      }

      poolKeyhash(): WasmContract.Ed25519KeyHash {
        const ret = this.wasm.pool_keyhash();
        return new $outer.Ed25519KeyHash(ret, $outer._ctx);
      }

      coin(): WasmContract.BigNum {
        const ret = this.wasm.coin();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      static new(stakeCredential: WasmContract.Credential, poolKeyhash: WasmContract.Ed25519KeyHash, coin: WasmContract.BigNum): WasmContract.StakeRegistrationAndDelegation {
        const ret = WasmV4.StakeRegistrationAndDelegation.new(stakeCredential.wasm, poolKeyhash.wasm, coin.wasm);
        return new $outer.StakeRegistrationAndDelegation(ret, $outer._ctx);
      }

      hasScriptCredentials(): boolean {
        return this.wasm.has_script_credentials();
      }

    }
    return StakeRegistrationAndDelegation;
  })();

  public StakeVoteRegistrationAndDelegation = (() => {
    const $outer = this;

    class StakeVoteRegistrationAndDelegation
      extends Ptr<WasmV4.StakeVoteRegistrationAndDelegation>
      implements WasmContract.StakeVoteRegistrationAndDelegation
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.StakeVoteRegistrationAndDelegation {
        const ret = WasmV4.StakeVoteRegistrationAndDelegation.from_bytes(bytes);
        return new $outer.StakeVoteRegistrationAndDelegation(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.StakeVoteRegistrationAndDelegation {
        const ret = WasmV4.StakeVoteRegistrationAndDelegation.from_hex(hexStr);
        return new $outer.StakeVoteRegistrationAndDelegation(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.StakeVoteRegistrationAndDelegation {
        const ret = WasmV4.StakeVoteRegistrationAndDelegation.from_json(json);
        return new $outer.StakeVoteRegistrationAndDelegation(ret, $outer._ctx);
      }

      stakeCredential(): WasmContract.Credential {
        const ret = this.wasm.stake_credential();
        return new $outer.Credential(ret, $outer._ctx);
      }

      poolKeyhash(): WasmContract.Ed25519KeyHash {
        const ret = this.wasm.pool_keyhash();
        return new $outer.Ed25519KeyHash(ret, $outer._ctx);
      }

      drep(): WasmContract.DRep {
        const ret = this.wasm.drep();
        return new $outer.DRep(ret, $outer._ctx);
      }

      coin(): WasmContract.BigNum {
        const ret = this.wasm.coin();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      static new(stakeCredential: WasmContract.Credential, poolKeyhash: WasmContract.Ed25519KeyHash, drep: WasmContract.DRep, coin: WasmContract.BigNum): WasmContract.StakeVoteRegistrationAndDelegation {
        const ret = WasmV4.StakeVoteRegistrationAndDelegation.new(stakeCredential.wasm, poolKeyhash.wasm, drep.wasm, coin.wasm);
        return new $outer.StakeVoteRegistrationAndDelegation(ret, $outer._ctx);
      }

      hasScriptCredentials(): boolean {
        return this.wasm.has_script_credentials();
      }

    }
    return StakeVoteRegistrationAndDelegation;
  })();

  public Strings = (() => {
    const $outer = this;

    class Strings
      extends Ptr<WasmV4.Strings>
      implements WasmContract.Strings
    {

      static new(): WasmContract.Strings {
        const ret = WasmV4.Strings.new();
        return new $outer.Strings(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      get(index: number): string {
        return this.wasm.get(index);
      }

      add(elem: string): void {
        return this.wasm.add(elem);
      }

    }
    return Strings;
  })();

  public TimelockExpiry = (() => {
    const $outer = this;

    class TimelockExpiry
      extends Ptr<WasmV4.TimelockExpiry>
      implements WasmContract.TimelockExpiry
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.TimelockExpiry {
        const ret = WasmV4.TimelockExpiry.from_bytes(bytes);
        return new $outer.TimelockExpiry(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.TimelockExpiry {
        const ret = WasmV4.TimelockExpiry.from_hex(hexStr);
        return new $outer.TimelockExpiry(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.TimelockExpiry {
        const ret = WasmV4.TimelockExpiry.from_json(json);
        return new $outer.TimelockExpiry(ret, $outer._ctx);
      }

      slot(): number {
        return this.wasm.slot();
      }

      slotBignum(): WasmContract.BigNum {
        const ret = this.wasm.slot_bignum();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      static new(slot: number): WasmContract.TimelockExpiry {
        const ret = WasmV4.TimelockExpiry.new(slot);
        return new $outer.TimelockExpiry(ret, $outer._ctx);
      }

      static newTimelockexpiry(slot: WasmContract.BigNum): WasmContract.TimelockExpiry {
        const ret = WasmV4.TimelockExpiry.new_timelockexpiry(slot.wasm);
        return new $outer.TimelockExpiry(ret, $outer._ctx);
      }

    }
    return TimelockExpiry;
  })();

  public TimelockStart = (() => {
    const $outer = this;

    class TimelockStart
      extends Ptr<WasmV4.TimelockStart>
      implements WasmContract.TimelockStart
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.TimelockStart {
        const ret = WasmV4.TimelockStart.from_bytes(bytes);
        return new $outer.TimelockStart(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.TimelockStart {
        const ret = WasmV4.TimelockStart.from_hex(hexStr);
        return new $outer.TimelockStart(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.TimelockStart {
        const ret = WasmV4.TimelockStart.from_json(json);
        return new $outer.TimelockStart(ret, $outer._ctx);
      }

      slot(): number {
        return this.wasm.slot();
      }

      slotBignum(): WasmContract.BigNum {
        const ret = this.wasm.slot_bignum();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      static new(slot: number): WasmContract.TimelockStart {
        const ret = WasmV4.TimelockStart.new(slot);
        return new $outer.TimelockStart(ret, $outer._ctx);
      }

      static newTimelockstart(slot: WasmContract.BigNum): WasmContract.TimelockStart {
        const ret = WasmV4.TimelockStart.new_timelockstart(slot.wasm);
        return new $outer.TimelockStart(ret, $outer._ctx);
      }

    }
    return TimelockStart;
  })();

  public Transaction = (() => {
    const $outer = this;

    class Transaction
      extends Ptr<WasmV4.Transaction>
      implements WasmContract.Transaction
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.Transaction {
        const ret = WasmV4.Transaction.from_bytes(bytes);
        return new $outer.Transaction(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.Transaction {
        const ret = WasmV4.Transaction.from_hex(hexStr);
        return new $outer.Transaction(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.Transaction {
        const ret = WasmV4.Transaction.from_json(json);
        return new $outer.Transaction(ret, $outer._ctx);
      }

      body(): WasmContract.TransactionBody {
        const ret = this.wasm.body();
        return new $outer.TransactionBody(ret, $outer._ctx);
      }

      witnessSet(): WasmContract.TransactionWitnessSet {
        const ret = this.wasm.witness_set();
        return new $outer.TransactionWitnessSet(ret, $outer._ctx);
      }

      isValid(): boolean {
        return this.wasm.is_valid();
      }

      auxiliaryData(): Optional<WasmContract.AuxiliaryData> {
        const ret = this.wasm.auxiliary_data();
        if (ret == null) return undefined;
        return new $outer.AuxiliaryData(ret, $outer._ctx);
      }

      setIsValid(valid: boolean): void {
        return this.wasm.set_is_valid(valid);
      }

      static new(body: WasmContract.TransactionBody, witnessSet: WasmContract.TransactionWitnessSet, auxiliaryData: Optional<WasmContract.AuxiliaryData>): WasmContract.Transaction {
        const ret = WasmV4.Transaction.new(body.wasm, witnessSet.wasm, auxiliaryData?.wasm);
        return new $outer.Transaction(ret, $outer._ctx);
      }

    }
    return Transaction;
  })();

  public TransactionBatch = (() => {
    const $outer = this;

    class TransactionBatch
      extends Ptr<WasmV4.TransactionBatch>
      implements WasmContract.TransactionBatch
    {

      len(): number {
        return this.wasm.len();
      }

      get(index: number): WasmContract.Transaction {
        const ret = this.wasm.get(index);
        return new $outer.Transaction(ret, $outer._ctx);
      }

    }
    return TransactionBatch;
  })();

  public TransactionBatchList = (() => {
    const $outer = this;

    class TransactionBatchList
      extends Ptr<WasmV4.TransactionBatchList>
      implements WasmContract.TransactionBatchList
    {

      len(): number {
        return this.wasm.len();
      }

      get(index: number): WasmContract.TransactionBatch {
        const ret = this.wasm.get(index);
        return new $outer.TransactionBatch(ret, $outer._ctx);
      }

    }
    return TransactionBatchList;
  })();

  public TransactionBodies = (() => {
    const $outer = this;

    class TransactionBodies
      extends Ptr<WasmV4.TransactionBodies>
      implements WasmContract.TransactionBodies
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.TransactionBodies {
        const ret = WasmV4.TransactionBodies.from_bytes(bytes);
        return new $outer.TransactionBodies(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.TransactionBodies {
        const ret = WasmV4.TransactionBodies.from_hex(hexStr);
        return new $outer.TransactionBodies(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.TransactionBodies {
        const ret = WasmV4.TransactionBodies.from_json(json);
        return new $outer.TransactionBodies(ret, $outer._ctx);
      }

      static new(): WasmContract.TransactionBodies {
        const ret = WasmV4.TransactionBodies.new();
        return new $outer.TransactionBodies(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      get(index: number): WasmContract.TransactionBody {
        const ret = this.wasm.get(index);
        return new $outer.TransactionBody(ret, $outer._ctx);
      }

      add(elem: WasmContract.TransactionBody): void {
        return this.wasm.add(elem.wasm);
      }

    }
    return TransactionBodies;
  })();

  public TransactionBody = (() => {
    const $outer = this;

    class TransactionBody
      extends Ptr<WasmV4.TransactionBody>
      implements WasmContract.TransactionBody
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.TransactionBody {
        const ret = WasmV4.TransactionBody.from_bytes(bytes);
        return new $outer.TransactionBody(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.TransactionBody {
        const ret = WasmV4.TransactionBody.from_hex(hexStr);
        return new $outer.TransactionBody(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.TransactionBody {
        const ret = WasmV4.TransactionBody.from_json(json);
        return new $outer.TransactionBody(ret, $outer._ctx);
      }

      inputs(): WasmContract.TransactionInputs {
        const ret = this.wasm.inputs();
        return new $outer.TransactionInputs(ret, $outer._ctx);
      }

      outputs(): WasmContract.TransactionOutputs {
        const ret = this.wasm.outputs();
        return new $outer.TransactionOutputs(ret, $outer._ctx);
      }

      fee(): WasmContract.BigNum {
        const ret = this.wasm.fee();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      ttl(): Optional<number> {
        return this.wasm.ttl();
      }

      ttlBignum(): Optional<WasmContract.BigNum> {
        const ret = this.wasm.ttl_bignum();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      setTtl(ttl: WasmContract.BigNum): void {
        return this.wasm.set_ttl(ttl.wasm);
      }

      removeTtl(): void {
        return this.wasm.remove_ttl();
      }

      setCerts(certs: WasmContract.Certificates): void {
        return this.wasm.set_certs(certs.wasm);
      }

      certs(): Optional<WasmContract.Certificates> {
        const ret = this.wasm.certs();
        if (ret == null) return undefined;
        return new $outer.Certificates(ret, $outer._ctx);
      }

      setWithdrawals(withdrawals: WasmContract.Withdrawals): void {
        return this.wasm.set_withdrawals(withdrawals.wasm);
      }

      withdrawals(): Optional<WasmContract.Withdrawals> {
        const ret = this.wasm.withdrawals();
        if (ret == null) return undefined;
        return new $outer.Withdrawals(ret, $outer._ctx);
      }

      setUpdate(update: WasmContract.Update): void {
        return this.wasm.set_update(update.wasm);
      }

      update(): Optional<WasmContract.Update> {
        const ret = this.wasm.update();
        if (ret == null) return undefined;
        return new $outer.Update(ret, $outer._ctx);
      }

      setAuxiliaryDataHash(auxiliaryDataHash: WasmContract.AuxiliaryDataHash): void {
        return this.wasm.set_auxiliary_data_hash(auxiliaryDataHash.wasm);
      }

      auxiliaryDataHash(): Optional<WasmContract.AuxiliaryDataHash> {
        const ret = this.wasm.auxiliary_data_hash();
        if (ret == null) return undefined;
        return new $outer.AuxiliaryDataHash(ret, $outer._ctx);
      }

      setValidityStartInterval(validityStartInterval: number): void {
        return this.wasm.set_validity_start_interval(validityStartInterval);
      }

      setValidityStartIntervalBignum(validityStartInterval: WasmContract.BigNum): void {
        return this.wasm.set_validity_start_interval_bignum(validityStartInterval.wasm);
      }

      validityStartIntervalBignum(): Optional<WasmContract.BigNum> {
        const ret = this.wasm.validity_start_interval_bignum();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      validityStartInterval(): Optional<number> {
        return this.wasm.validity_start_interval();
      }

      setMint(mint: WasmContract.Mint): void {
        return this.wasm.set_mint(mint.wasm);
      }

      mint(): Optional<WasmContract.Mint> {
        const ret = this.wasm.mint();
        if (ret == null) return undefined;
        return new $outer.Mint(ret, $outer._ctx);
      }

      setReferenceInputs(referenceInputs: WasmContract.TransactionInputs): void {
        return this.wasm.set_reference_inputs(referenceInputs.wasm);
      }

      referenceInputs(): Optional<WasmContract.TransactionInputs> {
        const ret = this.wasm.reference_inputs();
        if (ret == null) return undefined;
        return new $outer.TransactionInputs(ret, $outer._ctx);
      }

      setScriptDataHash(scriptDataHash: WasmContract.ScriptDataHash): void {
        return this.wasm.set_script_data_hash(scriptDataHash.wasm);
      }

      scriptDataHash(): Optional<WasmContract.ScriptDataHash> {
        const ret = this.wasm.script_data_hash();
        if (ret == null) return undefined;
        return new $outer.ScriptDataHash(ret, $outer._ctx);
      }

      setCollateral(collateral: WasmContract.TransactionInputs): void {
        return this.wasm.set_collateral(collateral.wasm);
      }

      collateral(): Optional<WasmContract.TransactionInputs> {
        const ret = this.wasm.collateral();
        if (ret == null) return undefined;
        return new $outer.TransactionInputs(ret, $outer._ctx);
      }

      setRequiredSigners(requiredSigners: WasmContract.Ed25519KeyHashes): void {
        return this.wasm.set_required_signers(requiredSigners.wasm);
      }

      requiredSigners(): Optional<WasmContract.Ed25519KeyHashes> {
        const ret = this.wasm.required_signers();
        if (ret == null) return undefined;
        return new $outer.Ed25519KeyHashes(ret, $outer._ctx);
      }

      setNetworkId(networkId: WasmContract.NetworkId): void {
        return this.wasm.set_network_id(networkId.wasm);
      }

      networkId(): Optional<WasmContract.NetworkId> {
        const ret = this.wasm.network_id();
        if (ret == null) return undefined;
        return new $outer.NetworkId(ret, $outer._ctx);
      }

      setCollateralReturn(collateralReturn: WasmContract.TransactionOutput): void {
        return this.wasm.set_collateral_return(collateralReturn.wasm);
      }

      collateralReturn(): Optional<WasmContract.TransactionOutput> {
        const ret = this.wasm.collateral_return();
        if (ret == null) return undefined;
        return new $outer.TransactionOutput(ret, $outer._ctx);
      }

      setTotalCollateral(totalCollateral: WasmContract.BigNum): void {
        return this.wasm.set_total_collateral(totalCollateral.wasm);
      }

      totalCollateral(): Optional<WasmContract.BigNum> {
        const ret = this.wasm.total_collateral();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      setVotingProcedures(votingProcedures: WasmContract.VotingProcedures): void {
        return this.wasm.set_voting_procedures(votingProcedures.wasm);
      }

      votingProcedures(): Optional<WasmContract.VotingProcedures> {
        const ret = this.wasm.voting_procedures();
        if (ret == null) return undefined;
        return new $outer.VotingProcedures(ret, $outer._ctx);
      }

      setVotingProposals(votingProposals: WasmContract.VotingProposals): void {
        return this.wasm.set_voting_proposals(votingProposals.wasm);
      }

      votingProposals(): Optional<WasmContract.VotingProposals> {
        const ret = this.wasm.voting_proposals();
        if (ret == null) return undefined;
        return new $outer.VotingProposals(ret, $outer._ctx);
      }

      setDonation(donation: WasmContract.BigNum): void {
        return this.wasm.set_donation(donation.wasm);
      }

      donation(): Optional<WasmContract.BigNum> {
        const ret = this.wasm.donation();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      setCurrentTreasuryValue(currentTreasuryValue: WasmContract.BigNum): void {
        return this.wasm.set_current_treasury_value(currentTreasuryValue.wasm);
      }

      currentTreasuryValue(): Optional<WasmContract.BigNum> {
        const ret = this.wasm.current_treasury_value();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      static new(inputs: WasmContract.TransactionInputs, outputs: WasmContract.TransactionOutputs, fee: WasmContract.BigNum, ttl: Optional<number>): WasmContract.TransactionBody {
        const ret = WasmV4.TransactionBody.new(inputs.wasm, outputs.wasm, fee.wasm, ttl);
        return new $outer.TransactionBody(ret, $outer._ctx);
      }

      static newTxBody(inputs: WasmContract.TransactionInputs, outputs: WasmContract.TransactionOutputs, fee: WasmContract.BigNum): WasmContract.TransactionBody {
        const ret = WasmV4.TransactionBody.new_tx_body(inputs.wasm, outputs.wasm, fee.wasm);
        return new $outer.TransactionBody(ret, $outer._ctx);
      }

    }
    return TransactionBody;
  })();

  public TransactionBuilder = (() => {
    const $outer = this;

    class TransactionBuilder
      extends Ptr<WasmV4.TransactionBuilder>
      implements WasmContract.TransactionBuilder
    {

      addInputsFrom(inputs: WasmContract.TransactionUnspentOutputs, strategy: WasmContract.CoinSelectionStrategyCIP2): void {
        return this.wasm.add_inputs_from(inputs.wasm, strategy);
      }

      setInputs(inputs: WasmContract.TxInputsBuilder): void {
        return this.wasm.set_inputs(inputs.wasm);
      }

      setCollateral(collateral: WasmContract.TxInputsBuilder): void {
        return this.wasm.set_collateral(collateral.wasm);
      }

      setCollateralReturn(collateralReturn: WasmContract.TransactionOutput): void {
        return this.wasm.set_collateral_return(collateralReturn.wasm);
      }

      removeCollateralReturn(): void {
        return this.wasm.remove_collateral_return();
      }

      setCollateralReturnAndTotal(collateralReturn: WasmContract.TransactionOutput): void {
        return this.wasm.set_collateral_return_and_total(collateralReturn.wasm);
      }

      setTotalCollateral(totalCollateral: WasmContract.BigNum): void {
        return this.wasm.set_total_collateral(totalCollateral.wasm);
      }

      removeTotalCollateral(): void {
        return this.wasm.remove_total_collateral();
      }

      setTotalCollateralAndReturn(totalCollateral: WasmContract.BigNum, returnAddress: WasmContract.Address): void {
        return this.wasm.set_total_collateral_and_return(totalCollateral.wasm, returnAddress.wasm);
      }

      addReferenceInput(referenceInput: WasmContract.TransactionInput): void {
        return this.wasm.add_reference_input(referenceInput.wasm);
      }

      addScriptReferenceInput(referenceInput: WasmContract.TransactionInput, scriptSize: number): void {
        return this.wasm.add_script_reference_input(referenceInput.wasm, scriptSize);
      }

      addKeyInput(hash: WasmContract.Ed25519KeyHash, input: WasmContract.TransactionInput, amount: WasmContract.Value): void {
        return this.wasm.add_key_input(hash.wasm, input.wasm, amount.wasm);
      }

      addNativeScriptInput(script: WasmContract.NativeScript, input: WasmContract.TransactionInput, amount: WasmContract.Value): void {
        return this.wasm.add_native_script_input(script.wasm, input.wasm, amount.wasm);
      }

      addPlutusScriptInput(witness: WasmContract.PlutusWitness, input: WasmContract.TransactionInput, amount: WasmContract.Value): void {
        return this.wasm.add_plutus_script_input(witness.wasm, input.wasm, amount.wasm);
      }

      addBootstrapInput(hash: WasmContract.ByronAddress, input: WasmContract.TransactionInput, amount: WasmContract.Value): void {
        return this.wasm.add_bootstrap_input(hash.wasm, input.wasm, amount.wasm);
      }

      addRegularInput(address: WasmContract.Address, input: WasmContract.TransactionInput, amount: WasmContract.Value): void {
        return this.wasm.add_regular_input(address.wasm, input.wasm, amount.wasm);
      }

      addInputsFromAndChange(inputs: WasmContract.TransactionUnspentOutputs, strategy: WasmContract.CoinSelectionStrategyCIP2, changeConfig: WasmContract.ChangeConfig): boolean {
        return this.wasm.add_inputs_from_and_change(inputs.wasm, strategy, changeConfig.wasm);
      }

      addInputsFromAndChangeWithCollateralReturn(inputs: WasmContract.TransactionUnspentOutputs, strategy: WasmContract.CoinSelectionStrategyCIP2, changeConfig: WasmContract.ChangeConfig, collateralPercentage: WasmContract.BigNum): void {
        return this.wasm.add_inputs_from_and_change_with_collateral_return(inputs.wasm, strategy, changeConfig.wasm, collateralPercentage.wasm);
      }

      getNativeInputScripts(): Optional<WasmContract.NativeScripts> {
        const ret = this.wasm.get_native_input_scripts();
        if (ret == null) return undefined;
        return new $outer.NativeScripts(ret, $outer._ctx);
      }

      getPlutusInputScripts(): Optional<WasmContract.PlutusWitnesses> {
        const ret = this.wasm.get_plutus_input_scripts();
        if (ret == null) return undefined;
        return new $outer.PlutusWitnesses(ret, $outer._ctx);
      }

      feeForInput(address: WasmContract.Address, input: WasmContract.TransactionInput, amount: WasmContract.Value): WasmContract.BigNum {
        const ret = this.wasm.fee_for_input(address.wasm, input.wasm, amount.wasm);
        return new $outer.BigNum(ret, $outer._ctx);
      }

      addOutput(output: WasmContract.TransactionOutput): void {
        return this.wasm.add_output(output.wasm);
      }

      feeForOutput(output: WasmContract.TransactionOutput): WasmContract.BigNum {
        const ret = this.wasm.fee_for_output(output.wasm);
        return new $outer.BigNum(ret, $outer._ctx);
      }

      setFee(fee: WasmContract.BigNum): void {
        return this.wasm.set_fee(fee.wasm);
      }

      setMinFee(fee: WasmContract.BigNum): void {
        return this.wasm.set_min_fee(fee.wasm);
      }

      setTtl(ttl: number): void {
        return this.wasm.set_ttl(ttl);
      }

      setTtlBignum(ttl: WasmContract.BigNum): void {
        return this.wasm.set_ttl_bignum(ttl.wasm);
      }

      removeTtl(): void {
        return this.wasm.remove_ttl();
      }

      setValidityStartInterval(validityStartInterval: number): void {
        return this.wasm.set_validity_start_interval(validityStartInterval);
      }

      setValidityStartIntervalBignum(validityStartInterval: WasmContract.BigNum): void {
        return this.wasm.set_validity_start_interval_bignum(validityStartInterval.wasm);
      }

      removeValidityStartInterval(): void {
        return this.wasm.remove_validity_start_interval();
      }

      setCerts(certs: WasmContract.Certificates): void {
        return this.wasm.set_certs(certs.wasm);
      }

      removeCerts(): void {
        return this.wasm.remove_certs();
      }

      setCertsBuilder(certs: WasmContract.CertificatesBuilder): void {
        return this.wasm.set_certs_builder(certs.wasm);
      }

      setWithdrawals(withdrawals: WasmContract.Withdrawals): void {
        return this.wasm.set_withdrawals(withdrawals.wasm);
      }

      setWithdrawalsBuilder(withdrawals: WasmContract.WithdrawalsBuilder): void {
        return this.wasm.set_withdrawals_builder(withdrawals.wasm);
      }

      setVotingBuilder(votingBuilder: WasmContract.VotingBuilder): void {
        return this.wasm.set_voting_builder(votingBuilder.wasm);
      }

      setVotingProposalBuilder(votingProposalBuilder: WasmContract.VotingProposalBuilder): void {
        return this.wasm.set_voting_proposal_builder(votingProposalBuilder.wasm);
      }

      removeWithdrawals(): void {
        return this.wasm.remove_withdrawals();
      }

      getAuxiliaryData(): Optional<WasmContract.AuxiliaryData> {
        const ret = this.wasm.get_auxiliary_data();
        if (ret == null) return undefined;
        return new $outer.AuxiliaryData(ret, $outer._ctx);
      }

      setAuxiliaryData(auxiliaryData: WasmContract.AuxiliaryData): void {
        return this.wasm.set_auxiliary_data(auxiliaryData.wasm);
      }

      removeAuxiliaryData(): void {
        return this.wasm.remove_auxiliary_data();
      }

      setMetadata(metadata: WasmContract.GeneralTransactionMetadata): void {
        return this.wasm.set_metadata(metadata.wasm);
      }

      addMetadatum(key: WasmContract.BigNum, val: WasmContract.TransactionMetadatum): void {
        return this.wasm.add_metadatum(key.wasm, val.wasm);
      }

      addJsonMetadatum(key: WasmContract.BigNum, val: string): void {
        return this.wasm.add_json_metadatum(key.wasm, val);
      }

      addJsonMetadatumWithSchema(key: WasmContract.BigNum, val: string, schema: WasmContract.MetadataJsonSchema): void {
        return this.wasm.add_json_metadatum_with_schema(key.wasm, val, schema);
      }

      setMintBuilder(mintBuilder: WasmContract.MintBuilder): void {
        return this.wasm.set_mint_builder(mintBuilder.wasm);
      }

      removeMintBuilder(): void {
        return this.wasm.remove_mint_builder();
      }

      getMintBuilder(): Optional<WasmContract.MintBuilder> {
        const ret = this.wasm.get_mint_builder();
        if (ret == null) return undefined;
        return new $outer.MintBuilder(ret, $outer._ctx);
      }

      setMint(mint: WasmContract.Mint, mintScripts: WasmContract.NativeScripts): void {
        return this.wasm.set_mint(mint.wasm, mintScripts.wasm);
      }

      getMint(): Optional<WasmContract.Mint> {
        const ret = this.wasm.get_mint();
        if (ret == null) return undefined;
        return new $outer.Mint(ret, $outer._ctx);
      }

      getMintScripts(): Optional<WasmContract.NativeScripts> {
        const ret = this.wasm.get_mint_scripts();
        if (ret == null) return undefined;
        return new $outer.NativeScripts(ret, $outer._ctx);
      }

      setMintAsset(policyScript: WasmContract.NativeScript, mintAssets: WasmContract.MintAssets): void {
        return this.wasm.set_mint_asset(policyScript.wasm, mintAssets.wasm);
      }

      addMintAsset(policyScript: WasmContract.NativeScript, assetName: WasmContract.AssetName, amount: WasmContract.Int): void {
        return this.wasm.add_mint_asset(policyScript.wasm, assetName.wasm, amount.wasm);
      }

      addMintAssetAndOutput(policyScript: WasmContract.NativeScript, assetName: WasmContract.AssetName, amount: WasmContract.Int, outputBuilder: WasmContract.TransactionOutputAmountBuilder, outputCoin: WasmContract.BigNum): void {
        return this.wasm.add_mint_asset_and_output(policyScript.wasm, assetName.wasm, amount.wasm, outputBuilder.wasm, outputCoin.wasm);
      }

      addMintAssetAndOutputMinRequiredCoin(policyScript: WasmContract.NativeScript, assetName: WasmContract.AssetName, amount: WasmContract.Int, outputBuilder: WasmContract.TransactionOutputAmountBuilder): void {
        return this.wasm.add_mint_asset_and_output_min_required_coin(policyScript.wasm, assetName.wasm, amount.wasm, outputBuilder.wasm);
      }

      addExtraWitnessDatum(datum: WasmContract.PlutusData): void {
        return this.wasm.add_extra_witness_datum(datum.wasm);
      }

      getExtraWitnessDatums(): Optional<WasmContract.PlutusList> {
        const ret = this.wasm.get_extra_witness_datums();
        if (ret == null) return undefined;
        return new $outer.PlutusList(ret, $outer._ctx);
      }

      setDonation(donation: WasmContract.BigNum): void {
        return this.wasm.set_donation(donation.wasm);
      }

      getDonation(): Optional<WasmContract.BigNum> {
        const ret = this.wasm.get_donation();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      setCurrentTreasuryValue(currentTreasuryValue: WasmContract.BigNum): void {
        return this.wasm.set_current_treasury_value(currentTreasuryValue.wasm);
      }

      getCurrentTreasuryValue(): Optional<WasmContract.BigNum> {
        const ret = this.wasm.get_current_treasury_value();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      static new(cfg: WasmContract.TransactionBuilderConfig): WasmContract.TransactionBuilder {
        const ret = WasmV4.TransactionBuilder.new(cfg.wasm);
        return new $outer.TransactionBuilder(ret, $outer._ctx);
      }

      getReferenceInputs(): WasmContract.TransactionInputs {
        const ret = this.wasm.get_reference_inputs();
        return new $outer.TransactionInputs(ret, $outer._ctx);
      }

      getExplicitInput(): WasmContract.Value {
        const ret = this.wasm.get_explicit_input();
        return new $outer.Value(ret, $outer._ctx);
      }

      getImplicitInput(): WasmContract.Value {
        const ret = this.wasm.get_implicit_input();
        return new $outer.Value(ret, $outer._ctx);
      }

      getTotalInput(): WasmContract.Value {
        const ret = this.wasm.get_total_input();
        return new $outer.Value(ret, $outer._ctx);
      }

      getTotalOutput(): WasmContract.Value {
        const ret = this.wasm.get_total_output();
        return new $outer.Value(ret, $outer._ctx);
      }

      getExplicitOutput(): WasmContract.Value {
        const ret = this.wasm.get_explicit_output();
        return new $outer.Value(ret, $outer._ctx);
      }

      getDeposit(): WasmContract.BigNum {
        const ret = this.wasm.get_deposit();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      getFeeIfSet(): Optional<WasmContract.BigNum> {
        const ret = this.wasm.get_fee_if_set();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      addChangeIfNeeded(address: WasmContract.Address): boolean {
        return this.wasm.add_change_if_needed(address.wasm);
      }

      addChangeIfNeededWithDatum(address: WasmContract.Address, plutusData: WasmContract.OutputDatum): boolean {
        return this.wasm.add_change_if_needed_with_datum(address.wasm, plutusData.wasm);
      }

      calcScriptDataHash(costModels: WasmContract.Costmdls): void {
        return this.wasm.calc_script_data_hash(costModels.wasm);
      }

      setScriptDataHash(hash: WasmContract.ScriptDataHash): void {
        return this.wasm.set_script_data_hash(hash.wasm);
      }

      removeScriptDataHash(): void {
        return this.wasm.remove_script_data_hash();
      }

      addRequiredSigner(key: WasmContract.Ed25519KeyHash): void {
        return this.wasm.add_required_signer(key.wasm);
      }

      fullSize(): number {
        return this.wasm.full_size();
      }

      outputSizes(): Uint32Array {
        return this.wasm.output_sizes();
      }

      build(): WasmContract.TransactionBody {
        const ret = this.wasm.build();
        return new $outer.TransactionBody(ret, $outer._ctx);
      }

      buildTx(): WasmContract.Transaction {
        const ret = this.wasm.build_tx();
        return new $outer.Transaction(ret, $outer._ctx);
      }

      buildTxUnsafe(): WasmContract.Transaction {
        const ret = this.wasm.build_tx_unsafe();
        return new $outer.Transaction(ret, $outer._ctx);
      }

      minFee(): WasmContract.BigNum {
        const ret = this.wasm.min_fee();
        return new $outer.BigNum(ret, $outer._ctx);
      }

    }
    return TransactionBuilder;
  })();

  public TransactionBuilderConfig = (() => {
    const $outer = this;

    class TransactionBuilderConfig
      extends Ptr<WasmV4.TransactionBuilderConfig>
      implements WasmContract.TransactionBuilderConfig
    {

    }
    return TransactionBuilderConfig;
  })();

  public TransactionBuilderConfigBuilder = (() => {
    const $outer = this;

    class TransactionBuilderConfigBuilder
      extends Ptr<WasmV4.TransactionBuilderConfigBuilder>
      implements WasmContract.TransactionBuilderConfigBuilder
    {

      static new(): WasmContract.TransactionBuilderConfigBuilder {
        const ret = WasmV4.TransactionBuilderConfigBuilder.new();
        return new $outer.TransactionBuilderConfigBuilder(ret, $outer._ctx);
      }

      feeAlgo(feeAlgo: WasmContract.LinearFee): WasmContract.TransactionBuilderConfigBuilder {
        const ret = this.wasm.fee_algo(feeAlgo.wasm);
        return new $outer.TransactionBuilderConfigBuilder(ret, $outer._ctx);
      }

      coinsPerUtxoByte(coinsPerUtxoByte: WasmContract.BigNum): WasmContract.TransactionBuilderConfigBuilder {
        const ret = this.wasm.coins_per_utxo_byte(coinsPerUtxoByte.wasm);
        return new $outer.TransactionBuilderConfigBuilder(ret, $outer._ctx);
      }

      exUnitPrices(exUnitPrices: WasmContract.ExUnitPrices): WasmContract.TransactionBuilderConfigBuilder {
        const ret = this.wasm.ex_unit_prices(exUnitPrices.wasm);
        return new $outer.TransactionBuilderConfigBuilder(ret, $outer._ctx);
      }

      poolDeposit(poolDeposit: WasmContract.BigNum): WasmContract.TransactionBuilderConfigBuilder {
        const ret = this.wasm.pool_deposit(poolDeposit.wasm);
        return new $outer.TransactionBuilderConfigBuilder(ret, $outer._ctx);
      }

      keyDeposit(keyDeposit: WasmContract.BigNum): WasmContract.TransactionBuilderConfigBuilder {
        const ret = this.wasm.key_deposit(keyDeposit.wasm);
        return new $outer.TransactionBuilderConfigBuilder(ret, $outer._ctx);
      }

      maxValueSize(maxValueSize: number): WasmContract.TransactionBuilderConfigBuilder {
        const ret = this.wasm.max_value_size(maxValueSize);
        return new $outer.TransactionBuilderConfigBuilder(ret, $outer._ctx);
      }

      maxTxSize(maxTxSize: number): WasmContract.TransactionBuilderConfigBuilder {
        const ret = this.wasm.max_tx_size(maxTxSize);
        return new $outer.TransactionBuilderConfigBuilder(ret, $outer._ctx);
      }

      refScriptCoinsPerByte(refScriptCoinsPerByte: WasmContract.UnitInterval): WasmContract.TransactionBuilderConfigBuilder {
        const ret = this.wasm.ref_script_coins_per_byte(refScriptCoinsPerByte.wasm);
        return new $outer.TransactionBuilderConfigBuilder(ret, $outer._ctx);
      }

      preferPureChange(preferPureChange: boolean): WasmContract.TransactionBuilderConfigBuilder {
        const ret = this.wasm.prefer_pure_change(preferPureChange);
        return new $outer.TransactionBuilderConfigBuilder(ret, $outer._ctx);
      }

      deduplicateExplicitRefInputsWithRegularInputs(deduplicateExplicitRefInputsWithRegularInputs: boolean): WasmContract.TransactionBuilderConfigBuilder {
        const ret = this.wasm.deduplicate_explicit_ref_inputs_with_regular_inputs(deduplicateExplicitRefInputsWithRegularInputs);
        return new $outer.TransactionBuilderConfigBuilder(ret, $outer._ctx);
      }

      doNotBurnExtraChange(doNotBurnExtraChange: boolean): WasmContract.TransactionBuilderConfigBuilder {
        const ret = this.wasm.do_not_burn_extra_change(doNotBurnExtraChange);
        return new $outer.TransactionBuilderConfigBuilder(ret, $outer._ctx);
      }

      build(): WasmContract.TransactionBuilderConfig {
        const ret = this.wasm.build();
        return new $outer.TransactionBuilderConfig(ret, $outer._ctx);
      }

    }
    return TransactionBuilderConfigBuilder;
  })();

  public TransactionHash = (() => {
    const $outer = this;

    class TransactionHash
      extends Ptr<WasmV4.TransactionHash>
      implements WasmContract.TransactionHash
    {

      static fromBytes(bytes: Uint8Array): WasmContract.TransactionHash {
        const ret = WasmV4.TransactionHash.from_bytes(bytes);
        return new $outer.TransactionHash(ret, $outer._ctx);
      }

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      toBech32(prefix: string): string {
        return this.wasm.to_bech32(prefix);
      }

      static fromBech32(bechStr: string): WasmContract.TransactionHash {
        const ret = WasmV4.TransactionHash.from_bech32(bechStr);
        return new $outer.TransactionHash(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hex: string): WasmContract.TransactionHash {
        const ret = WasmV4.TransactionHash.from_hex(hex);
        return new $outer.TransactionHash(ret, $outer._ctx);
      }

    }
    return TransactionHash;
  })();

  public TransactionInput = (() => {
    const $outer = this;

    class TransactionInput
      extends Ptr<WasmV4.TransactionInput>
      implements WasmContract.TransactionInput
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.TransactionInput {
        const ret = WasmV4.TransactionInput.from_bytes(bytes);
        return new $outer.TransactionInput(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.TransactionInput {
        const ret = WasmV4.TransactionInput.from_hex(hexStr);
        return new $outer.TransactionInput(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.TransactionInput {
        const ret = WasmV4.TransactionInput.from_json(json);
        return new $outer.TransactionInput(ret, $outer._ctx);
      }

      transactionId(): WasmContract.TransactionHash {
        const ret = this.wasm.transaction_id();
        return new $outer.TransactionHash(ret, $outer._ctx);
      }

      index(): number {
        return this.wasm.index();
      }

      static new(transactionId: WasmContract.TransactionHash, index: number): WasmContract.TransactionInput {
        const ret = WasmV4.TransactionInput.new(transactionId.wasm, index);
        return new $outer.TransactionInput(ret, $outer._ctx);
      }

    }
    return TransactionInput;
  })();

  public TransactionInputs = (() => {
    const $outer = this;

    class TransactionInputs
      extends Ptr<WasmV4.TransactionInputs>
      implements WasmContract.TransactionInputs
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.TransactionInputs {
        const ret = WasmV4.TransactionInputs.from_bytes(bytes);
        return new $outer.TransactionInputs(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.TransactionInputs {
        const ret = WasmV4.TransactionInputs.from_hex(hexStr);
        return new $outer.TransactionInputs(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.TransactionInputs {
        const ret = WasmV4.TransactionInputs.from_json(json);
        return new $outer.TransactionInputs(ret, $outer._ctx);
      }

      static new(): WasmContract.TransactionInputs {
        const ret = WasmV4.TransactionInputs.new();
        return new $outer.TransactionInputs(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      get(index: number): WasmContract.TransactionInput {
        const ret = this.wasm.get(index);
        return new $outer.TransactionInput(ret, $outer._ctx);
      }

      add(input: WasmContract.TransactionInput): boolean {
        return this.wasm.add(input.wasm);
      }

      toOption(): Optional<WasmContract.TransactionInputs> {
        const ret = this.wasm.to_option();
        if (ret == null) return undefined;
        return new $outer.TransactionInputs(ret, $outer._ctx);
      }

    }
    return TransactionInputs;
  })();

  public TransactionMetadatum = (() => {
    const $outer = this;

    class TransactionMetadatum
      extends Ptr<WasmV4.TransactionMetadatum>
      implements WasmContract.TransactionMetadatum
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.TransactionMetadatum {
        const ret = WasmV4.TransactionMetadatum.from_bytes(bytes);
        return new $outer.TransactionMetadatum(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.TransactionMetadatum {
        const ret = WasmV4.TransactionMetadatum.from_hex(hexStr);
        return new $outer.TransactionMetadatum(ret, $outer._ctx);
      }

      static newMap(map: WasmContract.MetadataMap): WasmContract.TransactionMetadatum {
        const ret = WasmV4.TransactionMetadatum.new_map(map.wasm);
        return new $outer.TransactionMetadatum(ret, $outer._ctx);
      }

      static newList(list: WasmContract.MetadataList): WasmContract.TransactionMetadatum {
        const ret = WasmV4.TransactionMetadatum.new_list(list.wasm);
        return new $outer.TransactionMetadatum(ret, $outer._ctx);
      }

      static newInt(intValue: WasmContract.Int): WasmContract.TransactionMetadatum {
        const ret = WasmV4.TransactionMetadatum.new_int(intValue.wasm);
        return new $outer.TransactionMetadatum(ret, $outer._ctx);
      }

      static newBytes(bytes: Uint8Array): WasmContract.TransactionMetadatum {
        const ret = WasmV4.TransactionMetadatum.new_bytes(bytes);
        return new $outer.TransactionMetadatum(ret, $outer._ctx);
      }

      static newText(text: string): WasmContract.TransactionMetadatum {
        const ret = WasmV4.TransactionMetadatum.new_text(text);
        return new $outer.TransactionMetadatum(ret, $outer._ctx);
      }

      kind(): WasmContract.TransactionMetadatumKind {
        return this.wasm.kind();
      }

      asMap(): WasmContract.MetadataMap {
        const ret = this.wasm.as_map();
        return new $outer.MetadataMap(ret, $outer._ctx);
      }

      asList(): WasmContract.MetadataList {
        const ret = this.wasm.as_list();
        return new $outer.MetadataList(ret, $outer._ctx);
      }

      asInt(): WasmContract.Int {
        const ret = this.wasm.as_int();
        return new $outer.Int(ret, $outer._ctx);
      }

      asBytes(): Uint8Array {
        return this.wasm.as_bytes();
      }

      asText(): string {
        return this.wasm.as_text();
      }

    }
    return TransactionMetadatum;
  })();

  public TransactionMetadatumLabels = (() => {
    const $outer = this;

    class TransactionMetadatumLabels
      extends Ptr<WasmV4.TransactionMetadatumLabels>
      implements WasmContract.TransactionMetadatumLabels
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.TransactionMetadatumLabels {
        const ret = WasmV4.TransactionMetadatumLabels.from_bytes(bytes);
        return new $outer.TransactionMetadatumLabels(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.TransactionMetadatumLabels {
        const ret = WasmV4.TransactionMetadatumLabels.from_hex(hexStr);
        return new $outer.TransactionMetadatumLabels(ret, $outer._ctx);
      }

      static new(): WasmContract.TransactionMetadatumLabels {
        const ret = WasmV4.TransactionMetadatumLabels.new();
        return new $outer.TransactionMetadatumLabels(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      get(index: number): WasmContract.BigNum {
        const ret = this.wasm.get(index);
        return new $outer.BigNum(ret, $outer._ctx);
      }

      add(elem: WasmContract.BigNum): void {
        return this.wasm.add(elem.wasm);
      }

    }
    return TransactionMetadatumLabels;
  })();

  public TransactionOutput = (() => {
    const $outer = this;

    class TransactionOutput
      extends Ptr<WasmV4.TransactionOutput>
      implements WasmContract.TransactionOutput
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.TransactionOutput {
        const ret = WasmV4.TransactionOutput.from_bytes(bytes);
        return new $outer.TransactionOutput(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.TransactionOutput {
        const ret = WasmV4.TransactionOutput.from_hex(hexStr);
        return new $outer.TransactionOutput(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.TransactionOutput {
        const ret = WasmV4.TransactionOutput.from_json(json);
        return new $outer.TransactionOutput(ret, $outer._ctx);
      }

      address(): WasmContract.Address {
        const ret = this.wasm.address();
        return new $outer.Address(ret, $outer._ctx);
      }

      amount(): WasmContract.Value {
        const ret = this.wasm.amount();
        return new $outer.Value(ret, $outer._ctx);
      }

      dataHash(): Optional<WasmContract.DataHash> {
        const ret = this.wasm.data_hash();
        if (ret == null) return undefined;
        return new $outer.DataHash(ret, $outer._ctx);
      }

      plutusData(): Optional<WasmContract.PlutusData> {
        const ret = this.wasm.plutus_data();
        if (ret == null) return undefined;
        return new $outer.PlutusData(ret, $outer._ctx);
      }

      scriptRef(): Optional<WasmContract.ScriptRef> {
        const ret = this.wasm.script_ref();
        if (ret == null) return undefined;
        return new $outer.ScriptRef(ret, $outer._ctx);
      }

      setScriptRef(scriptRef: WasmContract.ScriptRef): void {
        return this.wasm.set_script_ref(scriptRef.wasm);
      }

      setPlutusData(data: WasmContract.PlutusData): void {
        return this.wasm.set_plutus_data(data.wasm);
      }

      setDataHash(dataHash: WasmContract.DataHash): void {
        return this.wasm.set_data_hash(dataHash.wasm);
      }

      hasPlutusData(): boolean {
        return this.wasm.has_plutus_data();
      }

      hasDataHash(): boolean {
        return this.wasm.has_data_hash();
      }

      hasScriptRef(): boolean {
        return this.wasm.has_script_ref();
      }

      static new(address: WasmContract.Address, amount: WasmContract.Value): WasmContract.TransactionOutput {
        const ret = WasmV4.TransactionOutput.new(address.wasm, amount.wasm);
        return new $outer.TransactionOutput(ret, $outer._ctx);
      }

      serializationFormat(): Optional<WasmContract.CborContainerType> {
        return this.wasm.serialization_format();
      }

    }
    return TransactionOutput;
  })();

  public TransactionOutputAmountBuilder = (() => {
    const $outer = this;

    class TransactionOutputAmountBuilder
      extends Ptr<WasmV4.TransactionOutputAmountBuilder>
      implements WasmContract.TransactionOutputAmountBuilder
    {

      withValue(amount: WasmContract.Value): WasmContract.TransactionOutputAmountBuilder {
        const ret = this.wasm.with_value(amount.wasm);
        return new $outer.TransactionOutputAmountBuilder(ret, $outer._ctx);
      }

      withCoin(coin: WasmContract.BigNum): WasmContract.TransactionOutputAmountBuilder {
        const ret = this.wasm.with_coin(coin.wasm);
        return new $outer.TransactionOutputAmountBuilder(ret, $outer._ctx);
      }

      withCoinAndAsset(coin: WasmContract.BigNum, multiasset: WasmContract.MultiAsset): WasmContract.TransactionOutputAmountBuilder {
        const ret = this.wasm.with_coin_and_asset(coin.wasm, multiasset.wasm);
        return new $outer.TransactionOutputAmountBuilder(ret, $outer._ctx);
      }

      withAssetAndMinRequiredCoinByUtxoCost(multiasset: WasmContract.MultiAsset, dataCost: WasmContract.DataCost): WasmContract.TransactionOutputAmountBuilder {
        const ret = this.wasm.with_asset_and_min_required_coin_by_utxo_cost(multiasset.wasm, dataCost.wasm);
        return new $outer.TransactionOutputAmountBuilder(ret, $outer._ctx);
      }

      build(): WasmContract.TransactionOutput {
        const ret = this.wasm.build();
        return new $outer.TransactionOutput(ret, $outer._ctx);
      }

    }
    return TransactionOutputAmountBuilder;
  })();

  public TransactionOutputBuilder = (() => {
    const $outer = this;

    class TransactionOutputBuilder
      extends Ptr<WasmV4.TransactionOutputBuilder>
      implements WasmContract.TransactionOutputBuilder
    {

      static new(): WasmContract.TransactionOutputBuilder {
        const ret = WasmV4.TransactionOutputBuilder.new();
        return new $outer.TransactionOutputBuilder(ret, $outer._ctx);
      }

      withAddress(address: WasmContract.Address): WasmContract.TransactionOutputBuilder {
        const ret = this.wasm.with_address(address.wasm);
        return new $outer.TransactionOutputBuilder(ret, $outer._ctx);
      }

      withDataHash(dataHash: WasmContract.DataHash): WasmContract.TransactionOutputBuilder {
        const ret = this.wasm.with_data_hash(dataHash.wasm);
        return new $outer.TransactionOutputBuilder(ret, $outer._ctx);
      }

      withPlutusData(data: WasmContract.PlutusData): WasmContract.TransactionOutputBuilder {
        const ret = this.wasm.with_plutus_data(data.wasm);
        return new $outer.TransactionOutputBuilder(ret, $outer._ctx);
      }

      withScriptRef(scriptRef: WasmContract.ScriptRef): WasmContract.TransactionOutputBuilder {
        const ret = this.wasm.with_script_ref(scriptRef.wasm);
        return new $outer.TransactionOutputBuilder(ret, $outer._ctx);
      }

      next(): WasmContract.TransactionOutputAmountBuilder {
        const ret = this.wasm.next();
        return new $outer.TransactionOutputAmountBuilder(ret, $outer._ctx);
      }

    }
    return TransactionOutputBuilder;
  })();

  public TransactionOutputs = (() => {
    const $outer = this;

    class TransactionOutputs
      extends Ptr<WasmV4.TransactionOutputs>
      implements WasmContract.TransactionOutputs
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.TransactionOutputs {
        const ret = WasmV4.TransactionOutputs.from_bytes(bytes);
        return new $outer.TransactionOutputs(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.TransactionOutputs {
        const ret = WasmV4.TransactionOutputs.from_hex(hexStr);
        return new $outer.TransactionOutputs(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.TransactionOutputs {
        const ret = WasmV4.TransactionOutputs.from_json(json);
        return new $outer.TransactionOutputs(ret, $outer._ctx);
      }

      static new(): WasmContract.TransactionOutputs {
        const ret = WasmV4.TransactionOutputs.new();
        return new $outer.TransactionOutputs(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      get(index: number): WasmContract.TransactionOutput {
        const ret = this.wasm.get(index);
        return new $outer.TransactionOutput(ret, $outer._ctx);
      }

      add(elem: WasmContract.TransactionOutput): void {
        return this.wasm.add(elem.wasm);
      }

    }
    return TransactionOutputs;
  })();

  public TransactionUnspentOutput = (() => {
    const $outer = this;

    class TransactionUnspentOutput
      extends Ptr<WasmV4.TransactionUnspentOutput>
      implements WasmContract.TransactionUnspentOutput
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.TransactionUnspentOutput {
        const ret = WasmV4.TransactionUnspentOutput.from_bytes(bytes);
        return new $outer.TransactionUnspentOutput(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.TransactionUnspentOutput {
        const ret = WasmV4.TransactionUnspentOutput.from_hex(hexStr);
        return new $outer.TransactionUnspentOutput(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.TransactionUnspentOutput {
        const ret = WasmV4.TransactionUnspentOutput.from_json(json);
        return new $outer.TransactionUnspentOutput(ret, $outer._ctx);
      }

      static new(input: WasmContract.TransactionInput, output: WasmContract.TransactionOutput): WasmContract.TransactionUnspentOutput {
        const ret = WasmV4.TransactionUnspentOutput.new(input.wasm, output.wasm);
        return new $outer.TransactionUnspentOutput(ret, $outer._ctx);
      }

      input(): WasmContract.TransactionInput {
        const ret = this.wasm.input();
        return new $outer.TransactionInput(ret, $outer._ctx);
      }

      output(): WasmContract.TransactionOutput {
        const ret = this.wasm.output();
        return new $outer.TransactionOutput(ret, $outer._ctx);
      }

    }
    return TransactionUnspentOutput;
  })();

  public TransactionUnspentOutputs = (() => {
    const $outer = this;

    class TransactionUnspentOutputs
      extends Ptr<WasmV4.TransactionUnspentOutputs>
      implements WasmContract.TransactionUnspentOutputs
    {

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.TransactionUnspentOutputs {
        const ret = WasmV4.TransactionUnspentOutputs.from_json(json);
        return new $outer.TransactionUnspentOutputs(ret, $outer._ctx);
      }

      static new(): WasmContract.TransactionUnspentOutputs {
        const ret = WasmV4.TransactionUnspentOutputs.new();
        return new $outer.TransactionUnspentOutputs(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      get(index: number): WasmContract.TransactionUnspentOutput {
        const ret = this.wasm.get(index);
        return new $outer.TransactionUnspentOutput(ret, $outer._ctx);
      }

      add(elem: WasmContract.TransactionUnspentOutput): void {
        return this.wasm.add(elem.wasm);
      }

    }
    return TransactionUnspentOutputs;
  })();

  public TransactionWitnessSet = (() => {
    const $outer = this;

    class TransactionWitnessSet
      extends Ptr<WasmV4.TransactionWitnessSet>
      implements WasmContract.TransactionWitnessSet
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.TransactionWitnessSet {
        const ret = WasmV4.TransactionWitnessSet.from_bytes(bytes);
        return new $outer.TransactionWitnessSet(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.TransactionWitnessSet {
        const ret = WasmV4.TransactionWitnessSet.from_hex(hexStr);
        return new $outer.TransactionWitnessSet(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.TransactionWitnessSet {
        const ret = WasmV4.TransactionWitnessSet.from_json(json);
        return new $outer.TransactionWitnessSet(ret, $outer._ctx);
      }

      setVkeys(vkeys: WasmContract.Vkeywitnesses): void {
        return this.wasm.set_vkeys(vkeys.wasm);
      }

      vkeys(): Optional<WasmContract.Vkeywitnesses> {
        const ret = this.wasm.vkeys();
        if (ret == null) return undefined;
        return new $outer.Vkeywitnesses(ret, $outer._ctx);
      }

      setNativeScripts(nativeScripts: WasmContract.NativeScripts): void {
        return this.wasm.set_native_scripts(nativeScripts.wasm);
      }

      nativeScripts(): Optional<WasmContract.NativeScripts> {
        const ret = this.wasm.native_scripts();
        if (ret == null) return undefined;
        return new $outer.NativeScripts(ret, $outer._ctx);
      }

      setBootstraps(bootstraps: WasmContract.BootstrapWitnesses): void {
        return this.wasm.set_bootstraps(bootstraps.wasm);
      }

      bootstraps(): Optional<WasmContract.BootstrapWitnesses> {
        const ret = this.wasm.bootstraps();
        if (ret == null) return undefined;
        return new $outer.BootstrapWitnesses(ret, $outer._ctx);
      }

      setPlutusScripts(plutusScripts: WasmContract.PlutusScripts): void {
        return this.wasm.set_plutus_scripts(plutusScripts.wasm);
      }

      plutusScripts(): Optional<WasmContract.PlutusScripts> {
        const ret = this.wasm.plutus_scripts();
        if (ret == null) return undefined;
        return new $outer.PlutusScripts(ret, $outer._ctx);
      }

      setPlutusData(plutusData: WasmContract.PlutusList): void {
        return this.wasm.set_plutus_data(plutusData.wasm);
      }

      plutusData(): Optional<WasmContract.PlutusList> {
        const ret = this.wasm.plutus_data();
        if (ret == null) return undefined;
        return new $outer.PlutusList(ret, $outer._ctx);
      }

      setRedeemers(redeemers: WasmContract.Redeemers): void {
        return this.wasm.set_redeemers(redeemers.wasm);
      }

      redeemers(): Optional<WasmContract.Redeemers> {
        const ret = this.wasm.redeemers();
        if (ret == null) return undefined;
        return new $outer.Redeemers(ret, $outer._ctx);
      }

      static new(): WasmContract.TransactionWitnessSet {
        const ret = WasmV4.TransactionWitnessSet.new();
        return new $outer.TransactionWitnessSet(ret, $outer._ctx);
      }

    }
    return TransactionWitnessSet;
  })();

  public TransactionWitnessSets = (() => {
    const $outer = this;

    class TransactionWitnessSets
      extends Ptr<WasmV4.TransactionWitnessSets>
      implements WasmContract.TransactionWitnessSets
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.TransactionWitnessSets {
        const ret = WasmV4.TransactionWitnessSets.from_bytes(bytes);
        return new $outer.TransactionWitnessSets(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.TransactionWitnessSets {
        const ret = WasmV4.TransactionWitnessSets.from_hex(hexStr);
        return new $outer.TransactionWitnessSets(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.TransactionWitnessSets {
        const ret = WasmV4.TransactionWitnessSets.from_json(json);
        return new $outer.TransactionWitnessSets(ret, $outer._ctx);
      }

      static new(): WasmContract.TransactionWitnessSets {
        const ret = WasmV4.TransactionWitnessSets.new();
        return new $outer.TransactionWitnessSets(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      get(index: number): WasmContract.TransactionWitnessSet {
        const ret = this.wasm.get(index);
        return new $outer.TransactionWitnessSet(ret, $outer._ctx);
      }

      add(elem: WasmContract.TransactionWitnessSet): void {
        return this.wasm.add(elem.wasm);
      }

    }
    return TransactionWitnessSets;
  })();

  public TreasuryWithdrawals = (() => {
    const $outer = this;

    class TreasuryWithdrawals
      extends Ptr<WasmV4.TreasuryWithdrawals>
      implements WasmContract.TreasuryWithdrawals
    {

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.TreasuryWithdrawals {
        const ret = WasmV4.TreasuryWithdrawals.from_json(json);
        return new $outer.TreasuryWithdrawals(ret, $outer._ctx);
      }

      static new(): WasmContract.TreasuryWithdrawals {
        const ret = WasmV4.TreasuryWithdrawals.new();
        return new $outer.TreasuryWithdrawals(ret, $outer._ctx);
      }

      get(key: WasmContract.RewardAddress): Optional<WasmContract.BigNum> {
        const ret = this.wasm.get(key.wasm);
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      insert(key: WasmContract.RewardAddress, value: WasmContract.BigNum): void {
        return this.wasm.insert(key.wasm, value.wasm);
      }

      keys(): WasmContract.RewardAddresses {
        const ret = this.wasm.keys();
        return new $outer.RewardAddresses(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

    }
    return TreasuryWithdrawals;
  })();

  public TreasuryWithdrawalsAction = (() => {
    const $outer = this;

    class TreasuryWithdrawalsAction
      extends Ptr<WasmV4.TreasuryWithdrawalsAction>
      implements WasmContract.TreasuryWithdrawalsAction
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.TreasuryWithdrawalsAction {
        const ret = WasmV4.TreasuryWithdrawalsAction.from_bytes(bytes);
        return new $outer.TreasuryWithdrawalsAction(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.TreasuryWithdrawalsAction {
        const ret = WasmV4.TreasuryWithdrawalsAction.from_hex(hexStr);
        return new $outer.TreasuryWithdrawalsAction(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.TreasuryWithdrawalsAction {
        const ret = WasmV4.TreasuryWithdrawalsAction.from_json(json);
        return new $outer.TreasuryWithdrawalsAction(ret, $outer._ctx);
      }

      withdrawals(): WasmContract.TreasuryWithdrawals {
        const ret = this.wasm.withdrawals();
        return new $outer.TreasuryWithdrawals(ret, $outer._ctx);
      }

      policyHash(): Optional<WasmContract.ScriptHash> {
        const ret = this.wasm.policy_hash();
        if (ret == null) return undefined;
        return new $outer.ScriptHash(ret, $outer._ctx);
      }

      static new(withdrawals: WasmContract.TreasuryWithdrawals): WasmContract.TreasuryWithdrawalsAction {
        const ret = WasmV4.TreasuryWithdrawalsAction.new(withdrawals.wasm);
        return new $outer.TreasuryWithdrawalsAction(ret, $outer._ctx);
      }

      static newWithPolicyHash(withdrawals: WasmContract.TreasuryWithdrawals, policyHash: WasmContract.ScriptHash): WasmContract.TreasuryWithdrawalsAction {
        const ret = WasmV4.TreasuryWithdrawalsAction.new_with_policy_hash(withdrawals.wasm, policyHash.wasm);
        return new $outer.TreasuryWithdrawalsAction(ret, $outer._ctx);
      }

    }
    return TreasuryWithdrawalsAction;
  })();

  public TxInputsBuilder = (() => {
    const $outer = this;

    class TxInputsBuilder
      extends Ptr<WasmV4.TxInputsBuilder>
      implements WasmContract.TxInputsBuilder
    {

      static new(): WasmContract.TxInputsBuilder {
        const ret = WasmV4.TxInputsBuilder.new();
        return new $outer.TxInputsBuilder(ret, $outer._ctx);
      }

      addRegularUtxo(utxo: WasmContract.TransactionUnspentOutput): void {
        return this.wasm.add_regular_utxo(utxo.wasm);
      }

      addPlutusScriptUtxo(utxo: WasmContract.TransactionUnspentOutput, witness: WasmContract.PlutusWitness): void {
        return this.wasm.add_plutus_script_utxo(utxo.wasm, witness.wasm);
      }

      addNativeScriptUtxo(utxo: WasmContract.TransactionUnspentOutput, witness: WasmContract.NativeScriptSource): void {
        return this.wasm.add_native_script_utxo(utxo.wasm, witness.wasm);
      }

      addKeyInput(hash: WasmContract.Ed25519KeyHash, input: WasmContract.TransactionInput, amount: WasmContract.Value): void {
        return this.wasm.add_key_input(hash.wasm, input.wasm, amount.wasm);
      }

      addNativeScriptInput(script: WasmContract.NativeScriptSource, input: WasmContract.TransactionInput, amount: WasmContract.Value): void {
        return this.wasm.add_native_script_input(script.wasm, input.wasm, amount.wasm);
      }

      addPlutusScriptInput(witness: WasmContract.PlutusWitness, input: WasmContract.TransactionInput, amount: WasmContract.Value): void {
        return this.wasm.add_plutus_script_input(witness.wasm, input.wasm, amount.wasm);
      }

      addBootstrapInput(address: WasmContract.ByronAddress, input: WasmContract.TransactionInput, amount: WasmContract.Value): void {
        return this.wasm.add_bootstrap_input(address.wasm, input.wasm, amount.wasm);
      }

      addRegularInput(address: WasmContract.Address, input: WasmContract.TransactionInput, amount: WasmContract.Value): void {
        return this.wasm.add_regular_input(address.wasm, input.wasm, amount.wasm);
      }

      getRefInputs(): WasmContract.TransactionInputs {
        const ret = this.wasm.get_ref_inputs();
        return new $outer.TransactionInputs(ret, $outer._ctx);
      }

      getNativeInputScripts(): Optional<WasmContract.NativeScripts> {
        const ret = this.wasm.get_native_input_scripts();
        if (ret == null) return undefined;
        return new $outer.NativeScripts(ret, $outer._ctx);
      }

      getPlutusInputScripts(): Optional<WasmContract.PlutusWitnesses> {
        const ret = this.wasm.get_plutus_input_scripts();
        if (ret == null) return undefined;
        return new $outer.PlutusWitnesses(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      addRequiredSigner(key: WasmContract.Ed25519KeyHash): void {
        return this.wasm.add_required_signer(key.wasm);
      }

      addRequiredSigners(keys: WasmContract.Ed25519KeyHashes): void {
        return this.wasm.add_required_signers(keys.wasm);
      }

      totalValue(): WasmContract.Value {
        const ret = this.wasm.total_value();
        return new $outer.Value(ret, $outer._ctx);
      }

      inputs(): WasmContract.TransactionInputs {
        const ret = this.wasm.inputs();
        return new $outer.TransactionInputs(ret, $outer._ctx);
      }

      inputsOption(): Optional<WasmContract.TransactionInputs> {
        const ret = this.wasm.inputs_option();
        if (ret == null) return undefined;
        return new $outer.TransactionInputs(ret, $outer._ctx);
      }

    }
    return TxInputsBuilder;
  })();

  public URL = (() => {
    const $outer = this;

    class URL
      extends Ptr<WasmV4.URL>
      implements WasmContract.URL
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.URL {
        const ret = WasmV4.URL.from_bytes(bytes);
        return new $outer.URL(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.URL {
        const ret = WasmV4.URL.from_hex(hexStr);
        return new $outer.URL(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.URL {
        const ret = WasmV4.URL.from_json(json);
        return new $outer.URL(ret, $outer._ctx);
      }

      static new(url: string): WasmContract.URL {
        const ret = WasmV4.URL.new(url);
        return new $outer.URL(ret, $outer._ctx);
      }

      url(): string {
        return this.wasm.url();
      }

    }
    return URL;
  })();

  public UnitInterval = (() => {
    const $outer = this;

    class UnitInterval
      extends Ptr<WasmV4.UnitInterval>
      implements WasmContract.UnitInterval
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.UnitInterval {
        const ret = WasmV4.UnitInterval.from_bytes(bytes);
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.UnitInterval {
        const ret = WasmV4.UnitInterval.from_hex(hexStr);
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.UnitInterval {
        const ret = WasmV4.UnitInterval.from_json(json);
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      numerator(): WasmContract.BigNum {
        const ret = this.wasm.numerator();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      denominator(): WasmContract.BigNum {
        const ret = this.wasm.denominator();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      static new(numerator: WasmContract.BigNum, denominator: WasmContract.BigNum): WasmContract.UnitInterval {
        const ret = WasmV4.UnitInterval.new(numerator.wasm, denominator.wasm);
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

    }
    return UnitInterval;
  })();

  public Update = (() => {
    const $outer = this;

    class Update
      extends Ptr<WasmV4.Update>
      implements WasmContract.Update
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.Update {
        const ret = WasmV4.Update.from_bytes(bytes);
        return new $outer.Update(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.Update {
        const ret = WasmV4.Update.from_hex(hexStr);
        return new $outer.Update(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.Update {
        const ret = WasmV4.Update.from_json(json);
        return new $outer.Update(ret, $outer._ctx);
      }

      proposedProtocolParameterUpdates(): WasmContract.ProposedProtocolParameterUpdates {
        const ret = this.wasm.proposed_protocol_parameter_updates();
        return new $outer.ProposedProtocolParameterUpdates(ret, $outer._ctx);
      }

      epoch(): number {
        return this.wasm.epoch();
      }

      static new(proposedProtocolParameterUpdates: WasmContract.ProposedProtocolParameterUpdates, epoch: number): WasmContract.Update {
        const ret = WasmV4.Update.new(proposedProtocolParameterUpdates.wasm, epoch);
        return new $outer.Update(ret, $outer._ctx);
      }

    }
    return Update;
  })();

  public UpdateCommitteeAction = (() => {
    const $outer = this;

    class UpdateCommitteeAction
      extends Ptr<WasmV4.UpdateCommitteeAction>
      implements WasmContract.UpdateCommitteeAction
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.UpdateCommitteeAction {
        const ret = WasmV4.UpdateCommitteeAction.from_bytes(bytes);
        return new $outer.UpdateCommitteeAction(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.UpdateCommitteeAction {
        const ret = WasmV4.UpdateCommitteeAction.from_hex(hexStr);
        return new $outer.UpdateCommitteeAction(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.UpdateCommitteeAction {
        const ret = WasmV4.UpdateCommitteeAction.from_json(json);
        return new $outer.UpdateCommitteeAction(ret, $outer._ctx);
      }

      govActionId(): Optional<WasmContract.GovernanceActionId> {
        const ret = this.wasm.gov_action_id();
        if (ret == null) return undefined;
        return new $outer.GovernanceActionId(ret, $outer._ctx);
      }

      committee(): WasmContract.Committee {
        const ret = this.wasm.committee();
        return new $outer.Committee(ret, $outer._ctx);
      }

      membersToRemove(): WasmContract.Credentials {
        const ret = this.wasm.members_to_remove();
        return new $outer.Credentials(ret, $outer._ctx);
      }

      static new(committee: WasmContract.Committee, membersToRemove: WasmContract.Credentials): WasmContract.UpdateCommitteeAction {
        const ret = WasmV4.UpdateCommitteeAction.new(committee.wasm, membersToRemove.wasm);
        return new $outer.UpdateCommitteeAction(ret, $outer._ctx);
      }

      static newWithActionId(govActionId: WasmContract.GovernanceActionId, committee: WasmContract.Committee, membersToRemove: WasmContract.Credentials): WasmContract.UpdateCommitteeAction {
        const ret = WasmV4.UpdateCommitteeAction.new_with_action_id(govActionId.wasm, committee.wasm, membersToRemove.wasm);
        return new $outer.UpdateCommitteeAction(ret, $outer._ctx);
      }

    }
    return UpdateCommitteeAction;
  })();

  public VRFCert = (() => {
    const $outer = this;

    class VRFCert
      extends Ptr<WasmV4.VRFCert>
      implements WasmContract.VRFCert
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.VRFCert {
        const ret = WasmV4.VRFCert.from_bytes(bytes);
        return new $outer.VRFCert(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.VRFCert {
        const ret = WasmV4.VRFCert.from_hex(hexStr);
        return new $outer.VRFCert(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.VRFCert {
        const ret = WasmV4.VRFCert.from_json(json);
        return new $outer.VRFCert(ret, $outer._ctx);
      }

      output(): Uint8Array {
        return this.wasm.output();
      }

      proof(): Uint8Array {
        return this.wasm.proof();
      }

      static new(output: Uint8Array, proof: Uint8Array): WasmContract.VRFCert {
        const ret = WasmV4.VRFCert.new(output, proof);
        return new $outer.VRFCert(ret, $outer._ctx);
      }

    }
    return VRFCert;
  })();

  public VRFKeyHash = (() => {
    const $outer = this;

    class VRFKeyHash
      extends Ptr<WasmV4.VRFKeyHash>
      implements WasmContract.VRFKeyHash
    {

      static fromBytes(bytes: Uint8Array): WasmContract.VRFKeyHash {
        const ret = WasmV4.VRFKeyHash.from_bytes(bytes);
        return new $outer.VRFKeyHash(ret, $outer._ctx);
      }

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      toBech32(prefix: string): string {
        return this.wasm.to_bech32(prefix);
      }

      static fromBech32(bechStr: string): WasmContract.VRFKeyHash {
        const ret = WasmV4.VRFKeyHash.from_bech32(bechStr);
        return new $outer.VRFKeyHash(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hex: string): WasmContract.VRFKeyHash {
        const ret = WasmV4.VRFKeyHash.from_hex(hex);
        return new $outer.VRFKeyHash(ret, $outer._ctx);
      }

    }
    return VRFKeyHash;
  })();

  public VRFVKey = (() => {
    const $outer = this;

    class VRFVKey
      extends Ptr<WasmV4.VRFVKey>
      implements WasmContract.VRFVKey
    {

      static fromBytes(bytes: Uint8Array): WasmContract.VRFVKey {
        const ret = WasmV4.VRFVKey.from_bytes(bytes);
        return new $outer.VRFVKey(ret, $outer._ctx);
      }

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      toBech32(prefix: string): string {
        return this.wasm.to_bech32(prefix);
      }

      static fromBech32(bechStr: string): WasmContract.VRFVKey {
        const ret = WasmV4.VRFVKey.from_bech32(bechStr);
        return new $outer.VRFVKey(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hex: string): WasmContract.VRFVKey {
        const ret = WasmV4.VRFVKey.from_hex(hex);
        return new $outer.VRFVKey(ret, $outer._ctx);
      }

    }
    return VRFVKey;
  })();

  public Value = (() => {
    const $outer = this;

    class Value
      extends Ptr<WasmV4.Value>
      implements WasmContract.Value
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.Value {
        const ret = WasmV4.Value.from_bytes(bytes);
        return new $outer.Value(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.Value {
        const ret = WasmV4.Value.from_hex(hexStr);
        return new $outer.Value(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.Value {
        const ret = WasmV4.Value.from_json(json);
        return new $outer.Value(ret, $outer._ctx);
      }

      static new(coin: WasmContract.BigNum): WasmContract.Value {
        const ret = WasmV4.Value.new(coin.wasm);
        return new $outer.Value(ret, $outer._ctx);
      }

      static newFromAssets(multiasset: WasmContract.MultiAsset): WasmContract.Value {
        const ret = WasmV4.Value.new_from_assets(multiasset.wasm);
        return new $outer.Value(ret, $outer._ctx);
      }

      static newWithAssets(coin: WasmContract.BigNum, multiasset: WasmContract.MultiAsset): WasmContract.Value {
        const ret = WasmV4.Value.new_with_assets(coin.wasm, multiasset.wasm);
        return new $outer.Value(ret, $outer._ctx);
      }

      static zero(): WasmContract.Value {
        const ret = WasmV4.Value.zero();
        return new $outer.Value(ret, $outer._ctx);
      }

      isZero(): boolean {
        return this.wasm.is_zero();
      }

      coin(): WasmContract.BigNum {
        const ret = this.wasm.coin();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      setCoin(coin: WasmContract.BigNum): void {
        return this.wasm.set_coin(coin.wasm);
      }

      multiasset(): Optional<WasmContract.MultiAsset> {
        const ret = this.wasm.multiasset();
        if (ret == null) return undefined;
        return new $outer.MultiAsset(ret, $outer._ctx);
      }

      setMultiasset(multiasset: WasmContract.MultiAsset): void {
        return this.wasm.set_multiasset(multiasset.wasm);
      }

      checkedAdd(rhs: WasmContract.Value): WasmContract.Value {
        const ret = this.wasm.checked_add(rhs.wasm);
        return new $outer.Value(ret, $outer._ctx);
      }

      checkedSub(rhsValue: WasmContract.Value): WasmContract.Value {
        const ret = this.wasm.checked_sub(rhsValue.wasm);
        return new $outer.Value(ret, $outer._ctx);
      }

      clampedSub(rhsValue: WasmContract.Value): WasmContract.Value {
        const ret = this.wasm.clamped_sub(rhsValue.wasm);
        return new $outer.Value(ret, $outer._ctx);
      }

      compare(rhsValue: WasmContract.Value): Optional<number> {
        return this.wasm.compare(rhsValue.wasm);
      }

    }
    return Value;
  })();

  public VersionedBlock = (() => {
    const $outer = this;

    class VersionedBlock
      extends Ptr<WasmV4.VersionedBlock>
      implements WasmContract.VersionedBlock
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.VersionedBlock {
        const ret = WasmV4.VersionedBlock.from_bytes(bytes);
        return new $outer.VersionedBlock(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.VersionedBlock {
        const ret = WasmV4.VersionedBlock.from_hex(hexStr);
        return new $outer.VersionedBlock(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.VersionedBlock {
        const ret = WasmV4.VersionedBlock.from_json(json);
        return new $outer.VersionedBlock(ret, $outer._ctx);
      }

      static new(block: WasmContract.Block, eraCode: number): WasmContract.VersionedBlock {
        const ret = WasmV4.VersionedBlock.new(block.wasm, eraCode);
        return new $outer.VersionedBlock(ret, $outer._ctx);
      }

      block(): WasmContract.Block {
        const ret = this.wasm.block();
        return new $outer.Block(ret, $outer._ctx);
      }

      era(): WasmContract.BlockEra {
        return this.wasm.era();
      }

    }
    return VersionedBlock;
  })();

  public Vkey = (() => {
    const $outer = this;

    class Vkey
      extends Ptr<WasmV4.Vkey>
      implements WasmContract.Vkey
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.Vkey {
        const ret = WasmV4.Vkey.from_bytes(bytes);
        return new $outer.Vkey(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.Vkey {
        const ret = WasmV4.Vkey.from_hex(hexStr);
        return new $outer.Vkey(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.Vkey {
        const ret = WasmV4.Vkey.from_json(json);
        return new $outer.Vkey(ret, $outer._ctx);
      }

      static new(pk: WasmContract.PublicKey): WasmContract.Vkey {
        const ret = WasmV4.Vkey.new(pk.wasm);
        return new $outer.Vkey(ret, $outer._ctx);
      }

      publicKey(): WasmContract.PublicKey {
        const ret = this.wasm.public_key();
        return new $outer.PublicKey(ret, $outer._ctx);
      }

    }
    return Vkey;
  })();

  public Vkeys = (() => {
    const $outer = this;

    class Vkeys
      extends Ptr<WasmV4.Vkeys>
      implements WasmContract.Vkeys
    {

      static new(): WasmContract.Vkeys {
        const ret = WasmV4.Vkeys.new();
        return new $outer.Vkeys(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      get(index: number): WasmContract.Vkey {
        const ret = this.wasm.get(index);
        return new $outer.Vkey(ret, $outer._ctx);
      }

      add(elem: WasmContract.Vkey): void {
        return this.wasm.add(elem.wasm);
      }

    }
    return Vkeys;
  })();

  public Vkeywitness = (() => {
    const $outer = this;

    class Vkeywitness
      extends Ptr<WasmV4.Vkeywitness>
      implements WasmContract.Vkeywitness
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.Vkeywitness {
        const ret = WasmV4.Vkeywitness.from_bytes(bytes);
        return new $outer.Vkeywitness(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.Vkeywitness {
        const ret = WasmV4.Vkeywitness.from_hex(hexStr);
        return new $outer.Vkeywitness(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.Vkeywitness {
        const ret = WasmV4.Vkeywitness.from_json(json);
        return new $outer.Vkeywitness(ret, $outer._ctx);
      }

      static new(vkey: WasmContract.Vkey, signature: WasmContract.Ed25519Signature): WasmContract.Vkeywitness {
        const ret = WasmV4.Vkeywitness.new(vkey.wasm, signature.wasm);
        return new $outer.Vkeywitness(ret, $outer._ctx);
      }

      vkey(): WasmContract.Vkey {
        const ret = this.wasm.vkey();
        return new $outer.Vkey(ret, $outer._ctx);
      }

      signature(): WasmContract.Ed25519Signature {
        const ret = this.wasm.signature();
        return new $outer.Ed25519Signature(ret, $outer._ctx);
      }

    }
    return Vkeywitness;
  })();

  public Vkeywitnesses = (() => {
    const $outer = this;

    class Vkeywitnesses
      extends Ptr<WasmV4.Vkeywitnesses>
      implements WasmContract.Vkeywitnesses
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.Vkeywitnesses {
        const ret = WasmV4.Vkeywitnesses.from_bytes(bytes);
        return new $outer.Vkeywitnesses(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.Vkeywitnesses {
        const ret = WasmV4.Vkeywitnesses.from_hex(hexStr);
        return new $outer.Vkeywitnesses(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.Vkeywitnesses {
        const ret = WasmV4.Vkeywitnesses.from_json(json);
        return new $outer.Vkeywitnesses(ret, $outer._ctx);
      }

      static new(): WasmContract.Vkeywitnesses {
        const ret = WasmV4.Vkeywitnesses.new();
        return new $outer.Vkeywitnesses(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      get(index: number): WasmContract.Vkeywitness {
        const ret = this.wasm.get(index);
        return new $outer.Vkeywitness(ret, $outer._ctx);
      }

      add(witness: WasmContract.Vkeywitness): boolean {
        return this.wasm.add(witness.wasm);
      }

    }
    return Vkeywitnesses;
  })();

  public VoteDelegation = (() => {
    const $outer = this;

    class VoteDelegation
      extends Ptr<WasmV4.VoteDelegation>
      implements WasmContract.VoteDelegation
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.VoteDelegation {
        const ret = WasmV4.VoteDelegation.from_bytes(bytes);
        return new $outer.VoteDelegation(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.VoteDelegation {
        const ret = WasmV4.VoteDelegation.from_hex(hexStr);
        return new $outer.VoteDelegation(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.VoteDelegation {
        const ret = WasmV4.VoteDelegation.from_json(json);
        return new $outer.VoteDelegation(ret, $outer._ctx);
      }

      stakeCredential(): WasmContract.Credential {
        const ret = this.wasm.stake_credential();
        return new $outer.Credential(ret, $outer._ctx);
      }

      drep(): WasmContract.DRep {
        const ret = this.wasm.drep();
        return new $outer.DRep(ret, $outer._ctx);
      }

      static new(stakeCredential: WasmContract.Credential, drep: WasmContract.DRep): WasmContract.VoteDelegation {
        const ret = WasmV4.VoteDelegation.new(stakeCredential.wasm, drep.wasm);
        return new $outer.VoteDelegation(ret, $outer._ctx);
      }

      hasScriptCredentials(): boolean {
        return this.wasm.has_script_credentials();
      }

    }
    return VoteDelegation;
  })();

  public VoteRegistrationAndDelegation = (() => {
    const $outer = this;

    class VoteRegistrationAndDelegation
      extends Ptr<WasmV4.VoteRegistrationAndDelegation>
      implements WasmContract.VoteRegistrationAndDelegation
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.VoteRegistrationAndDelegation {
        const ret = WasmV4.VoteRegistrationAndDelegation.from_bytes(bytes);
        return new $outer.VoteRegistrationAndDelegation(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.VoteRegistrationAndDelegation {
        const ret = WasmV4.VoteRegistrationAndDelegation.from_hex(hexStr);
        return new $outer.VoteRegistrationAndDelegation(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.VoteRegistrationAndDelegation {
        const ret = WasmV4.VoteRegistrationAndDelegation.from_json(json);
        return new $outer.VoteRegistrationAndDelegation(ret, $outer._ctx);
      }

      stakeCredential(): WasmContract.Credential {
        const ret = this.wasm.stake_credential();
        return new $outer.Credential(ret, $outer._ctx);
      }

      drep(): WasmContract.DRep {
        const ret = this.wasm.drep();
        return new $outer.DRep(ret, $outer._ctx);
      }

      coin(): WasmContract.BigNum {
        const ret = this.wasm.coin();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      static new(stakeCredential: WasmContract.Credential, drep: WasmContract.DRep, coin: WasmContract.BigNum): WasmContract.VoteRegistrationAndDelegation {
        const ret = WasmV4.VoteRegistrationAndDelegation.new(stakeCredential.wasm, drep.wasm, coin.wasm);
        return new $outer.VoteRegistrationAndDelegation(ret, $outer._ctx);
      }

      hasScriptCredentials(): boolean {
        return this.wasm.has_script_credentials();
      }

    }
    return VoteRegistrationAndDelegation;
  })();

  public Voter = (() => {
    const $outer = this;

    class Voter
      extends Ptr<WasmV4.Voter>
      implements WasmContract.Voter
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.Voter {
        const ret = WasmV4.Voter.from_bytes(bytes);
        return new $outer.Voter(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.Voter {
        const ret = WasmV4.Voter.from_hex(hexStr);
        return new $outer.Voter(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.Voter {
        const ret = WasmV4.Voter.from_json(json);
        return new $outer.Voter(ret, $outer._ctx);
      }

      static newConstitutionalCommitteeHotCredential(cred: WasmContract.Credential): WasmContract.Voter {
        const ret = WasmV4.Voter.new_constitutional_committee_hot_credential(cred.wasm);
        return new $outer.Voter(ret, $outer._ctx);
      }

      static newDrepCredential(cred: WasmContract.Credential): WasmContract.Voter {
        const ret = WasmV4.Voter.new_drep_credential(cred.wasm);
        return new $outer.Voter(ret, $outer._ctx);
      }

      static newStakePoolKeyHash(keyHash: WasmContract.Ed25519KeyHash): WasmContract.Voter {
        const ret = WasmV4.Voter.new_stake_pool_key_hash(keyHash.wasm);
        return new $outer.Voter(ret, $outer._ctx);
      }

      kind(): WasmContract.VoterKind {
        return this.wasm.kind();
      }

      toConstitutionalCommitteeHotCredential(): Optional<WasmContract.Credential> {
        const ret = this.wasm.to_constitutional_committee_hot_credential();
        if (ret == null) return undefined;
        return new $outer.Credential(ret, $outer._ctx);
      }

      toDrepCredential(): Optional<WasmContract.Credential> {
        const ret = this.wasm.to_drep_credential();
        if (ret == null) return undefined;
        return new $outer.Credential(ret, $outer._ctx);
      }

      toStakePoolKeyHash(): Optional<WasmContract.Ed25519KeyHash> {
        const ret = this.wasm.to_stake_pool_key_hash();
        if (ret == null) return undefined;
        return new $outer.Ed25519KeyHash(ret, $outer._ctx);
      }

      hasScriptCredentials(): boolean {
        return this.wasm.has_script_credentials();
      }

      toKeyHash(): Optional<WasmContract.Ed25519KeyHash> {
        const ret = this.wasm.to_key_hash();
        if (ret == null) return undefined;
        return new $outer.Ed25519KeyHash(ret, $outer._ctx);
      }

    }
    return Voter;
  })();

  public Voters = (() => {
    const $outer = this;

    class Voters
      extends Ptr<WasmV4.Voters>
      implements WasmContract.Voters
    {

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.Voters {
        const ret = WasmV4.Voters.from_json(json);
        return new $outer.Voters(ret, $outer._ctx);
      }

      static new(): WasmContract.Voters {
        const ret = WasmV4.Voters.new();
        return new $outer.Voters(ret, $outer._ctx);
      }

      add(voter: WasmContract.Voter): void {
        return this.wasm.add(voter.wasm);
      }

      get(index: number): Optional<WasmContract.Voter> {
        const ret = this.wasm.get(index);
        if (ret == null) return undefined;
        return new $outer.Voter(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

    }
    return Voters;
  })();

  public VotingBuilder = (() => {
    const $outer = this;

    class VotingBuilder
      extends Ptr<WasmV4.VotingBuilder>
      implements WasmContract.VotingBuilder
    {

      static new(): WasmContract.VotingBuilder {
        const ret = WasmV4.VotingBuilder.new();
        return new $outer.VotingBuilder(ret, $outer._ctx);
      }

      add(voter: WasmContract.Voter, govActionId: WasmContract.GovernanceActionId, votingProcedure: WasmContract.VotingProcedure): void {
        return this.wasm.add(voter.wasm, govActionId.wasm, votingProcedure.wasm);
      }

      addWithPlutusWitness(voter: WasmContract.Voter, govActionId: WasmContract.GovernanceActionId, votingProcedure: WasmContract.VotingProcedure, witness: WasmContract.PlutusWitness): void {
        return this.wasm.add_with_plutus_witness(voter.wasm, govActionId.wasm, votingProcedure.wasm, witness.wasm);
      }

      addWithNativeScript(voter: WasmContract.Voter, govActionId: WasmContract.GovernanceActionId, votingProcedure: WasmContract.VotingProcedure, nativeScriptSource: WasmContract.NativeScriptSource): void {
        return this.wasm.add_with_native_script(voter.wasm, govActionId.wasm, votingProcedure.wasm, nativeScriptSource.wasm);
      }

      getPlutusWitnesses(): WasmContract.PlutusWitnesses {
        const ret = this.wasm.get_plutus_witnesses();
        return new $outer.PlutusWitnesses(ret, $outer._ctx);
      }

      getRefInputs(): WasmContract.TransactionInputs {
        const ret = this.wasm.get_ref_inputs();
        return new $outer.TransactionInputs(ret, $outer._ctx);
      }

      getNativeScripts(): WasmContract.NativeScripts {
        const ret = this.wasm.get_native_scripts();
        return new $outer.NativeScripts(ret, $outer._ctx);
      }

      hasPlutusScripts(): boolean {
        return this.wasm.has_plutus_scripts();
      }

      build(): WasmContract.VotingProcedures {
        const ret = this.wasm.build();
        return new $outer.VotingProcedures(ret, $outer._ctx);
      }

    }
    return VotingBuilder;
  })();

  public VotingProcedure = (() => {
    const $outer = this;

    class VotingProcedure
      extends Ptr<WasmV4.VotingProcedure>
      implements WasmContract.VotingProcedure
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.VotingProcedure {
        const ret = WasmV4.VotingProcedure.from_bytes(bytes);
        return new $outer.VotingProcedure(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.VotingProcedure {
        const ret = WasmV4.VotingProcedure.from_hex(hexStr);
        return new $outer.VotingProcedure(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.VotingProcedure {
        const ret = WasmV4.VotingProcedure.from_json(json);
        return new $outer.VotingProcedure(ret, $outer._ctx);
      }

      static new(vote: WasmContract.VoteKind): WasmContract.VotingProcedure {
        const ret = WasmV4.VotingProcedure.new(vote);
        return new $outer.VotingProcedure(ret, $outer._ctx);
      }

      static newWithAnchor(vote: WasmContract.VoteKind, anchor: WasmContract.Anchor): WasmContract.VotingProcedure {
        const ret = WasmV4.VotingProcedure.new_with_anchor(vote, anchor.wasm);
        return new $outer.VotingProcedure(ret, $outer._ctx);
      }

      voteKind(): WasmContract.VoteKind {
        return this.wasm.vote_kind();
      }

      anchor(): Optional<WasmContract.Anchor> {
        const ret = this.wasm.anchor();
        if (ret == null) return undefined;
        return new $outer.Anchor(ret, $outer._ctx);
      }

    }
    return VotingProcedure;
  })();

  public VotingProcedures = (() => {
    const $outer = this;

    class VotingProcedures
      extends Ptr<WasmV4.VotingProcedures>
      implements WasmContract.VotingProcedures
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.VotingProcedures {
        const ret = WasmV4.VotingProcedures.from_bytes(bytes);
        return new $outer.VotingProcedures(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.VotingProcedures {
        const ret = WasmV4.VotingProcedures.from_hex(hexStr);
        return new $outer.VotingProcedures(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.VotingProcedures {
        const ret = WasmV4.VotingProcedures.from_json(json);
        return new $outer.VotingProcedures(ret, $outer._ctx);
      }

      static new(): WasmContract.VotingProcedures {
        const ret = WasmV4.VotingProcedures.new();
        return new $outer.VotingProcedures(ret, $outer._ctx);
      }

      insert(voter: WasmContract.Voter, governanceActionId: WasmContract.GovernanceActionId, votingProcedure: WasmContract.VotingProcedure): void {
        return this.wasm.insert(voter.wasm, governanceActionId.wasm, votingProcedure.wasm);
      }

      get(voter: WasmContract.Voter, governanceActionId: WasmContract.GovernanceActionId): Optional<WasmContract.VotingProcedure> {
        const ret = this.wasm.get(voter.wasm, governanceActionId.wasm);
        if (ret == null) return undefined;
        return new $outer.VotingProcedure(ret, $outer._ctx);
      }

      getVoters(): WasmContract.Voters {
        const ret = this.wasm.get_voters();
        return new $outer.Voters(ret, $outer._ctx);
      }

      getGovernanceActionIdsByVoter(voter: WasmContract.Voter): WasmContract.GovernanceActionIds {
        const ret = this.wasm.get_governance_action_ids_by_voter(voter.wasm);
        return new $outer.GovernanceActionIds(ret, $outer._ctx);
      }

    }
    return VotingProcedures;
  })();

  public VotingProposal = (() => {
    const $outer = this;

    class VotingProposal
      extends Ptr<WasmV4.VotingProposal>
      implements WasmContract.VotingProposal
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.VotingProposal {
        const ret = WasmV4.VotingProposal.from_bytes(bytes);
        return new $outer.VotingProposal(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.VotingProposal {
        const ret = WasmV4.VotingProposal.from_hex(hexStr);
        return new $outer.VotingProposal(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.VotingProposal {
        const ret = WasmV4.VotingProposal.from_json(json);
        return new $outer.VotingProposal(ret, $outer._ctx);
      }

      governanceAction(): WasmContract.GovernanceAction {
        const ret = this.wasm.governance_action();
        return new $outer.GovernanceAction(ret, $outer._ctx);
      }

      anchor(): WasmContract.Anchor {
        const ret = this.wasm.anchor();
        return new $outer.Anchor(ret, $outer._ctx);
      }

      rewardAccount(): WasmContract.RewardAddress {
        const ret = this.wasm.reward_account();
        return new $outer.RewardAddress(ret, $outer._ctx);
      }

      deposit(): WasmContract.BigNum {
        const ret = this.wasm.deposit();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      static new(governanceAction: WasmContract.GovernanceAction, anchor: WasmContract.Anchor, rewardAccount: WasmContract.RewardAddress, deposit: WasmContract.BigNum): WasmContract.VotingProposal {
        const ret = WasmV4.VotingProposal.new(governanceAction.wasm, anchor.wasm, rewardAccount.wasm, deposit.wasm);
        return new $outer.VotingProposal(ret, $outer._ctx);
      }

    }
    return VotingProposal;
  })();

  public VotingProposalBuilder = (() => {
    const $outer = this;

    class VotingProposalBuilder
      extends Ptr<WasmV4.VotingProposalBuilder>
      implements WasmContract.VotingProposalBuilder
    {

      static new(): WasmContract.VotingProposalBuilder {
        const ret = WasmV4.VotingProposalBuilder.new();
        return new $outer.VotingProposalBuilder(ret, $outer._ctx);
      }

      add(proposal: WasmContract.VotingProposal): void {
        return this.wasm.add(proposal.wasm);
      }

      addWithPlutusWitness(proposal: WasmContract.VotingProposal, witness: WasmContract.PlutusWitness): void {
        return this.wasm.add_with_plutus_witness(proposal.wasm, witness.wasm);
      }

      getPlutusWitnesses(): WasmContract.PlutusWitnesses {
        const ret = this.wasm.get_plutus_witnesses();
        return new $outer.PlutusWitnesses(ret, $outer._ctx);
      }

      getRefInputs(): WasmContract.TransactionInputs {
        const ret = this.wasm.get_ref_inputs();
        return new $outer.TransactionInputs(ret, $outer._ctx);
      }

      hasPlutusScripts(): boolean {
        return this.wasm.has_plutus_scripts();
      }

      build(): WasmContract.VotingProposals {
        const ret = this.wasm.build();
        return new $outer.VotingProposals(ret, $outer._ctx);
      }

    }
    return VotingProposalBuilder;
  })();

  public VotingProposals = (() => {
    const $outer = this;

    class VotingProposals
      extends Ptr<WasmV4.VotingProposals>
      implements WasmContract.VotingProposals
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.VotingProposals {
        const ret = WasmV4.VotingProposals.from_bytes(bytes);
        return new $outer.VotingProposals(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.VotingProposals {
        const ret = WasmV4.VotingProposals.from_hex(hexStr);
        return new $outer.VotingProposals(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.VotingProposals {
        const ret = WasmV4.VotingProposals.from_json(json);
        return new $outer.VotingProposals(ret, $outer._ctx);
      }

      static new(): WasmContract.VotingProposals {
        const ret = WasmV4.VotingProposals.new();
        return new $outer.VotingProposals(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      get(index: number): WasmContract.VotingProposal {
        const ret = this.wasm.get(index);
        return new $outer.VotingProposal(ret, $outer._ctx);
      }

      add(proposal: WasmContract.VotingProposal): boolean {
        return this.wasm.add(proposal.wasm);
      }

      contains(elem: WasmContract.VotingProposal): boolean {
        return this.wasm.contains(elem.wasm);
      }

      toOption(): Optional<WasmContract.VotingProposals> {
        const ret = this.wasm.to_option();
        if (ret == null) return undefined;
        return new $outer.VotingProposals(ret, $outer._ctx);
      }

    }
    return VotingProposals;
  })();

  public Withdrawals = (() => {
    const $outer = this;

    class Withdrawals
      extends Ptr<WasmV4.Withdrawals>
      implements WasmContract.Withdrawals
    {

      toBytes(): Uint8Array {
        return this.wasm.to_bytes();
      }

      static fromBytes(bytes: Uint8Array): WasmContract.Withdrawals {
        const ret = WasmV4.Withdrawals.from_bytes(bytes);
        return new $outer.Withdrawals(ret, $outer._ctx);
      }

      toHex(): string {
        return this.wasm.to_hex();
      }

      static fromHex(hexStr: string): WasmContract.Withdrawals {
        const ret = WasmV4.Withdrawals.from_hex(hexStr);
        return new $outer.Withdrawals(ret, $outer._ctx);
      }

      toJson(): string {
        return this.wasm.to_json();
      }

      static fromJson(json: string): WasmContract.Withdrawals {
        const ret = WasmV4.Withdrawals.from_json(json);
        return new $outer.Withdrawals(ret, $outer._ctx);
      }

      static new(): WasmContract.Withdrawals {
        const ret = WasmV4.Withdrawals.new();
        return new $outer.Withdrawals(ret, $outer._ctx);
      }

      len(): number {
        return this.wasm.len();
      }

      insert(key: WasmContract.RewardAddress, value: WasmContract.BigNum): Optional<WasmContract.BigNum> {
        const ret = this.wasm.insert(key.wasm, value.wasm);
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      get(key: WasmContract.RewardAddress): Optional<WasmContract.BigNum> {
        const ret = this.wasm.get(key.wasm);
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      keys(): WasmContract.RewardAddresses {
        const ret = this.wasm.keys();
        return new $outer.RewardAddresses(ret, $outer._ctx);
      }

    }
    return Withdrawals;
  })();

  public WithdrawalsBuilder = (() => {
    const $outer = this;

    class WithdrawalsBuilder
      extends Ptr<WasmV4.WithdrawalsBuilder>
      implements WasmContract.WithdrawalsBuilder
    {

      static new(): WasmContract.WithdrawalsBuilder {
        const ret = WasmV4.WithdrawalsBuilder.new();
        return new $outer.WithdrawalsBuilder(ret, $outer._ctx);
      }

      add(address: WasmContract.RewardAddress, coin: WasmContract.BigNum): void {
        return this.wasm.add(address.wasm, coin.wasm);
      }

      addWithPlutusWitness(address: WasmContract.RewardAddress, coin: WasmContract.BigNum, witness: WasmContract.PlutusWitness): void {
        return this.wasm.add_with_plutus_witness(address.wasm, coin.wasm, witness.wasm);
      }

      addWithNativeScript(address: WasmContract.RewardAddress, coin: WasmContract.BigNum, nativeScriptSource: WasmContract.NativeScriptSource): void {
        return this.wasm.add_with_native_script(address.wasm, coin.wasm, nativeScriptSource.wasm);
      }

      getPlutusWitnesses(): WasmContract.PlutusWitnesses {
        const ret = this.wasm.get_plutus_witnesses();
        return new $outer.PlutusWitnesses(ret, $outer._ctx);
      }

      getRefInputs(): WasmContract.TransactionInputs {
        const ret = this.wasm.get_ref_inputs();
        return new $outer.TransactionInputs(ret, $outer._ctx);
      }

      getNativeScripts(): WasmContract.NativeScripts {
        const ret = this.wasm.get_native_scripts();
        return new $outer.NativeScripts(ret, $outer._ctx);
      }

      getTotalWithdrawals(): WasmContract.Value {
        const ret = this.wasm.get_total_withdrawals();
        return new $outer.Value(ret, $outer._ctx);
      }

      hasPlutusScripts(): boolean {
        return this.wasm.has_plutus_scripts();
      }

      build(): WasmContract.Withdrawals {
        const ret = this.wasm.build();
        return new $outer.Withdrawals(ret, $outer._ctx);
      }

    }
    return WithdrawalsBuilder;
  })();

  public AddressKind = (() => { return WasmContract.AddressKind; })();

  public BlockEra = (() => { return WasmContract.BlockEra; })();

  public ByronAddressType = (() => { return WasmContract.ByronAddressType; })();

  public CborContainerType = (() => { return WasmContract.CborContainerType; })();

  public CborSetType = (() => { return WasmContract.CborSetType; })();

  public CertificateKind = (() => { return WasmContract.CertificateKind; })();

  public CoinSelectionStrategyCIP2 = (() => { return WasmContract.CoinSelectionStrategyCIP2; })();

  public CredKind = (() => { return WasmContract.CredKind; })();

  public DRepKind = (() => { return WasmContract.DRepKind; })();

  public GovernanceActionKind = (() => { return WasmContract.GovernanceActionKind; })();

  public LanguageKind = (() => { return WasmContract.LanguageKind; })();

  public MIRKind = (() => { return WasmContract.MIRKind; })();

  public MIRPot = (() => { return WasmContract.MIRPot; })();

  public MetadataJsonSchema = (() => { return WasmContract.MetadataJsonSchema; })();

  public NativeScriptKind = (() => { return WasmContract.NativeScriptKind; })();

  public NetworkIdKind = (() => { return WasmContract.NetworkIdKind; })();

  public PlutusDataKind = (() => { return WasmContract.PlutusDataKind; })();

  public PlutusDatumSchema = (() => { return WasmContract.PlutusDatumSchema; })();

  public RedeemerTagKind = (() => { return WasmContract.RedeemerTagKind; })();

  public RelayKind = (() => { return WasmContract.RelayKind; })();

  public ScriptHashNamespace = (() => { return WasmContract.ScriptHashNamespace; })();

  public ScriptSchema = (() => { return WasmContract.ScriptSchema; })();

  public TransactionMetadatumKind = (() => { return WasmContract.TransactionMetadatumKind; })();

  public TransactionSetsState = (() => { return WasmContract.TransactionSetsState; })();

  public VoteKind = (() => { return WasmContract.VoteKind; })();

  public VoterKind = (() => { return WasmContract.VoterKind; })();

}