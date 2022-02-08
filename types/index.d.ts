declare namespace WebPorridge {
  interface StorageOptions{
    expires?: string;
    prop?: string;
  }

  interface IndexeddbOptions {
    db: string;
    name: string;
  }

  interface Payload {
    '@expires'?: string;
    '@type': 'boolean' | 'null' | 'number' | 'object' | 'string' | 'undefined';
    '@value': string;
  }

  interface StorageKeys {
    expires: '@expires';
    value: '@value';
    type: '@type';
  }
}
