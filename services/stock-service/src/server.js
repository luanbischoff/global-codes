const app = require("./app");
const { serverPort } = require("./config/index");
const { connectDatabase } = require("./utils/database");
const logger = require("./utils/logger");

app.listen(serverPort, async () => {
  await connectDatabase();
  logger.info(`Stock Management Service running on port ${serverPort}`);
});
