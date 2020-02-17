import test from 'ava';
import { localPorridge } from '../lib';
import 'localstorage-polyfill'
import browserEnv from 'browser-env';
browserEnv(['window']);

const actualString = 'Hello World!';
const actualObject = {
  nested: actualString
};

test(`getItem() String`, t => {
	localStorage.setItem('demo', actualString);

  const expected = localPorridge.getItem('demo');

	t.is(actualString, expected);
});

test(`getItem() JSON`, t => {
	localStorage.setItem('demo', JSON.stringify(actualObject));

  const expected = localPorridge.getItem('demo');

	t.deepEqual(actualObject, expected);
});

test(`getItem() Object key`, t => {

	localStorage.setItem('demo', JSON.stringify(actualObject));

  const expected = localPorridge.getItem('demo', 'nested');

	t.is(actualString, expected);
});

test(`setItem() String`, t => {
	localPorridge.setItem('demo', actualString);

  const expected = localStorage.getItem('demo');

	t.is(actualString, expected);
});

test(`setItem() JSON`, t => {
	localPorridge.setItem('demo', actualObject);

  const expected = JSON.parse(localStorage.getItem('demo'));

	t.deepEqual(actualObject, expected);
});

test(`setItem() Object key`, t => {
	localPorridge.setItem('demo', actualString, 'nested');

  const expected = JSON.parse(localStorage.getItem('demo')).nested;

	t.deepEqual(actualString, expected);
});

test(`removeItem() String`, t => {
	localStorage.setItem('demo', actualString);
  localPorridge.removeItem('demo');

  const actual = localStorage.getItem('demo')
  const expected = null;

	t.is(actual, expected);
});

test(`removeItem() Object key`, t => {
	localStorage.setItem('demo', JSON.stringify({
    ...actualObject,
    deleteMe: true
  }));
  localPorridge.removeItem('demo', 'deleteMe');

  const actual = localStorage.getItem('demo')
  const expected = null;

	t.is(actual, JSON.stringify(actualObject));
});
