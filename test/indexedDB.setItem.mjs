import 'fake-indexeddb/auto.js';
import { Navigator } from 'node-navigator';
import { values } from './shared.mjs';
import { WebPorridgeDB } from '../lib/web-porridge.js';
import browserEnv from 'browser-env';
import test from 'ava';

browserEnv(['window']);
global['navigator'] = new Navigator();
window.indexedDB = {}

const db = new WebPorridgeDB();

test.beforeEach(async () => {
	await db.clear();
});

test.serial('String', async t => {
  await db.setItem('demo', values.string);

  const actual = await db.getItem('demo');
  const expected = values.string;

  t.is(expected, actual);
});

test.serial('BigInt', async t => {
  await db.setItem('demo', values.bigint);

  const actual = await db.getItem('demo');
  const expected = values.bigint;

  t.is(expected, actual);
});

test.serial('Object', async t => {
  await db.setItem('demo', values.object);

  const actual = await db.getItem('demo');
  const expected = values.object;

  t.deepEqual(expected, actual);
});

test.serial('Object key', async t => {
  await db.setItem('demo', {
    ...values.object,
    deleteMe: true
  });

  await db.setItem('demo', false, { prop: 'deleteMe' });

  const actual = await db.getItem('demo');
  const expected = {
      ...values.object,
      deleteMe: false
    }


  t.deepEqual(expected, actual);
});

test.serial('Array', async t => {
  await db.setItem('demo', values.array);

  const actual = await db.getItem('demo');
  const expected = values.array;

  t.deepEqual(expected, actual);
});

test.serial('true', async t => {
  const expected = true;
  await db.setItem('demo', expected);

  const actual = await db.getItem('demo');

  t.is(expected, actual);
});

test.serial('false', async t => {
  const expected = false;
  await db.setItem('demo', expected);

  const actual = await db.getItem('demo');

  t.is(expected, actual);
});

test.serial('null', async t => {
  const expected = null;
  await db.setItem('demo', expected);

  const actual = await db.getItem('demo');

  t.is(expected, actual);
});

test.serial('undefined', async t => {
  const expected = undefined;
  await db.setItem('demo', expected);

  const actual = await db.getItem('demo');

  t.is(expected, actual);
});
