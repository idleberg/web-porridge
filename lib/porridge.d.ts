export default class WebPorridge {
    title: string;
    storageType: string;
    options: WebPorridgeOptions;
    constructor(type: string, userOptions?: WebPorridgeOptions);
    getItem(keyName: string, subKeyName?: string | null, options?: WebPorridgeOptions): any;
    getJSON(keyName: string, subKeyName?: string | null): any;
    getBase64(keyName: string, subKeyName?: string | null, options?: WebPorridgeOptions): any;
    getItems(input: (string | PayloadOptions)[], options?: WebPorridgeOptions): any[];
    removeItem(keyName: string, subKeyName?: string): any;
    removeItems(input: (string | PayloadOptions)[]): any[];
    setItem(keyName: string, keyValue: any, subKeyName?: string): any;
    setItems(input: PayloadOptions[]): any[];
    key(index: number): any;
    get length(): any;
    clear(): any;
    listen(element?: Element | Window): void;
    mute(element?: Element | Window): void;
    dispatch(action: string, payload: Number | PayloadOptions): void;
    private eventHandler;
}
