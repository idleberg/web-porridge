//@ts-check

'use strict';

const path = require('path');

const commonOptions = {
  target: 'web',
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                declaration: false
              }
            }
          }
        ]
      }
    ]
  }
};

const outputOptions = {
  path: path.resolve(__dirname, 'dist'),
  libraryTarget: 'window',
  devtoolModuleFilenameTemplate: '../[resource-path]'
}

/**@type {import('webpack').Configuration}*/
const config = [
  {
    ...commonOptions,
    entry: './src/browser.ts',
    output: {
      ...outputOptions,
      filename: 'web-porridge.js',
    }
  },
  {
    ...commonOptions,
    entry: './src/browser-db.ts',
    output: {
      ...outputOptions,
      filename: 'web-porridge-db.js',
    }
  }
];

module.exports = config;
