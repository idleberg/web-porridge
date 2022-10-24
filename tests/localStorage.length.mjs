import 'localstorage-polyfill';
import { Porridge } from '../lib/web-porridge.mjs';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import browserEnv from 'browser-env';

const test = suite('localStorage.length');

browserEnv(['window']);
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
