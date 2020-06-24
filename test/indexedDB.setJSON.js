import 'fake-indexeddb/auto';
import 'localstorage-polyfill';

import { WebPorridgeDB } from '../lib';
const db = new WebPorridgeDB({ base64: true});

import browserEnv from 'browser-env';
import test from 'ava';
import { v4 as uuid } from 'uuid';

browserEnv(['window']);

import {
  actualString,
  actualObject,
  invalidJSON,
  actualBase64String,
  actualBase64Object,
  invalidBase64JSON,
} from './shared';

test('String', async t => {
  const itemName = uuid();

  await db.setJSON(itemName, actualString);

  const actual = await db.getItem(itemName);

  t.is(actualString, actual);
});

test('Valid JSON', async t => {
  const itemName = uuid();

  await db.setJSON(itemName, actualObject);

  const actual = await db.getItem(itemName);

  t.deepEqual(actualObject, actual);
});

test('Invalid JSON', async t => {
  const itemName = uuid();

  await db.setJSON(itemName, invalidJSON);

  const actual = await db.getItem(itemName);

  t.is(invalidJSON, actual);
});

test('Object key', async t => {
  const itemName = uuid();

  await db.setJSON(itemName, actualObject);
  await db.setJSON(itemName, actualString, 'nested');

  const actual = (await db.getItem(itemName)).nested;

  t.is(actualString, actual);
});

test('true', async t => {
  const itemName = uuid();

  await db.setJSON(itemName, true);

  const actual = await db.getItem(itemName);

  t.is(true, actual);
});

test('false', async t => {
  const itemName = uuid();

  await db.setJSON(itemName, false);

  const actual = await db.getItem(itemName);

  t.is(false, actual);
});

test('null', async t => {
  const itemName = uuid();

  await db.setJSON(itemName, null);

  const actual = await db.getItem(itemName);

  t.is(null, actual);
});

test('Int', async t => {
  const itemName = uuid();

  await db.setJSON(itemName, 1);

  const actual = await db.getItem(itemName);

  t.is(1, actual);
});

test('Float', async t => {
  const itemName = uuid();

  await db.setJSON(itemName, 1.2);

  const actual = await db.getItem(itemName);

  t.is(1.2, actual);
});
