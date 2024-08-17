const { PrismaClient } = require("@prisma/client");
const logger = require("./logger");
const prisma = new PrismaClient();

const connectDatabase = async () => {
  try {
    await prisma.$connect();
    logger.info("Connected to PostgreSQL with Prisma");
  } catch (error) {
    logger.error("Error connecting to the database:", error.message);
    process.exit(1);
  }
};

module.exports = { prisma, connectDatabase };
