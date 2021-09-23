import * as WasmV4 from '@emurgo/cardano-serialization-lib-nodejs'
import { Address, AssetName, AssetNames, Assets, AuxiliaryData, BigNum, Bip32PublicKey, ByronAddress, Certificate, Certificates, Ed25519KeyHash, EXCEPTIONS, GeneralTransactionMetadata, LinearFee, MultiAsset, PolicyID, PolicyIDs, PublicKey, RewardAddress, RewardAddresses, ScriptHash, ScriptHashes, StakeCredential, StakeDelegation, StakeDeregistration, StakeRegistration, TransactionBody, TransactionBuilder, TransactionHash, TransactionInput, TransactionInputs, TransactionMetadatum, TransactionOutput, TransactionOutputs, Value, Withdrawals } from '../../yoroi-lib-core/src/wasm-contract'

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
      return Promise.resolve(new NodeJsTransactionMetadatum(wasm))
    },
    BigNum: NodeJsBigNum,
    LinearFee: NodeJsLinearFee,
    GeneralTransactionMetadata: NodeJsGeneralTransactionMetadata,
    TransactionMetadatum: NodeJsTransactionMetadatum,
    AuxiliaryData: NodeJsAuxiliaryData,
    AssetName: NodeJsAssetName,
    AssetNames: NodeJsAssetNames,
    Assets: NodeJsAssets,
    ScriptHash: NodeJsScriptHash,
    ScriptHashes: NodeJsScriptHashes,
    MultiAsset: NodeJsMultiAsset,
    Ed25519KeyHash: NodeJsEd25519KeyHash,
    TransactionHash: NodeJsTransactionHash,
    TransactionInput: NodeJsTransactionInput,
    Value: NodeJsValue,
    Address: NodeJsAddress,
    PublicKey: NodeJsPublicKey,
    Bip32PublicKey: NodeJsBip32PublicKey,
    ByronAddress: NodeJsByronAddress,
    TransactionOutput: NodeJsTransactionOutput,
    StakeCredential: NodeJsStakeCredential,
    StakeRegistration: NodeJsStakeRegistration,
    StakeDeregistration: NodeJsStakeDeregistration,
    StakeDelegation: NodeJsStakeDelegation,
    Certificate: NodeJsCertificate,
    Certificates: NodeJsCertificates,
    RewardAddress: NodeJsRewardAddress,
    RewardAddresses: NodeJsRewardAddresses,
    Withdrawals: NodeJsWithdrawals,
    TransactionInputs: NodeJsTransactionInputs,
    TransactionOutputs: NodeJsTransactionOutputs,
    TransactionBody: NodeJsTransactionBody,
    TransactionBuilder: NodeJsTransactionBuilder
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

class NodeJsBigNum extends Ptr<WasmV4.BigNum> implements BigNum {
  to_bytes(): Promise<Uint8Array> {
    return Promise.resolve(this.wasm.to_bytes())
  }
  to_str(): Promise<string> {
    return Promise.resolve(this.wasm.to_str())
  }
  checked_mul(other: NodeJsBigNum): Promise<BigNum> {
    const wasmBigNum = this.wasm.checked_mul(other.wasm)
    return Promise.resolve(new NodeJsBigNum(wasmBigNum))
  }
  checked_add(other: NodeJsBigNum): Promise<BigNum> {
    const wasmBigNum = this.wasm.checked_add(other.wasm)
    return Promise.resolve(new NodeJsBigNum(wasmBigNum))
  }
  checked_sub(other: NodeJsBigNum): Promise<BigNum> {
    const wasmBigNum = this.wasm.checked_sub(other.wasm)
    return Promise.resolve(new NodeJsBigNum(wasmBigNum))
  }
  clamped_sub(other: NodeJsBigNum): Promise<BigNum> {
    const wasmBigNum = this.wasm.clamped_sub(other.wasm)
    return Promise.resolve(new NodeJsBigNum(wasmBigNum))
  }
  compare(rhs_value: NodeJsBigNum): Promise<number> {
    return Promise.resolve(this.wasm.compare(rhs_value.wasm))
  }

  static from_bytes(bytes: Uint8Array): Promise<BigNum> {
    return Promise.resolve(new NodeJsBigNum(WasmV4.BigNum.from_bytes(bytes)))
  }

  static from_str(string: string): Promise<BigNum> {
    return Promise.resolve(new NodeJsBigNum(WasmV4.BigNum.from_str(string)))
  }
}

class NodeJsLinearFee extends Ptr<WasmV4.LinearFee> implements LinearFee {
  free(): Promise<void> {
    return Promise.resolve(this.wasm.free())
  }  
  constant(): Promise<BigNum> {
    return Promise.resolve(new NodeJsBigNum(this.wasm.constant()))
  }
  coefficient(): Promise<BigNum> {
    return Promise.resolve(new NodeJsBigNum(this.wasm.coefficient()))
  }
  static new(coefficient: NodeJsBigNum, constant: NodeJsBigNum): Promise<LinearFee> {
    const wasmLinearFee = WasmV4.LinearFee.new(coefficient.wasm, constant.wasm)
    return Promise.resolve(new NodeJsLinearFee(wasmLinearFee))
  }
}

class NodeJsGeneralTransactionMetadata
  extends Ptr<WasmV4.GeneralTransactionMetadata>
  implements GeneralTransactionMetadata {

  insert(key: NodeJsBigNum, value: NodeJsTransactionMetadatum): Promise<TransactionMetadatum | undefined> {
    const wasm = this.wasm.insert(key.wasm, value.wasm)
    if (wasm) {
      return Promise.resolve(new NodeJsTransactionMetadatum(wasm))
    }
  }

  get(key: NodeJsBigNum): Promise<TransactionMetadatum | undefined> {
    const wasm = this.wasm.get(key.wasm)
    if (!wasm) return;
    return Promise.resolve(new NodeJsTransactionMetadatum(wasm))
  }

  static new(): Promise<GeneralTransactionMetadata> {
    const wasm = WasmV4.GeneralTransactionMetadata.new()
    return Promise.resolve(new NodeJsGeneralTransactionMetadata(wasm))
  }
}

class NodeJsTransactionMetadatum
  extends Ptr<WasmV4.TransactionMetadatum>
  implements TransactionMetadatum {

  to_bytes(): Promise<Uint8Array> {
    return Promise.resolve(this.wasm.to_bytes())
  }
}

class NodeJsAuxiliaryData
  extends Ptr<WasmV4.AuxiliaryData>
  implements AuxiliaryData {

  metadata(): Promise<GeneralTransactionMetadata> {
    const wasm = this.wasm.metadata()
    return Promise.resolve(new NodeJsGeneralTransactionMetadata(wasm))
  }

  static new(metadata: NodeJsGeneralTransactionMetadata): Promise<AuxiliaryData> {
    const wasm = WasmV4.AuxiliaryData.new()
    wasm.set_metadata(metadata.wasm)
    return Promise.resolve(new NodeJsAuxiliaryData(wasm))
  }
}

class NodeJsAssetName
  extends Ptr<WasmV4.AssetName>
  implements AssetName {

  to_bytes(): Promise<Uint8Array> {
    return Promise.resolve(this.wasm.to_bytes())
  }
  name(): Promise<Uint8Array> {
    return Promise.resolve(this.wasm.name())
  }

  static from_bytes(bytes: Uint8Array): Promise<AssetName> {
    return Promise.resolve(new NodeJsAssetName(WasmV4.AssetName.from_bytes(bytes)))
  }

  static new(name: Uint8Array): Promise<AssetName> {
   return Promise.resolve(new NodeJsAssetName(WasmV4.AssetName.new(name)))
  }
}

class NodeJsAssetNames
  extends Ptr<WasmV4.AssetNames>
  implements AssetNames {

  len(): Promise<number> {
    return Promise.resolve(this.wasm.len())
  }

  get(index: number): Promise<AssetName> {
    return Promise.resolve(new NodeJsAssetName(this.wasm.get(index)))
  }

  add(item: NodeJsAssetName): Promise<void> {
    return Promise.resolve(this.wasm.add(item.wasm))
  }

  static new(): Promise<AssetNames> {
    return Promise.resolve(new NodeJsAssetNames(WasmV4.AssetNames.new()))
  }
}

class NodeJsAssets
  extends Ptr<WasmV4.Assets>
  implements Assets {

  len(): Promise<number> {
    return Promise.resolve(this.wasm.len())
  }

  insert(key: NodeJsAssetName, value: NodeJsBigNum): Promise<BigNum> {
    return Promise.resolve(new NodeJsBigNum(this.wasm.insert(key.wasm, value.wasm)))
  }

  get(key: NodeJsAssetName): Promise<BigNum | undefined> {
    return Promise.resolve(new NodeJsBigNum(this.wasm.get(key.wasm)))
  }

  keys(): Promise<AssetNames> {
    return Promise.resolve(new NodeJsAssetNames(this.wasm.keys()))
  }

  static new(): Promise<Assets> {
    return Promise.resolve(new NodeJsAssets(WasmV4.Assets.new()))
  }
}

class NodeJsScriptHash
  extends WasmProxy<WasmV4.ScriptHash>
  implements ScriptHash {

  to_bytes(): Promise<Uint8Array> {
    return Promise.resolve(this.wasm.to_bytes())
  }

  static from_bytes(bytes: Uint8Array): Promise<ScriptHash> {
    return Promise.resolve(new NodeJsScriptHash(WasmV4.ScriptHash.from_bytes(bytes)))
  }
}

class NodeJsScriptHashes
  extends WasmProxy<WasmV4.ScriptHashes>
  implements ScriptHashes {

  to_bytes(): Promise<Uint8Array> {
    return Promise.resolve(this.wasm.to_bytes())
  }

  len(): Promise<number> {
    return Promise.resolve(this.wasm.len())
  }

  get(index: number): Promise<ScriptHash> {
    return Promise.resolve(new NodeJsScriptHash(this.wasm.get(index)))
  }

  add(item: NodeJsScriptHash): Promise<void> {
    return Promise.resolve(this.wasm.add(item.wasm))
  }

  static from_bytes(bytes: Uint8Array): Promise<ScriptHashes> {
    return Promise.resolve(new NodeJsScriptHashes(WasmV4.ScriptHashes.from_bytes(bytes)))
  }

  static new(): Promise<ScriptHashes> {
    return Promise.resolve(new NodeJsScriptHashes(WasmV4.ScriptHashes.new()))
  }
}

type NodeJsPolicyID = NodeJsScriptHash

type NodeJsPolicyIDs = NodeJsScriptHashes

class NodeJsMultiAsset
  extends Ptr<WasmV4.MultiAsset>
  implements MultiAsset {

  len(): Promise<number> {
    return Promise.resolve(this.wasm.len())
  }

  insert(key: NodeJsPolicyID, value: NodeJsAssets): Promise<Assets> {
    return Promise.resolve(new NodeJsAssets(this.wasm.insert(key.wasm, value.wasm)))
  }

  get(key: NodeJsPolicyID): Promise<Assets | undefined> {
    return Promise.resolve(new NodeJsAssets(this.wasm.get(key.wasm)))
  }

  keys(): Promise<PolicyIDs> {
    return Promise.resolve(new NodeJsScriptHashes(this.wasm.keys()))
  }

  sub(rhs: NodeJsMultiAsset): Promise<MultiAsset> {
    return Promise.resolve(new NodeJsMultiAsset(this.wasm.sub(rhs.wasm)))
  }

  static new(): Promise<MultiAsset> {
    return Promise.resolve(new NodeJsMultiAsset(WasmV4.MultiAsset.new()))
  }
}

export class NodeJsEd25519KeyHash
  extends Ptr<WasmV4.Ed25519KeyHash>
  implements Ed25519KeyHash {

  to_bytes(): Promise<Uint8Array> {
    return Promise.resolve(this.wasm.to_bytes())
  }

  static from_bytes(bytes: Uint8Array): Promise<Ed25519KeyHash> {
    return Promise.resolve(new NodeJsEd25519KeyHash(WasmV4.Ed25519KeyHash.from_bytes(bytes)))
  }
}

export class NodeJsTransactionHash
  extends Ptr<WasmV4.TransactionHash>
  implements TransactionHash {

  to_bytes(): Promise<Uint8Array> {
    return Promise.resolve(this.wasm.to_bytes())
  }

  static from_bytes(bytes: Uint8Array): Promise<TransactionHash> {
    return Promise.resolve(new NodeJsTransactionHash(WasmV4.TransactionHash.from_bytes(bytes)))
  }
}

export class NodeJsTransactionInput
  extends Ptr<WasmV4.TransactionInput>
  implements TransactionInput {

  to_bytes(): Promise<Uint8Array> {
    return Promise.resolve(this.wasm.to_bytes())
  }

  transaction_id(): Promise<TransactionHash> {
    return Promise.resolve(new NodeJsTransactionHash(this.wasm.transaction_id()))
  }

  index(): Promise<number> {
    return Promise.resolve(this.wasm.index())
  }

  static new(transactionId: NodeJsTransactionHash, index: number): Promise<TransactionInput> {
    return Promise.resolve(new NodeJsTransactionInput(WasmV4.TransactionInput.new(transactionId.wasm, index)))
  }

  static from_bytes(bytes: Uint8Array): Promise<TransactionInput> {
    return Promise.resolve(new NodeJsTransactionInput(WasmV4.TransactionInput.from_bytes(bytes)))
  }
}

export class NodeJsValue
  extends Ptr<WasmV4.Value>
  implements Value {

  coin(): Promise<BigNum> {
    return Promise.resolve(new NodeJsBigNum(this.wasm.coin()))
  }

  set_coin(coin: NodeJsBigNum): Promise<void> {
    return Promise.resolve(this.wasm.set_coin(coin.wasm))
  }

  multiasset(): Promise<MultiAsset | undefined> {
    return Promise.resolve(new NodeJsMultiAsset(this.wasm.multiasset()))
  }

  set_multiasset(multiasset: NodeJsMultiAsset): Promise<void> {
    return Promise.resolve(this.wasm.set_multiasset(multiasset.wasm))
  }

  checked_add(rhs: NodeJsValue): Promise<Value> {
    return Promise.resolve(new NodeJsValue(this.wasm.checked_add(rhs.wasm)))
  }

  checked_sub(rhs: NodeJsValue): Promise<Value> {
    return Promise.resolve(new NodeJsValue(this.wasm.checked_sub(rhs.wasm)))
  }

  clamped_sub(rhs: NodeJsValue): Promise<Value> {
    return Promise.resolve(new NodeJsValue(this.wasm.clamped_sub(rhs.wasm)))
  }

  compare(rhs: NodeJsValue): Promise<number> {
    return Promise.resolve(this.wasm.compare(rhs.wasm))
  }

  static new(coin: NodeJsBigNum): Promise<Value> {
    return Promise.resolve(new NodeJsValue(WasmV4.Value.new(coin.wasm)))
  }
}

export class NodeJsAddress
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
    return Promise.resolve(new NodeJsAddress(WasmV4.Address.from_bytes(bytes)))
  }

  static from_bech32(string: string) : Promise<Address> {
    return Promise.resolve(new NodeJsAddress(WasmV4.Address.from_bech32(string)))
  }
}

export class NodeJsPublicKey
  extends Ptr<WasmV4.PublicKey>
  implements PublicKey {

  to_bech32(): Promise<string> {
    return Promise.resolve(this.wasm.to_bech32())
  }

  as_bytes(): Promise<Uint8Array> {
    return Promise.resolve(this.wasm.as_bytes())
  }

  hash(): Promise<Ed25519KeyHash> {
    return Promise.resolve(new NodeJsEd25519KeyHash(this.wasm.hash()))
  }

  static from_bech32(bech32_str: string): Promise<PublicKey> {
    return Promise.resolve(new NodeJsPublicKey(WasmV4.PublicKey.from_bech32(bech32_str)))
  }

  static from_bytes(bytes: Uint8Array): Promise<PublicKey> {
    return Promise.resolve(new NodeJsPublicKey(WasmV4.PublicKey.from_bytes(bytes)))
  }
}

export class NodeJsBip32PublicKey
  extends Ptr<WasmV4.Bip32PublicKey>
  implements Bip32PublicKey {

  derive(index: number): Promise<Bip32PublicKey> {
    return Promise.resolve(new NodeJsBip32PublicKey(this.wasm.derive(index)))
  }

  to_raw_key(): Promise<PublicKey> {
    return Promise.resolve(new NodeJsPublicKey(this.wasm.to_raw_key()))
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
    return Promise.resolve(new NodeJsBip32PublicKey(WasmV4.Bip32PublicKey.from_bech32(bech32_str)))
  }

  static from_bytes(bytes: Uint8Array): Promise<Bip32PublicKey> {
    return Promise.resolve(new NodeJsBip32PublicKey(WasmV4.Bip32PublicKey.from_bytes(bytes)))
  }
}

export class NodeJsByronAddress
  extends Ptr<WasmV4.ByronAddress>
  implements ByronAddress {

  to_base58(): Promise<string> {
    return Promise.resolve(this.wasm.to_base58())
  }

  to_address(): Promise<Address> {
    return Promise.resolve(new NodeJsAddress(this.wasm.to_address()))
  }

  byron_protocol_magic(): Promise<number> {
    return Promise.resolve(this.wasm.byron_protocol_magic())
  }

  attributes(): Promise<Uint8Array> {
    return Promise.resolve(this.wasm.attributes())
  }

  icarus_from_key(key: NodeJsBip32PublicKey, protocolMagic: number): Promise<ByronAddress> {
    throw EXCEPTIONS.NOT_IMPLEMENTED
  }

  static from_base58(string: string): Promise<ByronAddress> {
    return Promise.resolve(new NodeJsByronAddress(WasmV4.ByronAddress.from_base58(string)))
  }

  static is_valid(string: string): Promise<boolean> {
    return Promise.resolve(WasmV4.ByronAddress.is_valid(string))
  }

  static from_address(addr: NodeJsAddress): Promise<ByronAddress | undefined> {
    return Promise.resolve(new NodeJsByronAddress(WasmV4.ByronAddress.from_address(addr.wasm)))
  }
}

export class NodeJsTransactionOutput
  extends Ptr<WasmV4.TransactionOutput>
  implements TransactionOutput {

  to_bytes(): Promise<Uint8Array> {
    return Promise.resolve(this.wasm.to_bytes())
  }

  address(): Promise<Address> {
    return Promise.resolve(new NodeJsAddress(this.wasm.address()))
  }

  amount(): Promise<Value> {
    return Promise.resolve(new NodeJsValue(this.wasm.amount()))
  }

  static from_bytes(bytes: Uint8Array): Promise<TransactionOutput> {
    return Promise.resolve(new NodeJsTransactionOutput(WasmV4.TransactionOutput.from_bytes(bytes)))
  }

  static new(address: NodeJsAddress, amount: NodeJsValue): Promise<TransactionOutput> {
    return Promise.resolve(new NodeJsTransactionOutput(WasmV4.TransactionOutput.new(address.wasm, amount.wasm)))
  }
}

export class NodeJsStakeCredential
  extends Ptr<WasmV4.StakeCredential>
  implements StakeCredential {

  to_bytes(): Promise<Uint8Array> {
    return Promise.resolve(this.wasm.to_bytes())
  }

  to_keyhash(): Promise<Ed25519KeyHash | undefined> {
    return Promise.resolve(new NodeJsEd25519KeyHash(this.wasm.to_keyhash()))
  }

  to_scripthash(): Promise<ScriptHash | undefined> {
    return Promise.resolve(new NodeJsScriptHash(this.wasm.to_scripthash()))
  }

  kind(): Promise<number> {
    return Promise.resolve(this.wasm.kind())
  }

  static from_bytes(bytes: Uint8Array): Promise<StakeCredential> {
    return Promise.resolve(new NodeJsStakeCredential(WasmV4.StakeCredential.from_bytes(bytes)))
  }

  static from_keyhash(hash: NodeJsEd25519KeyHash): Promise<StakeCredential> {
    return Promise.resolve(new NodeJsStakeCredential(WasmV4.StakeCredential.from_keyhash(hash.wasm)))
  }

  static from_scripthash(hash: NodeJsScriptHash): Promise<StakeCredential> {
    return Promise.resolve(new NodeJsStakeCredential(WasmV4.StakeCredential.from_scripthash(hash.wasm)))
  }
}

export class NodeJsStakeRegistration
  extends Ptr<WasmV4.StakeRegistration>
  implements StakeRegistration {

  to_bytes(): Promise<Uint8Array> {
    return Promise.resolve(this.wasm.to_bytes())
  }

  stake_credential(): Promise<StakeCredential> {
    return Promise.resolve(new NodeJsStakeCredential(this.wasm.stake_credential()))
  }

  static new(stakeCredential: NodeJsStakeCredential): Promise<StakeRegistration> {
    return Promise.resolve(new NodeJsStakeRegistration(WasmV4.StakeRegistration.new(stakeCredential.wasm)))
  }

  static from_bytes(bytes: Uint8Array): Promise<StakeRegistration> {
    return Promise.resolve(new NodeJsStakeRegistration(WasmV4.StakeRegistration.from_bytes(bytes)))
  }
}

export class NodeJsStakeDeregistration
  extends Ptr<WasmV4.StakeDeregistration>
  implements StakeDeregistration {

  to_bytes(): Promise<Uint8Array> {
    return Promise.resolve(this.wasm.to_bytes())
  }

  stake_credential(): Promise<StakeCredential> {
    return Promise.resolve(new NodeJsStakeCredential(this.wasm.stake_credential()))
  }

  static new(stakeCredential: NodeJsStakeCredential): Promise<StakeDeregistration> {
    return Promise.resolve(new NodeJsStakeDeregistration(WasmV4.StakeDeregistration.new(stakeCredential.wasm)))
  }

  static from_bytes(bytes: Uint8Array): Promise<StakeDeregistration> {
    return Promise.resolve(new NodeJsStakeDeregistration(WasmV4.StakeDeregistration.from_bytes(bytes)))
  }
}

export class NodeJsStakeDelegation
  extends Ptr<WasmV4.StakeDelegation>
  implements StakeDelegation {

  to_bytes(): Promise<Uint8Array> {
    return Promise.resolve(this.wasm.to_bytes())
  }

  stake_credential(): Promise<StakeCredential> {
    return Promise.resolve(new NodeJsStakeCredential(this.wasm.stake_credential()))
  }

  pool_keyhash(): Promise<Ed25519KeyHash> {
    return Promise.resolve(new NodeJsEd25519KeyHash(this.wasm.pool_keyhash()))
  }

  static new(
    stakeCredential: NodeJsStakeCredential,
    poolKeyHash: NodeJsEd25519KeyHash,
  ): Promise<StakeDelegation> {
    return Promise.resolve(new NodeJsStakeDelegation(WasmV4.StakeDelegation.new(stakeCredential.wasm, poolKeyHash.wasm)))
  }

  static from_bytes(bytes: Uint8Array): Promise<StakeDelegation> {
    return Promise.resolve(new NodeJsStakeDelegation(WasmV4.StakeDelegation.from_bytes(bytes)))
  }
}

export class NodeJsCertificate
  extends Ptr<WasmV4.Certificate>
  implements Certificate {

  to_bytes(): Promise<Uint8Array> {
    return Promise.resolve(this.wasm.to_bytes())
  }

  as_stake_registration(): Promise<StakeRegistration | undefined> {
    return Promise.resolve(new NodeJsStakeRegistration(this.wasm.as_stake_registration()))
  }

  as_stake_deregistration(): Promise<StakeDeregistration | undefined> {
    return Promise.resolve(new NodeJsStakeDeregistration(this.wasm.as_stake_deregistration()))
  }

  as_stake_delegation(): Promise<StakeDelegation | undefined> {
    return Promise.resolve(new NodeJsStakeDelegation(this.wasm.as_stake_delegation()))
  }

  static from_bytes(bytes: Uint8Array): Promise<Certificate> {
    return Promise.resolve(new NodeJsCertificate(WasmV4.Certificate.from_bytes(bytes)))
  }

  static new_stake_registration(stakeRegistration: NodeJsStakeRegistration): Promise<Certificate> {
    return Promise.resolve(new NodeJsCertificate(WasmV4.Certificate.new_stake_registration(stakeRegistration.wasm)))
  }

  static new_stake_deregistration(stakeDeregistration: NodeJsStakeDeregistration): Promise<Certificate> {
    return Promise.resolve(new NodeJsCertificate(WasmV4.Certificate.new_stake_deregistration(stakeDeregistration.wasm)))
  }

  static new_stake_delegation(stakeDelegation: NodeJsStakeDelegation): Promise<Certificate> {
    return Promise.resolve(new NodeJsCertificate(WasmV4.Certificate.new_stake_delegation(stakeDelegation.wasm)))
  }
}

export class NodeJsCertificates
  extends Ptr<WasmV4.Certificates>
  implements Certificates {

  to_bytes(): Promise<Uint8Array> {
    return Promise.resolve(this.wasm.to_bytes())
  }

  len(): Promise<number> {
    return Promise.resolve(this.wasm.len())
  }

  get(index: number): Promise<Certificate> {
    return Promise.resolve(new NodeJsCertificate(this.wasm.get(index)))
  }

  add(item: NodeJsCertificate): Promise<void> {
    return Promise.resolve(this.wasm.add(item.wasm))
  }

  static from_bytes(bytes: Uint8Array): Promise<Certificates> {
    return Promise.resolve(new NodeJsCertificates(WasmV4.Certificates.from_bytes(bytes)))
  }

  static new(): Promise<Certificates> {
    return Promise.resolve(new NodeJsCertificates(WasmV4.Certificates.new()))
  }
}

export class NodeJsRewardAddress
  extends Ptr<WasmV4.RewardAddress>
  implements RewardAddress {

  payment_cred(): Promise<StakeCredential> {
    return Promise.resolve(new NodeJsStakeCredential(this.wasm.payment_cred()))
  }

  to_address(): Promise<Address> {
    return Promise.resolve(new NodeJsAddress(this.wasm.to_address()))
  }

  static from_address(addr: NodeJsAddress): Promise<RewardAddress | undefined> {
    return Promise.resolve(new NodeJsRewardAddress(WasmV4.RewardAddress.from_address(addr.wasm)))
  }

  static new(network: number, payment: NodeJsStakeCredential): Promise<RewardAddress> {
    return Promise.resolve(new NodeJsRewardAddress(WasmV4.RewardAddress.new(network, payment.wasm)))
  }
}

export class NodeJsRewardAddresses
  extends Ptr<WasmV4.RewardAddresses>
  implements RewardAddresses {

  len(): Promise<number> {
    return Promise.resolve(this.wasm.len())
  }

  get(index: number): Promise<RewardAddress> {
    return Promise.resolve(new NodeJsRewardAddress(this.wasm.get(index)))
  }

  add(item: NodeJsRewardAddress): Promise<void> {
    return Promise.resolve(this.wasm.add(item.wasm))
  }

  static new(): Promise<RewardAddresses> {
    return Promise.resolve(new NodeJsRewardAddresses(WasmV4.RewardAddresses.new()))
  }
}

export class NodeJsWithdrawals
  extends Ptr<WasmV4.Withdrawals>
  implements Withdrawals {

  len(): Promise<number> {
    return Promise.resolve(this.wasm.len()) 
  }

  insert(key: NodeJsRewardAddress, value: NodeJsBigNum): Promise<BigNum> {
    return Promise.resolve(new NodeJsBigNum(this.wasm.insert(key.wasm, value.wasm)))
  }

  get(key: NodeJsRewardAddress): Promise<BigNum | undefined> {
    return Promise.resolve(new NodeJsBigNum(this.wasm.get(key.wasm)))
  }

  keys(): Promise<RewardAddresses> {
    return Promise.resolve(new NodeJsRewardAddresses(this.wasm.keys()))
  }

  static new(): Promise<Withdrawals> {
    return Promise.resolve(new NodeJsWithdrawals(WasmV4.Withdrawals.new()))
  }
}

export class NodeJsTransactionInputs
  extends Ptr<WasmV4.TransactionInputs>
  implements TransactionInputs {

  len(): Promise<number> {
    return Promise.resolve(this.wasm.len())
  }
  
  get(index: number): Promise<TransactionInput> {
    return Promise.resolve(new NodeJsTransactionInput(this.wasm.get(index)))
  }
}

export class NodeJsTransactionOutputs
  extends Ptr<WasmV4.TransactionOutputs>
  implements TransactionOutputs {

  len(): Promise<number> {
    return Promise.resolve(this.wasm.len())
  }

  get(index: number): Promise<TransactionOutput> {
    return Promise.resolve(new NodeJsTransactionOutput(this.wasm.get(index)))
  }
}

export type Optional<T> = T | undefined;

export class NodeJsTransactionBody
  extends Ptr<WasmV4.TransactionBody>
  implements TransactionBody {

  to_bytes(): Promise<Uint8Array> {
    return Promise.resolve(this.wasm.to_bytes())
  }

  inputs(): Promise<TransactionInputs> {
    return Promise.resolve(new NodeJsTransactionInputs(this.wasm.inputs()))
  }

  outputs(): Promise<TransactionOutputs> {
    return Promise.resolve(new NodeJsTransactionOutputs(this.wasm.outputs()))
  }

  fee(): Promise<BigNum> {
    return Promise.resolve(new NodeJsBigNum(this.wasm.fee()))
  }

  ttl(): Promise<Optional<number>> {
    return Promise.resolve(this.wasm.ttl())
  }

  certs(): Promise<Certificates> {
    return Promise.resolve(new NodeJsCertificates(this.wasm.certs()))
  }

  withdrawals(): Promise<Withdrawals> {
    return Promise.resolve(new NodeJsWithdrawals(this.wasm.withdrawals()))
  }

  static from_bytes(bytes: Uint8Array): Promise<TransactionBody> {
    return Promise.resolve(new NodeJsTransactionBody(WasmV4.TransactionBody.from_bytes(bytes)))
  }
}

export class NodeJsTransactionBuilder
  extends Ptr<WasmV4.TransactionBuilder>
  implements TransactionBuilder {

  add_key_input(
    hash: NodeJsEd25519KeyHash,
    input: NodeJsTransactionInput,
    amount: NodeJsValue,
  ): Promise<void> {
    return Promise.resolve(this.wasm.add_key_input(hash.wasm, input.wasm, amount.wasm))
  }

  add_bootstrap_input(
    hash: NodeJsByronAddress,
    input: NodeJsTransactionInput,
    amount: NodeJsValue,
  ): Promise<void> {
    return Promise.resolve(this.wasm.add_bootstrap_input(hash.wasm, input.wasm, amount.wasm))
  }

  add_input(
    address: NodeJsAddress,
    input: NodeJsTransactionInput,
    amount: NodeJsValue,
  ): Promise<void> {
    return Promise.resolve(this.wasm.add_input(address.wasm, input.wasm, amount.wasm))
  }

  fee_for_input(
    address: NodeJsAddress,
    input: NodeJsTransactionInput,
    amount: NodeJsValue,
  ): Promise<BigNum> {
    return Promise.resolve(new NodeJsBigNum(this.wasm.fee_for_input(address.wasm, input.wasm, amount.wasm)))
  }

  add_output(output: NodeJsTransactionOutput): Promise<void> {
    return Promise.resolve(this.wasm.add_output(output.wasm))
  }

  fee_for_output(output: NodeJsTransactionOutput): Promise<BigNum> {
    return Promise.resolve(new NodeJsBigNum(this.wasm.fee_for_output(output.wasm)))
  }

  set_fee(fee: NodeJsBigNum): Promise<void> {
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

  set_certs(certs: NodeJsCertificates): Promise<void> {
    return Promise.resolve(this.wasm.set_certs(certs.wasm))
  }

  set_withdrawals(withdrawals: NodeJsWithdrawals): Promise<void> {
    return Promise.resolve(this.wasm.set_withdrawals(withdrawals.wasm))
  }

  set_auxiliary_data(auxiliary: NodeJsAuxiliaryData): Promise<void> {
    return Promise.resolve(this.wasm.set_auxiliary_data(auxiliary.wasm))
  }

  get_explicit_input(): Promise<Value> {
    return Promise.resolve(new NodeJsValue(this.wasm.get_explicit_input()))
  }

  get_implicit_input(): Promise<Value> {
    return Promise.resolve(new NodeJsValue(this.wasm.get_implicit_input()))
  }

  get_explicit_output(): Promise<Value> {
    return Promise.resolve(new NodeJsValue(this.wasm.get_explicit_output()))
  }

  get_deposit(): Promise<BigNum> {
    return Promise.resolve(new NodeJsBigNum(this.wasm.get_deposit()))
  }

  get_fee_if_set(): Promise<BigNum> {
    return Promise.resolve(new NodeJsBigNum(this.wasm.get_fee_if_set()))
  }

  add_change_if_needed(address: NodeJsAddress): Promise<boolean> {
    return Promise.resolve(this.wasm.add_change_if_needed(address.wasm))
  }

  build(): Promise<TransactionBody> {
    return Promise.resolve(new NodeJsTransactionBody(this.wasm.build()))
  }

  min_fee(): Promise<BigNum> {
    return Promise.resolve(new NodeJsBigNum(this.wasm.min_fee()))
  }

  static new(
    linearFee: NodeJsLinearFee,
    minimumUtxoVal: NodeJsBigNum,
    poolDeposit: NodeJsBigNum,
    keyDeposit: NodeJsBigNum,
  ): Promise<TransactionBuilder> {
    return Promise.resolve(new NodeJsTransactionBuilder(WasmV4.TransactionBuilder.new(
      linearFee.wasm,
      minimumUtxoVal.wasm,
      poolDeposit.wasm,
      keyDeposit.wasm
    )))
  }
}
