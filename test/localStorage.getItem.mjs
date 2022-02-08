import 'localstorage-polyfill';
import { storageKeys, values } from './shared.mjs';
import { WebPorridge } from '../lib/web-porridge.js';
import browserEnv from 'browser-env';
import test from 'ava';

browserEnv(['window']);
const localPorridge = new WebPorridge('localStorage');

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

  t.is(expected, actual);
});

test('String (has expired)', t => {
  localStorage.setItem('demo', JSON.stringify({
    [$expires]: Date.now() - 1000,
    [$type]: 'string',
    [$value]: values.string,
  }));

  const actual = localPorridge.getItem('demo');
  const expected = null;

  t.is(expected, actual);
});

test('String (hasn\'t expired)', t => {
  localStorage.setItem('demo', JSON.stringify({
    [$expires]: Date.now() + 1000,
    [$type]: 'string',
    [$value]: values.string
  }));

  const expected = values.string;
  const actual = localPorridge.getItem('demo');

  t.is(expected, actual);
});

test('BigInt', t => {
  localStorage.setItem('demo', JSON.stringify({
    [$type]: 'bigint',
    [$value]: values.bigint.toString()
  }));

  const actual = localPorridge.getItem('demo');
  const expected = values.bigint;

  t.is(expected, actual);
});

test('Object', t => {
  localStorage.setItem('demo', JSON.stringify({
    [$type]: 'object',
    [$value]: values.object
  }));

  const actual = localPorridge.getItem('demo');
  const expected = values.object;

  t.deepEqual(expected, actual);
});

test('Object (key)', t => {
  localStorage.setItem('demo', JSON.stringify({
    [$type]: 'object',
    [$value]: values.object
  }));

  const actual = localPorridge.getItem('demo', { key: 'message' });
  const expected = values.object.message;

  t.deepEqual(expected, actual);
});

test('Array', t => {
  localStorage.setItem('demo', JSON.stringify({
    [$type]: 'object',
    [$value]: values.array
  }));

  const actual = localPorridge.getItem('demo');
  const expected = values.array;

  t.deepEqual(expected, actual);
});

test('true', t => {
  const expected = true;
  localStorage.setItem('demo', JSON.stringify({
    [$type]: 'boolean',
    [$value]: expected
  }));

  const actual = localPorridge.getItem('demo');

  t.deepEqual(expected, actual);
});

test('false', t => {
  const expected = false;
  localStorage.setItem('demo', JSON.stringify({
    [$type]: 'boolean',
    [$value]: expected
  }));

  const actual = localPorridge.getItem('demo');

  t.deepEqual(expected, actual);
});

test('null', t => {
  const expected = null;
  localStorage.setItem('demo', JSON.stringify({
    [$type]: 'null',
    [$value]: expected
  }));

  const actual = localPorridge.getItem('demo');

  t.deepEqual(expected, actual);
});

test('undefined', t => {
  const expected = undefined;
  localStorage.setItem('demo', JSON.stringify({
    [$type]: 'undefined',
    [$value]: expected
  }));

  const actual = localPorridge.getItem('demo');

  t.deepEqual(expected, actual);
});
