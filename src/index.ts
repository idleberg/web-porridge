import WebPorridge from './porridge';
import WebPorridgeDB from './porridge-db';

const localPorridge = new WebPorridge('localStorage');
const sessionPorridge = new WebPorridge('sessionStorage');
const db = new WebPorridgeDB();

export {
  localPorridge,
  sessionPorridge,
  db,

  WebPorridge,
  WebPorridgeDB,
};

export { base64Decode, base64Encode } from './util';
