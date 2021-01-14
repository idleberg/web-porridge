import 'fake-indexeddb/auto';
import 'localstorage-polyfill';

import { WebPorridge } from '../lib';
const localPorridge = new WebPorridge('localStorage');

import browserEnv from 'browser-env';
import test from 'ava';

browserEnv(['window']);

import * as shared from './shared';

test('String', t => {
  localPorridge.setJSON('demo', shared.actualString);

  const actual = localStorage.getItem('demo');

  t.is(shared.actualString, actual);
});

test('Valid JSON', t => {
  localPorridge.setJSON('demo', shared.actualObject);

  const actual = JSON.parse(localStorage.getItem('demo'));

  t.deepEqual(shared.actualObject, actual);
});

test('Invalid JSON', t => {
  localPorridge.setJSON('demo', shared.invalidJSON);

  const actual = localStorage.getItem('demo');

  t.is(shared.invalidJSON, actual);
});

test('Object key', t => {
  localPorridge.setJSON('demo', shared.actualObject);
  localPorridge.setJSON('demo', shared.actualString, 'nested');

  const actual = JSON.parse(localStorage.getItem('demo')).nested;

  t.deepEqual(shared.actualString, actual);
});

test('true', t => {
  localPorridge.setJSON('demo', true);

  const actual = localStorage.getItem('demo');

  t.is('true', actual);
});

test('false', t => {
  localPorridge.setJSON('demo', false);

  const actual = localStorage.getItem('demo');

  t.is('false', actual);
});

test('null', t => {
  localPorridge.setJSON('demo', null);

  const actual = localStorage.getItem('demo');

  t.is('null', actual);
});

test('Int', t => {
  localPorridge.setJSON('demo', 1);

  const actual = localStorage.getItem('demo');

  t.is('1', actual);
});

test('Float', t => {
  localPorridge.setJSON('demo', 1.2);

  const actual = localStorage.getItem('demo');

  t.is('1.2', actual);
});
