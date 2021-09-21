export interface WasmContract {
  encrypt_with_password(password: string, salt: string, nonce: string, data: string): Promise<string>
  decrypt_with_password(password: string, data: string): Promise<string>
  BigNum: typeof BigNum
}

export abstract class BigNum {
  constructor(wasmBigNum: any) {
    
  }
  abstract free(): Promise<void>;
  /**
    * @returns {Uint8Array}
  */
  abstract to_bytes(): Promise<Uint8Array>;
  /**
    * @returns {string}
  */
  abstract to_str(): Promise<string>;
  /**
    * @param {BigNum} other
    * @returns {BigNum}
  */
  abstract checked_mul(other: BigNum): Promise<BigNum>;
  /**
    * @param {BigNum} other
    * @returns {BigNum}
  */
  abstract checked_add(other: BigNum): Promise<BigNum>;
  /**
    * @param {BigNum} other
    * @returns {BigNum}
  */
  abstract checked_sub(other: BigNum): Promise<BigNum>;
  /**
    * returns 0 if it would otherwise underflow
    * @param {BigNum} other
    * @returns {BigNum}
  */
  abstract clamped_sub(other: BigNum): Promise<BigNum>;
  /**
    * @param {BigNum} rhs_value
    * @returns {number}
  */
  abstract compare(rhs_value: BigNum): Promise<number>;

  /**
    * @param {Uint8Array} bytes
    * @returns {BigNum}
  */
  static from_bytes(bytes: Uint8Array): Promise<BigNum> {
    throw 'should be overwritten by implementations'
  }
  /**
    * @param {string} string
    * @returns {BigNum}
  */
  static from_str(string: string): Promise<BigNum> {
    throw 'should be overwritten by implementations'
  }
}