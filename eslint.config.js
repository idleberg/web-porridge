// @ts-check
import eslint from '@eslint/js';
import eslintPluginJsonc from 'eslint-plugin-jsonc';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	...eslintPluginJsonc.configs['flat/recommended-with-json'],
	{
		plugins: {
			unicorn: eslintPluginUnicorn,
		},
		rules: {
			'@typescript-eslint/ban-ts-comment': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					"args": "all",
					"argsIgnorePattern": "^_",
					"caughtErrors": "all",
					"caughtErrorsIgnorePattern": "^_",
					"destructuredArrayIgnorePattern": "^_",
					"varsIgnorePattern": "^_",
					"ignoreRestSiblings": true
				}
			],
			'unicorn/new-for-builtins': 'error',
			'unicorn/prefer-node-protocol': 'error',
		},
	},
	{
		files: ['tsconfig.json'],
		rules: {
			'jsonc/no-comments': 'off'
		}
	},
);
