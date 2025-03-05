/**
 * @typedef {Object} KeyAndTextObject
 * @property {string} key
 * @property {string} text
 */
/**
 * 当角色为one时显示/当角色不为one时显示/不设置时永远显示
 * @typedef {"ONLY_ONE"|"ONLY_NOT_ONE"|undefined} ShowMode
 */
/**
 * @typedef {Object} GroupColumnParentData
 * @property {string} text
 * @property {string} className
 */
/**
 * @typedef {KeyAndTextObject&{className:string}} GroupColumnChildrenData
 */
/**
 * @typedef {Object} GroupColumnData
 * @property {GroupColumnParentData} parent
 * @property {GroupColumnChildrenData[]} children
 * @property {ShowMode} showMode
 */

/**
 * @typedef {Object} MainColumn
 * @property {"main"} type
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
 * @property {KeyAndTextObject&{showMode:ShowMode,className:string}} data
 */
/**
 * @typedef {GroupColumn|SwitchableColumn|UserIdColumn|NormalColumn} TableColumnDefinition
 */
