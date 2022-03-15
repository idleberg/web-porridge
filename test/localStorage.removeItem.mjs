import 'localstorage-polyfill';
import { storageKeys, values } from './shared.mjs';
import { Porridge } from '../lib/web-porridge.mjs';
import browserEnv from 'browser-env';
import test from 'ava';

browserEnv(['window']);
const localPorridge = new Porridge('localStorage');

test('String', t => {
  localStorage.setItem('demo', values.string);
  localPorridge.removeItem('demo');

  const actual = localStorage.getItem('demo');
  const expected = null

  t.is(expected, actual);
});

test('Object key', t => {
  localStorage.setItem('demo', JSON.stringify({
    [storageKeys.value]: {
      ...values.object,
      deleteMe: true
    },
    [storageKeys.type]: 'object'
  }));

  localPorridge.removeItem('demo', { prop: 'deleteMe' });

  const actual = JSON.parse(localStorage.getItem('demo'));
  const expected = {
    [storageKeys.value]: {
      ...values.object
    },
    [storageKeys.type]: 'object'
  };

  t.deepEqual(expected, actual);
});
