import './polyfills';
import { storageKeys, values } from './shared';
import { Porridge } from '../src/index';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

const test = suite('localStorage.setItem');
const localPorridge = new Porridge('localStorage');

const {
	type: $type,
	value: $value
} = storageKeys;

test('String', () => {
	localPorridge.setItem('demo', values.string);

	const actual = JSON.parse(localStorage.getItem('demo')!)[$value];
	const expected = values.string;

	assert.is(actual, expected);
});

test('BigInt', () => {
	localPorridge.setItem('demo', values.bigint);

	const actual = BigInt(JSON.parse(localStorage.getItem('demo')!)[$value]);
	const expected = values.bigint;

	assert.is(actual, expected);
});

test('Date', () => {
	localPorridge.setItem('demo', values.date);

	const actual = new Date(JSON.parse(localStorage.getItem('demo')!)[$value]);
	const expected = values.date;

	assert.is(actual instanceof Date, expected instanceof Date);
	assert.is(actual.valueOf(), expected.valueOf());
});

test('Object', () => {
	localPorridge.setItem('demo', values.object);

	const actual = JSON.parse(localStorage.getItem('demo')!)[$value];
	const expected = values.object;

	assert.equal(actual, expected);
});

test('Object key', () => {
	localStorage.setItem('demo', JSON.stringify({
		[$type]: 'object',
		[$value]: {
			...values.object,
			deleteMe: true
		},
	}));

	localPorridge.setItem('demo', false, { prop: 'deleteMe' });

	const actual = JSON.parse(localStorage.getItem('demo')!);
	const expected = {
		[$type]: 'object',
		[$value]: {
			...values.object,
			deleteMe: false
		}
	};


	assert.equal(actual, expected);
});

test('Array', () => {
	localPorridge.setItem('demo', values.array);

	const actual = JSON.parse(localStorage.getItem('demo')!)[$value];
	const expected = values.array;

	assert.equal(actual, expected);
});

test('true', () => {
	const expected = true;
	localPorridge.setItem('demo', expected);

	const actual = JSON.parse(localStorage.getItem('demo')!)[$value];

	assert.is(actual, expected);
});

test('false', () => {
	const expected = false;
	localPorridge.setItem('demo', expected);

	const actual = JSON.parse(localStorage.getItem('demo')!)[$value];

	assert.is(actual, expected);
});

test('null', () => {
	const expected = null;
	localPorridge.setItem('demo', expected);

	const actual = JSON.parse(localStorage.getItem('demo')!)[$value];

	assert.is(actual, expected);
});

test('undefined', () => {
	const expected = undefined;
	localPorridge.setItem('demo', expected);

	const actual = JSON.parse(localStorage.getItem('demo')!)[$value];

	assert.is(actual, expected);
});

test.run();
