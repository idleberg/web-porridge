import 'fake-indexeddb/auto';
import 'localstorage-polyfill';

import { WebPorridgeDB } from '../lib';
const db = new WebPorridgeDB({ base64: true});

import { base64Decode, base64Encode } from '../lib';
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

test('Valid JSON', async t => {
  const itemName = uuid();

  const expected = base64Encode(JSON.stringify(actualObject));
  await db.setItem(itemName, expected);

  const actual = (await db.getBase64(itemName));

  t.deepEqual(actual, actualObject);
});

test('Valid JSON (no decoding)', async t => {
  const itemName = uuid();

  const encodedObject = base64Encode(JSON.stringify(actualObject));
  await db.setItem(itemName, encodedObject);

  const decodedPorridge = await db.getBase64(itemName, null, { json: false });

  t.is(JSON.stringify(actualObject), decodedPorridge)
});

test('Invalid JSON', async t => {
  const itemName = uuid();

  const expected = base64Encode(invalidJSON);
  await db.setItem(itemName, expected);

  const actual = await db.getBase64(itemName);

  t.is(invalidJSON, actual)
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
