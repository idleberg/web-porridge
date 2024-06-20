import './polyfills';
import { PorridgeDB } from '../src/index';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

const test = suite('indexedDB.entries');

const db = new PorridgeDB();
const values = [0, 1, 3];

test.before.each(async () => {
	await db.clear();
});

test('true', async () => {
	await Promise.all(values.map(async item => await db.setItem(`demo${item}`, item)));

	const actual = await db.entries();
	const expected = values.map(item => {
		return [`demo${item}`, item];
	});

	assert.equal(actual, expected);
});

test('false', async () => {
	await Promise.all(values.map(async item => await db.setItem(`demo${item}`, item)));

	await db.clear();
	const actual = await db.entries();
	const expected = [];

	assert.equal(actual, expected);
});

test.run();
