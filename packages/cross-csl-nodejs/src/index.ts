import * as WasmV4 from '@emurgo/cardano-serialization-lib-nodejs';
import * as WasmContract from '@emurgo/cross-csl-core';

const { Ptr, WasmProxy } = WasmContract;

export const init = (ctx: string): WasmContract.WasmModuleProxy => {
  return new NodeJsWasmModuleProxy(ctx);
};

export class NodeJsWasmModuleProxy implements WasmContract.WasmModuleProxy {
  private _ctx: string;

  encryptWithPassword(
    password: string,
    salt: string,
    nonce: string,
    data: string
  ) {
    return Promise.resolve(
      WasmV4.encrypt_with_password(password, salt, nonce, data)
    );
  }

  decryptWithPassword(password: string, salt: string) {
    return Promise.resolve(WasmV4.decrypt_with_password(password, salt));
  }

  encodeJsonStrToMetadatum(json: string, schema: number) {
    const wasm = WasmV4.encode_json_str_to_metadatum(json, schema);
    return Promise.resolve(new this.TransactionMetadatum(wasm, this._ctx));
  }

  minAdaRequired(
    value: WasmContract.Value,
    hasDataHash: boolean,
    coinsPerUtxoWord: WasmContract.BigNum
  ) {
    return Promise.resolve(
      new this.BigNum(
        WasmV4.min_ada_required(value.wasm, hasDataHash, coinsPerUtxoWord.wasm),
        this._ctx
      )
    );
  }

  hashTransaction(txBody: WasmContract.TransactionBody) {
    return Promise.resolve(
      new this.TransactionHash(WasmV4.hash_transaction(txBody.wasm), this._ctx)
    );
  }

  makeVkeyWitness(
    txBodyHash: WasmContract.TransactionHash,
    sk: WasmContract.PrivateKey
  ) {
    return Promise.resolve(
      new this.Vkeywitness(
        WasmV4.make_vkey_witness(txBodyHash.wasm, sk.wasm),
        this._ctx
      )
    );
  }

  makeIcarusBootstrapWitness(
    txBodyHash: WasmContract.TransactionHash,
    addr: WasmContract.ByronAddress,
    key: WasmContract.Bip32PrivateKey
  ) {
    return Promise.resolve(
      new this.BootstrapWitness(
        WasmV4.make_icarus_bootstrap_witness(
          txBodyHash.wasm,
          addr.wasm,
          key.wasm
        ),
        this._ctx
      )
    );
  }

  decodeMetadatumToJsonStr(
    metadatum: WasmContract.TransactionMetadatum,
    schema: number
  ) {
    return Promise.resolve(
      WasmV4.decode_metadatum_to_json_str(metadatum.wasm, schema)
    );
  }

  constructor(ctx: string) {
    this._ctx = ctx;
  }

  public BigNum = (() => {
    const $outer = this;

    class BigNum extends Ptr<WasmV4.BigNum> implements WasmContract.BigNum {
      toBytes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_bytes());
          } catch (e) {
            reject(e);
          }
        });
      }
      toStr(): Promise<string> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_str());
          } catch (e) {
            reject(e);
          }
        });
      }
      checkedMul(other: BigNum): Promise<BigNum> {
        return new Promise((resolve, reject) => {
          try {
            const wasmBigNum = this.wasm.checked_mul(other.wasm);
            resolve(new BigNum(wasmBigNum, $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }
      checkedAdd(other: BigNum): Promise<BigNum> {
        return new Promise((resolve, reject) => {
          try {
            const wasmBigNum = this.wasm.checked_add(other.wasm);
            resolve(new BigNum(wasmBigNum, $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }
      checkedSub(other: BigNum): Promise<BigNum> {
        return new Promise((resolve, reject) => {
          try {
            const wasmBigNum = this.wasm.checked_sub(other.wasm);
            resolve(new BigNum(wasmBigNum, $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }
      clampedSub(other: BigNum): Promise<BigNum> {
        return new Promise((resolve, reject) => {
          try {
            const wasmBigNum = this.wasm.clamped_sub(other.wasm);
            resolve(new BigNum(wasmBigNum, $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }
      compare(rhs_value: BigNum): Promise<number> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.compare(rhs_value.wasm));
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<BigNum> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new BigNum(WasmV4.BigNum.from_bytes(bytes), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromStr(string: string): Promise<BigNum> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new BigNum(WasmV4.BigNum.from_str(string), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return BigNum;
  })();

  public LinearFee = (() => {
    const $outer = this;

    class LinearFee
      extends Ptr<WasmV4.LinearFee>
      implements WasmContract.LinearFee {
      constant(): Promise<WasmContract.BigNum> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.BigNum(this.wasm.constant(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }
      coefficient(): Promise<WasmContract.BigNum> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.BigNum(this.wasm.coefficient(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }
      static new(
        coefficient: WasmContract.BigNum,
        constant: WasmContract.BigNum
      ): Promise<LinearFee> {
        return new Promise((resolve, reject) => {
          try {
            const wasmLinearFee = WasmV4.LinearFee.new(
              coefficient.wasm,
              constant.wasm
            );
            resolve(new LinearFee(wasmLinearFee, $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return LinearFee;
  })();

  public GeneralTransactionMetadata = (() => {
    const $outer = this;

    class GeneralTransactionMetadata
      extends Ptr<WasmV4.GeneralTransactionMetadata>
      implements WasmContract.GeneralTransactionMetadata {
      toBytes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_bytes());
          } catch (e) {
            reject(e);
          }
        });
      }

      len(): Promise<number> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.len());
          } catch (e) {
            reject(e);
          }
        });
      }

      insert(
        key: WasmContract.BigNum,
        value: WasmContract.TransactionMetadatum
      ): Promise<WasmContract.TransactionMetadatum> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.TransactionMetadatum(
                this.wasm.insert(key.wasm, value.wasm),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      get(
        key: WasmContract.BigNum
      ): Promise<WasmContract.TransactionMetadatum> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.TransactionMetadatum(
                this.wasm.get(key.wasm),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      keys(): Promise<WasmContract.TransactionMetadatumLabels> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.TransactionMetadatumLabels(
                this.wasm.keys(),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static new(): Promise<GeneralTransactionMetadata> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new GeneralTransactionMetadata(
                WasmV4.GeneralTransactionMetadata.new(),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<GeneralTransactionMetadata> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new GeneralTransactionMetadata(
                WasmV4.GeneralTransactionMetadata.from_bytes(bytes),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return GeneralTransactionMetadata;
  })();

  public TransactionMetadatumLabels = (() => {
    const $outer = this;

    class TransactionMetadatumLabels
      extends Ptr<WasmV4.TransactionMetadatumLabels>
      implements WasmContract.TransactionMetadatumLabels {
      toBytes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_bytes());
          } catch (e) {
            reject(e);
          }
        });
      }

      len(): Promise<number> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.len());
          } catch (e) {
            reject(e);
          }
        });
      }

      get(index: number): Promise<WasmContract.BigNum> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.BigNum(this.wasm.get(index), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      add(elem: WasmContract.BigNum): Promise<void> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.add(elem.wasm));
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<TransactionMetadatumLabels> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new TransactionMetadatumLabels(
                WasmV4.TransactionMetadatumLabels.from_bytes(bytes),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static new(): Promise<TransactionMetadatumLabels> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new TransactionMetadatumLabels(
                WasmV4.TransactionMetadatumLabels.new(),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return TransactionMetadatumLabels;
  })();

  public MetadataMap = (() => {
    const $outer = this;

    class MetadataMap
      extends Ptr<WasmV4.MetadataMap>
      implements WasmContract.MetadataMap {
      toBytes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_bytes());
          } catch (e) {
            reject(e);
          }
        });
      }

      len(): Promise<number> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.len());
          } catch (e) {
            reject(e);
          }
        });
      }

      insert(
        key: WasmContract.TransactionMetadatum,
        value: WasmContract.TransactionMetadatum
      ): Promise<WasmContract.TransactionMetadatum | undefined> {
        return new Promise((resolve, reject) => {
          try {
            const wasm = this.wasm.insert(key.wasm, value.wasm);
            if (wasm) {
              resolve(new $outer.TransactionMetadatum(wasm, $outer._ctx));
            } else {
              resolve(undefined);
            }
          } catch (e) {
            reject(e);
          }
        });
      }

      insertStr(
        key: string,
        value: WasmContract.TransactionMetadatum
      ): Promise<WasmContract.TransactionMetadatum | undefined> {
        return new Promise((resolve, reject) => {
          try {
            const wasm = this.wasm.insert_str(key, value.wasm);
            if (wasm) {
              resolve(new $outer.TransactionMetadatum(wasm, $outer._ctx));
            } else {
              resolve(undefined);
            }
          } catch (e) {
            reject(e);
          }
        });
      }

      insertI32(
        key: number,
        value: WasmContract.TransactionMetadatum
      ): Promise<WasmContract.TransactionMetadatum | undefined> {
        return new Promise((resolve, reject) => {
          try {
            const wasm = this.wasm.insert_i32(key, value.wasm);
            if (wasm) {
              resolve(new $outer.TransactionMetadatum(wasm, $outer._ctx));
            } else {
              resolve(undefined);
            }
          } catch (e) {
            reject(e);
          }
        });
      }

      get(
        key: WasmContract.TransactionMetadatum
      ): Promise<WasmContract.TransactionMetadatum> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.TransactionMetadatum(
                this.wasm.get(key.wasm),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      getStr(key: string): Promise<WasmContract.TransactionMetadatum> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.TransactionMetadatum(
                this.wasm.get_str(key),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      getI32(key: number): Promise<WasmContract.TransactionMetadatum> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.TransactionMetadatum(
                this.wasm.get_i32(key),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      has(key: WasmContract.TransactionMetadatum): Promise<boolean> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.has(key.wasm));
          } catch (e) {
            reject(e);
          }
        });
      }

      keys(): Promise<WasmContract.MetadataList> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.MetadataList(this.wasm.keys(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<MetadataMap> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new MetadataMap(WasmV4.MetadataMap.from_bytes(bytes), $outer._ctx)
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static new(): Promise<MetadataMap> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new MetadataMap(WasmV4.MetadataMap.new(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return MetadataMap;
  })();

  public Int = (() => {
    const $outer = this;

    class Int extends Ptr<WasmV4.Int> implements WasmContract.Int {
      isPositive(): Promise<boolean> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.is_positive());
          } catch (e) {
            reject(e);
          }
        });
      }

      asPositive(): Promise<WasmContract.BigNum | undefined> {
        return new Promise((resolve, reject) => {
          try {
            const wasm = this.wasm.as_positive();
            if (wasm) {
              resolve(new $outer.BigNum(wasm, $outer._ctx));
            } else {
              resolve(undefined);
            }
          } catch (e) {
            reject(e);
          }
        });
      }

      asNegative(): Promise<WasmContract.BigNum | undefined> {
        return new Promise((resolve, reject) => {
          try {
            const wasm = this.wasm.as_negative();
            if (wasm) {
              resolve(new $outer.BigNum(wasm, $outer._ctx));
            } else {
              resolve(undefined);
            }
          } catch (e) {
            reject(e);
          }
        });
      }

      asI32(): Promise<number | undefined> {
        return new Promise((resolve, reject) => {
          try {
            const wasm = this.wasm.as_i32();
            if (wasm) {
              resolve(wasm);
            } else {
              resolve(undefined);
            }
          } catch (e) {
            reject(e);
          }
        });
      }

      static new(x: WasmContract.BigNum): Promise<Int> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new Int(WasmV4.Int.new(x.wasm), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      static newNegative(x: WasmContract.BigNum): Promise<Int> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new Int(WasmV4.Int.new_negative(x.wasm), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      static newI32(x: number): Promise<Int> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new Int(WasmV4.Int.new_i32(x), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return Int;
  })();

  public TransactionMetadatum = (() => {
    const $outer = this;

    class TransactionMetadatum
      extends Ptr<WasmV4.TransactionMetadatum>
      implements WasmContract.TransactionMetadatum {
      toBytes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_bytes());
          } catch (e) {
            reject(e);
          }
        });
      }

      kind(): Promise<number> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.kind());
          } catch (e) {
            reject(e);
          }
        });
      }

      asMap(): Promise<WasmContract.MetadataMap> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.MetadataMap(this.wasm.as_map(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      asList(): Promise<WasmContract.MetadataList> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.MetadataList(this.wasm.as_list(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      asInt(): Promise<WasmContract.Int> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.Int(this.wasm.as_int(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      asBytes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.as_bytes());
          } catch (e) {
            reject(e);
          }
        });
      }

      asText(): Promise<string> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.as_text());
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<TransactionMetadatum> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new TransactionMetadatum(
                WasmV4.TransactionMetadatum.from_bytes(bytes),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static newMap(
        map: WasmContract.MetadataMap
      ): Promise<TransactionMetadatum> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new TransactionMetadatum(
                WasmV4.TransactionMetadatum.new_map(map.wasm),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static newList(
        list: WasmContract.MetadataList
      ): Promise<TransactionMetadatum> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new TransactionMetadatum(
                WasmV4.TransactionMetadatum.new_list(list.wasm),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static newInt(int: WasmContract.Int): Promise<TransactionMetadatum> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new TransactionMetadatum(
                WasmV4.TransactionMetadatum.new_int(int.wasm),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static newBytes(bytes: Uint8Array): Promise<TransactionMetadatum> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new TransactionMetadatum(
                WasmV4.TransactionMetadatum.new_bytes(bytes),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static newText(text: string): Promise<TransactionMetadatum> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new TransactionMetadatum(
                WasmV4.TransactionMetadatum.new_text(text),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return TransactionMetadatum;
  })();

  public AuxiliaryData = (() => {
    const $outer = this;

    class AuxiliaryData
      extends Ptr<WasmV4.AuxiliaryData>
      implements WasmContract.AuxiliaryData {
      toBytes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_bytes());
          } catch (e) {
            reject(e);
          }
        });
      }

      metadata(): Promise<WasmContract.GeneralTransactionMetadata> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.GeneralTransactionMetadata(
                this.wasm.metadata(),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      setMetadata(
        metadata: WasmContract.GeneralTransactionMetadata
      ): Promise<void> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.set_metadata(metadata.wasm));
          } catch (e) {
            reject(e);
          }
        });
      }

      nativeScripts(): Promise<WasmContract.NativeScripts | undefined> {
        return new Promise((resolve, reject) => {
          try {
            const wasm = this.wasm.native_scripts();
            if (wasm) {
              resolve(new $outer.NativeScripts(wasm, $outer._ctx));
            } else {
              resolve(undefined);
            }
          } catch (e) {
            reject(e);
          }
        });
      }

      setNativeScripts(
        native_scripts: WasmContract.NativeScripts
      ): Promise<void> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.set_native_scripts(native_scripts.wasm));
          } catch (e) {
            reject(e);
          }
        });
      }

      plutusScripts(): Promise<WasmContract.PlutusScripts | undefined> {
        return new Promise((resolve, reject) => {
          try {
            const wasm = this.wasm.plutus_scripts();
            if (wasm) {
              resolve(new $outer.PlutusScripts(wasm, $outer._ctx));
            } else {
              resolve(undefined);
            }
          } catch (e) {
            reject(e);
          }
        });
      }

      setPlutusScripts(
        plutus_scripts: WasmContract.PlutusScripts
      ): Promise<void> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.set_plutus_scripts(plutus_scripts.wasm));
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<AuxiliaryData> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new AuxiliaryData(
                WasmV4.AuxiliaryData.from_bytes(bytes),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static new(
        metadata?: WasmContract.GeneralTransactionMetadata
      ): Promise<AuxiliaryData> {
        return new Promise((resolve, reject) => {
          try {
            const wasm = WasmV4.AuxiliaryData.new();
            if (metadata) {
              wasm.set_metadata(metadata.wasm);
            }
            resolve(new AuxiliaryData(wasm, $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      static empty(): Promise<AuxiliaryData> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new AuxiliaryData(undefined, $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return AuxiliaryData;
  })();

  public AssetName = (() => {
    const $outer = this;

    class AssetName
      extends Ptr<WasmV4.AssetName>
      implements WasmContract.AssetName {
      toBytes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_bytes());
          } catch (e) {
            reject(e);
          }
        });
      }

      name(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.name());
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<AssetName> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new AssetName(WasmV4.AssetName.from_bytes(bytes), $outer._ctx)
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static new(name: Uint8Array): Promise<AssetName> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new AssetName(WasmV4.AssetName.new(name), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return AssetName;
  })();

  public AssetNames = (() => {
    const $outer = this;

    class AssetNames
      extends Ptr<WasmV4.AssetNames>
      implements WasmContract.AssetNames {
      len(): Promise<number> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.len());
          } catch (e) {
            reject(e);
          }
        });
      }

      get(index: number): Promise<WasmContract.AssetName> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.AssetName(this.wasm.get(index), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      add(item: WasmContract.AssetName): Promise<void> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.add(item.wasm));
          } catch (e) {
            reject(e);
          }
        });
      }

      static new(): Promise<AssetNames> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new AssetNames(WasmV4.AssetNames.new(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return AssetNames;
  })();

  public Assets = (() => {
    const $outer = this;

    class Assets extends Ptr<WasmV4.Assets> implements WasmContract.Assets {
      len(): Promise<number> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.len());
          } catch (e) {
            reject(e);
          }
        });
      }

      insert(
        key: WasmContract.AssetName,
        value: WasmContract.BigNum
      ): Promise<WasmContract.BigNum> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.BigNum(
                this.wasm.insert(key.wasm, value.wasm),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      get(key: WasmContract.AssetName): Promise<WasmContract.BigNum> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.BigNum(this.wasm.get(key.wasm), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      keys(): Promise<WasmContract.AssetNames> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.AssetNames(this.wasm.keys(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      static new(): Promise<Assets> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new Assets(WasmV4.Assets.new(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return Assets;
  })();

  public ScriptHash = (() => {
    const $outer = this;

    class ScriptHash
      extends WasmProxy<WasmV4.ScriptHash>
      implements WasmContract.ScriptHash {
      toBytes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_bytes());
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<ScriptHash> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new ScriptHash(WasmV4.ScriptHash.from_bytes(bytes), $outer._ctx)
            );
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return ScriptHash;
  })();

  public ScriptHashes = (() => {
    const $outer = this;

    class ScriptHashes
      extends WasmProxy<WasmV4.ScriptHashes>
      implements WasmContract.ScriptHashes {
      toBytes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_bytes());
          } catch (e) {
            reject(e);
          }
        });
      }

      len(): Promise<number> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.len());
          } catch (e) {
            reject(e);
          }
        });
      }

      get(index: number): Promise<WasmContract.ScriptHash> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.ScriptHash(this.wasm.get(index), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      add(item: WasmContract.ScriptHash): Promise<void> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.add(item.wasm));
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<ScriptHashes> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new ScriptHashes(
                WasmV4.ScriptHashes.from_bytes(bytes),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static new(): Promise<ScriptHashes> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new ScriptHashes(WasmV4.ScriptHashes.new(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return ScriptHashes;
  })();

  public MultiAsset = (() => {
    const $outer = this;

    class MultiAsset
      extends Ptr<WasmV4.MultiAsset>
      implements WasmContract.MultiAsset {
      len(): Promise<number> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.len());
          } catch (e) {
            reject(e);
          }
        });
      }

      insert(
        key: WasmContract.ScriptHash,
        value: WasmContract.Assets
      ): Promise<WasmContract.Assets> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.Assets(
                this.wasm.insert(key.wasm, value.wasm),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      get(key: WasmContract.ScriptHash): Promise<WasmContract.Assets> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.Assets(this.wasm.get(key.wasm), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      keys(): Promise<WasmContract.ScriptHashes> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.ScriptHashes(this.wasm.keys(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      sub(rhs: MultiAsset): Promise<MultiAsset> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new MultiAsset(this.wasm.sub(rhs.wasm), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      static new(): Promise<MultiAsset> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new MultiAsset(WasmV4.MultiAsset.new(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return MultiAsset;
  })();

  public Ed25519KeyHash = (() => {
    const $outer = this;

    class Ed25519KeyHash
      extends Ptr<WasmV4.Ed25519KeyHash>
      implements WasmContract.Ed25519KeyHash {
      toBytes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_bytes());
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<Ed25519KeyHash> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new Ed25519KeyHash(
                WasmV4.Ed25519KeyHash.from_bytes(bytes),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return Ed25519KeyHash;
  })();

  public TransactionHash = (() => {
    const $outer = this;

    class TransactionHash
      extends Ptr<WasmV4.TransactionHash>
      implements WasmContract.TransactionHash {
      toBytes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_bytes());
          } catch (e) {
            reject(e);
          }
        });
        return Promise.resolve(this.wasm.to_bytes());
      }

      static fromBytes(bytes: Uint8Array): Promise<TransactionHash> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new TransactionHash(
                WasmV4.TransactionHash.from_bytes(bytes),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return TransactionHash;
  })();

  public TransactionInput = (() => {
    const $outer = this;

    class TransactionInput
      extends Ptr<WasmV4.TransactionInput>
      implements WasmContract.TransactionInput {
      toBytes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_bytes());
          } catch (e) {
            reject(e);
          }
        });
      }

      transactionId(): Promise<WasmContract.TransactionHash> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.TransactionHash(
                this.wasm.transaction_id(),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      index(): Promise<number> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.index());
          } catch (e) {
            reject(e);
          }
        });
      }

      static new(
        transactionId: WasmContract.TransactionHash,
        index: number
      ): Promise<TransactionInput> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new TransactionInput(
                WasmV4.TransactionInput.new(transactionId.wasm, index),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<TransactionInput> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new TransactionInput(
                WasmV4.TransactionInput.from_bytes(bytes),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return TransactionInput;
  })();

  public Value = (() => {
    const $outer = this;

    class Value extends Ptr<WasmV4.Value> implements WasmContract.Value {
      coin(): Promise<WasmContract.BigNum> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.BigNum(this.wasm.coin(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      setCoin(coin: WasmContract.BigNum): Promise<void> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.set_coin(coin.wasm));
          } catch (e) {
            reject(e);
          }
        });
      }

      multiasset(): Promise<WasmContract.MultiAsset> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.MultiAsset(this.wasm.multiasset(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      setMultiasset(multiasset: WasmContract.MultiAsset): Promise<void> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.set_multiasset(multiasset.wasm));
          } catch (e) {
            reject(e);
          }
        });
      }

      checkedAdd(rhs: Value): Promise<Value> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new Value(this.wasm.checked_add(rhs.wasm), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      checkedSub(rhs: Value): Promise<Value> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new Value(this.wasm.checked_sub(rhs.wasm), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      clampedSub(rhs: Value): Promise<Value> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new Value(this.wasm.clamped_sub(rhs.wasm), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      compare(rhs: Value): Promise<number | undefined> {
        return new Promise((resolve, reject) => {
          try {
            const wasm = this.wasm.compare(rhs.wasm);
            if (wasm || wasm === 0) {
              resolve(wasm);
            } else {
              resolve(undefined);
            }
          } catch (e) {
            reject(e);
          }
        });
      }

      static new(coin: WasmContract.BigNum): Promise<Value> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new Value(WasmV4.Value.new(coin.wasm), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return Value;
  })();

  public Address = (() => {
    const $outer = this;

    class Address extends Ptr<WasmV4.Address> implements WasmContract.Address {
      toBytes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_bytes());
          } catch (e) {
            reject(e);
          }
        });
      }

      toBech32(prefix?: string): Promise<string> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_bech32(prefix));
          } catch (e) {
            reject(e);
          }
        });
      }

      networkId(): Promise<number> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.network_id());
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<Address> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new Address(WasmV4.Address.from_bytes(bytes), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromBech32(string: string): Promise<Address> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new Address(WasmV4.Address.from_bech32(string), $outer._ctx)
            );
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return Address;
  })();

  public PublicKey = (() => {
    const $outer = this;

    class PublicKey
      extends Ptr<WasmV4.PublicKey>
      implements WasmContract.PublicKey {
      toBech32(): Promise<string> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_bech32());
          } catch (e) {
            reject(e);
          }
        });
      }

      asBytes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.as_bytes());
          } catch (e) {
            reject(e);
          }
        });
      }

      hash(): Promise<WasmContract.Ed25519KeyHash> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.Ed25519KeyHash(this.wasm.hash(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromBech32(bech32_str: string): Promise<PublicKey> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new PublicKey(
                WasmV4.PublicKey.from_bech32(bech32_str),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<PublicKey> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new PublicKey(WasmV4.PublicKey.from_bytes(bytes), $outer._ctx)
            );
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return PublicKey;
  })();

  public Bip32PublicKey = (() => {
    const $outer = this;

    class Bip32PublicKey
      extends Ptr<WasmV4.Bip32PublicKey>
      implements WasmContract.Bip32PublicKey {
      derive(index: number): Promise<Bip32PublicKey> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new Bip32PublicKey(this.wasm.derive(index), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      toRawKey(): Promise<WasmContract.PublicKey> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.PublicKey(this.wasm.to_raw_key(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      asBytes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.as_bytes());
          } catch (e) {
            reject(e);
          }
        });
      }

      toBech32(): Promise<string> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_bech32());
          } catch (e) {
            reject(e);
          }
        });
      }

      chaincode(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.chaincode());
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromBech32(bech32_str: string): Promise<Bip32PublicKey> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new Bip32PublicKey(
                WasmV4.Bip32PublicKey.from_bech32(bech32_str),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<Bip32PublicKey> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new Bip32PublicKey(
                WasmV4.Bip32PublicKey.from_bytes(bytes),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return Bip32PublicKey;
  })();

  public PrivateKey = (() => {
    const $outer = this;

    class PrivateKey
      extends Ptr<WasmV4.PrivateKey>
      implements WasmContract.PrivateKey {
      toPublic(): Promise<WasmContract.PublicKey> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.PublicKey(this.wasm.to_public(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      toBech32(): Promise<string> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_bech32());
          } catch (e) {
            reject(e);
          }
        });
      }

      asBytes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.as_bytes());
          } catch (e) {
            reject(e);
          }
        });
      }

      sign(message: Uint8Array): Promise<WasmContract.Ed25519Signature> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.Ed25519Signature(this.wasm.sign(message), $outer._ctx)
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromExtendedBytes(bytes: Uint8Array): Promise<PrivateKey> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new PrivateKey(
                WasmV4.PrivateKey.from_extended_bytes(bytes),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromNormalBytes(bytes: Uint8Array): Promise<PrivateKey> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new PrivateKey(
                WasmV4.PrivateKey.from_normal_bytes(bytes),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static generateEd25519(): Promise<PrivateKey> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new PrivateKey(WasmV4.PrivateKey.generate_ed25519(), $outer._ctx)
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static generateEd25519extended(): Promise<PrivateKey> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new PrivateKey(
                WasmV4.PrivateKey.generate_ed25519extended(),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return PrivateKey;
  })();

  public Bip32PrivateKey = (() => {
    const $outer = this;

    class Bip32PrivateKey
      extends Ptr<WasmV4.Bip32PrivateKey>
      implements WasmContract.Bip32PrivateKey {
      derive(index: number): Promise<Bip32PrivateKey> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new Bip32PrivateKey(this.wasm.derive(index), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      toRawKey(): Promise<WasmContract.PrivateKey> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.PrivateKey(this.wasm.to_raw_key(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      toPublic(): Promise<WasmContract.Bip32PublicKey> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.Bip32PublicKey(this.wasm.to_public(), $outer._ctx)
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      asBytes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.as_bytes());
          } catch (e) {
            reject(e);
          }
        });
      }

      toBech32(): Promise<string> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_bech32());
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromBip39Entropy(
        entropy: Uint8Array,
        password: Uint8Array
      ): Promise<Bip32PrivateKey> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new Bip32PrivateKey(
                WasmV4.Bip32PrivateKey.from_bip39_entropy(entropy, password),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromBech32(bech32Str: string): Promise<Bip32PrivateKey> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new Bip32PrivateKey(
                WasmV4.Bip32PrivateKey.from_bech32(bech32Str),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<Bip32PrivateKey> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new Bip32PrivateKey(
                WasmV4.Bip32PrivateKey.from_bytes(bytes),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static generateEd25519Bip32(): Promise<Bip32PrivateKey> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new Bip32PrivateKey(
                WasmV4.Bip32PrivateKey.generate_ed25519_bip32(),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return Bip32PrivateKey;
  })();

  public ByronAddress = (() => {
    const $outer = this;

    class ByronAddress
      extends Ptr<WasmV4.ByronAddress>
      implements WasmContract.ByronAddress {
      toBase58(): Promise<string> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_base58());
          } catch (e) {
            reject(e);
          }
        });
      }

      toAddress(): Promise<WasmContract.Address> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.Address(this.wasm.to_address(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      byronProtocolMagic(): Promise<number> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.byron_protocol_magic());
          } catch (e) {
            reject(e);
          }
        });
      }

      attributes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.attributes());
          } catch (e) {
            reject(e);
          }
        });
      }

      static icarusFromKey(
        key: WasmContract.Bip32PublicKey,
        protocolMagic: number
      ): Promise<ByronAddress> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new ByronAddress(
                WasmV4.ByronAddress.icarus_from_key(key.wasm, protocolMagic),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromBase58(string: string): Promise<ByronAddress> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new ByronAddress(
                WasmV4.ByronAddress.from_base58(string),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static isValid(string: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
          try {
            resolve(WasmV4.ByronAddress.is_valid(string));
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromAddress(addr: WasmContract.Address): Promise<ByronAddress> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new ByronAddress(
                WasmV4.ByronAddress.from_address(addr.wasm),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return ByronAddress;
  })();

  public TransactionOutput = (() => {
    const $outer = this;

    class TransactionOutput
      extends Ptr<WasmV4.TransactionOutput>
      implements WasmContract.TransactionOutput {

      static fromBytes(bytes: Uint8Array): Promise<TransactionOutput> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new TransactionOutput(
                WasmV4.TransactionOutput.from_bytes(bytes),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      toBytes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_bytes());
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromHex(hex: string): Promise<TransactionOutput> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new TransactionOutput(
                WasmV4.TransactionOutput.from_hex(hex),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      toHex(): Promise<string> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_hex());
          } catch (e) {
            reject(e);
          }
        });
      }

      address(): Promise<WasmContract.Address> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.Address(this.wasm.address(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      amount(): Promise<WasmContract.Value> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.Value(this.wasm.amount(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      hasPlutusData(): Promise<boolean> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.has_plutus_data());
          } catch (e) {
            reject(e);
          }
        });
      }

      setPlutusData(plutusData: WasmContract.PlutusData): Promise<void> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.set_plutus_data(plutusData.wasm));
          } catch (e) {
            reject(e);
          }
        });
      }

      plutusData(): Promise<WasmContract.PlutusData | undefined> {
        return new Promise((resolve, reject) => {
          try {
            const wasm = this.wasm.plutus_data();
            if (wasm) {
              resolve(new $outer.PlutusData(wasm, $outer._ctx));
            } else {
              resolve(undefined);
            }
          } catch (e) {
            reject(e);
          }
        });
      }

      hasDataHash(): Promise<boolean> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.has_data_hash());
          } catch (e) {
            reject(e);
          }
        });
      }

      setDataHash(dataHash: WasmContract.DataHash): Promise<void> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              this.wasm.set_data_hash(dataHash.wasm)
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      dataHash(): Promise<WasmContract.DataHash | undefined> {
        return new Promise((resolve, reject) => {
          try {
            const wasm = this.wasm.data_hash();
            if (wasm) {
              resolve(new $outer.DataHash(wasm, $outer._ctx));
            } else {
              resolve(undefined);
            }
          } catch (e) {
            reject(e);
          }
        });
      }

      static new(
        address: WasmContract.Address,
        amount: WasmContract.Value,
      ): Promise<TransactionOutput> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new TransactionOutput(
                WasmV4.TransactionOutput.new(address.wasm, amount.wasm),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return TransactionOutput;
  })();

  public DataHash = (() => {
    const $outer = this;

    class DataHash
      extends Ptr<WasmV4.DataHash>
      implements WasmContract.DataHash {
      static fromBytes(bytes: Uint8Array): Promise<DataHash> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new DataHash(
                WasmV4.DataHash.from_bytes(bytes),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      toBytes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_bytes());
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromHex(hex: string): Promise<WasmContract.DataHash> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new DataHash(
                WasmV4.DataHash.from_hex(hex),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      toHex(): Promise<string> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_hex());
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromBech32(prefix: string): Promise<WasmContract.DataHash> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new DataHash(
                WasmV4.DataHash.from_bech32(prefix),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      toBech32(prefix: string): Promise<string> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_bech32(prefix));
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return DataHash;
  })();

  public PlutusData = (() => {
    const $outer = this;

    class PlutusData
      extends Ptr<WasmV4.PlutusData>
      implements WasmContract.PlutusData {
      static fromBytes(bytes: Uint8Array): Promise<PlutusData> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new PlutusData(
                WasmV4.PlutusData.from_bytes(bytes),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      toBytes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_bytes());
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromHex(hex: string): Promise<PlutusData> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new PlutusData(
                WasmV4.PlutusData.from_hex(hex),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      toHex(): Promise<string> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_hex());
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return PlutusData;
  })();

  public StakeCredential = (() => {
    const $outer = this;

    class StakeCredential
      extends Ptr<WasmV4.StakeCredential>
      implements WasmContract.StakeCredential {
      toBytes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_bytes());
          } catch (e) {
            reject(e);
          }
        });
      }

      toKeyhash(): Promise<WasmContract.Ed25519KeyHash> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.Ed25519KeyHash(this.wasm.to_keyhash(), $outer._ctx)
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      toScripthash(): Promise<WasmContract.ScriptHash> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.ScriptHash(this.wasm.to_scripthash(), $outer._ctx)
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      kind(): Promise<number> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.kind());
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<StakeCredential> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new StakeCredential(
                WasmV4.StakeCredential.from_bytes(bytes),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromKeyhash(
        hash: WasmContract.Ed25519KeyHash
      ): Promise<StakeCredential> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new StakeCredential(
                WasmV4.StakeCredential.from_keyhash(hash.wasm),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromScripthash(
        hash: WasmContract.ScriptHash
      ): Promise<StakeCredential> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new StakeCredential(
                WasmV4.StakeCredential.from_scripthash(hash.wasm),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return StakeCredential;
  })();

  public StakeRegistration = (() => {
    const $outer = this;

    class StakeRegistration
      extends Ptr<WasmV4.StakeRegistration>
      implements WasmContract.StakeRegistration {
      toBytes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_bytes());
          } catch (e) {
            reject(e);
          }
        });
      }

      stakeCredential(): Promise<WasmContract.StakeCredential> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.StakeCredential(
                this.wasm.stake_credential(),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static new(
        stakeCredential: WasmContract.StakeCredential
      ): Promise<StakeRegistration> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new StakeRegistration(
                WasmV4.StakeRegistration.new(stakeCredential.wasm),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<StakeRegistration> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new StakeRegistration(
                WasmV4.StakeRegistration.from_bytes(bytes),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return StakeRegistration;
  })();

  public StakeDeregistration = (() => {
    const $outer = this;

    class StakeDeregistration
      extends Ptr<WasmV4.StakeDeregistration>
      implements WasmContract.StakeDeregistration {
      toBytes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_bytes());
          } catch (e) {
            reject(e);
          }
        });
      }

      stakeCredential(): Promise<WasmContract.StakeCredential> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.StakeCredential(
                this.wasm.stake_credential(),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static new(
        stakeCredential: WasmContract.StakeCredential
      ): Promise<StakeDeregistration> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new StakeDeregistration(
                WasmV4.StakeDeregistration.new(stakeCredential.wasm),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<StakeDeregistration> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new StakeDeregistration(
                WasmV4.StakeDeregistration.from_bytes(bytes),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return StakeDeregistration;
  })();

  public StakeDelegation = (() => {
    const $outer = this;

    class StakeDelegation
      extends Ptr<WasmV4.StakeDelegation>
      implements WasmContract.StakeDelegation {
      toBytes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_bytes());
          } catch (e) {
            reject(e);
          }
        });
      }

      stakeCredential(): Promise<WasmContract.StakeCredential> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.StakeCredential(
                this.wasm.stake_credential(),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      poolKeyhash(): Promise<WasmContract.Ed25519KeyHash> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.Ed25519KeyHash(this.wasm.pool_keyhash(), $outer._ctx)
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static new(
        stakeCredential: WasmContract.StakeCredential,
        poolKeyHash: WasmContract.Ed25519KeyHash
      ): Promise<StakeDelegation> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new StakeDelegation(
                WasmV4.StakeDelegation.new(
                  stakeCredential.wasm,
                  poolKeyHash.wasm
                ),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<StakeDelegation> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new StakeDelegation(
                WasmV4.StakeDelegation.from_bytes(bytes),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return StakeDelegation;
  })();

  public Certificate = (() => {
    const $outer = this;

    class Certificate
      extends Ptr<WasmV4.Certificate>
      implements WasmContract.Certificate {
      toBytes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_bytes());
          } catch (e) {
            reject(e);
          }
        });
      }

      asStakeRegistration(): Promise<WasmContract.StakeRegistration> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.StakeRegistration(
                this.wasm.as_stake_registration(),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      asStakeDeregistration(): Promise<WasmContract.StakeDeregistration> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.StakeDeregistration(
                this.wasm.as_stake_deregistration(),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      asStakeDelegation(): Promise<WasmContract.StakeDelegation> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.StakeDelegation(
                this.wasm.as_stake_delegation(),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<Certificate> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new Certificate(WasmV4.Certificate.from_bytes(bytes), $outer._ctx)
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static newStakeRegistration(
        stakeRegistration: WasmContract.StakeRegistration
      ): Promise<Certificate> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new Certificate(
                WasmV4.Certificate.new_stake_registration(
                  stakeRegistration.wasm
                ),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static newStakeDeregistration(
        stakeDeregistration: WasmContract.StakeDeregistration
      ): Promise<Certificate> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new Certificate(
                WasmV4.Certificate.new_stake_deregistration(
                  stakeDeregistration.wasm
                ),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static newStakeDelegation(
        stakeDelegation: WasmContract.StakeDelegation
      ): Promise<Certificate> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new Certificate(
                WasmV4.Certificate.new_stake_delegation(stakeDelegation.wasm),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return Certificate;
  })();

  public Certificates = (() => {
    const $outer = this;

    class Certificates
      extends Ptr<WasmV4.Certificates>
      implements WasmContract.Certificates {
      toBytes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_bytes());
          } catch (e) {
            reject(e);
          }
        });
      }

      len(): Promise<number> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.len());
          } catch (e) {
            reject(e);
          }
        });
      }

      get(index: number): Promise<WasmContract.Certificate> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.Certificate(this.wasm.get(index), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      add(item: WasmContract.Certificate): Promise<void> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.add(item.wasm));
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<Certificates> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new Certificates(
                WasmV4.Certificates.from_bytes(bytes),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static new(): Promise<Certificates> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new Certificates(WasmV4.Certificates.new(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return Certificates;
  })();

  public RewardAddress = (() => {
    const $outer = this;

    class RewardAddress
      extends Ptr<WasmV4.RewardAddress>
      implements WasmContract.RewardAddress {
      paymentCred(): Promise<WasmContract.StakeCredential> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.StakeCredential(this.wasm.payment_cred(), $outer._ctx)
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      toAddress(): Promise<WasmContract.Address> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.Address(this.wasm.to_address(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromAddress(addr: WasmContract.Address): Promise<RewardAddress> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new RewardAddress(
                WasmV4.RewardAddress.from_address(addr.wasm),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static new(
        network: number,
        payment: WasmContract.StakeCredential
      ): Promise<RewardAddress> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new RewardAddress(
                WasmV4.RewardAddress.new(network, payment.wasm),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return RewardAddress;
  })();

  public RewardAddresses = (() => {
    const $outer = this;

    class RewardAddresses
      extends Ptr<WasmV4.RewardAddresses>
      implements WasmContract.RewardAddresses {
      toBytes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_bytes());
          } catch (e) {
            reject(e);
          }
        });
      }

      len(): Promise<number> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.len());
          } catch (e) {
            reject(e);
          }
        });
      }

      get(index: number): Promise<WasmContract.RewardAddress> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.RewardAddress(this.wasm.get(index), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      add(item: WasmContract.RewardAddress): Promise<void> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.add(item.wasm));
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<RewardAddresses> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new RewardAddresses(
                WasmV4.RewardAddresses.from_bytes(bytes),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static new(): Promise<RewardAddresses> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new RewardAddresses(WasmV4.RewardAddresses.new(), $outer._ctx)
            );
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return RewardAddresses;
  })();

  public Withdrawals = (() => {
    const $outer = this;

    class Withdrawals
      extends Ptr<WasmV4.Withdrawals>
      implements WasmContract.Withdrawals {
      toBytes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_bytes());
          } catch (e) {
            reject(e);
          }
        });
      }

      len(): Promise<number> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.len());
          } catch (e) {
            reject(e);
          }
        });
      }

      insert(
        key: WasmContract.RewardAddress,
        value: WasmContract.BigNum
      ): Promise<WasmContract.BigNum> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.BigNum(
                this.wasm.insert(key.wasm, value.wasm),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      get(key: WasmContract.RewardAddress): Promise<WasmContract.BigNum> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.BigNum(this.wasm.get(key.wasm), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      keys(): Promise<WasmContract.RewardAddresses> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.RewardAddresses(this.wasm.keys(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      static new(): Promise<Withdrawals> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new Withdrawals(WasmV4.Withdrawals.new(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<Withdrawals> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new Withdrawals(WasmV4.Withdrawals.from_bytes(bytes), $outer._ctx)
            );
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return Withdrawals;
  })();

  public TransactionInputs = (() => {
    const $outer = this;

    class TransactionInputs
      extends Ptr<WasmV4.TransactionInputs>
      implements WasmContract.TransactionInputs {
      len(): Promise<number> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.len());
          } catch (e) {
            reject(e);
          }
        });
      }

      get(index: number): Promise<WasmContract.TransactionInput> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.TransactionInput(this.wasm.get(index), $outer._ctx)
            );
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return TransactionInputs;
  })();

  public TransactionOutputs = (() => {
    const $outer = this;

    class TransactionOutputs
      extends Ptr<WasmV4.TransactionOutputs>
      implements WasmContract.TransactionOutputs {
      len(): Promise<number> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.len());
          } catch (e) {
            reject(e);
          }
        });
      }

      get(index: number): Promise<WasmContract.TransactionOutput> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.TransactionOutput(this.wasm.get(index), $outer._ctx)
            );
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return TransactionOutputs;
  })();

  public TransactionBody = (() => {
    const $outer = this;

    class TransactionBody
      extends Ptr<WasmV4.TransactionBody>
      implements WasmContract.TransactionBody {
      toBytes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_bytes());
          } catch (e) {
            reject(e);
          }
        });
      }

      inputs(): Promise<WasmContract.TransactionInputs> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.TransactionInputs(this.wasm.inputs(), $outer._ctx)
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      outputs(): Promise<WasmContract.TransactionOutputs> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.TransactionOutputs(this.wasm.outputs(), $outer._ctx)
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      fee(): Promise<WasmContract.BigNum> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.BigNum(this.wasm.fee(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      ttl(): Promise<WasmContract.Optional<number | undefined>> {
        return new Promise((resolve, reject) => {
          try {
            const wasm = this.wasm.ttl();
            if (wasm) {
              resolve(wasm);
            } else {
              resolve(undefined);
            }
          } catch (e) {
            reject(e);
          }
        });
      }

      certs(): Promise<WasmContract.Certificates> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.Certificates(this.wasm.certs(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      withdrawals(): Promise<WasmContract.Withdrawals> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.Withdrawals(this.wasm.withdrawals(), $outer._ctx)
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<TransactionBody> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new TransactionBody(
                WasmV4.TransactionBody.from_bytes(bytes),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return TransactionBody;
  })();

  public TransactionBuilder = (() => {
    const $outer = this;

    class TransactionBuilder
      extends Ptr<WasmV4.TransactionBuilder>
      implements WasmContract.TransactionBuilder {
      addKeyInput(
        hash: WasmContract.Ed25519KeyHash,
        input: WasmContract.TransactionInput,
        amount: WasmContract.Value
      ): Promise<void> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.add_key_input(hash.wasm, input.wasm, amount.wasm));
          } catch (e) {
            reject(e);
          }
        });
      }

      addBootstrapInput(
        hash: WasmContract.ByronAddress,
        input: WasmContract.TransactionInput,
        amount: WasmContract.Value
      ): Promise<void> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              this.wasm.add_bootstrap_input(hash.wasm, input.wasm, amount.wasm)
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      addInput(
        address: WasmContract.Address,
        input: WasmContract.TransactionInput,
        amount: WasmContract.Value
      ): Promise<void> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.add_input(address.wasm, input.wasm, amount.wasm));
          } catch (e) {
            reject(e);
          }
        });
      }

      feeForInput(
        address: WasmContract.Address,
        input: WasmContract.TransactionInput,
        amount: WasmContract.Value
      ): Promise<WasmContract.BigNum> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.BigNum(
                this.wasm.fee_for_input(address.wasm, input.wasm, amount.wasm),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      addOutput(output: WasmContract.TransactionOutput): Promise<void> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.add_output(output.wasm));
          } catch (e) {
            reject(e);
          }
        });
      }

      feeForOutput(
        output: WasmContract.TransactionOutput
      ): Promise<WasmContract.BigNum> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.BigNum(
                this.wasm.fee_for_output(output.wasm),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      setFee(fee: WasmContract.BigNum): Promise<void> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.set_fee(fee.wasm));
          } catch (e) {
            reject(e);
          }
        });
      }

      setTtl(ttl: number): Promise<void> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.set_ttl(ttl));
          } catch (e) {
            reject(e);
          }
        });
      }

      setValidityStartInterval(validityStartInterval: number): Promise<void> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              this.wasm.set_validity_start_interval(validityStartInterval)
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      setCerts(certs: WasmContract.Certificates): Promise<void> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.set_certs(certs.wasm));
          } catch (e) {
            reject(e);
          }
        });
      }

      setWithdrawals(withdrawals: WasmContract.Withdrawals): Promise<void> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.set_withdrawals(withdrawals.wasm));
          } catch (e) {
            reject(e);
          }
        });
      }

      setAuxiliaryData(auxiliary: WasmContract.AuxiliaryData): Promise<void> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.set_auxiliary_data(auxiliary.wasm));
          } catch (e) {
            reject(e);
          }
        });
      }

      getExplicitInput(): Promise<WasmContract.Value> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.Value(this.wasm.get_explicit_input(), $outer._ctx)
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      getImplicitInput(): Promise<WasmContract.Value> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.Value(this.wasm.get_implicit_input(), $outer._ctx)
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      getExplicitOutput(): Promise<WasmContract.Value> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.Value(this.wasm.get_explicit_output(), $outer._ctx)
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      getTotalOutput(): Promise<WasmContract.Value> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.Value(this.wasm.get_total_output(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      getTotalInput(): Promise<WasmContract.Value> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.Value(this.wasm.get_total_input(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      getDeposit(): Promise<WasmContract.BigNum> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.BigNum(this.wasm.get_deposit(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      getFeeIfSet(): Promise<WasmContract.BigNum> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.BigNum(this.wasm.get_fee_if_set(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      addChangeIfNeeded(address: WasmContract.Address): Promise<boolean> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.add_change_if_needed(address.wasm));
          } catch (e) {
            reject(e);
          }
        });
      }

      addMintAsset(
        mintScript: WasmContract.NativeScript,
        mintName: WasmContract.AssetName,
        amount: WasmContract.Int
      ): Promise<void> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              this.wasm.add_mint_asset(
                mintScript.wasm,
                mintName.wasm,
                amount.wasm
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      addJsonMetadatum(key: WasmContract.BigNum, value: string): Promise<void> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.add_json_metadatum(key.wasm, value));
          } catch (e) {
            reject(e);
          }
        });
      }

      getAuxiliaryData(): Promise<WasmContract.AuxiliaryData | void> {
        return new Promise((resolve, reject) => {
          try {
            const wasm = this.wasm.get_auxiliary_data();
            if (wasm) {
              resolve(new $outer.AuxiliaryData(wasm, $outer._ctx));
            } else {
              resolve(undefined);
            }
          } catch (e) {
            reject(e);
          }
        });
      }

      addRequiredSigner(
        requiredSigner: WasmContract.Ed25519KeyHash
      ): Promise<void> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.add_required_signer(requiredSigner.wasm));
          } catch (e) {
            reject(e);
          }
        });
      }

      addNativeScriptInput(
        nativeScript: WasmContract.NativeScript,
        input: WasmContract.TransactionInput,
        amount: WasmContract.Value
      ): Promise<void> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              this.wasm.add_native_script_input(
                nativeScript.wasm,
                input.wasm,
                amount.wasm
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      addPlutusScriptInput(
        plutusScript: WasmContract.PlutusScript,
        datum: string,
        redeemer: string,
        input: WasmContract.TransactionInput,
        amount: WasmContract.Value
      ): Promise<void> {
        return new Promise((resolve, reject) => {
          try {
            const plutusWitness = WasmV4.PlutusWitness.new(
              plutusScript.wasm,
              WasmV4.PlutusData.from_bytes(Buffer.from(datum, 'hex')),
              WasmV4.Redeemer.from_bytes(Buffer.from(redeemer, 'hex'))
            );
            resolve(
              this.wasm.add_plutus_script_input(
                plutusWitness,
                input.wasm,
                amount.wasm
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      setCollateral(
        txInputsBuilder: WasmContract.TxInputsBuilder
      ): Promise<void> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.set_collateral(txInputsBuilder.wasm));
          } catch (e) {
            reject(e);
          }
        });
      }

      calcScriptDataHash(costModel: 'vasil' | 'default'): Promise<void> {
        const wasmCostModel =
          costModel === 'vasil'
            ? WasmV4.TxBuilderConstants.plutus_vasil_cost_models()
            : WasmV4.TxBuilderConstants.plutus_default_cost_models();

        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.calc_script_data_hash(wasmCostModel));
          } catch (e) {
            reject(e);
          }
        });
      }

      build(): Promise<WasmContract.TransactionBody> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.TransactionBody(this.wasm.build(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      minFee(): Promise<WasmContract.BigNum> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.BigNum(this.wasm.min_fee(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      static new(
        linearFee: WasmContract.LinearFee,
        poolDeposit: WasmContract.BigNum,
        keyDeposit: WasmContract.BigNum,
        coinsPerUtxoWord: WasmContract.BigNum
      ): Promise<TransactionBuilder> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new TransactionBuilder(
                WasmV4.TransactionBuilder.new(
                  WasmV4.TransactionBuilderConfigBuilder.new()
                    .fee_algo(linearFee.wasm)
                    .pool_deposit(poolDeposit.wasm)
                    .key_deposit(keyDeposit.wasm)
                    .coins_per_utxo_word(coinsPerUtxoWord.wasm)
                    .max_value_size(5000)
                    .max_tx_size(16384)
                    .ex_unit_prices(
                      WasmV4.ExUnitPrices.new(
                        WasmV4.UnitInterval.new(
                          WasmV4.BigNum.from_str('577'),
                          WasmV4.BigNum.from_str('10000')
                        ),
                        WasmV4.UnitInterval.new(
                          WasmV4.BigNum.from_str('721'),
                          WasmV4.BigNum.from_str('10000000')
                        )
                      )
                    )
                    .prefer_pure_change(true)
                    .build()
                ),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return TransactionBuilder;
  })();

  public BaseAddress = (() => {
    const $outer = this;

    class BaseAddress
      extends Ptr<WasmV4.BaseAddress>
      implements WasmContract.BaseAddress {
      paymentCred(): Promise<WasmContract.StakeCredential> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.StakeCredential(this.wasm.payment_cred(), $outer._ctx)
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      stakeCred(): Promise<WasmContract.StakeCredential> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.StakeCredential(this.wasm.stake_cred(), $outer._ctx)
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      toAddress(): Promise<WasmContract.Address> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.Address(this.wasm.to_address(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromAddress(addr: WasmContract.Address): Promise<BaseAddress> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new BaseAddress(
                WasmV4.BaseAddress.from_address(addr.wasm),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static new(
        network: number,
        payment: WasmContract.StakeCredential,
        stake: WasmContract.StakeCredential
      ): Promise<BaseAddress> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new BaseAddress(
                WasmV4.BaseAddress.new(network, payment.wasm, stake.wasm),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return BaseAddress;
  })();

  public PointerAddress = (() => {
    const $outer = this;

    class PointerAddress
      extends Ptr<WasmV4.PointerAddress>
      implements WasmContract.PointerAddress {
      paymentCred(): Promise<WasmContract.StakeCredential> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.StakeCredential(this.wasm.payment_cred(), $outer._ctx)
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      stakePointer(): Promise<WasmContract.Pointer> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.Pointer(this.wasm.stake_pointer(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      toAddress(): Promise<WasmContract.Address> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.Address(this.wasm.to_address(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromAddress(addr: WasmContract.Address): Promise<PointerAddress> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new PointerAddress(
                WasmV4.PointerAddress.from_address(addr.wasm),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static new(
        network: number,
        payment: WasmContract.StakeCredential,
        stake: WasmContract.Pointer
      ): Promise<PointerAddress> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new PointerAddress(
                WasmV4.PointerAddress.new(network, payment.wasm, stake.wasm),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return PointerAddress;
  })();

  public EnterpriseAddress = (() => {
    const $outer = this;

    class EnterpriseAddress
      extends Ptr<WasmV4.EnterpriseAddress>
      implements WasmContract.EnterpriseAddress {
      paymentCred(): Promise<WasmContract.StakeCredential> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.StakeCredential(this.wasm.payment_cred(), $outer._ctx)
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      toAddress(): Promise<WasmContract.Address> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.Address(this.wasm.to_address(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromAddress(
        addr: WasmContract.Address
      ): Promise<EnterpriseAddress> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new EnterpriseAddress(
                WasmV4.EnterpriseAddress.from_address(addr.wasm),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static new(
        network: number,
        payment: WasmContract.StakeCredential
      ): Promise<EnterpriseAddress> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new EnterpriseAddress(
                WasmV4.EnterpriseAddress.new(network, payment.wasm),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return EnterpriseAddress;
  })();

  public Pointer = (() => {
    const $outer = this;

    class Pointer extends Ptr<WasmV4.Pointer> implements WasmContract.Pointer {
      slot(): Promise<number> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.slot());
          } catch (e) {
            reject(e);
          }
        });
      }

      txIndex(): Promise<number> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.tx_index());
          } catch (e) {
            reject(e);
          }
        });
      }

      certIndex(): Promise<number> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.cert_index());
          } catch (e) {
            reject(e);
          }
        });
      }

      static new(
        slot: number,
        txIndex: number,
        certIndex: number
      ): Promise<Pointer> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new Pointer(
                WasmV4.Pointer.new(slot, txIndex, certIndex),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return Pointer;
  })();

  public Vkey = (() => {
    const $outer = this;

    class Vkey extends Ptr<WasmV4.Vkey> implements WasmContract.Vkey {
      static new(pk: WasmContract.PublicKey): Promise<Vkey> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new Vkey(WasmV4.Vkey.new(pk.wasm), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return Vkey;
  })();

  public Ed25519Signature = (() => {
    const $outer = this;

    class Ed25519Signature
      extends Ptr<WasmV4.Ed25519Signature>
      implements WasmContract.Ed25519Signature {
      toBytes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_bytes());
          } catch (e) {
            reject(e);
          }
        });
      }

      toHex(): Promise<string> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_hex());
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<Ed25519Signature> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new Ed25519Signature(
                WasmV4.Ed25519Signature.from_bytes(bytes),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return Ed25519Signature;
  })();

  public Vkeywitness = (() => {
    const $outer = this;

    class Vkeywitness
      extends Ptr<WasmV4.Vkeywitness>
      implements WasmContract.Vkeywitness {
      toBytes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_bytes());
          } catch (e) {
            reject(e);
          }
        });
      }

      signature(): Promise<WasmContract.Ed25519Signature> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.Ed25519Signature(this.wasm.signature(), $outer._ctx)
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<Vkeywitness> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new Vkeywitness(WasmV4.Vkeywitness.from_bytes(bytes), $outer._ctx)
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static new(
        vkey: WasmContract.Vkey,
        signature: WasmContract.Ed25519Signature
      ): Promise<Vkeywitness> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new Vkeywitness(
                WasmV4.Vkeywitness.new(vkey.wasm, signature.wasm),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return Vkeywitness;
  })();

  public Vkeywitnesses = (() => {
    const $outer = this;

    class Vkeywitnesses
      extends Ptr<WasmV4.Vkeywitnesses>
      implements WasmContract.Vkeywitnesses {
      len(): Promise<number> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.len());
          } catch (e) {
            reject(e);
          }
        });
      }

      add(item: WasmContract.Vkeywitness): Promise<void> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.add(item.wasm));
          } catch (e) {
            reject(e);
          }
        });
      }

      get(index: number): Promise<WasmContract.Vkeywitness> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.Vkeywitness(this.wasm.get(index), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      static new(): Promise<Vkeywitnesses> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new Vkeywitnesses(WasmV4.Vkeywitnesses.new(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return Vkeywitnesses;
  })();

  public BootstrapWitness = (() => {
    const $outer = this;

    class BootstrapWitness
      extends Ptr<WasmV4.BootstrapWitness>
      implements WasmContract.BootstrapWitness {
      toBytes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_bytes());
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<BootstrapWitness> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new BootstrapWitness(
                WasmV4.BootstrapWitness.from_bytes(bytes),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static new(
        vkey: WasmContract.Vkey,
        signature: WasmContract.Ed25519Signature,
        chainCode: Uint8Array,
        attributes: Uint8Array
      ): Promise<BootstrapWitness> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new BootstrapWitness(
                WasmV4.BootstrapWitness.new(
                  vkey.wasm,
                  signature.wasm,
                  chainCode,
                  attributes
                ),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return BootstrapWitness;
  })();

  public BootstrapWitnesses = (() => {
    const $outer = this;

    class BootstrapWitnesses
      extends Ptr<WasmV4.BootstrapWitnesses>
      implements WasmContract.BootstrapWitnesses {
      len(): Promise<number> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.len());
          } catch (e) {
            reject(e);
          }
        });
      }

      add(item: WasmContract.BootstrapWitness): Promise<void> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.add(item.wasm));
          } catch (e) {
            reject(e);
          }
        });
      }

      get(index: number): Promise<WasmContract.BootstrapWitness> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.BootstrapWitness(this.wasm.get(index), $outer._ctx)
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static new(): Promise<BootstrapWitnesses> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new BootstrapWitnesses(
                WasmV4.BootstrapWitnesses.new(),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return BootstrapWitnesses;
  })();

  public TransactionWitnessSet = (() => {
    const $outer = this;

    class TransactionWitnessSet
      extends Ptr<WasmV4.TransactionWitnessSet>
      implements WasmContract.TransactionWitnessSet {
      setBootstraps(
        bootstraps: WasmContract.BootstrapWitnesses
      ): Promise<void> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.set_bootstraps(bootstraps.wasm));
          } catch (e) {
            reject(e);
          }
        });
      }

      setVkeys(vkeywitnesses: WasmContract.Vkeywitnesses): Promise<void> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.set_vkeys(vkeywitnesses.wasm));
          } catch (e) {
            reject(e);
          }
        });
      }

      vkeys(): Promise<WasmContract.Vkeywitnesses> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.Vkeywitnesses(this.wasm.vkeys(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      bootstraps(): Promise<WasmContract.BootstrapWitnesses> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.BootstrapWitnesses(this.wasm.bootstraps(), $outer._ctx)
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static new(): Promise<TransactionWitnessSet> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new TransactionWitnessSet(
                WasmV4.TransactionWitnessSet.new(),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return TransactionWitnessSet;
  })();

  public Transaction = (() => {
    const $outer = this;

    class Transaction
      extends Ptr<WasmV4.Transaction>
      implements WasmContract.Transaction {
      body(): Promise<WasmContract.TransactionBody> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.TransactionBody(this.wasm.body(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      witnessSet(): Promise<WasmContract.TransactionWitnessSet> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.TransactionWitnessSet(
                this.wasm.witness_set(),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      isValid(): Promise<boolean> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.is_valid());
          } catch (e) {
            reject(e);
          }
        });
      }

      auxiliaryData(): Promise<WasmContract.AuxiliaryData> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.AuxiliaryData(this.wasm.auxiliary_data(), $outer._ctx)
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      toBytes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_bytes());
          } catch (e) {
            reject(e);
          }
        });
      }

      static new(
        body: WasmContract.TransactionBody,
        witnessSet: WasmContract.TransactionWitnessSet,
        auxiliary?: WasmContract.AuxiliaryData
      ): Promise<Transaction> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new Transaction(
                WasmV4.Transaction.new(
                  body.wasm,
                  witnessSet.wasm,
                  auxiliary?._wasm
                ),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<Transaction> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new Transaction(WasmV4.Transaction.from_bytes(bytes), $outer._ctx)
            );
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return Transaction;
  })();

  public NetworkInfo = (() => {
    const $outer = this;

    class NetworkInfo
      extends Ptr<WasmV4.NetworkInfo>
      implements WasmContract.NetworkInfo {
      networkId(): Promise<number> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.network_id());
          } catch (e) {
            reject(e);
          }
        });
      }

      protocolMagic(): Promise<number> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.protocol_magic());
          } catch (e) {
            reject(e);
          }
        });
      }

      static new(
        networkId: number,
        protocolMagic: number
      ): Promise<NetworkInfo> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new NetworkInfo(
                WasmV4.NetworkInfo.new(networkId, protocolMagic),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static testnet(): Promise<NetworkInfo> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new NetworkInfo(WasmV4.NetworkInfo.testnet(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      static testnetPreview(): Promise<NetworkInfo> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new NetworkInfo(WasmV4.NetworkInfo.testnet_preview(), $outer._ctx)
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static testnetPreprod(): Promise<NetworkInfo> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new NetworkInfo(WasmV4.NetworkInfo.testnet_preprod(), $outer._ctx)
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static mainnet(): Promise<NetworkInfo> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new NetworkInfo(WasmV4.NetworkInfo.mainnet(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return NetworkInfo;
  })();

  public MetadataList = (() => {
    const $outer = this;

    class MetadataList
      extends Ptr<WasmV4.MetadataList>
      implements WasmContract.MetadataList {
      static new(): Promise<MetadataList> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new MetadataList(WasmV4.MetadataList.new(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<MetadataList> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new MetadataList(
                WasmV4.MetadataList.from_bytes(bytes),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      len(): Promise<number> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.len());
          } catch (e) {
            reject(e);
          }
        });
      }

      get(index: number): Promise<WasmContract.TransactionMetadatum> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new $outer.TransactionMetadatum(this.wasm.get(index), $outer._ctx)
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      add(item: WasmContract.TransactionMetadatum): Promise<void> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.add(item.wasm));
          } catch (e) {
            reject(e);
          }
        });
      }

      toBytes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_bytes());
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return MetadataList;
  })();

  public NativeScript = (() => {
    const $outer = this;

    class NativeScript
      extends Ptr<WasmV4.NativeScript>
      implements WasmContract.NativeScript {
      toBytes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_bytes());
          } catch (e) {
            reject(e);
          }
        });
      }

      hash(): Promise<WasmContract.Ed25519KeyHash> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.Ed25519KeyHash(this.wasm.hash(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      kind(): Promise<number> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.kind());
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<NativeScript> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new NativeScript(
                WasmV4.NativeScript.from_bytes(bytes),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return NativeScript;
  })();

  public NativeScripts = (() => {
    const $outer = this;

    class NativeScripts
      extends Ptr<WasmV4.NativeScripts>
      implements WasmContract.NativeScripts {
      len(): Promise<number> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.len());
          } catch (e) {
            reject(e);
          }
        });
      }

      get(index: number): Promise<WasmContract.NativeScript> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.NativeScript(this.wasm.get(index), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      add(elem: WasmContract.NativeScript): Promise<void> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.add(elem.wasm));
          } catch (e) {
            reject(e);
          }
        });
      }

      static new(): Promise<NativeScripts> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new NativeScripts(WasmV4.NativeScripts.new(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return NativeScripts;
  })();

  public PlutusScript = (() => {
    const $outer = this;

    class PlutusScript
      extends Ptr<WasmV4.PlutusScript>
      implements WasmContract.PlutusScript {
      toBytes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_bytes());
          } catch (e) {
            reject(e);
          }
        });
      }

      bytes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.bytes());
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<PlutusScript> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new PlutusScript(
                WasmV4.PlutusScript.from_bytes(bytes),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static new(bytes: Uint8Array): Promise<PlutusScript> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new PlutusScript(WasmV4.PlutusScript.new(bytes), $outer._ctx)
            );
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return PlutusScript;
  })();

  public PlutusScripts = (() => {
    const $outer = this;

    class PlutusScripts
      extends Ptr<WasmV4.PlutusScripts>
      implements WasmContract.PlutusScripts {
      toBytes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_bytes());
          } catch (e) {
            reject(e);
          }
        });
      }

      len(): Promise<number> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.len());
          } catch (e) {
            reject(e);
          }
        });
      }

      get(index: number): Promise<WasmContract.PlutusScript> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new $outer.PlutusScript(this.wasm.get(index), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }

      add(elem: WasmContract.PlutusScript): Promise<void> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.add(elem.wasm));
          } catch (e) {
            reject(e);
          }
        });
      }

      static fromBytes(bytes: Uint8Array): Promise<PlutusScripts> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new PlutusScripts(
                WasmV4.PlutusScripts.from_bytes(bytes),
                $outer._ctx
              )
            );
          } catch (e) {
            reject(e);
          }
        });
      }

      static new(): Promise<PlutusScripts> {
        return new Promise((resolve, reject) => {
          try {
            resolve(new PlutusScripts(WasmV4.PlutusScripts.new(), $outer._ctx));
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return PlutusScripts;
  })();

  public TxInputsBuilder = (() => {
    const $outer = this;

    class TxInputsBuilder
      extends Ptr<WasmV4.TxInputsBuilder>
      implements WasmContract.TxInputsBuilder {
      addInput(
        address: WasmContract.Address,
        input: WasmContract.TransactionInput,
        amount: WasmContract.Value
      ): Promise<void> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.add_input(address.wasm, input.wasm, amount.wasm));
          } catch (e) {
            reject(e);
          }
        });
      }

      static new(): Promise<TxInputsBuilder> {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              new TxInputsBuilder(WasmV4.TxInputsBuilder.new(), $outer._ctx)
            );
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return TxInputsBuilder;
  })();
}
