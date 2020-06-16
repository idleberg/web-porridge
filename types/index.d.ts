interface PayloadOptions {
  key: string;
  value?: Boolean | null | Object | string;
  subKey?: string;
  options?: WebPorridgeOptions;
}

interface WebPorridgeOptions {
  base64?: Boolean;
  db?: string;
  json?: Boolean;
  store?: string;
}
