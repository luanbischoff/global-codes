const app = require("./app");
const { apiPort } = require("./config/index");
const logger = require("./utils/logger");

app.listen(3001, () => {
  logger.info(`Stock Management Service running on port ${3001}`);
});
