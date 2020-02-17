declare class WebPorridge {
    title: string;
    storageType: string;
    constructor(type: string);
    /**
     * Reads data from WebStorage type
     * @param {String} item
     * @param {Object} userOptions
     * @returns {*}
     */
    getItem(keyName: string, subKeyName?: string): any;
    /**
     * Removes data from WebStorage type
     * @param {String} item
     * @param {Object} userOptions
     */
    removeItem(keyName: string, subKeyName?: string): any;
    /**
    * Reads from WebStorage type
    * @param {String} item
    * @param {*} value
    * @param {Object} userOptions
    * @returns {*}
    */
    setItem(keyName: string, keyValue: any, subKeyName?: string): any;
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
    length(): any;
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
    dispatch(action: string, payload: any): void;
    /**
     * Event handler
     * @param {Event} event
     * @returns {void}
     */
    private eventHandler;
}
declare const localPorridge: WebPorridge;
declare const sessionPorridge: WebPorridge;
export { localPorridge, sessionPorridge };
