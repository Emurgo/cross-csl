import * as WasmV4 from '@emurgo/cardano-serialization-lib-browser/cardano_serialization_lib'

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
  });
}