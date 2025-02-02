declare namespace WebPorridge {
	type StorageOptions = {
		expires?: Date | number;
		prop?: string;
	};

	type IndexeddbOptions = {
		db: string;
		name: string;
	};

	type Payload = {
		'@expires'?: string;
		'@type': 'array' | 'bigint' | 'boolean' | 'date' | 'null' | 'number' | 'object' | 'string' | 'undefined';
		'@value': string;
	};

	type StorageKeys = {
		expires: '@expires';
		value: '@value';
		type: '@type';
	};

	type StorageEvent = {
		key?: string | null;
		newValue: unknown;
		oldValue: unknown;
		storageArea: Record<string, unknown>;
		url: string;
	};
}

export { WebPorridge };
