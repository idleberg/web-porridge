import 'fake-indexeddb/auto.js';
import { Navigator } from 'node-navigator';
import { values } from './shared.mjs';
import { WebPorridgeDB } from '../lib/web-porridge.esm.js';
import browserEnv from 'browser-env';
import test from 'ava';

browserEnv(['window']);
global['navigator'] = new Navigator();
window.indexedDB = {}

const db = new WebPorridgeDB();

test.serial('String', async t => {
  await db.setItem('demo', values.string);
  await db.removeItem('demo');

  const actual = await db.getItem('demo');
  const expected = null

  t.is(expected, actual);
});

test.serial('Object key', async t => {
  await db.setItem('demo', {
      ...values.object,
      deleteMe: true
    });

  await db.removeItem('demo', 'deleteMe');

  const actual = await db.getItem('demo');
  const expected =  {
    ...values.object
  };

  t.deepEqual(expected, actual);
});
