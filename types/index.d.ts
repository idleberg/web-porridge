declare namespace WebPorridge {
	type StorageOptions ={
		expires?: string;
		prop?: string;
	}

	type IndexeddbOptions = {
		db: string;
		name: string;
	}

	type Payload = {
		'@expires'?: string;
		'@type': 'boolean' | 'date' | 'null' | 'number' | 'object' | 'string' | 'undefined';
		'@value': string;
	}

	type StorageKeys = {
		expires: '@expires';
		value: '@value';
		type: '@type';
	}

	type CustomStorageEvent = {
		key?: string;
		newValue: unknown;
		oldValue: unknown;
		storageArea: 'localStorage' | 'sessionStorage' | 'indexedDB';
	}
}

export {
	WebPorridge
};
