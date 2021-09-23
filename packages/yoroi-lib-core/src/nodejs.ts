import * as WasmV4 from '@emurgo/cardano-serialization-lib-nodejs'
import * as WasmContract from '../../yoroi-lib-core/src/wasm-contract'

import { createYoroiLib, YoroiLib } from '../../yoroi-lib-core/src/index'

export const init = (): YoroiLib => {
  return createYoroiLib({
    encrypt_with_password: (password: string, salt: string, nonce: string, data: string) => {
      return Promise.resolve(WasmV4.encrypt_with_password(password, salt, nonce, data))
    },
    decrypt_with_password: (password: string, salt: string) => {
      return Promise.resolve(WasmV4.decrypt_with_password(password, salt))
    },
    encode_json_str_to_metadatum: (json: string, schema: number) => {
      const wasm = WasmV4.encode_json_str_to_metadatum(json, schema)
      return Promise.resolve(new NodeJs.TransactionMetadatum(wasm))
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
    TransactionBuilder: NodeJs.TransactionBuilder
  });
}

namespace NodeJs {
  export abstract class WasmProxy<T> {
    private _wasm: T
  
    get wasm(): T {
      return this._wasm
    }
  
    constructor(wasm: T) {
      this._wasm = wasm
    }
  }
  
  export abstract class Ptr<T extends { free: () => any }> extends WasmProxy<T> {
    constructor(wasm: T) {
      super(wasm)
    }
  
    free(): Promise<void> {
      return Promise.resolve(this.wasm.free())
    }
  }
  
  export class BigNum extends Ptr<WasmV4.BigNum> implements WasmContract.BigNum {
    to_bytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }
    to_str(): Promise<string> {
      return Promise.resolve(this.wasm.to_str())
    }
    checked_mul(other: BigNum): Promise<BigNum> {
      const wasmBigNum = this.wasm.checked_mul(other.wasm)
      return Promise.resolve(new BigNum(wasmBigNum))
    }
    checked_add(other: BigNum): Promise<BigNum> {
      const wasmBigNum = this.wasm.checked_add(other.wasm)
      return Promise.resolve(new BigNum(wasmBigNum))
    }
    checked_sub(other: BigNum): Promise<BigNum> {
      const wasmBigNum = this.wasm.checked_sub(other.wasm)
      return Promise.resolve(new BigNum(wasmBigNum))
    }
    clamped_sub(other: BigNum): Promise<BigNum> {
      const wasmBigNum = this.wasm.clamped_sub(other.wasm)
      return Promise.resolve(new BigNum(wasmBigNum))
    }
    compare(rhs_value: BigNum): Promise<number> {
      return Promise.resolve(this.wasm.compare(rhs_value.wasm))
    }
  
    static from_bytes(bytes: Uint8Array): Promise<BigNum> {
      return Promise.resolve(new BigNum(WasmV4.BigNum.from_bytes(bytes)))
    }
  
    static from_str(string: string): Promise<BigNum> {
      return Promise.resolve(new BigNum(WasmV4.BigNum.from_str(string)))
    }
  }
  
  export class LinearFee extends Ptr<WasmV4.LinearFee> implements WasmContract.LinearFee {
    free(): Promise<void> {
      return Promise.resolve(this.wasm.free())
    }  
    constant(): Promise<BigNum> {
      return Promise.resolve(new BigNum(this.wasm.constant()))
    }
    coefficient(): Promise<BigNum> {
      return Promise.resolve(new BigNum(this.wasm.coefficient()))
    }
    static new(coefficient: BigNum, constant: BigNum): Promise<LinearFee> {
      const wasmLinearFee = WasmV4.LinearFee.new(coefficient.wasm, constant.wasm)
      return Promise.resolve(new LinearFee(wasmLinearFee))
    }
  }
  
  export class GeneralTransactionMetadata
    extends Ptr<WasmV4.GeneralTransactionMetadata>
    implements WasmContract.GeneralTransactionMetadata {
  
    insert(key: BigNum, value: TransactionMetadatum): Promise<TransactionMetadatum | undefined> {
      const wasm = this.wasm.insert(key.wasm, value.wasm)
      if (wasm) {
        return Promise.resolve(new TransactionMetadatum(wasm))
      }
    }
  
    get(key: BigNum): Promise<TransactionMetadatum | undefined> {
      const wasm = this.wasm.get(key.wasm)
      if (!wasm) return;
      return Promise.resolve(new TransactionMetadatum(wasm))
    }
  
    static new(): Promise<GeneralTransactionMetadata> {
      const wasm = WasmV4.GeneralTransactionMetadata.new()
      return Promise.resolve(new GeneralTransactionMetadata(wasm))
    }
  }
  
  export class TransactionMetadatum
    extends Ptr<WasmV4.TransactionMetadatum>
    implements WasmContract.TransactionMetadatum {
  
    to_bytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }
  }
  
  export class AuxiliaryData
    extends Ptr<WasmV4.AuxiliaryData>
    implements WasmContract.AuxiliaryData {
  
    metadata(): Promise<GeneralTransactionMetadata> {
      const wasm = this.wasm.metadata()
      return Promise.resolve(new GeneralTransactionMetadata(wasm))
    }
  
    static new(metadata: GeneralTransactionMetadata): Promise<AuxiliaryData> {
      const wasm = WasmV4.AuxiliaryData.new()
      wasm.set_metadata(metadata.wasm)
      return Promise.resolve(new AuxiliaryData(wasm))
    }
  }
  
  export class AssetName
    extends Ptr<WasmV4.AssetName>
    implements WasmContract.AssetName {
  
    to_bytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }
    name(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.name())
    }
  
    static from_bytes(bytes: Uint8Array): Promise<AssetName> {
      return Promise.resolve(new AssetName(WasmV4.AssetName.from_bytes(bytes)))
    }
  
    static new(name: Uint8Array): Promise<AssetName> {
     return Promise.resolve(new AssetName(WasmV4.AssetName.new(name)))
    }
  }
  
  export class AssetNames
    extends Ptr<WasmV4.AssetNames>
    implements WasmContract.AssetNames {
  
    len(): Promise<number> {
      return Promise.resolve(this.wasm.len())
    }
  
    get(index: number): Promise<AssetName> {
      return Promise.resolve(new AssetName(this.wasm.get(index)))
    }
  
    add(item: AssetName): Promise<void> {
      return Promise.resolve(this.wasm.add(item.wasm))
    }
  
    static new(): Promise<AssetNames> {
      return Promise.resolve(new AssetNames(WasmV4.AssetNames.new()))
    }
  }
  
  export class Assets
    extends Ptr<WasmV4.Assets>
    implements WasmContract.Assets {
  
    len(): Promise<number> {
      return Promise.resolve(this.wasm.len())
    }
  
    insert(key: AssetName, value: BigNum): Promise<BigNum> {
      return Promise.resolve(new BigNum(this.wasm.insert(key.wasm, value.wasm)))
    }
  
    get(key: AssetName): Promise<BigNum | undefined> {
      return Promise.resolve(new BigNum(this.wasm.get(key.wasm)))
    }
  
    keys(): Promise<AssetNames> {
      return Promise.resolve(new AssetNames(this.wasm.keys()))
    }
  
    static new(): Promise<Assets> {
      return Promise.resolve(new Assets(WasmV4.Assets.new()))
    }
  }
  
  export class ScriptHash
    extends WasmProxy<WasmV4.ScriptHash>
    implements WasmContract.ScriptHash {
  
    to_bytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }
  
    static from_bytes(bytes: Uint8Array): Promise<ScriptHash> {
      return Promise.resolve(new ScriptHash(WasmV4.ScriptHash.from_bytes(bytes)))
    }
  }
  
  export class ScriptHashes
    extends WasmProxy<WasmV4.ScriptHashes>
    implements WasmContract.ScriptHashes {
  
    to_bytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }
  
    len(): Promise<number> {
      return Promise.resolve(this.wasm.len())
    }
  
    get(index: number): Promise<ScriptHash> {
      return Promise.resolve(new ScriptHash(this.wasm.get(index)))
    }
  
    add(item: ScriptHash): Promise<void> {
      return Promise.resolve(this.wasm.add(item.wasm))
    }
  
    static from_bytes(bytes: Uint8Array): Promise<ScriptHashes> {
      return Promise.resolve(new ScriptHashes(WasmV4.ScriptHashes.from_bytes(bytes)))
    }
  
    static new(): Promise<ScriptHashes> {
      return Promise.resolve(new ScriptHashes(WasmV4.ScriptHashes.new()))
    }
  }
  
  type PolicyID = ScriptHash
  
  type PolicyIDs = ScriptHashes
  
  export class MultiAsset
    extends Ptr<WasmV4.MultiAsset>
    implements WasmContract.MultiAsset {
  
    len(): Promise<number> {
      return Promise.resolve(this.wasm.len())
    }
  
    insert(key: PolicyID, value: Assets): Promise<Assets> {
      return Promise.resolve(new Assets(this.wasm.insert(key.wasm, value.wasm)))
    }
  
    get(key: PolicyID): Promise<Assets | undefined> {
      return Promise.resolve(new Assets(this.wasm.get(key.wasm)))
    }
  
    keys(): Promise<PolicyIDs> {
      return Promise.resolve(new ScriptHashes(this.wasm.keys()))
    }
  
    sub(rhs: MultiAsset): Promise<MultiAsset> {
      return Promise.resolve(new MultiAsset(this.wasm.sub(rhs.wasm)))
    }
  
    static new(): Promise<MultiAsset> {
      return Promise.resolve(new MultiAsset(WasmV4.MultiAsset.new()))
    }
  }
  
  export class Ed25519KeyHash
    extends Ptr<WasmV4.Ed25519KeyHash>
    implements WasmContract.Ed25519KeyHash {
  
    to_bytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }
  
    static from_bytes(bytes: Uint8Array): Promise<Ed25519KeyHash> {
      return Promise.resolve(new Ed25519KeyHash(WasmV4.Ed25519KeyHash.from_bytes(bytes)))
    }
  }
  
  export class TransactionHash
    extends Ptr<WasmV4.TransactionHash>
    implements WasmContract.TransactionHash {
  
    to_bytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }
  
    static from_bytes(bytes: Uint8Array): Promise<TransactionHash> {
      return Promise.resolve(new TransactionHash(WasmV4.TransactionHash.from_bytes(bytes)))
    }
  }
  
  export class TransactionInput
    extends Ptr<WasmV4.TransactionInput>
    implements WasmContract.TransactionInput {
  
    to_bytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }
  
    transaction_id(): Promise<TransactionHash> {
      return Promise.resolve(new TransactionHash(this.wasm.transaction_id()))
    }
  
    index(): Promise<number> {
      return Promise.resolve(this.wasm.index())
    }
  
    static new(transactionId: TransactionHash, index: number): Promise<TransactionInput> {
      return Promise.resolve(new TransactionInput(WasmV4.TransactionInput.new(transactionId.wasm, index)))
    }
  
    static from_bytes(bytes: Uint8Array): Promise<TransactionInput> {
      return Promise.resolve(new TransactionInput(WasmV4.TransactionInput.from_bytes(bytes)))
    }
  }
  
  export class Value
    extends Ptr<WasmV4.Value>
    implements WasmContract.Value {
  
    coin(): Promise<BigNum> {
      return Promise.resolve(new BigNum(this.wasm.coin()))
    }
  
    set_coin(coin: BigNum): Promise<void> {
      return Promise.resolve(this.wasm.set_coin(coin.wasm))
    }
  
    multiasset(): Promise<MultiAsset | undefined> {
      return Promise.resolve(new MultiAsset(this.wasm.multiasset()))
    }
  
    set_multiasset(multiasset: MultiAsset): Promise<void> {
      return Promise.resolve(this.wasm.set_multiasset(multiasset.wasm))
    }
  
    checked_add(rhs: Value): Promise<Value> {
      return Promise.resolve(new Value(this.wasm.checked_add(rhs.wasm)))
    }
  
    checked_sub(rhs: Value): Promise<Value> {
      return Promise.resolve(new Value(this.wasm.checked_sub(rhs.wasm)))
    }
  
    clamped_sub(rhs: Value): Promise<Value> {
      return Promise.resolve(new Value(this.wasm.clamped_sub(rhs.wasm)))
    }
  
    compare(rhs: Value): Promise<number> {
      return Promise.resolve(this.wasm.compare(rhs.wasm))
    }
  
    static new(coin: BigNum): Promise<Value> {
      return Promise.resolve(new Value(WasmV4.Value.new(coin.wasm)))
    }
  }
  
  export class Address
    extends Ptr<WasmV4.Address>
    implements WasmContract.Address {
  
    to_bytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }
  
    to_bech32(prefix?: string): Promise<string> {
      return Promise.resolve(this.wasm.to_bech32(prefix))
    }
  
    network_id(): Promise<number> {
      return Promise.resolve(this.wasm.network_id())
    }
  
    static from_bytes(bytes: Uint8Array): Promise<Address> {
      return Promise.resolve(new Address(WasmV4.Address.from_bytes(bytes)))
    }
  
    static from_bech32(string: string) : Promise<Address> {
      return Promise.resolve(new Address(WasmV4.Address.from_bech32(string)))
    }
  }
  
  export class PublicKey
    extends Ptr<WasmV4.PublicKey>
    implements WasmContract.PublicKey {
  
    to_bech32(): Promise<string> {
      return Promise.resolve(this.wasm.to_bech32())
    }
  
    as_bytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.as_bytes())
    }
  
    hash(): Promise<Ed25519KeyHash> {
      return Promise.resolve(new Ed25519KeyHash(this.wasm.hash()))
    }
  
    static from_bech32(bech32_str: string): Promise<PublicKey> {
      return Promise.resolve(new PublicKey(WasmV4.PublicKey.from_bech32(bech32_str)))
    }
  
    static from_bytes(bytes: Uint8Array): Promise<PublicKey> {
      return Promise.resolve(new PublicKey(WasmV4.PublicKey.from_bytes(bytes)))
    }
  }
  
  export class Bip32PublicKey
    extends Ptr<WasmV4.Bip32PublicKey>
    implements WasmContract.Bip32PublicKey {
  
    derive(index: number): Promise<Bip32PublicKey> {
      return Promise.resolve(new Bip32PublicKey(this.wasm.derive(index)))
    }
  
    to_raw_key(): Promise<PublicKey> {
      return Promise.resolve(new PublicKey(this.wasm.to_raw_key()))
    }
  
    as_bytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.as_bytes())
    }
  
    to_bech32(): Promise<string> {
      return Promise.resolve(this.wasm.to_bech32())
    }
  
    chaincode(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.chaincode())
    }
  
    static from_bech32(bech32_str: string): Promise<Bip32PublicKey> {
      return Promise.resolve(new Bip32PublicKey(WasmV4.Bip32PublicKey.from_bech32(bech32_str)))
    }
  
    static from_bytes(bytes: Uint8Array): Promise<Bip32PublicKey> {
      return Promise.resolve(new Bip32PublicKey(WasmV4.Bip32PublicKey.from_bytes(bytes)))
    }
  }
  
  export class ByronAddress
    extends Ptr<WasmV4.ByronAddress>
    implements WasmContract.ByronAddress {
  
    to_base58(): Promise<string> {
      return Promise.resolve(this.wasm.to_base58())
    }
  
    to_address(): Promise<Address> {
      return Promise.resolve(new Address(this.wasm.to_address()))
    }
  
    byron_protocol_magic(): Promise<number> {
      return Promise.resolve(this.wasm.byron_protocol_magic())
    }
  
    attributes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.attributes())
    }
  
    icarus_from_key(key: Bip32PublicKey, protocolMagic: number): Promise<ByronAddress> {
      throw WasmContract.EXCEPTIONS.NOT_IMPLEMENTED
    }
  
    static from_base58(string: string): Promise<ByronAddress> {
      return Promise.resolve(new ByronAddress(WasmV4.ByronAddress.from_base58(string)))
    }
  
    static is_valid(string: string): Promise<boolean> {
      return Promise.resolve(WasmV4.ByronAddress.is_valid(string))
    }
  
    static from_address(addr: Address): Promise<ByronAddress | undefined> {
      return Promise.resolve(new ByronAddress(WasmV4.ByronAddress.from_address(addr.wasm)))
    }
  }
  
  export class TransactionOutput
    extends Ptr<WasmV4.TransactionOutput>
    implements WasmContract.TransactionOutput {
  
    to_bytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }
  
    address(): Promise<Address> {
      return Promise.resolve(new Address(this.wasm.address()))
    }
  
    amount(): Promise<Value> {
      return Promise.resolve(new Value(this.wasm.amount()))
    }
  
    static from_bytes(bytes: Uint8Array): Promise<TransactionOutput> {
      return Promise.resolve(new TransactionOutput(WasmV4.TransactionOutput.from_bytes(bytes)))
    }
  
    static new(address: Address, amount: Value): Promise<TransactionOutput> {
      return Promise.resolve(new TransactionOutput(WasmV4.TransactionOutput.new(address.wasm, amount.wasm)))
    }
  }
  
  export class StakeCredential
    extends Ptr<WasmV4.StakeCredential>
    implements WasmContract.StakeCredential {
  
    to_bytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }
  
    to_keyhash(): Promise<Ed25519KeyHash | undefined> {
      return Promise.resolve(new Ed25519KeyHash(this.wasm.to_keyhash()))
    }
  
    to_scripthash(): Promise<ScriptHash | undefined> {
      return Promise.resolve(new ScriptHash(this.wasm.to_scripthash()))
    }
  
    kind(): Promise<number> {
      return Promise.resolve(this.wasm.kind())
    }
  
    static from_bytes(bytes: Uint8Array): Promise<StakeCredential> {
      return Promise.resolve(new StakeCredential(WasmV4.StakeCredential.from_bytes(bytes)))
    }
  
    static from_keyhash(hash: Ed25519KeyHash): Promise<StakeCredential> {
      return Promise.resolve(new StakeCredential(WasmV4.StakeCredential.from_keyhash(hash.wasm)))
    }
  
    static from_scripthash(hash: ScriptHash): Promise<StakeCredential> {
      return Promise.resolve(new StakeCredential(WasmV4.StakeCredential.from_scripthash(hash.wasm)))
    }
  }
  
  export class StakeRegistration
    extends Ptr<WasmV4.StakeRegistration>
    implements WasmContract.StakeRegistration {
  
    to_bytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }
  
    stake_credential(): Promise<StakeCredential> {
      return Promise.resolve(new StakeCredential(this.wasm.stake_credential()))
    }
  
    static new(stakeCredential: StakeCredential): Promise<StakeRegistration> {
      return Promise.resolve(new StakeRegistration(WasmV4.StakeRegistration.new(stakeCredential.wasm)))
    }
  
    static from_bytes(bytes: Uint8Array): Promise<StakeRegistration> {
      return Promise.resolve(new StakeRegistration(WasmV4.StakeRegistration.from_bytes(bytes)))
    }
  }
  
  export class StakeDeregistration
    extends Ptr<WasmV4.StakeDeregistration>
    implements WasmContract.StakeDeregistration {
  
    to_bytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }
  
    stake_credential(): Promise<StakeCredential> {
      return Promise.resolve(new StakeCredential(this.wasm.stake_credential()))
    }
  
    static new(stakeCredential: StakeCredential): Promise<StakeDeregistration> {
      return Promise.resolve(new StakeDeregistration(WasmV4.StakeDeregistration.new(stakeCredential.wasm)))
    }
  
    static from_bytes(bytes: Uint8Array): Promise<StakeDeregistration> {
      return Promise.resolve(new StakeDeregistration(WasmV4.StakeDeregistration.from_bytes(bytes)))
    }
  }
  
  export class StakeDelegation
    extends Ptr<WasmV4.StakeDelegation>
    implements WasmContract.StakeDelegation {
  
    to_bytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }
  
    stake_credential(): Promise<StakeCredential> {
      return Promise.resolve(new StakeCredential(this.wasm.stake_credential()))
    }
  
    pool_keyhash(): Promise<Ed25519KeyHash> {
      return Promise.resolve(new Ed25519KeyHash(this.wasm.pool_keyhash()))
    }
  
    static new(
      stakeCredential: StakeCredential,
      poolKeyHash: Ed25519KeyHash,
    ): Promise<StakeDelegation> {
      return Promise.resolve(new StakeDelegation(WasmV4.StakeDelegation.new(stakeCredential.wasm, poolKeyHash.wasm)))
    }
  
    static from_bytes(bytes: Uint8Array): Promise<StakeDelegation> {
      return Promise.resolve(new StakeDelegation(WasmV4.StakeDelegation.from_bytes(bytes)))
    }
  }
  
  export class Certificate
    extends Ptr<WasmV4.Certificate>
    implements WasmContract.Certificate {
  
    to_bytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }
  
    as_stake_registration(): Promise<StakeRegistration | undefined> {
      return Promise.resolve(new StakeRegistration(this.wasm.as_stake_registration()))
    }
  
    as_stake_deregistration(): Promise<StakeDeregistration | undefined> {
      return Promise.resolve(new StakeDeregistration(this.wasm.as_stake_deregistration()))
    }
  
    as_stake_delegation(): Promise<StakeDelegation | undefined> {
      return Promise.resolve(new StakeDelegation(this.wasm.as_stake_delegation()))
    }
  
    static from_bytes(bytes: Uint8Array): Promise<Certificate> {
      return Promise.resolve(new Certificate(WasmV4.Certificate.from_bytes(bytes)))
    }
  
    static new_stake_registration(stakeRegistration: StakeRegistration): Promise<Certificate> {
      return Promise.resolve(new Certificate(WasmV4.Certificate.new_stake_registration(stakeRegistration.wasm)))
    }
  
    static new_stake_deregistration(stakeDeregistration: StakeDeregistration): Promise<Certificate> {
      return Promise.resolve(new Certificate(WasmV4.Certificate.new_stake_deregistration(stakeDeregistration.wasm)))
    }
  
    static new_stake_delegation(stakeDelegation: StakeDelegation): Promise<Certificate> {
      return Promise.resolve(new Certificate(WasmV4.Certificate.new_stake_delegation(stakeDelegation.wasm)))
    }
  }
  
  export class Certificates
    extends Ptr<WasmV4.Certificates>
    implements WasmContract.Certificates {
  
    to_bytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }
  
    len(): Promise<number> {
      return Promise.resolve(this.wasm.len())
    }
  
    get(index: number): Promise<Certificate> {
      return Promise.resolve(new Certificate(this.wasm.get(index)))
    }
  
    add(item: Certificate): Promise<void> {
      return Promise.resolve(this.wasm.add(item.wasm))
    }
  
    static from_bytes(bytes: Uint8Array): Promise<Certificates> {
      return Promise.resolve(new Certificates(WasmV4.Certificates.from_bytes(bytes)))
    }
  
    static new(): Promise<Certificates> {
      return Promise.resolve(new Certificates(WasmV4.Certificates.new()))
    }
  }
  
  export class RewardAddress
    extends Ptr<WasmV4.RewardAddress>
    implements WasmContract.RewardAddress {
  
    payment_cred(): Promise<StakeCredential> {
      return Promise.resolve(new StakeCredential(this.wasm.payment_cred()))
    }
  
    to_address(): Promise<Address> {
      return Promise.resolve(new Address(this.wasm.to_address()))
    }
  
    static from_address(addr: Address): Promise<RewardAddress | undefined> {
      return Promise.resolve(new RewardAddress(WasmV4.RewardAddress.from_address(addr.wasm)))
    }
  
    static new(network: number, payment: StakeCredential): Promise<RewardAddress> {
      return Promise.resolve(new RewardAddress(WasmV4.RewardAddress.new(network, payment.wasm)))
    }
  }
  
  export class RewardAddresses
    extends Ptr<WasmV4.RewardAddresses>
    implements WasmContract.RewardAddresses {
  
    len(): Promise<number> {
      return Promise.resolve(this.wasm.len())
    }
  
    get(index: number): Promise<RewardAddress> {
      return Promise.resolve(new RewardAddress(this.wasm.get(index)))
    }
  
    add(item: RewardAddress): Promise<void> {
      return Promise.resolve(this.wasm.add(item.wasm))
    }
  
    static new(): Promise<RewardAddresses> {
      return Promise.resolve(new RewardAddresses(WasmV4.RewardAddresses.new()))
    }
  }
  
  export class Withdrawals
    extends Ptr<WasmV4.Withdrawals>
    implements WasmContract.Withdrawals {
  
    len(): Promise<number> {
      return Promise.resolve(this.wasm.len()) 
    }
  
    insert(key: RewardAddress, value: BigNum): Promise<BigNum> {
      return Promise.resolve(new BigNum(this.wasm.insert(key.wasm, value.wasm)))
    }
  
    get(key: RewardAddress): Promise<BigNum | undefined> {
      return Promise.resolve(new BigNum(this.wasm.get(key.wasm)))
    }
  
    keys(): Promise<RewardAddresses> {
      return Promise.resolve(new RewardAddresses(this.wasm.keys()))
    }
  
    static new(): Promise<Withdrawals> {
      return Promise.resolve(new Withdrawals(WasmV4.Withdrawals.new()))
    }
  }
  
  export class TransactionInputs
    extends Ptr<WasmV4.TransactionInputs>
    implements WasmContract.TransactionInputs {
  
    len(): Promise<number> {
      return Promise.resolve(this.wasm.len())
    }
    
    get(index: number): Promise<TransactionInput> {
      return Promise.resolve(new TransactionInput(this.wasm.get(index)))
    }
  }
  
  export class TransactionOutputs
    extends Ptr<WasmV4.TransactionOutputs>
    implements WasmContract.TransactionOutputs {
  
    len(): Promise<number> {
      return Promise.resolve(this.wasm.len())
    }
  
    get(index: number): Promise<TransactionOutput> {
      return Promise.resolve(new TransactionOutput(this.wasm.get(index)))
    }
  }
  
  export type Optional<T> = T | undefined;
  
  export class TransactionBody
    extends Ptr<WasmV4.TransactionBody>
    implements WasmContract.TransactionBody {
  
    to_bytes(): Promise<Uint8Array> {
      return Promise.resolve(this.wasm.to_bytes())
    }
  
    inputs(): Promise<TransactionInputs> {
      return Promise.resolve(new TransactionInputs(this.wasm.inputs()))
    }
  
    outputs(): Promise<TransactionOutputs> {
      return Promise.resolve(new TransactionOutputs(this.wasm.outputs()))
    }
  
    fee(): Promise<BigNum> {
      return Promise.resolve(new BigNum(this.wasm.fee()))
    }
  
    ttl(): Promise<Optional<number>> {
      return Promise.resolve(this.wasm.ttl())
    }
  
    certs(): Promise<Certificates> {
      return Promise.resolve(new Certificates(this.wasm.certs()))
    }
  
    withdrawals(): Promise<Withdrawals> {
      return Promise.resolve(new Withdrawals(this.wasm.withdrawals()))
    }
  
    static from_bytes(bytes: Uint8Array): Promise<TransactionBody> {
      return Promise.resolve(new TransactionBody(WasmV4.TransactionBody.from_bytes(bytes)))
    }
  }
  
  export class TransactionBuilder
    extends Ptr<WasmV4.TransactionBuilder>
    implements WasmContract.TransactionBuilder {
  
    add_key_input(
      hash: Ed25519KeyHash,
      input: TransactionInput,
      amount: Value,
    ): Promise<void> {
      return Promise.resolve(this.wasm.add_key_input(hash.wasm, input.wasm, amount.wasm))
    }
  
    add_bootstrap_input(
      hash: ByronAddress,
      input: TransactionInput,
      amount: Value,
    ): Promise<void> {
      return Promise.resolve(this.wasm.add_bootstrap_input(hash.wasm, input.wasm, amount.wasm))
    }
  
    add_input(
      address: Address,
      input: TransactionInput,
      amount: Value,
    ): Promise<void> {
      return Promise.resolve(this.wasm.add_input(address.wasm, input.wasm, amount.wasm))
    }
  
    fee_for_input(
      address: Address,
      input: TransactionInput,
      amount: Value,
    ): Promise<BigNum> {
      return Promise.resolve(new BigNum(this.wasm.fee_for_input(address.wasm, input.wasm, amount.wasm)))
    }
  
    add_output(output: TransactionOutput): Promise<void> {
      return Promise.resolve(this.wasm.add_output(output.wasm))
    }
  
    fee_for_output(output: TransactionOutput): Promise<BigNum> {
      return Promise.resolve(new BigNum(this.wasm.fee_for_output(output.wasm)))
    }
  
    set_fee(fee: BigNum): Promise<void> {
      return Promise.resolve(this.wasm.set_fee(fee.wasm))
    }
  
    set_ttl(ttl: number): Promise<void> {
      return Promise.resolve(this.wasm.set_ttl(ttl))
    }
  
    set_validity_start_interval(
      validityStartInterval: number,
    ): Promise<void> {
      return Promise.resolve(this.wasm.set_validity_start_interval(validityStartInterval))
    }
  
    set_certs(certs: Certificates): Promise<void> {
      return Promise.resolve(this.wasm.set_certs(certs.wasm))
    }
  
    set_withdrawals(withdrawals: Withdrawals): Promise<void> {
      return Promise.resolve(this.wasm.set_withdrawals(withdrawals.wasm))
    }
  
    set_auxiliary_data(auxiliary: AuxiliaryData): Promise<void> {
      return Promise.resolve(this.wasm.set_auxiliary_data(auxiliary.wasm))
    }
  
    get_explicit_input(): Promise<Value> {
      return Promise.resolve(new Value(this.wasm.get_explicit_input()))
    }
  
    get_implicit_input(): Promise<Value> {
      return Promise.resolve(new Value(this.wasm.get_implicit_input()))
    }
  
    get_explicit_output(): Promise<Value> {
      return Promise.resolve(new Value(this.wasm.get_explicit_output()))
    }
  
    get_deposit(): Promise<BigNum> {
      return Promise.resolve(new BigNum(this.wasm.get_deposit()))
    }
  
    get_fee_if_set(): Promise<BigNum> {
      return Promise.resolve(new BigNum(this.wasm.get_fee_if_set()))
    }
  
    add_change_if_needed(address: Address): Promise<boolean> {
      return Promise.resolve(this.wasm.add_change_if_needed(address.wasm))
    }
  
    build(): Promise<TransactionBody> {
      return Promise.resolve(new TransactionBody(this.wasm.build()))
    }
  
    min_fee(): Promise<BigNum> {
      return Promise.resolve(new BigNum(this.wasm.min_fee()))
    }
  
    static new(
      linearFee: LinearFee,
      minimumUtxoVal: BigNum,
      poolDeposit: BigNum,
      keyDeposit: BigNum,
    ): Promise<TransactionBuilder> {
      return Promise.resolve(new TransactionBuilder(WasmV4.TransactionBuilder.new(
        linearFee.wasm,
        minimumUtxoVal.wasm,
        poolDeposit.wasm,
        keyDeposit.wasm
      )))
    }
  }  
}

