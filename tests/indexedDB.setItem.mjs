import 'fake-indexeddb/auto';
import { Navigator } from 'node-navigator';
import { PorridgeDB } from '../src/index';
import { suite } from 'uvu';
import { values } from './shared.mjs';
import * as assert from 'uvu/assert';
import browserEnv from 'browser-env';

const test = suite('indexedDB.setItem');

browserEnv(['window']);
global['navigator'] = new Navigator();
window.indexedDB = {}

const db = new PorridgeDB();

test.before.each(async () => {
	await db.clear();
});

test('String', async () => {
	await db.setItem('demo', values.string);

	const actual = await db.getItem('demo');
	const expected = values.string;

	assert.is(actual, expected);
});

test('BigInt', async () => {
	await db.setItem('demo', values.bigint);

	const actual = await db.getItem('demo');
	const expected = values.bigint;

	assert.is(actual, expected);
});

test('Date', async () => {
	await db.setItem('demo', values.date);

	const actual = await db.getItem('demo');
	const expected = values.date;

	assert.is(actual instanceof Date, expected instanceof Date);
	assert.is(actual.valueOf(), expected.valueOf());
});

test('Object', async () => {
	await db.setItem('demo', values.object);

	const actual = await db.getItem('demo');
	const expected = values.object;

	assert.equal(actual, expected);
});

test('Object key', async () => {
	await db.setItem('demo', {
		...values.object,
		deleteMe: true
	});

	await db.setItem('demo', false, { prop: 'deleteMe' });

	const actual = await db.getItem('demo');
	const expected = {
			...values.object,
			deleteMe: false
		}


	assert.equal(actual, expected);
});

test('Array', async () => {
	await db.setItem('demo', values.array);

	const actual = await db.getItem('demo');
	const expected = values.array;

	assert.equal(actual, expected);
});

test('true', async () => {
	const expected = true;
	await db.setItem('demo', expected);

	const actual = await db.getItem('demo');

	assert.is(actual, expected);
});

test('false', async () => {
	const expected = false;
	await db.setItem('demo', expected);

	const actual = await db.getItem('demo');

	assert.is(actual, expected);
});

test('null', async () => {
	const expected = null;
	await db.setItem('demo', expected);

	const actual = await db.getItem('demo');

	assert.is(actual, expected);
});

test('undefined', async () => {
	const expected = undefined;
	await db.setItem('demo', expected);

	const actual = await db.getItem('demo');

	assert.is(actual, expected);
});

test.run();
