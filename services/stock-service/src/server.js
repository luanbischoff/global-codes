const app = require("./app");
const { SERVER_PORT } = require("./config/index");
const { connectDatabase } = require("./utils/database");
const logger = require("./utils/logger.js");

app.listen(SERVER_PORT, async () => {
  await connectDatabase();
  logger.info(`Stock Management Service running on port ${SERVER_PORT}`);
});
