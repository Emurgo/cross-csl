import * as WasmV4 from '@emurgo/csl-mobile-bridge';
import * as WasmContract from '@emurgo/cross-csl-core';

const { Ptr } = WasmContract;
import type { Optional } from '@emurgo/cross-csl-core';

export const init = (_ctx?: string): WasmContract.WasmModuleProxy => {
  return new WasmModuleProxy();
};

export class WasmModuleProxy implements WasmContract.WasmModuleProxy {
  constructor() {}

  async calculateExUnitsCeilCost(exUnits: WasmContract.ExUnits, exUnitPrices: WasmContract.ExUnitPrices): Promise<WasmContract.BigNum> {
    const ret = await WasmV4.calculate_ex_units_ceil_cost(exUnits.wasm, exUnitPrices.wasm);
    return new this.BigNum(ret);
  }

  async createSendAll(address: WasmContract.Address, utxos: WasmContract.TransactionUnspentOutputs, config: WasmContract.TransactionBuilderConfig): Promise<WasmContract.TransactionBatchList> {
    const ret = await WasmV4.create_send_all(address.wasm, utxos.wasm, config.wasm);
    return new this.TransactionBatchList(ret);
  }

  async decodeArbitraryBytesFromMetadatum(metadata: WasmContract.TransactionMetadatum): Promise<Uint8Array> {
    const ret = await WasmV4.decode_arbitrary_bytes_from_metadatum(metadata.wasm);
    return ret;
  }

  async decodeMetadatumToJsonStr(metadatum: WasmContract.TransactionMetadatum, schema: WasmContract.MetadataJsonSchema): Promise<string> {
    const ret = await WasmV4.decode_metadatum_to_json_str(metadatum.wasm, schema);
    return ret;
  }

  async decodePlutusDatumToJsonStr(datum: WasmContract.PlutusData, schema: WasmContract.PlutusDatumSchema): Promise<string> {
    const ret = await WasmV4.decode_plutus_datum_to_json_str(datum.wasm, schema);
    return ret;
  }

  async decryptWithPassword(password: string, data: string): Promise<string> {
    const ret = await WasmV4.decrypt_with_password(password, data);
    return ret;
  }

  async encodeArbitraryBytesAsMetadatum(bytes: Uint8Array): Promise<WasmContract.TransactionMetadatum> {
    const ret = await WasmV4.encode_arbitrary_bytes_as_metadatum(bytes);
    return new this.TransactionMetadatum(ret);
  }

  async encodeJsonStrToMetadatum(json: string, schema: WasmContract.MetadataJsonSchema): Promise<WasmContract.TransactionMetadatum> {
    const ret = await WasmV4.encode_json_str_to_metadatum(json, schema);
    return new this.TransactionMetadatum(ret);
  }

  async encodeJsonStrToNativeScript(json: string, selfXpub: string, schema: WasmContract.ScriptSchema): Promise<WasmContract.NativeScript> {
    const ret = await WasmV4.encode_json_str_to_native_script(json, selfXpub, schema);
    return new this.NativeScript(ret);
  }

  async encodeJsonStrToPlutusDatum(json: string, schema: WasmContract.PlutusDatumSchema): Promise<WasmContract.PlutusData> {
    const ret = await WasmV4.encode_json_str_to_plutus_datum(json, schema);
    return new this.PlutusData(ret);
  }

  async encryptWithPassword(password: string, salt: string, nonce: string, data: string): Promise<string> {
    const ret = await WasmV4.encrypt_with_password(password, salt, nonce, data);
    return ret;
  }

  async getDeposit(txbody: WasmContract.TransactionBody, poolDeposit: WasmContract.BigNum, keyDeposit: WasmContract.BigNum): Promise<WasmContract.BigNum> {
    const ret = await WasmV4.get_deposit(txbody.wasm, poolDeposit.wasm, keyDeposit.wasm);
    return new this.BigNum(ret);
  }

  async getImplicitInput(txbody: WasmContract.TransactionBody, poolDeposit: WasmContract.BigNum, keyDeposit: WasmContract.BigNum): Promise<WasmContract.Value> {
    const ret = await WasmV4.get_implicit_input(txbody.wasm, poolDeposit.wasm, keyDeposit.wasm);
    return new this.Value(ret);
  }

  async hasTransactionSetTag(txBytes: Uint8Array): Promise<WasmContract.TransactionSetsState> {
    const ret = await WasmV4.has_transaction_set_tag(txBytes);
    return ret;
  }

  async hashAuxiliaryData(auxiliaryData: WasmContract.AuxiliaryData): Promise<WasmContract.AuxiliaryDataHash> {
    const ret = await WasmV4.hash_auxiliary_data(auxiliaryData.wasm);
    return new this.AuxiliaryDataHash(ret);
  }

  async hashPlutusData(plutusData: WasmContract.PlutusData): Promise<WasmContract.DataHash> {
    const ret = await WasmV4.hash_plutus_data(plutusData.wasm);
    return new this.DataHash(ret);
  }

  async hashScriptData(redeemers: WasmContract.Redeemers, costModels: WasmContract.Costmdls, datums: Optional<WasmContract.PlutusList>): Promise<WasmContract.ScriptDataHash> {
    const ret = await WasmV4.hash_script_data(redeemers.wasm, costModels.wasm, datums?.wasm);
    return new this.ScriptDataHash(ret);
  }

  async makeDaedalusBootstrapWitness(txBodyHash: WasmContract.TransactionHash, addr: WasmContract.ByronAddress, key: WasmContract.LegacyDaedalusPrivateKey): Promise<WasmContract.BootstrapWitness> {
    const ret = await WasmV4.make_daedalus_bootstrap_witness(txBodyHash.wasm, addr.wasm, key.wasm);
    return new this.BootstrapWitness(ret);
  }

  async makeIcarusBootstrapWitness(txBodyHash: WasmContract.TransactionHash, addr: WasmContract.ByronAddress, key: WasmContract.Bip32PrivateKey): Promise<WasmContract.BootstrapWitness> {
    const ret = await WasmV4.make_icarus_bootstrap_witness(txBodyHash.wasm, addr.wasm, key.wasm);
    return new this.BootstrapWitness(ret);
  }

  async makeVkeyWitness(txBodyHash: WasmContract.TransactionHash, sk: WasmContract.PrivateKey): Promise<WasmContract.Vkeywitness> {
    const ret = await WasmV4.make_vkey_witness(txBodyHash.wasm, sk.wasm);
    return new this.Vkeywitness(ret);
  }

  async minAdaForOutput(output: WasmContract.TransactionOutput, dataCost: WasmContract.DataCost): Promise<WasmContract.BigNum> {
    const ret = await WasmV4.min_ada_for_output(output.wasm, dataCost.wasm);
    return new this.BigNum(ret);
  }

  async minFee(tx: WasmContract.Transaction, linearFee: WasmContract.LinearFee): Promise<WasmContract.BigNum> {
    const ret = await WasmV4.min_fee(tx.wasm, linearFee.wasm);
    return new this.BigNum(ret);
  }

  async minRefScriptFee(totalRefScriptsSize: number, refScriptCoinsPerByte: WasmContract.UnitInterval): Promise<WasmContract.BigNum> {
    const ret = await WasmV4.min_ref_script_fee(totalRefScriptsSize, refScriptCoinsPerByte.wasm);
    return new this.BigNum(ret);
  }

  async minScriptFee(tx: WasmContract.Transaction, exUnitPrices: WasmContract.ExUnitPrices): Promise<WasmContract.BigNum> {
    const ret = await WasmV4.min_script_fee(tx.wasm, exUnitPrices.wasm);
    return new this.BigNum(ret);
  }

  public Address = (() => {
    const $outer = this;

    class Address
      extends Ptr<WasmV4.Address>
      implements WasmContract.Address
    {

      static async fromBytes(data: Uint8Array): Promise<WasmContract.Address> {
        const ret = await WasmV4.Address.from_bytes(data);
        return new $outer.Address(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.Address> {
        const ret = await WasmV4.Address.from_json(json);
        return new $outer.Address(ret);
      }

      async kind(): Promise<WasmContract.AddressKind> {
        const ret = await this.wasm.kind();
        return ret;
      }

      async paymentCred(): Promise<Optional<WasmContract.Credential>> {
        const ret = await this.wasm.payment_cred();
        if (ret == null) return undefined;
        return new $outer.Credential(ret);
      }

      async isMalformed(): Promise<boolean> {
        const ret = await this.wasm.is_malformed();
        return ret;
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Address> {
        const ret = await WasmV4.Address.from_hex(hexStr);
        return new $outer.Address(ret);
      }

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      async toBech32(prefix: Optional<string>): Promise<string> {
        const ret = await this.wasm.to_bech32(prefix);
        return ret;
      }

      static async fromBech32(bechStr: string): Promise<WasmContract.Address> {
        const ret = await WasmV4.Address.from_bech32(bechStr);
        return new $outer.Address(ret);
      }

      async networkId(): Promise<number> {
        const ret = await this.wasm.network_id();
        return ret;
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Anchor> {
        const ret = await WasmV4.Anchor.from_bytes(bytes);
        return new $outer.Anchor(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Anchor> {
        const ret = await WasmV4.Anchor.from_hex(hexStr);
        return new $outer.Anchor(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.Anchor> {
        const ret = await WasmV4.Anchor.from_json(json);
        return new $outer.Anchor(ret);
      }

      async url(): Promise<WasmContract.URL> {
        const ret = await this.wasm.url();
        return new $outer.URL(ret);
      }

      async anchorDataHash(): Promise<WasmContract.AnchorDataHash> {
        const ret = await this.wasm.anchor_data_hash();
        return new $outer.AnchorDataHash(ret);
      }

      static async new(anchorUrl: WasmContract.URL, anchorDataHash: WasmContract.AnchorDataHash): Promise<WasmContract.Anchor> {
        const ret = await WasmV4.Anchor.new(anchorUrl.wasm, anchorDataHash.wasm);
        return new $outer.Anchor(ret);
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
        return new $outer.AnchorDataHash(ret);
      }

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      async toBech32(prefix: string): Promise<string> {
        const ret = await this.wasm.to_bech32(prefix);
        return ret;
      }

      static async fromBech32(bechStr: string): Promise<WasmContract.AnchorDataHash> {
        const ret = await WasmV4.AnchorDataHash.from_bech32(bechStr);
        return new $outer.AnchorDataHash(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hex: string): Promise<WasmContract.AnchorDataHash> {
        const ret = await WasmV4.AnchorDataHash.from_hex(hex);
        return new $outer.AnchorDataHash(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.AssetName> {
        const ret = await WasmV4.AssetName.from_bytes(bytes);
        return new $outer.AssetName(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.AssetName> {
        const ret = await WasmV4.AssetName.from_hex(hexStr);
        return new $outer.AssetName(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.AssetName> {
        const ret = await WasmV4.AssetName.from_json(json);
        return new $outer.AssetName(ret);
      }

      static async new(name: Uint8Array): Promise<WasmContract.AssetName> {
        const ret = await WasmV4.AssetName.new(name);
        return new $outer.AssetName(ret);
      }

      async name(): Promise<Uint8Array> {
        const ret = await this.wasm.name();
        return ret;
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.AssetNames> {
        const ret = await WasmV4.AssetNames.from_bytes(bytes);
        return new $outer.AssetNames(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.AssetNames> {
        const ret = await WasmV4.AssetNames.from_hex(hexStr);
        return new $outer.AssetNames(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.AssetNames> {
        const ret = await WasmV4.AssetNames.from_json(json);
        return new $outer.AssetNames(ret);
      }

      static async new(): Promise<WasmContract.AssetNames> {
        const ret = await WasmV4.AssetNames.new();
        return new $outer.AssetNames(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async get(index: number): Promise<WasmContract.AssetName> {
        const ret = await this.wasm.get(index);
        return new $outer.AssetName(ret);
      }

      async add(elem: WasmContract.AssetName): Promise<void> {
        const ret = await this.wasm.add(elem.wasm);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Assets> {
        const ret = await WasmV4.Assets.from_bytes(bytes);
        return new $outer.Assets(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Assets> {
        const ret = await WasmV4.Assets.from_hex(hexStr);
        return new $outer.Assets(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.Assets> {
        const ret = await WasmV4.Assets.from_json(json);
        return new $outer.Assets(ret);
      }

      static async new(): Promise<WasmContract.Assets> {
        const ret = await WasmV4.Assets.new();
        return new $outer.Assets(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async insert(key: WasmContract.AssetName, value: WasmContract.BigNum): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.insert(key.wasm, value.wasm);
        if (ret == null) return undefined;
        return new $outer.BigNum(ret);
      }

      async get(key: WasmContract.AssetName): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.get(key.wasm);
        if (ret == null) return undefined;
        return new $outer.BigNum(ret);
      }

      async keys(): Promise<WasmContract.AssetNames> {
        const ret = await this.wasm.keys();
        return new $outer.AssetNames(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.AuxiliaryData> {
        const ret = await WasmV4.AuxiliaryData.from_bytes(bytes);
        return new $outer.AuxiliaryData(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.AuxiliaryData> {
        const ret = await WasmV4.AuxiliaryData.from_hex(hexStr);
        return new $outer.AuxiliaryData(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.AuxiliaryData> {
        const ret = await WasmV4.AuxiliaryData.from_json(json);
        return new $outer.AuxiliaryData(ret);
      }

      static async new(): Promise<WasmContract.AuxiliaryData> {
        const ret = await WasmV4.AuxiliaryData.new();
        return new $outer.AuxiliaryData(ret);
      }

      async metadata(): Promise<Optional<WasmContract.GeneralTransactionMetadata>> {
        const ret = await this.wasm.metadata();
        if (ret == null) return undefined;
        return new $outer.GeneralTransactionMetadata(ret);
      }

      async setMetadata(metadata: WasmContract.GeneralTransactionMetadata): Promise<void> {
        const ret = await this.wasm.set_metadata(metadata.wasm);
      }

      async nativeScripts(): Promise<Optional<WasmContract.NativeScripts>> {
        const ret = await this.wasm.native_scripts();
        if (ret == null) return undefined;
        return new $outer.NativeScripts(ret);
      }

      async setNativeScripts(nativeScripts: WasmContract.NativeScripts): Promise<void> {
        const ret = await this.wasm.set_native_scripts(nativeScripts.wasm);
      }

      async plutusScripts(): Promise<Optional<WasmContract.PlutusScripts>> {
        const ret = await this.wasm.plutus_scripts();
        if (ret == null) return undefined;
        return new $outer.PlutusScripts(ret);
      }

      async setPlutusScripts(plutusScripts: WasmContract.PlutusScripts): Promise<void> {
        const ret = await this.wasm.set_plutus_scripts(plutusScripts.wasm);
      }

      async preferAlonzoFormat(): Promise<boolean> {
        const ret = await this.wasm.prefer_alonzo_format();
        return ret;
      }

      async setPreferAlonzoFormat(prefer: boolean): Promise<void> {
        const ret = await this.wasm.set_prefer_alonzo_format(prefer);
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
        return new $outer.AuxiliaryDataHash(ret);
      }

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      async toBech32(prefix: string): Promise<string> {
        const ret = await this.wasm.to_bech32(prefix);
        return ret;
      }

      static async fromBech32(bechStr: string): Promise<WasmContract.AuxiliaryDataHash> {
        const ret = await WasmV4.AuxiliaryDataHash.from_bech32(bechStr);
        return new $outer.AuxiliaryDataHash(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hex: string): Promise<WasmContract.AuxiliaryDataHash> {
        const ret = await WasmV4.AuxiliaryDataHash.from_hex(hex);
        return new $outer.AuxiliaryDataHash(ret);
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
        return new $outer.AuxiliaryDataSet(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async insert(txIndex: number, data: WasmContract.AuxiliaryData): Promise<Optional<WasmContract.AuxiliaryData>> {
        const ret = await this.wasm.insert(txIndex, data.wasm);
        if (ret == null) return undefined;
        return new $outer.AuxiliaryData(ret);
      }

      async get(txIndex: number): Promise<Optional<WasmContract.AuxiliaryData>> {
        const ret = await this.wasm.get(txIndex);
        if (ret == null) return undefined;
        return new $outer.AuxiliaryData(ret);
      }

      async indices(): Promise<Uint32Array> {
        const ret = await this.wasm.indices();
        return ret;
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
        return new $outer.BaseAddress(ret);
      }

      async paymentCred(): Promise<WasmContract.Credential> {
        const ret = await this.wasm.payment_cred();
        return new $outer.Credential(ret);
      }

      async stakeCred(): Promise<WasmContract.Credential> {
        const ret = await this.wasm.stake_cred();
        return new $outer.Credential(ret);
      }

      async toAddress(): Promise<WasmContract.Address> {
        const ret = await this.wasm.to_address();
        return new $outer.Address(ret);
      }

      static async fromAddress(addr: WasmContract.Address): Promise<Optional<WasmContract.BaseAddress>> {
        const ret = await WasmV4.BaseAddress.from_address(addr.wasm);
        if (ret == null) return undefined;
        return new $outer.BaseAddress(ret);
      }

      async networkId(): Promise<number> {
        const ret = await this.wasm.network_id();
        return ret;
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.BigInt> {
        const ret = await WasmV4.BigInt.from_bytes(bytes);
        return new $outer.BigInt(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.BigInt> {
        const ret = await WasmV4.BigInt.from_hex(hexStr);
        return new $outer.BigInt(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.BigInt> {
        const ret = await WasmV4.BigInt.from_json(json);
        return new $outer.BigInt(ret);
      }

      async isZero(): Promise<boolean> {
        const ret = await this.wasm.is_zero();
        return ret;
      }

      async asU64(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.as_u64();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret);
      }

      async asInt(): Promise<Optional<WasmContract.Int>> {
        const ret = await this.wasm.as_int();
        if (ret == null) return undefined;
        return new $outer.Int(ret);
      }

      static async fromStr(text: string): Promise<WasmContract.BigInt> {
        const ret = await WasmV4.BigInt.from_str(text);
        return new $outer.BigInt(ret);
      }

      async toStr(): Promise<string> {
        const ret = await this.wasm.to_str();
        return ret;
      }

      async add(other: WasmContract.BigInt): Promise<WasmContract.BigInt> {
        const ret = await this.wasm.add(other.wasm);
        return new $outer.BigInt(ret);
      }

      async sub(other: WasmContract.BigInt): Promise<WasmContract.BigInt> {
        const ret = await this.wasm.sub(other.wasm);
        return new $outer.BigInt(ret);
      }

      async mul(other: WasmContract.BigInt): Promise<WasmContract.BigInt> {
        const ret = await this.wasm.mul(other.wasm);
        return new $outer.BigInt(ret);
      }

      async pow(exp: number): Promise<WasmContract.BigInt> {
        const ret = await this.wasm.pow(exp);
        return new $outer.BigInt(ret);
      }

      static async one(): Promise<WasmContract.BigInt> {
        const ret = await WasmV4.BigInt.one();
        return new $outer.BigInt(ret);
      }

      static async zero(): Promise<WasmContract.BigInt> {
        const ret = await WasmV4.BigInt.zero();
        return new $outer.BigInt(ret);
      }

      async abs(): Promise<WasmContract.BigInt> {
        const ret = await this.wasm.abs();
        return new $outer.BigInt(ret);
      }

      async increment(): Promise<WasmContract.BigInt> {
        const ret = await this.wasm.increment();
        return new $outer.BigInt(ret);
      }

      async divCeil(other: WasmContract.BigInt): Promise<WasmContract.BigInt> {
        const ret = await this.wasm.div_ceil(other.wasm);
        return new $outer.BigInt(ret);
      }

      async divFloor(other: WasmContract.BigInt): Promise<WasmContract.BigInt> {
        const ret = await this.wasm.div_floor(other.wasm);
        return new $outer.BigInt(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.BigNum> {
        const ret = await WasmV4.BigNum.from_bytes(bytes);
        return new $outer.BigNum(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.BigNum> {
        const ret = await WasmV4.BigNum.from_hex(hexStr);
        return new $outer.BigNum(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.BigNum> {
        const ret = await WasmV4.BigNum.from_json(json);
        return new $outer.BigNum(ret);
      }

      static async fromStr(string: string): Promise<WasmContract.BigNum> {
        const ret = await WasmV4.BigNum.from_str(string);
        return new $outer.BigNum(ret);
      }

      async toStr(): Promise<string> {
        const ret = await this.wasm.to_str();
        return ret;
      }

      static async zero(): Promise<WasmContract.BigNum> {
        const ret = await WasmV4.BigNum.zero();
        return new $outer.BigNum(ret);
      }

      static async one(): Promise<WasmContract.BigNum> {
        const ret = await WasmV4.BigNum.one();
        return new $outer.BigNum(ret);
      }

      async isZero(): Promise<boolean> {
        const ret = await this.wasm.is_zero();
        return ret;
      }

      async divFloor(other: WasmContract.BigNum): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.div_floor(other.wasm);
        return new $outer.BigNum(ret);
      }

      async checkedMul(other: WasmContract.BigNum): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.checked_mul(other.wasm);
        return new $outer.BigNum(ret);
      }

      async checkedAdd(other: WasmContract.BigNum): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.checked_add(other.wasm);
        return new $outer.BigNum(ret);
      }

      async checkedSub(other: WasmContract.BigNum): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.checked_sub(other.wasm);
        return new $outer.BigNum(ret);
      }

      async clampedSub(other: WasmContract.BigNum): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.clamped_sub(other.wasm);
        return new $outer.BigNum(ret);
      }

      async compare(rhsValue: WasmContract.BigNum): Promise<number> {
        const ret = await this.wasm.compare(rhsValue.wasm);
        return ret;
      }

      async lessThan(rhsValue: WasmContract.BigNum): Promise<boolean> {
        const ret = await this.wasm.less_than(rhsValue.wasm);
        return ret;
      }

      static async maxValue(): Promise<WasmContract.BigNum> {
        const ret = await WasmV4.BigNum.max_value();
        return new $outer.BigNum(ret);
      }

      static async max(a: WasmContract.BigNum, b: WasmContract.BigNum): Promise<WasmContract.BigNum> {
        const ret = await WasmV4.BigNum.max(a.wasm, b.wasm);
        return new $outer.BigNum(ret);
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
        return new $outer.Bip32PrivateKey(ret);
      }

      static async from_128Xprv(bytes: Uint8Array): Promise<WasmContract.Bip32PrivateKey> {
        const ret = await WasmV4.Bip32PrivateKey.from_128_xprv(bytes);
        return new $outer.Bip32PrivateKey(ret);
      }

      async to_128Xprv(): Promise<Uint8Array> {
        const ret = await this.wasm.to_128_xprv();
        return ret;
      }

      static async generateEd25519Bip32(): Promise<WasmContract.Bip32PrivateKey> {
        const ret = await WasmV4.Bip32PrivateKey.generate_ed25519_bip32();
        return new $outer.Bip32PrivateKey(ret);
      }

      async toRawKey(): Promise<WasmContract.PrivateKey> {
        const ret = await this.wasm.to_raw_key();
        return new $outer.PrivateKey(ret);
      }

      async toPublic(): Promise<WasmContract.Bip32PublicKey> {
        const ret = await this.wasm.to_public();
        return new $outer.Bip32PublicKey(ret);
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Bip32PrivateKey> {
        const ret = await WasmV4.Bip32PrivateKey.from_bytes(bytes);
        return new $outer.Bip32PrivateKey(ret);
      }

      async asBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.as_bytes();
        return ret;
      }

      static async fromBech32(bech32Str: string): Promise<WasmContract.Bip32PrivateKey> {
        const ret = await WasmV4.Bip32PrivateKey.from_bech32(bech32Str);
        return new $outer.Bip32PrivateKey(ret);
      }

      async toBech32(): Promise<string> {
        const ret = await this.wasm.to_bech32();
        return ret;
      }

      static async fromBip39Entropy(entropy: Uint8Array, password: Uint8Array): Promise<WasmContract.Bip32PrivateKey> {
        const ret = await WasmV4.Bip32PrivateKey.from_bip39_entropy(entropy, password);
        return new $outer.Bip32PrivateKey(ret);
      }

      async chaincode(): Promise<Uint8Array> {
        const ret = await this.wasm.chaincode();
        return ret;
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Bip32PrivateKey> {
        const ret = await WasmV4.Bip32PrivateKey.from_hex(hexStr);
        return new $outer.Bip32PrivateKey(ret);
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
        return new $outer.Bip32PublicKey(ret);
      }

      async toRawKey(): Promise<WasmContract.PublicKey> {
        const ret = await this.wasm.to_raw_key();
        return new $outer.PublicKey(ret);
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Bip32PublicKey> {
        const ret = await WasmV4.Bip32PublicKey.from_bytes(bytes);
        return new $outer.Bip32PublicKey(ret);
      }

      async asBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.as_bytes();
        return ret;
      }

      static async fromBech32(bech32Str: string): Promise<WasmContract.Bip32PublicKey> {
        const ret = await WasmV4.Bip32PublicKey.from_bech32(bech32Str);
        return new $outer.Bip32PublicKey(ret);
      }

      async toBech32(): Promise<string> {
        const ret = await this.wasm.to_bech32();
        return ret;
      }

      async chaincode(): Promise<Uint8Array> {
        const ret = await this.wasm.chaincode();
        return ret;
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Bip32PublicKey> {
        const ret = await WasmV4.Bip32PublicKey.from_hex(hexStr);
        return new $outer.Bip32PublicKey(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Block> {
        const ret = await WasmV4.Block.from_bytes(bytes);
        return new $outer.Block(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Block> {
        const ret = await WasmV4.Block.from_hex(hexStr);
        return new $outer.Block(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.Block> {
        const ret = await WasmV4.Block.from_json(json);
        return new $outer.Block(ret);
      }

      async header(): Promise<WasmContract.Header> {
        const ret = await this.wasm.header();
        return new $outer.Header(ret);
      }

      async transactionBodies(): Promise<WasmContract.TransactionBodies> {
        const ret = await this.wasm.transaction_bodies();
        return new $outer.TransactionBodies(ret);
      }

      async transactionWitnessSets(): Promise<WasmContract.TransactionWitnessSets> {
        const ret = await this.wasm.transaction_witness_sets();
        return new $outer.TransactionWitnessSets(ret);
      }

      async auxiliaryDataSet(): Promise<WasmContract.AuxiliaryDataSet> {
        const ret = await this.wasm.auxiliary_data_set();
        return new $outer.AuxiliaryDataSet(ret);
      }

      async invalidTransactions(): Promise<Uint32Array> {
        const ret = await this.wasm.invalid_transactions();
        return ret;
      }

      static async new(header: WasmContract.Header, transactionBodies: WasmContract.TransactionBodies, transactionWitnessSets: WasmContract.TransactionWitnessSets, auxiliaryDataSet: WasmContract.AuxiliaryDataSet, invalidTransactions: Uint32Array): Promise<WasmContract.Block> {
        const ret = await WasmV4.Block.new(header.wasm, transactionBodies.wasm, transactionWitnessSets.wasm, auxiliaryDataSet.wasm, invalidTransactions);
        return new $outer.Block(ret);
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
        return new $outer.BlockHash(ret);
      }

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      async toBech32(prefix: string): Promise<string> {
        const ret = await this.wasm.to_bech32(prefix);
        return ret;
      }

      static async fromBech32(bechStr: string): Promise<WasmContract.BlockHash> {
        const ret = await WasmV4.BlockHash.from_bech32(bechStr);
        return new $outer.BlockHash(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hex: string): Promise<WasmContract.BlockHash> {
        const ret = await WasmV4.BlockHash.from_hex(hex);
        return new $outer.BlockHash(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.BootstrapWitness> {
        const ret = await WasmV4.BootstrapWitness.from_bytes(bytes);
        return new $outer.BootstrapWitness(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.BootstrapWitness> {
        const ret = await WasmV4.BootstrapWitness.from_hex(hexStr);
        return new $outer.BootstrapWitness(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.BootstrapWitness> {
        const ret = await WasmV4.BootstrapWitness.from_json(json);
        return new $outer.BootstrapWitness(ret);
      }

      async vkey(): Promise<WasmContract.Vkey> {
        const ret = await this.wasm.vkey();
        return new $outer.Vkey(ret);
      }

      async signature(): Promise<WasmContract.Ed25519Signature> {
        const ret = await this.wasm.signature();
        return new $outer.Ed25519Signature(ret);
      }

      async chainCode(): Promise<Uint8Array> {
        const ret = await this.wasm.chain_code();
        return ret;
      }

      async attributes(): Promise<Uint8Array> {
        const ret = await this.wasm.attributes();
        return ret;
      }

      static async new(vkey: WasmContract.Vkey, signature: WasmContract.Ed25519Signature, chainCode: Uint8Array, attributes: Uint8Array): Promise<WasmContract.BootstrapWitness> {
        const ret = await WasmV4.BootstrapWitness.new(vkey.wasm, signature.wasm, chainCode, attributes);
        return new $outer.BootstrapWitness(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.BootstrapWitnesses> {
        const ret = await WasmV4.BootstrapWitnesses.from_bytes(bytes);
        return new $outer.BootstrapWitnesses(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.BootstrapWitnesses> {
        const ret = await WasmV4.BootstrapWitnesses.from_hex(hexStr);
        return new $outer.BootstrapWitnesses(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.BootstrapWitnesses> {
        const ret = await WasmV4.BootstrapWitnesses.from_json(json);
        return new $outer.BootstrapWitnesses(ret);
      }

      static async new(): Promise<WasmContract.BootstrapWitnesses> {
        const ret = await WasmV4.BootstrapWitnesses.new();
        return new $outer.BootstrapWitnesses(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async get(index: number): Promise<WasmContract.BootstrapWitness> {
        const ret = await this.wasm.get(index);
        return new $outer.BootstrapWitness(ret);
      }

      async add(witness: WasmContract.BootstrapWitness): Promise<boolean> {
        const ret = await this.wasm.add(witness.wasm);
        return ret;
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

      async toBase58(): Promise<string> {
        const ret = await this.wasm.to_base58();
        return ret;
      }

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.ByronAddress> {
        const ret = await WasmV4.ByronAddress.from_bytes(bytes);
        return new $outer.ByronAddress(ret);
      }

      async byronProtocolMagic(): Promise<number> {
        const ret = await this.wasm.byron_protocol_magic();
        return ret;
      }

      async byronAddressKind(): Promise<WasmContract.ByronAddressType> {
        const ret = await this.wasm.byron_address_kind();
        return ret;
      }

      async attributes(): Promise<Uint8Array> {
        const ret = await this.wasm.attributes();
        return ret;
      }

      async networkId(): Promise<number> {
        const ret = await this.wasm.network_id();
        return ret;
      }

      static async fromBase58(s: string): Promise<WasmContract.ByronAddress> {
        const ret = await WasmV4.ByronAddress.from_base58(s);
        return new $outer.ByronAddress(ret);
      }

      static async icarusFromKey(key: WasmContract.Bip32PublicKey, protocolMagic: number): Promise<WasmContract.ByronAddress> {
        const ret = await WasmV4.ByronAddress.icarus_from_key(key.wasm, protocolMagic);
        return new $outer.ByronAddress(ret);
      }

      static async isValid(s: string): Promise<boolean> {
        const ret = await WasmV4.ByronAddress.is_valid(s);
        return ret;
      }

      async toAddress(): Promise<WasmContract.Address> {
        const ret = await this.wasm.to_address();
        return new $outer.Address(ret);
      }

      static async fromAddress(addr: WasmContract.Address): Promise<Optional<WasmContract.ByronAddress>> {
        const ret = await WasmV4.ByronAddress.from_address(addr.wasm);
        if (ret == null) return undefined;
        return new $outer.ByronAddress(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.from_bytes(bytes);
        return new $outer.Certificate(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.from_hex(hexStr);
        return new $outer.Certificate(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.from_json(json);
        return new $outer.Certificate(ret);
      }

      static async newStakeRegistration(stakeRegistration: WasmContract.StakeRegistration): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.new_stake_registration(stakeRegistration.wasm);
        return new $outer.Certificate(ret);
      }

      static async newRegCert(stakeRegistration: WasmContract.StakeRegistration): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.new_reg_cert(stakeRegistration.wasm);
        return new $outer.Certificate(ret);
      }

      static async newStakeDeregistration(stakeDeregistration: WasmContract.StakeDeregistration): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.new_stake_deregistration(stakeDeregistration.wasm);
        return new $outer.Certificate(ret);
      }

      static async newUnregCert(stakeDeregistration: WasmContract.StakeDeregistration): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.new_unreg_cert(stakeDeregistration.wasm);
        return new $outer.Certificate(ret);
      }

      static async newStakeDelegation(stakeDelegation: WasmContract.StakeDelegation): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.new_stake_delegation(stakeDelegation.wasm);
        return new $outer.Certificate(ret);
      }

      static async newPoolRegistration(poolRegistration: WasmContract.PoolRegistration): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.new_pool_registration(poolRegistration.wasm);
        return new $outer.Certificate(ret);
      }

      static async newPoolRetirement(poolRetirement: WasmContract.PoolRetirement): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.new_pool_retirement(poolRetirement.wasm);
        return new $outer.Certificate(ret);
      }

      static async newGenesisKeyDelegation(genesisKeyDelegation: WasmContract.GenesisKeyDelegation): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.new_genesis_key_delegation(genesisKeyDelegation.wasm);
        return new $outer.Certificate(ret);
      }

      static async newMoveInstantaneousRewardsCert(moveInstantaneousRewardsCert: WasmContract.MoveInstantaneousRewardsCert): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.new_move_instantaneous_rewards_cert(moveInstantaneousRewardsCert.wasm);
        return new $outer.Certificate(ret);
      }

      static async newCommitteeHotAuth(committeeHotAuth: WasmContract.CommitteeHotAuth): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.new_committee_hot_auth(committeeHotAuth.wasm);
        return new $outer.Certificate(ret);
      }

      static async newCommitteeColdResign(committeeColdResign: WasmContract.CommitteeColdResign): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.new_committee_cold_resign(committeeColdResign.wasm);
        return new $outer.Certificate(ret);
      }

      static async newDrepDeregistration(drepDeregistration: WasmContract.DRepDeregistration): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.new_drep_deregistration(drepDeregistration.wasm);
        return new $outer.Certificate(ret);
      }

      static async newDrepRegistration(drepRegistration: WasmContract.DRepRegistration): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.new_drep_registration(drepRegistration.wasm);
        return new $outer.Certificate(ret);
      }

      static async newDrepUpdate(drepUpdate: WasmContract.DRepUpdate): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.new_drep_update(drepUpdate.wasm);
        return new $outer.Certificate(ret);
      }

      static async newStakeAndVoteDelegation(stakeAndVoteDelegation: WasmContract.StakeAndVoteDelegation): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.new_stake_and_vote_delegation(stakeAndVoteDelegation.wasm);
        return new $outer.Certificate(ret);
      }

      static async newStakeRegistrationAndDelegation(stakeRegistrationAndDelegation: WasmContract.StakeRegistrationAndDelegation): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.new_stake_registration_and_delegation(stakeRegistrationAndDelegation.wasm);
        return new $outer.Certificate(ret);
      }

      static async newStakeVoteRegistrationAndDelegation(stakeVoteRegistrationAndDelegation: WasmContract.StakeVoteRegistrationAndDelegation): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.new_stake_vote_registration_and_delegation(stakeVoteRegistrationAndDelegation.wasm);
        return new $outer.Certificate(ret);
      }

      static async newVoteDelegation(voteDelegation: WasmContract.VoteDelegation): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.new_vote_delegation(voteDelegation.wasm);
        return new $outer.Certificate(ret);
      }

      static async newVoteRegistrationAndDelegation(voteRegistrationAndDelegation: WasmContract.VoteRegistrationAndDelegation): Promise<WasmContract.Certificate> {
        const ret = await WasmV4.Certificate.new_vote_registration_and_delegation(voteRegistrationAndDelegation.wasm);
        return new $outer.Certificate(ret);
      }

      async kind(): Promise<WasmContract.CertificateKind> {
        const ret = await this.wasm.kind();
        return ret;
      }

      async asStakeRegistration(): Promise<Optional<WasmContract.StakeRegistration>> {
        const ret = await this.wasm.as_stake_registration();
        if (ret == null) return undefined;
        return new $outer.StakeRegistration(ret);
      }

      async asRegCert(): Promise<Optional<WasmContract.StakeRegistration>> {
        const ret = await this.wasm.as_reg_cert();
        if (ret == null) return undefined;
        return new $outer.StakeRegistration(ret);
      }

      async asStakeDeregistration(): Promise<Optional<WasmContract.StakeDeregistration>> {
        const ret = await this.wasm.as_stake_deregistration();
        if (ret == null) return undefined;
        return new $outer.StakeDeregistration(ret);
      }

      async asUnregCert(): Promise<Optional<WasmContract.StakeDeregistration>> {
        const ret = await this.wasm.as_unreg_cert();
        if (ret == null) return undefined;
        return new $outer.StakeDeregistration(ret);
      }

      async asStakeDelegation(): Promise<Optional<WasmContract.StakeDelegation>> {
        const ret = await this.wasm.as_stake_delegation();
        if (ret == null) return undefined;
        return new $outer.StakeDelegation(ret);
      }

      async asPoolRegistration(): Promise<Optional<WasmContract.PoolRegistration>> {
        const ret = await this.wasm.as_pool_registration();
        if (ret == null) return undefined;
        return new $outer.PoolRegistration(ret);
      }

      async asPoolRetirement(): Promise<Optional<WasmContract.PoolRetirement>> {
        const ret = await this.wasm.as_pool_retirement();
        if (ret == null) return undefined;
        return new $outer.PoolRetirement(ret);
      }

      async asGenesisKeyDelegation(): Promise<Optional<WasmContract.GenesisKeyDelegation>> {
        const ret = await this.wasm.as_genesis_key_delegation();
        if (ret == null) return undefined;
        return new $outer.GenesisKeyDelegation(ret);
      }

      async asMoveInstantaneousRewardsCert(): Promise<Optional<WasmContract.MoveInstantaneousRewardsCert>> {
        const ret = await this.wasm.as_move_instantaneous_rewards_cert();
        if (ret == null) return undefined;
        return new $outer.MoveInstantaneousRewardsCert(ret);
      }

      async asCommitteeHotAuth(): Promise<Optional<WasmContract.CommitteeHotAuth>> {
        const ret = await this.wasm.as_committee_hot_auth();
        if (ret == null) return undefined;
        return new $outer.CommitteeHotAuth(ret);
      }

      async asCommitteeColdResign(): Promise<Optional<WasmContract.CommitteeColdResign>> {
        const ret = await this.wasm.as_committee_cold_resign();
        if (ret == null) return undefined;
        return new $outer.CommitteeColdResign(ret);
      }

      async asDrepDeregistration(): Promise<Optional<WasmContract.DRepDeregistration>> {
        const ret = await this.wasm.as_drep_deregistration();
        if (ret == null) return undefined;
        return new $outer.DRepDeregistration(ret);
      }

      async asDrepRegistration(): Promise<Optional<WasmContract.DRepRegistration>> {
        const ret = await this.wasm.as_drep_registration();
        if (ret == null) return undefined;
        return new $outer.DRepRegistration(ret);
      }

      async asDrepUpdate(): Promise<Optional<WasmContract.DRepUpdate>> {
        const ret = await this.wasm.as_drep_update();
        if (ret == null) return undefined;
        return new $outer.DRepUpdate(ret);
      }

      async asStakeAndVoteDelegation(): Promise<Optional<WasmContract.StakeAndVoteDelegation>> {
        const ret = await this.wasm.as_stake_and_vote_delegation();
        if (ret == null) return undefined;
        return new $outer.StakeAndVoteDelegation(ret);
      }

      async asStakeRegistrationAndDelegation(): Promise<Optional<WasmContract.StakeRegistrationAndDelegation>> {
        const ret = await this.wasm.as_stake_registration_and_delegation();
        if (ret == null) return undefined;
        return new $outer.StakeRegistrationAndDelegation(ret);
      }

      async asStakeVoteRegistrationAndDelegation(): Promise<Optional<WasmContract.StakeVoteRegistrationAndDelegation>> {
        const ret = await this.wasm.as_stake_vote_registration_and_delegation();
        if (ret == null) return undefined;
        return new $outer.StakeVoteRegistrationAndDelegation(ret);
      }

      async asVoteDelegation(): Promise<Optional<WasmContract.VoteDelegation>> {
        const ret = await this.wasm.as_vote_delegation();
        if (ret == null) return undefined;
        return new $outer.VoteDelegation(ret);
      }

      async asVoteRegistrationAndDelegation(): Promise<Optional<WasmContract.VoteRegistrationAndDelegation>> {
        const ret = await this.wasm.as_vote_registration_and_delegation();
        if (ret == null) return undefined;
        return new $outer.VoteRegistrationAndDelegation(ret);
      }

      async hasRequiredScriptWitness(): Promise<boolean> {
        const ret = await this.wasm.has_required_script_witness();
        return ret;
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Certificates> {
        const ret = await WasmV4.Certificates.from_bytes(bytes);
        return new $outer.Certificates(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Certificates> {
        const ret = await WasmV4.Certificates.from_hex(hexStr);
        return new $outer.Certificates(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.Certificates> {
        const ret = await WasmV4.Certificates.from_json(json);
        return new $outer.Certificates(ret);
      }

      static async new(): Promise<WasmContract.Certificates> {
        const ret = await WasmV4.Certificates.new();
        return new $outer.Certificates(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async get(index: number): Promise<WasmContract.Certificate> {
        const ret = await this.wasm.get(index);
        return new $outer.Certificate(ret);
      }

      async add(elem: WasmContract.Certificate): Promise<boolean> {
        const ret = await this.wasm.add(elem.wasm);
        return ret;
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
        return new $outer.CertificatesBuilder(ret);
      }

      async add(cert: WasmContract.Certificate): Promise<void> {
        const ret = await this.wasm.add(cert.wasm);
      }

      async addWithPlutusWitness(cert: WasmContract.Certificate, witness: WasmContract.PlutusWitness): Promise<void> {
        const ret = await this.wasm.add_with_plutus_witness(cert.wasm, witness.wasm);
      }

      async addWithNativeScript(cert: WasmContract.Certificate, nativeScriptSource: WasmContract.NativeScriptSource): Promise<void> {
        const ret = await this.wasm.add_with_native_script(cert.wasm, nativeScriptSource.wasm);
      }

      async getPlutusWitnesses(): Promise<WasmContract.PlutusWitnesses> {
        const ret = await this.wasm.get_plutus_witnesses();
        return new $outer.PlutusWitnesses(ret);
      }

      async getRefInputs(): Promise<WasmContract.TransactionInputs> {
        const ret = await this.wasm.get_ref_inputs();
        return new $outer.TransactionInputs(ret);
      }

      async getNativeScripts(): Promise<WasmContract.NativeScripts> {
        const ret = await this.wasm.get_native_scripts();
        return new $outer.NativeScripts(ret);
      }

      async getCertificatesRefund(poolDeposit: WasmContract.BigNum, keyDeposit: WasmContract.BigNum): Promise<WasmContract.Value> {
        const ret = await this.wasm.get_certificates_refund(poolDeposit.wasm, keyDeposit.wasm);
        return new $outer.Value(ret);
      }

      async getCertificatesDeposit(poolDeposit: WasmContract.BigNum, keyDeposit: WasmContract.BigNum): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.get_certificates_deposit(poolDeposit.wasm, keyDeposit.wasm);
        return new $outer.BigNum(ret);
      }

      async hasPlutusScripts(): Promise<boolean> {
        const ret = await this.wasm.has_plutus_scripts();
        return ret;
      }

      async build(): Promise<WasmContract.Certificates> {
        const ret = await this.wasm.build();
        return new $outer.Certificates(ret);
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
        return new $outer.ChangeConfig(ret);
      }

      async changeAddress(address: WasmContract.Address): Promise<WasmContract.ChangeConfig> {
        const ret = await this.wasm.change_address(address.wasm);
        return new $outer.ChangeConfig(ret);
      }

      async changePlutusData(plutusData: WasmContract.OutputDatum): Promise<WasmContract.ChangeConfig> {
        const ret = await this.wasm.change_plutus_data(plutusData.wasm);
        return new $outer.ChangeConfig(ret);
      }

      async changeScriptRef(scriptRef: WasmContract.ScriptRef): Promise<WasmContract.ChangeConfig> {
        const ret = await this.wasm.change_script_ref(scriptRef.wasm);
        return new $outer.ChangeConfig(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Committee> {
        const ret = await WasmV4.Committee.from_bytes(bytes);
        return new $outer.Committee(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Committee> {
        const ret = await WasmV4.Committee.from_hex(hexStr);
        return new $outer.Committee(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.Committee> {
        const ret = await WasmV4.Committee.from_json(json);
        return new $outer.Committee(ret);
      }

      static async new(quorumThreshold: WasmContract.UnitInterval): Promise<WasmContract.Committee> {
        const ret = await WasmV4.Committee.new(quorumThreshold.wasm);
        return new $outer.Committee(ret);
      }

      async membersKeys(): Promise<WasmContract.Credentials> {
        const ret = await this.wasm.members_keys();
        return new $outer.Credentials(ret);
      }

      async quorumThreshold(): Promise<WasmContract.UnitInterval> {
        const ret = await this.wasm.quorum_threshold();
        return new $outer.UnitInterval(ret);
      }

      async addMember(committeeColdCredential: WasmContract.Credential, epoch: number): Promise<void> {
        const ret = await this.wasm.add_member(committeeColdCredential.wasm, epoch);
      }

      async getMemberEpoch(committeeColdCredential: WasmContract.Credential): Promise<Optional<number>> {
        const ret = await this.wasm.get_member_epoch(committeeColdCredential.wasm);
        if (ret == null) return undefined;
        return ret;
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.CommitteeColdResign> {
        const ret = await WasmV4.CommitteeColdResign.from_bytes(bytes);
        return new $outer.CommitteeColdResign(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.CommitteeColdResign> {
        const ret = await WasmV4.CommitteeColdResign.from_hex(hexStr);
        return new $outer.CommitteeColdResign(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.CommitteeColdResign> {
        const ret = await WasmV4.CommitteeColdResign.from_json(json);
        return new $outer.CommitteeColdResign(ret);
      }

      async committeeColdCredential(): Promise<WasmContract.Credential> {
        const ret = await this.wasm.committee_cold_credential();
        return new $outer.Credential(ret);
      }

      async anchor(): Promise<Optional<WasmContract.Anchor>> {
        const ret = await this.wasm.anchor();
        if (ret == null) return undefined;
        return new $outer.Anchor(ret);
      }

      static async new(committeeColdCredential: WasmContract.Credential): Promise<WasmContract.CommitteeColdResign> {
        const ret = await WasmV4.CommitteeColdResign.new(committeeColdCredential.wasm);
        return new $outer.CommitteeColdResign(ret);
      }

      static async newWithAnchor(committeeColdCredential: WasmContract.Credential, anchor: WasmContract.Anchor): Promise<WasmContract.CommitteeColdResign> {
        const ret = await WasmV4.CommitteeColdResign.new_with_anchor(committeeColdCredential.wasm, anchor.wasm);
        return new $outer.CommitteeColdResign(ret);
      }

      async hasScriptCredentials(): Promise<boolean> {
        const ret = await this.wasm.has_script_credentials();
        return ret;
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.CommitteeHotAuth> {
        const ret = await WasmV4.CommitteeHotAuth.from_bytes(bytes);
        return new $outer.CommitteeHotAuth(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.CommitteeHotAuth> {
        const ret = await WasmV4.CommitteeHotAuth.from_hex(hexStr);
        return new $outer.CommitteeHotAuth(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.CommitteeHotAuth> {
        const ret = await WasmV4.CommitteeHotAuth.from_json(json);
        return new $outer.CommitteeHotAuth(ret);
      }

      async committeeColdCredential(): Promise<WasmContract.Credential> {
        const ret = await this.wasm.committee_cold_credential();
        return new $outer.Credential(ret);
      }

      async committeeHotCredential(): Promise<WasmContract.Credential> {
        const ret = await this.wasm.committee_hot_credential();
        return new $outer.Credential(ret);
      }

      static async new(committeeColdCredential: WasmContract.Credential, committeeHotCredential: WasmContract.Credential): Promise<WasmContract.CommitteeHotAuth> {
        const ret = await WasmV4.CommitteeHotAuth.new(committeeColdCredential.wasm, committeeHotCredential.wasm);
        return new $outer.CommitteeHotAuth(ret);
      }

      async hasScriptCredentials(): Promise<boolean> {
        const ret = await this.wasm.has_script_credentials();
        return ret;
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Constitution> {
        const ret = await WasmV4.Constitution.from_bytes(bytes);
        return new $outer.Constitution(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Constitution> {
        const ret = await WasmV4.Constitution.from_hex(hexStr);
        return new $outer.Constitution(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.Constitution> {
        const ret = await WasmV4.Constitution.from_json(json);
        return new $outer.Constitution(ret);
      }

      async anchor(): Promise<WasmContract.Anchor> {
        const ret = await this.wasm.anchor();
        return new $outer.Anchor(ret);
      }

      async scriptHash(): Promise<Optional<WasmContract.ScriptHash>> {
        const ret = await this.wasm.script_hash();
        if (ret == null) return undefined;
        return new $outer.ScriptHash(ret);
      }

      static async new(anchor: WasmContract.Anchor): Promise<WasmContract.Constitution> {
        const ret = await WasmV4.Constitution.new(anchor.wasm);
        return new $outer.Constitution(ret);
      }

      static async newWithScriptHash(anchor: WasmContract.Anchor, scriptHash: WasmContract.ScriptHash): Promise<WasmContract.Constitution> {
        const ret = await WasmV4.Constitution.new_with_script_hash(anchor.wasm, scriptHash.wasm);
        return new $outer.Constitution(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.ConstrPlutusData> {
        const ret = await WasmV4.ConstrPlutusData.from_bytes(bytes);
        return new $outer.ConstrPlutusData(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.ConstrPlutusData> {
        const ret = await WasmV4.ConstrPlutusData.from_hex(hexStr);
        return new $outer.ConstrPlutusData(ret);
      }

      async alternative(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.alternative();
        return new $outer.BigNum(ret);
      }

      async data(): Promise<WasmContract.PlutusList> {
        const ret = await this.wasm.data();
        return new $outer.PlutusList(ret);
      }

      static async new(alternative: WasmContract.BigNum, data: WasmContract.PlutusList): Promise<WasmContract.ConstrPlutusData> {
        const ret = await WasmV4.ConstrPlutusData.new(alternative.wasm, data.wasm);
        return new $outer.ConstrPlutusData(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.CostModel> {
        const ret = await WasmV4.CostModel.from_bytes(bytes);
        return new $outer.CostModel(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.CostModel> {
        const ret = await WasmV4.CostModel.from_hex(hexStr);
        return new $outer.CostModel(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.CostModel> {
        const ret = await WasmV4.CostModel.from_json(json);
        return new $outer.CostModel(ret);
      }

      static async new(): Promise<WasmContract.CostModel> {
        const ret = await WasmV4.CostModel.new();
        return new $outer.CostModel(ret);
      }

      async set(operation: number, cost: WasmContract.Int): Promise<WasmContract.Int> {
        const ret = await this.wasm.set(operation, cost.wasm);
        return new $outer.Int(ret);
      }

      async get(operation: number): Promise<WasmContract.Int> {
        const ret = await this.wasm.get(operation);
        return new $outer.Int(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Costmdls> {
        const ret = await WasmV4.Costmdls.from_bytes(bytes);
        return new $outer.Costmdls(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Costmdls> {
        const ret = await WasmV4.Costmdls.from_hex(hexStr);
        return new $outer.Costmdls(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.Costmdls> {
        const ret = await WasmV4.Costmdls.from_json(json);
        return new $outer.Costmdls(ret);
      }

      static async new(): Promise<WasmContract.Costmdls> {
        const ret = await WasmV4.Costmdls.new();
        return new $outer.Costmdls(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async insert(key: WasmContract.Language, value: WasmContract.CostModel): Promise<Optional<WasmContract.CostModel>> {
        const ret = await this.wasm.insert(key.wasm, value.wasm);
        if (ret == null) return undefined;
        return new $outer.CostModel(ret);
      }

      async get(key: WasmContract.Language): Promise<Optional<WasmContract.CostModel>> {
        const ret = await this.wasm.get(key.wasm);
        if (ret == null) return undefined;
        return new $outer.CostModel(ret);
      }

      async keys(): Promise<WasmContract.Languages> {
        const ret = await this.wasm.keys();
        return new $outer.Languages(ret);
      }

      async retainLanguageVersions(languages: WasmContract.Languages): Promise<WasmContract.Costmdls> {
        const ret = await this.wasm.retain_language_versions(languages.wasm);
        return new $outer.Costmdls(ret);
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
        return new $outer.Credential(ret);
      }

      static async fromScripthash(hash: WasmContract.ScriptHash): Promise<WasmContract.Credential> {
        const ret = await WasmV4.Credential.from_scripthash(hash.wasm);
        return new $outer.Credential(ret);
      }

      async toKeyhash(): Promise<Optional<WasmContract.Ed25519KeyHash>> {
        const ret = await this.wasm.to_keyhash();
        if (ret == null) return undefined;
        return new $outer.Ed25519KeyHash(ret);
      }

      async toScripthash(): Promise<Optional<WasmContract.ScriptHash>> {
        const ret = await this.wasm.to_scripthash();
        if (ret == null) return undefined;
        return new $outer.ScriptHash(ret);
      }

      async kind(): Promise<WasmContract.CredKind> {
        const ret = await this.wasm.kind();
        return ret;
      }

      async hasScriptHash(): Promise<boolean> {
        const ret = await this.wasm.has_script_hash();
        return ret;
      }

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Credential> {
        const ret = await WasmV4.Credential.from_bytes(bytes);
        return new $outer.Credential(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Credential> {
        const ret = await WasmV4.Credential.from_hex(hexStr);
        return new $outer.Credential(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.Credential> {
        const ret = await WasmV4.Credential.from_json(json);
        return new $outer.Credential(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Credentials> {
        const ret = await WasmV4.Credentials.from_bytes(bytes);
        return new $outer.Credentials(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Credentials> {
        const ret = await WasmV4.Credentials.from_hex(hexStr);
        return new $outer.Credentials(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.Credentials> {
        const ret = await WasmV4.Credentials.from_json(json);
        return new $outer.Credentials(ret);
      }

      static async new(): Promise<WasmContract.Credentials> {
        const ret = await WasmV4.Credentials.new();
        return new $outer.Credentials(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async get(index: number): Promise<WasmContract.Credential> {
        const ret = await this.wasm.get(index);
        return new $outer.Credential(ret);
      }

      async add(credential: WasmContract.Credential): Promise<boolean> {
        const ret = await this.wasm.add(credential.wasm);
        return ret;
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.DNSRecordAorAAAA> {
        const ret = await WasmV4.DNSRecordAorAAAA.from_bytes(bytes);
        return new $outer.DNSRecordAorAAAA(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.DNSRecordAorAAAA> {
        const ret = await WasmV4.DNSRecordAorAAAA.from_hex(hexStr);
        return new $outer.DNSRecordAorAAAA(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.DNSRecordAorAAAA> {
        const ret = await WasmV4.DNSRecordAorAAAA.from_json(json);
        return new $outer.DNSRecordAorAAAA(ret);
      }

      static async new(dnsName: string): Promise<WasmContract.DNSRecordAorAAAA> {
        const ret = await WasmV4.DNSRecordAorAAAA.new(dnsName);
        return new $outer.DNSRecordAorAAAA(ret);
      }

      async record(): Promise<string> {
        const ret = await this.wasm.record();
        return ret;
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.DNSRecordSRV> {
        const ret = await WasmV4.DNSRecordSRV.from_bytes(bytes);
        return new $outer.DNSRecordSRV(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.DNSRecordSRV> {
        const ret = await WasmV4.DNSRecordSRV.from_hex(hexStr);
        return new $outer.DNSRecordSRV(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.DNSRecordSRV> {
        const ret = await WasmV4.DNSRecordSRV.from_json(json);
        return new $outer.DNSRecordSRV(ret);
      }

      static async new(dnsName: string): Promise<WasmContract.DNSRecordSRV> {
        const ret = await WasmV4.DNSRecordSRV.new(dnsName);
        return new $outer.DNSRecordSRV(ret);
      }

      async record(): Promise<string> {
        const ret = await this.wasm.record();
        return ret;
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.DRep> {
        const ret = await WasmV4.DRep.from_bytes(bytes);
        return new $outer.DRep(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.DRep> {
        const ret = await WasmV4.DRep.from_hex(hexStr);
        return new $outer.DRep(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.DRep> {
        const ret = await WasmV4.DRep.from_json(json);
        return new $outer.DRep(ret);
      }

      static async newKeyHash(keyHash: WasmContract.Ed25519KeyHash): Promise<WasmContract.DRep> {
        const ret = await WasmV4.DRep.new_key_hash(keyHash.wasm);
        return new $outer.DRep(ret);
      }

      static async newScriptHash(scriptHash: WasmContract.ScriptHash): Promise<WasmContract.DRep> {
        const ret = await WasmV4.DRep.new_script_hash(scriptHash.wasm);
        return new $outer.DRep(ret);
      }

      static async newAlwaysAbstain(): Promise<WasmContract.DRep> {
        const ret = await WasmV4.DRep.new_always_abstain();
        return new $outer.DRep(ret);
      }

      static async newAlwaysNoConfidence(): Promise<WasmContract.DRep> {
        const ret = await WasmV4.DRep.new_always_no_confidence();
        return new $outer.DRep(ret);
      }

      static async newFromCredential(cred: WasmContract.Credential): Promise<WasmContract.DRep> {
        const ret = await WasmV4.DRep.new_from_credential(cred.wasm);
        return new $outer.DRep(ret);
      }

      async kind(): Promise<WasmContract.DRepKind> {
        const ret = await this.wasm.kind();
        return ret;
      }

      async toKeyHash(): Promise<Optional<WasmContract.Ed25519KeyHash>> {
        const ret = await this.wasm.to_key_hash();
        if (ret == null) return undefined;
        return new $outer.Ed25519KeyHash(ret);
      }

      async toScriptHash(): Promise<Optional<WasmContract.ScriptHash>> {
        const ret = await this.wasm.to_script_hash();
        if (ret == null) return undefined;
        return new $outer.ScriptHash(ret);
      }

      async toBech32(cip_129Format: boolean): Promise<string> {
        const ret = await this.wasm.to_bech32(cip_129Format);
        return ret;
      }

      static async fromBech32(bech32Str: string): Promise<WasmContract.DRep> {
        const ret = await WasmV4.DRep.from_bech32(bech32Str);
        return new $outer.DRep(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.DRepDeregistration> {
        const ret = await WasmV4.DRepDeregistration.from_bytes(bytes);
        return new $outer.DRepDeregistration(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.DRepDeregistration> {
        const ret = await WasmV4.DRepDeregistration.from_hex(hexStr);
        return new $outer.DRepDeregistration(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.DRepDeregistration> {
        const ret = await WasmV4.DRepDeregistration.from_json(json);
        return new $outer.DRepDeregistration(ret);
      }

      async votingCredential(): Promise<WasmContract.Credential> {
        const ret = await this.wasm.voting_credential();
        return new $outer.Credential(ret);
      }

      async coin(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.coin();
        return new $outer.BigNum(ret);
      }

      static async new(votingCredential: WasmContract.Credential, coin: WasmContract.BigNum): Promise<WasmContract.DRepDeregistration> {
        const ret = await WasmV4.DRepDeregistration.new(votingCredential.wasm, coin.wasm);
        return new $outer.DRepDeregistration(ret);
      }

      async hasScriptCredentials(): Promise<boolean> {
        const ret = await this.wasm.has_script_credentials();
        return ret;
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.DRepRegistration> {
        const ret = await WasmV4.DRepRegistration.from_bytes(bytes);
        return new $outer.DRepRegistration(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.DRepRegistration> {
        const ret = await WasmV4.DRepRegistration.from_hex(hexStr);
        return new $outer.DRepRegistration(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.DRepRegistration> {
        const ret = await WasmV4.DRepRegistration.from_json(json);
        return new $outer.DRepRegistration(ret);
      }

      async votingCredential(): Promise<WasmContract.Credential> {
        const ret = await this.wasm.voting_credential();
        return new $outer.Credential(ret);
      }

      async coin(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.coin();
        return new $outer.BigNum(ret);
      }

      async anchor(): Promise<Optional<WasmContract.Anchor>> {
        const ret = await this.wasm.anchor();
        if (ret == null) return undefined;
        return new $outer.Anchor(ret);
      }

      static async new(votingCredential: WasmContract.Credential, coin: WasmContract.BigNum): Promise<WasmContract.DRepRegistration> {
        const ret = await WasmV4.DRepRegistration.new(votingCredential.wasm, coin.wasm);
        return new $outer.DRepRegistration(ret);
      }

      static async newWithAnchor(votingCredential: WasmContract.Credential, coin: WasmContract.BigNum, anchor: WasmContract.Anchor): Promise<WasmContract.DRepRegistration> {
        const ret = await WasmV4.DRepRegistration.new_with_anchor(votingCredential.wasm, coin.wasm, anchor.wasm);
        return new $outer.DRepRegistration(ret);
      }

      async hasScriptCredentials(): Promise<boolean> {
        const ret = await this.wasm.has_script_credentials();
        return ret;
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.DRepUpdate> {
        const ret = await WasmV4.DRepUpdate.from_bytes(bytes);
        return new $outer.DRepUpdate(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.DRepUpdate> {
        const ret = await WasmV4.DRepUpdate.from_hex(hexStr);
        return new $outer.DRepUpdate(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.DRepUpdate> {
        const ret = await WasmV4.DRepUpdate.from_json(json);
        return new $outer.DRepUpdate(ret);
      }

      async votingCredential(): Promise<WasmContract.Credential> {
        const ret = await this.wasm.voting_credential();
        return new $outer.Credential(ret);
      }

      async anchor(): Promise<Optional<WasmContract.Anchor>> {
        const ret = await this.wasm.anchor();
        if (ret == null) return undefined;
        return new $outer.Anchor(ret);
      }

      static async new(votingCredential: WasmContract.Credential): Promise<WasmContract.DRepUpdate> {
        const ret = await WasmV4.DRepUpdate.new(votingCredential.wasm);
        return new $outer.DRepUpdate(ret);
      }

      static async newWithAnchor(votingCredential: WasmContract.Credential, anchor: WasmContract.Anchor): Promise<WasmContract.DRepUpdate> {
        const ret = await WasmV4.DRepUpdate.new_with_anchor(votingCredential.wasm, anchor.wasm);
        return new $outer.DRepUpdate(ret);
      }

      async hasScriptCredentials(): Promise<boolean> {
        const ret = await this.wasm.has_script_credentials();
        return ret;
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.DRepVotingThresholds> {
        const ret = await WasmV4.DRepVotingThresholds.from_bytes(bytes);
        return new $outer.DRepVotingThresholds(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.DRepVotingThresholds> {
        const ret = await WasmV4.DRepVotingThresholds.from_hex(hexStr);
        return new $outer.DRepVotingThresholds(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.DRepVotingThresholds> {
        const ret = await WasmV4.DRepVotingThresholds.from_json(json);
        return new $outer.DRepVotingThresholds(ret);
      }

      static async new(motionNoConfidence: WasmContract.UnitInterval, committeeNormal: WasmContract.UnitInterval, committeeNoConfidence: WasmContract.UnitInterval, updateConstitution: WasmContract.UnitInterval, hardForkInitiation: WasmContract.UnitInterval, ppNetworkGroup: WasmContract.UnitInterval, ppEconomicGroup: WasmContract.UnitInterval, ppTechnicalGroup: WasmContract.UnitInterval, ppGovernanceGroup: WasmContract.UnitInterval, treasuryWithdrawal: WasmContract.UnitInterval): Promise<WasmContract.DRepVotingThresholds> {
        const ret = await WasmV4.DRepVotingThresholds.new(motionNoConfidence.wasm, committeeNormal.wasm, committeeNoConfidence.wasm, updateConstitution.wasm, hardForkInitiation.wasm, ppNetworkGroup.wasm, ppEconomicGroup.wasm, ppTechnicalGroup.wasm, ppGovernanceGroup.wasm, treasuryWithdrawal.wasm);
        return new $outer.DRepVotingThresholds(ret);
      }

      async setMotionNoConfidence(motionNoConfidence: WasmContract.UnitInterval): Promise<void> {
        const ret = await this.wasm.set_motion_no_confidence(motionNoConfidence.wasm);
      }

      async setCommitteeNormal(committeeNormal: WasmContract.UnitInterval): Promise<void> {
        const ret = await this.wasm.set_committee_normal(committeeNormal.wasm);
      }

      async setCommitteeNoConfidence(committeeNoConfidence: WasmContract.UnitInterval): Promise<void> {
        const ret = await this.wasm.set_committee_no_confidence(committeeNoConfidence.wasm);
      }

      async setUpdateConstitution(updateConstitution: WasmContract.UnitInterval): Promise<void> {
        const ret = await this.wasm.set_update_constitution(updateConstitution.wasm);
      }

      async setHardForkInitiation(hardForkInitiation: WasmContract.UnitInterval): Promise<void> {
        const ret = await this.wasm.set_hard_fork_initiation(hardForkInitiation.wasm);
      }

      async setPpNetworkGroup(ppNetworkGroup: WasmContract.UnitInterval): Promise<void> {
        const ret = await this.wasm.set_pp_network_group(ppNetworkGroup.wasm);
      }

      async setPpEconomicGroup(ppEconomicGroup: WasmContract.UnitInterval): Promise<void> {
        const ret = await this.wasm.set_pp_economic_group(ppEconomicGroup.wasm);
      }

      async setPpTechnicalGroup(ppTechnicalGroup: WasmContract.UnitInterval): Promise<void> {
        const ret = await this.wasm.set_pp_technical_group(ppTechnicalGroup.wasm);
      }

      async setPpGovernanceGroup(ppGovernanceGroup: WasmContract.UnitInterval): Promise<void> {
        const ret = await this.wasm.set_pp_governance_group(ppGovernanceGroup.wasm);
      }

      async setTreasuryWithdrawal(treasuryWithdrawal: WasmContract.UnitInterval): Promise<void> {
        const ret = await this.wasm.set_treasury_withdrawal(treasuryWithdrawal.wasm);
      }

      async motionNoConfidence(): Promise<WasmContract.UnitInterval> {
        const ret = await this.wasm.motion_no_confidence();
        return new $outer.UnitInterval(ret);
      }

      async committeeNormal(): Promise<WasmContract.UnitInterval> {
        const ret = await this.wasm.committee_normal();
        return new $outer.UnitInterval(ret);
      }

      async committeeNoConfidence(): Promise<WasmContract.UnitInterval> {
        const ret = await this.wasm.committee_no_confidence();
        return new $outer.UnitInterval(ret);
      }

      async updateConstitution(): Promise<WasmContract.UnitInterval> {
        const ret = await this.wasm.update_constitution();
        return new $outer.UnitInterval(ret);
      }

      async hardForkInitiation(): Promise<WasmContract.UnitInterval> {
        const ret = await this.wasm.hard_fork_initiation();
        return new $outer.UnitInterval(ret);
      }

      async ppNetworkGroup(): Promise<WasmContract.UnitInterval> {
        const ret = await this.wasm.pp_network_group();
        return new $outer.UnitInterval(ret);
      }

      async ppEconomicGroup(): Promise<WasmContract.UnitInterval> {
        const ret = await this.wasm.pp_economic_group();
        return new $outer.UnitInterval(ret);
      }

      async ppTechnicalGroup(): Promise<WasmContract.UnitInterval> {
        const ret = await this.wasm.pp_technical_group();
        return new $outer.UnitInterval(ret);
      }

      async ppGovernanceGroup(): Promise<WasmContract.UnitInterval> {
        const ret = await this.wasm.pp_governance_group();
        return new $outer.UnitInterval(ret);
      }

      async treasuryWithdrawal(): Promise<WasmContract.UnitInterval> {
        const ret = await this.wasm.treasury_withdrawal();
        return new $outer.UnitInterval(ret);
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

      static async newCoinsPerByte(coinsPerByte: WasmContract.BigNum): Promise<WasmContract.DataCost> {
        const ret = await WasmV4.DataCost.new_coins_per_byte(coinsPerByte.wasm);
        return new $outer.DataCost(ret);
      }

      async coinsPerByte(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.coins_per_byte();
        return new $outer.BigNum(ret);
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
        return new $outer.DataHash(ret);
      }

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      async toBech32(prefix: string): Promise<string> {
        const ret = await this.wasm.to_bech32(prefix);
        return ret;
      }

      static async fromBech32(bechStr: string): Promise<WasmContract.DataHash> {
        const ret = await WasmV4.DataHash.from_bech32(bechStr);
        return new $outer.DataHash(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hex: string): Promise<WasmContract.DataHash> {
        const ret = await WasmV4.DataHash.from_hex(hex);
        return new $outer.DataHash(ret);
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
        return new $outer.DatumSource(ret);
      }

      static async newRefInput(input: WasmContract.TransactionInput): Promise<WasmContract.DatumSource> {
        const ret = await WasmV4.DatumSource.new_ref_input(input.wasm);
        return new $outer.DatumSource(ret);
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

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Ed25519KeyHash> {
        const ret = await WasmV4.Ed25519KeyHash.from_bytes(bytes);
        return new $outer.Ed25519KeyHash(ret);
      }

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      async toBech32(prefix: string): Promise<string> {
        const ret = await this.wasm.to_bech32(prefix);
        return ret;
      }

      static async fromBech32(bechStr: string): Promise<WasmContract.Ed25519KeyHash> {
        const ret = await WasmV4.Ed25519KeyHash.from_bech32(bechStr);
        return new $outer.Ed25519KeyHash(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hex: string): Promise<WasmContract.Ed25519KeyHash> {
        const ret = await WasmV4.Ed25519KeyHash.from_hex(hex);
        return new $outer.Ed25519KeyHash(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Ed25519KeyHashes> {
        const ret = await WasmV4.Ed25519KeyHashes.from_bytes(bytes);
        return new $outer.Ed25519KeyHashes(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Ed25519KeyHashes> {
        const ret = await WasmV4.Ed25519KeyHashes.from_hex(hexStr);
        return new $outer.Ed25519KeyHashes(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.Ed25519KeyHashes> {
        const ret = await WasmV4.Ed25519KeyHashes.from_json(json);
        return new $outer.Ed25519KeyHashes(ret);
      }

      static async new(): Promise<WasmContract.Ed25519KeyHashes> {
        const ret = await WasmV4.Ed25519KeyHashes.new();
        return new $outer.Ed25519KeyHashes(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async get(index: number): Promise<WasmContract.Ed25519KeyHash> {
        const ret = await this.wasm.get(index);
        return new $outer.Ed25519KeyHash(ret);
      }

      async add(keyhash: WasmContract.Ed25519KeyHash): Promise<boolean> {
        const ret = await this.wasm.add(keyhash.wasm);
        return ret;
      }

      async contains(elem: WasmContract.Ed25519KeyHash): Promise<boolean> {
        const ret = await this.wasm.contains(elem.wasm);
        return ret;
      }

      async toOption(): Promise<Optional<WasmContract.Ed25519KeyHashes>> {
        const ret = await this.wasm.to_option();
        if (ret == null) return undefined;
        return new $outer.Ed25519KeyHashes(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      async toBech32(): Promise<string> {
        const ret = await this.wasm.to_bech32();
        return ret;
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromBech32(bech32Str: string): Promise<WasmContract.Ed25519Signature> {
        const ret = await WasmV4.Ed25519Signature.from_bech32(bech32Str);
        return new $outer.Ed25519Signature(ret);
      }

      static async fromHex(input: string): Promise<WasmContract.Ed25519Signature> {
        const ret = await WasmV4.Ed25519Signature.from_hex(input);
        return new $outer.Ed25519Signature(ret);
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Ed25519Signature> {
        const ret = await WasmV4.Ed25519Signature.from_bytes(bytes);
        return new $outer.Ed25519Signature(ret);
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
        return new $outer.EnterpriseAddress(ret);
      }

      async paymentCred(): Promise<WasmContract.Credential> {
        const ret = await this.wasm.payment_cred();
        return new $outer.Credential(ret);
      }

      async toAddress(): Promise<WasmContract.Address> {
        const ret = await this.wasm.to_address();
        return new $outer.Address(ret);
      }

      static async fromAddress(addr: WasmContract.Address): Promise<Optional<WasmContract.EnterpriseAddress>> {
        const ret = await WasmV4.EnterpriseAddress.from_address(addr.wasm);
        if (ret == null) return undefined;
        return new $outer.EnterpriseAddress(ret);
      }

      async networkId(): Promise<number> {
        const ret = await this.wasm.network_id();
        return ret;
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.ExUnitPrices> {
        const ret = await WasmV4.ExUnitPrices.from_bytes(bytes);
        return new $outer.ExUnitPrices(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.ExUnitPrices> {
        const ret = await WasmV4.ExUnitPrices.from_hex(hexStr);
        return new $outer.ExUnitPrices(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.ExUnitPrices> {
        const ret = await WasmV4.ExUnitPrices.from_json(json);
        return new $outer.ExUnitPrices(ret);
      }

      async memPrice(): Promise<WasmContract.UnitInterval> {
        const ret = await this.wasm.mem_price();
        return new $outer.UnitInterval(ret);
      }

      async stepPrice(): Promise<WasmContract.UnitInterval> {
        const ret = await this.wasm.step_price();
        return new $outer.UnitInterval(ret);
      }

      static async new(memPrice: WasmContract.UnitInterval, stepPrice: WasmContract.UnitInterval): Promise<WasmContract.ExUnitPrices> {
        const ret = await WasmV4.ExUnitPrices.new(memPrice.wasm, stepPrice.wasm);
        return new $outer.ExUnitPrices(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.ExUnits> {
        const ret = await WasmV4.ExUnits.from_bytes(bytes);
        return new $outer.ExUnits(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.ExUnits> {
        const ret = await WasmV4.ExUnits.from_hex(hexStr);
        return new $outer.ExUnits(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.ExUnits> {
        const ret = await WasmV4.ExUnits.from_json(json);
        return new $outer.ExUnits(ret);
      }

      async mem(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.mem();
        return new $outer.BigNum(ret);
      }

      async steps(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.steps();
        return new $outer.BigNum(ret);
      }

      static async new(mem: WasmContract.BigNum, steps: WasmContract.BigNum): Promise<WasmContract.ExUnits> {
        const ret = await WasmV4.ExUnits.new(mem.wasm, steps.wasm);
        return new $outer.ExUnits(ret);
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

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.FixedBlock> {
        const ret = await WasmV4.FixedBlock.from_bytes(bytes);
        return new $outer.FixedBlock(ret);
      }

      static async fromHex(hexStr: string): Promise<WasmContract.FixedBlock> {
        const ret = await WasmV4.FixedBlock.from_hex(hexStr);
        return new $outer.FixedBlock(ret);
      }

      async header(): Promise<WasmContract.Header> {
        const ret = await this.wasm.header();
        return new $outer.Header(ret);
      }

      async transactionBodies(): Promise<WasmContract.FixedTransactionBodies> {
        const ret = await this.wasm.transaction_bodies();
        return new $outer.FixedTransactionBodies(ret);
      }

      async transactionWitnessSets(): Promise<WasmContract.TransactionWitnessSets> {
        const ret = await this.wasm.transaction_witness_sets();
        return new $outer.TransactionWitnessSets(ret);
      }

      async auxiliaryDataSet(): Promise<WasmContract.AuxiliaryDataSet> {
        const ret = await this.wasm.auxiliary_data_set();
        return new $outer.AuxiliaryDataSet(ret);
      }

      async invalidTransactions(): Promise<Uint32Array> {
        const ret = await this.wasm.invalid_transactions();
        return ret;
      }

      async blockHash(): Promise<WasmContract.BlockHash> {
        const ret = await this.wasm.block_hash();
        return new $outer.BlockHash(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.FixedTransaction> {
        const ret = await WasmV4.FixedTransaction.from_bytes(bytes);
        return new $outer.FixedTransaction(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.FixedTransaction> {
        const ret = await WasmV4.FixedTransaction.from_hex(hexStr);
        return new $outer.FixedTransaction(ret);
      }

      static async new(rawBody: Uint8Array, rawWitnessSet: Uint8Array, isValid: boolean): Promise<WasmContract.FixedTransaction> {
        const ret = await WasmV4.FixedTransaction.new(rawBody, rawWitnessSet, isValid);
        return new $outer.FixedTransaction(ret);
      }

      static async newWithAuxiliary(rawBody: Uint8Array, rawWitnessSet: Uint8Array, rawAuxiliaryData: Uint8Array, isValid: boolean): Promise<WasmContract.FixedTransaction> {
        const ret = await WasmV4.FixedTransaction.new_with_auxiliary(rawBody, rawWitnessSet, rawAuxiliaryData, isValid);
        return new $outer.FixedTransaction(ret);
      }

      static async newFromBodyBytes(rawBody: Uint8Array): Promise<WasmContract.FixedTransaction> {
        const ret = await WasmV4.FixedTransaction.new_from_body_bytes(rawBody);
        return new $outer.FixedTransaction(ret);
      }

      async body(): Promise<WasmContract.TransactionBody> {
        const ret = await this.wasm.body();
        return new $outer.TransactionBody(ret);
      }

      async rawBody(): Promise<Uint8Array> {
        const ret = await this.wasm.raw_body();
        return ret;
      }

      async setBody(rawBody: Uint8Array): Promise<void> {
        const ret = await this.wasm.set_body(rawBody);
      }

      async setWitnessSet(rawWitnessSet: Uint8Array): Promise<void> {
        const ret = await this.wasm.set_witness_set(rawWitnessSet);
      }

      async witnessSet(): Promise<WasmContract.TransactionWitnessSet> {
        const ret = await this.wasm.witness_set();
        return new $outer.TransactionWitnessSet(ret);
      }

      async rawWitnessSet(): Promise<Uint8Array> {
        const ret = await this.wasm.raw_witness_set();
        return ret;
      }

      async setIsValid(valid: boolean): Promise<void> {
        const ret = await this.wasm.set_is_valid(valid);
      }

      async isValid(): Promise<boolean> {
        const ret = await this.wasm.is_valid();
        return ret;
      }

      async setAuxiliaryData(rawAuxiliaryData: Uint8Array): Promise<void> {
        const ret = await this.wasm.set_auxiliary_data(rawAuxiliaryData);
      }

      async auxiliaryData(): Promise<Optional<WasmContract.AuxiliaryData>> {
        const ret = await this.wasm.auxiliary_data();
        if (ret == null) return undefined;
        return new $outer.AuxiliaryData(ret);
      }

      async rawAuxiliaryData(): Promise<Optional<Uint8Array>> {
        const ret = await this.wasm.raw_auxiliary_data();
        if (ret == null) return undefined;
        return ret;
      }

      async transactionHash(): Promise<WasmContract.TransactionHash> {
        const ret = await this.wasm.transaction_hash();
        return new $outer.TransactionHash(ret);
      }

      async addVkeyWitness(vkeyWitness: WasmContract.Vkeywitness): Promise<void> {
        const ret = await this.wasm.add_vkey_witness(vkeyWitness.wasm);
      }

      async addBootstrapWitness(bootstrapWitness: WasmContract.BootstrapWitness): Promise<void> {
        const ret = await this.wasm.add_bootstrap_witness(bootstrapWitness.wasm);
      }

      async signAndAddVkeySignature(privateKey: WasmContract.PrivateKey): Promise<void> {
        const ret = await this.wasm.sign_and_add_vkey_signature(privateKey.wasm);
      }

      async signAndAddIcarusBootstrapSignature(addr: WasmContract.ByronAddress, privateKey: WasmContract.Bip32PrivateKey): Promise<void> {
        const ret = await this.wasm.sign_and_add_icarus_bootstrap_signature(addr.wasm, privateKey.wasm);
      }

      async signAndAddDaedalusBootstrapSignature(addr: WasmContract.ByronAddress, privateKey: WasmContract.LegacyDaedalusPrivateKey): Promise<void> {
        const ret = await this.wasm.sign_and_add_daedalus_bootstrap_signature(addr.wasm, privateKey.wasm);
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

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.FixedTransactionBodies> {
        const ret = await WasmV4.FixedTransactionBodies.from_bytes(bytes);
        return new $outer.FixedTransactionBodies(ret);
      }

      static async fromHex(hexStr: string): Promise<WasmContract.FixedTransactionBodies> {
        const ret = await WasmV4.FixedTransactionBodies.from_hex(hexStr);
        return new $outer.FixedTransactionBodies(ret);
      }

      static async new(): Promise<WasmContract.FixedTransactionBodies> {
        const ret = await WasmV4.FixedTransactionBodies.new();
        return new $outer.FixedTransactionBodies(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async get(index: number): Promise<WasmContract.FixedTransactionBody> {
        const ret = await this.wasm.get(index);
        return new $outer.FixedTransactionBody(ret);
      }

      async add(elem: WasmContract.FixedTransactionBody): Promise<void> {
        const ret = await this.wasm.add(elem.wasm);
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

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.FixedTransactionBody> {
        const ret = await WasmV4.FixedTransactionBody.from_bytes(bytes);
        return new $outer.FixedTransactionBody(ret);
      }

      static async fromHex(hexStr: string): Promise<WasmContract.FixedTransactionBody> {
        const ret = await WasmV4.FixedTransactionBody.from_hex(hexStr);
        return new $outer.FixedTransactionBody(ret);
      }

      async transactionBody(): Promise<WasmContract.TransactionBody> {
        const ret = await this.wasm.transaction_body();
        return new $outer.TransactionBody(ret);
      }

      async txHash(): Promise<WasmContract.TransactionHash> {
        const ret = await this.wasm.tx_hash();
        return new $outer.TransactionHash(ret);
      }

      async originalBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.original_bytes();
        return ret;
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

      async txWitnessesSet(): Promise<WasmContract.TransactionWitnessSet> {
        const ret = await this.wasm.tx_witnesses_set();
        return new $outer.TransactionWitnessSet(ret);
      }

      async addVkeyWitness(vkeyWitness: WasmContract.Vkeywitness): Promise<void> {
        const ret = await this.wasm.add_vkey_witness(vkeyWitness.wasm);
      }

      async addBootstrapWitness(bootstrapWitness: WasmContract.BootstrapWitness): Promise<void> {
        const ret = await this.wasm.add_bootstrap_witness(bootstrapWitness.wasm);
      }

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(data: Uint8Array): Promise<WasmContract.FixedTxWitnessesSet> {
        const ret = await WasmV4.FixedTxWitnessesSet.from_bytes(data);
        return new $outer.FixedTxWitnessesSet(ret);
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

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.FixedVersionedBlock> {
        const ret = await WasmV4.FixedVersionedBlock.from_bytes(bytes);
        return new $outer.FixedVersionedBlock(ret);
      }

      static async fromHex(hexStr: string): Promise<WasmContract.FixedVersionedBlock> {
        const ret = await WasmV4.FixedVersionedBlock.from_hex(hexStr);
        return new $outer.FixedVersionedBlock(ret);
      }

      async block(): Promise<WasmContract.FixedBlock> {
        const ret = await this.wasm.block();
        return new $outer.FixedBlock(ret);
      }

      async era(): Promise<WasmContract.BlockEra> {
        const ret = await this.wasm.era();
        return ret;
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.GeneralTransactionMetadata> {
        const ret = await WasmV4.GeneralTransactionMetadata.from_bytes(bytes);
        return new $outer.GeneralTransactionMetadata(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.GeneralTransactionMetadata> {
        const ret = await WasmV4.GeneralTransactionMetadata.from_hex(hexStr);
        return new $outer.GeneralTransactionMetadata(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.GeneralTransactionMetadata> {
        const ret = await WasmV4.GeneralTransactionMetadata.from_json(json);
        return new $outer.GeneralTransactionMetadata(ret);
      }

      static async new(): Promise<WasmContract.GeneralTransactionMetadata> {
        const ret = await WasmV4.GeneralTransactionMetadata.new();
        return new $outer.GeneralTransactionMetadata(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async insert(key: WasmContract.BigNum, value: WasmContract.TransactionMetadatum): Promise<Optional<WasmContract.TransactionMetadatum>> {
        const ret = await this.wasm.insert(key.wasm, value.wasm);
        if (ret == null) return undefined;
        return new $outer.TransactionMetadatum(ret);
      }

      async get(key: WasmContract.BigNum): Promise<Optional<WasmContract.TransactionMetadatum>> {
        const ret = await this.wasm.get(key.wasm);
        if (ret == null) return undefined;
        return new $outer.TransactionMetadatum(ret);
      }

      async keys(): Promise<WasmContract.TransactionMetadatumLabels> {
        const ret = await this.wasm.keys();
        return new $outer.TransactionMetadatumLabels(ret);
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
        return new $outer.GenesisDelegateHash(ret);
      }

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      async toBech32(prefix: string): Promise<string> {
        const ret = await this.wasm.to_bech32(prefix);
        return ret;
      }

      static async fromBech32(bechStr: string): Promise<WasmContract.GenesisDelegateHash> {
        const ret = await WasmV4.GenesisDelegateHash.from_bech32(bechStr);
        return new $outer.GenesisDelegateHash(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hex: string): Promise<WasmContract.GenesisDelegateHash> {
        const ret = await WasmV4.GenesisDelegateHash.from_hex(hex);
        return new $outer.GenesisDelegateHash(ret);
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
        return new $outer.GenesisHash(ret);
      }

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      async toBech32(prefix: string): Promise<string> {
        const ret = await this.wasm.to_bech32(prefix);
        return ret;
      }

      static async fromBech32(bechStr: string): Promise<WasmContract.GenesisHash> {
        const ret = await WasmV4.GenesisHash.from_bech32(bechStr);
        return new $outer.GenesisHash(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hex: string): Promise<WasmContract.GenesisHash> {
        const ret = await WasmV4.GenesisHash.from_hex(hex);
        return new $outer.GenesisHash(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.GenesisHashes> {
        const ret = await WasmV4.GenesisHashes.from_bytes(bytes);
        return new $outer.GenesisHashes(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.GenesisHashes> {
        const ret = await WasmV4.GenesisHashes.from_hex(hexStr);
        return new $outer.GenesisHashes(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.GenesisHashes> {
        const ret = await WasmV4.GenesisHashes.from_json(json);
        return new $outer.GenesisHashes(ret);
      }

      static async new(): Promise<WasmContract.GenesisHashes> {
        const ret = await WasmV4.GenesisHashes.new();
        return new $outer.GenesisHashes(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async get(index: number): Promise<WasmContract.GenesisHash> {
        const ret = await this.wasm.get(index);
        return new $outer.GenesisHash(ret);
      }

      async add(elem: WasmContract.GenesisHash): Promise<void> {
        const ret = await this.wasm.add(elem.wasm);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.GenesisKeyDelegation> {
        const ret = await WasmV4.GenesisKeyDelegation.from_bytes(bytes);
        return new $outer.GenesisKeyDelegation(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.GenesisKeyDelegation> {
        const ret = await WasmV4.GenesisKeyDelegation.from_hex(hexStr);
        return new $outer.GenesisKeyDelegation(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.GenesisKeyDelegation> {
        const ret = await WasmV4.GenesisKeyDelegation.from_json(json);
        return new $outer.GenesisKeyDelegation(ret);
      }

      async genesishash(): Promise<WasmContract.GenesisHash> {
        const ret = await this.wasm.genesishash();
        return new $outer.GenesisHash(ret);
      }

      async genesisDelegateHash(): Promise<WasmContract.GenesisDelegateHash> {
        const ret = await this.wasm.genesis_delegate_hash();
        return new $outer.GenesisDelegateHash(ret);
      }

      async vrfKeyhash(): Promise<WasmContract.VRFKeyHash> {
        const ret = await this.wasm.vrf_keyhash();
        return new $outer.VRFKeyHash(ret);
      }

      static async new(genesishash: WasmContract.GenesisHash, genesisDelegateHash: WasmContract.GenesisDelegateHash, vrfKeyhash: WasmContract.VRFKeyHash): Promise<WasmContract.GenesisKeyDelegation> {
        const ret = await WasmV4.GenesisKeyDelegation.new(genesishash.wasm, genesisDelegateHash.wasm, vrfKeyhash.wasm);
        return new $outer.GenesisKeyDelegation(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.GovernanceAction> {
        const ret = await WasmV4.GovernanceAction.from_bytes(bytes);
        return new $outer.GovernanceAction(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.GovernanceAction> {
        const ret = await WasmV4.GovernanceAction.from_hex(hexStr);
        return new $outer.GovernanceAction(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.GovernanceAction> {
        const ret = await WasmV4.GovernanceAction.from_json(json);
        return new $outer.GovernanceAction(ret);
      }

      static async newParameterChangeAction(parameterChangeAction: WasmContract.ParameterChangeAction): Promise<WasmContract.GovernanceAction> {
        const ret = await WasmV4.GovernanceAction.new_parameter_change_action(parameterChangeAction.wasm);
        return new $outer.GovernanceAction(ret);
      }

      static async newHardForkInitiationAction(hardForkInitiationAction: WasmContract.HardForkInitiationAction): Promise<WasmContract.GovernanceAction> {
        const ret = await WasmV4.GovernanceAction.new_hard_fork_initiation_action(hardForkInitiationAction.wasm);
        return new $outer.GovernanceAction(ret);
      }

      static async newTreasuryWithdrawalsAction(treasuryWithdrawalsAction: WasmContract.TreasuryWithdrawalsAction): Promise<WasmContract.GovernanceAction> {
        const ret = await WasmV4.GovernanceAction.new_treasury_withdrawals_action(treasuryWithdrawalsAction.wasm);
        return new $outer.GovernanceAction(ret);
      }

      static async newNoConfidenceAction(noConfidenceAction: WasmContract.NoConfidenceAction): Promise<WasmContract.GovernanceAction> {
        const ret = await WasmV4.GovernanceAction.new_no_confidence_action(noConfidenceAction.wasm);
        return new $outer.GovernanceAction(ret);
      }

      static async newNewCommitteeAction(newCommitteeAction: WasmContract.UpdateCommitteeAction): Promise<WasmContract.GovernanceAction> {
        const ret = await WasmV4.GovernanceAction.new_new_committee_action(newCommitteeAction.wasm);
        return new $outer.GovernanceAction(ret);
      }

      static async newNewConstitutionAction(newConstitutionAction: WasmContract.NewConstitutionAction): Promise<WasmContract.GovernanceAction> {
        const ret = await WasmV4.GovernanceAction.new_new_constitution_action(newConstitutionAction.wasm);
        return new $outer.GovernanceAction(ret);
      }

      static async newInfoAction(infoAction: WasmContract.InfoAction): Promise<WasmContract.GovernanceAction> {
        const ret = await WasmV4.GovernanceAction.new_info_action(infoAction.wasm);
        return new $outer.GovernanceAction(ret);
      }

      async kind(): Promise<WasmContract.GovernanceActionKind> {
        const ret = await this.wasm.kind();
        return ret;
      }

      async asParameterChangeAction(): Promise<Optional<WasmContract.ParameterChangeAction>> {
        const ret = await this.wasm.as_parameter_change_action();
        if (ret == null) return undefined;
        return new $outer.ParameterChangeAction(ret);
      }

      async asHardForkInitiationAction(): Promise<Optional<WasmContract.HardForkInitiationAction>> {
        const ret = await this.wasm.as_hard_fork_initiation_action();
        if (ret == null) return undefined;
        return new $outer.HardForkInitiationAction(ret);
      }

      async asTreasuryWithdrawalsAction(): Promise<Optional<WasmContract.TreasuryWithdrawalsAction>> {
        const ret = await this.wasm.as_treasury_withdrawals_action();
        if (ret == null) return undefined;
        return new $outer.TreasuryWithdrawalsAction(ret);
      }

      async asNoConfidenceAction(): Promise<Optional<WasmContract.NoConfidenceAction>> {
        const ret = await this.wasm.as_no_confidence_action();
        if (ret == null) return undefined;
        return new $outer.NoConfidenceAction(ret);
      }

      async asNewCommitteeAction(): Promise<Optional<WasmContract.UpdateCommitteeAction>> {
        const ret = await this.wasm.as_new_committee_action();
        if (ret == null) return undefined;
        return new $outer.UpdateCommitteeAction(ret);
      }

      async asNewConstitutionAction(): Promise<Optional<WasmContract.NewConstitutionAction>> {
        const ret = await this.wasm.as_new_constitution_action();
        if (ret == null) return undefined;
        return new $outer.NewConstitutionAction(ret);
      }

      async asInfoAction(): Promise<Optional<WasmContract.InfoAction>> {
        const ret = await this.wasm.as_info_action();
        if (ret == null) return undefined;
        return new $outer.InfoAction(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.GovernanceActionId> {
        const ret = await WasmV4.GovernanceActionId.from_bytes(bytes);
        return new $outer.GovernanceActionId(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.GovernanceActionId> {
        const ret = await WasmV4.GovernanceActionId.from_hex(hexStr);
        return new $outer.GovernanceActionId(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.GovernanceActionId> {
        const ret = await WasmV4.GovernanceActionId.from_json(json);
        return new $outer.GovernanceActionId(ret);
      }

      async transactionId(): Promise<WasmContract.TransactionHash> {
        const ret = await this.wasm.transaction_id();
        return new $outer.TransactionHash(ret);
      }

      async index(): Promise<number> {
        const ret = await this.wasm.index();
        return ret;
      }

      static async new(transactionId: WasmContract.TransactionHash, index: number): Promise<WasmContract.GovernanceActionId> {
        const ret = await WasmV4.GovernanceActionId.new(transactionId.wasm, index);
        return new $outer.GovernanceActionId(ret);
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

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.GovernanceActionIds> {
        const ret = await WasmV4.GovernanceActionIds.from_json(json);
        return new $outer.GovernanceActionIds(ret);
      }

      static async new(): Promise<WasmContract.GovernanceActionIds> {
        const ret = await WasmV4.GovernanceActionIds.new();
        return new $outer.GovernanceActionIds(ret);
      }

      async add(governanceActionId: WasmContract.GovernanceActionId): Promise<void> {
        const ret = await this.wasm.add(governanceActionId.wasm);
      }

      async get(index: number): Promise<Optional<WasmContract.GovernanceActionId>> {
        const ret = await this.wasm.get(index);
        if (ret == null) return undefined;
        return new $outer.GovernanceActionId(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.HardForkInitiationAction> {
        const ret = await WasmV4.HardForkInitiationAction.from_bytes(bytes);
        return new $outer.HardForkInitiationAction(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.HardForkInitiationAction> {
        const ret = await WasmV4.HardForkInitiationAction.from_hex(hexStr);
        return new $outer.HardForkInitiationAction(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.HardForkInitiationAction> {
        const ret = await WasmV4.HardForkInitiationAction.from_json(json);
        return new $outer.HardForkInitiationAction(ret);
      }

      async govActionId(): Promise<Optional<WasmContract.GovernanceActionId>> {
        const ret = await this.wasm.gov_action_id();
        if (ret == null) return undefined;
        return new $outer.GovernanceActionId(ret);
      }

      async protocolVersion(): Promise<WasmContract.ProtocolVersion> {
        const ret = await this.wasm.protocol_version();
        return new $outer.ProtocolVersion(ret);
      }

      static async new(protocolVersion: WasmContract.ProtocolVersion): Promise<WasmContract.HardForkInitiationAction> {
        const ret = await WasmV4.HardForkInitiationAction.new(protocolVersion.wasm);
        return new $outer.HardForkInitiationAction(ret);
      }

      static async newWithActionId(govActionId: WasmContract.GovernanceActionId, protocolVersion: WasmContract.ProtocolVersion): Promise<WasmContract.HardForkInitiationAction> {
        const ret = await WasmV4.HardForkInitiationAction.new_with_action_id(govActionId.wasm, protocolVersion.wasm);
        return new $outer.HardForkInitiationAction(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Header> {
        const ret = await WasmV4.Header.from_bytes(bytes);
        return new $outer.Header(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Header> {
        const ret = await WasmV4.Header.from_hex(hexStr);
        return new $outer.Header(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.Header> {
        const ret = await WasmV4.Header.from_json(json);
        return new $outer.Header(ret);
      }

      async headerBody(): Promise<WasmContract.HeaderBody> {
        const ret = await this.wasm.header_body();
        return new $outer.HeaderBody(ret);
      }

      async bodySignature(): Promise<WasmContract.KESSignature> {
        const ret = await this.wasm.body_signature();
        return new $outer.KESSignature(ret);
      }

      static async new(headerBody: WasmContract.HeaderBody, bodySignature: WasmContract.KESSignature): Promise<WasmContract.Header> {
        const ret = await WasmV4.Header.new(headerBody.wasm, bodySignature.wasm);
        return new $outer.Header(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.HeaderBody> {
        const ret = await WasmV4.HeaderBody.from_bytes(bytes);
        return new $outer.HeaderBody(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.HeaderBody> {
        const ret = await WasmV4.HeaderBody.from_hex(hexStr);
        return new $outer.HeaderBody(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.HeaderBody> {
        const ret = await WasmV4.HeaderBody.from_json(json);
        return new $outer.HeaderBody(ret);
      }

      async blockNumber(): Promise<number> {
        const ret = await this.wasm.block_number();
        return ret;
      }

      async slot(): Promise<number> {
        const ret = await this.wasm.slot();
        return ret;
      }

      async slotBignum(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.slot_bignum();
        return new $outer.BigNum(ret);
      }

      async prevHash(): Promise<Optional<WasmContract.BlockHash>> {
        const ret = await this.wasm.prev_hash();
        if (ret == null) return undefined;
        return new $outer.BlockHash(ret);
      }

      async issuerVkey(): Promise<WasmContract.Vkey> {
        const ret = await this.wasm.issuer_vkey();
        return new $outer.Vkey(ret);
      }

      async vrfVkey(): Promise<WasmContract.VRFVKey> {
        const ret = await this.wasm.vrf_vkey();
        return new $outer.VRFVKey(ret);
      }

      async hasNonceAndLeaderVrf(): Promise<boolean> {
        const ret = await this.wasm.has_nonce_and_leader_vrf();
        return ret;
      }

      async nonceVrfOrNothing(): Promise<Optional<WasmContract.VRFCert>> {
        const ret = await this.wasm.nonce_vrf_or_nothing();
        if (ret == null) return undefined;
        return new $outer.VRFCert(ret);
      }

      async leaderVrfOrNothing(): Promise<Optional<WasmContract.VRFCert>> {
        const ret = await this.wasm.leader_vrf_or_nothing();
        if (ret == null) return undefined;
        return new $outer.VRFCert(ret);
      }

      async hasVrfResult(): Promise<boolean> {
        const ret = await this.wasm.has_vrf_result();
        return ret;
      }

      async vrfResultOrNothing(): Promise<Optional<WasmContract.VRFCert>> {
        const ret = await this.wasm.vrf_result_or_nothing();
        if (ret == null) return undefined;
        return new $outer.VRFCert(ret);
      }

      async blockBodySize(): Promise<number> {
        const ret = await this.wasm.block_body_size();
        return ret;
      }

      async blockBodyHash(): Promise<WasmContract.BlockHash> {
        const ret = await this.wasm.block_body_hash();
        return new $outer.BlockHash(ret);
      }

      async operationalCert(): Promise<WasmContract.OperationalCert> {
        const ret = await this.wasm.operational_cert();
        return new $outer.OperationalCert(ret);
      }

      async protocolVersion(): Promise<WasmContract.ProtocolVersion> {
        const ret = await this.wasm.protocol_version();
        return new $outer.ProtocolVersion(ret);
      }

      static async new(blockNumber: number, slot: number, prevHash: Optional<WasmContract.BlockHash>, issuerVkey: WasmContract.Vkey, vrfVkey: WasmContract.VRFVKey, vrfResult: WasmContract.VRFCert, blockBodySize: number, blockBodyHash: WasmContract.BlockHash, operationalCert: WasmContract.OperationalCert, protocolVersion: WasmContract.ProtocolVersion): Promise<WasmContract.HeaderBody> {
        const ret = await WasmV4.HeaderBody.new(blockNumber, slot, prevHash?.wasm, issuerVkey.wasm, vrfVkey.wasm, vrfResult.wasm, blockBodySize, blockBodyHash.wasm, operationalCert.wasm, protocolVersion.wasm);
        return new $outer.HeaderBody(ret);
      }

      static async newHeaderbody(blockNumber: number, slot: WasmContract.BigNum, prevHash: Optional<WasmContract.BlockHash>, issuerVkey: WasmContract.Vkey, vrfVkey: WasmContract.VRFVKey, vrfResult: WasmContract.VRFCert, blockBodySize: number, blockBodyHash: WasmContract.BlockHash, operationalCert: WasmContract.OperationalCert, protocolVersion: WasmContract.ProtocolVersion): Promise<WasmContract.HeaderBody> {
        const ret = await WasmV4.HeaderBody.new_headerbody(blockNumber, slot.wasm, prevHash?.wasm, issuerVkey.wasm, vrfVkey.wasm, vrfResult.wasm, blockBodySize, blockBodyHash.wasm, operationalCert.wasm, protocolVersion.wasm);
        return new $outer.HeaderBody(ret);
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
        return new $outer.InfoAction(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Int> {
        const ret = await WasmV4.Int.from_bytes(bytes);
        return new $outer.Int(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Int> {
        const ret = await WasmV4.Int.from_hex(hexStr);
        return new $outer.Int(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.Int> {
        const ret = await WasmV4.Int.from_json(json);
        return new $outer.Int(ret);
      }

      static async new(x: WasmContract.BigNum): Promise<WasmContract.Int> {
        const ret = await WasmV4.Int.new(x.wasm);
        return new $outer.Int(ret);
      }

      static async newNegative(x: WasmContract.BigNum): Promise<WasmContract.Int> {
        const ret = await WasmV4.Int.new_negative(x.wasm);
        return new $outer.Int(ret);
      }

      static async newI32(x: number): Promise<WasmContract.Int> {
        const ret = await WasmV4.Int.new_i32(x);
        return new $outer.Int(ret);
      }

      async isPositive(): Promise<boolean> {
        const ret = await this.wasm.is_positive();
        return ret;
      }

      async asPositive(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.as_positive();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret);
      }

      async asNegative(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.as_negative();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret);
      }

      async asI32(): Promise<Optional<number>> {
        const ret = await this.wasm.as_i32();
        if (ret == null) return undefined;
        return ret;
      }

      async asI32OrNothing(): Promise<Optional<number>> {
        const ret = await this.wasm.as_i32_or_nothing();
        if (ret == null) return undefined;
        return ret;
      }

      async asI32OrFail(): Promise<number> {
        const ret = await this.wasm.as_i32_or_fail();
        return ret;
      }

      async toStr(): Promise<string> {
        const ret = await this.wasm.to_str();
        return ret;
      }

      static async fromStr(string: string): Promise<WasmContract.Int> {
        const ret = await WasmV4.Int.from_str(string);
        return new $outer.Int(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Ipv4> {
        const ret = await WasmV4.Ipv4.from_bytes(bytes);
        return new $outer.Ipv4(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Ipv4> {
        const ret = await WasmV4.Ipv4.from_hex(hexStr);
        return new $outer.Ipv4(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.Ipv4> {
        const ret = await WasmV4.Ipv4.from_json(json);
        return new $outer.Ipv4(ret);
      }

      static async new(data: Uint8Array): Promise<WasmContract.Ipv4> {
        const ret = await WasmV4.Ipv4.new(data);
        return new $outer.Ipv4(ret);
      }

      async ip(): Promise<Uint8Array> {
        const ret = await this.wasm.ip();
        return ret;
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Ipv6> {
        const ret = await WasmV4.Ipv6.from_bytes(bytes);
        return new $outer.Ipv6(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Ipv6> {
        const ret = await WasmV4.Ipv6.from_hex(hexStr);
        return new $outer.Ipv6(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.Ipv6> {
        const ret = await WasmV4.Ipv6.from_json(json);
        return new $outer.Ipv6(ret);
      }

      static async new(data: Uint8Array): Promise<WasmContract.Ipv6> {
        const ret = await WasmV4.Ipv6.new(data);
        return new $outer.Ipv6(ret);
      }

      async ip(): Promise<Uint8Array> {
        const ret = await this.wasm.ip();
        return ret;
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.KESSignature> {
        const ret = await WasmV4.KESSignature.from_bytes(bytes);
        return new $outer.KESSignature(ret);
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
        return new $outer.KESVKey(ret);
      }

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      async toBech32(prefix: string): Promise<string> {
        const ret = await this.wasm.to_bech32(prefix);
        return ret;
      }

      static async fromBech32(bechStr: string): Promise<WasmContract.KESVKey> {
        const ret = await WasmV4.KESVKey.from_bech32(bechStr);
        return new $outer.KESVKey(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hex: string): Promise<WasmContract.KESVKey> {
        const ret = await WasmV4.KESVKey.from_hex(hex);
        return new $outer.KESVKey(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Language> {
        const ret = await WasmV4.Language.from_bytes(bytes);
        return new $outer.Language(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Language> {
        const ret = await WasmV4.Language.from_hex(hexStr);
        return new $outer.Language(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.Language> {
        const ret = await WasmV4.Language.from_json(json);
        return new $outer.Language(ret);
      }

      static async newPlutusV1(): Promise<WasmContract.Language> {
        const ret = await WasmV4.Language.new_plutus_v1();
        return new $outer.Language(ret);
      }

      static async newPlutusV2(): Promise<WasmContract.Language> {
        const ret = await WasmV4.Language.new_plutus_v2();
        return new $outer.Language(ret);
      }

      static async newPlutusV3(): Promise<WasmContract.Language> {
        const ret = await WasmV4.Language.new_plutus_v3();
        return new $outer.Language(ret);
      }

      async kind(): Promise<WasmContract.LanguageKind> {
        const ret = await this.wasm.kind();
        return ret;
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
        return new $outer.Languages(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async get(index: number): Promise<WasmContract.Language> {
        const ret = await this.wasm.get(index);
        return new $outer.Language(ret);
      }

      async add(elem: WasmContract.Language): Promise<void> {
        const ret = await this.wasm.add(elem.wasm);
      }

      static async list(): Promise<WasmContract.Languages> {
        const ret = await WasmV4.Languages.list();
        return new $outer.Languages(ret);
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
        return new $outer.LegacyDaedalusPrivateKey(ret);
      }

      async asBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.as_bytes();
        return ret;
      }

      async chaincode(): Promise<Uint8Array> {
        const ret = await this.wasm.chaincode();
        return ret;
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
        return new $outer.BigNum(ret);
      }

      async coefficient(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.coefficient();
        return new $outer.BigNum(ret);
      }

      static async new(coefficient: WasmContract.BigNum, constant: WasmContract.BigNum): Promise<WasmContract.LinearFee> {
        const ret = await WasmV4.LinearFee.new(coefficient.wasm, constant.wasm);
        return new $outer.LinearFee(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.MIRToStakeCredentials> {
        const ret = await WasmV4.MIRToStakeCredentials.from_bytes(bytes);
        return new $outer.MIRToStakeCredentials(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.MIRToStakeCredentials> {
        const ret = await WasmV4.MIRToStakeCredentials.from_hex(hexStr);
        return new $outer.MIRToStakeCredentials(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.MIRToStakeCredentials> {
        const ret = await WasmV4.MIRToStakeCredentials.from_json(json);
        return new $outer.MIRToStakeCredentials(ret);
      }

      static async new(): Promise<WasmContract.MIRToStakeCredentials> {
        const ret = await WasmV4.MIRToStakeCredentials.new();
        return new $outer.MIRToStakeCredentials(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async insert(cred: WasmContract.Credential, delta: WasmContract.Int): Promise<Optional<WasmContract.Int>> {
        const ret = await this.wasm.insert(cred.wasm, delta.wasm);
        if (ret == null) return undefined;
        return new $outer.Int(ret);
      }

      async get(cred: WasmContract.Credential): Promise<Optional<WasmContract.Int>> {
        const ret = await this.wasm.get(cred.wasm);
        if (ret == null) return undefined;
        return new $outer.Int(ret);
      }

      async keys(): Promise<WasmContract.Credentials> {
        const ret = await this.wasm.keys();
        return new $outer.Credentials(ret);
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

      async originalBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.original_bytes();
        return ret;
      }

      async toAddress(): Promise<WasmContract.Address> {
        const ret = await this.wasm.to_address();
        return new $outer.Address(ret);
      }

      static async fromAddress(addr: WasmContract.Address): Promise<Optional<WasmContract.MalformedAddress>> {
        const ret = await WasmV4.MalformedAddress.from_address(addr.wasm);
        if (ret == null) return undefined;
        return new $outer.MalformedAddress(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.MetadataList> {
        const ret = await WasmV4.MetadataList.from_bytes(bytes);
        return new $outer.MetadataList(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.MetadataList> {
        const ret = await WasmV4.MetadataList.from_hex(hexStr);
        return new $outer.MetadataList(ret);
      }

      static async new(): Promise<WasmContract.MetadataList> {
        const ret = await WasmV4.MetadataList.new();
        return new $outer.MetadataList(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async get(index: number): Promise<WasmContract.TransactionMetadatum> {
        const ret = await this.wasm.get(index);
        return new $outer.TransactionMetadatum(ret);
      }

      async add(elem: WasmContract.TransactionMetadatum): Promise<void> {
        const ret = await this.wasm.add(elem.wasm);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.MetadataMap> {
        const ret = await WasmV4.MetadataMap.from_bytes(bytes);
        return new $outer.MetadataMap(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.MetadataMap> {
        const ret = await WasmV4.MetadataMap.from_hex(hexStr);
        return new $outer.MetadataMap(ret);
      }

      static async new(): Promise<WasmContract.MetadataMap> {
        const ret = await WasmV4.MetadataMap.new();
        return new $outer.MetadataMap(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async insert(key: WasmContract.TransactionMetadatum, value: WasmContract.TransactionMetadatum): Promise<Optional<WasmContract.TransactionMetadatum>> {
        const ret = await this.wasm.insert(key.wasm, value.wasm);
        if (ret == null) return undefined;
        return new $outer.TransactionMetadatum(ret);
      }

      async insertStr(key: string, value: WasmContract.TransactionMetadatum): Promise<Optional<WasmContract.TransactionMetadatum>> {
        const ret = await this.wasm.insert_str(key, value.wasm);
        if (ret == null) return undefined;
        return new $outer.TransactionMetadatum(ret);
      }

      async insertI32(key: number, value: WasmContract.TransactionMetadatum): Promise<Optional<WasmContract.TransactionMetadatum>> {
        const ret = await this.wasm.insert_i32(key, value.wasm);
        if (ret == null) return undefined;
        return new $outer.TransactionMetadatum(ret);
      }

      async get(key: WasmContract.TransactionMetadatum): Promise<WasmContract.TransactionMetadatum> {
        const ret = await this.wasm.get(key.wasm);
        return new $outer.TransactionMetadatum(ret);
      }

      async getStr(key: string): Promise<WasmContract.TransactionMetadatum> {
        const ret = await this.wasm.get_str(key);
        return new $outer.TransactionMetadatum(ret);
      }

      async getI32(key: number): Promise<WasmContract.TransactionMetadatum> {
        const ret = await this.wasm.get_i32(key);
        return new $outer.TransactionMetadatum(ret);
      }

      async has(key: WasmContract.TransactionMetadatum): Promise<boolean> {
        const ret = await this.wasm.has(key.wasm);
        return ret;
      }

      async keys(): Promise<WasmContract.MetadataList> {
        const ret = await this.wasm.keys();
        return new $outer.MetadataList(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Mint> {
        const ret = await WasmV4.Mint.from_bytes(bytes);
        return new $outer.Mint(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Mint> {
        const ret = await WasmV4.Mint.from_hex(hexStr);
        return new $outer.Mint(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.Mint> {
        const ret = await WasmV4.Mint.from_json(json);
        return new $outer.Mint(ret);
      }

      static async new(): Promise<WasmContract.Mint> {
        const ret = await WasmV4.Mint.new();
        return new $outer.Mint(ret);
      }

      static async newFromEntry(key: WasmContract.ScriptHash, value: WasmContract.MintAssets): Promise<WasmContract.Mint> {
        const ret = await WasmV4.Mint.new_from_entry(key.wasm, value.wasm);
        return new $outer.Mint(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async insert(key: WasmContract.ScriptHash, value: WasmContract.MintAssets): Promise<Optional<WasmContract.MintAssets>> {
        const ret = await this.wasm.insert(key.wasm, value.wasm);
        if (ret == null) return undefined;
        return new $outer.MintAssets(ret);
      }

      async get(key: WasmContract.ScriptHash): Promise<Optional<WasmContract.MintsAssets>> {
        const ret = await this.wasm.get(key.wasm);
        if (ret == null) return undefined;
        return new $outer.MintsAssets(ret);
      }

      async keys(): Promise<WasmContract.ScriptHashes> {
        const ret = await this.wasm.keys();
        return new $outer.ScriptHashes(ret);
      }

      async asPositiveMultiasset(): Promise<WasmContract.MultiAsset> {
        const ret = await this.wasm.as_positive_multiasset();
        return new $outer.MultiAsset(ret);
      }

      async asNegativeMultiasset(): Promise<WasmContract.MultiAsset> {
        const ret = await this.wasm.as_negative_multiasset();
        return new $outer.MultiAsset(ret);
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
        return new $outer.MintAssets(ret);
      }

      static async newFromEntry(key: WasmContract.AssetName, value: WasmContract.Int): Promise<WasmContract.MintAssets> {
        const ret = await WasmV4.MintAssets.new_from_entry(key.wasm, value.wasm);
        return new $outer.MintAssets(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async insert(key: WasmContract.AssetName, value: WasmContract.Int): Promise<Optional<WasmContract.Int>> {
        const ret = await this.wasm.insert(key.wasm, value.wasm);
        if (ret == null) return undefined;
        return new $outer.Int(ret);
      }

      async get(key: WasmContract.AssetName): Promise<Optional<WasmContract.Int>> {
        const ret = await this.wasm.get(key.wasm);
        if (ret == null) return undefined;
        return new $outer.Int(ret);
      }

      async keys(): Promise<WasmContract.AssetNames> {
        const ret = await this.wasm.keys();
        return new $outer.AssetNames(ret);
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
        return new $outer.MintBuilder(ret);
      }

      async addAsset(mint: WasmContract.MintWitness, assetName: WasmContract.AssetName, amount: WasmContract.Int): Promise<void> {
        const ret = await this.wasm.add_asset(mint.wasm, assetName.wasm, amount.wasm);
      }

      async setAsset(mint: WasmContract.MintWitness, assetName: WasmContract.AssetName, amount: WasmContract.Int): Promise<void> {
        const ret = await this.wasm.set_asset(mint.wasm, assetName.wasm, amount.wasm);
      }

      async build(): Promise<WasmContract.Mint> {
        const ret = await this.wasm.build();
        return new $outer.Mint(ret);
      }

      async getNativeScripts(): Promise<WasmContract.NativeScripts> {
        const ret = await this.wasm.get_native_scripts();
        return new $outer.NativeScripts(ret);
      }

      async getPlutusWitnesses(): Promise<WasmContract.PlutusWitnesses> {
        const ret = await this.wasm.get_plutus_witnesses();
        return new $outer.PlutusWitnesses(ret);
      }

      async getRefInputs(): Promise<WasmContract.TransactionInputs> {
        const ret = await this.wasm.get_ref_inputs();
        return new $outer.TransactionInputs(ret);
      }

      async getRedeemers(): Promise<WasmContract.Redeemers> {
        const ret = await this.wasm.get_redeemers();
        return new $outer.Redeemers(ret);
      }

      async hasPlutusScripts(): Promise<boolean> {
        const ret = await this.wasm.has_plutus_scripts();
        return ret;
      }

      async hasNativeScripts(): Promise<boolean> {
        const ret = await this.wasm.has_native_scripts();
        return ret;
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

      static async newNativeScript(nativeScript: WasmContract.NativeScriptSource): Promise<WasmContract.MintWitness> {
        const ret = await WasmV4.MintWitness.new_native_script(nativeScript.wasm);
        return new $outer.MintWitness(ret);
      }

      static async newPlutusScript(plutusScript: WasmContract.PlutusScriptSource, redeemer: WasmContract.Redeemer): Promise<WasmContract.MintWitness> {
        const ret = await WasmV4.MintWitness.new_plutus_script(plutusScript.wasm, redeemer.wasm);
        return new $outer.MintWitness(ret);
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

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.MintsAssets> {
        const ret = await WasmV4.MintsAssets.from_json(json);
        return new $outer.MintsAssets(ret);
      }

      static async new(): Promise<WasmContract.MintsAssets> {
        const ret = await WasmV4.MintsAssets.new();
        return new $outer.MintsAssets(ret);
      }

      async add(mintAssets: WasmContract.MintAssets): Promise<void> {
        const ret = await this.wasm.add(mintAssets.wasm);
      }

      async get(index: number): Promise<Optional<WasmContract.MintAssets>> {
        const ret = await this.wasm.get(index);
        if (ret == null) return undefined;
        return new $outer.MintAssets(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.MoveInstantaneousReward> {
        const ret = await WasmV4.MoveInstantaneousReward.from_bytes(bytes);
        return new $outer.MoveInstantaneousReward(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.MoveInstantaneousReward> {
        const ret = await WasmV4.MoveInstantaneousReward.from_hex(hexStr);
        return new $outer.MoveInstantaneousReward(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.MoveInstantaneousReward> {
        const ret = await WasmV4.MoveInstantaneousReward.from_json(json);
        return new $outer.MoveInstantaneousReward(ret);
      }

      static async newToOtherPot(pot: WasmContract.MIRPot, amount: WasmContract.BigNum): Promise<WasmContract.MoveInstantaneousReward> {
        const ret = await WasmV4.MoveInstantaneousReward.new_to_other_pot(pot, amount.wasm);
        return new $outer.MoveInstantaneousReward(ret);
      }

      static async newToStakeCreds(pot: WasmContract.MIRPot, amounts: WasmContract.MIRToStakeCredentials): Promise<WasmContract.MoveInstantaneousReward> {
        const ret = await WasmV4.MoveInstantaneousReward.new_to_stake_creds(pot, amounts.wasm);
        return new $outer.MoveInstantaneousReward(ret);
      }

      async pot(): Promise<WasmContract.MIRPot> {
        const ret = await this.wasm.pot();
        return ret;
      }

      async kind(): Promise<WasmContract.MIRKind> {
        const ret = await this.wasm.kind();
        return ret;
      }

      async asToOtherPot(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.as_to_other_pot();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret);
      }

      async asToStakeCreds(): Promise<Optional<WasmContract.MIRToStakeCredentials>> {
        const ret = await this.wasm.as_to_stake_creds();
        if (ret == null) return undefined;
        return new $outer.MIRToStakeCredentials(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.MoveInstantaneousRewardsCert> {
        const ret = await WasmV4.MoveInstantaneousRewardsCert.from_bytes(bytes);
        return new $outer.MoveInstantaneousRewardsCert(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.MoveInstantaneousRewardsCert> {
        const ret = await WasmV4.MoveInstantaneousRewardsCert.from_hex(hexStr);
        return new $outer.MoveInstantaneousRewardsCert(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.MoveInstantaneousRewardsCert> {
        const ret = await WasmV4.MoveInstantaneousRewardsCert.from_json(json);
        return new $outer.MoveInstantaneousRewardsCert(ret);
      }

      async moveInstantaneousReward(): Promise<WasmContract.MoveInstantaneousReward> {
        const ret = await this.wasm.move_instantaneous_reward();
        return new $outer.MoveInstantaneousReward(ret);
      }

      static async new(moveInstantaneousReward: WasmContract.MoveInstantaneousReward): Promise<WasmContract.MoveInstantaneousRewardsCert> {
        const ret = await WasmV4.MoveInstantaneousRewardsCert.new(moveInstantaneousReward.wasm);
        return new $outer.MoveInstantaneousRewardsCert(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.MultiAsset> {
        const ret = await WasmV4.MultiAsset.from_bytes(bytes);
        return new $outer.MultiAsset(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.MultiAsset> {
        const ret = await WasmV4.MultiAsset.from_hex(hexStr);
        return new $outer.MultiAsset(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.MultiAsset> {
        const ret = await WasmV4.MultiAsset.from_json(json);
        return new $outer.MultiAsset(ret);
      }

      static async new(): Promise<WasmContract.MultiAsset> {
        const ret = await WasmV4.MultiAsset.new();
        return new $outer.MultiAsset(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async insert(policyId: WasmContract.ScriptHash, assets: WasmContract.Assets): Promise<Optional<WasmContract.Assets>> {
        const ret = await this.wasm.insert(policyId.wasm, assets.wasm);
        if (ret == null) return undefined;
        return new $outer.Assets(ret);
      }

      async get(policyId: WasmContract.ScriptHash): Promise<Optional<WasmContract.Assets>> {
        const ret = await this.wasm.get(policyId.wasm);
        if (ret == null) return undefined;
        return new $outer.Assets(ret);
      }

      async setAsset(policyId: WasmContract.ScriptHash, assetName: WasmContract.AssetName, value: WasmContract.BigNum): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.set_asset(policyId.wasm, assetName.wasm, value.wasm);
        if (ret == null) return undefined;
        return new $outer.BigNum(ret);
      }

      async getAsset(policyId: WasmContract.ScriptHash, assetName: WasmContract.AssetName): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.get_asset(policyId.wasm, assetName.wasm);
        return new $outer.BigNum(ret);
      }

      async keys(): Promise<WasmContract.ScriptHashes> {
        const ret = await this.wasm.keys();
        return new $outer.ScriptHashes(ret);
      }

      async sub(rhsMa: WasmContract.MultiAsset): Promise<WasmContract.MultiAsset> {
        const ret = await this.wasm.sub(rhsMa.wasm);
        return new $outer.MultiAsset(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.MultiHostName> {
        const ret = await WasmV4.MultiHostName.from_bytes(bytes);
        return new $outer.MultiHostName(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.MultiHostName> {
        const ret = await WasmV4.MultiHostName.from_hex(hexStr);
        return new $outer.MultiHostName(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.MultiHostName> {
        const ret = await WasmV4.MultiHostName.from_json(json);
        return new $outer.MultiHostName(ret);
      }

      async dnsName(): Promise<WasmContract.DNSRecordSRV> {
        const ret = await this.wasm.dns_name();
        return new $outer.DNSRecordSRV(ret);
      }

      static async new(dnsName: WasmContract.DNSRecordSRV): Promise<WasmContract.MultiHostName> {
        const ret = await WasmV4.MultiHostName.new(dnsName.wasm);
        return new $outer.MultiHostName(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.NativeScript> {
        const ret = await WasmV4.NativeScript.from_bytes(bytes);
        return new $outer.NativeScript(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.NativeScript> {
        const ret = await WasmV4.NativeScript.from_hex(hexStr);
        return new $outer.NativeScript(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.NativeScript> {
        const ret = await WasmV4.NativeScript.from_json(json);
        return new $outer.NativeScript(ret);
      }

      async hash(): Promise<WasmContract.ScriptHash> {
        const ret = await this.wasm.hash();
        return new $outer.ScriptHash(ret);
      }

      static async newScriptPubkey(scriptPubkey: WasmContract.ScriptPubkey): Promise<WasmContract.NativeScript> {
        const ret = await WasmV4.NativeScript.new_script_pubkey(scriptPubkey.wasm);
        return new $outer.NativeScript(ret);
      }

      static async newScriptAll(scriptAll: WasmContract.ScriptAll): Promise<WasmContract.NativeScript> {
        const ret = await WasmV4.NativeScript.new_script_all(scriptAll.wasm);
        return new $outer.NativeScript(ret);
      }

      static async newScriptAny(scriptAny: WasmContract.ScriptAny): Promise<WasmContract.NativeScript> {
        const ret = await WasmV4.NativeScript.new_script_any(scriptAny.wasm);
        return new $outer.NativeScript(ret);
      }

      static async newScriptNOfK(scriptNOfK: WasmContract.ScriptNOfK): Promise<WasmContract.NativeScript> {
        const ret = await WasmV4.NativeScript.new_script_n_of_k(scriptNOfK.wasm);
        return new $outer.NativeScript(ret);
      }

      static async newTimelockStart(timelockStart: WasmContract.TimelockStart): Promise<WasmContract.NativeScript> {
        const ret = await WasmV4.NativeScript.new_timelock_start(timelockStart.wasm);
        return new $outer.NativeScript(ret);
      }

      static async newTimelockExpiry(timelockExpiry: WasmContract.TimelockExpiry): Promise<WasmContract.NativeScript> {
        const ret = await WasmV4.NativeScript.new_timelock_expiry(timelockExpiry.wasm);
        return new $outer.NativeScript(ret);
      }

      async kind(): Promise<WasmContract.NativeScriptKind> {
        const ret = await this.wasm.kind();
        return ret;
      }

      async asScriptPubkey(): Promise<Optional<WasmContract.ScriptPubkey>> {
        const ret = await this.wasm.as_script_pubkey();
        if (ret == null) return undefined;
        return new $outer.ScriptPubkey(ret);
      }

      async asScriptAll(): Promise<Optional<WasmContract.ScriptAll>> {
        const ret = await this.wasm.as_script_all();
        if (ret == null) return undefined;
        return new $outer.ScriptAll(ret);
      }

      async asScriptAny(): Promise<Optional<WasmContract.ScriptAny>> {
        const ret = await this.wasm.as_script_any();
        if (ret == null) return undefined;
        return new $outer.ScriptAny(ret);
      }

      async asScriptNOfK(): Promise<Optional<WasmContract.ScriptNOfK>> {
        const ret = await this.wasm.as_script_n_of_k();
        if (ret == null) return undefined;
        return new $outer.ScriptNOfK(ret);
      }

      async asTimelockStart(): Promise<Optional<WasmContract.TimelockStart>> {
        const ret = await this.wasm.as_timelock_start();
        if (ret == null) return undefined;
        return new $outer.TimelockStart(ret);
      }

      async asTimelockExpiry(): Promise<Optional<WasmContract.TimelockExpiry>> {
        const ret = await this.wasm.as_timelock_expiry();
        if (ret == null) return undefined;
        return new $outer.TimelockExpiry(ret);
      }

      async getRequiredSigners(): Promise<WasmContract.Ed25519KeyHashes> {
        const ret = await this.wasm.get_required_signers();
        return new $outer.Ed25519KeyHashes(ret);
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
        return new $outer.NativeScriptSource(ret);
      }

      static async newRefInput(scriptHash: WasmContract.ScriptHash, input: WasmContract.TransactionInput, scriptSize: number): Promise<WasmContract.NativeScriptSource> {
        const ret = await WasmV4.NativeScriptSource.new_ref_input(scriptHash.wasm, input.wasm, scriptSize);
        return new $outer.NativeScriptSource(ret);
      }

      async setRequiredSigners(keyHashes: WasmContract.Ed25519KeyHashes): Promise<void> {
        const ret = await this.wasm.set_required_signers(keyHashes.wasm);
      }

      async getRefScriptSize(): Promise<Optional<number>> {
        const ret = await this.wasm.get_ref_script_size();
        if (ret == null) return undefined;
        return ret;
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
        return new $outer.NativeScripts(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async get(index: number): Promise<WasmContract.NativeScript> {
        const ret = await this.wasm.get(index);
        return new $outer.NativeScript(ret);
      }

      async add(elem: WasmContract.NativeScript): Promise<void> {
        const ret = await this.wasm.add(elem.wasm);
      }

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.NativeScripts> {
        const ret = await WasmV4.NativeScripts.from_bytes(bytes);
        return new $outer.NativeScripts(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.NativeScripts> {
        const ret = await WasmV4.NativeScripts.from_hex(hexStr);
        return new $outer.NativeScripts(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.NativeScripts> {
        const ret = await WasmV4.NativeScripts.from_json(json);
        return new $outer.NativeScripts(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.NetworkId> {
        const ret = await WasmV4.NetworkId.from_bytes(bytes);
        return new $outer.NetworkId(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.NetworkId> {
        const ret = await WasmV4.NetworkId.from_hex(hexStr);
        return new $outer.NetworkId(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.NetworkId> {
        const ret = await WasmV4.NetworkId.from_json(json);
        return new $outer.NetworkId(ret);
      }

      static async testnet(): Promise<WasmContract.NetworkId> {
        const ret = await WasmV4.NetworkId.testnet();
        return new $outer.NetworkId(ret);
      }

      static async mainnet(): Promise<WasmContract.NetworkId> {
        const ret = await WasmV4.NetworkId.mainnet();
        return new $outer.NetworkId(ret);
      }

      async kind(): Promise<WasmContract.NetworkIdKind> {
        const ret = await this.wasm.kind();
        return ret;
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
        return new $outer.NetworkInfo(ret);
      }

      async networkId(): Promise<number> {
        const ret = await this.wasm.network_id();
        return ret;
      }

      async protocolMagic(): Promise<number> {
        const ret = await this.wasm.protocol_magic();
        return ret;
      }

      static async testnetPreview(): Promise<WasmContract.NetworkInfo> {
        const ret = await WasmV4.NetworkInfo.testnet_preview();
        return new $outer.NetworkInfo(ret);
      }

      static async testnetPreprod(): Promise<WasmContract.NetworkInfo> {
        const ret = await WasmV4.NetworkInfo.testnet_preprod();
        return new $outer.NetworkInfo(ret);
      }

      static async mainnet(): Promise<WasmContract.NetworkInfo> {
        const ret = await WasmV4.NetworkInfo.mainnet();
        return new $outer.NetworkInfo(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.NewConstitutionAction> {
        const ret = await WasmV4.NewConstitutionAction.from_bytes(bytes);
        return new $outer.NewConstitutionAction(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.NewConstitutionAction> {
        const ret = await WasmV4.NewConstitutionAction.from_hex(hexStr);
        return new $outer.NewConstitutionAction(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.NewConstitutionAction> {
        const ret = await WasmV4.NewConstitutionAction.from_json(json);
        return new $outer.NewConstitutionAction(ret);
      }

      async govActionId(): Promise<Optional<WasmContract.GovernanceActionId>> {
        const ret = await this.wasm.gov_action_id();
        if (ret == null) return undefined;
        return new $outer.GovernanceActionId(ret);
      }

      async constitution(): Promise<WasmContract.Constitution> {
        const ret = await this.wasm.constitution();
        return new $outer.Constitution(ret);
      }

      static async new(constitution: WasmContract.Constitution): Promise<WasmContract.NewConstitutionAction> {
        const ret = await WasmV4.NewConstitutionAction.new(constitution.wasm);
        return new $outer.NewConstitutionAction(ret);
      }

      static async newWithActionId(govActionId: WasmContract.GovernanceActionId, constitution: WasmContract.Constitution): Promise<WasmContract.NewConstitutionAction> {
        const ret = await WasmV4.NewConstitutionAction.new_with_action_id(govActionId.wasm, constitution.wasm);
        return new $outer.NewConstitutionAction(ret);
      }

      async hasScriptHash(): Promise<boolean> {
        const ret = await this.wasm.has_script_hash();
        return ret;
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.NoConfidenceAction> {
        const ret = await WasmV4.NoConfidenceAction.from_bytes(bytes);
        return new $outer.NoConfidenceAction(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.NoConfidenceAction> {
        const ret = await WasmV4.NoConfidenceAction.from_hex(hexStr);
        return new $outer.NoConfidenceAction(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.NoConfidenceAction> {
        const ret = await WasmV4.NoConfidenceAction.from_json(json);
        return new $outer.NoConfidenceAction(ret);
      }

      async govActionId(): Promise<Optional<WasmContract.GovernanceActionId>> {
        const ret = await this.wasm.gov_action_id();
        if (ret == null) return undefined;
        return new $outer.GovernanceActionId(ret);
      }

      static async new(): Promise<WasmContract.NoConfidenceAction> {
        const ret = await WasmV4.NoConfidenceAction.new();
        return new $outer.NoConfidenceAction(ret);
      }

      static async newWithActionId(govActionId: WasmContract.GovernanceActionId): Promise<WasmContract.NoConfidenceAction> {
        const ret = await WasmV4.NoConfidenceAction.new_with_action_id(govActionId.wasm);
        return new $outer.NoConfidenceAction(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Nonce> {
        const ret = await WasmV4.Nonce.from_bytes(bytes);
        return new $outer.Nonce(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Nonce> {
        const ret = await WasmV4.Nonce.from_hex(hexStr);
        return new $outer.Nonce(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.Nonce> {
        const ret = await WasmV4.Nonce.from_json(json);
        return new $outer.Nonce(ret);
      }

      static async newIdentity(): Promise<WasmContract.Nonce> {
        const ret = await WasmV4.Nonce.new_identity();
        return new $outer.Nonce(ret);
      }

      static async newFromHash(hash: Uint8Array): Promise<WasmContract.Nonce> {
        const ret = await WasmV4.Nonce.new_from_hash(hash);
        return new $outer.Nonce(ret);
      }

      async getHash(): Promise<Optional<Uint8Array>> {
        const ret = await this.wasm.get_hash();
        if (ret == null) return undefined;
        return ret;
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.OperationalCert> {
        const ret = await WasmV4.OperationalCert.from_bytes(bytes);
        return new $outer.OperationalCert(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.OperationalCert> {
        const ret = await WasmV4.OperationalCert.from_hex(hexStr);
        return new $outer.OperationalCert(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.OperationalCert> {
        const ret = await WasmV4.OperationalCert.from_json(json);
        return new $outer.OperationalCert(ret);
      }

      async hotVkey(): Promise<WasmContract.KESVKey> {
        const ret = await this.wasm.hot_vkey();
        return new $outer.KESVKey(ret);
      }

      async sequenceNumber(): Promise<number> {
        const ret = await this.wasm.sequence_number();
        return ret;
      }

      async kesPeriod(): Promise<number> {
        const ret = await this.wasm.kes_period();
        return ret;
      }

      async sigma(): Promise<WasmContract.Ed25519Signature> {
        const ret = await this.wasm.sigma();
        return new $outer.Ed25519Signature(ret);
      }

      static async new(hotVkey: WasmContract.KESVKey, sequenceNumber: number, kesPeriod: number, sigma: WasmContract.Ed25519Signature): Promise<WasmContract.OperationalCert> {
        const ret = await WasmV4.OperationalCert.new(hotVkey.wasm, sequenceNumber, kesPeriod, sigma.wasm);
        return new $outer.OperationalCert(ret);
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
        return new $outer.OutputDatum(ret);
      }

      static async newData(data: WasmContract.PlutusData): Promise<WasmContract.OutputDatum> {
        const ret = await WasmV4.OutputDatum.new_data(data.wasm);
        return new $outer.OutputDatum(ret);
      }

      async dataHash(): Promise<Optional<WasmContract.DataHash>> {
        const ret = await this.wasm.data_hash();
        if (ret == null) return undefined;
        return new $outer.DataHash(ret);
      }

      async data(): Promise<Optional<WasmContract.PlutusData>> {
        const ret = await this.wasm.data();
        if (ret == null) return undefined;
        return new $outer.PlutusData(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.ParameterChangeAction> {
        const ret = await WasmV4.ParameterChangeAction.from_bytes(bytes);
        return new $outer.ParameterChangeAction(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.ParameterChangeAction> {
        const ret = await WasmV4.ParameterChangeAction.from_hex(hexStr);
        return new $outer.ParameterChangeAction(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.ParameterChangeAction> {
        const ret = await WasmV4.ParameterChangeAction.from_json(json);
        return new $outer.ParameterChangeAction(ret);
      }

      async govActionId(): Promise<Optional<WasmContract.GovernanceActionId>> {
        const ret = await this.wasm.gov_action_id();
        if (ret == null) return undefined;
        return new $outer.GovernanceActionId(ret);
      }

      async protocolParamUpdates(): Promise<WasmContract.ProtocolParamUpdate> {
        const ret = await this.wasm.protocol_param_updates();
        return new $outer.ProtocolParamUpdate(ret);
      }

      async policyHash(): Promise<Optional<WasmContract.ScriptHash>> {
        const ret = await this.wasm.policy_hash();
        if (ret == null) return undefined;
        return new $outer.ScriptHash(ret);
      }

      static async new(protocolParamUpdates: WasmContract.ProtocolParamUpdate): Promise<WasmContract.ParameterChangeAction> {
        const ret = await WasmV4.ParameterChangeAction.new(protocolParamUpdates.wasm);
        return new $outer.ParameterChangeAction(ret);
      }

      static async newWithActionId(govActionId: WasmContract.GovernanceActionId, protocolParamUpdates: WasmContract.ProtocolParamUpdate): Promise<WasmContract.ParameterChangeAction> {
        const ret = await WasmV4.ParameterChangeAction.new_with_action_id(govActionId.wasm, protocolParamUpdates.wasm);
        return new $outer.ParameterChangeAction(ret);
      }

      static async newWithPolicyHash(protocolParamUpdates: WasmContract.ProtocolParamUpdate, policyHash: WasmContract.ScriptHash): Promise<WasmContract.ParameterChangeAction> {
        const ret = await WasmV4.ParameterChangeAction.new_with_policy_hash(protocolParamUpdates.wasm, policyHash.wasm);
        return new $outer.ParameterChangeAction(ret);
      }

      static async newWithPolicyHashAndActionId(govActionId: WasmContract.GovernanceActionId, protocolParamUpdates: WasmContract.ProtocolParamUpdate, policyHash: WasmContract.ScriptHash): Promise<WasmContract.ParameterChangeAction> {
        const ret = await WasmV4.ParameterChangeAction.new_with_policy_hash_and_action_id(govActionId.wasm, protocolParamUpdates.wasm, policyHash.wasm);
        return new $outer.ParameterChangeAction(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.PlutusData> {
        const ret = await WasmV4.PlutusData.from_bytes(bytes);
        return new $outer.PlutusData(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.PlutusData> {
        const ret = await WasmV4.PlutusData.from_hex(hexStr);
        return new $outer.PlutusData(ret);
      }

      static async newConstrPlutusData(constrPlutusData: WasmContract.ConstrPlutusData): Promise<WasmContract.PlutusData> {
        const ret = await WasmV4.PlutusData.new_constr_plutus_data(constrPlutusData.wasm);
        return new $outer.PlutusData(ret);
      }

      static async newEmptyConstrPlutusData(alternative: WasmContract.BigNum): Promise<WasmContract.PlutusData> {
        const ret = await WasmV4.PlutusData.new_empty_constr_plutus_data(alternative.wasm);
        return new $outer.PlutusData(ret);
      }

      static async newSingleValueConstrPlutusData(alternative: WasmContract.BigNum, plutusData: WasmContract.PlutusData): Promise<WasmContract.PlutusData> {
        const ret = await WasmV4.PlutusData.new_single_value_constr_plutus_data(alternative.wasm, plutusData.wasm);
        return new $outer.PlutusData(ret);
      }

      static async newMap(map: WasmContract.PlutusMap): Promise<WasmContract.PlutusData> {
        const ret = await WasmV4.PlutusData.new_map(map.wasm);
        return new $outer.PlutusData(ret);
      }

      static async newList(list: WasmContract.PlutusList): Promise<WasmContract.PlutusData> {
        const ret = await WasmV4.PlutusData.new_list(list.wasm);
        return new $outer.PlutusData(ret);
      }

      static async newInteger(integer: WasmContract.BigInt): Promise<WasmContract.PlutusData> {
        const ret = await WasmV4.PlutusData.new_integer(integer.wasm);
        return new $outer.PlutusData(ret);
      }

      static async newBytes(bytes: Uint8Array): Promise<WasmContract.PlutusData> {
        const ret = await WasmV4.PlutusData.new_bytes(bytes);
        return new $outer.PlutusData(ret);
      }

      async kind(): Promise<WasmContract.PlutusDataKind> {
        const ret = await this.wasm.kind();
        return ret;
      }

      async asConstrPlutusData(): Promise<Optional<WasmContract.ConstrPlutusData>> {
        const ret = await this.wasm.as_constr_plutus_data();
        if (ret == null) return undefined;
        return new $outer.ConstrPlutusData(ret);
      }

      async asMap(): Promise<Optional<WasmContract.PlutusMap>> {
        const ret = await this.wasm.as_map();
        if (ret == null) return undefined;
        return new $outer.PlutusMap(ret);
      }

      async asList(): Promise<Optional<WasmContract.PlutusList>> {
        const ret = await this.wasm.as_list();
        if (ret == null) return undefined;
        return new $outer.PlutusList(ret);
      }

      async asInteger(): Promise<Optional<WasmContract.BigInt>> {
        const ret = await this.wasm.as_integer();
        if (ret == null) return undefined;
        return new $outer.BigInt(ret);
      }

      async asBytes(): Promise<Optional<Uint8Array>> {
        const ret = await this.wasm.as_bytes();
        if (ret == null) return undefined;
        return ret;
      }

      async toJson(schema: WasmContract.PlutusDatumSchema): Promise<string> {
        const ret = await this.wasm.to_json(schema);
        return ret;
      }

      static async fromJson(json: string, schema: WasmContract.PlutusDatumSchema): Promise<WasmContract.PlutusData> {
        const ret = await WasmV4.PlutusData.from_json(json, schema);
        return new $outer.PlutusData(ret);
      }

      static async fromAddress(address: WasmContract.Address): Promise<WasmContract.PlutusData> {
        const ret = await WasmV4.PlutusData.from_address(address.wasm);
        return new $outer.PlutusData(ret);
      }

      async asAddress(network: WasmContract.NetworkInfo): Promise<WasmContract.Address> {
        const ret = await this.wasm.as_address(network.wasm);
        return new $outer.Address(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.PlutusList> {
        const ret = await WasmV4.PlutusList.from_bytes(bytes);
        return new $outer.PlutusList(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.PlutusList> {
        const ret = await WasmV4.PlutusList.from_hex(hexStr);
        return new $outer.PlutusList(ret);
      }

      static async new(): Promise<WasmContract.PlutusList> {
        const ret = await WasmV4.PlutusList.new();
        return new $outer.PlutusList(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async get(index: number): Promise<WasmContract.PlutusData> {
        const ret = await this.wasm.get(index);
        return new $outer.PlutusData(ret);
      }

      async add(elem: WasmContract.PlutusData): Promise<void> {
        const ret = await this.wasm.add(elem.wasm);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.PlutusMap> {
        const ret = await WasmV4.PlutusMap.from_bytes(bytes);
        return new $outer.PlutusMap(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.PlutusMap> {
        const ret = await WasmV4.PlutusMap.from_hex(hexStr);
        return new $outer.PlutusMap(ret);
      }

      static async new(): Promise<WasmContract.PlutusMap> {
        const ret = await WasmV4.PlutusMap.new();
        return new $outer.PlutusMap(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async insert(key: WasmContract.PlutusData, values: WasmContract.PlutusMapValues): Promise<Optional<WasmContract.PlutusMapValues>> {
        const ret = await this.wasm.insert(key.wasm, values.wasm);
        if (ret == null) return undefined;
        return new $outer.PlutusMapValues(ret);
      }

      async get(key: WasmContract.PlutusData): Promise<Optional<WasmContract.PlutusMapValues>> {
        const ret = await this.wasm.get(key.wasm);
        if (ret == null) return undefined;
        return new $outer.PlutusMapValues(ret);
      }

      async keys(): Promise<WasmContract.PlutusList> {
        const ret = await this.wasm.keys();
        return new $outer.PlutusList(ret);
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

      static async new(): Promise<WasmContract.PlutusMapValues> {
        const ret = await WasmV4.PlutusMapValues.new();
        return new $outer.PlutusMapValues(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async get(index: number): Promise<Optional<WasmContract.PlutusData>> {
        const ret = await this.wasm.get(index);
        if (ret == null) return undefined;
        return new $outer.PlutusData(ret);
      }

      async add(elem: WasmContract.PlutusData): Promise<void> {
        const ret = await this.wasm.add(elem.wasm);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.PlutusScript> {
        const ret = await WasmV4.PlutusScript.from_bytes(bytes);
        return new $outer.PlutusScript(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.PlutusScript> {
        const ret = await WasmV4.PlutusScript.from_hex(hexStr);
        return new $outer.PlutusScript(ret);
      }

      static async new(bytes: Uint8Array): Promise<WasmContract.PlutusScript> {
        const ret = await WasmV4.PlutusScript.new(bytes);
        return new $outer.PlutusScript(ret);
      }

      static async newV2(bytes: Uint8Array): Promise<WasmContract.PlutusScript> {
        const ret = await WasmV4.PlutusScript.new_v2(bytes);
        return new $outer.PlutusScript(ret);
      }

      static async newV3(bytes: Uint8Array): Promise<WasmContract.PlutusScript> {
        const ret = await WasmV4.PlutusScript.new_v3(bytes);
        return new $outer.PlutusScript(ret);
      }

      static async newWithVersion(bytes: Uint8Array, language: WasmContract.Language): Promise<WasmContract.PlutusScript> {
        const ret = await WasmV4.PlutusScript.new_with_version(bytes, language.wasm);
        return new $outer.PlutusScript(ret);
      }

      async bytes(): Promise<Uint8Array> {
        const ret = await this.wasm.bytes();
        return ret;
      }

      static async fromBytesV2(bytes: Uint8Array): Promise<WasmContract.PlutusScript> {
        const ret = await WasmV4.PlutusScript.from_bytes_v2(bytes);
        return new $outer.PlutusScript(ret);
      }

      static async fromBytesV3(bytes: Uint8Array): Promise<WasmContract.PlutusScript> {
        const ret = await WasmV4.PlutusScript.from_bytes_v3(bytes);
        return new $outer.PlutusScript(ret);
      }

      static async fromBytesWithVersion(bytes: Uint8Array, language: WasmContract.Language): Promise<WasmContract.PlutusScript> {
        const ret = await WasmV4.PlutusScript.from_bytes_with_version(bytes, language.wasm);
        return new $outer.PlutusScript(ret);
      }

      static async fromHexWithVersion(hexStr: string, language: WasmContract.Language): Promise<WasmContract.PlutusScript> {
        const ret = await WasmV4.PlutusScript.from_hex_with_version(hexStr, language.wasm);
        return new $outer.PlutusScript(ret);
      }

      async hash(): Promise<WasmContract.ScriptHash> {
        const ret = await this.wasm.hash();
        return new $outer.ScriptHash(ret);
      }

      async languageVersion(): Promise<WasmContract.Language> {
        const ret = await this.wasm.language_version();
        return new $outer.Language(ret);
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
        return new $outer.PlutusScriptSource(ret);
      }

      static async newRefInput(scriptHash: WasmContract.ScriptHash, input: WasmContract.TransactionInput, langVer: WasmContract.Language, scriptSize: number): Promise<WasmContract.PlutusScriptSource> {
        const ret = await WasmV4.PlutusScriptSource.new_ref_input(scriptHash.wasm, input.wasm, langVer.wasm, scriptSize);
        return new $outer.PlutusScriptSource(ret);
      }

      async setRequiredSigners(keyHashes: WasmContract.Ed25519KeyHashes): Promise<void> {
        const ret = await this.wasm.set_required_signers(keyHashes.wasm);
      }

      async getRefScriptSize(): Promise<Optional<number>> {
        const ret = await this.wasm.get_ref_script_size();
        if (ret == null) return undefined;
        return ret;
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.PlutusScripts> {
        const ret = await WasmV4.PlutusScripts.from_bytes(bytes);
        return new $outer.PlutusScripts(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.PlutusScripts> {
        const ret = await WasmV4.PlutusScripts.from_hex(hexStr);
        return new $outer.PlutusScripts(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.PlutusScripts> {
        const ret = await WasmV4.PlutusScripts.from_json(json);
        return new $outer.PlutusScripts(ret);
      }

      static async new(): Promise<WasmContract.PlutusScripts> {
        const ret = await WasmV4.PlutusScripts.new();
        return new $outer.PlutusScripts(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async get(index: number): Promise<WasmContract.PlutusScript> {
        const ret = await this.wasm.get(index);
        return new $outer.PlutusScript(ret);
      }

      async add(elem: WasmContract.PlutusScript): Promise<void> {
        const ret = await this.wasm.add(elem.wasm);
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
        return new $outer.PlutusWitness(ret);
      }

      static async newWithRef(script: WasmContract.PlutusScriptSource, datum: WasmContract.DatumSource, redeemer: WasmContract.Redeemer): Promise<WasmContract.PlutusWitness> {
        const ret = await WasmV4.PlutusWitness.new_with_ref(script.wasm, datum.wasm, redeemer.wasm);
        return new $outer.PlutusWitness(ret);
      }

      static async newWithoutDatum(script: WasmContract.PlutusScript, redeemer: WasmContract.Redeemer): Promise<WasmContract.PlutusWitness> {
        const ret = await WasmV4.PlutusWitness.new_without_datum(script.wasm, redeemer.wasm);
        return new $outer.PlutusWitness(ret);
      }

      static async newWithRefWithoutDatum(script: WasmContract.PlutusScriptSource, redeemer: WasmContract.Redeemer): Promise<WasmContract.PlutusWitness> {
        const ret = await WasmV4.PlutusWitness.new_with_ref_without_datum(script.wasm, redeemer.wasm);
        return new $outer.PlutusWitness(ret);
      }

      async script(): Promise<Optional<WasmContract.PlutusScript>> {
        const ret = await this.wasm.script();
        if (ret == null) return undefined;
        return new $outer.PlutusScript(ret);
      }

      async datum(): Promise<Optional<WasmContract.PlutusData>> {
        const ret = await this.wasm.datum();
        if (ret == null) return undefined;
        return new $outer.PlutusData(ret);
      }

      async redeemer(): Promise<WasmContract.Redeemer> {
        const ret = await this.wasm.redeemer();
        return new $outer.Redeemer(ret);
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
        return new $outer.PlutusWitnesses(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async get(index: number): Promise<WasmContract.PlutusWitness> {
        const ret = await this.wasm.get(index);
        return new $outer.PlutusWitness(ret);
      }

      async add(elem: WasmContract.PlutusWitness): Promise<void> {
        const ret = await this.wasm.add(elem.wasm);
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
        return new $outer.Pointer(ret);
      }

      static async newPointer(slot: WasmContract.BigNum, txIndex: WasmContract.BigNum, certIndex: WasmContract.BigNum): Promise<WasmContract.Pointer> {
        const ret = await WasmV4.Pointer.new_pointer(slot.wasm, txIndex.wasm, certIndex.wasm);
        return new $outer.Pointer(ret);
      }

      async slot(): Promise<number> {
        const ret = await this.wasm.slot();
        return ret;
      }

      async txIndex(): Promise<number> {
        const ret = await this.wasm.tx_index();
        return ret;
      }

      async certIndex(): Promise<number> {
        const ret = await this.wasm.cert_index();
        return ret;
      }

      async slotBignum(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.slot_bignum();
        return new $outer.BigNum(ret);
      }

      async txIndexBignum(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.tx_index_bignum();
        return new $outer.BigNum(ret);
      }

      async certIndexBignum(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.cert_index_bignum();
        return new $outer.BigNum(ret);
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
        return new $outer.PointerAddress(ret);
      }

      async paymentCred(): Promise<WasmContract.Credential> {
        const ret = await this.wasm.payment_cred();
        return new $outer.Credential(ret);
      }

      async stakePointer(): Promise<WasmContract.Pointer> {
        const ret = await this.wasm.stake_pointer();
        return new $outer.Pointer(ret);
      }

      async toAddress(): Promise<WasmContract.Address> {
        const ret = await this.wasm.to_address();
        return new $outer.Address(ret);
      }

      static async fromAddress(addr: WasmContract.Address): Promise<Optional<WasmContract.PointerAddress>> {
        const ret = await WasmV4.PointerAddress.from_address(addr.wasm);
        if (ret == null) return undefined;
        return new $outer.PointerAddress(ret);
      }

      async networkId(): Promise<number> {
        const ret = await this.wasm.network_id();
        return ret;
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.PoolMetadata> {
        const ret = await WasmV4.PoolMetadata.from_bytes(bytes);
        return new $outer.PoolMetadata(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.PoolMetadata> {
        const ret = await WasmV4.PoolMetadata.from_hex(hexStr);
        return new $outer.PoolMetadata(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.PoolMetadata> {
        const ret = await WasmV4.PoolMetadata.from_json(json);
        return new $outer.PoolMetadata(ret);
      }

      async url(): Promise<WasmContract.URL> {
        const ret = await this.wasm.url();
        return new $outer.URL(ret);
      }

      async poolMetadataHash(): Promise<WasmContract.PoolMetadataHash> {
        const ret = await this.wasm.pool_metadata_hash();
        return new $outer.PoolMetadataHash(ret);
      }

      static async new(url: WasmContract.URL, poolMetadataHash: WasmContract.PoolMetadataHash): Promise<WasmContract.PoolMetadata> {
        const ret = await WasmV4.PoolMetadata.new(url.wasm, poolMetadataHash.wasm);
        return new $outer.PoolMetadata(ret);
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
        return new $outer.PoolMetadataHash(ret);
      }

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      async toBech32(prefix: string): Promise<string> {
        const ret = await this.wasm.to_bech32(prefix);
        return ret;
      }

      static async fromBech32(bechStr: string): Promise<WasmContract.PoolMetadataHash> {
        const ret = await WasmV4.PoolMetadataHash.from_bech32(bechStr);
        return new $outer.PoolMetadataHash(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hex: string): Promise<WasmContract.PoolMetadataHash> {
        const ret = await WasmV4.PoolMetadataHash.from_hex(hex);
        return new $outer.PoolMetadataHash(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.PoolParams> {
        const ret = await WasmV4.PoolParams.from_bytes(bytes);
        return new $outer.PoolParams(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.PoolParams> {
        const ret = await WasmV4.PoolParams.from_hex(hexStr);
        return new $outer.PoolParams(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.PoolParams> {
        const ret = await WasmV4.PoolParams.from_json(json);
        return new $outer.PoolParams(ret);
      }

      async operator(): Promise<WasmContract.Ed25519KeyHash> {
        const ret = await this.wasm.operator();
        return new $outer.Ed25519KeyHash(ret);
      }

      async vrfKeyhash(): Promise<WasmContract.VRFKeyHash> {
        const ret = await this.wasm.vrf_keyhash();
        return new $outer.VRFKeyHash(ret);
      }

      async pledge(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.pledge();
        return new $outer.BigNum(ret);
      }

      async cost(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.cost();
        return new $outer.BigNum(ret);
      }

      async margin(): Promise<WasmContract.UnitInterval> {
        const ret = await this.wasm.margin();
        return new $outer.UnitInterval(ret);
      }

      async rewardAccount(): Promise<WasmContract.RewardAddress> {
        const ret = await this.wasm.reward_account();
        return new $outer.RewardAddress(ret);
      }

      async poolOwners(): Promise<WasmContract.Ed25519KeyHashes> {
        const ret = await this.wasm.pool_owners();
        return new $outer.Ed25519KeyHashes(ret);
      }

      async relays(): Promise<WasmContract.Relays> {
        const ret = await this.wasm.relays();
        return new $outer.Relays(ret);
      }

      async poolMetadata(): Promise<Optional<WasmContract.PoolMetadata>> {
        const ret = await this.wasm.pool_metadata();
        if (ret == null) return undefined;
        return new $outer.PoolMetadata(ret);
      }

      static async new(operator: WasmContract.Ed25519KeyHash, vrfKeyhash: WasmContract.VRFKeyHash, pledge: WasmContract.BigNum, cost: WasmContract.BigNum, margin: WasmContract.UnitInterval, rewardAccount: WasmContract.RewardAddress, poolOwners: WasmContract.Ed25519KeyHashes, relays: WasmContract.Relays, poolMetadata: Optional<WasmContract.PoolMetadata>): Promise<WasmContract.PoolParams> {
        const ret = await WasmV4.PoolParams.new(operator.wasm, vrfKeyhash.wasm, pledge.wasm, cost.wasm, margin.wasm, rewardAccount.wasm, poolOwners.wasm, relays.wasm, poolMetadata?.wasm);
        return new $outer.PoolParams(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.PoolRegistration> {
        const ret = await WasmV4.PoolRegistration.from_bytes(bytes);
        return new $outer.PoolRegistration(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.PoolRegistration> {
        const ret = await WasmV4.PoolRegistration.from_hex(hexStr);
        return new $outer.PoolRegistration(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.PoolRegistration> {
        const ret = await WasmV4.PoolRegistration.from_json(json);
        return new $outer.PoolRegistration(ret);
      }

      async poolParams(): Promise<WasmContract.PoolParams> {
        const ret = await this.wasm.pool_params();
        return new $outer.PoolParams(ret);
      }

      static async new(poolParams: WasmContract.PoolParams): Promise<WasmContract.PoolRegistration> {
        const ret = await WasmV4.PoolRegistration.new(poolParams.wasm);
        return new $outer.PoolRegistration(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.PoolRetirement> {
        const ret = await WasmV4.PoolRetirement.from_bytes(bytes);
        return new $outer.PoolRetirement(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.PoolRetirement> {
        const ret = await WasmV4.PoolRetirement.from_hex(hexStr);
        return new $outer.PoolRetirement(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.PoolRetirement> {
        const ret = await WasmV4.PoolRetirement.from_json(json);
        return new $outer.PoolRetirement(ret);
      }

      async poolKeyhash(): Promise<WasmContract.Ed25519KeyHash> {
        const ret = await this.wasm.pool_keyhash();
        return new $outer.Ed25519KeyHash(ret);
      }

      async epoch(): Promise<number> {
        const ret = await this.wasm.epoch();
        return ret;
      }

      static async new(poolKeyhash: WasmContract.Ed25519KeyHash, epoch: number): Promise<WasmContract.PoolRetirement> {
        const ret = await WasmV4.PoolRetirement.new(poolKeyhash.wasm, epoch);
        return new $outer.PoolRetirement(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.PoolVotingThresholds> {
        const ret = await WasmV4.PoolVotingThresholds.from_bytes(bytes);
        return new $outer.PoolVotingThresholds(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.PoolVotingThresholds> {
        const ret = await WasmV4.PoolVotingThresholds.from_hex(hexStr);
        return new $outer.PoolVotingThresholds(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.PoolVotingThresholds> {
        const ret = await WasmV4.PoolVotingThresholds.from_json(json);
        return new $outer.PoolVotingThresholds(ret);
      }

      static async new(motionNoConfidence: WasmContract.UnitInterval, committeeNormal: WasmContract.UnitInterval, committeeNoConfidence: WasmContract.UnitInterval, hardForkInitiation: WasmContract.UnitInterval, securityRelevantThreshold: WasmContract.UnitInterval): Promise<WasmContract.PoolVotingThresholds> {
        const ret = await WasmV4.PoolVotingThresholds.new(motionNoConfidence.wasm, committeeNormal.wasm, committeeNoConfidence.wasm, hardForkInitiation.wasm, securityRelevantThreshold.wasm);
        return new $outer.PoolVotingThresholds(ret);
      }

      async motionNoConfidence(): Promise<WasmContract.UnitInterval> {
        const ret = await this.wasm.motion_no_confidence();
        return new $outer.UnitInterval(ret);
      }

      async committeeNormal(): Promise<WasmContract.UnitInterval> {
        const ret = await this.wasm.committee_normal();
        return new $outer.UnitInterval(ret);
      }

      async committeeNoConfidence(): Promise<WasmContract.UnitInterval> {
        const ret = await this.wasm.committee_no_confidence();
        return new $outer.UnitInterval(ret);
      }

      async hardForkInitiation(): Promise<WasmContract.UnitInterval> {
        const ret = await this.wasm.hard_fork_initiation();
        return new $outer.UnitInterval(ret);
      }

      async securityRelevantThreshold(): Promise<WasmContract.UnitInterval> {
        const ret = await this.wasm.security_relevant_threshold();
        return new $outer.UnitInterval(ret);
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
        return new $outer.PublicKey(ret);
      }

      static async generateEd25519(): Promise<WasmContract.PrivateKey> {
        const ret = await WasmV4.PrivateKey.generate_ed25519();
        return new $outer.PrivateKey(ret);
      }

      static async generateEd25519extended(): Promise<WasmContract.PrivateKey> {
        const ret = await WasmV4.PrivateKey.generate_ed25519extended();
        return new $outer.PrivateKey(ret);
      }

      static async fromBech32(bech32Str: string): Promise<WasmContract.PrivateKey> {
        const ret = await WasmV4.PrivateKey.from_bech32(bech32Str);
        return new $outer.PrivateKey(ret);
      }

      async toBech32(): Promise<string> {
        const ret = await this.wasm.to_bech32();
        return ret;
      }

      async asBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.as_bytes();
        return ret;
      }

      static async fromExtendedBytes(bytes: Uint8Array): Promise<WasmContract.PrivateKey> {
        const ret = await WasmV4.PrivateKey.from_extended_bytes(bytes);
        return new $outer.PrivateKey(ret);
      }

      static async fromNormalBytes(bytes: Uint8Array): Promise<WasmContract.PrivateKey> {
        const ret = await WasmV4.PrivateKey.from_normal_bytes(bytes);
        return new $outer.PrivateKey(ret);
      }

      async sign(message: Uint8Array): Promise<WasmContract.Ed25519Signature> {
        const ret = await this.wasm.sign(message);
        return new $outer.Ed25519Signature(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.PrivateKey> {
        const ret = await WasmV4.PrivateKey.from_hex(hexStr);
        return new $outer.PrivateKey(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.ProposedProtocolParameterUpdates> {
        const ret = await WasmV4.ProposedProtocolParameterUpdates.from_bytes(bytes);
        return new $outer.ProposedProtocolParameterUpdates(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.ProposedProtocolParameterUpdates> {
        const ret = await WasmV4.ProposedProtocolParameterUpdates.from_hex(hexStr);
        return new $outer.ProposedProtocolParameterUpdates(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.ProposedProtocolParameterUpdates> {
        const ret = await WasmV4.ProposedProtocolParameterUpdates.from_json(json);
        return new $outer.ProposedProtocolParameterUpdates(ret);
      }

      static async new(): Promise<WasmContract.ProposedProtocolParameterUpdates> {
        const ret = await WasmV4.ProposedProtocolParameterUpdates.new();
        return new $outer.ProposedProtocolParameterUpdates(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async insert(key: WasmContract.GenesisHash, value: WasmContract.ProtocolParamUpdate): Promise<Optional<WasmContract.ProtocolParamUpdate>> {
        const ret = await this.wasm.insert(key.wasm, value.wasm);
        if (ret == null) return undefined;
        return new $outer.ProtocolParamUpdate(ret);
      }

      async get(key: WasmContract.GenesisHash): Promise<Optional<WasmContract.ProtocolParamUpdate>> {
        const ret = await this.wasm.get(key.wasm);
        if (ret == null) return undefined;
        return new $outer.ProtocolParamUpdate(ret);
      }

      async keys(): Promise<WasmContract.GenesisHashes> {
        const ret = await this.wasm.keys();
        return new $outer.GenesisHashes(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.ProtocolParamUpdate> {
        const ret = await WasmV4.ProtocolParamUpdate.from_bytes(bytes);
        return new $outer.ProtocolParamUpdate(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.ProtocolParamUpdate> {
        const ret = await WasmV4.ProtocolParamUpdate.from_hex(hexStr);
        return new $outer.ProtocolParamUpdate(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.ProtocolParamUpdate> {
        const ret = await WasmV4.ProtocolParamUpdate.from_json(json);
        return new $outer.ProtocolParamUpdate(ret);
      }

      async setMinfeeA(minfeeA: WasmContract.BigNum): Promise<void> {
        const ret = await this.wasm.set_minfee_a(minfeeA.wasm);
      }

      async minfeeA(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.minfee_a();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret);
      }

      async setMinfeeB(minfeeB: WasmContract.BigNum): Promise<void> {
        const ret = await this.wasm.set_minfee_b(minfeeB.wasm);
      }

      async minfeeB(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.minfee_b();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret);
      }

      async setMaxBlockBodySize(maxBlockBodySize: number): Promise<void> {
        const ret = await this.wasm.set_max_block_body_size(maxBlockBodySize);
      }

      async maxBlockBodySize(): Promise<Optional<number>> {
        const ret = await this.wasm.max_block_body_size();
        if (ret == null) return undefined;
        return ret;
      }

      async setMaxTxSize(maxTxSize: number): Promise<void> {
        const ret = await this.wasm.set_max_tx_size(maxTxSize);
      }

      async maxTxSize(): Promise<Optional<number>> {
        const ret = await this.wasm.max_tx_size();
        if (ret == null) return undefined;
        return ret;
      }

      async setMaxBlockHeaderSize(maxBlockHeaderSize: number): Promise<void> {
        const ret = await this.wasm.set_max_block_header_size(maxBlockHeaderSize);
      }

      async maxBlockHeaderSize(): Promise<Optional<number>> {
        const ret = await this.wasm.max_block_header_size();
        if (ret == null) return undefined;
        return ret;
      }

      async setKeyDeposit(keyDeposit: WasmContract.BigNum): Promise<void> {
        const ret = await this.wasm.set_key_deposit(keyDeposit.wasm);
      }

      async keyDeposit(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.key_deposit();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret);
      }

      async setPoolDeposit(poolDeposit: WasmContract.BigNum): Promise<void> {
        const ret = await this.wasm.set_pool_deposit(poolDeposit.wasm);
      }

      async poolDeposit(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.pool_deposit();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret);
      }

      async setMaxEpoch(maxEpoch: number): Promise<void> {
        const ret = await this.wasm.set_max_epoch(maxEpoch);
      }

      async maxEpoch(): Promise<Optional<number>> {
        const ret = await this.wasm.max_epoch();
        if (ret == null) return undefined;
        return ret;
      }

      async setNOpt(nOpt: number): Promise<void> {
        const ret = await this.wasm.set_n_opt(nOpt);
      }

      async nOpt(): Promise<Optional<number>> {
        const ret = await this.wasm.n_opt();
        if (ret == null) return undefined;
        return ret;
      }

      async setPoolPledgeInfluence(poolPledgeInfluence: WasmContract.UnitInterval): Promise<void> {
        const ret = await this.wasm.set_pool_pledge_influence(poolPledgeInfluence.wasm);
      }

      async poolPledgeInfluence(): Promise<Optional<WasmContract.UnitInterval>> {
        const ret = await this.wasm.pool_pledge_influence();
        if (ret == null) return undefined;
        return new $outer.UnitInterval(ret);
      }

      async setExpansionRate(expansionRate: WasmContract.UnitInterval): Promise<void> {
        const ret = await this.wasm.set_expansion_rate(expansionRate.wasm);
      }

      async expansionRate(): Promise<Optional<WasmContract.UnitInterval>> {
        const ret = await this.wasm.expansion_rate();
        if (ret == null) return undefined;
        return new $outer.UnitInterval(ret);
      }

      async setTreasuryGrowthRate(treasuryGrowthRate: WasmContract.UnitInterval): Promise<void> {
        const ret = await this.wasm.set_treasury_growth_rate(treasuryGrowthRate.wasm);
      }

      async treasuryGrowthRate(): Promise<Optional<WasmContract.UnitInterval>> {
        const ret = await this.wasm.treasury_growth_rate();
        if (ret == null) return undefined;
        return new $outer.UnitInterval(ret);
      }

      async d(): Promise<Optional<WasmContract.UnitInterval>> {
        const ret = await this.wasm.d();
        if (ret == null) return undefined;
        return new $outer.UnitInterval(ret);
      }

      async extraEntropy(): Promise<Optional<WasmContract.Nonce>> {
        const ret = await this.wasm.extra_entropy();
        if (ret == null) return undefined;
        return new $outer.Nonce(ret);
      }

      async setProtocolVersion(protocolVersion: WasmContract.ProtocolVersion): Promise<void> {
        const ret = await this.wasm.set_protocol_version(protocolVersion.wasm);
      }

      async protocolVersion(): Promise<Optional<WasmContract.ProtocolVersion>> {
        const ret = await this.wasm.protocol_version();
        if (ret == null) return undefined;
        return new $outer.ProtocolVersion(ret);
      }

      async setMinPoolCost(minPoolCost: WasmContract.BigNum): Promise<void> {
        const ret = await this.wasm.set_min_pool_cost(minPoolCost.wasm);
      }

      async minPoolCost(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.min_pool_cost();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret);
      }

      async setAdaPerUtxoByte(adaPerUtxoByte: WasmContract.BigNum): Promise<void> {
        const ret = await this.wasm.set_ada_per_utxo_byte(adaPerUtxoByte.wasm);
      }

      async adaPerUtxoByte(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.ada_per_utxo_byte();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret);
      }

      async setCostModels(costModels: WasmContract.Costmdls): Promise<void> {
        const ret = await this.wasm.set_cost_models(costModels.wasm);
      }

      async costModels(): Promise<Optional<WasmContract.Costmdls>> {
        const ret = await this.wasm.cost_models();
        if (ret == null) return undefined;
        return new $outer.Costmdls(ret);
      }

      async setExecutionCosts(executionCosts: WasmContract.ExUnitPrices): Promise<void> {
        const ret = await this.wasm.set_execution_costs(executionCosts.wasm);
      }

      async executionCosts(): Promise<Optional<WasmContract.ExUnitPrices>> {
        const ret = await this.wasm.execution_costs();
        if (ret == null) return undefined;
        return new $outer.ExUnitPrices(ret);
      }

      async setMaxTxExUnits(maxTxExUnits: WasmContract.ExUnits): Promise<void> {
        const ret = await this.wasm.set_max_tx_ex_units(maxTxExUnits.wasm);
      }

      async maxTxExUnits(): Promise<Optional<WasmContract.ExUnits>> {
        const ret = await this.wasm.max_tx_ex_units();
        if (ret == null) return undefined;
        return new $outer.ExUnits(ret);
      }

      async setMaxBlockExUnits(maxBlockExUnits: WasmContract.ExUnits): Promise<void> {
        const ret = await this.wasm.set_max_block_ex_units(maxBlockExUnits.wasm);
      }

      async maxBlockExUnits(): Promise<Optional<WasmContract.ExUnits>> {
        const ret = await this.wasm.max_block_ex_units();
        if (ret == null) return undefined;
        return new $outer.ExUnits(ret);
      }

      async setMaxValueSize(maxValueSize: number): Promise<void> {
        const ret = await this.wasm.set_max_value_size(maxValueSize);
      }

      async maxValueSize(): Promise<Optional<number>> {
        const ret = await this.wasm.max_value_size();
        if (ret == null) return undefined;
        return ret;
      }

      async setCollateralPercentage(collateralPercentage: number): Promise<void> {
        const ret = await this.wasm.set_collateral_percentage(collateralPercentage);
      }

      async collateralPercentage(): Promise<Optional<number>> {
        const ret = await this.wasm.collateral_percentage();
        if (ret == null) return undefined;
        return ret;
      }

      async setMaxCollateralInputs(maxCollateralInputs: number): Promise<void> {
        const ret = await this.wasm.set_max_collateral_inputs(maxCollateralInputs);
      }

      async maxCollateralInputs(): Promise<Optional<number>> {
        const ret = await this.wasm.max_collateral_inputs();
        if (ret == null) return undefined;
        return ret;
      }

      async setPoolVotingThresholds(poolVotingThresholds: WasmContract.PoolVotingThresholds): Promise<void> {
        const ret = await this.wasm.set_pool_voting_thresholds(poolVotingThresholds.wasm);
      }

      async poolVotingThresholds(): Promise<Optional<WasmContract.PoolVotingThresholds>> {
        const ret = await this.wasm.pool_voting_thresholds();
        if (ret == null) return undefined;
        return new $outer.PoolVotingThresholds(ret);
      }

      async setDrepVotingThresholds(drepVotingThresholds: WasmContract.DRepVotingThresholds): Promise<void> {
        const ret = await this.wasm.set_drep_voting_thresholds(drepVotingThresholds.wasm);
      }

      async drepVotingThresholds(): Promise<Optional<WasmContract.DRepVotingThresholds>> {
        const ret = await this.wasm.drep_voting_thresholds();
        if (ret == null) return undefined;
        return new $outer.DRepVotingThresholds(ret);
      }

      async setMinCommitteeSize(minCommitteeSize: number): Promise<void> {
        const ret = await this.wasm.set_min_committee_size(minCommitteeSize);
      }

      async minCommitteeSize(): Promise<Optional<number>> {
        const ret = await this.wasm.min_committee_size();
        if (ret == null) return undefined;
        return ret;
      }

      async setCommitteeTermLimit(committeeTermLimit: number): Promise<void> {
        const ret = await this.wasm.set_committee_term_limit(committeeTermLimit);
      }

      async committeeTermLimit(): Promise<Optional<number>> {
        const ret = await this.wasm.committee_term_limit();
        if (ret == null) return undefined;
        return ret;
      }

      async setGovernanceActionValidityPeriod(governanceActionValidityPeriod: number): Promise<void> {
        const ret = await this.wasm.set_governance_action_validity_period(governanceActionValidityPeriod);
      }

      async governanceActionValidityPeriod(): Promise<Optional<number>> {
        const ret = await this.wasm.governance_action_validity_period();
        if (ret == null) return undefined;
        return ret;
      }

      async setGovernanceActionDeposit(governanceActionDeposit: WasmContract.BigNum): Promise<void> {
        const ret = await this.wasm.set_governance_action_deposit(governanceActionDeposit.wasm);
      }

      async governanceActionDeposit(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.governance_action_deposit();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret);
      }

      async setDrepDeposit(drepDeposit: WasmContract.BigNum): Promise<void> {
        const ret = await this.wasm.set_drep_deposit(drepDeposit.wasm);
      }

      async drepDeposit(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.drep_deposit();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret);
      }

      async setDrepInactivityPeriod(drepInactivityPeriod: number): Promise<void> {
        const ret = await this.wasm.set_drep_inactivity_period(drepInactivityPeriod);
      }

      async drepInactivityPeriod(): Promise<Optional<number>> {
        const ret = await this.wasm.drep_inactivity_period();
        if (ret == null) return undefined;
        return ret;
      }

      async setRefScriptCoinsPerByte(refScriptCoinsPerByte: WasmContract.UnitInterval): Promise<void> {
        const ret = await this.wasm.set_ref_script_coins_per_byte(refScriptCoinsPerByte.wasm);
      }

      async refScriptCoinsPerByte(): Promise<Optional<WasmContract.UnitInterval>> {
        const ret = await this.wasm.ref_script_coins_per_byte();
        if (ret == null) return undefined;
        return new $outer.UnitInterval(ret);
      }

      static async new(): Promise<WasmContract.ProtocolParamUpdate> {
        const ret = await WasmV4.ProtocolParamUpdate.new();
        return new $outer.ProtocolParamUpdate(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.ProtocolVersion> {
        const ret = await WasmV4.ProtocolVersion.from_bytes(bytes);
        return new $outer.ProtocolVersion(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.ProtocolVersion> {
        const ret = await WasmV4.ProtocolVersion.from_hex(hexStr);
        return new $outer.ProtocolVersion(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.ProtocolVersion> {
        const ret = await WasmV4.ProtocolVersion.from_json(json);
        return new $outer.ProtocolVersion(ret);
      }

      async major(): Promise<number> {
        const ret = await this.wasm.major();
        return ret;
      }

      async minor(): Promise<number> {
        const ret = await this.wasm.minor();
        return ret;
      }

      static async new(major: number, minor: number): Promise<WasmContract.ProtocolVersion> {
        const ret = await WasmV4.ProtocolVersion.new(major, minor);
        return new $outer.ProtocolVersion(ret);
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
        return new $outer.PublicKey(ret);
      }

      async toBech32(): Promise<string> {
        const ret = await this.wasm.to_bech32();
        return ret;
      }

      async asBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.as_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.PublicKey> {
        const ret = await WasmV4.PublicKey.from_bytes(bytes);
        return new $outer.PublicKey(ret);
      }

      async verify(data: Uint8Array, signature: WasmContract.Ed25519Signature): Promise<boolean> {
        const ret = await this.wasm.verify(data, signature.wasm);
        return ret;
      }

      async hash(): Promise<WasmContract.Ed25519KeyHash> {
        const ret = await this.wasm.hash();
        return new $outer.Ed25519KeyHash(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.PublicKey> {
        const ret = await WasmV4.PublicKey.from_hex(hexStr);
        return new $outer.PublicKey(ret);
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
        return new $outer.PublicKeys(ret);
      }

      async size(): Promise<number> {
        const ret = await this.wasm.size();
        return ret;
      }

      async get(index: number): Promise<WasmContract.PublicKey> {
        const ret = await this.wasm.get(index);
        return new $outer.PublicKey(ret);
      }

      async add(key: WasmContract.PublicKey): Promise<void> {
        const ret = await this.wasm.add(key.wasm);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Redeemer> {
        const ret = await WasmV4.Redeemer.from_bytes(bytes);
        return new $outer.Redeemer(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Redeemer> {
        const ret = await WasmV4.Redeemer.from_hex(hexStr);
        return new $outer.Redeemer(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.Redeemer> {
        const ret = await WasmV4.Redeemer.from_json(json);
        return new $outer.Redeemer(ret);
      }

      async tag(): Promise<WasmContract.RedeemerTag> {
        const ret = await this.wasm.tag();
        return new $outer.RedeemerTag(ret);
      }

      async index(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.index();
        return new $outer.BigNum(ret);
      }

      async data(): Promise<WasmContract.PlutusData> {
        const ret = await this.wasm.data();
        return new $outer.PlutusData(ret);
      }

      async exUnits(): Promise<WasmContract.ExUnits> {
        const ret = await this.wasm.ex_units();
        return new $outer.ExUnits(ret);
      }

      static async new(tag: WasmContract.RedeemerTag, index: WasmContract.BigNum, data: WasmContract.PlutusData, exUnits: WasmContract.ExUnits): Promise<WasmContract.Redeemer> {
        const ret = await WasmV4.Redeemer.new(tag.wasm, index.wasm, data.wasm, exUnits.wasm);
        return new $outer.Redeemer(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.RedeemerTag> {
        const ret = await WasmV4.RedeemerTag.from_bytes(bytes);
        return new $outer.RedeemerTag(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.RedeemerTag> {
        const ret = await WasmV4.RedeemerTag.from_hex(hexStr);
        return new $outer.RedeemerTag(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.RedeemerTag> {
        const ret = await WasmV4.RedeemerTag.from_json(json);
        return new $outer.RedeemerTag(ret);
      }

      static async newSpend(): Promise<WasmContract.RedeemerTag> {
        const ret = await WasmV4.RedeemerTag.new_spend();
        return new $outer.RedeemerTag(ret);
      }

      static async newMint(): Promise<WasmContract.RedeemerTag> {
        const ret = await WasmV4.RedeemerTag.new_mint();
        return new $outer.RedeemerTag(ret);
      }

      static async newCert(): Promise<WasmContract.RedeemerTag> {
        const ret = await WasmV4.RedeemerTag.new_cert();
        return new $outer.RedeemerTag(ret);
      }

      static async newReward(): Promise<WasmContract.RedeemerTag> {
        const ret = await WasmV4.RedeemerTag.new_reward();
        return new $outer.RedeemerTag(ret);
      }

      static async newVote(): Promise<WasmContract.RedeemerTag> {
        const ret = await WasmV4.RedeemerTag.new_vote();
        return new $outer.RedeemerTag(ret);
      }

      static async newVotingProposal(): Promise<WasmContract.RedeemerTag> {
        const ret = await WasmV4.RedeemerTag.new_voting_proposal();
        return new $outer.RedeemerTag(ret);
      }

      async kind(): Promise<WasmContract.RedeemerTagKind> {
        const ret = await this.wasm.kind();
        return ret;
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Redeemers> {
        const ret = await WasmV4.Redeemers.from_bytes(bytes);
        return new $outer.Redeemers(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Redeemers> {
        const ret = await WasmV4.Redeemers.from_hex(hexStr);
        return new $outer.Redeemers(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.Redeemers> {
        const ret = await WasmV4.Redeemers.from_json(json);
        return new $outer.Redeemers(ret);
      }

      static async new(): Promise<WasmContract.Redeemers> {
        const ret = await WasmV4.Redeemers.new();
        return new $outer.Redeemers(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async get(index: number): Promise<WasmContract.Redeemer> {
        const ret = await this.wasm.get(index);
        return new $outer.Redeemer(ret);
      }

      async add(elem: WasmContract.Redeemer): Promise<void> {
        const ret = await this.wasm.add(elem.wasm);
      }

      async getContainerType(): Promise<WasmContract.CborContainerType> {
        const ret = await this.wasm.get_container_type();
        return ret;
      }

      async totalExUnits(): Promise<WasmContract.ExUnits> {
        const ret = await this.wasm.total_ex_units();
        return new $outer.ExUnits(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Relay> {
        const ret = await WasmV4.Relay.from_bytes(bytes);
        return new $outer.Relay(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Relay> {
        const ret = await WasmV4.Relay.from_hex(hexStr);
        return new $outer.Relay(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.Relay> {
        const ret = await WasmV4.Relay.from_json(json);
        return new $outer.Relay(ret);
      }

      static async newSingleHostAddr(singleHostAddr: WasmContract.SingleHostAddr): Promise<WasmContract.Relay> {
        const ret = await WasmV4.Relay.new_single_host_addr(singleHostAddr.wasm);
        return new $outer.Relay(ret);
      }

      static async newSingleHostName(singleHostName: WasmContract.SingleHostName): Promise<WasmContract.Relay> {
        const ret = await WasmV4.Relay.new_single_host_name(singleHostName.wasm);
        return new $outer.Relay(ret);
      }

      static async newMultiHostName(multiHostName: WasmContract.MultiHostName): Promise<WasmContract.Relay> {
        const ret = await WasmV4.Relay.new_multi_host_name(multiHostName.wasm);
        return new $outer.Relay(ret);
      }

      async kind(): Promise<WasmContract.RelayKind> {
        const ret = await this.wasm.kind();
        return ret;
      }

      async asSingleHostAddr(): Promise<Optional<WasmContract.SingleHostAddr>> {
        const ret = await this.wasm.as_single_host_addr();
        if (ret == null) return undefined;
        return new $outer.SingleHostAddr(ret);
      }

      async asSingleHostName(): Promise<Optional<WasmContract.SingleHostName>> {
        const ret = await this.wasm.as_single_host_name();
        if (ret == null) return undefined;
        return new $outer.SingleHostName(ret);
      }

      async asMultiHostName(): Promise<Optional<WasmContract.MultiHostName>> {
        const ret = await this.wasm.as_multi_host_name();
        if (ret == null) return undefined;
        return new $outer.MultiHostName(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Relays> {
        const ret = await WasmV4.Relays.from_bytes(bytes);
        return new $outer.Relays(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Relays> {
        const ret = await WasmV4.Relays.from_hex(hexStr);
        return new $outer.Relays(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.Relays> {
        const ret = await WasmV4.Relays.from_json(json);
        return new $outer.Relays(ret);
      }

      static async new(): Promise<WasmContract.Relays> {
        const ret = await WasmV4.Relays.new();
        return new $outer.Relays(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async get(index: number): Promise<WasmContract.Relay> {
        const ret = await this.wasm.get(index);
        return new $outer.Relay(ret);
      }

      async add(elem: WasmContract.Relay): Promise<void> {
        const ret = await this.wasm.add(elem.wasm);
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
        return new $outer.RewardAddress(ret);
      }

      async paymentCred(): Promise<WasmContract.Credential> {
        const ret = await this.wasm.payment_cred();
        return new $outer.Credential(ret);
      }

      async toAddress(): Promise<WasmContract.Address> {
        const ret = await this.wasm.to_address();
        return new $outer.Address(ret);
      }

      static async fromAddress(addr: WasmContract.Address): Promise<Optional<WasmContract.RewardAddress>> {
        const ret = await WasmV4.RewardAddress.from_address(addr.wasm);
        if (ret == null) return undefined;
        return new $outer.RewardAddress(ret);
      }

      async networkId(): Promise<number> {
        const ret = await this.wasm.network_id();
        return ret;
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.RewardAddresses> {
        const ret = await WasmV4.RewardAddresses.from_bytes(bytes);
        return new $outer.RewardAddresses(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.RewardAddresses> {
        const ret = await WasmV4.RewardAddresses.from_hex(hexStr);
        return new $outer.RewardAddresses(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.RewardAddresses> {
        const ret = await WasmV4.RewardAddresses.from_json(json);
        return new $outer.RewardAddresses(ret);
      }

      static async new(): Promise<WasmContract.RewardAddresses> {
        const ret = await WasmV4.RewardAddresses.new();
        return new $outer.RewardAddresses(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async get(index: number): Promise<WasmContract.RewardAddress> {
        const ret = await this.wasm.get(index);
        return new $outer.RewardAddress(ret);
      }

      async add(elem: WasmContract.RewardAddress): Promise<void> {
        const ret = await this.wasm.add(elem.wasm);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.ScriptAll> {
        const ret = await WasmV4.ScriptAll.from_bytes(bytes);
        return new $outer.ScriptAll(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.ScriptAll> {
        const ret = await WasmV4.ScriptAll.from_hex(hexStr);
        return new $outer.ScriptAll(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.ScriptAll> {
        const ret = await WasmV4.ScriptAll.from_json(json);
        return new $outer.ScriptAll(ret);
      }

      async nativeScripts(): Promise<WasmContract.NativeScripts> {
        const ret = await this.wasm.native_scripts();
        return new $outer.NativeScripts(ret);
      }

      static async new(nativeScripts: WasmContract.NativeScripts): Promise<WasmContract.ScriptAll> {
        const ret = await WasmV4.ScriptAll.new(nativeScripts.wasm);
        return new $outer.ScriptAll(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.ScriptAny> {
        const ret = await WasmV4.ScriptAny.from_bytes(bytes);
        return new $outer.ScriptAny(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.ScriptAny> {
        const ret = await WasmV4.ScriptAny.from_hex(hexStr);
        return new $outer.ScriptAny(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.ScriptAny> {
        const ret = await WasmV4.ScriptAny.from_json(json);
        return new $outer.ScriptAny(ret);
      }

      async nativeScripts(): Promise<WasmContract.NativeScripts> {
        const ret = await this.wasm.native_scripts();
        return new $outer.NativeScripts(ret);
      }

      static async new(nativeScripts: WasmContract.NativeScripts): Promise<WasmContract.ScriptAny> {
        const ret = await WasmV4.ScriptAny.new(nativeScripts.wasm);
        return new $outer.ScriptAny(ret);
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
        return new $outer.ScriptDataHash(ret);
      }

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      async toBech32(prefix: string): Promise<string> {
        const ret = await this.wasm.to_bech32(prefix);
        return ret;
      }

      static async fromBech32(bechStr: string): Promise<WasmContract.ScriptDataHash> {
        const ret = await WasmV4.ScriptDataHash.from_bech32(bechStr);
        return new $outer.ScriptDataHash(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hex: string): Promise<WasmContract.ScriptDataHash> {
        const ret = await WasmV4.ScriptDataHash.from_hex(hex);
        return new $outer.ScriptDataHash(ret);
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
        return new $outer.ScriptHash(ret);
      }

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      async toBech32(prefix: string): Promise<string> {
        const ret = await this.wasm.to_bech32(prefix);
        return ret;
      }

      static async fromBech32(bechStr: string): Promise<WasmContract.ScriptHash> {
        const ret = await WasmV4.ScriptHash.from_bech32(bechStr);
        return new $outer.ScriptHash(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hex: string): Promise<WasmContract.ScriptHash> {
        const ret = await WasmV4.ScriptHash.from_hex(hex);
        return new $outer.ScriptHash(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.ScriptHashes> {
        const ret = await WasmV4.ScriptHashes.from_bytes(bytes);
        return new $outer.ScriptHashes(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.ScriptHashes> {
        const ret = await WasmV4.ScriptHashes.from_hex(hexStr);
        return new $outer.ScriptHashes(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.ScriptHashes> {
        const ret = await WasmV4.ScriptHashes.from_json(json);
        return new $outer.ScriptHashes(ret);
      }

      static async new(): Promise<WasmContract.ScriptHashes> {
        const ret = await WasmV4.ScriptHashes.new();
        return new $outer.ScriptHashes(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async get(index: number): Promise<WasmContract.ScriptHash> {
        const ret = await this.wasm.get(index);
        return new $outer.ScriptHash(ret);
      }

      async add(elem: WasmContract.ScriptHash): Promise<void> {
        const ret = await this.wasm.add(elem.wasm);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.ScriptNOfK> {
        const ret = await WasmV4.ScriptNOfK.from_bytes(bytes);
        return new $outer.ScriptNOfK(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.ScriptNOfK> {
        const ret = await WasmV4.ScriptNOfK.from_hex(hexStr);
        return new $outer.ScriptNOfK(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.ScriptNOfK> {
        const ret = await WasmV4.ScriptNOfK.from_json(json);
        return new $outer.ScriptNOfK(ret);
      }

      async n(): Promise<number> {
        const ret = await this.wasm.n();
        return ret;
      }

      async nativeScripts(): Promise<WasmContract.NativeScripts> {
        const ret = await this.wasm.native_scripts();
        return new $outer.NativeScripts(ret);
      }

      static async new(n: number, nativeScripts: WasmContract.NativeScripts): Promise<WasmContract.ScriptNOfK> {
        const ret = await WasmV4.ScriptNOfK.new(n, nativeScripts.wasm);
        return new $outer.ScriptNOfK(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.ScriptPubkey> {
        const ret = await WasmV4.ScriptPubkey.from_bytes(bytes);
        return new $outer.ScriptPubkey(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.ScriptPubkey> {
        const ret = await WasmV4.ScriptPubkey.from_hex(hexStr);
        return new $outer.ScriptPubkey(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.ScriptPubkey> {
        const ret = await WasmV4.ScriptPubkey.from_json(json);
        return new $outer.ScriptPubkey(ret);
      }

      async addrKeyhash(): Promise<WasmContract.Ed25519KeyHash> {
        const ret = await this.wasm.addr_keyhash();
        return new $outer.Ed25519KeyHash(ret);
      }

      static async new(addrKeyhash: WasmContract.Ed25519KeyHash): Promise<WasmContract.ScriptPubkey> {
        const ret = await WasmV4.ScriptPubkey.new(addrKeyhash.wasm);
        return new $outer.ScriptPubkey(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.ScriptRef> {
        const ret = await WasmV4.ScriptRef.from_bytes(bytes);
        return new $outer.ScriptRef(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.ScriptRef> {
        const ret = await WasmV4.ScriptRef.from_hex(hexStr);
        return new $outer.ScriptRef(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.ScriptRef> {
        const ret = await WasmV4.ScriptRef.from_json(json);
        return new $outer.ScriptRef(ret);
      }

      static async newNativeScript(nativeScript: WasmContract.NativeScript): Promise<WasmContract.ScriptRef> {
        const ret = await WasmV4.ScriptRef.new_native_script(nativeScript.wasm);
        return new $outer.ScriptRef(ret);
      }

      static async newPlutusScript(plutusScript: WasmContract.PlutusScript): Promise<WasmContract.ScriptRef> {
        const ret = await WasmV4.ScriptRef.new_plutus_script(plutusScript.wasm);
        return new $outer.ScriptRef(ret);
      }

      async isNativeScript(): Promise<boolean> {
        const ret = await this.wasm.is_native_script();
        return ret;
      }

      async isPlutusScript(): Promise<boolean> {
        const ret = await this.wasm.is_plutus_script();
        return ret;
      }

      async nativeScript(): Promise<Optional<WasmContract.NativeScript>> {
        const ret = await this.wasm.native_script();
        if (ret == null) return undefined;
        return new $outer.NativeScript(ret);
      }

      async plutusScript(): Promise<Optional<WasmContract.PlutusScript>> {
        const ret = await this.wasm.plutus_script();
        if (ret == null) return undefined;
        return new $outer.PlutusScript(ret);
      }

      async toUnwrappedBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_unwrapped_bytes();
        return ret;
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.SingleHostAddr> {
        const ret = await WasmV4.SingleHostAddr.from_bytes(bytes);
        return new $outer.SingleHostAddr(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.SingleHostAddr> {
        const ret = await WasmV4.SingleHostAddr.from_hex(hexStr);
        return new $outer.SingleHostAddr(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.SingleHostAddr> {
        const ret = await WasmV4.SingleHostAddr.from_json(json);
        return new $outer.SingleHostAddr(ret);
      }

      async port(): Promise<Optional<number>> {
        const ret = await this.wasm.port();
        if (ret == null) return undefined;
        return ret;
      }

      async ipv4(): Promise<Optional<WasmContract.Ipv4>> {
        const ret = await this.wasm.ipv4();
        if (ret == null) return undefined;
        return new $outer.Ipv4(ret);
      }

      async ipv6(): Promise<Optional<WasmContract.Ipv6>> {
        const ret = await this.wasm.ipv6();
        if (ret == null) return undefined;
        return new $outer.Ipv6(ret);
      }

      static async new(port: Optional<number>, ipv4: Optional<WasmContract.Ipv4>, ipv6: Optional<WasmContract.Ipv6>): Promise<WasmContract.SingleHostAddr> {
        const ret = await WasmV4.SingleHostAddr.new(port, ipv4?.wasm, ipv6?.wasm);
        return new $outer.SingleHostAddr(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.SingleHostName> {
        const ret = await WasmV4.SingleHostName.from_bytes(bytes);
        return new $outer.SingleHostName(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.SingleHostName> {
        const ret = await WasmV4.SingleHostName.from_hex(hexStr);
        return new $outer.SingleHostName(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.SingleHostName> {
        const ret = await WasmV4.SingleHostName.from_json(json);
        return new $outer.SingleHostName(ret);
      }

      async port(): Promise<Optional<number>> {
        const ret = await this.wasm.port();
        if (ret == null) return undefined;
        return ret;
      }

      async dnsName(): Promise<WasmContract.DNSRecordAorAAAA> {
        const ret = await this.wasm.dns_name();
        return new $outer.DNSRecordAorAAAA(ret);
      }

      static async new(port: Optional<number>, dnsName: WasmContract.DNSRecordAorAAAA): Promise<WasmContract.SingleHostName> {
        const ret = await WasmV4.SingleHostName.new(port, dnsName.wasm);
        return new $outer.SingleHostName(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.StakeAndVoteDelegation> {
        const ret = await WasmV4.StakeAndVoteDelegation.from_bytes(bytes);
        return new $outer.StakeAndVoteDelegation(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.StakeAndVoteDelegation> {
        const ret = await WasmV4.StakeAndVoteDelegation.from_hex(hexStr);
        return new $outer.StakeAndVoteDelegation(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.StakeAndVoteDelegation> {
        const ret = await WasmV4.StakeAndVoteDelegation.from_json(json);
        return new $outer.StakeAndVoteDelegation(ret);
      }

      async stakeCredential(): Promise<WasmContract.Credential> {
        const ret = await this.wasm.stake_credential();
        return new $outer.Credential(ret);
      }

      async poolKeyhash(): Promise<WasmContract.Ed25519KeyHash> {
        const ret = await this.wasm.pool_keyhash();
        return new $outer.Ed25519KeyHash(ret);
      }

      async drep(): Promise<WasmContract.DRep> {
        const ret = await this.wasm.drep();
        return new $outer.DRep(ret);
      }

      static async new(stakeCredential: WasmContract.Credential, poolKeyhash: WasmContract.Ed25519KeyHash, drep: WasmContract.DRep): Promise<WasmContract.StakeAndVoteDelegation> {
        const ret = await WasmV4.StakeAndVoteDelegation.new(stakeCredential.wasm, poolKeyhash.wasm, drep.wasm);
        return new $outer.StakeAndVoteDelegation(ret);
      }

      async hasScriptCredentials(): Promise<boolean> {
        const ret = await this.wasm.has_script_credentials();
        return ret;
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.StakeDelegation> {
        const ret = await WasmV4.StakeDelegation.from_bytes(bytes);
        return new $outer.StakeDelegation(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.StakeDelegation> {
        const ret = await WasmV4.StakeDelegation.from_hex(hexStr);
        return new $outer.StakeDelegation(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.StakeDelegation> {
        const ret = await WasmV4.StakeDelegation.from_json(json);
        return new $outer.StakeDelegation(ret);
      }

      async stakeCredential(): Promise<WasmContract.Credential> {
        const ret = await this.wasm.stake_credential();
        return new $outer.Credential(ret);
      }

      async poolKeyhash(): Promise<WasmContract.Ed25519KeyHash> {
        const ret = await this.wasm.pool_keyhash();
        return new $outer.Ed25519KeyHash(ret);
      }

      static async new(stakeCredential: WasmContract.Credential, poolKeyhash: WasmContract.Ed25519KeyHash): Promise<WasmContract.StakeDelegation> {
        const ret = await WasmV4.StakeDelegation.new(stakeCredential.wasm, poolKeyhash.wasm);
        return new $outer.StakeDelegation(ret);
      }

      async hasScriptCredentials(): Promise<boolean> {
        const ret = await this.wasm.has_script_credentials();
        return ret;
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.StakeDeregistration> {
        const ret = await WasmV4.StakeDeregistration.from_bytes(bytes);
        return new $outer.StakeDeregistration(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.StakeDeregistration> {
        const ret = await WasmV4.StakeDeregistration.from_hex(hexStr);
        return new $outer.StakeDeregistration(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.StakeDeregistration> {
        const ret = await WasmV4.StakeDeregistration.from_json(json);
        return new $outer.StakeDeregistration(ret);
      }

      async stakeCredential(): Promise<WasmContract.Credential> {
        const ret = await this.wasm.stake_credential();
        return new $outer.Credential(ret);
      }

      async coin(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.coin();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret);
      }

      static async new(stakeCredential: WasmContract.Credential): Promise<WasmContract.StakeDeregistration> {
        const ret = await WasmV4.StakeDeregistration.new(stakeCredential.wasm);
        return new $outer.StakeDeregistration(ret);
      }

      static async newWithExplicitRefund(stakeCredential: WasmContract.Credential, coin: WasmContract.BigNum): Promise<WasmContract.StakeDeregistration> {
        const ret = await WasmV4.StakeDeregistration.new_with_explicit_refund(stakeCredential.wasm, coin.wasm);
        return new $outer.StakeDeregistration(ret);
      }

      async hasScriptCredentials(): Promise<boolean> {
        const ret = await this.wasm.has_script_credentials();
        return ret;
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.StakeRegistration> {
        const ret = await WasmV4.StakeRegistration.from_bytes(bytes);
        return new $outer.StakeRegistration(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.StakeRegistration> {
        const ret = await WasmV4.StakeRegistration.from_hex(hexStr);
        return new $outer.StakeRegistration(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.StakeRegistration> {
        const ret = await WasmV4.StakeRegistration.from_json(json);
        return new $outer.StakeRegistration(ret);
      }

      async stakeCredential(): Promise<WasmContract.Credential> {
        const ret = await this.wasm.stake_credential();
        return new $outer.Credential(ret);
      }

      async coin(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.coin();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret);
      }

      static async new(stakeCredential: WasmContract.Credential): Promise<WasmContract.StakeRegistration> {
        const ret = await WasmV4.StakeRegistration.new(stakeCredential.wasm);
        return new $outer.StakeRegistration(ret);
      }

      static async newWithExplicitDeposit(stakeCredential: WasmContract.Credential, coin: WasmContract.BigNum): Promise<WasmContract.StakeRegistration> {
        const ret = await WasmV4.StakeRegistration.new_with_explicit_deposit(stakeCredential.wasm, coin.wasm);
        return new $outer.StakeRegistration(ret);
      }

      async hasScriptCredentials(): Promise<boolean> {
        const ret = await this.wasm.has_script_credentials();
        return ret;
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.StakeRegistrationAndDelegation> {
        const ret = await WasmV4.StakeRegistrationAndDelegation.from_bytes(bytes);
        return new $outer.StakeRegistrationAndDelegation(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.StakeRegistrationAndDelegation> {
        const ret = await WasmV4.StakeRegistrationAndDelegation.from_hex(hexStr);
        return new $outer.StakeRegistrationAndDelegation(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.StakeRegistrationAndDelegation> {
        const ret = await WasmV4.StakeRegistrationAndDelegation.from_json(json);
        return new $outer.StakeRegistrationAndDelegation(ret);
      }

      async stakeCredential(): Promise<WasmContract.Credential> {
        const ret = await this.wasm.stake_credential();
        return new $outer.Credential(ret);
      }

      async poolKeyhash(): Promise<WasmContract.Ed25519KeyHash> {
        const ret = await this.wasm.pool_keyhash();
        return new $outer.Ed25519KeyHash(ret);
      }

      async coin(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.coin();
        return new $outer.BigNum(ret);
      }

      static async new(stakeCredential: WasmContract.Credential, poolKeyhash: WasmContract.Ed25519KeyHash, coin: WasmContract.BigNum): Promise<WasmContract.StakeRegistrationAndDelegation> {
        const ret = await WasmV4.StakeRegistrationAndDelegation.new(stakeCredential.wasm, poolKeyhash.wasm, coin.wasm);
        return new $outer.StakeRegistrationAndDelegation(ret);
      }

      async hasScriptCredentials(): Promise<boolean> {
        const ret = await this.wasm.has_script_credentials();
        return ret;
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.StakeVoteRegistrationAndDelegation> {
        const ret = await WasmV4.StakeVoteRegistrationAndDelegation.from_bytes(bytes);
        return new $outer.StakeVoteRegistrationAndDelegation(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.StakeVoteRegistrationAndDelegation> {
        const ret = await WasmV4.StakeVoteRegistrationAndDelegation.from_hex(hexStr);
        return new $outer.StakeVoteRegistrationAndDelegation(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.StakeVoteRegistrationAndDelegation> {
        const ret = await WasmV4.StakeVoteRegistrationAndDelegation.from_json(json);
        return new $outer.StakeVoteRegistrationAndDelegation(ret);
      }

      async stakeCredential(): Promise<WasmContract.Credential> {
        const ret = await this.wasm.stake_credential();
        return new $outer.Credential(ret);
      }

      async poolKeyhash(): Promise<WasmContract.Ed25519KeyHash> {
        const ret = await this.wasm.pool_keyhash();
        return new $outer.Ed25519KeyHash(ret);
      }

      async drep(): Promise<WasmContract.DRep> {
        const ret = await this.wasm.drep();
        return new $outer.DRep(ret);
      }

      async coin(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.coin();
        return new $outer.BigNum(ret);
      }

      static async new(stakeCredential: WasmContract.Credential, poolKeyhash: WasmContract.Ed25519KeyHash, drep: WasmContract.DRep, coin: WasmContract.BigNum): Promise<WasmContract.StakeVoteRegistrationAndDelegation> {
        const ret = await WasmV4.StakeVoteRegistrationAndDelegation.new(stakeCredential.wasm, poolKeyhash.wasm, drep.wasm, coin.wasm);
        return new $outer.StakeVoteRegistrationAndDelegation(ret);
      }

      async hasScriptCredentials(): Promise<boolean> {
        const ret = await this.wasm.has_script_credentials();
        return ret;
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
        return new $outer.Strings(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async get(index: number): Promise<string> {
        const ret = await this.wasm.get(index);
        return ret;
      }

      async add(elem: string): Promise<void> {
        const ret = await this.wasm.add(elem);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.TimelockExpiry> {
        const ret = await WasmV4.TimelockExpiry.from_bytes(bytes);
        return new $outer.TimelockExpiry(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.TimelockExpiry> {
        const ret = await WasmV4.TimelockExpiry.from_hex(hexStr);
        return new $outer.TimelockExpiry(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.TimelockExpiry> {
        const ret = await WasmV4.TimelockExpiry.from_json(json);
        return new $outer.TimelockExpiry(ret);
      }

      async slot(): Promise<number> {
        const ret = await this.wasm.slot();
        return ret;
      }

      async slotBignum(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.slot_bignum();
        return new $outer.BigNum(ret);
      }

      static async new(slot: number): Promise<WasmContract.TimelockExpiry> {
        const ret = await WasmV4.TimelockExpiry.new(slot);
        return new $outer.TimelockExpiry(ret);
      }

      static async newTimelockexpiry(slot: WasmContract.BigNum): Promise<WasmContract.TimelockExpiry> {
        const ret = await WasmV4.TimelockExpiry.new_timelockexpiry(slot.wasm);
        return new $outer.TimelockExpiry(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.TimelockStart> {
        const ret = await WasmV4.TimelockStart.from_bytes(bytes);
        return new $outer.TimelockStart(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.TimelockStart> {
        const ret = await WasmV4.TimelockStart.from_hex(hexStr);
        return new $outer.TimelockStart(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.TimelockStart> {
        const ret = await WasmV4.TimelockStart.from_json(json);
        return new $outer.TimelockStart(ret);
      }

      async slot(): Promise<number> {
        const ret = await this.wasm.slot();
        return ret;
      }

      async slotBignum(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.slot_bignum();
        return new $outer.BigNum(ret);
      }

      static async new(slot: number): Promise<WasmContract.TimelockStart> {
        const ret = await WasmV4.TimelockStart.new(slot);
        return new $outer.TimelockStart(ret);
      }

      static async newTimelockstart(slot: WasmContract.BigNum): Promise<WasmContract.TimelockStart> {
        const ret = await WasmV4.TimelockStart.new_timelockstart(slot.wasm);
        return new $outer.TimelockStart(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Transaction> {
        const ret = await WasmV4.Transaction.from_bytes(bytes);
        return new $outer.Transaction(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Transaction> {
        const ret = await WasmV4.Transaction.from_hex(hexStr);
        return new $outer.Transaction(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.Transaction> {
        const ret = await WasmV4.Transaction.from_json(json);
        return new $outer.Transaction(ret);
      }

      async body(): Promise<WasmContract.TransactionBody> {
        const ret = await this.wasm.body();
        return new $outer.TransactionBody(ret);
      }

      async witnessSet(): Promise<WasmContract.TransactionWitnessSet> {
        const ret = await this.wasm.witness_set();
        return new $outer.TransactionWitnessSet(ret);
      }

      async isValid(): Promise<boolean> {
        const ret = await this.wasm.is_valid();
        return ret;
      }

      async auxiliaryData(): Promise<Optional<WasmContract.AuxiliaryData>> {
        const ret = await this.wasm.auxiliary_data();
        if (ret == null) return undefined;
        return new $outer.AuxiliaryData(ret);
      }

      async setIsValid(valid: boolean): Promise<void> {
        const ret = await this.wasm.set_is_valid(valid);
      }

      static async new(body: WasmContract.TransactionBody, witnessSet: WasmContract.TransactionWitnessSet, auxiliaryData: Optional<WasmContract.AuxiliaryData>): Promise<WasmContract.Transaction> {
        const ret = await WasmV4.Transaction.new(body.wasm, witnessSet.wasm, auxiliaryData?.wasm);
        return new $outer.Transaction(ret);
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

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async get(index: number): Promise<WasmContract.Transaction> {
        const ret = await this.wasm.get(index);
        return new $outer.Transaction(ret);
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

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async get(index: number): Promise<WasmContract.TransactionBatch> {
        const ret = await this.wasm.get(index);
        return new $outer.TransactionBatch(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.TransactionBodies> {
        const ret = await WasmV4.TransactionBodies.from_bytes(bytes);
        return new $outer.TransactionBodies(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.TransactionBodies> {
        const ret = await WasmV4.TransactionBodies.from_hex(hexStr);
        return new $outer.TransactionBodies(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.TransactionBodies> {
        const ret = await WasmV4.TransactionBodies.from_json(json);
        return new $outer.TransactionBodies(ret);
      }

      static async new(): Promise<WasmContract.TransactionBodies> {
        const ret = await WasmV4.TransactionBodies.new();
        return new $outer.TransactionBodies(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async get(index: number): Promise<WasmContract.TransactionBody> {
        const ret = await this.wasm.get(index);
        return new $outer.TransactionBody(ret);
      }

      async add(elem: WasmContract.TransactionBody): Promise<void> {
        const ret = await this.wasm.add(elem.wasm);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.TransactionBody> {
        const ret = await WasmV4.TransactionBody.from_bytes(bytes);
        return new $outer.TransactionBody(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.TransactionBody> {
        const ret = await WasmV4.TransactionBody.from_hex(hexStr);
        return new $outer.TransactionBody(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.TransactionBody> {
        const ret = await WasmV4.TransactionBody.from_json(json);
        return new $outer.TransactionBody(ret);
      }

      async inputs(): Promise<WasmContract.TransactionInputs> {
        const ret = await this.wasm.inputs();
        return new $outer.TransactionInputs(ret);
      }

      async outputs(): Promise<WasmContract.TransactionOutputs> {
        const ret = await this.wasm.outputs();
        return new $outer.TransactionOutputs(ret);
      }

      async fee(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.fee();
        return new $outer.BigNum(ret);
      }

      async ttl(): Promise<Optional<number>> {
        const ret = await this.wasm.ttl();
        if (ret == null) return undefined;
        return ret;
      }

      async ttlBignum(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.ttl_bignum();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret);
      }

      async setTtl(ttl: WasmContract.BigNum): Promise<void> {
        const ret = await this.wasm.set_ttl(ttl.wasm);
      }

      async removeTtl(): Promise<void> {
        const ret = await this.wasm.remove_ttl();
      }

      async setCerts(certs: WasmContract.Certificates): Promise<void> {
        const ret = await this.wasm.set_certs(certs.wasm);
      }

      async certs(): Promise<Optional<WasmContract.Certificates>> {
        const ret = await this.wasm.certs();
        if (ret == null) return undefined;
        return new $outer.Certificates(ret);
      }

      async setWithdrawals(withdrawals: WasmContract.Withdrawals): Promise<void> {
        const ret = await this.wasm.set_withdrawals(withdrawals.wasm);
      }

      async withdrawals(): Promise<Optional<WasmContract.Withdrawals>> {
        const ret = await this.wasm.withdrawals();
        if (ret == null) return undefined;
        return new $outer.Withdrawals(ret);
      }

      async setUpdate(update: WasmContract.Update): Promise<void> {
        const ret = await this.wasm.set_update(update.wasm);
      }

      async update(): Promise<Optional<WasmContract.Update>> {
        const ret = await this.wasm.update();
        if (ret == null) return undefined;
        return new $outer.Update(ret);
      }

      async setAuxiliaryDataHash(auxiliaryDataHash: WasmContract.AuxiliaryDataHash): Promise<void> {
        const ret = await this.wasm.set_auxiliary_data_hash(auxiliaryDataHash.wasm);
      }

      async auxiliaryDataHash(): Promise<Optional<WasmContract.AuxiliaryDataHash>> {
        const ret = await this.wasm.auxiliary_data_hash();
        if (ret == null) return undefined;
        return new $outer.AuxiliaryDataHash(ret);
      }

      async setValidityStartInterval(validityStartInterval: number): Promise<void> {
        const ret = await this.wasm.set_validity_start_interval(validityStartInterval);
      }

      async setValidityStartIntervalBignum(validityStartInterval: WasmContract.BigNum): Promise<void> {
        const ret = await this.wasm.set_validity_start_interval_bignum(validityStartInterval.wasm);
      }

      async validityStartIntervalBignum(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.validity_start_interval_bignum();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret);
      }

      async validityStartInterval(): Promise<Optional<number>> {
        const ret = await this.wasm.validity_start_interval();
        if (ret == null) return undefined;
        return ret;
      }

      async setMint(mint: WasmContract.Mint): Promise<void> {
        const ret = await this.wasm.set_mint(mint.wasm);
      }

      async mint(): Promise<Optional<WasmContract.Mint>> {
        const ret = await this.wasm.mint();
        if (ret == null) return undefined;
        return new $outer.Mint(ret);
      }

      async setReferenceInputs(referenceInputs: WasmContract.TransactionInputs): Promise<void> {
        const ret = await this.wasm.set_reference_inputs(referenceInputs.wasm);
      }

      async referenceInputs(): Promise<Optional<WasmContract.TransactionInputs>> {
        const ret = await this.wasm.reference_inputs();
        if (ret == null) return undefined;
        return new $outer.TransactionInputs(ret);
      }

      async setScriptDataHash(scriptDataHash: WasmContract.ScriptDataHash): Promise<void> {
        const ret = await this.wasm.set_script_data_hash(scriptDataHash.wasm);
      }

      async scriptDataHash(): Promise<Optional<WasmContract.ScriptDataHash>> {
        const ret = await this.wasm.script_data_hash();
        if (ret == null) return undefined;
        return new $outer.ScriptDataHash(ret);
      }

      async setCollateral(collateral: WasmContract.TransactionInputs): Promise<void> {
        const ret = await this.wasm.set_collateral(collateral.wasm);
      }

      async collateral(): Promise<Optional<WasmContract.TransactionInputs>> {
        const ret = await this.wasm.collateral();
        if (ret == null) return undefined;
        return new $outer.TransactionInputs(ret);
      }

      async setRequiredSigners(requiredSigners: WasmContract.Ed25519KeyHashes): Promise<void> {
        const ret = await this.wasm.set_required_signers(requiredSigners.wasm);
      }

      async requiredSigners(): Promise<Optional<WasmContract.Ed25519KeyHashes>> {
        const ret = await this.wasm.required_signers();
        if (ret == null) return undefined;
        return new $outer.Ed25519KeyHashes(ret);
      }

      async setNetworkId(networkId: WasmContract.NetworkId): Promise<void> {
        const ret = await this.wasm.set_network_id(networkId.wasm);
      }

      async networkId(): Promise<Optional<WasmContract.NetworkId>> {
        const ret = await this.wasm.network_id();
        if (ret == null) return undefined;
        return new $outer.NetworkId(ret);
      }

      async setCollateralReturn(collateralReturn: WasmContract.TransactionOutput): Promise<void> {
        const ret = await this.wasm.set_collateral_return(collateralReturn.wasm);
      }

      async collateralReturn(): Promise<Optional<WasmContract.TransactionOutput>> {
        const ret = await this.wasm.collateral_return();
        if (ret == null) return undefined;
        return new $outer.TransactionOutput(ret);
      }

      async setTotalCollateral(totalCollateral: WasmContract.BigNum): Promise<void> {
        const ret = await this.wasm.set_total_collateral(totalCollateral.wasm);
      }

      async totalCollateral(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.total_collateral();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret);
      }

      async setVotingProcedures(votingProcedures: WasmContract.VotingProcedures): Promise<void> {
        const ret = await this.wasm.set_voting_procedures(votingProcedures.wasm);
      }

      async votingProcedures(): Promise<Optional<WasmContract.VotingProcedures>> {
        const ret = await this.wasm.voting_procedures();
        if (ret == null) return undefined;
        return new $outer.VotingProcedures(ret);
      }

      async setVotingProposals(votingProposals: WasmContract.VotingProposals): Promise<void> {
        const ret = await this.wasm.set_voting_proposals(votingProposals.wasm);
      }

      async votingProposals(): Promise<Optional<WasmContract.VotingProposals>> {
        const ret = await this.wasm.voting_proposals();
        if (ret == null) return undefined;
        return new $outer.VotingProposals(ret);
      }

      async setDonation(donation: WasmContract.BigNum): Promise<void> {
        const ret = await this.wasm.set_donation(donation.wasm);
      }

      async donation(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.donation();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret);
      }

      async setCurrentTreasuryValue(currentTreasuryValue: WasmContract.BigNum): Promise<void> {
        const ret = await this.wasm.set_current_treasury_value(currentTreasuryValue.wasm);
      }

      async currentTreasuryValue(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.current_treasury_value();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret);
      }

      static async new(inputs: WasmContract.TransactionInputs, outputs: WasmContract.TransactionOutputs, fee: WasmContract.BigNum, ttl: Optional<number>): Promise<WasmContract.TransactionBody> {
        const ret = await WasmV4.TransactionBody.new(inputs.wasm, outputs.wasm, fee.wasm, ttl);
        return new $outer.TransactionBody(ret);
      }

      static async newTxBody(inputs: WasmContract.TransactionInputs, outputs: WasmContract.TransactionOutputs, fee: WasmContract.BigNum): Promise<WasmContract.TransactionBody> {
        const ret = await WasmV4.TransactionBody.new_tx_body(inputs.wasm, outputs.wasm, fee.wasm);
        return new $outer.TransactionBody(ret);
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

      async addInputsFrom(inputs: WasmContract.TransactionUnspentOutputs, strategy: WasmContract.CoinSelectionStrategyCIP2): Promise<void> {
        const ret = await this.wasm.add_inputs_from(inputs.wasm, strategy);
      }

      async setInputs(inputs: WasmContract.TxInputsBuilder): Promise<void> {
        const ret = await this.wasm.set_inputs(inputs.wasm);
      }

      async setCollateral(collateral: WasmContract.TxInputsBuilder): Promise<void> {
        const ret = await this.wasm.set_collateral(collateral.wasm);
      }

      async setCollateralReturn(collateralReturn: WasmContract.TransactionOutput): Promise<void> {
        const ret = await this.wasm.set_collateral_return(collateralReturn.wasm);
      }

      async removeCollateralReturn(): Promise<void> {
        const ret = await this.wasm.remove_collateral_return();
      }

      async setCollateralReturnAndTotal(collateralReturn: WasmContract.TransactionOutput): Promise<void> {
        const ret = await this.wasm.set_collateral_return_and_total(collateralReturn.wasm);
      }

      async setTotalCollateral(totalCollateral: WasmContract.BigNum): Promise<void> {
        const ret = await this.wasm.set_total_collateral(totalCollateral.wasm);
      }

      async removeTotalCollateral(): Promise<void> {
        const ret = await this.wasm.remove_total_collateral();
      }

      async setTotalCollateralAndReturn(totalCollateral: WasmContract.BigNum, returnAddress: WasmContract.Address): Promise<void> {
        const ret = await this.wasm.set_total_collateral_and_return(totalCollateral.wasm, returnAddress.wasm);
      }

      async addReferenceInput(referenceInput: WasmContract.TransactionInput): Promise<void> {
        const ret = await this.wasm.add_reference_input(referenceInput.wasm);
      }

      async addScriptReferenceInput(referenceInput: WasmContract.TransactionInput, scriptSize: number): Promise<void> {
        const ret = await this.wasm.add_script_reference_input(referenceInput.wasm, scriptSize);
      }

      async addKeyInput(hash: WasmContract.Ed25519KeyHash, input: WasmContract.TransactionInput, amount: WasmContract.Value): Promise<void> {
        const ret = await this.wasm.add_key_input(hash.wasm, input.wasm, amount.wasm);
      }

      async addNativeScriptInput(script: WasmContract.NativeScript, input: WasmContract.TransactionInput, amount: WasmContract.Value): Promise<void> {
        const ret = await this.wasm.add_native_script_input(script.wasm, input.wasm, amount.wasm);
      }

      async addPlutusScriptInput(witness: WasmContract.PlutusWitness, input: WasmContract.TransactionInput, amount: WasmContract.Value): Promise<void> {
        const ret = await this.wasm.add_plutus_script_input(witness.wasm, input.wasm, amount.wasm);
      }

      async addBootstrapInput(hash: WasmContract.ByronAddress, input: WasmContract.TransactionInput, amount: WasmContract.Value): Promise<void> {
        const ret = await this.wasm.add_bootstrap_input(hash.wasm, input.wasm, amount.wasm);
      }

      async addRegularInput(address: WasmContract.Address, input: WasmContract.TransactionInput, amount: WasmContract.Value): Promise<void> {
        const ret = await this.wasm.add_regular_input(address.wasm, input.wasm, amount.wasm);
      }

      async addInputsFromAndChange(inputs: WasmContract.TransactionUnspentOutputs, strategy: WasmContract.CoinSelectionStrategyCIP2, changeConfig: WasmContract.ChangeConfig): Promise<boolean> {
        const ret = await this.wasm.add_inputs_from_and_change(inputs.wasm, strategy, changeConfig.wasm);
        return ret;
      }

      async addInputsFromAndChangeWithCollateralReturn(inputs: WasmContract.TransactionUnspentOutputs, strategy: WasmContract.CoinSelectionStrategyCIP2, changeConfig: WasmContract.ChangeConfig, collateralPercentage: WasmContract.BigNum): Promise<void> {
        const ret = await this.wasm.add_inputs_from_and_change_with_collateral_return(inputs.wasm, strategy, changeConfig.wasm, collateralPercentage.wasm);
      }

      async getNativeInputScripts(): Promise<Optional<WasmContract.NativeScripts>> {
        const ret = await this.wasm.get_native_input_scripts();
        if (ret == null) return undefined;
        return new $outer.NativeScripts(ret);
      }

      async getPlutusInputScripts(): Promise<Optional<WasmContract.PlutusWitnesses>> {
        const ret = await this.wasm.get_plutus_input_scripts();
        if (ret == null) return undefined;
        return new $outer.PlutusWitnesses(ret);
      }

      async feeForInput(address: WasmContract.Address, input: WasmContract.TransactionInput, amount: WasmContract.Value): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.fee_for_input(address.wasm, input.wasm, amount.wasm);
        return new $outer.BigNum(ret);
      }

      async addOutput(output: WasmContract.TransactionOutput): Promise<void> {
        const ret = await this.wasm.add_output(output.wasm);
      }

      async feeForOutput(output: WasmContract.TransactionOutput): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.fee_for_output(output.wasm);
        return new $outer.BigNum(ret);
      }

      async setFee(fee: WasmContract.BigNum): Promise<void> {
        const ret = await this.wasm.set_fee(fee.wasm);
      }

      async setMinFee(fee: WasmContract.BigNum): Promise<void> {
        const ret = await this.wasm.set_min_fee(fee.wasm);
      }

      async setTtl(ttl: number): Promise<void> {
        const ret = await this.wasm.set_ttl(ttl);
      }

      async setTtlBignum(ttl: WasmContract.BigNum): Promise<void> {
        const ret = await this.wasm.set_ttl_bignum(ttl.wasm);
      }

      async removeTtl(): Promise<void> {
        const ret = await this.wasm.remove_ttl();
      }

      async setValidityStartInterval(validityStartInterval: number): Promise<void> {
        const ret = await this.wasm.set_validity_start_interval(validityStartInterval);
      }

      async setValidityStartIntervalBignum(validityStartInterval: WasmContract.BigNum): Promise<void> {
        const ret = await this.wasm.set_validity_start_interval_bignum(validityStartInterval.wasm);
      }

      async removeValidityStartInterval(): Promise<void> {
        const ret = await this.wasm.remove_validity_start_interval();
      }

      async setCerts(certs: WasmContract.Certificates): Promise<void> {
        const ret = await this.wasm.set_certs(certs.wasm);
      }

      async removeCerts(): Promise<void> {
        const ret = await this.wasm.remove_certs();
      }

      async setCertsBuilder(certs: WasmContract.CertificatesBuilder): Promise<void> {
        const ret = await this.wasm.set_certs_builder(certs.wasm);
      }

      async setWithdrawals(withdrawals: WasmContract.Withdrawals): Promise<void> {
        const ret = await this.wasm.set_withdrawals(withdrawals.wasm);
      }

      async setWithdrawalsBuilder(withdrawals: WasmContract.WithdrawalsBuilder): Promise<void> {
        const ret = await this.wasm.set_withdrawals_builder(withdrawals.wasm);
      }

      async setVotingBuilder(votingBuilder: WasmContract.VotingBuilder): Promise<void> {
        const ret = await this.wasm.set_voting_builder(votingBuilder.wasm);
      }

      async setVotingProposalBuilder(votingProposalBuilder: WasmContract.VotingProposalBuilder): Promise<void> {
        const ret = await this.wasm.set_voting_proposal_builder(votingProposalBuilder.wasm);
      }

      async removeWithdrawals(): Promise<void> {
        const ret = await this.wasm.remove_withdrawals();
      }

      async getAuxiliaryData(): Promise<Optional<WasmContract.AuxiliaryData>> {
        const ret = await this.wasm.get_auxiliary_data();
        if (ret == null) return undefined;
        return new $outer.AuxiliaryData(ret);
      }

      async setAuxiliaryData(auxiliaryData: WasmContract.AuxiliaryData): Promise<void> {
        const ret = await this.wasm.set_auxiliary_data(auxiliaryData.wasm);
      }

      async removeAuxiliaryData(): Promise<void> {
        const ret = await this.wasm.remove_auxiliary_data();
      }

      async setMetadata(metadata: WasmContract.GeneralTransactionMetadata): Promise<void> {
        const ret = await this.wasm.set_metadata(metadata.wasm);
      }

      async addMetadatum(key: WasmContract.BigNum, val: WasmContract.TransactionMetadatum): Promise<void> {
        const ret = await this.wasm.add_metadatum(key.wasm, val.wasm);
      }

      async addJsonMetadatum(key: WasmContract.BigNum, val: string): Promise<void> {
        const ret = await this.wasm.add_json_metadatum(key.wasm, val);
      }

      async addJsonMetadatumWithSchema(key: WasmContract.BigNum, val: string, schema: WasmContract.MetadataJsonSchema): Promise<void> {
        const ret = await this.wasm.add_json_metadatum_with_schema(key.wasm, val, schema);
      }

      async setMintBuilder(mintBuilder: WasmContract.MintBuilder): Promise<void> {
        const ret = await this.wasm.set_mint_builder(mintBuilder.wasm);
      }

      async removeMintBuilder(): Promise<void> {
        const ret = await this.wasm.remove_mint_builder();
      }

      async getMintBuilder(): Promise<Optional<WasmContract.MintBuilder>> {
        const ret = await this.wasm.get_mint_builder();
        if (ret == null) return undefined;
        return new $outer.MintBuilder(ret);
      }

      async setMint(mint: WasmContract.Mint, mintScripts: WasmContract.NativeScripts): Promise<void> {
        const ret = await this.wasm.set_mint(mint.wasm, mintScripts.wasm);
      }

      async getMint(): Promise<Optional<WasmContract.Mint>> {
        const ret = await this.wasm.get_mint();
        if (ret == null) return undefined;
        return new $outer.Mint(ret);
      }

      async getMintScripts(): Promise<Optional<WasmContract.NativeScripts>> {
        const ret = await this.wasm.get_mint_scripts();
        if (ret == null) return undefined;
        return new $outer.NativeScripts(ret);
      }

      async setMintAsset(policyScript: WasmContract.NativeScript, mintAssets: WasmContract.MintAssets): Promise<void> {
        const ret = await this.wasm.set_mint_asset(policyScript.wasm, mintAssets.wasm);
      }

      async addMintAsset(policyScript: WasmContract.NativeScript, assetName: WasmContract.AssetName, amount: WasmContract.Int): Promise<void> {
        const ret = await this.wasm.add_mint_asset(policyScript.wasm, assetName.wasm, amount.wasm);
      }

      async addMintAssetAndOutput(policyScript: WasmContract.NativeScript, assetName: WasmContract.AssetName, amount: WasmContract.Int, outputBuilder: WasmContract.TransactionOutputAmountBuilder, outputCoin: WasmContract.BigNum): Promise<void> {
        const ret = await this.wasm.add_mint_asset_and_output(policyScript.wasm, assetName.wasm, amount.wasm, outputBuilder.wasm, outputCoin.wasm);
      }

      async addMintAssetAndOutputMinRequiredCoin(policyScript: WasmContract.NativeScript, assetName: WasmContract.AssetName, amount: WasmContract.Int, outputBuilder: WasmContract.TransactionOutputAmountBuilder): Promise<void> {
        const ret = await this.wasm.add_mint_asset_and_output_min_required_coin(policyScript.wasm, assetName.wasm, amount.wasm, outputBuilder.wasm);
      }

      async addExtraWitnessDatum(datum: WasmContract.PlutusData): Promise<void> {
        const ret = await this.wasm.add_extra_witness_datum(datum.wasm);
      }

      async getExtraWitnessDatums(): Promise<Optional<WasmContract.PlutusList>> {
        const ret = await this.wasm.get_extra_witness_datums();
        if (ret == null) return undefined;
        return new $outer.PlutusList(ret);
      }

      async setDonation(donation: WasmContract.BigNum): Promise<void> {
        const ret = await this.wasm.set_donation(donation.wasm);
      }

      async getDonation(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.get_donation();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret);
      }

      async setCurrentTreasuryValue(currentTreasuryValue: WasmContract.BigNum): Promise<void> {
        const ret = await this.wasm.set_current_treasury_value(currentTreasuryValue.wasm);
      }

      async getCurrentTreasuryValue(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.get_current_treasury_value();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret);
      }

      static async new(cfg: WasmContract.TransactionBuilderConfig): Promise<WasmContract.TransactionBuilder> {
        const ret = await WasmV4.TransactionBuilder.new(cfg.wasm);
        return new $outer.TransactionBuilder(ret);
      }

      async getReferenceInputs(): Promise<WasmContract.TransactionInputs> {
        const ret = await this.wasm.get_reference_inputs();
        return new $outer.TransactionInputs(ret);
      }

      async getExplicitInput(): Promise<WasmContract.Value> {
        const ret = await this.wasm.get_explicit_input();
        return new $outer.Value(ret);
      }

      async getImplicitInput(): Promise<WasmContract.Value> {
        const ret = await this.wasm.get_implicit_input();
        return new $outer.Value(ret);
      }

      async getTotalInput(): Promise<WasmContract.Value> {
        const ret = await this.wasm.get_total_input();
        return new $outer.Value(ret);
      }

      async getTotalOutput(): Promise<WasmContract.Value> {
        const ret = await this.wasm.get_total_output();
        return new $outer.Value(ret);
      }

      async getExplicitOutput(): Promise<WasmContract.Value> {
        const ret = await this.wasm.get_explicit_output();
        return new $outer.Value(ret);
      }

      async getDeposit(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.get_deposit();
        return new $outer.BigNum(ret);
      }

      async getFeeIfSet(): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.get_fee_if_set();
        if (ret == null) return undefined;
        return new $outer.BigNum(ret);
      }

      async addChangeIfNeeded(address: WasmContract.Address): Promise<boolean> {
        const ret = await this.wasm.add_change_if_needed(address.wasm);
        return ret;
      }

      async addChangeIfNeededWithDatum(address: WasmContract.Address, plutusData: WasmContract.OutputDatum): Promise<boolean> {
        const ret = await this.wasm.add_change_if_needed_with_datum(address.wasm, plutusData.wasm);
        return ret;
      }

      async calcScriptDataHash(costModels: WasmContract.Costmdls): Promise<void> {
        const ret = await this.wasm.calc_script_data_hash(costModels.wasm);
      }

      async setScriptDataHash(hash: WasmContract.ScriptDataHash): Promise<void> {
        const ret = await this.wasm.set_script_data_hash(hash.wasm);
      }

      async removeScriptDataHash(): Promise<void> {
        const ret = await this.wasm.remove_script_data_hash();
      }

      async addRequiredSigner(key: WasmContract.Ed25519KeyHash): Promise<void> {
        const ret = await this.wasm.add_required_signer(key.wasm);
      }

      async fullSize(): Promise<number> {
        const ret = await this.wasm.full_size();
        return ret;
      }

      async outputSizes(): Promise<Uint32Array> {
        const ret = await this.wasm.output_sizes();
        return ret;
      }

      async build(): Promise<WasmContract.TransactionBody> {
        const ret = await this.wasm.build();
        return new $outer.TransactionBody(ret);
      }

      async buildTx(): Promise<WasmContract.Transaction> {
        const ret = await this.wasm.build_tx();
        return new $outer.Transaction(ret);
      }

      async buildTxUnsafe(): Promise<WasmContract.Transaction> {
        const ret = await this.wasm.build_tx_unsafe();
        return new $outer.Transaction(ret);
      }

      async minFee(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.min_fee();
        return new $outer.BigNum(ret);
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
        return new $outer.TransactionBuilderConfigBuilder(ret);
      }

      async feeAlgo(feeAlgo: WasmContract.LinearFee): Promise<WasmContract.TransactionBuilderConfigBuilder> {
        const ret = await this.wasm.fee_algo(feeAlgo.wasm);
        return new $outer.TransactionBuilderConfigBuilder(ret);
      }

      async coinsPerUtxoByte(coinsPerUtxoByte: WasmContract.BigNum): Promise<WasmContract.TransactionBuilderConfigBuilder> {
        const ret = await this.wasm.coins_per_utxo_byte(coinsPerUtxoByte.wasm);
        return new $outer.TransactionBuilderConfigBuilder(ret);
      }

      async exUnitPrices(exUnitPrices: WasmContract.ExUnitPrices): Promise<WasmContract.TransactionBuilderConfigBuilder> {
        const ret = await this.wasm.ex_unit_prices(exUnitPrices.wasm);
        return new $outer.TransactionBuilderConfigBuilder(ret);
      }

      async poolDeposit(poolDeposit: WasmContract.BigNum): Promise<WasmContract.TransactionBuilderConfigBuilder> {
        const ret = await this.wasm.pool_deposit(poolDeposit.wasm);
        return new $outer.TransactionBuilderConfigBuilder(ret);
      }

      async keyDeposit(keyDeposit: WasmContract.BigNum): Promise<WasmContract.TransactionBuilderConfigBuilder> {
        const ret = await this.wasm.key_deposit(keyDeposit.wasm);
        return new $outer.TransactionBuilderConfigBuilder(ret);
      }

      async maxValueSize(maxValueSize: number): Promise<WasmContract.TransactionBuilderConfigBuilder> {
        const ret = await this.wasm.max_value_size(maxValueSize);
        return new $outer.TransactionBuilderConfigBuilder(ret);
      }

      async maxTxSize(maxTxSize: number): Promise<WasmContract.TransactionBuilderConfigBuilder> {
        const ret = await this.wasm.max_tx_size(maxTxSize);
        return new $outer.TransactionBuilderConfigBuilder(ret);
      }

      async refScriptCoinsPerByte(refScriptCoinsPerByte: WasmContract.UnitInterval): Promise<WasmContract.TransactionBuilderConfigBuilder> {
        const ret = await this.wasm.ref_script_coins_per_byte(refScriptCoinsPerByte.wasm);
        return new $outer.TransactionBuilderConfigBuilder(ret);
      }

      async preferPureChange(preferPureChange: boolean): Promise<WasmContract.TransactionBuilderConfigBuilder> {
        const ret = await this.wasm.prefer_pure_change(preferPureChange);
        return new $outer.TransactionBuilderConfigBuilder(ret);
      }

      async deduplicateExplicitRefInputsWithRegularInputs(deduplicateExplicitRefInputsWithRegularInputs: boolean): Promise<WasmContract.TransactionBuilderConfigBuilder> {
        const ret = await this.wasm.deduplicate_explicit_ref_inputs_with_regular_inputs(deduplicateExplicitRefInputsWithRegularInputs);
        return new $outer.TransactionBuilderConfigBuilder(ret);
      }

      async doNotBurnExtraChange(doNotBurnExtraChange: boolean): Promise<WasmContract.TransactionBuilderConfigBuilder> {
        const ret = await this.wasm.do_not_burn_extra_change(doNotBurnExtraChange);
        return new $outer.TransactionBuilderConfigBuilder(ret);
      }

      async build(): Promise<WasmContract.TransactionBuilderConfig> {
        const ret = await this.wasm.build();
        return new $outer.TransactionBuilderConfig(ret);
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
        return new $outer.TransactionHash(ret);
      }

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      async toBech32(prefix: string): Promise<string> {
        const ret = await this.wasm.to_bech32(prefix);
        return ret;
      }

      static async fromBech32(bechStr: string): Promise<WasmContract.TransactionHash> {
        const ret = await WasmV4.TransactionHash.from_bech32(bechStr);
        return new $outer.TransactionHash(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hex: string): Promise<WasmContract.TransactionHash> {
        const ret = await WasmV4.TransactionHash.from_hex(hex);
        return new $outer.TransactionHash(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.TransactionInput> {
        const ret = await WasmV4.TransactionInput.from_bytes(bytes);
        return new $outer.TransactionInput(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.TransactionInput> {
        const ret = await WasmV4.TransactionInput.from_hex(hexStr);
        return new $outer.TransactionInput(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.TransactionInput> {
        const ret = await WasmV4.TransactionInput.from_json(json);
        return new $outer.TransactionInput(ret);
      }

      async transactionId(): Promise<WasmContract.TransactionHash> {
        const ret = await this.wasm.transaction_id();
        return new $outer.TransactionHash(ret);
      }

      async index(): Promise<number> {
        const ret = await this.wasm.index();
        return ret;
      }

      static async new(transactionId: WasmContract.TransactionHash, index: number): Promise<WasmContract.TransactionInput> {
        const ret = await WasmV4.TransactionInput.new(transactionId.wasm, index);
        return new $outer.TransactionInput(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.TransactionInputs> {
        const ret = await WasmV4.TransactionInputs.from_bytes(bytes);
        return new $outer.TransactionInputs(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.TransactionInputs> {
        const ret = await WasmV4.TransactionInputs.from_hex(hexStr);
        return new $outer.TransactionInputs(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.TransactionInputs> {
        const ret = await WasmV4.TransactionInputs.from_json(json);
        return new $outer.TransactionInputs(ret);
      }

      static async new(): Promise<WasmContract.TransactionInputs> {
        const ret = await WasmV4.TransactionInputs.new();
        return new $outer.TransactionInputs(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async get(index: number): Promise<WasmContract.TransactionInput> {
        const ret = await this.wasm.get(index);
        return new $outer.TransactionInput(ret);
      }

      async add(input: WasmContract.TransactionInput): Promise<boolean> {
        const ret = await this.wasm.add(input.wasm);
        return ret;
      }

      async toOption(): Promise<Optional<WasmContract.TransactionInputs>> {
        const ret = await this.wasm.to_option();
        if (ret == null) return undefined;
        return new $outer.TransactionInputs(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.TransactionMetadatum> {
        const ret = await WasmV4.TransactionMetadatum.from_bytes(bytes);
        return new $outer.TransactionMetadatum(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.TransactionMetadatum> {
        const ret = await WasmV4.TransactionMetadatum.from_hex(hexStr);
        return new $outer.TransactionMetadatum(ret);
      }

      static async newMap(map: WasmContract.MetadataMap): Promise<WasmContract.TransactionMetadatum> {
        const ret = await WasmV4.TransactionMetadatum.new_map(map.wasm);
        return new $outer.TransactionMetadatum(ret);
      }

      static async newList(list: WasmContract.MetadataList): Promise<WasmContract.TransactionMetadatum> {
        const ret = await WasmV4.TransactionMetadatum.new_list(list.wasm);
        return new $outer.TransactionMetadatum(ret);
      }

      static async newInt(intValue: WasmContract.Int): Promise<WasmContract.TransactionMetadatum> {
        const ret = await WasmV4.TransactionMetadatum.new_int(intValue.wasm);
        return new $outer.TransactionMetadatum(ret);
      }

      static async newBytes(bytes: Uint8Array): Promise<WasmContract.TransactionMetadatum> {
        const ret = await WasmV4.TransactionMetadatum.new_bytes(bytes);
        return new $outer.TransactionMetadatum(ret);
      }

      static async newText(text: string): Promise<WasmContract.TransactionMetadatum> {
        const ret = await WasmV4.TransactionMetadatum.new_text(text);
        return new $outer.TransactionMetadatum(ret);
      }

      async kind(): Promise<WasmContract.TransactionMetadatumKind> {
        const ret = await this.wasm.kind();
        return ret;
      }

      async asMap(): Promise<WasmContract.MetadataMap> {
        const ret = await this.wasm.as_map();
        return new $outer.MetadataMap(ret);
      }

      async asList(): Promise<WasmContract.MetadataList> {
        const ret = await this.wasm.as_list();
        return new $outer.MetadataList(ret);
      }

      async asInt(): Promise<WasmContract.Int> {
        const ret = await this.wasm.as_int();
        return new $outer.Int(ret);
      }

      async asBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.as_bytes();
        return ret;
      }

      async asText(): Promise<string> {
        const ret = await this.wasm.as_text();
        return ret;
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.TransactionMetadatumLabels> {
        const ret = await WasmV4.TransactionMetadatumLabels.from_bytes(bytes);
        return new $outer.TransactionMetadatumLabels(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.TransactionMetadatumLabels> {
        const ret = await WasmV4.TransactionMetadatumLabels.from_hex(hexStr);
        return new $outer.TransactionMetadatumLabels(ret);
      }

      static async new(): Promise<WasmContract.TransactionMetadatumLabels> {
        const ret = await WasmV4.TransactionMetadatumLabels.new();
        return new $outer.TransactionMetadatumLabels(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async get(index: number): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.get(index);
        return new $outer.BigNum(ret);
      }

      async add(elem: WasmContract.BigNum): Promise<void> {
        const ret = await this.wasm.add(elem.wasm);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.TransactionOutput> {
        const ret = await WasmV4.TransactionOutput.from_bytes(bytes);
        return new $outer.TransactionOutput(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.TransactionOutput> {
        const ret = await WasmV4.TransactionOutput.from_hex(hexStr);
        return new $outer.TransactionOutput(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.TransactionOutput> {
        const ret = await WasmV4.TransactionOutput.from_json(json);
        return new $outer.TransactionOutput(ret);
      }

      async address(): Promise<WasmContract.Address> {
        const ret = await this.wasm.address();
        return new $outer.Address(ret);
      }

      async amount(): Promise<WasmContract.Value> {
        const ret = await this.wasm.amount();
        return new $outer.Value(ret);
      }

      async dataHash(): Promise<Optional<WasmContract.DataHash>> {
        const ret = await this.wasm.data_hash();
        if (ret == null) return undefined;
        return new $outer.DataHash(ret);
      }

      async plutusData(): Promise<Optional<WasmContract.PlutusData>> {
        const ret = await this.wasm.plutus_data();
        if (ret == null) return undefined;
        return new $outer.PlutusData(ret);
      }

      async scriptRef(): Promise<Optional<WasmContract.ScriptRef>> {
        const ret = await this.wasm.script_ref();
        if (ret == null) return undefined;
        return new $outer.ScriptRef(ret);
      }

      async setScriptRef(scriptRef: WasmContract.ScriptRef): Promise<void> {
        const ret = await this.wasm.set_script_ref(scriptRef.wasm);
      }

      async setPlutusData(data: WasmContract.PlutusData): Promise<void> {
        const ret = await this.wasm.set_plutus_data(data.wasm);
      }

      async setDataHash(dataHash: WasmContract.DataHash): Promise<void> {
        const ret = await this.wasm.set_data_hash(dataHash.wasm);
      }

      async hasPlutusData(): Promise<boolean> {
        const ret = await this.wasm.has_plutus_data();
        return ret;
      }

      async hasDataHash(): Promise<boolean> {
        const ret = await this.wasm.has_data_hash();
        return ret;
      }

      async hasScriptRef(): Promise<boolean> {
        const ret = await this.wasm.has_script_ref();
        return ret;
      }

      static async new(address: WasmContract.Address, amount: WasmContract.Value): Promise<WasmContract.TransactionOutput> {
        const ret = await WasmV4.TransactionOutput.new(address.wasm, amount.wasm);
        return new $outer.TransactionOutput(ret);
      }

      async serializationFormat(): Promise<Optional<WasmContract.CborContainerType>> {
        const ret = await this.wasm.serialization_format();
        if (ret == null) return undefined;
        return ret;
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
        return new $outer.TransactionOutputAmountBuilder(ret);
      }

      async withCoin(coin: WasmContract.BigNum): Promise<WasmContract.TransactionOutputAmountBuilder> {
        const ret = await this.wasm.with_coin(coin.wasm);
        return new $outer.TransactionOutputAmountBuilder(ret);
      }

      async withCoinAndAsset(coin: WasmContract.BigNum, multiasset: WasmContract.MultiAsset): Promise<WasmContract.TransactionOutputAmountBuilder> {
        const ret = await this.wasm.with_coin_and_asset(coin.wasm, multiasset.wasm);
        return new $outer.TransactionOutputAmountBuilder(ret);
      }

      async withAssetAndMinRequiredCoinByUtxoCost(multiasset: WasmContract.MultiAsset, dataCost: WasmContract.DataCost): Promise<WasmContract.TransactionOutputAmountBuilder> {
        const ret = await this.wasm.with_asset_and_min_required_coin_by_utxo_cost(multiasset.wasm, dataCost.wasm);
        return new $outer.TransactionOutputAmountBuilder(ret);
      }

      async build(): Promise<WasmContract.TransactionOutput> {
        const ret = await this.wasm.build();
        return new $outer.TransactionOutput(ret);
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
        return new $outer.TransactionOutputBuilder(ret);
      }

      async withAddress(address: WasmContract.Address): Promise<WasmContract.TransactionOutputBuilder> {
        const ret = await this.wasm.with_address(address.wasm);
        return new $outer.TransactionOutputBuilder(ret);
      }

      async withDataHash(dataHash: WasmContract.DataHash): Promise<WasmContract.TransactionOutputBuilder> {
        const ret = await this.wasm.with_data_hash(dataHash.wasm);
        return new $outer.TransactionOutputBuilder(ret);
      }

      async withPlutusData(data: WasmContract.PlutusData): Promise<WasmContract.TransactionOutputBuilder> {
        const ret = await this.wasm.with_plutus_data(data.wasm);
        return new $outer.TransactionOutputBuilder(ret);
      }

      async withScriptRef(scriptRef: WasmContract.ScriptRef): Promise<WasmContract.TransactionOutputBuilder> {
        const ret = await this.wasm.with_script_ref(scriptRef.wasm);
        return new $outer.TransactionOutputBuilder(ret);
      }

      async next(): Promise<WasmContract.TransactionOutputAmountBuilder> {
        const ret = await this.wasm.next();
        return new $outer.TransactionOutputAmountBuilder(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.TransactionOutputs> {
        const ret = await WasmV4.TransactionOutputs.from_bytes(bytes);
        return new $outer.TransactionOutputs(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.TransactionOutputs> {
        const ret = await WasmV4.TransactionOutputs.from_hex(hexStr);
        return new $outer.TransactionOutputs(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.TransactionOutputs> {
        const ret = await WasmV4.TransactionOutputs.from_json(json);
        return new $outer.TransactionOutputs(ret);
      }

      static async new(): Promise<WasmContract.TransactionOutputs> {
        const ret = await WasmV4.TransactionOutputs.new();
        return new $outer.TransactionOutputs(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async get(index: number): Promise<WasmContract.TransactionOutput> {
        const ret = await this.wasm.get(index);
        return new $outer.TransactionOutput(ret);
      }

      async add(elem: WasmContract.TransactionOutput): Promise<void> {
        const ret = await this.wasm.add(elem.wasm);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.TransactionUnspentOutput> {
        const ret = await WasmV4.TransactionUnspentOutput.from_bytes(bytes);
        return new $outer.TransactionUnspentOutput(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.TransactionUnspentOutput> {
        const ret = await WasmV4.TransactionUnspentOutput.from_hex(hexStr);
        return new $outer.TransactionUnspentOutput(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.TransactionUnspentOutput> {
        const ret = await WasmV4.TransactionUnspentOutput.from_json(json);
        return new $outer.TransactionUnspentOutput(ret);
      }

      static async new(input: WasmContract.TransactionInput, output: WasmContract.TransactionOutput): Promise<WasmContract.TransactionUnspentOutput> {
        const ret = await WasmV4.TransactionUnspentOutput.new(input.wasm, output.wasm);
        return new $outer.TransactionUnspentOutput(ret);
      }

      async input(): Promise<WasmContract.TransactionInput> {
        const ret = await this.wasm.input();
        return new $outer.TransactionInput(ret);
      }

      async output(): Promise<WasmContract.TransactionOutput> {
        const ret = await this.wasm.output();
        return new $outer.TransactionOutput(ret);
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

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.TransactionUnspentOutputs> {
        const ret = await WasmV4.TransactionUnspentOutputs.from_json(json);
        return new $outer.TransactionUnspentOutputs(ret);
      }

      static async new(): Promise<WasmContract.TransactionUnspentOutputs> {
        const ret = await WasmV4.TransactionUnspentOutputs.new();
        return new $outer.TransactionUnspentOutputs(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async get(index: number): Promise<WasmContract.TransactionUnspentOutput> {
        const ret = await this.wasm.get(index);
        return new $outer.TransactionUnspentOutput(ret);
      }

      async add(elem: WasmContract.TransactionUnspentOutput): Promise<void> {
        const ret = await this.wasm.add(elem.wasm);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.TransactionWitnessSet> {
        const ret = await WasmV4.TransactionWitnessSet.from_bytes(bytes);
        return new $outer.TransactionWitnessSet(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.TransactionWitnessSet> {
        const ret = await WasmV4.TransactionWitnessSet.from_hex(hexStr);
        return new $outer.TransactionWitnessSet(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.TransactionWitnessSet> {
        const ret = await WasmV4.TransactionWitnessSet.from_json(json);
        return new $outer.TransactionWitnessSet(ret);
      }

      async setVkeys(vkeys: WasmContract.Vkeywitnesses): Promise<void> {
        const ret = await this.wasm.set_vkeys(vkeys.wasm);
      }

      async vkeys(): Promise<Optional<WasmContract.Vkeywitnesses>> {
        const ret = await this.wasm.vkeys();
        if (ret == null) return undefined;
        return new $outer.Vkeywitnesses(ret);
      }

      async setNativeScripts(nativeScripts: WasmContract.NativeScripts): Promise<void> {
        const ret = await this.wasm.set_native_scripts(nativeScripts.wasm);
      }

      async nativeScripts(): Promise<Optional<WasmContract.NativeScripts>> {
        const ret = await this.wasm.native_scripts();
        if (ret == null) return undefined;
        return new $outer.NativeScripts(ret);
      }

      async setBootstraps(bootstraps: WasmContract.BootstrapWitnesses): Promise<void> {
        const ret = await this.wasm.set_bootstraps(bootstraps.wasm);
      }

      async bootstraps(): Promise<Optional<WasmContract.BootstrapWitnesses>> {
        const ret = await this.wasm.bootstraps();
        if (ret == null) return undefined;
        return new $outer.BootstrapWitnesses(ret);
      }

      async setPlutusScripts(plutusScripts: WasmContract.PlutusScripts): Promise<void> {
        const ret = await this.wasm.set_plutus_scripts(plutusScripts.wasm);
      }

      async plutusScripts(): Promise<Optional<WasmContract.PlutusScripts>> {
        const ret = await this.wasm.plutus_scripts();
        if (ret == null) return undefined;
        return new $outer.PlutusScripts(ret);
      }

      async setPlutusData(plutusData: WasmContract.PlutusList): Promise<void> {
        const ret = await this.wasm.set_plutus_data(plutusData.wasm);
      }

      async plutusData(): Promise<Optional<WasmContract.PlutusList>> {
        const ret = await this.wasm.plutus_data();
        if (ret == null) return undefined;
        return new $outer.PlutusList(ret);
      }

      async setRedeemers(redeemers: WasmContract.Redeemers): Promise<void> {
        const ret = await this.wasm.set_redeemers(redeemers.wasm);
      }

      async redeemers(): Promise<Optional<WasmContract.Redeemers>> {
        const ret = await this.wasm.redeemers();
        if (ret == null) return undefined;
        return new $outer.Redeemers(ret);
      }

      static async new(): Promise<WasmContract.TransactionWitnessSet> {
        const ret = await WasmV4.TransactionWitnessSet.new();
        return new $outer.TransactionWitnessSet(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.TransactionWitnessSets> {
        const ret = await WasmV4.TransactionWitnessSets.from_bytes(bytes);
        return new $outer.TransactionWitnessSets(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.TransactionWitnessSets> {
        const ret = await WasmV4.TransactionWitnessSets.from_hex(hexStr);
        return new $outer.TransactionWitnessSets(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.TransactionWitnessSets> {
        const ret = await WasmV4.TransactionWitnessSets.from_json(json);
        return new $outer.TransactionWitnessSets(ret);
      }

      static async new(): Promise<WasmContract.TransactionWitnessSets> {
        const ret = await WasmV4.TransactionWitnessSets.new();
        return new $outer.TransactionWitnessSets(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async get(index: number): Promise<WasmContract.TransactionWitnessSet> {
        const ret = await this.wasm.get(index);
        return new $outer.TransactionWitnessSet(ret);
      }

      async add(elem: WasmContract.TransactionWitnessSet): Promise<void> {
        const ret = await this.wasm.add(elem.wasm);
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

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.TreasuryWithdrawals> {
        const ret = await WasmV4.TreasuryWithdrawals.from_json(json);
        return new $outer.TreasuryWithdrawals(ret);
      }

      static async new(): Promise<WasmContract.TreasuryWithdrawals> {
        const ret = await WasmV4.TreasuryWithdrawals.new();
        return new $outer.TreasuryWithdrawals(ret);
      }

      async get(key: WasmContract.RewardAddress): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.get(key.wasm);
        if (ret == null) return undefined;
        return new $outer.BigNum(ret);
      }

      async insert(key: WasmContract.RewardAddress, value: WasmContract.BigNum): Promise<void> {
        const ret = await this.wasm.insert(key.wasm, value.wasm);
      }

      async keys(): Promise<WasmContract.RewardAddresses> {
        const ret = await this.wasm.keys();
        return new $outer.RewardAddresses(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.TreasuryWithdrawalsAction> {
        const ret = await WasmV4.TreasuryWithdrawalsAction.from_bytes(bytes);
        return new $outer.TreasuryWithdrawalsAction(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.TreasuryWithdrawalsAction> {
        const ret = await WasmV4.TreasuryWithdrawalsAction.from_hex(hexStr);
        return new $outer.TreasuryWithdrawalsAction(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.TreasuryWithdrawalsAction> {
        const ret = await WasmV4.TreasuryWithdrawalsAction.from_json(json);
        return new $outer.TreasuryWithdrawalsAction(ret);
      }

      async withdrawals(): Promise<WasmContract.TreasuryWithdrawals> {
        const ret = await this.wasm.withdrawals();
        return new $outer.TreasuryWithdrawals(ret);
      }

      async policyHash(): Promise<Optional<WasmContract.ScriptHash>> {
        const ret = await this.wasm.policy_hash();
        if (ret == null) return undefined;
        return new $outer.ScriptHash(ret);
      }

      static async new(withdrawals: WasmContract.TreasuryWithdrawals): Promise<WasmContract.TreasuryWithdrawalsAction> {
        const ret = await WasmV4.TreasuryWithdrawalsAction.new(withdrawals.wasm);
        return new $outer.TreasuryWithdrawalsAction(ret);
      }

      static async newWithPolicyHash(withdrawals: WasmContract.TreasuryWithdrawals, policyHash: WasmContract.ScriptHash): Promise<WasmContract.TreasuryWithdrawalsAction> {
        const ret = await WasmV4.TreasuryWithdrawalsAction.new_with_policy_hash(withdrawals.wasm, policyHash.wasm);
        return new $outer.TreasuryWithdrawalsAction(ret);
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

      static async new(): Promise<WasmContract.TxInputsBuilder> {
        const ret = await WasmV4.TxInputsBuilder.new();
        return new $outer.TxInputsBuilder(ret);
      }

      async addRegularUtxo(utxo: WasmContract.TransactionUnspentOutput): Promise<void> {
        const ret = await this.wasm.add_regular_utxo(utxo.wasm);
      }

      async addPlutusScriptUtxo(utxo: WasmContract.TransactionUnspentOutput, witness: WasmContract.PlutusWitness): Promise<void> {
        const ret = await this.wasm.add_plutus_script_utxo(utxo.wasm, witness.wasm);
      }

      async addNativeScriptUtxo(utxo: WasmContract.TransactionUnspentOutput, witness: WasmContract.NativeScriptSource): Promise<void> {
        const ret = await this.wasm.add_native_script_utxo(utxo.wasm, witness.wasm);
      }

      async addKeyInput(hash: WasmContract.Ed25519KeyHash, input: WasmContract.TransactionInput, amount: WasmContract.Value): Promise<void> {
        const ret = await this.wasm.add_key_input(hash.wasm, input.wasm, amount.wasm);
      }

      async addNativeScriptInput(script: WasmContract.NativeScriptSource, input: WasmContract.TransactionInput, amount: WasmContract.Value): Promise<void> {
        const ret = await this.wasm.add_native_script_input(script.wasm, input.wasm, amount.wasm);
      }

      async addPlutusScriptInput(witness: WasmContract.PlutusWitness, input: WasmContract.TransactionInput, amount: WasmContract.Value): Promise<void> {
        const ret = await this.wasm.add_plutus_script_input(witness.wasm, input.wasm, amount.wasm);
      }

      async addBootstrapInput(address: WasmContract.ByronAddress, input: WasmContract.TransactionInput, amount: WasmContract.Value): Promise<void> {
        const ret = await this.wasm.add_bootstrap_input(address.wasm, input.wasm, amount.wasm);
      }

      async addRegularInput(address: WasmContract.Address, input: WasmContract.TransactionInput, amount: WasmContract.Value): Promise<void> {
        const ret = await this.wasm.add_regular_input(address.wasm, input.wasm, amount.wasm);
      }

      async getRefInputs(): Promise<WasmContract.TransactionInputs> {
        const ret = await this.wasm.get_ref_inputs();
        return new $outer.TransactionInputs(ret);
      }

      async getNativeInputScripts(): Promise<Optional<WasmContract.NativeScripts>> {
        const ret = await this.wasm.get_native_input_scripts();
        if (ret == null) return undefined;
        return new $outer.NativeScripts(ret);
      }

      async getPlutusInputScripts(): Promise<Optional<WasmContract.PlutusWitnesses>> {
        const ret = await this.wasm.get_plutus_input_scripts();
        if (ret == null) return undefined;
        return new $outer.PlutusWitnesses(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async addRequiredSigner(key: WasmContract.Ed25519KeyHash): Promise<void> {
        const ret = await this.wasm.add_required_signer(key.wasm);
      }

      async addRequiredSigners(keys: WasmContract.Ed25519KeyHashes): Promise<void> {
        const ret = await this.wasm.add_required_signers(keys.wasm);
      }

      async totalValue(): Promise<WasmContract.Value> {
        const ret = await this.wasm.total_value();
        return new $outer.Value(ret);
      }

      async inputs(): Promise<WasmContract.TransactionInputs> {
        const ret = await this.wasm.inputs();
        return new $outer.TransactionInputs(ret);
      }

      async inputsOption(): Promise<Optional<WasmContract.TransactionInputs>> {
        const ret = await this.wasm.inputs_option();
        if (ret == null) return undefined;
        return new $outer.TransactionInputs(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.URL> {
        const ret = await WasmV4.URL.from_bytes(bytes);
        return new $outer.URL(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.URL> {
        const ret = await WasmV4.URL.from_hex(hexStr);
        return new $outer.URL(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.URL> {
        const ret = await WasmV4.URL.from_json(json);
        return new $outer.URL(ret);
      }

      static async new(url: string): Promise<WasmContract.URL> {
        const ret = await WasmV4.URL.new(url);
        return new $outer.URL(ret);
      }

      async url(): Promise<string> {
        const ret = await this.wasm.url();
        return ret;
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.UnitInterval> {
        const ret = await WasmV4.UnitInterval.from_bytes(bytes);
        return new $outer.UnitInterval(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.UnitInterval> {
        const ret = await WasmV4.UnitInterval.from_hex(hexStr);
        return new $outer.UnitInterval(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.UnitInterval> {
        const ret = await WasmV4.UnitInterval.from_json(json);
        return new $outer.UnitInterval(ret);
      }

      async numerator(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.numerator();
        return new $outer.BigNum(ret);
      }

      async denominator(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.denominator();
        return new $outer.BigNum(ret);
      }

      static async new(numerator: WasmContract.BigNum, denominator: WasmContract.BigNum): Promise<WasmContract.UnitInterval> {
        const ret = await WasmV4.UnitInterval.new(numerator.wasm, denominator.wasm);
        return new $outer.UnitInterval(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Update> {
        const ret = await WasmV4.Update.from_bytes(bytes);
        return new $outer.Update(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Update> {
        const ret = await WasmV4.Update.from_hex(hexStr);
        return new $outer.Update(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.Update> {
        const ret = await WasmV4.Update.from_json(json);
        return new $outer.Update(ret);
      }

      async proposedProtocolParameterUpdates(): Promise<WasmContract.ProposedProtocolParameterUpdates> {
        const ret = await this.wasm.proposed_protocol_parameter_updates();
        return new $outer.ProposedProtocolParameterUpdates(ret);
      }

      async epoch(): Promise<number> {
        const ret = await this.wasm.epoch();
        return ret;
      }

      static async new(proposedProtocolParameterUpdates: WasmContract.ProposedProtocolParameterUpdates, epoch: number): Promise<WasmContract.Update> {
        const ret = await WasmV4.Update.new(proposedProtocolParameterUpdates.wasm, epoch);
        return new $outer.Update(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.UpdateCommitteeAction> {
        const ret = await WasmV4.UpdateCommitteeAction.from_bytes(bytes);
        return new $outer.UpdateCommitteeAction(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.UpdateCommitteeAction> {
        const ret = await WasmV4.UpdateCommitteeAction.from_hex(hexStr);
        return new $outer.UpdateCommitteeAction(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.UpdateCommitteeAction> {
        const ret = await WasmV4.UpdateCommitteeAction.from_json(json);
        return new $outer.UpdateCommitteeAction(ret);
      }

      async govActionId(): Promise<Optional<WasmContract.GovernanceActionId>> {
        const ret = await this.wasm.gov_action_id();
        if (ret == null) return undefined;
        return new $outer.GovernanceActionId(ret);
      }

      async committee(): Promise<WasmContract.Committee> {
        const ret = await this.wasm.committee();
        return new $outer.Committee(ret);
      }

      async membersToRemove(): Promise<WasmContract.Credentials> {
        const ret = await this.wasm.members_to_remove();
        return new $outer.Credentials(ret);
      }

      static async new(committee: WasmContract.Committee, membersToRemove: WasmContract.Credentials): Promise<WasmContract.UpdateCommitteeAction> {
        const ret = await WasmV4.UpdateCommitteeAction.new(committee.wasm, membersToRemove.wasm);
        return new $outer.UpdateCommitteeAction(ret);
      }

      static async newWithActionId(govActionId: WasmContract.GovernanceActionId, committee: WasmContract.Committee, membersToRemove: WasmContract.Credentials): Promise<WasmContract.UpdateCommitteeAction> {
        const ret = await WasmV4.UpdateCommitteeAction.new_with_action_id(govActionId.wasm, committee.wasm, membersToRemove.wasm);
        return new $outer.UpdateCommitteeAction(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.VRFCert> {
        const ret = await WasmV4.VRFCert.from_bytes(bytes);
        return new $outer.VRFCert(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.VRFCert> {
        const ret = await WasmV4.VRFCert.from_hex(hexStr);
        return new $outer.VRFCert(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.VRFCert> {
        const ret = await WasmV4.VRFCert.from_json(json);
        return new $outer.VRFCert(ret);
      }

      async output(): Promise<Uint8Array> {
        const ret = await this.wasm.output();
        return ret;
      }

      async proof(): Promise<Uint8Array> {
        const ret = await this.wasm.proof();
        return ret;
      }

      static async new(output: Uint8Array, proof: Uint8Array): Promise<WasmContract.VRFCert> {
        const ret = await WasmV4.VRFCert.new(output, proof);
        return new $outer.VRFCert(ret);
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
        return new $outer.VRFKeyHash(ret);
      }

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      async toBech32(prefix: string): Promise<string> {
        const ret = await this.wasm.to_bech32(prefix);
        return ret;
      }

      static async fromBech32(bechStr: string): Promise<WasmContract.VRFKeyHash> {
        const ret = await WasmV4.VRFKeyHash.from_bech32(bechStr);
        return new $outer.VRFKeyHash(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hex: string): Promise<WasmContract.VRFKeyHash> {
        const ret = await WasmV4.VRFKeyHash.from_hex(hex);
        return new $outer.VRFKeyHash(ret);
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
        return new $outer.VRFVKey(ret);
      }

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      async toBech32(prefix: string): Promise<string> {
        const ret = await this.wasm.to_bech32(prefix);
        return ret;
      }

      static async fromBech32(bechStr: string): Promise<WasmContract.VRFVKey> {
        const ret = await WasmV4.VRFVKey.from_bech32(bechStr);
        return new $outer.VRFVKey(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hex: string): Promise<WasmContract.VRFVKey> {
        const ret = await WasmV4.VRFVKey.from_hex(hex);
        return new $outer.VRFVKey(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Value> {
        const ret = await WasmV4.Value.from_bytes(bytes);
        return new $outer.Value(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Value> {
        const ret = await WasmV4.Value.from_hex(hexStr);
        return new $outer.Value(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.Value> {
        const ret = await WasmV4.Value.from_json(json);
        return new $outer.Value(ret);
      }

      static async new(coin: WasmContract.BigNum): Promise<WasmContract.Value> {
        const ret = await WasmV4.Value.new(coin.wasm);
        return new $outer.Value(ret);
      }

      static async newFromAssets(multiasset: WasmContract.MultiAsset): Promise<WasmContract.Value> {
        const ret = await WasmV4.Value.new_from_assets(multiasset.wasm);
        return new $outer.Value(ret);
      }

      static async newWithAssets(coin: WasmContract.BigNum, multiasset: WasmContract.MultiAsset): Promise<WasmContract.Value> {
        const ret = await WasmV4.Value.new_with_assets(coin.wasm, multiasset.wasm);
        return new $outer.Value(ret);
      }

      static async zero(): Promise<WasmContract.Value> {
        const ret = await WasmV4.Value.zero();
        return new $outer.Value(ret);
      }

      async isZero(): Promise<boolean> {
        const ret = await this.wasm.is_zero();
        return ret;
      }

      async coin(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.coin();
        return new $outer.BigNum(ret);
      }

      async setCoin(coin: WasmContract.BigNum): Promise<void> {
        const ret = await this.wasm.set_coin(coin.wasm);
      }

      async multiasset(): Promise<Optional<WasmContract.MultiAsset>> {
        const ret = await this.wasm.multiasset();
        if (ret == null) return undefined;
        return new $outer.MultiAsset(ret);
      }

      async setMultiasset(multiasset: WasmContract.MultiAsset): Promise<void> {
        const ret = await this.wasm.set_multiasset(multiasset.wasm);
      }

      async checkedAdd(rhs: WasmContract.Value): Promise<WasmContract.Value> {
        const ret = await this.wasm.checked_add(rhs.wasm);
        return new $outer.Value(ret);
      }

      async checkedSub(rhsValue: WasmContract.Value): Promise<WasmContract.Value> {
        const ret = await this.wasm.checked_sub(rhsValue.wasm);
        return new $outer.Value(ret);
      }

      async clampedSub(rhsValue: WasmContract.Value): Promise<WasmContract.Value> {
        const ret = await this.wasm.clamped_sub(rhsValue.wasm);
        return new $outer.Value(ret);
      }

      async compare(rhsValue: WasmContract.Value): Promise<Optional<number>> {
        const ret = await this.wasm.compare(rhsValue.wasm);
        if (ret == null) return undefined;
        return ret;
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.VersionedBlock> {
        const ret = await WasmV4.VersionedBlock.from_bytes(bytes);
        return new $outer.VersionedBlock(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.VersionedBlock> {
        const ret = await WasmV4.VersionedBlock.from_hex(hexStr);
        return new $outer.VersionedBlock(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.VersionedBlock> {
        const ret = await WasmV4.VersionedBlock.from_json(json);
        return new $outer.VersionedBlock(ret);
      }

      static async new(block: WasmContract.Block, eraCode: number): Promise<WasmContract.VersionedBlock> {
        const ret = await WasmV4.VersionedBlock.new(block.wasm, eraCode);
        return new $outer.VersionedBlock(ret);
      }

      async block(): Promise<WasmContract.Block> {
        const ret = await this.wasm.block();
        return new $outer.Block(ret);
      }

      async era(): Promise<WasmContract.BlockEra> {
        const ret = await this.wasm.era();
        return ret;
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Vkey> {
        const ret = await WasmV4.Vkey.from_bytes(bytes);
        return new $outer.Vkey(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Vkey> {
        const ret = await WasmV4.Vkey.from_hex(hexStr);
        return new $outer.Vkey(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.Vkey> {
        const ret = await WasmV4.Vkey.from_json(json);
        return new $outer.Vkey(ret);
      }

      static async new(pk: WasmContract.PublicKey): Promise<WasmContract.Vkey> {
        const ret = await WasmV4.Vkey.new(pk.wasm);
        return new $outer.Vkey(ret);
      }

      async publicKey(): Promise<WasmContract.PublicKey> {
        const ret = await this.wasm.public_key();
        return new $outer.PublicKey(ret);
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
        return new $outer.Vkeys(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async get(index: number): Promise<WasmContract.Vkey> {
        const ret = await this.wasm.get(index);
        return new $outer.Vkey(ret);
      }

      async add(elem: WasmContract.Vkey): Promise<void> {
        const ret = await this.wasm.add(elem.wasm);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Vkeywitness> {
        const ret = await WasmV4.Vkeywitness.from_bytes(bytes);
        return new $outer.Vkeywitness(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Vkeywitness> {
        const ret = await WasmV4.Vkeywitness.from_hex(hexStr);
        return new $outer.Vkeywitness(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.Vkeywitness> {
        const ret = await WasmV4.Vkeywitness.from_json(json);
        return new $outer.Vkeywitness(ret);
      }

      static async new(vkey: WasmContract.Vkey, signature: WasmContract.Ed25519Signature): Promise<WasmContract.Vkeywitness> {
        const ret = await WasmV4.Vkeywitness.new(vkey.wasm, signature.wasm);
        return new $outer.Vkeywitness(ret);
      }

      async vkey(): Promise<WasmContract.Vkey> {
        const ret = await this.wasm.vkey();
        return new $outer.Vkey(ret);
      }

      async signature(): Promise<WasmContract.Ed25519Signature> {
        const ret = await this.wasm.signature();
        return new $outer.Ed25519Signature(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Vkeywitnesses> {
        const ret = await WasmV4.Vkeywitnesses.from_bytes(bytes);
        return new $outer.Vkeywitnesses(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Vkeywitnesses> {
        const ret = await WasmV4.Vkeywitnesses.from_hex(hexStr);
        return new $outer.Vkeywitnesses(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.Vkeywitnesses> {
        const ret = await WasmV4.Vkeywitnesses.from_json(json);
        return new $outer.Vkeywitnesses(ret);
      }

      static async new(): Promise<WasmContract.Vkeywitnesses> {
        const ret = await WasmV4.Vkeywitnesses.new();
        return new $outer.Vkeywitnesses(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async get(index: number): Promise<WasmContract.Vkeywitness> {
        const ret = await this.wasm.get(index);
        return new $outer.Vkeywitness(ret);
      }

      async add(witness: WasmContract.Vkeywitness): Promise<boolean> {
        const ret = await this.wasm.add(witness.wasm);
        return ret;
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.VoteDelegation> {
        const ret = await WasmV4.VoteDelegation.from_bytes(bytes);
        return new $outer.VoteDelegation(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.VoteDelegation> {
        const ret = await WasmV4.VoteDelegation.from_hex(hexStr);
        return new $outer.VoteDelegation(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.VoteDelegation> {
        const ret = await WasmV4.VoteDelegation.from_json(json);
        return new $outer.VoteDelegation(ret);
      }

      async stakeCredential(): Promise<WasmContract.Credential> {
        const ret = await this.wasm.stake_credential();
        return new $outer.Credential(ret);
      }

      async drep(): Promise<WasmContract.DRep> {
        const ret = await this.wasm.drep();
        return new $outer.DRep(ret);
      }

      static async new(stakeCredential: WasmContract.Credential, drep: WasmContract.DRep): Promise<WasmContract.VoteDelegation> {
        const ret = await WasmV4.VoteDelegation.new(stakeCredential.wasm, drep.wasm);
        return new $outer.VoteDelegation(ret);
      }

      async hasScriptCredentials(): Promise<boolean> {
        const ret = await this.wasm.has_script_credentials();
        return ret;
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.VoteRegistrationAndDelegation> {
        const ret = await WasmV4.VoteRegistrationAndDelegation.from_bytes(bytes);
        return new $outer.VoteRegistrationAndDelegation(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.VoteRegistrationAndDelegation> {
        const ret = await WasmV4.VoteRegistrationAndDelegation.from_hex(hexStr);
        return new $outer.VoteRegistrationAndDelegation(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.VoteRegistrationAndDelegation> {
        const ret = await WasmV4.VoteRegistrationAndDelegation.from_json(json);
        return new $outer.VoteRegistrationAndDelegation(ret);
      }

      async stakeCredential(): Promise<WasmContract.Credential> {
        const ret = await this.wasm.stake_credential();
        return new $outer.Credential(ret);
      }

      async drep(): Promise<WasmContract.DRep> {
        const ret = await this.wasm.drep();
        return new $outer.DRep(ret);
      }

      async coin(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.coin();
        return new $outer.BigNum(ret);
      }

      static async new(stakeCredential: WasmContract.Credential, drep: WasmContract.DRep, coin: WasmContract.BigNum): Promise<WasmContract.VoteRegistrationAndDelegation> {
        const ret = await WasmV4.VoteRegistrationAndDelegation.new(stakeCredential.wasm, drep.wasm, coin.wasm);
        return new $outer.VoteRegistrationAndDelegation(ret);
      }

      async hasScriptCredentials(): Promise<boolean> {
        const ret = await this.wasm.has_script_credentials();
        return ret;
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Voter> {
        const ret = await WasmV4.Voter.from_bytes(bytes);
        return new $outer.Voter(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Voter> {
        const ret = await WasmV4.Voter.from_hex(hexStr);
        return new $outer.Voter(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.Voter> {
        const ret = await WasmV4.Voter.from_json(json);
        return new $outer.Voter(ret);
      }

      static async newConstitutionalCommitteeHotCredential(cred: WasmContract.Credential): Promise<WasmContract.Voter> {
        const ret = await WasmV4.Voter.new_constitutional_committee_hot_credential(cred.wasm);
        return new $outer.Voter(ret);
      }

      static async newDrepCredential(cred: WasmContract.Credential): Promise<WasmContract.Voter> {
        const ret = await WasmV4.Voter.new_drep_credential(cred.wasm);
        return new $outer.Voter(ret);
      }

      static async newStakePoolKeyHash(keyHash: WasmContract.Ed25519KeyHash): Promise<WasmContract.Voter> {
        const ret = await WasmV4.Voter.new_stake_pool_key_hash(keyHash.wasm);
        return new $outer.Voter(ret);
      }

      async kind(): Promise<WasmContract.VoterKind> {
        const ret = await this.wasm.kind();
        return ret;
      }

      async toConstitutionalCommitteeHotCredential(): Promise<Optional<WasmContract.Credential>> {
        const ret = await this.wasm.to_constitutional_committee_hot_credential();
        if (ret == null) return undefined;
        return new $outer.Credential(ret);
      }

      async toDrepCredential(): Promise<Optional<WasmContract.Credential>> {
        const ret = await this.wasm.to_drep_credential();
        if (ret == null) return undefined;
        return new $outer.Credential(ret);
      }

      async toStakePoolKeyHash(): Promise<Optional<WasmContract.Ed25519KeyHash>> {
        const ret = await this.wasm.to_stake_pool_key_hash();
        if (ret == null) return undefined;
        return new $outer.Ed25519KeyHash(ret);
      }

      async hasScriptCredentials(): Promise<boolean> {
        const ret = await this.wasm.has_script_credentials();
        return ret;
      }

      async toKeyHash(): Promise<Optional<WasmContract.Ed25519KeyHash>> {
        const ret = await this.wasm.to_key_hash();
        if (ret == null) return undefined;
        return new $outer.Ed25519KeyHash(ret);
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

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.Voters> {
        const ret = await WasmV4.Voters.from_json(json);
        return new $outer.Voters(ret);
      }

      static async new(): Promise<WasmContract.Voters> {
        const ret = await WasmV4.Voters.new();
        return new $outer.Voters(ret);
      }

      async add(voter: WasmContract.Voter): Promise<void> {
        const ret = await this.wasm.add(voter.wasm);
      }

      async get(index: number): Promise<Optional<WasmContract.Voter>> {
        const ret = await this.wasm.get(index);
        if (ret == null) return undefined;
        return new $outer.Voter(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
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
        return new $outer.VotingBuilder(ret);
      }

      async add(voter: WasmContract.Voter, govActionId: WasmContract.GovernanceActionId, votingProcedure: WasmContract.VotingProcedure): Promise<void> {
        const ret = await this.wasm.add(voter.wasm, govActionId.wasm, votingProcedure.wasm);
      }

      async addWithPlutusWitness(voter: WasmContract.Voter, govActionId: WasmContract.GovernanceActionId, votingProcedure: WasmContract.VotingProcedure, witness: WasmContract.PlutusWitness): Promise<void> {
        const ret = await this.wasm.add_with_plutus_witness(voter.wasm, govActionId.wasm, votingProcedure.wasm, witness.wasm);
      }

      async addWithNativeScript(voter: WasmContract.Voter, govActionId: WasmContract.GovernanceActionId, votingProcedure: WasmContract.VotingProcedure, nativeScriptSource: WasmContract.NativeScriptSource): Promise<void> {
        const ret = await this.wasm.add_with_native_script(voter.wasm, govActionId.wasm, votingProcedure.wasm, nativeScriptSource.wasm);
      }

      async getPlutusWitnesses(): Promise<WasmContract.PlutusWitnesses> {
        const ret = await this.wasm.get_plutus_witnesses();
        return new $outer.PlutusWitnesses(ret);
      }

      async getRefInputs(): Promise<WasmContract.TransactionInputs> {
        const ret = await this.wasm.get_ref_inputs();
        return new $outer.TransactionInputs(ret);
      }

      async getNativeScripts(): Promise<WasmContract.NativeScripts> {
        const ret = await this.wasm.get_native_scripts();
        return new $outer.NativeScripts(ret);
      }

      async hasPlutusScripts(): Promise<boolean> {
        const ret = await this.wasm.has_plutus_scripts();
        return ret;
      }

      async build(): Promise<WasmContract.VotingProcedures> {
        const ret = await this.wasm.build();
        return new $outer.VotingProcedures(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.VotingProcedure> {
        const ret = await WasmV4.VotingProcedure.from_bytes(bytes);
        return new $outer.VotingProcedure(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.VotingProcedure> {
        const ret = await WasmV4.VotingProcedure.from_hex(hexStr);
        return new $outer.VotingProcedure(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.VotingProcedure> {
        const ret = await WasmV4.VotingProcedure.from_json(json);
        return new $outer.VotingProcedure(ret);
      }

      static async new(vote: WasmContract.VoteKind): Promise<WasmContract.VotingProcedure> {
        const ret = await WasmV4.VotingProcedure.new(vote);
        return new $outer.VotingProcedure(ret);
      }

      static async newWithAnchor(vote: WasmContract.VoteKind, anchor: WasmContract.Anchor): Promise<WasmContract.VotingProcedure> {
        const ret = await WasmV4.VotingProcedure.new_with_anchor(vote, anchor.wasm);
        return new $outer.VotingProcedure(ret);
      }

      async voteKind(): Promise<WasmContract.VoteKind> {
        const ret = await this.wasm.vote_kind();
        return ret;
      }

      async anchor(): Promise<Optional<WasmContract.Anchor>> {
        const ret = await this.wasm.anchor();
        if (ret == null) return undefined;
        return new $outer.Anchor(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.VotingProcedures> {
        const ret = await WasmV4.VotingProcedures.from_bytes(bytes);
        return new $outer.VotingProcedures(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.VotingProcedures> {
        const ret = await WasmV4.VotingProcedures.from_hex(hexStr);
        return new $outer.VotingProcedures(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.VotingProcedures> {
        const ret = await WasmV4.VotingProcedures.from_json(json);
        return new $outer.VotingProcedures(ret);
      }

      static async new(): Promise<WasmContract.VotingProcedures> {
        const ret = await WasmV4.VotingProcedures.new();
        return new $outer.VotingProcedures(ret);
      }

      async insert(voter: WasmContract.Voter, governanceActionId: WasmContract.GovernanceActionId, votingProcedure: WasmContract.VotingProcedure): Promise<void> {
        const ret = await this.wasm.insert(voter.wasm, governanceActionId.wasm, votingProcedure.wasm);
      }

      async get(voter: WasmContract.Voter, governanceActionId: WasmContract.GovernanceActionId): Promise<Optional<WasmContract.VotingProcedure>> {
        const ret = await this.wasm.get(voter.wasm, governanceActionId.wasm);
        if (ret == null) return undefined;
        return new $outer.VotingProcedure(ret);
      }

      async getVoters(): Promise<WasmContract.Voters> {
        const ret = await this.wasm.get_voters();
        return new $outer.Voters(ret);
      }

      async getGovernanceActionIdsByVoter(voter: WasmContract.Voter): Promise<WasmContract.GovernanceActionIds> {
        const ret = await this.wasm.get_governance_action_ids_by_voter(voter.wasm);
        return new $outer.GovernanceActionIds(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.VotingProposal> {
        const ret = await WasmV4.VotingProposal.from_bytes(bytes);
        return new $outer.VotingProposal(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.VotingProposal> {
        const ret = await WasmV4.VotingProposal.from_hex(hexStr);
        return new $outer.VotingProposal(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.VotingProposal> {
        const ret = await WasmV4.VotingProposal.from_json(json);
        return new $outer.VotingProposal(ret);
      }

      async governanceAction(): Promise<WasmContract.GovernanceAction> {
        const ret = await this.wasm.governance_action();
        return new $outer.GovernanceAction(ret);
      }

      async anchor(): Promise<WasmContract.Anchor> {
        const ret = await this.wasm.anchor();
        return new $outer.Anchor(ret);
      }

      async rewardAccount(): Promise<WasmContract.RewardAddress> {
        const ret = await this.wasm.reward_account();
        return new $outer.RewardAddress(ret);
      }

      async deposit(): Promise<WasmContract.BigNum> {
        const ret = await this.wasm.deposit();
        return new $outer.BigNum(ret);
      }

      static async new(governanceAction: WasmContract.GovernanceAction, anchor: WasmContract.Anchor, rewardAccount: WasmContract.RewardAddress, deposit: WasmContract.BigNum): Promise<WasmContract.VotingProposal> {
        const ret = await WasmV4.VotingProposal.new(governanceAction.wasm, anchor.wasm, rewardAccount.wasm, deposit.wasm);
        return new $outer.VotingProposal(ret);
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
        return new $outer.VotingProposalBuilder(ret);
      }

      async add(proposal: WasmContract.VotingProposal): Promise<void> {
        const ret = await this.wasm.add(proposal.wasm);
      }

      async addWithPlutusWitness(proposal: WasmContract.VotingProposal, witness: WasmContract.PlutusWitness): Promise<void> {
        const ret = await this.wasm.add_with_plutus_witness(proposal.wasm, witness.wasm);
      }

      async getPlutusWitnesses(): Promise<WasmContract.PlutusWitnesses> {
        const ret = await this.wasm.get_plutus_witnesses();
        return new $outer.PlutusWitnesses(ret);
      }

      async getRefInputs(): Promise<WasmContract.TransactionInputs> {
        const ret = await this.wasm.get_ref_inputs();
        return new $outer.TransactionInputs(ret);
      }

      async hasPlutusScripts(): Promise<boolean> {
        const ret = await this.wasm.has_plutus_scripts();
        return ret;
      }

      async build(): Promise<WasmContract.VotingProposals> {
        const ret = await this.wasm.build();
        return new $outer.VotingProposals(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.VotingProposals> {
        const ret = await WasmV4.VotingProposals.from_bytes(bytes);
        return new $outer.VotingProposals(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.VotingProposals> {
        const ret = await WasmV4.VotingProposals.from_hex(hexStr);
        return new $outer.VotingProposals(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.VotingProposals> {
        const ret = await WasmV4.VotingProposals.from_json(json);
        return new $outer.VotingProposals(ret);
      }

      static async new(): Promise<WasmContract.VotingProposals> {
        const ret = await WasmV4.VotingProposals.new();
        return new $outer.VotingProposals(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async get(index: number): Promise<WasmContract.VotingProposal> {
        const ret = await this.wasm.get(index);
        return new $outer.VotingProposal(ret);
      }

      async add(proposal: WasmContract.VotingProposal): Promise<boolean> {
        const ret = await this.wasm.add(proposal.wasm);
        return ret;
      }

      async contains(elem: WasmContract.VotingProposal): Promise<boolean> {
        const ret = await this.wasm.contains(elem.wasm);
        return ret;
      }

      async toOption(): Promise<Optional<WasmContract.VotingProposals>> {
        const ret = await this.wasm.to_option();
        if (ret == null) return undefined;
        return new $outer.VotingProposals(ret);
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

      async toBytes(): Promise<Uint8Array> {
        const ret = await this.wasm.to_bytes();
        return ret;
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Withdrawals> {
        const ret = await WasmV4.Withdrawals.from_bytes(bytes);
        return new $outer.Withdrawals(ret);
      }

      async toHex(): Promise<string> {
        const ret = await this.wasm.to_hex();
        return ret;
      }

      static async fromHex(hexStr: string): Promise<WasmContract.Withdrawals> {
        const ret = await WasmV4.Withdrawals.from_hex(hexStr);
        return new $outer.Withdrawals(ret);
      }

      async toJson(): Promise<string> {
        const ret = await this.wasm.to_json();
        return ret;
      }

      static async fromJson(json: string): Promise<WasmContract.Withdrawals> {
        const ret = await WasmV4.Withdrawals.from_json(json);
        return new $outer.Withdrawals(ret);
      }

      static async new(): Promise<WasmContract.Withdrawals> {
        const ret = await WasmV4.Withdrawals.new();
        return new $outer.Withdrawals(ret);
      }

      async len(): Promise<number> {
        const ret = await this.wasm.len();
        return ret;
      }

      async insert(key: WasmContract.RewardAddress, value: WasmContract.BigNum): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.insert(key.wasm, value.wasm);
        if (ret == null) return undefined;
        return new $outer.BigNum(ret);
      }

      async get(key: WasmContract.RewardAddress): Promise<Optional<WasmContract.BigNum>> {
        const ret = await this.wasm.get(key.wasm);
        if (ret == null) return undefined;
        return new $outer.BigNum(ret);
      }

      async keys(): Promise<WasmContract.RewardAddresses> {
        const ret = await this.wasm.keys();
        return new $outer.RewardAddresses(ret);
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
        return new $outer.WithdrawalsBuilder(ret);
      }

      async add(address: WasmContract.RewardAddress, coin: WasmContract.BigNum): Promise<void> {
        const ret = await this.wasm.add(address.wasm, coin.wasm);
      }

      async addWithPlutusWitness(address: WasmContract.RewardAddress, coin: WasmContract.BigNum, witness: WasmContract.PlutusWitness): Promise<void> {
        const ret = await this.wasm.add_with_plutus_witness(address.wasm, coin.wasm, witness.wasm);
      }

      async addWithNativeScript(address: WasmContract.RewardAddress, coin: WasmContract.BigNum, nativeScriptSource: WasmContract.NativeScriptSource): Promise<void> {
        const ret = await this.wasm.add_with_native_script(address.wasm, coin.wasm, nativeScriptSource.wasm);
      }

      async getPlutusWitnesses(): Promise<WasmContract.PlutusWitnesses> {
        const ret = await this.wasm.get_plutus_witnesses();
        return new $outer.PlutusWitnesses(ret);
      }

      async getRefInputs(): Promise<WasmContract.TransactionInputs> {
        const ret = await this.wasm.get_ref_inputs();
        return new $outer.TransactionInputs(ret);
      }

      async getNativeScripts(): Promise<WasmContract.NativeScripts> {
        const ret = await this.wasm.get_native_scripts();
        return new $outer.NativeScripts(ret);
      }

      async getTotalWithdrawals(): Promise<WasmContract.Value> {
        const ret = await this.wasm.get_total_withdrawals();
        return new $outer.Value(ret);
      }

      async hasPlutusScripts(): Promise<boolean> {
        const ret = await this.wasm.has_plutus_scripts();
        return ret;
      }

      async build(): Promise<WasmContract.Withdrawals> {
        const ret = await this.wasm.build();
        return new $outer.Withdrawals(ret);
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