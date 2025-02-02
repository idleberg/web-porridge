import { beforeEach, expect, test } from 'vitest';;
import { PorridgeDB } from '../../src/index.ts';
import type { WebPorridge } from '../../types/index';

const storage = new PorridgeDB();

beforeEach(() => {
	storage.clear();
});

test(`db.clear()`, async () => {
	await new Promise<void>(async (resolve, reject) => {
		globalThis.addEventListener('porridgeDB.didChange', (event) => {
			const customEvent = event as CustomEvent<WebPorridge.StorageEvent>;

			try {
				expect(customEvent.detail).toEqual({
					key: null,
					newValue: null,
					oldValue: null,
					storageArea: {},
					url: globalThis.location.href,
				});
				resolve();
			} catch (error) {
				reject(error);
			}
		});

		await storage.clear();
	});
});

test(`db.setItem()`, async () => {
	const key = self.crypto.randomUUID();

	await new Promise<void>(async (resolve, reject) => {
		globalThis.addEventListener('porridgeDB.didChange', (event) => {
			const customEvent = event as CustomEvent<WebPorridge.StorageEvent>;

			try {
				expect(customEvent.detail).toEqual({
					key: 'demo',
					newValue: key,
					oldValue: null,
					storageArea: {
						demo: key,
					},
					url: globalThis.location.href,
				});
				resolve();
			} catch (error) {
				reject(error);
			}
		});

		await storage.setItem('demo', key);
	});
});

test(`db.removeItem()`, async () => {
	const key = self.crypto.randomUUID();

	await new Promise<void>(async (resolve, reject) => {
		await storage.setItem('demo', key);

		globalThis.addEventListener('porridgeDB.didChange', (event) => {
			const customEvent = event as CustomEvent<WebPorridge.StorageEvent>;

			try {
				expect(customEvent.detail).toEqual({
					key: 'demo',
					newValue: null,
					oldValue: key,
					storageArea: {},
					url: globalThis.location.href,
				});
				resolve();
			} catch (error) {
				reject(error);
			}
		});

		await storage.removeItem('demo');
	});
});

test(`db.observe() - clear`, async () => {
	const key = 'demo';
	const value = self.crypto.randomUUID();

	await new Promise<void>(async (resolve, reject) => {
		await storage.setItem(key, value);

		storage.observe('demo', (event) => {
			try {
				expect(event).toEqual({
					key: null,
					newValue: null,
					oldValue: null,
					storageArea: {},
					url: globalThis.location.href,
				});
				resolve();
			} catch (error) {
				reject(error);
			}
		});

		await storage.clear();
	});
});

test(`db.observe() - removeItem`, async () => {
	const key = 'demo';
	const value = self.crypto.randomUUID();

	await new Promise<void>(async (resolve, reject) => {
		await storage.setItem(key, value);

		storage.observe('demo', (event) => {
			try {
				expect(event).toEqual({
					key: key,
					newValue: null,
					oldValue: value,
					storageArea: {},
					url: globalThis.location.href,
				});
				resolve();
			} catch (error) {
				reject(error);
			}
		});

		await storage.removeItem(key);
	});
});

test(`db.observe() - setItem`, async () => {
	const key = 'demo';
	const value = self.crypto.randomUUID();

	await new Promise<void>(async (resolve, reject) => {
		storage.observe('demo', (event) => {

			try {
				expect(event).toEqual({
					key: key,
					newValue: value,
					oldValue: null,
					storageArea: {
						[key]: value,
					},
					url: globalThis.location.href,
				});
				resolve();
			} catch (error) {
				reject(error);
			}
		});

		await storage.setItem(key, value);
	});
});
