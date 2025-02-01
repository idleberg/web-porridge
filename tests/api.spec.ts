import { beforeEach, expect, test } from 'vitest';
import { Porridge } from '../src/porridge.ts';

const localPorridge = new Porridge('localStorage');
const sessionPorridge = new Porridge('sessionStorage');

[
	{
		type: 'localStorage',
		storage: localPorridge,
	},
	{
		type: 'sessionStorage',
		storage: sessionPorridge,
	},
].map(({ type, storage }) => {
	beforeEach(() => {
		storage.clear();
	});

	test(`${type}.clear()`, () => {
		storage.setItem('demo', 'Hello, world!');
		storage.clear();

		const actual = storage.getItem('demo');
		const expected = null;

		expect(actual).toBe(expected);
	});

	test(`${type}.key() - Valid Index`, () => {
		const expected = 'demo';
		storage.setItem(expected, 'Hello, world!');

		const actual = storage.key(0);

		expect(actual).toBe(expected);
	});

	test(`${type}.key() - Invalid Index`, () => {
		storage.setItem('demo', 'Hello, world');

		const actual = storage.key(1);

		expect(actual).toBe(null);
	});

	test(`${type}.key() - Valid Fraction Index`, () => {
		const expected = 'demo';
		storage.setItem(expected, 'Hello, world');

		const actual = storage.key(0.1);

		expect(actual).toBe(expected);
	});

	test(`${type}.key() - Invalid Fraction Index`, () => {
		storage.setItem('demo', 'Hello, world');

		const actual = storage.key(1.1);

		expect(actual).toBe(null);
	});

	test(`${type}.length() - 0`, () => {
		storage.setItem('demo', 'Hello, world!');
		storage.clear();

		const actual = storage.length;
		const expected = 0;

		expect(actual).toBe(expected);
	});

	test(`${type}.length() - 1`, () => {
		storage.setItem('demo', 'Hello, world!');

		const actual = storage.length;
		const expected = 1;

		expect(actual).toBe(expected);
	});

	test(`${type}.removeItem()`, () => {
		storage.setItem('demo', 'Hello, world!');
		storage.removeItem('demo');
		const actual = storage.getItem('demo');

		expect(actual).toBe(null);
	});

	test(`${type}.*etItem() - String`, () => {
		const expected = 'Hello, world!';
		storage.setItem('demo', expected);
		const actual = storage.getItem('demo');

		expect(actual).toBe(expected);
	});

	test(`${type}.*etItem() - Number`, () => {
		const expected = 1;
		storage.setItem('demo', expected);
		const actual = storage.getItem('demo');

		expect(actual).toBe(expected);
	});

	test(`${type}.*etItem() - Boolean`, () => {
		const expected = true;
		storage.setItem('demo', expected);
		const actual = storage.getItem('demo');

		expect(actual).toBe(expected);
	});

	test(`${type}.*etItem() - Null`, () => {
		const expected = null;
		storage.setItem('demo', expected);
		const actual = storage.getItem('demo');

		expect(actual).toBe(expected);
	});

	test(`${type}.*etItem() - Object`, () => {
		const expected = {};
		storage.setItem('demo', expected);
		const actual = storage.getItem('demo');

		expect(actual).toStrictEqual(expected);
	});

	test(`${type}.*etItem() - Undefined`, () => {
		const expected = undefined;
		storage.setItem('demo', expected);
		const actual = storage.getItem('demo');

		expect(actual).toBe(expected);
	});

	test(`${type}.*etItem() - BigInt`, () => {
		const expected = BigInt('1');
		storage.setItem('demo', expected);
		const actual = storage.getItem('demo');

		expect(actual).toBe(expected);
	});

	test(`${type}.*etItem() - Date`, () => {
		const expected = new Date('1999-12-31');
		storage.setItem('demo', expected);
		const actual = storage.getItem('demo');

		expect(actual).toStrictEqual(expected);
	});
});
