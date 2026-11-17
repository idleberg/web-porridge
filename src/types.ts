export type StorageOptions = {
	expires?: Date | number;
	prop?: string;
};

export type IndexeddbOptions = {
	db?: string;
	eventName?: string;
	store?: string;
};

export type Payload = {
	'@expires'?: string;
	'@type': 'array' | 'bigint' | 'boolean' | 'date' | 'null' | 'number' | 'object' | 'string' | 'undefined';
	'@value': string;
};

export type StorageKeys = {
	expires: '@expires';
	value: '@value';
	type: '@type';
};

export type PorridgeStorageEvent = {
	key?: string | null;
	newValue: unknown;
	oldValue: unknown;
	storageArea: Record<string, unknown>;
	url: string;
};

export type IDBValidKey = number | string | Date | BufferSource | IDBValidKey[];
