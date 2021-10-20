const path = require('path');

const webpack = require('webpack');

module.exports = {
  experiments: {
    asyncWebAssembly: true
  },
  entry: "./spec/bootstrap.spec.js",
  devtool: 'inline-source-map',
  module: {
    exprContextCritical: false,
    rules: [{
      test: /\.tsx?$/,
      use: [{
        loader: 'ts-loader',
        // We use a different tsconfig here because we want to compile towards ES6,
        // but we need to use ESNext here because of the dynamic imports (see spec/index.spec.ts).
        options: {
          configFile: 'tsconfig.tests.json'
        }
      }],
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      "buffer": require.resolve("buffer/")
    }
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bootstrap.spec.js",
  },
  mode: "development",
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
}
