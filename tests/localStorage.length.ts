import './polyfills';
import { Porridge } from '../src/index';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

const test = suite('localStorage.length');
const localPorridge = new Porridge('localStorage');

test('Empty', () => {
	localStorage.clear();

	const actual = localPorridge.length;

	assert.is(actual, 0);
});

test('Single Item', () => {
	localStorage.clear();
	localStorage.setItem('demo', 'Hello World!');

	const actual = localPorridge.length;

	assert.is(actual, 1);
});

test.run();
