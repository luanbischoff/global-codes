const stockModel = require("../models/stockModel");
const csvParser = require("../utils/csvParser");

const createBatch = async (category, quantity, duration) => {
  return await stockModel.createBatch(category, quantity, duration);
};

const importCodes = async (filePath, batchId) => {
  const codes = await csvParser.parseCSV(filePath);

  const batch = await stockModel.getBatch(batchId);

  if (!batch) {
    throw new Error("No batch found to associate codes.");
  }

  return await stockModel.importCodes(codes, batch.id);
};

const getStock = async () => {
  return await stockModel.getStock();
};

module.exports = { createBatch, importCodes, getStock };
