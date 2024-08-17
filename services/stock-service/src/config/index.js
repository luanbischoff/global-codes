require("dotenv").config();

module.exports = {
  SERVER_PORT: process.env.SERVER_PORT || 3001,
  DB_URL: process.env.DATABASE_URL,
  CLOUD_VISION_API_KEY: process.env.CLOUD_VISION_API_KEY,
};
