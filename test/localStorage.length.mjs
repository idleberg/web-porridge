import 'localstorage-polyfill';
import { Porridge } from '../lib/web-porridge.mjs';
import browserEnv from 'browser-env';
import test from 'ava';

browserEnv(['window']);
const localPorridge = new Porridge('localStorage');

test('Empty', t => {
	localStorage.clear();

	const actual = localPorridge.length;

	t.is(actual, 0);
});

test('Single Item', t => {
	localStorage.clear();
	localStorage.setItem('demo', 'Hello World!');

	const actual = localPorridge.length;

	t.is(actual, 1);
});
