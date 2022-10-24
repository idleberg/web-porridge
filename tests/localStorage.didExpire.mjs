import 'localstorage-polyfill';
import { Porridge } from '../lib/web-porridge.mjs';
import { storageKeys, values } from './shared.mjs';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import browserEnv from 'browser-env';

const test = suite('localStorage.didExpire');

browserEnv(['window']);
const localPorridge = new Porridge('localStorage');

const {
	expires: $expires,
	type: $type,
	value: $value
} = storageKeys;

test.before.each(() => {
	localStorage.removeItem('demo');
});

test('Did expire', () => {
	localStorage.setItem('demo', JSON.stringify({
		[$expires]: Date.now() - 1000,
		[$type]: 'string',
		[$value]: values.string,
	}));

	const actual = localPorridge.didExpire('demo');
	const expected = true;

	assert.is(actual, expected);
});

test('Did not expire', () => {
	localStorage.setItem('demo', JSON.stringify({
		[$expires]: Date.now() + 1000,
		[$type]: 'string',
		[$value]: values.string
	}));

	const actual = localPorridge.didExpire('demo');
	const expected = false;

	assert.is(actual, expected);
});

test.run();
