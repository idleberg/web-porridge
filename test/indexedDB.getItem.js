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

  await db.setItem(itemName, actualString);

  const expected = await db.getItem(itemName);

  t.is(actualString, expected);
});

test('Object', async t => {
  const itemName = uuid();

  await db.setItem(itemName, actualObject);

  const actual = await db.getItem(itemName);

  t.deepEqual(actualObject, actual);
});

test('Valid JSON', async t => {
  const itemName = uuid();

  await db.setItem(itemName, JSON.stringify(actualObject));

  const actual = await db.getItem(itemName);

  t.deepEqual(actualObject, actual);
});

test('Valid JSON (no decoding)', async t => {
  const itemName = uuid();
  const jsonString = JSON.stringify(actualObject);

  await db.setItem(itemName, jsonString);

  const actual = await db.getItem(itemName, '', { json: false});

  t.is(jsonString, actual);
});

test('Invalid JSON', async t => {
  const itemName = uuid();

  await db.setItem(itemName, invalidJSON);

  const actual = await db.getItem(itemName);

  t.is(invalidJSON, actual);
});

test('true', async t => {
  const itemName = uuid();
  await db.setItem(itemName, true);

  const expected = true;
  const actual = await db.getItem(itemName);

  t.is(actual, expected);
});

test('false', async t => {
  const itemName = uuid();
  await db.setItem(itemName, false);

  const expected = false;
  const actual = await db.getItem(itemName);

  t.is(actual, expected);
});

test('Int', async t => {
  const itemName = uuid();
  await db.setItem(itemName, 1);

  const expected = 1;
  const actual = await db.getItem(itemName);

  t.is(actual, expected);
});

test('Float', async t => {
  const itemName = uuid();
  await db.setItem(itemName, 1.2);

  const expected = 1.2;
  const actual = await db.getItem(itemName);

  t.is(actual, expected);
});

test('null', async t => {
  const itemName = uuid();
  await db.setItem(itemName, null);

  const expected = null;
  const actual = await db.getItem(itemName);

  t.is(actual, expected);
});

test('Base64 String', async t => {
  const itemName = uuid();
  await db.setItem(itemName, actualBase64String);

  const actual = await db.getItem(itemName);

  t.is(actualString, actualString);
});

test('Base64 Valid JSON', async t => {
  const itemName = uuid();
  await db.setItem(itemName, actualBase64Object);

  const actual = await db.getItem(itemName);

  t.deepEqual(actualObject, actual);
});

test('Base64 Invalid JSON', async t => {
  const itemName = uuid();
  await db.setItem(itemName, invalidBase64JSON);

  const actual = await db.getItem(itemName);

  t.is(invalidJSON, actual);
});

test('Object key', async t => {
  const itemName = uuid();

  await db.setItem(itemName, JSON.stringify(actualObject));

  const actual = await db.getItem(itemName, 'nested');

  t.is('Bye World!', actual);
});
