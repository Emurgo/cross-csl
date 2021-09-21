import * as WasmV4 from '@emurgo/react-native-haskell-shelley'

import { createYoroiLib, YoroiLib } from '../../yoroi-lib-core/src'

export const init = (): YoroiLib => {
  // for now the Wasm object fulfills the contract, so there's no need to create a new object
  return createYoroiLib(WasmV4);
}