import { beforeEach, expect, test } from 'vitest';
import { PorridgeDB } from '../../src/index.ts';

const storage = new PorridgeDB();

beforeEach(() => {
	storage.clear();
});

test(`db.clear()`, async () => {
	await storage.setItem('demo', 'Hello, world!');
	await storage.clear();

	const actual = await storage.getItem('demo');
	const expected = null;

	expect(actual).toBe(expected);
});

test(`db.key() - Valid Index`, async () => {
	const expected = 'demo';
	await storage.setItem(expected, 'Hello, world!');

	const actual = await storage.key(0);

	expect(actual).toBe(expected);
});

test(`db.key() - Invalid Index`, async () => {
	await storage.setItem('demo', 'Hello, world');

	const actual = await storage.key(1);

	expect(actual).toBe(null);
});

// test(`db.key() - Valid Fraction Index`, async () => {
// 	const expected = 'demo';
// 	await storage.setItem(expected, 'Hello, world');

// 	const actual = await storage.key(0.1);

// 	expect(actual).toBe(expected);
// });

// test(`db.key() - Invalid Fraction Index`, async () => {
// 	await storage.setItem('demo', 'Hello, world');

// 	const actual = await storage.key(1.1);

// 	expect(actual).toBe(null);
// });

test(`db.length() - 0`, async () => {
	await storage.setItem('demo', 'Hello, world!');
	await storage.clear();

	const actual = await storage.length;
	const expected = 0;

	expect(actual).toBe(expected);
});

test(`db.length() - 1`, async () => {
	await storage.setItem('demo', 'Hello, world!');

	const actual = await storage.length;
	const expected = 1;

	expect(actual).toBe(expected);
});

test(`db.removeItem()`, async () => {
	await storage.setItem('demo', 'Hello, world!');
	await storage.removeItem('demo');
	const actual = await storage.getItem('demo');

	expect(actual).toBe(null);
});

test(`db.removeItem() - Object key, 1 level`, async () => {
	await storage.setItem('demo', {
		firstName: 'John',
		lastName: 'Appleseed',
	});

	await storage.removeItem('demo', {
		prop: 'firstName',
	});

	const actual = await storage.getItem('demo');

	expect(actual).toStrictEqual({
		lastName: 'Appleseed',
	});
});

test(`db.removeItem() - Object key: 1 level, 2 levels`, async () => {
	await storage.setItem('demo', {
		name: {
			first: 'John',
			last: 'Appleseed',
		}
	});

	await storage.removeItem('demo', {
		prop: 'name.first',
	});

	const actual = await storage.getItem('demo');

	expect(actual).toStrictEqual({
		name: {
			last: 'Appleseed',
		},
	});
});

test(`db.*etItem() - String`, async () => {
	const expected = 'Hello, world!';
	await storage.setItem('demo', expected);
	const actual = await storage.getItem('demo');

	expect(actual).toBe(expected);
});

test(`db.*etItem() - Number`, async () => {
	const expected = 1;
	await storage.setItem('demo', expected);
	const actual = await storage.getItem('demo');

	expect(actual).toBe(expected);
});

test(`db.*etItem() - Boolean`, async () => {
	const expected = true;
	await storage.setItem('demo', expected);
	const actual = await storage.getItem('demo');

	expect(actual).toBe(expected);
});

test(`db.*etItem() - Null`, async () => {
	const expected = null;
	await storage.setItem('demo', expected);
	const actual = await storage.getItem('demo');

	expect(actual).toBe(expected);
});

test(`db.*etItem() - Object`, async () => {
	const expected = {};
	await storage.setItem('demo', expected);
	const actual = await storage.getItem('demo');

	expect(actual).toStrictEqual(expected);
});

test(`db.*etItem() - Undefined`, async () => {
	const expected = undefined;
	await storage.setItem('demo', expected);
	const actual = await storage.getItem('demo');

	expect(actual).toBe(expected);
});

test(`db.*etItem() - BigInt`, async () => {
	const expected = BigInt('1');
	await storage.setItem('demo', expected);
	const actual = await storage.getItem('demo');

	expect(actual).toBe(expected);
});

test(`db.*etItem() - Object key: 1 level`, async () => {
	await storage.setItem('demo', {
		name: 'John Appleseed'
	});
	await storage.setItem('demo', 'Ada Lovelace', {
		prop: 'name'
	});

	const actual = await storage.getItem('demo');

	expect(actual).toStrictEqual({
		name: 'Ada Lovelace'
	});

	const actualProp = await storage.getItem('demo', {
		prop: 'name'
	});

	expect(actualProp).toStrictEqual('Ada Lovelace');
});

test(`db.*etItem() - Object key: 2 levels`, async () => {
	await storage.setItem('demo', {
		name: {
			first: 'John',
			last: 'Appleseed'
		}
	});
	await storage.setItem('demo', 'Masamune', {
		prop: 'name.first'
	});

	const actual = await storage.getItem('demo');

	expect(actual).toStrictEqual({
		name: {
			first: 'Masamune',
			last: 'Appleseed',
		}
	});

	const actualProp = await storage.getItem('demo', {
		prop: 'name.last'
	});

	expect(actualProp).toStrictEqual('Appleseed');
});

test(`db.*etItem() - Date`, async () => {
	const expected = new Date('1999-12-31');
	await storage.setItem('demo', expected);
	const actual = await storage.getItem('demo');

	expect(actual).toStrictEqual(expected);
});

test(`db.didExpire() - true `, async () => {
	await storage.setItem('demo', 'expired', {
		expires: Date.now() - 1000,
	});
	const actual = await storage.didExpire('demo');

	expect(actual).toStrictEqual(true);
});

test(`db.didExpire() - false`, async () => {
	await storage.setItem('demo', 'expired', {
		expires: Date.now() + 1000,
	});
	const actual = await storage.didExpire('demo');

	expect(actual).toStrictEqual(false);
});

test(`db.didExpire() - missing`, async () => {
	await storage.clear();
	const actual = await storage.didExpire('demo');

	expect(actual).toStrictEqual(false);
});

test(`db.hasItem() - true`, async () => {
	await storage.setItem('demo', 'exists');
	const actual = await storage.hasItem('demo');

	expect(actual).toStrictEqual(true);
});

test(`db.hasItem() - false`, async () => {
	await storage.clear();
	const actual = await storage.hasItem('demo');

	expect(actual).toStrictEqual(false);
});

test(`db.entries()`, async () => {
	const entries = [
		self.crypto.randomUUID(),
		self.crypto.randomUUID(),
		self.crypto.randomUUID(),
	];

	await storage.setItem('demo1', entries[0]);
	await storage.setItem('demo2', entries[1]);
	await storage.setItem('demo3', entries[2]);

	const expected = [
		['demo1', entries[0]],
		['demo2', entries[1]],
		['demo3', entries[2]],
	];
	const actual = await storage.entries();

	expect(actual).toStrictEqual(expected);
});

test(`db.entries() - empty`, async () => {
	await storage.clear();
	const actual = await storage.entries();

	expect(actual).toStrictEqual([]);
});

test(`db.keys()`, async () => {
	const keys = [
		'demo1',
		'demo2',
		'demo3',
	];

	await storage.setItem('demo1', self.crypto.randomUUID());
	await storage.setItem('demo2', self.crypto.randomUUID());
	await storage.setItem('demo3', self.crypto.randomUUID());
	const actual = await storage.keys();

	expect(actual).toStrictEqual(keys);
});

test(`db.keys() - empty`, async () => {
	await storage.clear();
	const actual = await storage.keys();

	expect(actual).toStrictEqual([]);
});

test(`db.values()`, async () => {
	const entries = [
		self.crypto.randomUUID(),
		self.crypto.randomUUID(),
		self.crypto.randomUUID(),
	];

	await storage.setItem('demo1', entries[0]);
	await storage.setItem('demo2', entries[1]);
	await storage.setItem('demo3', entries[2]);
	const actual = await storage.values();

	expect(actual).toStrictEqual(entries);
});

test(`db.values() - empty`, async () => {
	await storage.clear();
	const actual = await storage.values();

	expect(actual).toStrictEqual([]);
});
