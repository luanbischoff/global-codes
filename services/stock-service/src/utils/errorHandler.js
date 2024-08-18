const logger = require("./logger");

/**
 * Handles an error that occurred during the request.
 *
 * @param {Error} error - The error that occurred.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 * @return {void}
 */
function handleError(error, req, res, next) {
  logger.error(error);
  res.status(500).json({ message: "An error occurred", error: error.message });
}

module.exports = handleError;
