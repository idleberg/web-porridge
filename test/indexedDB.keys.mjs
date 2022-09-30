import 'fake-indexeddb/auto.js';
import { Navigator } from 'node-navigator';
import { PorridgeDB } from '../lib/web-porridge.mjs';
import browserEnv from 'browser-env';
import test from 'ava';

browserEnv(['window']);
global['navigator'] = new Navigator();
window.indexedDB = {}

const db = new PorridgeDB();
const values = [1, 2, 3];

test.beforeEach(async () => {
	await db.clear();
});

test.serial('true', async t => {
	Promise.all(values.map(async item => await db.setItem(`demo${item}`, item)));

	const actual = await db.keys();
	const expected = ['demo1', 'demo2', 'demo3'];

	t.deepEqual(actual, expected);
});

test.serial('false', async t => {
	Promise.all(values.map(async item => await db.setItem(`demo${item}`, item)));

	await db.clear();
	const actual = await db.keys();
	const expected = [];

	t.deepEqual(actual, expected);
});
