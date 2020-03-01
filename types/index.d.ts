interface PayloadOptions {
  key: string;
  value?: Boolean | null | Object | string;
  subKey?: string;
}

interface GetItemOptions {
  decodeBase64?: Boolean;
  decodeJSON?: Boolean;
}
