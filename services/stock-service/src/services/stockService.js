const {
  createStock,
  updateStockStatus,
  getStockByKey,
  getAllStock,
} = require("../models/stockModel");

exports.addNewStock = async (stockData) => {
  return await createStock(stockData);
};

exports.changeStockStatus = async (key, status, data) => {
  return await updateStockStatus(key, status, data);
};

exports.fetchStockByKey = async (key) => {
  return await getStockByKey(key);
};

exports.fetchAllStockKeys = async () => {
  return await getAllStock();
};
