export default class WebPorridgeDB {
    title: string;
    store: any;
    constructor();
    /**
     * Reads single data item from WebStorage type
     * @param {String} item
     * @param {Object} subKeyName
     * @returns {*}
     */
    getItem(keyName: string, subKeyName?: string | null, options?: GetItemOptions): any;
    /**
  * Writes data items to WebStorage type
  * @param {Array} item
  * @returns {*}
  */
    getItems(input: (string | PayloadOptions)[], options?: GetItemOptions): Promise<any[]>;
    /**
     * Removes single data item from WebStorage type
     * @param {String} item
     * @param {Object} subKeyName
     */
    removeItem(keyName: string, subKeyName?: string): Promise<any>;
    /**
     * Removes datas item from WebStorage type
     * @param {String} input
     */
    removeItems(input: (string | PayloadOptions)[]): Promise<any[]>;
    /**
    * Writes single data item to WebStorage type
    * @param {String} item
    * @param {*} value
    * @param {Object} userOptions
    * @returns {*}
    */
    setItem(keyName: string, keyValue: any, subKeyName?: string): any;
    /**
    * Writes data items to WebStorage type
    * @param {Array} item
    * @returns {*}
    */
    setItems(input: PayloadOptions[]): Promise<any[]>;
    /**
     * Returns the length of WebStorage type
     * @param {Integer} index
     * @returns {*}
     */
    key(index: number): Promise<IDBValidKey>;
    /**
     * Returns the length of WebStorage type
     * @returns {Integer}
     */
    length(): Promise<number>;
    /**
     * Clears WebStorage type
     * @returns {*}
     */
    clear(): Promise<void>;
    /**
     * Registers an event listener on the window or custom element
     * @param {Element|Window} element
     * @returns {*}
     */
    listen(element?: Element | Window): void;
    /**
     * Removes an event listener on the window or custom element
     * @param {Element|Window} element
     * @returns {*}
     */
    mute(element?: Element | Window): void;
    /**
     * Dispatches an event to WebPorridge listeners
     * @param {String} action
     * @param {*} payload
     * @returns {*}
     */
    dispatch(action: string, payload: Number | PayloadOptions): void;
    /**
     * Event handler
     * @param {Event} event
     * @returns {void}
     */
    private eventHandler;
}
