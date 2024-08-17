require("dotenv").config();

module.exports = {
  serverPort: process.env.SERVER_PORT || 3001,
  dbUrl: process.env.DATABASE_URL,
  ocrApiKey: process.env.CLOUD_VISION_API_KEY,
};
