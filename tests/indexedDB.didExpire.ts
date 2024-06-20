import './polyfills';
import { PorridgeDB } from '../src/index';
import { suite } from 'uvu';
import { values } from './shared';
import * as assert from 'uvu/assert';

const test = suite('indexedDB.didExpire');
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
