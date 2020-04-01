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
  devtoolModuleFilenameTemplate: '../[resource-path]',
  libraryTarget: 'window',
  path: path.resolve(__dirname, 'dist')
}

/**@type {import('webpack').Configuration}*/
const config = [
  {
    ...commonOptions,
    entry: './src/browser.ts',
    output: {
      ...outputOptions,
      filename: 'porridge.js',
    }
  },
  {
    ...commonOptions,
    entry: './src/browser-db.ts',
    output: {
      ...outputOptions,
      filename: 'porridge-db.js',
    }
  }
];

module.exports = config;
