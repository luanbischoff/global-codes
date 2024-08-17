const { PrismaClient } = require("@prisma/client");
const {
  addNewStock,
  changeStockStatus,
  fetchStockByKey,
  fetchAllStockKeys,
} = require("../services/stockService");
const handleError = require("../utils/errorHandler");

exports.createStockController = async (req, res, next) => {
  try {
    const stock = await addNewStock(req.body);
    res.status(201).json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

exports.getStockByKeyController = async (req, res) => {
  try {
    const { key } = req.params;
    const stock = await fetchStockByKey(key);
    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllStocksController = async (req, res) => {
  try {
    const stock = await fetchAllStockKeys();
    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
