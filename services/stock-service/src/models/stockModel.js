const { prisma } = require("../utils/database");

exports.createStock = async (stockData) => {
  return await prisma.stock.create({ data: stockData });
};

exports.updateStockStatus = async (key, status, data) => {
  return await prisma.stock.update({
    where: { key },
    data: {
      status,
      ...(data && { data }),
    },
  });
};

exports.getStockByKey = async (key) => {
  return await prisma.stock.findUnique({
    where: { key },
  });
};

exports.getAllStock = async (key) => {
  return await prisma.stock.findMany();
};
