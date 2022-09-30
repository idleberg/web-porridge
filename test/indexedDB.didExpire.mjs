import 'fake-indexeddb/auto.js';
import { Navigator } from 'node-navigator';
import { values } from './shared.mjs';
import { PorridgeDB } from '../lib/web-porridge.mjs';
import browserEnv from 'browser-env';
import test from 'ava';

browserEnv(['window']);
global['navigator'] = new Navigator();
window.indexedDB = {}

const db = new PorridgeDB();

test.beforeEach(async () => {
	await db.clear();
});

test.serial('Did expire', async t => {
	await db.setItem('demo', values.string, { expires: Date.now() - 1000});

	const actual = await db.didExpire('demo');
	const expected = true;

	t.is(actual, expected);
});

test.serial('Did not expire)', async t => {
	await db.setItem('demo', values.string, { expires: Date.now() + 1000});

	const actual = await db.didExpire('demo');
	const expected = false;

	t.is(actual, expected);
});
