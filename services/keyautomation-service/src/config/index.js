require("dotenv").config();
const path = require("path");

module.exports = {
  SERVER_PORT: process.env.SERVER_PORT || 11003,
  DATABASE_URL: process.env.DATABASE_URL || undefined,

  INPUT_DIR: path.join(__dirname, "..", "..", "input"),
  KEYS_INPUT_DIR: path.join(__dirname, "..", "..", "input", "batch-images"),
  OUTPUT_DIR: path.join(__dirname, "..", "..", "output"),
  KEYS_OUTPUT_DIR: path.join(__dirname, "..", "..", "output", "batch-keys"),
  WLID_PATH: path.join(__dirname, "WLID.txt"),
  KEYS_PATH: path.join(__dirname, "..", "..", "input", "keys.txt"),
};
