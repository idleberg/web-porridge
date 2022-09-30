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
				file: './lib/web-porridge.mjs',
				format: 'esm'
			},
			{
				compact: isProduction,
				sourcemap: true,
				file: './lib/web-porridge.cjs',
				format: 'cjs'
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
				file: './lib/storage/index.mjs',
				format: 'esm'
			},
			{
				compact: isProduction,
				sourcemap: true,
				file: './lib/storage/index.cjs',
				format: 'cjs'
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
				file: './lib/db/index.mjs',
				format: 'esm',
			},
			{
				compact: isProduction,
				sourcemap: true,
				file: './lib/db/index.cjs',
				format: 'cjs'
			}
		],
		plugins: plugins
	}
];
