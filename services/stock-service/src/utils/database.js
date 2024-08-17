const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const connectDatabase = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to PostgreSQL with Prisma");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1);
  }
};

module.exports = { prisma, connectDatabase };
