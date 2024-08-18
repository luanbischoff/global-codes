const {
  createStock,
  updateStockStatus,
  getStockByKey,
  getAllStock,
} = require("../models/stockModel");

/**
 * Creates a new stock record in the database.
 *
 * @param {Object} stockData - The data for the new stock record.
 * @return {Promise<Object>} A promise that resolves to the newly created stock record.
 */
exports.addNewStock = async (stockData) => {
  return await createStock(stockData);
};

/**
 * Updates the status of a stock record in the database.
 *
 * @param {string} key - The unique identifier of the stock record.
 * @param {string} status - The new status of the stock record.
 * @param {Object} [data] - Additional data to update in the stock record.
 * @return {Promise<Object>} A promise that resolves to the updated stock record.
 */
exports.changeStockStatus = async (key, status, data) => {
  return await updateStockStatus(key, status, data);
};

/**
 * Retrieves a stock record from the database by its unique key.
 *
 * @param {string} key - The unique identifier of the stock record.
 * @return {Promise<Object>} A promise that resolves to the stock record.
 */
exports.fetchStockByKey = async (key) => {
  return await getStockByKey(key);
};

/**
 * Retrieves all stock keys from the database.
 *
 * @return {Promise<Array>} A promise that resolves to an array of all stock keys.
 */
exports.fetchAllStockKeys = async () => {
  return await getAllStock();
};
