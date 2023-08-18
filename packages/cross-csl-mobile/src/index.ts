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
    return await Promise.resolve(new this.TransactionMetadatum(wasm, this._ctx));
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
    dataCost: WasmContract.DataCost,
  ) {
    return new this.BigNum(
      await WasmV4.min_ada_for_output(
        output.wasm,
        dataCost.wasm,
      ),
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
        return new DataHash(await WasmV4.DataHash.from_bech32(str), $outer._ctx);
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
    }
    return PlutusData;
  })();

  public StakeCredential = (() => {
    const $outer = this;

    class StakeCredential
      extends Ptr<WasmV4.StakeCredential>
      implements WasmContract.StakeCredential
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

      static async fromBytes(bytes: Uint8Array): Promise<StakeCredential> {
        return new StakeCredential(
          await WasmV4.StakeCredential.from_bytes(bytes),
          $outer._ctx
        );
      }

      static async fromKeyhash(
        hash: WasmContract.Ed25519KeyHash
      ): Promise<StakeCredential> {
        return new StakeCredential(
          await WasmV4.StakeCredential.from_keyhash(hash.wasm),
          $outer._ctx
        );
      }

      static async fromScripthash(
        hash: WasmContract.ScriptHash
      ): Promise<StakeCredential> {
        return new StakeCredential(
          await WasmV4.StakeCredential.from_scripthash(hash.wasm),
          $outer._ctx
        );
      }
    }
    return StakeCredential;
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

      async stakeCredential(): Promise<WasmContract.StakeCredential> {
        return new $outer.StakeCredential(
          await this.wasm.stake_credential(),
          $outer._ctx
        );
      }

      static async new(
        stakeCredential: WasmContract.StakeCredential
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

      async stakeCredential(): Promise<WasmContract.StakeCredential> {
        return new $outer.StakeCredential(
          await this.wasm.stake_credential(),
          $outer._ctx
        );
      }

      static async new(
        stakeCredential: WasmContract.StakeCredential
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

      async stakeCredential(): Promise<WasmContract.StakeCredential> {
        return new $outer.StakeCredential(
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
        stakeCredential: WasmContract.StakeCredential,
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
      async paymentCred(): Promise<WasmContract.StakeCredential> {
        return new $outer.StakeCredential(
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
        payment: WasmContract.StakeCredential
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
        return new $outer.RewardAddress(await this.wasm.get(index), $outer._ctx);
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
        return await this.wasm.add_key_input(hash.wasm, input.wasm, amount.wasm);
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
        return new $outer.Value(await this.wasm.get_total_output(), $outer._ctx);
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
        plutusScript: WasmContract.PlutusScript,
        datum: string,
        redeemer: string,
        input: WasmContract.TransactionInput,
        amount: WasmContract.Value
      ): Promise<void> {
        const plutusWitness = await WasmV4.PlutusWitness.new(
          plutusScript.wasm,
          await WasmV4.PlutusData.from_bytes(Buffer.from(datum, 'hex')),
          await WasmV4.Redeemer.from_bytes(Buffer.from(redeemer, 'hex'))
        );
        return await this.wasm.add_plutus_script_input(
          plutusWitness,
          input.wasm,
          amount.wasm
        );
      }

      async setCollateral(
        txInputsBuilder: WasmContract.TxInputsBuilder
      ): Promise<void> {
        return await this.wasm.set_collateral(txInputsBuilder.wasm);
      }

      async calcScriptDataHash(costModel: 'vasil' | 'default'): Promise<void> {
        const wasmCostModel =
          costModel === 'vasil'
            ? await WasmV4.TxBuilderConstants.plutus_vasil_cost_models()
            : await WasmV4.TxBuilderConstants.plutus_default_cost_models();
        return await this.wasm.calc_script_data_hash(wasmCostModel);
      }

      async build(): Promise<WasmContract.TransactionBody> {
        return new $outer.TransactionBody(await this.wasm.build(), $outer._ctx);
      }

      async minFee(): Promise<WasmContract.BigNum> {
        return new $outer.BigNum(await this.wasm.min_fee(), $outer._ctx);
      }

      static async new(
        linearFee: WasmContract.LinearFee,
        poolDeposit: WasmContract.BigNum,
        keyDeposit: WasmContract.BigNum,
        coinsPerUtxoWord: WasmContract.BigNum
      ): Promise<TransactionBuilder> {
        const unitPrice = await WasmV4.ExUnitPrices.new(
          await WasmV4.UnitInterval.new(
            await WasmV4.BigNum.from_str('577'),
            await WasmV4.BigNum.from_str('10000')
          ),
          await WasmV4.UnitInterval.new(
            await WasmV4.BigNum.from_str('721'),
            await WasmV4.BigNum.from_str('10000000')
          )
        );

        const cfgBuilder = await WasmV4.TransactionBuilderConfigBuilder.new()
          .then((b) => b.fee_algo(linearFee.wasm))
          .then((b) => b.pool_deposit(poolDeposit.wasm))
          .then((b) => b.key_deposit(keyDeposit.wasm))
          .then((b) => b.coins_per_utxo_word(coinsPerUtxoWord.wasm))
          .then((b) => b.max_value_size(5000))
          .then((b) => b.max_tx_size(16384))
          .then((b) => b.ex_unit_prices(unitPrice))
          .then((b) => b.prefer_pure_change(true));

        const cfg = await cfgBuilder.build();

        return new TransactionBuilder(
          await WasmV4.TransactionBuilder.new(cfg),
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
      async paymentCred(): Promise<WasmContract.StakeCredential> {
        return new $outer.StakeCredential(
          await this.wasm.payment_cred(),
          $outer._ctx
        );
      }

      async stakeCred(): Promise<WasmContract.StakeCredential> {
        return new $outer.StakeCredential(
          await this.wasm.stake_cred(),
          $outer._ctx
        );
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
        payment: WasmContract.StakeCredential,
        stake: WasmContract.StakeCredential
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
      async paymentCred(): Promise<WasmContract.StakeCredential> {
        return new $outer.StakeCredential(
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
        payment: WasmContract.StakeCredential,
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
      async paymentCred(): Promise<WasmContract.StakeCredential> {
        return new $outer.StakeCredential(
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
        payment: WasmContract.StakeCredential
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
      async setBootstraps(
        bootstraps: WasmContract.BootstrapWitnesses
      ): Promise<void> {
        return await this.wasm.set_bootstraps(bootstraps.wasm);
      }

      async setVkeys(vkeywitnesses: WasmContract.Vkeywitnesses): Promise<void> {
        return await this.wasm.set_vkeys(vkeywitnesses.wasm);
      }

      async vkeys(): Promise<WasmContract.Vkeywitnesses> {
        return new $outer.Vkeywitnesses(await this.wasm.vkeys(), $outer._ctx);
      }

      async bootstraps(): Promise<WasmContract.BootstrapWitnesses> {
        return new $outer.BootstrapWitnesses(
          await this.wasm.bootstraps(),
          $outer._ctx
        );
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
      extends Ptr<any>
      implements WasmContract.TxInputsBuilder
    {
      addInput(
        address: WasmContract.Address,
        input: WasmContract.TransactionInput,
        amount: WasmContract.Value
      ): Promise<void> {
        return this.wasm.add_input(address.wasm, input.wasm, amount.wasm);
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
      static async newCoinsPerWord(coinsPerWord: WasmContract.BigNum): Promise<DataCost> {
        return new DataCost(
          await WasmV4.DataCost.new_coins_per_word(coinsPerWord.wasm),
          $outer._ctx,
        );
      }

      static async newCoinsPerByte(coinsPerByte: WasmContract.BigNum): Promise<DataCost> {
        return new DataCost(
          await WasmV4.DataCost.new_coins_per_byte(coinsPerByte.wasm),
          $outer._ctx,
        );
      }

      async coinsPerByte(): Promise<WasmContract.BigNum> {
        return new $outer.BigNum(
          await this.wasm.coins_per_byte(),
          $outer._ctx,
        );
      }
    }
    return DataCost;
  })();
}
