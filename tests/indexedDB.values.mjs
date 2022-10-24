import 'fake-indexeddb/auto';
import { Navigator } from 'node-navigator';
import { PorridgeDB } from '../lib/web-porridge.mjs';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import browserEnv from 'browser-env';

const test = suite('indexedDB.values');

browserEnv(['window']);
global['navigator'] = new Navigator();
window.indexedDB = {}

const db = new PorridgeDB();
const values = [0, 1, 3];

test.before.each(async () => {
	await db.clear();
});

test('true', async () => {
	Promise.all(values.map(async item => await db.setItem(`demo${item}`, item)));

	const actual = await db.values();
	const expected = values;

	assert.equal(actual, expected);
});

test('false', async () => {
	Promise.all(values.map(async item => await db.setItem(`demo${item}`, item)));

	await db.clear();
	const actual = await db.values();
	const expected = [];

	assert.equal(actual, expected);
});

test.run();
