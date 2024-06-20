import './polyfills';
import { Porridge } from '../src/index';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';

const test = suite('localStorage.key');
const localPorridge = new Porridge('localStorage');

test('undefined', () => {
	localStorage.clear();

	const actual = localPorridge.key(0);

	assert.is(actual, undefined);
});

test('Single Item', () => {
	const expected = 'demo';

	localStorage.clear();
	localStorage.setItem(expected, 'Hello World!');

	const actual = localPorridge.key(0);

	assert.is(actual, expected);
});

test.run();
