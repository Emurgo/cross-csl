import { Addressing, AddressingAddress, Bip44DerivationLevels, CardanoAddressedUtxo } from "../models"
import { Address, Certificates, MultiAsset, TransactionOutputs, Withdrawals } from "../wasm-contract"
import { toHexOrBase58 } from "./addresses"
import * as WasmContract from '../wasm-contract'
// import { bech32 } from 'bech32'

import {
  Certificate as LedgerCertificate,
  AssetGroup as LedgerAssetGroup,
  TxOutputDestinationType,
  AddressType as LedgerAddressType,
  Token as LedgerToken,
  CertificateType as LedgerCertificateType,
  StakeCredentialParamsType as LedgerStakeCredentialParamsType,
  TxOutput as LedgerTxOutput,
  TxInput as LedgerTxInput,
  DeviceOwnedAddress as LedgerDeviceOwnedAddress,
  Withdrawal as LedgerWithdrawal
} from '@cardano-foundation/ledgerjs-hw-app-cardano'

export const transformToLedgerInputs = (
  inputs: Array<CardanoAddressedUtxo>
): Array<LedgerTxInput> => {
  for (const input of inputs) {
    verifyFromBip44Root(input.addressing)
  }
  return inputs.map(input => ({
    txHashHex: input.txHash,
    outputIndex: input.txIndex,
    path: input.addressing.path,
  }))
}

// const areAddressesTheSame = async (
//   wasm: WasmContract.WasmModuleProxy,
//   addr1: string,
//   addr2: string
// ) => {
//   const addrToHex = async (addr: string) => {
//     const addrBech32 = bech32.decodeUnsafe(addr, addr.length)
//     let hex: string
//     if (addrBech32) {
//       hex = Buffer.from(bech32.fromWords(addrBech32.words)).toString('hex')
//     } else if (await wasm.ByronAddress.isValid(addr)) {
//       hex = Buffer.from(await wasm.ByronAddress.fromBase58(addr)
//         .then(b => b.toAddress())
//         .then(a => a.toBytes())).toString('hex')
//     } else if (/^[0-9a-f]+$/i.test(addr.toLowerCase())) {
//       hex = addr
//     } else {
//       throw new Error('compareAddresses::addrToHex: unexpected address format - should be either hex, base58 (Byron) or bech32')
//     }
//     return hex.toLowerCase()
//   }
//   const addr1Hex = await addrToHex(addr1)
//   const addr2Hex = await addrToHex(addr2)
//   return addr1Hex === addr2Hex
// }

export const transformToLedgerOutputs = async (
  wasm: WasmContract.WasmModuleProxy,
  request: {
    networkId: number,
    txOutputs: TransactionOutputs,
    changeAddrs: Array<AddressingAddress>,
    stakingDerivationPath?: number[],
  }
): Promise<Array<LedgerTxOutput>> => {
  const result = []
  for (let i = 0; i < (await request.txOutputs.len()); i++) {
    const output = await request.txOutputs.get(i)
    const address = await output.address()
    const jsAddr = await toHexOrBase58(wasm, await output.address())

    const changeAddr = request.changeAddrs.find(change => jsAddr === change.address)
    if (changeAddr != null) {
      verifyFromBip44Root(changeAddr.addressing)
      const addressParams = await toLedgerAddressParameters(
        wasm, {
        networkId: request.networkId,
        address,
        path: changeAddr.addressing.path,
        stakingDerivationPath: request.stakingDerivationPath,
      })
      const ledgerOutput: LedgerTxOutput = {
        amount: await output.amount().then(x => x.coin()).then(x => x.toStr()),
        tokenBundle: await toLedgerTokenBundle(await output.amount().then(x => x.multiasset())),
        destination: {
          type: TxOutputDestinationType.DEVICE_OWNED,
          params: addressParams,
        },
      }
      result.push(ledgerOutput)
    } else {
      const ledgerOutput: LedgerTxOutput = {
        amount: await output.amount().then(x => x.coin()).then(x => x.toStr()),
        tokenBundle: await toLedgerTokenBundle(await output.amount().then(x => x.multiasset())),
        destination: {
          type: TxOutputDestinationType.THIRD_PARTY,
          params: {
            addressHex: Buffer.from(await address.toBytes()).toString('hex'),
          },
        }
      }
      result.push(ledgerOutput)
    }
  }
  return result
}

export const verifyFromBip44Root = (addressing: Addressing): void => {
  const accountPosition = addressing.startLevel
  if (accountPosition !== Bip44DerivationLevels.PURPOSE.level) {
    throw new Error(`verifyFromBip44Root addressing does not start from root`)
  }
  const lastLevelSpecified = addressing.startLevel + addressing.path.length - 1
  if (lastLevelSpecified !== Bip44DerivationLevels.ADDRESS.level) {
    throw new Error(`verifyFromBip44Root incorrect addressing size`)
  }
}


export const toLedgerAddressParameters = async (
  wasm: WasmContract.WasmModuleProxy,
  request: {
    networkId: number,
    address: Address,
    path: Array<number>,
    stakingDerivationPath?: number[],
  }
): Promise<LedgerDeviceOwnedAddress> => {
  {
    const byronAddr = await wasm.ByronAddress.fromAddress(request.address)
    if (byronAddr.hasValue()) {
      return {
        type: LedgerAddressType.BYRON,
        params: {
          spendingPath: request.path,
        },
      }
    }
  }
  {
    const baseAddr = await wasm.BaseAddress.fromAddress(request.address)
    if (baseAddr.hasValue()) {
      if (!request.stakingDerivationPath) {
        const stakeCred = await baseAddr.stakeCred()
        const wasmHash = (await stakeCred.toKeyhash()) ?? (await stakeCred.toScripthash())
        if (!wasmHash.hasValue()) {
          throw new Error(`toLedgerAddressParameters unknown hash type`)
        }
        const hashInAddress = Buffer.from(await wasmHash.toBytes()).toString('hex')

        return {
          // can't always know staking key path since address may not belong to the wallet
          // (mangled address)
          type: LedgerAddressType.BASE_PAYMENT_KEY_STAKE_KEY,
          params: {
            spendingPath: request.path,
            stakingKeyHashHex: hashInAddress,
          },
        }
      }
      return {
        type: LedgerAddressType.BASE_PAYMENT_KEY_STAKE_KEY,
        params: {
          spendingPath: request.path,
          stakingPath: request.stakingDerivationPath,
        },
      }
    }
  }
  {
    const ptrAddr = await wasm.PointerAddress.fromAddress(request.address)
    if (ptrAddr) {
      const pointer = await ptrAddr.stakePointer()
      return {
        type: LedgerAddressType.POINTER_KEY,
        params: {
          spendingPath: request.path,
          stakingBlockchainPointer: {
            blockIndex: await pointer.slot(),
            txIndex: await pointer.txIndex(),
            certificateIndex: await pointer.certIndex(),
          },
        },
      }
    }
  }
  {
    const enterpriseAddr = await wasm.EnterpriseAddress.fromAddress(request.address)
    if (enterpriseAddr) {
      return {
        type: LedgerAddressType.ENTERPRISE_KEY,
        params: {
          spendingPath: request.path,
        },
      }
    }
  }
  {
    const rewardAddr = await wasm.RewardAddress.fromAddress(request.address)
    if (rewardAddr) {
      return {
        type: LedgerAddressType.REWARD_KEY,
        params: {
          stakingPath: request.path, // reward addresses use spending path
        },
      }
    }
  }
  throw new Error(`toLedgerAddressParameters unknown address type`)
}

export const toLedgerTokenBundle = async (
  assets: MultiAsset
): Promise<Array<LedgerAssetGroup> | null> => {
  if (assets === null || !assets.hasValue()) return null
  const assetGroup: Array<LedgerAssetGroup> = []

  const policyHashes = await assets.keys()
  for (let i = 0; i < (await policyHashes.len()); i++) {
    const policyId = await policyHashes.get(i)
    const assetsForPolicy = await assets.get(policyId)
    if (!assetsForPolicy.hasValue()) continue

    const tokens: Array<LedgerToken> = []
    const assetNames = await assetsForPolicy.keys()
    for (let j = 0; j < (await assetNames.len()); j++) {
      const assetName = await assetNames.get(j)
      const amount = await assetsForPolicy.get(assetName)
      if (!amount.hasValue()) continue

      tokens.push({
        amount: await amount.toStr(),
        assetNameHex: Buffer.from(await assetName.name()).toString('hex'),
      })
    }
    // sort by asset name to the order specified by rfc7049
    tokens.sort(
      (token1, token2) => compareCborKey(token1.assetNameHex, token2.assetNameHex)
    )
    assetGroup.push({
      policyIdHex: Buffer.from(await policyId.toBytes()).toString('hex'),
      tokens,
    })
  }
  // sort by policy id to the order specified by rfc7049
  assetGroup.sort(
    (asset1, asset2) => compareCborKey(asset1.policyIdHex, asset2.policyIdHex)
  )
  return assetGroup
}

export const compareCborKey = (hex1: string, hex2: string): number => {
  if (hex1.length < hex2.length) {
    return -1
  }
  if (hex1.length > hex2.length) {
    return 1
  }
  if (hex1 < hex2) {
    return -1
  }
  if (hex1 > hex2) {
    return 1
  }
  return 0
}

export const formatLedgerCertificates = async (
  certificates: Certificates,
  stakingDerivationPath: number[],
): Promise<Array<LedgerCertificate>> => {
  const result: Array<LedgerCertificate> = []
  for (let i = 0; i < (await certificates.len()); i++) {
    const cert = await certificates.get(i)

    const registrationCert = await cert.asStakeRegistration()
    if (registrationCert != null && (await registrationCert).hasValue()) {
      result.push({
        type: LedgerCertificateType.STAKE_REGISTRATION,
        params: {
          stakeCredential: {
            type: LedgerStakeCredentialParamsType.KEY_PATH,
            keyPath: stakingDerivationPath,
          },
        }
      })
      continue
    }
    const deregistrationCert = await cert.asStakeDeregistration()
    if (deregistrationCert != null && deregistrationCert.hasValue()) {
      result.push({
        type: LedgerCertificateType.STAKE_DEREGISTRATION,
        params: {
          stakeCredential: {
            type: LedgerStakeCredentialParamsType.KEY_PATH,
            keyPath: stakingDerivationPath,
          },
        },
      })
      continue
    }
    const delegationCert = await cert.asStakeDelegation()
    if (delegationCert != null && delegationCert.hasValue()) {
      result.push({
        type: LedgerCertificateType.STAKE_DELEGATION,
        params: {
          stakeCredential: {
            type: LedgerStakeCredentialParamsType.KEY_PATH,
            keyPath: stakingDerivationPath,
          },
          poolKeyHashHex: Buffer.from(await delegationCert.poolKeyhash().then(x => x.toBytes())).toString('hex'),
        },
      })
      continue
    }
    throw new Error(`formatLedgerCertificates Ledger doesn't support this certificate type`)
  }
  return result
}

export const formatLedgerWithdrawals = async (
  withdrawals: Withdrawals,
  stakingDerivationPath: number[],
): Promise<Array<LedgerWithdrawal>> => {
  const result: Array<LedgerWithdrawal> = []

  const withdrawalKeys = await withdrawals.keys()
  for (let i = 0; i < (await withdrawalKeys.len()); i++) {
    const rewardAddress = await withdrawalKeys.get(i)
    const withdrawalAmount = await withdrawals.get(rewardAddress)
    if (withdrawalAmount === null || !withdrawalAmount.hasValue()) {
      throw new Error(`formatLedgerWithdrawals should never happen`)
    }

    result.push({
      amount: await withdrawalAmount.toStr(),
      stakeCredential: {
        type: LedgerStakeCredentialParamsType.KEY_PATH,
        keyPath: stakingDerivationPath,
      },
    })
  }
  return result
}
