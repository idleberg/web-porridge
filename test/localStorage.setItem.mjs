import 'localstorage-polyfill';
import { storageKeys, values } from './shared.mjs';
import { WebPorridge } from '../lib/web-porridge.js';
import browserEnv from 'browser-env';
import test from 'ava';

browserEnv(['window']);
const localPorridge = new WebPorridge('localStorage');

const {
  type: $type,
  value: $value
} = storageKeys;

test('String', t => {
  localPorridge.setItem('demo', values.string);

  const actual = JSON.parse(localStorage.getItem('demo'))[$value];
  const expected = values.string;

  t.is(expected, actual);
});

test('BigInt', t => {
  localPorridge.setItem('demo', values.bigint);

  const actual = BigInt(JSON.parse(localStorage.getItem('demo'))[$value]);
  const expected = values.bigint;

  t.is(expected, actual);
});

test('Object', t => {
  localPorridge.setItem('demo', values.object);

  const actual = JSON.parse(localStorage.getItem('demo'))[$value];
  const expected = values.object;

  t.deepEqual(expected, actual);
});

test('Object key', t => {
  localStorage.setItem('demo', JSON.stringify({
    [$type]: 'object',
    [$value]: {
      ...values.object,
      deleteMe: true
    },
  }));

  localPorridge.setItem('demo', false, { key: 'deleteMe' });

  const actual = JSON.parse(localStorage.getItem('demo'));
  const expected = {
    [$type]: 'object',
    [$value]: {
      ...values.object,
      deleteMe: false
    }
  };


  t.deepEqual(expected, actual);
});

test('Array', t => {
  localPorridge.setItem('demo', values.array);

  const actual = JSON.parse(localStorage.getItem('demo'))[$value];
  const expected = values.array;

  t.deepEqual(expected, actual);
});

test('true', t => {
  const expected = true;
  localPorridge.setItem('demo', expected);

  const actual = JSON.parse(localStorage.getItem('demo'))[$value];

  t.is(expected, actual);
});

test('false', t => {
  const expected = false;
  localPorridge.setItem('demo', expected);

  const actual = JSON.parse(localStorage.getItem('demo'))[$value];

  t.is(expected, actual);
});

test('null', t => {
  const expected = null;
  localPorridge.setItem('demo', expected);

  const actual = JSON.parse(localStorage.getItem('demo'))[$value];

  t.is(expected, actual);
});

test('undefined', t => {
  const expected = undefined;
  localPorridge.setItem('demo', expected);

  const actual = JSON.parse(localStorage.getItem('demo'))[$value];

  t.is(expected, actual);
});
