cd packages/yoroi-lib-nodejs
yarn unlink @emurgo/yoroi-lib-core
cd ../../

cd packages/yoroi-lib-browser
yarn unlink @emurgo/yoroi-lib-core
cd ../../

cd packages/yoroi-lib-mobile
yarn unlink @emurgo/yoroi-lib-core
cd ../../

cd packages/yoroi-lib-core
yarn unlink
cd ../../