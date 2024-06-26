import './polyfills';
import { Porridge } from '../src/index';
import { storageKeys, values } from './shared';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

const test = suite('localStorage.removeItem');
const localPorridge = new Porridge('localStorage');

test('String', () => {
	localStorage.setItem('demo', values.string);
	localPorridge.removeItem('demo');

	const actual = localStorage.getItem('demo');
	const expected = null

	assert.is(actual, expected);
});

test('Object key', () => {
	localStorage.setItem('demo', JSON.stringify({
		[storageKeys.value]: {
			...values.object,
			deleteMe: true
		},
		[storageKeys.type]: 'object'
	}));

	localPorridge.removeItem('demo', { prop: 'deleteMe' });

	const actual = JSON.parse(localStorage.getItem('demo')!);
	const expected = {
		[storageKeys.value]: {
			...values.object
		},
		[storageKeys.type]: 'object'
	};

	assert.equal(actual, expected);
});

test.run();
