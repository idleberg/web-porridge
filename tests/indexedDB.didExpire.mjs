import 'fake-indexeddb/auto.js';
import { Navigator } from 'node-navigator';
import { PorridgeDB } from '../lib/web-porridge.mjs';
import { suite } from 'uvu';
import { values } from './shared.mjs';
import * as assert from 'uvu/assert';
import browserEnv from 'browser-env';

const test = suite('indexedDB.didExpire');

browserEnv(['window']);
global['navigator'] = new Navigator();
window.indexedDB = {}

const db = new PorridgeDB();

test.before.each(async () => {
	await db.clear();
});

test('true', async () => {
	await db.setItem('demo', values.string, { expires: Date.now() - 1000});

	const actual = await db.didExpire('demo');
	const expected = true;

	assert.is(actual, expected);
});

test('false', async () => {
	await db.setItem('demo', values.string, { expires: Date.now() + 1000});

	const actual = await db.didExpire('demo');
	const expected = false;

	assert.is(actual, expected);
});

test.run();
