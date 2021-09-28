export const EXCEPTIONS = {
  NOT_IMPLEMENTED: 'not implemented',
  SHOULD_BE_OVERWRITTEN: 'should be overwritten by implementations'
}

export interface WasmContract {
  encrypt_with_password(password: string, salt: string, nonce: string, data: string): Promise<string>
  decrypt_with_password(password: string, data: string): Promise<string>
  BigNum: typeof BigNum
  LinearFee: typeof LinearFee
}

export abstract class Ptr {
  constructor(wasm: any) {

  }
  /**
    * Frees the pointer
    * @returns {Promise<void>}
    */
  abstract free(): Promise<void>;
}

/*
  The classes defined here act like placeholders just so we can export the types.
  By doing this, we can generate kind off an "abstract namespace", so the platform
    specific versions of yoroi-lib can pass in the appropriate types.
  Client code of yoroi-lib can then interact with the specific types without having
    to explicitly know that by calling factory methods or other overheads.
*/

export abstract class BigNum extends Ptr {
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
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN
  }
  /**
    * @param {string} string
    * @returns {BigNum}
  */
  static from_str(string: string): Promise<BigNum> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN
  }
}

export abstract class LinearFee extends Ptr {
  /**
    * @returns {Promise<BigNum>}
  */
  abstract constant(): Promise<BigNum>;

  /**
    * @returns {Promise<BigNum>}
  */
  abstract coefficient(): Promise<BigNum>;

  /**
    * @param {BigNum} coefficient
    * @param {BigNum} constant
    * @returns {Promise<LinearFee>}
  */
  static new(coefficient: BigNum, constant: BigNum): Promise<LinearFee> {
    throw EXCEPTIONS.SHOULD_BE_OVERWRITTEN
  }
}
