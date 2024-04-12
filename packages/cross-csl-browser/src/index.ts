import * as WasmV4 from '@emurgo/cardano-serialization-lib-browser';
import * as WasmContract from '@emurgo/cross-csl-core';

const { Ptr } = WasmContract;
import type { Optional } from '@emurgo/cross-csl-core';

const wrapByPromise = <T>(f: () => T): Promise<T> => {
    return new Promise((resolve, reject) => {
        try {
          resolve(f());
        } catch (e) {
          reject(e);
        }
    });
};

export const init = (ctx: string): WasmContract.WasmModuleProxy => {
  return new WasmModuleProxy(ctx);
};

export class WasmModuleProxy implements WasmContract.WasmModuleProxy {
  private _ctx: string;

  constructor(ctx: string) {
    this._ctx = ctx;
  }

  calculateExUnitsCeilCost(exUnits: WasmContract.ExUnits, exUnitPrices: WasmContract.ExUnitPrices): Promise<WasmContract.BigNum> {
    return wrapByPromise(() => {
      const ret = WasmV4.calculate_ex_units_ceil_cost(exUnits.wasm, exUnitPrices.wasm);
      return new this.BigNum(ret, this._ctx);
    });
  }

  createSendAll(address: WasmContract.Address, utxos: WasmContract.TransactionUnspentOutputs, config: WasmContract.TransactionBuilderConfig): Promise<WasmContract.TransactionBatchList> {
    return wrapByPromise(() => {
      const ret = WasmV4.create_send_all(address.wasm, utxos.wasm, config.wasm);
      return new this.TransactionBatchList(ret, this._ctx);
    });
  }

  decodeArbitraryBytesFromMetadatum(metadata: WasmContract.TransactionMetadatum): Promise<Uint8Array> {
    return wrapByPromise(() => {
      return WasmV4.decode_arbitrary_bytes_from_metadatum(metadata.wasm);
    });
  }

  decodeMetadatumToJsonStr(metadatum: WasmContract.TransactionMetadatum, schema: WasmContract.MetadataJsonSchema): Promise<string> {
    return wrapByPromise(() => {
      return WasmV4.decode_metadatum_to_json_str(metadatum.wasm, schema);
    });
  }

  decodePlutusDatumToJsonStr(datum: WasmContract.PlutusData, schema: WasmContract.PlutusDatumSchema): Promise<string> {
    return wrapByPromise(() => {
      return WasmV4.decode_plutus_datum_to_json_str(datum.wasm, schema);
    });
  }

  decryptWithPassword(password: string, data: string): Promise<string> {
    return wrapByPromise(() => {
      return WasmV4.decrypt_with_password(password, data);
    });
  }

  encodeArbitraryBytesAsMetadatum(bytes: Uint8Array): Promise<WasmContract.TransactionMetadatum> {
    return wrapByPromise(() => {
      const ret = WasmV4.encode_arbitrary_bytes_as_metadatum(bytes);
      return new this.TransactionMetadatum(ret, this._ctx);
    });
  }

  encodeJsonStrToMetadatum(json: string, schema: WasmContract.MetadataJsonSchema): Promise<WasmContract.TransactionMetadatum> {
    return wrapByPromise(() => {
      const ret = WasmV4.encode_json_str_to_metadatum(json, schema);
      return new this.TransactionMetadatum(ret, this._ctx);
    });
  }

  encodeJsonStrToNativeScript(json: string, selfXpub: string, schema: WasmContract.ScriptSchema): Promise<WasmContract.NativeScript> {
    return wrapByPromise(() => {
      const ret = WasmV4.encode_json_str_to_native_script(json, selfXpub, schema);
      return new this.NativeScript(ret, this._ctx);
    });
  }

  encodeJsonStrToPlutusDatum(json: string, schema: WasmContract.PlutusDatumSchema): Promise<WasmContract.PlutusData> {
    return wrapByPromise(() => {
      const ret = WasmV4.encode_json_str_to_plutus_datum(json, schema);
      return new this.PlutusData(ret, this._ctx);
    });
  }

  encryptWithPassword(password: string, salt: string, nonce: string, data: string): Promise<string> {
    return wrapByPromise(() => {
      return WasmV4.encrypt_with_password(password, salt, nonce, data);
    });
  }

  getDeposit(txbody: WasmContract.TransactionBody, poolDeposit: WasmContract.BigNum, keyDeposit: WasmContract.BigNum): Promise<WasmContract.BigNum> {
    return wrapByPromise(() => {
      const ret = WasmV4.get_deposit(txbody.wasm, poolDeposit.wasm, keyDeposit.wasm);
      return new this.BigNum(ret, this._ctx);
    });
  }

  getImplicitInput(txbody: WasmContract.TransactionBody, poolDeposit: WasmContract.BigNum, keyDeposit: WasmContract.BigNum): Promise<WasmContract.Value> {
    return wrapByPromise(() => {
      const ret = WasmV4.get_implicit_input(txbody.wasm, poolDeposit.wasm, keyDeposit.wasm);
      return new this.Value(ret, this._ctx);
    });
  }

  hashAuxiliaryData(auxiliaryData: WasmContract.AuxiliaryData): Promise<WasmContract.AuxiliaryDataHash> {
    return wrapByPromise(() => {
      const ret = WasmV4.hash_auxiliary_data(auxiliaryData.wasm);
      return new this.AuxiliaryDataHash(ret, this._ctx);
    });
  }

  hashPlutusData(plutusData: WasmContract.PlutusData): Promise<WasmContract.DataHash> {
    return wrapByPromise(() => {
      const ret = WasmV4.hash_plutus_data(plutusData.wasm);
      return new this.DataHash(ret, this._ctx);
    });
  }

  hashScriptData(redeemers: WasmContract.Redeemers, costModels: WasmContract.Costmdls, datums: Optional<WasmContract.PlutusList>): Promise<WasmContract.ScriptDataHash> {
    return wrapByPromise(() => {
      const ret = WasmV4.hash_script_data(redeemers.wasm, costModels.wasm, datums?.wasm);
      return new this.ScriptDataHash(ret, this._ctx);
    });
  }

  hashTransaction(txBody: WasmContract.TransactionBody): Promise<WasmContract.TransactionHash> {
    return wrapByPromise(() => {
      const ret = WasmV4.hash_transaction(txBody.wasm);
      return new this.TransactionHash(ret, this._ctx);
    });
  }

  makeDaedalusBootstrapWitness(txBodyHash: WasmContract.TransactionHash, addr: WasmContract.ByronAddress, key: WasmContract.LegacyDaedalusPrivateKey): Promise<WasmContract.BootstrapWitness> {
    return wrapByPromise(() => {
      const ret = WasmV4.make_daedalus_bootstrap_witness(txBodyHash.wasm, addr.wasm, key.wasm);
      return new this.BootstrapWitness(ret, this._ctx);
    });
  }

  makeIcarusBootstrapWitness(txBodyHash: WasmContract.TransactionHash, addr: WasmContract.ByronAddress, key: WasmContract.Bip32PrivateKey): Promise<WasmContract.BootstrapWitness> {
    return wrapByPromise(() => {
      const ret = WasmV4.make_icarus_bootstrap_witness(txBodyHash.wasm, addr.wasm, key.wasm);
      return new this.BootstrapWitness(ret, this._ctx);
    });
  }

  makeVkeyWitness(txBodyHash: WasmContract.TransactionHash, sk: WasmContract.PrivateKey): Promise<WasmContract.Vkeywitness> {
    return wrapByPromise(() => {
      const ret = WasmV4.make_vkey_witness(txBodyHash.wasm, sk.wasm);
      return new this.Vkeywitness(ret, this._ctx);
    });
  }

  minAdaForOutput(output: WasmContract.TransactionOutput, dataCost: WasmContract.DataCost): Promise<WasmContract.BigNum> {
    return wrapByPromise(() => {
      const ret = WasmV4.min_ada_for_output(output.wasm, dataCost.wasm);
      return new this.BigNum(ret, this._ctx);
    });
  }

  minFee(tx: WasmContract.Transaction, linearFee: WasmContract.LinearFee): Promise<WasmContract.BigNum> {
    return wrapByPromise(() => {
      const ret = WasmV4.min_fee(tx.wasm, linearFee.wasm);
      return new this.BigNum(ret, this._ctx);
    });
  }

  minRefScriptFee(totalRefScriptsSize: number, refScriptCoinsPerByte: WasmContract.UnitInterval): Promise<WasmContract.BigNum> {
    return wrapByPromise(() => {
      const ret = WasmV4.min_ref_script_fee(totalRefScriptsSize, refScriptCoinsPerByte.wasm);
      return new this.BigNum(ret, this._ctx);
    });
  }

  minScriptFee(tx: WasmContract.Transaction, exUnitPrices: WasmContract.ExUnitPrices): Promise<WasmContract.BigNum> {
    return wrapByPromise(() => {
      const ret = WasmV4.min_script_fee(tx.wasm, exUnitPrices.wasm);
      return new this.BigNum(ret, this._ctx);
    });
  }

  public Address = (() => {
    const $outer = this;

    class Address
      extends Ptr<WasmV4.Address>
      implements WasmContract.Address
    {

      static fromBytes(data: Uint8Array): Promise<WasmContract.Address> {
        return wrapByPromise(() => {
          const ret = WasmV4.Address.from_bytes(data);
          return new $outer.Address(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.Address> {
        return wrapByPromise(() => {
          const ret = WasmV4.Address.from_json(json);
          return new $outer.Address(ret, $outer._ctx);
        });
      }

      kind(): Promise<WasmContract.AddressKind> {
        return wrapByPromise(() => {
          return this.wasm.kind();
        });
      }

      paymentCred(): Promise<Optional<WasmContract.Credential>> {
        return wrapByPromise(() => {
          const ret = this.wasm.payment_cred();
          if (ret == null) return undefined;
          return new $outer.Credential(ret, $outer._ctx);
        });
      }

      isMalformed(): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.is_malformed();
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.Address> {
        return wrapByPromise(() => {
          const ret = WasmV4.Address.from_hex(hexStr);
          return new $outer.Address(ret, $outer._ctx);
        });
      }

      toBytes(): Promise<Uint8Array> {
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      toBech32(prefix: Optional<string>): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_bech32(prefix);
        });
      }

      static fromBech32(bechStr: string): Promise<WasmContract.Address> {
        return wrapByPromise(() => {
          const ret = WasmV4.Address.from_bech32(bechStr);
          return new $outer.Address(ret, $outer._ctx);
        });
      }

      networkId(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.network_id();
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.Anchor> {
        return wrapByPromise(() => {
          const ret = WasmV4.Anchor.from_bytes(bytes);
          return new $outer.Anchor(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.Anchor> {
        return wrapByPromise(() => {
          const ret = WasmV4.Anchor.from_hex(hexStr);
          return new $outer.Anchor(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.Anchor> {
        return wrapByPromise(() => {
          const ret = WasmV4.Anchor.from_json(json);
          return new $outer.Anchor(ret, $outer._ctx);
        });
      }

      url(): Promise<WasmContract.URL> {
        return wrapByPromise(() => {
          const ret = this.wasm.url();
          return new $outer.URL(ret, $outer._ctx);
        });
      }

      anchorDataHash(): Promise<WasmContract.AnchorDataHash> {
        return wrapByPromise(() => {
          const ret = this.wasm.anchor_data_hash();
          return new $outer.AnchorDataHash(ret, $outer._ctx);
        });
      }

      static new(anchorUrl: WasmContract.URL, anchorDataHash: WasmContract.AnchorDataHash): Promise<WasmContract.Anchor> {
        return wrapByPromise(() => {
          const ret = WasmV4.Anchor.new(anchorUrl.wasm, anchorDataHash.wasm);
          return new $outer.Anchor(ret, $outer._ctx);
        });
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

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.AnchorDataHash> {
        return wrapByPromise(() => {
          const ret = WasmV4.AnchorDataHash.from_bytes(bytes);
          return new $outer.AnchorDataHash(ret, $outer._ctx);
        });
      }

      toBytes(): Promise<Uint8Array> {
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      toBech32(prefix: string): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_bech32(prefix);
        });
      }

      static fromBech32(bechStr: string): Promise<WasmContract.AnchorDataHash> {
        return wrapByPromise(() => {
          const ret = WasmV4.AnchorDataHash.from_bech32(bechStr);
          return new $outer.AnchorDataHash(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hex: string): Promise<WasmContract.AnchorDataHash> {
        return wrapByPromise(() => {
          const ret = WasmV4.AnchorDataHash.from_hex(hex);
          return new $outer.AnchorDataHash(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.AssetName> {
        return wrapByPromise(() => {
          const ret = WasmV4.AssetName.from_bytes(bytes);
          return new $outer.AssetName(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.AssetName> {
        return wrapByPromise(() => {
          const ret = WasmV4.AssetName.from_hex(hexStr);
          return new $outer.AssetName(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.AssetName> {
        return wrapByPromise(() => {
          const ret = WasmV4.AssetName.from_json(json);
          return new $outer.AssetName(ret, $outer._ctx);
        });
      }

      static new(name: Uint8Array): Promise<WasmContract.AssetName> {
        return wrapByPromise(() => {
          const ret = WasmV4.AssetName.new(name);
          return new $outer.AssetName(ret, $outer._ctx);
        });
      }

      name(): Promise<Uint8Array> {
        return wrapByPromise(() => {
          return this.wasm.name();
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.AssetNames> {
        return wrapByPromise(() => {
          const ret = WasmV4.AssetNames.from_bytes(bytes);
          return new $outer.AssetNames(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.AssetNames> {
        return wrapByPromise(() => {
          const ret = WasmV4.AssetNames.from_hex(hexStr);
          return new $outer.AssetNames(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.AssetNames> {
        return wrapByPromise(() => {
          const ret = WasmV4.AssetNames.from_json(json);
          return new $outer.AssetNames(ret, $outer._ctx);
        });
      }

      static new(): Promise<WasmContract.AssetNames> {
        return wrapByPromise(() => {
          const ret = WasmV4.AssetNames.new();
          return new $outer.AssetNames(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      get(index: number): Promise<WasmContract.AssetName> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(index);
          return new $outer.AssetName(ret, $outer._ctx);
        });
      }

      add(elem: WasmContract.AssetName): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add(elem.wasm);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.Assets> {
        return wrapByPromise(() => {
          const ret = WasmV4.Assets.from_bytes(bytes);
          return new $outer.Assets(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.Assets> {
        return wrapByPromise(() => {
          const ret = WasmV4.Assets.from_hex(hexStr);
          return new $outer.Assets(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.Assets> {
        return wrapByPromise(() => {
          const ret = WasmV4.Assets.from_json(json);
          return new $outer.Assets(ret, $outer._ctx);
        });
      }

      static new(): Promise<WasmContract.Assets> {
        return wrapByPromise(() => {
          const ret = WasmV4.Assets.new();
          return new $outer.Assets(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      insert(key: WasmContract.AssetName, value: WasmContract.BigNum): Promise<Optional<WasmContract.BigNum>> {
        return wrapByPromise(() => {
          const ret = this.wasm.insert(key.wasm, value.wasm);
          if (ret == null) return undefined;
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      get(key: WasmContract.AssetName): Promise<Optional<WasmContract.BigNum>> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(key.wasm);
          if (ret == null) return undefined;
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      keys(): Promise<WasmContract.AssetNames> {
        return wrapByPromise(() => {
          const ret = this.wasm.keys();
          return new $outer.AssetNames(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.AuxiliaryData> {
        return wrapByPromise(() => {
          const ret = WasmV4.AuxiliaryData.from_bytes(bytes);
          return new $outer.AuxiliaryData(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.AuxiliaryData> {
        return wrapByPromise(() => {
          const ret = WasmV4.AuxiliaryData.from_hex(hexStr);
          return new $outer.AuxiliaryData(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.AuxiliaryData> {
        return wrapByPromise(() => {
          const ret = WasmV4.AuxiliaryData.from_json(json);
          return new $outer.AuxiliaryData(ret, $outer._ctx);
        });
      }

      static new(): Promise<WasmContract.AuxiliaryData> {
        return wrapByPromise(() => {
          const ret = WasmV4.AuxiliaryData.new();
          return new $outer.AuxiliaryData(ret, $outer._ctx);
        });
      }

      metadata(): Promise<Optional<WasmContract.GeneralTransactionMetadata>> {
        return wrapByPromise(() => {
          const ret = this.wasm.metadata();
          if (ret == null) return undefined;
          return new $outer.GeneralTransactionMetadata(ret, $outer._ctx);
        });
      }

      setMetadata(metadata: WasmContract.GeneralTransactionMetadata): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_metadata(metadata.wasm);
        });
      }

      nativeScripts(): Promise<Optional<WasmContract.NativeScripts>> {
        return wrapByPromise(() => {
          const ret = this.wasm.native_scripts();
          if (ret == null) return undefined;
          return new $outer.NativeScripts(ret, $outer._ctx);
        });
      }

      setNativeScripts(nativeScripts: WasmContract.NativeScripts): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_native_scripts(nativeScripts.wasm);
        });
      }

      plutusScripts(): Promise<Optional<WasmContract.PlutusScripts>> {
        return wrapByPromise(() => {
          const ret = this.wasm.plutus_scripts();
          if (ret == null) return undefined;
          return new $outer.PlutusScripts(ret, $outer._ctx);
        });
      }

      setPlutusScripts(plutusScripts: WasmContract.PlutusScripts): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_plutus_scripts(plutusScripts.wasm);
        });
      }

      preferAlonzoFormat(): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.prefer_alonzo_format();
        });
      }

      setPreferAlonzoFormat(prefer: boolean): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_prefer_alonzo_format(prefer);
        });
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

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.AuxiliaryDataHash> {
        return wrapByPromise(() => {
          const ret = WasmV4.AuxiliaryDataHash.from_bytes(bytes);
          return new $outer.AuxiliaryDataHash(ret, $outer._ctx);
        });
      }

      toBytes(): Promise<Uint8Array> {
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      toBech32(prefix: string): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_bech32(prefix);
        });
      }

      static fromBech32(bechStr: string): Promise<WasmContract.AuxiliaryDataHash> {
        return wrapByPromise(() => {
          const ret = WasmV4.AuxiliaryDataHash.from_bech32(bechStr);
          return new $outer.AuxiliaryDataHash(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hex: string): Promise<WasmContract.AuxiliaryDataHash> {
        return wrapByPromise(() => {
          const ret = WasmV4.AuxiliaryDataHash.from_hex(hex);
          return new $outer.AuxiliaryDataHash(ret, $outer._ctx);
        });
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

      static new(): Promise<WasmContract.AuxiliaryDataSet> {
        return wrapByPromise(() => {
          const ret = WasmV4.AuxiliaryDataSet.new();
          return new $outer.AuxiliaryDataSet(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      insert(txIndex: number, data: WasmContract.AuxiliaryData): Promise<Optional<WasmContract.AuxiliaryData>> {
        return wrapByPromise(() => {
          const ret = this.wasm.insert(txIndex, data.wasm);
          if (ret == null) return undefined;
          return new $outer.AuxiliaryData(ret, $outer._ctx);
        });
      }

      get(txIndex: number): Promise<Optional<WasmContract.AuxiliaryData>> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(txIndex);
          if (ret == null) return undefined;
          return new $outer.AuxiliaryData(ret, $outer._ctx);
        });
      }

      indices(): Promise<Uint32Array> {
        return wrapByPromise(() => {
          return this.wasm.indices();
        });
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

      static new(network: number, payment: WasmContract.Credential, stake: WasmContract.Credential): Promise<WasmContract.BaseAddress> {
        return wrapByPromise(() => {
          const ret = WasmV4.BaseAddress.new(network, payment.wasm, stake.wasm);
          return new $outer.BaseAddress(ret, $outer._ctx);
        });
      }

      paymentCred(): Promise<WasmContract.Credential> {
        return wrapByPromise(() => {
          const ret = this.wasm.payment_cred();
          return new $outer.Credential(ret, $outer._ctx);
        });
      }

      stakeCred(): Promise<WasmContract.Credential> {
        return wrapByPromise(() => {
          const ret = this.wasm.stake_cred();
          return new $outer.Credential(ret, $outer._ctx);
        });
      }

      toAddress(): Promise<WasmContract.Address> {
        return wrapByPromise(() => {
          const ret = this.wasm.to_address();
          return new $outer.Address(ret, $outer._ctx);
        });
      }

      static fromAddress(addr: WasmContract.Address): Promise<Optional<WasmContract.BaseAddress>> {
        return wrapByPromise(() => {
          const ret = WasmV4.BaseAddress.from_address(addr.wasm);
          if (ret == null) return undefined;
          return new $outer.BaseAddress(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.BigInt> {
        return wrapByPromise(() => {
          const ret = WasmV4.BigInt.from_bytes(bytes);
          return new $outer.BigInt(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.BigInt> {
        return wrapByPromise(() => {
          const ret = WasmV4.BigInt.from_hex(hexStr);
          return new $outer.BigInt(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.BigInt> {
        return wrapByPromise(() => {
          const ret = WasmV4.BigInt.from_json(json);
          return new $outer.BigInt(ret, $outer._ctx);
        });
      }

      isZero(): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.is_zero();
        });
      }

      asU64(): Promise<Optional<WasmContract.BigNum>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_u64();
          if (ret == null) return undefined;
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      asInt(): Promise<Optional<WasmContract.Int>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_int();
          if (ret == null) return undefined;
          return new $outer.Int(ret, $outer._ctx);
        });
      }

      static fromStr(text: string): Promise<WasmContract.BigInt> {
        return wrapByPromise(() => {
          const ret = WasmV4.BigInt.from_str(text);
          return new $outer.BigInt(ret, $outer._ctx);
        });
      }

      toStr(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_str();
        });
      }

      add(other: WasmContract.BigInt): Promise<WasmContract.BigInt> {
        return wrapByPromise(() => {
          const ret = this.wasm.add(other.wasm);
          return new $outer.BigInt(ret, $outer._ctx);
        });
      }

      mul(other: WasmContract.BigInt): Promise<WasmContract.BigInt> {
        return wrapByPromise(() => {
          const ret = this.wasm.mul(other.wasm);
          return new $outer.BigInt(ret, $outer._ctx);
        });
      }

      static one(): Promise<WasmContract.BigInt> {
        return wrapByPromise(() => {
          const ret = WasmV4.BigInt.one();
          return new $outer.BigInt(ret, $outer._ctx);
        });
      }

      increment(): Promise<WasmContract.BigInt> {
        return wrapByPromise(() => {
          const ret = this.wasm.increment();
          return new $outer.BigInt(ret, $outer._ctx);
        });
      }

      divCeil(other: WasmContract.BigInt): Promise<WasmContract.BigInt> {
        return wrapByPromise(() => {
          const ret = this.wasm.div_ceil(other.wasm);
          return new $outer.BigInt(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = WasmV4.BigNum.from_bytes(bytes);
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = WasmV4.BigNum.from_hex(hexStr);
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = WasmV4.BigNum.from_json(json);
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      static fromStr(string: string): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = WasmV4.BigNum.from_str(string);
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      toStr(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_str();
        });
      }

      static zero(): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = WasmV4.BigNum.zero();
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      static one(): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = WasmV4.BigNum.one();
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      isZero(): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.is_zero();
        });
      }

      divFloor(other: WasmContract.BigNum): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = this.wasm.div_floor(other.wasm);
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      checkedMul(other: WasmContract.BigNum): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = this.wasm.checked_mul(other.wasm);
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      checkedAdd(other: WasmContract.BigNum): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = this.wasm.checked_add(other.wasm);
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      checkedSub(other: WasmContract.BigNum): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = this.wasm.checked_sub(other.wasm);
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      clampedSub(other: WasmContract.BigNum): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = this.wasm.clamped_sub(other.wasm);
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      compare(rhsValue: WasmContract.BigNum): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.compare(rhsValue.wasm);
        });
      }

      lessThan(rhsValue: WasmContract.BigNum): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.less_than(rhsValue.wasm);
        });
      }

      static maxValue(): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = WasmV4.BigNum.max_value();
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      static max(a: WasmContract.BigNum, b: WasmContract.BigNum): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = WasmV4.BigNum.max(a.wasm, b.wasm);
          return new $outer.BigNum(ret, $outer._ctx);
        });
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

      derive(index: number): Promise<WasmContract.Bip32PrivateKey> {
        return wrapByPromise(() => {
          const ret = this.wasm.derive(index);
          return new $outer.Bip32PrivateKey(ret, $outer._ctx);
        });
      }

      static from_128Xprv(bytes: Uint8Array): Promise<WasmContract.Bip32PrivateKey> {
        return wrapByPromise(() => {
          const ret = WasmV4.Bip32PrivateKey.from_128_xprv(bytes);
          return new $outer.Bip32PrivateKey(ret, $outer._ctx);
        });
      }

      to_128Xprv(): Promise<Uint8Array> {
        return wrapByPromise(() => {
          return this.wasm.to_128_xprv();
        });
      }

      static generateEd25519Bip32(): Promise<WasmContract.Bip32PrivateKey> {
        return wrapByPromise(() => {
          const ret = WasmV4.Bip32PrivateKey.generate_ed25519_bip32();
          return new $outer.Bip32PrivateKey(ret, $outer._ctx);
        });
      }

      toRawKey(): Promise<WasmContract.PrivateKey> {
        return wrapByPromise(() => {
          const ret = this.wasm.to_raw_key();
          return new $outer.PrivateKey(ret, $outer._ctx);
        });
      }

      toPublic(): Promise<WasmContract.Bip32PublicKey> {
        return wrapByPromise(() => {
          const ret = this.wasm.to_public();
          return new $outer.Bip32PublicKey(ret, $outer._ctx);
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.Bip32PrivateKey> {
        return wrapByPromise(() => {
          const ret = WasmV4.Bip32PrivateKey.from_bytes(bytes);
          return new $outer.Bip32PrivateKey(ret, $outer._ctx);
        });
      }

      asBytes(): Promise<Uint8Array> {
        return wrapByPromise(() => {
          return this.wasm.as_bytes();
        });
      }

      static fromBech32(bech32Str: string): Promise<WasmContract.Bip32PrivateKey> {
        return wrapByPromise(() => {
          const ret = WasmV4.Bip32PrivateKey.from_bech32(bech32Str);
          return new $outer.Bip32PrivateKey(ret, $outer._ctx);
        });
      }

      toBech32(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_bech32();
        });
      }

      static fromBip39Entropy(entropy: Uint8Array, password: Uint8Array): Promise<WasmContract.Bip32PrivateKey> {
        return wrapByPromise(() => {
          const ret = WasmV4.Bip32PrivateKey.from_bip39_entropy(entropy, password);
          return new $outer.Bip32PrivateKey(ret, $outer._ctx);
        });
      }

      chaincode(): Promise<Uint8Array> {
        return wrapByPromise(() => {
          return this.wasm.chaincode();
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.Bip32PrivateKey> {
        return wrapByPromise(() => {
          const ret = WasmV4.Bip32PrivateKey.from_hex(hexStr);
          return new $outer.Bip32PrivateKey(ret, $outer._ctx);
        });
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

      derive(index: number): Promise<WasmContract.Bip32PublicKey> {
        return wrapByPromise(() => {
          const ret = this.wasm.derive(index);
          return new $outer.Bip32PublicKey(ret, $outer._ctx);
        });
      }

      toRawKey(): Promise<WasmContract.PublicKey> {
        return wrapByPromise(() => {
          const ret = this.wasm.to_raw_key();
          return new $outer.PublicKey(ret, $outer._ctx);
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.Bip32PublicKey> {
        return wrapByPromise(() => {
          const ret = WasmV4.Bip32PublicKey.from_bytes(bytes);
          return new $outer.Bip32PublicKey(ret, $outer._ctx);
        });
      }

      asBytes(): Promise<Uint8Array> {
        return wrapByPromise(() => {
          return this.wasm.as_bytes();
        });
      }

      static fromBech32(bech32Str: string): Promise<WasmContract.Bip32PublicKey> {
        return wrapByPromise(() => {
          const ret = WasmV4.Bip32PublicKey.from_bech32(bech32Str);
          return new $outer.Bip32PublicKey(ret, $outer._ctx);
        });
      }

      toBech32(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_bech32();
        });
      }

      chaincode(): Promise<Uint8Array> {
        return wrapByPromise(() => {
          return this.wasm.chaincode();
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.Bip32PublicKey> {
        return wrapByPromise(() => {
          const ret = WasmV4.Bip32PublicKey.from_hex(hexStr);
          return new $outer.Bip32PublicKey(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.Block> {
        return wrapByPromise(() => {
          const ret = WasmV4.Block.from_bytes(bytes);
          return new $outer.Block(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.Block> {
        return wrapByPromise(() => {
          const ret = WasmV4.Block.from_hex(hexStr);
          return new $outer.Block(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.Block> {
        return wrapByPromise(() => {
          const ret = WasmV4.Block.from_json(json);
          return new $outer.Block(ret, $outer._ctx);
        });
      }

      header(): Promise<WasmContract.Header> {
        return wrapByPromise(() => {
          const ret = this.wasm.header();
          return new $outer.Header(ret, $outer._ctx);
        });
      }

      transactionBodies(): Promise<WasmContract.TransactionBodies> {
        return wrapByPromise(() => {
          const ret = this.wasm.transaction_bodies();
          return new $outer.TransactionBodies(ret, $outer._ctx);
        });
      }

      transactionWitnessSets(): Promise<WasmContract.TransactionWitnessSets> {
        return wrapByPromise(() => {
          const ret = this.wasm.transaction_witness_sets();
          return new $outer.TransactionWitnessSets(ret, $outer._ctx);
        });
      }

      auxiliaryDataSet(): Promise<WasmContract.AuxiliaryDataSet> {
        return wrapByPromise(() => {
          const ret = this.wasm.auxiliary_data_set();
          return new $outer.AuxiliaryDataSet(ret, $outer._ctx);
        });
      }

      invalidTransactions(): Promise<Uint32Array> {
        return wrapByPromise(() => {
          return this.wasm.invalid_transactions();
        });
      }

      static new(header: WasmContract.Header, transactionBodies: WasmContract.TransactionBodies, transactionWitnessSets: WasmContract.TransactionWitnessSets, auxiliaryDataSet: WasmContract.AuxiliaryDataSet, invalidTransactions: Uint32Array): Promise<WasmContract.Block> {
        return wrapByPromise(() => {
          const ret = WasmV4.Block.new(header.wasm, transactionBodies.wasm, transactionWitnessSets.wasm, auxiliaryDataSet.wasm, invalidTransactions);
          return new $outer.Block(ret, $outer._ctx);
        });
      }

      static fromWrappedBytes(data: Uint8Array): Promise<WasmContract.Block> {
        return wrapByPromise(() => {
          const ret = WasmV4.Block.from_wrapped_bytes(data);
          return new $outer.Block(ret, $outer._ctx);
        });
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

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.BlockHash> {
        return wrapByPromise(() => {
          const ret = WasmV4.BlockHash.from_bytes(bytes);
          return new $outer.BlockHash(ret, $outer._ctx);
        });
      }

      toBytes(): Promise<Uint8Array> {
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      toBech32(prefix: string): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_bech32(prefix);
        });
      }

      static fromBech32(bechStr: string): Promise<WasmContract.BlockHash> {
        return wrapByPromise(() => {
          const ret = WasmV4.BlockHash.from_bech32(bechStr);
          return new $outer.BlockHash(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hex: string): Promise<WasmContract.BlockHash> {
        return wrapByPromise(() => {
          const ret = WasmV4.BlockHash.from_hex(hex);
          return new $outer.BlockHash(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.BootstrapWitness> {
        return wrapByPromise(() => {
          const ret = WasmV4.BootstrapWitness.from_bytes(bytes);
          return new $outer.BootstrapWitness(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.BootstrapWitness> {
        return wrapByPromise(() => {
          const ret = WasmV4.BootstrapWitness.from_hex(hexStr);
          return new $outer.BootstrapWitness(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.BootstrapWitness> {
        return wrapByPromise(() => {
          const ret = WasmV4.BootstrapWitness.from_json(json);
          return new $outer.BootstrapWitness(ret, $outer._ctx);
        });
      }

      vkey(): Promise<WasmContract.Vkey> {
        return wrapByPromise(() => {
          const ret = this.wasm.vkey();
          return new $outer.Vkey(ret, $outer._ctx);
        });
      }

      signature(): Promise<WasmContract.Ed25519Signature> {
        return wrapByPromise(() => {
          const ret = this.wasm.signature();
          return new $outer.Ed25519Signature(ret, $outer._ctx);
        });
      }

      chainCode(): Promise<Uint8Array> {
        return wrapByPromise(() => {
          return this.wasm.chain_code();
        });
      }

      attributes(): Promise<Uint8Array> {
        return wrapByPromise(() => {
          return this.wasm.attributes();
        });
      }

      static new(vkey: WasmContract.Vkey, signature: WasmContract.Ed25519Signature, chainCode: Uint8Array, attributes: Uint8Array): Promise<WasmContract.BootstrapWitness> {
        return wrapByPromise(() => {
          const ret = WasmV4.BootstrapWitness.new(vkey.wasm, signature.wasm, chainCode, attributes);
          return new $outer.BootstrapWitness(ret, $outer._ctx);
        });
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

      static new(): Promise<WasmContract.BootstrapWitnesses> {
        return wrapByPromise(() => {
          const ret = WasmV4.BootstrapWitnesses.new();
          return new $outer.BootstrapWitnesses(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      get(index: number): Promise<WasmContract.BootstrapWitness> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(index);
          return new $outer.BootstrapWitness(ret, $outer._ctx);
        });
      }

      add(elem: WasmContract.BootstrapWitness): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add(elem.wasm);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_base58();
        });
      }

      toBytes(): Promise<Uint8Array> {
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.ByronAddress> {
        return wrapByPromise(() => {
          const ret = WasmV4.ByronAddress.from_bytes(bytes);
          return new $outer.ByronAddress(ret, $outer._ctx);
        });
      }

      byronProtocolMagic(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.byron_protocol_magic();
        });
      }

      attributes(): Promise<Uint8Array> {
        return wrapByPromise(() => {
          return this.wasm.attributes();
        });
      }

      networkId(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.network_id();
        });
      }

      static fromBase58(s: string): Promise<WasmContract.ByronAddress> {
        return wrapByPromise(() => {
          const ret = WasmV4.ByronAddress.from_base58(s);
          return new $outer.ByronAddress(ret, $outer._ctx);
        });
      }

      static icarusFromKey(key: WasmContract.Bip32PublicKey, protocolMagic: number): Promise<WasmContract.ByronAddress> {
        return wrapByPromise(() => {
          const ret = WasmV4.ByronAddress.icarus_from_key(key.wasm, protocolMagic);
          return new $outer.ByronAddress(ret, $outer._ctx);
        });
      }

      static isValid(s: string): Promise<boolean> {
        return wrapByPromise(() => {
          return WasmV4.ByronAddress.is_valid(s);
        });
      }

      toAddress(): Promise<WasmContract.Address> {
        return wrapByPromise(() => {
          const ret = this.wasm.to_address();
          return new $outer.Address(ret, $outer._ctx);
        });
      }

      static fromAddress(addr: WasmContract.Address): Promise<Optional<WasmContract.ByronAddress>> {
        return wrapByPromise(() => {
          const ret = WasmV4.ByronAddress.from_address(addr.wasm);
          if (ret == null) return undefined;
          return new $outer.ByronAddress(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.Certificate> {
        return wrapByPromise(() => {
          const ret = WasmV4.Certificate.from_bytes(bytes);
          return new $outer.Certificate(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.Certificate> {
        return wrapByPromise(() => {
          const ret = WasmV4.Certificate.from_hex(hexStr);
          return new $outer.Certificate(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.Certificate> {
        return wrapByPromise(() => {
          const ret = WasmV4.Certificate.from_json(json);
          return new $outer.Certificate(ret, $outer._ctx);
        });
      }

      static newStakeRegistration(stakeRegistration: WasmContract.StakeRegistration): Promise<WasmContract.Certificate> {
        return wrapByPromise(() => {
          const ret = WasmV4.Certificate.new_stake_registration(stakeRegistration.wasm);
          return new $outer.Certificate(ret, $outer._ctx);
        });
      }

      static newStakeDeregistration(stakeDeregistration: WasmContract.StakeDeregistration): Promise<WasmContract.Certificate> {
        return wrapByPromise(() => {
          const ret = WasmV4.Certificate.new_stake_deregistration(stakeDeregistration.wasm);
          return new $outer.Certificate(ret, $outer._ctx);
        });
      }

      static newStakeDelegation(stakeDelegation: WasmContract.StakeDelegation): Promise<WasmContract.Certificate> {
        return wrapByPromise(() => {
          const ret = WasmV4.Certificate.new_stake_delegation(stakeDelegation.wasm);
          return new $outer.Certificate(ret, $outer._ctx);
        });
      }

      static newPoolRegistration(poolRegistration: WasmContract.PoolRegistration): Promise<WasmContract.Certificate> {
        return wrapByPromise(() => {
          const ret = WasmV4.Certificate.new_pool_registration(poolRegistration.wasm);
          return new $outer.Certificate(ret, $outer._ctx);
        });
      }

      static newPoolRetirement(poolRetirement: WasmContract.PoolRetirement): Promise<WasmContract.Certificate> {
        return wrapByPromise(() => {
          const ret = WasmV4.Certificate.new_pool_retirement(poolRetirement.wasm);
          return new $outer.Certificate(ret, $outer._ctx);
        });
      }

      static newGenesisKeyDelegation(genesisKeyDelegation: WasmContract.GenesisKeyDelegation): Promise<WasmContract.Certificate> {
        return wrapByPromise(() => {
          const ret = WasmV4.Certificate.new_genesis_key_delegation(genesisKeyDelegation.wasm);
          return new $outer.Certificate(ret, $outer._ctx);
        });
      }

      static newMoveInstantaneousRewardsCert(moveInstantaneousRewardsCert: WasmContract.MoveInstantaneousRewardsCert): Promise<WasmContract.Certificate> {
        return wrapByPromise(() => {
          const ret = WasmV4.Certificate.new_move_instantaneous_rewards_cert(moveInstantaneousRewardsCert.wasm);
          return new $outer.Certificate(ret, $outer._ctx);
        });
      }

      static newCommitteeHotAuth(committeeHotAuth: WasmContract.CommitteeHotAuth): Promise<WasmContract.Certificate> {
        return wrapByPromise(() => {
          const ret = WasmV4.Certificate.new_committee_hot_auth(committeeHotAuth.wasm);
          return new $outer.Certificate(ret, $outer._ctx);
        });
      }

      static newCommitteeColdResign(committeeColdResign: WasmContract.CommitteeColdResign): Promise<WasmContract.Certificate> {
        return wrapByPromise(() => {
          const ret = WasmV4.Certificate.new_committee_cold_resign(committeeColdResign.wasm);
          return new $outer.Certificate(ret, $outer._ctx);
        });
      }

      static newDrepDeregistration(drepDeregistration: WasmContract.DrepDeregistration): Promise<WasmContract.Certificate> {
        return wrapByPromise(() => {
          const ret = WasmV4.Certificate.new_drep_deregistration(drepDeregistration.wasm);
          return new $outer.Certificate(ret, $outer._ctx);
        });
      }

      static newDrepRegistration(drepRegistration: WasmContract.DrepRegistration): Promise<WasmContract.Certificate> {
        return wrapByPromise(() => {
          const ret = WasmV4.Certificate.new_drep_registration(drepRegistration.wasm);
          return new $outer.Certificate(ret, $outer._ctx);
        });
      }

      static newDrepUpdate(drepUpdate: WasmContract.DrepUpdate): Promise<WasmContract.Certificate> {
        return wrapByPromise(() => {
          const ret = WasmV4.Certificate.new_drep_update(drepUpdate.wasm);
          return new $outer.Certificate(ret, $outer._ctx);
        });
      }

      static newStakeAndVoteDelegation(stakeAndVoteDelegation: WasmContract.StakeAndVoteDelegation): Promise<WasmContract.Certificate> {
        return wrapByPromise(() => {
          const ret = WasmV4.Certificate.new_stake_and_vote_delegation(stakeAndVoteDelegation.wasm);
          return new $outer.Certificate(ret, $outer._ctx);
        });
      }

      static newStakeRegistrationAndDelegation(stakeRegistrationAndDelegation: WasmContract.StakeRegistrationAndDelegation): Promise<WasmContract.Certificate> {
        return wrapByPromise(() => {
          const ret = WasmV4.Certificate.new_stake_registration_and_delegation(stakeRegistrationAndDelegation.wasm);
          return new $outer.Certificate(ret, $outer._ctx);
        });
      }

      static newStakeVoteRegistrationAndDelegation(stakeVoteRegistrationAndDelegation: WasmContract.StakeVoteRegistrationAndDelegation): Promise<WasmContract.Certificate> {
        return wrapByPromise(() => {
          const ret = WasmV4.Certificate.new_stake_vote_registration_and_delegation(stakeVoteRegistrationAndDelegation.wasm);
          return new $outer.Certificate(ret, $outer._ctx);
        });
      }

      static newVoteDelegation(voteDelegation: WasmContract.VoteDelegation): Promise<WasmContract.Certificate> {
        return wrapByPromise(() => {
          const ret = WasmV4.Certificate.new_vote_delegation(voteDelegation.wasm);
          return new $outer.Certificate(ret, $outer._ctx);
        });
      }

      static newVoteRegistrationAndDelegation(voteRegistrationAndDelegation: WasmContract.VoteRegistrationAndDelegation): Promise<WasmContract.Certificate> {
        return wrapByPromise(() => {
          const ret = WasmV4.Certificate.new_vote_registration_and_delegation(voteRegistrationAndDelegation.wasm);
          return new $outer.Certificate(ret, $outer._ctx);
        });
      }

      kind(): Promise<WasmContract.CertificateKind> {
        return wrapByPromise(() => {
          return this.wasm.kind();
        });
      }

      asStakeRegistration(): Promise<Optional<WasmContract.StakeRegistration>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_stake_registration();
          if (ret == null) return undefined;
          return new $outer.StakeRegistration(ret, $outer._ctx);
        });
      }

      asStakeDeregistration(): Promise<Optional<WasmContract.StakeDeregistration>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_stake_deregistration();
          if (ret == null) return undefined;
          return new $outer.StakeDeregistration(ret, $outer._ctx);
        });
      }

      asStakeDelegation(): Promise<Optional<WasmContract.StakeDelegation>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_stake_delegation();
          if (ret == null) return undefined;
          return new $outer.StakeDelegation(ret, $outer._ctx);
        });
      }

      asPoolRegistration(): Promise<Optional<WasmContract.PoolRegistration>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_pool_registration();
          if (ret == null) return undefined;
          return new $outer.PoolRegistration(ret, $outer._ctx);
        });
      }

      asPoolRetirement(): Promise<Optional<WasmContract.PoolRetirement>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_pool_retirement();
          if (ret == null) return undefined;
          return new $outer.PoolRetirement(ret, $outer._ctx);
        });
      }

      asGenesisKeyDelegation(): Promise<Optional<WasmContract.GenesisKeyDelegation>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_genesis_key_delegation();
          if (ret == null) return undefined;
          return new $outer.GenesisKeyDelegation(ret, $outer._ctx);
        });
      }

      asMoveInstantaneousRewardsCert(): Promise<Optional<WasmContract.MoveInstantaneousRewardsCert>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_move_instantaneous_rewards_cert();
          if (ret == null) return undefined;
          return new $outer.MoveInstantaneousRewardsCert(ret, $outer._ctx);
        });
      }

      asCommitteeHotAuth(): Promise<Optional<WasmContract.CommitteeHotAuth>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_committee_hot_auth();
          if (ret == null) return undefined;
          return new $outer.CommitteeHotAuth(ret, $outer._ctx);
        });
      }

      asCommitteeColdResign(): Promise<Optional<WasmContract.CommitteeColdResign>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_committee_cold_resign();
          if (ret == null) return undefined;
          return new $outer.CommitteeColdResign(ret, $outer._ctx);
        });
      }

      asDrepDeregistration(): Promise<Optional<WasmContract.DrepDeregistration>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_drep_deregistration();
          if (ret == null) return undefined;
          return new $outer.DrepDeregistration(ret, $outer._ctx);
        });
      }

      asDrepRegistration(): Promise<Optional<WasmContract.DrepRegistration>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_drep_registration();
          if (ret == null) return undefined;
          return new $outer.DrepRegistration(ret, $outer._ctx);
        });
      }

      asDrepUpdate(): Promise<Optional<WasmContract.DrepUpdate>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_drep_update();
          if (ret == null) return undefined;
          return new $outer.DrepUpdate(ret, $outer._ctx);
        });
      }

      asStakeAndVoteDelegation(): Promise<Optional<WasmContract.StakeAndVoteDelegation>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_stake_and_vote_delegation();
          if (ret == null) return undefined;
          return new $outer.StakeAndVoteDelegation(ret, $outer._ctx);
        });
      }

      asStakeRegistrationAndDelegation(): Promise<Optional<WasmContract.StakeRegistrationAndDelegation>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_stake_registration_and_delegation();
          if (ret == null) return undefined;
          return new $outer.StakeRegistrationAndDelegation(ret, $outer._ctx);
        });
      }

      asStakeVoteRegistrationAndDelegation(): Promise<Optional<WasmContract.StakeVoteRegistrationAndDelegation>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_stake_vote_registration_and_delegation();
          if (ret == null) return undefined;
          return new $outer.StakeVoteRegistrationAndDelegation(ret, $outer._ctx);
        });
      }

      asVoteDelegation(): Promise<Optional<WasmContract.VoteDelegation>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_vote_delegation();
          if (ret == null) return undefined;
          return new $outer.VoteDelegation(ret, $outer._ctx);
        });
      }

      asVoteRegistrationAndDelegation(): Promise<Optional<WasmContract.VoteRegistrationAndDelegation>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_vote_registration_and_delegation();
          if (ret == null) return undefined;
          return new $outer.VoteRegistrationAndDelegation(ret, $outer._ctx);
        });
      }

      hasRequiredScriptWitness(): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.has_required_script_witness();
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.Certificates> {
        return wrapByPromise(() => {
          const ret = WasmV4.Certificates.from_bytes(bytes);
          return new $outer.Certificates(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.Certificates> {
        return wrapByPromise(() => {
          const ret = WasmV4.Certificates.from_hex(hexStr);
          return new $outer.Certificates(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.Certificates> {
        return wrapByPromise(() => {
          const ret = WasmV4.Certificates.from_json(json);
          return new $outer.Certificates(ret, $outer._ctx);
        });
      }

      static new(): Promise<WasmContract.Certificates> {
        return wrapByPromise(() => {
          const ret = WasmV4.Certificates.new();
          return new $outer.Certificates(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      get(index: number): Promise<WasmContract.Certificate> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(index);
          return new $outer.Certificate(ret, $outer._ctx);
        });
      }

      add(elem: WasmContract.Certificate): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add(elem.wasm);
        });
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

      static new(): Promise<WasmContract.CertificatesBuilder> {
        return wrapByPromise(() => {
          const ret = WasmV4.CertificatesBuilder.new();
          return new $outer.CertificatesBuilder(ret, $outer._ctx);
        });
      }

      add(cert: WasmContract.Certificate): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add(cert.wasm);
        });
      }

      addWithPlutusWitness(cert: WasmContract.Certificate, witness: WasmContract.PlutusWitness): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add_with_plutus_witness(cert.wasm, witness.wasm);
        });
      }

      addWithNativeScript(cert: WasmContract.Certificate, nativeScriptSource: WasmContract.NativeScriptSource): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add_with_native_script(cert.wasm, nativeScriptSource.wasm);
        });
      }

      getPlutusWitnesses(): Promise<WasmContract.PlutusWitnesses> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_plutus_witnesses();
          return new $outer.PlutusWitnesses(ret, $outer._ctx);
        });
      }

      getRefInputs(): Promise<WasmContract.TransactionInputs> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_ref_inputs();
          return new $outer.TransactionInputs(ret, $outer._ctx);
        });
      }

      getNativeScripts(): Promise<WasmContract.NativeScripts> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_native_scripts();
          return new $outer.NativeScripts(ret, $outer._ctx);
        });
      }

      getCertificatesRefund(poolDeposit: WasmContract.BigNum, keyDeposit: WasmContract.BigNum): Promise<WasmContract.Value> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_certificates_refund(poolDeposit.wasm, keyDeposit.wasm);
          return new $outer.Value(ret, $outer._ctx);
        });
      }

      getCertificatesDeposit(poolDeposit: WasmContract.BigNum, keyDeposit: WasmContract.BigNum): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_certificates_deposit(poolDeposit.wasm, keyDeposit.wasm);
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      hasPlutusScripts(): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.has_plutus_scripts();
        });
      }

      build(): Promise<WasmContract.Certificates> {
        return wrapByPromise(() => {
          const ret = this.wasm.build();
          return new $outer.Certificates(ret, $outer._ctx);
        });
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

      static new(address: WasmContract.Address): Promise<WasmContract.ChangeConfig> {
        return wrapByPromise(() => {
          const ret = WasmV4.ChangeConfig.new(address.wasm);
          return new $outer.ChangeConfig(ret, $outer._ctx);
        });
      }

      changeAddress(address: WasmContract.Address): Promise<WasmContract.ChangeConfig> {
        return wrapByPromise(() => {
          const ret = this.wasm.change_address(address.wasm);
          return new $outer.ChangeConfig(ret, $outer._ctx);
        });
      }

      changePlutusData(plutusData: WasmContract.OutputDatum): Promise<WasmContract.ChangeConfig> {
        return wrapByPromise(() => {
          const ret = this.wasm.change_plutus_data(plutusData.wasm);
          return new $outer.ChangeConfig(ret, $outer._ctx);
        });
      }

      changeScriptRef(scriptRef: WasmContract.ScriptRef): Promise<WasmContract.ChangeConfig> {
        return wrapByPromise(() => {
          const ret = this.wasm.change_script_ref(scriptRef.wasm);
          return new $outer.ChangeConfig(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.Committee> {
        return wrapByPromise(() => {
          const ret = WasmV4.Committee.from_bytes(bytes);
          return new $outer.Committee(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.Committee> {
        return wrapByPromise(() => {
          const ret = WasmV4.Committee.from_hex(hexStr);
          return new $outer.Committee(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.Committee> {
        return wrapByPromise(() => {
          const ret = WasmV4.Committee.from_json(json);
          return new $outer.Committee(ret, $outer._ctx);
        });
      }

      static new(quorumThreshold: WasmContract.UnitInterval): Promise<WasmContract.Committee> {
        return wrapByPromise(() => {
          const ret = WasmV4.Committee.new(quorumThreshold.wasm);
          return new $outer.Committee(ret, $outer._ctx);
        });
      }

      membersKeys(): Promise<WasmContract.Credentials> {
        return wrapByPromise(() => {
          const ret = this.wasm.members_keys();
          return new $outer.Credentials(ret, $outer._ctx);
        });
      }

      quorumThreshold(): Promise<WasmContract.UnitInterval> {
        return wrapByPromise(() => {
          const ret = this.wasm.quorum_threshold();
          return new $outer.UnitInterval(ret, $outer._ctx);
        });
      }

      addMember(committeeColdCredential: WasmContract.Credential, epoch: number): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add_member(committeeColdCredential.wasm, epoch);
        });
      }

      getMemberEpoch(committeeColdCredential: WasmContract.Credential): Promise<Optional<number>> {
        return wrapByPromise(() => {
          return this.wasm.get_member_epoch(committeeColdCredential.wasm);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.CommitteeColdResign> {
        return wrapByPromise(() => {
          const ret = WasmV4.CommitteeColdResign.from_bytes(bytes);
          return new $outer.CommitteeColdResign(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.CommitteeColdResign> {
        return wrapByPromise(() => {
          const ret = WasmV4.CommitteeColdResign.from_hex(hexStr);
          return new $outer.CommitteeColdResign(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.CommitteeColdResign> {
        return wrapByPromise(() => {
          const ret = WasmV4.CommitteeColdResign.from_json(json);
          return new $outer.CommitteeColdResign(ret, $outer._ctx);
        });
      }

      committeeColdKey(): Promise<WasmContract.Credential> {
        return wrapByPromise(() => {
          const ret = this.wasm.committee_cold_key();
          return new $outer.Credential(ret, $outer._ctx);
        });
      }

      anchor(): Promise<Optional<WasmContract.Anchor>> {
        return wrapByPromise(() => {
          const ret = this.wasm.anchor();
          if (ret == null) return undefined;
          return new $outer.Anchor(ret, $outer._ctx);
        });
      }

      static new(committeeColdKey: WasmContract.Credential): Promise<WasmContract.CommitteeColdResign> {
        return wrapByPromise(() => {
          const ret = WasmV4.CommitteeColdResign.new(committeeColdKey.wasm);
          return new $outer.CommitteeColdResign(ret, $outer._ctx);
        });
      }

      static newWithAnchor(committeeColdKey: WasmContract.Credential, anchor: WasmContract.Anchor): Promise<WasmContract.CommitteeColdResign> {
        return wrapByPromise(() => {
          const ret = WasmV4.CommitteeColdResign.new_with_anchor(committeeColdKey.wasm, anchor.wasm);
          return new $outer.CommitteeColdResign(ret, $outer._ctx);
        });
      }

      hasScriptCredentials(): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.has_script_credentials();
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.CommitteeHotAuth> {
        return wrapByPromise(() => {
          const ret = WasmV4.CommitteeHotAuth.from_bytes(bytes);
          return new $outer.CommitteeHotAuth(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.CommitteeHotAuth> {
        return wrapByPromise(() => {
          const ret = WasmV4.CommitteeHotAuth.from_hex(hexStr);
          return new $outer.CommitteeHotAuth(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.CommitteeHotAuth> {
        return wrapByPromise(() => {
          const ret = WasmV4.CommitteeHotAuth.from_json(json);
          return new $outer.CommitteeHotAuth(ret, $outer._ctx);
        });
      }

      committeeColdKey(): Promise<WasmContract.Credential> {
        return wrapByPromise(() => {
          const ret = this.wasm.committee_cold_key();
          return new $outer.Credential(ret, $outer._ctx);
        });
      }

      committeeHotKey(): Promise<WasmContract.Credential> {
        return wrapByPromise(() => {
          const ret = this.wasm.committee_hot_key();
          return new $outer.Credential(ret, $outer._ctx);
        });
      }

      static new(committeeColdKey: WasmContract.Credential, committeeHotKey: WasmContract.Credential): Promise<WasmContract.CommitteeHotAuth> {
        return wrapByPromise(() => {
          const ret = WasmV4.CommitteeHotAuth.new(committeeColdKey.wasm, committeeHotKey.wasm);
          return new $outer.CommitteeHotAuth(ret, $outer._ctx);
        });
      }

      hasScriptCredentials(): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.has_script_credentials();
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.Constitution> {
        return wrapByPromise(() => {
          const ret = WasmV4.Constitution.from_bytes(bytes);
          return new $outer.Constitution(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.Constitution> {
        return wrapByPromise(() => {
          const ret = WasmV4.Constitution.from_hex(hexStr);
          return new $outer.Constitution(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.Constitution> {
        return wrapByPromise(() => {
          const ret = WasmV4.Constitution.from_json(json);
          return new $outer.Constitution(ret, $outer._ctx);
        });
      }

      anchor(): Promise<WasmContract.Anchor> {
        return wrapByPromise(() => {
          const ret = this.wasm.anchor();
          return new $outer.Anchor(ret, $outer._ctx);
        });
      }

      scriptHash(): Promise<Optional<WasmContract.ScriptHash>> {
        return wrapByPromise(() => {
          const ret = this.wasm.script_hash();
          if (ret == null) return undefined;
          return new $outer.ScriptHash(ret, $outer._ctx);
        });
      }

      static new(anchor: WasmContract.Anchor): Promise<WasmContract.Constitution> {
        return wrapByPromise(() => {
          const ret = WasmV4.Constitution.new(anchor.wasm);
          return new $outer.Constitution(ret, $outer._ctx);
        });
      }

      static newWithScriptHash(anchor: WasmContract.Anchor, scriptHash: WasmContract.ScriptHash): Promise<WasmContract.Constitution> {
        return wrapByPromise(() => {
          const ret = WasmV4.Constitution.new_with_script_hash(anchor.wasm, scriptHash.wasm);
          return new $outer.Constitution(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.ConstrPlutusData> {
        return wrapByPromise(() => {
          const ret = WasmV4.ConstrPlutusData.from_bytes(bytes);
          return new $outer.ConstrPlutusData(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.ConstrPlutusData> {
        return wrapByPromise(() => {
          const ret = WasmV4.ConstrPlutusData.from_hex(hexStr);
          return new $outer.ConstrPlutusData(ret, $outer._ctx);
        });
      }

      alternative(): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = this.wasm.alternative();
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      data(): Promise<WasmContract.PlutusList> {
        return wrapByPromise(() => {
          const ret = this.wasm.data();
          return new $outer.PlutusList(ret, $outer._ctx);
        });
      }

      static new(alternative: WasmContract.BigNum, data: WasmContract.PlutusList): Promise<WasmContract.ConstrPlutusData> {
        return wrapByPromise(() => {
          const ret = WasmV4.ConstrPlutusData.new(alternative.wasm, data.wasm);
          return new $outer.ConstrPlutusData(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.CostModel> {
        return wrapByPromise(() => {
          const ret = WasmV4.CostModel.from_bytes(bytes);
          return new $outer.CostModel(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.CostModel> {
        return wrapByPromise(() => {
          const ret = WasmV4.CostModel.from_hex(hexStr);
          return new $outer.CostModel(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.CostModel> {
        return wrapByPromise(() => {
          const ret = WasmV4.CostModel.from_json(json);
          return new $outer.CostModel(ret, $outer._ctx);
        });
      }

      static new(): Promise<WasmContract.CostModel> {
        return wrapByPromise(() => {
          const ret = WasmV4.CostModel.new();
          return new $outer.CostModel(ret, $outer._ctx);
        });
      }

      set(operation: number, cost: WasmContract.Int): Promise<WasmContract.Int> {
        return wrapByPromise(() => {
          const ret = this.wasm.set(operation, cost.wasm);
          return new $outer.Int(ret, $outer._ctx);
        });
      }

      get(operation: number): Promise<WasmContract.Int> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(operation);
          return new $outer.Int(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.Costmdls> {
        return wrapByPromise(() => {
          const ret = WasmV4.Costmdls.from_bytes(bytes);
          return new $outer.Costmdls(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.Costmdls> {
        return wrapByPromise(() => {
          const ret = WasmV4.Costmdls.from_hex(hexStr);
          return new $outer.Costmdls(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.Costmdls> {
        return wrapByPromise(() => {
          const ret = WasmV4.Costmdls.from_json(json);
          return new $outer.Costmdls(ret, $outer._ctx);
        });
      }

      static new(): Promise<WasmContract.Costmdls> {
        return wrapByPromise(() => {
          const ret = WasmV4.Costmdls.new();
          return new $outer.Costmdls(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      insert(key: WasmContract.Language, value: WasmContract.CostModel): Promise<Optional<WasmContract.CostModel>> {
        return wrapByPromise(() => {
          const ret = this.wasm.insert(key.wasm, value.wasm);
          if (ret == null) return undefined;
          return new $outer.CostModel(ret, $outer._ctx);
        });
      }

      get(key: WasmContract.Language): Promise<Optional<WasmContract.CostModel>> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(key.wasm);
          if (ret == null) return undefined;
          return new $outer.CostModel(ret, $outer._ctx);
        });
      }

      keys(): Promise<WasmContract.Languages> {
        return wrapByPromise(() => {
          const ret = this.wasm.keys();
          return new $outer.Languages(ret, $outer._ctx);
        });
      }

      retainLanguageVersions(languages: WasmContract.Languages): Promise<WasmContract.Costmdls> {
        return wrapByPromise(() => {
          const ret = this.wasm.retain_language_versions(languages.wasm);
          return new $outer.Costmdls(ret, $outer._ctx);
        });
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

      static fromKeyhash(hash: WasmContract.Ed25519KeyHash): Promise<WasmContract.Credential> {
        return wrapByPromise(() => {
          const ret = WasmV4.Credential.from_keyhash(hash.wasm);
          return new $outer.Credential(ret, $outer._ctx);
        });
      }

      static fromScripthash(hash: WasmContract.ScriptHash): Promise<WasmContract.Credential> {
        return wrapByPromise(() => {
          const ret = WasmV4.Credential.from_scripthash(hash.wasm);
          return new $outer.Credential(ret, $outer._ctx);
        });
      }

      toKeyhash(): Promise<Optional<WasmContract.Ed25519KeyHash>> {
        return wrapByPromise(() => {
          const ret = this.wasm.to_keyhash();
          if (ret == null) return undefined;
          return new $outer.Ed25519KeyHash(ret, $outer._ctx);
        });
      }

      toScripthash(): Promise<Optional<WasmContract.ScriptHash>> {
        return wrapByPromise(() => {
          const ret = this.wasm.to_scripthash();
          if (ret == null) return undefined;
          return new $outer.ScriptHash(ret, $outer._ctx);
        });
      }

      kind(): Promise<WasmContract.CredKind> {
        return wrapByPromise(() => {
          return this.wasm.kind();
        });
      }

      hasScriptHash(): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.has_script_hash();
        });
      }

      toBytes(): Promise<Uint8Array> {
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.Credential> {
        return wrapByPromise(() => {
          const ret = WasmV4.Credential.from_bytes(bytes);
          return new $outer.Credential(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.Credential> {
        return wrapByPromise(() => {
          const ret = WasmV4.Credential.from_hex(hexStr);
          return new $outer.Credential(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.Credential> {
        return wrapByPromise(() => {
          const ret = WasmV4.Credential.from_json(json);
          return new $outer.Credential(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.Credentials> {
        return wrapByPromise(() => {
          const ret = WasmV4.Credentials.from_bytes(bytes);
          return new $outer.Credentials(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.Credentials> {
        return wrapByPromise(() => {
          const ret = WasmV4.Credentials.from_hex(hexStr);
          return new $outer.Credentials(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.Credentials> {
        return wrapByPromise(() => {
          const ret = WasmV4.Credentials.from_json(json);
          return new $outer.Credentials(ret, $outer._ctx);
        });
      }

      static new(): Promise<WasmContract.Credentials> {
        return wrapByPromise(() => {
          const ret = WasmV4.Credentials.new();
          return new $outer.Credentials(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      get(index: number): Promise<WasmContract.Credential> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(index);
          return new $outer.Credential(ret, $outer._ctx);
        });
      }

      add(elem: WasmContract.Credential): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add(elem.wasm);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.DNSRecordAorAAAA> {
        return wrapByPromise(() => {
          const ret = WasmV4.DNSRecordAorAAAA.from_bytes(bytes);
          return new $outer.DNSRecordAorAAAA(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.DNSRecordAorAAAA> {
        return wrapByPromise(() => {
          const ret = WasmV4.DNSRecordAorAAAA.from_hex(hexStr);
          return new $outer.DNSRecordAorAAAA(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.DNSRecordAorAAAA> {
        return wrapByPromise(() => {
          const ret = WasmV4.DNSRecordAorAAAA.from_json(json);
          return new $outer.DNSRecordAorAAAA(ret, $outer._ctx);
        });
      }

      static new(dnsName: string): Promise<WasmContract.DNSRecordAorAAAA> {
        return wrapByPromise(() => {
          const ret = WasmV4.DNSRecordAorAAAA.new(dnsName);
          return new $outer.DNSRecordAorAAAA(ret, $outer._ctx);
        });
      }

      record(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.record();
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.DNSRecordSRV> {
        return wrapByPromise(() => {
          const ret = WasmV4.DNSRecordSRV.from_bytes(bytes);
          return new $outer.DNSRecordSRV(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.DNSRecordSRV> {
        return wrapByPromise(() => {
          const ret = WasmV4.DNSRecordSRV.from_hex(hexStr);
          return new $outer.DNSRecordSRV(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.DNSRecordSRV> {
        return wrapByPromise(() => {
          const ret = WasmV4.DNSRecordSRV.from_json(json);
          return new $outer.DNSRecordSRV(ret, $outer._ctx);
        });
      }

      static new(dnsName: string): Promise<WasmContract.DNSRecordSRV> {
        return wrapByPromise(() => {
          const ret = WasmV4.DNSRecordSRV.new(dnsName);
          return new $outer.DNSRecordSRV(ret, $outer._ctx);
        });
      }

      record(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.record();
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.DRep> {
        return wrapByPromise(() => {
          const ret = WasmV4.DRep.from_bytes(bytes);
          return new $outer.DRep(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.DRep> {
        return wrapByPromise(() => {
          const ret = WasmV4.DRep.from_hex(hexStr);
          return new $outer.DRep(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.DRep> {
        return wrapByPromise(() => {
          const ret = WasmV4.DRep.from_json(json);
          return new $outer.DRep(ret, $outer._ctx);
        });
      }

      static newKeyHash(keyHash: WasmContract.Ed25519KeyHash): Promise<WasmContract.DRep> {
        return wrapByPromise(() => {
          const ret = WasmV4.DRep.new_key_hash(keyHash.wasm);
          return new $outer.DRep(ret, $outer._ctx);
        });
      }

      static newScriptHash(scriptHash: WasmContract.ScriptHash): Promise<WasmContract.DRep> {
        return wrapByPromise(() => {
          const ret = WasmV4.DRep.new_script_hash(scriptHash.wasm);
          return new $outer.DRep(ret, $outer._ctx);
        });
      }

      static newAlwaysAbstain(): Promise<WasmContract.DRep> {
        return wrapByPromise(() => {
          const ret = WasmV4.DRep.new_always_abstain();
          return new $outer.DRep(ret, $outer._ctx);
        });
      }

      static newAlwaysNoConfidence(): Promise<WasmContract.DRep> {
        return wrapByPromise(() => {
          const ret = WasmV4.DRep.new_always_no_confidence();
          return new $outer.DRep(ret, $outer._ctx);
        });
      }

      kind(): Promise<WasmContract.DRepKind> {
        return wrapByPromise(() => {
          return this.wasm.kind();
        });
      }

      toKeyHash(): Promise<Optional<WasmContract.Ed25519KeyHash>> {
        return wrapByPromise(() => {
          const ret = this.wasm.to_key_hash();
          if (ret == null) return undefined;
          return new $outer.Ed25519KeyHash(ret, $outer._ctx);
        });
      }

      toScriptHash(): Promise<Optional<WasmContract.ScriptHash>> {
        return wrapByPromise(() => {
          const ret = this.wasm.to_script_hash();
          if (ret == null) return undefined;
          return new $outer.ScriptHash(ret, $outer._ctx);
        });
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

      static newCoinsPerByte(coinsPerByte: WasmContract.BigNum): Promise<WasmContract.DataCost> {
        return wrapByPromise(() => {
          const ret = WasmV4.DataCost.new_coins_per_byte(coinsPerByte.wasm);
          return new $outer.DataCost(ret, $outer._ctx);
        });
      }

      coinsPerByte(): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = this.wasm.coins_per_byte();
          return new $outer.BigNum(ret, $outer._ctx);
        });
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

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.DataHash> {
        return wrapByPromise(() => {
          const ret = WasmV4.DataHash.from_bytes(bytes);
          return new $outer.DataHash(ret, $outer._ctx);
        });
      }

      toBytes(): Promise<Uint8Array> {
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      toBech32(prefix: string): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_bech32(prefix);
        });
      }

      static fromBech32(bechStr: string): Promise<WasmContract.DataHash> {
        return wrapByPromise(() => {
          const ret = WasmV4.DataHash.from_bech32(bechStr);
          return new $outer.DataHash(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hex: string): Promise<WasmContract.DataHash> {
        return wrapByPromise(() => {
          const ret = WasmV4.DataHash.from_hex(hex);
          return new $outer.DataHash(ret, $outer._ctx);
        });
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

      static new(datum: WasmContract.PlutusData): Promise<WasmContract.DatumSource> {
        return wrapByPromise(() => {
          const ret = WasmV4.DatumSource.new(datum.wasm);
          return new $outer.DatumSource(ret, $outer._ctx);
        });
      }

      static newRefInput(input: WasmContract.TransactionInput): Promise<WasmContract.DatumSource> {
        return wrapByPromise(() => {
          const ret = WasmV4.DatumSource.new_ref_input(input.wasm);
          return new $outer.DatumSource(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.DrepDeregistration> {
        return wrapByPromise(() => {
          const ret = WasmV4.DrepDeregistration.from_bytes(bytes);
          return new $outer.DrepDeregistration(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.DrepDeregistration> {
        return wrapByPromise(() => {
          const ret = WasmV4.DrepDeregistration.from_hex(hexStr);
          return new $outer.DrepDeregistration(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.DrepDeregistration> {
        return wrapByPromise(() => {
          const ret = WasmV4.DrepDeregistration.from_json(json);
          return new $outer.DrepDeregistration(ret, $outer._ctx);
        });
      }

      votingCredential(): Promise<WasmContract.Credential> {
        return wrapByPromise(() => {
          const ret = this.wasm.voting_credential();
          return new $outer.Credential(ret, $outer._ctx);
        });
      }

      coin(): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = this.wasm.coin();
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      static new(votingCredential: WasmContract.Credential, coin: WasmContract.BigNum): Promise<WasmContract.DrepDeregistration> {
        return wrapByPromise(() => {
          const ret = WasmV4.DrepDeregistration.new(votingCredential.wasm, coin.wasm);
          return new $outer.DrepDeregistration(ret, $outer._ctx);
        });
      }

      hasScriptCredentials(): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.has_script_credentials();
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.DrepRegistration> {
        return wrapByPromise(() => {
          const ret = WasmV4.DrepRegistration.from_bytes(bytes);
          return new $outer.DrepRegistration(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.DrepRegistration> {
        return wrapByPromise(() => {
          const ret = WasmV4.DrepRegistration.from_hex(hexStr);
          return new $outer.DrepRegistration(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.DrepRegistration> {
        return wrapByPromise(() => {
          const ret = WasmV4.DrepRegistration.from_json(json);
          return new $outer.DrepRegistration(ret, $outer._ctx);
        });
      }

      votingCredential(): Promise<WasmContract.Credential> {
        return wrapByPromise(() => {
          const ret = this.wasm.voting_credential();
          return new $outer.Credential(ret, $outer._ctx);
        });
      }

      coin(): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = this.wasm.coin();
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      anchor(): Promise<Optional<WasmContract.Anchor>> {
        return wrapByPromise(() => {
          const ret = this.wasm.anchor();
          if (ret == null) return undefined;
          return new $outer.Anchor(ret, $outer._ctx);
        });
      }

      static new(votingCredential: WasmContract.Credential, coin: WasmContract.BigNum): Promise<WasmContract.DrepRegistration> {
        return wrapByPromise(() => {
          const ret = WasmV4.DrepRegistration.new(votingCredential.wasm, coin.wasm);
          return new $outer.DrepRegistration(ret, $outer._ctx);
        });
      }

      static newWithAnchor(votingCredential: WasmContract.Credential, coin: WasmContract.BigNum, anchor: WasmContract.Anchor): Promise<WasmContract.DrepRegistration> {
        return wrapByPromise(() => {
          const ret = WasmV4.DrepRegistration.new_with_anchor(votingCredential.wasm, coin.wasm, anchor.wasm);
          return new $outer.DrepRegistration(ret, $outer._ctx);
        });
      }

      hasScriptCredentials(): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.has_script_credentials();
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.DrepUpdate> {
        return wrapByPromise(() => {
          const ret = WasmV4.DrepUpdate.from_bytes(bytes);
          return new $outer.DrepUpdate(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.DrepUpdate> {
        return wrapByPromise(() => {
          const ret = WasmV4.DrepUpdate.from_hex(hexStr);
          return new $outer.DrepUpdate(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.DrepUpdate> {
        return wrapByPromise(() => {
          const ret = WasmV4.DrepUpdate.from_json(json);
          return new $outer.DrepUpdate(ret, $outer._ctx);
        });
      }

      votingCredential(): Promise<WasmContract.Credential> {
        return wrapByPromise(() => {
          const ret = this.wasm.voting_credential();
          return new $outer.Credential(ret, $outer._ctx);
        });
      }

      anchor(): Promise<Optional<WasmContract.Anchor>> {
        return wrapByPromise(() => {
          const ret = this.wasm.anchor();
          if (ret == null) return undefined;
          return new $outer.Anchor(ret, $outer._ctx);
        });
      }

      static new(votingCredential: WasmContract.Credential): Promise<WasmContract.DrepUpdate> {
        return wrapByPromise(() => {
          const ret = WasmV4.DrepUpdate.new(votingCredential.wasm);
          return new $outer.DrepUpdate(ret, $outer._ctx);
        });
      }

      static newWithAnchor(votingCredential: WasmContract.Credential, anchor: WasmContract.Anchor): Promise<WasmContract.DrepUpdate> {
        return wrapByPromise(() => {
          const ret = WasmV4.DrepUpdate.new_with_anchor(votingCredential.wasm, anchor.wasm);
          return new $outer.DrepUpdate(ret, $outer._ctx);
        });
      }

      hasScriptCredentials(): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.has_script_credentials();
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.DrepVotingThresholds> {
        return wrapByPromise(() => {
          const ret = WasmV4.DrepVotingThresholds.from_bytes(bytes);
          return new $outer.DrepVotingThresholds(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.DrepVotingThresholds> {
        return wrapByPromise(() => {
          const ret = WasmV4.DrepVotingThresholds.from_hex(hexStr);
          return new $outer.DrepVotingThresholds(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.DrepVotingThresholds> {
        return wrapByPromise(() => {
          const ret = WasmV4.DrepVotingThresholds.from_json(json);
          return new $outer.DrepVotingThresholds(ret, $outer._ctx);
        });
      }

      static new(motionNoConfidence: WasmContract.UnitInterval, committeeNormal: WasmContract.UnitInterval, committeeNoConfidence: WasmContract.UnitInterval, updateConstitution: WasmContract.UnitInterval, hardForkInitiation: WasmContract.UnitInterval, ppNetworkGroup: WasmContract.UnitInterval, ppEconomicGroup: WasmContract.UnitInterval, ppTechnicalGroup: WasmContract.UnitInterval, ppGovernanceGroup: WasmContract.UnitInterval, treasuryWithdrawal: WasmContract.UnitInterval): Promise<WasmContract.DrepVotingThresholds> {
        return wrapByPromise(() => {
          const ret = WasmV4.DrepVotingThresholds.new(motionNoConfidence.wasm, committeeNormal.wasm, committeeNoConfidence.wasm, updateConstitution.wasm, hardForkInitiation.wasm, ppNetworkGroup.wasm, ppEconomicGroup.wasm, ppTechnicalGroup.wasm, ppGovernanceGroup.wasm, treasuryWithdrawal.wasm);
          return new $outer.DrepVotingThresholds(ret, $outer._ctx);
        });
      }

      static newDefault(): Promise<WasmContract.DrepVotingThresholds> {
        return wrapByPromise(() => {
          const ret = WasmV4.DrepVotingThresholds.new_default();
          return new $outer.DrepVotingThresholds(ret, $outer._ctx);
        });
      }

      setMotionNoConfidence(motionNoConfidence: WasmContract.UnitInterval): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_motion_no_confidence(motionNoConfidence.wasm);
        });
      }

      setCommitteeNormal(committeeNormal: WasmContract.UnitInterval): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_committee_normal(committeeNormal.wasm);
        });
      }

      setCommitteeNoConfidence(committeeNoConfidence: WasmContract.UnitInterval): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_committee_no_confidence(committeeNoConfidence.wasm);
        });
      }

      setUpdateConstitution(updateConstitution: WasmContract.UnitInterval): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_update_constitution(updateConstitution.wasm);
        });
      }

      setHardForkInitiation(hardForkInitiation: WasmContract.UnitInterval): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_hard_fork_initiation(hardForkInitiation.wasm);
        });
      }

      setPpNetworkGroup(ppNetworkGroup: WasmContract.UnitInterval): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_pp_network_group(ppNetworkGroup.wasm);
        });
      }

      setPpEconomicGroup(ppEconomicGroup: WasmContract.UnitInterval): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_pp_economic_group(ppEconomicGroup.wasm);
        });
      }

      setPpTechnicalGroup(ppTechnicalGroup: WasmContract.UnitInterval): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_pp_technical_group(ppTechnicalGroup.wasm);
        });
      }

      setPpGovernanceGroup(ppGovernanceGroup: WasmContract.UnitInterval): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_pp_governance_group(ppGovernanceGroup.wasm);
        });
      }

      setTreasuryWithdrawal(treasuryWithdrawal: WasmContract.UnitInterval): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_treasury_withdrawal(treasuryWithdrawal.wasm);
        });
      }

      motionNoConfidence(): Promise<WasmContract.UnitInterval> {
        return wrapByPromise(() => {
          const ret = this.wasm.motion_no_confidence();
          return new $outer.UnitInterval(ret, $outer._ctx);
        });
      }

      committeeNormal(): Promise<WasmContract.UnitInterval> {
        return wrapByPromise(() => {
          const ret = this.wasm.committee_normal();
          return new $outer.UnitInterval(ret, $outer._ctx);
        });
      }

      committeeNoConfidence(): Promise<WasmContract.UnitInterval> {
        return wrapByPromise(() => {
          const ret = this.wasm.committee_no_confidence();
          return new $outer.UnitInterval(ret, $outer._ctx);
        });
      }

      updateConstitution(): Promise<WasmContract.UnitInterval> {
        return wrapByPromise(() => {
          const ret = this.wasm.update_constitution();
          return new $outer.UnitInterval(ret, $outer._ctx);
        });
      }

      hardForkInitiation(): Promise<WasmContract.UnitInterval> {
        return wrapByPromise(() => {
          const ret = this.wasm.hard_fork_initiation();
          return new $outer.UnitInterval(ret, $outer._ctx);
        });
      }

      ppNetworkGroup(): Promise<WasmContract.UnitInterval> {
        return wrapByPromise(() => {
          const ret = this.wasm.pp_network_group();
          return new $outer.UnitInterval(ret, $outer._ctx);
        });
      }

      ppEconomicGroup(): Promise<WasmContract.UnitInterval> {
        return wrapByPromise(() => {
          const ret = this.wasm.pp_economic_group();
          return new $outer.UnitInterval(ret, $outer._ctx);
        });
      }

      ppTechnicalGroup(): Promise<WasmContract.UnitInterval> {
        return wrapByPromise(() => {
          const ret = this.wasm.pp_technical_group();
          return new $outer.UnitInterval(ret, $outer._ctx);
        });
      }

      ppGovernanceGroup(): Promise<WasmContract.UnitInterval> {
        return wrapByPromise(() => {
          const ret = this.wasm.pp_governance_group();
          return new $outer.UnitInterval(ret, $outer._ctx);
        });
      }

      treasuryWithdrawal(): Promise<WasmContract.UnitInterval> {
        return wrapByPromise(() => {
          const ret = this.wasm.treasury_withdrawal();
          return new $outer.UnitInterval(ret, $outer._ctx);
        });
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

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.Ed25519KeyHash> {
        return wrapByPromise(() => {
          const ret = WasmV4.Ed25519KeyHash.from_bytes(bytes);
          return new $outer.Ed25519KeyHash(ret, $outer._ctx);
        });
      }

      toBytes(): Promise<Uint8Array> {
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      toBech32(prefix: string): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_bech32(prefix);
        });
      }

      static fromBech32(bechStr: string): Promise<WasmContract.Ed25519KeyHash> {
        return wrapByPromise(() => {
          const ret = WasmV4.Ed25519KeyHash.from_bech32(bechStr);
          return new $outer.Ed25519KeyHash(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hex: string): Promise<WasmContract.Ed25519KeyHash> {
        return wrapByPromise(() => {
          const ret = WasmV4.Ed25519KeyHash.from_hex(hex);
          return new $outer.Ed25519KeyHash(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.Ed25519KeyHashes> {
        return wrapByPromise(() => {
          const ret = WasmV4.Ed25519KeyHashes.from_bytes(bytes);
          return new $outer.Ed25519KeyHashes(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.Ed25519KeyHashes> {
        return wrapByPromise(() => {
          const ret = WasmV4.Ed25519KeyHashes.from_hex(hexStr);
          return new $outer.Ed25519KeyHashes(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.Ed25519KeyHashes> {
        return wrapByPromise(() => {
          const ret = WasmV4.Ed25519KeyHashes.from_json(json);
          return new $outer.Ed25519KeyHashes(ret, $outer._ctx);
        });
      }

      static new(): Promise<WasmContract.Ed25519KeyHashes> {
        return wrapByPromise(() => {
          const ret = WasmV4.Ed25519KeyHashes.new();
          return new $outer.Ed25519KeyHashes(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      get(index: number): Promise<WasmContract.Ed25519KeyHash> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(index);
          return new $outer.Ed25519KeyHash(ret, $outer._ctx);
        });
      }

      add(elem: WasmContract.Ed25519KeyHash): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add(elem.wasm);
        });
      }

      contains(elem: WasmContract.Ed25519KeyHash): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.contains(elem.wasm);
        });
      }

      toOption(): Promise<Optional<WasmContract.Ed25519KeyHashes>> {
        return wrapByPromise(() => {
          const ret = this.wasm.to_option();
          if (ret == null) return undefined;
          return new $outer.Ed25519KeyHashes(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      toBech32(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_bech32();
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromBech32(bech32Str: string): Promise<WasmContract.Ed25519Signature> {
        return wrapByPromise(() => {
          const ret = WasmV4.Ed25519Signature.from_bech32(bech32Str);
          return new $outer.Ed25519Signature(ret, $outer._ctx);
        });
      }

      static fromHex(input: string): Promise<WasmContract.Ed25519Signature> {
        return wrapByPromise(() => {
          const ret = WasmV4.Ed25519Signature.from_hex(input);
          return new $outer.Ed25519Signature(ret, $outer._ctx);
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.Ed25519Signature> {
        return wrapByPromise(() => {
          const ret = WasmV4.Ed25519Signature.from_bytes(bytes);
          return new $outer.Ed25519Signature(ret, $outer._ctx);
        });
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

      static new(network: number, payment: WasmContract.Credential): Promise<WasmContract.EnterpriseAddress> {
        return wrapByPromise(() => {
          const ret = WasmV4.EnterpriseAddress.new(network, payment.wasm);
          return new $outer.EnterpriseAddress(ret, $outer._ctx);
        });
      }

      paymentCred(): Promise<WasmContract.Credential> {
        return wrapByPromise(() => {
          const ret = this.wasm.payment_cred();
          return new $outer.Credential(ret, $outer._ctx);
        });
      }

      toAddress(): Promise<WasmContract.Address> {
        return wrapByPromise(() => {
          const ret = this.wasm.to_address();
          return new $outer.Address(ret, $outer._ctx);
        });
      }

      static fromAddress(addr: WasmContract.Address): Promise<Optional<WasmContract.EnterpriseAddress>> {
        return wrapByPromise(() => {
          const ret = WasmV4.EnterpriseAddress.from_address(addr.wasm);
          if (ret == null) return undefined;
          return new $outer.EnterpriseAddress(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.ExUnitPrices> {
        return wrapByPromise(() => {
          const ret = WasmV4.ExUnitPrices.from_bytes(bytes);
          return new $outer.ExUnitPrices(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.ExUnitPrices> {
        return wrapByPromise(() => {
          const ret = WasmV4.ExUnitPrices.from_hex(hexStr);
          return new $outer.ExUnitPrices(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.ExUnitPrices> {
        return wrapByPromise(() => {
          const ret = WasmV4.ExUnitPrices.from_json(json);
          return new $outer.ExUnitPrices(ret, $outer._ctx);
        });
      }

      memPrice(): Promise<WasmContract.UnitInterval> {
        return wrapByPromise(() => {
          const ret = this.wasm.mem_price();
          return new $outer.UnitInterval(ret, $outer._ctx);
        });
      }

      stepPrice(): Promise<WasmContract.UnitInterval> {
        return wrapByPromise(() => {
          const ret = this.wasm.step_price();
          return new $outer.UnitInterval(ret, $outer._ctx);
        });
      }

      static new(memPrice: WasmContract.UnitInterval, stepPrice: WasmContract.UnitInterval): Promise<WasmContract.ExUnitPrices> {
        return wrapByPromise(() => {
          const ret = WasmV4.ExUnitPrices.new(memPrice.wasm, stepPrice.wasm);
          return new $outer.ExUnitPrices(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.ExUnits> {
        return wrapByPromise(() => {
          const ret = WasmV4.ExUnits.from_bytes(bytes);
          return new $outer.ExUnits(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.ExUnits> {
        return wrapByPromise(() => {
          const ret = WasmV4.ExUnits.from_hex(hexStr);
          return new $outer.ExUnits(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.ExUnits> {
        return wrapByPromise(() => {
          const ret = WasmV4.ExUnits.from_json(json);
          return new $outer.ExUnits(ret, $outer._ctx);
        });
      }

      mem(): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = this.wasm.mem();
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      steps(): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = this.wasm.steps();
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      static new(mem: WasmContract.BigNum, steps: WasmContract.BigNum): Promise<WasmContract.ExUnits> {
        return wrapByPromise(() => {
          const ret = WasmV4.ExUnits.new(mem.wasm, steps.wasm);
          return new $outer.ExUnits(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.FixedTransaction> {
        return wrapByPromise(() => {
          const ret = WasmV4.FixedTransaction.from_bytes(bytes);
          return new $outer.FixedTransaction(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.FixedTransaction> {
        return wrapByPromise(() => {
          const ret = WasmV4.FixedTransaction.from_hex(hexStr);
          return new $outer.FixedTransaction(ret, $outer._ctx);
        });
      }

      static new(rawBody: Uint8Array, rawWitnessSet: Uint8Array, isValid: boolean): Promise<WasmContract.FixedTransaction> {
        return wrapByPromise(() => {
          const ret = WasmV4.FixedTransaction.new(rawBody, rawWitnessSet, isValid);
          return new $outer.FixedTransaction(ret, $outer._ctx);
        });
      }

      static newWithAuxiliary(rawBody: Uint8Array, rawWitnessSet: Uint8Array, rawAuxiliaryData: Uint8Array, isValid: boolean): Promise<WasmContract.FixedTransaction> {
        return wrapByPromise(() => {
          const ret = WasmV4.FixedTransaction.new_with_auxiliary(rawBody, rawWitnessSet, rawAuxiliaryData, isValid);
          return new $outer.FixedTransaction(ret, $outer._ctx);
        });
      }

      body(): Promise<WasmContract.TransactionBody> {
        return wrapByPromise(() => {
          const ret = this.wasm.body();
          return new $outer.TransactionBody(ret, $outer._ctx);
        });
      }

      rawBody(): Promise<Uint8Array> {
        return wrapByPromise(() => {
          return this.wasm.raw_body();
        });
      }

      setBody(rawBody: Uint8Array): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_body(rawBody);
        });
      }

      setWitnessSet(rawWitnessSet: Uint8Array): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_witness_set(rawWitnessSet);
        });
      }

      witnessSet(): Promise<WasmContract.TransactionWitnessSet> {
        return wrapByPromise(() => {
          const ret = this.wasm.witness_set();
          return new $outer.TransactionWitnessSet(ret, $outer._ctx);
        });
      }

      rawWitnessSet(): Promise<Uint8Array> {
        return wrapByPromise(() => {
          return this.wasm.raw_witness_set();
        });
      }

      setIsValid(valid: boolean): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_is_valid(valid);
        });
      }

      isValid(): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.is_valid();
        });
      }

      setAuxiliaryData(rawAuxiliaryData: Uint8Array): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_auxiliary_data(rawAuxiliaryData);
        });
      }

      auxiliaryData(): Promise<Optional<WasmContract.AuxiliaryData>> {
        return wrapByPromise(() => {
          const ret = this.wasm.auxiliary_data();
          if (ret == null) return undefined;
          return new $outer.AuxiliaryData(ret, $outer._ctx);
        });
      }

      rawAuxiliaryData(): Promise<Optional<Uint8Array>> {
        return wrapByPromise(() => {
          return this.wasm.raw_auxiliary_data();
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.GeneralTransactionMetadata> {
        return wrapByPromise(() => {
          const ret = WasmV4.GeneralTransactionMetadata.from_bytes(bytes);
          return new $outer.GeneralTransactionMetadata(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.GeneralTransactionMetadata> {
        return wrapByPromise(() => {
          const ret = WasmV4.GeneralTransactionMetadata.from_hex(hexStr);
          return new $outer.GeneralTransactionMetadata(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.GeneralTransactionMetadata> {
        return wrapByPromise(() => {
          const ret = WasmV4.GeneralTransactionMetadata.from_json(json);
          return new $outer.GeneralTransactionMetadata(ret, $outer._ctx);
        });
      }

      static new(): Promise<WasmContract.GeneralTransactionMetadata> {
        return wrapByPromise(() => {
          const ret = WasmV4.GeneralTransactionMetadata.new();
          return new $outer.GeneralTransactionMetadata(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      insert(key: WasmContract.BigNum, value: WasmContract.TransactionMetadatum): Promise<Optional<WasmContract.TransactionMetadatum>> {
        return wrapByPromise(() => {
          const ret = this.wasm.insert(key.wasm, value.wasm);
          if (ret == null) return undefined;
          return new $outer.TransactionMetadatum(ret, $outer._ctx);
        });
      }

      get(key: WasmContract.BigNum): Promise<Optional<WasmContract.TransactionMetadatum>> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(key.wasm);
          if (ret == null) return undefined;
          return new $outer.TransactionMetadatum(ret, $outer._ctx);
        });
      }

      keys(): Promise<WasmContract.TransactionMetadatumLabels> {
        return wrapByPromise(() => {
          const ret = this.wasm.keys();
          return new $outer.TransactionMetadatumLabels(ret, $outer._ctx);
        });
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

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.GenesisDelegateHash> {
        return wrapByPromise(() => {
          const ret = WasmV4.GenesisDelegateHash.from_bytes(bytes);
          return new $outer.GenesisDelegateHash(ret, $outer._ctx);
        });
      }

      toBytes(): Promise<Uint8Array> {
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      toBech32(prefix: string): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_bech32(prefix);
        });
      }

      static fromBech32(bechStr: string): Promise<WasmContract.GenesisDelegateHash> {
        return wrapByPromise(() => {
          const ret = WasmV4.GenesisDelegateHash.from_bech32(bechStr);
          return new $outer.GenesisDelegateHash(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hex: string): Promise<WasmContract.GenesisDelegateHash> {
        return wrapByPromise(() => {
          const ret = WasmV4.GenesisDelegateHash.from_hex(hex);
          return new $outer.GenesisDelegateHash(ret, $outer._ctx);
        });
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

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.GenesisHash> {
        return wrapByPromise(() => {
          const ret = WasmV4.GenesisHash.from_bytes(bytes);
          return new $outer.GenesisHash(ret, $outer._ctx);
        });
      }

      toBytes(): Promise<Uint8Array> {
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      toBech32(prefix: string): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_bech32(prefix);
        });
      }

      static fromBech32(bechStr: string): Promise<WasmContract.GenesisHash> {
        return wrapByPromise(() => {
          const ret = WasmV4.GenesisHash.from_bech32(bechStr);
          return new $outer.GenesisHash(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hex: string): Promise<WasmContract.GenesisHash> {
        return wrapByPromise(() => {
          const ret = WasmV4.GenesisHash.from_hex(hex);
          return new $outer.GenesisHash(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.GenesisHashes> {
        return wrapByPromise(() => {
          const ret = WasmV4.GenesisHashes.from_bytes(bytes);
          return new $outer.GenesisHashes(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.GenesisHashes> {
        return wrapByPromise(() => {
          const ret = WasmV4.GenesisHashes.from_hex(hexStr);
          return new $outer.GenesisHashes(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.GenesisHashes> {
        return wrapByPromise(() => {
          const ret = WasmV4.GenesisHashes.from_json(json);
          return new $outer.GenesisHashes(ret, $outer._ctx);
        });
      }

      static new(): Promise<WasmContract.GenesisHashes> {
        return wrapByPromise(() => {
          const ret = WasmV4.GenesisHashes.new();
          return new $outer.GenesisHashes(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      get(index: number): Promise<WasmContract.GenesisHash> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(index);
          return new $outer.GenesisHash(ret, $outer._ctx);
        });
      }

      add(elem: WasmContract.GenesisHash): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add(elem.wasm);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.GenesisKeyDelegation> {
        return wrapByPromise(() => {
          const ret = WasmV4.GenesisKeyDelegation.from_bytes(bytes);
          return new $outer.GenesisKeyDelegation(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.GenesisKeyDelegation> {
        return wrapByPromise(() => {
          const ret = WasmV4.GenesisKeyDelegation.from_hex(hexStr);
          return new $outer.GenesisKeyDelegation(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.GenesisKeyDelegation> {
        return wrapByPromise(() => {
          const ret = WasmV4.GenesisKeyDelegation.from_json(json);
          return new $outer.GenesisKeyDelegation(ret, $outer._ctx);
        });
      }

      genesishash(): Promise<WasmContract.GenesisHash> {
        return wrapByPromise(() => {
          const ret = this.wasm.genesishash();
          return new $outer.GenesisHash(ret, $outer._ctx);
        });
      }

      genesisDelegateHash(): Promise<WasmContract.GenesisDelegateHash> {
        return wrapByPromise(() => {
          const ret = this.wasm.genesis_delegate_hash();
          return new $outer.GenesisDelegateHash(ret, $outer._ctx);
        });
      }

      vrfKeyhash(): Promise<WasmContract.VRFKeyHash> {
        return wrapByPromise(() => {
          const ret = this.wasm.vrf_keyhash();
          return new $outer.VRFKeyHash(ret, $outer._ctx);
        });
      }

      static new(genesishash: WasmContract.GenesisHash, genesisDelegateHash: WasmContract.GenesisDelegateHash, vrfKeyhash: WasmContract.VRFKeyHash): Promise<WasmContract.GenesisKeyDelegation> {
        return wrapByPromise(() => {
          const ret = WasmV4.GenesisKeyDelegation.new(genesishash.wasm, genesisDelegateHash.wasm, vrfKeyhash.wasm);
          return new $outer.GenesisKeyDelegation(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.GovernanceAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.GovernanceAction.from_bytes(bytes);
          return new $outer.GovernanceAction(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.GovernanceAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.GovernanceAction.from_hex(hexStr);
          return new $outer.GovernanceAction(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.GovernanceAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.GovernanceAction.from_json(json);
          return new $outer.GovernanceAction(ret, $outer._ctx);
        });
      }

      static newParameterChangeAction(parameterChangeAction: WasmContract.ParameterChangeAction): Promise<WasmContract.GovernanceAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.GovernanceAction.new_parameter_change_action(parameterChangeAction.wasm);
          return new $outer.GovernanceAction(ret, $outer._ctx);
        });
      }

      static newHardForkInitiationAction(hardForkInitiationAction: WasmContract.HardForkInitiationAction): Promise<WasmContract.GovernanceAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.GovernanceAction.new_hard_fork_initiation_action(hardForkInitiationAction.wasm);
          return new $outer.GovernanceAction(ret, $outer._ctx);
        });
      }

      static newTreasuryWithdrawalsAction(treasuryWithdrawalsAction: WasmContract.TreasuryWithdrawalsAction): Promise<WasmContract.GovernanceAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.GovernanceAction.new_treasury_withdrawals_action(treasuryWithdrawalsAction.wasm);
          return new $outer.GovernanceAction(ret, $outer._ctx);
        });
      }

      static newNoConfidenceAction(noConfidenceAction: WasmContract.NoConfidenceAction): Promise<WasmContract.GovernanceAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.GovernanceAction.new_no_confidence_action(noConfidenceAction.wasm);
          return new $outer.GovernanceAction(ret, $outer._ctx);
        });
      }

      static newNewCommitteeAction(newCommitteeAction: WasmContract.UpdateCommitteeAction): Promise<WasmContract.GovernanceAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.GovernanceAction.new_new_committee_action(newCommitteeAction.wasm);
          return new $outer.GovernanceAction(ret, $outer._ctx);
        });
      }

      static newNewConstitutionAction(newConstitutionAction: WasmContract.NewConstitutionAction): Promise<WasmContract.GovernanceAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.GovernanceAction.new_new_constitution_action(newConstitutionAction.wasm);
          return new $outer.GovernanceAction(ret, $outer._ctx);
        });
      }

      static newInfoAction(infoAction: WasmContract.InfoAction): Promise<WasmContract.GovernanceAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.GovernanceAction.new_info_action(infoAction.wasm);
          return new $outer.GovernanceAction(ret, $outer._ctx);
        });
      }

      kind(): Promise<WasmContract.GovernanceActionKind> {
        return wrapByPromise(() => {
          return this.wasm.kind();
        });
      }

      asParameterChangeAction(): Promise<Optional<WasmContract.ParameterChangeAction>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_parameter_change_action();
          if (ret == null) return undefined;
          return new $outer.ParameterChangeAction(ret, $outer._ctx);
        });
      }

      asHardForkInitiationAction(): Promise<Optional<WasmContract.HardForkInitiationAction>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_hard_fork_initiation_action();
          if (ret == null) return undefined;
          return new $outer.HardForkInitiationAction(ret, $outer._ctx);
        });
      }

      asTreasuryWithdrawalsAction(): Promise<Optional<WasmContract.TreasuryWithdrawalsAction>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_treasury_withdrawals_action();
          if (ret == null) return undefined;
          return new $outer.TreasuryWithdrawalsAction(ret, $outer._ctx);
        });
      }

      asNoConfidenceAction(): Promise<Optional<WasmContract.NoConfidenceAction>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_no_confidence_action();
          if (ret == null) return undefined;
          return new $outer.NoConfidenceAction(ret, $outer._ctx);
        });
      }

      asNewCommitteeAction(): Promise<Optional<WasmContract.UpdateCommitteeAction>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_new_committee_action();
          if (ret == null) return undefined;
          return new $outer.UpdateCommitteeAction(ret, $outer._ctx);
        });
      }

      asNewConstitutionAction(): Promise<Optional<WasmContract.NewConstitutionAction>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_new_constitution_action();
          if (ret == null) return undefined;
          return new $outer.NewConstitutionAction(ret, $outer._ctx);
        });
      }

      asInfoAction(): Promise<Optional<WasmContract.InfoAction>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_info_action();
          if (ret == null) return undefined;
          return new $outer.InfoAction(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.GovernanceActionId> {
        return wrapByPromise(() => {
          const ret = WasmV4.GovernanceActionId.from_bytes(bytes);
          return new $outer.GovernanceActionId(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.GovernanceActionId> {
        return wrapByPromise(() => {
          const ret = WasmV4.GovernanceActionId.from_hex(hexStr);
          return new $outer.GovernanceActionId(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.GovernanceActionId> {
        return wrapByPromise(() => {
          const ret = WasmV4.GovernanceActionId.from_json(json);
          return new $outer.GovernanceActionId(ret, $outer._ctx);
        });
      }

      transactionId(): Promise<WasmContract.TransactionHash> {
        return wrapByPromise(() => {
          const ret = this.wasm.transaction_id();
          return new $outer.TransactionHash(ret, $outer._ctx);
        });
      }

      index(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.index();
        });
      }

      static new(transactionId: WasmContract.TransactionHash, index: number): Promise<WasmContract.GovernanceActionId> {
        return wrapByPromise(() => {
          const ret = WasmV4.GovernanceActionId.new(transactionId.wasm, index);
          return new $outer.GovernanceActionId(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.GovernanceActionIds> {
        return wrapByPromise(() => {
          const ret = WasmV4.GovernanceActionIds.from_json(json);
          return new $outer.GovernanceActionIds(ret, $outer._ctx);
        });
      }

      static new(): Promise<WasmContract.GovernanceActionIds> {
        return wrapByPromise(() => {
          const ret = WasmV4.GovernanceActionIds.new();
          return new $outer.GovernanceActionIds(ret, $outer._ctx);
        });
      }

      add(governanceActionId: WasmContract.GovernanceActionId): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add(governanceActionId.wasm);
        });
      }

      get(index: number): Promise<Optional<WasmContract.GovernanceActionId>> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(index);
          if (ret == null) return undefined;
          return new $outer.GovernanceActionId(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.HardForkInitiationAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.HardForkInitiationAction.from_bytes(bytes);
          return new $outer.HardForkInitiationAction(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.HardForkInitiationAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.HardForkInitiationAction.from_hex(hexStr);
          return new $outer.HardForkInitiationAction(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.HardForkInitiationAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.HardForkInitiationAction.from_json(json);
          return new $outer.HardForkInitiationAction(ret, $outer._ctx);
        });
      }

      govActionId(): Promise<Optional<WasmContract.GovernanceActionId>> {
        return wrapByPromise(() => {
          const ret = this.wasm.gov_action_id();
          if (ret == null) return undefined;
          return new $outer.GovernanceActionId(ret, $outer._ctx);
        });
      }

      protocolVersion(): Promise<WasmContract.ProtocolVersion> {
        return wrapByPromise(() => {
          const ret = this.wasm.protocol_version();
          return new $outer.ProtocolVersion(ret, $outer._ctx);
        });
      }

      static new(protocolVersion: WasmContract.ProtocolVersion): Promise<WasmContract.HardForkInitiationAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.HardForkInitiationAction.new(protocolVersion.wasm);
          return new $outer.HardForkInitiationAction(ret, $outer._ctx);
        });
      }

      static newWithActionId(govActionId: WasmContract.GovernanceActionId, protocolVersion: WasmContract.ProtocolVersion): Promise<WasmContract.HardForkInitiationAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.HardForkInitiationAction.new_with_action_id(govActionId.wasm, protocolVersion.wasm);
          return new $outer.HardForkInitiationAction(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.Header> {
        return wrapByPromise(() => {
          const ret = WasmV4.Header.from_bytes(bytes);
          return new $outer.Header(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.Header> {
        return wrapByPromise(() => {
          const ret = WasmV4.Header.from_hex(hexStr);
          return new $outer.Header(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.Header> {
        return wrapByPromise(() => {
          const ret = WasmV4.Header.from_json(json);
          return new $outer.Header(ret, $outer._ctx);
        });
      }

      headerBody(): Promise<WasmContract.HeaderBody> {
        return wrapByPromise(() => {
          const ret = this.wasm.header_body();
          return new $outer.HeaderBody(ret, $outer._ctx);
        });
      }

      bodySignature(): Promise<WasmContract.KESSignature> {
        return wrapByPromise(() => {
          const ret = this.wasm.body_signature();
          return new $outer.KESSignature(ret, $outer._ctx);
        });
      }

      static new(headerBody: WasmContract.HeaderBody, bodySignature: WasmContract.KESSignature): Promise<WasmContract.Header> {
        return wrapByPromise(() => {
          const ret = WasmV4.Header.new(headerBody.wasm, bodySignature.wasm);
          return new $outer.Header(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.HeaderBody> {
        return wrapByPromise(() => {
          const ret = WasmV4.HeaderBody.from_bytes(bytes);
          return new $outer.HeaderBody(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.HeaderBody> {
        return wrapByPromise(() => {
          const ret = WasmV4.HeaderBody.from_hex(hexStr);
          return new $outer.HeaderBody(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.HeaderBody> {
        return wrapByPromise(() => {
          const ret = WasmV4.HeaderBody.from_json(json);
          return new $outer.HeaderBody(ret, $outer._ctx);
        });
      }

      blockNumber(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.block_number();
        });
      }

      slot(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.slot();
        });
      }

      slotBignum(): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = this.wasm.slot_bignum();
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      prevHash(): Promise<Optional<WasmContract.BlockHash>> {
        return wrapByPromise(() => {
          const ret = this.wasm.prev_hash();
          if (ret == null) return undefined;
          return new $outer.BlockHash(ret, $outer._ctx);
        });
      }

      issuerVkey(): Promise<WasmContract.Vkey> {
        return wrapByPromise(() => {
          const ret = this.wasm.issuer_vkey();
          return new $outer.Vkey(ret, $outer._ctx);
        });
      }

      vrfVkey(): Promise<WasmContract.VRFVKey> {
        return wrapByPromise(() => {
          const ret = this.wasm.vrf_vkey();
          return new $outer.VRFVKey(ret, $outer._ctx);
        });
      }

      hasNonceAndLeaderVrf(): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.has_nonce_and_leader_vrf();
        });
      }

      nonceVrfOrNothing(): Promise<Optional<WasmContract.VRFCert>> {
        return wrapByPromise(() => {
          const ret = this.wasm.nonce_vrf_or_nothing();
          if (ret == null) return undefined;
          return new $outer.VRFCert(ret, $outer._ctx);
        });
      }

      leaderVrfOrNothing(): Promise<Optional<WasmContract.VRFCert>> {
        return wrapByPromise(() => {
          const ret = this.wasm.leader_vrf_or_nothing();
          if (ret == null) return undefined;
          return new $outer.VRFCert(ret, $outer._ctx);
        });
      }

      hasVrfResult(): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.has_vrf_result();
        });
      }

      vrfResultOrNothing(): Promise<Optional<WasmContract.VRFCert>> {
        return wrapByPromise(() => {
          const ret = this.wasm.vrf_result_or_nothing();
          if (ret == null) return undefined;
          return new $outer.VRFCert(ret, $outer._ctx);
        });
      }

      blockBodySize(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.block_body_size();
        });
      }

      blockBodyHash(): Promise<WasmContract.BlockHash> {
        return wrapByPromise(() => {
          const ret = this.wasm.block_body_hash();
          return new $outer.BlockHash(ret, $outer._ctx);
        });
      }

      operationalCert(): Promise<WasmContract.OperationalCert> {
        return wrapByPromise(() => {
          const ret = this.wasm.operational_cert();
          return new $outer.OperationalCert(ret, $outer._ctx);
        });
      }

      protocolVersion(): Promise<WasmContract.ProtocolVersion> {
        return wrapByPromise(() => {
          const ret = this.wasm.protocol_version();
          return new $outer.ProtocolVersion(ret, $outer._ctx);
        });
      }

      static new(blockNumber: number, slot: number, prevHash: Optional<WasmContract.BlockHash>, issuerVkey: WasmContract.Vkey, vrfVkey: WasmContract.VRFVKey, vrfResult: WasmContract.VRFCert, blockBodySize: number, blockBodyHash: WasmContract.BlockHash, operationalCert: WasmContract.OperationalCert, protocolVersion: WasmContract.ProtocolVersion): Promise<WasmContract.HeaderBody> {
        return wrapByPromise(() => {
          const ret = WasmV4.HeaderBody.new(blockNumber, slot, prevHash?.wasm, issuerVkey.wasm, vrfVkey.wasm, vrfResult.wasm, blockBodySize, blockBodyHash.wasm, operationalCert.wasm, protocolVersion.wasm);
          return new $outer.HeaderBody(ret, $outer._ctx);
        });
      }

      static newHeaderbody(blockNumber: number, slot: WasmContract.BigNum, prevHash: Optional<WasmContract.BlockHash>, issuerVkey: WasmContract.Vkey, vrfVkey: WasmContract.VRFVKey, vrfResult: WasmContract.VRFCert, blockBodySize: number, blockBodyHash: WasmContract.BlockHash, operationalCert: WasmContract.OperationalCert, protocolVersion: WasmContract.ProtocolVersion): Promise<WasmContract.HeaderBody> {
        return wrapByPromise(() => {
          const ret = WasmV4.HeaderBody.new_headerbody(blockNumber, slot.wasm, prevHash?.wasm, issuerVkey.wasm, vrfVkey.wasm, vrfResult.wasm, blockBodySize, blockBodyHash.wasm, operationalCert.wasm, protocolVersion.wasm);
          return new $outer.HeaderBody(ret, $outer._ctx);
        });
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

      static new(): Promise<WasmContract.InfoAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.InfoAction.new();
          return new $outer.InfoAction(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.Int> {
        return wrapByPromise(() => {
          const ret = WasmV4.Int.from_bytes(bytes);
          return new $outer.Int(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.Int> {
        return wrapByPromise(() => {
          const ret = WasmV4.Int.from_hex(hexStr);
          return new $outer.Int(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.Int> {
        return wrapByPromise(() => {
          const ret = WasmV4.Int.from_json(json);
          return new $outer.Int(ret, $outer._ctx);
        });
      }

      static new(x: WasmContract.BigNum): Promise<WasmContract.Int> {
        return wrapByPromise(() => {
          const ret = WasmV4.Int.new(x.wasm);
          return new $outer.Int(ret, $outer._ctx);
        });
      }

      static newNegative(x: WasmContract.BigNum): Promise<WasmContract.Int> {
        return wrapByPromise(() => {
          const ret = WasmV4.Int.new_negative(x.wasm);
          return new $outer.Int(ret, $outer._ctx);
        });
      }

      static newI32(x: number): Promise<WasmContract.Int> {
        return wrapByPromise(() => {
          const ret = WasmV4.Int.new_i32(x);
          return new $outer.Int(ret, $outer._ctx);
        });
      }

      isPositive(): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.is_positive();
        });
      }

      asPositive(): Promise<Optional<WasmContract.BigNum>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_positive();
          if (ret == null) return undefined;
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      asNegative(): Promise<Optional<WasmContract.BigNum>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_negative();
          if (ret == null) return undefined;
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      asI32(): Promise<Optional<number>> {
        return wrapByPromise(() => {
          return this.wasm.as_i32();
        });
      }

      asI32OrNothing(): Promise<Optional<number>> {
        return wrapByPromise(() => {
          return this.wasm.as_i32_or_nothing();
        });
      }

      asI32OrFail(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.as_i32_or_fail();
        });
      }

      toStr(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_str();
        });
      }

      static fromStr(string: string): Promise<WasmContract.Int> {
        return wrapByPromise(() => {
          const ret = WasmV4.Int.from_str(string);
          return new $outer.Int(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.Ipv4> {
        return wrapByPromise(() => {
          const ret = WasmV4.Ipv4.from_bytes(bytes);
          return new $outer.Ipv4(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.Ipv4> {
        return wrapByPromise(() => {
          const ret = WasmV4.Ipv4.from_hex(hexStr);
          return new $outer.Ipv4(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.Ipv4> {
        return wrapByPromise(() => {
          const ret = WasmV4.Ipv4.from_json(json);
          return new $outer.Ipv4(ret, $outer._ctx);
        });
      }

      static new(data: Uint8Array): Promise<WasmContract.Ipv4> {
        return wrapByPromise(() => {
          const ret = WasmV4.Ipv4.new(data);
          return new $outer.Ipv4(ret, $outer._ctx);
        });
      }

      ip(): Promise<Uint8Array> {
        return wrapByPromise(() => {
          return this.wasm.ip();
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.Ipv6> {
        return wrapByPromise(() => {
          const ret = WasmV4.Ipv6.from_bytes(bytes);
          return new $outer.Ipv6(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.Ipv6> {
        return wrapByPromise(() => {
          const ret = WasmV4.Ipv6.from_hex(hexStr);
          return new $outer.Ipv6(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.Ipv6> {
        return wrapByPromise(() => {
          const ret = WasmV4.Ipv6.from_json(json);
          return new $outer.Ipv6(ret, $outer._ctx);
        });
      }

      static new(data: Uint8Array): Promise<WasmContract.Ipv6> {
        return wrapByPromise(() => {
          const ret = WasmV4.Ipv6.new(data);
          return new $outer.Ipv6(ret, $outer._ctx);
        });
      }

      ip(): Promise<Uint8Array> {
        return wrapByPromise(() => {
          return this.wasm.ip();
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.KESSignature> {
        return wrapByPromise(() => {
          const ret = WasmV4.KESSignature.from_bytes(bytes);
          return new $outer.KESSignature(ret, $outer._ctx);
        });
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

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.KESVKey> {
        return wrapByPromise(() => {
          const ret = WasmV4.KESVKey.from_bytes(bytes);
          return new $outer.KESVKey(ret, $outer._ctx);
        });
      }

      toBytes(): Promise<Uint8Array> {
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      toBech32(prefix: string): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_bech32(prefix);
        });
      }

      static fromBech32(bechStr: string): Promise<WasmContract.KESVKey> {
        return wrapByPromise(() => {
          const ret = WasmV4.KESVKey.from_bech32(bechStr);
          return new $outer.KESVKey(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hex: string): Promise<WasmContract.KESVKey> {
        return wrapByPromise(() => {
          const ret = WasmV4.KESVKey.from_hex(hex);
          return new $outer.KESVKey(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.Language> {
        return wrapByPromise(() => {
          const ret = WasmV4.Language.from_bytes(bytes);
          return new $outer.Language(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.Language> {
        return wrapByPromise(() => {
          const ret = WasmV4.Language.from_hex(hexStr);
          return new $outer.Language(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.Language> {
        return wrapByPromise(() => {
          const ret = WasmV4.Language.from_json(json);
          return new $outer.Language(ret, $outer._ctx);
        });
      }

      static newPlutusV1(): Promise<WasmContract.Language> {
        return wrapByPromise(() => {
          const ret = WasmV4.Language.new_plutus_v1();
          return new $outer.Language(ret, $outer._ctx);
        });
      }

      static newPlutusV2(): Promise<WasmContract.Language> {
        return wrapByPromise(() => {
          const ret = WasmV4.Language.new_plutus_v2();
          return new $outer.Language(ret, $outer._ctx);
        });
      }

      static newPlutusV3(): Promise<WasmContract.Language> {
        return wrapByPromise(() => {
          const ret = WasmV4.Language.new_plutus_v3();
          return new $outer.Language(ret, $outer._ctx);
        });
      }

      kind(): Promise<WasmContract.LanguageKind> {
        return wrapByPromise(() => {
          return this.wasm.kind();
        });
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

      static new(): Promise<WasmContract.Languages> {
        return wrapByPromise(() => {
          const ret = WasmV4.Languages.new();
          return new $outer.Languages(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      get(index: number): Promise<WasmContract.Language> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(index);
          return new $outer.Language(ret, $outer._ctx);
        });
      }

      add(elem: WasmContract.Language): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add(elem.wasm);
        });
      }

      static list(): Promise<WasmContract.Languages> {
        return wrapByPromise(() => {
          const ret = WasmV4.Languages.list();
          return new $outer.Languages(ret, $outer._ctx);
        });
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

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.LegacyDaedalusPrivateKey> {
        return wrapByPromise(() => {
          const ret = WasmV4.LegacyDaedalusPrivateKey.from_bytes(bytes);
          return new $outer.LegacyDaedalusPrivateKey(ret, $outer._ctx);
        });
      }

      asBytes(): Promise<Uint8Array> {
        return wrapByPromise(() => {
          return this.wasm.as_bytes();
        });
      }

      chaincode(): Promise<Uint8Array> {
        return wrapByPromise(() => {
          return this.wasm.chaincode();
        });
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

      constant(): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = this.wasm.constant();
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      coefficient(): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = this.wasm.coefficient();
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      static new(coefficient: WasmContract.BigNum, constant: WasmContract.BigNum): Promise<WasmContract.LinearFee> {
        return wrapByPromise(() => {
          const ret = WasmV4.LinearFee.new(coefficient.wasm, constant.wasm);
          return new $outer.LinearFee(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.MIRToStakeCredentials> {
        return wrapByPromise(() => {
          const ret = WasmV4.MIRToStakeCredentials.from_bytes(bytes);
          return new $outer.MIRToStakeCredentials(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.MIRToStakeCredentials> {
        return wrapByPromise(() => {
          const ret = WasmV4.MIRToStakeCredentials.from_hex(hexStr);
          return new $outer.MIRToStakeCredentials(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.MIRToStakeCredentials> {
        return wrapByPromise(() => {
          const ret = WasmV4.MIRToStakeCredentials.from_json(json);
          return new $outer.MIRToStakeCredentials(ret, $outer._ctx);
        });
      }

      static new(): Promise<WasmContract.MIRToStakeCredentials> {
        return wrapByPromise(() => {
          const ret = WasmV4.MIRToStakeCredentials.new();
          return new $outer.MIRToStakeCredentials(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      insert(cred: WasmContract.Credential, delta: WasmContract.Int): Promise<Optional<WasmContract.Int>> {
        return wrapByPromise(() => {
          const ret = this.wasm.insert(cred.wasm, delta.wasm);
          if (ret == null) return undefined;
          return new $outer.Int(ret, $outer._ctx);
        });
      }

      get(cred: WasmContract.Credential): Promise<Optional<WasmContract.Int>> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(cred.wasm);
          if (ret == null) return undefined;
          return new $outer.Int(ret, $outer._ctx);
        });
      }

      keys(): Promise<WasmContract.Credentials> {
        return wrapByPromise(() => {
          const ret = this.wasm.keys();
          return new $outer.Credentials(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.original_bytes();
        });
      }

      toAddress(): Promise<WasmContract.Address> {
        return wrapByPromise(() => {
          const ret = this.wasm.to_address();
          return new $outer.Address(ret, $outer._ctx);
        });
      }

      static fromAddress(addr: WasmContract.Address): Promise<Optional<WasmContract.MalformedAddress>> {
        return wrapByPromise(() => {
          const ret = WasmV4.MalformedAddress.from_address(addr.wasm);
          if (ret == null) return undefined;
          return new $outer.MalformedAddress(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.MetadataList> {
        return wrapByPromise(() => {
          const ret = WasmV4.MetadataList.from_bytes(bytes);
          return new $outer.MetadataList(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.MetadataList> {
        return wrapByPromise(() => {
          const ret = WasmV4.MetadataList.from_hex(hexStr);
          return new $outer.MetadataList(ret, $outer._ctx);
        });
      }

      static new(): Promise<WasmContract.MetadataList> {
        return wrapByPromise(() => {
          const ret = WasmV4.MetadataList.new();
          return new $outer.MetadataList(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      get(index: number): Promise<WasmContract.TransactionMetadatum> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(index);
          return new $outer.TransactionMetadatum(ret, $outer._ctx);
        });
      }

      add(elem: WasmContract.TransactionMetadatum): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add(elem.wasm);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.MetadataMap> {
        return wrapByPromise(() => {
          const ret = WasmV4.MetadataMap.from_bytes(bytes);
          return new $outer.MetadataMap(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.MetadataMap> {
        return wrapByPromise(() => {
          const ret = WasmV4.MetadataMap.from_hex(hexStr);
          return new $outer.MetadataMap(ret, $outer._ctx);
        });
      }

      static new(): Promise<WasmContract.MetadataMap> {
        return wrapByPromise(() => {
          const ret = WasmV4.MetadataMap.new();
          return new $outer.MetadataMap(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      insert(key: WasmContract.TransactionMetadatum, value: WasmContract.TransactionMetadatum): Promise<Optional<WasmContract.TransactionMetadatum>> {
        return wrapByPromise(() => {
          const ret = this.wasm.insert(key.wasm, value.wasm);
          if (ret == null) return undefined;
          return new $outer.TransactionMetadatum(ret, $outer._ctx);
        });
      }

      insertStr(key: string, value: WasmContract.TransactionMetadatum): Promise<Optional<WasmContract.TransactionMetadatum>> {
        return wrapByPromise(() => {
          const ret = this.wasm.insert_str(key, value.wasm);
          if (ret == null) return undefined;
          return new $outer.TransactionMetadatum(ret, $outer._ctx);
        });
      }

      insertI32(key: number, value: WasmContract.TransactionMetadatum): Promise<Optional<WasmContract.TransactionMetadatum>> {
        return wrapByPromise(() => {
          const ret = this.wasm.insert_i32(key, value.wasm);
          if (ret == null) return undefined;
          return new $outer.TransactionMetadatum(ret, $outer._ctx);
        });
      }

      get(key: WasmContract.TransactionMetadatum): Promise<WasmContract.TransactionMetadatum> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(key.wasm);
          return new $outer.TransactionMetadatum(ret, $outer._ctx);
        });
      }

      getStr(key: string): Promise<WasmContract.TransactionMetadatum> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_str(key);
          return new $outer.TransactionMetadatum(ret, $outer._ctx);
        });
      }

      getI32(key: number): Promise<WasmContract.TransactionMetadatum> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_i32(key);
          return new $outer.TransactionMetadatum(ret, $outer._ctx);
        });
      }

      has(key: WasmContract.TransactionMetadatum): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.has(key.wasm);
        });
      }

      keys(): Promise<WasmContract.MetadataList> {
        return wrapByPromise(() => {
          const ret = this.wasm.keys();
          return new $outer.MetadataList(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.Mint> {
        return wrapByPromise(() => {
          const ret = WasmV4.Mint.from_bytes(bytes);
          return new $outer.Mint(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.Mint> {
        return wrapByPromise(() => {
          const ret = WasmV4.Mint.from_hex(hexStr);
          return new $outer.Mint(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.Mint> {
        return wrapByPromise(() => {
          const ret = WasmV4.Mint.from_json(json);
          return new $outer.Mint(ret, $outer._ctx);
        });
      }

      static new(): Promise<WasmContract.Mint> {
        return wrapByPromise(() => {
          const ret = WasmV4.Mint.new();
          return new $outer.Mint(ret, $outer._ctx);
        });
      }

      static newFromEntry(key: WasmContract.ScriptHash, value: WasmContract.MintAssets): Promise<WasmContract.Mint> {
        return wrapByPromise(() => {
          const ret = WasmV4.Mint.new_from_entry(key.wasm, value.wasm);
          return new $outer.Mint(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      insert(key: WasmContract.ScriptHash, value: WasmContract.MintAssets): Promise<Optional<WasmContract.MintAssets>> {
        return wrapByPromise(() => {
          const ret = this.wasm.insert(key.wasm, value.wasm);
          if (ret == null) return undefined;
          return new $outer.MintAssets(ret, $outer._ctx);
        });
      }

      get(key: WasmContract.ScriptHash): Promise<Optional<WasmContract.MintsAssets>> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(key.wasm);
          if (ret == null) return undefined;
          return new $outer.MintsAssets(ret, $outer._ctx);
        });
      }

      keys(): Promise<WasmContract.ScriptHashes> {
        return wrapByPromise(() => {
          const ret = this.wasm.keys();
          return new $outer.ScriptHashes(ret, $outer._ctx);
        });
      }

      asPositiveMultiasset(): Promise<WasmContract.MultiAsset> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_positive_multiasset();
          return new $outer.MultiAsset(ret, $outer._ctx);
        });
      }

      asNegativeMultiasset(): Promise<WasmContract.MultiAsset> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_negative_multiasset();
          return new $outer.MultiAsset(ret, $outer._ctx);
        });
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

      static new(): Promise<WasmContract.MintAssets> {
        return wrapByPromise(() => {
          const ret = WasmV4.MintAssets.new();
          return new $outer.MintAssets(ret, $outer._ctx);
        });
      }

      static newFromEntry(key: WasmContract.AssetName, value: WasmContract.Int): Promise<WasmContract.MintAssets> {
        return wrapByPromise(() => {
          const ret = WasmV4.MintAssets.new_from_entry(key.wasm, value.wasm);
          return new $outer.MintAssets(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      insert(key: WasmContract.AssetName, value: WasmContract.Int): Promise<Optional<WasmContract.Int>> {
        return wrapByPromise(() => {
          const ret = this.wasm.insert(key.wasm, value.wasm);
          if (ret == null) return undefined;
          return new $outer.Int(ret, $outer._ctx);
        });
      }

      get(key: WasmContract.AssetName): Promise<Optional<WasmContract.Int>> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(key.wasm);
          if (ret == null) return undefined;
          return new $outer.Int(ret, $outer._ctx);
        });
      }

      keys(): Promise<WasmContract.AssetNames> {
        return wrapByPromise(() => {
          const ret = this.wasm.keys();
          return new $outer.AssetNames(ret, $outer._ctx);
        });
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

      static new(): Promise<WasmContract.MintBuilder> {
        return wrapByPromise(() => {
          const ret = WasmV4.MintBuilder.new();
          return new $outer.MintBuilder(ret, $outer._ctx);
        });
      }

      addAsset(mint: WasmContract.MintWitness, assetName: WasmContract.AssetName, amount: WasmContract.Int): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add_asset(mint.wasm, assetName.wasm, amount.wasm);
        });
      }

      setAsset(mint: WasmContract.MintWitness, assetName: WasmContract.AssetName, amount: WasmContract.Int): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_asset(mint.wasm, assetName.wasm, amount.wasm);
        });
      }

      build(): Promise<WasmContract.Mint> {
        return wrapByPromise(() => {
          const ret = this.wasm.build();
          return new $outer.Mint(ret, $outer._ctx);
        });
      }

      getNativeScripts(): Promise<WasmContract.NativeScripts> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_native_scripts();
          return new $outer.NativeScripts(ret, $outer._ctx);
        });
      }

      getPlutusWitnesses(): Promise<WasmContract.PlutusWitnesses> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_plutus_witnesses();
          return new $outer.PlutusWitnesses(ret, $outer._ctx);
        });
      }

      getRefInputs(): Promise<WasmContract.TransactionInputs> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_ref_inputs();
          return new $outer.TransactionInputs(ret, $outer._ctx);
        });
      }

      getRedeemers(): Promise<WasmContract.Redeemers> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_redeemers();
          return new $outer.Redeemers(ret, $outer._ctx);
        });
      }

      hasPlutusScripts(): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.has_plutus_scripts();
        });
      }

      hasNativeScripts(): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.has_native_scripts();
        });
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

      static newNativeScript(nativeScript: WasmContract.NativeScript): Promise<WasmContract.MintWitness> {
        return wrapByPromise(() => {
          const ret = WasmV4.MintWitness.new_native_script(nativeScript.wasm);
          return new $outer.MintWitness(ret, $outer._ctx);
        });
      }

      static newPlutusScript(plutusScript: WasmContract.PlutusScriptSource, redeemer: WasmContract.Redeemer): Promise<WasmContract.MintWitness> {
        return wrapByPromise(() => {
          const ret = WasmV4.MintWitness.new_plutus_script(plutusScript.wasm, redeemer.wasm);
          return new $outer.MintWitness(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.MintsAssets> {
        return wrapByPromise(() => {
          const ret = WasmV4.MintsAssets.from_json(json);
          return new $outer.MintsAssets(ret, $outer._ctx);
        });
      }

      static new(): Promise<WasmContract.MintsAssets> {
        return wrapByPromise(() => {
          const ret = WasmV4.MintsAssets.new();
          return new $outer.MintsAssets(ret, $outer._ctx);
        });
      }

      add(mintAssets: WasmContract.MintAssets): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add(mintAssets.wasm);
        });
      }

      get(index: number): Promise<Optional<WasmContract.MintAssets>> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(index);
          if (ret == null) return undefined;
          return new $outer.MintAssets(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.MoveInstantaneousReward> {
        return wrapByPromise(() => {
          const ret = WasmV4.MoveInstantaneousReward.from_bytes(bytes);
          return new $outer.MoveInstantaneousReward(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.MoveInstantaneousReward> {
        return wrapByPromise(() => {
          const ret = WasmV4.MoveInstantaneousReward.from_hex(hexStr);
          return new $outer.MoveInstantaneousReward(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.MoveInstantaneousReward> {
        return wrapByPromise(() => {
          const ret = WasmV4.MoveInstantaneousReward.from_json(json);
          return new $outer.MoveInstantaneousReward(ret, $outer._ctx);
        });
      }

      static newToOtherPot(pot: WasmContract.MIRPot, amount: WasmContract.BigNum): Promise<WasmContract.MoveInstantaneousReward> {
        return wrapByPromise(() => {
          const ret = WasmV4.MoveInstantaneousReward.new_to_other_pot(pot, amount.wasm);
          return new $outer.MoveInstantaneousReward(ret, $outer._ctx);
        });
      }

      static newToStakeCreds(pot: WasmContract.MIRPot, amounts: WasmContract.MIRToStakeCredentials): Promise<WasmContract.MoveInstantaneousReward> {
        return wrapByPromise(() => {
          const ret = WasmV4.MoveInstantaneousReward.new_to_stake_creds(pot, amounts.wasm);
          return new $outer.MoveInstantaneousReward(ret, $outer._ctx);
        });
      }

      pot(): Promise<WasmContract.MIRPot> {
        return wrapByPromise(() => {
          return this.wasm.pot();
        });
      }

      kind(): Promise<WasmContract.MIRKind> {
        return wrapByPromise(() => {
          return this.wasm.kind();
        });
      }

      asToOtherPot(): Promise<Optional<WasmContract.BigNum>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_to_other_pot();
          if (ret == null) return undefined;
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      asToStakeCreds(): Promise<Optional<WasmContract.MIRToStakeCredentials>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_to_stake_creds();
          if (ret == null) return undefined;
          return new $outer.MIRToStakeCredentials(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.MoveInstantaneousRewardsCert> {
        return wrapByPromise(() => {
          const ret = WasmV4.MoveInstantaneousRewardsCert.from_bytes(bytes);
          return new $outer.MoveInstantaneousRewardsCert(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.MoveInstantaneousRewardsCert> {
        return wrapByPromise(() => {
          const ret = WasmV4.MoveInstantaneousRewardsCert.from_hex(hexStr);
          return new $outer.MoveInstantaneousRewardsCert(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.MoveInstantaneousRewardsCert> {
        return wrapByPromise(() => {
          const ret = WasmV4.MoveInstantaneousRewardsCert.from_json(json);
          return new $outer.MoveInstantaneousRewardsCert(ret, $outer._ctx);
        });
      }

      moveInstantaneousReward(): Promise<WasmContract.MoveInstantaneousReward> {
        return wrapByPromise(() => {
          const ret = this.wasm.move_instantaneous_reward();
          return new $outer.MoveInstantaneousReward(ret, $outer._ctx);
        });
      }

      static new(moveInstantaneousReward: WasmContract.MoveInstantaneousReward): Promise<WasmContract.MoveInstantaneousRewardsCert> {
        return wrapByPromise(() => {
          const ret = WasmV4.MoveInstantaneousRewardsCert.new(moveInstantaneousReward.wasm);
          return new $outer.MoveInstantaneousRewardsCert(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.MultiAsset> {
        return wrapByPromise(() => {
          const ret = WasmV4.MultiAsset.from_bytes(bytes);
          return new $outer.MultiAsset(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.MultiAsset> {
        return wrapByPromise(() => {
          const ret = WasmV4.MultiAsset.from_hex(hexStr);
          return new $outer.MultiAsset(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.MultiAsset> {
        return wrapByPromise(() => {
          const ret = WasmV4.MultiAsset.from_json(json);
          return new $outer.MultiAsset(ret, $outer._ctx);
        });
      }

      static new(): Promise<WasmContract.MultiAsset> {
        return wrapByPromise(() => {
          const ret = WasmV4.MultiAsset.new();
          return new $outer.MultiAsset(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      insert(policyId: WasmContract.ScriptHash, assets: WasmContract.Assets): Promise<Optional<WasmContract.Assets>> {
        return wrapByPromise(() => {
          const ret = this.wasm.insert(policyId.wasm, assets.wasm);
          if (ret == null) return undefined;
          return new $outer.Assets(ret, $outer._ctx);
        });
      }

      get(policyId: WasmContract.ScriptHash): Promise<Optional<WasmContract.Assets>> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(policyId.wasm);
          if (ret == null) return undefined;
          return new $outer.Assets(ret, $outer._ctx);
        });
      }

      setAsset(policyId: WasmContract.ScriptHash, assetName: WasmContract.AssetName, value: WasmContract.BigNum): Promise<Optional<WasmContract.BigNum>> {
        return wrapByPromise(() => {
          const ret = this.wasm.set_asset(policyId.wasm, assetName.wasm, value.wasm);
          if (ret == null) return undefined;
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      getAsset(policyId: WasmContract.ScriptHash, assetName: WasmContract.AssetName): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_asset(policyId.wasm, assetName.wasm);
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      keys(): Promise<WasmContract.ScriptHashes> {
        return wrapByPromise(() => {
          const ret = this.wasm.keys();
          return new $outer.ScriptHashes(ret, $outer._ctx);
        });
      }

      sub(rhsMa: WasmContract.MultiAsset): Promise<WasmContract.MultiAsset> {
        return wrapByPromise(() => {
          const ret = this.wasm.sub(rhsMa.wasm);
          return new $outer.MultiAsset(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.MultiHostName> {
        return wrapByPromise(() => {
          const ret = WasmV4.MultiHostName.from_bytes(bytes);
          return new $outer.MultiHostName(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.MultiHostName> {
        return wrapByPromise(() => {
          const ret = WasmV4.MultiHostName.from_hex(hexStr);
          return new $outer.MultiHostName(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.MultiHostName> {
        return wrapByPromise(() => {
          const ret = WasmV4.MultiHostName.from_json(json);
          return new $outer.MultiHostName(ret, $outer._ctx);
        });
      }

      dnsName(): Promise<WasmContract.DNSRecordSRV> {
        return wrapByPromise(() => {
          const ret = this.wasm.dns_name();
          return new $outer.DNSRecordSRV(ret, $outer._ctx);
        });
      }

      static new(dnsName: WasmContract.DNSRecordSRV): Promise<WasmContract.MultiHostName> {
        return wrapByPromise(() => {
          const ret = WasmV4.MultiHostName.new(dnsName.wasm);
          return new $outer.MultiHostName(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.NativeScript> {
        return wrapByPromise(() => {
          const ret = WasmV4.NativeScript.from_bytes(bytes);
          return new $outer.NativeScript(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.NativeScript> {
        return wrapByPromise(() => {
          const ret = WasmV4.NativeScript.from_hex(hexStr);
          return new $outer.NativeScript(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.NativeScript> {
        return wrapByPromise(() => {
          const ret = WasmV4.NativeScript.from_json(json);
          return new $outer.NativeScript(ret, $outer._ctx);
        });
      }

      hash(): Promise<WasmContract.ScriptHash> {
        return wrapByPromise(() => {
          const ret = this.wasm.hash();
          return new $outer.ScriptHash(ret, $outer._ctx);
        });
      }

      static newScriptPubkey(scriptPubkey: WasmContract.ScriptPubkey): Promise<WasmContract.NativeScript> {
        return wrapByPromise(() => {
          const ret = WasmV4.NativeScript.new_script_pubkey(scriptPubkey.wasm);
          return new $outer.NativeScript(ret, $outer._ctx);
        });
      }

      static newScriptAll(scriptAll: WasmContract.ScriptAll): Promise<WasmContract.NativeScript> {
        return wrapByPromise(() => {
          const ret = WasmV4.NativeScript.new_script_all(scriptAll.wasm);
          return new $outer.NativeScript(ret, $outer._ctx);
        });
      }

      static newScriptAny(scriptAny: WasmContract.ScriptAny): Promise<WasmContract.NativeScript> {
        return wrapByPromise(() => {
          const ret = WasmV4.NativeScript.new_script_any(scriptAny.wasm);
          return new $outer.NativeScript(ret, $outer._ctx);
        });
      }

      static newScriptNOfK(scriptNOfK: WasmContract.ScriptNOfK): Promise<WasmContract.NativeScript> {
        return wrapByPromise(() => {
          const ret = WasmV4.NativeScript.new_script_n_of_k(scriptNOfK.wasm);
          return new $outer.NativeScript(ret, $outer._ctx);
        });
      }

      static newTimelockStart(timelockStart: WasmContract.TimelockStart): Promise<WasmContract.NativeScript> {
        return wrapByPromise(() => {
          const ret = WasmV4.NativeScript.new_timelock_start(timelockStart.wasm);
          return new $outer.NativeScript(ret, $outer._ctx);
        });
      }

      static newTimelockExpiry(timelockExpiry: WasmContract.TimelockExpiry): Promise<WasmContract.NativeScript> {
        return wrapByPromise(() => {
          const ret = WasmV4.NativeScript.new_timelock_expiry(timelockExpiry.wasm);
          return new $outer.NativeScript(ret, $outer._ctx);
        });
      }

      kind(): Promise<WasmContract.NativeScriptKind> {
        return wrapByPromise(() => {
          return this.wasm.kind();
        });
      }

      asScriptPubkey(): Promise<Optional<WasmContract.ScriptPubkey>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_script_pubkey();
          if (ret == null) return undefined;
          return new $outer.ScriptPubkey(ret, $outer._ctx);
        });
      }

      asScriptAll(): Promise<Optional<WasmContract.ScriptAll>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_script_all();
          if (ret == null) return undefined;
          return new $outer.ScriptAll(ret, $outer._ctx);
        });
      }

      asScriptAny(): Promise<Optional<WasmContract.ScriptAny>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_script_any();
          if (ret == null) return undefined;
          return new $outer.ScriptAny(ret, $outer._ctx);
        });
      }

      asScriptNOfK(): Promise<Optional<WasmContract.ScriptNOfK>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_script_n_of_k();
          if (ret == null) return undefined;
          return new $outer.ScriptNOfK(ret, $outer._ctx);
        });
      }

      asTimelockStart(): Promise<Optional<WasmContract.TimelockStart>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_timelock_start();
          if (ret == null) return undefined;
          return new $outer.TimelockStart(ret, $outer._ctx);
        });
      }

      asTimelockExpiry(): Promise<Optional<WasmContract.TimelockExpiry>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_timelock_expiry();
          if (ret == null) return undefined;
          return new $outer.TimelockExpiry(ret, $outer._ctx);
        });
      }

      getRequiredSigners(): Promise<WasmContract.Ed25519KeyHashes> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_required_signers();
          return new $outer.Ed25519KeyHashes(ret, $outer._ctx);
        });
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

      static new(script: WasmContract.NativeScript): Promise<WasmContract.NativeScriptSource> {
        return wrapByPromise(() => {
          const ret = WasmV4.NativeScriptSource.new(script.wasm);
          return new $outer.NativeScriptSource(ret, $outer._ctx);
        });
      }

      static newRefInput(scriptHash: WasmContract.ScriptHash, input: WasmContract.TransactionInput): Promise<WasmContract.NativeScriptSource> {
        return wrapByPromise(() => {
          const ret = WasmV4.NativeScriptSource.new_ref_input(scriptHash.wasm, input.wasm);
          return new $outer.NativeScriptSource(ret, $outer._ctx);
        });
      }

      setRequiredSigners(keyHashes: WasmContract.Ed25519KeyHashes): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_required_signers(keyHashes.wasm);
        });
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

      static new(): Promise<WasmContract.NativeScripts> {
        return wrapByPromise(() => {
          const ret = WasmV4.NativeScripts.new();
          return new $outer.NativeScripts(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      get(index: number): Promise<WasmContract.NativeScript> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(index);
          return new $outer.NativeScript(ret, $outer._ctx);
        });
      }

      add(elem: WasmContract.NativeScript): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add(elem.wasm);
        });
      }

      toBytes(): Promise<Uint8Array> {
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.NativeScripts> {
        return wrapByPromise(() => {
          const ret = WasmV4.NativeScripts.from_bytes(bytes);
          return new $outer.NativeScripts(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.NativeScripts> {
        return wrapByPromise(() => {
          const ret = WasmV4.NativeScripts.from_hex(hexStr);
          return new $outer.NativeScripts(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.NativeScripts> {
        return wrapByPromise(() => {
          const ret = WasmV4.NativeScripts.from_json(json);
          return new $outer.NativeScripts(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.NetworkId> {
        return wrapByPromise(() => {
          const ret = WasmV4.NetworkId.from_bytes(bytes);
          return new $outer.NetworkId(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.NetworkId> {
        return wrapByPromise(() => {
          const ret = WasmV4.NetworkId.from_hex(hexStr);
          return new $outer.NetworkId(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.NetworkId> {
        return wrapByPromise(() => {
          const ret = WasmV4.NetworkId.from_json(json);
          return new $outer.NetworkId(ret, $outer._ctx);
        });
      }

      static testnet(): Promise<WasmContract.NetworkId> {
        return wrapByPromise(() => {
          const ret = WasmV4.NetworkId.testnet();
          return new $outer.NetworkId(ret, $outer._ctx);
        });
      }

      static mainnet(): Promise<WasmContract.NetworkId> {
        return wrapByPromise(() => {
          const ret = WasmV4.NetworkId.mainnet();
          return new $outer.NetworkId(ret, $outer._ctx);
        });
      }

      kind(): Promise<WasmContract.NetworkIdKind> {
        return wrapByPromise(() => {
          return this.wasm.kind();
        });
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

      static new(networkId: number, protocolMagic: number): Promise<WasmContract.NetworkInfo> {
        return wrapByPromise(() => {
          const ret = WasmV4.NetworkInfo.new(networkId, protocolMagic);
          return new $outer.NetworkInfo(ret, $outer._ctx);
        });
      }

      networkId(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.network_id();
        });
      }

      protocolMagic(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.protocol_magic();
        });
      }

      static testnetPreview(): Promise<WasmContract.NetworkInfo> {
        return wrapByPromise(() => {
          const ret = WasmV4.NetworkInfo.testnet_preview();
          return new $outer.NetworkInfo(ret, $outer._ctx);
        });
      }

      static testnetPreprod(): Promise<WasmContract.NetworkInfo> {
        return wrapByPromise(() => {
          const ret = WasmV4.NetworkInfo.testnet_preprod();
          return new $outer.NetworkInfo(ret, $outer._ctx);
        });
      }

      static mainnet(): Promise<WasmContract.NetworkInfo> {
        return wrapByPromise(() => {
          const ret = WasmV4.NetworkInfo.mainnet();
          return new $outer.NetworkInfo(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.NewConstitutionAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.NewConstitutionAction.from_bytes(bytes);
          return new $outer.NewConstitutionAction(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.NewConstitutionAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.NewConstitutionAction.from_hex(hexStr);
          return new $outer.NewConstitutionAction(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.NewConstitutionAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.NewConstitutionAction.from_json(json);
          return new $outer.NewConstitutionAction(ret, $outer._ctx);
        });
      }

      govActionId(): Promise<Optional<WasmContract.GovernanceActionId>> {
        return wrapByPromise(() => {
          const ret = this.wasm.gov_action_id();
          if (ret == null) return undefined;
          return new $outer.GovernanceActionId(ret, $outer._ctx);
        });
      }

      constitution(): Promise<WasmContract.Constitution> {
        return wrapByPromise(() => {
          const ret = this.wasm.constitution();
          return new $outer.Constitution(ret, $outer._ctx);
        });
      }

      static new(constitution: WasmContract.Constitution): Promise<WasmContract.NewConstitutionAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.NewConstitutionAction.new(constitution.wasm);
          return new $outer.NewConstitutionAction(ret, $outer._ctx);
        });
      }

      static newWithActionId(govActionId: WasmContract.GovernanceActionId, constitution: WasmContract.Constitution): Promise<WasmContract.NewConstitutionAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.NewConstitutionAction.new_with_action_id(govActionId.wasm, constitution.wasm);
          return new $outer.NewConstitutionAction(ret, $outer._ctx);
        });
      }

      hasScriptHash(): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.has_script_hash();
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.NoConfidenceAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.NoConfidenceAction.from_bytes(bytes);
          return new $outer.NoConfidenceAction(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.NoConfidenceAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.NoConfidenceAction.from_hex(hexStr);
          return new $outer.NoConfidenceAction(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.NoConfidenceAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.NoConfidenceAction.from_json(json);
          return new $outer.NoConfidenceAction(ret, $outer._ctx);
        });
      }

      govActionId(): Promise<Optional<WasmContract.GovernanceActionId>> {
        return wrapByPromise(() => {
          const ret = this.wasm.gov_action_id();
          if (ret == null) return undefined;
          return new $outer.GovernanceActionId(ret, $outer._ctx);
        });
      }

      static new(): Promise<WasmContract.NoConfidenceAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.NoConfidenceAction.new();
          return new $outer.NoConfidenceAction(ret, $outer._ctx);
        });
      }

      static newWithActionId(govActionId: WasmContract.GovernanceActionId): Promise<WasmContract.NoConfidenceAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.NoConfidenceAction.new_with_action_id(govActionId.wasm);
          return new $outer.NoConfidenceAction(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.Nonce> {
        return wrapByPromise(() => {
          const ret = WasmV4.Nonce.from_bytes(bytes);
          return new $outer.Nonce(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.Nonce> {
        return wrapByPromise(() => {
          const ret = WasmV4.Nonce.from_hex(hexStr);
          return new $outer.Nonce(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.Nonce> {
        return wrapByPromise(() => {
          const ret = WasmV4.Nonce.from_json(json);
          return new $outer.Nonce(ret, $outer._ctx);
        });
      }

      static newIdentity(): Promise<WasmContract.Nonce> {
        return wrapByPromise(() => {
          const ret = WasmV4.Nonce.new_identity();
          return new $outer.Nonce(ret, $outer._ctx);
        });
      }

      static newFromHash(hash: Uint8Array): Promise<WasmContract.Nonce> {
        return wrapByPromise(() => {
          const ret = WasmV4.Nonce.new_from_hash(hash);
          return new $outer.Nonce(ret, $outer._ctx);
        });
      }

      getHash(): Promise<Optional<Uint8Array>> {
        return wrapByPromise(() => {
          return this.wasm.get_hash();
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.OperationalCert> {
        return wrapByPromise(() => {
          const ret = WasmV4.OperationalCert.from_bytes(bytes);
          return new $outer.OperationalCert(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.OperationalCert> {
        return wrapByPromise(() => {
          const ret = WasmV4.OperationalCert.from_hex(hexStr);
          return new $outer.OperationalCert(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.OperationalCert> {
        return wrapByPromise(() => {
          const ret = WasmV4.OperationalCert.from_json(json);
          return new $outer.OperationalCert(ret, $outer._ctx);
        });
      }

      hotVkey(): Promise<WasmContract.KESVKey> {
        return wrapByPromise(() => {
          const ret = this.wasm.hot_vkey();
          return new $outer.KESVKey(ret, $outer._ctx);
        });
      }

      sequenceNumber(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.sequence_number();
        });
      }

      kesPeriod(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.kes_period();
        });
      }

      sigma(): Promise<WasmContract.Ed25519Signature> {
        return wrapByPromise(() => {
          const ret = this.wasm.sigma();
          return new $outer.Ed25519Signature(ret, $outer._ctx);
        });
      }

      static new(hotVkey: WasmContract.KESVKey, sequenceNumber: number, kesPeriod: number, sigma: WasmContract.Ed25519Signature): Promise<WasmContract.OperationalCert> {
        return wrapByPromise(() => {
          const ret = WasmV4.OperationalCert.new(hotVkey.wasm, sequenceNumber, kesPeriod, sigma.wasm);
          return new $outer.OperationalCert(ret, $outer._ctx);
        });
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

      static newDataHash(dataHash: WasmContract.DataHash): Promise<WasmContract.OutputDatum> {
        return wrapByPromise(() => {
          const ret = WasmV4.OutputDatum.new_data_hash(dataHash.wasm);
          return new $outer.OutputDatum(ret, $outer._ctx);
        });
      }

      static newData(data: WasmContract.PlutusData): Promise<WasmContract.OutputDatum> {
        return wrapByPromise(() => {
          const ret = WasmV4.OutputDatum.new_data(data.wasm);
          return new $outer.OutputDatum(ret, $outer._ctx);
        });
      }

      dataHash(): Promise<Optional<WasmContract.DataHash>> {
        return wrapByPromise(() => {
          const ret = this.wasm.data_hash();
          if (ret == null) return undefined;
          return new $outer.DataHash(ret, $outer._ctx);
        });
      }

      data(): Promise<Optional<WasmContract.PlutusData>> {
        return wrapByPromise(() => {
          const ret = this.wasm.data();
          if (ret == null) return undefined;
          return new $outer.PlutusData(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.ParameterChangeAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.ParameterChangeAction.from_bytes(bytes);
          return new $outer.ParameterChangeAction(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.ParameterChangeAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.ParameterChangeAction.from_hex(hexStr);
          return new $outer.ParameterChangeAction(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.ParameterChangeAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.ParameterChangeAction.from_json(json);
          return new $outer.ParameterChangeAction(ret, $outer._ctx);
        });
      }

      govActionId(): Promise<Optional<WasmContract.GovernanceActionId>> {
        return wrapByPromise(() => {
          const ret = this.wasm.gov_action_id();
          if (ret == null) return undefined;
          return new $outer.GovernanceActionId(ret, $outer._ctx);
        });
      }

      protocolParamUpdates(): Promise<WasmContract.ProtocolParamUpdate> {
        return wrapByPromise(() => {
          const ret = this.wasm.protocol_param_updates();
          return new $outer.ProtocolParamUpdate(ret, $outer._ctx);
        });
      }

      policyHash(): Promise<Optional<WasmContract.ScriptHash>> {
        return wrapByPromise(() => {
          const ret = this.wasm.policy_hash();
          if (ret == null) return undefined;
          return new $outer.ScriptHash(ret, $outer._ctx);
        });
      }

      static new(protocolParamUpdates: WasmContract.ProtocolParamUpdate): Promise<WasmContract.ParameterChangeAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.ParameterChangeAction.new(protocolParamUpdates.wasm);
          return new $outer.ParameterChangeAction(ret, $outer._ctx);
        });
      }

      static newWithActionId(govActionId: WasmContract.GovernanceActionId, protocolParamUpdates: WasmContract.ProtocolParamUpdate): Promise<WasmContract.ParameterChangeAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.ParameterChangeAction.new_with_action_id(govActionId.wasm, protocolParamUpdates.wasm);
          return new $outer.ParameterChangeAction(ret, $outer._ctx);
        });
      }

      static newWithPolicyHash(protocolParamUpdates: WasmContract.ProtocolParamUpdate, policyHash: WasmContract.ScriptHash): Promise<WasmContract.ParameterChangeAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.ParameterChangeAction.new_with_policy_hash(protocolParamUpdates.wasm, policyHash.wasm);
          return new $outer.ParameterChangeAction(ret, $outer._ctx);
        });
      }

      static newWithPolicyHashAndActionId(govActionId: WasmContract.GovernanceActionId, protocolParamUpdates: WasmContract.ProtocolParamUpdate, policyHash: WasmContract.ScriptHash): Promise<WasmContract.ParameterChangeAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.ParameterChangeAction.new_with_policy_hash_and_action_id(govActionId.wasm, protocolParamUpdates.wasm, policyHash.wasm);
          return new $outer.ParameterChangeAction(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.PlutusData> {
        return wrapByPromise(() => {
          const ret = WasmV4.PlutusData.from_bytes(bytes);
          return new $outer.PlutusData(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.PlutusData> {
        return wrapByPromise(() => {
          const ret = WasmV4.PlutusData.from_hex(hexStr);
          return new $outer.PlutusData(ret, $outer._ctx);
        });
      }

      static newConstrPlutusData(constrPlutusData: WasmContract.ConstrPlutusData): Promise<WasmContract.PlutusData> {
        return wrapByPromise(() => {
          const ret = WasmV4.PlutusData.new_constr_plutus_data(constrPlutusData.wasm);
          return new $outer.PlutusData(ret, $outer._ctx);
        });
      }

      static newEmptyConstrPlutusData(alternative: WasmContract.BigNum): Promise<WasmContract.PlutusData> {
        return wrapByPromise(() => {
          const ret = WasmV4.PlutusData.new_empty_constr_plutus_data(alternative.wasm);
          return new $outer.PlutusData(ret, $outer._ctx);
        });
      }

      static newSingleValueConstrPlutusData(alternative: WasmContract.BigNum, plutusData: WasmContract.PlutusData): Promise<WasmContract.PlutusData> {
        return wrapByPromise(() => {
          const ret = WasmV4.PlutusData.new_single_value_constr_plutus_data(alternative.wasm, plutusData.wasm);
          return new $outer.PlutusData(ret, $outer._ctx);
        });
      }

      static newMap(map: WasmContract.PlutusMap): Promise<WasmContract.PlutusData> {
        return wrapByPromise(() => {
          const ret = WasmV4.PlutusData.new_map(map.wasm);
          return new $outer.PlutusData(ret, $outer._ctx);
        });
      }

      static newList(list: WasmContract.PlutusList): Promise<WasmContract.PlutusData> {
        return wrapByPromise(() => {
          const ret = WasmV4.PlutusData.new_list(list.wasm);
          return new $outer.PlutusData(ret, $outer._ctx);
        });
      }

      static newInteger(integer: WasmContract.BigInt): Promise<WasmContract.PlutusData> {
        return wrapByPromise(() => {
          const ret = WasmV4.PlutusData.new_integer(integer.wasm);
          return new $outer.PlutusData(ret, $outer._ctx);
        });
      }

      static newBytes(bytes: Uint8Array): Promise<WasmContract.PlutusData> {
        return wrapByPromise(() => {
          const ret = WasmV4.PlutusData.new_bytes(bytes);
          return new $outer.PlutusData(ret, $outer._ctx);
        });
      }

      kind(): Promise<WasmContract.PlutusDataKind> {
        return wrapByPromise(() => {
          return this.wasm.kind();
        });
      }

      asConstrPlutusData(): Promise<Optional<WasmContract.ConstrPlutusData>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_constr_plutus_data();
          if (ret == null) return undefined;
          return new $outer.ConstrPlutusData(ret, $outer._ctx);
        });
      }

      asMap(): Promise<Optional<WasmContract.PlutusMap>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_map();
          if (ret == null) return undefined;
          return new $outer.PlutusMap(ret, $outer._ctx);
        });
      }

      asList(): Promise<Optional<WasmContract.PlutusList>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_list();
          if (ret == null) return undefined;
          return new $outer.PlutusList(ret, $outer._ctx);
        });
      }

      asInteger(): Promise<Optional<WasmContract.BigInt>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_integer();
          if (ret == null) return undefined;
          return new $outer.BigInt(ret, $outer._ctx);
        });
      }

      asBytes(): Promise<Optional<Uint8Array>> {
        return wrapByPromise(() => {
          return this.wasm.as_bytes();
        });
      }

      toJson(schema: WasmContract.PlutusDatumSchema): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json(schema);
        });
      }

      static fromJson(json: string, schema: WasmContract.PlutusDatumSchema): Promise<WasmContract.PlutusData> {
        return wrapByPromise(() => {
          const ret = WasmV4.PlutusData.from_json(json, schema);
          return new $outer.PlutusData(ret, $outer._ctx);
        });
      }

      static fromAddress(address: WasmContract.Address): Promise<WasmContract.PlutusData> {
        return wrapByPromise(() => {
          const ret = WasmV4.PlutusData.from_address(address.wasm);
          return new $outer.PlutusData(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.PlutusList> {
        return wrapByPromise(() => {
          const ret = WasmV4.PlutusList.from_bytes(bytes);
          return new $outer.PlutusList(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.PlutusList> {
        return wrapByPromise(() => {
          const ret = WasmV4.PlutusList.from_hex(hexStr);
          return new $outer.PlutusList(ret, $outer._ctx);
        });
      }

      static new(): Promise<WasmContract.PlutusList> {
        return wrapByPromise(() => {
          const ret = WasmV4.PlutusList.new();
          return new $outer.PlutusList(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      get(index: number): Promise<WasmContract.PlutusData> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(index);
          return new $outer.PlutusData(ret, $outer._ctx);
        });
      }

      add(elem: WasmContract.PlutusData): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add(elem.wasm);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.PlutusMap> {
        return wrapByPromise(() => {
          const ret = WasmV4.PlutusMap.from_bytes(bytes);
          return new $outer.PlutusMap(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.PlutusMap> {
        return wrapByPromise(() => {
          const ret = WasmV4.PlutusMap.from_hex(hexStr);
          return new $outer.PlutusMap(ret, $outer._ctx);
        });
      }

      static new(): Promise<WasmContract.PlutusMap> {
        return wrapByPromise(() => {
          const ret = WasmV4.PlutusMap.new();
          return new $outer.PlutusMap(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      insert(key: WasmContract.PlutusData, value: WasmContract.PlutusData): Promise<Optional<WasmContract.PlutusData>> {
        return wrapByPromise(() => {
          const ret = this.wasm.insert(key.wasm, value.wasm);
          if (ret == null) return undefined;
          return new $outer.PlutusData(ret, $outer._ctx);
        });
      }

      get(key: WasmContract.PlutusData): Promise<Optional<WasmContract.PlutusData>> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(key.wasm);
          if (ret == null) return undefined;
          return new $outer.PlutusData(ret, $outer._ctx);
        });
      }

      keys(): Promise<WasmContract.PlutusList> {
        return wrapByPromise(() => {
          const ret = this.wasm.keys();
          return new $outer.PlutusList(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.PlutusScript> {
        return wrapByPromise(() => {
          const ret = WasmV4.PlutusScript.from_bytes(bytes);
          return new $outer.PlutusScript(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.PlutusScript> {
        return wrapByPromise(() => {
          const ret = WasmV4.PlutusScript.from_hex(hexStr);
          return new $outer.PlutusScript(ret, $outer._ctx);
        });
      }

      static new(bytes: Uint8Array): Promise<WasmContract.PlutusScript> {
        return wrapByPromise(() => {
          const ret = WasmV4.PlutusScript.new(bytes);
          return new $outer.PlutusScript(ret, $outer._ctx);
        });
      }

      static newV2(bytes: Uint8Array): Promise<WasmContract.PlutusScript> {
        return wrapByPromise(() => {
          const ret = WasmV4.PlutusScript.new_v2(bytes);
          return new $outer.PlutusScript(ret, $outer._ctx);
        });
      }

      static newV3(bytes: Uint8Array): Promise<WasmContract.PlutusScript> {
        return wrapByPromise(() => {
          const ret = WasmV4.PlutusScript.new_v3(bytes);
          return new $outer.PlutusScript(ret, $outer._ctx);
        });
      }

      static newWithVersion(bytes: Uint8Array, language: WasmContract.Language): Promise<WasmContract.PlutusScript> {
        return wrapByPromise(() => {
          const ret = WasmV4.PlutusScript.new_with_version(bytes, language.wasm);
          return new $outer.PlutusScript(ret, $outer._ctx);
        });
      }

      bytes(): Promise<Uint8Array> {
        return wrapByPromise(() => {
          return this.wasm.bytes();
        });
      }

      static fromBytesV2(bytes: Uint8Array): Promise<WasmContract.PlutusScript> {
        return wrapByPromise(() => {
          const ret = WasmV4.PlutusScript.from_bytes_v2(bytes);
          return new $outer.PlutusScript(ret, $outer._ctx);
        });
      }

      static fromBytesV3(bytes: Uint8Array): Promise<WasmContract.PlutusScript> {
        return wrapByPromise(() => {
          const ret = WasmV4.PlutusScript.from_bytes_v3(bytes);
          return new $outer.PlutusScript(ret, $outer._ctx);
        });
      }

      static fromBytesWithVersion(bytes: Uint8Array, language: WasmContract.Language): Promise<WasmContract.PlutusScript> {
        return wrapByPromise(() => {
          const ret = WasmV4.PlutusScript.from_bytes_with_version(bytes, language.wasm);
          return new $outer.PlutusScript(ret, $outer._ctx);
        });
      }

      static fromHexWithVersion(hexStr: string, language: WasmContract.Language): Promise<WasmContract.PlutusScript> {
        return wrapByPromise(() => {
          const ret = WasmV4.PlutusScript.from_hex_with_version(hexStr, language.wasm);
          return new $outer.PlutusScript(ret, $outer._ctx);
        });
      }

      hash(): Promise<WasmContract.ScriptHash> {
        return wrapByPromise(() => {
          const ret = this.wasm.hash();
          return new $outer.ScriptHash(ret, $outer._ctx);
        });
      }

      languageVersion(): Promise<WasmContract.Language> {
        return wrapByPromise(() => {
          const ret = this.wasm.language_version();
          return new $outer.Language(ret, $outer._ctx);
        });
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

      static new(script: WasmContract.PlutusScript): Promise<WasmContract.PlutusScriptSource> {
        return wrapByPromise(() => {
          const ret = WasmV4.PlutusScriptSource.new(script.wasm);
          return new $outer.PlutusScriptSource(ret, $outer._ctx);
        });
      }

      static newRefInput(scriptHash: WasmContract.ScriptHash, input: WasmContract.TransactionInput, langVer: WasmContract.Language, scriptSize: number): Promise<WasmContract.PlutusScriptSource> {
        return wrapByPromise(() => {
          const ret = WasmV4.PlutusScriptSource.new_ref_input(scriptHash.wasm, input.wasm, langVer.wasm, scriptSize);
          return new $outer.PlutusScriptSource(ret, $outer._ctx);
        });
      }

      setRequiredSigners(keyHashes: WasmContract.Ed25519KeyHashes): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_required_signers(keyHashes.wasm);
        });
      }

      getRefScriptSize(): Promise<Optional<number>> {
        return wrapByPromise(() => {
          return this.wasm.get_ref_script_size();
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.PlutusScripts> {
        return wrapByPromise(() => {
          const ret = WasmV4.PlutusScripts.from_bytes(bytes);
          return new $outer.PlutusScripts(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.PlutusScripts> {
        return wrapByPromise(() => {
          const ret = WasmV4.PlutusScripts.from_hex(hexStr);
          return new $outer.PlutusScripts(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.PlutusScripts> {
        return wrapByPromise(() => {
          const ret = WasmV4.PlutusScripts.from_json(json);
          return new $outer.PlutusScripts(ret, $outer._ctx);
        });
      }

      static new(): Promise<WasmContract.PlutusScripts> {
        return wrapByPromise(() => {
          const ret = WasmV4.PlutusScripts.new();
          return new $outer.PlutusScripts(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      get(index: number): Promise<WasmContract.PlutusScript> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(index);
          return new $outer.PlutusScript(ret, $outer._ctx);
        });
      }

      add(elem: WasmContract.PlutusScript): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add(elem.wasm);
        });
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

      static new(script: WasmContract.PlutusScript, datum: WasmContract.PlutusData, redeemer: WasmContract.Redeemer): Promise<WasmContract.PlutusWitness> {
        return wrapByPromise(() => {
          const ret = WasmV4.PlutusWitness.new(script.wasm, datum.wasm, redeemer.wasm);
          return new $outer.PlutusWitness(ret, $outer._ctx);
        });
      }

      static newWithRef(script: WasmContract.PlutusScriptSource, datum: WasmContract.DatumSource, redeemer: WasmContract.Redeemer): Promise<WasmContract.PlutusWitness> {
        return wrapByPromise(() => {
          const ret = WasmV4.PlutusWitness.new_with_ref(script.wasm, datum.wasm, redeemer.wasm);
          return new $outer.PlutusWitness(ret, $outer._ctx);
        });
      }

      static newWithoutDatum(script: WasmContract.PlutusScript, redeemer: WasmContract.Redeemer): Promise<WasmContract.PlutusWitness> {
        return wrapByPromise(() => {
          const ret = WasmV4.PlutusWitness.new_without_datum(script.wasm, redeemer.wasm);
          return new $outer.PlutusWitness(ret, $outer._ctx);
        });
      }

      static newWithRefWithoutDatum(script: WasmContract.PlutusScriptSource, redeemer: WasmContract.Redeemer): Promise<WasmContract.PlutusWitness> {
        return wrapByPromise(() => {
          const ret = WasmV4.PlutusWitness.new_with_ref_without_datum(script.wasm, redeemer.wasm);
          return new $outer.PlutusWitness(ret, $outer._ctx);
        });
      }

      script(): Promise<Optional<WasmContract.PlutusScript>> {
        return wrapByPromise(() => {
          const ret = this.wasm.script();
          if (ret == null) return undefined;
          return new $outer.PlutusScript(ret, $outer._ctx);
        });
      }

      datum(): Promise<Optional<WasmContract.PlutusData>> {
        return wrapByPromise(() => {
          const ret = this.wasm.datum();
          if (ret == null) return undefined;
          return new $outer.PlutusData(ret, $outer._ctx);
        });
      }

      redeemer(): Promise<WasmContract.Redeemer> {
        return wrapByPromise(() => {
          const ret = this.wasm.redeemer();
          return new $outer.Redeemer(ret, $outer._ctx);
        });
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

      static new(): Promise<WasmContract.PlutusWitnesses> {
        return wrapByPromise(() => {
          const ret = WasmV4.PlutusWitnesses.new();
          return new $outer.PlutusWitnesses(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      get(index: number): Promise<WasmContract.PlutusWitness> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(index);
          return new $outer.PlutusWitness(ret, $outer._ctx);
        });
      }

      add(elem: WasmContract.PlutusWitness): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add(elem.wasm);
        });
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

      static new(slot: number, txIndex: number, certIndex: number): Promise<WasmContract.Pointer> {
        return wrapByPromise(() => {
          const ret = WasmV4.Pointer.new(slot, txIndex, certIndex);
          return new $outer.Pointer(ret, $outer._ctx);
        });
      }

      static newPointer(slot: WasmContract.BigNum, txIndex: WasmContract.BigNum, certIndex: WasmContract.BigNum): Promise<WasmContract.Pointer> {
        return wrapByPromise(() => {
          const ret = WasmV4.Pointer.new_pointer(slot.wasm, txIndex.wasm, certIndex.wasm);
          return new $outer.Pointer(ret, $outer._ctx);
        });
      }

      slot(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.slot();
        });
      }

      txIndex(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.tx_index();
        });
      }

      certIndex(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.cert_index();
        });
      }

      slotBignum(): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = this.wasm.slot_bignum();
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      txIndexBignum(): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = this.wasm.tx_index_bignum();
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      certIndexBignum(): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = this.wasm.cert_index_bignum();
          return new $outer.BigNum(ret, $outer._ctx);
        });
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

      static new(network: number, payment: WasmContract.Credential, stake: WasmContract.Pointer): Promise<WasmContract.PointerAddress> {
        return wrapByPromise(() => {
          const ret = WasmV4.PointerAddress.new(network, payment.wasm, stake.wasm);
          return new $outer.PointerAddress(ret, $outer._ctx);
        });
      }

      paymentCred(): Promise<WasmContract.Credential> {
        return wrapByPromise(() => {
          const ret = this.wasm.payment_cred();
          return new $outer.Credential(ret, $outer._ctx);
        });
      }

      stakePointer(): Promise<WasmContract.Pointer> {
        return wrapByPromise(() => {
          const ret = this.wasm.stake_pointer();
          return new $outer.Pointer(ret, $outer._ctx);
        });
      }

      toAddress(): Promise<WasmContract.Address> {
        return wrapByPromise(() => {
          const ret = this.wasm.to_address();
          return new $outer.Address(ret, $outer._ctx);
        });
      }

      static fromAddress(addr: WasmContract.Address): Promise<Optional<WasmContract.PointerAddress>> {
        return wrapByPromise(() => {
          const ret = WasmV4.PointerAddress.from_address(addr.wasm);
          if (ret == null) return undefined;
          return new $outer.PointerAddress(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.PoolMetadata> {
        return wrapByPromise(() => {
          const ret = WasmV4.PoolMetadata.from_bytes(bytes);
          return new $outer.PoolMetadata(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.PoolMetadata> {
        return wrapByPromise(() => {
          const ret = WasmV4.PoolMetadata.from_hex(hexStr);
          return new $outer.PoolMetadata(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.PoolMetadata> {
        return wrapByPromise(() => {
          const ret = WasmV4.PoolMetadata.from_json(json);
          return new $outer.PoolMetadata(ret, $outer._ctx);
        });
      }

      url(): Promise<WasmContract.URL> {
        return wrapByPromise(() => {
          const ret = this.wasm.url();
          return new $outer.URL(ret, $outer._ctx);
        });
      }

      poolMetadataHash(): Promise<WasmContract.PoolMetadataHash> {
        return wrapByPromise(() => {
          const ret = this.wasm.pool_metadata_hash();
          return new $outer.PoolMetadataHash(ret, $outer._ctx);
        });
      }

      static new(url: WasmContract.URL, poolMetadataHash: WasmContract.PoolMetadataHash): Promise<WasmContract.PoolMetadata> {
        return wrapByPromise(() => {
          const ret = WasmV4.PoolMetadata.new(url.wasm, poolMetadataHash.wasm);
          return new $outer.PoolMetadata(ret, $outer._ctx);
        });
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

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.PoolMetadataHash> {
        return wrapByPromise(() => {
          const ret = WasmV4.PoolMetadataHash.from_bytes(bytes);
          return new $outer.PoolMetadataHash(ret, $outer._ctx);
        });
      }

      toBytes(): Promise<Uint8Array> {
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      toBech32(prefix: string): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_bech32(prefix);
        });
      }

      static fromBech32(bechStr: string): Promise<WasmContract.PoolMetadataHash> {
        return wrapByPromise(() => {
          const ret = WasmV4.PoolMetadataHash.from_bech32(bechStr);
          return new $outer.PoolMetadataHash(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hex: string): Promise<WasmContract.PoolMetadataHash> {
        return wrapByPromise(() => {
          const ret = WasmV4.PoolMetadataHash.from_hex(hex);
          return new $outer.PoolMetadataHash(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.PoolParams> {
        return wrapByPromise(() => {
          const ret = WasmV4.PoolParams.from_bytes(bytes);
          return new $outer.PoolParams(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.PoolParams> {
        return wrapByPromise(() => {
          const ret = WasmV4.PoolParams.from_hex(hexStr);
          return new $outer.PoolParams(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.PoolParams> {
        return wrapByPromise(() => {
          const ret = WasmV4.PoolParams.from_json(json);
          return new $outer.PoolParams(ret, $outer._ctx);
        });
      }

      operator(): Promise<WasmContract.Ed25519KeyHash> {
        return wrapByPromise(() => {
          const ret = this.wasm.operator();
          return new $outer.Ed25519KeyHash(ret, $outer._ctx);
        });
      }

      vrfKeyhash(): Promise<WasmContract.VRFKeyHash> {
        return wrapByPromise(() => {
          const ret = this.wasm.vrf_keyhash();
          return new $outer.VRFKeyHash(ret, $outer._ctx);
        });
      }

      pledge(): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = this.wasm.pledge();
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      cost(): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = this.wasm.cost();
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      margin(): Promise<WasmContract.UnitInterval> {
        return wrapByPromise(() => {
          const ret = this.wasm.margin();
          return new $outer.UnitInterval(ret, $outer._ctx);
        });
      }

      rewardAccount(): Promise<WasmContract.RewardAddress> {
        return wrapByPromise(() => {
          const ret = this.wasm.reward_account();
          return new $outer.RewardAddress(ret, $outer._ctx);
        });
      }

      poolOwners(): Promise<WasmContract.Ed25519KeyHashes> {
        return wrapByPromise(() => {
          const ret = this.wasm.pool_owners();
          return new $outer.Ed25519KeyHashes(ret, $outer._ctx);
        });
      }

      relays(): Promise<WasmContract.Relays> {
        return wrapByPromise(() => {
          const ret = this.wasm.relays();
          return new $outer.Relays(ret, $outer._ctx);
        });
      }

      poolMetadata(): Promise<Optional<WasmContract.PoolMetadata>> {
        return wrapByPromise(() => {
          const ret = this.wasm.pool_metadata();
          if (ret == null) return undefined;
          return new $outer.PoolMetadata(ret, $outer._ctx);
        });
      }

      static new(operator: WasmContract.Ed25519KeyHash, vrfKeyhash: WasmContract.VRFKeyHash, pledge: WasmContract.BigNum, cost: WasmContract.BigNum, margin: WasmContract.UnitInterval, rewardAccount: WasmContract.RewardAddress, poolOwners: WasmContract.Ed25519KeyHashes, relays: WasmContract.Relays, poolMetadata: Optional<WasmContract.PoolMetadata>): Promise<WasmContract.PoolParams> {
        return wrapByPromise(() => {
          const ret = WasmV4.PoolParams.new(operator.wasm, vrfKeyhash.wasm, pledge.wasm, cost.wasm, margin.wasm, rewardAccount.wasm, poolOwners.wasm, relays.wasm, poolMetadata?.wasm);
          return new $outer.PoolParams(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.PoolRegistration> {
        return wrapByPromise(() => {
          const ret = WasmV4.PoolRegistration.from_bytes(bytes);
          return new $outer.PoolRegistration(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.PoolRegistration> {
        return wrapByPromise(() => {
          const ret = WasmV4.PoolRegistration.from_hex(hexStr);
          return new $outer.PoolRegistration(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.PoolRegistration> {
        return wrapByPromise(() => {
          const ret = WasmV4.PoolRegistration.from_json(json);
          return new $outer.PoolRegistration(ret, $outer._ctx);
        });
      }

      poolParams(): Promise<WasmContract.PoolParams> {
        return wrapByPromise(() => {
          const ret = this.wasm.pool_params();
          return new $outer.PoolParams(ret, $outer._ctx);
        });
      }

      static new(poolParams: WasmContract.PoolParams): Promise<WasmContract.PoolRegistration> {
        return wrapByPromise(() => {
          const ret = WasmV4.PoolRegistration.new(poolParams.wasm);
          return new $outer.PoolRegistration(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.PoolRetirement> {
        return wrapByPromise(() => {
          const ret = WasmV4.PoolRetirement.from_bytes(bytes);
          return new $outer.PoolRetirement(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.PoolRetirement> {
        return wrapByPromise(() => {
          const ret = WasmV4.PoolRetirement.from_hex(hexStr);
          return new $outer.PoolRetirement(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.PoolRetirement> {
        return wrapByPromise(() => {
          const ret = WasmV4.PoolRetirement.from_json(json);
          return new $outer.PoolRetirement(ret, $outer._ctx);
        });
      }

      poolKeyhash(): Promise<WasmContract.Ed25519KeyHash> {
        return wrapByPromise(() => {
          const ret = this.wasm.pool_keyhash();
          return new $outer.Ed25519KeyHash(ret, $outer._ctx);
        });
      }

      epoch(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.epoch();
        });
      }

      static new(poolKeyhash: WasmContract.Ed25519KeyHash, epoch: number): Promise<WasmContract.PoolRetirement> {
        return wrapByPromise(() => {
          const ret = WasmV4.PoolRetirement.new(poolKeyhash.wasm, epoch);
          return new $outer.PoolRetirement(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.PoolVotingThresholds> {
        return wrapByPromise(() => {
          const ret = WasmV4.PoolVotingThresholds.from_bytes(bytes);
          return new $outer.PoolVotingThresholds(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.PoolVotingThresholds> {
        return wrapByPromise(() => {
          const ret = WasmV4.PoolVotingThresholds.from_hex(hexStr);
          return new $outer.PoolVotingThresholds(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.PoolVotingThresholds> {
        return wrapByPromise(() => {
          const ret = WasmV4.PoolVotingThresholds.from_json(json);
          return new $outer.PoolVotingThresholds(ret, $outer._ctx);
        });
      }

      static new(motionNoConfidence: WasmContract.UnitInterval, committeeNormal: WasmContract.UnitInterval, committeeNoConfidence: WasmContract.UnitInterval, hardForkInitiation: WasmContract.UnitInterval, securityRelevantThreshold: WasmContract.UnitInterval): Promise<WasmContract.PoolVotingThresholds> {
        return wrapByPromise(() => {
          const ret = WasmV4.PoolVotingThresholds.new(motionNoConfidence.wasm, committeeNormal.wasm, committeeNoConfidence.wasm, hardForkInitiation.wasm, securityRelevantThreshold.wasm);
          return new $outer.PoolVotingThresholds(ret, $outer._ctx);
        });
      }

      motionNoConfidence(): Promise<WasmContract.UnitInterval> {
        return wrapByPromise(() => {
          const ret = this.wasm.motion_no_confidence();
          return new $outer.UnitInterval(ret, $outer._ctx);
        });
      }

      committeeNormal(): Promise<WasmContract.UnitInterval> {
        return wrapByPromise(() => {
          const ret = this.wasm.committee_normal();
          return new $outer.UnitInterval(ret, $outer._ctx);
        });
      }

      committeeNoConfidence(): Promise<WasmContract.UnitInterval> {
        return wrapByPromise(() => {
          const ret = this.wasm.committee_no_confidence();
          return new $outer.UnitInterval(ret, $outer._ctx);
        });
      }

      hardForkInitiation(): Promise<WasmContract.UnitInterval> {
        return wrapByPromise(() => {
          const ret = this.wasm.hard_fork_initiation();
          return new $outer.UnitInterval(ret, $outer._ctx);
        });
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

      toPublic(): Promise<WasmContract.PublicKey> {
        return wrapByPromise(() => {
          const ret = this.wasm.to_public();
          return new $outer.PublicKey(ret, $outer._ctx);
        });
      }

      static generateEd25519(): Promise<WasmContract.PrivateKey> {
        return wrapByPromise(() => {
          const ret = WasmV4.PrivateKey.generate_ed25519();
          return new $outer.PrivateKey(ret, $outer._ctx);
        });
      }

      static generateEd25519extended(): Promise<WasmContract.PrivateKey> {
        return wrapByPromise(() => {
          const ret = WasmV4.PrivateKey.generate_ed25519extended();
          return new $outer.PrivateKey(ret, $outer._ctx);
        });
      }

      static fromBech32(bech32Str: string): Promise<WasmContract.PrivateKey> {
        return wrapByPromise(() => {
          const ret = WasmV4.PrivateKey.from_bech32(bech32Str);
          return new $outer.PrivateKey(ret, $outer._ctx);
        });
      }

      toBech32(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_bech32();
        });
      }

      asBytes(): Promise<Uint8Array> {
        return wrapByPromise(() => {
          return this.wasm.as_bytes();
        });
      }

      static fromExtendedBytes(bytes: Uint8Array): Promise<WasmContract.PrivateKey> {
        return wrapByPromise(() => {
          const ret = WasmV4.PrivateKey.from_extended_bytes(bytes);
          return new $outer.PrivateKey(ret, $outer._ctx);
        });
      }

      static fromNormalBytes(bytes: Uint8Array): Promise<WasmContract.PrivateKey> {
        return wrapByPromise(() => {
          const ret = WasmV4.PrivateKey.from_normal_bytes(bytes);
          return new $outer.PrivateKey(ret, $outer._ctx);
        });
      }

      sign(message: Uint8Array): Promise<WasmContract.Ed25519Signature> {
        return wrapByPromise(() => {
          const ret = this.wasm.sign(message);
          return new $outer.Ed25519Signature(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.PrivateKey> {
        return wrapByPromise(() => {
          const ret = WasmV4.PrivateKey.from_hex(hexStr);
          return new $outer.PrivateKey(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.ProposedProtocolParameterUpdates> {
        return wrapByPromise(() => {
          const ret = WasmV4.ProposedProtocolParameterUpdates.from_bytes(bytes);
          return new $outer.ProposedProtocolParameterUpdates(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.ProposedProtocolParameterUpdates> {
        return wrapByPromise(() => {
          const ret = WasmV4.ProposedProtocolParameterUpdates.from_hex(hexStr);
          return new $outer.ProposedProtocolParameterUpdates(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.ProposedProtocolParameterUpdates> {
        return wrapByPromise(() => {
          const ret = WasmV4.ProposedProtocolParameterUpdates.from_json(json);
          return new $outer.ProposedProtocolParameterUpdates(ret, $outer._ctx);
        });
      }

      static new(): Promise<WasmContract.ProposedProtocolParameterUpdates> {
        return wrapByPromise(() => {
          const ret = WasmV4.ProposedProtocolParameterUpdates.new();
          return new $outer.ProposedProtocolParameterUpdates(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      insert(key: WasmContract.GenesisHash, value: WasmContract.ProtocolParamUpdate): Promise<Optional<WasmContract.ProtocolParamUpdate>> {
        return wrapByPromise(() => {
          const ret = this.wasm.insert(key.wasm, value.wasm);
          if (ret == null) return undefined;
          return new $outer.ProtocolParamUpdate(ret, $outer._ctx);
        });
      }

      get(key: WasmContract.GenesisHash): Promise<Optional<WasmContract.ProtocolParamUpdate>> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(key.wasm);
          if (ret == null) return undefined;
          return new $outer.ProtocolParamUpdate(ret, $outer._ctx);
        });
      }

      keys(): Promise<WasmContract.GenesisHashes> {
        return wrapByPromise(() => {
          const ret = this.wasm.keys();
          return new $outer.GenesisHashes(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.ProtocolParamUpdate> {
        return wrapByPromise(() => {
          const ret = WasmV4.ProtocolParamUpdate.from_bytes(bytes);
          return new $outer.ProtocolParamUpdate(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.ProtocolParamUpdate> {
        return wrapByPromise(() => {
          const ret = WasmV4.ProtocolParamUpdate.from_hex(hexStr);
          return new $outer.ProtocolParamUpdate(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.ProtocolParamUpdate> {
        return wrapByPromise(() => {
          const ret = WasmV4.ProtocolParamUpdate.from_json(json);
          return new $outer.ProtocolParamUpdate(ret, $outer._ctx);
        });
      }

      setMinfeeA(minfeeA: WasmContract.BigNum): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_minfee_a(minfeeA.wasm);
        });
      }

      minfeeA(): Promise<Optional<WasmContract.BigNum>> {
        return wrapByPromise(() => {
          const ret = this.wasm.minfee_a();
          if (ret == null) return undefined;
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      setMinfeeB(minfeeB: WasmContract.BigNum): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_minfee_b(minfeeB.wasm);
        });
      }

      minfeeB(): Promise<Optional<WasmContract.BigNum>> {
        return wrapByPromise(() => {
          const ret = this.wasm.minfee_b();
          if (ret == null) return undefined;
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      setMaxBlockBodySize(maxBlockBodySize: number): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_max_block_body_size(maxBlockBodySize);
        });
      }

      maxBlockBodySize(): Promise<Optional<number>> {
        return wrapByPromise(() => {
          return this.wasm.max_block_body_size();
        });
      }

      setMaxTxSize(maxTxSize: number): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_max_tx_size(maxTxSize);
        });
      }

      maxTxSize(): Promise<Optional<number>> {
        return wrapByPromise(() => {
          return this.wasm.max_tx_size();
        });
      }

      setMaxBlockHeaderSize(maxBlockHeaderSize: number): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_max_block_header_size(maxBlockHeaderSize);
        });
      }

      maxBlockHeaderSize(): Promise<Optional<number>> {
        return wrapByPromise(() => {
          return this.wasm.max_block_header_size();
        });
      }

      setKeyDeposit(keyDeposit: WasmContract.BigNum): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_key_deposit(keyDeposit.wasm);
        });
      }

      keyDeposit(): Promise<Optional<WasmContract.BigNum>> {
        return wrapByPromise(() => {
          const ret = this.wasm.key_deposit();
          if (ret == null) return undefined;
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      setPoolDeposit(poolDeposit: WasmContract.BigNum): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_pool_deposit(poolDeposit.wasm);
        });
      }

      poolDeposit(): Promise<Optional<WasmContract.BigNum>> {
        return wrapByPromise(() => {
          const ret = this.wasm.pool_deposit();
          if (ret == null) return undefined;
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      setMaxEpoch(maxEpoch: number): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_max_epoch(maxEpoch);
        });
      }

      maxEpoch(): Promise<Optional<number>> {
        return wrapByPromise(() => {
          return this.wasm.max_epoch();
        });
      }

      setNOpt(nOpt: number): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_n_opt(nOpt);
        });
      }

      nOpt(): Promise<Optional<number>> {
        return wrapByPromise(() => {
          return this.wasm.n_opt();
        });
      }

      setPoolPledgeInfluence(poolPledgeInfluence: WasmContract.UnitInterval): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_pool_pledge_influence(poolPledgeInfluence.wasm);
        });
      }

      poolPledgeInfluence(): Promise<Optional<WasmContract.UnitInterval>> {
        return wrapByPromise(() => {
          const ret = this.wasm.pool_pledge_influence();
          if (ret == null) return undefined;
          return new $outer.UnitInterval(ret, $outer._ctx);
        });
      }

      setExpansionRate(expansionRate: WasmContract.UnitInterval): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_expansion_rate(expansionRate.wasm);
        });
      }

      expansionRate(): Promise<Optional<WasmContract.UnitInterval>> {
        return wrapByPromise(() => {
          const ret = this.wasm.expansion_rate();
          if (ret == null) return undefined;
          return new $outer.UnitInterval(ret, $outer._ctx);
        });
      }

      setTreasuryGrowthRate(treasuryGrowthRate: WasmContract.UnitInterval): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_treasury_growth_rate(treasuryGrowthRate.wasm);
        });
      }

      treasuryGrowthRate(): Promise<Optional<WasmContract.UnitInterval>> {
        return wrapByPromise(() => {
          const ret = this.wasm.treasury_growth_rate();
          if (ret == null) return undefined;
          return new $outer.UnitInterval(ret, $outer._ctx);
        });
      }

      d(): Promise<Optional<WasmContract.UnitInterval>> {
        return wrapByPromise(() => {
          const ret = this.wasm.d();
          if (ret == null) return undefined;
          return new $outer.UnitInterval(ret, $outer._ctx);
        });
      }

      extraEntropy(): Promise<Optional<WasmContract.Nonce>> {
        return wrapByPromise(() => {
          const ret = this.wasm.extra_entropy();
          if (ret == null) return undefined;
          return new $outer.Nonce(ret, $outer._ctx);
        });
      }

      setProtocolVersion(protocolVersion: WasmContract.ProtocolVersion): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_protocol_version(protocolVersion.wasm);
        });
      }

      protocolVersion(): Promise<Optional<WasmContract.ProtocolVersion>> {
        return wrapByPromise(() => {
          const ret = this.wasm.protocol_version();
          if (ret == null) return undefined;
          return new $outer.ProtocolVersion(ret, $outer._ctx);
        });
      }

      setMinPoolCost(minPoolCost: WasmContract.BigNum): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_min_pool_cost(minPoolCost.wasm);
        });
      }

      minPoolCost(): Promise<Optional<WasmContract.BigNum>> {
        return wrapByPromise(() => {
          const ret = this.wasm.min_pool_cost();
          if (ret == null) return undefined;
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      setAdaPerUtxoByte(adaPerUtxoByte: WasmContract.BigNum): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_ada_per_utxo_byte(adaPerUtxoByte.wasm);
        });
      }

      adaPerUtxoByte(): Promise<Optional<WasmContract.BigNum>> {
        return wrapByPromise(() => {
          const ret = this.wasm.ada_per_utxo_byte();
          if (ret == null) return undefined;
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      setCostModels(costModels: WasmContract.Costmdls): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_cost_models(costModels.wasm);
        });
      }

      costModels(): Promise<Optional<WasmContract.Costmdls>> {
        return wrapByPromise(() => {
          const ret = this.wasm.cost_models();
          if (ret == null) return undefined;
          return new $outer.Costmdls(ret, $outer._ctx);
        });
      }

      setExecutionCosts(executionCosts: WasmContract.ExUnitPrices): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_execution_costs(executionCosts.wasm);
        });
      }

      executionCosts(): Promise<Optional<WasmContract.ExUnitPrices>> {
        return wrapByPromise(() => {
          const ret = this.wasm.execution_costs();
          if (ret == null) return undefined;
          return new $outer.ExUnitPrices(ret, $outer._ctx);
        });
      }

      setMaxTxExUnits(maxTxExUnits: WasmContract.ExUnits): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_max_tx_ex_units(maxTxExUnits.wasm);
        });
      }

      maxTxExUnits(): Promise<Optional<WasmContract.ExUnits>> {
        return wrapByPromise(() => {
          const ret = this.wasm.max_tx_ex_units();
          if (ret == null) return undefined;
          return new $outer.ExUnits(ret, $outer._ctx);
        });
      }

      setMaxBlockExUnits(maxBlockExUnits: WasmContract.ExUnits): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_max_block_ex_units(maxBlockExUnits.wasm);
        });
      }

      maxBlockExUnits(): Promise<Optional<WasmContract.ExUnits>> {
        return wrapByPromise(() => {
          const ret = this.wasm.max_block_ex_units();
          if (ret == null) return undefined;
          return new $outer.ExUnits(ret, $outer._ctx);
        });
      }

      setMaxValueSize(maxValueSize: number): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_max_value_size(maxValueSize);
        });
      }

      maxValueSize(): Promise<Optional<number>> {
        return wrapByPromise(() => {
          return this.wasm.max_value_size();
        });
      }

      setCollateralPercentage(collateralPercentage: number): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_collateral_percentage(collateralPercentage);
        });
      }

      collateralPercentage(): Promise<Optional<number>> {
        return wrapByPromise(() => {
          return this.wasm.collateral_percentage();
        });
      }

      setMaxCollateralInputs(maxCollateralInputs: number): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_max_collateral_inputs(maxCollateralInputs);
        });
      }

      maxCollateralInputs(): Promise<Optional<number>> {
        return wrapByPromise(() => {
          return this.wasm.max_collateral_inputs();
        });
      }

      setPoolVotingThresholds(poolVotingThresholds: WasmContract.PoolVotingThresholds): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_pool_voting_thresholds(poolVotingThresholds.wasm);
        });
      }

      poolVotingThresholds(): Promise<Optional<WasmContract.PoolVotingThresholds>> {
        return wrapByPromise(() => {
          const ret = this.wasm.pool_voting_thresholds();
          if (ret == null) return undefined;
          return new $outer.PoolVotingThresholds(ret, $outer._ctx);
        });
      }

      setDrepVotingThresholds(drepVotingThresholds: WasmContract.DrepVotingThresholds): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_drep_voting_thresholds(drepVotingThresholds.wasm);
        });
      }

      drepVotingThresholds(): Promise<Optional<WasmContract.DrepVotingThresholds>> {
        return wrapByPromise(() => {
          const ret = this.wasm.drep_voting_thresholds();
          if (ret == null) return undefined;
          return new $outer.DrepVotingThresholds(ret, $outer._ctx);
        });
      }

      setMinCommitteeSize(minCommitteeSize: number): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_min_committee_size(minCommitteeSize);
        });
      }

      minCommitteeSize(): Promise<Optional<number>> {
        return wrapByPromise(() => {
          return this.wasm.min_committee_size();
        });
      }

      setCommitteeTermLimit(committeeTermLimit: number): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_committee_term_limit(committeeTermLimit);
        });
      }

      committeeTermLimit(): Promise<Optional<number>> {
        return wrapByPromise(() => {
          return this.wasm.committee_term_limit();
        });
      }

      setGovernanceActionValidityPeriod(governanceActionValidityPeriod: number): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_governance_action_validity_period(governanceActionValidityPeriod);
        });
      }

      governanceActionValidityPeriod(): Promise<Optional<number>> {
        return wrapByPromise(() => {
          return this.wasm.governance_action_validity_period();
        });
      }

      setGovernanceActionDeposit(governanceActionDeposit: WasmContract.BigNum): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_governance_action_deposit(governanceActionDeposit.wasm);
        });
      }

      governanceActionDeposit(): Promise<Optional<WasmContract.BigNum>> {
        return wrapByPromise(() => {
          const ret = this.wasm.governance_action_deposit();
          if (ret == null) return undefined;
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      setDrepDeposit(drepDeposit: WasmContract.BigNum): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_drep_deposit(drepDeposit.wasm);
        });
      }

      drepDeposit(): Promise<Optional<WasmContract.BigNum>> {
        return wrapByPromise(() => {
          const ret = this.wasm.drep_deposit();
          if (ret == null) return undefined;
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      setDrepInactivityPeriod(drepInactivityPeriod: number): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_drep_inactivity_period(drepInactivityPeriod);
        });
      }

      drepInactivityPeriod(): Promise<Optional<number>> {
        return wrapByPromise(() => {
          return this.wasm.drep_inactivity_period();
        });
      }

      setRefScriptCoinsPerByte(refScriptCoinsPerByte: WasmContract.UnitInterval): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_ref_script_coins_per_byte(refScriptCoinsPerByte.wasm);
        });
      }

      refScriptCoinsPerByte(): Promise<Optional<WasmContract.UnitInterval>> {
        return wrapByPromise(() => {
          const ret = this.wasm.ref_script_coins_per_byte();
          if (ret == null) return undefined;
          return new $outer.UnitInterval(ret, $outer._ctx);
        });
      }

      static new(): Promise<WasmContract.ProtocolParamUpdate> {
        return wrapByPromise(() => {
          const ret = WasmV4.ProtocolParamUpdate.new();
          return new $outer.ProtocolParamUpdate(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.ProtocolVersion> {
        return wrapByPromise(() => {
          const ret = WasmV4.ProtocolVersion.from_bytes(bytes);
          return new $outer.ProtocolVersion(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.ProtocolVersion> {
        return wrapByPromise(() => {
          const ret = WasmV4.ProtocolVersion.from_hex(hexStr);
          return new $outer.ProtocolVersion(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.ProtocolVersion> {
        return wrapByPromise(() => {
          const ret = WasmV4.ProtocolVersion.from_json(json);
          return new $outer.ProtocolVersion(ret, $outer._ctx);
        });
      }

      major(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.major();
        });
      }

      minor(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.minor();
        });
      }

      static new(major: number, minor: number): Promise<WasmContract.ProtocolVersion> {
        return wrapByPromise(() => {
          const ret = WasmV4.ProtocolVersion.new(major, minor);
          return new $outer.ProtocolVersion(ret, $outer._ctx);
        });
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

      static fromBech32(bech32Str: string): Promise<WasmContract.PublicKey> {
        return wrapByPromise(() => {
          const ret = WasmV4.PublicKey.from_bech32(bech32Str);
          return new $outer.PublicKey(ret, $outer._ctx);
        });
      }

      toBech32(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_bech32();
        });
      }

      asBytes(): Promise<Uint8Array> {
        return wrapByPromise(() => {
          return this.wasm.as_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.PublicKey> {
        return wrapByPromise(() => {
          const ret = WasmV4.PublicKey.from_bytes(bytes);
          return new $outer.PublicKey(ret, $outer._ctx);
        });
      }

      verify(data: Uint8Array, signature: WasmContract.Ed25519Signature): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.verify(data, signature.wasm);
        });
      }

      hash(): Promise<WasmContract.Ed25519KeyHash> {
        return wrapByPromise(() => {
          const ret = this.wasm.hash();
          return new $outer.Ed25519KeyHash(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.PublicKey> {
        return wrapByPromise(() => {
          const ret = WasmV4.PublicKey.from_hex(hexStr);
          return new $outer.PublicKey(ret, $outer._ctx);
        });
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

      static new(): Promise<WasmContract.PublicKeys> {
        return wrapByPromise(() => {
          const ret = new WasmV4.PublicKeys();
          return new $outer.PublicKeys(ret, $outer._ctx);
        });
      }

      size(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.size();
        });
      }

      get(index: number): Promise<WasmContract.PublicKey> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(index);
          return new $outer.PublicKey(ret, $outer._ctx);
        });
      }

      add(key: WasmContract.PublicKey): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add(key.wasm);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.Redeemer> {
        return wrapByPromise(() => {
          const ret = WasmV4.Redeemer.from_bytes(bytes);
          return new $outer.Redeemer(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.Redeemer> {
        return wrapByPromise(() => {
          const ret = WasmV4.Redeemer.from_hex(hexStr);
          return new $outer.Redeemer(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.Redeemer> {
        return wrapByPromise(() => {
          const ret = WasmV4.Redeemer.from_json(json);
          return new $outer.Redeemer(ret, $outer._ctx);
        });
      }

      tag(): Promise<WasmContract.RedeemerTag> {
        return wrapByPromise(() => {
          const ret = this.wasm.tag();
          return new $outer.RedeemerTag(ret, $outer._ctx);
        });
      }

      index(): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = this.wasm.index();
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      data(): Promise<WasmContract.PlutusData> {
        return wrapByPromise(() => {
          const ret = this.wasm.data();
          return new $outer.PlutusData(ret, $outer._ctx);
        });
      }

      exUnits(): Promise<WasmContract.ExUnits> {
        return wrapByPromise(() => {
          const ret = this.wasm.ex_units();
          return new $outer.ExUnits(ret, $outer._ctx);
        });
      }

      static new(tag: WasmContract.RedeemerTag, index: WasmContract.BigNum, data: WasmContract.PlutusData, exUnits: WasmContract.ExUnits): Promise<WasmContract.Redeemer> {
        return wrapByPromise(() => {
          const ret = WasmV4.Redeemer.new(tag.wasm, index.wasm, data.wasm, exUnits.wasm);
          return new $outer.Redeemer(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.RedeemerTag> {
        return wrapByPromise(() => {
          const ret = WasmV4.RedeemerTag.from_bytes(bytes);
          return new $outer.RedeemerTag(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.RedeemerTag> {
        return wrapByPromise(() => {
          const ret = WasmV4.RedeemerTag.from_hex(hexStr);
          return new $outer.RedeemerTag(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.RedeemerTag> {
        return wrapByPromise(() => {
          const ret = WasmV4.RedeemerTag.from_json(json);
          return new $outer.RedeemerTag(ret, $outer._ctx);
        });
      }

      static newSpend(): Promise<WasmContract.RedeemerTag> {
        return wrapByPromise(() => {
          const ret = WasmV4.RedeemerTag.new_spend();
          return new $outer.RedeemerTag(ret, $outer._ctx);
        });
      }

      static newMint(): Promise<WasmContract.RedeemerTag> {
        return wrapByPromise(() => {
          const ret = WasmV4.RedeemerTag.new_mint();
          return new $outer.RedeemerTag(ret, $outer._ctx);
        });
      }

      static newCert(): Promise<WasmContract.RedeemerTag> {
        return wrapByPromise(() => {
          const ret = WasmV4.RedeemerTag.new_cert();
          return new $outer.RedeemerTag(ret, $outer._ctx);
        });
      }

      static newReward(): Promise<WasmContract.RedeemerTag> {
        return wrapByPromise(() => {
          const ret = WasmV4.RedeemerTag.new_reward();
          return new $outer.RedeemerTag(ret, $outer._ctx);
        });
      }

      static newVote(): Promise<WasmContract.RedeemerTag> {
        return wrapByPromise(() => {
          const ret = WasmV4.RedeemerTag.new_vote();
          return new $outer.RedeemerTag(ret, $outer._ctx);
        });
      }

      static newVotingProposal(): Promise<WasmContract.RedeemerTag> {
        return wrapByPromise(() => {
          const ret = WasmV4.RedeemerTag.new_voting_proposal();
          return new $outer.RedeemerTag(ret, $outer._ctx);
        });
      }

      kind(): Promise<WasmContract.RedeemerTagKind> {
        return wrapByPromise(() => {
          return this.wasm.kind();
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.Redeemers> {
        return wrapByPromise(() => {
          const ret = WasmV4.Redeemers.from_bytes(bytes);
          return new $outer.Redeemers(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.Redeemers> {
        return wrapByPromise(() => {
          const ret = WasmV4.Redeemers.from_hex(hexStr);
          return new $outer.Redeemers(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.Redeemers> {
        return wrapByPromise(() => {
          const ret = WasmV4.Redeemers.from_json(json);
          return new $outer.Redeemers(ret, $outer._ctx);
        });
      }

      static new(): Promise<WasmContract.Redeemers> {
        return wrapByPromise(() => {
          const ret = WasmV4.Redeemers.new();
          return new $outer.Redeemers(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      get(index: number): Promise<WasmContract.Redeemer> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(index);
          return new $outer.Redeemer(ret, $outer._ctx);
        });
      }

      add(elem: WasmContract.Redeemer): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add(elem.wasm);
        });
      }

      totalExUnits(): Promise<WasmContract.ExUnits> {
        return wrapByPromise(() => {
          const ret = this.wasm.total_ex_units();
          return new $outer.ExUnits(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.Relay> {
        return wrapByPromise(() => {
          const ret = WasmV4.Relay.from_bytes(bytes);
          return new $outer.Relay(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.Relay> {
        return wrapByPromise(() => {
          const ret = WasmV4.Relay.from_hex(hexStr);
          return new $outer.Relay(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.Relay> {
        return wrapByPromise(() => {
          const ret = WasmV4.Relay.from_json(json);
          return new $outer.Relay(ret, $outer._ctx);
        });
      }

      static newSingleHostAddr(singleHostAddr: WasmContract.SingleHostAddr): Promise<WasmContract.Relay> {
        return wrapByPromise(() => {
          const ret = WasmV4.Relay.new_single_host_addr(singleHostAddr.wasm);
          return new $outer.Relay(ret, $outer._ctx);
        });
      }

      static newSingleHostName(singleHostName: WasmContract.SingleHostName): Promise<WasmContract.Relay> {
        return wrapByPromise(() => {
          const ret = WasmV4.Relay.new_single_host_name(singleHostName.wasm);
          return new $outer.Relay(ret, $outer._ctx);
        });
      }

      static newMultiHostName(multiHostName: WasmContract.MultiHostName): Promise<WasmContract.Relay> {
        return wrapByPromise(() => {
          const ret = WasmV4.Relay.new_multi_host_name(multiHostName.wasm);
          return new $outer.Relay(ret, $outer._ctx);
        });
      }

      kind(): Promise<WasmContract.RelayKind> {
        return wrapByPromise(() => {
          return this.wasm.kind();
        });
      }

      asSingleHostAddr(): Promise<Optional<WasmContract.SingleHostAddr>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_single_host_addr();
          if (ret == null) return undefined;
          return new $outer.SingleHostAddr(ret, $outer._ctx);
        });
      }

      asSingleHostName(): Promise<Optional<WasmContract.SingleHostName>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_single_host_name();
          if (ret == null) return undefined;
          return new $outer.SingleHostName(ret, $outer._ctx);
        });
      }

      asMultiHostName(): Promise<Optional<WasmContract.MultiHostName>> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_multi_host_name();
          if (ret == null) return undefined;
          return new $outer.MultiHostName(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.Relays> {
        return wrapByPromise(() => {
          const ret = WasmV4.Relays.from_bytes(bytes);
          return new $outer.Relays(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.Relays> {
        return wrapByPromise(() => {
          const ret = WasmV4.Relays.from_hex(hexStr);
          return new $outer.Relays(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.Relays> {
        return wrapByPromise(() => {
          const ret = WasmV4.Relays.from_json(json);
          return new $outer.Relays(ret, $outer._ctx);
        });
      }

      static new(): Promise<WasmContract.Relays> {
        return wrapByPromise(() => {
          const ret = WasmV4.Relays.new();
          return new $outer.Relays(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      get(index: number): Promise<WasmContract.Relay> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(index);
          return new $outer.Relay(ret, $outer._ctx);
        });
      }

      add(elem: WasmContract.Relay): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add(elem.wasm);
        });
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

      static new(network: number, payment: WasmContract.Credential): Promise<WasmContract.RewardAddress> {
        return wrapByPromise(() => {
          const ret = WasmV4.RewardAddress.new(network, payment.wasm);
          return new $outer.RewardAddress(ret, $outer._ctx);
        });
      }

      paymentCred(): Promise<WasmContract.Credential> {
        return wrapByPromise(() => {
          const ret = this.wasm.payment_cred();
          return new $outer.Credential(ret, $outer._ctx);
        });
      }

      toAddress(): Promise<WasmContract.Address> {
        return wrapByPromise(() => {
          const ret = this.wasm.to_address();
          return new $outer.Address(ret, $outer._ctx);
        });
      }

      static fromAddress(addr: WasmContract.Address): Promise<Optional<WasmContract.RewardAddress>> {
        return wrapByPromise(() => {
          const ret = WasmV4.RewardAddress.from_address(addr.wasm);
          if (ret == null) return undefined;
          return new $outer.RewardAddress(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.RewardAddresses> {
        return wrapByPromise(() => {
          const ret = WasmV4.RewardAddresses.from_bytes(bytes);
          return new $outer.RewardAddresses(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.RewardAddresses> {
        return wrapByPromise(() => {
          const ret = WasmV4.RewardAddresses.from_hex(hexStr);
          return new $outer.RewardAddresses(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.RewardAddresses> {
        return wrapByPromise(() => {
          const ret = WasmV4.RewardAddresses.from_json(json);
          return new $outer.RewardAddresses(ret, $outer._ctx);
        });
      }

      static new(): Promise<WasmContract.RewardAddresses> {
        return wrapByPromise(() => {
          const ret = WasmV4.RewardAddresses.new();
          return new $outer.RewardAddresses(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      get(index: number): Promise<WasmContract.RewardAddress> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(index);
          return new $outer.RewardAddress(ret, $outer._ctx);
        });
      }

      add(elem: WasmContract.RewardAddress): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add(elem.wasm);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.ScriptAll> {
        return wrapByPromise(() => {
          const ret = WasmV4.ScriptAll.from_bytes(bytes);
          return new $outer.ScriptAll(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.ScriptAll> {
        return wrapByPromise(() => {
          const ret = WasmV4.ScriptAll.from_hex(hexStr);
          return new $outer.ScriptAll(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.ScriptAll> {
        return wrapByPromise(() => {
          const ret = WasmV4.ScriptAll.from_json(json);
          return new $outer.ScriptAll(ret, $outer._ctx);
        });
      }

      nativeScripts(): Promise<WasmContract.NativeScripts> {
        return wrapByPromise(() => {
          const ret = this.wasm.native_scripts();
          return new $outer.NativeScripts(ret, $outer._ctx);
        });
      }

      static new(nativeScripts: WasmContract.NativeScripts): Promise<WasmContract.ScriptAll> {
        return wrapByPromise(() => {
          const ret = WasmV4.ScriptAll.new(nativeScripts.wasm);
          return new $outer.ScriptAll(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.ScriptAny> {
        return wrapByPromise(() => {
          const ret = WasmV4.ScriptAny.from_bytes(bytes);
          return new $outer.ScriptAny(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.ScriptAny> {
        return wrapByPromise(() => {
          const ret = WasmV4.ScriptAny.from_hex(hexStr);
          return new $outer.ScriptAny(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.ScriptAny> {
        return wrapByPromise(() => {
          const ret = WasmV4.ScriptAny.from_json(json);
          return new $outer.ScriptAny(ret, $outer._ctx);
        });
      }

      nativeScripts(): Promise<WasmContract.NativeScripts> {
        return wrapByPromise(() => {
          const ret = this.wasm.native_scripts();
          return new $outer.NativeScripts(ret, $outer._ctx);
        });
      }

      static new(nativeScripts: WasmContract.NativeScripts): Promise<WasmContract.ScriptAny> {
        return wrapByPromise(() => {
          const ret = WasmV4.ScriptAny.new(nativeScripts.wasm);
          return new $outer.ScriptAny(ret, $outer._ctx);
        });
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

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.ScriptDataHash> {
        return wrapByPromise(() => {
          const ret = WasmV4.ScriptDataHash.from_bytes(bytes);
          return new $outer.ScriptDataHash(ret, $outer._ctx);
        });
      }

      toBytes(): Promise<Uint8Array> {
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      toBech32(prefix: string): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_bech32(prefix);
        });
      }

      static fromBech32(bechStr: string): Promise<WasmContract.ScriptDataHash> {
        return wrapByPromise(() => {
          const ret = WasmV4.ScriptDataHash.from_bech32(bechStr);
          return new $outer.ScriptDataHash(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hex: string): Promise<WasmContract.ScriptDataHash> {
        return wrapByPromise(() => {
          const ret = WasmV4.ScriptDataHash.from_hex(hex);
          return new $outer.ScriptDataHash(ret, $outer._ctx);
        });
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

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.ScriptHash> {
        return wrapByPromise(() => {
          const ret = WasmV4.ScriptHash.from_bytes(bytes);
          return new $outer.ScriptHash(ret, $outer._ctx);
        });
      }

      toBytes(): Promise<Uint8Array> {
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      toBech32(prefix: string): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_bech32(prefix);
        });
      }

      static fromBech32(bechStr: string): Promise<WasmContract.ScriptHash> {
        return wrapByPromise(() => {
          const ret = WasmV4.ScriptHash.from_bech32(bechStr);
          return new $outer.ScriptHash(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hex: string): Promise<WasmContract.ScriptHash> {
        return wrapByPromise(() => {
          const ret = WasmV4.ScriptHash.from_hex(hex);
          return new $outer.ScriptHash(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.ScriptHashes> {
        return wrapByPromise(() => {
          const ret = WasmV4.ScriptHashes.from_bytes(bytes);
          return new $outer.ScriptHashes(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.ScriptHashes> {
        return wrapByPromise(() => {
          const ret = WasmV4.ScriptHashes.from_hex(hexStr);
          return new $outer.ScriptHashes(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.ScriptHashes> {
        return wrapByPromise(() => {
          const ret = WasmV4.ScriptHashes.from_json(json);
          return new $outer.ScriptHashes(ret, $outer._ctx);
        });
      }

      static new(): Promise<WasmContract.ScriptHashes> {
        return wrapByPromise(() => {
          const ret = WasmV4.ScriptHashes.new();
          return new $outer.ScriptHashes(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      get(index: number): Promise<WasmContract.ScriptHash> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(index);
          return new $outer.ScriptHash(ret, $outer._ctx);
        });
      }

      add(elem: WasmContract.ScriptHash): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add(elem.wasm);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.ScriptNOfK> {
        return wrapByPromise(() => {
          const ret = WasmV4.ScriptNOfK.from_bytes(bytes);
          return new $outer.ScriptNOfK(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.ScriptNOfK> {
        return wrapByPromise(() => {
          const ret = WasmV4.ScriptNOfK.from_hex(hexStr);
          return new $outer.ScriptNOfK(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.ScriptNOfK> {
        return wrapByPromise(() => {
          const ret = WasmV4.ScriptNOfK.from_json(json);
          return new $outer.ScriptNOfK(ret, $outer._ctx);
        });
      }

      n(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.n();
        });
      }

      nativeScripts(): Promise<WasmContract.NativeScripts> {
        return wrapByPromise(() => {
          const ret = this.wasm.native_scripts();
          return new $outer.NativeScripts(ret, $outer._ctx);
        });
      }

      static new(n: number, nativeScripts: WasmContract.NativeScripts): Promise<WasmContract.ScriptNOfK> {
        return wrapByPromise(() => {
          const ret = WasmV4.ScriptNOfK.new(n, nativeScripts.wasm);
          return new $outer.ScriptNOfK(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.ScriptPubkey> {
        return wrapByPromise(() => {
          const ret = WasmV4.ScriptPubkey.from_bytes(bytes);
          return new $outer.ScriptPubkey(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.ScriptPubkey> {
        return wrapByPromise(() => {
          const ret = WasmV4.ScriptPubkey.from_hex(hexStr);
          return new $outer.ScriptPubkey(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.ScriptPubkey> {
        return wrapByPromise(() => {
          const ret = WasmV4.ScriptPubkey.from_json(json);
          return new $outer.ScriptPubkey(ret, $outer._ctx);
        });
      }

      addrKeyhash(): Promise<WasmContract.Ed25519KeyHash> {
        return wrapByPromise(() => {
          const ret = this.wasm.addr_keyhash();
          return new $outer.Ed25519KeyHash(ret, $outer._ctx);
        });
      }

      static new(addrKeyhash: WasmContract.Ed25519KeyHash): Promise<WasmContract.ScriptPubkey> {
        return wrapByPromise(() => {
          const ret = WasmV4.ScriptPubkey.new(addrKeyhash.wasm);
          return new $outer.ScriptPubkey(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.ScriptRef> {
        return wrapByPromise(() => {
          const ret = WasmV4.ScriptRef.from_bytes(bytes);
          return new $outer.ScriptRef(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.ScriptRef> {
        return wrapByPromise(() => {
          const ret = WasmV4.ScriptRef.from_hex(hexStr);
          return new $outer.ScriptRef(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.ScriptRef> {
        return wrapByPromise(() => {
          const ret = WasmV4.ScriptRef.from_json(json);
          return new $outer.ScriptRef(ret, $outer._ctx);
        });
      }

      static newNativeScript(nativeScript: WasmContract.NativeScript): Promise<WasmContract.ScriptRef> {
        return wrapByPromise(() => {
          const ret = WasmV4.ScriptRef.new_native_script(nativeScript.wasm);
          return new $outer.ScriptRef(ret, $outer._ctx);
        });
      }

      static newPlutusScript(plutusScript: WasmContract.PlutusScript): Promise<WasmContract.ScriptRef> {
        return wrapByPromise(() => {
          const ret = WasmV4.ScriptRef.new_plutus_script(plutusScript.wasm);
          return new $outer.ScriptRef(ret, $outer._ctx);
        });
      }

      isNativeScript(): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.is_native_script();
        });
      }

      isPlutusScript(): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.is_plutus_script();
        });
      }

      nativeScript(): Promise<Optional<WasmContract.NativeScript>> {
        return wrapByPromise(() => {
          const ret = this.wasm.native_script();
          if (ret == null) return undefined;
          return new $outer.NativeScript(ret, $outer._ctx);
        });
      }

      plutusScript(): Promise<Optional<WasmContract.PlutusScript>> {
        return wrapByPromise(() => {
          const ret = this.wasm.plutus_script();
          if (ret == null) return undefined;
          return new $outer.PlutusScript(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.SingleHostAddr> {
        return wrapByPromise(() => {
          const ret = WasmV4.SingleHostAddr.from_bytes(bytes);
          return new $outer.SingleHostAddr(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.SingleHostAddr> {
        return wrapByPromise(() => {
          const ret = WasmV4.SingleHostAddr.from_hex(hexStr);
          return new $outer.SingleHostAddr(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.SingleHostAddr> {
        return wrapByPromise(() => {
          const ret = WasmV4.SingleHostAddr.from_json(json);
          return new $outer.SingleHostAddr(ret, $outer._ctx);
        });
      }

      port(): Promise<Optional<number>> {
        return wrapByPromise(() => {
          return this.wasm.port();
        });
      }

      ipv4(): Promise<Optional<WasmContract.Ipv4>> {
        return wrapByPromise(() => {
          const ret = this.wasm.ipv4();
          if (ret == null) return undefined;
          return new $outer.Ipv4(ret, $outer._ctx);
        });
      }

      ipv6(): Promise<Optional<WasmContract.Ipv6>> {
        return wrapByPromise(() => {
          const ret = this.wasm.ipv6();
          if (ret == null) return undefined;
          return new $outer.Ipv6(ret, $outer._ctx);
        });
      }

      static new(port: Optional<number>, ipv4: Optional<WasmContract.Ipv4>, ipv6: Optional<WasmContract.Ipv6>): Promise<WasmContract.SingleHostAddr> {
        return wrapByPromise(() => {
          const ret = WasmV4.SingleHostAddr.new(port, ipv4?.wasm, ipv6?.wasm);
          return new $outer.SingleHostAddr(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.SingleHostName> {
        return wrapByPromise(() => {
          const ret = WasmV4.SingleHostName.from_bytes(bytes);
          return new $outer.SingleHostName(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.SingleHostName> {
        return wrapByPromise(() => {
          const ret = WasmV4.SingleHostName.from_hex(hexStr);
          return new $outer.SingleHostName(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.SingleHostName> {
        return wrapByPromise(() => {
          const ret = WasmV4.SingleHostName.from_json(json);
          return new $outer.SingleHostName(ret, $outer._ctx);
        });
      }

      port(): Promise<Optional<number>> {
        return wrapByPromise(() => {
          return this.wasm.port();
        });
      }

      dnsName(): Promise<WasmContract.DNSRecordAorAAAA> {
        return wrapByPromise(() => {
          const ret = this.wasm.dns_name();
          return new $outer.DNSRecordAorAAAA(ret, $outer._ctx);
        });
      }

      static new(port: Optional<number>, dnsName: WasmContract.DNSRecordAorAAAA): Promise<WasmContract.SingleHostName> {
        return wrapByPromise(() => {
          const ret = WasmV4.SingleHostName.new(port, dnsName.wasm);
          return new $outer.SingleHostName(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.StakeAndVoteDelegation> {
        return wrapByPromise(() => {
          const ret = WasmV4.StakeAndVoteDelegation.from_bytes(bytes);
          return new $outer.StakeAndVoteDelegation(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.StakeAndVoteDelegation> {
        return wrapByPromise(() => {
          const ret = WasmV4.StakeAndVoteDelegation.from_hex(hexStr);
          return new $outer.StakeAndVoteDelegation(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.StakeAndVoteDelegation> {
        return wrapByPromise(() => {
          const ret = WasmV4.StakeAndVoteDelegation.from_json(json);
          return new $outer.StakeAndVoteDelegation(ret, $outer._ctx);
        });
      }

      stakeCredential(): Promise<WasmContract.Credential> {
        return wrapByPromise(() => {
          const ret = this.wasm.stake_credential();
          return new $outer.Credential(ret, $outer._ctx);
        });
      }

      poolKeyhash(): Promise<WasmContract.Ed25519KeyHash> {
        return wrapByPromise(() => {
          const ret = this.wasm.pool_keyhash();
          return new $outer.Ed25519KeyHash(ret, $outer._ctx);
        });
      }

      drep(): Promise<WasmContract.DRep> {
        return wrapByPromise(() => {
          const ret = this.wasm.drep();
          return new $outer.DRep(ret, $outer._ctx);
        });
      }

      static new(stakeCredential: WasmContract.Credential, poolKeyhash: WasmContract.Ed25519KeyHash, drep: WasmContract.DRep): Promise<WasmContract.StakeAndVoteDelegation> {
        return wrapByPromise(() => {
          const ret = WasmV4.StakeAndVoteDelegation.new(stakeCredential.wasm, poolKeyhash.wasm, drep.wasm);
          return new $outer.StakeAndVoteDelegation(ret, $outer._ctx);
        });
      }

      hasScriptCredentials(): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.has_script_credentials();
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.StakeDelegation> {
        return wrapByPromise(() => {
          const ret = WasmV4.StakeDelegation.from_bytes(bytes);
          return new $outer.StakeDelegation(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.StakeDelegation> {
        return wrapByPromise(() => {
          const ret = WasmV4.StakeDelegation.from_hex(hexStr);
          return new $outer.StakeDelegation(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.StakeDelegation> {
        return wrapByPromise(() => {
          const ret = WasmV4.StakeDelegation.from_json(json);
          return new $outer.StakeDelegation(ret, $outer._ctx);
        });
      }

      stakeCredential(): Promise<WasmContract.Credential> {
        return wrapByPromise(() => {
          const ret = this.wasm.stake_credential();
          return new $outer.Credential(ret, $outer._ctx);
        });
      }

      poolKeyhash(): Promise<WasmContract.Ed25519KeyHash> {
        return wrapByPromise(() => {
          const ret = this.wasm.pool_keyhash();
          return new $outer.Ed25519KeyHash(ret, $outer._ctx);
        });
      }

      static new(stakeCredential: WasmContract.Credential, poolKeyhash: WasmContract.Ed25519KeyHash): Promise<WasmContract.StakeDelegation> {
        return wrapByPromise(() => {
          const ret = WasmV4.StakeDelegation.new(stakeCredential.wasm, poolKeyhash.wasm);
          return new $outer.StakeDelegation(ret, $outer._ctx);
        });
      }

      hasScriptCredentials(): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.has_script_credentials();
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.StakeDeregistration> {
        return wrapByPromise(() => {
          const ret = WasmV4.StakeDeregistration.from_bytes(bytes);
          return new $outer.StakeDeregistration(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.StakeDeregistration> {
        return wrapByPromise(() => {
          const ret = WasmV4.StakeDeregistration.from_hex(hexStr);
          return new $outer.StakeDeregistration(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.StakeDeregistration> {
        return wrapByPromise(() => {
          const ret = WasmV4.StakeDeregistration.from_json(json);
          return new $outer.StakeDeregistration(ret, $outer._ctx);
        });
      }

      stakeCredential(): Promise<WasmContract.Credential> {
        return wrapByPromise(() => {
          const ret = this.wasm.stake_credential();
          return new $outer.Credential(ret, $outer._ctx);
        });
      }

      coin(): Promise<Optional<WasmContract.BigNum>> {
        return wrapByPromise(() => {
          const ret = this.wasm.coin();
          if (ret == null) return undefined;
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      static new(stakeCredential: WasmContract.Credential): Promise<WasmContract.StakeDeregistration> {
        return wrapByPromise(() => {
          const ret = WasmV4.StakeDeregistration.new(stakeCredential.wasm);
          return new $outer.StakeDeregistration(ret, $outer._ctx);
        });
      }

      static newWithCoin(stakeCredential: WasmContract.Credential, coin: WasmContract.BigNum): Promise<WasmContract.StakeDeregistration> {
        return wrapByPromise(() => {
          const ret = WasmV4.StakeDeregistration.new_with_coin(stakeCredential.wasm, coin.wasm);
          return new $outer.StakeDeregistration(ret, $outer._ctx);
        });
      }

      hasScriptCredentials(): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.has_script_credentials();
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.StakeRegistration> {
        return wrapByPromise(() => {
          const ret = WasmV4.StakeRegistration.from_bytes(bytes);
          return new $outer.StakeRegistration(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.StakeRegistration> {
        return wrapByPromise(() => {
          const ret = WasmV4.StakeRegistration.from_hex(hexStr);
          return new $outer.StakeRegistration(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.StakeRegistration> {
        return wrapByPromise(() => {
          const ret = WasmV4.StakeRegistration.from_json(json);
          return new $outer.StakeRegistration(ret, $outer._ctx);
        });
      }

      stakeCredential(): Promise<WasmContract.Credential> {
        return wrapByPromise(() => {
          const ret = this.wasm.stake_credential();
          return new $outer.Credential(ret, $outer._ctx);
        });
      }

      coin(): Promise<Optional<WasmContract.BigNum>> {
        return wrapByPromise(() => {
          const ret = this.wasm.coin();
          if (ret == null) return undefined;
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      static new(stakeCredential: WasmContract.Credential): Promise<WasmContract.StakeRegistration> {
        return wrapByPromise(() => {
          const ret = WasmV4.StakeRegistration.new(stakeCredential.wasm);
          return new $outer.StakeRegistration(ret, $outer._ctx);
        });
      }

      static newWithCoin(stakeCredential: WasmContract.Credential, coin: WasmContract.BigNum): Promise<WasmContract.StakeRegistration> {
        return wrapByPromise(() => {
          const ret = WasmV4.StakeRegistration.new_with_coin(stakeCredential.wasm, coin.wasm);
          return new $outer.StakeRegistration(ret, $outer._ctx);
        });
      }

      hasScriptCredentials(): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.has_script_credentials();
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.StakeRegistrationAndDelegation> {
        return wrapByPromise(() => {
          const ret = WasmV4.StakeRegistrationAndDelegation.from_bytes(bytes);
          return new $outer.StakeRegistrationAndDelegation(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.StakeRegistrationAndDelegation> {
        return wrapByPromise(() => {
          const ret = WasmV4.StakeRegistrationAndDelegation.from_hex(hexStr);
          return new $outer.StakeRegistrationAndDelegation(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.StakeRegistrationAndDelegation> {
        return wrapByPromise(() => {
          const ret = WasmV4.StakeRegistrationAndDelegation.from_json(json);
          return new $outer.StakeRegistrationAndDelegation(ret, $outer._ctx);
        });
      }

      stakeCredential(): Promise<WasmContract.Credential> {
        return wrapByPromise(() => {
          const ret = this.wasm.stake_credential();
          return new $outer.Credential(ret, $outer._ctx);
        });
      }

      poolKeyhash(): Promise<WasmContract.Ed25519KeyHash> {
        return wrapByPromise(() => {
          const ret = this.wasm.pool_keyhash();
          return new $outer.Ed25519KeyHash(ret, $outer._ctx);
        });
      }

      coin(): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = this.wasm.coin();
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      static new(stakeCredential: WasmContract.Credential, poolKeyhash: WasmContract.Ed25519KeyHash, coin: WasmContract.BigNum): Promise<WasmContract.StakeRegistrationAndDelegation> {
        return wrapByPromise(() => {
          const ret = WasmV4.StakeRegistrationAndDelegation.new(stakeCredential.wasm, poolKeyhash.wasm, coin.wasm);
          return new $outer.StakeRegistrationAndDelegation(ret, $outer._ctx);
        });
      }

      hasScriptCredentials(): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.has_script_credentials();
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.StakeVoteRegistrationAndDelegation> {
        return wrapByPromise(() => {
          const ret = WasmV4.StakeVoteRegistrationAndDelegation.from_bytes(bytes);
          return new $outer.StakeVoteRegistrationAndDelegation(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.StakeVoteRegistrationAndDelegation> {
        return wrapByPromise(() => {
          const ret = WasmV4.StakeVoteRegistrationAndDelegation.from_hex(hexStr);
          return new $outer.StakeVoteRegistrationAndDelegation(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.StakeVoteRegistrationAndDelegation> {
        return wrapByPromise(() => {
          const ret = WasmV4.StakeVoteRegistrationAndDelegation.from_json(json);
          return new $outer.StakeVoteRegistrationAndDelegation(ret, $outer._ctx);
        });
      }

      stakeCredential(): Promise<WasmContract.Credential> {
        return wrapByPromise(() => {
          const ret = this.wasm.stake_credential();
          return new $outer.Credential(ret, $outer._ctx);
        });
      }

      poolKeyhash(): Promise<WasmContract.Ed25519KeyHash> {
        return wrapByPromise(() => {
          const ret = this.wasm.pool_keyhash();
          return new $outer.Ed25519KeyHash(ret, $outer._ctx);
        });
      }

      drep(): Promise<WasmContract.DRep> {
        return wrapByPromise(() => {
          const ret = this.wasm.drep();
          return new $outer.DRep(ret, $outer._ctx);
        });
      }

      coin(): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = this.wasm.coin();
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      static new(stakeCredential: WasmContract.Credential, poolKeyhash: WasmContract.Ed25519KeyHash, drep: WasmContract.DRep, coin: WasmContract.BigNum): Promise<WasmContract.StakeVoteRegistrationAndDelegation> {
        return wrapByPromise(() => {
          const ret = WasmV4.StakeVoteRegistrationAndDelegation.new(stakeCredential.wasm, poolKeyhash.wasm, drep.wasm, coin.wasm);
          return new $outer.StakeVoteRegistrationAndDelegation(ret, $outer._ctx);
        });
      }

      hasScriptCredentials(): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.has_script_credentials();
        });
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

      static new(): Promise<WasmContract.Strings> {
        return wrapByPromise(() => {
          const ret = WasmV4.Strings.new();
          return new $outer.Strings(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      get(index: number): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.get(index);
        });
      }

      add(elem: string): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add(elem);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.TimelockExpiry> {
        return wrapByPromise(() => {
          const ret = WasmV4.TimelockExpiry.from_bytes(bytes);
          return new $outer.TimelockExpiry(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.TimelockExpiry> {
        return wrapByPromise(() => {
          const ret = WasmV4.TimelockExpiry.from_hex(hexStr);
          return new $outer.TimelockExpiry(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.TimelockExpiry> {
        return wrapByPromise(() => {
          const ret = WasmV4.TimelockExpiry.from_json(json);
          return new $outer.TimelockExpiry(ret, $outer._ctx);
        });
      }

      slot(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.slot();
        });
      }

      slotBignum(): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = this.wasm.slot_bignum();
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      static new(slot: number): Promise<WasmContract.TimelockExpiry> {
        return wrapByPromise(() => {
          const ret = WasmV4.TimelockExpiry.new(slot);
          return new $outer.TimelockExpiry(ret, $outer._ctx);
        });
      }

      static newTimelockexpiry(slot: WasmContract.BigNum): Promise<WasmContract.TimelockExpiry> {
        return wrapByPromise(() => {
          const ret = WasmV4.TimelockExpiry.new_timelockexpiry(slot.wasm);
          return new $outer.TimelockExpiry(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.TimelockStart> {
        return wrapByPromise(() => {
          const ret = WasmV4.TimelockStart.from_bytes(bytes);
          return new $outer.TimelockStart(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.TimelockStart> {
        return wrapByPromise(() => {
          const ret = WasmV4.TimelockStart.from_hex(hexStr);
          return new $outer.TimelockStart(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.TimelockStart> {
        return wrapByPromise(() => {
          const ret = WasmV4.TimelockStart.from_json(json);
          return new $outer.TimelockStart(ret, $outer._ctx);
        });
      }

      slot(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.slot();
        });
      }

      slotBignum(): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = this.wasm.slot_bignum();
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      static new(slot: number): Promise<WasmContract.TimelockStart> {
        return wrapByPromise(() => {
          const ret = WasmV4.TimelockStart.new(slot);
          return new $outer.TimelockStart(ret, $outer._ctx);
        });
      }

      static newTimelockstart(slot: WasmContract.BigNum): Promise<WasmContract.TimelockStart> {
        return wrapByPromise(() => {
          const ret = WasmV4.TimelockStart.new_timelockstart(slot.wasm);
          return new $outer.TimelockStart(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.Transaction> {
        return wrapByPromise(() => {
          const ret = WasmV4.Transaction.from_bytes(bytes);
          return new $outer.Transaction(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.Transaction> {
        return wrapByPromise(() => {
          const ret = WasmV4.Transaction.from_hex(hexStr);
          return new $outer.Transaction(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.Transaction> {
        return wrapByPromise(() => {
          const ret = WasmV4.Transaction.from_json(json);
          return new $outer.Transaction(ret, $outer._ctx);
        });
      }

      body(): Promise<WasmContract.TransactionBody> {
        return wrapByPromise(() => {
          const ret = this.wasm.body();
          return new $outer.TransactionBody(ret, $outer._ctx);
        });
      }

      witnessSet(): Promise<WasmContract.TransactionWitnessSet> {
        return wrapByPromise(() => {
          const ret = this.wasm.witness_set();
          return new $outer.TransactionWitnessSet(ret, $outer._ctx);
        });
      }

      isValid(): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.is_valid();
        });
      }

      auxiliaryData(): Promise<Optional<WasmContract.AuxiliaryData>> {
        return wrapByPromise(() => {
          const ret = this.wasm.auxiliary_data();
          if (ret == null) return undefined;
          return new $outer.AuxiliaryData(ret, $outer._ctx);
        });
      }

      setIsValid(valid: boolean): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_is_valid(valid);
        });
      }

      static new(body: WasmContract.TransactionBody, witnessSet: WasmContract.TransactionWitnessSet, auxiliaryData: Optional<WasmContract.AuxiliaryData>): Promise<WasmContract.Transaction> {
        return wrapByPromise(() => {
          const ret = WasmV4.Transaction.new(body.wasm, witnessSet.wasm, auxiliaryData?.wasm);
          return new $outer.Transaction(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      get(index: number): Promise<WasmContract.Transaction> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(index);
          return new $outer.Transaction(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      get(index: number): Promise<WasmContract.TransactionBatch> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(index);
          return new $outer.TransactionBatch(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.TransactionBodies> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionBodies.from_bytes(bytes);
          return new $outer.TransactionBodies(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.TransactionBodies> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionBodies.from_hex(hexStr);
          return new $outer.TransactionBodies(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.TransactionBodies> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionBodies.from_json(json);
          return new $outer.TransactionBodies(ret, $outer._ctx);
        });
      }

      static new(): Promise<WasmContract.TransactionBodies> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionBodies.new();
          return new $outer.TransactionBodies(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      get(index: number): Promise<WasmContract.TransactionBody> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(index);
          return new $outer.TransactionBody(ret, $outer._ctx);
        });
      }

      add(elem: WasmContract.TransactionBody): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add(elem.wasm);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.TransactionBody> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionBody.from_bytes(bytes);
          return new $outer.TransactionBody(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.TransactionBody> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionBody.from_hex(hexStr);
          return new $outer.TransactionBody(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.TransactionBody> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionBody.from_json(json);
          return new $outer.TransactionBody(ret, $outer._ctx);
        });
      }

      inputs(): Promise<WasmContract.TransactionInputs> {
        return wrapByPromise(() => {
          const ret = this.wasm.inputs();
          return new $outer.TransactionInputs(ret, $outer._ctx);
        });
      }

      outputs(): Promise<WasmContract.TransactionOutputs> {
        return wrapByPromise(() => {
          const ret = this.wasm.outputs();
          return new $outer.TransactionOutputs(ret, $outer._ctx);
        });
      }

      fee(): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = this.wasm.fee();
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      ttl(): Promise<Optional<number>> {
        return wrapByPromise(() => {
          return this.wasm.ttl();
        });
      }

      ttlBignum(): Promise<Optional<WasmContract.BigNum>> {
        return wrapByPromise(() => {
          const ret = this.wasm.ttl_bignum();
          if (ret == null) return undefined;
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      setTtl(ttl: WasmContract.BigNum): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_ttl(ttl.wasm);
        });
      }

      removeTtl(): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.remove_ttl();
        });
      }

      setCerts(certs: WasmContract.Certificates): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_certs(certs.wasm);
        });
      }

      certs(): Promise<Optional<WasmContract.Certificates>> {
        return wrapByPromise(() => {
          const ret = this.wasm.certs();
          if (ret == null) return undefined;
          return new $outer.Certificates(ret, $outer._ctx);
        });
      }

      setWithdrawals(withdrawals: WasmContract.Withdrawals): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_withdrawals(withdrawals.wasm);
        });
      }

      withdrawals(): Promise<Optional<WasmContract.Withdrawals>> {
        return wrapByPromise(() => {
          const ret = this.wasm.withdrawals();
          if (ret == null) return undefined;
          return new $outer.Withdrawals(ret, $outer._ctx);
        });
      }

      setUpdate(update: WasmContract.Update): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_update(update.wasm);
        });
      }

      update(): Promise<Optional<WasmContract.Update>> {
        return wrapByPromise(() => {
          const ret = this.wasm.update();
          if (ret == null) return undefined;
          return new $outer.Update(ret, $outer._ctx);
        });
      }

      setAuxiliaryDataHash(auxiliaryDataHash: WasmContract.AuxiliaryDataHash): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_auxiliary_data_hash(auxiliaryDataHash.wasm);
        });
      }

      auxiliaryDataHash(): Promise<Optional<WasmContract.AuxiliaryDataHash>> {
        return wrapByPromise(() => {
          const ret = this.wasm.auxiliary_data_hash();
          if (ret == null) return undefined;
          return new $outer.AuxiliaryDataHash(ret, $outer._ctx);
        });
      }

      setValidityStartInterval(validityStartInterval: number): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_validity_start_interval(validityStartInterval);
        });
      }

      setValidityStartIntervalBignum(validityStartInterval: WasmContract.BigNum): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_validity_start_interval_bignum(validityStartInterval.wasm);
        });
      }

      validityStartIntervalBignum(): Promise<Optional<WasmContract.BigNum>> {
        return wrapByPromise(() => {
          const ret = this.wasm.validity_start_interval_bignum();
          if (ret == null) return undefined;
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      validityStartInterval(): Promise<Optional<number>> {
        return wrapByPromise(() => {
          return this.wasm.validity_start_interval();
        });
      }

      setMint(mint: WasmContract.Mint): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_mint(mint.wasm);
        });
      }

      mint(): Promise<Optional<WasmContract.Mint>> {
        return wrapByPromise(() => {
          const ret = this.wasm.mint();
          if (ret == null) return undefined;
          return new $outer.Mint(ret, $outer._ctx);
        });
      }

      setReferenceInputs(referenceInputs: WasmContract.TransactionInputs): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_reference_inputs(referenceInputs.wasm);
        });
      }

      referenceInputs(): Promise<Optional<WasmContract.TransactionInputs>> {
        return wrapByPromise(() => {
          const ret = this.wasm.reference_inputs();
          if (ret == null) return undefined;
          return new $outer.TransactionInputs(ret, $outer._ctx);
        });
      }

      setScriptDataHash(scriptDataHash: WasmContract.ScriptDataHash): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_script_data_hash(scriptDataHash.wasm);
        });
      }

      scriptDataHash(): Promise<Optional<WasmContract.ScriptDataHash>> {
        return wrapByPromise(() => {
          const ret = this.wasm.script_data_hash();
          if (ret == null) return undefined;
          return new $outer.ScriptDataHash(ret, $outer._ctx);
        });
      }

      setCollateral(collateral: WasmContract.TransactionInputs): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_collateral(collateral.wasm);
        });
      }

      collateral(): Promise<Optional<WasmContract.TransactionInputs>> {
        return wrapByPromise(() => {
          const ret = this.wasm.collateral();
          if (ret == null) return undefined;
          return new $outer.TransactionInputs(ret, $outer._ctx);
        });
      }

      setRequiredSigners(requiredSigners: WasmContract.Ed25519KeyHashes): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_required_signers(requiredSigners.wasm);
        });
      }

      requiredSigners(): Promise<Optional<WasmContract.Ed25519KeyHashes>> {
        return wrapByPromise(() => {
          const ret = this.wasm.required_signers();
          if (ret == null) return undefined;
          return new $outer.Ed25519KeyHashes(ret, $outer._ctx);
        });
      }

      setNetworkId(networkId: WasmContract.NetworkId): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_network_id(networkId.wasm);
        });
      }

      networkId(): Promise<Optional<WasmContract.NetworkId>> {
        return wrapByPromise(() => {
          const ret = this.wasm.network_id();
          if (ret == null) return undefined;
          return new $outer.NetworkId(ret, $outer._ctx);
        });
      }

      setCollateralReturn(collateralReturn: WasmContract.TransactionOutput): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_collateral_return(collateralReturn.wasm);
        });
      }

      collateralReturn(): Promise<Optional<WasmContract.TransactionOutput>> {
        return wrapByPromise(() => {
          const ret = this.wasm.collateral_return();
          if (ret == null) return undefined;
          return new $outer.TransactionOutput(ret, $outer._ctx);
        });
      }

      setTotalCollateral(totalCollateral: WasmContract.BigNum): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_total_collateral(totalCollateral.wasm);
        });
      }

      totalCollateral(): Promise<Optional<WasmContract.BigNum>> {
        return wrapByPromise(() => {
          const ret = this.wasm.total_collateral();
          if (ret == null) return undefined;
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      setVotingProcedures(votingProcedures: WasmContract.VotingProcedures): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_voting_procedures(votingProcedures.wasm);
        });
      }

      votingProcedures(): Promise<Optional<WasmContract.VotingProcedures>> {
        return wrapByPromise(() => {
          const ret = this.wasm.voting_procedures();
          if (ret == null) return undefined;
          return new $outer.VotingProcedures(ret, $outer._ctx);
        });
      }

      setVotingProposals(votingProposals: WasmContract.VotingProposals): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_voting_proposals(votingProposals.wasm);
        });
      }

      votingProposals(): Promise<Optional<WasmContract.VotingProposals>> {
        return wrapByPromise(() => {
          const ret = this.wasm.voting_proposals();
          if (ret == null) return undefined;
          return new $outer.VotingProposals(ret, $outer._ctx);
        });
      }

      setDonation(donation: WasmContract.BigNum): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_donation(donation.wasm);
        });
      }

      donation(): Promise<Optional<WasmContract.BigNum>> {
        return wrapByPromise(() => {
          const ret = this.wasm.donation();
          if (ret == null) return undefined;
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      setCurrentTreasuryValue(currentTreasuryValue: WasmContract.BigNum): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_current_treasury_value(currentTreasuryValue.wasm);
        });
      }

      currentTreasuryValue(): Promise<Optional<WasmContract.BigNum>> {
        return wrapByPromise(() => {
          const ret = this.wasm.current_treasury_value();
          if (ret == null) return undefined;
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      static new(inputs: WasmContract.TransactionInputs, outputs: WasmContract.TransactionOutputs, fee: WasmContract.BigNum, ttl: Optional<number>): Promise<WasmContract.TransactionBody> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionBody.new(inputs.wasm, outputs.wasm, fee.wasm, ttl);
          return new $outer.TransactionBody(ret, $outer._ctx);
        });
      }

      static newTxBody(inputs: WasmContract.TransactionInputs, outputs: WasmContract.TransactionOutputs, fee: WasmContract.BigNum): Promise<WasmContract.TransactionBody> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionBody.new_tx_body(inputs.wasm, outputs.wasm, fee.wasm);
          return new $outer.TransactionBody(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.add_inputs_from(inputs.wasm, strategy);
        });
      }

      setInputs(inputs: WasmContract.TxInputsBuilder): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_inputs(inputs.wasm);
        });
      }

      setCollateral(collateral: WasmContract.TxInputsBuilder): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_collateral(collateral.wasm);
        });
      }

      setCollateralReturn(collateralReturn: WasmContract.TransactionOutput): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_collateral_return(collateralReturn.wasm);
        });
      }

      removeCollateralReturn(): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.remove_collateral_return();
        });
      }

      setCollateralReturnAndTotal(collateralReturn: WasmContract.TransactionOutput): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_collateral_return_and_total(collateralReturn.wasm);
        });
      }

      setTotalCollateral(totalCollateral: WasmContract.BigNum): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_total_collateral(totalCollateral.wasm);
        });
      }

      removeTotalCollateral(): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.remove_total_collateral();
        });
      }

      setTotalCollateralAndReturn(totalCollateral: WasmContract.BigNum, returnAddress: WasmContract.Address): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_total_collateral_and_return(totalCollateral.wasm, returnAddress.wasm);
        });
      }

      addReferenceInput(referenceInput: WasmContract.TransactionInput): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add_reference_input(referenceInput.wasm);
        });
      }

      addScriptReferenceInput(referenceInput: WasmContract.TransactionInput, scriptSize: number): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add_script_reference_input(referenceInput.wasm, scriptSize);
        });
      }

      addKeyInput(hash: WasmContract.Ed25519KeyHash, input: WasmContract.TransactionInput, amount: WasmContract.Value): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add_key_input(hash.wasm, input.wasm, amount.wasm);
        });
      }

      addNativeScriptInput(script: WasmContract.NativeScript, input: WasmContract.TransactionInput, amount: WasmContract.Value): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add_native_script_input(script.wasm, input.wasm, amount.wasm);
        });
      }

      addPlutusScriptInput(witness: WasmContract.PlutusWitness, input: WasmContract.TransactionInput, amount: WasmContract.Value): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add_plutus_script_input(witness.wasm, input.wasm, amount.wasm);
        });
      }

      addBootstrapInput(hash: WasmContract.ByronAddress, input: WasmContract.TransactionInput, amount: WasmContract.Value): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add_bootstrap_input(hash.wasm, input.wasm, amount.wasm);
        });
      }

      addRegularInput(address: WasmContract.Address, input: WasmContract.TransactionInput, amount: WasmContract.Value): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add_regular_input(address.wasm, input.wasm, amount.wasm);
        });
      }

      addInputsFromAndChange(inputs: WasmContract.TransactionUnspentOutputs, strategy: WasmContract.CoinSelectionStrategyCIP2, changeConfig: WasmContract.ChangeConfig): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.add_inputs_from_and_change(inputs.wasm, strategy, changeConfig.wasm);
        });
      }

      addInputsFromAndChangeWithCollateralReturn(inputs: WasmContract.TransactionUnspentOutputs, strategy: WasmContract.CoinSelectionStrategyCIP2, changeConfig: WasmContract.ChangeConfig, collateralPercentage: number): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.add_inputs_from_and_change_with_collateral_return(inputs.wasm, strategy, changeConfig.wasm, BigInt(collateralPercentage));
        });
      }

      getNativeInputScripts(): Promise<Optional<WasmContract.NativeScripts>> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_native_input_scripts();
          if (ret == null) return undefined;
          return new $outer.NativeScripts(ret, $outer._ctx);
        });
      }

      getPlutusInputScripts(): Promise<Optional<WasmContract.PlutusWitnesses>> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_plutus_input_scripts();
          if (ret == null) return undefined;
          return new $outer.PlutusWitnesses(ret, $outer._ctx);
        });
      }

      feeForInput(address: WasmContract.Address, input: WasmContract.TransactionInput, amount: WasmContract.Value): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = this.wasm.fee_for_input(address.wasm, input.wasm, amount.wasm);
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      addOutput(output: WasmContract.TransactionOutput): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add_output(output.wasm);
        });
      }

      feeForOutput(output: WasmContract.TransactionOutput): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = this.wasm.fee_for_output(output.wasm);
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      setFee(fee: WasmContract.BigNum): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_fee(fee.wasm);
        });
      }

      setTtl(ttl: number): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_ttl(ttl);
        });
      }

      setTtlBignum(ttl: WasmContract.BigNum): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_ttl_bignum(ttl.wasm);
        });
      }

      removeTtl(): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.remove_ttl();
        });
      }

      setValidityStartInterval(validityStartInterval: number): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_validity_start_interval(validityStartInterval);
        });
      }

      setValidityStartIntervalBignum(validityStartInterval: WasmContract.BigNum): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_validity_start_interval_bignum(validityStartInterval.wasm);
        });
      }

      removeValidityStartInterval(): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.remove_validity_start_interval();
        });
      }

      setCerts(certs: WasmContract.Certificates): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_certs(certs.wasm);
        });
      }

      removeCerts(): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.remove_certs();
        });
      }

      setCertsBuilder(certs: WasmContract.CertificatesBuilder): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_certs_builder(certs.wasm);
        });
      }

      setWithdrawals(withdrawals: WasmContract.Withdrawals): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_withdrawals(withdrawals.wasm);
        });
      }

      setWithdrawalsBuilder(withdrawals: WasmContract.WithdrawalsBuilder): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_withdrawals_builder(withdrawals.wasm);
        });
      }

      setVotingBuilder(votingBuilder: WasmContract.VotingBuilder): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_voting_builder(votingBuilder.wasm);
        });
      }

      setVotingProposalBuilder(votingProposalBuilder: WasmContract.VotingProposalBuilder): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_voting_proposal_builder(votingProposalBuilder.wasm);
        });
      }

      removeWithdrawals(): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.remove_withdrawals();
        });
      }

      getAuxiliaryData(): Promise<Optional<WasmContract.AuxiliaryData>> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_auxiliary_data();
          if (ret == null) return undefined;
          return new $outer.AuxiliaryData(ret, $outer._ctx);
        });
      }

      setAuxiliaryData(auxiliaryData: WasmContract.AuxiliaryData): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_auxiliary_data(auxiliaryData.wasm);
        });
      }

      removeAuxiliaryData(): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.remove_auxiliary_data();
        });
      }

      setMetadata(metadata: WasmContract.GeneralTransactionMetadata): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_metadata(metadata.wasm);
        });
      }

      addMetadatum(key: WasmContract.BigNum, val: WasmContract.TransactionMetadatum): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add_metadatum(key.wasm, val.wasm);
        });
      }

      addJsonMetadatum(key: WasmContract.BigNum, val: string): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add_json_metadatum(key.wasm, val);
        });
      }

      addJsonMetadatumWithSchema(key: WasmContract.BigNum, val: string, schema: WasmContract.MetadataJsonSchema): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add_json_metadatum_with_schema(key.wasm, val, schema);
        });
      }

      setMintBuilder(mintBuilder: WasmContract.MintBuilder): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_mint_builder(mintBuilder.wasm);
        });
      }

      removeMintBuilder(): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.remove_mint_builder();
        });
      }

      getMintBuilder(): Promise<Optional<WasmContract.MintBuilder>> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_mint_builder();
          if (ret == null) return undefined;
          return new $outer.MintBuilder(ret, $outer._ctx);
        });
      }

      setMint(mint: WasmContract.Mint, mintScripts: WasmContract.NativeScripts): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_mint(mint.wasm, mintScripts.wasm);
        });
      }

      getMint(): Promise<Optional<WasmContract.Mint>> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_mint();
          if (ret == null) return undefined;
          return new $outer.Mint(ret, $outer._ctx);
        });
      }

      getMintScripts(): Promise<Optional<WasmContract.NativeScripts>> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_mint_scripts();
          if (ret == null) return undefined;
          return new $outer.NativeScripts(ret, $outer._ctx);
        });
      }

      setMintAsset(policyScript: WasmContract.NativeScript, mintAssets: WasmContract.MintAssets): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_mint_asset(policyScript.wasm, mintAssets.wasm);
        });
      }

      addMintAsset(policyScript: WasmContract.NativeScript, assetName: WasmContract.AssetName, amount: WasmContract.Int): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add_mint_asset(policyScript.wasm, assetName.wasm, amount.wasm);
        });
      }

      addMintAssetAndOutput(policyScript: WasmContract.NativeScript, assetName: WasmContract.AssetName, amount: WasmContract.Int, outputBuilder: WasmContract.TransactionOutputAmountBuilder, outputCoin: WasmContract.BigNum): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add_mint_asset_and_output(policyScript.wasm, assetName.wasm, amount.wasm, outputBuilder.wasm, outputCoin.wasm);
        });
      }

      addMintAssetAndOutputMinRequiredCoin(policyScript: WasmContract.NativeScript, assetName: WasmContract.AssetName, amount: WasmContract.Int, outputBuilder: WasmContract.TransactionOutputAmountBuilder): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add_mint_asset_and_output_min_required_coin(policyScript.wasm, assetName.wasm, amount.wasm, outputBuilder.wasm);
        });
      }

      addExtraWitnessDatum(datum: WasmContract.PlutusData): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add_extra_witness_datum(datum.wasm);
        });
      }

      getExtraWitnessDatums(): Promise<Optional<WasmContract.PlutusList>> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_extra_witness_datums();
          if (ret == null) return undefined;
          return new $outer.PlutusList(ret, $outer._ctx);
        });
      }

      setDonation(donation: WasmContract.BigNum): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_donation(donation.wasm);
        });
      }

      getDonation(): Promise<Optional<WasmContract.BigNum>> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_donation();
          if (ret == null) return undefined;
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      setCurrentTreasuryValue(currentTreasuryValue: WasmContract.BigNum): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_current_treasury_value(currentTreasuryValue.wasm);
        });
      }

      getCurrentTreasuryValue(): Promise<Optional<WasmContract.BigNum>> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_current_treasury_value();
          if (ret == null) return undefined;
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      static new(cfg: WasmContract.TransactionBuilderConfig): Promise<WasmContract.TransactionBuilder> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionBuilder.new(cfg.wasm);
          return new $outer.TransactionBuilder(ret, $outer._ctx);
        });
      }

      getReferenceInputs(): Promise<WasmContract.TransactionInputs> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_reference_inputs();
          return new $outer.TransactionInputs(ret, $outer._ctx);
        });
      }

      getExplicitInput(): Promise<WasmContract.Value> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_explicit_input();
          return new $outer.Value(ret, $outer._ctx);
        });
      }

      getImplicitInput(): Promise<WasmContract.Value> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_implicit_input();
          return new $outer.Value(ret, $outer._ctx);
        });
      }

      getTotalInput(): Promise<WasmContract.Value> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_total_input();
          return new $outer.Value(ret, $outer._ctx);
        });
      }

      getTotalOutput(): Promise<WasmContract.Value> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_total_output();
          return new $outer.Value(ret, $outer._ctx);
        });
      }

      getExplicitOutput(): Promise<WasmContract.Value> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_explicit_output();
          return new $outer.Value(ret, $outer._ctx);
        });
      }

      getDeposit(): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_deposit();
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      getFeeIfSet(): Promise<Optional<WasmContract.BigNum>> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_fee_if_set();
          if (ret == null) return undefined;
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      addChangeIfNeeded(address: WasmContract.Address): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.add_change_if_needed(address.wasm);
        });
      }

      addChangeIfNeededWithDatum(address: WasmContract.Address, plutusData: WasmContract.OutputDatum): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.add_change_if_needed_with_datum(address.wasm, plutusData.wasm);
        });
      }

      calcScriptDataHash(costModels: WasmContract.Costmdls): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.calc_script_data_hash(costModels.wasm);
        });
      }

      setScriptDataHash(hash: WasmContract.ScriptDataHash): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_script_data_hash(hash.wasm);
        });
      }

      removeScriptDataHash(): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.remove_script_data_hash();
        });
      }

      addRequiredSigner(key: WasmContract.Ed25519KeyHash): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add_required_signer(key.wasm);
        });
      }

      fullSize(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.full_size();
        });
      }

      outputSizes(): Promise<Uint32Array> {
        return wrapByPromise(() => {
          return this.wasm.output_sizes();
        });
      }

      build(): Promise<WasmContract.TransactionBody> {
        return wrapByPromise(() => {
          const ret = this.wasm.build();
          return new $outer.TransactionBody(ret, $outer._ctx);
        });
      }

      buildTx(): Promise<WasmContract.Transaction> {
        return wrapByPromise(() => {
          const ret = this.wasm.build_tx();
          return new $outer.Transaction(ret, $outer._ctx);
        });
      }

      buildTxUnsafe(): Promise<WasmContract.Transaction> {
        return wrapByPromise(() => {
          const ret = this.wasm.build_tx_unsafe();
          return new $outer.Transaction(ret, $outer._ctx);
        });
      }

      minFee(): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = this.wasm.min_fee();
          return new $outer.BigNum(ret, $outer._ctx);
        });
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

      static new(): Promise<WasmContract.TransactionBuilderConfigBuilder> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionBuilderConfigBuilder.new();
          return new $outer.TransactionBuilderConfigBuilder(ret, $outer._ctx);
        });
      }

      feeAlgo(feeAlgo: WasmContract.LinearFee): Promise<WasmContract.TransactionBuilderConfigBuilder> {
        return wrapByPromise(() => {
          const ret = this.wasm.fee_algo(feeAlgo.wasm);
          return new $outer.TransactionBuilderConfigBuilder(ret, $outer._ctx);
        });
      }

      coinsPerUtxoByte(coinsPerUtxoByte: WasmContract.BigNum): Promise<WasmContract.TransactionBuilderConfigBuilder> {
        return wrapByPromise(() => {
          const ret = this.wasm.coins_per_utxo_byte(coinsPerUtxoByte.wasm);
          return new $outer.TransactionBuilderConfigBuilder(ret, $outer._ctx);
        });
      }

      exUnitPrices(exUnitPrices: WasmContract.ExUnitPrices): Promise<WasmContract.TransactionBuilderConfigBuilder> {
        return wrapByPromise(() => {
          const ret = this.wasm.ex_unit_prices(exUnitPrices.wasm);
          return new $outer.TransactionBuilderConfigBuilder(ret, $outer._ctx);
        });
      }

      poolDeposit(poolDeposit: WasmContract.BigNum): Promise<WasmContract.TransactionBuilderConfigBuilder> {
        return wrapByPromise(() => {
          const ret = this.wasm.pool_deposit(poolDeposit.wasm);
          return new $outer.TransactionBuilderConfigBuilder(ret, $outer._ctx);
        });
      }

      keyDeposit(keyDeposit: WasmContract.BigNum): Promise<WasmContract.TransactionBuilderConfigBuilder> {
        return wrapByPromise(() => {
          const ret = this.wasm.key_deposit(keyDeposit.wasm);
          return new $outer.TransactionBuilderConfigBuilder(ret, $outer._ctx);
        });
      }

      maxValueSize(maxValueSize: number): Promise<WasmContract.TransactionBuilderConfigBuilder> {
        return wrapByPromise(() => {
          const ret = this.wasm.max_value_size(maxValueSize);
          return new $outer.TransactionBuilderConfigBuilder(ret, $outer._ctx);
        });
      }

      maxTxSize(maxTxSize: number): Promise<WasmContract.TransactionBuilderConfigBuilder> {
        return wrapByPromise(() => {
          const ret = this.wasm.max_tx_size(maxTxSize);
          return new $outer.TransactionBuilderConfigBuilder(ret, $outer._ctx);
        });
      }

      refScriptCoinsPerByte(refScriptCoinsPerByte: WasmContract.UnitInterval): Promise<WasmContract.TransactionBuilderConfigBuilder> {
        return wrapByPromise(() => {
          const ret = this.wasm.ref_script_coins_per_byte(refScriptCoinsPerByte.wasm);
          return new $outer.TransactionBuilderConfigBuilder(ret, $outer._ctx);
        });
      }

      preferPureChange(preferPureChange: boolean): Promise<WasmContract.TransactionBuilderConfigBuilder> {
        return wrapByPromise(() => {
          const ret = this.wasm.prefer_pure_change(preferPureChange);
          return new $outer.TransactionBuilderConfigBuilder(ret, $outer._ctx);
        });
      }

      build(): Promise<WasmContract.TransactionBuilderConfig> {
        return wrapByPromise(() => {
          const ret = this.wasm.build();
          return new $outer.TransactionBuilderConfig(ret, $outer._ctx);
        });
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

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.TransactionHash> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionHash.from_bytes(bytes);
          return new $outer.TransactionHash(ret, $outer._ctx);
        });
      }

      toBytes(): Promise<Uint8Array> {
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      toBech32(prefix: string): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_bech32(prefix);
        });
      }

      static fromBech32(bechStr: string): Promise<WasmContract.TransactionHash> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionHash.from_bech32(bechStr);
          return new $outer.TransactionHash(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hex: string): Promise<WasmContract.TransactionHash> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionHash.from_hex(hex);
          return new $outer.TransactionHash(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.TransactionInput> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionInput.from_bytes(bytes);
          return new $outer.TransactionInput(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.TransactionInput> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionInput.from_hex(hexStr);
          return new $outer.TransactionInput(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.TransactionInput> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionInput.from_json(json);
          return new $outer.TransactionInput(ret, $outer._ctx);
        });
      }

      transactionId(): Promise<WasmContract.TransactionHash> {
        return wrapByPromise(() => {
          const ret = this.wasm.transaction_id();
          return new $outer.TransactionHash(ret, $outer._ctx);
        });
      }

      index(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.index();
        });
      }

      static new(transactionId: WasmContract.TransactionHash, index: number): Promise<WasmContract.TransactionInput> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionInput.new(transactionId.wasm, index);
          return new $outer.TransactionInput(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.TransactionInputs> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionInputs.from_bytes(bytes);
          return new $outer.TransactionInputs(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.TransactionInputs> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionInputs.from_hex(hexStr);
          return new $outer.TransactionInputs(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.TransactionInputs> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionInputs.from_json(json);
          return new $outer.TransactionInputs(ret, $outer._ctx);
        });
      }

      static new(): Promise<WasmContract.TransactionInputs> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionInputs.new();
          return new $outer.TransactionInputs(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      get(index: number): Promise<WasmContract.TransactionInput> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(index);
          return new $outer.TransactionInput(ret, $outer._ctx);
        });
      }

      add(elem: WasmContract.TransactionInput): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add(elem.wasm);
        });
      }

      toOption(): Promise<Optional<WasmContract.TransactionInputs>> {
        return wrapByPromise(() => {
          const ret = this.wasm.to_option();
          if (ret == null) return undefined;
          return new $outer.TransactionInputs(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.TransactionMetadatum> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionMetadatum.from_bytes(bytes);
          return new $outer.TransactionMetadatum(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.TransactionMetadatum> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionMetadatum.from_hex(hexStr);
          return new $outer.TransactionMetadatum(ret, $outer._ctx);
        });
      }

      static newMap(map: WasmContract.MetadataMap): Promise<WasmContract.TransactionMetadatum> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionMetadatum.new_map(map.wasm);
          return new $outer.TransactionMetadatum(ret, $outer._ctx);
        });
      }

      static newList(list: WasmContract.MetadataList): Promise<WasmContract.TransactionMetadatum> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionMetadatum.new_list(list.wasm);
          return new $outer.TransactionMetadatum(ret, $outer._ctx);
        });
      }

      static newInt(intValue: WasmContract.Int): Promise<WasmContract.TransactionMetadatum> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionMetadatum.new_int(intValue.wasm);
          return new $outer.TransactionMetadatum(ret, $outer._ctx);
        });
      }

      static newBytes(bytes: Uint8Array): Promise<WasmContract.TransactionMetadatum> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionMetadatum.new_bytes(bytes);
          return new $outer.TransactionMetadatum(ret, $outer._ctx);
        });
      }

      static newText(text: string): Promise<WasmContract.TransactionMetadatum> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionMetadatum.new_text(text);
          return new $outer.TransactionMetadatum(ret, $outer._ctx);
        });
      }

      kind(): Promise<WasmContract.TransactionMetadatumKind> {
        return wrapByPromise(() => {
          return this.wasm.kind();
        });
      }

      asMap(): Promise<WasmContract.MetadataMap> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_map();
          return new $outer.MetadataMap(ret, $outer._ctx);
        });
      }

      asList(): Promise<WasmContract.MetadataList> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_list();
          return new $outer.MetadataList(ret, $outer._ctx);
        });
      }

      asInt(): Promise<WasmContract.Int> {
        return wrapByPromise(() => {
          const ret = this.wasm.as_int();
          return new $outer.Int(ret, $outer._ctx);
        });
      }

      asBytes(): Promise<Uint8Array> {
        return wrapByPromise(() => {
          return this.wasm.as_bytes();
        });
      }

      asText(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.as_text();
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.TransactionMetadatumLabels> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionMetadatumLabels.from_bytes(bytes);
          return new $outer.TransactionMetadatumLabels(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.TransactionMetadatumLabels> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionMetadatumLabels.from_hex(hexStr);
          return new $outer.TransactionMetadatumLabels(ret, $outer._ctx);
        });
      }

      static new(): Promise<WasmContract.TransactionMetadatumLabels> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionMetadatumLabels.new();
          return new $outer.TransactionMetadatumLabels(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      get(index: number): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(index);
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      add(elem: WasmContract.BigNum): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add(elem.wasm);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.TransactionOutput> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionOutput.from_bytes(bytes);
          return new $outer.TransactionOutput(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.TransactionOutput> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionOutput.from_hex(hexStr);
          return new $outer.TransactionOutput(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.TransactionOutput> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionOutput.from_json(json);
          return new $outer.TransactionOutput(ret, $outer._ctx);
        });
      }

      address(): Promise<WasmContract.Address> {
        return wrapByPromise(() => {
          const ret = this.wasm.address();
          return new $outer.Address(ret, $outer._ctx);
        });
      }

      amount(): Promise<WasmContract.Value> {
        return wrapByPromise(() => {
          const ret = this.wasm.amount();
          return new $outer.Value(ret, $outer._ctx);
        });
      }

      dataHash(): Promise<Optional<WasmContract.DataHash>> {
        return wrapByPromise(() => {
          const ret = this.wasm.data_hash();
          if (ret == null) return undefined;
          return new $outer.DataHash(ret, $outer._ctx);
        });
      }

      plutusData(): Promise<Optional<WasmContract.PlutusData>> {
        return wrapByPromise(() => {
          const ret = this.wasm.plutus_data();
          if (ret == null) return undefined;
          return new $outer.PlutusData(ret, $outer._ctx);
        });
      }

      scriptRef(): Promise<Optional<WasmContract.ScriptRef>> {
        return wrapByPromise(() => {
          const ret = this.wasm.script_ref();
          if (ret == null) return undefined;
          return new $outer.ScriptRef(ret, $outer._ctx);
        });
      }

      setScriptRef(scriptRef: WasmContract.ScriptRef): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_script_ref(scriptRef.wasm);
        });
      }

      setPlutusData(data: WasmContract.PlutusData): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_plutus_data(data.wasm);
        });
      }

      setDataHash(dataHash: WasmContract.DataHash): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_data_hash(dataHash.wasm);
        });
      }

      hasPlutusData(): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.has_plutus_data();
        });
      }

      hasDataHash(): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.has_data_hash();
        });
      }

      hasScriptRef(): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.has_script_ref();
        });
      }

      static new(address: WasmContract.Address, amount: WasmContract.Value): Promise<WasmContract.TransactionOutput> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionOutput.new(address.wasm, amount.wasm);
          return new $outer.TransactionOutput(ret, $outer._ctx);
        });
      }

      serializationFormat(): Promise<Optional<WasmContract.CborContainerType>> {
        return wrapByPromise(() => {
          return this.wasm.serialization_format();
        });
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

      withValue(amount: WasmContract.Value): Promise<WasmContract.TransactionOutputAmountBuilder> {
        return wrapByPromise(() => {
          const ret = this.wasm.with_value(amount.wasm);
          return new $outer.TransactionOutputAmountBuilder(ret, $outer._ctx);
        });
      }

      withCoin(coin: WasmContract.BigNum): Promise<WasmContract.TransactionOutputAmountBuilder> {
        return wrapByPromise(() => {
          const ret = this.wasm.with_coin(coin.wasm);
          return new $outer.TransactionOutputAmountBuilder(ret, $outer._ctx);
        });
      }

      withCoinAndAsset(coin: WasmContract.BigNum, multiasset: WasmContract.MultiAsset): Promise<WasmContract.TransactionOutputAmountBuilder> {
        return wrapByPromise(() => {
          const ret = this.wasm.with_coin_and_asset(coin.wasm, multiasset.wasm);
          return new $outer.TransactionOutputAmountBuilder(ret, $outer._ctx);
        });
      }

      withAssetAndMinRequiredCoinByUtxoCost(multiasset: WasmContract.MultiAsset, dataCost: WasmContract.DataCost): Promise<WasmContract.TransactionOutputAmountBuilder> {
        return wrapByPromise(() => {
          const ret = this.wasm.with_asset_and_min_required_coin_by_utxo_cost(multiasset.wasm, dataCost.wasm);
          return new $outer.TransactionOutputAmountBuilder(ret, $outer._ctx);
        });
      }

      build(): Promise<WasmContract.TransactionOutput> {
        return wrapByPromise(() => {
          const ret = this.wasm.build();
          return new $outer.TransactionOutput(ret, $outer._ctx);
        });
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

      static new(): Promise<WasmContract.TransactionOutputBuilder> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionOutputBuilder.new();
          return new $outer.TransactionOutputBuilder(ret, $outer._ctx);
        });
      }

      withAddress(address: WasmContract.Address): Promise<WasmContract.TransactionOutputBuilder> {
        return wrapByPromise(() => {
          const ret = this.wasm.with_address(address.wasm);
          return new $outer.TransactionOutputBuilder(ret, $outer._ctx);
        });
      }

      withDataHash(dataHash: WasmContract.DataHash): Promise<WasmContract.TransactionOutputBuilder> {
        return wrapByPromise(() => {
          const ret = this.wasm.with_data_hash(dataHash.wasm);
          return new $outer.TransactionOutputBuilder(ret, $outer._ctx);
        });
      }

      withPlutusData(data: WasmContract.PlutusData): Promise<WasmContract.TransactionOutputBuilder> {
        return wrapByPromise(() => {
          const ret = this.wasm.with_plutus_data(data.wasm);
          return new $outer.TransactionOutputBuilder(ret, $outer._ctx);
        });
      }

      withScriptRef(scriptRef: WasmContract.ScriptRef): Promise<WasmContract.TransactionOutputBuilder> {
        return wrapByPromise(() => {
          const ret = this.wasm.with_script_ref(scriptRef.wasm);
          return new $outer.TransactionOutputBuilder(ret, $outer._ctx);
        });
      }

      next(): Promise<WasmContract.TransactionOutputAmountBuilder> {
        return wrapByPromise(() => {
          const ret = this.wasm.next();
          return new $outer.TransactionOutputAmountBuilder(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.TransactionOutputs> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionOutputs.from_bytes(bytes);
          return new $outer.TransactionOutputs(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.TransactionOutputs> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionOutputs.from_hex(hexStr);
          return new $outer.TransactionOutputs(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.TransactionOutputs> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionOutputs.from_json(json);
          return new $outer.TransactionOutputs(ret, $outer._ctx);
        });
      }

      static new(): Promise<WasmContract.TransactionOutputs> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionOutputs.new();
          return new $outer.TransactionOutputs(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      get(index: number): Promise<WasmContract.TransactionOutput> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(index);
          return new $outer.TransactionOutput(ret, $outer._ctx);
        });
      }

      add(elem: WasmContract.TransactionOutput): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add(elem.wasm);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.TransactionUnspentOutput> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionUnspentOutput.from_bytes(bytes);
          return new $outer.TransactionUnspentOutput(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.TransactionUnspentOutput> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionUnspentOutput.from_hex(hexStr);
          return new $outer.TransactionUnspentOutput(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.TransactionUnspentOutput> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionUnspentOutput.from_json(json);
          return new $outer.TransactionUnspentOutput(ret, $outer._ctx);
        });
      }

      static new(input: WasmContract.TransactionInput, output: WasmContract.TransactionOutput): Promise<WasmContract.TransactionUnspentOutput> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionUnspentOutput.new(input.wasm, output.wasm);
          return new $outer.TransactionUnspentOutput(ret, $outer._ctx);
        });
      }

      input(): Promise<WasmContract.TransactionInput> {
        return wrapByPromise(() => {
          const ret = this.wasm.input();
          return new $outer.TransactionInput(ret, $outer._ctx);
        });
      }

      output(): Promise<WasmContract.TransactionOutput> {
        return wrapByPromise(() => {
          const ret = this.wasm.output();
          return new $outer.TransactionOutput(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.TransactionUnspentOutputs> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionUnspentOutputs.from_json(json);
          return new $outer.TransactionUnspentOutputs(ret, $outer._ctx);
        });
      }

      static new(): Promise<WasmContract.TransactionUnspentOutputs> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionUnspentOutputs.new();
          return new $outer.TransactionUnspentOutputs(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      get(index: number): Promise<WasmContract.TransactionUnspentOutput> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(index);
          return new $outer.TransactionUnspentOutput(ret, $outer._ctx);
        });
      }

      add(elem: WasmContract.TransactionUnspentOutput): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add(elem.wasm);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.TransactionWitnessSet> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionWitnessSet.from_bytes(bytes);
          return new $outer.TransactionWitnessSet(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.TransactionWitnessSet> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionWitnessSet.from_hex(hexStr);
          return new $outer.TransactionWitnessSet(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.TransactionWitnessSet> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionWitnessSet.from_json(json);
          return new $outer.TransactionWitnessSet(ret, $outer._ctx);
        });
      }

      setVkeys(vkeys: WasmContract.Vkeywitnesses): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_vkeys(vkeys.wasm);
        });
      }

      vkeys(): Promise<Optional<WasmContract.Vkeywitnesses>> {
        return wrapByPromise(() => {
          const ret = this.wasm.vkeys();
          if (ret == null) return undefined;
          return new $outer.Vkeywitnesses(ret, $outer._ctx);
        });
      }

      setNativeScripts(nativeScripts: WasmContract.NativeScripts): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_native_scripts(nativeScripts.wasm);
        });
      }

      nativeScripts(): Promise<Optional<WasmContract.NativeScripts>> {
        return wrapByPromise(() => {
          const ret = this.wasm.native_scripts();
          if (ret == null) return undefined;
          return new $outer.NativeScripts(ret, $outer._ctx);
        });
      }

      setBootstraps(bootstraps: WasmContract.BootstrapWitnesses): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_bootstraps(bootstraps.wasm);
        });
      }

      bootstraps(): Promise<Optional<WasmContract.BootstrapWitnesses>> {
        return wrapByPromise(() => {
          const ret = this.wasm.bootstraps();
          if (ret == null) return undefined;
          return new $outer.BootstrapWitnesses(ret, $outer._ctx);
        });
      }

      setPlutusScripts(plutusScripts: WasmContract.PlutusScripts): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_plutus_scripts(plutusScripts.wasm);
        });
      }

      plutusScripts(): Promise<Optional<WasmContract.PlutusScripts>> {
        return wrapByPromise(() => {
          const ret = this.wasm.plutus_scripts();
          if (ret == null) return undefined;
          return new $outer.PlutusScripts(ret, $outer._ctx);
        });
      }

      setPlutusData(plutusData: WasmContract.PlutusList): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_plutus_data(plutusData.wasm);
        });
      }

      plutusData(): Promise<Optional<WasmContract.PlutusList>> {
        return wrapByPromise(() => {
          const ret = this.wasm.plutus_data();
          if (ret == null) return undefined;
          return new $outer.PlutusList(ret, $outer._ctx);
        });
      }

      setRedeemers(redeemers: WasmContract.Redeemers): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_redeemers(redeemers.wasm);
        });
      }

      redeemers(): Promise<Optional<WasmContract.Redeemers>> {
        return wrapByPromise(() => {
          const ret = this.wasm.redeemers();
          if (ret == null) return undefined;
          return new $outer.Redeemers(ret, $outer._ctx);
        });
      }

      static new(): Promise<WasmContract.TransactionWitnessSet> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionWitnessSet.new();
          return new $outer.TransactionWitnessSet(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.TransactionWitnessSets> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionWitnessSets.from_bytes(bytes);
          return new $outer.TransactionWitnessSets(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.TransactionWitnessSets> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionWitnessSets.from_hex(hexStr);
          return new $outer.TransactionWitnessSets(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.TransactionWitnessSets> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionWitnessSets.from_json(json);
          return new $outer.TransactionWitnessSets(ret, $outer._ctx);
        });
      }

      static new(): Promise<WasmContract.TransactionWitnessSets> {
        return wrapByPromise(() => {
          const ret = WasmV4.TransactionWitnessSets.new();
          return new $outer.TransactionWitnessSets(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      get(index: number): Promise<WasmContract.TransactionWitnessSet> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(index);
          return new $outer.TransactionWitnessSet(ret, $outer._ctx);
        });
      }

      add(elem: WasmContract.TransactionWitnessSet): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add(elem.wasm);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.TreasuryWithdrawals> {
        return wrapByPromise(() => {
          const ret = WasmV4.TreasuryWithdrawals.from_json(json);
          return new $outer.TreasuryWithdrawals(ret, $outer._ctx);
        });
      }

      static new(): Promise<WasmContract.TreasuryWithdrawals> {
        return wrapByPromise(() => {
          const ret = WasmV4.TreasuryWithdrawals.new();
          return new $outer.TreasuryWithdrawals(ret, $outer._ctx);
        });
      }

      get(key: WasmContract.RewardAddress): Promise<Optional<WasmContract.BigNum>> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(key.wasm);
          if (ret == null) return undefined;
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      insert(key: WasmContract.RewardAddress, value: WasmContract.BigNum): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.insert(key.wasm, value.wasm);
        });
      }

      keys(): Promise<WasmContract.RewardAddresses> {
        return wrapByPromise(() => {
          const ret = this.wasm.keys();
          return new $outer.RewardAddresses(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.TreasuryWithdrawalsAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.TreasuryWithdrawalsAction.from_bytes(bytes);
          return new $outer.TreasuryWithdrawalsAction(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.TreasuryWithdrawalsAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.TreasuryWithdrawalsAction.from_hex(hexStr);
          return new $outer.TreasuryWithdrawalsAction(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.TreasuryWithdrawalsAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.TreasuryWithdrawalsAction.from_json(json);
          return new $outer.TreasuryWithdrawalsAction(ret, $outer._ctx);
        });
      }

      withdrawals(): Promise<WasmContract.TreasuryWithdrawals> {
        return wrapByPromise(() => {
          const ret = this.wasm.withdrawals();
          return new $outer.TreasuryWithdrawals(ret, $outer._ctx);
        });
      }

      policyHash(): Promise<Optional<WasmContract.ScriptHash>> {
        return wrapByPromise(() => {
          const ret = this.wasm.policy_hash();
          if (ret == null) return undefined;
          return new $outer.ScriptHash(ret, $outer._ctx);
        });
      }

      static new(withdrawals: WasmContract.TreasuryWithdrawals): Promise<WasmContract.TreasuryWithdrawalsAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.TreasuryWithdrawalsAction.new(withdrawals.wasm);
          return new $outer.TreasuryWithdrawalsAction(ret, $outer._ctx);
        });
      }

      static newWithPolicyHash(withdrawals: WasmContract.TreasuryWithdrawals, policyHash: WasmContract.ScriptHash): Promise<WasmContract.TreasuryWithdrawalsAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.TreasuryWithdrawalsAction.new_with_policy_hash(withdrawals.wasm, policyHash.wasm);
          return new $outer.TreasuryWithdrawalsAction(ret, $outer._ctx);
        });
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

      static plutusDefaultCostModels(): Promise<WasmContract.Costmdls> {
        return wrapByPromise(() => {
          const ret = WasmV4.TxBuilderConstants.plutus_default_cost_models();
          return new $outer.Costmdls(ret, $outer._ctx);
        });
      }

      static plutusAlonzoCostModels(): Promise<WasmContract.Costmdls> {
        return wrapByPromise(() => {
          const ret = WasmV4.TxBuilderConstants.plutus_alonzo_cost_models();
          return new $outer.Costmdls(ret, $outer._ctx);
        });
      }

      static plutusVasilCostModels(): Promise<WasmContract.Costmdls> {
        return wrapByPromise(() => {
          const ret = WasmV4.TxBuilderConstants.plutus_vasil_cost_models();
          return new $outer.Costmdls(ret, $outer._ctx);
        });
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

      static new(): Promise<WasmContract.TxInputsBuilder> {
        return wrapByPromise(() => {
          const ret = WasmV4.TxInputsBuilder.new();
          return new $outer.TxInputsBuilder(ret, $outer._ctx);
        });
      }

      addKeyInput(hash: WasmContract.Ed25519KeyHash, input: WasmContract.TransactionInput, amount: WasmContract.Value): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add_key_input(hash.wasm, input.wasm, amount.wasm);
        });
      }

      addNativeScriptInput(script: WasmContract.NativeScript, input: WasmContract.TransactionInput, amount: WasmContract.Value): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add_native_script_input(script.wasm, input.wasm, amount.wasm);
        });
      }

      addPlutusScriptInput(witness: WasmContract.PlutusWitness, input: WasmContract.TransactionInput, amount: WasmContract.Value): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add_plutus_script_input(witness.wasm, input.wasm, amount.wasm);
        });
      }

      addBootstrapInput(hash: WasmContract.ByronAddress, input: WasmContract.TransactionInput, amount: WasmContract.Value): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add_bootstrap_input(hash.wasm, input.wasm, amount.wasm);
        });
      }

      addRegularInput(address: WasmContract.Address, input: WasmContract.TransactionInput, amount: WasmContract.Value): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add_regular_input(address.wasm, input.wasm, amount.wasm);
        });
      }

      getRefInputs(): Promise<WasmContract.TransactionInputs> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_ref_inputs();
          return new $outer.TransactionInputs(ret, $outer._ctx);
        });
      }

      getNativeInputScripts(): Promise<Optional<WasmContract.NativeScripts>> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_native_input_scripts();
          if (ret == null) return undefined;
          return new $outer.NativeScripts(ret, $outer._ctx);
        });
      }

      getPlutusInputScripts(): Promise<Optional<WasmContract.PlutusWitnesses>> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_plutus_input_scripts();
          if (ret == null) return undefined;
          return new $outer.PlutusWitnesses(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      addRequiredSigner(key: WasmContract.Ed25519KeyHash): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add_required_signer(key.wasm);
        });
      }

      addRequiredSigners(keys: WasmContract.Ed25519KeyHashes): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add_required_signers(keys.wasm);
        });
      }

      totalValue(): Promise<WasmContract.Value> {
        return wrapByPromise(() => {
          const ret = this.wasm.total_value();
          return new $outer.Value(ret, $outer._ctx);
        });
      }

      inputs(): Promise<WasmContract.TransactionInputs> {
        return wrapByPromise(() => {
          const ret = this.wasm.inputs();
          return new $outer.TransactionInputs(ret, $outer._ctx);
        });
      }

      inputsOption(): Promise<Optional<WasmContract.TransactionInputs>> {
        return wrapByPromise(() => {
          const ret = this.wasm.inputs_option();
          if (ret == null) return undefined;
          return new $outer.TransactionInputs(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.URL> {
        return wrapByPromise(() => {
          const ret = WasmV4.URL.from_bytes(bytes);
          return new $outer.URL(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.URL> {
        return wrapByPromise(() => {
          const ret = WasmV4.URL.from_hex(hexStr);
          return new $outer.URL(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.URL> {
        return wrapByPromise(() => {
          const ret = WasmV4.URL.from_json(json);
          return new $outer.URL(ret, $outer._ctx);
        });
      }

      static new(url: string): Promise<WasmContract.URL> {
        return wrapByPromise(() => {
          const ret = WasmV4.URL.new(url);
          return new $outer.URL(ret, $outer._ctx);
        });
      }

      url(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.url();
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.UnitInterval> {
        return wrapByPromise(() => {
          const ret = WasmV4.UnitInterval.from_bytes(bytes);
          return new $outer.UnitInterval(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.UnitInterval> {
        return wrapByPromise(() => {
          const ret = WasmV4.UnitInterval.from_hex(hexStr);
          return new $outer.UnitInterval(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.UnitInterval> {
        return wrapByPromise(() => {
          const ret = WasmV4.UnitInterval.from_json(json);
          return new $outer.UnitInterval(ret, $outer._ctx);
        });
      }

      numerator(): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = this.wasm.numerator();
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      denominator(): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = this.wasm.denominator();
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      static new(numerator: WasmContract.BigNum, denominator: WasmContract.BigNum): Promise<WasmContract.UnitInterval> {
        return wrapByPromise(() => {
          const ret = WasmV4.UnitInterval.new(numerator.wasm, denominator.wasm);
          return new $outer.UnitInterval(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.Update> {
        return wrapByPromise(() => {
          const ret = WasmV4.Update.from_bytes(bytes);
          return new $outer.Update(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.Update> {
        return wrapByPromise(() => {
          const ret = WasmV4.Update.from_hex(hexStr);
          return new $outer.Update(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.Update> {
        return wrapByPromise(() => {
          const ret = WasmV4.Update.from_json(json);
          return new $outer.Update(ret, $outer._ctx);
        });
      }

      proposedProtocolParameterUpdates(): Promise<WasmContract.ProposedProtocolParameterUpdates> {
        return wrapByPromise(() => {
          const ret = this.wasm.proposed_protocol_parameter_updates();
          return new $outer.ProposedProtocolParameterUpdates(ret, $outer._ctx);
        });
      }

      epoch(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.epoch();
        });
      }

      static new(proposedProtocolParameterUpdates: WasmContract.ProposedProtocolParameterUpdates, epoch: number): Promise<WasmContract.Update> {
        return wrapByPromise(() => {
          const ret = WasmV4.Update.new(proposedProtocolParameterUpdates.wasm, epoch);
          return new $outer.Update(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.UpdateCommitteeAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.UpdateCommitteeAction.from_bytes(bytes);
          return new $outer.UpdateCommitteeAction(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.UpdateCommitteeAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.UpdateCommitteeAction.from_hex(hexStr);
          return new $outer.UpdateCommitteeAction(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.UpdateCommitteeAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.UpdateCommitteeAction.from_json(json);
          return new $outer.UpdateCommitteeAction(ret, $outer._ctx);
        });
      }

      govActionId(): Promise<Optional<WasmContract.GovernanceActionId>> {
        return wrapByPromise(() => {
          const ret = this.wasm.gov_action_id();
          if (ret == null) return undefined;
          return new $outer.GovernanceActionId(ret, $outer._ctx);
        });
      }

      committee(): Promise<WasmContract.Committee> {
        return wrapByPromise(() => {
          const ret = this.wasm.committee();
          return new $outer.Committee(ret, $outer._ctx);
        });
      }

      membersToRemove(): Promise<WasmContract.Credentials> {
        return wrapByPromise(() => {
          const ret = this.wasm.members_to_remove();
          return new $outer.Credentials(ret, $outer._ctx);
        });
      }

      static new(committee: WasmContract.Committee, membersToRemove: WasmContract.Credentials): Promise<WasmContract.UpdateCommitteeAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.UpdateCommitteeAction.new(committee.wasm, membersToRemove.wasm);
          return new $outer.UpdateCommitteeAction(ret, $outer._ctx);
        });
      }

      static newWithActionId(govActionId: WasmContract.GovernanceActionId, committee: WasmContract.Committee, membersToRemove: WasmContract.Credentials): Promise<WasmContract.UpdateCommitteeAction> {
        return wrapByPromise(() => {
          const ret = WasmV4.UpdateCommitteeAction.new_with_action_id(govActionId.wasm, committee.wasm, membersToRemove.wasm);
          return new $outer.UpdateCommitteeAction(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.VRFCert> {
        return wrapByPromise(() => {
          const ret = WasmV4.VRFCert.from_bytes(bytes);
          return new $outer.VRFCert(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.VRFCert> {
        return wrapByPromise(() => {
          const ret = WasmV4.VRFCert.from_hex(hexStr);
          return new $outer.VRFCert(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.VRFCert> {
        return wrapByPromise(() => {
          const ret = WasmV4.VRFCert.from_json(json);
          return new $outer.VRFCert(ret, $outer._ctx);
        });
      }

      output(): Promise<Uint8Array> {
        return wrapByPromise(() => {
          return this.wasm.output();
        });
      }

      proof(): Promise<Uint8Array> {
        return wrapByPromise(() => {
          return this.wasm.proof();
        });
      }

      static new(output: Uint8Array, proof: Uint8Array): Promise<WasmContract.VRFCert> {
        return wrapByPromise(() => {
          const ret = WasmV4.VRFCert.new(output, proof);
          return new $outer.VRFCert(ret, $outer._ctx);
        });
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

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.VRFKeyHash> {
        return wrapByPromise(() => {
          const ret = WasmV4.VRFKeyHash.from_bytes(bytes);
          return new $outer.VRFKeyHash(ret, $outer._ctx);
        });
      }

      toBytes(): Promise<Uint8Array> {
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      toBech32(prefix: string): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_bech32(prefix);
        });
      }

      static fromBech32(bechStr: string): Promise<WasmContract.VRFKeyHash> {
        return wrapByPromise(() => {
          const ret = WasmV4.VRFKeyHash.from_bech32(bechStr);
          return new $outer.VRFKeyHash(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hex: string): Promise<WasmContract.VRFKeyHash> {
        return wrapByPromise(() => {
          const ret = WasmV4.VRFKeyHash.from_hex(hex);
          return new $outer.VRFKeyHash(ret, $outer._ctx);
        });
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

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.VRFVKey> {
        return wrapByPromise(() => {
          const ret = WasmV4.VRFVKey.from_bytes(bytes);
          return new $outer.VRFVKey(ret, $outer._ctx);
        });
      }

      toBytes(): Promise<Uint8Array> {
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      toBech32(prefix: string): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_bech32(prefix);
        });
      }

      static fromBech32(bechStr: string): Promise<WasmContract.VRFVKey> {
        return wrapByPromise(() => {
          const ret = WasmV4.VRFVKey.from_bech32(bechStr);
          return new $outer.VRFVKey(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hex: string): Promise<WasmContract.VRFVKey> {
        return wrapByPromise(() => {
          const ret = WasmV4.VRFVKey.from_hex(hex);
          return new $outer.VRFVKey(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.Value> {
        return wrapByPromise(() => {
          const ret = WasmV4.Value.from_bytes(bytes);
          return new $outer.Value(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.Value> {
        return wrapByPromise(() => {
          const ret = WasmV4.Value.from_hex(hexStr);
          return new $outer.Value(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.Value> {
        return wrapByPromise(() => {
          const ret = WasmV4.Value.from_json(json);
          return new $outer.Value(ret, $outer._ctx);
        });
      }

      static new(coin: WasmContract.BigNum): Promise<WasmContract.Value> {
        return wrapByPromise(() => {
          const ret = WasmV4.Value.new(coin.wasm);
          return new $outer.Value(ret, $outer._ctx);
        });
      }

      static newFromAssets(multiasset: WasmContract.MultiAsset): Promise<WasmContract.Value> {
        return wrapByPromise(() => {
          const ret = WasmV4.Value.new_from_assets(multiasset.wasm);
          return new $outer.Value(ret, $outer._ctx);
        });
      }

      static newWithAssets(coin: WasmContract.BigNum, multiasset: WasmContract.MultiAsset): Promise<WasmContract.Value> {
        return wrapByPromise(() => {
          const ret = WasmV4.Value.new_with_assets(coin.wasm, multiasset.wasm);
          return new $outer.Value(ret, $outer._ctx);
        });
      }

      static zero(): Promise<WasmContract.Value> {
        return wrapByPromise(() => {
          const ret = WasmV4.Value.zero();
          return new $outer.Value(ret, $outer._ctx);
        });
      }

      isZero(): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.is_zero();
        });
      }

      coin(): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = this.wasm.coin();
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      setCoin(coin: WasmContract.BigNum): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_coin(coin.wasm);
        });
      }

      multiasset(): Promise<Optional<WasmContract.MultiAsset>> {
        return wrapByPromise(() => {
          const ret = this.wasm.multiasset();
          if (ret == null) return undefined;
          return new $outer.MultiAsset(ret, $outer._ctx);
        });
      }

      setMultiasset(multiasset: WasmContract.MultiAsset): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.set_multiasset(multiasset.wasm);
        });
      }

      checkedAdd(rhs: WasmContract.Value): Promise<WasmContract.Value> {
        return wrapByPromise(() => {
          const ret = this.wasm.checked_add(rhs.wasm);
          return new $outer.Value(ret, $outer._ctx);
        });
      }

      checkedSub(rhsValue: WasmContract.Value): Promise<WasmContract.Value> {
        return wrapByPromise(() => {
          const ret = this.wasm.checked_sub(rhsValue.wasm);
          return new $outer.Value(ret, $outer._ctx);
        });
      }

      clampedSub(rhsValue: WasmContract.Value): Promise<WasmContract.Value> {
        return wrapByPromise(() => {
          const ret = this.wasm.clamped_sub(rhsValue.wasm);
          return new $outer.Value(ret, $outer._ctx);
        });
      }

      compare(rhsValue: WasmContract.Value): Promise<Optional<number>> {
        return wrapByPromise(() => {
          return this.wasm.compare(rhsValue.wasm);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.Vkey> {
        return wrapByPromise(() => {
          const ret = WasmV4.Vkey.from_bytes(bytes);
          return new $outer.Vkey(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.Vkey> {
        return wrapByPromise(() => {
          const ret = WasmV4.Vkey.from_hex(hexStr);
          return new $outer.Vkey(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.Vkey> {
        return wrapByPromise(() => {
          const ret = WasmV4.Vkey.from_json(json);
          return new $outer.Vkey(ret, $outer._ctx);
        });
      }

      static new(pk: WasmContract.PublicKey): Promise<WasmContract.Vkey> {
        return wrapByPromise(() => {
          const ret = WasmV4.Vkey.new(pk.wasm);
          return new $outer.Vkey(ret, $outer._ctx);
        });
      }

      publicKey(): Promise<WasmContract.PublicKey> {
        return wrapByPromise(() => {
          const ret = this.wasm.public_key();
          return new $outer.PublicKey(ret, $outer._ctx);
        });
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

      static new(): Promise<WasmContract.Vkeys> {
        return wrapByPromise(() => {
          const ret = WasmV4.Vkeys.new();
          return new $outer.Vkeys(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      get(index: number): Promise<WasmContract.Vkey> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(index);
          return new $outer.Vkey(ret, $outer._ctx);
        });
      }

      add(elem: WasmContract.Vkey): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add(elem.wasm);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.Vkeywitness> {
        return wrapByPromise(() => {
          const ret = WasmV4.Vkeywitness.from_bytes(bytes);
          return new $outer.Vkeywitness(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.Vkeywitness> {
        return wrapByPromise(() => {
          const ret = WasmV4.Vkeywitness.from_hex(hexStr);
          return new $outer.Vkeywitness(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.Vkeywitness> {
        return wrapByPromise(() => {
          const ret = WasmV4.Vkeywitness.from_json(json);
          return new $outer.Vkeywitness(ret, $outer._ctx);
        });
      }

      static new(vkey: WasmContract.Vkey, signature: WasmContract.Ed25519Signature): Promise<WasmContract.Vkeywitness> {
        return wrapByPromise(() => {
          const ret = WasmV4.Vkeywitness.new(vkey.wasm, signature.wasm);
          return new $outer.Vkeywitness(ret, $outer._ctx);
        });
      }

      vkey(): Promise<WasmContract.Vkey> {
        return wrapByPromise(() => {
          const ret = this.wasm.vkey();
          return new $outer.Vkey(ret, $outer._ctx);
        });
      }

      signature(): Promise<WasmContract.Ed25519Signature> {
        return wrapByPromise(() => {
          const ret = this.wasm.signature();
          return new $outer.Ed25519Signature(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.Vkeywitnesses> {
        return wrapByPromise(() => {
          const ret = WasmV4.Vkeywitnesses.from_bytes(bytes);
          return new $outer.Vkeywitnesses(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.Vkeywitnesses> {
        return wrapByPromise(() => {
          const ret = WasmV4.Vkeywitnesses.from_hex(hexStr);
          return new $outer.Vkeywitnesses(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.Vkeywitnesses> {
        return wrapByPromise(() => {
          const ret = WasmV4.Vkeywitnesses.from_json(json);
          return new $outer.Vkeywitnesses(ret, $outer._ctx);
        });
      }

      static new(): Promise<WasmContract.Vkeywitnesses> {
        return wrapByPromise(() => {
          const ret = WasmV4.Vkeywitnesses.new();
          return new $outer.Vkeywitnesses(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      get(index: number): Promise<WasmContract.Vkeywitness> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(index);
          return new $outer.Vkeywitness(ret, $outer._ctx);
        });
      }

      add(elem: WasmContract.Vkeywitness): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add(elem.wasm);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.VoteDelegation> {
        return wrapByPromise(() => {
          const ret = WasmV4.VoteDelegation.from_bytes(bytes);
          return new $outer.VoteDelegation(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.VoteDelegation> {
        return wrapByPromise(() => {
          const ret = WasmV4.VoteDelegation.from_hex(hexStr);
          return new $outer.VoteDelegation(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.VoteDelegation> {
        return wrapByPromise(() => {
          const ret = WasmV4.VoteDelegation.from_json(json);
          return new $outer.VoteDelegation(ret, $outer._ctx);
        });
      }

      stakeCredential(): Promise<WasmContract.Credential> {
        return wrapByPromise(() => {
          const ret = this.wasm.stake_credential();
          return new $outer.Credential(ret, $outer._ctx);
        });
      }

      drep(): Promise<WasmContract.DRep> {
        return wrapByPromise(() => {
          const ret = this.wasm.drep();
          return new $outer.DRep(ret, $outer._ctx);
        });
      }

      static new(stakeCredential: WasmContract.Credential, drep: WasmContract.DRep): Promise<WasmContract.VoteDelegation> {
        return wrapByPromise(() => {
          const ret = WasmV4.VoteDelegation.new(stakeCredential.wasm, drep.wasm);
          return new $outer.VoteDelegation(ret, $outer._ctx);
        });
      }

      hasScriptCredentials(): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.has_script_credentials();
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.VoteRegistrationAndDelegation> {
        return wrapByPromise(() => {
          const ret = WasmV4.VoteRegistrationAndDelegation.from_bytes(bytes);
          return new $outer.VoteRegistrationAndDelegation(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.VoteRegistrationAndDelegation> {
        return wrapByPromise(() => {
          const ret = WasmV4.VoteRegistrationAndDelegation.from_hex(hexStr);
          return new $outer.VoteRegistrationAndDelegation(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.VoteRegistrationAndDelegation> {
        return wrapByPromise(() => {
          const ret = WasmV4.VoteRegistrationAndDelegation.from_json(json);
          return new $outer.VoteRegistrationAndDelegation(ret, $outer._ctx);
        });
      }

      stakeCredential(): Promise<WasmContract.Credential> {
        return wrapByPromise(() => {
          const ret = this.wasm.stake_credential();
          return new $outer.Credential(ret, $outer._ctx);
        });
      }

      drep(): Promise<WasmContract.DRep> {
        return wrapByPromise(() => {
          const ret = this.wasm.drep();
          return new $outer.DRep(ret, $outer._ctx);
        });
      }

      coin(): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = this.wasm.coin();
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      static new(stakeCredential: WasmContract.Credential, drep: WasmContract.DRep, coin: WasmContract.BigNum): Promise<WasmContract.VoteRegistrationAndDelegation> {
        return wrapByPromise(() => {
          const ret = WasmV4.VoteRegistrationAndDelegation.new(stakeCredential.wasm, drep.wasm, coin.wasm);
          return new $outer.VoteRegistrationAndDelegation(ret, $outer._ctx);
        });
      }

      hasScriptCredentials(): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.has_script_credentials();
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.Voter> {
        return wrapByPromise(() => {
          const ret = WasmV4.Voter.from_bytes(bytes);
          return new $outer.Voter(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.Voter> {
        return wrapByPromise(() => {
          const ret = WasmV4.Voter.from_hex(hexStr);
          return new $outer.Voter(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.Voter> {
        return wrapByPromise(() => {
          const ret = WasmV4.Voter.from_json(json);
          return new $outer.Voter(ret, $outer._ctx);
        });
      }

      static newConstitutionalCommitteeHotKey(cred: WasmContract.Credential): Promise<WasmContract.Voter> {
        return wrapByPromise(() => {
          const ret = WasmV4.Voter.new_constitutional_committee_hot_key(cred.wasm);
          return new $outer.Voter(ret, $outer._ctx);
        });
      }

      static newDrep(cred: WasmContract.Credential): Promise<WasmContract.Voter> {
        return wrapByPromise(() => {
          const ret = WasmV4.Voter.new_drep(cred.wasm);
          return new $outer.Voter(ret, $outer._ctx);
        });
      }

      static newStakingPool(keyHash: WasmContract.Ed25519KeyHash): Promise<WasmContract.Voter> {
        return wrapByPromise(() => {
          const ret = WasmV4.Voter.new_staking_pool(keyHash.wasm);
          return new $outer.Voter(ret, $outer._ctx);
        });
      }

      kind(): Promise<WasmContract.VoterKind> {
        return wrapByPromise(() => {
          return this.wasm.kind();
        });
      }

      toConstitutionalCommitteeHotCred(): Promise<Optional<WasmContract.Credential>> {
        return wrapByPromise(() => {
          const ret = this.wasm.to_constitutional_committee_hot_cred();
          if (ret == null) return undefined;
          return new $outer.Credential(ret, $outer._ctx);
        });
      }

      toDrepCred(): Promise<Optional<WasmContract.Credential>> {
        return wrapByPromise(() => {
          const ret = this.wasm.to_drep_cred();
          if (ret == null) return undefined;
          return new $outer.Credential(ret, $outer._ctx);
        });
      }

      toStakingPoolKeyHash(): Promise<Optional<WasmContract.Ed25519KeyHash>> {
        return wrapByPromise(() => {
          const ret = this.wasm.to_staking_pool_key_hash();
          if (ret == null) return undefined;
          return new $outer.Ed25519KeyHash(ret, $outer._ctx);
        });
      }

      hasScriptCredentials(): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.has_script_credentials();
        });
      }

      toKeyHash(): Promise<Optional<WasmContract.Ed25519KeyHash>> {
        return wrapByPromise(() => {
          const ret = this.wasm.to_key_hash();
          if (ret == null) return undefined;
          return new $outer.Ed25519KeyHash(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.Voters> {
        return wrapByPromise(() => {
          const ret = WasmV4.Voters.from_json(json);
          return new $outer.Voters(ret, $outer._ctx);
        });
      }

      static new(): Promise<WasmContract.Voters> {
        return wrapByPromise(() => {
          const ret = WasmV4.Voters.new();
          return new $outer.Voters(ret, $outer._ctx);
        });
      }

      add(voter: WasmContract.Voter): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add(voter.wasm);
        });
      }

      get(index: number): Promise<Optional<WasmContract.Voter>> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(index);
          if (ret == null) return undefined;
          return new $outer.Voter(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
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

      static new(): Promise<WasmContract.VotingBuilder> {
        return wrapByPromise(() => {
          const ret = WasmV4.VotingBuilder.new();
          return new $outer.VotingBuilder(ret, $outer._ctx);
        });
      }

      add(voter: WasmContract.Voter, govActionId: WasmContract.GovernanceActionId, votingProcedure: WasmContract.VotingProcedure): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add(voter.wasm, govActionId.wasm, votingProcedure.wasm);
        });
      }

      addWithPlutusWitness(voter: WasmContract.Voter, govActionId: WasmContract.GovernanceActionId, votingProcedure: WasmContract.VotingProcedure, witness: WasmContract.PlutusWitness): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add_with_plutus_witness(voter.wasm, govActionId.wasm, votingProcedure.wasm, witness.wasm);
        });
      }

      addWithNativeScript(voter: WasmContract.Voter, govActionId: WasmContract.GovernanceActionId, votingProcedure: WasmContract.VotingProcedure, nativeScriptSource: WasmContract.NativeScriptSource): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add_with_native_script(voter.wasm, govActionId.wasm, votingProcedure.wasm, nativeScriptSource.wasm);
        });
      }

      getPlutusWitnesses(): Promise<WasmContract.PlutusWitnesses> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_plutus_witnesses();
          return new $outer.PlutusWitnesses(ret, $outer._ctx);
        });
      }

      getRefInputs(): Promise<WasmContract.TransactionInputs> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_ref_inputs();
          return new $outer.TransactionInputs(ret, $outer._ctx);
        });
      }

      getNativeScripts(): Promise<WasmContract.NativeScripts> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_native_scripts();
          return new $outer.NativeScripts(ret, $outer._ctx);
        });
      }

      hasPlutusScripts(): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.has_plutus_scripts();
        });
      }

      build(): Promise<WasmContract.VotingProcedures> {
        return wrapByPromise(() => {
          const ret = this.wasm.build();
          return new $outer.VotingProcedures(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.VotingProcedure> {
        return wrapByPromise(() => {
          const ret = WasmV4.VotingProcedure.from_bytes(bytes);
          return new $outer.VotingProcedure(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.VotingProcedure> {
        return wrapByPromise(() => {
          const ret = WasmV4.VotingProcedure.from_hex(hexStr);
          return new $outer.VotingProcedure(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.VotingProcedure> {
        return wrapByPromise(() => {
          const ret = WasmV4.VotingProcedure.from_json(json);
          return new $outer.VotingProcedure(ret, $outer._ctx);
        });
      }

      static new(vote: WasmContract.VoteKind): Promise<WasmContract.VotingProcedure> {
        return wrapByPromise(() => {
          const ret = WasmV4.VotingProcedure.new(vote);
          return new $outer.VotingProcedure(ret, $outer._ctx);
        });
      }

      static newWithAnchor(vote: WasmContract.VoteKind, anchor: WasmContract.Anchor): Promise<WasmContract.VotingProcedure> {
        return wrapByPromise(() => {
          const ret = WasmV4.VotingProcedure.new_with_anchor(vote, anchor.wasm);
          return new $outer.VotingProcedure(ret, $outer._ctx);
        });
      }

      voteKind(): Promise<WasmContract.VoteKind> {
        return wrapByPromise(() => {
          return this.wasm.vote_kind();
        });
      }

      anchor(): Promise<Optional<WasmContract.Anchor>> {
        return wrapByPromise(() => {
          const ret = this.wasm.anchor();
          if (ret == null) return undefined;
          return new $outer.Anchor(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.VotingProcedures> {
        return wrapByPromise(() => {
          const ret = WasmV4.VotingProcedures.from_bytes(bytes);
          return new $outer.VotingProcedures(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.VotingProcedures> {
        return wrapByPromise(() => {
          const ret = WasmV4.VotingProcedures.from_hex(hexStr);
          return new $outer.VotingProcedures(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.VotingProcedures> {
        return wrapByPromise(() => {
          const ret = WasmV4.VotingProcedures.from_json(json);
          return new $outer.VotingProcedures(ret, $outer._ctx);
        });
      }

      static new(): Promise<WasmContract.VotingProcedures> {
        return wrapByPromise(() => {
          const ret = WasmV4.VotingProcedures.new();
          return new $outer.VotingProcedures(ret, $outer._ctx);
        });
      }

      insert(voter: WasmContract.Voter, governanceActionId: WasmContract.GovernanceActionId, votingProcedure: WasmContract.VotingProcedure): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.insert(voter.wasm, governanceActionId.wasm, votingProcedure.wasm);
        });
      }

      get(voter: WasmContract.Voter, governanceActionId: WasmContract.GovernanceActionId): Promise<Optional<WasmContract.VotingProcedure>> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(voter.wasm, governanceActionId.wasm);
          if (ret == null) return undefined;
          return new $outer.VotingProcedure(ret, $outer._ctx);
        });
      }

      getVoters(): Promise<WasmContract.Voters> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_voters();
          return new $outer.Voters(ret, $outer._ctx);
        });
      }

      getGovernanceActionIdsByVoter(voter: WasmContract.Voter): Promise<WasmContract.GovernanceActionIds> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_governance_action_ids_by_voter(voter.wasm);
          return new $outer.GovernanceActionIds(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.VotingProposal> {
        return wrapByPromise(() => {
          const ret = WasmV4.VotingProposal.from_bytes(bytes);
          return new $outer.VotingProposal(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.VotingProposal> {
        return wrapByPromise(() => {
          const ret = WasmV4.VotingProposal.from_hex(hexStr);
          return new $outer.VotingProposal(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.VotingProposal> {
        return wrapByPromise(() => {
          const ret = WasmV4.VotingProposal.from_json(json);
          return new $outer.VotingProposal(ret, $outer._ctx);
        });
      }

      governanceAction(): Promise<WasmContract.GovernanceAction> {
        return wrapByPromise(() => {
          const ret = this.wasm.governance_action();
          return new $outer.GovernanceAction(ret, $outer._ctx);
        });
      }

      anchor(): Promise<WasmContract.Anchor> {
        return wrapByPromise(() => {
          const ret = this.wasm.anchor();
          return new $outer.Anchor(ret, $outer._ctx);
        });
      }

      rewardAccount(): Promise<WasmContract.RewardAddress> {
        return wrapByPromise(() => {
          const ret = this.wasm.reward_account();
          return new $outer.RewardAddress(ret, $outer._ctx);
        });
      }

      deposit(): Promise<WasmContract.BigNum> {
        return wrapByPromise(() => {
          const ret = this.wasm.deposit();
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      static new(governanceAction: WasmContract.GovernanceAction, anchor: WasmContract.Anchor, rewardAccount: WasmContract.RewardAddress, deposit: WasmContract.BigNum): Promise<WasmContract.VotingProposal> {
        return wrapByPromise(() => {
          const ret = WasmV4.VotingProposal.new(governanceAction.wasm, anchor.wasm, rewardAccount.wasm, deposit.wasm);
          return new $outer.VotingProposal(ret, $outer._ctx);
        });
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

      static new(): Promise<WasmContract.VotingProposalBuilder> {
        return wrapByPromise(() => {
          const ret = WasmV4.VotingProposalBuilder.new();
          return new $outer.VotingProposalBuilder(ret, $outer._ctx);
        });
      }

      add(proposal: WasmContract.VotingProposal): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add(proposal.wasm);
        });
      }

      addWithPlutusWitness(proposal: WasmContract.VotingProposal, witness: WasmContract.PlutusWitness): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add_with_plutus_witness(proposal.wasm, witness.wasm);
        });
      }

      getPlutusWitnesses(): Promise<WasmContract.PlutusWitnesses> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_plutus_witnesses();
          return new $outer.PlutusWitnesses(ret, $outer._ctx);
        });
      }

      getRefInputs(): Promise<WasmContract.TransactionInputs> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_ref_inputs();
          return new $outer.TransactionInputs(ret, $outer._ctx);
        });
      }

      hasPlutusScripts(): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.has_plutus_scripts();
        });
      }

      build(): Promise<WasmContract.VotingProposals> {
        return wrapByPromise(() => {
          const ret = this.wasm.build();
          return new $outer.VotingProposals(ret, $outer._ctx);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.VotingProposals> {
        return wrapByPromise(() => {
          const ret = WasmV4.VotingProposals.from_bytes(bytes);
          return new $outer.VotingProposals(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.VotingProposals> {
        return wrapByPromise(() => {
          const ret = WasmV4.VotingProposals.from_hex(hexStr);
          return new $outer.VotingProposals(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.VotingProposals> {
        return wrapByPromise(() => {
          const ret = WasmV4.VotingProposals.from_json(json);
          return new $outer.VotingProposals(ret, $outer._ctx);
        });
      }

      static new(): Promise<WasmContract.VotingProposals> {
        return wrapByPromise(() => {
          const ret = WasmV4.VotingProposals.new();
          return new $outer.VotingProposals(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      get(index: number): Promise<WasmContract.VotingProposal> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(index);
          return new $outer.VotingProposal(ret, $outer._ctx);
        });
      }

      add(proposal: WasmContract.VotingProposal): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add(proposal.wasm);
        });
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
        return wrapByPromise(() => {
          return this.wasm.to_bytes();
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<WasmContract.Withdrawals> {
        return wrapByPromise(() => {
          const ret = WasmV4.Withdrawals.from_bytes(bytes);
          return new $outer.Withdrawals(ret, $outer._ctx);
        });
      }

      toHex(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_hex();
        });
      }

      static fromHex(hexStr: string): Promise<WasmContract.Withdrawals> {
        return wrapByPromise(() => {
          const ret = WasmV4.Withdrawals.from_hex(hexStr);
          return new $outer.Withdrawals(ret, $outer._ctx);
        });
      }

      toJson(): Promise<string> {
        return wrapByPromise(() => {
          return this.wasm.to_json();
        });
      }

      static fromJson(json: string): Promise<WasmContract.Withdrawals> {
        return wrapByPromise(() => {
          const ret = WasmV4.Withdrawals.from_json(json);
          return new $outer.Withdrawals(ret, $outer._ctx);
        });
      }

      static new(): Promise<WasmContract.Withdrawals> {
        return wrapByPromise(() => {
          const ret = WasmV4.Withdrawals.new();
          return new $outer.Withdrawals(ret, $outer._ctx);
        });
      }

      len(): Promise<number> {
        return wrapByPromise(() => {
          return this.wasm.len();
        });
      }

      insert(key: WasmContract.RewardAddress, value: WasmContract.BigNum): Promise<Optional<WasmContract.BigNum>> {
        return wrapByPromise(() => {
          const ret = this.wasm.insert(key.wasm, value.wasm);
          if (ret == null) return undefined;
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      get(key: WasmContract.RewardAddress): Promise<Optional<WasmContract.BigNum>> {
        return wrapByPromise(() => {
          const ret = this.wasm.get(key.wasm);
          if (ret == null) return undefined;
          return new $outer.BigNum(ret, $outer._ctx);
        });
      }

      keys(): Promise<WasmContract.RewardAddresses> {
        return wrapByPromise(() => {
          const ret = this.wasm.keys();
          return new $outer.RewardAddresses(ret, $outer._ctx);
        });
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

      static new(): Promise<WasmContract.WithdrawalsBuilder> {
        return wrapByPromise(() => {
          const ret = WasmV4.WithdrawalsBuilder.new();
          return new $outer.WithdrawalsBuilder(ret, $outer._ctx);
        });
      }

      add(address: WasmContract.RewardAddress, coin: WasmContract.BigNum): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add(address.wasm, coin.wasm);
        });
      }

      addWithPlutusWitness(address: WasmContract.RewardAddress, coin: WasmContract.BigNum, witness: WasmContract.PlutusWitness): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add_with_plutus_witness(address.wasm, coin.wasm, witness.wasm);
        });
      }

      addWithNativeScript(address: WasmContract.RewardAddress, coin: WasmContract.BigNum, nativeScriptSource: WasmContract.NativeScriptSource): Promise<void> {
        return wrapByPromise(() => {
          return this.wasm.add_with_native_script(address.wasm, coin.wasm, nativeScriptSource.wasm);
        });
      }

      getPlutusWitnesses(): Promise<WasmContract.PlutusWitnesses> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_plutus_witnesses();
          return new $outer.PlutusWitnesses(ret, $outer._ctx);
        });
      }

      getRefInputs(): Promise<WasmContract.TransactionInputs> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_ref_inputs();
          return new $outer.TransactionInputs(ret, $outer._ctx);
        });
      }

      getNativeScripts(): Promise<WasmContract.NativeScripts> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_native_scripts();
          return new $outer.NativeScripts(ret, $outer._ctx);
        });
      }

      getTotalWithdrawals(): Promise<WasmContract.Value> {
        return wrapByPromise(() => {
          const ret = this.wasm.get_total_withdrawals();
          return new $outer.Value(ret, $outer._ctx);
        });
      }

      hasPlutusScripts(): Promise<boolean> {
        return wrapByPromise(() => {
          return this.wasm.has_plutus_scripts();
        });
      }

      build(): Promise<WasmContract.Withdrawals> {
        return wrapByPromise(() => {
          const ret = this.wasm.build();
          return new $outer.Withdrawals(ret, $outer._ctx);
        });
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
