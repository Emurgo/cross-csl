# Cross CSL (cardanos-serialization-lib)

## Getting started

Install the core package:
```
npm i @emurgo/cross-csl-core
```

Install the package according to your runtime:
```
npm i @emurgo/cross-csl-nodejs
```
or:
```
npm i @emurgo/cross-csl-browser
```
or:
```
npm i @emurgo/cross-csl-mobile
```

Import and call the `init` function from the runtime package (nodejs example):
```
import { init } from '@emurgo/cross-csl-nodejs';
const wasm = init();
```

then simply use the objects from the constructed wasm:
```
const txBuilder = await wasm.TransactionBuilder.new(...);
```