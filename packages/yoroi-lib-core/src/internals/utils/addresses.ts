import * as WasmContract from '../../wasm-contract';

export async function normalizeToAddress(
  wasm: WasmContract.WasmModuleProxy,
  addr: string
): Promise<WasmContract.Address | undefined> {
  // in Shelley, addresses can be base16, bech32 or base58
  // this function, we try parsing in all encodings possible

  // 1) Try converting from base58
  if (await wasm.ByronAddress.isValid(addr)) {
    const byronAddr = await wasm.ByronAddress.fromBase58(addr);
    return await byronAddr.toAddress();
  }

  // 2) If already base16, simply return
  try {
    return await wasm.Address.fromBytes(Buffer.from(addr, 'hex'));
  } catch (_e) {}

  // 3) Try converting from base32
  try {
    return await wasm.Address.fromBech32(addr);
  } catch (_e) {}

  return undefined;
}

export async function toHexOrBase58(
  wasm: WasmContract.WasmModuleProxy,
  address: WasmContract.Address,
): Promise<string> {
  const asByron = await wasm.ByronAddress.fromAddress(address);
  if (asByron == null) {
    return Buffer.from(await address.toBytes()).toString('hex');
  }
  return await asByron.toBase58();
}
