import 'fake-indexeddb/auto';
import { Navigator } from 'node-navigator';
import { PorridgeDB } from '../src/index';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import browserEnv from 'browser-env';

const test = suite('indexedDB.clear');

browserEnv(['window']);
globalThis['navigator'] = new Navigator();
window.indexedDB = {}

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
