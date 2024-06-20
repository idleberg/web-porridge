import './polyfills';
import { Porridge } from '../src/index';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

const test = suite('localStorage.clear');
const localPorridge = new Porridge('localStorage');

test('Empty', () => {
	localStorage.setItem('demo', 'Hello World!');
	localPorridge.clear();

	const actual = localStorage.length;

	assert.is(actual, 0);
});

test('Not Empty', () => {
	localPorridge.clear();
	localStorage.setItem('demo', 'Hello World!');

	const actual = localStorage.length;

	assert.is(actual, 1);
});

test.run();
