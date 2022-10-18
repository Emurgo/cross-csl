import * as WasmV4 from '@emurgo/cardano-serialization-lib-nodejs';

import * as WasmContract from '@emurgo/cross-csl-core';
const { Ptr, WasmProxy } = WasmContract;

export const init = (): WasmContract.WasmModuleProxy => {
  return {
    encryptWithPassword: (
      password: string,
      salt: string,
      nonce: string,
      data: string
    ) => {
      return Promise.resolve(
        WasmV4.encrypt_with_password(password, salt, nonce, data)
      );
    },
    decryptWithPassword: (password: string, salt: string) => {
      return Promise.resolve(WasmV4.decrypt_with_password(password, salt));
    },
    encodeJsonStrToMetadatum: (json: string, schema: number) => {
      const wasm = WasmV4.encode_json_str_to_metadatum(json, schema);
      return Promise.resolve(new NodeJs.TransactionMetadatum(wasm));
    },
    minAdaRequired: (
      value: NodeJs.Value,
      hasDataHash: boolean,
      coinsPerUtxoWord: NodeJs.BigNum,
    ) => {
      return Promise.resolve(
        new NodeJs.BigNum(
          WasmV4.min_ada_required(value.wasm, hasDataHash, coinsPerUtxoWord.wasm)
        )
      );
    },
    hashTransaction: (txBody: NodeJs.TransactionBody) => {
      return Promise.resolve(
        new NodeJs.TransactionHash(WasmV4.hash_transaction(txBody.wasm))
      );
    },
    makeVkeyWitness: (
      txBodyHash: NodeJs.TransactionHash,
      sk: NodeJs.PrivateKey
    ) => {
      return Promise.resolve(
        new NodeJs.Vkeywitness(
          WasmV4.make_vkey_witness(txBodyHash.wasm, sk.wasm)
        )
      );
    },
    makeIcarusBootstrapWitness: (
      txBodyHash: NodeJs.TransactionHash,
      addr: NodeJs.ByronAddress,
      key: NodeJs.Bip32PrivateKey
    ) => {
      return Promise.resolve(
        new NodeJs.BootstrapWitness(
          WasmV4.make_icarus_bootstrap_witness(
            txBodyHash.wasm,
            addr.wasm,
            key.wasm
          )
        )
      );
    },
    decodeMetadatumToJsonStr: (
      metadatum: NodeJs.TransactionMetadatum,
      schema: number
    ) => {
      return Promise.resolve(
        WasmV4.decode_metadatum_to_json_str(metadatum.wasm, schema)
      );
    },
    BigNum: NodeJs.BigNum,
    LinearFee: NodeJs.LinearFee,
    GeneralTransactionMetadata: NodeJs.GeneralTransactionMetadata,
    TransactionMetadatum: NodeJs.TransactionMetadatum,
    AuxiliaryData: NodeJs.AuxiliaryData,
    AssetName: NodeJs.AssetName,
    AssetNames: NodeJs.AssetNames,
    Assets: NodeJs.Assets,
    ScriptHash: NodeJs.ScriptHash,
    ScriptHashes: NodeJs.ScriptHashes,
    MultiAsset: NodeJs.MultiAsset,
    Ed25519KeyHash: NodeJs.Ed25519KeyHash,
    TransactionHash: NodeJs.TransactionHash,
    TransactionInput: NodeJs.TransactionInput,
    Value: NodeJs.Value,
    Address: NodeJs.Address,
    PublicKey: NodeJs.PublicKey,
    Bip32PublicKey: NodeJs.Bip32PublicKey,
    PrivateKey: NodeJs.PrivateKey,
    Bip32PrivateKey: NodeJs.Bip32PrivateKey,
    ByronAddress: NodeJs.ByronAddress,
    TransactionOutput: NodeJs.TransactionOutput,
    StakeCredential: NodeJs.StakeCredential,
    StakeRegistration: NodeJs.StakeRegistration,
    StakeDeregistration: NodeJs.StakeDeregistration,
    StakeDelegation: NodeJs.StakeDelegation,
    Certificate: NodeJs.Certificate,
    Certificates: NodeJs.Certificates,
    RewardAddress: NodeJs.RewardAddress,
    RewardAddresses: NodeJs.RewardAddresses,
    Withdrawals: NodeJs.Withdrawals,
    TransactionInputs: NodeJs.TransactionInputs,
    TransactionOutputs: NodeJs.TransactionOutputs,
    TransactionBody: NodeJs.TransactionBody,
    TransactionBuilder: NodeJs.TransactionBuilder,
    BaseAddress: NodeJs.BaseAddress,
    PointerAddress: NodeJs.PointerAddress,
    EnterpriseAddress: NodeJs.EnterpriseAddress,
    Pointer: NodeJs.Pointer,
    Vkey: NodeJs.Vkey,
    Ed25519Signature: NodeJs.Ed25519Signature,
    Vkeywitness: NodeJs.Vkeywitness,
    Vkeywitnesses: NodeJs.Vkeywitnesses,
    BootstrapWitness: NodeJs.BootstrapWitness,
    BootstrapWitnesses: NodeJs.BootstrapWitnesses,
    TransactionWitnessSet: NodeJs.TransactionWitnessSet,
    Transaction: NodeJs.Transaction,
    NetworkInfo: NodeJs.NetworkInfo,
    MetadataList: NodeJs.MetadataList,
    TransactionMetadatumLabels: NodeJs.TransactionMetadatumLabels,
    MetadataMap: NodeJs.MetadataMap,
    Int: NodeJs.Int,
    NativeScript: NodeJs.NativeScript,
    NativeScripts: NodeJs.NativeScripts,
    PlutusScript: NodeJs.PlutusScript,
    PlutusScripts: NodeJs.PlutusScripts,
    TxInputsBuilder: NodeJs.TxInputsBuilder,
  };
};

namespace NodeJs {
  export class BigNum
    extends Ptr<WasmV4.BigNum>
    implements WasmContract.BigNum
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
          resolve(new BigNum(wasmBigNum));
        } catch (e) {
          reject(e);
        }
      });
    }
    checkedAdd(other: BigNum): Promise<BigNum> {
      return new Promise((resolve, reject) => {
        try {
          const wasmBigNum = this.wasm.checked_add(other.wasm);
          resolve(new BigNum(wasmBigNum));
        } catch (e) {
          reject(e);
        }
      });
    }
    checkedSub(other: BigNum): Promise<BigNum> {
      return new Promise((resolve, reject) => {
        try {
          const wasmBigNum = this.wasm.checked_sub(other.wasm);
          resolve(new BigNum(wasmBigNum));
        } catch (e) {
          reject(e);
        }
      });
    }
    clampedSub(other: BigNum): Promise<BigNum> {
      return new Promise((resolve, reject) => {
        try {
          const wasmBigNum = this.wasm.clamped_sub(other.wasm);
          resolve(new BigNum(wasmBigNum));
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
          resolve(new BigNum(WasmV4.BigNum.from_bytes(bytes)));
        } catch (e) {
          reject(e);
        }
      });
    }

    static fromStr(string: string): Promise<BigNum> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new BigNum(WasmV4.BigNum.from_str(string)));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class LinearFee
    extends Ptr<WasmV4.LinearFee>
    implements WasmContract.LinearFee
  {
    constant(): Promise<BigNum> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new BigNum(this.wasm.constant()));
        } catch (e) {
          reject(e);
        }
      });
    }
    coefficient(): Promise<BigNum> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new BigNum(this.wasm.coefficient()));
        } catch (e) {
          reject(e);
        }
      });
    }
    static new(coefficient: BigNum, constant: BigNum): Promise<LinearFee> {
      return new Promise((resolve, reject) => {
        try {
          const wasmLinearFee = WasmV4.LinearFee.new(
            coefficient.wasm,
            constant.wasm
          );
          resolve(new LinearFee(wasmLinearFee));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class GeneralTransactionMetadata
    extends Ptr<WasmV4.GeneralTransactionMetadata>
    implements WasmContract.GeneralTransactionMetadata
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
      key: BigNum,
      value: TransactionMetadatum
    ): Promise<TransactionMetadatum> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new TransactionMetadatum(this.wasm.insert(key.wasm, value.wasm)));
        } catch (e) {
          reject(e);
        }
      });
    }

    get(key: BigNum): Promise<TransactionMetadatum> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new TransactionMetadatum(this.wasm.get(key.wasm)));
        } catch (e) {
          reject(e);
        }
      });
    }

    keys(): Promise<TransactionMetadatumLabels> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new TransactionMetadatumLabels(this.wasm.keys()));
        } catch (e) {
          reject(e);
        }
      });
    }

    static new(): Promise<GeneralTransactionMetadata> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new GeneralTransactionMetadata(WasmV4.GeneralTransactionMetadata.new()));
        } catch (e) {
          reject(e);
        }
      });
    }

    static fromBytes(bytes: Uint8Array): Promise<GeneralTransactionMetadata> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new GeneralTransactionMetadata(WasmV4.GeneralTransactionMetadata.from_bytes(bytes)));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class TransactionMetadatumLabels
    extends Ptr<WasmV4.TransactionMetadatumLabels>
    implements WasmContract.TransactionMetadatumLabels
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

    len(): Promise<number> {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.wasm.len());
        } catch (e) {
          reject(e);
        }
      });
    }

    get(index: number): Promise<BigNum> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new BigNum(this.wasm.get(index)));
        } catch (e) {
          reject(e);
        }
      });
    }

    add(elem: BigNum): Promise<void> {
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
          resolve(new TransactionMetadatumLabels(WasmV4.TransactionMetadatumLabels.from_bytes(bytes)));
        } catch (e) {
          reject(e);
        }
      });
    }

    static new(): Promise<TransactionMetadatumLabels> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new TransactionMetadatumLabels(WasmV4.TransactionMetadatumLabels.new()));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class MetadataMap
    extends Ptr<WasmV4.MetadataMap>
    implements WasmContract.MetadataMap
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
      key: TransactionMetadatum,
      value: TransactionMetadatum
    ): Promise<TransactionMetadatum | undefined> {
      return new Promise((resolve, reject) => {
        try {
          const wasm = this.wasm.insert(key.wasm, value.wasm);
          if (wasm) {
            resolve(new TransactionMetadatum(wasm));
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
      value: TransactionMetadatum
    ): Promise<TransactionMetadatum | undefined> {
      return new Promise((resolve, reject) => {
        try {
          const wasm = this.wasm.insert_str(key, value.wasm);
          if (wasm) {
            resolve(new TransactionMetadatum(wasm));
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
      value: TransactionMetadatum
    ): Promise<TransactionMetadatum | undefined> {
      return new Promise((resolve, reject) => {
        try {
          const wasm = this.wasm.insert_i32(key, value.wasm);
          if (wasm) {
            resolve(new TransactionMetadatum(wasm));
          } else {
            resolve(undefined);
          }
        } catch (e) {
          reject(e);
        }
      });
    }

    get(key: TransactionMetadatum): Promise<TransactionMetadatum> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new TransactionMetadatum(this.wasm.get(key.wasm)));
        } catch (e) {
          reject(e);
        }
      });
    }

    getStr(key: string): Promise<TransactionMetadatum> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new TransactionMetadatum(this.wasm.get_str(key)));
        } catch (e) {
          reject(e);
        }
      });
    }

    getI32(key: number): Promise<TransactionMetadatum> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new TransactionMetadatum(this.wasm.get_i32(key)));
        } catch (e) {
          reject(e);
        }
      });
    }

    has(key: TransactionMetadatum): Promise<boolean> {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.wasm.has(key.wasm));
        } catch (e) {
          reject(e);
        }
      });
    }

    keys(): Promise<MetadataList> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new MetadataList(this.wasm.keys()));
        } catch (e) {
          reject(e);
        }
      });
    }

    static fromBytes(bytes: Uint8Array): Promise<MetadataMap> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new MetadataMap(WasmV4.MetadataMap.from_bytes(bytes)));
        } catch (e) {
          reject(e);
        }
      });
    }

    static new(): Promise<MetadataMap> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new MetadataMap(WasmV4.MetadataMap.new()));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class Int extends Ptr<WasmV4.Int> implements WasmContract.Int {
    isPositive(): Promise<boolean> {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.wasm.is_positive());
        } catch (e) {
          reject(e);
        }
      });
    }

    asPositive(): Promise<BigNum | undefined> {
      return new Promise((resolve, reject) => {
        try {
          const wasm = this.wasm.as_positive();
          if (wasm) {
            resolve(new BigNum(wasm));
          } else {
            resolve(undefined);
          }
        } catch (e) {
          reject(e);
        }
      });
    }

    asNegative(): Promise<BigNum | undefined> {
      return new Promise((resolve, reject) => {
        try {
          const wasm = this.wasm.as_negative();
          if (wasm) {
            resolve(new BigNum(wasm));
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

    static new(x: BigNum): Promise<Int> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Int(WasmV4.Int.new(x.wasm)));
        } catch (e) {
          reject(e);
        }
      });
    }

    static newNegative(x: BigNum): Promise<Int> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Int(WasmV4.Int.new_negative(x.wasm)));
        } catch (e) {
          reject(e);
        }
      });
    }

    static newI32(x: number): Promise<Int> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Int(WasmV4.Int.new_i32(x)));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class TransactionMetadatum
    extends Ptr<WasmV4.TransactionMetadatum>
    implements WasmContract.TransactionMetadatum
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

    kind(): Promise<number> {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.wasm.kind());
        } catch (e) {
          reject(e);
        }
      });
    }

    asMap(): Promise<MetadataMap> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new MetadataMap(this.wasm.as_map()));
        } catch (e) {
          reject(e);
        }
      });
    }

    asList(): Promise<MetadataList> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new MetadataList(this.wasm.as_list()));
        } catch (e) {
          reject(e);
        }
      });
    }

    asInt(): Promise<Int> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Int(this.wasm.as_int()));
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
          resolve(new TransactionMetadatum(WasmV4.TransactionMetadatum.from_bytes(bytes)));
        } catch (e) {
          reject(e);
        }
      });
    }

    static newMap(map: MetadataMap): Promise<TransactionMetadatum> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new TransactionMetadatum(WasmV4.TransactionMetadatum.new_map(map.wasm)));
        } catch (e) {
          reject(e);
        }
      });
    }

    static newList(list: MetadataList): Promise<TransactionMetadatum> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new TransactionMetadatum(
            WasmV4.TransactionMetadatum.new_list(list.wasm)
          ));
        } catch (e) {
          reject(e);
        }
      });
    }

    static newInt(int: Int): Promise<TransactionMetadatum> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new TransactionMetadatum(WasmV4.TransactionMetadatum.new_int(int.wasm)));
        } catch (e) {
          reject(e);
        }
      });
    }

    static newBytes(bytes: Uint8Array): Promise<TransactionMetadatum> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new TransactionMetadatum(WasmV4.TransactionMetadatum.new_bytes(bytes)));
        } catch (e) {
          reject(e);
        }
      });
    }

    static newText(text: string): Promise<TransactionMetadatum> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new TransactionMetadatum(WasmV4.TransactionMetadatum.new_text(text)));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class AuxiliaryData
    extends Ptr<WasmV4.AuxiliaryData>
    implements WasmContract.AuxiliaryData
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

    metadata(): Promise<GeneralTransactionMetadata> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new GeneralTransactionMetadata(this.wasm.metadata()));
        } catch (e) {
          reject(e);
        }
      });
    }

    setMetadata(metadata: GeneralTransactionMetadata): Promise<void> {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.wasm.set_metadata(metadata.wasm));
        } catch (e) {
          reject(e);
        }
      });
    }

    nativeScripts(): Promise<NativeScripts | undefined> {
      return new Promise((resolve, reject) => {
        try {
          const wasm = this.wasm.native_scripts();
          if (wasm) {
            resolve(new NativeScripts(wasm));
          } else {
            resolve(undefined);
          }
        } catch (e) {
          reject(e);
        }
      });
    }

    setNativeScripts(native_scripts: NativeScripts): Promise<void> {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.wasm.set_native_scripts(native_scripts.wasm));
        } catch (e) {
          reject(e);
        }
      });
    }

    plutusScripts(): Promise<PlutusScripts | undefined> {
      return new Promise((resolve, reject) => {
        try {
          const wasm = this.wasm.plutus_scripts();
          if (wasm) {
            resolve(new PlutusScripts(wasm));
          } else {
            resolve(undefined);
          }
        } catch (e) {
          reject(e);
        }
      });
    }

    setPlutusScripts(plutus_scripts: PlutusScripts): Promise<void> {
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
          resolve(new AuxiliaryData(WasmV4.AuxiliaryData.from_bytes(bytes)));
        } catch (e) {
          reject(e);
        }
      });
    }

    static new(metadata?: GeneralTransactionMetadata): Promise<AuxiliaryData> {
      return new Promise((resolve, reject) => {
        try {
          const wasm = WasmV4.AuxiliaryData.new();
          if (metadata) {
            wasm.set_metadata(metadata.wasm);
          }
          resolve(new AuxiliaryData(wasm));
        } catch (e) {
          reject(e);
        }
      });
    }

    static empty(): Promise<AuxiliaryData> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new AuxiliaryData(undefined));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class AssetName
    extends Ptr<WasmV4.AssetName>
    implements WasmContract.AssetName
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
          resolve(new AssetName(WasmV4.AssetName.from_bytes(bytes)));
        } catch (e) {
          reject(e);
        }
      });
    }

    static new(name: Uint8Array): Promise<AssetName> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new AssetName(WasmV4.AssetName.new(name)));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class AssetNames
    extends Ptr<WasmV4.AssetNames>
    implements WasmContract.AssetNames
  {
    len(): Promise<number> {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.wasm.len());
        } catch (e) {
          reject(e);
        }
      });
    }

    get(index: number): Promise<AssetName> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new AssetName(this.wasm.get(index)));
        } catch (e) {
          reject(e);
        }
      });
    }

    add(item: AssetName): Promise<void> {
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
          resolve(new AssetNames(WasmV4.AssetNames.new()));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class Assets
    extends Ptr<WasmV4.Assets>
    implements WasmContract.Assets
  {
    len(): Promise<number> {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.wasm.len());
        } catch (e) {
          reject(e);
        }
      });
    }

    insert(key: AssetName, value: BigNum): Promise<BigNum> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new BigNum(this.wasm.insert(key.wasm, value.wasm)));
        } catch (e) {
          reject(e);
        }
      });
    }

    get(key: AssetName): Promise<BigNum> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new BigNum(this.wasm.get(key.wasm)));
        } catch (e) {
          reject(e);
        }
      });
    }

    keys(): Promise<AssetNames> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new AssetNames(this.wasm.keys()));
        } catch (e) {
          reject(e);
        }
      });
    }

    static new(): Promise<Assets> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Assets(WasmV4.Assets.new()));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class ScriptHash
    extends WasmProxy<WasmV4.ScriptHash>
    implements WasmContract.ScriptHash
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

    static fromBytes(bytes: Uint8Array): Promise<ScriptHash> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new ScriptHash(WasmV4.ScriptHash.from_bytes(bytes)));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class ScriptHashes
    extends WasmProxy<WasmV4.ScriptHashes>
    implements WasmContract.ScriptHashes
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

    len(): Promise<number> {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.wasm.len());
        } catch (e) {
          reject(e);
        }
      });
    }

    get(index: number): Promise<ScriptHash> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new ScriptHash(this.wasm.get(index)));
        } catch (e) {
          reject(e);
        }
      });
    }

    add(item: ScriptHash): Promise<void> {
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
          resolve(new ScriptHashes(WasmV4.ScriptHashes.from_bytes(bytes)));
        } catch (e) {
          reject(e);
        }
      });
    }

    static new(): Promise<ScriptHashes> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new ScriptHashes(WasmV4.ScriptHashes.new()));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  type PolicyID = ScriptHash;

  type PolicyIDs = ScriptHashes;

  export class MultiAsset
    extends Ptr<WasmV4.MultiAsset>
    implements WasmContract.MultiAsset
  {
    len(): Promise<number> {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.wasm.len());
        } catch (e) {
          reject(e);
        }
      });
    }

    insert(key: PolicyID, value: Assets): Promise<Assets> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Assets(this.wasm.insert(key.wasm, value.wasm)));
        } catch (e) {
          reject(e);
        }
      });
    }

    get(key: PolicyID): Promise<Assets> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Assets(this.wasm.get(key.wasm)));
        } catch (e) {
          reject(e);
        }
      });
    }

    keys(): Promise<PolicyIDs> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new ScriptHashes(this.wasm.keys()));
        } catch (e) {
          reject(e);
        }
      });
    }

    sub(rhs: MultiAsset): Promise<MultiAsset> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new MultiAsset(this.wasm.sub(rhs.wasm)));
        } catch (e) {
          reject(e);
        }
      });
    }

    static new(): Promise<MultiAsset> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new MultiAsset(WasmV4.MultiAsset.new()));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class Ed25519KeyHash
    extends Ptr<WasmV4.Ed25519KeyHash>
    implements WasmContract.Ed25519KeyHash
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

    static fromBytes(bytes: Uint8Array): Promise<Ed25519KeyHash> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Ed25519KeyHash(WasmV4.Ed25519KeyHash.from_bytes(bytes)));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class TransactionHash
    extends Ptr<WasmV4.TransactionHash>
    implements WasmContract.TransactionHash
  {
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
          resolve(new TransactionHash(WasmV4.TransactionHash.from_bytes(bytes)));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class TransactionInput
    extends Ptr<WasmV4.TransactionInput>
    implements WasmContract.TransactionInput
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

    transactionId(): Promise<TransactionHash> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new TransactionHash(this.wasm.transaction_id()));
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
      transactionId: TransactionHash,
      index: number
    ): Promise<TransactionInput> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new TransactionInput(
            WasmV4.TransactionInput.new(transactionId.wasm, index)
          ));
        } catch (e) {
          reject(e);
        }
      });
    }

    static fromBytes(bytes: Uint8Array): Promise<TransactionInput> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new TransactionInput(WasmV4.TransactionInput.from_bytes(bytes)));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class Value extends Ptr<WasmV4.Value> implements WasmContract.Value {
    coin(): Promise<BigNum> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new BigNum(this.wasm.coin()));
        } catch (e) {
          reject(e);
        }
      });
    }

    setCoin(coin: BigNum): Promise<void> {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.wasm.set_coin(coin.wasm));
        } catch (e) {
          reject(e);
        }
      });
    }

    multiasset(): Promise<MultiAsset> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new MultiAsset(this.wasm.multiasset()));
        } catch (e) {
          reject(e);
        }
      });
    }

    setMultiasset(multiasset: MultiAsset): Promise<void> {
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
          resolve(new Value(this.wasm.checked_add(rhs.wasm)));
        } catch (e) {
          reject(e);
        }
      });
    }

    checkedSub(rhs: Value): Promise<Value> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Value(this.wasm.checked_sub(rhs.wasm)));
        } catch (e) {
          reject(e);
        }
      });
    }

    clampedSub(rhs: Value): Promise<Value> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Value(this.wasm.clamped_sub(rhs.wasm)));
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

    static new(coin: BigNum): Promise<Value> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Value(WasmV4.Value.new(coin.wasm)));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class Address
    extends Ptr<WasmV4.Address>
    implements WasmContract.Address
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
          resolve(new Address(WasmV4.Address.from_bytes(bytes)));
        } catch (e) {
          reject(e);
        }
      });
    }

    static fromBech32(string: string): Promise<Address> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Address(WasmV4.Address.from_bech32(string)));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class PublicKey
    extends Ptr<WasmV4.PublicKey>
    implements WasmContract.PublicKey
  {
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

    hash(): Promise<Ed25519KeyHash> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Ed25519KeyHash(this.wasm.hash()));
        } catch (e) {
          reject(e);
        }
      });
    }

    static fromBech32(bech32_str: string): Promise<PublicKey> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new PublicKey(WasmV4.PublicKey.from_bech32(bech32_str)));
        } catch (e) {
          reject(e);
        }
      });
    }

    static fromBytes(bytes: Uint8Array): Promise<PublicKey> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new PublicKey(WasmV4.PublicKey.from_bytes(bytes)));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class Bip32PublicKey
    extends Ptr<WasmV4.Bip32PublicKey>
    implements WasmContract.Bip32PublicKey
  {
    derive(index: number): Promise<Bip32PublicKey> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Bip32PublicKey(this.wasm.derive(index)));
        } catch (e) {
          reject(e);
        }
      });
    }

    toRawKey(): Promise<PublicKey> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new PublicKey(this.wasm.to_raw_key()));
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
          resolve(new Bip32PublicKey(WasmV4.Bip32PublicKey.from_bech32(bech32_str)));
        } catch (e) {
          reject(e);
        }
      });
    }

    static fromBytes(bytes: Uint8Array): Promise<Bip32PublicKey> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Bip32PublicKey(WasmV4.Bip32PublicKey.from_bytes(bytes)));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class PrivateKey
    extends Ptr<WasmV4.PrivateKey>
    implements WasmContract.PrivateKey
  {
    toPublic(): Promise<PublicKey> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new PublicKey(this.wasm.to_public()));
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

    sign(message: Uint8Array): Promise<Ed25519Signature> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Ed25519Signature(this.wasm.sign(message)));
        } catch (e) {
          reject(e);
        }
      });
    }

    static fromExtendedBytes(bytes: Uint8Array): Promise<PrivateKey> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new PrivateKey(WasmV4.PrivateKey.from_extended_bytes(bytes)));
        } catch (e) {
          reject(e);
        }
      });
    }

    static fromNormalBytes(bytes: Uint8Array): Promise<PrivateKey> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new PrivateKey(WasmV4.PrivateKey.from_normal_bytes(bytes)));
        } catch (e) {
          reject(e);
        }
      });
    }

    static generateEd25519(): Promise<PrivateKey> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new PrivateKey(WasmV4.PrivateKey.generate_ed25519()));
        } catch (e) {
          reject(e);
        }
      });
    }

    static generateEd25519extended(): Promise<PrivateKey> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new PrivateKey(WasmV4.PrivateKey.generate_ed25519extended()));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class Bip32PrivateKey
    extends Ptr<WasmV4.Bip32PrivateKey>
    implements WasmContract.Bip32PrivateKey
  {
    derive(index: number): Promise<Bip32PrivateKey> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Bip32PrivateKey(this.wasm.derive(index)));
        } catch (e) {
          reject(e);
        }
      });
    }

    toRawKey(): Promise<PrivateKey> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new PrivateKey(this.wasm.to_raw_key()));
        } catch (e) {
          reject(e);
        }
      });
    }

    toPublic(): Promise<Bip32PublicKey> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Bip32PublicKey(this.wasm.to_public()));
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
          resolve(new Bip32PrivateKey(
            WasmV4.Bip32PrivateKey.from_bip39_entropy(entropy, password)
          ));
        } catch (e) {
          reject(e);
        }
      });
    }

    static fromBech32(bech32Str: string): Promise<Bip32PrivateKey> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Bip32PrivateKey(WasmV4.Bip32PrivateKey.from_bech32(bech32Str)));
        } catch (e) {
          reject(e);
        }
      });
    }

    static fromBytes(bytes: Uint8Array): Promise<Bip32PrivateKey> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Bip32PrivateKey(WasmV4.Bip32PrivateKey.from_bytes(bytes)));
        } catch (e) {
          reject(e);
        }
      });
    }

    static generateEd25519Bip32(): Promise<Bip32PrivateKey> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Bip32PrivateKey(WasmV4.Bip32PrivateKey.generate_ed25519_bip32()));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class ByronAddress
    extends Ptr<WasmV4.ByronAddress>
    implements WasmContract.ByronAddress
  {
    toBase58(): Promise<string> {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.wasm.to_base58());
        } catch (e) {
          reject(e);
        }
      });
    }

    toAddress(): Promise<Address> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Address(this.wasm.to_address()));
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
      key: Bip32PublicKey,
      protocolMagic: number
    ): Promise<ByronAddress> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new ByronAddress(
            WasmV4.ByronAddress.icarus_from_key(key.wasm, protocolMagic)
          ));
        } catch (e) {
          reject(e);
        }
      });
    }

    static fromBase58(string: string): Promise<ByronAddress> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new ByronAddress(WasmV4.ByronAddress.from_base58(string)));
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

    static fromAddress(addr: Address): Promise<ByronAddress> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new ByronAddress(WasmV4.ByronAddress.from_address(addr.wasm)));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class TransactionOutput
    extends Ptr<WasmV4.TransactionOutput>
    implements WasmContract.TransactionOutput
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

    address(): Promise<Address> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Address(this.wasm.address()));
        } catch (e) {
          reject(e);
        }
      });
    }

    amount(): Promise<Value> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Value(this.wasm.amount()));
        } catch (e) {
          reject(e);
        }
      });
    }

    static fromBytes(bytes: Uint8Array): Promise<TransactionOutput> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new TransactionOutput(WasmV4.TransactionOutput.from_bytes(bytes)));
        } catch (e) {
          reject(e);
        }
      });
    }

    static new(address: Address, amount: Value): Promise<TransactionOutput> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new TransactionOutput(
            WasmV4.TransactionOutput.new(address.wasm, amount.wasm)
          ));
        } catch (e) {
          reject(e);
        }
      });
    }

    setDataHash(dataHashHex: string): Promise<void> {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.wasm.set_data_hash(
            WasmV4.DataHash.from_bytes(Buffer.from(dataHashHex, 'hex'))
          ));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class StakeCredential
    extends Ptr<WasmV4.StakeCredential>
    implements WasmContract.StakeCredential
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

    toKeyhash(): Promise<Ed25519KeyHash> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Ed25519KeyHash(this.wasm.to_keyhash()));
        } catch (e) {
          reject(e);
        }
      });
    }

    toScripthash(): Promise<ScriptHash> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new ScriptHash(this.wasm.to_scripthash()));
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
          resolve(new StakeCredential(WasmV4.StakeCredential.from_bytes(bytes)));
        } catch (e) {
          reject(e);
        }
      });
    }

    static fromKeyhash(hash: Ed25519KeyHash): Promise<StakeCredential> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new StakeCredential(WasmV4.StakeCredential.from_keyhash(hash.wasm)));
        } catch (e) {
          reject(e);
        }
      });
    }

    static fromScripthash(hash: ScriptHash): Promise<StakeCredential> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new StakeCredential(WasmV4.StakeCredential.from_scripthash(hash.wasm)));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class StakeRegistration
    extends Ptr<WasmV4.StakeRegistration>
    implements WasmContract.StakeRegistration
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

    stakeCredential(): Promise<StakeCredential> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new StakeCredential(this.wasm.stake_credential()));
        } catch (e) {
          reject(e);
        }
      });
    }

    static new(stakeCredential: StakeCredential): Promise<StakeRegistration> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new StakeRegistration(
            WasmV4.StakeRegistration.new(stakeCredential.wasm)
          ));
        } catch (e) {
          reject(e);
        }
      });
    }

    static fromBytes(bytes: Uint8Array): Promise<StakeRegistration> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new StakeRegistration(WasmV4.StakeRegistration.from_bytes(bytes)));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class StakeDeregistration
    extends Ptr<WasmV4.StakeDeregistration>
    implements WasmContract.StakeDeregistration
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

    stakeCredential(): Promise<StakeCredential> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new StakeCredential(this.wasm.stake_credential()));
        } catch (e) {
          reject(e);
        }
      });
    }

    static new(stakeCredential: StakeCredential): Promise<StakeDeregistration> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new StakeDeregistration(
            WasmV4.StakeDeregistration.new(stakeCredential.wasm)
          ));
        } catch (e) {
          reject(e);
        }
      });
    }

    static fromBytes(bytes: Uint8Array): Promise<StakeDeregistration> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new StakeDeregistration(WasmV4.StakeDeregistration.from_bytes(bytes)));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class StakeDelegation
    extends Ptr<WasmV4.StakeDelegation>
    implements WasmContract.StakeDelegation
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

    stakeCredential(): Promise<StakeCredential> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new StakeCredential(this.wasm.stake_credential()));
        } catch (e) {
          reject(e);
        }
      });
    }

    poolKeyhash(): Promise<Ed25519KeyHash> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Ed25519KeyHash(this.wasm.pool_keyhash()));
        } catch (e) {
          reject(e);
        }
      });
    }

    static new(
      stakeCredential: StakeCredential,
      poolKeyHash: Ed25519KeyHash
    ): Promise<StakeDelegation> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new StakeDelegation(
            WasmV4.StakeDelegation.new(stakeCredential.wasm, poolKeyHash.wasm)
          ));
        } catch (e) {
          reject(e);
        }
      });
    }

    static fromBytes(bytes: Uint8Array): Promise<StakeDelegation> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new StakeDelegation(WasmV4.StakeDelegation.from_bytes(bytes)));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class Certificate
    extends Ptr<WasmV4.Certificate>
    implements WasmContract.Certificate
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

    asStakeRegistration(): Promise<StakeRegistration> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new StakeRegistration(this.wasm.as_stake_registration()));
        } catch (e) {
          reject(e);
        }
      });
    }

    asStakeDeregistration(): Promise<StakeDeregistration> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new StakeDeregistration(this.wasm.as_stake_deregistration()));
        } catch (e) {
          reject(e);
        }
      });
    }

    asStakeDelegation(): Promise<StakeDelegation> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new StakeDelegation(this.wasm.as_stake_delegation()));
        } catch (e) {
          reject(e);
        }
      });
    }

    static fromBytes(bytes: Uint8Array): Promise<Certificate> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Certificate(WasmV4.Certificate.from_bytes(bytes)));
        } catch (e) {
          reject(e);
        }
      });
    }

    static newStakeRegistration(
      stakeRegistration: StakeRegistration
    ): Promise<Certificate> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Certificate(
            WasmV4.Certificate.new_stake_registration(stakeRegistration.wasm)
          ));
        } catch (e) {
          reject(e);
        }
      });
    }

    static newStakeDeregistration(
      stakeDeregistration: StakeDeregistration
    ): Promise<Certificate> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Certificate(
            WasmV4.Certificate.new_stake_deregistration(stakeDeregistration.wasm)
          ));
        } catch (e) {
          reject(e);
        }
      });
    }

    static newStakeDelegation(
      stakeDelegation: StakeDelegation
    ): Promise<Certificate> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Certificate(
            WasmV4.Certificate.new_stake_delegation(stakeDelegation.wasm)
          ));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class Certificates
    extends Ptr<WasmV4.Certificates>
    implements WasmContract.Certificates
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

    len(): Promise<number> {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.wasm.len());
        } catch (e) {
          reject(e);
        }
      });
    }

    get(index: number): Promise<Certificate> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Certificate(this.wasm.get(index)));
        } catch (e) {
          reject(e);
        }
      });
    }

    add(item: Certificate): Promise<void> {
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
          resolve(new Certificates(WasmV4.Certificates.from_bytes(bytes)));
        } catch (e) {
          reject(e);
        }
      });
    }

    static new(): Promise<Certificates> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Certificates(WasmV4.Certificates.new()));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class RewardAddress
    extends Ptr<WasmV4.RewardAddress>
    implements WasmContract.RewardAddress
  {
    paymentCred(): Promise<StakeCredential> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new StakeCredential(this.wasm.payment_cred()));
        } catch (e) {
          reject(e);
        }
      });
    }

    toAddress(): Promise<Address> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Address(this.wasm.to_address()));
        } catch (e) {
          reject(e);
        }
      });
    }

    static fromAddress(addr: Address): Promise<RewardAddress> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new RewardAddress(WasmV4.RewardAddress.from_address(addr.wasm)));
        } catch (e) {
          reject(e);
        }
      });
    }

    static new(
      network: number,
      payment: StakeCredential
    ): Promise<RewardAddress> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new RewardAddress(WasmV4.RewardAddress.new(network, payment.wasm)));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class RewardAddresses
    extends Ptr<WasmV4.RewardAddresses>
    implements WasmContract.RewardAddresses
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

    len(): Promise<number> {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.wasm.len());
        } catch (e) {
          reject(e);
        }
      });
    }

    get(index: number): Promise<RewardAddress> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new RewardAddress(this.wasm.get(index)));
        } catch (e) {
          reject(e);
        }
      });
    }

    add(item: RewardAddress): Promise<void> {
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
          resolve(new RewardAddresses(WasmV4.RewardAddresses.from_bytes(bytes)));
        } catch (e) {
          reject(e);
        }
      });
    }

    static new(): Promise<RewardAddresses> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new RewardAddresses(WasmV4.RewardAddresses.new()));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class Withdrawals
    extends Ptr<WasmV4.Withdrawals>
    implements WasmContract.Withdrawals
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

    len(): Promise<number> {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.wasm.len());
        } catch (e) {
          reject(e);
        }
      });
    }

    insert(key: RewardAddress, value: BigNum): Promise<BigNum> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new BigNum(this.wasm.insert(key.wasm, value.wasm)));
        } catch (e) {
          reject(e);
        }
      });
    }

    get(key: RewardAddress): Promise<BigNum> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new BigNum(this.wasm.get(key.wasm)));
        } catch (e) {
          reject(e);
        }
      });
    }

    keys(): Promise<RewardAddresses> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new RewardAddresses(this.wasm.keys()));
        } catch (e) {
          reject(e);
        }
      });
    }

    static new(): Promise<Withdrawals> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Withdrawals(WasmV4.Withdrawals.new()));
        } catch (e) {
          reject(e);
        }
      });
    }

    static fromBytes(bytes: Uint8Array): Promise<Withdrawals> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Withdrawals(WasmV4.Withdrawals.from_bytes(bytes)));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class TransactionInputs
    extends Ptr<WasmV4.TransactionInputs>
    implements WasmContract.TransactionInputs
  {
    len(): Promise<number> {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.wasm.len());
        } catch (e) {
          reject(e);
        }
      });
    }

    get(index: number): Promise<TransactionInput> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new TransactionInput(this.wasm.get(index)));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class TransactionOutputs
    extends Ptr<WasmV4.TransactionOutputs>
    implements WasmContract.TransactionOutputs
  {
    len(): Promise<number> {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.wasm.len());
        } catch (e) {
          reject(e);
        }
      });
    }

    get(index: number): Promise<TransactionOutput> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new TransactionOutput(this.wasm.get(index)));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export type Optional<T> = T;

  export class TransactionBody
    extends Ptr<WasmV4.TransactionBody>
    implements WasmContract.TransactionBody
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

    inputs(): Promise<TransactionInputs> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new TransactionInputs(this.wasm.inputs()));
        } catch (e) {
          reject(e);
        }
      });
    }

    outputs(): Promise<TransactionOutputs> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new TransactionOutputs(this.wasm.outputs()));
        } catch (e) {
          reject(e);
        }
      });
    }

    fee(): Promise<BigNum> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new BigNum(this.wasm.fee()));
        } catch (e) {
          reject(e);
        }
      });
    }

    ttl(): Promise<Optional<number | undefined>> {
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

    certs(): Promise<Certificates> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Certificates(this.wasm.certs()));
        } catch (e) {
          reject(e);
        }
      });
    }

    withdrawals(): Promise<Withdrawals> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Withdrawals(this.wasm.withdrawals()));
        } catch (e) {
          reject(e);
        }
      });
    }

    static fromBytes(bytes: Uint8Array): Promise<TransactionBody> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new TransactionBody(WasmV4.TransactionBody.from_bytes(bytes)));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class TransactionBuilder
    extends Ptr<WasmV4.TransactionBuilder>
    implements WasmContract.TransactionBuilder
  {
    addKeyInput(
      hash: Ed25519KeyHash,
      input: TransactionInput,
      amount: Value
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
      hash: ByronAddress,
      input: TransactionInput,
      amount: Value
    ): Promise<void> {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.wasm.add_bootstrap_input(hash.wasm, input.wasm, amount.wasm));
        } catch (e) {
          reject(e);
        }
      });
    }

    addInput(
      address: Address,
      input: TransactionInput,
      amount: Value
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
      address: Address,
      input: TransactionInput,
      amount: Value
    ): Promise<BigNum> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new BigNum(
            this.wasm.fee_for_input(address.wasm, input.wasm, amount.wasm)
          ));
        } catch (e) {
          reject(e);
        }
      });
    }

    addOutput(output: TransactionOutput): Promise<void> {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.wasm.add_output(output.wasm));
        } catch (e) {
          reject(e);
        }
      });
    }

    feeForOutput(output: TransactionOutput): Promise<BigNum> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new BigNum(this.wasm.fee_for_output(output.wasm)));
        } catch (e) {
          reject(e);
        }
      });
    }

    setFee(fee: BigNum): Promise<void> {
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
          resolve(this.wasm.set_validity_start_interval(validityStartInterval));
        } catch (e) {
          reject(e);
        }
      });
    }

    setCerts(certs: Certificates): Promise<void> {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.wasm.set_certs(certs.wasm));
        } catch (e) {
          reject(e);
        }
      });
    }

    setWithdrawals(withdrawals: Withdrawals): Promise<void> {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.wasm.set_withdrawals(withdrawals.wasm));
        } catch (e) {
          reject(e);
        }
      });
    }

    setAuxiliaryData(auxiliary: AuxiliaryData): Promise<void> {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.wasm.set_auxiliary_data(auxiliary.wasm));
        } catch (e) {
          reject(e);
        }
      });
    }

    getExplicitInput(): Promise<Value> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Value(this.wasm.get_explicit_input()));
        } catch (e) {
          reject(e);
        }
      });
    }

    getImplicitInput(): Promise<Value> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Value(this.wasm.get_implicit_input()));
        } catch (e) {
          reject(e);
        }
      });
    }

    getExplicitOutput(): Promise<Value> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Value(this.wasm.get_explicit_output()));
        } catch (e) {
          reject(e);
        }
      });
    }

    getTotalOutput(): Promise<Value> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Value(this.wasm.get_total_output()));
        } catch (e) {
          reject(e);
        }
      });
    }

    getTotalInput(): Promise<Value> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Value(this.wasm.get_total_input()));
        } catch (e) {
          reject(e);
        }
      });
    }

    getDeposit(): Promise<BigNum> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new BigNum(this.wasm.get_deposit()));
        } catch (e) {
          reject(e);
        }
      });
    }

    getFeeIfSet(): Promise<BigNum> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new BigNum(this.wasm.get_fee_if_set()));
        } catch (e) {
          reject(e);
        }
      });
    }

    addChangeIfNeeded(address: Address): Promise<boolean> {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.wasm.add_change_if_needed(address.wasm));
        } catch (e) {
          reject(e);
        }
      });
    }

    addMintAsset(
      mintScript: NativeScript,
      mintName: AssetName,
      amount: Int
    ): Promise<void> {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.wasm.add_mint_asset(
            mintScript.wasm,
            mintName.wasm,
            amount.wasm
          ));
        } catch (e) {
          reject(e);
        }
      });
    }

    addJsonMetadatum(key: BigNum, value: string): Promise<void> {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.wasm.add_json_metadatum(key.wasm, value));
        } catch (e) {
          reject(e);
        }
      });
    }

    getAuxiliaryData(): Promise<AuxiliaryData | void> {
      return new Promise((resolve, reject) => {
        try {
          const wasm = this.wasm.get_auxiliary_data();
          if (wasm) {
            resolve(new AuxiliaryData(wasm));
          } else {
            resolve(undefined);
          }
        } catch (e) {
          reject(e);
        }
      });
    }

    addRequiredSigner(requiredSigner: Ed25519KeyHash): Promise<void> {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.wasm.add_required_signer(requiredSigner.wasm));
        } catch (e) {
          reject(e);
        }
      });
    }

    addNativeScriptInput(
      nativeScript: NativeScript,
      input: TransactionInput,
      amount: Value,
    ): Promise<void> {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.wasm.add_native_script_input(
            nativeScript.wasm,
            input.wasm,
            amount.wasm,
          ));
        } catch (e) {
          reject(e);
        }
      });
    }

    addPlutusScriptInput(
      plutusScript: PlutusScript,
      datum: string,
      redeemer: string,
      input: TransactionInput,
      amount: Value,
    ): Promise<void> {
      return new Promise((resolve, reject) => {
        try {
          const plutusWitness = WasmV4.PlutusWitness.new(
            plutusScript.wasm,
            WasmV4.PlutusData.from_bytes(Buffer.from(datum, 'hex')),
            WasmV4.Redeemer.from_bytes(Buffer.from(redeemer, 'hex'))
          );
          resolve(this.wasm.add_plutus_script_input(
            plutusWitness,
            input.wasm,
            amount.wasm,
          ));
        } catch (e) {
          reject(e);
        }
      });
    }

    setCollateral(txInputsBuilder: TxInputsBuilder): Promise<void> {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.wasm.set_collateral(txInputsBuilder.wasm));
        } catch (e) {
          reject(e);
        }
      });
    }
  
    calcScriptDataHash(costModel: 'vasil' | 'default'): Promise<void> {
      const wasmCostModel = costModel === 'vasil' ?
        WasmV4.TxBuilderConstants.plutus_vasil_cost_models() :
        WasmV4.TxBuilderConstants.plutus_default_cost_models();

      return new Promise((resolve, reject) => {
        try {
          resolve(this.wasm.calc_script_data_hash(wasmCostModel));
        } catch (e) {
          reject(e);
        }
      });
    }

    build(): Promise<TransactionBody> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new TransactionBody(this.wasm.build()));
        } catch (e) {
          reject(e);
        }
      });
    }

    minFee(): Promise<BigNum> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new BigNum(this.wasm.min_fee()));
        } catch (e) {
          reject(e);
        }
      });
    }

    static new(
      linearFee: LinearFee,
      minimumUtxoVal: BigNum,
      poolDeposit: BigNum,
      keyDeposit: BigNum,
      coinsPerUtxoWord: BigNum,
    ): Promise<TransactionBuilder> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new TransactionBuilder(
            WasmV4.TransactionBuilder.new(
              WasmV4.TransactionBuilderConfigBuilder.new()
                .fee_algo(linearFee.wasm)
                .pool_deposit(poolDeposit.wasm)
                .key_deposit(keyDeposit.wasm)
                .coins_per_utxo_word(coinsPerUtxoWord.wasm)
                .max_value_size(5000)
                .max_tx_size(16384)
                .ex_unit_prices(WasmV4.ExUnitPrices.new(
                  WasmV4.UnitInterval.new(
                    WasmV4.BigNum.from_str('577'),
                    WasmV4.BigNum.from_str('10000'),
                  ),
                  WasmV4.UnitInterval.new(
                    WasmV4.BigNum.from_str('721'),
                    WasmV4.BigNum.from_str('10000000'),
                  ),
                ))
                .prefer_pure_change(true)
                .build()
            )
          ));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class BaseAddress
    extends Ptr<WasmV4.BaseAddress>
    implements WasmContract.BaseAddress
  {
    paymentCred(): Promise<StakeCredential> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new StakeCredential(this.wasm.payment_cred()));
        } catch (e) {
          reject(e);
        }
      });
    }

    stakeCred(): Promise<StakeCredential> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new StakeCredential(this.wasm.stake_cred()));
        } catch (e) {
          reject(e);
        }
      });
    }

    toAddress(): Promise<Address> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Address(this.wasm.to_address()));
        } catch (e) {
          reject(e);
        }
      });
    }

    static fromAddress(addr: Address): Promise<BaseAddress> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new BaseAddress(WasmV4.BaseAddress.from_address(addr.wasm)));
        } catch (e) {
          reject(e);
        }
      });
    }

    static new(
      network: number,
      payment: StakeCredential,
      stake: StakeCredential
    ): Promise<BaseAddress> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new BaseAddress(
            WasmV4.BaseAddress.new(network, payment.wasm, stake.wasm)
          ));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class PointerAddress
    extends Ptr<WasmV4.PointerAddress>
    implements WasmContract.PointerAddress
  {
    paymentCred(): Promise<StakeCredential> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new StakeCredential(this.wasm.payment_cred()));
        } catch (e) {
          reject(e);
        }
      });
    }

    stakePointer(): Promise<Pointer> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Pointer(this.wasm.stake_pointer()));
        } catch (e) {
          reject(e);
        }
      });
    }

    toAddress(): Promise<Address> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Address(this.wasm.to_address()));
        } catch (e) {
          reject(e);
        }
      });
    }

    static fromAddress(addr: Address): Promise<PointerAddress> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new PointerAddress(WasmV4.PointerAddress.from_address(addr.wasm)));
        } catch (e) {
          reject(e);
        }
      });
    }

    static new(
      network: number,
      payment: StakeCredential,
      stake: Pointer
    ): Promise<PointerAddress> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new PointerAddress(
            WasmV4.PointerAddress.new(network, payment.wasm, stake.wasm)
          ));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class EnterpriseAddress
    extends Ptr<WasmV4.EnterpriseAddress>
    implements WasmContract.EnterpriseAddress
  {
    paymentCred(): Promise<StakeCredential> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new StakeCredential(this.wasm.payment_cred()));
        } catch (e) {
          reject(e);
        }
      });
    }

    toAddress(): Promise<Address> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Address(this.wasm.to_address()));
        } catch (e) {
          reject(e);
        }
      });
    }

    static fromAddress(addr: Address): Promise<EnterpriseAddress> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new EnterpriseAddress(WasmV4.EnterpriseAddress.from_address(addr.wasm)));
        } catch (e) {
          reject(e);
        }
      });
    }

    static new(
      network: number,
      payment: StakeCredential
    ): Promise<EnterpriseAddress> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new EnterpriseAddress(
            WasmV4.EnterpriseAddress.new(network, payment.wasm)
          ));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class Pointer
    extends Ptr<WasmV4.Pointer>
    implements WasmContract.Pointer
  {
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
          resolve(new Pointer(WasmV4.Pointer.new(slot, txIndex, certIndex)));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class Vkey extends Ptr<WasmV4.Vkey> implements WasmContract.Vkey {
    static new(pk: PublicKey): Promise<Vkey> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Vkey(WasmV4.Vkey.new(pk.wasm)));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class Ed25519Signature
    extends Ptr<WasmV4.Ed25519Signature>
    implements WasmContract.Ed25519Signature
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
          resolve(new Ed25519Signature(WasmV4.Ed25519Signature.from_bytes(bytes)));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class Vkeywitness
    extends Ptr<WasmV4.Vkeywitness>
    implements WasmContract.Vkeywitness
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

    signature(): Promise<Ed25519Signature> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Ed25519Signature(this.wasm.signature()));
        } catch (e) {
          reject(e);
        }
      });
    }

    static fromBytes(bytes: Uint8Array): Promise<Vkeywitness> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Vkeywitness(WasmV4.Vkeywitness.from_bytes(bytes)));
        } catch (e) {
          reject(e);
        }
      });
    }

    static new(vkey: Vkey, signature: Ed25519Signature): Promise<Vkeywitness> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Vkeywitness(WasmV4.Vkeywitness.new(vkey.wasm, signature.wasm)));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class Vkeywitnesses
    extends Ptr<WasmV4.Vkeywitnesses>
    implements WasmContract.Vkeywitnesses
  {
    len(): Promise<number> {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.wasm.len());
        } catch (e) {
          reject(e);
        }
      });
    }

    add(item: Vkeywitness): Promise<void> {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.wasm.add(item.wasm));
        } catch (e) {
          reject(e);
        }
      });
    }

    get(index: number): Promise<Vkeywitness> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Vkeywitness(this.wasm.get(index)));
        } catch (e) {
          reject(e);
        }
      });
    }

    static new(): Promise<Vkeywitnesses> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Vkeywitnesses(WasmV4.Vkeywitnesses.new()));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class BootstrapWitness
    extends Ptr<WasmV4.BootstrapWitness>
    implements WasmContract.BootstrapWitness
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

    static fromBytes(bytes: Uint8Array): Promise<BootstrapWitness> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new BootstrapWitness(WasmV4.BootstrapWitness.from_bytes(bytes)));
        } catch (e) {
          reject(e);
        }
      });
    }

    static new(
      vkey: Vkey,
      signature: Ed25519Signature,
      chainCode: Uint8Array,
      attributes: Uint8Array
    ): Promise<BootstrapWitness> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new BootstrapWitness(
            WasmV4.BootstrapWitness.new(
              vkey.wasm,
              signature.wasm,
              chainCode,
              attributes
            )
          ));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class BootstrapWitnesses
    extends Ptr<WasmV4.BootstrapWitnesses>
    implements WasmContract.BootstrapWitnesses
  {
    len(): Promise<number> {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.wasm.len());
        } catch (e) {
          reject(e);
        }
      });
    }

    add(item: BootstrapWitness): Promise<void> {
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
          resolve(new BootstrapWitness(this.wasm.get(index)));
        } catch (e) {
          reject(e);
        }
      });
    }

    static new(): Promise<BootstrapWitnesses> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new BootstrapWitnesses(WasmV4.BootstrapWitnesses.new()));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class TransactionWitnessSet
    extends Ptr<WasmV4.TransactionWitnessSet>
    implements WasmContract.TransactionWitnessSet
  {
    setBootstraps(bootstraps: BootstrapWitnesses): Promise<void> {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.wasm.set_bootstraps(bootstraps.wasm));
        } catch (e) {
          reject(e);
        }
      });
    }

    setVkeys(vkeywitnesses: Vkeywitnesses): Promise<void> {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.wasm.set_vkeys(vkeywitnesses.wasm));
        } catch (e) {
          reject(e);
        }
      });
    }

    vkeys(): Promise<Vkeywitnesses> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Vkeywitnesses(this.wasm.vkeys()));
        } catch (e) {
          reject(e);
        }
      });
    }

    bootstraps(): Promise<WasmContract.BootstrapWitnesses> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new BootstrapWitnesses(this.wasm.bootstraps()));
        } catch (e) {
          reject(e);
        }
      });
    }

    static new(): Promise<TransactionWitnessSet> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new TransactionWitnessSet(WasmV4.TransactionWitnessSet.new()));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class Transaction
    extends Ptr<WasmV4.Transaction>
    implements WasmContract.Transaction
  {
    body(): Promise<TransactionBody> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new TransactionBody(this.wasm.body()));
        } catch (e) {
          reject(e);
        }
      });
    }

    witnessSet(): Promise<TransactionWitnessSet> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new TransactionWitnessSet(this.wasm.witness_set()));
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
          resolve(new AuxiliaryData(this.wasm.auxiliary_data()));
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
      body: TransactionBody,
      witnessSet: TransactionWitnessSet,
      auxiliary?: AuxiliaryData
    ): Promise<Transaction> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Transaction(
            WasmV4.Transaction.new(
              body.wasm,
              witnessSet.wasm,
              auxiliary?.internalWasm
            )
          ));
        } catch (e) {
          reject(e);
        }
      });
    }

    static fromBytes(bytes: Uint8Array): Promise<Transaction> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Transaction(WasmV4.Transaction.from_bytes(bytes)));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class NetworkInfo
    extends Ptr<WasmV4.NetworkInfo>
    implements WasmContract.NetworkInfo
  {
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

    static new(networkId: number, protocolMagic: number): Promise<NetworkInfo> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new NetworkInfo(WasmV4.NetworkInfo.new(networkId, protocolMagic)));
        } catch (e) {
          reject(e);
        }
      });
    }

    static testnet(): Promise<NetworkInfo> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new NetworkInfo(WasmV4.NetworkInfo.testnet()));
        } catch (e) {
          reject(e);
        }
      });
    }

    static mainnet(): Promise<NetworkInfo> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new NetworkInfo(WasmV4.NetworkInfo.mainnet()));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class MetadataList
    extends Ptr<WasmV4.MetadataList>
    implements WasmContract.MetadataList
  {
    static new(): Promise<MetadataList> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new MetadataList(WasmV4.MetadataList.new()));
        } catch (e) {
          reject(e);
        }
      });
    }

    static fromBytes(bytes: Uint8Array): Promise<MetadataList> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new MetadataList(WasmV4.MetadataList.from_bytes(bytes)));
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

    get(index: number): Promise<TransactionMetadatum> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new TransactionMetadatum(this.wasm.get(index)));
        } catch (e) {
          reject(e);
        }
      });
    }

    add(item: TransactionMetadatum): Promise<void> {
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

  export class NativeScript
    extends Ptr<WasmV4.NativeScript>
    implements WasmContract.NativeScript
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

    hash(): Promise<Ed25519KeyHash> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new Ed25519KeyHash(this.wasm.hash()));
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
          resolve(new NativeScript(WasmV4.NativeScript.from_bytes(bytes)));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class NativeScripts
    extends Ptr<WasmV4.NativeScripts>
    implements WasmContract.NativeScripts
  {
    len(): Promise<number> {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.wasm.len());
        } catch (e) {
          reject(e);
        }
      });
    }

    get(index: number): Promise<NativeScript> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new NativeScript(this.wasm.get(index)));
        } catch (e) {
          reject(e);
        }
      });
    }

    add(elem: NativeScript): Promise<void> {
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
          resolve(new NativeScripts(WasmV4.NativeScripts.new()));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class PlutusScript
    extends Ptr<WasmV4.PlutusScript>
    implements WasmContract.PlutusScript
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
          resolve(new PlutusScript(WasmV4.PlutusScript.from_bytes(bytes)));
        } catch (e) {
          reject(e);
        }
      });
    }

    static new(bytes: Uint8Array): Promise<PlutusScript> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new PlutusScript(WasmV4.PlutusScript.new(bytes)));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class PlutusScripts
    extends Ptr<WasmV4.PlutusScripts>
    implements WasmContract.PlutusScripts
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

    len(): Promise<number> {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.wasm.len());
        } catch (e) {
          reject(e);
        }
      });
    }

    get(index: number): Promise<PlutusScript> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new PlutusScript(this.wasm.get(index)));
        } catch (e) {
          reject(e);
        }
      });
    }

    add(elem: PlutusScript): Promise<void> {
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
          resolve(new PlutusScripts(WasmV4.PlutusScripts.from_bytes(bytes)));
        } catch (e) {
          reject(e);
        }
      });
    }

    static new(): Promise<PlutusScripts> {
      return new Promise((resolve, reject) => {
        try {
          resolve(new PlutusScripts(WasmV4.PlutusScripts.new()));
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  export class TxInputsBuilder
    extends Ptr<WasmV4.TxInputsBuilder>
    implements WasmContract.TxInputsBuilder
  {
    addInput(
      address: Address,
      input: TransactionInput,
      amount: Value
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
          resolve(new TxInputsBuilder(WasmV4.TxInputsBuilder.new()));
        } catch (e) {
          reject(e);
        }
      });
    }
  }
}
