import { beforeEach, expect, test } from 'vitest';
import { Porridge } from '../src/porridge.ts';
import type { WebPorridge } from '../types/index';

const localPorridge = new Porridge('localStorage');
const sessionPorridge = new Porridge('sessionStorage');

[
	{
		type: 'localStorage',
		storage: localPorridge,
	},
	{
		type: 'sessionStorage',
		storage: sessionPorridge,
	},
].map(({ type, storage }) => {
	beforeEach(() => {
		storage.clear();
	});

	test(`${type}.clear()`, async () => {
		await new Promise<void>((resolve, reject) => {
			window.addEventListener('porridge.didChange', (event) => {
				const customEvent = event as CustomEvent<WebPorridge.StorageEvent>;

				try {
					expect(customEvent.detail).toEqual({
						key: null,
						newValue: null,
						oldValue: null,
						storageArea: {},
						url: window.location.href,
					});
					resolve();
				} catch (error) {
					reject(error);
				}
			});

			storage.clear();
		});
	});

	test(`${type}.setItem()`, async () => {
		const key = self.crypto.randomUUID();

		await new Promise<void>((resolve, reject) => {
			window.addEventListener('porridge.didChange', (event) => {
				const customEvent = event as CustomEvent<WebPorridge.StorageEvent>;

				try {
					expect(customEvent.detail).toEqual({
						key: 'demo',
						newValue: key,
						oldValue: null,
						storageArea: {
							demo: key,
						},
						url: window.location.href,
					});
					resolve();
				} catch (error) {
					reject(error);
				}
			});

			storage.setItem('demo', key);
		});
	});

	test(`${type}.removeItem()`, async () => {
		const key = self.crypto.randomUUID();
		storage.setItem('demo', key);

		await new Promise<void>((resolve, reject) => {
			window.addEventListener('porridge.didChange', (event) => {
				const customEvent = event as CustomEvent<WebPorridge.StorageEvent>;

				try {
					expect(customEvent.detail).toEqual({
						key: 'demo',
						newValue: null,
						oldValue: key,
						storageArea: {},
						url: window.location.href,
					});
					resolve();
				} catch (error) {
					reject(error);
				}
			});

			storage.removeItem('demo');
		});
	});
});
