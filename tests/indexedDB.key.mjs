import 'fake-indexeddb/auto';
import { Navigator } from 'node-navigator';
import { PorridgeDB } from '../src/index';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import browserEnv from 'browser-env';

const test = suite('indexedDB.key');

browserEnv(['window']);
global['navigator'] = new Navigator();
window.indexedDB = {}

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
