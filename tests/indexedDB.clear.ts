import './polyfills';
import { PorridgeDB } from '../src/index';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

const test = suite('indexedDB.clear');
const db = new PorridgeDB();

test.before.each(async () => {
	await db.clear();
});

test('Default', async () => {
	await db.setItem('demo', 'Hello World!');
	await db.clear();

	const actual = await db.length;

	assert.is(actual, 0);
});

test.run();
