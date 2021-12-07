import { Addressing } from '../models'
import * as WasmContract from '../wasm-contract'

export async function getCardanoSpendingKeyHash(
  wasm: WasmContract.WasmModuleProxy,
  addr: WasmContract.Address,
): Promise<WasmContract.Ed25519KeyHash | undefined> {
  {
    const byronAddr = await wasm.ByronAddress.fromAddress(addr)
    if (byronAddr.hasValue()) return undefined
  }
  {
    const baseAddr = await wasm.BaseAddress.fromAddress(addr)
    if (baseAddr.hasValue()) return await baseAddr.paymentCred().then(x => x.toKeyhash())
  }
  {
    const ptrAddr = await wasm.PointerAddress.fromAddress(addr)
    if (ptrAddr.hasValue()) return ptrAddr.paymentCred().then(x => x.toKeyhash())
  }
  {
    const enterpriseAddr = await wasm.EnterpriseAddress.fromAddress(addr)
    if (enterpriseAddr.hasValue()) return enterpriseAddr.paymentCred().then(x => x.toKeyhash())
  }
  {
    const rewardAddr = await wasm.RewardAddress.fromAddress(addr)
    if (rewardAddr.hasValue()) return rewardAddr.paymentCred().then(x => x.toKeyhash())
  }
  throw new Error(`getCardanoSpendingKeyHash: unknown address type`)
}

export async function derivePrivateByAddressing(
  addressing: Addressing,
  startingFrom: {
    key: WasmContract.Bip32PrivateKey,
    level: number,
  }): Promise<WasmContract.Bip32PrivateKey> {
  if (startingFrom.level + 1 < addressing.addressing.startLevel) {
    throw new Error(`derivePrivateByAddressing: keyLevel < startLevel`)
  }
  let derivedKey = startingFrom.key
  for (
    let i = startingFrom.level - addressing.addressing.startLevel + 1;
    i < addressing.addressing.path.length;
    i++
  ) {
    derivedKey = await derivedKey.derive(
      addressing.addressing.path[i]
    )
  }
  return derivedKey
}
