const stockService = require("../services/stockService");

const addBatch = async (req, res) => {
  try {
    const { category, quantity, duration } = req.body;
    const batch = await stockService.createBatch(category, quantity, duration);
    res.status(201).json(batch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const importCodes = async (req, res) => {
  try {
    const { filePath, batchId } = req.body;
    const result = await stockService.importCodes(filePath, batchId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getStock = async (req, res) => {
  try {
    const stock = await stockService.getStock();
    res.status(200).json(stock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { addBatch, importCodes, getStock };
