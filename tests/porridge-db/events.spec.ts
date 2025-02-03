import { beforeEach, expect, test } from 'vitest';
import { PorridgeDB } from '../../src/index.ts';
import type { WebPorridge } from '../../types/index.d.ts';

const storage = new PorridgeDB();

beforeEach(async () => {
	await storage.clear();
});

test(`db.clear()`, async () => {
	await new Promise<void>((resolve, reject) => {
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

		storage.clear();
	});
});

test(`db.setItem()`, async () => {
	const key = self.crypto.randomUUID();

	await new Promise<void>((resolve, reject) => {
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

		storage.setItem('demo', key);
	});
});

test(`db.removeItem()`, async () => {
	const key = self.crypto.randomUUID();
	await storage.setItem('demo', key);

	await new Promise<void>((resolve, reject) => {
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

		storage.removeItem('demo');
	});
});

test(`db.observe() - clear`, async () => {
	const key = 'demo';
	const value = self.crypto.randomUUID();

	await storage.setItem(key, value);

	await new Promise<void>((resolve, reject) => {

		storage.observe(key, (event) => {
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

		storage.clear();
	});
});

test(`db.observe() - removeItem`, async () => {
	const key = 'demo';
	const value = self.crypto.randomUUID();

	await storage.setItem(key, value);

	await new Promise<void>((resolve, reject) => {

		storage.observe(key, (event) => {
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

		storage.removeItem(key);
	});
});

test(`db.observe() - Invalid callback type`, () => {
	// @ts-expect-error Provide invalid callback function
	expect(() => storage.observe('demo', undefined)).toThrowError('The callback argument must be of type "function", got "undefined"');
});
