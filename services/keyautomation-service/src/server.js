const app = require("./app");
const { connectDatabase } = require("./config/database");
const { SERVER_PORT } = require("./config/index.js");
const logger = require("./utils/logger.js");

app.listen(SERVER_PORT, async () => {
  await connectDatabase();
  logger.info(`Key automation Service running on port ${SERVER_PORT}`);
});
