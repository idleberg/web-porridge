import 'fake-indexeddb/auto.js';
import { Navigator } from 'node-navigator';
import { PorridgeDB } from '../lib/web-porridge.mjs';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import browserEnv from 'browser-env';

const test = suite('indexedDB.length');

browserEnv(['window']);
global['navigator'] = new Navigator();
window.indexedDB = {}

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
