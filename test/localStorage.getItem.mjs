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

test('String', t => {
	localStorage.setItem('demo', JSON.stringify({
		[$type]: 'string',
		[$value]: values.string
	}));

	const actual = localPorridge.getItem('demo');
	const expected = values.string;

	t.is(actual, expected);
});

test('String (has expired)', t => {
	localStorage.setItem('demo', JSON.stringify({
		[$expires]: Date.now() - 1000,
		[$type]: 'string',
		[$value]: values.string,
	}));

	const actual = localPorridge.getItem('demo');
	const expected = null;

	t.is(actual, expected);
});

test('String (hasn\'t expired)', t => {
	localStorage.setItem('demo', JSON.stringify({
		[$expires]: Date.now() + 1000,
		[$type]: 'string',
		[$value]: values.string
	}));

	const expected = values.string;
	const actual = localPorridge.getItem('demo');

	t.is(actual, expected);
});

test('BigInt', t => {
	localStorage.setItem('demo', JSON.stringify({
		[$type]: 'bigint',
		[$value]: values.bigint.toString()
	}));

	const actual = localPorridge.getItem('demo');
	const expected = values.bigint;

	t.is(actual, expected);
});

test('Date', t => {
	localStorage.setItem('demo', JSON.stringify({
		[$type]: 'date',
		[$value]: values.date.valueOf()
	}));

	const actual = localPorridge.getItem('demo');
	const expected = values.date;

	t.is(actual instanceof Date, expected instanceof Date);
	t.is(actual.valueOf(), expected.valueOf());
});

test('Object', t => {
	localStorage.setItem('demo', JSON.stringify({
		[$type]: 'object',
		[$value]: values.object
	}));

	const actual = localPorridge.getItem('demo');
	const expected = values.object;

	t.deepEqual(actual, expected);
});

test('Object (key)', t => {
	localStorage.setItem('demo', JSON.stringify({
		[$type]: 'object',
		[$value]: values.object
	}));

	const actual = localPorridge.getItem('demo', { prop: 'message' });
	const expected = values.object.message;

	t.deepEqual(actual, expected);
});

test('Array', t => {
	localStorage.setItem('demo', JSON.stringify({
		[$type]: 'object',
		[$value]: values.array
	}));

	const actual = localPorridge.getItem('demo');
	const expected = values.array;

	t.deepEqual(actual, expected);
});

test('true', t => {
	const expected = true;
	localStorage.setItem('demo', JSON.stringify({
		[$type]: 'boolean',
		[$value]: expected
	}));

	const actual = localPorridge.getItem('demo');

	t.deepEqual(actual, expected);
});

test('false', t => {
	const expected = false;
	localStorage.setItem('demo', JSON.stringify({
		[$type]: 'boolean',
		[$value]: expected
	}));

	const actual = localPorridge.getItem('demo');

	t.deepEqual(actual, expected);
});

test('null', t => {
	const expected = null;
	localStorage.setItem('demo', JSON.stringify({
		[$type]: 'null',
		[$value]: expected
	}));

	const actual = localPorridge.getItem('demo');

	t.deepEqual(actual, expected);
});

test('undefined', t => {
	const expected = undefined;
	localStorage.setItem('demo', JSON.stringify({
		[$type]: 'undefined',
		[$value]: expected
	}));

	const actual = localPorridge.getItem('demo');

	t.deepEqual(actual, expected);
});
