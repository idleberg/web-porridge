import { beforeEach, expect, test } from 'vitest';
import { Porridge } from '../src/porridge.ts';

const localPorridge = new Porridge('localStorage');

// localPorridge.clear();

[
	{
		type: 'localStorage',
		storage: localPorridge,
		// emitter: eventEmitter,
	},
	// {
	// 	type: 'sessionStorage',
	// 	storage: sessionStorage,
	// 	emitter: eventEmitter,
	// },
].map(({ type, storage }) => {
	beforeEach(() => {
		storage.clear();
	});

	test(`${type}.clear()`, async () => {
		await new Promise<void>((resolve, reject) => {
			window.addEventListener('porridge.didChange', (data: CustomEvent) => {
				try {
					expect(data.detail).toEqual({
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
			window.addEventListener('porridge.didChange', (event: CustomEvent) => {
				try {
					expect(event.detail).toEqual({
						key: 'demo',
						newValue: key,
						oldValue: null,
						storageArea: storage,
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
			window.addEventListener('porridge.didChange', (event: CustomEvent) => {
				try {
					expect(event.detail).toEqual({
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
