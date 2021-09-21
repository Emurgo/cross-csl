import * as WasmV4 from '@emurgo/cardano-serialization-lib-browser/cardano_serialization_lib'
import { BigNum, LinearFee } from '../../yoroi-lib-core/src/wasm-contract'

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
    BigNum: BrowserBigNum,
    LinearFee: BrowserLinearFee
  });
}

class Ptr<T> {
  private _wasm: T

  get wasm(): T {
    return this._wasm
  }

  constructor(wasm: T) {
    if ((wasm as any).free) {
      this._wasm = wasm
    } else {
      throw 'missing free() function'
    }
  }

  free(): Promise<void> {
    return Promise.resolve((this.wasm as any).free())
  }
}

class BrowserBigNum extends Ptr<WasmV4.BigNum> implements BigNum {
  free(): Promise<void> {
    return Promise.resolve(this.wasm.free())
  }
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
