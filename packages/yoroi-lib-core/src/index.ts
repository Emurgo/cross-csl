import { WasmContract } from './wasm-contract'

export const createYoroiLib = (wasmV4: WasmContract): YoroiLib => {
  return new YoroiLib(wasmV4)
}

export class YoroiLib {
  private _wasmV4: WasmContract

  get WasmContract(): WasmContract {
    return this._wasmV4
  }

  constructor(wasmV4: WasmContract) {
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
