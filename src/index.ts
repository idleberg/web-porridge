import WebPorridge from './porridge';

const localPorridge = new WebPorridge('local');
const sessionPorridge = new WebPorridge('session');

export {
  localPorridge,
  sessionPorridge
};

export { base64Decode, base64Encode } from './util';
