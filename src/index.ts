import WebPorridge from './porridge';
import WebPorridgeDB from './porridge-db';

const localPorridge = new WebPorridge('local');
const sessionPorridge = new WebPorridge('session');
const db = new WebPorridgeDB();

export {
  localPorridge,
  sessionPorridge,
  db,

  WebPorridge,
  WebPorridgeDB,
};

export { base64Decode, base64Encode } from './util';
