export interface PayloadOptions {
  key: string;
  value?: boolean | null | unknown | string;
  subKey?: string;
  options?: WebPorridgeOptions;
}

export interface WebPorridgeOptions {
  db?: string;
  keyVal?: boolean;
  json?: boolean;
  store?: string;
}
