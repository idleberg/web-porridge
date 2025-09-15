import { beforeEach, expect, test } from "vitest";
import { Porridge } from "../../src/index.ts";
import type { WebPorridge } from "../../types/index.d.ts";

const localPorridge = new Porridge("localStorage");
const sessionPorridge = new Porridge("sessionStorage");

[
	{
		type: "localStorage",
		storage: localPorridge,
	},
	{
		type: "sessionStorage",
		storage: sessionPorridge,
	},
].forEach(({ type, storage }) => {
	beforeEach(() => {
		storage.clear();
	});

	test(`${type}.clear()`, async () => {
		await new Promise<void>((resolve, reject) => {
			globalThis.addEventListener("porridge.didChange", (event) => {
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

	test(`${type}.setItem()`, async () => {
		const key = self.crypto.randomUUID();

		await new Promise<void>((resolve, reject) => {
			globalThis.addEventListener("porridge.didChange", (event) => {
				const customEvent = event as CustomEvent<WebPorridge.StorageEvent>;

				try {
					expect(customEvent.detail).toEqual({
						key: "demo",
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

			storage.setItem("demo", key);
		});
	});

	test(`${type}.removeItem()`, async () => {
		const key = self.crypto.randomUUID();

		await new Promise<void>((resolve, reject) => {
			storage.setItem("demo", key);

			globalThis.addEventListener("porridge.didChange", (event) => {
				const customEvent = event as CustomEvent<WebPorridge.StorageEvent>;

				try {
					expect(customEvent.detail).toEqual({
						key: "demo",
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

			storage.removeItem("demo");
		});
	});

	test(`${type}.observe() - clear`, async () => {
		const key = "demo";
		const value = self.crypto.randomUUID();

		await new Promise<void>((resolve, reject) => {
			storage.setItem(key, value);

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

	test(`${type}.observe() - removeItem`, async () => {
		const key = "demo";
		const value = self.crypto.randomUUID();

		storage.setItem(key, value);

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

	test(`${type}.observe() - setItem`, async () => {
		const key = "demo";
		const value = self.crypto.randomUUID();

		await new Promise<void>((resolve, reject) => {
			storage.observe(key, (event) => {
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

			storage.setItem(key, value);
		});
	});

	test(`${type}.observe() - Invalid callback type`, () => {
		// @ts-expect-error Provide invalid callback function
		expect(() => storage.observe("demo", undefined)).toThrowError(
			'The callback argument must be of type "function", got "undefined"'
		);
	});
});
