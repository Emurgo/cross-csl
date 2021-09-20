import * as WasmV4 from '@emurgo/react-native-haskell-shelley'

import { createYoroiLib, YoroiLib } from '../../yoroi-lib-core/src'

export const init = (): YoroiLib => {
  console.log('WasmV4.encrypt_with_password');
  console.log(WasmV4.encrypt_with_password);
  return createYoroiLib(WasmV4);
}