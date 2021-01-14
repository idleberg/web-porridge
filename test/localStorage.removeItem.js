import 'fake-indexeddb/auto';
import 'localstorage-polyfill';

import { WebPorridge } from '../lib';
const localPorridge = new WebPorridge('localStorage');

import browserEnv from 'browser-env';
import test from 'ava';

browserEnv(['window']);

import * as shared from './shared';

test('String', t => {
  localStorage.setItem('demo', shared.actualString);
  localPorridge.removeItem('demo');

  const expected = null;
  const actual = localStorage.getItem('demo')

  t.is(actual, expected);
});

test('Object key', t => {
  localStorage.setItem('demo', JSON.stringify({
    ...shared.actualObject,
    deleteMe: true
  }));
  localPorridge.removeItem('demo', 'deleteMe');

  const actual = localStorage.getItem('demo')

  t.is(actual, JSON.stringify(shared.actualObject));
});
