import * as WasmV4 from '@emurgo/csl-mobile-bridge';
import * as WasmContract from '@emurgo/cross-csl-core';

const { Ptr, WasmProxy } = WasmContract;

export const init = (ctx: string): WasmContract.WasmModuleProxy => {
  return new MobileWasmModuleProxy(ctx);
};

export class MobileWasmModuleProxy implements WasmContract.WasmModuleProxy {
  private _ctx: string;

  async encryptWithPassword(
    password: string,
    salt: string,
    nonce: string,
    data: string
  ) {
    return await WasmV4.encrypt_with_password(password, salt, nonce, data);
  }

  async decryptWithPassword(password: string, salt: string) {
    return await WasmV4.decrypt_with_password(password, salt);
  }

  async encodeJsonStrToMetadatum(json: string, schema: number) {
    const wasm = await WasmV4.encode_json_str_to_metadatum(json, schema);
    return await Promise.resolve(
      new this.TransactionMetadatum(wasm, this._ctx)
    );
  }

  async minAdaRequired(
    value: WasmContract.Value,
    hasDataHash: boolean,
    coinsPerUtxoWord: WasmContract.BigNum
  ) {
    return new this.BigNum(
      await WasmV4.min_ada_required(
        value.wasm,
        hasDataHash,
        coinsPerUtxoWord.wasm
      ),
      this._ctx
    );
  }

  async minAdaForOutput(
    output: WasmContract.TransactionOutput,
    dataCost: WasmContract.DataCost
  ) {
    return new this.BigNum(
      await WasmV4.min_ada_for_output(output.wasm, dataCost.wasm),
      this._ctx
    );
  }

  async hashTransaction(txBody: WasmContract.TransactionBody) {
    return new this.TransactionHash(
      await WasmV4.hash_transaction(txBody.wasm),
      this._ctx
    );
  }

  async hashPlutusData(
    plutusData: WasmContract.PlutusData
  ): Promise<WasmContract.DataHash> {
    return new this.DataHash(
      await WasmV4.hash_plutus_data(plutusData.wasm),
      this._ctx
    );
  }

  async hashScriptData(
    redeemers: WasmContract.Redeemers,
    costModels: WasmContract.Costmdls,
    datums?: WasmContract.PlutusList
  ): Promise<WasmContract.ScriptDataHash> {
    return new this.ScriptDataHash(
      await WasmV4.hash_script_data(
        redeemers.wasm,
        costModels.wasm,
        datums?.wasm
      ),
      this._ctx
    );
  }

  async makeVkeyWitness(
    txBodyHash: WasmContract.TransactionHash,
    sk: WasmContract.PrivateKey
  ) {
    return new this.Vkeywitness(
      await WasmV4.make_vkey_witness(txBodyHash.wasm, sk.wasm),
      this._ctx
    );
  }

  async makeIcarusBootstrapWitness(
    txBodyHash: WasmContract.TransactionHash,
    addr: WasmContract.ByronAddress,
    key: WasmContract.Bip32PrivateKey
  ) {
    return new this.BootstrapWitness(
      await WasmV4.make_icarus_bootstrap_witness(
        txBodyHash.wasm,
        addr.wasm,
        key.wasm
      ),
      this._ctx
    );
  }

  async decodeMetadatumToJsonStr(
    metadatum: WasmContract.TransactionMetadatum,
    schema: number
  ) {
    return await WasmV4.decode_metadatum_to_json_str(metadatum.wasm, schema);
  }

  async encodeJsonStrToPlutusDatum(
    json: string,
    schema: WasmContract.PlutusDatumSchema
  ): Promise<WasmContract.PlutusData | undefined> {
    return new this.PlutusData(
      await WasmV4.encode_json_str_to_plutus_datum(json, schema),
      this._ctx
    );
  }

  constructor(ctx: string) {
    this._ctx = ctx;
  }

  public BigNum = (() => {
    const $outer = this;

    class BigNum extends Ptr<WasmV4.BigNum> implements WasmContract.BigNum {
      toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      toStr(): Promise<string> {
        return this.wasm.to_str();
      }

      async checkedMul(other: BigNum): Promise<BigNum> {
        const wasmBigNum = await this.wasm.checked_mul(other.wasm);
        return new BigNum(wasmBigNum, $outer._ctx);
      }

      async checkedAdd(other: BigNum): Promise<BigNum> {
        const wasmBigNum = await this.wasm.checked_add(other.wasm);
        return new BigNum(wasmBigNum, $outer._ctx);
      }

      async checkedSub(other: BigNum): Promise<BigNum> {
        const wasmBigNum = await this.wasm.checked_sub(other.wasm);
        return new BigNum(wasmBigNum, $outer._ctx);
      }

      async clampedSub(other: BigNum): Promise<BigNum> {
        const wasmBigNum = await this.wasm.clamped_sub(other.wasm);
        return new BigNum(wasmBigNum, $outer._ctx);
      }

      compare(rhs_value: BigNum): Promise<number> {
        return this.wasm.compare(rhs_value.wasm);
      }

      static async fromBytes(bytes: Uint8Array): Promise<BigNum> {
        return new BigNum(await WasmV4.BigNum.from_bytes(bytes), $outer._ctx);
      }

      static async fromStr(string: string): Promise<BigNum> {
        return new BigNum(await WasmV4.BigNum.from_str(string), $outer._ctx);
      }
    }

    return BigNum;
  })();

  public LinearFee = (() => {
    const $outer = this;

    class LinearFee
      extends Ptr<WasmV4.LinearFee>
      implements WasmContract.LinearFee
    {
      async constant(): Promise<WasmContract.BigNum> {
        const constant = await this.wasm.constant();
        return new $outer.BigNum(constant, $outer._ctx);
      }
      async coefficient(): Promise<WasmContract.BigNum> {
        const coefficient = await this.wasm.coefficient();
        return new $outer.BigNum(coefficient, $outer._ctx);
      }
      static async new(
        coefficient: WasmContract.BigNum,
        constant: WasmContract.BigNum
      ): Promise<LinearFee> {
        const wasmLinearFee = await WasmV4.LinearFee.new(
          coefficient.wasm,
          constant.wasm
        );
        return Promise.resolve(new LinearFee(wasmLinearFee, $outer._ctx));
      }
    }
    return LinearFee;
  })();

  public GeneralTransactionMetadata = (() => {
    const $outer = this;

    class GeneralTransactionMetadata
      extends Ptr<WasmV4.GeneralTransactionMetadata>
      implements WasmContract.GeneralTransactionMetadata
    {
      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async len(): Promise<number> {
        return await this.wasm.len();
      }

      async insert(
        key: WasmContract.BigNum,
        value: WasmContract.TransactionMetadatum
      ): Promise<WasmContract.TransactionMetadatum> {
        return new $outer.TransactionMetadatum(
          await this.wasm.insert(key.wasm, value.wasm),
          $outer._ctx
        );
      }

      async get(
        key: WasmContract.BigNum
      ): Promise<WasmContract.TransactionMetadatum> {
        return new $outer.TransactionMetadatum(
          await this.wasm.get(key.wasm),
          $outer._ctx
        );
      }

      async keys(): Promise<WasmContract.TransactionMetadatumLabels> {
        return new $outer.TransactionMetadatumLabels(
          await this.wasm.keys(),
          $outer._ctx
        );
      }

      static async new(): Promise<GeneralTransactionMetadata> {
        const wasm = await WasmV4.GeneralTransactionMetadata.new();
        return new GeneralTransactionMetadata(wasm, $outer._ctx);
      }

      static async fromBytes(
        bytes: Uint8Array
      ): Promise<GeneralTransactionMetadata> {
        const wasm = await WasmV4.GeneralTransactionMetadata.from_bytes(bytes);
        return Promise.resolve(
          new GeneralTransactionMetadata(wasm, $outer._ctx)
        );
      }
    }
    return GeneralTransactionMetadata;
  })();

  public TransactionMetadatumLabels = (() => {
    const $outer = this;

    class TransactionMetadatumLabels
      extends Ptr<WasmV4.TransactionMetadatumLabels>
      implements WasmContract.TransactionMetadatumLabels
    {
      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async len(): Promise<number> {
        return await this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.BigNum> {
        return new $outer.BigNum(await this.wasm.get(index), $outer._ctx);
      }

      async add(elem: WasmContract.BigNum): Promise<void> {
        return await this.wasm.add(elem.wasm);
      }

      static async fromBytes(
        bytes: Uint8Array
      ): Promise<TransactionMetadatumLabels> {
        return new TransactionMetadatumLabels(
          await WasmV4.TransactionMetadatumLabels.from_bytes(bytes),
          $outer._ctx
        );
      }

      static async new(): Promise<TransactionMetadatumLabels> {
        return new TransactionMetadatumLabels(
          await WasmV4.TransactionMetadatumLabels.new(),
          $outer._ctx
        );
      }
    }
    return TransactionMetadatumLabels;
  })();

  public MetadataMap = (() => {
    const $outer = this;

    class MetadataMap
      extends Ptr<WasmV4.MetadataMap>
      implements WasmContract.MetadataMap
    {
      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      len(): Promise<number> {
        return Promise.resolve(this.wasm.len());
      }

      async insert(
        key: WasmContract.TransactionMetadatum,
        value: WasmContract.TransactionMetadatum
      ): Promise<WasmContract.TransactionMetadatum | undefined> {
        const wasm = await this.wasm.insert(key.wasm, value.wasm);
        if (wasm) {
          return Promise.resolve(
            new $outer.TransactionMetadatum(wasm, $outer._ctx)
          );
        } else {
          return Promise.resolve(undefined);
        }
      }

      async insertStr(
        key: string,
        value: WasmContract.TransactionMetadatum
      ): Promise<WasmContract.TransactionMetadatum | undefined> {
        const wasm = await this.wasm.insert_str(key, value.wasm);
        if (wasm) {
          return new $outer.TransactionMetadatum(wasm, $outer._ctx);
        } else {
          return undefined;
        }
      }

      async insertI32(
        key: number,
        value: WasmContract.TransactionMetadatum
      ): Promise<WasmContract.TransactionMetadatum | undefined> {
        const wasm = await this.wasm.insert_i32(key, value.wasm);
        if (wasm) {
          return new $outer.TransactionMetadatum(wasm, $outer._ctx);
        } else {
          return undefined;
        }
      }

      async get(
        key: WasmContract.TransactionMetadatum
      ): Promise<WasmContract.TransactionMetadatum> {
        return new $outer.TransactionMetadatum(
          await this.wasm.get(key.wasm),
          $outer._ctx
        );
      }

      async getStr(key: string): Promise<WasmContract.TransactionMetadatum> {
        return new $outer.TransactionMetadatum(
          await this.wasm.get_str(key),
          $outer._ctx
        );
      }

      async getI32(key: number): Promise<WasmContract.TransactionMetadatum> {
        return new $outer.TransactionMetadatum(
          await this.wasm.get_i32(key),
          $outer._ctx
        );
      }

      async has(key: WasmContract.TransactionMetadatum): Promise<boolean> {
        return await this.wasm.has(key.wasm);
      }

      async keys(): Promise<WasmContract.MetadataList> {
        return new $outer.MetadataList(await this.wasm.keys(), $outer._ctx);
      }

      static async fromBytes(bytes: Uint8Array): Promise<MetadataMap> {
        return new MetadataMap(
          await WasmV4.MetadataMap.from_bytes(bytes),
          $outer._ctx
        );
      }

      static async new(): Promise<MetadataMap> {
        return new MetadataMap(await WasmV4.MetadataMap.new(), $outer._ctx);
      }
    }

    return MetadataMap;
  })();

  public Int = (() => {
    const $outer = this;

    class Int extends Ptr<WasmV4.Int> implements WasmContract.Int {
      isPositive(): Promise<boolean> {
        return this.wasm.is_positive();
      }

      async asPositive(): Promise<WasmContract.BigNum | undefined> {
        const wasm = await this.wasm.as_positive();
        if (wasm) {
          return new $outer.BigNum(wasm, $outer._ctx);
        } else {
          return undefined;
        }
      }

      async asNegative(): Promise<WasmContract.BigNum | undefined> {
        const wasm = await this.wasm.as_negative();
        if (wasm) {
          return new $outer.BigNum(wasm, $outer._ctx);
        } else {
          return undefined;
        }
      }

      async asI32(): Promise<number | undefined> {
        return await this.wasm.as_i32();
      }

      static async new(x: WasmContract.BigNum): Promise<Int> {
        return new Int(await WasmV4.Int.new(x.wasm), $outer._ctx);
      }

      static async newNegative(x: WasmContract.BigNum): Promise<Int> {
        return new Int(await WasmV4.Int.new_negative(x.wasm), $outer._ctx);
      }

      static async newI32(x: number): Promise<Int> {
        return new Int(await WasmV4.Int.new_i32(x), $outer._ctx);
      }
    }

    return Int;
  })();

  public TransactionMetadatum = (() => {
    const $outer = this;

    class TransactionMetadatum
      extends Ptr<WasmV4.TransactionMetadatum>
      implements WasmContract.TransactionMetadatum
    {
      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async kind(): Promise<number> {
        return await this.wasm.kind();
      }

      async asMap(): Promise<WasmContract.MetadataMap> {
        return new $outer.MetadataMap(await this.wasm.as_map(), $outer._ctx);
      }

      async asList(): Promise<WasmContract.MetadataList> {
        return new $outer.MetadataList(await this.wasm.as_list(), $outer._ctx);
      }

      async asInt(): Promise<WasmContract.Int> {
        return new $outer.Int(await this.wasm.as_int(), $outer._ctx);
      }

      async asBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async asText(): Promise<string> {
        return await this.wasm.as_text();
      }

      static async fromBytes(bytes: Uint8Array): Promise<TransactionMetadatum> {
        return new TransactionMetadatum(
          await WasmV4.TransactionMetadatum.from_bytes(bytes),
          $outer._ctx
        );
      }

      static async newMap(
        map: WasmContract.MetadataMap
      ): Promise<TransactionMetadatum> {
        return new TransactionMetadatum(
          await WasmV4.TransactionMetadatum.new_map(map.wasm),
          $outer._ctx
        );
      }

      static async newList(
        list: WasmContract.MetadataList
      ): Promise<TransactionMetadatum> {
        return new TransactionMetadatum(
          await WasmV4.TransactionMetadatum.new_list(list.wasm),
          $outer._ctx
        );
      }

      static async newInt(
        int: WasmContract.Int
      ): Promise<TransactionMetadatum> {
        return new TransactionMetadatum(
          await WasmV4.TransactionMetadatum.new_int(int.wasm),
          $outer._ctx
        );
      }

      static async newBytes(bytes: Uint8Array): Promise<TransactionMetadatum> {
        return new TransactionMetadatum(
          await WasmV4.TransactionMetadatum.new_bytes(bytes),
          $outer._ctx
        );
      }

      static async newText(text: string): Promise<TransactionMetadatum> {
        return new TransactionMetadatum(
          await WasmV4.TransactionMetadatum.new_text(text),
          $outer._ctx
        );
      }
    }
    return TransactionMetadatum;
  })();

  public AuxiliaryData = (() => {
    const $outer = this;

    class AuxiliaryData
      extends Ptr<WasmV4.AuxiliaryData>
      implements WasmContract.AuxiliaryData
    {
      async toBytes(): Promise<Uint8Array> {
        return Promise.resolve(this.wasm.to_bytes());
      }

      async metadata(): Promise<WasmContract.GeneralTransactionMetadata> {
        const wasm = await this.wasm.metadata();
        return new $outer.GeneralTransactionMetadata(wasm, $outer._ctx);
      }

      setMetadata(
        metadata: WasmContract.GeneralTransactionMetadata
      ): Promise<void> {
        return this.wasm.set_metadata(metadata.wasm);
      }

      async nativeScripts(): Promise<WasmContract.NativeScripts | undefined> {
        const wasm = await this.wasm.native_scripts();
        if (wasm) {
          return new $outer.NativeScripts(wasm, $outer._ctx);
        } else {
          return undefined;
        }
      }

      async setNativeScripts(
        native_scripts: WasmContract.NativeScripts
      ): Promise<void> {
        return await this.wasm.set_native_scripts(native_scripts.wasm);
      }

      async plutusScripts(): Promise<WasmContract.PlutusScripts | undefined> {
        const wasm = await this.wasm.plutus_scripts();
        if (wasm) {
          return new $outer.PlutusScripts(wasm, $outer._ctx);
        } else {
          return undefined;
        }
      }

      async setPlutusScripts(
        plutus_scripts: WasmContract.PlutusScripts
      ): Promise<void> {
        return await this.wasm.set_plutus_scripts(plutus_scripts.wasm);
      }

      static async fromBytes(bytes: Uint8Array): Promise<AuxiliaryData> {
        return new AuxiliaryData(
          await WasmV4.AuxiliaryData.from_bytes(bytes),
          $outer._ctx
        );
      }

      static async new(
        metadata: WasmContract.GeneralTransactionMetadata
      ): Promise<AuxiliaryData> {
        const wasm = await WasmV4.AuxiliaryData.new();
        if (metadata) {
          await wasm.set_metadata(metadata.wasm);
        }
        return new AuxiliaryData(wasm, $outer._ctx);
      }

      static async empty(): Promise<AuxiliaryData> {
        return new AuxiliaryData(undefined, $outer._ctx);
      }
    }
    return AuxiliaryData;
  })();

  public AssetName = (() => {
    const $outer = this;

    class AssetName
      extends Ptr<WasmV4.AssetName>
      implements WasmContract.AssetName
    {
      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async name(): Promise<Uint8Array> {
        return await this.wasm.name();
      }

      static async fromBytes(bytes: Uint8Array): Promise<AssetName> {
        return new AssetName(
          await WasmV4.AssetName.from_bytes(bytes),
          $outer._ctx
        );
      }

      static async new(name: Uint8Array): Promise<AssetName> {
        return new AssetName(await WasmV4.AssetName.new(name), $outer._ctx);
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
      async len(): Promise<number> {
        return await this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.AssetName> {
        return new $outer.AssetName(await this.wasm.get(index), $outer._ctx);
      }

      async add(item: WasmContract.AssetName): Promise<void> {
        await this.wasm.add(item.wasm);
      }

      static async new(): Promise<AssetNames> {
        return new AssetNames(await WasmV4.AssetNames.new(), $outer._ctx);
      }
    }
    return AssetNames;
  })();

  public Assets = (() => {
    const $outer = this;

    class Assets extends Ptr<WasmV4.Assets> implements WasmContract.Assets {
      async len(): Promise<number> {
        return await this.wasm.len();
      }

      async insert(
        key: WasmContract.AssetName,
        value: WasmContract.BigNum
      ): Promise<WasmContract.BigNum> {
        return new $outer.BigNum(
          await this.wasm.insert(key.wasm, value.wasm),
          $outer._ctx
        );
      }

      async get(key: WasmContract.AssetName): Promise<WasmContract.BigNum> {
        return new $outer.BigNum(await this.wasm.get(key.wasm), $outer._ctx);
      }

      async keys(): Promise<WasmContract.AssetNames> {
        return new $outer.AssetNames(await this.wasm.keys(), $outer._ctx);
      }

      static async new(): Promise<Assets> {
        return new $outer.Assets(await WasmV4.Assets.new(), $outer._ctx);
      }
    }
    return Assets;
  })();

  public ScriptHash = (() => {
    const $outer = this;

    class ScriptHash
      extends WasmProxy<WasmV4.ScriptHash>
      implements WasmContract.ScriptHash
    {
      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<ScriptHash> {
        return new ScriptHash(
          await WasmV4.ScriptHash.from_bytes(bytes),
          $outer._ctx
        );
      }
    }
    return ScriptHash;
  })();

  public ScriptHashes = (() => {
    const $outer = this;

    class ScriptHashes
      extends WasmProxy<WasmV4.ScriptHashes>
      implements WasmContract.ScriptHashes
    {
      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async len(): Promise<number> {
        return await this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.ScriptHash> {
        return new $outer.ScriptHash(await this.wasm.get(index), $outer._ctx);
      }

      async add(item: WasmContract.ScriptHash): Promise<void> {
        await this.wasm.add(item.wasm);
      }

      static async fromBytes(bytes: Uint8Array): Promise<ScriptHashes> {
        return new $outer.ScriptHashes(
          await WasmV4.ScriptHashes.from_bytes(bytes),
          $outer._ctx
        );
      }

      static async new(): Promise<ScriptHashes> {
        return new $outer.ScriptHashes(
          await WasmV4.ScriptHashes.new(),
          $outer._ctx
        );
      }
    }
    return ScriptHashes;
  })();

  public MultiAsset = (() => {
    const $outer = this;

    class MultiAsset
      extends Ptr<WasmV4.MultiAsset>
      implements WasmContract.MultiAsset
    {
      async len(): Promise<number> {
        return await this.wasm.len();
      }

      async insert(
        key: WasmContract.ScriptHash,
        value: WasmContract.Assets
      ): Promise<WasmContract.Assets> {
        return new $outer.Assets(
          await this.wasm.insert(key.wasm, value.wasm),
          $outer._ctx
        );
      }

      async get(key: WasmContract.ScriptHash): Promise<WasmContract.Assets> {
        return new $outer.Assets(await this.wasm.get(key.wasm), $outer._ctx);
      }

      async keys(): Promise<WasmContract.ScriptHashes> {
        return new $outer.ScriptHashes(await this.wasm.keys(), $outer._ctx);
      }

      async sub(rhs: MultiAsset): Promise<MultiAsset> {
        return new MultiAsset(await this.wasm.sub(rhs.wasm), $outer._ctx);
      }

      static async new(): Promise<MultiAsset> {
        return new MultiAsset(await WasmV4.MultiAsset.new(), $outer._ctx);
      }
    }
    return MultiAsset;
  })();

  public Ed25519KeyHash = (() => {
    const $outer = this;

    class Ed25519KeyHash
      extends Ptr<WasmV4.Ed25519KeyHash>
      implements WasmContract.Ed25519KeyHash
    {
      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async toHex(): Promise<string> {
        return await this.wasm.to_hex();
      }

      static async fromBytes(bytes: Uint8Array): Promise<Ed25519KeyHash> {
        return new Ed25519KeyHash(
          await WasmV4.Ed25519KeyHash.from_bytes(bytes),
          $outer._ctx
        );
      }
    }
    return Ed25519KeyHash;
  })();

  public TransactionHash = (() => {
    const $outer = this;

    class TransactionHash
      extends Ptr<WasmV4.TransactionHash>
      implements WasmContract.TransactionHash
    {
      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async toHex(): Promise<string> {
        return await this.wasm.to_hex();
      }

      static async fromBytes(bytes: Uint8Array): Promise<TransactionHash> {
        return new TransactionHash(
          await WasmV4.TransactionHash.from_bytes(bytes),
          $outer._ctx
        );
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
        return this.wasm.to_bytes();
      }

      async transactionId(): Promise<WasmContract.TransactionHash> {
        return new $outer.TransactionHash(
          await this.wasm.transaction_id(),
          $outer._ctx
        );
      }

      async index(): Promise<number> {
        return await this.wasm.index();
      }

      static async new(
        transactionId: WasmContract.TransactionHash,
        index: number
      ): Promise<TransactionInput> {
        return new TransactionInput(
          await WasmV4.TransactionInput.new(transactionId.wasm, index),
          $outer._ctx
        );
      }

      static async fromBytes(bytes: Uint8Array): Promise<TransactionInput> {
        return new TransactionInput(
          await WasmV4.TransactionInput.from_bytes(bytes),
          $outer._ctx
        );
      }
    }
    return TransactionInput;
  })();

  public Value = (() => {
    const $outer = this;

    class Value extends Ptr<WasmV4.Value> implements WasmContract.Value {
      async coin(): Promise<WasmContract.BigNum> {
        return new $outer.BigNum(await this.wasm.coin(), $outer._ctx);
      }

      async setCoin(coin: WasmContract.BigNum): Promise<void> {
        return await this.wasm.set_coin(coin.wasm);
      }

      async multiasset(): Promise<WasmContract.MultiAsset> {
        return new $outer.MultiAsset(await this.wasm.multiasset(), $outer._ctx);
      }

      async setMultiasset(multiasset: WasmContract.MultiAsset): Promise<void> {
        return await this.wasm.set_multiasset(multiasset.wasm);
      }

      async checkedAdd(rhs: Value): Promise<Value> {
        return new Value(await this.wasm.checked_add(rhs.wasm), $outer._ctx);
      }

      async checkedSub(rhs: Value): Promise<Value> {
        return new Value(await this.wasm.checked_sub(rhs.wasm), $outer._ctx);
      }

      async clampedSub(rhs: Value): Promise<Value> {
        return new Value(await this.wasm.clamped_sub(rhs.wasm), $outer._ctx);
      }

      async compare(rhs: Value): Promise<number> {
        return await this.wasm.compare(rhs.wasm);
      }

      static async new(coin: WasmContract.BigNum): Promise<Value> {
        return new Value(await WasmV4.Value.new(coin.wasm), $outer._ctx);
      }
    }
    return Value;
  })();

  public Address = (() => {
    const $outer = this;

    class Address extends Ptr<WasmV4.Address> implements WasmContract.Address {
      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async toBech32(prefix?: string): Promise<string> {
        return await this.wasm.to_bech32(prefix);
      }

      async networkId(): Promise<number> {
        return await this.wasm.network_id();
      }

      static async fromBytes(bytes: Uint8Array): Promise<Address> {
        return new Address(await WasmV4.Address.from_bytes(bytes), $outer._ctx);
      }

      static async fromBech32(string: string): Promise<Address> {
        return new Address(
          await WasmV4.Address.from_bech32(string),
          $outer._ctx
        );
      }
    }
    return Address;
  })();

  public PublicKey = (() => {
    const $outer = this;

    class PublicKey
      extends Ptr<WasmV4.PublicKey>
      implements WasmContract.PublicKey
    {
      async toBech32(): Promise<string> {
        return await this.wasm.to_bech32();
      }

      async asBytes(): Promise<Uint8Array> {
        return await this.wasm.as_bytes();
      }

      async hash(): Promise<WasmContract.Ed25519KeyHash> {
        return new $outer.Ed25519KeyHash(await this.wasm.hash(), $outer._ctx);
      }

      static async fromBech32(bech32_str: string): Promise<PublicKey> {
        return new PublicKey(
          await WasmV4.PublicKey.from_bech32(bech32_str),
          $outer._ctx
        );
      }

      static async fromBytes(bytes: Uint8Array): Promise<PublicKey> {
        return new PublicKey(
          await WasmV4.PublicKey.from_bytes(bytes),
          $outer._ctx
        );
      }
    }
    return PublicKey;
  })();

  public Bip32PublicKey = (() => {
    const $outer = this;

    class Bip32PublicKey
      extends Ptr<WasmV4.Bip32PublicKey>
      implements WasmContract.Bip32PublicKey
    {
      async derive(index: number): Promise<Bip32PublicKey> {
        return new Bip32PublicKey(await this.wasm.derive(index), $outer._ctx);
      }

      async toRawKey(): Promise<WasmContract.PublicKey> {
        return new $outer.PublicKey(await this.wasm.to_raw_key(), $outer._ctx);
      }

      async asBytes(): Promise<Uint8Array> {
        return await this.wasm.as_bytes();
      }

      async toBech32(): Promise<string> {
        return await this.wasm.to_bech32();
      }

      async chaincode(): Promise<Uint8Array> {
        return await this.wasm.chaincode();
      }

      static async fromBech32(bech32_str: string): Promise<Bip32PublicKey> {
        return new Bip32PublicKey(
          await WasmV4.Bip32PublicKey.from_bech32(bech32_str),
          $outer._ctx
        );
      }

      static async fromBytes(bytes: Uint8Array): Promise<Bip32PublicKey> {
        return new Bip32PublicKey(
          await WasmV4.Bip32PublicKey.from_bytes(bytes),
          $outer._ctx
        );
      }
    }
    return Bip32PublicKey;
  })();

  public PrivateKey = (() => {
    const $outer = this;

    class PrivateKey
      extends Ptr<WasmV4.PrivateKey>
      implements WasmContract.PrivateKey
    {
      async toPublic(): Promise<WasmContract.PublicKey> {
        return new $outer.PublicKey(await this.wasm.to_public(), $outer._ctx);
      }

      async toBech32(): Promise<string> {
        return await this.wasm.to_bech32();
      }

      async asBytes(): Promise<Uint8Array> {
        return await this.wasm.as_bytes();
      }

      async sign(message: Uint8Array): Promise<WasmContract.Ed25519Signature> {
        return new $outer.Ed25519Signature(
          await this.wasm.sign(message),
          $outer._ctx
        );
      }

      static async fromExtendedBytes(bytes: Uint8Array): Promise<PrivateKey> {
        return new PrivateKey(
          (await WasmV4.PrivateKey.from_extended_bytes(bytes)) as any,
          $outer._ctx
        );
      }

      static async fromNormalBytes(bytes: Uint8Array): Promise<PrivateKey> {
        return new PrivateKey(
          (await WasmV4.PrivateKey.from_normal_bytes(bytes)) as any,
          $outer._ctx
        );
      }

      static async generateEd25519(): Promise<PrivateKey> {
        return new PrivateKey(
          await WasmV4.PrivateKey.generate_ed25519(),
          $outer._ctx
        );
      }

      static async generateEd25519extended(): Promise<PrivateKey> {
        return new PrivateKey(
          await WasmV4.PrivateKey.generate_ed25519extended(),
          $outer._ctx
        );
      }

      static async fromBech32(bech32Str: string): Promise<PrivateKey> {
        return new PrivateKey(
          await WasmV4.PrivateKey.from_bech32(bech32Str),
          $outer._ctx
        );
      }
    }
    return PrivateKey;
  })();

  public Bip32PrivateKey = (() => {
    const $outer = this;

    class Bip32PrivateKey
      extends Ptr<WasmV4.Bip32PrivateKey>
      implements WasmContract.Bip32PrivateKey
    {
      async derive(index: number): Promise<Bip32PrivateKey> {
        return new Bip32PrivateKey(await this.wasm.derive(index), $outer._ctx);
      }

      async toRawKey(): Promise<WasmContract.PrivateKey> {
        return new $outer.PrivateKey(await this.wasm.to_raw_key(), $outer._ctx);
      }

      async toPublic(): Promise<WasmContract.Bip32PublicKey> {
        return new $outer.Bip32PublicKey(
          await this.wasm.to_public(),
          $outer._ctx
        );
      }

      async asBytes(): Promise<Uint8Array> {
        return await this.wasm.as_bytes();
      }

      async toBech32(): Promise<string> {
        return await this.wasm.to_bech32();
      }

      static async fromBip39Entropy(
        entropy: Uint8Array,
        password: Uint8Array
      ): Promise<Bip32PrivateKey> {
        return new Bip32PrivateKey(
          await WasmV4.Bip32PrivateKey.from_bip39_entropy(entropy, password),
          $outer._ctx
        );
      }

      static async fromBech32(bech32Str: string): Promise<Bip32PrivateKey> {
        return new Bip32PrivateKey(
          await WasmV4.Bip32PrivateKey.from_bech32(bech32Str),
          $outer._ctx
        );
      }

      static async fromBytes(bytes: Uint8Array): Promise<Bip32PrivateKey> {
        return new Bip32PrivateKey(
          await WasmV4.Bip32PrivateKey.from_bytes(bytes),
          $outer._ctx
        );
      }

      static async generateEd25519Bip32(): Promise<Bip32PrivateKey> {
        return new Bip32PrivateKey(
          await WasmV4.Bip32PrivateKey.generate_ed25519_bip32(),
          $outer._ctx
        );
      }
    }
    return Bip32PrivateKey;
  })();

  public ByronAddress = (() => {
    const $outer = this;

    class ByronAddress
      extends Ptr<WasmV4.ByronAddress>
      implements WasmContract.ByronAddress
    {
      async toBase58(): Promise<string> {
        return await this.wasm.to_base58();
      }

      async toAddress(): Promise<WasmContract.Address> {
        return new $outer.Address(await this.wasm.to_address(), $outer._ctx);
      }

      async byronProtocolMagic(): Promise<number> {
        return await this.wasm.byron_protocol_magic();
      }

      async attributes(): Promise<Uint8Array> {
        return await this.wasm.attributes();
      }

      static async icarusFromKey(
        key: WasmContract.Bip32PublicKey,
        protocolMagic: number
      ): Promise<ByronAddress> {
        return new ByronAddress(
          await WasmV4.ByronAddress.icarus_from_key(key.wasm, protocolMagic),
          $outer._ctx
        );
      }

      static async fromBase58(string: string): Promise<ByronAddress> {
        return new ByronAddress(
          await WasmV4.ByronAddress.from_base58(string),
          $outer._ctx
        );
      }

      static async isValid(string: string): Promise<boolean> {
        return await WasmV4.ByronAddress.is_valid(string);
      }

      static async fromAddress(
        addr: WasmContract.Address
      ): Promise<ByronAddress> {
        return new ByronAddress(
          await WasmV4.ByronAddress.from_address(addr.wasm),
          $outer._ctx
        );
      }
    }
    return ByronAddress;
  })();

  public TransactionOutput = (() => {
    const $outer = this;

    class TransactionOutput
      extends Ptr<WasmV4.TransactionOutput>
      implements WasmContract.TransactionOutput
    {
      static async fromBytes(bytes: Uint8Array): Promise<TransactionOutput> {
        return new TransactionOutput(
          await WasmV4.TransactionOutput.from_bytes(bytes),
          $outer._ctx
        );
      }

      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      static async fromHex(hex: string): Promise<TransactionOutput> {
        return new TransactionOutput(
          await WasmV4.TransactionOutput.from_hex(hex),
          $outer._ctx
        );
      }

      async toHex(): Promise<string> {
        return await this.wasm.to_hex();
      }

      async address(): Promise<WasmContract.Address> {
        return new $outer.Address(await this.wasm.address(), $outer._ctx);
      }

      async amount(): Promise<WasmContract.Value> {
        return new $outer.Value(await this.wasm.amount(), $outer._ctx);
      }

      async hasPlutusData(): Promise<boolean> {
        return await this.wasm.has_plutus_data();
      }

      async setPlutusData(plutusData: WasmContract.PlutusData): Promise<void> {
        await this.wasm.set_plutus_data(plutusData.wasm);
      }

      async plutusData(): Promise<WasmContract.PlutusData | undefined> {
        const wasm = await this.wasm.plutus_data();
        if (wasm) {
          return new $outer.PlutusData(wasm, $outer._ctx);
        } else {
          return undefined;
        }
      }

      async hasDataHash(): Promise<boolean> {
        return await this.wasm.has_data_hash();
      }

      async setDataHash(dataHash: WasmContract.DataHash): Promise<void> {
        await this.wasm.set_data_hash(dataHash.wasm);
      }

      async dataHash(): Promise<WasmContract.DataHash | undefined> {
        const wasm = await this.wasm.data_hash();
        if (wasm) {
          return new $outer.DataHash(wasm, $outer._ctx);
        } else {
          return undefined;
        }
      }

      static async new(
        address: WasmContract.Address,
        amount: WasmContract.Value
      ): Promise<TransactionOutput> {
        return new TransactionOutput(
          await WasmV4.TransactionOutput.new(address.wasm, amount.wasm),
          $outer._ctx
        );
      }
    }
    return TransactionOutput;
  })();

  public DataHash = (() => {
    const $outer = this;

    class DataHash
      extends Ptr<WasmV4.DataHash>
      implements WasmContract.DataHash
    {
      static async fromBytes(bytes: Uint8Array): Promise<DataHash> {
        return new DataHash(
          await WasmV4.DataHash.from_bytes(bytes),
          $outer._ctx
        );
      }

      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      static async fromHex(hex: string): Promise<WasmContract.DataHash> {
        return new DataHash(
          await WasmV4.DataHash.from_bytes(Buffer.from(hex, 'hex')),
          $outer._ctx
        );
      }

      async toHex(): Promise<string> {
        return await this.wasm.to_hex();
      }

      static async fromBech32(str: string): Promise<WasmContract.DataHash> {
        return new DataHash(
          await WasmV4.DataHash.from_bech32(str),
          $outer._ctx
        );
      }

      async toBech32(prefix: string): Promise<string> {
        return await this.wasm.to_bech32(prefix);
      }
    }
    return DataHash;
  })();

  public PlutusData = (() => {
    const $outer = this;

    class PlutusData
      extends Ptr<WasmV4.PlutusData>
      implements WasmContract.PlutusData
    {
      static async fromBytes(bytes: Uint8Array): Promise<PlutusData> {
        return new PlutusData(
          await WasmV4.PlutusData.from_bytes(bytes),
          $outer._ctx
        );
      }

      static async fromJson(
        json: string,
        schema: WasmContract.PlutusDatumSchema
      ): Promise<PlutusData> {
        return new PlutusData(
          await WasmV4.PlutusData.from_json(json, schema),
          $outer._ctx
        );
      }

      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      static async fromHex(hex: string): Promise<PlutusData> {
        return new PlutusData(
          await WasmV4.PlutusData.from_hex(hex),
          $outer._ctx
        );
      }

      async toHex(): Promise<string> {
        return await this.wasm.to_hex();
      }

      async toJson(schema: number): Promise<string> {
        return await this.wasm.to_json(schema);
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
      static async fromBytes(bytes: Uint8Array): Promise<PlutusList> {
        return new PlutusList(
          await WasmV4.PlutusList.from_bytes(bytes),
          $outer._ctx
        );
      }

      async toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      static async fromHex(hex: string): Promise<PlutusList> {
        return new PlutusList(
          await WasmV4.PlutusList.from_hex(hex),
          $outer._ctx
        );
      }

      async toHex(): Promise<string> {
        return this.wasm.to_hex();
      }

      static async new(): Promise<PlutusList> {
        return new PlutusList(await WasmV4.PlutusList.new(), $outer._ctx);
      }

      async len(): Promise<number> {
        return this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.PlutusData> {
        return new $outer.PlutusData(await this.wasm.get(index), $outer._ctx);
      }

      async add(elem: WasmContract.PlutusData): Promise<void> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.add(elem.wasm));
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return PlutusList;
  })();

  public ExUnits = (() => {
    const $outer = this;

    class ExUnits extends Ptr<WasmV4.ExUnits> implements WasmContract.ExUnits {
      static async fromBytes(bytes: Uint8Array): Promise<ExUnits> {
        return new ExUnits(await WasmV4.ExUnits.from_bytes(bytes), $outer._ctx);
      }

      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      static async fromHex(hex: string): Promise<ExUnits> {
        return new ExUnits(await WasmV4.ExUnits.from_hex(hex), $outer._ctx);
      }

      async toHex(): Promise<string> {
        return await this.wasm.to_hex();
      }

      async mem(): Promise<WasmContract.BigNum> {
        return new $outer.BigNum(await this.wasm.mem(), $outer._ctx);
      }

      async steps(): Promise<WasmContract.BigNum> {
        return new $outer.BigNum(await this.wasm.steps(), $outer._ctx);
      }

      static async new(
        mem: WasmContract.BigNum,
        steps: WasmContract.BigNum
      ): Promise<ExUnits> {
        return new ExUnits(
          await WasmV4.ExUnits.new(mem.wasm, steps.wasm),
          $outer._ctx
        );
      }
    }
    return ExUnits;
  })();

  public Redeemer = (() => {
    const $outer = this;

    class Redeemer
      extends Ptr<WasmV4.Redeemer>
      implements WasmContract.Redeemer
    {
      static async fromBytes(bytes: Uint8Array): Promise<Redeemer> {
        return new Redeemer(
          await WasmV4.Redeemer.from_bytes(bytes),
          $outer._ctx
        );
      }

      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      static async fromHex(hex: string): Promise<Redeemer> {
        return new Redeemer(await WasmV4.Redeemer.from_hex(hex), $outer._ctx);
      }

      async toHex(): Promise<string> {
        return await this.wasm.to_hex();
      }

      static async new(
        tag: WasmContract.RedeemerTag,
        index: WasmContract.BigNum,
        data: WasmContract.PlutusData,
        exUnits: WasmContract.ExUnits
      ): Promise<Redeemer> {
        return new Redeemer(
          await WasmV4.Redeemer.new(
            tag.wasm,
            index.wasm,
            data.wasm,
            exUnits.wasm
          ),
          $outer._ctx
        );
      }

      async tag(): Promise<WasmContract.RedeemerTag> {
        return new $outer.RedeemerTag(await this.wasm.tag(), $outer._ctx);
      }

      async index(): Promise<WasmContract.BigNum> {
        return new $outer.BigNum(await this.wasm.index(), $outer._ctx);
      }

      async data(): Promise<WasmContract.PlutusData> {
        return new $outer.PlutusData(await this.wasm.data(), $outer._ctx);
      }

      async exUnits(): Promise<WasmContract.ExUnits> {
        return new $outer.ExUnits(await this.wasm.ex_units(), $outer._ctx);
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
      static async fromBytes(bytes: Uint8Array): Promise<RedeemerTag> {
        return new RedeemerTag(
          await WasmV4.RedeemerTag.from_bytes(bytes),
          $outer._ctx
        );
      }

      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      static async fromHex(hex: string): Promise<WasmContract.RedeemerTag> {
        return new RedeemerTag(
          await WasmV4.RedeemerTag.from_hex(hex),
          $outer._ctx
        );
      }

      async toHex(): Promise<string> {
        return await this.wasm.to_hex();
      }

      static async newSpend(): Promise<RedeemerTag> {
        return new RedeemerTag(
          await WasmV4.RedeemerTag.new_spend(),
          $outer._ctx
        );
      }

      static async newMint(): Promise<RedeemerTag> {
        return new RedeemerTag(
          await WasmV4.RedeemerTag.new_mint(),
          $outer._ctx
        );
      }

      static async newCert(): Promise<RedeemerTag> {
        return new RedeemerTag(
          await WasmV4.RedeemerTag.new_cert(),
          $outer._ctx
        );
      }

      static async newReward(): Promise<RedeemerTag> {
        return new RedeemerTag(
          await WasmV4.RedeemerTag.new_reward(),
          $outer._ctx
        );
      }

      async kind(): Promise<number> {
        return await this.wasm.kind();
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
      static async fromBytes(bytes: Uint8Array): Promise<Redeemers> {
        return new Redeemers(
          await WasmV4.Redeemers.from_bytes(bytes),
          $outer._ctx
        );
      }

      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      static async fromHex(hex: string): Promise<Redeemers> {
        return new Redeemers(await WasmV4.Redeemers.from_hex(hex), $outer._ctx);
      }

      async toHex(): Promise<string> {
        return await this.wasm.to_hex();
      }

      async totalExUnits(): Promise<WasmContract.ExUnits> {
        return new $outer.ExUnits(
          await this.wasm.total_ex_units(),
          $outer._ctx
        );
      }

      static async new(): Promise<Redeemers> {
        return new Redeemers(await WasmV4.Redeemers.new(), $outer._ctx);
      }

      async len(): Promise<number> {
        return await this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.Redeemer> {
        return new $outer.Redeemer(await this.wasm.get(index), $outer._ctx);
      }

      async add(elem: WasmContract.Redeemer): Promise<void> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.add(elem.wasm));
          } catch (e) {
            reject(e);
          }
        });
      }
    }
    return Redeemers;
  })();

  public CostModel = (() => {
    const $outer = this;

    class CostModel
      extends Ptr<WasmV4.CostModel>
      implements WasmContract.CostModel
    {
      static async fromBytes(bytes: Uint8Array): Promise<CostModel> {
        return new CostModel(
          await WasmV4.CostModel.from_bytes(bytes),
          $outer._ctx
        );
      }

      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      static async fromHex(hex: string): Promise<WasmContract.CostModel> {
        return new CostModel(await WasmV4.CostModel.from_hex(hex), $outer._ctx);
      }

      async toHex(): Promise<string> {
        return await this.wasm.to_hex();
      }

      async get(operation: number): Promise<WasmContract.Int> {
        return new $outer.Int(await this.wasm.get(operation), $outer._ctx);
      }

      async set(
        operation: number,
        cost: WasmContract.Int
      ): Promise<WasmContract.Int> {
        return new $outer.Int(
          await this.wasm.set(operation, cost.wasm),
          $outer._ctx
        );
      }

      async len(): Promise<number> {
        return this.wasm.len();
      }

      static async new(): Promise<WasmContract.CostModel> {
        return new CostModel(await WasmV4.CostModel.new(), $outer._ctx);
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
      static async fromBytes(bytes: Uint8Array): Promise<Costmdls> {
        return new Costmdls(
          await WasmV4.Costmdls.from_bytes(bytes),
          $outer._ctx
        );
      }

      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      static async fromHex(hex: string): Promise<Costmdls> {
        return new Costmdls(await WasmV4.Costmdls.from_hex(hex), $outer._ctx);
      }

      async toHex(): Promise<string> {
        return await this.wasm.to_hex();
      }

      async len(): Promise<number> {
        return this.wasm.len();
      }

      async get(key: WasmContract.Language): Promise<WasmContract.CostModel> {
        return new $outer.CostModel(await this.wasm.get(key.wasm), $outer._ctx);
      }

      async insert(
        key: WasmContract.Language,
        value: WasmContract.CostModel
      ): Promise<WasmContract.CostModel | undefined> {
        const wasm = await this.wasm.insert(key.wasm, value.wasm);
        if (wasm) {
          return new $outer.CostModel(wasm, $outer._ctx);
        } else {
          return undefined;
        }
      }

      async keys(): Promise<WasmContract.Languages> {
        return new $outer.Languages(await this.wasm.keys(), $outer._ctx);
      }

      async retainLanguageVersions(
        languages: WasmContract.Languages
      ): Promise<WasmContract.Costmdls> {
        return new $outer.Costmdls(
          await this.wasm.retain_language_versions(languages.wasm),
          $outer._ctx
        );
      }

      static async new(): Promise<Costmdls> {
        return new Costmdls(await WasmV4.Costmdls.new(), $outer._ctx);
      }
    }
    return Costmdls;
  })();

  public Language = (() => {
    const $outer = this;

    class Language
      extends Ptr<WasmV4.Language>
      implements WasmContract.Language
    {
      static async fromBytes(bytes: Uint8Array): Promise<Language> {
        return new Language(
          await WasmV4.Language.from_bytes(bytes),
          $outer._ctx
        );
      }

      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      static async fromHex(hex: string): Promise<WasmContract.Language> {
        return new Language(await WasmV4.Language.from_hex(hex), $outer._ctx);
      }

      async toHex(): Promise<string> {
        return await this.wasm.to_hex();
      }

      static async newPlutusV1(): Promise<WasmContract.Language> {
        return new Language(await WasmV4.Language.new_plutus_v1(), $outer._ctx);
      }

      static async newPlutusV2(): Promise<WasmContract.Language> {
        return new Language(await WasmV4.Language.new_plutus_v2(), $outer._ctx);
      }

      async kind(): Promise<number> {
        return await this.wasm.kind();
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
      async len(): Promise<number> {
        return this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.Language> {
        return new $outer.Language(await this.wasm.get(index), $outer._ctx);
      }

      async add(elem: WasmContract.Language): Promise<void> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.add(elem.wasm));
          } catch (e) {
            reject(e);
          }
        });
      }

      static async new(): Promise<Languages> {
        return new Languages(await WasmV4.Languages.new(), $outer._ctx);
      }

      static async list(): Promise<WasmContract.Languages> {
        return new Languages(await WasmV4.Languages.list(), $outer._ctx);
      }
    }
    return Languages;
  })();

  public ScriptDataHash = (() => {
    const $outer = this;

    class ScriptDataHash
      extends Ptr<WasmV4.ScriptDataHash>
      implements WasmContract.ScriptDataHash
    {
      static async fromBytes(bytes: Uint8Array): Promise<ScriptDataHash> {
        return new ScriptDataHash(
          await WasmV4.ScriptDataHash.from_bytes(bytes),
          $outer._ctx
        );
      }

      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      static async fromHex(hex: string): Promise<WasmContract.ScriptDataHash> {
        return new ScriptDataHash(
          await WasmV4.ScriptDataHash.from_hex(hex),
          $outer._ctx
        );
      }

      async toHex(): Promise<string> {
        return await this.wasm.to_hex();
      }

      static async fromBech32(
        str: string
      ): Promise<WasmContract.ScriptDataHash> {
        return new ScriptDataHash(
          await WasmV4.ScriptDataHash.from_bech32(str),
          $outer._ctx
        );
      }

      async toBech32(prefix: string): Promise<string> {
        return await this.wasm.to_bech32(prefix);
      }
    }
    return ScriptDataHash;
  })();

  public URL = (() => {
    const $outer = this;

    class URL extends Ptr<WasmV4.URL> implements WasmContract.URL {
      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async url(): Promise<string> {
        return await this.wasm.url();
      }

      static async new(url: string): Promise<WasmContract.URL> {
        return new URL(await WasmV4.URL.new(url), $outer._ctx);
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.URL> {
        return new URL(await WasmV4.URL.from_bytes(bytes), $outer._ctx);
      }
    }

    return URL;
  })();

  public AnchorDataHash = (() => {
    const $outer = this;

    class AnchorDataHash
      extends Ptr<WasmV4.AnchorDataHash>
      implements WasmContract.AnchorDataHash
    {
      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async toHex(): Promise<string> {
        return await this.wasm.to_hex();
      }

      static async fromBytes(bytes: Uint8Array): Promise<AnchorDataHash> {
        return new AnchorDataHash(await WasmV4.AnchorDataHash.from_bytes(bytes), $outer._ctx);
      }
    }
    return AnchorDataHash;
  })();

  public Anchor = (() => {
    const $outer = this;

    class Anchor extends Ptr<WasmV4.Anchor> implements WasmContract.Anchor {
      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async url(): Promise<WasmContract.URL> {
        return new $outer.URL(await this.wasm.url(), $outer._ctx);
      }

      async anchorDataHash(): Promise<WasmContract.AnchorDataHash> {
        return new $outer.AnchorDataHash(await this.wasm.anchor_data_hash(), $outer._ctx);
      }

      static async new(
        anchorUrl: WasmContract.URL,
        anchorDataHash: WasmContract.AnchorDataHash
      ): Promise<WasmContract.Anchor> {
        return new Anchor(await WasmV4.Anchor.new(anchorUrl.wasm, anchorDataHash.wasm),$outer._ctx);
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.Anchor> {
        return new Anchor(await WasmV4.Anchor.from_bytes(bytes), $outer._ctx);
      }
    }

    return Anchor;
  })();

  public Credential = (() => {
    const $outer = this;

    class Credential
      extends Ptr<WasmV4.Credential>
      implements WasmContract.Credential
    {
      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async toKeyhash(): Promise<WasmContract.Ed25519KeyHash> {
        return new $outer.Ed25519KeyHash(
          await this.wasm.to_keyhash(),
          $outer._ctx
        );
      }

      async toScripthash(): Promise<WasmContract.ScriptHash> {
        return new $outer.ScriptHash(
          await this.wasm.to_scripthash(),
          $outer._ctx
        );
      }

      async kind(): Promise<number> {
        return await this.wasm.kind();
      }

      static async fromBytes(bytes: Uint8Array): Promise<Credential> {
        return new Credential(
          await WasmV4.Credential.from_bytes(bytes),
          $outer._ctx
        );
      }

      static async fromKeyhash(
        hash: WasmContract.Ed25519KeyHash
      ): Promise<Credential> {
        return new Credential(
          await WasmV4.Credential.from_keyhash(hash.wasm),
          $outer._ctx
        );
      }

      static async fromScripthash(
        hash: WasmContract.ScriptHash
      ): Promise<Credential> {
        return new Credential(
          await WasmV4.Credential.from_scripthash(hash.wasm),
          $outer._ctx
        );
      }
    }
    return Credential;
  })();

  public StakeRegistration = (() => {
    const $outer = this;

    class StakeRegistration
      extends Ptr<WasmV4.StakeRegistration>
      implements WasmContract.StakeRegistration
    {
      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async stakeCredential(): Promise<WasmContract.Credential> {
        return new $outer.Credential(
          await this.wasm.stake_credential(),
          $outer._ctx
        );
      }

      static async new(
        stakeCredential: WasmContract.Credential
      ): Promise<StakeRegistration> {
        return new StakeRegistration(
          await WasmV4.StakeRegistration.new(stakeCredential.wasm),
          $outer._ctx
        );
      }

      static async fromBytes(bytes: Uint8Array): Promise<StakeRegistration> {
        return new StakeRegistration(
          await WasmV4.StakeRegistration.from_bytes(bytes),
          $outer._ctx
        );
      }
    }
    return StakeRegistration;
  })();

  public StakeDeregistration = (() => {
    const $outer = this;

    class StakeDeregistration
      extends Ptr<WasmV4.StakeDeregistration>
      implements WasmContract.StakeDeregistration
    {
      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async stakeCredential(): Promise<WasmContract.Credential> {
        return new $outer.Credential(
          await this.wasm.stake_credential(),
          $outer._ctx
        );
      }

      static async new(
        stakeCredential: WasmContract.Credential
      ): Promise<StakeDeregistration> {
        return new StakeDeregistration(
          await WasmV4.StakeDeregistration.new(stakeCredential.wasm),
          $outer._ctx
        );
      }

      static async fromBytes(bytes: Uint8Array): Promise<StakeDeregistration> {
        return new StakeDeregistration(
          await WasmV4.StakeDeregistration.from_bytes(bytes),
          $outer._ctx
        );
      }
    }
    return StakeDeregistration;
  })();

  public StakeDelegation = (() => {
    const $outer = this;

    class StakeDelegation
      extends Ptr<WasmV4.StakeDelegation>
      implements WasmContract.StakeDelegation
    {
      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async stakeCredential(): Promise<WasmContract.Credential> {
        return new $outer.Credential(
          await this.wasm.stake_credential(),
          $outer._ctx
        );
      }

      async poolKeyhash(): Promise<WasmContract.Ed25519KeyHash> {
        return new $outer.Ed25519KeyHash(
          await this.wasm.pool_keyhash(),
          $outer._ctx
        );
      }

      static async new(
        stakeCredential: WasmContract.Credential,
        poolKeyHash: WasmContract.Ed25519KeyHash
      ): Promise<StakeDelegation> {
        return new StakeDelegation(
          await WasmV4.StakeDelegation.new(
            stakeCredential.wasm,
            poolKeyHash.wasm
          ),
          $outer._ctx
        );
      }

      static async fromBytes(bytes: Uint8Array): Promise<StakeDelegation> {
        return new StakeDelegation(
          await WasmV4.StakeDelegation.from_bytes(bytes),
          $outer._ctx
        );
      }
    }
    return StakeDelegation;
  })();

  public CommitteeHotAuth = (() => {
    const $outer = this;

    class CommitteeHotAuth
      extends Ptr<WasmV4.CommitteeHotAuth>
      implements WasmContract.CommitteeHotAuth
    {
      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async committeeColdKey(): Promise<WasmContract.Credential> {
        return new $outer.Credential(await this.wasm.committee_cold_key(), $outer._ctx);
      }

      async committeeHotKey(): Promise<WasmContract.Credential> {
        return new $outer.Credential(await this.wasm.committee_hot_key(), $outer._ctx);
      }

      async hasScriptCredentials(): Promise<boolean> {
        return await this.wasm.has_script_credentials();
      }

      static async new(
        committeeColdKey: WasmContract.Credential,
        committeeHotKey: WasmContract.Credential
      ): Promise<WasmContract.CommitteeHotAuth> {
        return new CommitteeHotAuth(
                await WasmV4.CommitteeHotAuth.new(
                  committeeColdKey.wasm,
                  committeeHotKey.wasm
                ),
                $outer._ctx
              );
      }

      static async fromBytes(
        bytes: Uint8Array
      ): Promise<WasmContract.CommitteeHotAuth> {
        return new CommitteeHotAuth(await WasmV4.CommitteeHotAuth.from_bytes(bytes), $outer._ctx);
      }
    }

    return CommitteeHotAuth;
  })();

  public DrepDeregistration = (() => {
    const $outer = this;

    class DrepDeregistration
      extends Ptr<WasmV4.DrepDeregistration>
      implements WasmContract.DrepDeregistration
    {
      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async votingCredential(): Promise<WasmContract.Credential> {
        return new $outer.Credential(await this.wasm.voting_credential(), $outer._ctx);
      }

      async coin(): Promise<WasmContract.BigNum> {
        return new $outer.BigNum(await this.wasm.coin(), $outer._ctx);
      }

      async hasScriptCredentials(): Promise<boolean> {
        return await this.wasm.has_script_credentials();
      }

      static async new(
        votingCredential: WasmContract.Certificate,
        coin: WasmContract.BigNum
      ): Promise<WasmContract.DrepDeregistration> {
        return new DrepDeregistration(
          await WasmV4.DrepDeregistration.new(votingCredential.wasm, coin.wasm),
          $outer._ctx
        );
      }

      static async fromBytes(
        bytes: Uint8Array
      ): Promise<WasmContract.DrepDeregistration> {
        return new DrepDeregistration(await WasmV4.DrepDeregistration.from_bytes(bytes), $outer._ctx);
      }
    }

    return DrepDeregistration;
  })();

  public CommitteeColdResign = (() => {
    const $outer = this;

    class CommitteeColdResign
      extends Ptr<WasmV4.CommitteeColdResign>
      implements WasmContract.CommitteeColdResign
    {
      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async committeeColdKey(): Promise<WasmContract.Credential> {
        return new $outer.Credential(await this.wasm.committee_cold_key(), $outer._ctx);
      }

      async hasScriptCredentials(): Promise<boolean> {
        return await this.wasm.has_script_credentials();
      }

      static async new(
        committeeColdKey: WasmContract.Credential
      ): Promise<WasmContract.CommitteeColdResign> {
        return new CommitteeColdResign(await WasmV4.CommitteeColdResign.new(committeeColdKey.wasm), $outer._ctx);
      }

      static async fromBytes(
        bytes: Uint8Array
      ): Promise<WasmContract.CommitteeColdResign> {
        return new CommitteeColdResign(await WasmV4.CommitteeColdResign.from_bytes(bytes), $outer._ctx);
      }
    }

    return CommitteeColdResign;
  })();

  public DrepUpdate = (() => {
    const $outer = this;

    class DrepUpdate
      extends Ptr<WasmV4.DrepUpdate>
      implements WasmContract.DrepUpdate
    {
      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async votingCredential(): Promise<WasmContract.Credential> {
        return new $outer.Credential(await this.wasm.voting_credential(), $outer._ctx);
      }

      async anchor(): Promise<WasmContract.Anchor> {
        return new $outer.Anchor(await this.wasm.anchor(), $outer._ctx);
      }

      static async new(
        votingCredential: WasmContract.Credential
      ): Promise<WasmContract.DrepUpdate> {
        return new DrepUpdate(await WasmV4.DrepUpdate.new(votingCredential.wasm), $outer._ctx);
      }

      static async newWithAnchor(
        votingCredential: WasmContract.Credential,
        anchor: WasmContract.Anchor
      ): Promise<WasmContract.DrepUpdate> {
        return new DrepUpdate(
                await WasmV4.DrepUpdate.new_with_anchor(
                  votingCredential.wasm,
                  anchor.wasm
                ),
                $outer._ctx
              );
      }

      static async fromBytes(bytes: Uint8Array): Promise<WasmContract.DrepUpdate> {
        return new DrepUpdate(await WasmV4.DrepUpdate.from_bytes(bytes), $outer._ctx);
      }
    }

    return DrepUpdate;
  })();

  public VoteRegistrationAndDelegation = (() => {
    const $outer = this;

    class VoteRegistrationAndDelegation
      extends Ptr<WasmV4.VoteRegistrationAndDelegation>
      implements WasmContract.VoteRegistrationAndDelegation
    {
      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async stakeCredential(): Promise<WasmContract.Credential> {
        return new $outer.Credential(await this.wasm.stake_credential(), $outer._ctx);
      }

      async drep(): Promise<WasmContract.DRep> {
        return new $outer.DRep(await this.wasm.drep(), $outer._ctx);
      }

      async coin(): Promise<WasmContract.BigNum> {
        return new $outer.BigNum(await this.wasm.coin(), $outer._ctx);
      }

      async hasScriptCredential(): Promise<boolean> {
        return await this.wasm.has_script_credentials();
      }

      static async new(
        stakeCredential: WasmContract.Credential,
        drep: WasmContract.DRep,
        coin: WasmContract.BigNum
      ): Promise<WasmContract.VoteRegistrationAndDelegation> {
        return new VoteRegistrationAndDelegation(
          await WasmV4.VoteRegistrationAndDelegation.new(
            stakeCredential.wasm,
            drep.wasm,
            coin.wasm
          ),
          $outer._ctx
        );
      }

      static async fromBytes(
        bytes: Uint8Array
      ): Promise<VoteRegistrationAndDelegation> {
        return new VoteRegistrationAndDelegation(
          await WasmV4.VoteRegistrationAndDelegation.from_bytes(bytes),
          $outer._ctx
        );
      }
    }

    return VoteRegistrationAndDelegation;
  })();

  public VoteDelegation = (() => {
    const $outer = this;

    class VoteDelegation
      extends Ptr<WasmV4.VoteDelegation>
      implements WasmContract.VoteDelegation
    {
      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async stakeCredential(): Promise<WasmContract.Credential> {
        return new $outer.Credential(await this.wasm.stake_credential(), $outer._ctx);
      }

      async drep(): Promise<WasmContract.DRep> {
        return new $outer.DRep(await this.wasm.drep(), $outer._ctx);
      }

      async hasScriptCredential(): Promise<boolean> {
        return await this.wasm.has_script_credentials();
      }

      static async new(
        stakeCredential: WasmContract.Credential,
        drep: WasmContract.DRep
      ): Promise<WasmContract.VoteDelegation> {
        return new VoteDelegation(await WasmV4.VoteDelegation.new(stakeCredential.wasm, drep.wasm), $outer._ctx);
      }

      static async fromBytes(bytes: Uint8Array): Promise<VoteDelegation> {
        return new VoteDelegation(await WasmV4.VoteDelegation.from_bytes(bytes), $outer._ctx);
      }
    }

    return VoteDelegation;
  })();

  public StakeRegistrationAndDelegation = (() => {
    const $outer = this;

    class StakeRegistrationAndDelegation
      extends Ptr<WasmV4.StakeRegistrationAndDelegation>
      implements WasmContract.StakeRegistrationAndDelegation
    {
      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async stakeCredential(): Promise<WasmContract.Credential> {
        return new $outer.Credential(await this.wasm.stake_credential(), $outer._ctx);
      }

      async poolKeyhash(): Promise<WasmContract.Ed25519KeyHash> {
        return new $outer.Ed25519KeyHash(await this.wasm.pool_keyhash(), $outer._ctx);
      }

      async coin(): Promise<WasmContract.BigNum> {
        return new $outer.BigNum(await this.wasm.coin(), $outer._ctx);
      }

      async hasScriptCredential(): Promise<boolean> {
        return await this.wasm.has_script_credentials();
      }

      static async new(
        stakeCredential: WasmContract.Credential,
        poolKeyHash: WasmContract.Ed25519KeyHash,
        coin: WasmContract.BigNum
      ): Promise<WasmContract.StakeRegistrationAndDelegation> {
        return new StakeRegistrationAndDelegation(
                await WasmV4.StakeRegistrationAndDelegation.new(
                  stakeCredential.wasm,
                  poolKeyHash.wasm,
                  coin.wasm
                ),
                $outer._ctx
              );
      }

      static async fromBytes(
        bytes: Uint8Array
      ): Promise<StakeRegistrationAndDelegation> {
        return new StakeRegistrationAndDelegation(
          await WasmV4.StakeRegistrationAndDelegation.from_bytes(bytes),
          $outer._ctx
        );
      }
    }

    return StakeRegistrationAndDelegation;
  })();

  public Certificate = (() => {
    const $outer = this;

    class Certificate
      extends Ptr<WasmV4.Certificate>
      implements WasmContract.Certificate
    {
      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async asStakeRegistration(): Promise<WasmContract.StakeRegistration> {
        return new $outer.StakeRegistration(
          await this.wasm.as_stake_registration(),
          $outer._ctx
        );
      }

      async asStakeDeregistration(): Promise<WasmContract.StakeDeregistration> {
        return new $outer.StakeDeregistration(
          await this.wasm.as_stake_deregistration(),
          $outer._ctx
        );
      }

      async asStakeDelegation(): Promise<WasmContract.StakeDelegation> {
        return new $outer.StakeDelegation(
          await this.wasm.as_stake_delegation(),
          $outer._ctx
        );
      }

      static async fromBytes(bytes: Uint8Array): Promise<Certificate> {
        return new Certificate(
          await WasmV4.Certificate.from_bytes(bytes),
          $outer._ctx
        );
      }

      static async newStakeRegistration(
        stakeRegistration: WasmContract.StakeRegistration
      ): Promise<Certificate> {
        return new Certificate(
          await WasmV4.Certificate.new_stake_registration(
            stakeRegistration.wasm
          ),
          $outer._ctx
        );
      }

      static async newStakeDeregistration(
        stakeDeregistration: WasmContract.StakeDeregistration
      ): Promise<Certificate> {
        return new Certificate(
          await WasmV4.Certificate.new_stake_deregistration(
            stakeDeregistration.wasm
          ),
          $outer._ctx
        );
      }

      static async newStakeDelegation(
        stakeDelegation: WasmContract.StakeDelegation
      ): Promise<Certificate> {
        return new Certificate(
          await WasmV4.Certificate.new_stake_delegation(stakeDelegation.wasm),
          $outer._ctx
        );
      }

      static async newDrepDeregistration(
        drepDeregistration: WasmContract.DrepDeregistration
      ): Promise<Certificate> {
        return new Certificate(
          await WasmV4.Certificate.new_drep_deregistration(
            drepDeregistration.wasm
          ),
          $outer._ctx
        );
      }

      static async newDrepRegistration(
        drepRegistration: WasmContract.DrepRegistration
      ): Promise<Certificate> {
        return new Certificate(
          await WasmV4.Certificate.new_drep_registration(drepRegistration.wasm),
          $outer._ctx
        );
      }

      static async newDrepUpdate(
        drepUpdate: WasmContract.DrepUpdate
      ): Promise<Certificate> {
        return new Certificate(
          await WasmV4.Certificate.new_drep_update(drepUpdate.wasm),
          $outer._ctx
        );
      }

      static async newStakeAndVoteDelegation(
        stakeAndVoteDelegation: WasmContract.StakeAndVoteDelegation
      ): Promise<Certificate> {
        return new Certificate(
          await WasmV4.Certificate.new_stake_and_vote_delegation(
            stakeAndVoteDelegation.wasm
          ),
          $outer._ctx
        );
      }

      static async newStakeRegistrationAndDelegation(
        stakeRegistrationAndDelegation: WasmContract.StakeRegistrationAndDelegation
      ): Promise<Certificate> {
        return new Certificate(
          await WasmV4.Certificate.new_stake_registration_and_delegation(
            stakeRegistrationAndDelegation.wasm
          ),
          $outer._ctx
        );
      }

      static async newStakeVoteRegistrationAndDelegation(
        stakeVoteRegistrationAndDelegation: WasmContract.StakeVoteRegistrationAndDelegation
      ): Promise<Certificate> {
        return new Certificate(
          await WasmV4.Certificate.new_stake_vote_registration_and_delegation(
            stakeVoteRegistrationAndDelegation.wasm
          ),
          $outer._ctx
        );
      }

      static async newVoteDelegation(
        voteDelegation: WasmContract.VoteDelegation
      ): Promise<Certificate> {
        return new Certificate(
          await WasmV4.Certificate.new_vote_delegation(voteDelegation.wasm),
          $outer._ctx
        );
      }

      static async newVoteRegistrationAndDelegation(
        voteRegistrationAndDelegation: WasmContract.VoteRegistrationAndDelegation
      ): Promise<Certificate> {
        return new Certificate(
          await WasmV4.Certificate.new_vote_registration_and_delegation(
            voteRegistrationAndDelegation.wasm
          ),
          $outer._ctx
        );
      }

      static async newCommitteeHotKeyRegistration(
        committeeHotAuth: WasmContract.CommitteeHotAuth
      ): Promise<Certificate> {
        return new Certificate(
          await WasmV4.Certificate.new_committee_hot_key_registration(
            committeeHotAuth.wasm
          ),
          $outer._ctx
        );
      }

      static async newCommitteeHotKeyDeregistration(
        committeeColdResign: WasmContract.CommitteeColdResign
      ): Promise<Certificate> {
        return new Certificate(
          await WasmV4.Certificate.new_committee_hot_key_deregistration(
            committeeColdResign.wasm
          ),
          $outer._ctx
        );
    }


      async asDrepRegistration(): Promise<WasmContract.DrepRegistration> {
        return new $outer.DrepRegistration(
          await this.wasm.as_drep_registration(),
          $outer._ctx
        );
      }

      async asCommitteeHotKeyDeregistration(): Promise<WasmContract.CommitteeColdResign> {
        return new $outer.CommitteeColdResign(
          await this.wasm.as_committee_hot_key_deregistration(),
          $outer._ctx
        );
      }

      async asCommitteeHotKeyRegistration(): Promise<WasmContract.CommitteeHotAuth> {
        return new $outer.CommitteeHotAuth(
          await this.wasm.as_committee_hot_key_registration(),
          $outer._ctx
        );
      }

      async asDrepDeregistration(): Promise<WasmContract.DrepDeregistration> {
        return new $outer.DrepDeregistration(
          await this.wasm.as_drep_deregistration(),
          $outer._ctx
        );
      }

      async asDrepUpdate(): Promise<WasmContract.DrepUpdate> {
        return new $outer.DrepUpdate(await this.wasm.as_drep_update(), $outer._ctx);
      }

      async asStakeAndVoteDelegation(): Promise<WasmContract.StakeAndVoteDelegation> {
        return new $outer.StakeAndVoteDelegation(
          await this.wasm.as_stake_and_vote_delegation(),
          $outer._ctx
        );
      }

      async asStakeRegistrationAndDelegation(): Promise<WasmContract.StakeRegistrationAndDelegation> {
        return new $outer.StakeRegistrationAndDelegation(
          await this.wasm.as_stake_registration_and_delegation(),
          $outer._ctx
        );
      }

      async asStakeVoteRegistrationAndDelegation(): Promise<WasmContract.StakeVoteRegistrationAndDelegation> {
        return new $outer.StakeVoteRegistrationAndDelegation(
          await this.wasm.as_stake_vote_registration_and_delegation(),
          $outer._ctx
        );
      }

      async asVoteDelegation(): Promise<WasmContract.VoteDelegation> {
        return new $outer.VoteDelegation(
          await this.wasm.as_vote_delegation(),
          $outer._ctx
        );
      }

      async asVoteRegistrationAndDelegation(): Promise<WasmContract.VoteRegistrationAndDelegation> {
        return new $outer.VoteRegistrationAndDelegation(
          await this.wasm.as_vote_registration_and_delegation(),
          $outer._ctx
        );
      }

      async kind(): Promise<number> {
        return await this.wasm.kind();
      }
    }
    return Certificate;
  })();

  public DRep = (() => {
    const $outer = this;

    class DRep extends Ptr<WasmV4.DRep> implements WasmContract.DRep {
      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async toKeyHash(): Promise<WasmContract.Ed25519KeyHash> {
        return new $outer.Ed25519KeyHash(await this.wasm.to_key_hash(), $outer._ctx);
      }

      async toScriptHash(): Promise<WasmContract.ScriptDataHash> {
        return new $outer.ScriptDataHash(await this.wasm.to_script_hash(), $outer._ctx);
      }

      async kind(): Promise<number> {
        return await this.wasm.kind();
      }

      static async newKeyHash(
        keyHash: WasmContract.Ed25519KeyHash
      ): Promise<WasmContract.DRep> {
        return new DRep(await WasmV4.DRep.new_key_hash(keyHash.wasm), $outer._ctx);
      }

      static async newScriptHash(
        scriptHash: WasmContract.ScriptDataHash
      ): Promise<WasmContract.DRep> {
        return new DRep(await WasmV4.DRep.new_script_hash(scriptHash.wasm), $outer._ctx);
      }

      static async newAlwaysAbstain(): Promise<WasmContract.DRep> {
        return new DRep(await WasmV4.DRep.new_always_abstain(), $outer._ctx);
      }

      static async newAlwasyNoConfidence(): Promise<WasmContract.DRep> {
        return new DRep(await WasmV4.DRep.new_always_no_confidence(), $outer._ctx);
      }

      static async fromBytes(bytes: Uint8Array): Promise<DRep> {
        return new DRep(await WasmV4.DRep.from_bytes(bytes), $outer._ctx);
      }
    }

    return DRep;
  })();

  public StakeAndVoteDelegation = (() => {
    const $outer = this;

    class StakeAndVoteDelegation
      extends Ptr<WasmV4.StakeAndVoteDelegation>
      implements WasmContract.StakeAndVoteDelegation
    {
      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async stakeCredential(): Promise<WasmContract.Credential> {
        return new $outer.Credential(await this.wasm.stake_credential(), $outer._ctx);
      }

      async poolKeyhash(): Promise<WasmContract.Ed25519KeyHash> {
        return new $outer.Ed25519KeyHash(await this.wasm.pool_keyhash(), $outer._ctx);
      }

      async drep(): Promise<WasmContract.DRep> {
        return new $outer.DRep(await this.wasm.drep(), $outer._ctx);
      }

      async hasScriptCredential(): Promise<boolean> {
        return await this.wasm.has_script_credentials();
      }

      static async new(
        stakeCredential: WasmContract.Credential,
        poolKeyHash: WasmContract.Ed25519KeyHash,
        drep: WasmContract.DRep
      ): Promise<WasmContract.StakeAndVoteDelegation> {
        return new StakeAndVoteDelegation(
                await WasmV4.StakeAndVoteDelegation.new(
                  stakeCredential.wasm,
                  poolKeyHash.wasm,
                  drep.wasm
                ),
                $outer._ctx
              );
      }

      static async fromBytes(bytes: Uint8Array): Promise<StakeAndVoteDelegation> {
        return new StakeAndVoteDelegation(await WasmV4.StakeAndVoteDelegation.from_bytes(bytes), $outer._ctx);
      }
    }

    return StakeAndVoteDelegation;
  })();

  public StakeVoteRegistrationAndDelegation = (() => {
    const $outer = this;

    class StakeVoteRegistrationAndDelegation
      extends Ptr<WasmV4.StakeVoteRegistrationAndDelegation>
      implements WasmContract.StakeVoteRegistrationAndDelegation
    {
      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async stakeCredential(): Promise<WasmContract.Credential> {
        return new $outer.Credential(await this.wasm.stake_credential(), $outer._ctx);
      }

      async poolKeyhash(): Promise<WasmContract.Ed25519KeyHash> {
        return new $outer.Ed25519KeyHash(await this.wasm.pool_keyhash(), $outer._ctx);
      }

      async drep(): Promise<WasmContract.DRep> {
        return new $outer.DRep(await this.wasm.drep(), $outer._ctx);
      }

      async coin(): Promise<WasmContract.BigNum> {
        return new $outer.BigNum(await this.wasm.coin(), $outer._ctx);
      }

      async hasScriptCredential(): Promise<boolean> {
        return await this.wasm.has_script_credentials();
      }

      static async new(
        stakeCredential: WasmContract.Credential,
        poolKeyHash: WasmContract.Ed25519KeyHash,
        drep: WasmContract.DRep,
        coin: WasmContract.BigNum
      ): Promise<WasmContract.StakeVoteRegistrationAndDelegation> {
        return new StakeVoteRegistrationAndDelegation(
                await WasmV4.StakeVoteRegistrationAndDelegation.new(
                  stakeCredential.wasm,
                  poolKeyHash.wasm,
                  drep.wasm,
                  coin.wasm
                ),
                $outer._ctx
              );
      }

      static async fromBytes(
        bytes: Uint8Array
      ): Promise<StakeVoteRegistrationAndDelegation> {
        return new StakeVoteRegistrationAndDelegation(
                await WasmV4.StakeVoteRegistrationAndDelegation.from_bytes(bytes),
                $outer._ctx
              );
      }
    }

    return StakeVoteRegistrationAndDelegation;
  })();

  public Certificates = (() => {
    const $outer = this;

    class Certificates
      extends Ptr<WasmV4.Certificates>
      implements WasmContract.Certificates
    {
      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async len(): Promise<number> {
        return await this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.Certificate> {
        return new $outer.Certificate(await this.wasm.get(index), $outer._ctx);
      }

      async add(item: WasmContract.Certificate): Promise<void> {
        return await this.wasm.add(item.wasm);
      }

      static async fromBytes(bytes: Uint8Array): Promise<Certificates> {
        return new Certificates(
          await WasmV4.Certificates.from_bytes(bytes),
          $outer._ctx
        );
      }

      static async new(): Promise<Certificates> {
        return new Certificates(await WasmV4.Certificates.new(), $outer._ctx);
      }
    }
    return Certificates;
  })();

  public RewardAddress = (() => {
    const $outer = this;

    class RewardAddress
      extends Ptr<WasmV4.RewardAddress>
      implements WasmContract.RewardAddress
    {
      async paymentCred(): Promise<WasmContract.Credential> {
        return new $outer.Credential(
          await this.wasm.payment_cred(),
          $outer._ctx
        );
      }

      async toAddress(): Promise<WasmContract.Address> {
        return new $outer.Address(await this.wasm.to_address(), $outer._ctx);
      }

      static async fromAddress(
        addr: WasmContract.Address
      ): Promise<RewardAddress> {
        return new RewardAddress(
          await WasmV4.RewardAddress.from_address(addr.wasm),
          $outer._ctx
        );
      }

      static async new(
        network: number,
        payment: WasmContract.Credential
      ): Promise<RewardAddress> {
        return new RewardAddress(
          await WasmV4.RewardAddress.new(network, payment.wasm),
          $outer._ctx
        );
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
        return await this.wasm.to_bytes();
      }

      async len(): Promise<number> {
        return await this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.RewardAddress> {
        return new $outer.RewardAddress(
          await this.wasm.get(index),
          $outer._ctx
        );
      }

      async add(item: WasmContract.RewardAddress): Promise<void> {
        return await this.wasm.add(item.wasm);
      }

      static async new(): Promise<RewardAddresses> {
        return new RewardAddresses(
          await WasmV4.RewardAddresses.new(),
          $outer._ctx
        );
      }

      static async fromBytes(bytes: Uint8Array): Promise<RewardAddresses> {
        return new RewardAddresses(
          await WasmV4.RewardAddresses.from_bytes(bytes),
          $outer._ctx
        );
      }
    }
    return RewardAddresses;
  })();

  public Withdrawals = (() => {
    const $outer = this;

    class Withdrawals
      extends Ptr<WasmV4.Withdrawals>
      implements WasmContract.Withdrawals
    {
      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async len(): Promise<number> {
        return await this.wasm.len();
      }

      async insert(
        key: WasmContract.RewardAddress,
        value: WasmContract.BigNum
      ): Promise<WasmContract.BigNum> {
        return new $outer.BigNum(
          await this.wasm.insert(key.wasm, value.wasm),
          $outer._ctx
        );
      }

      async get(key: WasmContract.RewardAddress): Promise<WasmContract.BigNum> {
        return new $outer.BigNum(await this.wasm.get(key.wasm), $outer._ctx);
      }

      async keys(): Promise<WasmContract.RewardAddresses> {
        return new $outer.RewardAddresses(await this.wasm.keys(), $outer._ctx);
      }

      static async new(): Promise<Withdrawals> {
        return new Withdrawals(await WasmV4.Withdrawals.new(), $outer._ctx);
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      static async fromBytes(bytes: Uint8Array): Promise<Withdrawals> {
        return new Withdrawals(
          await WasmV4.Withdrawals.from_bytes(bytes),
          $outer._ctx
        );
      }
    }
    return Withdrawals;
  })();

  public TransactionInputs = (() => {
    const $outer = this;

    class TransactionInputs
      extends Ptr<WasmV4.TransactionInputs>
      implements WasmContract.TransactionInputs
    {
      async len(): Promise<number> {
        return await this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.TransactionInput> {
        return new $outer.TransactionInput(
          await this.wasm.get(index),
          $outer._ctx
        );
      }
    }
    return TransactionInputs;
  })();

  public TransactionOutputs = (() => {
    const $outer = this;

    class TransactionOutputs
      extends Ptr<WasmV4.TransactionOutputs>
      implements WasmContract.TransactionOutputs
    {
      async len(): Promise<number> {
        return await this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.TransactionOutput> {
        return new $outer.TransactionOutput(
          await this.wasm.get(index),
          $outer._ctx
        );
      }
    }
    return TransactionOutputs;
  })();

  public TransactionBody = (() => {
    const $outer = this;

    class TransactionBody
      extends Ptr<WasmV4.TransactionBody>
      implements WasmContract.TransactionBody
    {
      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async requiredSigners(): Promise<WasmContract.Ed25519KeyHashes> {
        return new $outer.Ed25519KeyHashes(
          await this.wasm.required_signers(),
          $outer._ctx
        );
      }

      async inputs(): Promise<WasmContract.TransactionInputs> {
        return new $outer.TransactionInputs(
          await this.wasm.inputs(),
          $outer._ctx
        );
      }

      async outputs(): Promise<WasmContract.TransactionOutputs> {
        return new $outer.TransactionOutputs(
          await this.wasm.outputs(),
          $outer._ctx
        );
      }

      async fee(): Promise<WasmContract.BigNum> {
        return new $outer.BigNum(await this.wasm.fee(), $outer._ctx);
      }

      async ttl(): Promise<WasmContract.Optional<number | undefined>> {
        return await this.wasm.ttl();
      }

      async certs(): Promise<WasmContract.Certificates> {
        return Promise.resolve(
          new $outer.Certificates(await this.wasm.certs(), $outer._ctx)
        );
      }

      async withdrawals(): Promise<WasmContract.Withdrawals> {
        return Promise.resolve(
          new $outer.Withdrawals(await this.wasm.withdrawals(), $outer._ctx)
        );
      }

      async scriptDataHash(): Promise<WasmContract.ScriptDataHash | undefined> {
        const wasm = await this.wasm.script_data_hash();
        if (wasm) {
          return new $outer.ScriptDataHash(wasm, $outer._ctx);
        } else {
          return undefined;
        }
      }

      async setScriptDataHash(
        scriptDataHash: WasmContract.ScriptDataHash
      ): Promise<void> {
        await this.wasm.set_script_data_hash(scriptDataHash.wasm);
      }

      async collateral(): Promise<WasmContract.TransactionInputs | undefined> {
        const wasm = await this.wasm.collateral();
        if (wasm) {
          return new $outer.TransactionInputs(wasm, $outer._ctx);
        } else {
          return undefined;
        }
      }

      static async fromBytes(bytes: Uint8Array): Promise<TransactionBody> {
        return Promise.resolve(
          new TransactionBody(
            await WasmV4.TransactionBody.from_bytes(bytes),
            $outer._ctx
          )
        );
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
      async addKeyInput(
        hash: WasmContract.Ed25519KeyHash,
        input: WasmContract.TransactionInput,
        amount: WasmContract.Value
      ): Promise<void> {
        return await this.wasm.add_key_input(
          hash.wasm,
          input.wasm,
          amount.wasm
        );
      }

      async addBootstrapInput(
        hash: WasmContract.ByronAddress,
        input: WasmContract.TransactionInput,
        amount: WasmContract.Value
      ): Promise<void> {
        return await this.wasm.add_bootstrap_input(
          hash.wasm,
          input.wasm,
          amount.wasm
        );
      }

      async addInput(
        address: WasmContract.Address,
        input: WasmContract.TransactionInput,
        amount: WasmContract.Value
      ): Promise<void> {
        return await this.wasm.add_input(address.wasm, input.wasm, amount.wasm);
      }

      async feeForInput(
        address: WasmContract.Address,
        input: WasmContract.TransactionInput,
        amount: WasmContract.Value
      ): Promise<WasmContract.BigNum> {
        return new $outer.BigNum(
          await this.wasm.fee_for_input(address.wasm, input.wasm, amount.wasm),
          $outer._ctx
        );
      }

      async addOutput(output: WasmContract.TransactionOutput): Promise<void> {
        return await this.wasm.add_output(output.wasm);
      }

      async feeForOutput(
        output: WasmContract.TransactionOutput
      ): Promise<WasmContract.BigNum> {
        return new $outer.BigNum(
          await this.wasm.fee_for_output(output.wasm),
          $outer._ctx
        );
      }

      async setFee(fee: WasmContract.BigNum): Promise<void> {
        return await this.wasm.set_fee(fee.wasm);
      }

      async setTtl(ttl: number): Promise<void> {
        return await this.wasm.set_ttl(ttl);
      }

      async setValidityStartInterval(
        validityStartInterval: number
      ): Promise<void> {
        return await this.wasm.set_validity_start_interval(
          validityStartInterval
        );
      }

      async setScriptDataHash(
        script_data_hash: WasmContract.ScriptDataHash
      ): Promise<void> {
        return await this.wasm.set_script_data_hash(script_data_hash.wasm);
      }

      async setCerts(certs: WasmContract.Certificates): Promise<void> {
        return await this.wasm.set_certs(certs.wasm);
      }

      async setWithdrawals(
        withdrawals: WasmContract.Withdrawals
      ): Promise<void> {
        return await this.wasm.set_withdrawals(withdrawals.wasm);
      }

      async setAuxiliaryData(
        auxiliary: WasmContract.AuxiliaryData
      ): Promise<void> {
        return await this.wasm.set_auxiliary_data(auxiliary.wasm);
      }

      async getExplicitInput(): Promise<WasmContract.Value> {
        return new $outer.Value(
          await this.wasm.get_explicit_input(),
          $outer._ctx
        );
      }

      async getImplicitInput(): Promise<WasmContract.Value> {
        return new $outer.Value(
          await this.wasm.get_implicit_input(),
          $outer._ctx
        );
      }

      async getExplicitOutput(): Promise<WasmContract.Value> {
        return new $outer.Value(
          await this.wasm.get_explicit_output(),
          $outer._ctx
        );
      }

      async getTotalOutput(): Promise<WasmContract.Value> {
        return new $outer.Value(
          await this.wasm.get_total_output(),
          $outer._ctx
        );
      }

      async getTotalInput(): Promise<WasmContract.Value> {
        return new $outer.Value(await this.wasm.get_total_input(), $outer._ctx);
      }

      async getDeposit(): Promise<WasmContract.BigNum> {
        return new $outer.BigNum(await this.wasm.get_deposit(), $outer._ctx);
      }

      async getFeeIfSet(): Promise<WasmContract.BigNum> {
        return new $outer.BigNum(await this.wasm.get_fee_if_set(), $outer._ctx);
      }

      async addChangeIfNeeded(address: WasmContract.Address): Promise<boolean> {
        return await this.wasm.add_change_if_needed(address.wasm);
      }

      async addMintAsset(
        mintScript: WasmContract.NativeScript,
        mintName: WasmContract.AssetName,
        amount: WasmContract.Int
      ): Promise<void> {
        return await this.wasm.add_mint_asset(
          mintScript.wasm,
          mintName.wasm,
          amount.wasm
        );
      }

      async addJsonMetadatum(
        key: WasmContract.BigNum,
        value: string
      ): Promise<void> {
        return await this.wasm.add_json_metadatum(key.wasm, value);
      }

      async getAuxiliaryData(): Promise<WasmContract.AuxiliaryData | void> {
        const wasm = await this.wasm.get_auxiliary_data();
        if (wasm) {
          return new $outer.AuxiliaryData(wasm, $outer._ctx);
        } else {
          return undefined;
        }
      }

      async addRequiredSigner(
        requiredSigner: WasmContract.Ed25519KeyHash
      ): Promise<void> {
        return await this.wasm.add_required_signer(requiredSigner.wasm);
      }

      async addNativeScriptInput(
        nativeScript: WasmContract.NativeScript,
        input: WasmContract.TransactionInput,
        amount: WasmContract.Value
      ): Promise<void> {
        return await this.wasm.add_native_script_input(
          nativeScript.wasm,
          input.wasm,
          amount.wasm
        );
      }

      async addPlutusScriptInput(
        witness: WasmContract.PlutusWitness,
        input: WasmContract.TransactionInput,
        amount: WasmContract.Value
      ): Promise<void> {
        return await this.wasm.add_plutus_script_input(
          witness.wasm,
          input.wasm,
          amount.wasm
        );
      }

      async setCollateral(
        txInputsBuilder: WasmContract.TxInputsBuilder
      ): Promise<void> {
        return await this.wasm.set_collateral(txInputsBuilder.wasm);
      }

      async calcScriptDataHash(
        costModels: WasmContract.Costmdls
      ): Promise<void> {
        return await this.wasm.calc_script_data_hash(costModels.wasm);
      }

      async build(): Promise<WasmContract.TransactionBody> {
        return new $outer.TransactionBody(await this.wasm.build(), $outer._ctx);
      }

      async minFee(): Promise<WasmContract.BigNum> {
        return new $outer.BigNum(await this.wasm.min_fee(), $outer._ctx);
      }

      static async new(
        cfg: WasmContract.TransactionBuilderConfig
      ): Promise<TransactionBuilder> {
        return new TransactionBuilder(
          await WasmV4.TransactionBuilder.new(cfg.wasm),
          $outer._ctx
        );
      }
    }
    return TransactionBuilder;
  })();

  public BaseAddress = (() => {
    const $outer = this;

    class BaseAddress
      extends Ptr<WasmV4.BaseAddress>
      implements WasmContract.BaseAddress
    {
      async paymentCred(): Promise<WasmContract.Credential> {
        return new $outer.Credential(
          await this.wasm.payment_cred(),
          $outer._ctx
        );
      }

      async stakeCred(): Promise<WasmContract.Credential> {
        return new $outer.Credential(await this.wasm.stake_cred(), $outer._ctx);
      }

      async toAddress(): Promise<WasmContract.Address> {
        return new $outer.Address(await this.wasm.to_address(), $outer._ctx);
      }

      static async fromAddress(
        addr: WasmContract.Address
      ): Promise<BaseAddress> {
        return new BaseAddress(
          await WasmV4.BaseAddress.from_address(addr.wasm),
          $outer._ctx
        );
      }

      static async new(
        network: number,
        payment: WasmContract.Credential,
        stake: WasmContract.Credential
      ): Promise<BaseAddress> {
        return new BaseAddress(
          await WasmV4.BaseAddress.new(network, payment.wasm, stake.wasm),
          $outer._ctx
        );
      }
    }
    return BaseAddress;
  })();

  public PointerAddress = (() => {
    const $outer = this;

    class PointerAddress
      extends Ptr<WasmV4.PointerAddress>
      implements WasmContract.PointerAddress
    {
      async paymentCred(): Promise<WasmContract.Credential> {
        return new $outer.Credential(
          await this.wasm.payment_cred(),
          $outer._ctx
        );
      }

      async stakePointer(): Promise<WasmContract.Pointer> {
        return new $outer.Pointer(await this.wasm.stake_pointer(), $outer._ctx);
      }

      async toAddress(): Promise<WasmContract.Address> {
        return new $outer.Address(await this.wasm.to_address(), $outer._ctx);
      }

      static async fromAddress(
        addr: WasmContract.Address
      ): Promise<PointerAddress> {
        return new PointerAddress(
          await WasmV4.PointerAddress.from_address(addr.wasm),
          $outer._ctx
        );
      }

      static async new(
        network: number,
        payment: WasmContract.Credential,
        stake: WasmContract.Pointer
      ): Promise<PointerAddress> {
        return new PointerAddress(
          await WasmV4.PointerAddress.new(network, payment.wasm, stake.wasm),
          $outer._ctx
        );
      }
    }
    return PointerAddress;
  })();

  public EnterpriseAddress = (() => {
    const $outer = this;

    class EnterpriseAddress
      extends Ptr<WasmV4.EnterpriseAddress>
      implements WasmContract.EnterpriseAddress
    {
      async paymentCred(): Promise<WasmContract.Credential> {
        return new $outer.Credential(
          await this.wasm.payment_cred(),
          $outer._ctx
        );
      }

      async toAddress(): Promise<WasmContract.Address> {
        return new $outer.Address(await this.wasm.to_address(), $outer._ctx);
      }

      static async fromAddress(
        addr: WasmContract.Address
      ): Promise<EnterpriseAddress> {
        return new EnterpriseAddress(
          await WasmV4.EnterpriseAddress.from_address(addr.wasm),
          $outer._ctx
        );
      }

      static async new(
        network: number,
        payment: WasmContract.Credential
      ): Promise<EnterpriseAddress> {
        return new EnterpriseAddress(
          await WasmV4.EnterpriseAddress.new(network, payment.wasm),
          $outer._ctx
        );
      }
    }

    return EnterpriseAddress;
  })();

  public Pointer = (() => {
    const $outer = this;

    class Pointer extends Ptr<WasmV4.Pointer> implements WasmContract.Pointer {
      async slot(): Promise<number> {
        return await this.wasm.slot();
      }

      async txIndex(): Promise<number> {
        return await this.wasm.tx_index();
      }

      async certIndex(): Promise<number> {
        return await this.wasm.cert_index();
      }

      static async new(
        slot: number,
        txIndex: number,
        certIndex: number
      ): Promise<Pointer> {
        return new Pointer(
          await WasmV4.Pointer.new(slot, txIndex, certIndex),
          $outer._ctx
        );
      }
    }
    return Pointer;
  })();

  public Vkey = (() => {
    const $outer = this;

    class Vkey extends Ptr<WasmV4.Vkey> implements WasmContract.Vkey {
      static async new(pk: WasmContract.PublicKey): Promise<Vkey> {
        return new Vkey(await WasmV4.Vkey.new(pk.wasm), $outer._ctx);
      }
    }
    return Vkey;
  })();

  public Ed25519Signature = (() => {
    const $outer = this;

    class Ed25519Signature
      extends Ptr<WasmV4.Ed25519Signature>
      implements WasmContract.Ed25519Signature
    {
      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async toHex(): Promise<string> {
        return await this.wasm.to_hex();
      }

      static async fromBytes(bytes: Uint8Array): Promise<Ed25519Signature> {
        return new Ed25519Signature(
          await WasmV4.Ed25519Signature.from_bytes(bytes),
          $outer._ctx
        );
      }
    }
    return Ed25519Signature;
  })();

  public Vkeywitness = (() => {
    const $outer = this;

    class Vkeywitness
      extends Ptr<WasmV4.Vkeywitness>
      implements WasmContract.Vkeywitness
    {
      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async signature(): Promise<WasmContract.Ed25519Signature> {
        return new $outer.Ed25519Signature(
          await this.wasm.signature(),
          $outer._ctx
        );
      }

      static async fromBytes(bytes: Uint8Array): Promise<Vkeywitness> {
        return new Vkeywitness(
          await WasmV4.Vkeywitness.from_bytes(bytes),
          $outer._ctx
        );
      }

      static async new(
        vkey: WasmContract.Vkey,
        signature: WasmContract.Ed25519Signature
      ): Promise<Vkeywitness> {
        return new Vkeywitness(
          await WasmV4.Vkeywitness.new(vkey.wasm, signature.wasm),
          $outer._ctx
        );
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
      async len(): Promise<number> {
        return await this.wasm.len();
      }

      async add(item: WasmContract.Vkeywitness): Promise<void> {
        return await this.wasm.add(item.wasm);
      }

      async get(index: number): Promise<WasmContract.Vkeywitness> {
        return new $outer.Vkeywitness(await this.wasm.get(index), $outer._ctx);
      }

      static async new(): Promise<Vkeywitnesses> {
        return new Vkeywitnesses(await WasmV4.Vkeywitnesses.new(), $outer._ctx);
      }
    }
    return Vkeywitnesses;
  })();

  public BootstrapWitness = (() => {
    const $outer = this;

    class BootstrapWitness
      extends Ptr<WasmV4.BootstrapWitness>
      implements WasmContract.BootstrapWitness
    {
      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<BootstrapWitness> {
        return new BootstrapWitness(
          await WasmV4.BootstrapWitness.from_bytes(bytes),
          $outer._ctx
        );
      }

      static async new(
        vkey: WasmContract.Vkey,
        signature: WasmContract.Ed25519Signature,
        chainCode: Uint8Array,
        attributes: Uint8Array
      ): Promise<BootstrapWitness> {
        return new BootstrapWitness(
          await WasmV4.BootstrapWitness.new(
            vkey.wasm,
            signature.wasm,
            chainCode,
            attributes
          ),
          $outer._ctx
        );
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
      async len(): Promise<number> {
        return await this.wasm.len();
      }

      async add(item: WasmContract.BootstrapWitness): Promise<void> {
        return await this.wasm.add(item.wasm);
      }

      async get(index: number): Promise<WasmContract.BootstrapWitness> {
        return new $outer.BootstrapWitness(
          await this.wasm.get(index),
          $outer._ctx
        );
      }

      static async new(): Promise<BootstrapWitnesses> {
        return new BootstrapWitnesses(
          await WasmV4.BootstrapWitnesses.new(),
          $outer._ctx
        );
      }
    }
    return BootstrapWitnesses;
  })();

  public TransactionWitnessSet = (() => {
    const $outer = this;

    class TransactionWitnessSet
      extends Ptr<WasmV4.TransactionWitnessSet>
      implements WasmContract.TransactionWitnessSet
    {
      static async fromBytes(
        bytes: Uint8Array
      ): Promise<TransactionWitnessSet> {
        return new TransactionWitnessSet(
          await WasmV4.TransactionWitnessSet.from_bytes(bytes),
          $outer._ctx
        );
      }

      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async plutusScripts(): Promise<WasmContract.PlutusScripts> {
        return new $outer.PlutusScripts(
          await this.wasm.plutus_scripts(),
          $outer._ctx
        );
      }

      async redeemers(): Promise<WasmContract.Redeemers> {
        return new $outer.Redeemers(await this.wasm.redeemers(), $outer._ctx);
      }

      static async fromHex(hex: string): Promise<TransactionWitnessSet> {
        return new TransactionWitnessSet(
          await WasmV4.TransactionWitnessSet.from_hex(hex),
          $outer._ctx
        );
      }

      async toHex(): Promise<string> {
        return await this.wasm.to_hex();
      }

      async setBootstraps(
        bootstraps: WasmContract.BootstrapWitnesses
      ): Promise<void> {
        return await this.wasm.set_bootstraps(bootstraps.wasm);
      }

      async bootstraps(): Promise<WasmContract.BootstrapWitnesses> {
        return new $outer.BootstrapWitnesses(
          await this.wasm.bootstraps(),
          $outer._ctx
        );
      }

      async setPlutusData(plutusData: WasmContract.PlutusList): Promise<void> {
        return await this.wasm.set_plutus_data(plutusData.wasm);
      }

      async plutusData(): Promise<WasmContract.PlutusList | undefined> {
        const wasm = await this.wasm.plutus_data();
        if (wasm) {
          return new $outer.PlutusList(wasm, $outer._ctx);
        } else {
          return undefined;
        }
      }

      async setVkeys(vkeywitnesses: WasmContract.Vkeywitnesses): Promise<void> {
        return await this.wasm.set_vkeys(vkeywitnesses.wasm);
      }

      async vkeys(): Promise<WasmContract.Vkeywitnesses> {
        return new $outer.Vkeywitnesses(await this.wasm.vkeys(), $outer._ctx);
      }

      static async new(): Promise<TransactionWitnessSet> {
        return new TransactionWitnessSet(
          await WasmV4.TransactionWitnessSet.new(),
          $outer._ctx
        );
      }
    }
    return TransactionWitnessSet;
  })();

  public Transaction = (() => {
    const $outer = this;

    class Transaction
      extends Ptr<WasmV4.Transaction>
      implements WasmContract.Transaction
    {
      async body(): Promise<WasmContract.TransactionBody> {
        return new $outer.TransactionBody(await this.wasm.body(), $outer._ctx);
      }

      async witnessSet(): Promise<WasmContract.TransactionWitnessSet> {
        return new $outer.TransactionWitnessSet(
          await this.wasm.witness_set(),
          $outer._ctx
        );
      }

      async isValid(): Promise<boolean> {
        return await this.wasm.is_valid();
      }

      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async auxiliaryData(): Promise<WasmContract.AuxiliaryData> {
        return new $outer.AuxiliaryData(
          await this.wasm.auxiliary_data(),
          $outer._ctx
        );
      }

      static async new(
        body: WasmContract.TransactionBody,
        witnessSet: WasmContract.TransactionWitnessSet,
        auxiliary?: WasmContract.AuxiliaryData
      ): Promise<Transaction> {
        return new Transaction(
          await WasmV4.Transaction.new(
            body.wasm,
            witnessSet.wasm,
            auxiliary?._wasm
          ),
          $outer._ctx
        );
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      static async fromBytes(bytes: Uint8Array): Promise<Transaction> {
        return new Transaction(
          await WasmV4.Transaction.from_bytes(bytes),
          $outer._ctx
        );
      }

      static async fromHex(hex: string): Promise<Transaction> {
        return new Transaction(
          await WasmV4.Transaction.from_hex(hex),
          $outer._ctx
        );
      }
    }
    return Transaction;
  })();

  /**
   * `NetworkInfo` is not exported by @emurgo/cls-mobile-bridge,
   * so we create our own fake implementation. The calls made to this object are not
   * proxied to WASM.
   */
  public NetworkInfo = (() => {
    const $outer = this;

    class NetworkInfo
      extends Ptr<WasmV4.NetworkInfo>
      implements WasmContract.NetworkInfo
    {
      async networkId(): Promise<number> {
        return await this.wasm.network_id();
      }

      async protocolMagic(): Promise<number> {
        return await this.wasm.protocol_magic();
      }

      static async new(
        networkId: number,
        protocolMagic: number
      ): Promise<NetworkInfo> {
        return new NetworkInfo(
          await WasmV4.NetworkInfo.new(networkId, protocolMagic),
          $outer._ctx
        );
      }

      static async testnet(): Promise<NetworkInfo> {
        return new NetworkInfo(await WasmV4.NetworkInfo.testnet(), $outer._ctx);
      }

      static async testnetPreview(): Promise<NetworkInfo> {
        return new NetworkInfo(
          await WasmV4.NetworkInfo.testnet_preview(),
          $outer._ctx
        );
      }

      static async testnetPreprod(): Promise<NetworkInfo> {
        return new NetworkInfo(
          await WasmV4.NetworkInfo.testnet_preprod(),
          $outer._ctx
        );
      }

      static async mainnet(): Promise<NetworkInfo> {
        return new NetworkInfo(await WasmV4.NetworkInfo.mainnet(), $outer._ctx);
      }
    }
    return NetworkInfo;
  })();

  public MetadataList = (() => {
    const $outer = this;

    class MetadataList
      extends Ptr<WasmV4.MetadataList>
      implements WasmContract.MetadataList
    {
      static async new(): Promise<MetadataList> {
        return new MetadataList(await WasmV4.MetadataList.new(), $outer._ctx);
      }

      static async fromBytes(bytes: Uint8Array): Promise<MetadataList> {
        return new MetadataList(
          await WasmV4.MetadataList.from_bytes(bytes),
          $outer._ctx
        );
      }

      async len(): Promise<number> {
        return await this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.TransactionMetadatum> {
        return new $outer.TransactionMetadatum(
          await this.wasm.get(index),
          $outer._ctx
        );
      }

      async add(item: WasmContract.TransactionMetadatum): Promise<void> {
        await this.wasm.add(item.wasm);
      }

      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }
    }
    return MetadataList;
  })();

  public NativeScript = (() => {
    const $outer = this;

    class NativeScript
      extends Ptr<WasmV4.NativeScript>
      implements WasmContract.NativeScript
    {
      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async hash(): Promise<WasmContract.Ed25519KeyHash> {
        return new $outer.Ed25519KeyHash(await this.wasm.hash(), $outer._ctx);
      }

      async kind(): Promise<number> {
        return await this.wasm.kind();
      }

      static async fromBytes(bytes: Uint8Array): Promise<NativeScript> {
        return new NativeScript(
          await WasmV4.NativeScript.from_bytes(bytes),
          $outer._ctx
        );
      }
    }
    return NativeScript;
  })();

  public NativeScripts = (() => {
    const $outer = this;

    class NativeScripts
      extends Ptr<WasmV4.NativeScripts>
      implements WasmContract.NativeScripts
    {
      async len(): Promise<number> {
        return await this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.NativeScript> {
        return new $outer.NativeScript(await this.wasm.get(index), $outer._ctx);
      }

      async add(elem: WasmContract.NativeScript): Promise<void> {
        return await this.wasm.add(elem.wasm);
      }

      static async new(): Promise<NativeScripts> {
        return new NativeScripts(await WasmV4.NativeScripts.new(), $outer._ctx);
      }
    }
    return NativeScripts;
  })();

  public PlutusScript = (() => {
    const $outer = this;

    class PlutusScript
      extends Ptr<WasmV4.PlutusScript>
      implements WasmContract.PlutusScript
    {
      async toBytes(): Promise<Uint8Array> {
        return this.wasm.to_bytes();
      }

      async bytes(): Promise<Uint8Array> {
        return this.wasm.bytes();
      }

      static async fromBytes(bytes: Uint8Array): Promise<PlutusScript> {
        return new PlutusScript(
          await WasmV4.PlutusScript.from_bytes(bytes),
          $outer._ctx
        );
      }

      static async new(bytes: Uint8Array): Promise<PlutusScript> {
        return new PlutusScript(
          await WasmV4.PlutusScript.new(bytes),
          $outer._ctx
        );
      }
    }
    return PlutusScript;
  })();

  public PlutusScripts = (() => {
    const $outer = this;

    class PlutusScripts
      extends Ptr<WasmV4.PlutusScripts>
      implements WasmContract.PlutusScripts
    {
      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async len(): Promise<number> {
        return await this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.PlutusScript> {
        return new $outer.PlutusScript(await this.wasm.get(index), $outer._ctx);
      }

      async add(elem: WasmContract.PlutusScript): Promise<void> {
        return await this.wasm.add(elem.wasm);
      }

      static async fromBytes(bytes: Uint8Array): Promise<PlutusScripts> {
        return new PlutusScripts(
          await WasmV4.PlutusScripts.from_bytes(bytes),
          $outer._ctx
        );
      }

      static async new(): Promise<PlutusScripts> {
        return new PlutusScripts(await WasmV4.PlutusScripts.new(), $outer._ctx);
      }
    }

    return PlutusScripts;
  })();

  /**
   * WARNING! This type is here to comply with the exported interface, but it is not implemented
   */
  public TxInputsBuilder = (() => {
    const $outer = this;

    class TxInputsBuilder
      extends Ptr<WasmV4.TxInputsBuilder>
      implements WasmContract.TxInputsBuilder
    {
      addInput(
        address: WasmContract.Address,
        input: WasmContract.TransactionInput,
        amount: WasmContract.Value
      ): Promise<void> {
        return this.wasm.add_input(address.wasm, input.wasm, amount.wasm);
      }

      async inputs(): Promise<WasmContract.TransactionInputs> {
        return new $outer.TransactionInputs(
          await this.wasm.inputs(),
          $outer._ctx
        );
      }

      async addPlutusScriptInput(
        witness: WasmContract.PlutusWitness,
        input: WasmContract.TransactionInput,
        amount: WasmContract.Value
      ): Promise<void> {
        await this.wasm.add_plutus_script_input(
          witness.wasm,
          input.wasm,
          amount.wasm
        );
      }

      static async new(): Promise<TxInputsBuilder> {
        return new TxInputsBuilder(
          await WasmV4.TxInputsBuilder.new(),
          $outer._ctx
        );
      }
    }
    return TxInputsBuilder;
  })();

  public DataCost = (() => {
    const $outer = this;

    class DataCost
      extends Ptr<WasmV4.DataCost>
      implements WasmContract.DataCost
    {
      static async newCoinsPerWord(
        coinsPerWord: WasmContract.BigNum
      ): Promise<DataCost> {
        return new DataCost(
          await WasmV4.DataCost.new_coins_per_word(coinsPerWord.wasm),
          $outer._ctx
        );
      }

      static async newCoinsPerByte(
        coinsPerByte: WasmContract.BigNum
      ): Promise<DataCost> {
        return new DataCost(
          await WasmV4.DataCost.new_coins_per_byte(coinsPerByte.wasm),
          $outer._ctx
        );
      }

      async coinsPerByte(): Promise<WasmContract.BigNum> {
        return new $outer.BigNum(await this.wasm.coins_per_byte(), $outer._ctx);
      }
    }
    return DataCost;
  })();

  public UnitInterval = (() => {
    const $outer = this;

    class UnitInterval
      extends Ptr<WasmV4.UnitInterval>
      implements WasmContract.UnitInterval
    {
      static async fromBytes(bytes: Uint8Array): Promise<UnitInterval> {
        return new UnitInterval(
          await WasmV4.UnitInterval.from_bytes(bytes),
          $outer._ctx
        );
      }

      static async fromHex(hex: string): Promise<UnitInterval> {
        return new UnitInterval(
          await WasmV4.UnitInterval.from_hex(hex),
          $outer._ctx
        );
      }

      static async fromJson(json: string): Promise<UnitInterval> {
        return new UnitInterval(
          await WasmV4.UnitInterval.from_json(json),
          $outer._ctx
        );
      }

      static async new(
        numerator: WasmContract.BigNum,
        denominator: WasmContract.BigNum
      ) {
        return new UnitInterval(
          await WasmV4.UnitInterval.new(numerator.wasm, denominator.wasm),
          $outer._ctx
        );
      }

      async toHex(): Promise<string> {
        return await this.wasm.to_hex();
      }

      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async toJson(): Promise<string> {
        return await this.wasm.to_json();
      }

      async numerator(): Promise<WasmContract.BigNum> {
        return new $outer.BigNum(await this.wasm.numerator(), $outer._ctx);
      }

      async denominator(): Promise<WasmContract.BigNum> {
        return new $outer.BigNum(await this.wasm.denominator(), $outer._ctx);
      }
    }
    return UnitInterval;
  })();

  public TransactionBuilderConfigBuilder = (() => {
    const $outer = this;

    class TransactionBuilderConfigBuilder
      extends Ptr<WasmV4.TransactionBuilderConfigBuilder>
      implements WasmContract.TransactionBuilderConfigBuilder
    {
      static async new(): Promise<TransactionBuilderConfigBuilder> {
        return new TransactionBuilderConfigBuilder(
          await WasmV4.TransactionBuilderConfigBuilder.new(),
          $outer._ctx
        );
      }

      async feeAlgo(
        linearFee: WasmContract.LinearFee
      ): Promise<TransactionBuilderConfigBuilder> {
        return new TransactionBuilderConfigBuilder(
          await this.wasm.fee_algo(linearFee.wasm),
          $outer._ctx
        );
      }

      async coinsPerUtxoWord(
        coinsPerUtxoWord: WasmContract.BigNum
      ): Promise<TransactionBuilderConfigBuilder> {
        return new TransactionBuilderConfigBuilder(
          await this.wasm.coins_per_utxo_word(coinsPerUtxoWord.wasm),
          $outer._ctx
        );
      }

      async coinsPerUtxoByte(
        coinsPerUtxoByte: WasmContract.BigNum
      ): Promise<TransactionBuilderConfigBuilder> {
        return new TransactionBuilderConfigBuilder(
          await this.wasm.coins_per_utxo_byte(coinsPerUtxoByte.wasm),
          $outer._ctx
        );
      }

      async exUnitPrices(
        exUnitPrices: WasmContract.ExUnitPrices
      ): Promise<TransactionBuilderConfigBuilder> {
        return new TransactionBuilderConfigBuilder(
          await this.wasm.ex_unit_prices(exUnitPrices.wasm),
          $outer._ctx
        );
      }

      async poolDeposit(
        poolDeposit: WasmContract.BigNum
      ): Promise<TransactionBuilderConfigBuilder> {
        return new TransactionBuilderConfigBuilder(
          await this.wasm.pool_deposit(poolDeposit.wasm),
          $outer._ctx
        );
      }

      async keyDeposit(
        keyDeposit: WasmContract.BigNum
      ): Promise<TransactionBuilderConfigBuilder> {
        return new TransactionBuilderConfigBuilder(
          await this.wasm.key_deposit(keyDeposit.wasm),
          $outer._ctx
        );
      }

      async maxValueSize(
        maxValueSize: number
      ): Promise<TransactionBuilderConfigBuilder> {
        return new TransactionBuilderConfigBuilder(
          await this.wasm.max_value_size(maxValueSize),
          $outer._ctx
        );
      }

      async maxTxSize(
        maxTxSize: number
      ): Promise<TransactionBuilderConfigBuilder> {
        return new TransactionBuilderConfigBuilder(
          await this.wasm.max_tx_size(maxTxSize),
          $outer._ctx
        );
      }

      async preferPureChange(
        preferPureChange: boolean
      ): Promise<TransactionBuilderConfigBuilder> {
        return new TransactionBuilderConfigBuilder(
          await this.wasm.prefer_pure_change(preferPureChange),
          $outer._ctx
        );
      }

      async build(): Promise<WasmContract.TransactionBuilderConfig> {
        return new $outer.TransactionBuilderConfig(
          await this.wasm.build(),
          $outer._ctx
        );
      }
    }

    return TransactionBuilderConfigBuilder;
  })();

  public TransactionBuilderConfig = (() => {
    class TransactionBuilderConfig
      extends Ptr<WasmV4.TransactionBuilderConfig>
      implements WasmContract.TransactionBuilderConfig {}

    return TransactionBuilderConfig;
  })();

  public PlutusWitness = (() => {
    const $outer = this;

    class PlutusWitness
      extends Ptr<WasmV4.PlutusWitness>
      implements WasmContract.PlutusWitness
    {
      static async new(
        script: WasmContract.PlutusScript,
        datum: WasmContract.PlutusData,
        redeemer: WasmContract.Redeemer
      ): Promise<PlutusWitness> {
        return new PlutusWitness(
          await WasmV4.PlutusWitness.new(
            script.wasm,
            datum.wasm,
            redeemer.wasm
          ),
          $outer._ctx
        );
      }

      static async newWithRef(
        script: WasmContract.PlutusScriptSource,
        datum: WasmContract.DatumSource,
        redeemer: WasmContract.Redeemer
      ): Promise<PlutusWitness> {
        return new PlutusWitness(
          await WasmV4.PlutusWitness.new_with_ref(
            script.wasm,
            datum.wasm,
            redeemer.wasm
          ),
          $outer._ctx
        );
      }

      static async newWithoutDatum(
        script: WasmContract.PlutusScript,
        redeemer: WasmContract.Redeemer
      ): Promise<PlutusWitness> {
        return new PlutusWitness(
          await WasmV4.PlutusWitness.new_without_datum(
            script.wasm,
            redeemer.wasm
          ),
          $outer._ctx
        );
      }

      static async newWithRefWithoutDatum(
        script: WasmContract.PlutusScriptSource,
        redeemer: WasmContract.Redeemer
      ): Promise<PlutusWitness> {
        return new PlutusWitness(
          await WasmV4.PlutusWitness.new_with_ref_without_datum(
            script.wasm,
            redeemer.wasm
          ),
          $outer._ctx
        );
      }

      async script(): Promise<WasmContract.PlutusScript> {
        return new $outer.PlutusScript(await this.wasm.script(), $outer._ctx);
      }

      async datum(): Promise<WasmContract.PlutusData | undefined> {
        const wasm = await this.wasm.datum();
        if (wasm) {
          return new $outer.PlutusData(wasm, $outer._ctx);
        } else {
          return undefined;
        }
      }

      async redeemer(): Promise<WasmContract.Redeemer> {
        return new $outer.Redeemer(await this.wasm.redeemer(), $outer._ctx);
      }
    }

    return PlutusWitness;
  })();

  public PlutusScriptSource = (() => {
    const $outer = this;

    class PlutusScriptSource
      extends Ptr<WasmV4.PlutusScriptSource>
      implements WasmContract.PlutusScriptSource
    {
      static async new(
        script: WasmContract.PlutusScript
      ): Promise<PlutusScriptSource> {
        return new PlutusScriptSource(
          await WasmV4.PlutusScriptSource.new(script.wasm),
          $outer._ctx
        );
      }

      static async newRefInput(
        scriptHash: WasmContract.ScriptHash,
        input: WasmContract.TransactionInput
      ): Promise<PlutusScriptSource> {
        return new PlutusScriptSource(
          await WasmV4.PlutusScriptSource.new_ref_input(
            scriptHash.wasm,
            input.wasm
          ),
          $outer._ctx
        );
      }

      static async newRefInputWithLangVer(
        scriptHash: WasmContract.ScriptHash,
        input: WasmContract.TransactionInput,
        langVer: WasmContract.Language
      ): Promise<PlutusScriptSource> {
        return new PlutusScriptSource(
          await WasmV4.PlutusScriptSource.new_ref_input_with_lang_ver(
            scriptHash.wasm,
            input.wasm,
            langVer.wasm
          ),
          $outer._ctx
        );
      }
    }

    return PlutusScriptSource;
  })();

  public DatumSource = (() => {
    const $outer = this;

    class DatumSource
      extends Ptr<WasmV4.DatumSource>
      implements WasmContract.DatumSource
    {
      static async new(datum: WasmContract.PlutusData): Promise<DatumSource> {
        return new DatumSource(
          await WasmV4.DatumSource.new(datum.wasm),
          $outer._ctx
        );
      }

      static async newRefInput(
        input: WasmContract.TransactionInput
      ): Promise<DatumSource> {
        return new DatumSource(
          await WasmV4.DatumSource.new_ref_input(input.wasm),
          $outer._ctx
        );
      }
    }

    return DatumSource;
  })();

  public ExUnitPrices = (() => {
    const $outer = this;

    class ExUnitPrices
      extends Ptr<WasmV4.ExUnitPrices>
      implements WasmContract.ExUnitPrices
    {
      static async new(
        memPrice: WasmContract.UnitInterval,
        stepPrice: WasmContract.UnitInterval
      ): Promise<ExUnitPrices> {
        return new ExUnitPrices(
          await WasmV4.ExUnitPrices.new(memPrice.wasm, stepPrice.wasm),
          $outer._ctx
        );
      }

      static async fromBytes(
        bytes: Uint8Array
      ): Promise<ExUnitPrices | undefined> {
        const wasm = await WasmV4.ExUnitPrices.from_bytes(bytes);
        return wasm ? new ExUnitPrices(wasm, $outer._ctx) : undefined;
      }

      static async fromHex(hexStr: string): Promise<ExUnitPrices | undefined> {
        const wasm = await WasmV4.ExUnitPrices.from_hex(hexStr);
        return wasm ? new ExUnitPrices(wasm, $outer._ctx) : undefined;
      }

      static async fromJson(json: string): Promise<ExUnitPrices | undefined> {
        const wasm = await WasmV4.ExUnitPrices.from_json(json);
        return wasm ? new ExUnitPrices(wasm, $outer._ctx) : undefined;
      }

      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async toHex(): Promise<string> {
        return await this.wasm.to_hex();
      }

      async toJson(): Promise<string | undefined> {
        const json = await this.wasm.to_json();
        return json ? json : undefined;
      }

      async memPrice(): Promise<WasmContract.UnitInterval> {
        return new $outer.UnitInterval(
          await this.wasm.mem_price(),
          $outer._ctx
        );
      }

      async stepPrice(): Promise<WasmContract.UnitInterval> {
        return new $outer.UnitInterval(
          await this.wasm.step_price(),
          $outer._ctx
        );
      }
    }

    return ExUnitPrices;
  })();

  public FixedTransaction = (() => {
    const $outer = this;

    class FixedTransaction
      extends Ptr<WasmV4.FixedTransaction>
      implements WasmContract.FixedTransaction
    {
      static async new(
        rawBody: Uint8Array,
        rawWitnessSet: Uint8Array,
        isValid: boolean
      ): Promise<FixedTransaction> {
        return new FixedTransaction(
          await WasmV4.FixedTransaction.new(rawBody, rawWitnessSet, isValid),
          $outer._ctx
        );
      }

      static async fromBytes(
        bytes: Uint8Array
      ): Promise<FixedTransaction | undefined> {
        const wasm = await WasmV4.FixedTransaction.from_bytes(bytes);
        return wasm ? new FixedTransaction(wasm, $outer._ctx) : undefined;
      }

      static async fromHex(
        hexStr: string
      ): Promise<FixedTransaction | undefined> {
        const wasm = await WasmV4.FixedTransaction.from_hex(hexStr);
        return wasm ? new FixedTransaction(wasm, $outer._ctx) : undefined;
      }

      static async newWithAuxiliary(
        rawBody: Uint8Array,
        rawWitnessSet: Uint8Array,
        rawAuxiliaryData: Uint8Array,
        isValid: boolean
      ): Promise<FixedTransaction | undefined> {
        const wasm = await WasmV4.FixedTransaction.new_with_auxiliary(
          rawBody,
          rawWitnessSet,
          rawAuxiliaryData,
          isValid
        );
        return wasm ? new FixedTransaction(wasm, $outer._ctx) : undefined;
      }

      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async toHex(): Promise<string> {
        return await this.wasm.to_hex();
      }

      async body(): Promise<WasmContract.TransactionBody> {
        return new $outer.TransactionBody(await this.wasm.body(), $outer._ctx);
      }

      async rawBody(): Promise<Uint8Array> {
        return await this.wasm.raw_body();
      }

      async setBody(body: Uint8Array): Promise<void> {
        return await this.wasm.set_body(body);
      }

      async setWitnessSet(witnessSet: Uint8Array): Promise<void> {
        return await this.wasm.set_witness_set(witnessSet);
      }

      async witnessSet(): Promise<WasmContract.TransactionWitnessSet> {
        return new $outer.TransactionWitnessSet(
          await this.wasm.witness_set(),
          $outer._ctx
        );
      }

      async rawWitnessSet(): Promise<Uint8Array> {
        return await this.wasm.raw_witness_set();
      }

      async setIsValid(isValid: boolean): Promise<void> {
        return await this.wasm.set_is_valid(isValid);
      }

      async isValid(): Promise<boolean> {
        return await this.wasm.is_valid();
      }

      async setAuxiliaryData(auxiliaryData: Uint8Array): Promise<void> {
        return await this.wasm.set_auxiliary_data(auxiliaryData);
      }

      async auxiliaryData(): Promise<WasmContract.AuxiliaryData | undefined> {
        const wasm = await this.wasm.auxiliary_data();
        return wasm ? new $outer.AuxiliaryData(wasm, $outer._ctx) : undefined;
      }

      async rawAuxiliaryData(): Promise<Uint8Array> {
        return await this.wasm.raw_auxiliary_data();
      }
    }
    return FixedTransaction;
  })();

  public TransactionUnspentOutput = (() => {
    const $outer = this;

    class TransactionUnspentOutput
      extends Ptr<WasmV4.TransactionUnspentOutput>
      implements WasmContract.TransactionUnspentOutput
    {
      static async new(
        input: WasmContract.TransactionInput,
        output: WasmContract.TransactionOutput
      ): Promise<TransactionUnspentOutput> {
        return new TransactionUnspentOutput(
          await WasmV4.TransactionUnspentOutput.new(input.wasm, output.wasm),
          $outer._ctx
        );
      }

      static async fromBytes(
        bytes: Uint8Array
      ): Promise<TransactionUnspentOutput | undefined> {
        const wasm = await WasmV4.TransactionUnspentOutput.from_bytes(bytes);
        return wasm
          ? new TransactionUnspentOutput(wasm, $outer._ctx)
          : undefined;
      }

      static async fromHex(
        hexStr: string
      ): Promise<TransactionUnspentOutput | undefined> {
        const wasm = await WasmV4.TransactionUnspentOutput.from_hex(hexStr);
        return wasm
          ? new TransactionUnspentOutput(wasm, $outer._ctx)
          : undefined;
      }

      static async fromJson(
        json: string
      ): Promise<TransactionUnspentOutput | undefined> {
        const wasm = await WasmV4.TransactionUnspentOutput.from_json(json);
        return wasm
          ? new TransactionUnspentOutput(wasm, $outer._ctx)
          : undefined;
      }

      async toJson(): Promise<string> {
        return await this.wasm.to_json();
      }

      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async toHex(): Promise<string> {
        return await this.wasm.to_hex();
      }

      async input(): Promise<WasmContract.TransactionInput> {
        return new $outer.TransactionInput(
          await this.wasm.input(),
          $outer._ctx
        );
      }

      async output(): Promise<WasmContract.TransactionOutput> {
        return new $outer.TransactionOutput(
          await this.wasm.output(),
          $outer._ctx
        );
      }
    }
    return TransactionUnspentOutput;
  })();

  public Ed25519KeyHashes = (() => {
    const $outer = this;

    class Ed25519KeyHashes
      extends Ptr<WasmV4.Ed25519KeyHashes>
      implements WasmContract.Ed25519KeyHashes
    {
      static async new(): Promise<Ed25519KeyHashes> {
        return new Ed25519KeyHashes(
          await WasmV4.Ed25519KeyHashes.new(),
          $outer._ctx
        );
      }

      static async fromJson(
        json: string
      ): Promise<Ed25519KeyHashes | undefined> {
        const wasm = await WasmV4.Ed25519KeyHashes.from_json(json);
        return wasm ? new Ed25519KeyHashes(wasm, $outer._ctx) : undefined;
      }

      static async fromBytes(
        bytes: Uint8Array
      ): Promise<Ed25519KeyHashes | undefined> {
        const wasm = await WasmV4.Ed25519KeyHashes.from_bytes(bytes);
        return wasm ? new Ed25519KeyHashes(wasm, $outer._ctx) : undefined;
      }

      static async fromHex(
        hexStr: string
      ): Promise<Ed25519KeyHashes | undefined> {
        const wasm = await WasmV4.Ed25519KeyHashes.from_hex(hexStr);
        return wasm ? new Ed25519KeyHashes(wasm, $outer._ctx) : undefined;
      }

      async toBytes(): Promise<Uint8Array> {
        return await this.wasm.to_bytes();
      }

      async toHex(): Promise<string> {
        return await this.wasm.to_hex();
      }

      async toJson(): Promise<string> {
        return await this.wasm.to_json();
      }

      async len(): Promise<number> {
        return await this.wasm.len();
      }

      async get(index: number): Promise<WasmContract.Ed25519KeyHash> {
        return new $outer.Ed25519KeyHash(
          await this.wasm.get(index),
          $outer._ctx
        );
      }

      async add(elem: WasmContract.Ed25519KeyHash): Promise<void> {
        return await this.wasm.add(elem.wasm);
      }

      async toOption(): Promise<WasmContract.Ed25519KeyHashes | undefined> {
        const wasm = await this.wasm.to_option();
        return wasm
          ? new $outer.Ed25519KeyHashes(wasm, $outer._ctx)
          : undefined;
      }
    }
    return Ed25519KeyHashes;
  })();

  public TxBuilderConstants = (() => {
    const $outer = this;

    class TxBuilderConstants
      extends Ptr<WasmV4.TxBuilderConstants>
      implements WasmContract.TxBuilderConstants
    {
      static async plutusDefaultCostModels(): Promise<WasmContract.Costmdls> {
        return new $outer.Costmdls(
          await WasmV4.TxBuilderConstants.plutus_default_cost_models(),
          $outer._ctx
        );
      }

      static async plutusAlonzoCostModels(): Promise<WasmContract.Costmdls> {
        return new $outer.Costmdls(
          await WasmV4.TxBuilderConstants.plutus_alonzo_cost_models(),
          $outer._ctx
        );
      }

      static async plutusVasilCostModels(): Promise<WasmContract.Costmdls> {
        return new $outer.Costmdls(
          await WasmV4.TxBuilderConstants.plutus_vasil_cost_models(),
          $outer._ctx
        );
      }
    }

    return TxBuilderConstants;
  })();

  public DrepRegistration = (() => {
    const $outer = this;

    class DrepRegistration
      extends Ptr<WasmV4.DrepRegistration>
      implements WasmContract.DrepRegistration
    {
      toBytes(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
          try {
            resolve(this.wasm.to_bytes());
          } catch (e) {
            reject(e);
          }
        });
      }

      async votingCredential(): Promise<WasmContract.Credential> {
        return new $outer.Credential(await this.wasm.voting_credential(), $outer._ctx);
      }

      async coin(): Promise<WasmContract.BigNum> {
        return new $outer.BigNum(await this.wasm.coin(), $outer._ctx);
      }

      async anchor(): Promise<WasmContract.Anchor> {
        return new $outer.Anchor(await this.wasm.anchor(), $outer._ctx);
      }

      static async new(
        votingCredential: WasmContract.Credential,
        coin: WasmContract.BigNum
      ): Promise<WasmContract.DrepRegistration> {
       return new DrepRegistration(await WasmV4.DrepRegistration.new(votingCredential.wasm, coin.wasm), $outer._ctx);
      }

      static async newWithAnchor(
        votingCredential: WasmContract.Credential,
        coin: WasmContract.BigNum,
        anchor: WasmContract.Anchor
      ): Promise<WasmContract.DrepRegistration> {
        return new DrepRegistration(
                await WasmV4.DrepRegistration.new_with_anchor(
                  votingCredential.wasm,
                  coin.wasm,
                  anchor.wasm
                ),
                $outer._ctx
              );

      }

      static async fromBytes(bytes: Uint8Array): Promise<DrepRegistration> {
        return new DrepRegistration(await WasmV4.DrepRegistration.from_bytes(bytes), $outer._ctx);
      }
    }

    return DrepRegistration;
  })();
}
