import { terser } from "rollup-plugin-terser";
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const isProduction = process.env.NODE_ENV === 'production';

const plugins = [
  commonjs(),
  isProduction && filesize(),
  resolve(),
  isProduction && terser(),
  typescript(),
];

export default [
  {
    input: './src/index.ts',
    output: [
      {
        compact: isProduction,
        sourcemap: true,
        file: './dist/index.js',
        format: 'esm'
      }
    ],
    plugins: plugins
  },
  {
    input: './src/porridge.ts',
    output: [
      {
        compact: isProduction,
        sourcemap: true,
        file: './dist/porridge.esm.js',
        format: 'esm'
      },
      {
        compact: isProduction,
        sourcemap: true,
        file: './dist/porridge.umd.js',
        format: 'umd',
        name: 'WebPorridge'
      }
    ],
    plugins: plugins
  },
  {
    input: './src/porridge-db.ts',
    output: [
      {
        compact: isProduction,
        sourcemap: true,
        file: './dist/porridge-db.esm.js',
        format: 'esm',
      },
      {
        compact: isProduction,
        sourcemap: true,
        file: './dist/porridge-db.umd.js',
        format: 'umd',
        name: 'WebPorridgeDB'
      }
    ],
    plugins: plugins
  }
];
