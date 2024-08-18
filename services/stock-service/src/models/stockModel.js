const { prisma } = require("../utils/database");

/**
 * Creates a new stock record in the database using the provided data.
 *
 * @param {Object} stockData - The data for the new stock record.
 * @return {Promise<Object>} A promise that resolves to the newly created stock record.
 */
exports.createStock = async (stockData) => {
  return await prisma.stock.create({ data: stockData });
};

/**
 * Updates the status of a stock record in the database.
 *
 * @param {string} key - The unique identifier of the stock record.
 * @param {string} status - The new status of the stock record.
 * @param {Object} [data] - Additional data to update in the stock record.
 * @return {Promise<Object>} A promise that resolves to the updated stock record.
 */
exports.updateStockStatus = async (key, status, data) => {
  return await prisma.stock.update({
    where: { key },
    data: {
      status,
      ...(data && { data }),
    },
  });
};

/**
 * Retrieves a stock record from the database by its unique key.
 *
 * @param {string} key - The unique identifier of the stock record.
 * @return {Promise<Object>} A promise that resolves to the stock record.
 */
exports.getStockByKey = async (key) => {
  return await prisma.stock.findUnique({
    where: { key },
  });
};

/**
 * Retrieves all stock records from the database.
 *
 * @return {Promise<Array<Object>>} A promise that resolves to an array of all stock records.
 */
exports.getAllStock = async () => {
  return await prisma.stock.findMany();
};
