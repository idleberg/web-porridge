import './polyfills';
import { PorridgeDB } from '../src/index';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

const test = suite('indexedDB.length');
const db = new PorridgeDB();

test('Empty', async () => {
	await db.setItem('demo', 'Hello World!');
	await db.clear();

	const actual = await db.length;

	assert.is(actual, 0);
});

test('Single Item', async () => {
	await db.clear();
	await db.setItem('demo', 'Hello World!');

	const actual = await db.length;

	assert.is(actual, 1);
});

test.run();
