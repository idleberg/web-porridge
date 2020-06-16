import 'fake-indexeddb/auto';
import 'localstorage-polyfill';

import { WebPorridgeDB } from '../lib';
const db = new WebPorridgeDB({ base64: true});

import { base64Decode, base64Encode } from '../lib/';
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

test(`Base64: Valid JSON`, async t => {
  const itemName = uuid();

  const expected = base64Encode(JSON.stringify(actualObject));
  await db.setItem(itemName, expected);

  const actual = (await db.getItem(itemName));

  t.deepEqual(actual, actualObject);
});

test(`Base64: Valid JSON (no decoding)`, async t => {
  const itemName = uuid();

  const encodedObject = base64Encode(JSON.stringify(actualObject));
  await db.setItem(itemName, encodedObject);

  const actual = await db.getItem(itemName, null, { base64: false});

  t.is(encodedObject, actual)
});

test(`Base64: Invalid JSON`, async t => {
  const itemName = uuid();

  const expected = base64Encode(invalidJSON);
  await db.setItem(itemName, expected);

  const actual = await db.getItem(itemName);

  t.is(invalidJSON, actual)
});

test(`Base64: true`, async t => {
  const itemName = uuid();

  const expected = true;
  await db.setItem(itemName, base64Encode(expected));

  const actual = await db.getItem(itemName);

  t.is(true, actual)
});

test(`Base64: false`, async t => {
  const itemName = uuid();

  const expected = false;
  await db.setItem(itemName, base64Encode(expected));

  const actual = await db.getItem(itemName);

  t.is(expected, actual)
});

test(`Base64: null`, async t => {
  const itemName = uuid();

  const expected = null;
  await db.setItem(itemName, base64Encode(expected));

  const actual = await db.getItem(itemName);

  t.is(expected, actual)
});

test(`Base64: Int`, async t => {
  const itemName = uuid();

  const expected = 1;
  await db.setItem(itemName, base64Encode(expected));

  const actual = await db.getItem(itemName);

  t.is(expected, actual)
});

test(`Base64: Float`, async t => {
  const itemName = uuid();

  const expected = 1.2;
  await db.setItem(itemName, base64Encode(expected));

  const actual = await db.getItem(itemName);

  t.is(expected, actual)
});
