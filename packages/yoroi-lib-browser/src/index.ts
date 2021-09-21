import * as WasmV4 from '@emurgo/cardano-serialization-lib-browser/cardano_serialization_lib'
import { BigNum } from '../../yoroi-lib-core/src/wasm-contract'

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
    BigNum: BrowserBigNum
  });
}

class BrowserBigNum extends BigNum {
  private _wasmBigNum: WasmV4.BigNum

  constructor(wasmBigNum: WasmV4.BigNum) {
    super(wasmBigNum)
    this._wasmBigNum = wasmBigNum
  }

  free(): Promise<void> {
    return Promise.resolve(this._wasmBigNum.free())
  }
  to_bytes(): Promise<Uint8Array> {
    return Promise.resolve(this._wasmBigNum.to_bytes())
  }
  to_str(): Promise<string> {
    return Promise.resolve(this._wasmBigNum.to_str())
  }
  checked_mul(other: BrowserBigNum): Promise<BigNum> {
    const wasmBigNum = this._wasmBigNum.checked_mul(other._wasmBigNum)
    return Promise.resolve(new BrowserBigNum(wasmBigNum))
  }
  checked_add(other: BrowserBigNum): Promise<BigNum> {
    const wasmBigNum = this._wasmBigNum.checked_add(other._wasmBigNum)
    return Promise.resolve(new BrowserBigNum(wasmBigNum))
  }
  checked_sub(other: BrowserBigNum): Promise<BigNum> {
    const wasmBigNum = this._wasmBigNum.checked_sub(other._wasmBigNum)
    return Promise.resolve(new BrowserBigNum(wasmBigNum))
  }
  clamped_sub(other: BrowserBigNum): Promise<BigNum> {
    const wasmBigNum = this._wasmBigNum.clamped_sub(other._wasmBigNum)
    return Promise.resolve(new BrowserBigNum(wasmBigNum))
  }
  compare(rhs_value: BrowserBigNum): Promise<number> {
    return Promise.resolve(this._wasmBigNum.compare(rhs_value._wasmBigNum))
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

