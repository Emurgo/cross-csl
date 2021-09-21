import * as WasmV4 from '@emurgo/react-native-haskell-shelley'
import { BigNum, LinearFee, EXCEPTIONS } from '../../yoroi-lib-core/src/wasm-contract'

import { createYoroiLib, YoroiLib } from '../../yoroi-lib-core/src'

export const init = (): YoroiLib => {
  return createYoroiLib({
    encrypt_with_password: WasmV4.encrypt_with_password,
    decrypt_with_password: WasmV4.decrypt_with_password,
    BigNum: MobileBigNum,
    LinearFee: MobileLinearFee
  });
}

class Ptr<T extends WasmV4.Ptr> {
  private _wasm: T

  get wasm(): T {
    return this._wasm
  }

  constructor(wasm: T) {
    this._wasm = wasm
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

