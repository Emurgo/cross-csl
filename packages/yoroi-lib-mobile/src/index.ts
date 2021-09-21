import * as WasmV4 from '@emurgo/react-native-haskell-shelley'
import { BigNum } from '../../yoroi-lib-core/src/wasm-contract'

import { createYoroiLib, YoroiLib } from '../../yoroi-lib-core/src'

export const init = (): YoroiLib => {
  return createYoroiLib({
    encrypt_with_password: WasmV4.encrypt_with_password,
    decrypt_with_password: WasmV4.decrypt_with_password,
    BigNum: MobileBigNum
  });
}

class MobileBigNum extends BigNum {
  private _wasmBigNum: WasmV4.BigNum
  constructor(wasmBigNum: WasmV4.BigNum) {
    super(wasmBigNum)
    this._wasmBigNum = wasmBigNum
  }

  async free(): Promise<void> {
    await this._wasmBigNum.free()
  }
  to_bytes(): Promise<Uint8Array> {
    throw 'not implemented'
  }
  to_str(): Promise<string> {
    return this._wasmBigNum.to_str()
  }
  checked_mul(other: MobileBigNum): Promise<BigNum> {
    throw 'not implemented'
  }
  async checked_add(other: MobileBigNum): Promise<BigNum> {
    const wasmBigNum = await this._wasmBigNum.checked_add(other._wasmBigNum)
    return new MobileBigNum(wasmBigNum)
  }
  async checked_sub(other: MobileBigNum): Promise<BigNum> {
    const wasmBigNum = await this._wasmBigNum.checked_sub(other._wasmBigNum)
    return new MobileBigNum(wasmBigNum)
  }
  async clamped_sub(other: MobileBigNum): Promise<BigNum> {
    const wasmBigNum = await this._wasmBigNum.clamped_sub(other._wasmBigNum)
    return new MobileBigNum(wasmBigNum)
  }
  compare(rhs_value: MobileBigNum): Promise<number> {
    return this._wasmBigNum.compare(rhs_value._wasmBigNum)
  }
  
  static from_bytes(bytes: Uint8Array): Promise<BigNum> {
    throw 'not implemented'
  }

  static async from_str(string: string): Promise<BigNum> {
    const wasmBigNum = await WasmV4.BigNum.from_str(string)
    return new MobileBigNum(wasmBigNum)
  }
}
