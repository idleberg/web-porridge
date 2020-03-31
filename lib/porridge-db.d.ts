export default class WebPorridgeDB {
    title: string;
    store: any;
    options: WebPorridgeOptions;
    constructor(userOptions?: WebPorridgeOptions);
    getItem(keyName: string, subKeyName?: string | null, options?: WebPorridgeOptions): any;
    getItems(input: (string | PayloadOptions)[], options?: WebPorridgeOptions): Promise<any[]>;
    removeItem(keyName: string, subKeyName?: string): Promise<any>;
    removeItems(input: (string | PayloadOptions)[]): Promise<any[]>;
    setItem(keyName: string, keyValue: any, subKeyName?: string): any;
    setItems(input: PayloadOptions[]): Promise<any[]>;
    key(index: number): Promise<IDBValidKey>;
    get length(): Promise<number>;
    clear(): Promise<void>;
    listen(element?: Element | Window): void;
    mute(element?: Element | Window): void;
    dispatch(action: string, payload: Number | PayloadOptions): void;
    private eventHandler;
}
