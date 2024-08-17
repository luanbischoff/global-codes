require("dotenv").config();

module.exports = {
  port: process.env.SERVER_PORT || 3001,
  dbUrl: process.env.DB_URL,
  ocrApiKey: process.env.OCR_API_KEY,
};
