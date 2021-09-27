# Yoroi Lib

`WARNING!!! This is a WIP solution.`

Currently we can use the handy [`cardano-serialization-lib`](https://github.com/emurgo/cardano-serialization-lib) for serialization & deserialization of data structures used in Cardano's Haskell implementation of Shelley, but this library has different versions for node.js, browser and mobile. `Yoroi Lib` aims to provide a single interface for interacting with all versions of [`cardano-serialization-lib`](https://github.com/emurgo/cardano-serialization-lib).

## Implementation
We have three packages:
- `yoroi-lib-core` core package. Contains the main object `YoroiLib`, that receives a `WasmContract` the specific libraries provide;
- `yoroi-lib-browser` contains the browser implementation of the `WasmContract`, using the methods and types from the browser's WASM object ([Browser (chrome/firefox) WASM package](https://www.npmjs.com/package/@emurgo/cardano-serialization-lib-browser));
- `yoroi-lib-mobile` contains the mobile implementation of the `WasmContract`, using the methods and types from the mobiles's WASM object ([React-Native mobile bindings](https://github.com/Emurgo/react-native-haskell-shelley));

Both the browser and mobile versions export a `init` function which should be used the get an instance of `YoroiLib` with the correct `WasmContract`.


## Tests
Testing in this library is not straight-forward as running `yarn test`, because we actually want to test if `YoroiLib` will yield the expected results both using the browser and mobile WASM objects, and then because these objects are only available under their respective platforms, we have to execute the test suites in the browser and in a mobile app.

The tests are exposed via a builder function defined in [`packages/yoroi-lib-core/spec/index.spec.ts`](https://github.com/Emurgo/yoroi-lib/blob/feature/initial/packages/yoroi-lib-core/spec/index.spec.ts).

This function receives an instance of `YoroiLib`, so when testing the specific version, we simply need to instantiate the `YoroiLib` with the appropriate `WasmContract` based on the platform we are testing.

## Setting up the tests
### Browser version: `test-app`
This should be as easy as entering the `test-app` dir and running `yard build` and then `yarn start`. This will build the app and start a `webpack` dev server that will call the `mocha` tests and display the results in the browser.

### Mobile version
This one is more complicated as we currently need 2 terminals for this (both in the `test-app-mobile` dir). These are the steps to run the tests using the mobile version:
- create a `local.properties` file under `test-app-mobile/android` and add:
  - `ndk.dir={path to the android NDK in your environment}`
  - `sdk.dir={path to the android SDK in your environment}`
  - NOTE: the above should be the FULL PATH, including the directory with the specific version of the NDK
- in one terminal, run `yarn android`. This will build the android specific components, including the gradle build that will compile the WASM library. This should take some time to finish;
- in another terminal, run `yarn start`. This will build the "react-native part" of the app, which shouldn't take too long. Also, this will still listen to any changes on the JS / TS part of the project.

You will also need to be running an AVD (Android Virtual Device) so the app can be deployed to it.

After completing the steps above, the app should be deployed to the AVD, and in the first page will start a background execution that will setup and execute the `mocha` tests. You will be able to see the results in the console that you ran `yarn start`;

# Next steps
- find out why the `EVENT_RUN_END` is never triggered in the mobile test app;
- display the browser test results in the console as well;
- display mobile test results in the app screen as well;
- make it able to do a "single run" of the browser and mobile tests, that should automatically close the browser or AVD and report if the test suite passed or failed;
- further build on `YoroiLib` by adding more code that can be shared between browser and mobile.