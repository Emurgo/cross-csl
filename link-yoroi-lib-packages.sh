# install shared dependencies
yarn install

# link core package on specific packages
cd packages/yoroi-lib-nodejs
yarn install
yarn rebuild
yarn link
cd ../../

cd packages/yoroi-lib-browser
yarn install
yarn rebuild
yarn link
cd ../../

cd packages/yoroi-lib-mobile
yarn install
yarn rebuild
yarn link
cd ../../
