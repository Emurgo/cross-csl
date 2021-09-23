import * as WasmV4 from '@emurgo/react-native-haskell-shelley'
import { Address, AssetName, AssetNames, Assets, AuxiliaryData, BigNum, Bip32PublicKey, ByronAddress, Certificate, Certificates, Ed25519KeyHash, EXCEPTIONS, GeneralTransactionMetadata, LinearFee, MultiAsset, PolicyID, PolicyIDs, PublicKey, RewardAddress, RewardAddresses, ScriptHash, ScriptHashes, StakeCredential, StakeDelegation, StakeDeregistration, StakeRegistration, TransactionBody, TransactionBuilder, TransactionHash, TransactionInput, TransactionInputs, TransactionMetadatum, TransactionOutput, TransactionOutputs, Value, Withdrawals } from '../../yoroi-lib-core/src/wasm-contract'

import { createYoroiLib, YoroiLib } from '../../yoroi-lib-core/src'

export const init = (): YoroiLib => {
  return createYoroiLib({
    encrypt_with_password: WasmV4.encrypt_with_password,
    decrypt_with_password: WasmV4.decrypt_with_password,
    encode_json_str_to_metadatum: async (json: string, schema: number) => {
      const wasm = await WasmV4.encode_json_str_to_metadatum(json, schema)
      return Promise.resolve(new MobileTransactionMetadatum(wasm))
    },
    BigNum: MobileBigNum,
    LinearFee: MobileLinearFee,
    GeneralTransactionMetadata: MobileGeneralTransactionMetadata,
    TransactionMetadatum: MobileTransactionMetadatum,
    AuxiliaryData: MobileAuxiliaryData,
    AssetName: MobileAssetName,
    AssetNames: MobileAssetNames,
    Assets: MobileAssets,
    ScriptHash: MobileScriptHash,
    ScriptHashes: MobileScriptHashes,
    MultiAsset: MobileMultiAsset,
    Ed25519KeyHash: MobileEd25519KeyHash,
    TransactionHash: MobileTransactionHash,
    TransactionInput: MobileTransactionInput,
    Value: MobileValue,
    Address: MobileAddress,
    PublicKey: MobilePublicKey,
    Bip32PublicKey: MobileBip32PublicKey,
    ByronAddress: MobileByronAddress,
    TransactionOutput: MobileTransactionOutput,
    StakeCredential: MobileStakeCredential,
    StakeRegistration: MobileStakeRegistration,
    StakeDeregistration: MobileStakeDeregistration,
    StakeDelegation: MobileStakeDelegation,
    Certificate: MobileCertificate,
    Certificates: MobileCertificates,
    RewardAddress: MobileRewardAddress,
    RewardAddresses: MobileRewardAddresses,
    Withdrawals: MobileWithdrawals,
    TransactionInputs: MobileTransactionInputs,
    TransactionOutputs: MobileTransactionOutputs,
    TransactionBody: MobileTransactionBody,
    TransactionBuilder: MobileTransactionBuilder
  });
}

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
    if ((wasm as any).free) {
      super(wasm)
    } else {
      throw 'missing free() function'
    }
  }

  async free(): Promise<void> {
    return await this.wasm.free()
  }
}

class MobileBigNum extends Ptr<WasmV4.BigNum> implements BigNum {
  to_bytes(): Promise<Uint8Array> {
    throw EXCEPTIONS.NOT_IMPLEMENTED
  }
  to_str(): Promise<string> {
    return this.wasm.to_str()
  }
  checked_mul(other: MobileBigNum): Promise<BigNum> {
    throw EXCEPTIONS.NOT_IMPLEMENTED
  }
  async checked_add(other: MobileBigNum): Promise<BigNum> {
    const wasmBigNum = await this.wasm.checked_add(other.wasm)
    return new MobileBigNum(wasmBigNum)
  }
  async checked_sub(other: MobileBigNum): Promise<BigNum> {
    const wasmBigNum = await this.wasm.checked_sub(other.wasm)
    return new MobileBigNum(wasmBigNum)
  }
  async clamped_sub(other: MobileBigNum): Promise<BigNum> {
    const wasmBigNum = await this.wasm.clamped_sub(other.wasm)
    return new MobileBigNum(wasmBigNum)
  }
  compare(rhs_value: MobileBigNum): Promise<number> {
    return this.wasm.compare(rhs_value.wasm)
  }
  
  static from_bytes(bytes: Uint8Array): Promise<BigNum> {
    throw EXCEPTIONS.NOT_IMPLEMENTED
  }

  static async from_str(string: string): Promise<BigNum> {
    const wasmBigNum = await WasmV4.BigNum.from_str(string)
    return new MobileBigNum(wasmBigNum)
  }
}

class MobileLinearFee extends Ptr<WasmV4.LinearFee> implements LinearFee {
  async constant(): Promise<BigNum> {
    const constant = await this.wasm.constant()
    return new MobileBigNum(constant)
  }
  async coefficient(): Promise<BigNum> {
    const coefficient = await this.wasm.coefficient()
    return new MobileBigNum(coefficient)
  }
  static async new(coefficient: MobileBigNum, constant: MobileBigNum): Promise<LinearFee> {
    const wasmLinearFee = await WasmV4.LinearFee.new(coefficient.wasm, constant.wasm)
    return Promise.resolve(new MobileLinearFee(wasmLinearFee))
  }
}

class MobileGeneralTransactionMetadata
  extends Ptr<WasmV4.GeneralTransactionMetadata>
  implements GeneralTransactionMetadata {

  async insert(key: MobileBigNum, value: MobileTransactionMetadatum): Promise<TransactionMetadatum | undefined> {
    const wasm = await this.wasm.insert(key.wasm, value.wasm)
    if (wasm) {
      return new MobileTransactionMetadatum(wasm)
    }
  }

  async get(key: MobileBigNum): Promise<TransactionMetadatum | undefined> {
    const wasm = await this.wasm.get(key.wasm)
    if (!wasm) return undefined
    return new MobileTransactionMetadatum(wasm)
  }

  static async new(): Promise<GeneralTransactionMetadata> {
    const wasm = await WasmV4.GeneralTransactionMetadata.new()
    return new MobileGeneralTransactionMetadata(wasm)
  }
}

class MobileTransactionMetadatum
  extends Ptr<WasmV4.TransactionMetadatum>
  implements TransactionMetadatum {

  to_bytes(): Promise<Uint8Array> {
    return this.wasm.to_bytes()
  }
}

class MobileAuxiliaryData
  extends Ptr<WasmV4.AuxiliaryData>
  implements AuxiliaryData {

  async metadata(): Promise<GeneralTransactionMetadata> {
    const wasm = await this.wasm.metadata()
    return new MobileGeneralTransactionMetadata(wasm)
  }

  static async new(metadata: MobileGeneralTransactionMetadata): Promise<AuxiliaryData> {
    const wasm = await WasmV4.AuxiliaryData.new(metadata.wasm)
    return Promise.resolve(new MobileAuxiliaryData(wasm))
  }
}

class MobileAssetName
  extends Ptr<WasmV4.AssetName>
  implements AssetName {

  async to_bytes(): Promise<Uint8Array> {
    return await this.wasm.to_bytes()
  }

  async name(): Promise<Uint8Array> {
    return await this.wasm.name()
  }

  static async from_bytes(bytes: Uint8Array): Promise<AssetName> {
    return new MobileAssetName(await WasmV4.AssetName.from_bytes(bytes))
  }

  static async new(name: Uint8Array): Promise<AssetName> {
   return new MobileAssetName(await WasmV4.AssetName.new(name))
  }
}

class MobileAssetNames
  extends Ptr<WasmV4.AssetNames>
  implements AssetNames {

  async len(): Promise<number> {
    return await this.wasm.len()
  }

  async get(index: number): Promise<AssetName> {
    return new MobileAssetName(await this.wasm.get(index))
  }

  async add(item: MobileAssetName): Promise<void> {
    await this.wasm.add(item.wasm)
  }

  static async new(): Promise<AssetNames> {
    return new MobileAssetNames(await WasmV4.AssetNames.new())
  }
}

class MobileAssets
  extends Ptr<WasmV4.Assets>
  implements Assets {

  async len(): Promise<number> {
    return await this.wasm.len()
  }

  async insert(key: MobileAssetName, value: MobileBigNum): Promise<BigNum> {
    return new MobileBigNum(await this.wasm.insert(key.wasm, value.wasm))
  }

  async get(key: MobileAssetName): Promise<BigNum | undefined> {
    return new MobileBigNum(await this.wasm.get(key.wasm))
  }

  async keys(): Promise<AssetNames> {
    return new MobileAssetNames(await this.wasm.keys())
  }

  static async new(): Promise<Assets> {
    return new MobileAssets(await WasmV4.Assets.new())
  }
}

class MobileScriptHash
  extends WasmProxy<WasmV4.ScriptHash>
  implements ScriptHash {

  async to_bytes(): Promise<Uint8Array> {
    return await this.wasm.to_bytes()
  }

  static async from_bytes(bytes: Uint8Array): Promise<ScriptHash> {
    return new MobileScriptHash(await WasmV4.ScriptHash.from_bytes(bytes))
  }
}

class MobileScriptHashes
  extends WasmProxy<WasmV4.ScriptHashes>
  implements ScriptHashes {

  async to_bytes(): Promise<Uint8Array> {
    return await this.wasm.to_bytes()
  }

  async len(): Promise<number> {
    return await this.wasm.len()
  }

  async get(index: number): Promise<ScriptHash> {
    return new MobileScriptHash(await this.wasm.get(index))
  }

  async add(item: MobileScriptHash): Promise<void> {
    await this.wasm.add(item.wasm)
  }

  static async from_bytes(bytes: Uint8Array): Promise<ScriptHashes> {
    return new MobileScriptHashes(await WasmV4.ScriptHashes.from_bytes(bytes))
  }

  static async new(): Promise<ScriptHashes> {
    return new MobileScriptHashes(await WasmV4.ScriptHashes.new())
  }
}

type MobilePolicyID = MobileScriptHash

type MobilePolicyIDs = MobileScriptHashes

class MobileMultiAsset
  extends Ptr<WasmV4.MultiAsset>
  implements MultiAsset {

  async len(): Promise<number> {
    return await this.wasm.len()
  }

  async insert(key: MobilePolicyID, value: MobileAssets): Promise<Assets> {
    return new MobileAssets(await this.wasm.insert(key.wasm, value.wasm))
  }

  async get(key: MobilePolicyID): Promise<Assets | undefined> {
    return new MobileAssets(await this.wasm.get(key.wasm))
  }

  async keys(): Promise<PolicyIDs> {
    return new MobileScriptHashes(await this.wasm.keys())
  }

  async sub(rhs: MobileMultiAsset): Promise<MultiAsset> {
    return new MobileMultiAsset(await this.wasm.sub(rhs.wasm))
  }

  static async new(): Promise<MultiAsset> {
    return new MobileMultiAsset(await WasmV4.MultiAsset.new())
  }
}

export class MobileEd25519KeyHash
  extends Ptr<WasmV4.Ed25519KeyHash>
  implements Ed25519KeyHash {

  async to_bytes(): Promise<Uint8Array> {
    return await this.wasm.to_bytes()
  }

  static async from_bytes(bytes: Uint8Array): Promise<Ed25519KeyHash> {
    return new MobileEd25519KeyHash(await WasmV4.Ed25519KeyHash.from_bytes(bytes))
  }
}

export class MobileTransactionHash
  extends Ptr<WasmV4.TransactionHash>
  implements TransactionHash {

  async to_bytes(): Promise<Uint8Array> {
    return await this.wasm.to_bytes()
  }

  static async from_bytes(bytes: Uint8Array): Promise<TransactionHash> {
    return new MobileTransactionHash(await WasmV4.TransactionHash.from_bytes(bytes))
  }
}

export class MobileTransactionInput
  extends Ptr<WasmV4.TransactionInput>
  implements TransactionInput {

  async to_bytes(): Promise<Uint8Array> {
    return this.wasm.to_bytes()
  }

  async transaction_id(): Promise<TransactionHash> {
    return new MobileTransactionHash(await this.wasm.transaction_id())
  }

  async index(): Promise<number> {
    return await this.wasm.index()
  }

  static async new(transactionId: MobileTransactionHash, index: number): Promise<TransactionInput> {
    return new MobileTransactionInput(await WasmV4.TransactionInput.new(transactionId.wasm, index))
  }

  static async from_bytes(bytes: Uint8Array): Promise<TransactionInput> {
    return new MobileTransactionInput(await WasmV4.TransactionInput.from_bytes(bytes))
  }
}

export class MobileValue
  extends Ptr<WasmV4.Value>
  implements Value {

  async coin(): Promise<BigNum> {
    return new MobileBigNum(await this.wasm.coin())
  }

  async set_coin(coin: MobileBigNum): Promise<void> {
    return await this.wasm.set_coin(coin.wasm)
  }

  async multiasset(): Promise<MultiAsset | undefined> {
    return new MobileMultiAsset(await this.wasm.multiasset())
  }

  async set_multiasset(multiasset: MobileMultiAsset): Promise<void> {
    return await this.wasm.set_multiasset(multiasset.wasm)
  }

  async checked_add(rhs: MobileValue): Promise<Value> {
    return new MobileValue(await this.wasm.checked_add(rhs.wasm))
  }

  async checked_sub(rhs: MobileValue): Promise<Value> {
    return new MobileValue(await this.wasm.checked_sub(rhs.wasm))
  }

  async clamped_sub(rhs: MobileValue): Promise<Value> {
    return new MobileValue(await this.wasm.clamped_sub(rhs.wasm))
  }

  async compare(rhs: MobileValue): Promise<number> {
    return await this.wasm.compare(rhs.wasm)
  }

  static async new(coin: MobileBigNum): Promise<Value> {
    return new MobileValue(await WasmV4.Value.new(coin.wasm))
  }
}

export class MobileAddress
  extends Ptr<WasmV4.Address>
  implements Address {

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
    return new MobileAddress(await WasmV4.Address.from_bytes(bytes))
  }

  static async from_bech32(string: string) : Promise<Address> {
    return new MobileAddress(await WasmV4.Address.from_bech32(string))
  }
}

export class MobilePublicKey
  extends Ptr<WasmV4.PublicKey>
  implements PublicKey {

  async to_bech32(): Promise<string> {
    return await this.wasm.to_bech32()
  }

  async as_bytes(): Promise<Uint8Array> {
    return await this.wasm.as_bytes()
  }

  async hash(): Promise<Ed25519KeyHash> {
    return new MobileEd25519KeyHash(await this.wasm.hash())
  }

  static async from_bech32(bech32_str: string): Promise<PublicKey> {
    return new MobilePublicKey(await WasmV4.PublicKey.from_bech32(bech32_str))
  }

  static async from_bytes(bytes: Uint8Array): Promise<PublicKey> {
    return new MobilePublicKey(await WasmV4.PublicKey.from_bytes(bytes))
  }
}

export class MobileBip32PublicKey
  extends Ptr<WasmV4.Bip32PublicKey>
  implements Bip32PublicKey {

  async derive(index: number): Promise<Bip32PublicKey> {
    return new MobileBip32PublicKey(await this.wasm.derive(index))
  }

  async to_raw_key(): Promise<PublicKey> {
    return new MobilePublicKey(await this.wasm.to_raw_key())
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
    return new MobileBip32PublicKey(await WasmV4.Bip32PublicKey.from_bech32(bech32_str))
  }

  static async from_bytes(bytes: Uint8Array): Promise<Bip32PublicKey> {
    return new MobileBip32PublicKey(await WasmV4.Bip32PublicKey.from_bytes(bytes))
  }
}

export class MobileByronAddress
  extends Ptr<WasmV4.ByronAddress>
  implements ByronAddress {

  async to_base58(): Promise<string> {
    return await this.wasm.to_base58()
  }

  async to_address(): Promise<Address> {
    return new MobileAddress(await this.wasm.to_address())
  }

  async byron_protocol_magic(): Promise<number> {
    return await this.wasm.byron_protocol_magic()
  }

  async attributes(): Promise<Uint8Array> {
    return await this.wasm.attributes()
  }

  async icarus_from_key(key: MobileBip32PublicKey, protocolMagic: number): Promise<ByronAddress> {
    throw EXCEPTIONS.NOT_IMPLEMENTED
  }

  static async from_base58(string: string): Promise<ByronAddress> {
    return new MobileByronAddress(await WasmV4.ByronAddress.from_base58(string))
  }

  static async is_valid(string: string): Promise<boolean> {
    return await WasmV4.ByronAddress.is_valid(string)
  }

  static async from_address(addr: MobileAddress): Promise<ByronAddress | undefined> {
    return new MobileByronAddress(await WasmV4.ByronAddress.from_address(addr.wasm))
  }
}

export class MobileTransactionOutput
  extends Ptr<WasmV4.TransactionOutput>
  implements TransactionOutput {

  async to_bytes(): Promise<Uint8Array> {
    return await this.wasm.to_bytes()
  }

  async address(): Promise<Address> {
    return new MobileAddress(await this.wasm.address())
  }

  async amount(): Promise<Value> {
    return new MobileValue(await this.wasm.amount())
  }

  static async from_bytes(bytes: Uint8Array): Promise<TransactionOutput> {
    return new MobileTransactionOutput(await WasmV4.TransactionOutput.from_bytes(bytes))
  }

  static async new(address: MobileAddress, amount: MobileValue): Promise<TransactionOutput> {
    return new MobileTransactionOutput(await WasmV4.TransactionOutput.new(address.wasm, amount.wasm))
  }
}

export class MobileStakeCredential
  extends Ptr<WasmV4.StakeCredential>
  implements StakeCredential {

  async to_bytes(): Promise<Uint8Array> {
    return await this.wasm.to_bytes()
  }

  async to_keyhash(): Promise<Ed25519KeyHash | undefined> {
    return new MobileEd25519KeyHash(await this.wasm.to_keyhash())
  }

  async to_scripthash(): Promise<ScriptHash | undefined> {
    return new MobileScriptHash(await this.wasm.to_scripthash())
  }

  async kind(): Promise<number> {
    return await this.wasm.kind()
  }

  static async from_bytes(bytes: Uint8Array): Promise<StakeCredential> {
    return new MobileStakeCredential(await WasmV4.StakeCredential.from_bytes(bytes))
  }

  static async from_keyhash(hash: MobileEd25519KeyHash): Promise<StakeCredential> {
    return new MobileStakeCredential(await WasmV4.StakeCredential.from_keyhash(hash.wasm))
  }

  static async from_scripthash(hash: MobileScriptHash): Promise<StakeCredential> {
    return new MobileStakeCredential(await WasmV4.StakeCredential.from_scripthash(hash.wasm))
  }
}

export class MobileStakeRegistration
  extends Ptr<WasmV4.StakeRegistration>
  implements StakeRegistration {

  async to_bytes(): Promise<Uint8Array> {
    return await this.wasm.to_bytes()
  }

  async stake_credential(): Promise<StakeCredential> {
    return new MobileStakeCredential(await this.wasm.stake_credential())
  }

  static async new(stakeCredential: MobileStakeCredential): Promise<StakeRegistration> {
    return new MobileStakeRegistration(await WasmV4.StakeRegistration.new(stakeCredential.wasm))
  }

  static async from_bytes(bytes: Uint8Array): Promise<StakeRegistration> {
    return new MobileStakeRegistration(await WasmV4.StakeRegistration.from_bytes(bytes))
  }
}

export class MobileStakeDeregistration
  extends Ptr<WasmV4.StakeDeregistration>
  implements StakeDeregistration {

  async to_bytes(): Promise<Uint8Array> {
    return await this.wasm.to_bytes()
  }

  async stake_credential(): Promise<StakeCredential> {
    return new MobileStakeCredential(await this.wasm.stake_credential())
  }

  static async new(stakeCredential: MobileStakeCredential): Promise<StakeDeregistration> {
    return new MobileStakeDeregistration(await WasmV4.StakeDeregistration.new(stakeCredential.wasm))
  }

  static async from_bytes(bytes: Uint8Array): Promise<StakeDeregistration> {
    return new MobileStakeDeregistration(await WasmV4.StakeDeregistration.from_bytes(bytes))
  }
}

export class MobileStakeDelegation
  extends Ptr<WasmV4.StakeDelegation>
  implements StakeDelegation {

  async to_bytes(): Promise<Uint8Array> {
    return await this.wasm.to_bytes()
  }

  async stake_credential(): Promise<StakeCredential> {
    return new MobileStakeCredential(await this.wasm.stake_credential())
  }

  async pool_keyhash(): Promise<Ed25519KeyHash> {
    return new MobileEd25519KeyHash(await this.wasm.pool_keyhash())
  }

  static async new(
    stakeCredential: MobileStakeCredential,
    poolKeyHash: MobileEd25519KeyHash,
  ): Promise<StakeDelegation> {
    return new MobileStakeDelegation(await WasmV4.StakeDelegation.new(stakeCredential.wasm, poolKeyHash.wasm))
  }

  static async from_bytes(bytes: Uint8Array): Promise<StakeDelegation> {
    return new MobileStakeDelegation(await WasmV4.StakeDelegation.from_bytes(bytes))
  }
}

export class MobileCertificate
  extends Ptr<WasmV4.Certificate>
  implements Certificate {

  async to_bytes(): Promise<Uint8Array> {
    return await this.wasm.to_bytes()
  }

  async as_stake_registration(): Promise<StakeRegistration | undefined> {
    return new MobileStakeRegistration(await this.wasm.as_stake_registration())
  }

  async as_stake_deregistration(): Promise<StakeDeregistration | undefined> {
    return new MobileStakeDeregistration(await this.wasm.as_stake_deregistration())
  }

  async as_stake_delegation(): Promise<StakeDelegation | undefined> {
    return new MobileStakeDelegation(await this.wasm.as_stake_delegation())
  }

  static async from_bytes(bytes: Uint8Array): Promise<Certificate> {
    return new MobileCertificate(await WasmV4.Certificate.from_bytes(bytes))
  }

  static async new_stake_registration(stakeRegistration: MobileStakeRegistration): Promise<Certificate> {
    return new MobileCertificate(await WasmV4.Certificate.new_stake_registration(stakeRegistration.wasm))
  }

  static async new_stake_deregistration(stakeDeregistration: MobileStakeDeregistration): Promise<Certificate> {
    return new MobileCertificate(await WasmV4.Certificate.new_stake_deregistration(stakeDeregistration.wasm))
  }

  static async new_stake_delegation(stakeDelegation: MobileStakeDelegation): Promise<Certificate> {
    return new MobileCertificate(await WasmV4.Certificate.new_stake_delegation(stakeDelegation.wasm))
  }
}

export class MobileCertificates
  extends Ptr<WasmV4.Certificates>
  implements Certificates {

  async to_bytes(): Promise<Uint8Array> {
    return await this.wasm.to_bytes()
  }

  async len(): Promise<number> {
    return await this.wasm.len()
  }

  async get(index: number): Promise<Certificate> {
    return new MobileCertificate(await this.wasm.get(index))
  }

  async add(item: MobileCertificate): Promise<void> {
    return await this.wasm.add(item.wasm)
  }

  static async from_bytes(bytes: Uint8Array): Promise<Certificates> {
    return new MobileCertificates(await WasmV4.Certificates.from_bytes(bytes))
  }

  static async new(): Promise<Certificates> {
    return new MobileCertificates(await WasmV4.Certificates.new())
  }
}

export class MobileRewardAddress
  extends Ptr<WasmV4.RewardAddress>
  implements RewardAddress {

  async payment_cred(): Promise<StakeCredential> {
    return new MobileStakeCredential(await this.wasm.payment_cred())
  }

  async to_address(): Promise<Address> {
    return new MobileAddress(await this.wasm.to_address())
  }

  static async from_address(addr: MobileAddress): Promise<RewardAddress | undefined> {
    return new MobileRewardAddress(await WasmV4.RewardAddress.from_address(addr.wasm))
  }

  static async new(network: number, payment: MobileStakeCredential): Promise<RewardAddress> {
    return new MobileRewardAddress(await WasmV4.RewardAddress.new(network, payment.wasm))
  }
}

export class MobileRewardAddresses
  extends Ptr<WasmV4.RewardAddresses>
  implements RewardAddresses {

  async len(): Promise<number> {
    return await this.wasm.len()
  }

  async get(index: number): Promise<RewardAddress> {
    return new MobileRewardAddress(await this.wasm.get(index))
  }

  async add(item: MobileRewardAddress): Promise<void> {
    return await this.wasm.add(item.wasm)
  }

  static async new(): Promise<RewardAddresses> {
    return new MobileRewardAddresses(await WasmV4.RewardAddresses.new())
  }
}

export class MobileWithdrawals
  extends Ptr<WasmV4.Withdrawals>
  implements Withdrawals {

  async len(): Promise<number> {
    return await this.wasm.len()
  }

  async insert(key: MobileRewardAddress, value: MobileBigNum): Promise<BigNum> {
    return new MobileBigNum(await this.wasm.insert(key.wasm, value.wasm))
  }

  async get(key: MobileRewardAddress): Promise<BigNum | undefined> {
    return new MobileBigNum(await this.wasm.get(key.wasm))
  }

  async keys(): Promise<RewardAddresses> {
    return new MobileRewardAddresses(await this.wasm.keys())
  }

  static async new(): Promise<Withdrawals> {
    return new MobileWithdrawals(await WasmV4.Withdrawals.new())
  }
}

export class MobileTransactionInputs
  extends Ptr<WasmV4.TransactionInputs>
  implements TransactionInputs {

  async len(): Promise<number> {
    return await this.wasm.len()
  }
  
  async get(index: number): Promise<TransactionInput> {
    return new MobileTransactionInput(await this.wasm.get(index))
  }
}

export class MobileTransactionOutputs
  extends Ptr<WasmV4.TransactionOutputs>
  implements TransactionOutputs {

  async len(): Promise<number> {
    return await this.wasm.len()
  }

  async get(index: number): Promise<TransactionOutput> {
    return new MobileTransactionOutput(await this.wasm.get(index))
  }
}

export type Optional<T> = T | undefined;

export class MobileTransactionBody
  extends Ptr<WasmV4.TransactionBody>
  implements TransactionBody {

  async to_bytes(): Promise<Uint8Array> {
    return await this.wasm.to_bytes()
  }

  async inputs(): Promise<TransactionInputs> {
    return new MobileTransactionInputs(await this.wasm.inputs())
  }

  async outputs(): Promise<TransactionOutputs> {
    return new MobileTransactionOutputs(await this.wasm.outputs())
  }

  async fee(): Promise<BigNum> {
    return new MobileBigNum(await this.wasm.fee())
  }

  async ttl(): Promise<Optional<number>> {
    return await this.wasm.ttl()
  }

  async certs(): Promise<Certificates> {
    return Promise.resolve(new MobileCertificates(await this.wasm.certs()))
  }

  async withdrawals(): Promise<Withdrawals> {
    return Promise.resolve(new MobileWithdrawals(await this.wasm.withdrawals()))
  }

  static async from_bytes(bytes: Uint8Array): Promise<TransactionBody> {
    return Promise.resolve(new MobileTransactionBody(await WasmV4.TransactionBody.from_bytes(bytes)))
  }
}

export class MobileTransactionBuilder
  extends Ptr<WasmV4.TransactionBuilder>
  implements TransactionBuilder {

  async add_key_input(
    hash: MobileEd25519KeyHash,
    input: MobileTransactionInput,
    amount: MobileValue,
  ): Promise<void> {
    return await this.wasm.add_key_input(hash.wasm, input.wasm, amount.wasm)
  }

  async add_bootstrap_input(
    hash: MobileByronAddress,
    input: MobileTransactionInput,
    amount: MobileValue,
  ): Promise<void> {
    return await this.wasm.add_bootstrap_input(hash.wasm, input.wasm, amount.wasm)
  }

  async add_input(
    address: MobileAddress,
    input: MobileTransactionInput,
    amount: MobileValue,
  ): Promise<void> {
    return await this.wasm.add_input(address.wasm, input.wasm, amount.wasm)
  }

  async fee_for_input(
    address: MobileAddress,
    input: MobileTransactionInput,
    amount: MobileValue,
  ): Promise<BigNum> {
    return new MobileBigNum(await this.wasm.fee_for_input(address.wasm, input.wasm, amount.wasm))
  }

  async add_output(output: MobileTransactionOutput): Promise<void> {
    return await this.wasm.add_output(output.wasm)
  }

  async fee_for_output(output: MobileTransactionOutput): Promise<BigNum> {
    return new MobileBigNum(await this.wasm.fee_for_output(output.wasm))
  }

  async set_fee(fee: MobileBigNum): Promise<void> {
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

  async set_certs(certs: MobileCertificates): Promise<void> {
    return await this.wasm.set_certs(certs.wasm)
  }

  async set_withdrawals(withdrawals: MobileWithdrawals): Promise<void> {
    return await this.wasm.set_withdrawals(withdrawals.wasm)
  }

  async set_auxiliary_data(auxiliary: MobileAuxiliaryData): Promise<void> {
    return await this.wasm.set_auxiliary_data(auxiliary.wasm)
  }

  async get_explicit_input(): Promise<Value> {
    return new MobileValue(await this.wasm.get_explicit_input())
  }

  async get_implicit_input(): Promise<Value> {
    return new MobileValue(await this.wasm.get_implicit_input())
  }

  async get_explicit_output(): Promise<Value> {
    return new MobileValue(await this.wasm.get_explicit_output())
  }

  async get_deposit(): Promise<BigNum> {
    return new MobileBigNum(await this.wasm.get_deposit())
  }

  async get_fee_if_set(): Promise<BigNum> {
    return new MobileBigNum(await this.wasm.get_fee_if_set())
  }

  async add_change_if_needed(address: MobileAddress): Promise<boolean> {
    return await this.wasm.add_change_if_needed(address.wasm)
  }

  async build(): Promise<TransactionBody> {
    return new MobileTransactionBody(await this.wasm.build())
  }

  async min_fee(): Promise<BigNum> {
    return new MobileBigNum(await this.wasm.min_fee())
  }

  static async new(
    linearFee: MobileLinearFee,
    minimumUtxoVal: MobileBigNum,
    poolDeposit: MobileBigNum,
    keyDeposit: MobileBigNum,
  ): Promise<TransactionBuilder> {
    return new MobileTransactionBuilder(await WasmV4.TransactionBuilder.new(
      linearFee.wasm,
      minimumUtxoVal.wasm,
      poolDeposit.wasm,
      keyDeposit.wasm
    ))
  }
}
