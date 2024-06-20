import 'fake-indexeddb/auto';
import 'localstorage-polyfill';
import { Navigator } from 'node-navigator';
import browserEnv from 'browser-env';

browserEnv(['window']);
// @ts-ignore
globalThis['navigator'] = new Navigator();
// @ts-ignore
window.indexedDB = {};
