import { terser } from "rollup-plugin-terser";
import commonjs from '@rollup/plugin-commonjs';
// import filesize from 'rollup-plugin-filesize';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const plugins = [
  commonjs(),
  resolve(),
  terser(),
  typescript({
    allowSyntheticDefaultImports: true,
    lib: [
      "dom",
      "esnext"
    ],
    target: 'es5'
  }),
];

const outputConfig = {
  compact: true,
  format: 'umd'
}

export default [
  {
    input: './src/index.ts',
    output: {
      ...outputConfig,
      file: './lib/index.js',
      name: 'WebPorridge'
    },
    plugins: plugins
  },
  {
    input: './src/util.ts',
    output: {
      ...outputConfig,
      file: './lib/util.js',
      name: 'PorridgeUtil'
    },
    plugins: plugins
  },
  {
    input: './src/porridge.ts',
    output: {
      ...outputConfig,
      file: './lib/commonjs/porridge.js',
      name: 'WebPorridge'
    },
    plugins: plugins
  },
  {
    input: './src/porridge-db.ts',
    output: {
      ...outputConfig,
      file: './lib/commonjs/porridge-db.js',
      name: 'WebPorridgeDB'
    },
    plugins: plugins
  },
  {
    input: './src/index.ts',
    output: {
      ...outputConfig,
      file: './lib/index.mjs',
      format: 'esm'
    },
    plugins: plugins
  },
  {
    input: './src/util.ts',
    output: {
      ...outputConfig,
      file: './lib/util.mjs',
      format: 'esm'
    },
    plugins: plugins
  },
  {
    input: './src/porridge.ts',
    output: {
      ...outputConfig,
      file: './lib/esm/porridge.mjs',
      format: 'esm',
      name: 'WebPorridge'
    },
    plugins: plugins
  },
  {
    input: './src/porridge-db.ts',
    output: {
      ...outputConfig,
      file: './lib/esm/porridge-db.mjs',
      format: 'esm',
      name: 'WebPorridgeDB'
    },
    plugins: plugins
  }
];
