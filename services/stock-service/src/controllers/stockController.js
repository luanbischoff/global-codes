const {
  addNewStock,
  changeStockStatus,
  fetchStockByKey,
  fetchAllStockKeys,
} = require("../services/stockService");
const handleError = require("../utils/errorHandler");

/**
 * Creates a new stock and returns it in the response.
 *
 * @param {object} req - The incoming HTTP request.
 * @param {object} res - The outgoing HTTP response.
 * @param {function} next - The next middleware function in the stack.
 * @return {object} The newly created stock in JSON format.
 */
exports.createStockController = async (req, res, next) => {
  try {
    const stock = await addNewStock(req.body);
    res.status(201).json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Updates the stock status based on the provided key, status, and data.
 *
 * @param {object} req - The incoming HTTP request containing the key, status, and data in its params and body.
 * @param {object} res - The outgoing HTTP response.
 * @return {object} The updated stock in JSON format.
 */
exports.updateStockStatusController = async (req, res) => {
  try {
    const { key } = req.params;
    const { status, data } = req.body;
    const stock = await changeStockStatus(key, status, data);
    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Retrieves a stock by its key and returns it in the response.
 *
 * @param {object} req - The incoming HTTP request containing the key in its params.
 * @param {object} res - The outgoing HTTP response.
 * @return {object} The stock in JSON format.
 */
exports.getStockByKeyController = async (req, res) => {
  try {
    const { key } = req.params;
    const stock = await fetchStockByKey(key);
    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Retrieves all available stocks and returns them in the response.
 *
 * @param {object} req - The incoming HTTP request.
 * @param {object} res - The outgoing HTTP response.
 * @return {object} The list of all available stocks in JSON format.
 */
exports.getAllStocksController = async (req, res) => {
  try {
    const stock = await fetchAllStockKeys();
    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
