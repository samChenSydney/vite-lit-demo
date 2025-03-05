/**
 * @typedef {Object} WinLossEntry
 * @property {number} winAmt - The amount won.
 * @property {number} turnover - The total turnover.
 * @property {number} comm0 - The commission amount.
 * @property {number} playerWinLoss - The player's win/loss value.
 * @property {number} oneWinLoss - The one-level win/loss value.
 * @property {number} shWinLoss - The shared win/loss value.
 * @property {string} userId - The user ID.
 * @property {string} parentUserId - The parent user ID.
 * @property {number} webSiteType - The website type identifier.
 * @property {string} currency - The currency type.
 * @property {string|null} gameName - The name of the game (nullable).
 * @property {string|null} tableId - The table ID (nullable).
 * @property {string|null} tableCountry - The table country (nullable).
 * @property {number} activePlayer - The number of active players.
 * @property {number} betCount - The number of bets placed.
 */
/**
 * @typedef {Object<string, WinLossEntry[]>} WinLossResults
 */
/**
 *  @typedef {Object} Level2Data
 * @property {string} key - The parent user ID or secondary key.
 * @property {Array<WinLossEntry>} data - The list of games associated with this parent.
 * @property {WinLossEntry} sum - The summary data for this level.
 */
/**
 *  @typedef {Object} Level1Data
 * @property {string} key - The currency or primary key.
 * @property {Array<Level2Data>} data - The list of secondary levels.
 * @property {WinLossEntry} sum - The summary data for this level.
 */
/**
 *  @typedef {Array<Level1Data>} TransformedWinLossData
 */
