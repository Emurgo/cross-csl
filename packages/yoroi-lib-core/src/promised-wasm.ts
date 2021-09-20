import * as WasmV4 from './wasm';
import * as BaseWasmV4 from '@emurgo/cardano-serialization-lib-nodejs';

export const makePromisedWasm = (wasm: typeof BaseWasmV4): typeof WasmV4 => {
  return {
    encrypt_with_password: (password: string, salt: string, nonce: string, data: string) => {
      return Promise.resolve(wasm.encrypt_with_password(password, salt, nonce, data))
    },
    decrypt_with_password: (password: string, data: string) => {
      return Promise.resolve(wasm.decrypt_with_password(password, data))
    }
  }
}