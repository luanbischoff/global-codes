const logger = require("./logger.js");

function handleError(error, req, res, next) {
  logger.error(error);
  res.status(500).json({ message: "An error occurred", error: error.message });
}

module.exports = handleError;
