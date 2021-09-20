import * as WasmV4 from './wasm';

export const createYoroiLib = (wasmV4: typeof WasmV4): YoroiLib => {
  return new YoroiLib(wasmV4)
}

export class YoroiLib {
  private _wasmV4: typeof WasmV4
  constructor(wasmV4: typeof WasmV4) {
    this._wasmV4 = wasmV4
  }

  async encryptWithPassword(password: string, salt: string, nonce: string, data: string): Promise<string> {
    return await this._wasmV4.encrypt_with_password(
      password,
      salt,
      nonce,
      data
    )
  }

  async decryptWithPassword(password: string, data: string): Promise<string> {
    return await this._wasmV4.decrypt_with_password(password, data)
  }
}