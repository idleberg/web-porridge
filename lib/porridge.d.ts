export default class WebPorridge {
    title: string;
    storageType: string;
    options: WebPorridgeOptions;
    constructor(type: string, userOptions?: WebPorridgeOptions);
    /**
     * Reads single data item from WebStorage type
     * @param {String} item
     * @param {Object} subKeyName
     * @returns {*}
     */
    getItem(keyName: string, subKeyName?: string | null, options?: WebPorridgeOptions): any;
    /**
  * Writes data items to WebStorage type
  * @param {Array} item
  * @returns {*}
  */
    getItems(input: (string | PayloadOptions)[], options?: WebPorridgeOptions): any[];
    /**
     * Removes single data item from WebStorage type
     * @param {String} item
     * @param {Object} subKeyName
     */
    removeItem(keyName: string, subKeyName?: string): any;
    /**
     * Removes datas item from WebStorage type
     * @param {String} input
     */
    removeItems(input: (string | PayloadOptions)[]): any[];
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
    setItems(input: PayloadOptions[]): any[];
    /**
     * Returns the length of WebStorage type
     * @param {Integer} index
     * @returns {*}
     */
    key(index: number): any;
    /**
     * Returns the length of WebStorage type
     * @returns {Integer}
     */
    get length(): any;
    /**
     * Clears WebStorage type
     * @returns {*}
     */
    clear(): any;
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
