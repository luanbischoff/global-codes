require("dotenv").config();

module.exports = {
  DATABASE_URL: process.env.DATABASE_URL || null,
  SERVER_PORT: process.env.SERVER_PORT || 11001,
};
