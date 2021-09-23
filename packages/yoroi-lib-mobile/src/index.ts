import * as WasmV4 from '@emurgo/react-native-haskell-shelley'
import * as WasmContract from '../../yoroi-lib-core/src/wasm-contract'

import { createYoroiLib, YoroiLib } from '../../yoroi-lib-core/src'

export const init = (): YoroiLib => {
  return createYoroiLib({
    encrypt_with_password: WasmV4.encrypt_with_password,
    decrypt_with_password: WasmV4.decrypt_with_password,
    encode_json_str_to_metadatum: async (json: string, schema: number) => {
      const wasm = await WasmV4.encode_json_str_to_metadatum(json, schema)
      return Promise.resolve(new Mobile.TransactionMetadatum(wasm))
    },
    BigNum: Mobile.BigNum,
    LinearFee: Mobile.LinearFee,
    GeneralTransactionMetadata: Mobile.GeneralTransactionMetadata,
    TransactionMetadatum: Mobile.TransactionMetadatum,
    AuxiliaryData: Mobile.AuxiliaryData,
    AssetName: Mobile.AssetName,
    AssetNames: Mobile.AssetNames,
    Assets: Mobile.Assets,
    ScriptHash: Mobile.ScriptHash,
    ScriptHashes: Mobile.ScriptHashes,
    MultiAsset: Mobile.MultiAsset,
    Ed25519KeyHash: Mobile.Ed25519KeyHash,
    TransactionHash: Mobile.TransactionHash,
    TransactionInput: Mobile.TransactionInput,
    Value: Mobile.Value,
    Address: Mobile.Address,
    PublicKey: Mobile.PublicKey,
    Bip32PublicKey: Mobile.Bip32PublicKey,
    ByronAddress: Mobile.ByronAddress,
    TransactionOutput: Mobile.TransactionOutput,
    StakeCredential: Mobile.StakeCredential,
    StakeRegistration: Mobile.StakeRegistration,
    StakeDeregistration: Mobile.StakeDeregistration,
    StakeDelegation: Mobile.StakeDelegation,
    Certificate: Mobile.Certificate,
    Certificates: Mobile.Certificates,
    RewardAddress: Mobile.RewardAddress,
    RewardAddresses: Mobile.RewardAddresses,
    Withdrawals: Mobile.Withdrawals,
    TransactionInputs: Mobile.TransactionInputs,
    TransactionOutputs: Mobile.TransactionOutputs,
    TransactionBody: Mobile.TransactionBody,
    TransactionBuilder: Mobile.TransactionBuilder
  });
}

namespace Mobile {
  abstract class WasmProxy<T> {
    private _wasm: T
  
    get wasm(): T {
      return this._wasm
    }
  
    constructor(wasm: T) {
      this._wasm = wasm
    }
  }
  
  abstract class Ptr<T extends WasmV4.Ptr> extends WasmProxy<T> {
    constructor(wasm: T) {
      super(wasm)
    }
  
    async free(): Promise<void> {
      return await this.wasm.free()
    }
  }
  
  export class BigNum extends Ptr<WasmV4.BigNum> implements WasmContract.BigNum {
    to_bytes(): Promise<Uint8Array> {
      throw WasmContract.EXCEPTIONS.NOT_IMPLEMENTED
    }
    to_str(): Promise<string> {
      return this.wasm.to_str()
    }
    checked_mul(other: BigNum): Promise<BigNum> {
      throw WasmContract.EXCEPTIONS.NOT_IMPLEMENTED
    }
    async checked_add(other: BigNum): Promise<BigNum> {
      const wasmBigNum = await this.wasm.checked_add(other.wasm)
      return new BigNum(wasmBigNum)
    }
    async checked_sub(other: BigNum): Promise<BigNum> {
      const wasmBigNum = await this.wasm.checked_sub(other.wasm)
      return new BigNum(wasmBigNum)
    }
    async clamped_sub(other: BigNum): Promise<BigNum> {
      const wasmBigNum = await this.wasm.clamped_sub(other.wasm)
      return new BigNum(wasmBigNum)
    }
    compare(rhs_value: BigNum): Promise<number> {
      return this.wasm.compare(rhs_value.wasm)
    }
    
    static from_bytes(bytes: Uint8Array): Promise<BigNum> {
      throw WasmContract.EXCEPTIONS.NOT_IMPLEMENTED
    }
  
    static async from_str(string: string): Promise<BigNum> {
      const wasmBigNum = await WasmV4.BigNum.from_str(string)
      return new BigNum(wasmBigNum)
    }
  }
  
  export class LinearFee extends Ptr<WasmV4.LinearFee> implements WasmContract.LinearFee {
    async constant(): Promise<BigNum> {
      const constant = await this.wasm.constant()
      return new BigNum(constant)
    }
    async coefficient(): Promise<BigNum> {
      const coefficient = await this.wasm.coefficient()
      return new BigNum(coefficient)
    }
    static async new(coefficient: BigNum, constant: BigNum): Promise<LinearFee> {
      const wasmLinearFee = await WasmV4.LinearFee.new(coefficient.wasm, constant.wasm)
      return Promise.resolve(new LinearFee(wasmLinearFee))
    }
  }
  
  export class GeneralTransactionMetadata
    extends Ptr<WasmV4.GeneralTransactionMetadata>
    implements WasmContract.GeneralTransactionMetadata {
  
    async insert(key: BigNum, value: TransactionMetadatum): Promise<TransactionMetadatum | undefined> {
      const wasm = await this.wasm.insert(key.wasm, value.wasm)
      if (wasm) {
        return new TransactionMetadatum(wasm)
      }
    }
  
    async get(key: BigNum): Promise<TransactionMetadatum | undefined> {
      const wasm = await this.wasm.get(key.wasm)
      if (!wasm) return undefined
      return new TransactionMetadatum(wasm)
    }
  
    static async new(): Promise<GeneralTransactionMetadata> {
      const wasm = await WasmV4.GeneralTransactionMetadata.new()
      return new GeneralTransactionMetadata(wasm)
    }
  }
  
  export class TransactionMetadatum
    extends Ptr<WasmV4.TransactionMetadatum>
    implements WasmContract.TransactionMetadatum {
  
    to_bytes(): Promise<Uint8Array> {
      return this.wasm.to_bytes()
    }
  }
  
  export class AuxiliaryData
    extends Ptr<WasmV4.AuxiliaryData>
    implements WasmContract.AuxiliaryData {
  
    async metadata(): Promise<GeneralTransactionMetadata> {
      const wasm = await this.wasm.metadata()
      return new GeneralTransactionMetadata(wasm)
    }
  
    static async new(metadata: GeneralTransactionMetadata): Promise<AuxiliaryData> {
      const wasm = await WasmV4.AuxiliaryData.new(metadata.wasm)
      return Promise.resolve(new AuxiliaryData(wasm))
    }
  }
  
  export class AssetName
    extends Ptr<WasmV4.AssetName>
    implements WasmContract.AssetName {
  
    async to_bytes(): Promise<Uint8Array> {
      return await this.wasm.to_bytes()
    }
  
    async name(): Promise<Uint8Array> {
      return await this.wasm.name()
    }
  
    static async from_bytes(bytes: Uint8Array): Promise<AssetName> {
      return new AssetName(await WasmV4.AssetName.from_bytes(bytes))
    }
  
    static async new(name: Uint8Array): Promise<AssetName> {
     return new AssetName(await WasmV4.AssetName.new(name))
    }
  }
  
  export class AssetNames
    extends Ptr<WasmV4.AssetNames>
    implements WasmContract.AssetNames {
  
    async len(): Promise<number> {
      return await this.wasm.len()
    }
  
    async get(index: number): Promise<AssetName> {
      return new AssetName(await this.wasm.get(index))
    }
  
    async add(item: AssetName): Promise<void> {
      await this.wasm.add(item.wasm)
    }
  
    static async new(): Promise<AssetNames> {
      return new AssetNames(await WasmV4.AssetNames.new())
    }
  }
  
  export class Assets
    extends Ptr<WasmV4.Assets>
    implements WasmContract.Assets {
  
    async len(): Promise<number> {
      return await this.wasm.len()
    }
  
    async insert(key: AssetName, value: BigNum): Promise<BigNum> {
      return new BigNum(await this.wasm.insert(key.wasm, value.wasm))
    }
  
    async get(key: AssetName): Promise<BigNum | undefined> {
      return new BigNum(await this.wasm.get(key.wasm))
    }
  
    async keys(): Promise<AssetNames> {
      return new AssetNames(await this.wasm.keys())
    }
  
    static async new(): Promise<Assets> {
      return new Assets(await WasmV4.Assets.new())
    }
  }
  
  export class ScriptHash
    extends WasmProxy<WasmV4.ScriptHash>
    implements WasmContract.ScriptHash {
  
    async to_bytes(): Promise<Uint8Array> {
      return await this.wasm.to_bytes()
    }
  
    static async from_bytes(bytes: Uint8Array): Promise<ScriptHash> {
      return new ScriptHash(await WasmV4.ScriptHash.from_bytes(bytes))
    }
  }
  
  export class ScriptHashes
    extends WasmProxy<WasmV4.ScriptHashes>
    implements WasmContract.ScriptHashes {
  
    async to_bytes(): Promise<Uint8Array> {
      return await this.wasm.to_bytes()
    }
  
    async len(): Promise<number> {
      return await this.wasm.len()
    }
  
    async get(index: number): Promise<ScriptHash> {
      return new ScriptHash(await this.wasm.get(index))
    }
  
    async add(item: ScriptHash): Promise<void> {
      await this.wasm.add(item.wasm)
    }
  
    static async from_bytes(bytes: Uint8Array): Promise<ScriptHashes> {
      return new ScriptHashes(await WasmV4.ScriptHashes.from_bytes(bytes))
    }
  
    static async new(): Promise<ScriptHashes> {
      return new ScriptHashes(await WasmV4.ScriptHashes.new())
    }
  }
  
  type PolicyID = ScriptHash
  
  type PolicyIDs = ScriptHashes
  
  export class MultiAsset
    extends Ptr<WasmV4.MultiAsset>
    implements WasmContract.MultiAsset {
  
    async len(): Promise<number> {
      return await this.wasm.len()
    }
  
    async insert(key: PolicyID, value: Assets): Promise<Assets> {
      return new Assets(await this.wasm.insert(key.wasm, value.wasm))
    }
  
    async get(key: PolicyID): Promise<Assets | undefined> {
      return new Assets(await this.wasm.get(key.wasm))
    }
  
    async keys(): Promise<PolicyIDs> {
      return new ScriptHashes(await this.wasm.keys())
    }
  
    async sub(rhs: MultiAsset): Promise<MultiAsset> {
      return new MultiAsset(await this.wasm.sub(rhs.wasm))
    }
  
    static async new(): Promise<MultiAsset> {
      return new MultiAsset(await WasmV4.MultiAsset.new())
    }
  }
  
  export class Ed25519KeyHash
    extends Ptr<WasmV4.Ed25519KeyHash>
    implements WasmContract.Ed25519KeyHash {
  
    async to_bytes(): Promise<Uint8Array> {
      return await this.wasm.to_bytes()
    }
  
    static async from_bytes(bytes: Uint8Array): Promise<Ed25519KeyHash> {
      return new Ed25519KeyHash(await WasmV4.Ed25519KeyHash.from_bytes(bytes))
    }
  }
  
  export class TransactionHash
    extends Ptr<WasmV4.TransactionHash>
    implements WasmContract.TransactionHash {
  
    async to_bytes(): Promise<Uint8Array> {
      return await this.wasm.to_bytes()
    }
  
    static async from_bytes(bytes: Uint8Array): Promise<TransactionHash> {
      return new TransactionHash(await WasmV4.TransactionHash.from_bytes(bytes))
    }
  }
  
  export class TransactionInput
    extends Ptr<WasmV4.TransactionInput>
    implements WasmContract.TransactionInput {
  
    async to_bytes(): Promise<Uint8Array> {
      return this.wasm.to_bytes()
    }
  
    async transaction_id(): Promise<TransactionHash> {
      return new TransactionHash(await this.wasm.transaction_id())
    }
  
    async index(): Promise<number> {
      return await this.wasm.index()
    }
  
    static async new(transactionId: TransactionHash, index: number): Promise<TransactionInput> {
      return new TransactionInput(await WasmV4.TransactionInput.new(transactionId.wasm, index))
    }
  
    static async from_bytes(bytes: Uint8Array): Promise<TransactionInput> {
      return new TransactionInput(await WasmV4.TransactionInput.from_bytes(bytes))
    }
  }
  
  export class Value
    extends Ptr<WasmV4.Value>
    implements WasmContract.Value {
  
    async coin(): Promise<BigNum> {
      return new BigNum(await this.wasm.coin())
    }
  
    async set_coin(coin: BigNum): Promise<void> {
      return await this.wasm.set_coin(coin.wasm)
    }
  
    async multiasset(): Promise<MultiAsset | undefined> {
      return new MultiAsset(await this.wasm.multiasset())
    }
  
    async set_multiasset(multiasset: MultiAsset): Promise<void> {
      return await this.wasm.set_multiasset(multiasset.wasm)
    }
  
    async checked_add(rhs: Value): Promise<Value> {
      return new Value(await this.wasm.checked_add(rhs.wasm))
    }
  
    async checked_sub(rhs: Value): Promise<Value> {
      return new Value(await this.wasm.checked_sub(rhs.wasm))
    }
  
    async clamped_sub(rhs: Value): Promise<Value> {
      return new Value(await this.wasm.clamped_sub(rhs.wasm))
    }
  
    async compare(rhs: Value): Promise<number> {
      return await this.wasm.compare(rhs.wasm)
    }
  
    static async new(coin: BigNum): Promise<Value> {
      return new Value(await WasmV4.Value.new(coin.wasm))
    }
  }
  
  export class Address
    extends Ptr<WasmV4.Address>
    implements WasmContract.Address {
  
    async to_bytes(): Promise<Uint8Array> {
      return await this.wasm.to_bytes()
    }
  
    async to_bech32(prefix?: string): Promise<string> {
      return await this.wasm.to_bech32(prefix)
    }
  
    async network_id(): Promise<number> {
      return await this.wasm.network_id()
    }
  
    static async from_bytes(bytes: Uint8Array): Promise<Address> {
      return new Address(await WasmV4.Address.from_bytes(bytes))
    }
  
    static async from_bech32(string: string) : Promise<Address> {
      return new Address(await WasmV4.Address.from_bech32(string))
    }
  }
  
  export class PublicKey
    extends Ptr<WasmV4.PublicKey>
    implements WasmContract.PublicKey {
  
    async to_bech32(): Promise<string> {
      return await this.wasm.to_bech32()
    }
  
    async as_bytes(): Promise<Uint8Array> {
      return await this.wasm.as_bytes()
    }
  
    async hash(): Promise<Ed25519KeyHash> {
      return new Ed25519KeyHash(await this.wasm.hash())
    }
  
    static async from_bech32(bech32_str: string): Promise<PublicKey> {
      return new PublicKey(await WasmV4.PublicKey.from_bech32(bech32_str))
    }
  
    static async from_bytes(bytes: Uint8Array): Promise<PublicKey> {
      return new PublicKey(await WasmV4.PublicKey.from_bytes(bytes))
    }
  }
  
  export class Bip32PublicKey
    extends Ptr<WasmV4.Bip32PublicKey>
    implements WasmContract.Bip32PublicKey {
  
    async derive(index: number): Promise<Bip32PublicKey> {
      return new Bip32PublicKey(await this.wasm.derive(index))
    }
  
    async to_raw_key(): Promise<PublicKey> {
      return new PublicKey(await this.wasm.to_raw_key())
    }
  
    async as_bytes(): Promise<Uint8Array> {
      return await this.wasm.as_bytes()
    }
  
    async to_bech32(): Promise<string> {
      return await this.wasm.to_bech32()
    }
  
    async chaincode(): Promise<Uint8Array> {
      return await this.wasm.chaincode()
    }
  
    static async from_bech32(bech32_str: string): Promise<Bip32PublicKey> {
      return new Bip32PublicKey(await WasmV4.Bip32PublicKey.from_bech32(bech32_str))
    }
  
    static async from_bytes(bytes: Uint8Array): Promise<Bip32PublicKey> {
      return new Bip32PublicKey(await WasmV4.Bip32PublicKey.from_bytes(bytes))
    }
  }
  
  export class ByronAddress
    extends Ptr<WasmV4.ByronAddress>
    implements WasmContract.ByronAddress {
  
    async to_base58(): Promise<string> {
      return await this.wasm.to_base58()
    }
  
    async to_address(): Promise<Address> {
      return new Address(await this.wasm.to_address())
    }
  
    async byron_protocol_magic(): Promise<number> {
      return await this.wasm.byron_protocol_magic()
    }
  
    async attributes(): Promise<Uint8Array> {
      return await this.wasm.attributes()
    }
  
    async icarus_from_key(key: Bip32PublicKey, protocolMagic: number): Promise<ByronAddress> {
      throw WasmContract.EXCEPTIONS.NOT_IMPLEMENTED
    }
  
    static async from_base58(string: string): Promise<ByronAddress> {
      return new ByronAddress(await WasmV4.ByronAddress.from_base58(string))
    }
  
    static async is_valid(string: string): Promise<boolean> {
      return await WasmV4.ByronAddress.is_valid(string)
    }
  
    static async from_address(addr: Address): Promise<ByronAddress | undefined> {
      return new ByronAddress(await WasmV4.ByronAddress.from_address(addr.wasm))
    }
  }
  
  export class TransactionOutput
    extends Ptr<WasmV4.TransactionOutput>
    implements WasmContract.TransactionOutput {
  
    async to_bytes(): Promise<Uint8Array> {
      return await this.wasm.to_bytes()
    }
  
    async address(): Promise<Address> {
      return new Address(await this.wasm.address())
    }
  
    async amount(): Promise<Value> {
      return new Value(await this.wasm.amount())
    }
  
    static async from_bytes(bytes: Uint8Array): Promise<TransactionOutput> {
      return new TransactionOutput(await WasmV4.TransactionOutput.from_bytes(bytes))
    }
  
    static async new(address: Address, amount: Value): Promise<TransactionOutput> {
      return new TransactionOutput(await WasmV4.TransactionOutput.new(address.wasm, amount.wasm))
    }
  }
  
  export class StakeCredential
    extends Ptr<WasmV4.StakeCredential>
    implements WasmContract.StakeCredential {
  
    async to_bytes(): Promise<Uint8Array> {
      return await this.wasm.to_bytes()
    }
  
    async to_keyhash(): Promise<Ed25519KeyHash | undefined> {
      return new Ed25519KeyHash(await this.wasm.to_keyhash())
    }
  
    async to_scripthash(): Promise<ScriptHash | undefined> {
      return new ScriptHash(await this.wasm.to_scripthash())
    }
  
    async kind(): Promise<number> {
      return await this.wasm.kind()
    }
  
    static async from_bytes(bytes: Uint8Array): Promise<StakeCredential> {
      return new StakeCredential(await WasmV4.StakeCredential.from_bytes(bytes))
    }
  
    static async from_keyhash(hash: Ed25519KeyHash): Promise<StakeCredential> {
      return new StakeCredential(await WasmV4.StakeCredential.from_keyhash(hash.wasm))
    }
  
    static async from_scripthash(hash: ScriptHash): Promise<StakeCredential> {
      return new StakeCredential(await WasmV4.StakeCredential.from_scripthash(hash.wasm))
    }
  }
  
  export class StakeRegistration
    extends Ptr<WasmV4.StakeRegistration>
    implements WasmContract.StakeRegistration {
  
    async to_bytes(): Promise<Uint8Array> {
      return await this.wasm.to_bytes()
    }
  
    async stake_credential(): Promise<StakeCredential> {
      return new StakeCredential(await this.wasm.stake_credential())
    }
  
    static async new(stakeCredential: StakeCredential): Promise<StakeRegistration> {
      return new StakeRegistration(await WasmV4.StakeRegistration.new(stakeCredential.wasm))
    }
  
    static async from_bytes(bytes: Uint8Array): Promise<StakeRegistration> {
      return new StakeRegistration(await WasmV4.StakeRegistration.from_bytes(bytes))
    }
  }
  
  export class StakeDeregistration
    extends Ptr<WasmV4.StakeDeregistration>
    implements WasmContract.StakeDeregistration {
  
    async to_bytes(): Promise<Uint8Array> {
      return await this.wasm.to_bytes()
    }
  
    async stake_credential(): Promise<StakeCredential> {
      return new StakeCredential(await this.wasm.stake_credential())
    }
  
    static async new(stakeCredential: StakeCredential): Promise<StakeDeregistration> {
      return new StakeDeregistration(await WasmV4.StakeDeregistration.new(stakeCredential.wasm))
    }
  
    static async from_bytes(bytes: Uint8Array): Promise<StakeDeregistration> {
      return new StakeDeregistration(await WasmV4.StakeDeregistration.from_bytes(bytes))
    }
  }
  
  export class StakeDelegation
    extends Ptr<WasmV4.StakeDelegation>
    implements WasmContract.StakeDelegation {
  
    async to_bytes(): Promise<Uint8Array> {
      return await this.wasm.to_bytes()
    }
  
    async stake_credential(): Promise<StakeCredential> {
      return new StakeCredential(await this.wasm.stake_credential())
    }
  
    async pool_keyhash(): Promise<Ed25519KeyHash> {
      return new Ed25519KeyHash(await this.wasm.pool_keyhash())
    }
  
    static async new(
      stakeCredential: StakeCredential,
      poolKeyHash: Ed25519KeyHash,
    ): Promise<StakeDelegation> {
      return new StakeDelegation(await WasmV4.StakeDelegation.new(stakeCredential.wasm, poolKeyHash.wasm))
    }
  
    static async from_bytes(bytes: Uint8Array): Promise<StakeDelegation> {
      return new StakeDelegation(await WasmV4.StakeDelegation.from_bytes(bytes))
    }
  }
  
  export class Certificate
    extends Ptr<WasmV4.Certificate>
    implements WasmContract.Certificate {
  
    async to_bytes(): Promise<Uint8Array> {
      return await this.wasm.to_bytes()
    }
  
    async as_stake_registration(): Promise<StakeRegistration | undefined> {
      return new StakeRegistration(await this.wasm.as_stake_registration())
    }
  
    async as_stake_deregistration(): Promise<StakeDeregistration | undefined> {
      return new StakeDeregistration(await this.wasm.as_stake_deregistration())
    }
  
    async as_stake_delegation(): Promise<StakeDelegation | undefined> {
      return new StakeDelegation(await this.wasm.as_stake_delegation())
    }
  
    static async from_bytes(bytes: Uint8Array): Promise<Certificate> {
      return new Certificate(await WasmV4.Certificate.from_bytes(bytes))
    }
  
    static async new_stake_registration(stakeRegistration: StakeRegistration): Promise<Certificate> {
      return new Certificate(await WasmV4.Certificate.new_stake_registration(stakeRegistration.wasm))
    }
  
    static async new_stake_deregistration(stakeDeregistration: StakeDeregistration): Promise<Certificate> {
      return new Certificate(await WasmV4.Certificate.new_stake_deregistration(stakeDeregistration.wasm))
    }
  
    static async new_stake_delegation(stakeDelegation: StakeDelegation): Promise<Certificate> {
      return new Certificate(await WasmV4.Certificate.new_stake_delegation(stakeDelegation.wasm))
    }
  }
  
  export class Certificates
    extends Ptr<WasmV4.Certificates>
    implements WasmContract.Certificates {
  
    async to_bytes(): Promise<Uint8Array> {
      return await this.wasm.to_bytes()
    }
  
    async len(): Promise<number> {
      return await this.wasm.len()
    }
  
    async get(index: number): Promise<Certificate> {
      return new Certificate(await this.wasm.get(index))
    }
  
    async add(item: Certificate): Promise<void> {
      return await this.wasm.add(item.wasm)
    }
  
    static async from_bytes(bytes: Uint8Array): Promise<Certificates> {
      return new Certificates(await WasmV4.Certificates.from_bytes(bytes))
    }
  
    static async new(): Promise<Certificates> {
      return new Certificates(await WasmV4.Certificates.new())
    }
  }
  
  export class RewardAddress
    extends Ptr<WasmV4.RewardAddress>
    implements WasmContract.RewardAddress {
  
    async payment_cred(): Promise<StakeCredential> {
      return new StakeCredential(await this.wasm.payment_cred())
    }
  
    async to_address(): Promise<Address> {
      return new Address(await this.wasm.to_address())
    }
  
    static async from_address(addr: Address): Promise<RewardAddress | undefined> {
      return new RewardAddress(await WasmV4.RewardAddress.from_address(addr.wasm))
    }
  
    static async new(network: number, payment: StakeCredential): Promise<RewardAddress> {
      return new RewardAddress(await WasmV4.RewardAddress.new(network, payment.wasm))
    }
  }
  
  export class RewardAddresses
    extends Ptr<WasmV4.RewardAddresses>
    implements WasmContract.RewardAddresses {
  
    async len(): Promise<number> {
      return await this.wasm.len()
    }
  
    async get(index: number): Promise<RewardAddress> {
      return new RewardAddress(await this.wasm.get(index))
    }
  
    async add(item: RewardAddress): Promise<void> {
      return await this.wasm.add(item.wasm)
    }
  
    static async new(): Promise<RewardAddresses> {
      return new RewardAddresses(await WasmV4.RewardAddresses.new())
    }
  }
  
  export class Withdrawals
    extends Ptr<WasmV4.Withdrawals>
    implements WasmContract.Withdrawals {
  
    async len(): Promise<number> {
      return await this.wasm.len()
    }
  
    async insert(key: RewardAddress, value: BigNum): Promise<BigNum> {
      return new BigNum(await this.wasm.insert(key.wasm, value.wasm))
    }
  
    async get(key: RewardAddress): Promise<BigNum | undefined> {
      return new BigNum(await this.wasm.get(key.wasm))
    }
  
    async keys(): Promise<RewardAddresses> {
      return new RewardAddresses(await this.wasm.keys())
    }
  
    static async new(): Promise<Withdrawals> {
      return new Withdrawals(await WasmV4.Withdrawals.new())
    }
  }
  
  export class TransactionInputs
    extends Ptr<WasmV4.TransactionInputs>
    implements WasmContract.TransactionInputs {
  
    async len(): Promise<number> {
      return await this.wasm.len()
    }
    
    async get(index: number): Promise<TransactionInput> {
      return new TransactionInput(await this.wasm.get(index))
    }
  }
  
  export class TransactionOutputs
    extends Ptr<WasmV4.TransactionOutputs>
    implements WasmContract.TransactionOutputs {
  
    async len(): Promise<number> {
      return await this.wasm.len()
    }
  
    async get(index: number): Promise<TransactionOutput> {
      return new TransactionOutput(await this.wasm.get(index))
    }
  }
  
  export type Optional<T> = T | undefined;
  
  export class TransactionBody
    extends Ptr<WasmV4.TransactionBody>
    implements WasmContract.TransactionBody {
  
    async to_bytes(): Promise<Uint8Array> {
      return await this.wasm.to_bytes()
    }
  
    async inputs(): Promise<TransactionInputs> {
      return new TransactionInputs(await this.wasm.inputs())
    }
  
    async outputs(): Promise<TransactionOutputs> {
      return new TransactionOutputs(await this.wasm.outputs())
    }
  
    async fee(): Promise<BigNum> {
      return new BigNum(await this.wasm.fee())
    }
  
    async ttl(): Promise<Optional<number>> {
      return await this.wasm.ttl()
    }
  
    async certs(): Promise<Certificates> {
      return Promise.resolve(new Certificates(await this.wasm.certs()))
    }
  
    async withdrawals(): Promise<Withdrawals> {
      return Promise.resolve(new Withdrawals(await this.wasm.withdrawals()))
    }
  
    static async from_bytes(bytes: Uint8Array): Promise<TransactionBody> {
      return Promise.resolve(new TransactionBody(await WasmV4.TransactionBody.from_bytes(bytes)))
    }
  }
  
  export class TransactionBuilder
    extends Ptr<WasmV4.TransactionBuilder>
    implements WasmContract.TransactionBuilder {
  
    async add_key_input(
      hash: Ed25519KeyHash,
      input: TransactionInput,
      amount: Value,
    ): Promise<void> {
      return await this.wasm.add_key_input(hash.wasm, input.wasm, amount.wasm)
    }
  
    async add_bootstrap_input(
      hash: ByronAddress,
      input: TransactionInput,
      amount: Value,
    ): Promise<void> {
      return await this.wasm.add_bootstrap_input(hash.wasm, input.wasm, amount.wasm)
    }
  
    async add_input(
      address: Address,
      input: TransactionInput,
      amount: Value,
    ): Promise<void> {
      return await this.wasm.add_input(address.wasm, input.wasm, amount.wasm)
    }
  
    async fee_for_input(
      address: Address,
      input: TransactionInput,
      amount: Value,
    ): Promise<BigNum> {
      return new BigNum(await this.wasm.fee_for_input(address.wasm, input.wasm, amount.wasm))
    }
  
    async add_output(output: TransactionOutput): Promise<void> {
      return await this.wasm.add_output(output.wasm)
    }
  
    async fee_for_output(output: TransactionOutput): Promise<BigNum> {
      return new BigNum(await this.wasm.fee_for_output(output.wasm))
    }
  
    async set_fee(fee: BigNum): Promise<void> {
      return await this.wasm.set_fee(fee.wasm)
    }
  
    async set_ttl(ttl: number): Promise<void> {
      return await this.wasm.set_ttl(ttl)
    }
  
    async set_validity_start_interval(
      validityStartInterval: number,
    ): Promise<void> {
      return await this.wasm.set_validity_start_interval(validityStartInterval)
    }
  
    async set_certs(certs: Certificates): Promise<void> {
      return await this.wasm.set_certs(certs.wasm)
    }
  
    async set_withdrawals(withdrawals: Withdrawals): Promise<void> {
      return await this.wasm.set_withdrawals(withdrawals.wasm)
    }
  
    async set_auxiliary_data(auxiliary: AuxiliaryData): Promise<void> {
      return await this.wasm.set_auxiliary_data(auxiliary.wasm)
    }
  
    async get_explicit_input(): Promise<Value> {
      return new Value(await this.wasm.get_explicit_input())
    }
  
    async get_implicit_input(): Promise<Value> {
      return new Value(await this.wasm.get_implicit_input())
    }
  
    async get_explicit_output(): Promise<Value> {
      return new Value(await this.wasm.get_explicit_output())
    }
  
    async get_deposit(): Promise<BigNum> {
      return new BigNum(await this.wasm.get_deposit())
    }
  
    async get_fee_if_set(): Promise<BigNum> {
      return new BigNum(await this.wasm.get_fee_if_set())
    }
  
    async add_change_if_needed(address: Address): Promise<boolean> {
      return await this.wasm.add_change_if_needed(address.wasm)
    }
  
    async build(): Promise<TransactionBody> {
      return new TransactionBody(await this.wasm.build())
    }
  
    async min_fee(): Promise<BigNum> {
      return new BigNum(await this.wasm.min_fee())
    }
  
    static async new(
      linearFee: LinearFee,
      minimumUtxoVal: BigNum,
      poolDeposit: BigNum,
      keyDeposit: BigNum,
    ): Promise<TransactionBuilder> {
      return new TransactionBuilder(await WasmV4.TransactionBuilder.new(
        linearFee.wasm,
        minimumUtxoVal.wasm,
        poolDeposit.wasm,
        keyDeposit.wasm
      ))
    }
  }
}
