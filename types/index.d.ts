interface PayloadOptions {
  key: string;
  value?: Boolean | null | Object | string;
  subKey?: string;
}

interface WebPorridgeOptions {
  dataBaseName?: string;
  decodeBase64?: Boolean;
  decodeJSON?: Boolean;
  storeName?: string;
}
