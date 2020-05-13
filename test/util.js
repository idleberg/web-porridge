const {
  base64Decode,
  base64Encode,
  isArray,
  isObject,
  isSerializableNumber,
  maybeBase64Decode,
  maybeDeserialize,
  maybeSerialize
} = require('../lib/util');

import test from 'ava';

const decodedString = 'Hello World!'
const encodedString = 'SGVsbG8gV29ybGQh';

test('base64Decode()', t => {
  const actual = base64Decode(encodedString);
  const expected = decodedString;

  t.is(actual, expected);
});

test('base64Encode()', t => {
  const actual = base64Encode(decodedString);
  const expected = encodedString;

  t.is(actual, expected);
});

test('isArray()', t => {
  const actual = isArray([]);
  const expected = true;

  t.is(actual, expected);
});

test('isObject()', t => {
  const actual = isObject({});
  const expected = true;

  t.is(actual, expected);
});

test('maybeBase64Decode()', t => {
  const actual = maybeBase64Decode(encodedString);
  const expected = decodedString;

  t.is(actual, expected);
});

test('maybeDeserialize()', t => {
  const actual = maybeDeserialize('{}');
  const expected = true;

  t.is(actual, expected);
});

test('maybeSerialize()', t => {
  const actual = maybeSerialize({});
  const expected = true;

  t.is(actual, expected);
});

test('isSerializableNumber(): 1.2 String', t => {
  const actual = isSerializableNumber('1.2');
  const expected = true;

  t.is(actual, expected);
});

test('isSerializableNumber(): 1.20 String', t => {
  const actual = isSerializableNumber('1.20');
  const expected = false;

  t.is(actual, expected);
});

test('!isArray()', t => {
  const actual = isArray('string');
  const expected = true;

  t.not(actual, expected);
});

test('!isObject()', t => {
  const actual = isObject('string');
  const expected = true;

  t.not(actual, expected);
});

test('!maybeBase64Decode()', t => {
  const actual = maybeBase64Decode(decodedString);
  const expected = decodedString;

  t.is(actual, expected);
});

test('!maybeDeserialize()', t => {
  const actual = maybeDeserialize({});
  const expected = true;

  t.not(actual, expected);
});

test('!maybeSerialize()', t => {
  const actual = maybeSerialize(decodedString);
  const expected = true;

  t.not(actual, expected);
});
