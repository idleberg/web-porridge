import 'localstorage-polyfill';
import { Porridge } from '../lib/web-porridge.mjs';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import browserEnv from 'browser-env';

const test = suite('localStorage.clear');

browserEnv(['window']);
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
