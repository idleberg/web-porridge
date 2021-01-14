import 'fake-indexeddb/auto';
import 'localstorage-polyfill';

import { WebPorridgeDB } from '../lib';
const db = new WebPorridgeDB();

import browserEnv from 'browser-env';
import test from 'ava';
import { v4 as uuid } from 'uuid';

browserEnv(['window']);

import * as shared from './shared';

test('Object', async t => {
  const itemName = uuid();

  await db.setItem(itemName, shared.actualObject);

  const actual = await db.getJSON(itemName);

  t.deepEqual(shared.actualObject, actual);
});

test('Valid JSON', async t => {
  const itemName = uuid();

  await db.setItem(itemName, JSON.stringify(shared.actualObject));

  const actual = await db.getJSON(itemName);

  t.deepEqual(shared.actualObject, actual);
});

test('Invalid JSON', async t => {
  const itemName = uuid();

  await db.setItem(itemName, shared.invalidJSON);

  const actual = await db.getJSON(itemName);

  t.is(shared.invalidJSON, actual);
});

test('true', async t => {
  const itemName = uuid();
  await db.setItem(itemName, true);

  const expected = true;
  const actual = await db.getJSON(itemName);

  t.is(actual, expected);
});

test('false', async t => {
  const itemName = uuid();
  await db.setItem(itemName, false);

  const expected = false;
  const actual = await db.getJSON(itemName);

  t.is(actual, expected);
});

test('Int', async t => {
  const itemName = uuid();
  await db.setItem(itemName, 1);

  const expected = 1;
  const actual = await db.getJSON(itemName);

  t.is(actual, expected);
});

test('Float', async t => {
  const itemName = uuid();
  await db.setItem(itemName, 1.2);

  const expected = 1.2;
  const actual = await db.getJSON(itemName);

  t.is(actual, expected);
});

test('null', async t => {
  const itemName = uuid();
  await db.setItem(itemName, null);

  const expected = null;
  const actual = await db.getJSON(itemName);

  t.is(actual, expected);
});

test('Object key', async t => {
  const itemName = uuid();

  await db.setItem(itemName, JSON.stringify(shared.actualObject));

  const actual = await db.getJSON(itemName, 'nested');

  t.is('Bye World!', actual);
});
