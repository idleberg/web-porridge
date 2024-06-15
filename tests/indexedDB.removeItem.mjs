import 'fake-indexeddb/auto';
import { Navigator } from 'node-navigator';
import { PorridgeDB } from '../src/index';
import { suite } from 'uvu';
import { values } from './shared.mjs';
import * as assert from 'uvu/assert';
import browserEnv from 'browser-env';

const test = suite('indexedDB.length');

browserEnv(['window']);
globalThis['navigator'] = new Navigator();
window.indexedDB = {}

const db = new PorridgeDB();

test('String', async () => {
	await db.setItem('demo', values.string);
	await db.removeItem('demo');

	const actual = await db.getItem('demo');
	const expected = null

	assert.is(actual, expected);
});

test('Object key', async () => {
	await db.setItem('demo', {
			...values.object,
			deleteMe: true
		});

	await db.removeItem('demo', { prop: 'deleteMe' });

	const actual = await db.getItem('demo');
	const expected =  {
		...values.object
	};

	assert.equal(actual, expected);
});

test.run();
