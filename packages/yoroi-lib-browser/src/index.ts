import * as WasmV4 from '@emurgo/cardano-serialization-lib-browser/cardano_serialization_lib'
import { Address, AssetName, AssetNames, Assets, AuxiliaryData, BigNum, Bip32PublicKey, ByronAddress, Certificate, Certificates, Ed25519KeyHash, EXCEPTIONS, GeneralTransactionMetadata, LinearFee, MultiAsset, PolicyID, PolicyIDs, PublicKey, RewardAddress, RewardAddresses, ScriptHash, ScriptHashes, StakeCredential, StakeDelegation, StakeDeregistration, StakeRegistration, TransactionBody, TransactionBuilder, TransactionHash, TransactionInput, TransactionInputs, TransactionMetadatum, TransactionOutput, TransactionOutputs, Value, Withdrawals } from '../../yoroi-lib-core/src/wasm-contract'

import { createYoroiLib, YoroiLib } from '../../yoroi-lib-core/src/index'

export const init = (): YoroiLib => {
  // The methods in the browser's Wasm object are not async,
  // so we have to create another object to pass to createYoroiLib
  return createYoroiLib({
    encrypt_with_password: (password: string, salt: string, nonce: string, data: string) => {
      return Promise.resolve(WasmV4.encrypt_with_password(password, salt, nonce, data))
    },
    decrypt_with_password: (password: string, salt: string) => {
      return Promise.resolve(WasmV4.decrypt_with_password(password, salt))
    },
    encode_json_str_to_metadatum: (json: string, schema: number) => {
      const wasm = WasmV4.encode_json_str_to_metadatum(json, schema)
      return Promise.resolve(new BrowserTransactionMetadatum(wasm))
    },
    BigNum: BrowserBigNum,
    LinearFee: BrowserLinearFee,
    GeneralTransactionMetadata: BrowserGeneralTransactionMetadata,
    TransactionMetadatum: BrowserTransactionMetadatum,
    AuxiliaryData: BrowserAuxiliaryData,
    AssetName: BrowserAssetName,
    AssetNames: BrowserAssetNames,
    Assets: BrowserAssets,
    ScriptHash: BrowserScriptHash,
    ScriptHashes: BrowserScriptHashes,
    MultiAsset: BrowserMultiAsset,
    Ed25519KeyHash: BrowserEd25519KeyHash,
    TransactionHash: BrowserTransactionHash,
    TransactionInput: BrowserTransactionInput,
    Value: BrowserValue,
    Address: BrowserAddress,
    PublicKey: BrowserPublicKey,
    Bip32PublicKey: BrowserBip32PublicKey,
    ByronAddress: BrowserByronAddress,
    TransactionOutput: BrowserTransactionOutput,
    StakeCredential: BrowserStakeCredential,
    StakeRegistration: BrowserStakeRegistration,
    StakeDeregistration: BrowserStakeDeregistration,
    StakeDelegation: BrowserStakeDelegation,
    Certificate: BrowserCertificate,
    Certificates: BrowserCertificates,
    RewardAddress: BrowserRewardAddress,
    RewardAddresses: BrowserRewardAddresses,
    Withdrawals: BrowserWithdrawals,
    TransactionInputs: BrowserTransactionInputs,
    TransactionOutputs: BrowserTransactionOutputs,
    TransactionBody: BrowserTransactionBody,
    TransactionBuilder: BrowserTransactionBuilder
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

abstract class Ptr<T extends { free: () => any }> extends WasmProxy<T> {
  constructor(wasm: T) {
    super(wasm)
  }

  free(): Promise<void> {
    return Promise.resolve(this.wasm.free())
  }
}

class BrowserBigNum extends Ptr<WasmV4.BigNum> implements BigNum {
  to_bytes(): Promise<Uint8Array> {
    return Promise.resolve(this.wasm.to_bytes())
  }
  to_str(): Promise<string> {
    return Promise.resolve(this.wasm.to_str())
  }
  checked_mul(other: BrowserBigNum): Promise<BigNum> {
    const wasmBigNum = this.wasm.checked_mul(other.wasm)
    return Promise.resolve(new BrowserBigNum(wasmBigNum))
  }
  checked_add(other: BrowserBigNum): Promise<BigNum> {
    const wasmBigNum = this.wasm.checked_add(other.wasm)
    return Promise.resolve(new BrowserBigNum(wasmBigNum))
  }
  checked_sub(other: BrowserBigNum): Promise<BigNum> {
    const wasmBigNum = this.wasm.checked_sub(other.wasm)
    return Promise.resolve(new BrowserBigNum(wasmBigNum))
  }
  clamped_sub(other: BrowserBigNum): Promise<BigNum> {
    const wasmBigNum = this.wasm.clamped_sub(other.wasm)
    return Promise.resolve(new BrowserBigNum(wasmBigNum))
  }
  compare(rhs_value: BrowserBigNum): Promise<number> {
    return Promise.resolve(this.wasm.compare(rhs_value.wasm))
  }

  static async from_bytes(bytes: Uint8Array): Promise<BigNum> {
    const wasmBigNum = WasmV4.BigNum.from_bytes(bytes)
    return Promise.resolve(new BrowserBigNum(wasmBigNum))
  }

  static from_str(string: string): Promise<BigNum> {
    const wasmBigNum = WasmV4.BigNum.from_str(string)
    return Promise.resolve(new BrowserBigNum(wasmBigNum))
  }
}

class BrowserLinearFee extends Ptr<WasmV4.LinearFee> implements LinearFee {
  free(): Promise<void> {
    return Promise.resolve(this.wasm.free())
  }  
  constant(): Promise<BigNum> {
    return Promise.resolve(new BrowserBigNum(this.wasm.constant()))
  }
  coefficient(): Promise<BigNum> {
    return Promise.resolve(new BrowserBigNum(this.wasm.coefficient()))
  }
  static new(coefficient: BrowserBigNum, constant: BrowserBigNum): Promise<LinearFee> {
    const wasmLinearFee = WasmV4.LinearFee.new(coefficient.wasm, constant.wasm)
    return Promise.resolve(new BrowserLinearFee(wasmLinearFee))
  }
}

class BrowserGeneralTransactionMetadata
  extends Ptr<WasmV4.GeneralTransactionMetadata>
  implements GeneralTransactionMetadata {

  insert(key: BrowserBigNum, value: BrowserTransactionMetadatum): Promise<TransactionMetadatum | undefined> {
    const wasm = this.wasm.insert(key.wasm, value.wasm)
    if (wasm) {
      return Promise.resolve(new BrowserTransactionMetadatum(wasm))
    }
  }

  get(key: BrowserBigNum): Promise<TransactionMetadatum | undefined> {
    const wasm = this.wasm.get(key.wasm)
    if (!wasm) return;
    return Promise.resolve(new BrowserTransactionMetadatum(wasm))
  }

  static new(): Promise<GeneralTransactionMetadata> {
    const wasm = WasmV4.GeneralTransactionMetadata.new()
    return Promise.resolve(new BrowserGeneralTransactionMetadata(wasm))
  }
}

class BrowserTransactionMetadatum
  extends Ptr<WasmV4.TransactionMetadatum>
  implements TransactionMetadatum {

  to_bytes(): Promise<Uint8Array> {
    return Promise.resolve(this.wasm.to_bytes())
  }
}

class BrowserAuxiliaryData
  extends Ptr<WasmV4.AuxiliaryData>
  implements AuxiliaryData {

  metadata(): Promise<GeneralTransactionMetadata> {
    const wasm = this.wasm.metadata()
    return Promise.resolve(new BrowserGeneralTransactionMetadata(wasm))
  }

  static new(metadata: BrowserGeneralTransactionMetadata): Promise<AuxiliaryData> {
    const wasm = WasmV4.AuxiliaryData.new()
    wasm.set_metadata(metadata.wasm)
    return Promise.resolve(new BrowserAuxiliaryData(wasm))
  }
}

class BrowserAssetName
  extends Ptr<WasmV4.AssetName>
  implements AssetName {

  to_bytes(): Promise<Uint8Array> {
    return Promise.resolve(this.wasm.to_bytes())
  }
  name(): Promise<Uint8Array> {
    return Promise.resolve(this.wasm.name())
  }

  static from_bytes(bytes: Uint8Array): Promise<AssetName> {
    return Promise.resolve(new BrowserAssetName(WasmV4.AssetName.from_bytes(bytes)))
  }

  static new(name: Uint8Array): Promise<AssetName> {
   return Promise.resolve(new BrowserAssetName(WasmV4.AssetName.new(name)))
  }
}

class BrowserAssetNames
  extends Ptr<WasmV4.AssetNames>
  implements AssetNames {

  len(): Promise<number> {
    return Promise.resolve(this.wasm.len())
  }

  get(index: number): Promise<AssetName> {
    return Promise.resolve(new BrowserAssetName(this.wasm.get(index)))
  }

  async add(item: BrowserAssetName): Promise<void> {
    this.wasm.add(item.wasm)
  }

  static new(): Promise<AssetNames> {
    return Promise.resolve(new BrowserAssetNames(WasmV4.AssetNames.new()))
  }
}

class BrowserAssets
  extends Ptr<WasmV4.Assets>
  implements Assets {

  len(): Promise<number> {
    return Promise.resolve(this.wasm.len())
  }

  insert(key: BrowserAssetName, value: BrowserBigNum): Promise<BigNum> {
    return Promise.resolve(new BrowserBigNum(this.wasm.insert(key.wasm, value.wasm)))
  }

  get(key: BrowserAssetName): Promise<BigNum | undefined> {
    return Promise.resolve(new BrowserBigNum(this.wasm.get(key.wasm)))
  }

  keys(): Promise<AssetNames> {
    return Promise.resolve(new BrowserAssetNames(this.wasm.keys()))
  }

  static new(): Promise<Assets> {
    return Promise.resolve(new BrowserAssets(WasmV4.Assets.new()))
  }
}

class BrowserScriptHash
  extends WasmProxy<WasmV4.ScriptHash>
  implements ScriptHash {

  to_bytes(): Promise<Uint8Array> {
    return Promise.resolve(this.wasm.to_bytes())
  }

  static from_bytes(bytes: Uint8Array): Promise<ScriptHash> {
    return Promise.resolve(new BrowserScriptHash(WasmV4.ScriptHash.from_bytes(bytes)))
  }
}

class BrowserScriptHashes
  extends WasmProxy<WasmV4.ScriptHashes>
  implements ScriptHashes {

  to_bytes(): Promise<Uint8Array> {
    return Promise.resolve(this.wasm.to_bytes())
  }

  len(): Promise<number> {
    return Promise.resolve(this.wasm.len())
  }

  get(index: number): Promise<ScriptHash> {
    return Promise.resolve(new BrowserScriptHash(this.wasm.get(index)))
  }

  async add(item: BrowserScriptHash): Promise<void> {
    this.wasm.add(item.wasm)
  }

  static from_bytes(bytes: Uint8Array): Promise<ScriptHashes> {
    return Promise.resolve(new BrowserScriptHashes(WasmV4.ScriptHashes.from_bytes(bytes)))
  }

  static new(): Promise<ScriptHashes> {
    return Promise.resolve(new BrowserScriptHashes(WasmV4.ScriptHashes.new()))
  }
}

type BrowserPolicyID = BrowserScriptHash

type BrowserPolicyIDs = BrowserScriptHashes

class BrowserMultiAsset
  extends Ptr<WasmV4.MultiAsset>
  implements MultiAsset {

  len(): Promise<number> {
    return Promise.resolve(this.wasm.len())
  }

  insert(key: BrowserPolicyID, value: BrowserAssets): Promise<Assets> {
    return Promise.resolve(new BrowserAssets(this.wasm.insert(key.wasm, value.wasm)))
  }

  get(key: BrowserPolicyID): Promise<Assets | undefined> {
    return Promise.resolve(new BrowserAssets(this.wasm.get(key.wasm)))
  }

  keys(): Promise<PolicyIDs> {
    return Promise.resolve(new BrowserScriptHashes(this.wasm.keys()))
  }

  sub(rhs: BrowserMultiAsset): Promise<MultiAsset> {
    return Promise.resolve(new BrowserMultiAsset(this.wasm.sub(rhs.wasm)))
  }

  static new(): Promise<MultiAsset> {
    return Promise.resolve(new BrowserMultiAsset(WasmV4.MultiAsset.new()))
  }
}

export class BrowserEd25519KeyHash
  extends Ptr<WasmV4.Ed25519KeyHash>
  implements Ed25519KeyHash {

  to_bytes(): Promise<Uint8Array> {
    return Promise.resolve(this.wasm.to_bytes())
  }

  static from_bytes(bytes: Uint8Array): Promise<Ed25519KeyHash> {
    return Promise.resolve(new BrowserEd25519KeyHash(WasmV4.Ed25519KeyHash.from_bytes(bytes)))
  }
}

export class BrowserTransactionHash
  extends Ptr<WasmV4.TransactionHash>
  implements TransactionHash {

  to_bytes(): Promise<Uint8Array> {
    return Promise.resolve(this.wasm.to_bytes())
  }

  static from_bytes(bytes: Uint8Array): Promise<TransactionHash> {
    return Promise.resolve(new BrowserTransactionHash(WasmV4.TransactionHash.from_bytes(bytes)))
  }
}

export class BrowserTransactionInput
  extends Ptr<WasmV4.TransactionInput>
  implements TransactionInput {

  to_bytes(): Promise<Uint8Array> {
    return Promise.resolve(this.wasm.to_bytes())
  }

  transaction_id(): Promise<TransactionHash> {
    return Promise.resolve(new BrowserTransactionHash(this.wasm.transaction_id()))
  }

  index(): Promise<number> {
    return Promise.resolve(this.wasm.index())
  }

  static new(transactionId: BrowserTransactionHash, index: number): Promise<TransactionInput> {
    return Promise.resolve(new BrowserTransactionInput(WasmV4.TransactionInput.new(transactionId.wasm, index)))
  }

  static from_bytes(bytes: Uint8Array): Promise<TransactionInput> {
    return Promise.resolve(new BrowserTransactionInput(WasmV4.TransactionInput.from_bytes(bytes)))
  }
}

export class BrowserValue
  extends Ptr<WasmV4.Value>
  implements Value {

  coin(): Promise<BigNum> {
    return Promise.resolve(new BrowserBigNum(this.wasm.coin()))
  }

  set_coin(coin: BrowserBigNum): Promise<void> {
    return Promise.resolve(this.wasm.set_coin(coin.wasm))
  }

  multiasset(): Promise<MultiAsset | undefined> {
    return Promise.resolve(new BrowserMultiAsset(this.wasm.multiasset()))
  }

  set_multiasset(multiasset: BrowserMultiAsset): Promise<void> {
    return Promise.resolve(this.wasm.set_multiasset(multiasset.wasm))
  }

  checked_add(rhs: BrowserValue): Promise<Value> {
    return Promise.resolve(new BrowserValue(this.wasm.checked_add(rhs.wasm)))
  }

  checked_sub(rhs: BrowserValue): Promise<Value> {
    return Promise.resolve(new BrowserValue(this.wasm.checked_sub(rhs.wasm)))
  }

  clamped_sub(rhs: BrowserValue): Promise<Value> {
    return Promise.resolve(new BrowserValue(this.wasm.clamped_sub(rhs.wasm)))
  }

  compare(rhs: BrowserValue): Promise<number> {
    return Promise.resolve(this.wasm.compare(rhs.wasm))
  }

  static new(coin: BrowserBigNum): Promise<Value> {
    return Promise.resolve(new BrowserValue(WasmV4.Value.new(coin.wasm)))
  }
}

export class BrowserAddress
  extends Ptr<WasmV4.Address>
  implements Address {

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
    return Promise.resolve(new BrowserAddress(WasmV4.Address.from_bytes(bytes)))
  }

  static from_bech32(string: string) : Promise<Address> {
    return Promise.resolve(new BrowserAddress(WasmV4.Address.from_bech32(string)))
  }
}

export class BrowserPublicKey
  extends Ptr<WasmV4.PublicKey>
  implements PublicKey {

  to_bech32(): Promise<string> {
    return Promise.resolve(this.wasm.to_bech32())
  }

  as_bytes(): Promise<Uint8Array> {
    return Promise.resolve(this.wasm.as_bytes())
  }

  hash(): Promise<Ed25519KeyHash> {
    return Promise.resolve(new BrowserEd25519KeyHash(this.wasm.hash()))
  }

  static from_bech32(bech32_str: string): Promise<PublicKey> {
    return Promise.resolve(new BrowserPublicKey(WasmV4.PublicKey.from_bech32(bech32_str)))
  }

  static from_bytes(bytes: Uint8Array): Promise<PublicKey> {
    return Promise.resolve(new BrowserPublicKey(WasmV4.PublicKey.from_bytes(bytes)))
  }
}

export class BrowserBip32PublicKey
  extends Ptr<WasmV4.Bip32PublicKey>
  implements Bip32PublicKey {

  derive(index: number): Promise<Bip32PublicKey> {
    return Promise.resolve(new BrowserBip32PublicKey(this.wasm.derive(index)))
  }

  to_raw_key(): Promise<PublicKey> {
    return Promise.resolve(new BrowserPublicKey(this.wasm.to_raw_key()))
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
    return Promise.resolve(new BrowserBip32PublicKey(WasmV4.Bip32PublicKey.from_bech32(bech32_str)))
  }

  static from_bytes(bytes: Uint8Array): Promise<Bip32PublicKey> {
    return Promise.resolve(new BrowserBip32PublicKey(WasmV4.Bip32PublicKey.from_bytes(bytes)))
  }
}

export class BrowserByronAddress
  extends Ptr<WasmV4.ByronAddress>
  implements ByronAddress {

  to_base58(): Promise<string> {
    return Promise.resolve(this.wasm.to_base58())
  }

  to_address(): Promise<Address> {
    return Promise.resolve(new BrowserAddress(this.wasm.to_address()))
  }

  byron_protocol_magic(): Promise<number> {
    return Promise.resolve(this.wasm.byron_protocol_magic())
  }

  attributes(): Promise<Uint8Array> {
    return Promise.resolve(this.wasm.attributes())
  }

  icarus_from_key(key: BrowserBip32PublicKey, protocolMagic: number): Promise<ByronAddress> {
    throw EXCEPTIONS.NOT_IMPLEMENTED
  }

  static from_base58(string: string): Promise<ByronAddress> {
    return Promise.resolve(new BrowserByronAddress(WasmV4.ByronAddress.from_base58(string)))
  }

  static is_valid(string: string): Promise<boolean> {
    return Promise.resolve(WasmV4.ByronAddress.is_valid(string))
  }

  static from_address(addr: BrowserAddress): Promise<ByronAddress | undefined> {
    return Promise.resolve(new BrowserByronAddress(WasmV4.ByronAddress.from_address(addr.wasm)))
  }
}

export class BrowserTransactionOutput
  extends Ptr<WasmV4.TransactionOutput>
  implements TransactionOutput {

  to_bytes(): Promise<Uint8Array> {
    return Promise.resolve(this.wasm.to_bytes())
  }

  address(): Promise<Address> {
    return Promise.resolve(new BrowserAddress(this.wasm.address()))
  }

  amount(): Promise<Value> {
    return Promise.resolve(new BrowserValue(this.wasm.amount()))
  }

  static from_bytes(bytes: Uint8Array): Promise<TransactionOutput> {
    return Promise.resolve(new BrowserTransactionOutput(WasmV4.TransactionOutput.from_bytes(bytes)))
  }

  static new(address: BrowserAddress, amount: BrowserValue): Promise<TransactionOutput> {
    return Promise.resolve(new BrowserTransactionOutput(WasmV4.TransactionOutput.new(address.wasm, amount.wasm)))
  }
}

export class BrowserStakeCredential
  extends Ptr<WasmV4.StakeCredential>
  implements StakeCredential {

  to_bytes(): Promise<Uint8Array> {
    return Promise.resolve(this.wasm.to_bytes())
  }

  to_keyhash(): Promise<Ed25519KeyHash | undefined> {
    return Promise.resolve(new BrowserEd25519KeyHash(this.wasm.to_keyhash()))
  }

  to_scripthash(): Promise<ScriptHash | undefined> {
    return Promise.resolve(new BrowserScriptHash(this.wasm.to_scripthash()))
  }

  kind(): Promise<number> {
    return Promise.resolve(this.wasm.kind())
  }

  static from_bytes(bytes: Uint8Array): Promise<StakeCredential> {
    return Promise.resolve(new BrowserStakeCredential(WasmV4.StakeCredential.from_bytes(bytes)))
  }

  static from_keyhash(hash: BrowserEd25519KeyHash): Promise<StakeCredential> {
    return Promise.resolve(new BrowserStakeCredential(WasmV4.StakeCredential.from_keyhash(hash.wasm)))
  }

  static from_scripthash(hash: BrowserScriptHash): Promise<StakeCredential> {
    return Promise.resolve(new BrowserStakeCredential(WasmV4.StakeCredential.from_scripthash(hash.wasm)))
  }
}

export class BrowserStakeRegistration
  extends Ptr<WasmV4.StakeRegistration>
  implements StakeRegistration {

  to_bytes(): Promise<Uint8Array> {
    return Promise.resolve(this.wasm.to_bytes())
  }

  stake_credential(): Promise<StakeCredential> {
    return Promise.resolve(new BrowserStakeCredential(this.wasm.stake_credential()))
  }

  static new(stakeCredential: BrowserStakeCredential): Promise<StakeRegistration> {
    return Promise.resolve(new BrowserStakeRegistration(WasmV4.StakeRegistration.new(stakeCredential.wasm)))
  }

  static from_bytes(bytes: Uint8Array): Promise<StakeRegistration> {
    return Promise.resolve(new BrowserStakeRegistration(WasmV4.StakeRegistration.from_bytes(bytes)))
  }
}

export class BrowserStakeDeregistration
  extends Ptr<WasmV4.StakeDeregistration>
  implements StakeDeregistration {

  to_bytes(): Promise<Uint8Array> {
    return Promise.resolve(this.wasm.to_bytes())
  }

  stake_credential(): Promise<StakeCredential> {
    return Promise.resolve(new BrowserStakeCredential(this.wasm.stake_credential()))
  }

  static new(stakeCredential: BrowserStakeCredential): Promise<StakeDeregistration> {
    return Promise.resolve(new BrowserStakeDeregistration(WasmV4.StakeDeregistration.new(stakeCredential.wasm)))
  }

  static from_bytes(bytes: Uint8Array): Promise<StakeDeregistration> {
    return Promise.resolve(new BrowserStakeDeregistration(WasmV4.StakeDeregistration.from_bytes(bytes)))
  }
}

export class BrowserStakeDelegation
  extends Ptr<WasmV4.StakeDelegation>
  implements StakeDelegation {

  to_bytes(): Promise<Uint8Array> {
    return Promise.resolve(this.wasm.to_bytes())
  }

  stake_credential(): Promise<StakeCredential> {
    return Promise.resolve(new BrowserStakeCredential(this.wasm.stake_credential()))
  }

  pool_keyhash(): Promise<Ed25519KeyHash> {
    return Promise.resolve(new BrowserEd25519KeyHash(this.wasm.pool_keyhash()))
  }

  static new(
    stakeCredential: BrowserStakeCredential,
    poolKeyHash: BrowserEd25519KeyHash,
  ): Promise<StakeDelegation> {
    return Promise.resolve(new BrowserStakeDelegation(WasmV4.StakeDelegation.new(stakeCredential.wasm, poolKeyHash.wasm)))
  }

  static from_bytes(bytes: Uint8Array): Promise<StakeDelegation> {
    return Promise.resolve(new BrowserStakeDelegation(WasmV4.StakeDelegation.from_bytes(bytes)))
  }
}

export class BrowserCertificate
  extends Ptr<WasmV4.Certificate>
  implements Certificate {

  to_bytes(): Promise<Uint8Array> {
    return Promise.resolve(this.wasm.to_bytes())
  }

  as_stake_registration(): Promise<StakeRegistration | undefined> {
    return Promise.resolve(new BrowserStakeRegistration(this.wasm.as_stake_registration()))
  }

  as_stake_deregistration(): Promise<StakeDeregistration | undefined> {
    return Promise.resolve(new BrowserStakeDeregistration(this.wasm.as_stake_deregistration()))
  }

  as_stake_delegation(): Promise<StakeDelegation | undefined> {
    return Promise.resolve(new BrowserStakeDelegation(this.wasm.as_stake_delegation()))
  }

  static from_bytes(bytes: Uint8Array): Promise<Certificate> {
    return Promise.resolve(new BrowserCertificate(WasmV4.Certificate.from_bytes(bytes)))
  }

  static new_stake_registration(stakeRegistration: BrowserStakeRegistration): Promise<Certificate> {
    return Promise.resolve(new BrowserCertificate(WasmV4.Certificate.new_stake_registration(stakeRegistration.wasm)))
  }

  static new_stake_deregistration(stakeDeregistration: BrowserStakeDeregistration): Promise<Certificate> {
    return Promise.resolve(new BrowserCertificate(WasmV4.Certificate.new_stake_deregistration(stakeDeregistration.wasm)))
  }

  static new_stake_delegation(stakeDelegation: BrowserStakeDelegation): Promise<Certificate> {
    return Promise.resolve(new BrowserCertificate(WasmV4.Certificate.new_stake_delegation(stakeDelegation.wasm)))
  }
}

export class BrowserCertificates
  extends Ptr<WasmV4.Certificates>
  implements Certificates {

  to_bytes(): Promise<Uint8Array> {
    return Promise.resolve(this.wasm.to_bytes())
  }

  len(): Promise<number> {
    return Promise.resolve(this.wasm.len())
  }

  get(index: number): Promise<Certificate> {
    return Promise.resolve(new BrowserCertificate(this.wasm.get(index)))
  }

  add(item: BrowserCertificate): Promise<void> {
    return Promise.resolve(this.wasm.add(item.wasm))
  }

  static from_bytes(bytes: Uint8Array): Promise<Certificates> {
    return Promise.resolve(new BrowserCertificates(WasmV4.Certificates.from_bytes(bytes)))
  }

  static new(): Promise<Certificates> {
    return Promise.resolve(new BrowserCertificates(WasmV4.Certificates.new()))
  }
}

export class BrowserRewardAddress
  extends Ptr<WasmV4.RewardAddress>
  implements RewardAddress {

  payment_cred(): Promise<StakeCredential> {
    return Promise.resolve(new BrowserStakeCredential(this.wasm.payment_cred()))
  }

  to_address(): Promise<Address> {
    return Promise.resolve(new BrowserAddress(this.wasm.to_address()))
  }

  static from_address(addr: BrowserAddress): Promise<RewardAddress | undefined> {
    return Promise.resolve(new BrowserRewardAddress(WasmV4.RewardAddress.from_address(addr.wasm)))
  }

  static new(network: number, payment: BrowserStakeCredential): Promise<RewardAddress> {
    return Promise.resolve(new BrowserRewardAddress(WasmV4.RewardAddress.new(network, payment.wasm)))
  }
}

export class BrowserRewardAddresses
  extends Ptr<WasmV4.RewardAddresses>
  implements RewardAddresses {

  len(): Promise<number> {
    return Promise.resolve(this.wasm.len())
  }

  get(index: number): Promise<RewardAddress> {
    return Promise.resolve(new BrowserRewardAddress(this.wasm.get(index)))
  }

  add(item: BrowserRewardAddress): Promise<void> {
    return Promise.resolve(this.wasm.add(item.wasm))
  }

  static new(): Promise<RewardAddresses> {
    return Promise.resolve(new BrowserRewardAddresses(WasmV4.RewardAddresses.new()))
  }
}

export class BrowserWithdrawals
  extends Ptr<WasmV4.Withdrawals>
  implements Withdrawals {

  len(): Promise<number> {
    return Promise.resolve(this.wasm.len()) 
  }

  insert(key: BrowserRewardAddress, value: BrowserBigNum): Promise<BigNum> {
    return Promise.resolve(new BrowserBigNum(this.wasm.insert(key.wasm, value.wasm)))
  }

  get(key: BrowserRewardAddress): Promise<BigNum | undefined> {
    return Promise.resolve(new BrowserBigNum(this.wasm.get(key.wasm)))
  }

  keys(): Promise<RewardAddresses> {
    return Promise.resolve(new BrowserRewardAddresses(this.wasm.keys()))
  }

  static new(): Promise<Withdrawals> {
    return Promise.resolve(new BrowserWithdrawals(WasmV4.Withdrawals.new()))
  }
}

export class BrowserTransactionInputs
  extends Ptr<WasmV4.TransactionInputs>
  implements TransactionInputs {

  len(): Promise<number> {
    return Promise.resolve(this.wasm.len())
  }
  
  get(index: number): Promise<TransactionInput> {
    return Promise.resolve(new BrowserTransactionInput(this.wasm.get(index)))
  }
}

export class BrowserTransactionOutputs
  extends Ptr<WasmV4.TransactionOutputs>
  implements TransactionOutputs {

  len(): Promise<number> {
    return Promise.resolve(this.wasm.len())
  }

  get(index: number): Promise<TransactionOutput> {
    return Promise.resolve(new BrowserTransactionOutput(this.wasm.get(index)))
  }
}

export type Optional<T> = T | undefined;

export class BrowserTransactionBody
  extends Ptr<WasmV4.TransactionBody>
  implements TransactionBody {

  to_bytes(): Promise<Uint8Array> {
    return Promise.resolve(this.wasm.to_bytes())
  }

  inputs(): Promise<TransactionInputs> {
    return Promise.resolve(new BrowserTransactionInputs(this.wasm.inputs()))
  }

  outputs(): Promise<TransactionOutputs> {
    return Promise.resolve(new BrowserTransactionOutputs(this.wasm.outputs()))
  }

  fee(): Promise<BigNum> {
    return Promise.resolve(new BrowserBigNum(this.wasm.fee()))
  }

  ttl(): Promise<Optional<number>> {
    return Promise.resolve(this.wasm.ttl())
  }

  certs(): Promise<Certificates> {
    return Promise.resolve(new BrowserCertificates(this.wasm.certs()))
  }

  withdrawals(): Promise<Withdrawals> {
    return Promise.resolve(new BrowserWithdrawals(this.wasm.withdrawals()))
  }

  static from_bytes(bytes: Uint8Array): Promise<TransactionBody> {
    return Promise.resolve(new BrowserTransactionBody(WasmV4.TransactionBody.from_bytes(bytes)))
  }
}

export class BrowserTransactionBuilder
  extends Ptr<WasmV4.TransactionBuilder>
  implements TransactionBuilder {

  add_key_input(
    hash: BrowserEd25519KeyHash,
    input: BrowserTransactionInput,
    amount: BrowserValue,
  ): Promise<void> {
    return Promise.resolve(this.wasm.add_key_input(hash.wasm, input.wasm, amount.wasm))
  }

  add_bootstrap_input(
    hash: BrowserByronAddress,
    input: BrowserTransactionInput,
    amount: BrowserValue,
  ): Promise<void> {
    return Promise.resolve(this.wasm.add_bootstrap_input(hash.wasm, input.wasm, amount.wasm))
  }

  add_input(
    address: BrowserAddress,
    input: BrowserTransactionInput,
    amount: BrowserValue,
  ): Promise<void> {
    return Promise.resolve(this.wasm.add_input(address.wasm, input.wasm, amount.wasm))
  }

  fee_for_input(
    address: BrowserAddress,
    input: BrowserTransactionInput,
    amount: BrowserValue,
  ): Promise<BigNum> {
    return Promise.resolve(new BrowserBigNum(this.wasm.fee_for_input(address.wasm, input.wasm, amount.wasm)))
  }

  add_output(output: BrowserTransactionOutput): Promise<void> {
    return Promise.resolve(this.wasm.add_output(output.wasm))
  }

  fee_for_output(output: BrowserTransactionOutput): Promise<BigNum> {
    return Promise.resolve(new BrowserBigNum(this.wasm.fee_for_output(output.wasm)))
  }

  set_fee(fee: BrowserBigNum): Promise<void> {
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

  set_certs(certs: BrowserCertificates): Promise<void> {
    return Promise.resolve(this.wasm.set_certs(certs.wasm))
  }

  set_withdrawals(withdrawals: BrowserWithdrawals): Promise<void> {
    return Promise.resolve(this.wasm.set_withdrawals(withdrawals.wasm))
  }

  set_auxiliary_data(auxiliary: BrowserAuxiliaryData): Promise<void> {
    return Promise.resolve(this.wasm.set_auxiliary_data(auxiliary.wasm))
  }

  get_explicit_input(): Promise<Value> {
    return Promise.resolve(new BrowserValue(this.wasm.get_explicit_input()))
  }

  get_implicit_input(): Promise<Value> {
    return Promise.resolve(new BrowserValue(this.wasm.get_implicit_input()))
  }

  get_explicit_output(): Promise<Value> {
    return Promise.resolve(new BrowserValue(this.wasm.get_explicit_output()))
  }

  get_deposit(): Promise<BigNum> {
    return Promise.resolve(new BrowserBigNum(this.wasm.get_deposit()))
  }

  get_fee_if_set(): Promise<BigNum> {
    return Promise.resolve(new BrowserBigNum(this.wasm.get_fee_if_set()))
  }

  add_change_if_needed(address: BrowserAddress): Promise<boolean> {
    return Promise.resolve(this.wasm.add_change_if_needed(address.wasm))
  }

  build(): Promise<TransactionBody> {
    return Promise.resolve(new BrowserTransactionBody(this.wasm.build()))
  }

  min_fee(): Promise<BigNum> {
    return Promise.resolve(new BrowserBigNum(this.wasm.min_fee()))
  }

  static new(
    linearFee: BrowserLinearFee,
    minimumUtxoVal: BrowserBigNum,
    poolDeposit: BrowserBigNum,
    keyDeposit: BrowserBigNum,
  ): Promise<TransactionBuilder> {
    return Promise.resolve(new BrowserTransactionBuilder(WasmV4.TransactionBuilder.new(
      linearFee.wasm,
      minimumUtxoVal.wasm,
      poolDeposit.wasm,
      keyDeposit.wasm
    )))
  }
}
