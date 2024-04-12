import * as WasmV4 from '@emurgo/csl-mobile-bridge';
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

  async calculateExUnitsCeilCost(exUnits: WasmContract.ExUnits, exUnitPrices: WasmContract.ExUnitPrices): Promise<WasmContract.BigNum> {
    const ret = await WasmV4.calculate_ex_units_ceil_cost(exUnits.wasm, exUnitPrices.wasm);
    return new this.BigNum(ret, this._ctx);
  }

  async createSendAll(address: WasmContract.Address, utxos: WasmContract.TransactionUnspentOutputs, config: WasmContract.TransactionBuilderConfig): Promise<WasmContract.TransactionBatchList> {
    const ret = await WasmV4.create_send_all(address.wasm, utxos.wasm, config.wasm);
    return new this.TransactionBatchList(ret, this._ctx);
  }

  decodeArbitraryBytesFromMetadatum(metadata: WasmContract.TransactionMetadatum): Promise<Uint8Array> {
    return WasmV4.decode_arbitrary_bytes_from_metadatum(metadata.wasm);
  }

  decodeMetadatumToJsonStr(metadatum: WasmContract.TransactionMetadatum, schema: WasmContract.MetadataJsonSchema): Promise<string> {
    return WasmV4.decode_metadatum_to_json_str(metadatum.wasm, schema);
  }

  decodePlutusDatumToJsonStr(datum: WasmContract.PlutusData, schema: WasmContract.PlutusDatumSchema): Promise<string> {
    return WasmV4.decode_plutus_datum_to_json_str(datum.wasm, schema);
  }

  decryptWithPassword(password: string, data: string): Promise<string> {
    return WasmV4.decrypt_with_password(password, data);
  }

  async encodeArbitraryBytesAsMetadatum(bytes: Uint8Array): Promise<WasmContract.TransactionMetadatum> {
    const ret = await WasmV4.encode_arbitrary_bytes_as_metadatum(bytes);
    return new this.TransactionMetadatum(ret, this._ctx);
  }

  async encodeJsonStrToMetadatum(json: string, schema: WasmContract.MetadataJsonSchema): Promise<WasmContract.TransactionMetadatum> {
    const ret = await WasmV4.encode_json_str_to_metadatum(json, schema);
    return new this.TransactionMetadatum(ret, this._ctx);
  }

  async encodeJsonStrToNativeScript(json: string, selfXpub: string, schema: WasmContract.ScriptSchema): Promise<WasmContract.NativeScript> {
    const ret = await WasmV4.encode_json_str_to_native_script(json, selfXpub, schema);
    return new this.NativeScript(ret, this._ctx);
  }

  async encodeJsonStrToPlutusDatum(json: string, schema: WasmContract.PlutusDatumSchema): Promise<WasmContract.PlutusData> {
    const ret = await WasmV4.encode_json_str_to_plutus_datum(json, schema);
    return new this.PlutusData(ret, this._ctx);
  }

  encryptWithPassword(password: string, salt: string, nonce: string, data: string): Promise<string> {
    return WasmV4.encrypt_with_password(password, salt, nonce, data);
  }

  async getDeposit(txbody: WasmContract.TransactionBody, poolDeposit: WasmContract.BigNum, keyDeposit: WasmContract.BigNum): Promise<WasmContract.BigNum> {
    const ret = await WasmV4.get_deposit(txbody.wasm, poolDeposit.wasm, keyDeposit.wasm);
    return new this.BigNum(ret, this._ctx);
  }

  async getImplicitInput(txbody: WasmContract.TransactionBody, poolDeposit: WasmContract.BigNum, keyDeposit: WasmContract.BigNum): Promise<WasmContract.Value> {
    const ret = await WasmV4.get_implicit_input(txbody.wasm, poolDeposit.wasm, keyDeposit.wasm);
    return new this.Value(ret, this._ctx);
  }

  async hashAuxiliaryData(auxiliaryData: WasmContract.AuxiliaryData): Promise<WasmContract.AuxiliaryDataHash> {
    const ret = await WasmV4.hash_auxiliary_data(auxiliaryData.wasm);
    return new this.AuxiliaryDataHash(ret, this._ctx);
  }

  async hashPlutusData(plutusData: WasmContract.PlutusData): Promise<WasmContract.DataHash> {
    const ret = await WasmV4.hash_plutus_data(plutusData.wasm);
    return new this.DataHash(ret, this._ctx);
  }

  async hashScriptData(redeemers: WasmContract.Redeemers, costModels: WasmContract.Costmdls, datums: Optional<WasmContract.PlutusList>): Promise<WasmContract.ScriptDataHash> {
    const ret = await WasmV4.hash_script_data(redeemers.wasm, costModels.wasm, datums?.wasm);
    return new this.ScriptDataHash(ret, this._ctx);
  }

  async hashTransaction(txBody: WasmContract.TransactionBody): Promise<WasmContract.TransactionHash> {
    const ret = await WasmV4.hash_transaction(txBody.wasm);
    return new this.TransactionHash(ret, this._ctx);
  }

  async makeDaedalusBootstrapWitness(txBodyHash: WasmContract.TransactionHash, addr: WasmContract.ByronAddress, key: WasmContract.LegacyDaedalusPrivateKey): Promise<WasmContract.BootstrapWitness> {
    const ret = await WasmV4.make_daedalus_bootstrap_witness(txBodyHash.wasm, addr.wasm, key.wasm);
    return new this.BootstrapWitness(ret, this._ctx);
  }

  async makeIcarusBootstrapWitness(txBodyHash: WasmContract.TransactionHash, addr: WasmContract.ByronAddress, key: WasmContract.Bip32PrivateKey): Promise<WasmContract.BootstrapWitness> {
    const ret = await WasmV4.make_icarus_bootstrap_witness(txBodyHash.wasm, addr.wasm, key.wasm);
    return new this.BootstrapWitness(ret, this._ctx);
  }

  async makeVkeyWitness(txBodyHash: WasmContract.TransactionHash, sk: WasmContract.PrivateKey): Promise<WasmContract.Vkeywitness> {
    const ret = await WasmV4.make_vkey_witness(txBodyHash.wasm, sk.wasm);
    return new this.Vkeywitness(ret, this._ctx);
  }

  async minAdaForOutput(output: WasmContract.TransactionOutput, dataCost: WasmContract.DataCost): Promise<WasmContract.BigNum> {
    const ret = await WasmV4.min_ada_for_output(output.wasm, dataCost.wasm);
    return new this.BigNum(ret, this._ctx);
  }

  async minFee(tx: WasmContract.Transaction, linearFee: WasmContract.LinearFee): Promise<WasmContract.BigNum> {
    const ret = await WasmV4.min_fee(tx.wasm, linearFee.wasm);
    return new this.BigNum(ret, this._ctx);
  }

  async minRefScriptFee(totalRefScriptsSize: number, refScriptCoinsPerByte: WasmContract.UnitInterval): Promise<WasmContract.BigNum> {
    const ret = await WasmV4.min_ref_script_fee(totalRefScriptsSize, refScriptCoinsPerByte.wasm);
    return new this.BigNum(ret, this._ctx);
  }

  async minScriptFee(tx: WasmContract.Transaction, exUnitPrices: WasmContract.ExUnitPrices): Promise<WasmContract.BigNum> {
    const ret = await WasmV4.min_script_fee(tx.wasm, exUnitPrices.wasm);
    return new this.BigNum(ret, this._ctx);
  }

  public Address = (() => {
    const $outer = this;

    class Address
      extends Ptr<WasmV4.Address>
      implements WasmContract.Address
    {

      static async fromBytes(data: Uint8Array): Promise<WasmContract.Address> {
        const ret = await WasmV4.Address.from_bytes(data);
        return new $outer.Address(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.Address> {
        const ret = await WasmV4.Address.from_json(json);
        return new $outer.Address(ret, $outer._ctx);
      }

      kind(): Promise<WasmContract.AddressKind> {
        return this.wasm.kind();
      }

      async paymentCred(): Promise<Optional<WasmContract.Credential>> {
        const ret = await this.wasm.payment_cred();
        if (ret == null) return undefined;
        return new $outer.Credential(ret, $outer._ctx);
      }

      isMalformed(): Promise<boolean> {
        return this.wasm.is_malformed();
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Address> {
        const ret = await WasmV4.Address.from_hex(hexStr);
        return new $outer.Address(ret, $outer._ctx);
      }

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      toBech32(prefix: Optional<string>): Promise<string> {
        return this.wasm.to_bech32(prefix);
      }

      static async fromBech32(bechStr: string): Promise<WasmContract.Address> {
        const ret = await WasmV4.Address.from_bech32(bechStr);
        return new $outer.Address(ret, $outer._ctx);
      }

      networkId(): Promise<number> {
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Anchor> {
        const ret = await WasmV4.Anchor.from_bytes(bytes);
        return new $outer.Anchor(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Anchor> {
        const ret = await WasmV4.Anchor.from_hex(hexStr);
        return new $outer.Anchor(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.Anchor> {
        const ret = await WasmV4.Anchor.from_json(json);
        return new $outer.Anchor(ret, $outer._ctx);
      }

      async url(): Promise<WasmContract.URL> {
        const ret = await this.wasm.url();
        return new $outer.URL(ret, $outer._ctx);
      }

      async anchorDataHash(): Promise<WasmContract.AnchorDataHash> {
        const ret = await this.wasm.anchor_data_hash();
        return new $outer.AnchorDataHash(ret, $outer._ctx);
      }

      static async new(anchorUrl: WasmContract.URL, anchorDataHash: WasmContract.AnchorDataHash): Promise<WasmContract.Anchor> {
        const ret = await WasmV4.Anchor.new(anchorUrl.wasm, anchorDataHash.wasm);
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

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.AnchorDataHash> {
        const ret = await WasmV4.AnchorDataHash.from_bytes(bytes);
        return new $outer.AnchorDataHash(ret, $outer._ctx);
      }

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      toBech32(prefix: string): Promise<string> {
        return this.wasm.to_bech32(prefix);
      }

      static async fromBech32(bechStr: string): Promise<WasmContract.AnchorDataHash> {
        const ret = await WasmV4.AnchorDataHash.from_bech32(bechStr);
        return new $outer.AnchorDataHash(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hex: string): Promise<WasmContract.AnchorDataHash> {
        const ret = await WasmV4.AnchorDataHash.from_hex(hex);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.AssetName> {
        const ret = await WasmV4.AssetName.from_bytes(bytes);
        return new $outer.AssetName(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.AssetName> {
        const ret = await WasmV4.AssetName.from_hex(hexStr);
        return new $outer.AssetName(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.AssetName> {
        const ret = await WasmV4.AssetName.from_json(json);
        return new $outer.AssetName(ret, $outer._ctx);
      }

      static async new(name: Uint8Array): Promise<WasmContract.AssetName> {
        const ret = await WasmV4.AssetName.new(name);
        return new $outer.AssetName(ret, $outer._ctx);
      }

      name(): Promise<Uint8Array> {
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.AssetNames> {
        const ret = await WasmV4.AssetNames.from_bytes(bytes);
        return new $outer.AssetNames(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.AssetNames> {
        const ret = await WasmV4.AssetNames.from_hex(hexStr);
        return new $outer.AssetNames(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.AssetNames> {
        const ret = await WasmV4.AssetNames.from_json(json);
        return new $outer.AssetNames(ret, $outer._ctx);
      }

      static async new(): Promise<WasmContract.AssetNames> {
        const ret = await WasmV4.AssetNames.new();
        return new $outer.AssetNames(ret, $outer._ctx);
      }

      len(): Promise<number> {
        return this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.AssetName> {
        const ret = await this.wasm.get(index);
        return new $outer.AssetName(ret, $outer._ctx);
      }

      add(elem: WasmContract.AssetName): Promise<void> {
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Assets> {
        const ret = await WasmV4.Assets.from_bytes(bytes);
        return new $outer.Assets(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Assets> {
        const ret = await WasmV4.Assets.from_hex(hexStr);
        return new $outer.Assets(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.Assets> {
        const ret = await WasmV4.Assets.from_json(json);
        return new $outer.Assets(ret, $outer._ctx);
      }

      static async new(): Promise<WasmContract.Assets> {
        const ret = await WasmV4.Assets.new();
        return new $outer.Assets(ret, $outer._ctx);
      }

      len(): Promise<number> {
        return this.wasm.len();
      }

      async insert(key: WasmContract.AssetName, value: WasmContract.BigNum): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.insert(key.wasm, value.wasm);
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      async get(key: WasmContract.AssetName): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.get(key.wasm);
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      async keys(): Promise<WasmContract.AssetNames> {
        const ret = await this.wasm.keys();
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.AuxiliaryData> {
        const ret = await WasmV4.AuxiliaryData.from_bytes(bytes);
        return new $outer.AuxiliaryData(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.AuxiliaryData> {
        const ret = await WasmV4.AuxiliaryData.from_hex(hexStr);
        return new $outer.AuxiliaryData(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.AuxiliaryData> {
        const ret = await WasmV4.AuxiliaryData.from_json(json);
        return new $outer.AuxiliaryData(ret, $outer._ctx);
      }

      static async new(): Promise<WasmContract.AuxiliaryData> {
        const ret = await WasmV4.AuxiliaryData.new();
        return new $outer.AuxiliaryData(ret, $outer._ctx);
      }

      async metadata(): Promise<Optional<WasmContract.GeneralTransactionMetadata>> {
        const ret = await this.wasm.metadata();
        if (ret == null) return undefined;
        return new $outer.GeneralTransactionMetadata(ret, $outer._ctx);
      }

      setMetadata(metadata: WasmContract.GeneralTransactionMetadata): Promise<void> {
        return this.wasm.set_metadata(metadata.wasm);
      }

      async nativeScripts(): Promise<Optional<WasmContract.NativeScripts>> {
        const ret = await this.wasm.native_scripts();
        if (ret == null) return undefined;
        return new $outer.NativeScripts(ret, $outer._ctx);
      }

      setNativeScripts(nativeScripts: WasmContract.NativeScripts): Promise<void> {
        return this.wasm.set_native_scripts(nativeScripts.wasm);
      }

      async plutusScripts(): Promise<Optional<WasmContract.PlutusScripts>> {
        const ret = await this.wasm.plutus_scripts();
        if (ret == null) return undefined;
        return new $outer.PlutusScripts(ret, $outer._ctx);
      }

      setPlutusScripts(plutusScripts: WasmContract.PlutusScripts): Promise<void> {
        return this.wasm.set_plutus_scripts(plutusScripts.wasm);
      }

      preferAlonzoFormat(): Promise<boolean> {
        return this.wasm.prefer_alonzo_format();
      }

      setPreferAlonzoFormat(prefer: boolean): Promise<void> {
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

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.AuxiliaryDataHash> {
        const ret = await WasmV4.AuxiliaryDataHash.from_bytes(bytes);
        return new $outer.AuxiliaryDataHash(ret, $outer._ctx);
      }

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      toBech32(prefix: string): Promise<string> {
        return this.wasm.to_bech32(prefix);
      }

      static async fromBech32(bechStr: string): Promise<WasmContract.AuxiliaryDataHash> {
        const ret = await WasmV4.AuxiliaryDataHash.from_bech32(bechStr);
        return new $outer.AuxiliaryDataHash(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hex: string): Promise<WasmContract.AuxiliaryDataHash> {
        const ret = await WasmV4.AuxiliaryDataHash.from_hex(hex);
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

      static async new(): Promise<WasmContract.AuxiliaryDataSet> {
        const ret = await WasmV4.AuxiliaryDataSet.new();
        return new $outer.AuxiliaryDataSet(ret, $outer._ctx);
      }

      len(): Promise<number> {
        return this.wasm.len();
      }

      async insert(txIndex: number, data: WasmContract.AuxiliaryData): Promise<Optional<WasmContract.AuxiliaryData>> {
        const ret = await this.wasm.insert(txIndex, data.wasm);
        if (ret == null) return undefined;
        return new $outer.AuxiliaryData(ret, $outer._ctx);
      }

      async get(txIndex: number): Promise<Optional<WasmContract.AuxiliaryData>> {
        const ret = await this.wasm.get(txIndex);
        if (ret == null) return undefined;
        return new $outer.AuxiliaryData(ret, $outer._ctx);
      }

      indices(): Promise<Uint32Array> {
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

      static async new(network: number, payment: WasmContract.Credential, stake: WasmContract.Credential): Promise<WasmContract.BaseAddress> {
        const ret = await WasmV4.BaseAddress.new(network, payment.wasm, stake.wasm);
        return new $outer.BaseAddress(ret, $outer._ctx);
      }

      async paymentCred(): Promise<WasmContract.Credential> {
        const ret = await this.wasm.payment_cred();
        return new $outer.Credential(ret, $outer._ctx);
      }

      async stakeCred(): Promise<WasmContract.Credential> {
        const ret = await this.wasm.stake_cred();
        return new $outer.Credential(ret, $outer._ctx);
      }

      async toAddress(): Promise<WasmContract.Address> {
        const ret = await this.wasm.to_address();
        return new $outer.Address(ret, $outer._ctx);
      }

      static async fromAddress(addr: WasmContract.Address): Promise<Optional<WasmContract.BaseAddress>> {
        const ret = await WasmV4.BaseAddress.from_address(addr.wasm);
        if (ret == null) return undefined;
        return new $outer.BaseAddress(ret, $outer._ctx);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.BigInt> {
        const ret = await WasmV4.BigInt.from_bytes(bytes);
        return new $outer.BigInt(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.BigInt> {
        const ret = await WasmV4.BigInt.from_hex(hexStr);
        return new $outer.BigInt(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.BigInt> {
        const ret = await WasmV4.BigInt.from_json(json);
        return new $outer.BigInt(ret, $outer._ctx);
      }

      isZero(): Promise<boolean> {
        return this.wasm.is_zero();
      }

      async asU64(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.as_u64();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      async asInt(): Promise<Optional<WasmContract.Int>> {
        const ret = await this.wasm.as_int();
        if (ret == null) return undefined;
        return new $outer.Int(ret, $outer._ctx);
      }

      static async fromStr(text: string): Promise<WasmContract.BigInt> {
        const ret = await WasmV4.BigInt.from_str(text);
        return new $outer.BigInt(ret, $outer._ctx);
      }

      toStr(): Promise<string> {
        return this.wasm.to_str();
      }

      async add(other: WasmContract.BigInt): Promise<WasmContract.BigInt> {
        const ret = await this.wasm.add(other.wasm);
        return new $outer.BigInt(ret, $outer._ctx);
      }

      async mul(other: WasmContract.BigInt): Promise<WasmContract.BigInt> {
        const ret = await this.wasm.mul(other.wasm);
        return new $outer.BigInt(ret, $outer._ctx);
      }

      static async one(): Promise<WasmContract.BigInt> {
        const ret = await WasmV4.BigInt.one();
        return new $outer.BigInt(ret, $outer._ctx);
      }

      async increment(): Promise<WasmContract.BigInt> {
        const ret = await this.wasm.increment();
        return new $outer.BigInt(ret, $outer._ctx);
      }

      async divCeil(other: WasmContract.BigInt): Promise<WasmContract.BigInt> {
        const ret = await this.wasm.div_ceil(other.wasm);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.BigNum> {
        const ret = await WasmV4.BigNum.from_bytes(bytes);
        return new $outer.BigNum(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.BigNum> {
        const ret = await WasmV4.BigNum.from_hex(hexStr);
        return new $outer.BigNum(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.BigNum> {
        const ret = await WasmV4.BigNum.from_json(json);
        return new $outer.BigNum(ret, $outer._ctx);
      }

      static async fromStr(string: string): Promise<WasmContract.BigNum> {
        const ret = await WasmV4.BigNum.from_str(string);
        return new $outer.BigNum(ret, $outer._ctx);
      }

      toStr(): Promise<string> {
        return this.wasm.to_str();
      }

      static async zero(): Promise<WasmContract.BigNum> {
        const ret = await WasmV4.BigNum.zero();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      static async one(): Promise<WasmContract.BigNum> {
        const ret = await WasmV4.BigNum.one();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      isZero(): Promise<boolean> {
        return this.wasm.is_zero();
      }

      async divFloor(other: WasmContract.BigNum): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.div_floor(other.wasm);
        return new $outer.BigNum(ret, $outer._ctx);
      }

      async checkedMul(other: WasmContract.BigNum): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.checked_mul(other.wasm);
        return new $outer.BigNum(ret, $outer._ctx);
      }

      async checkedAdd(other: WasmContract.BigNum): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.checked_add(other.wasm);
        return new $outer.BigNum(ret, $outer._ctx);
      }

      async checkedSub(other: WasmContract.BigNum): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.checked_sub(other.wasm);
        return new $outer.BigNum(ret, $outer._ctx);
      }

      async clampedSub(other: WasmContract.BigNum): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.clamped_sub(other.wasm);
        return new $outer.BigNum(ret, $outer._ctx);
      }

      compare(rhsValue: WasmContract.BigNum): Promise<number> {
        return this.wasm.compare(rhsValue.wasm);
      }

      lessThan(rhsValue: WasmContract.BigNum): Promise<boolean> {
        return this.wasm.less_than(rhsValue.wasm);
      }

      static async maxValue(): Promise<WasmContract.BigNum> {
        const ret = await WasmV4.BigNum.max_value();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      static async max(a: WasmContract.BigNum, b: WasmContract.BigNum): Promise<WasmContract.BigNum> {
        const ret = await WasmV4.BigNum.max(a.wasm, b.wasm);
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

      async derive(index: number): Promise<WasmContract.Bip32PrivateKey> {
        const ret = await this.wasm.derive(index);
        return new $outer.Bip32PrivateKey(ret, $outer._ctx);
      }

      static async from_128Xprv(bytes: Uint8Array): Promise<WasmContract.Bip32PrivateKey> {
        const ret = await WasmV4.Bip32PrivateKey.from_128_xprv(bytes);
        return new $outer.Bip32PrivateKey(ret, $outer._ctx);
      }

      to_128Xprv(): Promise<Uint8Array> {
        return this.wasm.to_128_xprv();
      }

      static async generateEd25519Bip32(): Promise<WasmContract.Bip32PrivateKey> {
        const ret = await WasmV4.Bip32PrivateKey.generate_ed25519_bip32();
        return new $outer.Bip32PrivateKey(ret, $outer._ctx);
      }

      async toRawKey(): Promise<WasmContract.PrivateKey> {
        const ret = await this.wasm.to_raw_key();
        return new $outer.PrivateKey(ret, $outer._ctx);
      }

      async toPublic(): Promise<WasmContract.Bip32PublicKey> {
        const ret = await this.wasm.to_public();
        return new $outer.Bip32PublicKey(ret, $outer._ctx);
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Bip32PrivateKey> {
        const ret = await WasmV4.Bip32PrivateKey.from_bytes(bytes);
        return new $outer.Bip32PrivateKey(ret, $outer._ctx);
      }

      asBytes(): Promise<Uint8Array> {
        return this.wasm.as_bytes();
      }

      static async fromBech32(bech32Str: string): Promise<WasmContract.Bip32PrivateKey> {
        const ret = await WasmV4.Bip32PrivateKey.from_bech32(bech32Str);
        return new $outer.Bip32PrivateKey(ret, $outer._ctx);
      }

      toBech32(): Promise<string> {
        return this.wasm.to_bech32();
      }

      static async fromBip39Entropy(entropy: Uint8Array, password: Uint8Array): Promise<WasmContract.Bip32PrivateKey> {
        const ret = await WasmV4.Bip32PrivateKey.from_bip39_entropy(entropy, password);
        return new $outer.Bip32PrivateKey(ret, $outer._ctx);
      }

      chaincode(): Promise<Uint8Array> {
        return this.wasm.chaincode();
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Bip32PrivateKey> {
        const ret = await WasmV4.Bip32PrivateKey.from_hex(hexStr);
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

      async derive(index: number): Promise<WasmContract.Bip32PublicKey> {
        const ret = await this.wasm.derive(index);
        return new $outer.Bip32PublicKey(ret, $outer._ctx);
      }

      async toRawKey(): Promise<WasmContract.PublicKey> {
        const ret = await this.wasm.to_raw_key();
        return new $outer.PublicKey(ret, $outer._ctx);
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Bip32PublicKey> {
        const ret = await WasmV4.Bip32PublicKey.from_bytes(bytes);
        return new $outer.Bip32PublicKey(ret, $outer._ctx);
      }

      asBytes(): Promise<Uint8Array> {
        return this.wasm.as_bytes();
      }

      static async fromBech32(bech32Str: string): Promise<WasmContract.Bip32PublicKey> {
        const ret = await WasmV4.Bip32PublicKey.from_bech32(bech32Str);
        return new $outer.Bip32PublicKey(ret, $outer._ctx);
      }

      toBech32(): Promise<string> {
        return this.wasm.to_bech32();
      }

      chaincode(): Promise<Uint8Array> {
        return this.wasm.chaincode();
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Bip32PublicKey> {
        const ret = await WasmV4.Bip32PublicKey.from_hex(hexStr);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Block> {
        const ret = await WasmV4.Block.from_bytes(bytes);
        return new $outer.Block(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Block> {
        const ret = await WasmV4.Block.from_hex(hexStr);
        return new $outer.Block(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.Block> {
        const ret = await WasmV4.Block.from_json(json);
        return new $outer.Block(ret, $outer._ctx);
      }

      async header(): Promise<WasmContract.Header> {
        const ret = await this.wasm.header();
        return new $outer.Header(ret, $outer._ctx);
      }

      async transactionBodies(): Promise<WasmContract.TransactionBodies> {
        const ret = await this.wasm.transaction_bodies();
        return new $outer.TransactionBodies(ret, $outer._ctx);
      }

      async transactionWitnessSets(): Promise<WasmContract.TransactionWitnessSets> {
        const ret = await this.wasm.transaction_witness_sets();
        return new $outer.TransactionWitnessSets(ret, $outer._ctx);
      }

      async auxiliaryDataSet(): Promise<WasmContract.AuxiliaryDataSet> {
        const ret = await this.wasm.auxiliary_data_set();
        return new $outer.AuxiliaryDataSet(ret, $outer._ctx);
      }

      invalidTransactions(): Promise<Uint32Array> {
        return this.wasm.invalid_transactions();
      }

      static async new(header: WasmContract.Header, transactionBodies: WasmContract.TransactionBodies, transactionWitnessSets: WasmContract.TransactionWitnessSets, auxiliaryDataSet: WasmContract.AuxiliaryDataSet, invalidTransactions: Uint32Array): Promise<WasmContract.Block> {
        const ret = await WasmV4.Block.new(header.wasm, transactionBodies.wasm, transactionWitnessSets.wasm, auxiliaryDataSet.wasm, invalidTransactions);
        return new $outer.Block(ret, $outer._ctx);
      }

      static async fromWrappedBytes(data: Uint8Array): Promise<WasmContract.Block> {
        const ret = await WasmV4.Block.from_wrapped_bytes(data);
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

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.BlockHash> {
        const ret = await WasmV4.BlockHash.from_bytes(bytes);
        return new $outer.BlockHash(ret, $outer._ctx);
      }

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      toBech32(prefix: string): Promise<string> {
        return this.wasm.to_bech32(prefix);
      }

      static async fromBech32(bechStr: string): Promise<WasmContract.BlockHash> {
        const ret = await WasmV4.BlockHash.from_bech32(bechStr);
        return new $outer.BlockHash(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hex: string): Promise<WasmContract.BlockHash> {
        const ret = await WasmV4.BlockHash.from_hex(hex);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.BootstrapWitness> {
        const ret = await WasmV4.BootstrapWitness.from_bytes(bytes);
        return new $outer.BootstrapWitness(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.BootstrapWitness> {
        const ret = await WasmV4.BootstrapWitness.from_hex(hexStr);
        return new $outer.BootstrapWitness(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.BootstrapWitness> {
        const ret = await WasmV4.BootstrapWitness.from_json(json);
        return new $outer.BootstrapWitness(ret, $outer._ctx);
      }

      async vkey(): Promise<WasmContract.Vkey> {
        const ret = await this.wasm.vkey();
        return new $outer.Vkey(ret, $outer._ctx);
      }

      async signature(): Promise<WasmContract.Ed25519Signature> {
        const ret = await this.wasm.signature();
        return new $outer.Ed25519Signature(ret, $outer._ctx);
      }

      chainCode(): Promise<Uint8Array> {
        return this.wasm.chain_code();
      }

      attributes(): Promise<Uint8Array> {
        return this.wasm.attributes();
      }

      static async new(vkey: WasmContract.Vkey, signature: WasmContract.Ed25519Signature, chainCode: Uint8Array, attributes: Uint8Array): Promise<WasmContract.BootstrapWitness> {
        const ret = await WasmV4.BootstrapWitness.new(vkey.wasm, signature.wasm, chainCode, attributes);
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

      static async new(): Promise<WasmContract.BootstrapWitnesses> {
        const ret = await WasmV4.BootstrapWitnesses.new();
        return new $outer.BootstrapWitnesses(ret, $outer._ctx);
      }

      len(): Promise<number> {
        return this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.BootstrapWitness> {
        const ret = await this.wasm.get(index);
        return new $outer.BootstrapWitness(ret, $outer._ctx);
      }

      add(elem: WasmContract.BootstrapWitness): Promise<void> {
        return this.wasm.add(elem.wasm);
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

      toBase58(): Promise<string> {
        return this.wasm.to_base58();
      }

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.ByronAddress> {
        const ret = await WasmV4.ByronAddress.from_bytes(bytes);
        return new $outer.ByronAddress(ret, $outer._ctx);
      }

      byronProtocolMagic(): Promise<number> {
        return this.wasm.byron_protocol_magic();
      }

      attributes(): Promise<Uint8Array> {
        return this.wasm.attributes();
      }

      networkId(): Promise<number> {
        return this.wasm.network_id();
      }

      static async fromBase58(s: string): Promise<WasmContract.ByronAddress> {
        const ret = await WasmV4.ByronAddress.from_base58(s);
        return new $outer.ByronAddress(ret, $outer._ctx);
      }

      static async icarusFromKey(key: WasmContract.Bip32PublicKey, protocolMagic: number): Promise<WasmContract.ByronAddress> {
        const ret = await WasmV4.ByronAddress.icarus_from_key(key.wasm, protocolMagic);
        return new $outer.ByronAddress(ret, $outer._ctx);
      }

      static isValid(s: string): Promise<boolean> {
        return WasmV4.ByronAddress.is_valid(s);
      }

      async toAddress(): Promise<WasmContract.Address> {
        const ret = await this.wasm.to_address();
        return new $outer.Address(ret, $outer._ctx);
      }

      static async fromAddress(addr: WasmContract.Address): Promise<Optional<WasmContract.ByronAddress>> {
        const ret = await WasmV4.ByronAddress.from_address(addr.wasm);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.from_bytes(bytes);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.from_hex(hexStr);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.from_json(json);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      static async newStakeRegistration(stakeRegistration: WasmContract.StakeRegistration): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.new_stake_registration(stakeRegistration.wasm);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      static async newStakeDeregistration(stakeDeregistration: WasmContract.StakeDeregistration): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.new_stake_deregistration(stakeDeregistration.wasm);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      static async newStakeDelegation(stakeDelegation: WasmContract.StakeDelegation): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.new_stake_delegation(stakeDelegation.wasm);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      static async newPoolRegistration(poolRegistration: WasmContract.PoolRegistration): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.new_pool_registration(poolRegistration.wasm);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      static async newPoolRetirement(poolRetirement: WasmContract.PoolRetirement): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.new_pool_retirement(poolRetirement.wasm);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      static async newGenesisKeyDelegation(genesisKeyDelegation: WasmContract.GenesisKeyDelegation): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.new_genesis_key_delegation(genesisKeyDelegation.wasm);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      static async newMoveInstantaneousRewardsCert(moveInstantaneousRewardsCert: WasmContract.MoveInstantaneousRewardsCert): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.new_move_instantaneous_rewards_cert(moveInstantaneousRewardsCert.wasm);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      static async newCommitteeHotAuth(committeeHotAuth: WasmContract.CommitteeHotAuth): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.new_committee_hot_auth(committeeHotAuth.wasm);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      static async newCommitteeColdResign(committeeColdResign: WasmContract.CommitteeColdResign): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.new_committee_cold_resign(committeeColdResign.wasm);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      static async newDrepDeregistration(drepDeregistration: WasmContract.DrepDeregistration): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.new_drep_deregistration(drepDeregistration.wasm);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      static async newDrepRegistration(drepRegistration: WasmContract.DrepRegistration): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.new_drep_registration(drepRegistration.wasm);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      static async newDrepUpdate(drepUpdate: WasmContract.DrepUpdate): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.new_drep_update(drepUpdate.wasm);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      static async newStakeAndVoteDelegation(stakeAndVoteDelegation: WasmContract.StakeAndVoteDelegation): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.new_stake_and_vote_delegation(stakeAndVoteDelegation.wasm);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      static async newStakeRegistrationAndDelegation(stakeRegistrationAndDelegation: WasmContract.StakeRegistrationAndDelegation): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.new_stake_registration_and_delegation(stakeRegistrationAndDelegation.wasm);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      static async newStakeVoteRegistrationAndDelegation(stakeVoteRegistrationAndDelegation: WasmContract.StakeVoteRegistrationAndDelegation): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.new_stake_vote_registration_and_delegation(stakeVoteRegistrationAndDelegation.wasm);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      static async newVoteDelegation(voteDelegation: WasmContract.VoteDelegation): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.new_vote_delegation(voteDelegation.wasm);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      static async newVoteRegistrationAndDelegation(voteRegistrationAndDelegation: WasmContract.VoteRegistrationAndDelegation): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.new_vote_registration_and_delegation(voteRegistrationAndDelegation.wasm);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      kind(): Promise<WasmContract.CertificateKind> {
        return this.wasm.kind();
      }

      async asStakeRegistration(): Promise<Optional<WasmContract.StakeRegistration>> {
        const ret = await this.wasm.as_stake_registration();
        if (ret == null) return undefined;
        return new $outer.StakeRegistration(ret, $outer._ctx);
      }

      async asStakeDeregistration(): Promise<Optional<WasmContract.StakeDeregistration>> {
        const ret = await this.wasm.as_stake_deregistration();
        if (ret == null) return undefined;
        return new $outer.StakeDeregistration(ret, $outer._ctx);
      }

      async asStakeDelegation(): Promise<Optional<WasmContract.StakeDelegation>> {
        const ret = await this.wasm.as_stake_delegation();
        if (ret == null) return undefined;
        return new $outer.StakeDelegation(ret, $outer._ctx);
      }

      async asPoolRegistration(): Promise<Optional<WasmContract.PoolRegistration>> {
        const ret = await this.wasm.as_pool_registration();
        if (ret == null) return undefined;
        return new $outer.PoolRegistration(ret, $outer._ctx);
      }

      async asPoolRetirement(): Promise<Optional<WasmContract.PoolRetirement>> {
        const ret = await this.wasm.as_pool_retirement();
        if (ret == null) return undefined;
        return new $outer.PoolRetirement(ret, $outer._ctx);
      }

      async asGenesisKeyDelegation(): Promise<Optional<WasmContract.GenesisKeyDelegation>> {
        const ret = await this.wasm.as_genesis_key_delegation();
        if (ret == null) return undefined;
        return new $outer.GenesisKeyDelegation(ret, $outer._ctx);
      }

      async asMoveInstantaneousRewardsCert(): Promise<Optional<WasmContract.MoveInstantaneousRewardsCert>> {
        const ret = await this.wasm.as_move_instantaneous_rewards_cert();
        if (ret == null) return undefined;
        return new $outer.MoveInstantaneousRewardsCert(ret, $outer._ctx);
      }

      async asCommitteeHotAuth(): Promise<Optional<WasmContract.CommitteeHotAuth>> {
        const ret = await this.wasm.as_committee_hot_auth();
        if (ret == null) return undefined;
        return new $outer.CommitteeHotAuth(ret, $outer._ctx);
      }

      async asCommitteeColdResign(): Promise<Optional<WasmContract.CommitteeColdResign>> {
        const ret = await this.wasm.as_committee_cold_resign();
        if (ret == null) return undefined;
        return new $outer.CommitteeColdResign(ret, $outer._ctx);
      }

      async asDrepDeregistration(): Promise<Optional<WasmContract.DrepDeregistration>> {
        const ret = await this.wasm.as_drep_deregistration();
        if (ret == null) return undefined;
        return new $outer.DrepDeregistration(ret, $outer._ctx);
      }

      async asDrepRegistration(): Promise<Optional<WasmContract.DrepRegistration>> {
        const ret = await this.wasm.as_drep_registration();
        if (ret == null) return undefined;
        return new $outer.DrepRegistration(ret, $outer._ctx);
      }

      async asDrepUpdate(): Promise<Optional<WasmContract.DrepUpdate>> {
        const ret = await this.wasm.as_drep_update();
        if (ret == null) return undefined;
        return new $outer.DrepUpdate(ret, $outer._ctx);
      }

      async asStakeAndVoteDelegation(): Promise<Optional<WasmContract.StakeAndVoteDelegation>> {
        const ret = await this.wasm.as_stake_and_vote_delegation();
        if (ret == null) return undefined;
        return new $outer.StakeAndVoteDelegation(ret, $outer._ctx);
      }

      async asStakeRegistrationAndDelegation(): Promise<Optional<WasmContract.StakeRegistrationAndDelegation>> {
        const ret = await this.wasm.as_stake_registration_and_delegation();
        if (ret == null) return undefined;
        return new $outer.StakeRegistrationAndDelegation(ret, $outer._ctx);
      }

      async asStakeVoteRegistrationAndDelegation(): Promise<Optional<WasmContract.StakeVoteRegistrationAndDelegation>> {
        const ret = await this.wasm.as_stake_vote_registration_and_delegation();
        if (ret == null) return undefined;
        return new $outer.StakeVoteRegistrationAndDelegation(ret, $outer._ctx);
      }

      async asVoteDelegation(): Promise<Optional<WasmContract.VoteDelegation>> {
        const ret = await this.wasm.as_vote_delegation();
        if (ret == null) return undefined;
        return new $outer.VoteDelegation(ret, $outer._ctx);
      }

      async asVoteRegistrationAndDelegation(): Promise<Optional<WasmContract.VoteRegistrationAndDelegation>> {
        const ret = await this.wasm.as_vote_registration_and_delegation();
        if (ret == null) return undefined;
        return new $outer.VoteRegistrationAndDelegation(ret, $outer._ctx);
      }

      hasRequiredScriptWitness(): Promise<boolean> {
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Certificates> {
        const ret = await WasmV4.Certificates.from_bytes(bytes);
        return new $outer.Certificates(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Certificates> {
        const ret = await WasmV4.Certificates.from_hex(hexStr);
        return new $outer.Certificates(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.Certificates> {
        const ret = await WasmV4.Certificates.from_json(json);
        return new $outer.Certificates(ret, $outer._ctx);
      }

      static async new(): Promise<WasmContract.Certificates> {
        const ret = await WasmV4.Certificates.new();
        return new $outer.Certificates(ret, $outer._ctx);
      }

      len(): Promise<number> {
        return this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.Certificate> {
        const ret = await this.wasm.get(index);
        return new $outer.Certificate(ret, $outer._ctx);
      }

      add(elem: WasmContract.Certificate): Promise<void> {
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

      static async new(): Promise<WasmContract.CertificatesBuilder> {
        const ret = await WasmV4.CertificatesBuilder.new();
        return new $outer.CertificatesBuilder(ret, $outer._ctx);
      }

      add(cert: WasmContract.Certificate): Promise<void> {
        return this.wasm.add(cert.wasm);
      }

      addWithPlutusWitness(cert: WasmContract.Certificate, witness: WasmContract.PlutusWitness): Promise<void> {
        return this.wasm.add_with_plutus_witness(cert.wasm, witness.wasm);
      }

      addWithNativeScript(cert: WasmContract.Certificate, nativeScriptSource: WasmContract.NativeScriptSource): Promise<void> {
        return this.wasm.add_with_native_script(cert.wasm, nativeScriptSource.wasm);
      }

      async getPlutusWitnesses(): Promise<WasmContract.PlutusWitnesses> {
        const ret = await this.wasm.get_plutus_witnesses();
        return new $outer.PlutusWitnesses(ret, $outer._ctx);
      }

      async getRefInputs(): Promise<WasmContract.TransactionInputs> {
        const ret = await this.wasm.get_ref_inputs();
        return new $outer.TransactionInputs(ret, $outer._ctx);
      }

      async getNativeScripts(): Promise<WasmContract.NativeScripts> {
        const ret = await this.wasm.get_native_scripts();
        return new $outer.NativeScripts(ret, $outer._ctx);
      }

      async getCertificatesRefund(poolDeposit: WasmContract.BigNum, keyDeposit: WasmContract.BigNum): Promise<WasmContract.Value> {
        const ret = await this.wasm.get_certificates_refund(poolDeposit.wasm, keyDeposit.wasm);
        return new $outer.Value(ret, $outer._ctx);
      }

      async getCertificatesDeposit(poolDeposit: WasmContract.BigNum, keyDeposit: WasmContract.BigNum): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.get_certificates_deposit(poolDeposit.wasm, keyDeposit.wasm);
        return new $outer.BigNum(ret, $outer._ctx);
      }

      hasPlutusScripts(): Promise<boolean> {
        return this.wasm.has_plutus_scripts();
      }

      async build(): Promise<WasmContract.Certificates> {
        const ret = await this.wasm.build();
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

      static async new(address: WasmContract.Address): Promise<WasmContract.ChangeConfig> {
        const ret = await WasmV4.ChangeConfig.new(address.wasm);
        return new $outer.ChangeConfig(ret, $outer._ctx);
      }

      async changeAddress(address: WasmContract.Address): Promise<WasmContract.ChangeConfig> {
        const ret = await this.wasm.change_address(address.wasm);
        return new $outer.ChangeConfig(ret, $outer._ctx);
      }

      async changePlutusData(plutusData: WasmContract.OutputDatum): Promise<WasmContract.ChangeConfig> {
        const ret = await this.wasm.change_plutus_data(plutusData.wasm);
        return new $outer.ChangeConfig(ret, $outer._ctx);
      }

      async changeScriptRef(scriptRef: WasmContract.ScriptRef): Promise<WasmContract.ChangeConfig> {
        const ret = await this.wasm.change_script_ref(scriptRef.wasm);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Committee> {
        const ret = await WasmV4.Committee.from_bytes(bytes);
        return new $outer.Committee(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Committee> {
        const ret = await WasmV4.Committee.from_hex(hexStr);
        return new $outer.Committee(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.Committee> {
        const ret = await WasmV4.Committee.from_json(json);
        return new $outer.Committee(ret, $outer._ctx);
      }

      static async new(quorumThreshold: WasmContract.UnitInterval): Promise<WasmContract.Committee> {
        const ret = await WasmV4.Committee.new(quorumThreshold.wasm);
        return new $outer.Committee(ret, $outer._ctx);
      }

      async membersKeys(): Promise<WasmContract.Credentials> {
        const ret = await this.wasm.members_keys();
        return new $outer.Credentials(ret, $outer._ctx);
      }

      async quorumThreshold(): Promise<WasmContract.UnitInterval> {
        const ret = await this.wasm.quorum_threshold();
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      addMember(committeeColdCredential: WasmContract.Credential, epoch: number): Promise<void> {
        return this.wasm.add_member(committeeColdCredential.wasm, epoch);
      }

      getMemberEpoch(committeeColdCredential: WasmContract.Credential): Promise<Optional<number>> {
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.CommitteeColdResign> {
        const ret = await WasmV4.CommitteeColdResign.from_bytes(bytes);
        return new $outer.CommitteeColdResign(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.CommitteeColdResign> {
        const ret = await WasmV4.CommitteeColdResign.from_hex(hexStr);
        return new $outer.CommitteeColdResign(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.CommitteeColdResign> {
        const ret = await WasmV4.CommitteeColdResign.from_json(json);
        return new $outer.CommitteeColdResign(ret, $outer._ctx);
      }

      async committeeColdKey(): Promise<WasmContract.Credential> {
        const ret = await this.wasm.committee_cold_key();
        return new $outer.Credential(ret, $outer._ctx);
      }

      async anchor(): Promise<Optional<WasmContract.Anchor>> {
        const ret = await this.wasm.anchor();
        if (ret == null) return undefined;
        return new $outer.Anchor(ret, $outer._ctx);
      }

      static async new(committeeColdKey: WasmContract.Credential): Promise<WasmContract.CommitteeColdResign> {
        const ret = await WasmV4.CommitteeColdResign.new(committeeColdKey.wasm);
        return new $outer.CommitteeColdResign(ret, $outer._ctx);
      }

      static async newWithAnchor(committeeColdKey: WasmContract.Credential, anchor: WasmContract.Anchor): Promise<WasmContract.CommitteeColdResign> {
        const ret = await WasmV4.CommitteeColdResign.new_with_anchor(committeeColdKey.wasm, anchor.wasm);
        return new $outer.CommitteeColdResign(ret, $outer._ctx);
      }

      hasScriptCredentials(): Promise<boolean> {
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.CommitteeHotAuth> {
        const ret = await WasmV4.CommitteeHotAuth.from_bytes(bytes);
        return new $outer.CommitteeHotAuth(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.CommitteeHotAuth> {
        const ret = await WasmV4.CommitteeHotAuth.from_hex(hexStr);
        return new $outer.CommitteeHotAuth(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.CommitteeHotAuth> {
        const ret = await WasmV4.CommitteeHotAuth.from_json(json);
        return new $outer.CommitteeHotAuth(ret, $outer._ctx);
      }

      async committeeColdKey(): Promise<WasmContract.Credential> {
        const ret = await this.wasm.committee_cold_key();
        return new $outer.Credential(ret, $outer._ctx);
      }

      async committeeHotKey(): Promise<WasmContract.Credential> {
        const ret = await this.wasm.committee_hot_key();
        return new $outer.Credential(ret, $outer._ctx);
      }

      static async new(committeeColdKey: WasmContract.Credential, committeeHotKey: WasmContract.Credential): Promise<WasmContract.CommitteeHotAuth> {
        const ret = await WasmV4.CommitteeHotAuth.new(committeeColdKey.wasm, committeeHotKey.wasm);
        return new $outer.CommitteeHotAuth(ret, $outer._ctx);
      }

      hasScriptCredentials(): Promise<boolean> {
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Constitution> {
        const ret = await WasmV4.Constitution.from_bytes(bytes);
        return new $outer.Constitution(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Constitution> {
        const ret = await WasmV4.Constitution.from_hex(hexStr);
        return new $outer.Constitution(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.Constitution> {
        const ret = await WasmV4.Constitution.from_json(json);
        return new $outer.Constitution(ret, $outer._ctx);
      }

      async anchor(): Promise<WasmContract.Anchor> {
        const ret = await this.wasm.anchor();
        return new $outer.Anchor(ret, $outer._ctx);
      }

      async scriptHash(): Promise<Optional<WasmContract.ScriptHash>> {
        const ret = await this.wasm.script_hash();
        if (ret == null) return undefined;
        return new $outer.ScriptHash(ret, $outer._ctx);
      }

      static async new(anchor: WasmContract.Anchor): Promise<WasmContract.Constitution> {
        const ret = await WasmV4.Constitution.new(anchor.wasm);
        return new $outer.Constitution(ret, $outer._ctx);
      }

      static async newWithScriptHash(anchor: WasmContract.Anchor, scriptHash: WasmContract.ScriptHash): Promise<WasmContract.Constitution> {
        const ret = await WasmV4.Constitution.new_with_script_hash(anchor.wasm, scriptHash.wasm);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.ConstrPlutusData> {
        const ret = await WasmV4.ConstrPlutusData.from_bytes(bytes);
        return new $outer.ConstrPlutusData(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.ConstrPlutusData> {
        const ret = await WasmV4.ConstrPlutusData.from_hex(hexStr);
        return new $outer.ConstrPlutusData(ret, $outer._ctx);
      }

      async alternative(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.alternative();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      async data(): Promise<WasmContract.PlutusList> {
        const ret = await this.wasm.data();
        return new $outer.PlutusList(ret, $outer._ctx);
      }

      static async new(alternative: WasmContract.BigNum, data: WasmContract.PlutusList): Promise<WasmContract.ConstrPlutusData> {
        const ret = await WasmV4.ConstrPlutusData.new(alternative.wasm, data.wasm);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.CostModel> {
        const ret = await WasmV4.CostModel.from_bytes(bytes);
        return new $outer.CostModel(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.CostModel> {
        const ret = await WasmV4.CostModel.from_hex(hexStr);
        return new $outer.CostModel(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.CostModel> {
        const ret = await WasmV4.CostModel.from_json(json);
        return new $outer.CostModel(ret, $outer._ctx);
      }

      static async new(): Promise<WasmContract.CostModel> {
        const ret = await WasmV4.CostModel.new();
        return new $outer.CostModel(ret, $outer._ctx);
      }

      async set(operation: number, cost: WasmContract.Int): Promise<WasmContract.Int> {
        const ret = await this.wasm.set(operation, cost.wasm);
        return new $outer.Int(ret, $outer._ctx);
      }

      async get(operation: number): Promise<WasmContract.Int> {
        const ret = await this.wasm.get(operation);
        return new $outer.Int(ret, $outer._ctx);
      }

      len(): Promise<number> {
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Costmdls> {
        const ret = await WasmV4.Costmdls.from_bytes(bytes);
        return new $outer.Costmdls(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Costmdls> {
        const ret = await WasmV4.Costmdls.from_hex(hexStr);
        return new $outer.Costmdls(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.Costmdls> {
        const ret = await WasmV4.Costmdls.from_json(json);
        return new $outer.Costmdls(ret, $outer._ctx);
      }

      static async new(): Promise<WasmContract.Costmdls> {
        const ret = await WasmV4.Costmdls.new();
        return new $outer.Costmdls(ret, $outer._ctx);
      }

      len(): Promise<number> {
        return this.wasm.len();
      }

      async insert(key: WasmContract.Language, value: WasmContract.CostModel): Promise<Optional<WasmContract.CostModel>> {
        const ret = await this.wasm.insert(key.wasm, value.wasm);
        if (ret == null) return undefined;
        return new $outer.CostModel(ret, $outer._ctx);
      }

      async get(key: WasmContract.Language): Promise<Optional<WasmContract.CostModel>> {
        const ret = await this.wasm.get(key.wasm);
        if (ret == null) return undefined;
        return new $outer.CostModel(ret, $outer._ctx);
      }

      async keys(): Promise<WasmContract.Languages> {
        const ret = await this.wasm.keys();
        return new $outer.Languages(ret, $outer._ctx);
      }

      async retainLanguageVersions(languages: WasmContract.Languages): Promise<WasmContract.Costmdls> {
        const ret = await this.wasm.retain_language_versions(languages.wasm);
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

      static async fromKeyhash(hash: WasmContract.Ed25519KeyHash): Promise<WasmContract.Credential> {
        const ret = await WasmV4.Credential.from_keyhash(hash.wasm);
        return new $outer.Credential(ret, $outer._ctx);
      }

      static async fromScripthash(hash: WasmContract.ScriptHash): Promise<WasmContract.Credential> {
        const ret = await WasmV4.Credential.from_scripthash(hash.wasm);
        return new $outer.Credential(ret, $outer._ctx);
      }

      async toKeyhash(): Promise<Optional<WasmContract.Ed25519KeyHash>> {
        const ret = await this.wasm.to_keyhash();
        if (ret == null) return undefined;
        return new $outer.Ed25519KeyHash(ret, $outer._ctx);
      }

      async toScripthash(): Promise<Optional<WasmContract.ScriptHash>> {
        const ret = await this.wasm.to_scripthash();
        if (ret == null) return undefined;
        return new $outer.ScriptHash(ret, $outer._ctx);
      }

      kind(): Promise<WasmContract.CredKind> {
        return this.wasm.kind();
      }

      hasScriptHash(): Promise<boolean> {
        return this.wasm.has_script_hash();
      }

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Credential> {
        const ret = await WasmV4.Credential.from_bytes(bytes);
        return new $outer.Credential(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Credential> {
        const ret = await WasmV4.Credential.from_hex(hexStr);
        return new $outer.Credential(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.Credential> {
        const ret = await WasmV4.Credential.from_json(json);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Credentials> {
        const ret = await WasmV4.Credentials.from_bytes(bytes);
        return new $outer.Credentials(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Credentials> {
        const ret = await WasmV4.Credentials.from_hex(hexStr);
        return new $outer.Credentials(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.Credentials> {
        const ret = await WasmV4.Credentials.from_json(json);
        return new $outer.Credentials(ret, $outer._ctx);
      }

      static async new(): Promise<WasmContract.Credentials> {
        const ret = await WasmV4.Credentials.new();
        return new $outer.Credentials(ret, $outer._ctx);
      }

      len(): Promise<number> {
        return this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.Credential> {
        const ret = await this.wasm.get(index);
        return new $outer.Credential(ret, $outer._ctx);
      }

      add(elem: WasmContract.Credential): Promise<void> {
        return this.wasm.add(elem.wasm);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.DNSRecordAorAAAA> {
        const ret = await WasmV4.DNSRecordAorAAAA.from_bytes(bytes);
        return new $outer.DNSRecordAorAAAA(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.DNSRecordAorAAAA> {
        const ret = await WasmV4.DNSRecordAorAAAA.from_hex(hexStr);
        return new $outer.DNSRecordAorAAAA(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.DNSRecordAorAAAA> {
        const ret = await WasmV4.DNSRecordAorAAAA.from_json(json);
        return new $outer.DNSRecordAorAAAA(ret, $outer._ctx);
      }

      static async new(dnsName: string): Promise<WasmContract.DNSRecordAorAAAA> {
        const ret = await WasmV4.DNSRecordAorAAAA.new(dnsName);
        return new $outer.DNSRecordAorAAAA(ret, $outer._ctx);
      }

      record(): Promise<string> {
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.DNSRecordSRV> {
        const ret = await WasmV4.DNSRecordSRV.from_bytes(bytes);
        return new $outer.DNSRecordSRV(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.DNSRecordSRV> {
        const ret = await WasmV4.DNSRecordSRV.from_hex(hexStr);
        return new $outer.DNSRecordSRV(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.DNSRecordSRV> {
        const ret = await WasmV4.DNSRecordSRV.from_json(json);
        return new $outer.DNSRecordSRV(ret, $outer._ctx);
      }

      static async new(dnsName: string): Promise<WasmContract.DNSRecordSRV> {
        const ret = await WasmV4.DNSRecordSRV.new(dnsName);
        return new $outer.DNSRecordSRV(ret, $outer._ctx);
      }

      record(): Promise<string> {
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.DRep> {
        const ret = await WasmV4.DRep.from_bytes(bytes);
        return new $outer.DRep(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.DRep> {
        const ret = await WasmV4.DRep.from_hex(hexStr);
        return new $outer.DRep(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.DRep> {
        const ret = await WasmV4.DRep.from_json(json);
        return new $outer.DRep(ret, $outer._ctx);
      }

      static async newKeyHash(keyHash: WasmContract.Ed25519KeyHash): Promise<WasmContract.DRep> {
        const ret = await WasmV4.DRep.new_key_hash(keyHash.wasm);
        return new $outer.DRep(ret, $outer._ctx);
      }

      static async newScriptHash(scriptHash: WasmContract.ScriptHash): Promise<WasmContract.DRep> {
        const ret = await WasmV4.DRep.new_script_hash(scriptHash.wasm);
        return new $outer.DRep(ret, $outer._ctx);
      }

      static async newAlwaysAbstain(): Promise<WasmContract.DRep> {
        const ret = await WasmV4.DRep.new_always_abstain();
        return new $outer.DRep(ret, $outer._ctx);
      }

      static async newAlwaysNoConfidence(): Promise<WasmContract.DRep> {
        const ret = await WasmV4.DRep.new_always_no_confidence();
        return new $outer.DRep(ret, $outer._ctx);
      }

      kind(): Promise<WasmContract.DRepKind> {
        return this.wasm.kind();
      }

      async toKeyHash(): Promise<Optional<WasmContract.Ed25519KeyHash>> {
        const ret = await this.wasm.to_key_hash();
        if (ret == null) return undefined;
        return new $outer.Ed25519KeyHash(ret, $outer._ctx);
      }

      async toScriptHash(): Promise<Optional<WasmContract.ScriptHash>> {
        const ret = await this.wasm.to_script_hash();
        if (ret == null) return undefined;
        return new $outer.ScriptHash(ret, $outer._ctx);
      }

    }
    return DRep;
  })();

  public DataCost = (() => {
    const $outer = this;

    class DataCost
      extends Ptr<WasmV4.DataCost>
      implements WasmContract.DataCost
    {

      static async newCoinsPerByte(coinsPerByte: WasmContract.BigNum): Promise<WasmContract.DataCost> {
        const ret = await WasmV4.DataCost.new_coins_per_byte(coinsPerByte.wasm);
        return new $outer.DataCost(ret, $outer._ctx);
      }

      async coinsPerByte(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.coins_per_byte();
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

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.DataHash> {
        const ret = await WasmV4.DataHash.from_bytes(bytes);
        return new $outer.DataHash(ret, $outer._ctx);
      }

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      toBech32(prefix: string): Promise<string> {
        return this.wasm.to_bech32(prefix);
      }

      static async fromBech32(bechStr: string): Promise<WasmContract.DataHash> {
        const ret = await WasmV4.DataHash.from_bech32(bechStr);
        return new $outer.DataHash(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hex: string): Promise<WasmContract.DataHash> {
        const ret = await WasmV4.DataHash.from_hex(hex);
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

      static async new(datum: WasmContract.PlutusData): Promise<WasmContract.DatumSource> {
        const ret = await WasmV4.DatumSource.new(datum.wasm);
        return new $outer.DatumSource(ret, $outer._ctx);
      }

      static async newRefInput(input: WasmContract.TransactionInput): Promise<WasmContract.DatumSource> {
        const ret = await WasmV4.DatumSource.new_ref_input(input.wasm);
        return new $outer.DatumSource(ret, $outer._ctx);
      }

    }
    return DatumSource;
  })();

  public DrepDeregistration = (() => {
    const $outer = this;

    class DrepDeregistration
      extends Ptr<WasmV4.DrepDeregistration>
      implements WasmContract.DrepDeregistration
    {

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.DrepDeregistration> {
        const ret = await WasmV4.DrepDeregistration.from_bytes(bytes);
        return new $outer.DrepDeregistration(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.DrepDeregistration> {
        const ret = await WasmV4.DrepDeregistration.from_hex(hexStr);
        return new $outer.DrepDeregistration(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.DrepDeregistration> {
        const ret = await WasmV4.DrepDeregistration.from_json(json);
        return new $outer.DrepDeregistration(ret, $outer._ctx);
      }

      async votingCredential(): Promise<WasmContract.Credential> {
        const ret = await this.wasm.voting_credential();
        return new $outer.Credential(ret, $outer._ctx);
      }

      async coin(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.coin();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      static async new(votingCredential: WasmContract.Credential, coin: WasmContract.BigNum): Promise<WasmContract.DrepDeregistration> {
        const ret = await WasmV4.DrepDeregistration.new(votingCredential.wasm, coin.wasm);
        return new $outer.DrepDeregistration(ret, $outer._ctx);
      }

      hasScriptCredentials(): Promise<boolean> {
        return this.wasm.has_script_credentials();
      }

    }
    return DrepDeregistration;
  })();

  public DrepRegistration = (() => {
    const $outer = this;

    class DrepRegistration
      extends Ptr<WasmV4.DrepRegistration>
      implements WasmContract.DrepRegistration
    {

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.DrepRegistration> {
        const ret = await WasmV4.DrepRegistration.from_bytes(bytes);
        return new $outer.DrepRegistration(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.DrepRegistration> {
        const ret = await WasmV4.DrepRegistration.from_hex(hexStr);
        return new $outer.DrepRegistration(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.DrepRegistration> {
        const ret = await WasmV4.DrepRegistration.from_json(json);
        return new $outer.DrepRegistration(ret, $outer._ctx);
      }

      async votingCredential(): Promise<WasmContract.Credential> {
        const ret = await this.wasm.voting_credential();
        return new $outer.Credential(ret, $outer._ctx);
      }

      async coin(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.coin();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      async anchor(): Promise<Optional<WasmContract.Anchor>> {
        const ret = await this.wasm.anchor();
        if (ret == null) return undefined;
        return new $outer.Anchor(ret, $outer._ctx);
      }

      static async new(votingCredential: WasmContract.Credential, coin: WasmContract.BigNum): Promise<WasmContract.DrepRegistration> {
        const ret = await WasmV4.DrepRegistration.new(votingCredential.wasm, coin.wasm);
        return new $outer.DrepRegistration(ret, $outer._ctx);
      }

      static async newWithAnchor(votingCredential: WasmContract.Credential, coin: WasmContract.BigNum, anchor: WasmContract.Anchor): Promise<WasmContract.DrepRegistration> {
        const ret = await WasmV4.DrepRegistration.new_with_anchor(votingCredential.wasm, coin.wasm, anchor.wasm);
        return new $outer.DrepRegistration(ret, $outer._ctx);
      }

      hasScriptCredentials(): Promise<boolean> {
        return this.wasm.has_script_credentials();
      }

    }
    return DrepRegistration;
  })();

  public DrepUpdate = (() => {
    const $outer = this;

    class DrepUpdate
      extends Ptr<WasmV4.DrepUpdate>
      implements WasmContract.DrepUpdate
    {

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.DrepUpdate> {
        const ret = await WasmV4.DrepUpdate.from_bytes(bytes);
        return new $outer.DrepUpdate(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.DrepUpdate> {
        const ret = await WasmV4.DrepUpdate.from_hex(hexStr);
        return new $outer.DrepUpdate(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.DrepUpdate> {
        const ret = await WasmV4.DrepUpdate.from_json(json);
        return new $outer.DrepUpdate(ret, $outer._ctx);
      }

      async votingCredential(): Promise<WasmContract.Credential> {
        const ret = await this.wasm.voting_credential();
        return new $outer.Credential(ret, $outer._ctx);
      }

      async anchor(): Promise<Optional<WasmContract.Anchor>> {
        const ret = await this.wasm.anchor();
        if (ret == null) return undefined;
        return new $outer.Anchor(ret, $outer._ctx);
      }

      static async new(votingCredential: WasmContract.Credential): Promise<WasmContract.DrepUpdate> {
        const ret = await WasmV4.DrepUpdate.new(votingCredential.wasm);
        return new $outer.DrepUpdate(ret, $outer._ctx);
      }

      static async newWithAnchor(votingCredential: WasmContract.Credential, anchor: WasmContract.Anchor): Promise<WasmContract.DrepUpdate> {
        const ret = await WasmV4.DrepUpdate.new_with_anchor(votingCredential.wasm, anchor.wasm);
        return new $outer.DrepUpdate(ret, $outer._ctx);
      }

      hasScriptCredentials(): Promise<boolean> {
        return this.wasm.has_script_credentials();
      }

    }
    return DrepUpdate;
  })();

  public DrepVotingThresholds = (() => {
    const $outer = this;

    class DrepVotingThresholds
      extends Ptr<WasmV4.DrepVotingThresholds>
      implements WasmContract.DrepVotingThresholds
    {

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.DrepVotingThresholds> {
        const ret = await WasmV4.DrepVotingThresholds.from_bytes(bytes);
        return new $outer.DrepVotingThresholds(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.DrepVotingThresholds> {
        const ret = await WasmV4.DrepVotingThresholds.from_hex(hexStr);
        return new $outer.DrepVotingThresholds(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.DrepVotingThresholds> {
        const ret = await WasmV4.DrepVotingThresholds.from_json(json);
        return new $outer.DrepVotingThresholds(ret, $outer._ctx);
      }

      static async new(motionNoConfidence: WasmContract.UnitInterval, committeeNormal: WasmContract.UnitInterval, committeeNoConfidence: WasmContract.UnitInterval, updateConstitution: WasmContract.UnitInterval, hardForkInitiation: WasmContract.UnitInterval, ppNetworkGroup: WasmContract.UnitInterval, ppEconomicGroup: WasmContract.UnitInterval, ppTechnicalGroup: WasmContract.UnitInterval, ppGovernanceGroup: WasmContract.UnitInterval, treasuryWithdrawal: WasmContract.UnitInterval): Promise<WasmContract.DrepVotingThresholds> {
        const ret = await WasmV4.DrepVotingThresholds.new(motionNoConfidence.wasm, committeeNormal.wasm, committeeNoConfidence.wasm, updateConstitution.wasm, hardForkInitiation.wasm, ppNetworkGroup.wasm, ppEconomicGroup.wasm, ppTechnicalGroup.wasm, ppGovernanceGroup.wasm, treasuryWithdrawal.wasm);
        return new $outer.DrepVotingThresholds(ret, $outer._ctx);
      }

      static async newDefault(): Promise<WasmContract.DrepVotingThresholds> {
        const ret = await WasmV4.DrepVotingThresholds.new_default();
        return new $outer.DrepVotingThresholds(ret, $outer._ctx);
      }

      setMotionNoConfidence(motionNoConfidence: WasmContract.UnitInterval): Promise<void> {
        return this.wasm.set_motion_no_confidence(motionNoConfidence.wasm);
      }

      setCommitteeNormal(committeeNormal: WasmContract.UnitInterval): Promise<void> {
        return this.wasm.set_committee_normal(committeeNormal.wasm);
      }

      setCommitteeNoConfidence(committeeNoConfidence: WasmContract.UnitInterval): Promise<void> {
        return this.wasm.set_committee_no_confidence(committeeNoConfidence.wasm);
      }

      setUpdateConstitution(updateConstitution: WasmContract.UnitInterval): Promise<void> {
        return this.wasm.set_update_constitution(updateConstitution.wasm);
      }

      setHardForkInitiation(hardForkInitiation: WasmContract.UnitInterval): Promise<void> {
        return this.wasm.set_hard_fork_initiation(hardForkInitiation.wasm);
      }

      setPpNetworkGroup(ppNetworkGroup: WasmContract.UnitInterval): Promise<void> {
        return this.wasm.set_pp_network_group(ppNetworkGroup.wasm);
      }

      setPpEconomicGroup(ppEconomicGroup: WasmContract.UnitInterval): Promise<void> {
        return this.wasm.set_pp_economic_group(ppEconomicGroup.wasm);
      }

      setPpTechnicalGroup(ppTechnicalGroup: WasmContract.UnitInterval): Promise<void> {
        return this.wasm.set_pp_technical_group(ppTechnicalGroup.wasm);
      }

      setPpGovernanceGroup(ppGovernanceGroup: WasmContract.UnitInterval): Promise<void> {
        return this.wasm.set_pp_governance_group(ppGovernanceGroup.wasm);
      }

      setTreasuryWithdrawal(treasuryWithdrawal: WasmContract.UnitInterval): Promise<void> {
        return this.wasm.set_treasury_withdrawal(treasuryWithdrawal.wasm);
      }

      async motionNoConfidence(): Promise<WasmContract.UnitInterval> {
        const ret = await this.wasm.motion_no_confidence();
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      async committeeNormal(): Promise<WasmContract.UnitInterval> {
        const ret = await this.wasm.committee_normal();
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      async committeeNoConfidence(): Promise<WasmContract.UnitInterval> {
        const ret = await this.wasm.committee_no_confidence();
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      async updateConstitution(): Promise<WasmContract.UnitInterval> {
        const ret = await this.wasm.update_constitution();
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      async hardForkInitiation(): Promise<WasmContract.UnitInterval> {
        const ret = await this.wasm.hard_fork_initiation();
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      async ppNetworkGroup(): Promise<WasmContract.UnitInterval> {
        const ret = await this.wasm.pp_network_group();
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      async ppEconomicGroup(): Promise<WasmContract.UnitInterval> {
        const ret = await this.wasm.pp_economic_group();
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      async ppTechnicalGroup(): Promise<WasmContract.UnitInterval> {
        const ret = await this.wasm.pp_technical_group();
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      async ppGovernanceGroup(): Promise<WasmContract.UnitInterval> {
        const ret = await this.wasm.pp_governance_group();
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      async treasuryWithdrawal(): Promise<WasmContract.UnitInterval> {
        const ret = await this.wasm.treasury_withdrawal();
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

    }
    return DrepVotingThresholds;
  })();

  public Ed25519KeyHash = (() => {
    const $outer = this;

    class Ed25519KeyHash
      extends Ptr<WasmV4.Ed25519KeyHash>
      implements WasmContract.Ed25519KeyHash
    {

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Ed25519KeyHash> {
        const ret = await WasmV4.Ed25519KeyHash.from_bytes(bytes);
        return new $outer.Ed25519KeyHash(ret, $outer._ctx);
      }

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      toBech32(prefix: string): Promise<string> {
        return this.wasm.to_bech32(prefix);
      }

      static async fromBech32(bechStr: string): Promise<WasmContract.Ed25519KeyHash> {
        const ret = await WasmV4.Ed25519KeyHash.from_bech32(bechStr);
        return new $outer.Ed25519KeyHash(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hex: string): Promise<WasmContract.Ed25519KeyHash> {
        const ret = await WasmV4.Ed25519KeyHash.from_hex(hex);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Ed25519KeyHashes> {
        const ret = await WasmV4.Ed25519KeyHashes.from_bytes(bytes);
        return new $outer.Ed25519KeyHashes(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Ed25519KeyHashes> {
        const ret = await WasmV4.Ed25519KeyHashes.from_hex(hexStr);
        return new $outer.Ed25519KeyHashes(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.Ed25519KeyHashes> {
        const ret = await WasmV4.Ed25519KeyHashes.from_json(json);
        return new $outer.Ed25519KeyHashes(ret, $outer._ctx);
      }

      static async new(): Promise<WasmContract.Ed25519KeyHashes> {
        const ret = await WasmV4.Ed25519KeyHashes.new();
        return new $outer.Ed25519KeyHashes(ret, $outer._ctx);
      }

      len(): Promise<number> {
        return this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.Ed25519KeyHash> {
        const ret = await this.wasm.get(index);
        return new $outer.Ed25519KeyHash(ret, $outer._ctx);
      }

      add(elem: WasmContract.Ed25519KeyHash): Promise<void> {
        return this.wasm.add(elem.wasm);
      }

      contains(elem: WasmContract.Ed25519KeyHash): Promise<boolean> {
        return this.wasm.contains(elem.wasm);
      }

      async toOption(): Promise<Optional<WasmContract.Ed25519KeyHashes>> {
        const ret = await this.wasm.to_option();
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      toBech32(): Promise<string> {
        return this.wasm.to_bech32();
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromBech32(bech32Str: string): Promise<WasmContract.Ed25519Signature> {
        const ret = await WasmV4.Ed25519Signature.from_bech32(bech32Str);
        return new $outer.Ed25519Signature(ret, $outer._ctx);
      }

      static async fromHex(input: string): Promise<WasmContract.Ed25519Signature> {
        const ret = await WasmV4.Ed25519Signature.from_hex(input);
        return new $outer.Ed25519Signature(ret, $outer._ctx);
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Ed25519Signature> {
        const ret = await WasmV4.Ed25519Signature.from_bytes(bytes);
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

      static async new(network: number, payment: WasmContract.Credential): Promise<WasmContract.EnterpriseAddress> {
        const ret = await WasmV4.EnterpriseAddress.new(network, payment.wasm);
        return new $outer.EnterpriseAddress(ret, $outer._ctx);
      }

      async paymentCred(): Promise<WasmContract.Credential> {
        const ret = await this.wasm.payment_cred();
        return new $outer.Credential(ret, $outer._ctx);
      }

      async toAddress(): Promise<WasmContract.Address> {
        const ret = await this.wasm.to_address();
        return new $outer.Address(ret, $outer._ctx);
      }

      static async fromAddress(addr: WasmContract.Address): Promise<Optional<WasmContract.EnterpriseAddress>> {
        const ret = await WasmV4.EnterpriseAddress.from_address(addr.wasm);
        if (ret == null) return undefined;
        return new $outer.EnterpriseAddress(ret, $outer._ctx);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.ExUnitPrices> {
        const ret = await WasmV4.ExUnitPrices.from_bytes(bytes);
        return new $outer.ExUnitPrices(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.ExUnitPrices> {
        const ret = await WasmV4.ExUnitPrices.from_hex(hexStr);
        return new $outer.ExUnitPrices(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.ExUnitPrices> {
        const ret = await WasmV4.ExUnitPrices.from_json(json);
        return new $outer.ExUnitPrices(ret, $outer._ctx);
      }

      async memPrice(): Promise<WasmContract.UnitInterval> {
        const ret = await this.wasm.mem_price();
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      async stepPrice(): Promise<WasmContract.UnitInterval> {
        const ret = await this.wasm.step_price();
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      static async new(memPrice: WasmContract.UnitInterval, stepPrice: WasmContract.UnitInterval): Promise<WasmContract.ExUnitPrices> {
        const ret = await WasmV4.ExUnitPrices.new(memPrice.wasm, stepPrice.wasm);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.ExUnits> {
        const ret = await WasmV4.ExUnits.from_bytes(bytes);
        return new $outer.ExUnits(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.ExUnits> {
        const ret = await WasmV4.ExUnits.from_hex(hexStr);
        return new $outer.ExUnits(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.ExUnits> {
        const ret = await WasmV4.ExUnits.from_json(json);
        return new $outer.ExUnits(ret, $outer._ctx);
      }

      async mem(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.mem();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      async steps(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.steps();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      static async new(mem: WasmContract.BigNum, steps: WasmContract.BigNum): Promise<WasmContract.ExUnits> {
        const ret = await WasmV4.ExUnits.new(mem.wasm, steps.wasm);
        return new $outer.ExUnits(ret, $outer._ctx);
      }

    }
    return ExUnits;
  })();

  public FixedTransaction = (() => {
    const $outer = this;

    class FixedTransaction
      extends Ptr<WasmV4.FixedTransaction>
      implements WasmContract.FixedTransaction
    {

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.FixedTransaction> {
        const ret = await WasmV4.FixedTransaction.from_bytes(bytes);
        return new $outer.FixedTransaction(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.FixedTransaction> {
        const ret = await WasmV4.FixedTransaction.from_hex(hexStr);
        return new $outer.FixedTransaction(ret, $outer._ctx);
      }

      static async new(rawBody: Uint8Array, rawWitnessSet: Uint8Array, isValid: boolean): Promise<WasmContract.FixedTransaction> {
        const ret = await WasmV4.FixedTransaction.new(rawBody, rawWitnessSet, isValid);
        return new $outer.FixedTransaction(ret, $outer._ctx);
      }

      static async newWithAuxiliary(rawBody: Uint8Array, rawWitnessSet: Uint8Array, rawAuxiliaryData: Uint8Array, isValid: boolean): Promise<WasmContract.FixedTransaction> {
        const ret = await WasmV4.FixedTransaction.new_with_auxiliary(rawBody, rawWitnessSet, rawAuxiliaryData, isValid);
        return new $outer.FixedTransaction(ret, $outer._ctx);
      }

      async body(): Promise<WasmContract.TransactionBody> {
        const ret = await this.wasm.body();
        return new $outer.TransactionBody(ret, $outer._ctx);
      }

      rawBody(): Promise<Uint8Array> {
        return this.wasm.raw_body();
      }

      setBody(rawBody: Uint8Array): Promise<void> {
        return this.wasm.set_body(rawBody);
      }

      setWitnessSet(rawWitnessSet: Uint8Array): Promise<void> {
        return this.wasm.set_witness_set(rawWitnessSet);
      }

      async witnessSet(): Promise<WasmContract.TransactionWitnessSet> {
        const ret = await this.wasm.witness_set();
        return new $outer.TransactionWitnessSet(ret, $outer._ctx);
      }

      rawWitnessSet(): Promise<Uint8Array> {
        return this.wasm.raw_witness_set();
      }

      setIsValid(valid: boolean): Promise<void> {
        return this.wasm.set_is_valid(valid);
      }

      isValid(): Promise<boolean> {
        return this.wasm.is_valid();
      }

      setAuxiliaryData(rawAuxiliaryData: Uint8Array): Promise<void> {
        return this.wasm.set_auxiliary_data(rawAuxiliaryData);
      }

      async auxiliaryData(): Promise<Optional<WasmContract.AuxiliaryData>> {
        const ret = await this.wasm.auxiliary_data();
        if (ret == null) return undefined;
        return new $outer.AuxiliaryData(ret, $outer._ctx);
      }

      rawAuxiliaryData(): Promise<Optional<Uint8Array>> {
        return this.wasm.raw_auxiliary_data();
      }

    }
    return FixedTransaction;
  })();

  public GeneralTransactionMetadata = (() => {
    const $outer = this;

    class GeneralTransactionMetadata
      extends Ptr<WasmV4.GeneralTransactionMetadata>
      implements WasmContract.GeneralTransactionMetadata
    {

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.GeneralTransactionMetadata> {
        const ret = await WasmV4.GeneralTransactionMetadata.from_bytes(bytes);
        return new $outer.GeneralTransactionMetadata(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.GeneralTransactionMetadata> {
        const ret = await WasmV4.GeneralTransactionMetadata.from_hex(hexStr);
        return new $outer.GeneralTransactionMetadata(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.GeneralTransactionMetadata> {
        const ret = await WasmV4.GeneralTransactionMetadata.from_json(json);
        return new $outer.GeneralTransactionMetadata(ret, $outer._ctx);
      }

      static async new(): Promise<WasmContract.GeneralTransactionMetadata> {
        const ret = await WasmV4.GeneralTransactionMetadata.new();
        return new $outer.GeneralTransactionMetadata(ret, $outer._ctx);
      }

      len(): Promise<number> {
        return this.wasm.len();
      }

      async insert(key: WasmContract.BigNum, value: WasmContract.TransactionMetadatum): Promise<Optional<WasmContract.TransactionMetadatum>> {
        const ret = await this.wasm.insert(key.wasm, value.wasm);
        if (ret == null) return undefined;
        return new $outer.TransactionMetadatum(ret, $outer._ctx);
      }

      async get(key: WasmContract.BigNum): Promise<Optional<WasmContract.TransactionMetadatum>> {
        const ret = await this.wasm.get(key.wasm);
        if (ret == null) return undefined;
        return new $outer.TransactionMetadatum(ret, $outer._ctx);
      }

      async keys(): Promise<WasmContract.TransactionMetadatumLabels> {
        const ret = await this.wasm.keys();
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

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.GenesisDelegateHash> {
        const ret = await WasmV4.GenesisDelegateHash.from_bytes(bytes);
        return new $outer.GenesisDelegateHash(ret, $outer._ctx);
      }

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      toBech32(prefix: string): Promise<string> {
        return this.wasm.to_bech32(prefix);
      }

      static async fromBech32(bechStr: string): Promise<WasmContract.GenesisDelegateHash> {
        const ret = await WasmV4.GenesisDelegateHash.from_bech32(bechStr);
        return new $outer.GenesisDelegateHash(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hex: string): Promise<WasmContract.GenesisDelegateHash> {
        const ret = await WasmV4.GenesisDelegateHash.from_hex(hex);
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

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.GenesisHash> {
        const ret = await WasmV4.GenesisHash.from_bytes(bytes);
        return new $outer.GenesisHash(ret, $outer._ctx);
      }

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      toBech32(prefix: string): Promise<string> {
        return this.wasm.to_bech32(prefix);
      }

      static async fromBech32(bechStr: string): Promise<WasmContract.GenesisHash> {
        const ret = await WasmV4.GenesisHash.from_bech32(bechStr);
        return new $outer.GenesisHash(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hex: string): Promise<WasmContract.GenesisHash> {
        const ret = await WasmV4.GenesisHash.from_hex(hex);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.GenesisHashes> {
        const ret = await WasmV4.GenesisHashes.from_bytes(bytes);
        return new $outer.GenesisHashes(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.GenesisHashes> {
        const ret = await WasmV4.GenesisHashes.from_hex(hexStr);
        return new $outer.GenesisHashes(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.GenesisHashes> {
        const ret = await WasmV4.GenesisHashes.from_json(json);
        return new $outer.GenesisHashes(ret, $outer._ctx);
      }

      static async new(): Promise<WasmContract.GenesisHashes> {
        const ret = await WasmV4.GenesisHashes.new();
        return new $outer.GenesisHashes(ret, $outer._ctx);
      }

      len(): Promise<number> {
        return this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.GenesisHash> {
        const ret = await this.wasm.get(index);
        return new $outer.GenesisHash(ret, $outer._ctx);
      }

      add(elem: WasmContract.GenesisHash): Promise<void> {
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.GenesisKeyDelegation> {
        const ret = await WasmV4.GenesisKeyDelegation.from_bytes(bytes);
        return new $outer.GenesisKeyDelegation(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.GenesisKeyDelegation> {
        const ret = await WasmV4.GenesisKeyDelegation.from_hex(hexStr);
        return new $outer.GenesisKeyDelegation(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.GenesisKeyDelegation> {
        const ret = await WasmV4.GenesisKeyDelegation.from_json(json);
        return new $outer.GenesisKeyDelegation(ret, $outer._ctx);
      }

      async genesishash(): Promise<WasmContract.GenesisHash> {
        const ret = await this.wasm.genesishash();
        return new $outer.GenesisHash(ret, $outer._ctx);
      }

      async genesisDelegateHash(): Promise<WasmContract.GenesisDelegateHash> {
        const ret = await this.wasm.genesis_delegate_hash();
        return new $outer.GenesisDelegateHash(ret, $outer._ctx);
      }

      async vrfKeyhash(): Promise<WasmContract.VRFKeyHash> {
        const ret = await this.wasm.vrf_keyhash();
        return new $outer.VRFKeyHash(ret, $outer._ctx);
      }

      static async new(genesishash: WasmContract.GenesisHash, genesisDelegateHash: WasmContract.GenesisDelegateHash, vrfKeyhash: WasmContract.VRFKeyHash): Promise<WasmContract.GenesisKeyDelegation> {
        const ret = await WasmV4.GenesisKeyDelegation.new(genesishash.wasm, genesisDelegateHash.wasm, vrfKeyhash.wasm);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.GovernanceAction> {
        const ret = await WasmV4.GovernanceAction.from_bytes(bytes);
        return new $outer.GovernanceAction(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.GovernanceAction> {
        const ret = await WasmV4.GovernanceAction.from_hex(hexStr);
        return new $outer.GovernanceAction(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.GovernanceAction> {
        const ret = await WasmV4.GovernanceAction.from_json(json);
        return new $outer.GovernanceAction(ret, $outer._ctx);
      }

      static async newParameterChangeAction(parameterChangeAction: WasmContract.ParameterChangeAction): Promise<WasmContract.GovernanceAction> {
        const ret = await WasmV4.GovernanceAction.new_parameter_change_action(parameterChangeAction.wasm);
        return new $outer.GovernanceAction(ret, $outer._ctx);
      }

      static async newHardForkInitiationAction(hardForkInitiationAction: WasmContract.HardForkInitiationAction): Promise<WasmContract.GovernanceAction> {
        const ret = await WasmV4.GovernanceAction.new_hard_fork_initiation_action(hardForkInitiationAction.wasm);
        return new $outer.GovernanceAction(ret, $outer._ctx);
      }

      static async newTreasuryWithdrawalsAction(treasuryWithdrawalsAction: WasmContract.TreasuryWithdrawalsAction): Promise<WasmContract.GovernanceAction> {
        const ret = await WasmV4.GovernanceAction.new_treasury_withdrawals_action(treasuryWithdrawalsAction.wasm);
        return new $outer.GovernanceAction(ret, $outer._ctx);
      }

      static async newNoConfidenceAction(noConfidenceAction: WasmContract.NoConfidenceAction): Promise<WasmContract.GovernanceAction> {
        const ret = await WasmV4.GovernanceAction.new_no_confidence_action(noConfidenceAction.wasm);
        return new $outer.GovernanceAction(ret, $outer._ctx);
      }

      static async newNewCommitteeAction(newCommitteeAction: WasmContract.UpdateCommitteeAction): Promise<WasmContract.GovernanceAction> {
        const ret = await WasmV4.GovernanceAction.new_new_committee_action(newCommitteeAction.wasm);
        return new $outer.GovernanceAction(ret, $outer._ctx);
      }

      static async newNewConstitutionAction(newConstitutionAction: WasmContract.NewConstitutionAction): Promise<WasmContract.GovernanceAction> {
        const ret = await WasmV4.GovernanceAction.new_new_constitution_action(newConstitutionAction.wasm);
        return new $outer.GovernanceAction(ret, $outer._ctx);
      }

      static async newInfoAction(infoAction: WasmContract.InfoAction): Promise<WasmContract.GovernanceAction> {
        const ret = await WasmV4.GovernanceAction.new_info_action(infoAction.wasm);
        return new $outer.GovernanceAction(ret, $outer._ctx);
      }

      kind(): Promise<WasmContract.GovernanceActionKind> {
        return this.wasm.kind();
      }

      async asParameterChangeAction(): Promise<Optional<WasmContract.ParameterChangeAction>> {
        const ret = await this.wasm.as_parameter_change_action();
        if (ret == null) return undefined;
        return new $outer.ParameterChangeAction(ret, $outer._ctx);
      }

      async asHardForkInitiationAction(): Promise<Optional<WasmContract.HardForkInitiationAction>> {
        const ret = await this.wasm.as_hard_fork_initiation_action();
        if (ret == null) return undefined;
        return new $outer.HardForkInitiationAction(ret, $outer._ctx);
      }

      async asTreasuryWithdrawalsAction(): Promise<Optional<WasmContract.TreasuryWithdrawalsAction>> {
        const ret = await this.wasm.as_treasury_withdrawals_action();
        if (ret == null) return undefined;
        return new $outer.TreasuryWithdrawalsAction(ret, $outer._ctx);
      }

      async asNoConfidenceAction(): Promise<Optional<WasmContract.NoConfidenceAction>> {
        const ret = await this.wasm.as_no_confidence_action();
        if (ret == null) return undefined;
        return new $outer.NoConfidenceAction(ret, $outer._ctx);
      }

      async asNewCommitteeAction(): Promise<Optional<WasmContract.UpdateCommitteeAction>> {
        const ret = await this.wasm.as_new_committee_action();
        if (ret == null) return undefined;
        return new $outer.UpdateCommitteeAction(ret, $outer._ctx);
      }

      async asNewConstitutionAction(): Promise<Optional<WasmContract.NewConstitutionAction>> {
        const ret = await this.wasm.as_new_constitution_action();
        if (ret == null) return undefined;
        return new $outer.NewConstitutionAction(ret, $outer._ctx);
      }

      async asInfoAction(): Promise<Optional<WasmContract.InfoAction>> {
        const ret = await this.wasm.as_info_action();
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.GovernanceActionId> {
        const ret = await WasmV4.GovernanceActionId.from_bytes(bytes);
        return new $outer.GovernanceActionId(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.GovernanceActionId> {
        const ret = await WasmV4.GovernanceActionId.from_hex(hexStr);
        return new $outer.GovernanceActionId(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.GovernanceActionId> {
        const ret = await WasmV4.GovernanceActionId.from_json(json);
        return new $outer.GovernanceActionId(ret, $outer._ctx);
      }

      async transactionId(): Promise<WasmContract.TransactionHash> {
        const ret = await this.wasm.transaction_id();
        return new $outer.TransactionHash(ret, $outer._ctx);
      }

      index(): Promise<number> {
        return this.wasm.index();
      }

      static async new(transactionId: WasmContract.TransactionHash, index: number): Promise<WasmContract.GovernanceActionId> {
        const ret = await WasmV4.GovernanceActionId.new(transactionId.wasm, index);
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

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.GovernanceActionIds> {
        const ret = await WasmV4.GovernanceActionIds.from_json(json);
        return new $outer.GovernanceActionIds(ret, $outer._ctx);
      }

      static async new(): Promise<WasmContract.GovernanceActionIds> {
        const ret = await WasmV4.GovernanceActionIds.new();
        return new $outer.GovernanceActionIds(ret, $outer._ctx);
      }

      add(governanceActionId: WasmContract.GovernanceActionId): Promise<void> {
        return this.wasm.add(governanceActionId.wasm);
      }

      async get(index: number): Promise<Optional<WasmContract.GovernanceActionId>> {
        const ret = await this.wasm.get(index);
        if (ret == null) return undefined;
        return new $outer.GovernanceActionId(ret, $outer._ctx);
      }

      len(): Promise<number> {
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.HardForkInitiationAction> {
        const ret = await WasmV4.HardForkInitiationAction.from_bytes(bytes);
        return new $outer.HardForkInitiationAction(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.HardForkInitiationAction> {
        const ret = await WasmV4.HardForkInitiationAction.from_hex(hexStr);
        return new $outer.HardForkInitiationAction(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.HardForkInitiationAction> {
        const ret = await WasmV4.HardForkInitiationAction.from_json(json);
        return new $outer.HardForkInitiationAction(ret, $outer._ctx);
      }

      async govActionId(): Promise<Optional<WasmContract.GovernanceActionId>> {
        const ret = await this.wasm.gov_action_id();
        if (ret == null) return undefined;
        return new $outer.GovernanceActionId(ret, $outer._ctx);
      }

      async protocolVersion(): Promise<WasmContract.ProtocolVersion> {
        const ret = await this.wasm.protocol_version();
        return new $outer.ProtocolVersion(ret, $outer._ctx);
      }

      static async new(protocolVersion: WasmContract.ProtocolVersion): Promise<WasmContract.HardForkInitiationAction> {
        const ret = await WasmV4.HardForkInitiationAction.new(protocolVersion.wasm);
        return new $outer.HardForkInitiationAction(ret, $outer._ctx);
      }

      static async newWithActionId(govActionId: WasmContract.GovernanceActionId, protocolVersion: WasmContract.ProtocolVersion): Promise<WasmContract.HardForkInitiationAction> {
        const ret = await WasmV4.HardForkInitiationAction.new_with_action_id(govActionId.wasm, protocolVersion.wasm);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Header> {
        const ret = await WasmV4.Header.from_bytes(bytes);
        return new $outer.Header(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Header> {
        const ret = await WasmV4.Header.from_hex(hexStr);
        return new $outer.Header(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.Header> {
        const ret = await WasmV4.Header.from_json(json);
        return new $outer.Header(ret, $outer._ctx);
      }

      async headerBody(): Promise<WasmContract.HeaderBody> {
        const ret = await this.wasm.header_body();
        return new $outer.HeaderBody(ret, $outer._ctx);
      }

      async bodySignature(): Promise<WasmContract.KESSignature> {
        const ret = await this.wasm.body_signature();
        return new $outer.KESSignature(ret, $outer._ctx);
      }

      static async new(headerBody: WasmContract.HeaderBody, bodySignature: WasmContract.KESSignature): Promise<WasmContract.Header> {
        const ret = await WasmV4.Header.new(headerBody.wasm, bodySignature.wasm);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.HeaderBody> {
        const ret = await WasmV4.HeaderBody.from_bytes(bytes);
        return new $outer.HeaderBody(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.HeaderBody> {
        const ret = await WasmV4.HeaderBody.from_hex(hexStr);
        return new $outer.HeaderBody(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.HeaderBody> {
        const ret = await WasmV4.HeaderBody.from_json(json);
        return new $outer.HeaderBody(ret, $outer._ctx);
      }

      blockNumber(): Promise<number> {
        return this.wasm.block_number();
      }

      slot(): Promise<number> {
        return this.wasm.slot();
      }

      async slotBignum(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.slot_bignum();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      async prevHash(): Promise<Optional<WasmContract.BlockHash>> {
        const ret = await this.wasm.prev_hash();
        if (ret == null) return undefined;
        return new $outer.BlockHash(ret, $outer._ctx);
      }

      async issuerVkey(): Promise<WasmContract.Vkey> {
        const ret = await this.wasm.issuer_vkey();
        return new $outer.Vkey(ret, $outer._ctx);
      }

      async vrfVkey(): Promise<WasmContract.VRFVKey> {
        const ret = await this.wasm.vrf_vkey();
        return new $outer.VRFVKey(ret, $outer._ctx);
      }

      hasNonceAndLeaderVrf(): Promise<boolean> {
        return this.wasm.has_nonce_and_leader_vrf();
      }

      async nonceVrfOrNothing(): Promise<Optional<WasmContract.VRFCert>> {
        const ret = await this.wasm.nonce_vrf_or_nothing();
        if (ret == null) return undefined;
        return new $outer.VRFCert(ret, $outer._ctx);
      }

      async leaderVrfOrNothing(): Promise<Optional<WasmContract.VRFCert>> {
        const ret = await this.wasm.leader_vrf_or_nothing();
        if (ret == null) return undefined;
        return new $outer.VRFCert(ret, $outer._ctx);
      }

      hasVrfResult(): Promise<boolean> {
        return this.wasm.has_vrf_result();
      }

      async vrfResultOrNothing(): Promise<Optional<WasmContract.VRFCert>> {
        const ret = await this.wasm.vrf_result_or_nothing();
        if (ret == null) return undefined;
        return new $outer.VRFCert(ret, $outer._ctx);
      }

      blockBodySize(): Promise<number> {
        return this.wasm.block_body_size();
      }

      async blockBodyHash(): Promise<WasmContract.BlockHash> {
        const ret = await this.wasm.block_body_hash();
        return new $outer.BlockHash(ret, $outer._ctx);
      }

      async operationalCert(): Promise<WasmContract.OperationalCert> {
        const ret = await this.wasm.operational_cert();
        return new $outer.OperationalCert(ret, $outer._ctx);
      }

      async protocolVersion(): Promise<WasmContract.ProtocolVersion> {
        const ret = await this.wasm.protocol_version();
        return new $outer.ProtocolVersion(ret, $outer._ctx);
      }

      static async new(blockNumber: number, slot: number, prevHash: Optional<WasmContract.BlockHash>, issuerVkey: WasmContract.Vkey, vrfVkey: WasmContract.VRFVKey, vrfResult: WasmContract.VRFCert, blockBodySize: number, blockBodyHash: WasmContract.BlockHash, operationalCert: WasmContract.OperationalCert, protocolVersion: WasmContract.ProtocolVersion): Promise<WasmContract.HeaderBody> {
        const ret = await WasmV4.HeaderBody.new(blockNumber, slot, prevHash?.wasm, issuerVkey.wasm, vrfVkey.wasm, vrfResult.wasm, blockBodySize, blockBodyHash.wasm, operationalCert.wasm, protocolVersion.wasm);
        return new $outer.HeaderBody(ret, $outer._ctx);
      }

      static async newHeaderbody(blockNumber: number, slot: WasmContract.BigNum, prevHash: Optional<WasmContract.BlockHash>, issuerVkey: WasmContract.Vkey, vrfVkey: WasmContract.VRFVKey, vrfResult: WasmContract.VRFCert, blockBodySize: number, blockBodyHash: WasmContract.BlockHash, operationalCert: WasmContract.OperationalCert, protocolVersion: WasmContract.ProtocolVersion): Promise<WasmContract.HeaderBody> {
        const ret = await WasmV4.HeaderBody.new_headerbody(blockNumber, slot.wasm, prevHash?.wasm, issuerVkey.wasm, vrfVkey.wasm, vrfResult.wasm, blockBodySize, blockBodyHash.wasm, operationalCert.wasm, protocolVersion.wasm);
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

      static async new(): Promise<WasmContract.InfoAction> {
        const ret = await WasmV4.InfoAction.new();
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Int> {
        const ret = await WasmV4.Int.from_bytes(bytes);
        return new $outer.Int(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Int> {
        const ret = await WasmV4.Int.from_hex(hexStr);
        return new $outer.Int(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.Int> {
        const ret = await WasmV4.Int.from_json(json);
        return new $outer.Int(ret, $outer._ctx);
      }

      static async new(x: WasmContract.BigNum): Promise<WasmContract.Int> {
        const ret = await WasmV4.Int.new(x.wasm);
        return new $outer.Int(ret, $outer._ctx);
      }

      static async newNegative(x: WasmContract.BigNum): Promise<WasmContract.Int> {
        const ret = await WasmV4.Int.new_negative(x.wasm);
        return new $outer.Int(ret, $outer._ctx);
      }

      static async newI32(x: number): Promise<WasmContract.Int> {
        const ret = await WasmV4.Int.new_i32(x);
        return new $outer.Int(ret, $outer._ctx);
      }

      isPositive(): Promise<boolean> {
        return this.wasm.is_positive();
      }

      async asPositive(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.as_positive();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      async asNegative(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.as_negative();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      asI32(): Promise<Optional<number>> {
        return this.wasm.as_i32();
      }

      asI32OrNothing(): Promise<Optional<number>> {
        return this.wasm.as_i32_or_nothing();
      }

      asI32OrFail(): Promise<number> {
        return this.wasm.as_i32_or_fail();
      }

      toStr(): Promise<string> {
        return this.wasm.to_str();
      }

      static async fromStr(string: string): Promise<WasmContract.Int> {
        const ret = await WasmV4.Int.from_str(string);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Ipv4> {
        const ret = await WasmV4.Ipv4.from_bytes(bytes);
        return new $outer.Ipv4(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Ipv4> {
        const ret = await WasmV4.Ipv4.from_hex(hexStr);
        return new $outer.Ipv4(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.Ipv4> {
        const ret = await WasmV4.Ipv4.from_json(json);
        return new $outer.Ipv4(ret, $outer._ctx);
      }

      static async new(data: Uint8Array): Promise<WasmContract.Ipv4> {
        const ret = await WasmV4.Ipv4.new(data);
        return new $outer.Ipv4(ret, $outer._ctx);
      }

      ip(): Promise<Uint8Array> {
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Ipv6> {
        const ret = await WasmV4.Ipv6.from_bytes(bytes);
        return new $outer.Ipv6(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Ipv6> {
        const ret = await WasmV4.Ipv6.from_hex(hexStr);
        return new $outer.Ipv6(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.Ipv6> {
        const ret = await WasmV4.Ipv6.from_json(json);
        return new $outer.Ipv6(ret, $outer._ctx);
      }

      static async new(data: Uint8Array): Promise<WasmContract.Ipv6> {
        const ret = await WasmV4.Ipv6.new(data);
        return new $outer.Ipv6(ret, $outer._ctx);
      }

      ip(): Promise<Uint8Array> {
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.KESSignature> {
        const ret = await WasmV4.KESSignature.from_bytes(bytes);
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

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.KESVKey> {
        const ret = await WasmV4.KESVKey.from_bytes(bytes);
        return new $outer.KESVKey(ret, $outer._ctx);
      }

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      toBech32(prefix: string): Promise<string> {
        return this.wasm.to_bech32(prefix);
      }

      static async fromBech32(bechStr: string): Promise<WasmContract.KESVKey> {
        const ret = await WasmV4.KESVKey.from_bech32(bechStr);
        return new $outer.KESVKey(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hex: string): Promise<WasmContract.KESVKey> {
        const ret = await WasmV4.KESVKey.from_hex(hex);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Language> {
        const ret = await WasmV4.Language.from_bytes(bytes);
        return new $outer.Language(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Language> {
        const ret = await WasmV4.Language.from_hex(hexStr);
        return new $outer.Language(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.Language> {
        const ret = await WasmV4.Language.from_json(json);
        return new $outer.Language(ret, $outer._ctx);
      }

      static async newPlutusV1(): Promise<WasmContract.Language> {
        const ret = await WasmV4.Language.new_plutus_v1();
        return new $outer.Language(ret, $outer._ctx);
      }

      static async newPlutusV2(): Promise<WasmContract.Language> {
        const ret = await WasmV4.Language.new_plutus_v2();
        return new $outer.Language(ret, $outer._ctx);
      }

      static async newPlutusV3(): Promise<WasmContract.Language> {
        const ret = await WasmV4.Language.new_plutus_v3();
        return new $outer.Language(ret, $outer._ctx);
      }

      kind(): Promise<WasmContract.LanguageKind> {
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

      static async new(): Promise<WasmContract.Languages> {
        const ret = await WasmV4.Languages.new();
        return new $outer.Languages(ret, $outer._ctx);
      }

      len(): Promise<number> {
        return this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.Language> {
        const ret = await this.wasm.get(index);
        return new $outer.Language(ret, $outer._ctx);
      }

      add(elem: WasmContract.Language): Promise<void> {
        return this.wasm.add(elem.wasm);
      }

      static async list(): Promise<WasmContract.Languages> {
        const ret = await WasmV4.Languages.list();
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

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.LegacyDaedalusPrivateKey> {
        const ret = await WasmV4.LegacyDaedalusPrivateKey.from_bytes(bytes);
        return new $outer.LegacyDaedalusPrivateKey(ret, $outer._ctx);
      }

      asBytes(): Promise<Uint8Array> {
        return this.wasm.as_bytes();
      }

      chaincode(): Promise<Uint8Array> {
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

      async constant(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.constant();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      async coefficient(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.coefficient();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      static async new(coefficient: WasmContract.BigNum, constant: WasmContract.BigNum): Promise<WasmContract.LinearFee> {
        const ret = await WasmV4.LinearFee.new(coefficient.wasm, constant.wasm);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.MIRToStakeCredentials> {
        const ret = await WasmV4.MIRToStakeCredentials.from_bytes(bytes);
        return new $outer.MIRToStakeCredentials(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.MIRToStakeCredentials> {
        const ret = await WasmV4.MIRToStakeCredentials.from_hex(hexStr);
        return new $outer.MIRToStakeCredentials(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.MIRToStakeCredentials> {
        const ret = await WasmV4.MIRToStakeCredentials.from_json(json);
        return new $outer.MIRToStakeCredentials(ret, $outer._ctx);
      }

      static async new(): Promise<WasmContract.MIRToStakeCredentials> {
        const ret = await WasmV4.MIRToStakeCredentials.new();
        return new $outer.MIRToStakeCredentials(ret, $outer._ctx);
      }

      len(): Promise<number> {
        return this.wasm.len();
      }

      async insert(cred: WasmContract.Credential, delta: WasmContract.Int): Promise<Optional<WasmContract.Int>> {
        const ret = await this.wasm.insert(cred.wasm, delta.wasm);
        if (ret == null) return undefined;
        return new $outer.Int(ret, $outer._ctx);
      }

      async get(cred: WasmContract.Credential): Promise<Optional<WasmContract.Int>> {
        const ret = await this.wasm.get(cred.wasm);
        if (ret == null) return undefined;
        return new $outer.Int(ret, $outer._ctx);
      }

      async keys(): Promise<WasmContract.Credentials> {
        const ret = await this.wasm.keys();
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

      originalBytes(): Promise<Uint8Array> {
        return this.wasm.original_bytes();
      }

      async toAddress(): Promise<WasmContract.Address> {
        const ret = await this.wasm.to_address();
        return new $outer.Address(ret, $outer._ctx);
      }

      static async fromAddress(addr: WasmContract.Address): Promise<Optional<WasmContract.MalformedAddress>> {
        const ret = await WasmV4.MalformedAddress.from_address(addr.wasm);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.MetadataList> {
        const ret = await WasmV4.MetadataList.from_bytes(bytes);
        return new $outer.MetadataList(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.MetadataList> {
        const ret = await WasmV4.MetadataList.from_hex(hexStr);
        return new $outer.MetadataList(ret, $outer._ctx);
      }

      static async new(): Promise<WasmContract.MetadataList> {
        const ret = await WasmV4.MetadataList.new();
        return new $outer.MetadataList(ret, $outer._ctx);
      }

      len(): Promise<number> {
        return this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.TransactionMetadatum> {
        const ret = await this.wasm.get(index);
        return new $outer.TransactionMetadatum(ret, $outer._ctx);
      }

      add(elem: WasmContract.TransactionMetadatum): Promise<void> {
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.MetadataMap> {
        const ret = await WasmV4.MetadataMap.from_bytes(bytes);
        return new $outer.MetadataMap(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.MetadataMap> {
        const ret = await WasmV4.MetadataMap.from_hex(hexStr);
        return new $outer.MetadataMap(ret, $outer._ctx);
      }

      static async new(): Promise<WasmContract.MetadataMap> {
        const ret = await WasmV4.MetadataMap.new();
        return new $outer.MetadataMap(ret, $outer._ctx);
      }

      len(): Promise<number> {
        return this.wasm.len();
      }

      async insert(key: WasmContract.TransactionMetadatum, value: WasmContract.TransactionMetadatum): Promise<Optional<WasmContract.TransactionMetadatum>> {
        const ret = await this.wasm.insert(key.wasm, value.wasm);
        if (ret == null) return undefined;
        return new $outer.TransactionMetadatum(ret, $outer._ctx);
      }

      async insertStr(key: string, value: WasmContract.TransactionMetadatum): Promise<Optional<WasmContract.TransactionMetadatum>> {
        const ret = await this.wasm.insert_str(key, value.wasm);
        if (ret == null) return undefined;
        return new $outer.TransactionMetadatum(ret, $outer._ctx);
      }

      async insertI32(key: number, value: WasmContract.TransactionMetadatum): Promise<Optional<WasmContract.TransactionMetadatum>> {
        const ret = await this.wasm.insert_i32(key, value.wasm);
        if (ret == null) return undefined;
        return new $outer.TransactionMetadatum(ret, $outer._ctx);
      }

      async get(key: WasmContract.TransactionMetadatum): Promise<WasmContract.TransactionMetadatum> {
        const ret = await this.wasm.get(key.wasm);
        return new $outer.TransactionMetadatum(ret, $outer._ctx);
      }

      async getStr(key: string): Promise<WasmContract.TransactionMetadatum> {
        const ret = await this.wasm.get_str(key);
        return new $outer.TransactionMetadatum(ret, $outer._ctx);
      }

      async getI32(key: number): Promise<WasmContract.TransactionMetadatum> {
        const ret = await this.wasm.get_i32(key);
        return new $outer.TransactionMetadatum(ret, $outer._ctx);
      }

      has(key: WasmContract.TransactionMetadatum): Promise<boolean> {
        return this.wasm.has(key.wasm);
      }

      async keys(): Promise<WasmContract.MetadataList> {
        const ret = await this.wasm.keys();
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Mint> {
        const ret = await WasmV4.Mint.from_bytes(bytes);
        return new $outer.Mint(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Mint> {
        const ret = await WasmV4.Mint.from_hex(hexStr);
        return new $outer.Mint(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.Mint> {
        const ret = await WasmV4.Mint.from_json(json);
        return new $outer.Mint(ret, $outer._ctx);
      }

      static async new(): Promise<WasmContract.Mint> {
        const ret = await WasmV4.Mint.new();
        return new $outer.Mint(ret, $outer._ctx);
      }

      static async newFromEntry(key: WasmContract.ScriptHash, value: WasmContract.MintAssets): Promise<WasmContract.Mint> {
        const ret = await WasmV4.Mint.new_from_entry(key.wasm, value.wasm);
        return new $outer.Mint(ret, $outer._ctx);
      }

      len(): Promise<number> {
        return this.wasm.len();
      }

      async insert(key: WasmContract.ScriptHash, value: WasmContract.MintAssets): Promise<Optional<WasmContract.MintAssets>> {
        const ret = await this.wasm.insert(key.wasm, value.wasm);
        if (ret == null) return undefined;
        return new $outer.MintAssets(ret, $outer._ctx);
      }

      async get(key: WasmContract.ScriptHash): Promise<Optional<WasmContract.MintsAssets>> {
        const ret = await this.wasm.get(key.wasm);
        if (ret == null) return undefined;
        return new $outer.MintsAssets(ret, $outer._ctx);
      }

      async keys(): Promise<WasmContract.ScriptHashes> {
        const ret = await this.wasm.keys();
        return new $outer.ScriptHashes(ret, $outer._ctx);
      }

      async asPositiveMultiasset(): Promise<WasmContract.MultiAsset> {
        const ret = await this.wasm.as_positive_multiasset();
        return new $outer.MultiAsset(ret, $outer._ctx);
      }

      async asNegativeMultiasset(): Promise<WasmContract.MultiAsset> {
        const ret = await this.wasm.as_negative_multiasset();
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

      static async new(): Promise<WasmContract.MintAssets> {
        const ret = await WasmV4.MintAssets.new();
        return new $outer.MintAssets(ret, $outer._ctx);
      }

      static async newFromEntry(key: WasmContract.AssetName, value: WasmContract.Int): Promise<WasmContract.MintAssets> {
        const ret = await WasmV4.MintAssets.new_from_entry(key.wasm, value.wasm);
        return new $outer.MintAssets(ret, $outer._ctx);
      }

      len(): Promise<number> {
        return this.wasm.len();
      }

      async insert(key: WasmContract.AssetName, value: WasmContract.Int): Promise<Optional<WasmContract.Int>> {
        const ret = await this.wasm.insert(key.wasm, value.wasm);
        if (ret == null) return undefined;
        return new $outer.Int(ret, $outer._ctx);
      }

      async get(key: WasmContract.AssetName): Promise<Optional<WasmContract.Int>> {
        const ret = await this.wasm.get(key.wasm);
        if (ret == null) return undefined;
        return new $outer.Int(ret, $outer._ctx);
      }

      async keys(): Promise<WasmContract.AssetNames> {
        const ret = await this.wasm.keys();
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

      static async new(): Promise<WasmContract.MintBuilder> {
        const ret = await WasmV4.MintBuilder.new();
        return new $outer.MintBuilder(ret, $outer._ctx);
      }

      addAsset(mint: WasmContract.MintWitness, assetName: WasmContract.AssetName, amount: WasmContract.Int): Promise<void> {
        return this.wasm.add_asset(mint.wasm, assetName.wasm, amount.wasm);
      }

      setAsset(mint: WasmContract.MintWitness, assetName: WasmContract.AssetName, amount: WasmContract.Int): Promise<void> {
        return this.wasm.set_asset(mint.wasm, assetName.wasm, amount.wasm);
      }

      async build(): Promise<WasmContract.Mint> {
        const ret = await this.wasm.build();
        return new $outer.Mint(ret, $outer._ctx);
      }

      async getNativeScripts(): Promise<WasmContract.NativeScripts> {
        const ret = await this.wasm.get_native_scripts();
        return new $outer.NativeScripts(ret, $outer._ctx);
      }

      async getPlutusWitnesses(): Promise<WasmContract.PlutusWitnesses> {
        const ret = await this.wasm.get_plutus_witnesses();
        return new $outer.PlutusWitnesses(ret, $outer._ctx);
      }

      async getRefInputs(): Promise<WasmContract.TransactionInputs> {
        const ret = await this.wasm.get_ref_inputs();
        return new $outer.TransactionInputs(ret, $outer._ctx);
      }

      async getRedeemers(): Promise<WasmContract.Redeemers> {
        const ret = await this.wasm.get_redeemers();
        return new $outer.Redeemers(ret, $outer._ctx);
      }

      hasPlutusScripts(): Promise<boolean> {
        return this.wasm.has_plutus_scripts();
      }

      hasNativeScripts(): Promise<boolean> {
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

      static async newNativeScript(nativeScript: WasmContract.NativeScript): Promise<WasmContract.MintWitness> {
        const ret = await WasmV4.MintWitness.new_native_script(nativeScript.wasm);
        return new $outer.MintWitness(ret, $outer._ctx);
      }

      static async newPlutusScript(plutusScript: WasmContract.PlutusScriptSource, redeemer: WasmContract.Redeemer): Promise<WasmContract.MintWitness> {
        const ret = await WasmV4.MintWitness.new_plutus_script(plutusScript.wasm, redeemer.wasm);
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

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.MintsAssets> {
        const ret = await WasmV4.MintsAssets.from_json(json);
        return new $outer.MintsAssets(ret, $outer._ctx);
      }

      static async new(): Promise<WasmContract.MintsAssets> {
        const ret = await WasmV4.MintsAssets.new();
        return new $outer.MintsAssets(ret, $outer._ctx);
      }

      add(mintAssets: WasmContract.MintAssets): Promise<void> {
        return this.wasm.add(mintAssets.wasm);
      }

      async get(index: number): Promise<Optional<WasmContract.MintAssets>> {
        const ret = await this.wasm.get(index);
        if (ret == null) return undefined;
        return new $outer.MintAssets(ret, $outer._ctx);
      }

      len(): Promise<number> {
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.MoveInstantaneousReward> {
        const ret = await WasmV4.MoveInstantaneousReward.from_bytes(bytes);
        return new $outer.MoveInstantaneousReward(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.MoveInstantaneousReward> {
        const ret = await WasmV4.MoveInstantaneousReward.from_hex(hexStr);
        return new $outer.MoveInstantaneousReward(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.MoveInstantaneousReward> {
        const ret = await WasmV4.MoveInstantaneousReward.from_json(json);
        return new $outer.MoveInstantaneousReward(ret, $outer._ctx);
      }

      static async newToOtherPot(pot: WasmContract.MIRPot, amount: WasmContract.BigNum): Promise<WasmContract.MoveInstantaneousReward> {
        const ret = await WasmV4.MoveInstantaneousReward.new_to_other_pot(pot, amount.wasm);
        return new $outer.MoveInstantaneousReward(ret, $outer._ctx);
      }

      static async newToStakeCreds(pot: WasmContract.MIRPot, amounts: WasmContract.MIRToStakeCredentials): Promise<WasmContract.MoveInstantaneousReward> {
        const ret = await WasmV4.MoveInstantaneousReward.new_to_stake_creds(pot, amounts.wasm);
        return new $outer.MoveInstantaneousReward(ret, $outer._ctx);
      }

      pot(): Promise<WasmContract.MIRPot> {
        return this.wasm.pot();
      }

      kind(): Promise<WasmContract.MIRKind> {
        return this.wasm.kind();
      }

      async asToOtherPot(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.as_to_other_pot();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      async asToStakeCreds(): Promise<Optional<WasmContract.MIRToStakeCredentials>> {
        const ret = await this.wasm.as_to_stake_creds();
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.MoveInstantaneousRewardsCert> {
        const ret = await WasmV4.MoveInstantaneousRewardsCert.from_bytes(bytes);
        return new $outer.MoveInstantaneousRewardsCert(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.MoveInstantaneousRewardsCert> {
        const ret = await WasmV4.MoveInstantaneousRewardsCert.from_hex(hexStr);
        return new $outer.MoveInstantaneousRewardsCert(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.MoveInstantaneousRewardsCert> {
        const ret = await WasmV4.MoveInstantaneousRewardsCert.from_json(json);
        return new $outer.MoveInstantaneousRewardsCert(ret, $outer._ctx);
      }

      async moveInstantaneousReward(): Promise<WasmContract.MoveInstantaneousReward> {
        const ret = await this.wasm.move_instantaneous_reward();
        return new $outer.MoveInstantaneousReward(ret, $outer._ctx);
      }

      static async new(moveInstantaneousReward: WasmContract.MoveInstantaneousReward): Promise<WasmContract.MoveInstantaneousRewardsCert> {
        const ret = await WasmV4.MoveInstantaneousRewardsCert.new(moveInstantaneousReward.wasm);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.MultiAsset> {
        const ret = await WasmV4.MultiAsset.from_bytes(bytes);
        return new $outer.MultiAsset(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.MultiAsset> {
        const ret = await WasmV4.MultiAsset.from_hex(hexStr);
        return new $outer.MultiAsset(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.MultiAsset> {
        const ret = await WasmV4.MultiAsset.from_json(json);
        return new $outer.MultiAsset(ret, $outer._ctx);
      }

      static async new(): Promise<WasmContract.MultiAsset> {
        const ret = await WasmV4.MultiAsset.new();
        return new $outer.MultiAsset(ret, $outer._ctx);
      }

      len(): Promise<number> {
        return this.wasm.len();
      }

      async insert(policyId: WasmContract.ScriptHash, assets: WasmContract.Assets): Promise<Optional<WasmContract.Assets>> {
        const ret = await this.wasm.insert(policyId.wasm, assets.wasm);
        if (ret == null) return undefined;
        return new $outer.Assets(ret, $outer._ctx);
      }

      async get(policyId: WasmContract.ScriptHash): Promise<Optional<WasmContract.Assets>> {
        const ret = await this.wasm.get(policyId.wasm);
        if (ret == null) return undefined;
        return new $outer.Assets(ret, $outer._ctx);
      }

      async setAsset(policyId: WasmContract.ScriptHash, assetName: WasmContract.AssetName, value: WasmContract.BigNum): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.set_asset(policyId.wasm, assetName.wasm, value.wasm);
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      async getAsset(policyId: WasmContract.ScriptHash, assetName: WasmContract.AssetName): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.get_asset(policyId.wasm, assetName.wasm);
        return new $outer.BigNum(ret, $outer._ctx);
      }

      async keys(): Promise<WasmContract.ScriptHashes> {
        const ret = await this.wasm.keys();
        return new $outer.ScriptHashes(ret, $outer._ctx);
      }

      async sub(rhsMa: WasmContract.MultiAsset): Promise<WasmContract.MultiAsset> {
        const ret = await this.wasm.sub(rhsMa.wasm);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.MultiHostName> {
        const ret = await WasmV4.MultiHostName.from_bytes(bytes);
        return new $outer.MultiHostName(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.MultiHostName> {
        const ret = await WasmV4.MultiHostName.from_hex(hexStr);
        return new $outer.MultiHostName(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.MultiHostName> {
        const ret = await WasmV4.MultiHostName.from_json(json);
        return new $outer.MultiHostName(ret, $outer._ctx);
      }

      async dnsName(): Promise<WasmContract.DNSRecordSRV> {
        const ret = await this.wasm.dns_name();
        return new $outer.DNSRecordSRV(ret, $outer._ctx);
      }

      static async new(dnsName: WasmContract.DNSRecordSRV): Promise<WasmContract.MultiHostName> {
        const ret = await WasmV4.MultiHostName.new(dnsName.wasm);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.NativeScript> {
        const ret = await WasmV4.NativeScript.from_bytes(bytes);
        return new $outer.NativeScript(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.NativeScript> {
        const ret = await WasmV4.NativeScript.from_hex(hexStr);
        return new $outer.NativeScript(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.NativeScript> {
        const ret = await WasmV4.NativeScript.from_json(json);
        return new $outer.NativeScript(ret, $outer._ctx);
      }

      async hash(): Promise<WasmContract.ScriptHash> {
        const ret = await this.wasm.hash();
        return new $outer.ScriptHash(ret, $outer._ctx);
      }

      static async newScriptPubkey(scriptPubkey: WasmContract.ScriptPubkey): Promise<WasmContract.NativeScript> {
        const ret = await WasmV4.NativeScript.new_script_pubkey(scriptPubkey.wasm);
        return new $outer.NativeScript(ret, $outer._ctx);
      }

      static async newScriptAll(scriptAll: WasmContract.ScriptAll): Promise<WasmContract.NativeScript> {
        const ret = await WasmV4.NativeScript.new_script_all(scriptAll.wasm);
        return new $outer.NativeScript(ret, $outer._ctx);
      }

      static async newScriptAny(scriptAny: WasmContract.ScriptAny): Promise<WasmContract.NativeScript> {
        const ret = await WasmV4.NativeScript.new_script_any(scriptAny.wasm);
        return new $outer.NativeScript(ret, $outer._ctx);
      }

      static async newScriptNOfK(scriptNOfK: WasmContract.ScriptNOfK): Promise<WasmContract.NativeScript> {
        const ret = await WasmV4.NativeScript.new_script_n_of_k(scriptNOfK.wasm);
        return new $outer.NativeScript(ret, $outer._ctx);
      }

      static async newTimelockStart(timelockStart: WasmContract.TimelockStart): Promise<WasmContract.NativeScript> {
        const ret = await WasmV4.NativeScript.new_timelock_start(timelockStart.wasm);
        return new $outer.NativeScript(ret, $outer._ctx);
      }

      static async newTimelockExpiry(timelockExpiry: WasmContract.TimelockExpiry): Promise<WasmContract.NativeScript> {
        const ret = await WasmV4.NativeScript.new_timelock_expiry(timelockExpiry.wasm);
        return new $outer.NativeScript(ret, $outer._ctx);
      }

      kind(): Promise<WasmContract.NativeScriptKind> {
        return this.wasm.kind();
      }

      async asScriptPubkey(): Promise<Optional<WasmContract.ScriptPubkey>> {
        const ret = await this.wasm.as_script_pubkey();
        if (ret == null) return undefined;
        return new $outer.ScriptPubkey(ret, $outer._ctx);
      }

      async asScriptAll(): Promise<Optional<WasmContract.ScriptAll>> {
        const ret = await this.wasm.as_script_all();
        if (ret == null) return undefined;
        return new $outer.ScriptAll(ret, $outer._ctx);
      }

      async asScriptAny(): Promise<Optional<WasmContract.ScriptAny>> {
        const ret = await this.wasm.as_script_any();
        if (ret == null) return undefined;
        return new $outer.ScriptAny(ret, $outer._ctx);
      }

      async asScriptNOfK(): Promise<Optional<WasmContract.ScriptNOfK>> {
        const ret = await this.wasm.as_script_n_of_k();
        if (ret == null) return undefined;
        return new $outer.ScriptNOfK(ret, $outer._ctx);
      }

      async asTimelockStart(): Promise<Optional<WasmContract.TimelockStart>> {
        const ret = await this.wasm.as_timelock_start();
        if (ret == null) return undefined;
        return new $outer.TimelockStart(ret, $outer._ctx);
      }

      async asTimelockExpiry(): Promise<Optional<WasmContract.TimelockExpiry>> {
        const ret = await this.wasm.as_timelock_expiry();
        if (ret == null) return undefined;
        return new $outer.TimelockExpiry(ret, $outer._ctx);
      }

      async getRequiredSigners(): Promise<WasmContract.Ed25519KeyHashes> {
        const ret = await this.wasm.get_required_signers();
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

      static async new(script: WasmContract.NativeScript): Promise<WasmContract.NativeScriptSource> {
        const ret = await WasmV4.NativeScriptSource.new(script.wasm);
        return new $outer.NativeScriptSource(ret, $outer._ctx);
      }

      static async newRefInput(scriptHash: WasmContract.ScriptHash, input: WasmContract.TransactionInput): Promise<WasmContract.NativeScriptSource> {
        const ret = await WasmV4.NativeScriptSource.new_ref_input(scriptHash.wasm, input.wasm);
        return new $outer.NativeScriptSource(ret, $outer._ctx);
      }

      setRequiredSigners(keyHashes: WasmContract.Ed25519KeyHashes): Promise<void> {
        return this.wasm.set_required_signers(keyHashes.wasm);
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

      static async new(): Promise<WasmContract.NativeScripts> {
        const ret = await WasmV4.NativeScripts.new();
        return new $outer.NativeScripts(ret, $outer._ctx);
      }

      len(): Promise<number> {
        return this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.NativeScript> {
        const ret = await this.wasm.get(index);
        return new $outer.NativeScript(ret, $outer._ctx);
      }

      add(elem: WasmContract.NativeScript): Promise<void> {
        return this.wasm.add(elem.wasm);
      }

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.NativeScripts> {
        const ret = await WasmV4.NativeScripts.from_bytes(bytes);
        return new $outer.NativeScripts(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.NativeScripts> {
        const ret = await WasmV4.NativeScripts.from_hex(hexStr);
        return new $outer.NativeScripts(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.NativeScripts> {
        const ret = await WasmV4.NativeScripts.from_json(json);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.NetworkId> {
        const ret = await WasmV4.NetworkId.from_bytes(bytes);
        return new $outer.NetworkId(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.NetworkId> {
        const ret = await WasmV4.NetworkId.from_hex(hexStr);
        return new $outer.NetworkId(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.NetworkId> {
        const ret = await WasmV4.NetworkId.from_json(json);
        return new $outer.NetworkId(ret, $outer._ctx);
      }

      static async testnet(): Promise<WasmContract.NetworkId> {
        const ret = await WasmV4.NetworkId.testnet();
        return new $outer.NetworkId(ret, $outer._ctx);
      }

      static async mainnet(): Promise<WasmContract.NetworkId> {
        const ret = await WasmV4.NetworkId.mainnet();
        return new $outer.NetworkId(ret, $outer._ctx);
      }

      kind(): Promise<WasmContract.NetworkIdKind> {
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

      static async new(networkId: number, protocolMagic: number): Promise<WasmContract.NetworkInfo> {
        const ret = await WasmV4.NetworkInfo.new(networkId, protocolMagic);
        return new $outer.NetworkInfo(ret, $outer._ctx);
      }

      networkId(): Promise<number> {
        return this.wasm.network_id();
      }

      protocolMagic(): Promise<number> {
        return this.wasm.protocol_magic();
      }

      static async testnetPreview(): Promise<WasmContract.NetworkInfo> {
        const ret = await WasmV4.NetworkInfo.testnet_preview();
        return new $outer.NetworkInfo(ret, $outer._ctx);
      }

      static async testnetPreprod(): Promise<WasmContract.NetworkInfo> {
        const ret = await WasmV4.NetworkInfo.testnet_preprod();
        return new $outer.NetworkInfo(ret, $outer._ctx);
      }

      static async mainnet(): Promise<WasmContract.NetworkInfo> {
        const ret = await WasmV4.NetworkInfo.mainnet();
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.NewConstitutionAction> {
        const ret = await WasmV4.NewConstitutionAction.from_bytes(bytes);
        return new $outer.NewConstitutionAction(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.NewConstitutionAction> {
        const ret = await WasmV4.NewConstitutionAction.from_hex(hexStr);
        return new $outer.NewConstitutionAction(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.NewConstitutionAction> {
        const ret = await WasmV4.NewConstitutionAction.from_json(json);
        return new $outer.NewConstitutionAction(ret, $outer._ctx);
      }

      async govActionId(): Promise<Optional<WasmContract.GovernanceActionId>> {
        const ret = await this.wasm.gov_action_id();
        if (ret == null) return undefined;
        return new $outer.GovernanceActionId(ret, $outer._ctx);
      }

      async constitution(): Promise<WasmContract.Constitution> {
        const ret = await this.wasm.constitution();
        return new $outer.Constitution(ret, $outer._ctx);
      }

      static async new(constitution: WasmContract.Constitution): Promise<WasmContract.NewConstitutionAction> {
        const ret = await WasmV4.NewConstitutionAction.new(constitution.wasm);
        return new $outer.NewConstitutionAction(ret, $outer._ctx);
      }

      static async newWithActionId(govActionId: WasmContract.GovernanceActionId, constitution: WasmContract.Constitution): Promise<WasmContract.NewConstitutionAction> {
        const ret = await WasmV4.NewConstitutionAction.new_with_action_id(govActionId.wasm, constitution.wasm);
        return new $outer.NewConstitutionAction(ret, $outer._ctx);
      }

      hasScriptHash(): Promise<boolean> {
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.NoConfidenceAction> {
        const ret = await WasmV4.NoConfidenceAction.from_bytes(bytes);
        return new $outer.NoConfidenceAction(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.NoConfidenceAction> {
        const ret = await WasmV4.NoConfidenceAction.from_hex(hexStr);
        return new $outer.NoConfidenceAction(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.NoConfidenceAction> {
        const ret = await WasmV4.NoConfidenceAction.from_json(json);
        return new $outer.NoConfidenceAction(ret, $outer._ctx);
      }

      async govActionId(): Promise<Optional<WasmContract.GovernanceActionId>> {
        const ret = await this.wasm.gov_action_id();
        if (ret == null) return undefined;
        return new $outer.GovernanceActionId(ret, $outer._ctx);
      }

      static async new(): Promise<WasmContract.NoConfidenceAction> {
        const ret = await WasmV4.NoConfidenceAction.new();
        return new $outer.NoConfidenceAction(ret, $outer._ctx);
      }

      static async newWithActionId(govActionId: WasmContract.GovernanceActionId): Promise<WasmContract.NoConfidenceAction> {
        const ret = await WasmV4.NoConfidenceAction.new_with_action_id(govActionId.wasm);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Nonce> {
        const ret = await WasmV4.Nonce.from_bytes(bytes);
        return new $outer.Nonce(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Nonce> {
        const ret = await WasmV4.Nonce.from_hex(hexStr);
        return new $outer.Nonce(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.Nonce> {
        const ret = await WasmV4.Nonce.from_json(json);
        return new $outer.Nonce(ret, $outer._ctx);
      }

      static async newIdentity(): Promise<WasmContract.Nonce> {
        const ret = await WasmV4.Nonce.new_identity();
        return new $outer.Nonce(ret, $outer._ctx);
      }

      static async newFromHash(hash: Uint8Array): Promise<WasmContract.Nonce> {
        const ret = await WasmV4.Nonce.new_from_hash(hash);
        return new $outer.Nonce(ret, $outer._ctx);
      }

      getHash(): Promise<Optional<Uint8Array>> {
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.OperationalCert> {
        const ret = await WasmV4.OperationalCert.from_bytes(bytes);
        return new $outer.OperationalCert(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.OperationalCert> {
        const ret = await WasmV4.OperationalCert.from_hex(hexStr);
        return new $outer.OperationalCert(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.OperationalCert> {
        const ret = await WasmV4.OperationalCert.from_json(json);
        return new $outer.OperationalCert(ret, $outer._ctx);
      }

      async hotVkey(): Promise<WasmContract.KESVKey> {
        const ret = await this.wasm.hot_vkey();
        return new $outer.KESVKey(ret, $outer._ctx);
      }

      sequenceNumber(): Promise<number> {
        return this.wasm.sequence_number();
      }

      kesPeriod(): Promise<number> {
        return this.wasm.kes_period();
      }

      async sigma(): Promise<WasmContract.Ed25519Signature> {
        const ret = await this.wasm.sigma();
        return new $outer.Ed25519Signature(ret, $outer._ctx);
      }

      static async new(hotVkey: WasmContract.KESVKey, sequenceNumber: number, kesPeriod: number, sigma: WasmContract.Ed25519Signature): Promise<WasmContract.OperationalCert> {
        const ret = await WasmV4.OperationalCert.new(hotVkey.wasm, sequenceNumber, kesPeriod, sigma.wasm);
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

      static async newDataHash(dataHash: WasmContract.DataHash): Promise<WasmContract.OutputDatum> {
        const ret = await WasmV4.OutputDatum.new_data_hash(dataHash.wasm);
        return new $outer.OutputDatum(ret, $outer._ctx);
      }

      static async newData(data: WasmContract.PlutusData): Promise<WasmContract.OutputDatum> {
        const ret = await WasmV4.OutputDatum.new_data(data.wasm);
        return new $outer.OutputDatum(ret, $outer._ctx);
      }

      async dataHash(): Promise<Optional<WasmContract.DataHash>> {
        const ret = await this.wasm.data_hash();
        if (ret == null) return undefined;
        return new $outer.DataHash(ret, $outer._ctx);
      }

      async data(): Promise<Optional<WasmContract.PlutusData>> {
        const ret = await this.wasm.data();
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.ParameterChangeAction> {
        const ret = await WasmV4.ParameterChangeAction.from_bytes(bytes);
        return new $outer.ParameterChangeAction(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.ParameterChangeAction> {
        const ret = await WasmV4.ParameterChangeAction.from_hex(hexStr);
        return new $outer.ParameterChangeAction(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.ParameterChangeAction> {
        const ret = await WasmV4.ParameterChangeAction.from_json(json);
        return new $outer.ParameterChangeAction(ret, $outer._ctx);
      }

      async govActionId(): Promise<Optional<WasmContract.GovernanceActionId>> {
        const ret = await this.wasm.gov_action_id();
        if (ret == null) return undefined;
        return new $outer.GovernanceActionId(ret, $outer._ctx);
      }

      async protocolParamUpdates(): Promise<WasmContract.ProtocolParamUpdate> {
        const ret = await this.wasm.protocol_param_updates();
        return new $outer.ProtocolParamUpdate(ret, $outer._ctx);
      }

      async policyHash(): Promise<Optional<WasmContract.ScriptHash>> {
        const ret = await this.wasm.policy_hash();
        if (ret == null) return undefined;
        return new $outer.ScriptHash(ret, $outer._ctx);
      }

      static async new(protocolParamUpdates: WasmContract.ProtocolParamUpdate): Promise<WasmContract.ParameterChangeAction> {
        const ret = await WasmV4.ParameterChangeAction.new(protocolParamUpdates.wasm);
        return new $outer.ParameterChangeAction(ret, $outer._ctx);
      }

      static async newWithActionId(govActionId: WasmContract.GovernanceActionId, protocolParamUpdates: WasmContract.ProtocolParamUpdate): Promise<WasmContract.ParameterChangeAction> {
        const ret = await WasmV4.ParameterChangeAction.new_with_action_id(govActionId.wasm, protocolParamUpdates.wasm);
        return new $outer.ParameterChangeAction(ret, $outer._ctx);
      }

      static async newWithPolicyHash(protocolParamUpdates: WasmContract.ProtocolParamUpdate, policyHash: WasmContract.ScriptHash): Promise<WasmContract.ParameterChangeAction> {
        const ret = await WasmV4.ParameterChangeAction.new_with_policy_hash(protocolParamUpdates.wasm, policyHash.wasm);
        return new $outer.ParameterChangeAction(ret, $outer._ctx);
      }

      static async newWithPolicyHashAndActionId(govActionId: WasmContract.GovernanceActionId, protocolParamUpdates: WasmContract.ProtocolParamUpdate, policyHash: WasmContract.ScriptHash): Promise<WasmContract.ParameterChangeAction> {
        const ret = await WasmV4.ParameterChangeAction.new_with_policy_hash_and_action_id(govActionId.wasm, protocolParamUpdates.wasm, policyHash.wasm);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.PlutusData> {
        const ret = await WasmV4.PlutusData.from_bytes(bytes);
        return new $outer.PlutusData(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.PlutusData> {
        const ret = await WasmV4.PlutusData.from_hex(hexStr);
        return new $outer.PlutusData(ret, $outer._ctx);
      }

      static async newConstrPlutusData(constrPlutusData: WasmContract.ConstrPlutusData): Promise<WasmContract.PlutusData> {
        const ret = await WasmV4.PlutusData.new_constr_plutus_data(constrPlutusData.wasm);
        return new $outer.PlutusData(ret, $outer._ctx);
      }

      static async newEmptyConstrPlutusData(alternative: WasmContract.BigNum): Promise<WasmContract.PlutusData> {
        const ret = await WasmV4.PlutusData.new_empty_constr_plutus_data(alternative.wasm);
        return new $outer.PlutusData(ret, $outer._ctx);
      }

      static async newSingleValueConstrPlutusData(alternative: WasmContract.BigNum, plutusData: WasmContract.PlutusData): Promise<WasmContract.PlutusData> {
        const ret = await WasmV4.PlutusData.new_single_value_constr_plutus_data(alternative.wasm, plutusData.wasm);
        return new $outer.PlutusData(ret, $outer._ctx);
      }

      static async newMap(map: WasmContract.PlutusMap): Promise<WasmContract.PlutusData> {
        const ret = await WasmV4.PlutusData.new_map(map.wasm);
        return new $outer.PlutusData(ret, $outer._ctx);
      }

      static async newList(list: WasmContract.PlutusList): Promise<WasmContract.PlutusData> {
        const ret = await WasmV4.PlutusData.new_list(list.wasm);
        return new $outer.PlutusData(ret, $outer._ctx);
      }

      static async newInteger(integer: WasmContract.BigInt): Promise<WasmContract.PlutusData> {
        const ret = await WasmV4.PlutusData.new_integer(integer.wasm);
        return new $outer.PlutusData(ret, $outer._ctx);
      }

      static async newBytes(bytes: Uint8Array): Promise<WasmContract.PlutusData> {
        const ret = await WasmV4.PlutusData.new_bytes(bytes);
        return new $outer.PlutusData(ret, $outer._ctx);
      }

      kind(): Promise<WasmContract.PlutusDataKind> {
        return this.wasm.kind();
      }

      async asConstrPlutusData(): Promise<Optional<WasmContract.ConstrPlutusData>> {
        const ret = await this.wasm.as_constr_plutus_data();
        if (ret == null) return undefined;
        return new $outer.ConstrPlutusData(ret, $outer._ctx);
      }

      async asMap(): Promise<Optional<WasmContract.PlutusMap>> {
        const ret = await this.wasm.as_map();
        if (ret == null) return undefined;
        return new $outer.PlutusMap(ret, $outer._ctx);
      }

      async asList(): Promise<Optional<WasmContract.PlutusList>> {
        const ret = await this.wasm.as_list();
        if (ret == null) return undefined;
        return new $outer.PlutusList(ret, $outer._ctx);
      }

      async asInteger(): Promise<Optional<WasmContract.BigInt>> {
        const ret = await this.wasm.as_integer();
        if (ret == null) return undefined;
        return new $outer.BigInt(ret, $outer._ctx);
      }

      asBytes(): Promise<Optional<Uint8Array>> {
        return this.wasm.as_bytes();
      }

      toJson(schema: WasmContract.PlutusDatumSchema): Promise<string> {
        return this.wasm.to_json(schema);
      }

      static async fromJson(json: string, schema: WasmContract.PlutusDatumSchema): Promise<WasmContract.PlutusData> {
        const ret = await WasmV4.PlutusData.from_json(json, schema);
        return new $outer.PlutusData(ret, $outer._ctx);
      }

      static async fromAddress(address: WasmContract.Address): Promise<WasmContract.PlutusData> {
        const ret = await WasmV4.PlutusData.from_address(address.wasm);
        return new $outer.PlutusData(ret, $outer._ctx);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.PlutusList> {
        const ret = await WasmV4.PlutusList.from_bytes(bytes);
        return new $outer.PlutusList(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.PlutusList> {
        const ret = await WasmV4.PlutusList.from_hex(hexStr);
        return new $outer.PlutusList(ret, $outer._ctx);
      }

      static async new(): Promise<WasmContract.PlutusList> {
        const ret = await WasmV4.PlutusList.new();
        return new $outer.PlutusList(ret, $outer._ctx);
      }

      len(): Promise<number> {
        return this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.PlutusData> {
        const ret = await this.wasm.get(index);
        return new $outer.PlutusData(ret, $outer._ctx);
      }

      add(elem: WasmContract.PlutusData): Promise<void> {
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.PlutusMap> {
        const ret = await WasmV4.PlutusMap.from_bytes(bytes);
        return new $outer.PlutusMap(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.PlutusMap> {
        const ret = await WasmV4.PlutusMap.from_hex(hexStr);
        return new $outer.PlutusMap(ret, $outer._ctx);
      }

      static async new(): Promise<WasmContract.PlutusMap> {
        const ret = await WasmV4.PlutusMap.new();
        return new $outer.PlutusMap(ret, $outer._ctx);
      }

      len(): Promise<number> {
        return this.wasm.len();
      }

      async insert(key: WasmContract.PlutusData, value: WasmContract.PlutusData): Promise<Optional<WasmContract.PlutusData>> {
        const ret = await this.wasm.insert(key.wasm, value.wasm);
        if (ret == null) return undefined;
        return new $outer.PlutusData(ret, $outer._ctx);
      }

      async get(key: WasmContract.PlutusData): Promise<Optional<WasmContract.PlutusData>> {
        const ret = await this.wasm.get(key.wasm);
        if (ret == null) return undefined;
        return new $outer.PlutusData(ret, $outer._ctx);
      }

      async keys(): Promise<WasmContract.PlutusList> {
        const ret = await this.wasm.keys();
        return new $outer.PlutusList(ret, $outer._ctx);
      }

    }
    return PlutusMap;
  })();

  public PlutusScript = (() => {
    const $outer = this;

    class PlutusScript
      extends Ptr<WasmV4.PlutusScript>
      implements WasmContract.PlutusScript
    {

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.PlutusScript> {
        const ret = await WasmV4.PlutusScript.from_bytes(bytes);
        return new $outer.PlutusScript(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.PlutusScript> {
        const ret = await WasmV4.PlutusScript.from_hex(hexStr);
        return new $outer.PlutusScript(ret, $outer._ctx);
      }

      static async new(bytes: Uint8Array): Promise<WasmContract.PlutusScript> {
        const ret = await WasmV4.PlutusScript.new(bytes);
        return new $outer.PlutusScript(ret, $outer._ctx);
      }

      static async newV2(bytes: Uint8Array): Promise<WasmContract.PlutusScript> {
        const ret = await WasmV4.PlutusScript.new_v2(bytes);
        return new $outer.PlutusScript(ret, $outer._ctx);
      }

      static async newV3(bytes: Uint8Array): Promise<WasmContract.PlutusScript> {
        const ret = await WasmV4.PlutusScript.new_v3(bytes);
        return new $outer.PlutusScript(ret, $outer._ctx);
      }

      static async newWithVersion(bytes: Uint8Array, language: WasmContract.Language): Promise<WasmContract.PlutusScript> {
        const ret = await WasmV4.PlutusScript.new_with_version(bytes, language.wasm);
        return new $outer.PlutusScript(ret, $outer._ctx);
      }

      bytes(): Promise<Uint8Array> {
        return this.wasm.bytes();
      }

      static async fromBytesV2(bytes: Uint8Array): Promise<WasmContract.PlutusScript> {
        const ret = await WasmV4.PlutusScript.from_bytes_v2(bytes);
        return new $outer.PlutusScript(ret, $outer._ctx);
      }

      static async fromBytesV3(bytes: Uint8Array): Promise<WasmContract.PlutusScript> {
        const ret = await WasmV4.PlutusScript.from_bytes_v3(bytes);
        return new $outer.PlutusScript(ret, $outer._ctx);
      }

      static async fromBytesWithVersion(bytes: Uint8Array, language: WasmContract.Language): Promise<WasmContract.PlutusScript> {
        const ret = await WasmV4.PlutusScript.from_bytes_with_version(bytes, language.wasm);
        return new $outer.PlutusScript(ret, $outer._ctx);
      }

      static async fromHexWithVersion(hexStr: string, language: WasmContract.Language): Promise<WasmContract.PlutusScript> {
        const ret = await WasmV4.PlutusScript.from_hex_with_version(hexStr, language.wasm);
        return new $outer.PlutusScript(ret, $outer._ctx);
      }

      async hash(): Promise<WasmContract.ScriptHash> {
        const ret = await this.wasm.hash();
        return new $outer.ScriptHash(ret, $outer._ctx);
      }

      async languageVersion(): Promise<WasmContract.Language> {
        const ret = await this.wasm.language_version();
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

      static async new(script: WasmContract.PlutusScript): Promise<WasmContract.PlutusScriptSource> {
        const ret = await WasmV4.PlutusScriptSource.new(script.wasm);
        return new $outer.PlutusScriptSource(ret, $outer._ctx);
      }

      static async newRefInput(scriptHash: WasmContract.ScriptHash, input: WasmContract.TransactionInput, langVer: WasmContract.Language, scriptSize: number): Promise<WasmContract.PlutusScriptSource> {
        const ret = await WasmV4.PlutusScriptSource.new_ref_input(scriptHash.wasm, input.wasm, langVer.wasm, scriptSize);
        return new $outer.PlutusScriptSource(ret, $outer._ctx);
      }

      setRequiredSigners(keyHashes: WasmContract.Ed25519KeyHashes): Promise<void> {
        return this.wasm.set_required_signers(keyHashes.wasm);
      }

      getRefScriptSize(): Promise<Optional<number>> {
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.PlutusScripts> {
        const ret = await WasmV4.PlutusScripts.from_bytes(bytes);
        return new $outer.PlutusScripts(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.PlutusScripts> {
        const ret = await WasmV4.PlutusScripts.from_hex(hexStr);
        return new $outer.PlutusScripts(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.PlutusScripts> {
        const ret = await WasmV4.PlutusScripts.from_json(json);
        return new $outer.PlutusScripts(ret, $outer._ctx);
      }

      static async new(): Promise<WasmContract.PlutusScripts> {
        const ret = await WasmV4.PlutusScripts.new();
        return new $outer.PlutusScripts(ret, $outer._ctx);
      }

      len(): Promise<number> {
        return this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.PlutusScript> {
        const ret = await this.wasm.get(index);
        return new $outer.PlutusScript(ret, $outer._ctx);
      }

      add(elem: WasmContract.PlutusScript): Promise<void> {
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

      static async new(script: WasmContract.PlutusScript, datum: WasmContract.PlutusData, redeemer: WasmContract.Redeemer): Promise<WasmContract.PlutusWitness> {
        const ret = await WasmV4.PlutusWitness.new(script.wasm, datum.wasm, redeemer.wasm);
        return new $outer.PlutusWitness(ret, $outer._ctx);
      }

      static async newWithRef(script: WasmContract.PlutusScriptSource, datum: WasmContract.DatumSource, redeemer: WasmContract.Redeemer): Promise<WasmContract.PlutusWitness> {
        const ret = await WasmV4.PlutusWitness.new_with_ref(script.wasm, datum.wasm, redeemer.wasm);
        return new $outer.PlutusWitness(ret, $outer._ctx);
      }

      static async newWithoutDatum(script: WasmContract.PlutusScript, redeemer: WasmContract.Redeemer): Promise<WasmContract.PlutusWitness> {
        const ret = await WasmV4.PlutusWitness.new_without_datum(script.wasm, redeemer.wasm);
        return new $outer.PlutusWitness(ret, $outer._ctx);
      }

      static async newWithRefWithoutDatum(script: WasmContract.PlutusScriptSource, redeemer: WasmContract.Redeemer): Promise<WasmContract.PlutusWitness> {
        const ret = await WasmV4.PlutusWitness.new_with_ref_without_datum(script.wasm, redeemer.wasm);
        return new $outer.PlutusWitness(ret, $outer._ctx);
      }

      async script(): Promise<Optional<WasmContract.PlutusScript>> {
        const ret = await this.wasm.script();
        if (ret == null) return undefined;
        return new $outer.PlutusScript(ret, $outer._ctx);
      }

      async datum(): Promise<Optional<WasmContract.PlutusData>> {
        const ret = await this.wasm.datum();
        if (ret == null) return undefined;
        return new $outer.PlutusData(ret, $outer._ctx);
      }

      async redeemer(): Promise<WasmContract.Redeemer> {
        const ret = await this.wasm.redeemer();
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

      static async new(): Promise<WasmContract.PlutusWitnesses> {
        const ret = await WasmV4.PlutusWitnesses.new();
        return new $outer.PlutusWitnesses(ret, $outer._ctx);
      }

      len(): Promise<number> {
        return this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.PlutusWitness> {
        const ret = await this.wasm.get(index);
        return new $outer.PlutusWitness(ret, $outer._ctx);
      }

      add(elem: WasmContract.PlutusWitness): Promise<void> {
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

      static async new(slot: number, txIndex: number, certIndex: number): Promise<WasmContract.Pointer> {
        const ret = await WasmV4.Pointer.new(slot, txIndex, certIndex);
        return new $outer.Pointer(ret, $outer._ctx);
      }

      static async newPointer(slot: WasmContract.BigNum, txIndex: WasmContract.BigNum, certIndex: WasmContract.BigNum): Promise<WasmContract.Pointer> {
        const ret = await WasmV4.Pointer.new_pointer(slot.wasm, txIndex.wasm, certIndex.wasm);
        return new $outer.Pointer(ret, $outer._ctx);
      }

      slot(): Promise<number> {
        return this.wasm.slot();
      }

      txIndex(): Promise<number> {
        return this.wasm.tx_index();
      }

      certIndex(): Promise<number> {
        return this.wasm.cert_index();
      }

      async slotBignum(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.slot_bignum();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      async txIndexBignum(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.tx_index_bignum();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      async certIndexBignum(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.cert_index_bignum();
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

      static async new(network: number, payment: WasmContract.Credential, stake: WasmContract.Pointer): Promise<WasmContract.PointerAddress> {
        const ret = await WasmV4.PointerAddress.new(network, payment.wasm, stake.wasm);
        return new $outer.PointerAddress(ret, $outer._ctx);
      }

      async paymentCred(): Promise<WasmContract.Credential> {
        const ret = await this.wasm.payment_cred();
        return new $outer.Credential(ret, $outer._ctx);
      }

      async stakePointer(): Promise<WasmContract.Pointer> {
        const ret = await this.wasm.stake_pointer();
        return new $outer.Pointer(ret, $outer._ctx);
      }

      async toAddress(): Promise<WasmContract.Address> {
        const ret = await this.wasm.to_address();
        return new $outer.Address(ret, $outer._ctx);
      }

      static async fromAddress(addr: WasmContract.Address): Promise<Optional<WasmContract.PointerAddress>> {
        const ret = await WasmV4.PointerAddress.from_address(addr.wasm);
        if (ret == null) return undefined;
        return new $outer.PointerAddress(ret, $outer._ctx);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.PoolMetadata> {
        const ret = await WasmV4.PoolMetadata.from_bytes(bytes);
        return new $outer.PoolMetadata(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.PoolMetadata> {
        const ret = await WasmV4.PoolMetadata.from_hex(hexStr);
        return new $outer.PoolMetadata(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.PoolMetadata> {
        const ret = await WasmV4.PoolMetadata.from_json(json);
        return new $outer.PoolMetadata(ret, $outer._ctx);
      }

      async url(): Promise<WasmContract.URL> {
        const ret = await this.wasm.url();
        return new $outer.URL(ret, $outer._ctx);
      }

      async poolMetadataHash(): Promise<WasmContract.PoolMetadataHash> {
        const ret = await this.wasm.pool_metadata_hash();
        return new $outer.PoolMetadataHash(ret, $outer._ctx);
      }

      static async new(url: WasmContract.URL, poolMetadataHash: WasmContract.PoolMetadataHash): Promise<WasmContract.PoolMetadata> {
        const ret = await WasmV4.PoolMetadata.new(url.wasm, poolMetadataHash.wasm);
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

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.PoolMetadataHash> {
        const ret = await WasmV4.PoolMetadataHash.from_bytes(bytes);
        return new $outer.PoolMetadataHash(ret, $outer._ctx);
      }

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      toBech32(prefix: string): Promise<string> {
        return this.wasm.to_bech32(prefix);
      }

      static async fromBech32(bechStr: string): Promise<WasmContract.PoolMetadataHash> {
        const ret = await WasmV4.PoolMetadataHash.from_bech32(bechStr);
        return new $outer.PoolMetadataHash(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hex: string): Promise<WasmContract.PoolMetadataHash> {
        const ret = await WasmV4.PoolMetadataHash.from_hex(hex);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.PoolParams> {
        const ret = await WasmV4.PoolParams.from_bytes(bytes);
        return new $outer.PoolParams(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.PoolParams> {
        const ret = await WasmV4.PoolParams.from_hex(hexStr);
        return new $outer.PoolParams(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.PoolParams> {
        const ret = await WasmV4.PoolParams.from_json(json);
        return new $outer.PoolParams(ret, $outer._ctx);
      }

      async operator(): Promise<WasmContract.Ed25519KeyHash> {
        const ret = await this.wasm.operator();
        return new $outer.Ed25519KeyHash(ret, $outer._ctx);
      }

      async vrfKeyhash(): Promise<WasmContract.VRFKeyHash> {
        const ret = await this.wasm.vrf_keyhash();
        return new $outer.VRFKeyHash(ret, $outer._ctx);
      }

      async pledge(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.pledge();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      async cost(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.cost();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      async margin(): Promise<WasmContract.UnitInterval> {
        const ret = await this.wasm.margin();
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      async rewardAccount(): Promise<WasmContract.RewardAddress> {
        const ret = await this.wasm.reward_account();
        return new $outer.RewardAddress(ret, $outer._ctx);
      }

      async poolOwners(): Promise<WasmContract.Ed25519KeyHashes> {
        const ret = await this.wasm.pool_owners();
        return new $outer.Ed25519KeyHashes(ret, $outer._ctx);
      }

      async relays(): Promise<WasmContract.Relays> {
        const ret = await this.wasm.relays();
        return new $outer.Relays(ret, $outer._ctx);
      }

      async poolMetadata(): Promise<Optional<WasmContract.PoolMetadata>> {
        const ret = await this.wasm.pool_metadata();
        if (ret == null) return undefined;
        return new $outer.PoolMetadata(ret, $outer._ctx);
      }

      static async new(operator: WasmContract.Ed25519KeyHash, vrfKeyhash: WasmContract.VRFKeyHash, pledge: WasmContract.BigNum, cost: WasmContract.BigNum, margin: WasmContract.UnitInterval, rewardAccount: WasmContract.RewardAddress, poolOwners: WasmContract.Ed25519KeyHashes, relays: WasmContract.Relays, poolMetadata: Optional<WasmContract.PoolMetadata>): Promise<WasmContract.PoolParams> {
        const ret = await WasmV4.PoolParams.new(operator.wasm, vrfKeyhash.wasm, pledge.wasm, cost.wasm, margin.wasm, rewardAccount.wasm, poolOwners.wasm, relays.wasm, poolMetadata?.wasm);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.PoolRegistration> {
        const ret = await WasmV4.PoolRegistration.from_bytes(bytes);
        return new $outer.PoolRegistration(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.PoolRegistration> {
        const ret = await WasmV4.PoolRegistration.from_hex(hexStr);
        return new $outer.PoolRegistration(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.PoolRegistration> {
        const ret = await WasmV4.PoolRegistration.from_json(json);
        return new $outer.PoolRegistration(ret, $outer._ctx);
      }

      async poolParams(): Promise<WasmContract.PoolParams> {
        const ret = await this.wasm.pool_params();
        return new $outer.PoolParams(ret, $outer._ctx);
      }

      static async new(poolParams: WasmContract.PoolParams): Promise<WasmContract.PoolRegistration> {
        const ret = await WasmV4.PoolRegistration.new(poolParams.wasm);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.PoolRetirement> {
        const ret = await WasmV4.PoolRetirement.from_bytes(bytes);
        return new $outer.PoolRetirement(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.PoolRetirement> {
        const ret = await WasmV4.PoolRetirement.from_hex(hexStr);
        return new $outer.PoolRetirement(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.PoolRetirement> {
        const ret = await WasmV4.PoolRetirement.from_json(json);
        return new $outer.PoolRetirement(ret, $outer._ctx);
      }

      async poolKeyhash(): Promise<WasmContract.Ed25519KeyHash> {
        const ret = await this.wasm.pool_keyhash();
        return new $outer.Ed25519KeyHash(ret, $outer._ctx);
      }

      epoch(): Promise<number> {
        return this.wasm.epoch();
      }

      static async new(poolKeyhash: WasmContract.Ed25519KeyHash, epoch: number): Promise<WasmContract.PoolRetirement> {
        const ret = await WasmV4.PoolRetirement.new(poolKeyhash.wasm, epoch);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.PoolVotingThresholds> {
        const ret = await WasmV4.PoolVotingThresholds.from_bytes(bytes);
        return new $outer.PoolVotingThresholds(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.PoolVotingThresholds> {
        const ret = await WasmV4.PoolVotingThresholds.from_hex(hexStr);
        return new $outer.PoolVotingThresholds(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.PoolVotingThresholds> {
        const ret = await WasmV4.PoolVotingThresholds.from_json(json);
        return new $outer.PoolVotingThresholds(ret, $outer._ctx);
      }

      static async new(motionNoConfidence: WasmContract.UnitInterval, committeeNormal: WasmContract.UnitInterval, committeeNoConfidence: WasmContract.UnitInterval, hardForkInitiation: WasmContract.UnitInterval, securityRelevantThreshold: WasmContract.UnitInterval): Promise<WasmContract.PoolVotingThresholds> {
        const ret = await WasmV4.PoolVotingThresholds.new(motionNoConfidence.wasm, committeeNormal.wasm, committeeNoConfidence.wasm, hardForkInitiation.wasm, securityRelevantThreshold.wasm);
        return new $outer.PoolVotingThresholds(ret, $outer._ctx);
      }

      async motionNoConfidence(): Promise<WasmContract.UnitInterval> {
        const ret = await this.wasm.motion_no_confidence();
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      async committeeNormal(): Promise<WasmContract.UnitInterval> {
        const ret = await this.wasm.committee_normal();
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      async committeeNoConfidence(): Promise<WasmContract.UnitInterval> {
        const ret = await this.wasm.committee_no_confidence();
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      async hardForkInitiation(): Promise<WasmContract.UnitInterval> {
        const ret = await this.wasm.hard_fork_initiation();
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

      async toPublic(): Promise<WasmContract.PublicKey> {
        const ret = await this.wasm.to_public();
        return new $outer.PublicKey(ret, $outer._ctx);
      }

      static async generateEd25519(): Promise<WasmContract.PrivateKey> {
        const ret = await WasmV4.PrivateKey.generate_ed25519();
        return new $outer.PrivateKey(ret, $outer._ctx);
      }

      static async generateEd25519extended(): Promise<WasmContract.PrivateKey> {
        const ret = await WasmV4.PrivateKey.generate_ed25519extended();
        return new $outer.PrivateKey(ret, $outer._ctx);
      }

      static async fromBech32(bech32Str: string): Promise<WasmContract.PrivateKey> {
        const ret = await WasmV4.PrivateKey.from_bech32(bech32Str);
        return new $outer.PrivateKey(ret, $outer._ctx);
      }

      toBech32(): Promise<string> {
        return this.wasm.to_bech32();
      }

      asBytes(): Promise<Uint8Array> {
        return this.wasm.as_bytes();
      }

      static async fromExtendedBytes(bytes: Uint8Array): Promise<WasmContract.PrivateKey> {
        const ret = await WasmV4.PrivateKey.from_extended_bytes(bytes);
        return new $outer.PrivateKey(ret, $outer._ctx);
      }

      static async fromNormalBytes(bytes: Uint8Array): Promise<WasmContract.PrivateKey> {
        const ret = await WasmV4.PrivateKey.from_normal_bytes(bytes);
        return new $outer.PrivateKey(ret, $outer._ctx);
      }

      async sign(message: Uint8Array): Promise<WasmContract.Ed25519Signature> {
        const ret = await this.wasm.sign(message);
        return new $outer.Ed25519Signature(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.PrivateKey> {
        const ret = await WasmV4.PrivateKey.from_hex(hexStr);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.ProposedProtocolParameterUpdates> {
        const ret = await WasmV4.ProposedProtocolParameterUpdates.from_bytes(bytes);
        return new $outer.ProposedProtocolParameterUpdates(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.ProposedProtocolParameterUpdates> {
        const ret = await WasmV4.ProposedProtocolParameterUpdates.from_hex(hexStr);
        return new $outer.ProposedProtocolParameterUpdates(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.ProposedProtocolParameterUpdates> {
        const ret = await WasmV4.ProposedProtocolParameterUpdates.from_json(json);
        return new $outer.ProposedProtocolParameterUpdates(ret, $outer._ctx);
      }

      static async new(): Promise<WasmContract.ProposedProtocolParameterUpdates> {
        const ret = await WasmV4.ProposedProtocolParameterUpdates.new();
        return new $outer.ProposedProtocolParameterUpdates(ret, $outer._ctx);
      }

      len(): Promise<number> {
        return this.wasm.len();
      }

      async insert(key: WasmContract.GenesisHash, value: WasmContract.ProtocolParamUpdate): Promise<Optional<WasmContract.ProtocolParamUpdate>> {
        const ret = await this.wasm.insert(key.wasm, value.wasm);
        if (ret == null) return undefined;
        return new $outer.ProtocolParamUpdate(ret, $outer._ctx);
      }

      async get(key: WasmContract.GenesisHash): Promise<Optional<WasmContract.ProtocolParamUpdate>> {
        const ret = await this.wasm.get(key.wasm);
        if (ret == null) return undefined;
        return new $outer.ProtocolParamUpdate(ret, $outer._ctx);
      }

      async keys(): Promise<WasmContract.GenesisHashes> {
        const ret = await this.wasm.keys();
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.ProtocolParamUpdate> {
        const ret = await WasmV4.ProtocolParamUpdate.from_bytes(bytes);
        return new $outer.ProtocolParamUpdate(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.ProtocolParamUpdate> {
        const ret = await WasmV4.ProtocolParamUpdate.from_hex(hexStr);
        return new $outer.ProtocolParamUpdate(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.ProtocolParamUpdate> {
        const ret = await WasmV4.ProtocolParamUpdate.from_json(json);
        return new $outer.ProtocolParamUpdate(ret, $outer._ctx);
      }

      setMinfeeA(minfeeA: WasmContract.BigNum): Promise<void> {
        return this.wasm.set_minfee_a(minfeeA.wasm);
      }

      async minfeeA(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.minfee_a();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      setMinfeeB(minfeeB: WasmContract.BigNum): Promise<void> {
        return this.wasm.set_minfee_b(minfeeB.wasm);
      }

      async minfeeB(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.minfee_b();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      setMaxBlockBodySize(maxBlockBodySize: number): Promise<void> {
        return this.wasm.set_max_block_body_size(maxBlockBodySize);
      }

      maxBlockBodySize(): Promise<Optional<number>> {
        return this.wasm.max_block_body_size();
      }

      setMaxTxSize(maxTxSize: number): Promise<void> {
        return this.wasm.set_max_tx_size(maxTxSize);
      }

      maxTxSize(): Promise<Optional<number>> {
        return this.wasm.max_tx_size();
      }

      setMaxBlockHeaderSize(maxBlockHeaderSize: number): Promise<void> {
        return this.wasm.set_max_block_header_size(maxBlockHeaderSize);
      }

      maxBlockHeaderSize(): Promise<Optional<number>> {
        return this.wasm.max_block_header_size();
      }

      setKeyDeposit(keyDeposit: WasmContract.BigNum): Promise<void> {
        return this.wasm.set_key_deposit(keyDeposit.wasm);
      }

      async keyDeposit(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.key_deposit();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      setPoolDeposit(poolDeposit: WasmContract.BigNum): Promise<void> {
        return this.wasm.set_pool_deposit(poolDeposit.wasm);
      }

      async poolDeposit(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.pool_deposit();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      setMaxEpoch(maxEpoch: number): Promise<void> {
        return this.wasm.set_max_epoch(maxEpoch);
      }

      maxEpoch(): Promise<Optional<number>> {
        return this.wasm.max_epoch();
      }

      setNOpt(nOpt: number): Promise<void> {
        return this.wasm.set_n_opt(nOpt);
      }

      nOpt(): Promise<Optional<number>> {
        return this.wasm.n_opt();
      }

      setPoolPledgeInfluence(poolPledgeInfluence: WasmContract.UnitInterval): Promise<void> {
        return this.wasm.set_pool_pledge_influence(poolPledgeInfluence.wasm);
      }

      async poolPledgeInfluence(): Promise<Optional<WasmContract.UnitInterval>> {
        const ret = await this.wasm.pool_pledge_influence();
        if (ret == null) return undefined;
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      setExpansionRate(expansionRate: WasmContract.UnitInterval): Promise<void> {
        return this.wasm.set_expansion_rate(expansionRate.wasm);
      }

      async expansionRate(): Promise<Optional<WasmContract.UnitInterval>> {
        const ret = await this.wasm.expansion_rate();
        if (ret == null) return undefined;
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      setTreasuryGrowthRate(treasuryGrowthRate: WasmContract.UnitInterval): Promise<void> {
        return this.wasm.set_treasury_growth_rate(treasuryGrowthRate.wasm);
      }

      async treasuryGrowthRate(): Promise<Optional<WasmContract.UnitInterval>> {
        const ret = await this.wasm.treasury_growth_rate();
        if (ret == null) return undefined;
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      async d(): Promise<Optional<WasmContract.UnitInterval>> {
        const ret = await this.wasm.d();
        if (ret == null) return undefined;
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      async extraEntropy(): Promise<Optional<WasmContract.Nonce>> {
        const ret = await this.wasm.extra_entropy();
        if (ret == null) return undefined;
        return new $outer.Nonce(ret, $outer._ctx);
      }

      setProtocolVersion(protocolVersion: WasmContract.ProtocolVersion): Promise<void> {
        return this.wasm.set_protocol_version(protocolVersion.wasm);
      }

      async protocolVersion(): Promise<Optional<WasmContract.ProtocolVersion>> {
        const ret = await this.wasm.protocol_version();
        if (ret == null) return undefined;
        return new $outer.ProtocolVersion(ret, $outer._ctx);
      }

      setMinPoolCost(minPoolCost: WasmContract.BigNum): Promise<void> {
        return this.wasm.set_min_pool_cost(minPoolCost.wasm);
      }

      async minPoolCost(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.min_pool_cost();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      setAdaPerUtxoByte(adaPerUtxoByte: WasmContract.BigNum): Promise<void> {
        return this.wasm.set_ada_per_utxo_byte(adaPerUtxoByte.wasm);
      }

      async adaPerUtxoByte(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.ada_per_utxo_byte();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      setCostModels(costModels: WasmContract.Costmdls): Promise<void> {
        return this.wasm.set_cost_models(costModels.wasm);
      }

      async costModels(): Promise<Optional<WasmContract.Costmdls>> {
        const ret = await this.wasm.cost_models();
        if (ret == null) return undefined;
        return new $outer.Costmdls(ret, $outer._ctx);
      }

      setExecutionCosts(executionCosts: WasmContract.ExUnitPrices): Promise<void> {
        return this.wasm.set_execution_costs(executionCosts.wasm);
      }

      async executionCosts(): Promise<Optional<WasmContract.ExUnitPrices>> {
        const ret = await this.wasm.execution_costs();
        if (ret == null) return undefined;
        return new $outer.ExUnitPrices(ret, $outer._ctx);
      }

      setMaxTxExUnits(maxTxExUnits: WasmContract.ExUnits): Promise<void> {
        return this.wasm.set_max_tx_ex_units(maxTxExUnits.wasm);
      }

      async maxTxExUnits(): Promise<Optional<WasmContract.ExUnits>> {
        const ret = await this.wasm.max_tx_ex_units();
        if (ret == null) return undefined;
        return new $outer.ExUnits(ret, $outer._ctx);
      }

      setMaxBlockExUnits(maxBlockExUnits: WasmContract.ExUnits): Promise<void> {
        return this.wasm.set_max_block_ex_units(maxBlockExUnits.wasm);
      }

      async maxBlockExUnits(): Promise<Optional<WasmContract.ExUnits>> {
        const ret = await this.wasm.max_block_ex_units();
        if (ret == null) return undefined;
        return new $outer.ExUnits(ret, $outer._ctx);
      }

      setMaxValueSize(maxValueSize: number): Promise<void> {
        return this.wasm.set_max_value_size(maxValueSize);
      }

      maxValueSize(): Promise<Optional<number>> {
        return this.wasm.max_value_size();
      }

      setCollateralPercentage(collateralPercentage: number): Promise<void> {
        return this.wasm.set_collateral_percentage(collateralPercentage);
      }

      collateralPercentage(): Promise<Optional<number>> {
        return this.wasm.collateral_percentage();
      }

      setMaxCollateralInputs(maxCollateralInputs: number): Promise<void> {
        return this.wasm.set_max_collateral_inputs(maxCollateralInputs);
      }

      maxCollateralInputs(): Promise<Optional<number>> {
        return this.wasm.max_collateral_inputs();
      }

      setPoolVotingThresholds(poolVotingThresholds: WasmContract.PoolVotingThresholds): Promise<void> {
        return this.wasm.set_pool_voting_thresholds(poolVotingThresholds.wasm);
      }

      async poolVotingThresholds(): Promise<Optional<WasmContract.PoolVotingThresholds>> {
        const ret = await this.wasm.pool_voting_thresholds();
        if (ret == null) return undefined;
        return new $outer.PoolVotingThresholds(ret, $outer._ctx);
      }

      setDrepVotingThresholds(drepVotingThresholds: WasmContract.DrepVotingThresholds): Promise<void> {
        return this.wasm.set_drep_voting_thresholds(drepVotingThresholds.wasm);
      }

      async drepVotingThresholds(): Promise<Optional<WasmContract.DrepVotingThresholds>> {
        const ret = await this.wasm.drep_voting_thresholds();
        if (ret == null) return undefined;
        return new $outer.DrepVotingThresholds(ret, $outer._ctx);
      }

      setMinCommitteeSize(minCommitteeSize: number): Promise<void> {
        return this.wasm.set_min_committee_size(minCommitteeSize);
      }

      minCommitteeSize(): Promise<Optional<number>> {
        return this.wasm.min_committee_size();
      }

      setCommitteeTermLimit(committeeTermLimit: number): Promise<void> {
        return this.wasm.set_committee_term_limit(committeeTermLimit);
      }

      committeeTermLimit(): Promise<Optional<number>> {
        return this.wasm.committee_term_limit();
      }

      setGovernanceActionValidityPeriod(governanceActionValidityPeriod: number): Promise<void> {
        return this.wasm.set_governance_action_validity_period(governanceActionValidityPeriod);
      }

      governanceActionValidityPeriod(): Promise<Optional<number>> {
        return this.wasm.governance_action_validity_period();
      }

      setGovernanceActionDeposit(governanceActionDeposit: WasmContract.BigNum): Promise<void> {
        return this.wasm.set_governance_action_deposit(governanceActionDeposit.wasm);
      }

      async governanceActionDeposit(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.governance_action_deposit();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      setDrepDeposit(drepDeposit: WasmContract.BigNum): Promise<void> {
        return this.wasm.set_drep_deposit(drepDeposit.wasm);
      }

      async drepDeposit(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.drep_deposit();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      setDrepInactivityPeriod(drepInactivityPeriod: number): Promise<void> {
        return this.wasm.set_drep_inactivity_period(drepInactivityPeriod);
      }

      drepInactivityPeriod(): Promise<Optional<number>> {
        return this.wasm.drep_inactivity_period();
      }

      setRefScriptCoinsPerByte(refScriptCoinsPerByte: WasmContract.UnitInterval): Promise<void> {
        return this.wasm.set_ref_script_coins_per_byte(refScriptCoinsPerByte.wasm);
      }

      async refScriptCoinsPerByte(): Promise<Optional<WasmContract.UnitInterval>> {
        const ret = await this.wasm.ref_script_coins_per_byte();
        if (ret == null) return undefined;
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      static async new(): Promise<WasmContract.ProtocolParamUpdate> {
        const ret = await WasmV4.ProtocolParamUpdate.new();
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.ProtocolVersion> {
        const ret = await WasmV4.ProtocolVersion.from_bytes(bytes);
        return new $outer.ProtocolVersion(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.ProtocolVersion> {
        const ret = await WasmV4.ProtocolVersion.from_hex(hexStr);
        return new $outer.ProtocolVersion(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.ProtocolVersion> {
        const ret = await WasmV4.ProtocolVersion.from_json(json);
        return new $outer.ProtocolVersion(ret, $outer._ctx);
      }

      major(): Promise<number> {
        return this.wasm.major();
      }

      minor(): Promise<number> {
        return this.wasm.minor();
      }

      static async new(major: number, minor: number): Promise<WasmContract.ProtocolVersion> {
        const ret = await WasmV4.ProtocolVersion.new(major, minor);
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

      static async fromBech32(bech32Str: string): Promise<WasmContract.PublicKey> {
        const ret = await WasmV4.PublicKey.from_bech32(bech32Str);
        return new $outer.PublicKey(ret, $outer._ctx);
      }

      toBech32(): Promise<string> {
        return this.wasm.to_bech32();
      }

      asBytes(): Promise<Uint8Array> {
        return this.wasm.as_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.PublicKey> {
        const ret = await WasmV4.PublicKey.from_bytes(bytes);
        return new $outer.PublicKey(ret, $outer._ctx);
      }

      verify(data: Uint8Array, signature: WasmContract.Ed25519Signature): Promise<boolean> {
        return this.wasm.verify(data, signature.wasm);
      }

      async hash(): Promise<WasmContract.Ed25519KeyHash> {
        const ret = await this.wasm.hash();
        return new $outer.Ed25519KeyHash(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.PublicKey> {
        const ret = await WasmV4.PublicKey.from_hex(hexStr);
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

      static async new(): Promise<WasmContract.PublicKeys> {
        const ret = await WasmV4.PublicKeys.new();
        return new $outer.PublicKeys(ret, $outer._ctx);
      }

      size(): Promise<number> {
        return this.wasm.size();
      }

      async get(index: number): Promise<WasmContract.PublicKey> {
        const ret = await this.wasm.get(index);
        return new $outer.PublicKey(ret, $outer._ctx);
      }

      add(key: WasmContract.PublicKey): Promise<void> {
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Redeemer> {
        const ret = await WasmV4.Redeemer.from_bytes(bytes);
        return new $outer.Redeemer(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Redeemer> {
        const ret = await WasmV4.Redeemer.from_hex(hexStr);
        return new $outer.Redeemer(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.Redeemer> {
        const ret = await WasmV4.Redeemer.from_json(json);
        return new $outer.Redeemer(ret, $outer._ctx);
      }

      async tag(): Promise<WasmContract.RedeemerTag> {
        const ret = await this.wasm.tag();
        return new $outer.RedeemerTag(ret, $outer._ctx);
      }

      async index(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.index();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      async data(): Promise<WasmContract.PlutusData> {
        const ret = await this.wasm.data();
        return new $outer.PlutusData(ret, $outer._ctx);
      }

      async exUnits(): Promise<WasmContract.ExUnits> {
        const ret = await this.wasm.ex_units();
        return new $outer.ExUnits(ret, $outer._ctx);
      }

      static async new(tag: WasmContract.RedeemerTag, index: WasmContract.BigNum, data: WasmContract.PlutusData, exUnits: WasmContract.ExUnits): Promise<WasmContract.Redeemer> {
        const ret = await WasmV4.Redeemer.new(tag.wasm, index.wasm, data.wasm, exUnits.wasm);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.RedeemerTag> {
        const ret = await WasmV4.RedeemerTag.from_bytes(bytes);
        return new $outer.RedeemerTag(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.RedeemerTag> {
        const ret = await WasmV4.RedeemerTag.from_hex(hexStr);
        return new $outer.RedeemerTag(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.RedeemerTag> {
        const ret = await WasmV4.RedeemerTag.from_json(json);
        return new $outer.RedeemerTag(ret, $outer._ctx);
      }

      static async newSpend(): Promise<WasmContract.RedeemerTag> {
        const ret = await WasmV4.RedeemerTag.new_spend();
        return new $outer.RedeemerTag(ret, $outer._ctx);
      }

      static async newMint(): Promise<WasmContract.RedeemerTag> {
        const ret = await WasmV4.RedeemerTag.new_mint();
        return new $outer.RedeemerTag(ret, $outer._ctx);
      }

      static async newCert(): Promise<WasmContract.RedeemerTag> {
        const ret = await WasmV4.RedeemerTag.new_cert();
        return new $outer.RedeemerTag(ret, $outer._ctx);
      }

      static async newReward(): Promise<WasmContract.RedeemerTag> {
        const ret = await WasmV4.RedeemerTag.new_reward();
        return new $outer.RedeemerTag(ret, $outer._ctx);
      }

      static async newVote(): Promise<WasmContract.RedeemerTag> {
        const ret = await WasmV4.RedeemerTag.new_vote();
        return new $outer.RedeemerTag(ret, $outer._ctx);
      }

      static async newVotingProposal(): Promise<WasmContract.RedeemerTag> {
        const ret = await WasmV4.RedeemerTag.new_voting_proposal();
        return new $outer.RedeemerTag(ret, $outer._ctx);
      }

      kind(): Promise<WasmContract.RedeemerTagKind> {
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Redeemers> {
        const ret = await WasmV4.Redeemers.from_bytes(bytes);
        return new $outer.Redeemers(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Redeemers> {
        const ret = await WasmV4.Redeemers.from_hex(hexStr);
        return new $outer.Redeemers(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.Redeemers> {
        const ret = await WasmV4.Redeemers.from_json(json);
        return new $outer.Redeemers(ret, $outer._ctx);
      }

      static async new(): Promise<WasmContract.Redeemers> {
        const ret = await WasmV4.Redeemers.new();
        return new $outer.Redeemers(ret, $outer._ctx);
      }

      len(): Promise<number> {
        return this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.Redeemer> {
        const ret = await this.wasm.get(index);
        return new $outer.Redeemer(ret, $outer._ctx);
      }

      add(elem: WasmContract.Redeemer): Promise<void> {
        return this.wasm.add(elem.wasm);
      }

      async totalExUnits(): Promise<WasmContract.ExUnits> {
        const ret = await this.wasm.total_ex_units();
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Relay> {
        const ret = await WasmV4.Relay.from_bytes(bytes);
        return new $outer.Relay(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Relay> {
        const ret = await WasmV4.Relay.from_hex(hexStr);
        return new $outer.Relay(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.Relay> {
        const ret = await WasmV4.Relay.from_json(json);
        return new $outer.Relay(ret, $outer._ctx);
      }

      static async newSingleHostAddr(singleHostAddr: WasmContract.SingleHostAddr): Promise<WasmContract.Relay> {
        const ret = await WasmV4.Relay.new_single_host_addr(singleHostAddr.wasm);
        return new $outer.Relay(ret, $outer._ctx);
      }

      static async newSingleHostName(singleHostName: WasmContract.SingleHostName): Promise<WasmContract.Relay> {
        const ret = await WasmV4.Relay.new_single_host_name(singleHostName.wasm);
        return new $outer.Relay(ret, $outer._ctx);
      }

      static async newMultiHostName(multiHostName: WasmContract.MultiHostName): Promise<WasmContract.Relay> {
        const ret = await WasmV4.Relay.new_multi_host_name(multiHostName.wasm);
        return new $outer.Relay(ret, $outer._ctx);
      }

      kind(): Promise<WasmContract.RelayKind> {
        return this.wasm.kind();
      }

      async asSingleHostAddr(): Promise<Optional<WasmContract.SingleHostAddr>> {
        const ret = await this.wasm.as_single_host_addr();
        if (ret == null) return undefined;
        return new $outer.SingleHostAddr(ret, $outer._ctx);
      }

      async asSingleHostName(): Promise<Optional<WasmContract.SingleHostName>> {
        const ret = await this.wasm.as_single_host_name();
        if (ret == null) return undefined;
        return new $outer.SingleHostName(ret, $outer._ctx);
      }

      async asMultiHostName(): Promise<Optional<WasmContract.MultiHostName>> {
        const ret = await this.wasm.as_multi_host_name();
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Relays> {
        const ret = await WasmV4.Relays.from_bytes(bytes);
        return new $outer.Relays(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Relays> {
        const ret = await WasmV4.Relays.from_hex(hexStr);
        return new $outer.Relays(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.Relays> {
        const ret = await WasmV4.Relays.from_json(json);
        return new $outer.Relays(ret, $outer._ctx);
      }

      static async new(): Promise<WasmContract.Relays> {
        const ret = await WasmV4.Relays.new();
        return new $outer.Relays(ret, $outer._ctx);
      }

      len(): Promise<number> {
        return this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.Relay> {
        const ret = await this.wasm.get(index);
        return new $outer.Relay(ret, $outer._ctx);
      }

      add(elem: WasmContract.Relay): Promise<void> {
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

      static async new(network: number, payment: WasmContract.Credential): Promise<WasmContract.RewardAddress> {
        const ret = await WasmV4.RewardAddress.new(network, payment.wasm);
        return new $outer.RewardAddress(ret, $outer._ctx);
      }

      async paymentCred(): Promise<WasmContract.Credential> {
        const ret = await this.wasm.payment_cred();
        return new $outer.Credential(ret, $outer._ctx);
      }

      async toAddress(): Promise<WasmContract.Address> {
        const ret = await this.wasm.to_address();
        return new $outer.Address(ret, $outer._ctx);
      }

      static async fromAddress(addr: WasmContract.Address): Promise<Optional<WasmContract.RewardAddress>> {
        const ret = await WasmV4.RewardAddress.from_address(addr.wasm);
        if (ret == null) return undefined;
        return new $outer.RewardAddress(ret, $outer._ctx);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.RewardAddresses> {
        const ret = await WasmV4.RewardAddresses.from_bytes(bytes);
        return new $outer.RewardAddresses(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.RewardAddresses> {
        const ret = await WasmV4.RewardAddresses.from_hex(hexStr);
        return new $outer.RewardAddresses(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.RewardAddresses> {
        const ret = await WasmV4.RewardAddresses.from_json(json);
        return new $outer.RewardAddresses(ret, $outer._ctx);
      }

      static async new(): Promise<WasmContract.RewardAddresses> {
        const ret = await WasmV4.RewardAddresses.new();
        return new $outer.RewardAddresses(ret, $outer._ctx);
      }

      len(): Promise<number> {
        return this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.RewardAddress> {
        const ret = await this.wasm.get(index);
        return new $outer.RewardAddress(ret, $outer._ctx);
      }

      add(elem: WasmContract.RewardAddress): Promise<void> {
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.ScriptAll> {
        const ret = await WasmV4.ScriptAll.from_bytes(bytes);
        return new $outer.ScriptAll(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.ScriptAll> {
        const ret = await WasmV4.ScriptAll.from_hex(hexStr);
        return new $outer.ScriptAll(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.ScriptAll> {
        const ret = await WasmV4.ScriptAll.from_json(json);
        return new $outer.ScriptAll(ret, $outer._ctx);
      }

      async nativeScripts(): Promise<WasmContract.NativeScripts> {
        const ret = await this.wasm.native_scripts();
        return new $outer.NativeScripts(ret, $outer._ctx);
      }

      static async new(nativeScripts: WasmContract.NativeScripts): Promise<WasmContract.ScriptAll> {
        const ret = await WasmV4.ScriptAll.new(nativeScripts.wasm);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.ScriptAny> {
        const ret = await WasmV4.ScriptAny.from_bytes(bytes);
        return new $outer.ScriptAny(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.ScriptAny> {
        const ret = await WasmV4.ScriptAny.from_hex(hexStr);
        return new $outer.ScriptAny(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.ScriptAny> {
        const ret = await WasmV4.ScriptAny.from_json(json);
        return new $outer.ScriptAny(ret, $outer._ctx);
      }

      async nativeScripts(): Promise<WasmContract.NativeScripts> {
        const ret = await this.wasm.native_scripts();
        return new $outer.NativeScripts(ret, $outer._ctx);
      }

      static async new(nativeScripts: WasmContract.NativeScripts): Promise<WasmContract.ScriptAny> {
        const ret = await WasmV4.ScriptAny.new(nativeScripts.wasm);
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

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.ScriptDataHash> {
        const ret = await WasmV4.ScriptDataHash.from_bytes(bytes);
        return new $outer.ScriptDataHash(ret, $outer._ctx);
      }

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      toBech32(prefix: string): Promise<string> {
        return this.wasm.to_bech32(prefix);
      }

      static async fromBech32(bechStr: string): Promise<WasmContract.ScriptDataHash> {
        const ret = await WasmV4.ScriptDataHash.from_bech32(bechStr);
        return new $outer.ScriptDataHash(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hex: string): Promise<WasmContract.ScriptDataHash> {
        const ret = await WasmV4.ScriptDataHash.from_hex(hex);
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

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.ScriptHash> {
        const ret = await WasmV4.ScriptHash.from_bytes(bytes);
        return new $outer.ScriptHash(ret, $outer._ctx);
      }

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      toBech32(prefix: string): Promise<string> {
        return this.wasm.to_bech32(prefix);
      }

      static async fromBech32(bechStr: string): Promise<WasmContract.ScriptHash> {
        const ret = await WasmV4.ScriptHash.from_bech32(bechStr);
        return new $outer.ScriptHash(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hex: string): Promise<WasmContract.ScriptHash> {
        const ret = await WasmV4.ScriptHash.from_hex(hex);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.ScriptHashes> {
        const ret = await WasmV4.ScriptHashes.from_bytes(bytes);
        return new $outer.ScriptHashes(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.ScriptHashes> {
        const ret = await WasmV4.ScriptHashes.from_hex(hexStr);
        return new $outer.ScriptHashes(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.ScriptHashes> {
        const ret = await WasmV4.ScriptHashes.from_json(json);
        return new $outer.ScriptHashes(ret, $outer._ctx);
      }

      static async new(): Promise<WasmContract.ScriptHashes> {
        const ret = await WasmV4.ScriptHashes.new();
        return new $outer.ScriptHashes(ret, $outer._ctx);
      }

      len(): Promise<number> {
        return this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.ScriptHash> {
        const ret = await this.wasm.get(index);
        return new $outer.ScriptHash(ret, $outer._ctx);
      }

      add(elem: WasmContract.ScriptHash): Promise<void> {
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.ScriptNOfK> {
        const ret = await WasmV4.ScriptNOfK.from_bytes(bytes);
        return new $outer.ScriptNOfK(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.ScriptNOfK> {
        const ret = await WasmV4.ScriptNOfK.from_hex(hexStr);
        return new $outer.ScriptNOfK(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.ScriptNOfK> {
        const ret = await WasmV4.ScriptNOfK.from_json(json);
        return new $outer.ScriptNOfK(ret, $outer._ctx);
      }

      n(): Promise<number> {
        return this.wasm.n();
      }

      async nativeScripts(): Promise<WasmContract.NativeScripts> {
        const ret = await this.wasm.native_scripts();
        return new $outer.NativeScripts(ret, $outer._ctx);
      }

      static async new(n: number, nativeScripts: WasmContract.NativeScripts): Promise<WasmContract.ScriptNOfK> {
        const ret = await WasmV4.ScriptNOfK.new(n, nativeScripts.wasm);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.ScriptPubkey> {
        const ret = await WasmV4.ScriptPubkey.from_bytes(bytes);
        return new $outer.ScriptPubkey(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.ScriptPubkey> {
        const ret = await WasmV4.ScriptPubkey.from_hex(hexStr);
        return new $outer.ScriptPubkey(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.ScriptPubkey> {
        const ret = await WasmV4.ScriptPubkey.from_json(json);
        return new $outer.ScriptPubkey(ret, $outer._ctx);
      }

      async addrKeyhash(): Promise<WasmContract.Ed25519KeyHash> {
        const ret = await this.wasm.addr_keyhash();
        return new $outer.Ed25519KeyHash(ret, $outer._ctx);
      }

      static async new(addrKeyhash: WasmContract.Ed25519KeyHash): Promise<WasmContract.ScriptPubkey> {
        const ret = await WasmV4.ScriptPubkey.new(addrKeyhash.wasm);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.ScriptRef> {
        const ret = await WasmV4.ScriptRef.from_bytes(bytes);
        return new $outer.ScriptRef(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.ScriptRef> {
        const ret = await WasmV4.ScriptRef.from_hex(hexStr);
        return new $outer.ScriptRef(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.ScriptRef> {
        const ret = await WasmV4.ScriptRef.from_json(json);
        return new $outer.ScriptRef(ret, $outer._ctx);
      }

      static async newNativeScript(nativeScript: WasmContract.NativeScript): Promise<WasmContract.ScriptRef> {
        const ret = await WasmV4.ScriptRef.new_native_script(nativeScript.wasm);
        return new $outer.ScriptRef(ret, $outer._ctx);
      }

      static async newPlutusScript(plutusScript: WasmContract.PlutusScript): Promise<WasmContract.ScriptRef> {
        const ret = await WasmV4.ScriptRef.new_plutus_script(plutusScript.wasm);
        return new $outer.ScriptRef(ret, $outer._ctx);
      }

      isNativeScript(): Promise<boolean> {
        return this.wasm.is_native_script();
      }

      isPlutusScript(): Promise<boolean> {
        return this.wasm.is_plutus_script();
      }

      async nativeScript(): Promise<Optional<WasmContract.NativeScript>> {
        const ret = await this.wasm.native_script();
        if (ret == null) return undefined;
        return new $outer.NativeScript(ret, $outer._ctx);
      }

      async plutusScript(): Promise<Optional<WasmContract.PlutusScript>> {
        const ret = await this.wasm.plutus_script();
        if (ret == null) return undefined;
        return new $outer.PlutusScript(ret, $outer._ctx);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.SingleHostAddr> {
        const ret = await WasmV4.SingleHostAddr.from_bytes(bytes);
        return new $outer.SingleHostAddr(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.SingleHostAddr> {
        const ret = await WasmV4.SingleHostAddr.from_hex(hexStr);
        return new $outer.SingleHostAddr(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.SingleHostAddr> {
        const ret = await WasmV4.SingleHostAddr.from_json(json);
        return new $outer.SingleHostAddr(ret, $outer._ctx);
      }

      port(): Promise<Optional<number>> {
        return this.wasm.port();
      }

      async ipv4(): Promise<Optional<WasmContract.Ipv4>> {
        const ret = await this.wasm.ipv4();
        if (ret == null) return undefined;
        return new $outer.Ipv4(ret, $outer._ctx);
      }

      async ipv6(): Promise<Optional<WasmContract.Ipv6>> {
        const ret = await this.wasm.ipv6();
        if (ret == null) return undefined;
        return new $outer.Ipv6(ret, $outer._ctx);
      }

      static async new(port: Optional<number>, ipv4: Optional<WasmContract.Ipv4>, ipv6: Optional<WasmContract.Ipv6>): Promise<WasmContract.SingleHostAddr> {
        const ret = await WasmV4.SingleHostAddr.new(port, ipv4?.wasm, ipv6?.wasm);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.SingleHostName> {
        const ret = await WasmV4.SingleHostName.from_bytes(bytes);
        return new $outer.SingleHostName(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.SingleHostName> {
        const ret = await WasmV4.SingleHostName.from_hex(hexStr);
        return new $outer.SingleHostName(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.SingleHostName> {
        const ret = await WasmV4.SingleHostName.from_json(json);
        return new $outer.SingleHostName(ret, $outer._ctx);
      }

      port(): Promise<Optional<number>> {
        return this.wasm.port();
      }

      async dnsName(): Promise<WasmContract.DNSRecordAorAAAA> {
        const ret = await this.wasm.dns_name();
        return new $outer.DNSRecordAorAAAA(ret, $outer._ctx);
      }

      static async new(port: Optional<number>, dnsName: WasmContract.DNSRecordAorAAAA): Promise<WasmContract.SingleHostName> {
        const ret = await WasmV4.SingleHostName.new(port, dnsName.wasm);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.StakeAndVoteDelegation> {
        const ret = await WasmV4.StakeAndVoteDelegation.from_bytes(bytes);
        return new $outer.StakeAndVoteDelegation(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.StakeAndVoteDelegation> {
        const ret = await WasmV4.StakeAndVoteDelegation.from_hex(hexStr);
        return new $outer.StakeAndVoteDelegation(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.StakeAndVoteDelegation> {
        const ret = await WasmV4.StakeAndVoteDelegation.from_json(json);
        return new $outer.StakeAndVoteDelegation(ret, $outer._ctx);
      }

      async stakeCredential(): Promise<WasmContract.Credential> {
        const ret = await this.wasm.stake_credential();
        return new $outer.Credential(ret, $outer._ctx);
      }

      async poolKeyhash(): Promise<WasmContract.Ed25519KeyHash> {
        const ret = await this.wasm.pool_keyhash();
        return new $outer.Ed25519KeyHash(ret, $outer._ctx);
      }

      async drep(): Promise<WasmContract.DRep> {
        const ret = await this.wasm.drep();
        return new $outer.DRep(ret, $outer._ctx);
      }

      static async new(stakeCredential: WasmContract.Credential, poolKeyhash: WasmContract.Ed25519KeyHash, drep: WasmContract.DRep): Promise<WasmContract.StakeAndVoteDelegation> {
        const ret = await WasmV4.StakeAndVoteDelegation.new(stakeCredential.wasm, poolKeyhash.wasm, drep.wasm);
        return new $outer.StakeAndVoteDelegation(ret, $outer._ctx);
      }

      hasScriptCredentials(): Promise<boolean> {
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.StakeDelegation> {
        const ret = await WasmV4.StakeDelegation.from_bytes(bytes);
        return new $outer.StakeDelegation(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.StakeDelegation> {
        const ret = await WasmV4.StakeDelegation.from_hex(hexStr);
        return new $outer.StakeDelegation(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.StakeDelegation> {
        const ret = await WasmV4.StakeDelegation.from_json(json);
        return new $outer.StakeDelegation(ret, $outer._ctx);
      }

      async stakeCredential(): Promise<WasmContract.Credential> {
        const ret = await this.wasm.stake_credential();
        return new $outer.Credential(ret, $outer._ctx);
      }

      async poolKeyhash(): Promise<WasmContract.Ed25519KeyHash> {
        const ret = await this.wasm.pool_keyhash();
        return new $outer.Ed25519KeyHash(ret, $outer._ctx);
      }

      static async new(stakeCredential: WasmContract.Credential, poolKeyhash: WasmContract.Ed25519KeyHash): Promise<WasmContract.StakeDelegation> {
        const ret = await WasmV4.StakeDelegation.new(stakeCredential.wasm, poolKeyhash.wasm);
        return new $outer.StakeDelegation(ret, $outer._ctx);
      }

      hasScriptCredentials(): Promise<boolean> {
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.StakeDeregistration> {
        const ret = await WasmV4.StakeDeregistration.from_bytes(bytes);
        return new $outer.StakeDeregistration(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.StakeDeregistration> {
        const ret = await WasmV4.StakeDeregistration.from_hex(hexStr);
        return new $outer.StakeDeregistration(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.StakeDeregistration> {
        const ret = await WasmV4.StakeDeregistration.from_json(json);
        return new $outer.StakeDeregistration(ret, $outer._ctx);
      }

      async stakeCredential(): Promise<WasmContract.Credential> {
        const ret = await this.wasm.stake_credential();
        return new $outer.Credential(ret, $outer._ctx);
      }

      async coin(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.coin();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      static async new(stakeCredential: WasmContract.Credential): Promise<WasmContract.StakeDeregistration> {
        const ret = await WasmV4.StakeDeregistration.new(stakeCredential.wasm);
        return new $outer.StakeDeregistration(ret, $outer._ctx);
      }

      static async newWithCoin(stakeCredential: WasmContract.Credential, coin: WasmContract.BigNum): Promise<WasmContract.StakeDeregistration> {
        const ret = await WasmV4.StakeDeregistration.new_with_coin(stakeCredential.wasm, coin.wasm);
        return new $outer.StakeDeregistration(ret, $outer._ctx);
      }

      hasScriptCredentials(): Promise<boolean> {
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.StakeRegistration> {
        const ret = await WasmV4.StakeRegistration.from_bytes(bytes);
        return new $outer.StakeRegistration(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.StakeRegistration> {
        const ret = await WasmV4.StakeRegistration.from_hex(hexStr);
        return new $outer.StakeRegistration(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.StakeRegistration> {
        const ret = await WasmV4.StakeRegistration.from_json(json);
        return new $outer.StakeRegistration(ret, $outer._ctx);
      }

      async stakeCredential(): Promise<WasmContract.Credential> {
        const ret = await this.wasm.stake_credential();
        return new $outer.Credential(ret, $outer._ctx);
      }

      async coin(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.coin();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      static async new(stakeCredential: WasmContract.Credential): Promise<WasmContract.StakeRegistration> {
        const ret = await WasmV4.StakeRegistration.new(stakeCredential.wasm);
        return new $outer.StakeRegistration(ret, $outer._ctx);
      }

      static async newWithCoin(stakeCredential: WasmContract.Credential, coin: WasmContract.BigNum): Promise<WasmContract.StakeRegistration> {
        const ret = await WasmV4.StakeRegistration.new_with_coin(stakeCredential.wasm, coin.wasm);
        return new $outer.StakeRegistration(ret, $outer._ctx);
      }

      hasScriptCredentials(): Promise<boolean> {
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.StakeRegistrationAndDelegation> {
        const ret = await WasmV4.StakeRegistrationAndDelegation.from_bytes(bytes);
        return new $outer.StakeRegistrationAndDelegation(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.StakeRegistrationAndDelegation> {
        const ret = await WasmV4.StakeRegistrationAndDelegation.from_hex(hexStr);
        return new $outer.StakeRegistrationAndDelegation(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.StakeRegistrationAndDelegation> {
        const ret = await WasmV4.StakeRegistrationAndDelegation.from_json(json);
        return new $outer.StakeRegistrationAndDelegation(ret, $outer._ctx);
      }

      async stakeCredential(): Promise<WasmContract.Credential> {
        const ret = await this.wasm.stake_credential();
        return new $outer.Credential(ret, $outer._ctx);
      }

      async poolKeyhash(): Promise<WasmContract.Ed25519KeyHash> {
        const ret = await this.wasm.pool_keyhash();
        return new $outer.Ed25519KeyHash(ret, $outer._ctx);
      }

      async coin(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.coin();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      static async new(stakeCredential: WasmContract.Credential, poolKeyhash: WasmContract.Ed25519KeyHash, coin: WasmContract.BigNum): Promise<WasmContract.StakeRegistrationAndDelegation> {
        const ret = await WasmV4.StakeRegistrationAndDelegation.new(stakeCredential.wasm, poolKeyhash.wasm, coin.wasm);
        return new $outer.StakeRegistrationAndDelegation(ret, $outer._ctx);
      }

      hasScriptCredentials(): Promise<boolean> {
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.StakeVoteRegistrationAndDelegation> {
        const ret = await WasmV4.StakeVoteRegistrationAndDelegation.from_bytes(bytes);
        return new $outer.StakeVoteRegistrationAndDelegation(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.StakeVoteRegistrationAndDelegation> {
        const ret = await WasmV4.StakeVoteRegistrationAndDelegation.from_hex(hexStr);
        return new $outer.StakeVoteRegistrationAndDelegation(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.StakeVoteRegistrationAndDelegation> {
        const ret = await WasmV4.StakeVoteRegistrationAndDelegation.from_json(json);
        return new $outer.StakeVoteRegistrationAndDelegation(ret, $outer._ctx);
      }

      async stakeCredential(): Promise<WasmContract.Credential> {
        const ret = await this.wasm.stake_credential();
        return new $outer.Credential(ret, $outer._ctx);
      }

      async poolKeyhash(): Promise<WasmContract.Ed25519KeyHash> {
        const ret = await this.wasm.pool_keyhash();
        return new $outer.Ed25519KeyHash(ret, $outer._ctx);
      }

      async drep(): Promise<WasmContract.DRep> {
        const ret = await this.wasm.drep();
        return new $outer.DRep(ret, $outer._ctx);
      }

      async coin(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.coin();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      static async new(stakeCredential: WasmContract.Credential, poolKeyhash: WasmContract.Ed25519KeyHash, drep: WasmContract.DRep, coin: WasmContract.BigNum): Promise<WasmContract.StakeVoteRegistrationAndDelegation> {
        const ret = await WasmV4.StakeVoteRegistrationAndDelegation.new(stakeCredential.wasm, poolKeyhash.wasm, drep.wasm, coin.wasm);
        return new $outer.StakeVoteRegistrationAndDelegation(ret, $outer._ctx);
      }

      hasScriptCredentials(): Promise<boolean> {
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

      static async new(): Promise<WasmContract.Strings> {
        const ret = await WasmV4.Strings.new();
        return new $outer.Strings(ret, $outer._ctx);
      }

      len(): Promise<number> {
        return this.wasm.len();
      }

      get(index: number): Promise<string> {
        return this.wasm.get(index);
      }

      add(elem: string): Promise<void> {
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.TimelockExpiry> {
        const ret = await WasmV4.TimelockExpiry.from_bytes(bytes);
        return new $outer.TimelockExpiry(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.TimelockExpiry> {
        const ret = await WasmV4.TimelockExpiry.from_hex(hexStr);
        return new $outer.TimelockExpiry(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.TimelockExpiry> {
        const ret = await WasmV4.TimelockExpiry.from_json(json);
        return new $outer.TimelockExpiry(ret, $outer._ctx);
      }

      slot(): Promise<number> {
        return this.wasm.slot();
      }

      async slotBignum(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.slot_bignum();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      static async new(slot: number): Promise<WasmContract.TimelockExpiry> {
        const ret = await WasmV4.TimelockExpiry.new(slot);
        return new $outer.TimelockExpiry(ret, $outer._ctx);
      }

      static async newTimelockexpiry(slot: WasmContract.BigNum): Promise<WasmContract.TimelockExpiry> {
        const ret = await WasmV4.TimelockExpiry.new_timelockexpiry(slot.wasm);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.TimelockStart> {
        const ret = await WasmV4.TimelockStart.from_bytes(bytes);
        return new $outer.TimelockStart(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.TimelockStart> {
        const ret = await WasmV4.TimelockStart.from_hex(hexStr);
        return new $outer.TimelockStart(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.TimelockStart> {
        const ret = await WasmV4.TimelockStart.from_json(json);
        return new $outer.TimelockStart(ret, $outer._ctx);
      }

      slot(): Promise<number> {
        return this.wasm.slot();
      }

      async slotBignum(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.slot_bignum();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      static async new(slot: number): Promise<WasmContract.TimelockStart> {
        const ret = await WasmV4.TimelockStart.new(slot);
        return new $outer.TimelockStart(ret, $outer._ctx);
      }

      static async newTimelockstart(slot: WasmContract.BigNum): Promise<WasmContract.TimelockStart> {
        const ret = await WasmV4.TimelockStart.new_timelockstart(slot.wasm);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Transaction> {
        const ret = await WasmV4.Transaction.from_bytes(bytes);
        return new $outer.Transaction(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Transaction> {
        const ret = await WasmV4.Transaction.from_hex(hexStr);
        return new $outer.Transaction(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.Transaction> {
        const ret = await WasmV4.Transaction.from_json(json);
        return new $outer.Transaction(ret, $outer._ctx);
      }

      async body(): Promise<WasmContract.TransactionBody> {
        const ret = await this.wasm.body();
        return new $outer.TransactionBody(ret, $outer._ctx);
      }

      async witnessSet(): Promise<WasmContract.TransactionWitnessSet> {
        const ret = await this.wasm.witness_set();
        return new $outer.TransactionWitnessSet(ret, $outer._ctx);
      }

      isValid(): Promise<boolean> {
        return this.wasm.is_valid();
      }

      async auxiliaryData(): Promise<Optional<WasmContract.AuxiliaryData>> {
        const ret = await this.wasm.auxiliary_data();
        if (ret == null) return undefined;
        return new $outer.AuxiliaryData(ret, $outer._ctx);
      }

      setIsValid(valid: boolean): Promise<void> {
        return this.wasm.set_is_valid(valid);
      }

      static async new(body: WasmContract.TransactionBody, witnessSet: WasmContract.TransactionWitnessSet, auxiliaryData: Optional<WasmContract.AuxiliaryData>): Promise<WasmContract.Transaction> {
        const ret = await WasmV4.Transaction.new(body.wasm, witnessSet.wasm, auxiliaryData?.wasm);
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

      len(): Promise<number> {
        return this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.Transaction> {
        const ret = await this.wasm.get(index);
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

      len(): Promise<number> {
        return this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.TransactionBatch> {
        const ret = await this.wasm.get(index);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.TransactionBodies> {
        const ret = await WasmV4.TransactionBodies.from_bytes(bytes);
        return new $outer.TransactionBodies(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.TransactionBodies> {
        const ret = await WasmV4.TransactionBodies.from_hex(hexStr);
        return new $outer.TransactionBodies(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.TransactionBodies> {
        const ret = await WasmV4.TransactionBodies.from_json(json);
        return new $outer.TransactionBodies(ret, $outer._ctx);
      }

      static async new(): Promise<WasmContract.TransactionBodies> {
        const ret = await WasmV4.TransactionBodies.new();
        return new $outer.TransactionBodies(ret, $outer._ctx);
      }

      len(): Promise<number> {
        return this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.TransactionBody> {
        const ret = await this.wasm.get(index);
        return new $outer.TransactionBody(ret, $outer._ctx);
      }

      add(elem: WasmContract.TransactionBody): Promise<void> {
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.TransactionBody> {
        const ret = await WasmV4.TransactionBody.from_bytes(bytes);
        return new $outer.TransactionBody(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.TransactionBody> {
        const ret = await WasmV4.TransactionBody.from_hex(hexStr);
        return new $outer.TransactionBody(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.TransactionBody> {
        const ret = await WasmV4.TransactionBody.from_json(json);
        return new $outer.TransactionBody(ret, $outer._ctx);
      }

      async inputs(): Promise<WasmContract.TransactionInputs> {
        const ret = await this.wasm.inputs();
        return new $outer.TransactionInputs(ret, $outer._ctx);
      }

      async outputs(): Promise<WasmContract.TransactionOutputs> {
        const ret = await this.wasm.outputs();
        return new $outer.TransactionOutputs(ret, $outer._ctx);
      }

      async fee(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.fee();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      ttl(): Promise<Optional<number>> {
        return this.wasm.ttl();
      }

      async ttlBignum(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.ttl_bignum();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      setTtl(ttl: WasmContract.BigNum): Promise<void> {
        return this.wasm.set_ttl(ttl.wasm);
      }

      removeTtl(): Promise<void> {
        return this.wasm.remove_ttl();
      }

      setCerts(certs: WasmContract.Certificates): Promise<void> {
        return this.wasm.set_certs(certs.wasm);
      }

      async certs(): Promise<Optional<WasmContract.Certificates>> {
        const ret = await this.wasm.certs();
        if (ret == null) return undefined;
        return new $outer.Certificates(ret, $outer._ctx);
      }

      setWithdrawals(withdrawals: WasmContract.Withdrawals): Promise<void> {
        return this.wasm.set_withdrawals(withdrawals.wasm);
      }

      async withdrawals(): Promise<Optional<WasmContract.Withdrawals>> {
        const ret = await this.wasm.withdrawals();
        if (ret == null) return undefined;
        return new $outer.Withdrawals(ret, $outer._ctx);
      }

      setUpdate(update: WasmContract.Update): Promise<void> {
        return this.wasm.set_update(update.wasm);
      }

      async update(): Promise<Optional<WasmContract.Update>> {
        const ret = await this.wasm.update();
        if (ret == null) return undefined;
        return new $outer.Update(ret, $outer._ctx);
      }

      setAuxiliaryDataHash(auxiliaryDataHash: WasmContract.AuxiliaryDataHash): Promise<void> {
        return this.wasm.set_auxiliary_data_hash(auxiliaryDataHash.wasm);
      }

      async auxiliaryDataHash(): Promise<Optional<WasmContract.AuxiliaryDataHash>> {
        const ret = await this.wasm.auxiliary_data_hash();
        if (ret == null) return undefined;
        return new $outer.AuxiliaryDataHash(ret, $outer._ctx);
      }

      setValidityStartInterval(validityStartInterval: number): Promise<void> {
        return this.wasm.set_validity_start_interval(validityStartInterval);
      }

      setValidityStartIntervalBignum(validityStartInterval: WasmContract.BigNum): Promise<void> {
        return this.wasm.set_validity_start_interval_bignum(validityStartInterval.wasm);
      }

      async validityStartIntervalBignum(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.validity_start_interval_bignum();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      validityStartInterval(): Promise<Optional<number>> {
        return this.wasm.validity_start_interval();
      }

      setMint(mint: WasmContract.Mint): Promise<void> {
        return this.wasm.set_mint(mint.wasm);
      }

      async mint(): Promise<Optional<WasmContract.Mint>> {
        const ret = await this.wasm.mint();
        if (ret == null) return undefined;
        return new $outer.Mint(ret, $outer._ctx);
      }

      setReferenceInputs(referenceInputs: WasmContract.TransactionInputs): Promise<void> {
        return this.wasm.set_reference_inputs(referenceInputs.wasm);
      }

      async referenceInputs(): Promise<Optional<WasmContract.TransactionInputs>> {
        const ret = await this.wasm.reference_inputs();
        if (ret == null) return undefined;
        return new $outer.TransactionInputs(ret, $outer._ctx);
      }

      setScriptDataHash(scriptDataHash: WasmContract.ScriptDataHash): Promise<void> {
        return this.wasm.set_script_data_hash(scriptDataHash.wasm);
      }

      async scriptDataHash(): Promise<Optional<WasmContract.ScriptDataHash>> {
        const ret = await this.wasm.script_data_hash();
        if (ret == null) return undefined;
        return new $outer.ScriptDataHash(ret, $outer._ctx);
      }

      setCollateral(collateral: WasmContract.TransactionInputs): Promise<void> {
        return this.wasm.set_collateral(collateral.wasm);
      }

      async collateral(): Promise<Optional<WasmContract.TransactionInputs>> {
        const ret = await this.wasm.collateral();
        if (ret == null) return undefined;
        return new $outer.TransactionInputs(ret, $outer._ctx);
      }

      setRequiredSigners(requiredSigners: WasmContract.Ed25519KeyHashes): Promise<void> {
        return this.wasm.set_required_signers(requiredSigners.wasm);
      }

      async requiredSigners(): Promise<Optional<WasmContract.Ed25519KeyHashes>> {
        const ret = await this.wasm.required_signers();
        if (ret == null) return undefined;
        return new $outer.Ed25519KeyHashes(ret, $outer._ctx);
      }

      setNetworkId(networkId: WasmContract.NetworkId): Promise<void> {
        return this.wasm.set_network_id(networkId.wasm);
      }

      async networkId(): Promise<Optional<WasmContract.NetworkId>> {
        const ret = await this.wasm.network_id();
        if (ret == null) return undefined;
        return new $outer.NetworkId(ret, $outer._ctx);
      }

      setCollateralReturn(collateralReturn: WasmContract.TransactionOutput): Promise<void> {
        return this.wasm.set_collateral_return(collateralReturn.wasm);
      }

      async collateralReturn(): Promise<Optional<WasmContract.TransactionOutput>> {
        const ret = await this.wasm.collateral_return();
        if (ret == null) return undefined;
        return new $outer.TransactionOutput(ret, $outer._ctx);
      }

      setTotalCollateral(totalCollateral: WasmContract.BigNum): Promise<void> {
        return this.wasm.set_total_collateral(totalCollateral.wasm);
      }

      async totalCollateral(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.total_collateral();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      setVotingProcedures(votingProcedures: WasmContract.VotingProcedures): Promise<void> {
        return this.wasm.set_voting_procedures(votingProcedures.wasm);
      }

      async votingProcedures(): Promise<Optional<WasmContract.VotingProcedures>> {
        const ret = await this.wasm.voting_procedures();
        if (ret == null) return undefined;
        return new $outer.VotingProcedures(ret, $outer._ctx);
      }

      setVotingProposals(votingProposals: WasmContract.VotingProposals): Promise<void> {
        return this.wasm.set_voting_proposals(votingProposals.wasm);
      }

      async votingProposals(): Promise<Optional<WasmContract.VotingProposals>> {
        const ret = await this.wasm.voting_proposals();
        if (ret == null) return undefined;
        return new $outer.VotingProposals(ret, $outer._ctx);
      }

      setDonation(donation: WasmContract.BigNum): Promise<void> {
        return this.wasm.set_donation(donation.wasm);
      }

      async donation(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.donation();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      setCurrentTreasuryValue(currentTreasuryValue: WasmContract.BigNum): Promise<void> {
        return this.wasm.set_current_treasury_value(currentTreasuryValue.wasm);
      }

      async currentTreasuryValue(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.current_treasury_value();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      static async new(inputs: WasmContract.TransactionInputs, outputs: WasmContract.TransactionOutputs, fee: WasmContract.BigNum, ttl: Optional<number>): Promise<WasmContract.TransactionBody> {
        const ret = await WasmV4.TransactionBody.new(inputs.wasm, outputs.wasm, fee.wasm, ttl);
        return new $outer.TransactionBody(ret, $outer._ctx);
      }

      static async newTxBody(inputs: WasmContract.TransactionInputs, outputs: WasmContract.TransactionOutputs, fee: WasmContract.BigNum): Promise<WasmContract.TransactionBody> {
        const ret = await WasmV4.TransactionBody.new_tx_body(inputs.wasm, outputs.wasm, fee.wasm);
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

      addInputsFrom(inputs: WasmContract.TransactionUnspentOutputs, strategy: WasmContract.CoinSelectionStrategyCIP2): Promise<void> {
        return this.wasm.add_inputs_from(inputs.wasm, strategy);
      }

      setInputs(inputs: WasmContract.TxInputsBuilder): Promise<void> {
        return this.wasm.set_inputs(inputs.wasm);
      }

      setCollateral(collateral: WasmContract.TxInputsBuilder): Promise<void> {
        return this.wasm.set_collateral(collateral.wasm);
      }

      setCollateralReturn(collateralReturn: WasmContract.TransactionOutput): Promise<void> {
        return this.wasm.set_collateral_return(collateralReturn.wasm);
      }

      removeCollateralReturn(): Promise<void> {
        return this.wasm.remove_collateral_return();
      }

      setCollateralReturnAndTotal(collateralReturn: WasmContract.TransactionOutput): Promise<void> {
        return this.wasm.set_collateral_return_and_total(collateralReturn.wasm);
      }

      setTotalCollateral(totalCollateral: WasmContract.BigNum): Promise<void> {
        return this.wasm.set_total_collateral(totalCollateral.wasm);
      }

      removeTotalCollateral(): Promise<void> {
        return this.wasm.remove_total_collateral();
      }

      setTotalCollateralAndReturn(totalCollateral: WasmContract.BigNum, returnAddress: WasmContract.Address): Promise<void> {
        return this.wasm.set_total_collateral_and_return(totalCollateral.wasm, returnAddress.wasm);
      }

      addReferenceInput(referenceInput: WasmContract.TransactionInput): Promise<void> {
        return this.wasm.add_reference_input(referenceInput.wasm);
      }

      addScriptReferenceInput(referenceInput: WasmContract.TransactionInput, scriptSize: number): Promise<void> {
        return this.wasm.add_script_reference_input(referenceInput.wasm, scriptSize);
      }

      addKeyInput(hash: WasmContract.Ed25519KeyHash, input: WasmContract.TransactionInput, amount: WasmContract.Value): Promise<void> {
        return this.wasm.add_key_input(hash.wasm, input.wasm, amount.wasm);
      }

      addNativeScriptInput(script: WasmContract.NativeScript, input: WasmContract.TransactionInput, amount: WasmContract.Value): Promise<void> {
        return this.wasm.add_native_script_input(script.wasm, input.wasm, amount.wasm);
      }

      addPlutusScriptInput(witness: WasmContract.PlutusWitness, input: WasmContract.TransactionInput, amount: WasmContract.Value): Promise<void> {
        return this.wasm.add_plutus_script_input(witness.wasm, input.wasm, amount.wasm);
      }

      addBootstrapInput(hash: WasmContract.ByronAddress, input: WasmContract.TransactionInput, amount: WasmContract.Value): Promise<void> {
        return this.wasm.add_bootstrap_input(hash.wasm, input.wasm, amount.wasm);
      }

      addRegularInput(address: WasmContract.Address, input: WasmContract.TransactionInput, amount: WasmContract.Value): Promise<void> {
        return this.wasm.add_regular_input(address.wasm, input.wasm, amount.wasm);
      }

      addInputsFromAndChange(inputs: WasmContract.TransactionUnspentOutputs, strategy: WasmContract.CoinSelectionStrategyCIP2, changeConfig: WasmContract.ChangeConfig): Promise<boolean> {
        return this.wasm.add_inputs_from_and_change(inputs.wasm, strategy, changeConfig.wasm);
      }

      addInputsFromAndChangeWithCollateralReturn(inputs: WasmContract.TransactionUnspentOutputs, strategy: WasmContract.CoinSelectionStrategyCIP2, changeConfig: WasmContract.ChangeConfig, collateralPercentage: number): Promise<boolean> {
        return this.wasm.add_inputs_from_and_change_with_collateral_return(inputs.wasm, strategy, changeConfig.wasm, collateralPercentage);
      }

      async getNativeInputScripts(): Promise<Optional<WasmContract.NativeScripts>> {
        const ret = await this.wasm.get_native_input_scripts();
        if (ret == null) return undefined;
        return new $outer.NativeScripts(ret, $outer._ctx);
      }

      async getPlutusInputScripts(): Promise<Optional<WasmContract.PlutusWitnesses>> {
        const ret = await this.wasm.get_plutus_input_scripts();
        if (ret == null) return undefined;
        return new $outer.PlutusWitnesses(ret, $outer._ctx);
      }

      async feeForInput(address: WasmContract.Address, input: WasmContract.TransactionInput, amount: WasmContract.Value): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.fee_for_input(address.wasm, input.wasm, amount.wasm);
        return new $outer.BigNum(ret, $outer._ctx);
      }

      addOutput(output: WasmContract.TransactionOutput): Promise<void> {
        return this.wasm.add_output(output.wasm);
      }

      async feeForOutput(output: WasmContract.TransactionOutput): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.fee_for_output(output.wasm);
        return new $outer.BigNum(ret, $outer._ctx);
      }

      setFee(fee: WasmContract.BigNum): Promise<void> {
        return this.wasm.set_fee(fee.wasm);
      }

      setTtl(ttl: number): Promise<void> {
        return this.wasm.set_ttl(ttl);
      }

      setTtlBignum(ttl: WasmContract.BigNum): Promise<void> {
        return this.wasm.set_ttl_bignum(ttl.wasm);
      }

      removeTtl(): Promise<void> {
        return this.wasm.remove_ttl();
      }

      setValidityStartInterval(validityStartInterval: number): Promise<void> {
        return this.wasm.set_validity_start_interval(validityStartInterval);
      }

      setValidityStartIntervalBignum(validityStartInterval: WasmContract.BigNum): Promise<void> {
        return this.wasm.set_validity_start_interval_bignum(validityStartInterval.wasm);
      }

      removeValidityStartInterval(): Promise<void> {
        return this.wasm.remove_validity_start_interval();
      }

      setCerts(certs: WasmContract.Certificates): Promise<void> {
        return this.wasm.set_certs(certs.wasm);
      }

      removeCerts(): Promise<void> {
        return this.wasm.remove_certs();
      }

      setCertsBuilder(certs: WasmContract.CertificatesBuilder): Promise<void> {
        return this.wasm.set_certs_builder(certs.wasm);
      }

      setWithdrawals(withdrawals: WasmContract.Withdrawals): Promise<void> {
        return this.wasm.set_withdrawals(withdrawals.wasm);
      }

      setWithdrawalsBuilder(withdrawals: WasmContract.WithdrawalsBuilder): Promise<void> {
        return this.wasm.set_withdrawals_builder(withdrawals.wasm);
      }

      setVotingBuilder(votingBuilder: WasmContract.VotingBuilder): Promise<void> {
        return this.wasm.set_voting_builder(votingBuilder.wasm);
      }

      setVotingProposalBuilder(votingProposalBuilder: WasmContract.VotingProposalBuilder): Promise<void> {
        return this.wasm.set_voting_proposal_builder(votingProposalBuilder.wasm);
      }

      removeWithdrawals(): Promise<void> {
        return this.wasm.remove_withdrawals();
      }

      async getAuxiliaryData(): Promise<Optional<WasmContract.AuxiliaryData>> {
        const ret = await this.wasm.get_auxiliary_data();
        if (ret == null) return undefined;
        return new $outer.AuxiliaryData(ret, $outer._ctx);
      }

      setAuxiliaryData(auxiliaryData: WasmContract.AuxiliaryData): Promise<void> {
        return this.wasm.set_auxiliary_data(auxiliaryData.wasm);
      }

      removeAuxiliaryData(): Promise<void> {
        return this.wasm.remove_auxiliary_data();
      }

      setMetadata(metadata: WasmContract.GeneralTransactionMetadata): Promise<void> {
        return this.wasm.set_metadata(metadata.wasm);
      }

      addMetadatum(key: WasmContract.BigNum, val: WasmContract.TransactionMetadatum): Promise<void> {
        return this.wasm.add_metadatum(key.wasm, val.wasm);
      }

      addJsonMetadatum(key: WasmContract.BigNum, val: string): Promise<void> {
        return this.wasm.add_json_metadatum(key.wasm, val);
      }

      addJsonMetadatumWithSchema(key: WasmContract.BigNum, val: string, schema: WasmContract.MetadataJsonSchema): Promise<void> {
        return this.wasm.add_json_metadatum_with_schema(key.wasm, val, schema);
      }

      setMintBuilder(mintBuilder: WasmContract.MintBuilder): Promise<void> {
        return this.wasm.set_mint_builder(mintBuilder.wasm);
      }

      removeMintBuilder(): Promise<void> {
        return this.wasm.remove_mint_builder();
      }

      async getMintBuilder(): Promise<Optional<WasmContract.MintBuilder>> {
        const ret = await this.wasm.get_mint_builder();
        if (ret == null) return undefined;
        return new $outer.MintBuilder(ret, $outer._ctx);
      }

      setMint(mint: WasmContract.Mint, mintScripts: WasmContract.NativeScripts): Promise<void> {
        return this.wasm.set_mint(mint.wasm, mintScripts.wasm);
      }

      async getMint(): Promise<Optional<WasmContract.Mint>> {
        const ret = await this.wasm.get_mint();
        if (ret == null) return undefined;
        return new $outer.Mint(ret, $outer._ctx);
      }

      async getMintScripts(): Promise<Optional<WasmContract.NativeScripts>> {
        const ret = await this.wasm.get_mint_scripts();
        if (ret == null) return undefined;
        return new $outer.NativeScripts(ret, $outer._ctx);
      }

      setMintAsset(policyScript: WasmContract.NativeScript, mintAssets: WasmContract.MintAssets): Promise<void> {
        return this.wasm.set_mint_asset(policyScript.wasm, mintAssets.wasm);
      }

      addMintAsset(policyScript: WasmContract.NativeScript, assetName: WasmContract.AssetName, amount: WasmContract.Int): Promise<void> {
        return this.wasm.add_mint_asset(policyScript.wasm, assetName.wasm, amount.wasm);
      }

      addMintAssetAndOutput(policyScript: WasmContract.NativeScript, assetName: WasmContract.AssetName, amount: WasmContract.Int, outputBuilder: WasmContract.TransactionOutputAmountBuilder, outputCoin: WasmContract.BigNum): Promise<void> {
        return this.wasm.add_mint_asset_and_output(policyScript.wasm, assetName.wasm, amount.wasm, outputBuilder.wasm, outputCoin.wasm);
      }

      addMintAssetAndOutputMinRequiredCoin(policyScript: WasmContract.NativeScript, assetName: WasmContract.AssetName, amount: WasmContract.Int, outputBuilder: WasmContract.TransactionOutputAmountBuilder): Promise<void> {
        return this.wasm.add_mint_asset_and_output_min_required_coin(policyScript.wasm, assetName.wasm, amount.wasm, outputBuilder.wasm);
      }

      addExtraWitnessDatum(datum: WasmContract.PlutusData): Promise<void> {
        return this.wasm.add_extra_witness_datum(datum.wasm);
      }

      async getExtraWitnessDatums(): Promise<Optional<WasmContract.PlutusList>> {
        const ret = await this.wasm.get_extra_witness_datums();
        if (ret == null) return undefined;
        return new $outer.PlutusList(ret, $outer._ctx);
      }

      setDonation(donation: WasmContract.BigNum): Promise<void> {
        return this.wasm.set_donation(donation.wasm);
      }

      async getDonation(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.get_donation();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      setCurrentTreasuryValue(currentTreasuryValue: WasmContract.BigNum): Promise<void> {
        return this.wasm.set_current_treasury_value(currentTreasuryValue.wasm);
      }

      async getCurrentTreasuryValue(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.get_current_treasury_value();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      static async new(cfg: WasmContract.TransactionBuilderConfig): Promise<WasmContract.TransactionBuilder> {
        const ret = await WasmV4.TransactionBuilder.new(cfg.wasm);
        return new $outer.TransactionBuilder(ret, $outer._ctx);
      }

      async getReferenceInputs(): Promise<WasmContract.TransactionInputs> {
        const ret = await this.wasm.get_reference_inputs();
        return new $outer.TransactionInputs(ret, $outer._ctx);
      }

      async getExplicitInput(): Promise<WasmContract.Value> {
        const ret = await this.wasm.get_explicit_input();
        return new $outer.Value(ret, $outer._ctx);
      }

      async getImplicitInput(): Promise<WasmContract.Value> {
        const ret = await this.wasm.get_implicit_input();
        return new $outer.Value(ret, $outer._ctx);
      }

      async getTotalInput(): Promise<WasmContract.Value> {
        const ret = await this.wasm.get_total_input();
        return new $outer.Value(ret, $outer._ctx);
      }

      async getTotalOutput(): Promise<WasmContract.Value> {
        const ret = await this.wasm.get_total_output();
        return new $outer.Value(ret, $outer._ctx);
      }

      async getExplicitOutput(): Promise<WasmContract.Value> {
        const ret = await this.wasm.get_explicit_output();
        return new $outer.Value(ret, $outer._ctx);
      }

      async getDeposit(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.get_deposit();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      async getFeeIfSet(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.get_fee_if_set();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      addChangeIfNeeded(address: WasmContract.Address): Promise<boolean> {
        return this.wasm.add_change_if_needed(address.wasm);
      }

      addChangeIfNeededWithDatum(address: WasmContract.Address, plutusData: WasmContract.OutputDatum): Promise<boolean> {
        return this.wasm.add_change_if_needed_with_datum(address.wasm, plutusData.wasm);
      }

      calcScriptDataHash(costModels: WasmContract.Costmdls): Promise<void> {
        return this.wasm.calc_script_data_hash(costModels.wasm);
      }

      setScriptDataHash(hash: WasmContract.ScriptDataHash): Promise<void> {
        return this.wasm.set_script_data_hash(hash.wasm);
      }

      removeScriptDataHash(): Promise<void> {
        return this.wasm.remove_script_data_hash();
      }

      addRequiredSigner(key: WasmContract.Ed25519KeyHash): Promise<void> {
        return this.wasm.add_required_signer(key.wasm);
      }

      fullSize(): Promise<number> {
        return this.wasm.full_size();
      }

      outputSizes(): Promise<Uint32Array> {
        return this.wasm.output_sizes();
      }

      async build(): Promise<WasmContract.TransactionBody> {
        const ret = await this.wasm.build();
        return new $outer.TransactionBody(ret, $outer._ctx);
      }

      async buildTx(): Promise<WasmContract.Transaction> {
        const ret = await this.wasm.build_tx();
        return new $outer.Transaction(ret, $outer._ctx);
      }

      async buildTxUnsafe(): Promise<WasmContract.Transaction> {
        const ret = await this.wasm.build_tx_unsafe();
        return new $outer.Transaction(ret, $outer._ctx);
      }

      async minFee(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.min_fee();
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

      static async new(): Promise<WasmContract.TransactionBuilderConfigBuilder> {
        const ret = await WasmV4.TransactionBuilderConfigBuilder.new();
        return new $outer.TransactionBuilderConfigBuilder(ret, $outer._ctx);
      }

      async feeAlgo(feeAlgo: WasmContract.LinearFee): Promise<WasmContract.TransactionBuilderConfigBuilder> {
        const ret = await this.wasm.fee_algo(feeAlgo.wasm);
        return new $outer.TransactionBuilderConfigBuilder(ret, $outer._ctx);
      }

      async coinsPerUtxoByte(coinsPerUtxoByte: WasmContract.BigNum): Promise<WasmContract.TransactionBuilderConfigBuilder> {
        const ret = await this.wasm.coins_per_utxo_byte(coinsPerUtxoByte.wasm);
        return new $outer.TransactionBuilderConfigBuilder(ret, $outer._ctx);
      }

      async exUnitPrices(exUnitPrices: WasmContract.ExUnitPrices): Promise<WasmContract.TransactionBuilderConfigBuilder> {
        const ret = await this.wasm.ex_unit_prices(exUnitPrices.wasm);
        return new $outer.TransactionBuilderConfigBuilder(ret, $outer._ctx);
      }

      async poolDeposit(poolDeposit: WasmContract.BigNum): Promise<WasmContract.TransactionBuilderConfigBuilder> {
        const ret = await this.wasm.pool_deposit(poolDeposit.wasm);
        return new $outer.TransactionBuilderConfigBuilder(ret, $outer._ctx);
      }

      async keyDeposit(keyDeposit: WasmContract.BigNum): Promise<WasmContract.TransactionBuilderConfigBuilder> {
        const ret = await this.wasm.key_deposit(keyDeposit.wasm);
        return new $outer.TransactionBuilderConfigBuilder(ret, $outer._ctx);
      }

      async maxValueSize(maxValueSize: number): Promise<WasmContract.TransactionBuilderConfigBuilder> {
        const ret = await this.wasm.max_value_size(maxValueSize);
        return new $outer.TransactionBuilderConfigBuilder(ret, $outer._ctx);
      }

      async maxTxSize(maxTxSize: number): Promise<WasmContract.TransactionBuilderConfigBuilder> {
        const ret = await this.wasm.max_tx_size(maxTxSize);
        return new $outer.TransactionBuilderConfigBuilder(ret, $outer._ctx);
      }

      async refScriptCoinsPerByte(refScriptCoinsPerByte: WasmContract.UnitInterval): Promise<WasmContract.TransactionBuilderConfigBuilder> {
        const ret = await this.wasm.ref_script_coins_per_byte(refScriptCoinsPerByte.wasm);
        return new $outer.TransactionBuilderConfigBuilder(ret, $outer._ctx);
      }

      async preferPureChange(preferPureChange: boolean): Promise<WasmContract.TransactionBuilderConfigBuilder> {
        const ret = await this.wasm.prefer_pure_change(preferPureChange);
        return new $outer.TransactionBuilderConfigBuilder(ret, $outer._ctx);
      }

      async build(): Promise<WasmContract.TransactionBuilderConfig> {
        const ret = await this.wasm.build();
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

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.TransactionHash> {
        const ret = await WasmV4.TransactionHash.from_bytes(bytes);
        return new $outer.TransactionHash(ret, $outer._ctx);
      }

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      toBech32(prefix: string): Promise<string> {
        return this.wasm.to_bech32(prefix);
      }

      static async fromBech32(bechStr: string): Promise<WasmContract.TransactionHash> {
        const ret = await WasmV4.TransactionHash.from_bech32(bechStr);
        return new $outer.TransactionHash(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hex: string): Promise<WasmContract.TransactionHash> {
        const ret = await WasmV4.TransactionHash.from_hex(hex);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.TransactionInput> {
        const ret = await WasmV4.TransactionInput.from_bytes(bytes);
        return new $outer.TransactionInput(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.TransactionInput> {
        const ret = await WasmV4.TransactionInput.from_hex(hexStr);
        return new $outer.TransactionInput(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.TransactionInput> {
        const ret = await WasmV4.TransactionInput.from_json(json);
        return new $outer.TransactionInput(ret, $outer._ctx);
      }

      async transactionId(): Promise<WasmContract.TransactionHash> {
        const ret = await this.wasm.transaction_id();
        return new $outer.TransactionHash(ret, $outer._ctx);
      }

      index(): Promise<number> {
        return this.wasm.index();
      }

      static async new(transactionId: WasmContract.TransactionHash, index: number): Promise<WasmContract.TransactionInput> {
        const ret = await WasmV4.TransactionInput.new(transactionId.wasm, index);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.TransactionInputs> {
        const ret = await WasmV4.TransactionInputs.from_bytes(bytes);
        return new $outer.TransactionInputs(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.TransactionInputs> {
        const ret = await WasmV4.TransactionInputs.from_hex(hexStr);
        return new $outer.TransactionInputs(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.TransactionInputs> {
        const ret = await WasmV4.TransactionInputs.from_json(json);
        return new $outer.TransactionInputs(ret, $outer._ctx);
      }

      static async new(): Promise<WasmContract.TransactionInputs> {
        const ret = await WasmV4.TransactionInputs.new();
        return new $outer.TransactionInputs(ret, $outer._ctx);
      }

      len(): Promise<number> {
        return this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.TransactionInput> {
        const ret = await this.wasm.get(index);
        return new $outer.TransactionInput(ret, $outer._ctx);
      }

      add(elem: WasmContract.TransactionInput): Promise<void> {
        return this.wasm.add(elem.wasm);
      }

      async toOption(): Promise<Optional<WasmContract.TransactionInputs>> {
        const ret = await this.wasm.to_option();
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.TransactionMetadatum> {
        const ret = await WasmV4.TransactionMetadatum.from_bytes(bytes);
        return new $outer.TransactionMetadatum(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.TransactionMetadatum> {
        const ret = await WasmV4.TransactionMetadatum.from_hex(hexStr);
        return new $outer.TransactionMetadatum(ret, $outer._ctx);
      }

      static async newMap(map: WasmContract.MetadataMap): Promise<WasmContract.TransactionMetadatum> {
        const ret = await WasmV4.TransactionMetadatum.new_map(map.wasm);
        return new $outer.TransactionMetadatum(ret, $outer._ctx);
      }

      static async newList(list: WasmContract.MetadataList): Promise<WasmContract.TransactionMetadatum> {
        const ret = await WasmV4.TransactionMetadatum.new_list(list.wasm);
        return new $outer.TransactionMetadatum(ret, $outer._ctx);
      }

      static async newInt(intValue: WasmContract.Int): Promise<WasmContract.TransactionMetadatum> {
        const ret = await WasmV4.TransactionMetadatum.new_int(intValue.wasm);
        return new $outer.TransactionMetadatum(ret, $outer._ctx);
      }

      static async newBytes(bytes: Uint8Array): Promise<WasmContract.TransactionMetadatum> {
        const ret = await WasmV4.TransactionMetadatum.new_bytes(bytes);
        return new $outer.TransactionMetadatum(ret, $outer._ctx);
      }

      static async newText(text: string): Promise<WasmContract.TransactionMetadatum> {
        const ret = await WasmV4.TransactionMetadatum.new_text(text);
        return new $outer.TransactionMetadatum(ret, $outer._ctx);
      }

      kind(): Promise<WasmContract.TransactionMetadatumKind> {
        return this.wasm.kind();
      }

      async asMap(): Promise<WasmContract.MetadataMap> {
        const ret = await this.wasm.as_map();
        return new $outer.MetadataMap(ret, $outer._ctx);
      }

      async asList(): Promise<WasmContract.MetadataList> {
        const ret = await this.wasm.as_list();
        return new $outer.MetadataList(ret, $outer._ctx);
      }

      async asInt(): Promise<WasmContract.Int> {
        const ret = await this.wasm.as_int();
        return new $outer.Int(ret, $outer._ctx);
      }

      asBytes(): Promise<Uint8Array> {
        return this.wasm.as_bytes();
      }

      asText(): Promise<string> {
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.TransactionMetadatumLabels> {
        const ret = await WasmV4.TransactionMetadatumLabels.from_bytes(bytes);
        return new $outer.TransactionMetadatumLabels(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.TransactionMetadatumLabels> {
        const ret = await WasmV4.TransactionMetadatumLabels.from_hex(hexStr);
        return new $outer.TransactionMetadatumLabels(ret, $outer._ctx);
      }

      static async new(): Promise<WasmContract.TransactionMetadatumLabels> {
        const ret = await WasmV4.TransactionMetadatumLabels.new();
        return new $outer.TransactionMetadatumLabels(ret, $outer._ctx);
      }

      len(): Promise<number> {
        return this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.get(index);
        return new $outer.BigNum(ret, $outer._ctx);
      }

      add(elem: WasmContract.BigNum): Promise<void> {
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.TransactionOutput> {
        const ret = await WasmV4.TransactionOutput.from_bytes(bytes);
        return new $outer.TransactionOutput(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.TransactionOutput> {
        const ret = await WasmV4.TransactionOutput.from_hex(hexStr);
        return new $outer.TransactionOutput(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.TransactionOutput> {
        const ret = await WasmV4.TransactionOutput.from_json(json);
        return new $outer.TransactionOutput(ret, $outer._ctx);
      }

      async address(): Promise<WasmContract.Address> {
        const ret = await this.wasm.address();
        return new $outer.Address(ret, $outer._ctx);
      }

      async amount(): Promise<WasmContract.Value> {
        const ret = await this.wasm.amount();
        return new $outer.Value(ret, $outer._ctx);
      }

      async dataHash(): Promise<Optional<WasmContract.DataHash>> {
        const ret = await this.wasm.data_hash();
        if (ret == null) return undefined;
        return new $outer.DataHash(ret, $outer._ctx);
      }

      async plutusData(): Promise<Optional<WasmContract.PlutusData>> {
        const ret = await this.wasm.plutus_data();
        if (ret == null) return undefined;
        return new $outer.PlutusData(ret, $outer._ctx);
      }

      async scriptRef(): Promise<Optional<WasmContract.ScriptRef>> {
        const ret = await this.wasm.script_ref();
        if (ret == null) return undefined;
        return new $outer.ScriptRef(ret, $outer._ctx);
      }

      setScriptRef(scriptRef: WasmContract.ScriptRef): Promise<void> {
        return this.wasm.set_script_ref(scriptRef.wasm);
      }

      setPlutusData(data: WasmContract.PlutusData): Promise<void> {
        return this.wasm.set_plutus_data(data.wasm);
      }

      setDataHash(dataHash: WasmContract.DataHash): Promise<void> {
        return this.wasm.set_data_hash(dataHash.wasm);
      }

      hasPlutusData(): Promise<boolean> {
        return this.wasm.has_plutus_data();
      }

      hasDataHash(): Promise<boolean> {
        return this.wasm.has_data_hash();
      }

      hasScriptRef(): Promise<boolean> {
        return this.wasm.has_script_ref();
      }

      static async new(address: WasmContract.Address, amount: WasmContract.Value): Promise<WasmContract.TransactionOutput> {
        const ret = await WasmV4.TransactionOutput.new(address.wasm, amount.wasm);
        return new $outer.TransactionOutput(ret, $outer._ctx);
      }

      serializationFormat(): Promise<Optional<WasmContract.CborContainerType>> {
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

      async withValue(amount: WasmContract.Value): Promise<WasmContract.TransactionOutputAmountBuilder> {
        const ret = await this.wasm.with_value(amount.wasm);
        return new $outer.TransactionOutputAmountBuilder(ret, $outer._ctx);
      }

      async withCoin(coin: WasmContract.BigNum): Promise<WasmContract.TransactionOutputAmountBuilder> {
        const ret = await this.wasm.with_coin(coin.wasm);
        return new $outer.TransactionOutputAmountBuilder(ret, $outer._ctx);
      }

      async withCoinAndAsset(coin: WasmContract.BigNum, multiasset: WasmContract.MultiAsset): Promise<WasmContract.TransactionOutputAmountBuilder> {
        const ret = await this.wasm.with_coin_and_asset(coin.wasm, multiasset.wasm);
        return new $outer.TransactionOutputAmountBuilder(ret, $outer._ctx);
      }

      async withAssetAndMinRequiredCoinByUtxoCost(multiasset: WasmContract.MultiAsset, dataCost: WasmContract.DataCost): Promise<WasmContract.TransactionOutputAmountBuilder> {
        const ret = await this.wasm.with_asset_and_min_required_coin_by_utxo_cost(multiasset.wasm, dataCost.wasm);
        return new $outer.TransactionOutputAmountBuilder(ret, $outer._ctx);
      }

      async build(): Promise<WasmContract.TransactionOutput> {
        const ret = await this.wasm.build();
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

      static async new(): Promise<WasmContract.TransactionOutputBuilder> {
        const ret = await WasmV4.TransactionOutputBuilder.new();
        return new $outer.TransactionOutputBuilder(ret, $outer._ctx);
      }

      async withAddress(address: WasmContract.Address): Promise<WasmContract.TransactionOutputBuilder> {
        const ret = await this.wasm.with_address(address.wasm);
        return new $outer.TransactionOutputBuilder(ret, $outer._ctx);
      }

      async withDataHash(dataHash: WasmContract.DataHash): Promise<WasmContract.TransactionOutputBuilder> {
        const ret = await this.wasm.with_data_hash(dataHash.wasm);
        return new $outer.TransactionOutputBuilder(ret, $outer._ctx);
      }

      async withPlutusData(data: WasmContract.PlutusData): Promise<WasmContract.TransactionOutputBuilder> {
        const ret = await this.wasm.with_plutus_data(data.wasm);
        return new $outer.TransactionOutputBuilder(ret, $outer._ctx);
      }

      async withScriptRef(scriptRef: WasmContract.ScriptRef): Promise<WasmContract.TransactionOutputBuilder> {
        const ret = await this.wasm.with_script_ref(scriptRef.wasm);
        return new $outer.TransactionOutputBuilder(ret, $outer._ctx);
      }

      async next(): Promise<WasmContract.TransactionOutputAmountBuilder> {
        const ret = await this.wasm.next();
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.TransactionOutputs> {
        const ret = await WasmV4.TransactionOutputs.from_bytes(bytes);
        return new $outer.TransactionOutputs(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.TransactionOutputs> {
        const ret = await WasmV4.TransactionOutputs.from_hex(hexStr);
        return new $outer.TransactionOutputs(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.TransactionOutputs> {
        const ret = await WasmV4.TransactionOutputs.from_json(json);
        return new $outer.TransactionOutputs(ret, $outer._ctx);
      }

      static async new(): Promise<WasmContract.TransactionOutputs> {
        const ret = await WasmV4.TransactionOutputs.new();
        return new $outer.TransactionOutputs(ret, $outer._ctx);
      }

      len(): Promise<number> {
        return this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.TransactionOutput> {
        const ret = await this.wasm.get(index);
        return new $outer.TransactionOutput(ret, $outer._ctx);
      }

      add(elem: WasmContract.TransactionOutput): Promise<void> {
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.TransactionUnspentOutput> {
        const ret = await WasmV4.TransactionUnspentOutput.from_bytes(bytes);
        return new $outer.TransactionUnspentOutput(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.TransactionUnspentOutput> {
        const ret = await WasmV4.TransactionUnspentOutput.from_hex(hexStr);
        return new $outer.TransactionUnspentOutput(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.TransactionUnspentOutput> {
        const ret = await WasmV4.TransactionUnspentOutput.from_json(json);
        return new $outer.TransactionUnspentOutput(ret, $outer._ctx);
      }

      static async new(input: WasmContract.TransactionInput, output: WasmContract.TransactionOutput): Promise<WasmContract.TransactionUnspentOutput> {
        const ret = await WasmV4.TransactionUnspentOutput.new(input.wasm, output.wasm);
        return new $outer.TransactionUnspentOutput(ret, $outer._ctx);
      }

      async input(): Promise<WasmContract.TransactionInput> {
        const ret = await this.wasm.input();
        return new $outer.TransactionInput(ret, $outer._ctx);
      }

      async output(): Promise<WasmContract.TransactionOutput> {
        const ret = await this.wasm.output();
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

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.TransactionUnspentOutputs> {
        const ret = await WasmV4.TransactionUnspentOutputs.from_json(json);
        return new $outer.TransactionUnspentOutputs(ret, $outer._ctx);
      }

      static async new(): Promise<WasmContract.TransactionUnspentOutputs> {
        const ret = await WasmV4.TransactionUnspentOutputs.new();
        return new $outer.TransactionUnspentOutputs(ret, $outer._ctx);
      }

      len(): Promise<number> {
        return this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.TransactionUnspentOutput> {
        const ret = await this.wasm.get(index);
        return new $outer.TransactionUnspentOutput(ret, $outer._ctx);
      }

      add(elem: WasmContract.TransactionUnspentOutput): Promise<void> {
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.TransactionWitnessSet> {
        const ret = await WasmV4.TransactionWitnessSet.from_bytes(bytes);
        return new $outer.TransactionWitnessSet(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.TransactionWitnessSet> {
        const ret = await WasmV4.TransactionWitnessSet.from_hex(hexStr);
        return new $outer.TransactionWitnessSet(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.TransactionWitnessSet> {
        const ret = await WasmV4.TransactionWitnessSet.from_json(json);
        return new $outer.TransactionWitnessSet(ret, $outer._ctx);
      }

      setVkeys(vkeys: WasmContract.Vkeywitnesses): Promise<void> {
        return this.wasm.set_vkeys(vkeys.wasm);
      }

      async vkeys(): Promise<Optional<WasmContract.Vkeywitnesses>> {
        const ret = await this.wasm.vkeys();
        if (ret == null) return undefined;
        return new $outer.Vkeywitnesses(ret, $outer._ctx);
      }

      setNativeScripts(nativeScripts: WasmContract.NativeScripts): Promise<void> {
        return this.wasm.set_native_scripts(nativeScripts.wasm);
      }

      async nativeScripts(): Promise<Optional<WasmContract.NativeScripts>> {
        const ret = await this.wasm.native_scripts();
        if (ret == null) return undefined;
        return new $outer.NativeScripts(ret, $outer._ctx);
      }

      setBootstraps(bootstraps: WasmContract.BootstrapWitnesses): Promise<void> {
        return this.wasm.set_bootstraps(bootstraps.wasm);
      }

      async bootstraps(): Promise<Optional<WasmContract.BootstrapWitnesses>> {
        const ret = await this.wasm.bootstraps();
        if (ret == null) return undefined;
        return new $outer.BootstrapWitnesses(ret, $outer._ctx);
      }

      setPlutusScripts(plutusScripts: WasmContract.PlutusScripts): Promise<void> {
        return this.wasm.set_plutus_scripts(plutusScripts.wasm);
      }

      async plutusScripts(): Promise<Optional<WasmContract.PlutusScripts>> {
        const ret = await this.wasm.plutus_scripts();
        if (ret == null) return undefined;
        return new $outer.PlutusScripts(ret, $outer._ctx);
      }

      setPlutusData(plutusData: WasmContract.PlutusList): Promise<void> {
        return this.wasm.set_plutus_data(plutusData.wasm);
      }

      async plutusData(): Promise<Optional<WasmContract.PlutusList>> {
        const ret = await this.wasm.plutus_data();
        if (ret == null) return undefined;
        return new $outer.PlutusList(ret, $outer._ctx);
      }

      setRedeemers(redeemers: WasmContract.Redeemers): Promise<void> {
        return this.wasm.set_redeemers(redeemers.wasm);
      }

      async redeemers(): Promise<Optional<WasmContract.Redeemers>> {
        const ret = await this.wasm.redeemers();
        if (ret == null) return undefined;
        return new $outer.Redeemers(ret, $outer._ctx);
      }

      static async new(): Promise<WasmContract.TransactionWitnessSet> {
        const ret = await WasmV4.TransactionWitnessSet.new();
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.TransactionWitnessSets> {
        const ret = await WasmV4.TransactionWitnessSets.from_bytes(bytes);
        return new $outer.TransactionWitnessSets(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.TransactionWitnessSets> {
        const ret = await WasmV4.TransactionWitnessSets.from_hex(hexStr);
        return new $outer.TransactionWitnessSets(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.TransactionWitnessSets> {
        const ret = await WasmV4.TransactionWitnessSets.from_json(json);
        return new $outer.TransactionWitnessSets(ret, $outer._ctx);
      }

      static async new(): Promise<WasmContract.TransactionWitnessSets> {
        const ret = await WasmV4.TransactionWitnessSets.new();
        return new $outer.TransactionWitnessSets(ret, $outer._ctx);
      }

      len(): Promise<number> {
        return this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.TransactionWitnessSet> {
        const ret = await this.wasm.get(index);
        return new $outer.TransactionWitnessSet(ret, $outer._ctx);
      }

      add(elem: WasmContract.TransactionWitnessSet): Promise<void> {
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

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.TreasuryWithdrawals> {
        const ret = await WasmV4.TreasuryWithdrawals.from_json(json);
        return new $outer.TreasuryWithdrawals(ret, $outer._ctx);
      }

      static async new(): Promise<WasmContract.TreasuryWithdrawals> {
        const ret = await WasmV4.TreasuryWithdrawals.new();
        return new $outer.TreasuryWithdrawals(ret, $outer._ctx);
      }

      async get(key: WasmContract.RewardAddress): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.get(key.wasm);
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      insert(key: WasmContract.RewardAddress, value: WasmContract.BigNum): Promise<void> {
        return this.wasm.insert(key.wasm, value.wasm);
      }

      async keys(): Promise<WasmContract.RewardAddresses> {
        const ret = await this.wasm.keys();
        return new $outer.RewardAddresses(ret, $outer._ctx);
      }

      len(): Promise<number> {
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.TreasuryWithdrawalsAction> {
        const ret = await WasmV4.TreasuryWithdrawalsAction.from_bytes(bytes);
        return new $outer.TreasuryWithdrawalsAction(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.TreasuryWithdrawalsAction> {
        const ret = await WasmV4.TreasuryWithdrawalsAction.from_hex(hexStr);
        return new $outer.TreasuryWithdrawalsAction(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.TreasuryWithdrawalsAction> {
        const ret = await WasmV4.TreasuryWithdrawalsAction.from_json(json);
        return new $outer.TreasuryWithdrawalsAction(ret, $outer._ctx);
      }

      async withdrawals(): Promise<WasmContract.TreasuryWithdrawals> {
        const ret = await this.wasm.withdrawals();
        return new $outer.TreasuryWithdrawals(ret, $outer._ctx);
      }

      async policyHash(): Promise<Optional<WasmContract.ScriptHash>> {
        const ret = await this.wasm.policy_hash();
        if (ret == null) return undefined;
        return new $outer.ScriptHash(ret, $outer._ctx);
      }

      static async new(withdrawals: WasmContract.TreasuryWithdrawals): Promise<WasmContract.TreasuryWithdrawalsAction> {
        const ret = await WasmV4.TreasuryWithdrawalsAction.new(withdrawals.wasm);
        return new $outer.TreasuryWithdrawalsAction(ret, $outer._ctx);
      }

      static async newWithPolicyHash(withdrawals: WasmContract.TreasuryWithdrawals, policyHash: WasmContract.ScriptHash): Promise<WasmContract.TreasuryWithdrawalsAction> {
        const ret = await WasmV4.TreasuryWithdrawalsAction.new_with_policy_hash(withdrawals.wasm, policyHash.wasm);
        return new $outer.TreasuryWithdrawalsAction(ret, $outer._ctx);
      }

    }
    return TreasuryWithdrawalsAction;
  })();

  public TxBuilderConstants = (() => {
    const $outer = this;

    class TxBuilderConstants
      extends Ptr<WasmV4.TxBuilderConstants>
      implements WasmContract.TxBuilderConstants
    {

      static async plutusDefaultCostModels(): Promise<WasmContract.Costmdls> {
        const ret = await WasmV4.TxBuilderConstants.plutus_default_cost_models();
        return new $outer.Costmdls(ret, $outer._ctx);
      }

      static async plutusAlonzoCostModels(): Promise<WasmContract.Costmdls> {
        const ret = await WasmV4.TxBuilderConstants.plutus_alonzo_cost_models();
        return new $outer.Costmdls(ret, $outer._ctx);
      }

      static async plutusVasilCostModels(): Promise<WasmContract.Costmdls> {
        const ret = await WasmV4.TxBuilderConstants.plutus_vasil_cost_models();
        return new $outer.Costmdls(ret, $outer._ctx);
      }

    }
    return TxBuilderConstants;
  })();

  public TxInputsBuilder = (() => {
    const $outer = this;

    class TxInputsBuilder
      extends Ptr<WasmV4.TxInputsBuilder>
      implements WasmContract.TxInputsBuilder
    {

      static async new(): Promise<WasmContract.TxInputsBuilder> {
        const ret = await WasmV4.TxInputsBuilder.new();
        return new $outer.TxInputsBuilder(ret, $outer._ctx);
      }

      addKeyInput(hash: WasmContract.Ed25519KeyHash, input: WasmContract.TransactionInput, amount: WasmContract.Value): Promise<void> {
        return this.wasm.add_key_input(hash.wasm, input.wasm, amount.wasm);
      }

      addNativeScriptInput(script: WasmContract.NativeScript, input: WasmContract.TransactionInput, amount: WasmContract.Value): Promise<void> {
        return this.wasm.add_native_script_input(script.wasm, input.wasm, amount.wasm);
      }

      addPlutusScriptInput(witness: WasmContract.PlutusWitness, input: WasmContract.TransactionInput, amount: WasmContract.Value): Promise<void> {
        return this.wasm.add_plutus_script_input(witness.wasm, input.wasm, amount.wasm);
      }

      addBootstrapInput(hash: WasmContract.ByronAddress, input: WasmContract.TransactionInput, amount: WasmContract.Value): Promise<void> {
        return this.wasm.add_bootstrap_input(hash.wasm, input.wasm, amount.wasm);
      }

      addRegularInput(address: WasmContract.Address, input: WasmContract.TransactionInput, amount: WasmContract.Value): Promise<void> {
        return this.wasm.add_regular_input(address.wasm, input.wasm, amount.wasm);
      }

      async getRefInputs(): Promise<WasmContract.TransactionInputs> {
        const ret = await this.wasm.get_ref_inputs();
        return new $outer.TransactionInputs(ret, $outer._ctx);
      }

      async getNativeInputScripts(): Promise<Optional<WasmContract.NativeScripts>> {
        const ret = await this.wasm.get_native_input_scripts();
        if (ret == null) return undefined;
        return new $outer.NativeScripts(ret, $outer._ctx);
      }

      async getPlutusInputScripts(): Promise<Optional<WasmContract.PlutusWitnesses>> {
        const ret = await this.wasm.get_plutus_input_scripts();
        if (ret == null) return undefined;
        return new $outer.PlutusWitnesses(ret, $outer._ctx);
      }

      len(): Promise<number> {
        return this.wasm.len();
      }

      addRequiredSigner(key: WasmContract.Ed25519KeyHash): Promise<void> {
        return this.wasm.add_required_signer(key.wasm);
      }

      addRequiredSigners(keys: WasmContract.Ed25519KeyHashes): Promise<void> {
        return this.wasm.add_required_signers(keys.wasm);
      }

      async totalValue(): Promise<WasmContract.Value> {
        const ret = await this.wasm.total_value();
        return new $outer.Value(ret, $outer._ctx);
      }

      async inputs(): Promise<WasmContract.TransactionInputs> {
        const ret = await this.wasm.inputs();
        return new $outer.TransactionInputs(ret, $outer._ctx);
      }

      async inputsOption(): Promise<Optional<WasmContract.TransactionInputs>> {
        const ret = await this.wasm.inputs_option();
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.URL> {
        const ret = await WasmV4.URL.from_bytes(bytes);
        return new $outer.URL(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.URL> {
        const ret = await WasmV4.URL.from_hex(hexStr);
        return new $outer.URL(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.URL> {
        const ret = await WasmV4.URL.from_json(json);
        return new $outer.URL(ret, $outer._ctx);
      }

      static async new(url: string): Promise<WasmContract.URL> {
        const ret = await WasmV4.URL.new(url);
        return new $outer.URL(ret, $outer._ctx);
      }

      url(): Promise<string> {
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.UnitInterval> {
        const ret = await WasmV4.UnitInterval.from_bytes(bytes);
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.UnitInterval> {
        const ret = await WasmV4.UnitInterval.from_hex(hexStr);
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.UnitInterval> {
        const ret = await WasmV4.UnitInterval.from_json(json);
        return new $outer.UnitInterval(ret, $outer._ctx);
      }

      async numerator(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.numerator();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      async denominator(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.denominator();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      static async new(numerator: WasmContract.BigNum, denominator: WasmContract.BigNum): Promise<WasmContract.UnitInterval> {
        const ret = await WasmV4.UnitInterval.new(numerator.wasm, denominator.wasm);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Update> {
        const ret = await WasmV4.Update.from_bytes(bytes);
        return new $outer.Update(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Update> {
        const ret = await WasmV4.Update.from_hex(hexStr);
        return new $outer.Update(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.Update> {
        const ret = await WasmV4.Update.from_json(json);
        return new $outer.Update(ret, $outer._ctx);
      }

      async proposedProtocolParameterUpdates(): Promise<WasmContract.ProposedProtocolParameterUpdates> {
        const ret = await this.wasm.proposed_protocol_parameter_updates();
        return new $outer.ProposedProtocolParameterUpdates(ret, $outer._ctx);
      }

      epoch(): Promise<number> {
        return this.wasm.epoch();
      }

      static async new(proposedProtocolParameterUpdates: WasmContract.ProposedProtocolParameterUpdates, epoch: number): Promise<WasmContract.Update> {
        const ret = await WasmV4.Update.new(proposedProtocolParameterUpdates.wasm, epoch);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.UpdateCommitteeAction> {
        const ret = await WasmV4.UpdateCommitteeAction.from_bytes(bytes);
        return new $outer.UpdateCommitteeAction(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.UpdateCommitteeAction> {
        const ret = await WasmV4.UpdateCommitteeAction.from_hex(hexStr);
        return new $outer.UpdateCommitteeAction(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.UpdateCommitteeAction> {
        const ret = await WasmV4.UpdateCommitteeAction.from_json(json);
        return new $outer.UpdateCommitteeAction(ret, $outer._ctx);
      }

      async govActionId(): Promise<Optional<WasmContract.GovernanceActionId>> {
        const ret = await this.wasm.gov_action_id();
        if (ret == null) return undefined;
        return new $outer.GovernanceActionId(ret, $outer._ctx);
      }

      async committee(): Promise<WasmContract.Committee> {
        const ret = await this.wasm.committee();
        return new $outer.Committee(ret, $outer._ctx);
      }

      async membersToRemove(): Promise<WasmContract.Credentials> {
        const ret = await this.wasm.members_to_remove();
        return new $outer.Credentials(ret, $outer._ctx);
      }

      static async new(committee: WasmContract.Committee, membersToRemove: WasmContract.Credentials): Promise<WasmContract.UpdateCommitteeAction> {
        const ret = await WasmV4.UpdateCommitteeAction.new(committee.wasm, membersToRemove.wasm);
        return new $outer.UpdateCommitteeAction(ret, $outer._ctx);
      }

      static async newWithActionId(govActionId: WasmContract.GovernanceActionId, committee: WasmContract.Committee, membersToRemove: WasmContract.Credentials): Promise<WasmContract.UpdateCommitteeAction> {
        const ret = await WasmV4.UpdateCommitteeAction.new_with_action_id(govActionId.wasm, committee.wasm, membersToRemove.wasm);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.VRFCert> {
        const ret = await WasmV4.VRFCert.from_bytes(bytes);
        return new $outer.VRFCert(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.VRFCert> {
        const ret = await WasmV4.VRFCert.from_hex(hexStr);
        return new $outer.VRFCert(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.VRFCert> {
        const ret = await WasmV4.VRFCert.from_json(json);
        return new $outer.VRFCert(ret, $outer._ctx);
      }

      output(): Promise<Uint8Array> {
        return this.wasm.output();
      }

      proof(): Promise<Uint8Array> {
        return this.wasm.proof();
      }

      static async new(output: Uint8Array, proof: Uint8Array): Promise<WasmContract.VRFCert> {
        const ret = await WasmV4.VRFCert.new(output, proof);
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

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.VRFKeyHash> {
        const ret = await WasmV4.VRFKeyHash.from_bytes(bytes);
        return new $outer.VRFKeyHash(ret, $outer._ctx);
      }

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      toBech32(prefix: string): Promise<string> {
        return this.wasm.to_bech32(prefix);
      }

      static async fromBech32(bechStr: string): Promise<WasmContract.VRFKeyHash> {
        const ret = await WasmV4.VRFKeyHash.from_bech32(bechStr);
        return new $outer.VRFKeyHash(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hex: string): Promise<WasmContract.VRFKeyHash> {
        const ret = await WasmV4.VRFKeyHash.from_hex(hex);
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

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.VRFVKey> {
        const ret = await WasmV4.VRFVKey.from_bytes(bytes);
        return new $outer.VRFVKey(ret, $outer._ctx);
      }

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      toBech32(prefix: string): Promise<string> {
        return this.wasm.to_bech32(prefix);
      }

      static async fromBech32(bechStr: string): Promise<WasmContract.VRFVKey> {
        const ret = await WasmV4.VRFVKey.from_bech32(bechStr);
        return new $outer.VRFVKey(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hex: string): Promise<WasmContract.VRFVKey> {
        const ret = await WasmV4.VRFVKey.from_hex(hex);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Value> {
        const ret = await WasmV4.Value.from_bytes(bytes);
        return new $outer.Value(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Value> {
        const ret = await WasmV4.Value.from_hex(hexStr);
        return new $outer.Value(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.Value> {
        const ret = await WasmV4.Value.from_json(json);
        return new $outer.Value(ret, $outer._ctx);
      }

      static async new(coin: WasmContract.BigNum): Promise<WasmContract.Value> {
        const ret = await WasmV4.Value.new(coin.wasm);
        return new $outer.Value(ret, $outer._ctx);
      }

      static async newFromAssets(multiasset: WasmContract.MultiAsset): Promise<WasmContract.Value> {
        const ret = await WasmV4.Value.new_from_assets(multiasset.wasm);
        return new $outer.Value(ret, $outer._ctx);
      }

      static async newWithAssets(coin: WasmContract.BigNum, multiasset: WasmContract.MultiAsset): Promise<WasmContract.Value> {
        const ret = await WasmV4.Value.new_with_assets(coin.wasm, multiasset.wasm);
        return new $outer.Value(ret, $outer._ctx);
      }

      static async zero(): Promise<WasmContract.Value> {
        const ret = await WasmV4.Value.zero();
        return new $outer.Value(ret, $outer._ctx);
      }

      isZero(): Promise<boolean> {
        return this.wasm.is_zero();
      }

      async coin(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.coin();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      setCoin(coin: WasmContract.BigNum): Promise<void> {
        return this.wasm.set_coin(coin.wasm);
      }

      async multiasset(): Promise<Optional<WasmContract.MultiAsset>> {
        const ret = await this.wasm.multiasset();
        if (ret == null) return undefined;
        return new $outer.MultiAsset(ret, $outer._ctx);
      }

      setMultiasset(multiasset: WasmContract.MultiAsset): Promise<void> {
        return this.wasm.set_multiasset(multiasset.wasm);
      }

      async checkedAdd(rhs: WasmContract.Value): Promise<WasmContract.Value> {
        const ret = await this.wasm.checked_add(rhs.wasm);
        return new $outer.Value(ret, $outer._ctx);
      }

      async checkedSub(rhsValue: WasmContract.Value): Promise<WasmContract.Value> {
        const ret = await this.wasm.checked_sub(rhsValue.wasm);
        return new $outer.Value(ret, $outer._ctx);
      }

      async clampedSub(rhsValue: WasmContract.Value): Promise<WasmContract.Value> {
        const ret = await this.wasm.clamped_sub(rhsValue.wasm);
        return new $outer.Value(ret, $outer._ctx);
      }

      compare(rhsValue: WasmContract.Value): Promise<Optional<number>> {
        return this.wasm.compare(rhsValue.wasm);
      }

    }
    return Value;
  })();

  public Vkey = (() => {
    const $outer = this;

    class Vkey
      extends Ptr<WasmV4.Vkey>
      implements WasmContract.Vkey
    {

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Vkey> {
        const ret = await WasmV4.Vkey.from_bytes(bytes);
        return new $outer.Vkey(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Vkey> {
        const ret = await WasmV4.Vkey.from_hex(hexStr);
        return new $outer.Vkey(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.Vkey> {
        const ret = await WasmV4.Vkey.from_json(json);
        return new $outer.Vkey(ret, $outer._ctx);
      }

      static async new(pk: WasmContract.PublicKey): Promise<WasmContract.Vkey> {
        const ret = await WasmV4.Vkey.new(pk.wasm);
        return new $outer.Vkey(ret, $outer._ctx);
      }

      async publicKey(): Promise<WasmContract.PublicKey> {
        const ret = await this.wasm.public_key();
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

      static async new(): Promise<WasmContract.Vkeys> {
        const ret = await WasmV4.Vkeys.new();
        return new $outer.Vkeys(ret, $outer._ctx);
      }

      len(): Promise<number> {
        return this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.Vkey> {
        const ret = await this.wasm.get(index);
        return new $outer.Vkey(ret, $outer._ctx);
      }

      add(elem: WasmContract.Vkey): Promise<void> {
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Vkeywitness> {
        const ret = await WasmV4.Vkeywitness.from_bytes(bytes);
        return new $outer.Vkeywitness(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Vkeywitness> {
        const ret = await WasmV4.Vkeywitness.from_hex(hexStr);
        return new $outer.Vkeywitness(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.Vkeywitness> {
        const ret = await WasmV4.Vkeywitness.from_json(json);
        return new $outer.Vkeywitness(ret, $outer._ctx);
      }

      static async new(vkey: WasmContract.Vkey, signature: WasmContract.Ed25519Signature): Promise<WasmContract.Vkeywitness> {
        const ret = await WasmV4.Vkeywitness.new(vkey.wasm, signature.wasm);
        return new $outer.Vkeywitness(ret, $outer._ctx);
      }

      async vkey(): Promise<WasmContract.Vkey> {
        const ret = await this.wasm.vkey();
        return new $outer.Vkey(ret, $outer._ctx);
      }

      async signature(): Promise<WasmContract.Ed25519Signature> {
        const ret = await this.wasm.signature();
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Vkeywitnesses> {
        const ret = await WasmV4.Vkeywitnesses.from_bytes(bytes);
        return new $outer.Vkeywitnesses(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Vkeywitnesses> {
        const ret = await WasmV4.Vkeywitnesses.from_hex(hexStr);
        return new $outer.Vkeywitnesses(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.Vkeywitnesses> {
        const ret = await WasmV4.Vkeywitnesses.from_json(json);
        return new $outer.Vkeywitnesses(ret, $outer._ctx);
      }

      static async new(): Promise<WasmContract.Vkeywitnesses> {
        const ret = await WasmV4.Vkeywitnesses.new();
        return new $outer.Vkeywitnesses(ret, $outer._ctx);
      }

      len(): Promise<number> {
        return this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.Vkeywitness> {
        const ret = await this.wasm.get(index);
        return new $outer.Vkeywitness(ret, $outer._ctx);
      }

      add(elem: WasmContract.Vkeywitness): Promise<void> {
        return this.wasm.add(elem.wasm);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.VoteDelegation> {
        const ret = await WasmV4.VoteDelegation.from_bytes(bytes);
        return new $outer.VoteDelegation(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.VoteDelegation> {
        const ret = await WasmV4.VoteDelegation.from_hex(hexStr);
        return new $outer.VoteDelegation(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.VoteDelegation> {
        const ret = await WasmV4.VoteDelegation.from_json(json);
        return new $outer.VoteDelegation(ret, $outer._ctx);
      }

      async stakeCredential(): Promise<WasmContract.Credential> {
        const ret = await this.wasm.stake_credential();
        return new $outer.Credential(ret, $outer._ctx);
      }

      async drep(): Promise<WasmContract.DRep> {
        const ret = await this.wasm.drep();
        return new $outer.DRep(ret, $outer._ctx);
      }

      static async new(stakeCredential: WasmContract.Credential, drep: WasmContract.DRep): Promise<WasmContract.VoteDelegation> {
        const ret = await WasmV4.VoteDelegation.new(stakeCredential.wasm, drep.wasm);
        return new $outer.VoteDelegation(ret, $outer._ctx);
      }

      hasScriptCredentials(): Promise<boolean> {
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.VoteRegistrationAndDelegation> {
        const ret = await WasmV4.VoteRegistrationAndDelegation.from_bytes(bytes);
        return new $outer.VoteRegistrationAndDelegation(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.VoteRegistrationAndDelegation> {
        const ret = await WasmV4.VoteRegistrationAndDelegation.from_hex(hexStr);
        return new $outer.VoteRegistrationAndDelegation(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.VoteRegistrationAndDelegation> {
        const ret = await WasmV4.VoteRegistrationAndDelegation.from_json(json);
        return new $outer.VoteRegistrationAndDelegation(ret, $outer._ctx);
      }

      async stakeCredential(): Promise<WasmContract.Credential> {
        const ret = await this.wasm.stake_credential();
        return new $outer.Credential(ret, $outer._ctx);
      }

      async drep(): Promise<WasmContract.DRep> {
        const ret = await this.wasm.drep();
        return new $outer.DRep(ret, $outer._ctx);
      }

      async coin(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.coin();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      static async new(stakeCredential: WasmContract.Credential, drep: WasmContract.DRep, coin: WasmContract.BigNum): Promise<WasmContract.VoteRegistrationAndDelegation> {
        const ret = await WasmV4.VoteRegistrationAndDelegation.new(stakeCredential.wasm, drep.wasm, coin.wasm);
        return new $outer.VoteRegistrationAndDelegation(ret, $outer._ctx);
      }

      hasScriptCredentials(): Promise<boolean> {
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Voter> {
        const ret = await WasmV4.Voter.from_bytes(bytes);
        return new $outer.Voter(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Voter> {
        const ret = await WasmV4.Voter.from_hex(hexStr);
        return new $outer.Voter(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.Voter> {
        const ret = await WasmV4.Voter.from_json(json);
        return new $outer.Voter(ret, $outer._ctx);
      }

      static async newConstitutionalCommitteeHotKey(cred: WasmContract.Credential): Promise<WasmContract.Voter> {
        const ret = await WasmV4.Voter.new_constitutional_committee_hot_key(cred.wasm);
        return new $outer.Voter(ret, $outer._ctx);
      }

      static async newDrep(cred: WasmContract.Credential): Promise<WasmContract.Voter> {
        const ret = await WasmV4.Voter.new_drep(cred.wasm);
        return new $outer.Voter(ret, $outer._ctx);
      }

      static async newStakingPool(keyHash: WasmContract.Ed25519KeyHash): Promise<WasmContract.Voter> {
        const ret = await WasmV4.Voter.new_staking_pool(keyHash.wasm);
        return new $outer.Voter(ret, $outer._ctx);
      }

      kind(): Promise<WasmContract.VoterKind> {
        return this.wasm.kind();
      }

      async toConstitutionalCommitteeHotCred(): Promise<Optional<WasmContract.Credential>> {
        const ret = await this.wasm.to_constitutional_committee_hot_cred();
        if (ret == null) return undefined;
        return new $outer.Credential(ret, $outer._ctx);
      }

      async toDrepCred(): Promise<Optional<WasmContract.Credential>> {
        const ret = await this.wasm.to_drep_cred();
        if (ret == null) return undefined;
        return new $outer.Credential(ret, $outer._ctx);
      }

      async toStakingPoolKeyHash(): Promise<Optional<WasmContract.Ed25519KeyHash>> {
        const ret = await this.wasm.to_staking_pool_key_hash();
        if (ret == null) return undefined;
        return new $outer.Ed25519KeyHash(ret, $outer._ctx);
      }

      hasScriptCredentials(): Promise<boolean> {
        return this.wasm.has_script_credentials();
      }

      async toKeyHash(): Promise<Optional<WasmContract.Ed25519KeyHash>> {
        const ret = await this.wasm.to_key_hash();
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

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.Voters> {
        const ret = await WasmV4.Voters.from_json(json);
        return new $outer.Voters(ret, $outer._ctx);
      }

      static async new(): Promise<WasmContract.Voters> {
        const ret = await WasmV4.Voters.new();
        return new $outer.Voters(ret, $outer._ctx);
      }

      add(voter: WasmContract.Voter): Promise<void> {
        return this.wasm.add(voter.wasm);
      }

      async get(index: number): Promise<Optional<WasmContract.Voter>> {
        const ret = await this.wasm.get(index);
        if (ret == null) return undefined;
        return new $outer.Voter(ret, $outer._ctx);
      }

      len(): Promise<number> {
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

      static async new(): Promise<WasmContract.VotingBuilder> {
        const ret = await WasmV4.VotingBuilder.new();
        return new $outer.VotingBuilder(ret, $outer._ctx);
      }

      add(voter: WasmContract.Voter, govActionId: WasmContract.GovernanceActionId, votingProcedure: WasmContract.VotingProcedure): Promise<void> {
        return this.wasm.add(voter.wasm, govActionId.wasm, votingProcedure.wasm);
      }

      addWithPlutusWitness(voter: WasmContract.Voter, govActionId: WasmContract.GovernanceActionId, votingProcedure: WasmContract.VotingProcedure, witness: WasmContract.PlutusWitness): Promise<void> {
        return this.wasm.add_with_plutus_witness(voter.wasm, govActionId.wasm, votingProcedure.wasm, witness.wasm);
      }

      addWithNativeScript(voter: WasmContract.Voter, govActionId: WasmContract.GovernanceActionId, votingProcedure: WasmContract.VotingProcedure, nativeScriptSource: WasmContract.NativeScriptSource): Promise<void> {
        return this.wasm.add_with_native_script(voter.wasm, govActionId.wasm, votingProcedure.wasm, nativeScriptSource.wasm);
      }

      async getPlutusWitnesses(): Promise<WasmContract.PlutusWitnesses> {
        const ret = await this.wasm.get_plutus_witnesses();
        return new $outer.PlutusWitnesses(ret, $outer._ctx);
      }

      async getRefInputs(): Promise<WasmContract.TransactionInputs> {
        const ret = await this.wasm.get_ref_inputs();
        return new $outer.TransactionInputs(ret, $outer._ctx);
      }

      async getNativeScripts(): Promise<WasmContract.NativeScripts> {
        const ret = await this.wasm.get_native_scripts();
        return new $outer.NativeScripts(ret, $outer._ctx);
      }

      hasPlutusScripts(): Promise<boolean> {
        return this.wasm.has_plutus_scripts();
      }

      async build(): Promise<WasmContract.VotingProcedures> {
        const ret = await this.wasm.build();
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.VotingProcedure> {
        const ret = await WasmV4.VotingProcedure.from_bytes(bytes);
        return new $outer.VotingProcedure(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.VotingProcedure> {
        const ret = await WasmV4.VotingProcedure.from_hex(hexStr);
        return new $outer.VotingProcedure(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.VotingProcedure> {
        const ret = await WasmV4.VotingProcedure.from_json(json);
        return new $outer.VotingProcedure(ret, $outer._ctx);
      }

      static async new(vote: WasmContract.VoteKind): Promise<WasmContract.VotingProcedure> {
        const ret = await WasmV4.VotingProcedure.new(vote);
        return new $outer.VotingProcedure(ret, $outer._ctx);
      }

      static async newWithAnchor(vote: WasmContract.VoteKind, anchor: WasmContract.Anchor): Promise<WasmContract.VotingProcedure> {
        const ret = await WasmV4.VotingProcedure.new_with_anchor(vote, anchor.wasm);
        return new $outer.VotingProcedure(ret, $outer._ctx);
      }

      voteKind(): Promise<WasmContract.VoteKind> {
        return this.wasm.vote_kind();
      }

      async anchor(): Promise<Optional<WasmContract.Anchor>> {
        const ret = await this.wasm.anchor();
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.VotingProcedures> {
        const ret = await WasmV4.VotingProcedures.from_bytes(bytes);
        return new $outer.VotingProcedures(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.VotingProcedures> {
        const ret = await WasmV4.VotingProcedures.from_hex(hexStr);
        return new $outer.VotingProcedures(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.VotingProcedures> {
        const ret = await WasmV4.VotingProcedures.from_json(json);
        return new $outer.VotingProcedures(ret, $outer._ctx);
      }

      static async new(): Promise<WasmContract.VotingProcedures> {
        const ret = await WasmV4.VotingProcedures.new();
        return new $outer.VotingProcedures(ret, $outer._ctx);
      }

      insert(voter: WasmContract.Voter, governanceActionId: WasmContract.GovernanceActionId, votingProcedure: WasmContract.VotingProcedure): Promise<void> {
        return this.wasm.insert(voter.wasm, governanceActionId.wasm, votingProcedure.wasm);
      }

      async get(voter: WasmContract.Voter, governanceActionId: WasmContract.GovernanceActionId): Promise<Optional<WasmContract.VotingProcedure>> {
        const ret = await this.wasm.get(voter.wasm, governanceActionId.wasm);
        if (ret == null) return undefined;
        return new $outer.VotingProcedure(ret, $outer._ctx);
      }

      async getVoters(): Promise<WasmContract.Voters> {
        const ret = await this.wasm.get_voters();
        return new $outer.Voters(ret, $outer._ctx);
      }

      async getGovernanceActionIdsByVoter(voter: WasmContract.Voter): Promise<WasmContract.GovernanceActionIds> {
        const ret = await this.wasm.get_governance_action_ids_by_voter(voter.wasm);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.VotingProposal> {
        const ret = await WasmV4.VotingProposal.from_bytes(bytes);
        return new $outer.VotingProposal(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.VotingProposal> {
        const ret = await WasmV4.VotingProposal.from_hex(hexStr);
        return new $outer.VotingProposal(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.VotingProposal> {
        const ret = await WasmV4.VotingProposal.from_json(json);
        return new $outer.VotingProposal(ret, $outer._ctx);
      }

      async governanceAction(): Promise<WasmContract.GovernanceAction> {
        const ret = await this.wasm.governance_action();
        return new $outer.GovernanceAction(ret, $outer._ctx);
      }

      async anchor(): Promise<WasmContract.Anchor> {
        const ret = await this.wasm.anchor();
        return new $outer.Anchor(ret, $outer._ctx);
      }

      async rewardAccount(): Promise<WasmContract.RewardAddress> {
        const ret = await this.wasm.reward_account();
        return new $outer.RewardAddress(ret, $outer._ctx);
      }

      async deposit(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.deposit();
        return new $outer.BigNum(ret, $outer._ctx);
      }

      static async new(governanceAction: WasmContract.GovernanceAction, anchor: WasmContract.Anchor, rewardAccount: WasmContract.RewardAddress, deposit: WasmContract.BigNum): Promise<WasmContract.VotingProposal> {
        const ret = await WasmV4.VotingProposal.new(governanceAction.wasm, anchor.wasm, rewardAccount.wasm, deposit.wasm);
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

      static async new(): Promise<WasmContract.VotingProposalBuilder> {
        const ret = await WasmV4.VotingProposalBuilder.new();
        return new $outer.VotingProposalBuilder(ret, $outer._ctx);
      }

      add(proposal: WasmContract.VotingProposal): Promise<void> {
        return this.wasm.add(proposal.wasm);
      }

      addWithPlutusWitness(proposal: WasmContract.VotingProposal, witness: WasmContract.PlutusWitness): Promise<void> {
        return this.wasm.add_with_plutus_witness(proposal.wasm, witness.wasm);
      }

      async getPlutusWitnesses(): Promise<WasmContract.PlutusWitnesses> {
        const ret = await this.wasm.get_plutus_witnesses();
        return new $outer.PlutusWitnesses(ret, $outer._ctx);
      }

      async getRefInputs(): Promise<WasmContract.TransactionInputs> {
        const ret = await this.wasm.get_ref_inputs();
        return new $outer.TransactionInputs(ret, $outer._ctx);
      }

      hasPlutusScripts(): Promise<boolean> {
        return this.wasm.has_plutus_scripts();
      }

      async build(): Promise<WasmContract.VotingProposals> {
        const ret = await this.wasm.build();
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.VotingProposals> {
        const ret = await WasmV4.VotingProposals.from_bytes(bytes);
        return new $outer.VotingProposals(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.VotingProposals> {
        const ret = await WasmV4.VotingProposals.from_hex(hexStr);
        return new $outer.VotingProposals(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.VotingProposals> {
        const ret = await WasmV4.VotingProposals.from_json(json);
        return new $outer.VotingProposals(ret, $outer._ctx);
      }

      static async new(): Promise<WasmContract.VotingProposals> {
        const ret = await WasmV4.VotingProposals.new();
        return new $outer.VotingProposals(ret, $outer._ctx);
      }

      len(): Promise<number> {
        return this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.VotingProposal> {
        const ret = await this.wasm.get(index);
        return new $outer.VotingProposal(ret, $outer._ctx);
      }

      add(proposal: WasmContract.VotingProposal): Promise<void> {
        return this.wasm.add(proposal.wasm);
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

      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Withdrawals> {
        const ret = await WasmV4.Withdrawals.from_bytes(bytes);
        return new $outer.Withdrawals(ret, $outer._ctx);
      }

      toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Withdrawals> {
        const ret = await WasmV4.Withdrawals.from_hex(hexStr);
        return new $outer.Withdrawals(ret, $outer._ctx);
      }

      toJson(): Promise<string> {
        return this.wasm.to_json();
      }

      static async fromJson(json: string): Promise<WasmContract.Withdrawals> {
        const ret = await WasmV4.Withdrawals.from_json(json);
        return new $outer.Withdrawals(ret, $outer._ctx);
      }

      static async new(): Promise<WasmContract.Withdrawals> {
        const ret = await WasmV4.Withdrawals.new();
        return new $outer.Withdrawals(ret, $outer._ctx);
      }

      len(): Promise<number> {
        return this.wasm.len();
      }

      async insert(key: WasmContract.RewardAddress, value: WasmContract.BigNum): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.insert(key.wasm, value.wasm);
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      async get(key: WasmContract.RewardAddress): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.get(key.wasm);
        if (ret == null) return undefined;
        return new $outer.BigNum(ret, $outer._ctx);
      }

      async keys(): Promise<WasmContract.RewardAddresses> {
        const ret = await this.wasm.keys();
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

      static async new(): Promise<WasmContract.WithdrawalsBuilder> {
        const ret = await WasmV4.WithdrawalsBuilder.new();
        return new $outer.WithdrawalsBuilder(ret, $outer._ctx);
      }

      add(address: WasmContract.RewardAddress, coin: WasmContract.BigNum): Promise<void> {
        return this.wasm.add(address.wasm, coin.wasm);
      }

      addWithPlutusWitness(address: WasmContract.RewardAddress, coin: WasmContract.BigNum, witness: WasmContract.PlutusWitness): Promise<void> {
        return this.wasm.add_with_plutus_witness(address.wasm, coin.wasm, witness.wasm);
      }

      addWithNativeScript(address: WasmContract.RewardAddress, coin: WasmContract.BigNum, nativeScriptSource: WasmContract.NativeScriptSource): Promise<void> {
        return this.wasm.add_with_native_script(address.wasm, coin.wasm, nativeScriptSource.wasm);
      }

      async getPlutusWitnesses(): Promise<WasmContract.PlutusWitnesses> {
        const ret = await this.wasm.get_plutus_witnesses();
        return new $outer.PlutusWitnesses(ret, $outer._ctx);
      }

      async getRefInputs(): Promise<WasmContract.TransactionInputs> {
        const ret = await this.wasm.get_ref_inputs();
        return new $outer.TransactionInputs(ret, $outer._ctx);
      }

      async getNativeScripts(): Promise<WasmContract.NativeScripts> {
        const ret = await this.wasm.get_native_scripts();
        return new $outer.NativeScripts(ret, $outer._ctx);
      }

      async getTotalWithdrawals(): Promise<WasmContract.Value> {
        const ret = await this.wasm.get_total_withdrawals();
        return new $outer.Value(ret, $outer._ctx);
      }

      hasPlutusScripts(): Promise<boolean> {
        return this.wasm.has_plutus_scripts();
      }

      async build(): Promise<WasmContract.Withdrawals> {
        const ret = await this.wasm.build();
        return new $outer.Withdrawals(ret, $outer._ctx);
      }

    }
    return WithdrawalsBuilder;
  })();

  public AddressKind = (() => { return WasmContract.AddressKind; })();

  public CborContainerType = (() => { return WasmContract.CborContainerType; })();

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

  public VoteKind = (() => { return WasmContract.VoteKind; })();

  public VoterKind = (() => { return WasmContract.VoterKind; })();

}