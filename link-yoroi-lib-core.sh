# install shared dependencies
yarn install

# create link for core package
cd packages/yoroi-lib-core
yarn install
yarn link
cd ../../

# link core package on specific packages
cd packages/yoroi-lib-nodejs
yarn install
yarn link @emurgo/yoroi-lib-core
cd ../../

cd packages/yoroi-lib-browser
yarn install
yarn link @emurgo/yoroi-lib-core
cd ../../

cd packages/yoroi-lib-mobile
yarn install
yarn link @emurgo/yoroi-lib-core
cd ../../
