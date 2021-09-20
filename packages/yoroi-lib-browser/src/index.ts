import * as WasmV4 from '@emurgo/cardano-serialization-lib-browser/cardano_serialization_lib'

import { createYoroiLib, YoroiLib } from '../../yoroi-lib-core/src/index'
import { makePromisedWasm } from '../../yoroi-lib-core/src/promised-wasm'

export const init = (): YoroiLib => {
  return createYoroiLib(makePromisedWasm(WasmV4));
}