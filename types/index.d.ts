declare namespace WebPorridge {
  interface StorageOptions{
    expires?: string;
    key?: string;
  }

  interface IndexeddbOptions {
    db: string;
    name: string;
  }

  interface Payload {
    '@expires'?: string;
    '@key'?: string;
    '@type': 'boolean' | 'null' | 'number' | 'object' | 'string' | 'undefined';
  }
  interface EventPayload {
    'before': any;
    'after': any;
  }

  interface StorageKeys {
    expires: '@expires';
    value: '@value';
    type: '@type';
  }
}
