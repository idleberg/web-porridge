import WebPorridge from './porridge';
import WebPorridgeDB from './porridge-db';
declare const localPorridge: WebPorridge;
declare const sessionPorridge: WebPorridge;
declare const db: WebPorridgeDB;
export { localPorridge, sessionPorridge, db, WebPorridge, WebPorridgeDB, };
export { base64Decode, base64Encode } from './util';
