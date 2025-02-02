import { expect, test } from 'vitest';
import { Porridge } from '../../src/porridge.ts';

[
	'localStorage',
	'sessionStorage'
].map((storage) => {
	test(`${storage}.clear()`, () => {
		Object.defineProperty(globalThis, 'localStorage', {
			value: undefined,
			writable: true,
		});

		// @ts-expect-error
		expect(() => new Porridge(storage, 1)).toThrowError(`Event name must be of type "string", got "number"`);
	});
});

test('Invalid storage type', () => {
	// @ts-expect-error
	expect(() => new Porridge('console')).toThrowError('Invalid storage type specified, try localStorage or sessionStorage instead');
});
