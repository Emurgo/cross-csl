export interface WasmV4Adapter {
  /* tslint:disable */
  /* eslint-disable */
  /**
  * @param {string} password
  * @param {string} salt
  * @param {string} nonce
  * @param {string} data
  * @returns {string}
  */
  encrypt_with_password(password: string, salt: string, nonce: string, data: string): Promise<string>;
  /**
  * @param {string} password
  * @param {string} data
  * @returns {string}
  */
  decrypt_with_password(password: string, data: string): Promise<string>;
  /**
  * @param {Transaction} tx
  * @param {LinearFee} linear_fee
  * @returns {BigNum}
  */

}