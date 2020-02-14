/**
 * Checks whether input data requires deserialization after readin it from WebStorage
 * @param {*} data
 * @returns {boolean}
 */
declare function maybeDeserialize(data: any): boolean;
/**
 * Checks whether input data requires serialization prior to writing it to WebStorage
 * @param {*} data
 * @returns {boolean}
 */
declare function maybeSerialize(data: string | Object): boolean;
declare function validateAction(action: string): void;
export { validateAction, maybeDeserialize, maybeSerialize };
