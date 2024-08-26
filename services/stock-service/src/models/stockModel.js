const { prisma } = require("../utils/database");

const createBatch = async (category, quantity, duration) => {
  return await prisma.batch.create({
    data: {
      category,
      quantity,
      duration,
    },
  });
};

const importCodes = async (codes, batchId) => {
  return await prisma.key.createMany({
    data: codes.map((code) => ({
      code,
      batchId,
    })),
  });
};

const getBatch = async (batchId) => {
  return await prisma.batch.findUnique({
    where: { id: batchId },
  });
};

const getStock = async () => {
  return await prisma.batch.findMany({
    include: { keys: true },
  });
};

module.exports = { createBatch, importCodes, getStock, getBatch };
