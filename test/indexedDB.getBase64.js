import 'fake-indexeddb/auto';
import 'localstorage-polyfill';

import { WebPorridgeDB } from '../lib';
const db = new WebPorridgeDB();

import { base64Encode } from '../lib/util';
import browserEnv from 'browser-env';
import test from 'ava';
import { v4 as uuid } from 'uuid';

browserEnv(['window']);

import * as shared from './shared';

test('Valid JSON', async t => {
  const itemName = uuid();

  const expected = base64Encode(JSON.stringify(shared.actualObject));
  await db.setItem(itemName, expected);

  const actual = (await db.getBase64(itemName));

  t.deepEqual(actual, shared.actualObject);
});

test('Valid JSON (no decoding)', async t => {
  const itemName = uuid();

  const encodedObject = base64Encode(JSON.stringify(shared.actualObject));
  await db.setItem(itemName, encodedObject);

  const decodedPorridge = await db.getBase64(itemName, null, { json: false });

  t.is(JSON.stringify(shared.actualObject), decodedPorridge)
});

test('Invalid JSON', async t => {
  const itemName = uuid();

  const expected = base64Encode(shared.invalidJSON);
  await db.setItem(itemName, expected);

  const actual = await db.getBase64(itemName);

  t.is(shared.invalidJSON, actual)
});

test('true', async t => {
  const itemName = uuid();

  const expected = true;
  await db.setItem(itemName, base64Encode(expected));

  const actual = await db.getBase64(itemName);

  t.is(true, actual)
});

test('false', async t => {
  const itemName = uuid();

  const expected = false;
  await db.setItem(itemName, base64Encode(expected));

  const actual = await db.getBase64(itemName);

  t.is(expected, actual)
});

test('null', async t => {
  const itemName = uuid();

  const expected = null;
  await db.setItem(itemName, base64Encode(expected));

  const actual = await db.getBase64(itemName);

  t.is(expected, actual)
});

test('Int', async t => {
  const itemName = uuid();

  const expected = 1;
  await db.setItem(itemName, base64Encode(expected));

  const actual = await db.getBase64(itemName);

  t.is(expected, actual)
});

test('Float', async t => {
  const itemName = uuid();

  const expected = 1.2;
  await db.setItem(itemName, base64Encode(expected));

  const actual = await db.getBase64(itemName);

  t.is(expected, actual)
});
