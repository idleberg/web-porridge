import './polyfills';
import { Porridge } from '../src/index';
import { storageKeys, values } from './shared';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

const test = suite('localStorage.getItem');
const localPorridge = new Porridge('localStorage');

const {
	expires: $expires,
	type: $type,
	value: $value
} = storageKeys;

test.before.each(() => {
	localStorage.removeItem('demo');
});

test('String', () => {
	localStorage.setItem('demo', JSON.stringify({
		[$type]: 'string',
		[$value]: values.string
	}));

	const actual = localPorridge.getItem('demo');
	const expected = values.string;

	assert.is(actual, expected);
});

test('String (has expired)', () => {
	localStorage.setItem('demo', JSON.stringify({
		[$expires]: Date.now() - 1000,
		[$type]: 'string',
		[$value]: values.string,
	}));

	const actual = localPorridge.getItem('demo');
	const expected = null;

	assert.is(actual, expected);
});

test('String (hasn\'t expired)', () => {
	localStorage.setItem('demo', JSON.stringify({
		[$expires]: Date.now() + 1000,
		[$type]: 'string',
		[$value]: values.string
	}));

	const expected = values.string;
	const actual = localPorridge.getItem('demo');

	assert.is(actual, expected);
});

test('BigInt', () => {
	localStorage.setItem('demo', JSON.stringify({
		[$type]: 'bigint',
		[$value]: values.bigint.toString()
	}));

	const actual = localPorridge.getItem('demo');
	const expected = values.bigint;

	assert.is(actual, expected);
});

test('Date', () => {
	localStorage.setItem('demo', JSON.stringify({
		[$type]: 'date',
		[$value]: values.date.valueOf()
	}));

	const actual = localPorridge.getItem('demo') as Date;
	const expected = values.date;

	assert.is(actual instanceof Date, expected instanceof Date);
	assert.is(actual.valueOf(), expected.valueOf());
});

test('Object', () => {
	localStorage.setItem('demo', JSON.stringify({
		[$type]: 'object',
		[$value]: values.object
	}));

	const actual = localPorridge.getItem('demo');
	const expected = values.object;

	assert.equal(actual, expected);
});

test('Object (key)', () => {
	localStorage.setItem('demo', JSON.stringify({
		[$type]: 'object',
		[$value]: values.object
	}));

	const actual = localPorridge.getItem('demo', { prop: 'message' });
	const expected = values.object.message;

	assert.equal(actual, expected);
});

test('Array', () => {
	localStorage.setItem('demo', JSON.stringify({
		[$type]: 'array',
		[$value]: values.array
	}));

	const actual = localPorridge.getItem('demo');
	const expected = values.array;

	assert.equal(actual, expected);
});

test('true', () => {
	const expected = true;
	localStorage.setItem('demo', JSON.stringify({
		[$type]: 'boolean',
		[$value]: expected
	}));

	const actual = localPorridge.getItem('demo');

	assert.equal(actual, expected);
});

test('false', () => {
	const expected = false;
	localStorage.setItem('demo', JSON.stringify({
		[$type]: 'boolean',
		[$value]: expected
	}));

	const actual = localPorridge.getItem('demo');

	assert.equal(actual, expected);
});

test('null', () => {
	const expected = null;
	localStorage.setItem('demo', JSON.stringify({
		[$type]: 'null',
		[$value]: expected
	}));

	const actual = localPorridge.getItem('demo');

	assert.equal(actual, expected);
});

test('undefined', () => {
	const expected = undefined;
	localStorage.setItem('demo', JSON.stringify({
		[$type]: 'undefined',
		[$value]: expected
	}));

	const actual = localPorridge.getItem('demo');

	assert.equal(actual, expected);
});


test.run()
