import 'localstorage-polyfill';
import { storageKeys, values } from './shared.mjs';
import { Porridge } from '../lib/web-porridge.mjs';
import browserEnv from 'browser-env';
import test from 'ava';

browserEnv(['window']);
const localPorridge = new Porridge('localStorage');

const {
	expires: $expires,
	type: $type,
	value: $value
} = storageKeys;

test.beforeEach(t => {
	localStorage.removeItem('demo');
});

test('Did expire', t => {
	localStorage.setItem('demo', JSON.stringify({
		[$expires]: Date.now() - 1000,
		[$type]: 'string',
		[$value]: values.string,
	}));

	const actual = localPorridge.didExpire('demo');
	const expected = true;

	t.is(actual, expected);
});

test('Did not expire', t => {
	localStorage.setItem('demo', JSON.stringify({
		[$expires]: Date.now() + 1000,
		[$type]: 'string',
		[$value]: values.string
	}));

	const actual = localPorridge.didExpire('demo');
	const expected = false;

	t.is(actual, expected);
});
