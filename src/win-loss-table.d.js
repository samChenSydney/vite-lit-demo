/**
 * @typedef {Object} KeyAndTextObject
 * @property {string} key
 * @property {string} text
 */
/**
 * @typedef {Object} GroupColumnParentData
 * @property {string} text
 * @property {string} className
 * @property {boolean?} isShownWhenOne
 */
/**
 * @typedef {Object} GroupColumnData
 * @property {GroupColumnParentData} parent
 * @property {KeyAndTextObject[]} children
 */

/**
 * @typedef {Object} UserIdColumn
 * @property {"userId"} type
 * @property {KeyAndTextObject} data
 */

/**
 * @typedef {Object} SwitchableColumn
 * @property {"switchable"} type
 * @property {KeyAndTextObject[]} data
 */

/**
 * @typedef {Object} GroupColumn
 * @property {"group"} type
 * @property {GroupColumnData} data
 */
/**
 * @typedef {Object} NormalColumn
 * @property {"normal"} type
 * @property {KeyAndTextObject&{isShownWhenOne:boolean}} data
 */
/**
 * @typedef {GroupColumn|SwitchableColumn|UserIdColumn|NormalColumn} TableColumnDefinition
 */
