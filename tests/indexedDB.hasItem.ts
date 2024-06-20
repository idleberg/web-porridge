import './polyfills';
import { PorridgeDB } from '../src/index';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

const test = suite('indexedDB.hasItem');
const db = new PorridgeDB();
const values = [1, 2, 3];

test.before.each(async () => {
	await db.clear();
});

test('true', async () => {
	await Promise.all(values.map(async item => await db.setItem(`demo${item}`, item)));

	const actual = await db.hasItem('demo1');
	const expected = true;

	assert.is(actual, expected);
});

test('false', async () => {
	await Promise.all(values.map(async item => await db.setItem(`demo${item}`, item)));

	await db.clear();
	const actual = await db.hasItem('demo1');
	const expected = false;

	assert.is(actual, expected);
});

test.run();
