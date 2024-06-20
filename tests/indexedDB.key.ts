import './polyfills';
import { PorridgeDB } from '../src/index';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

const test = suite('indexedDB.key');
const db = new PorridgeDB();

test.before.each(async () => {
	await db.clear();
});

test('undefined', async () => {
	await db.clear();

	const actual = await db.key(0);

	assert.is(actual, undefined);
});

test('Single Item', async () => {
	const expected = 'demo';

	await db.clear();
	await db.setItem(expected, 'Hello World!');

	const actual = await db.key(0);

	assert.is(actual, expected);
});

test.run();
