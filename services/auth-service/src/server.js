const app = require("./app");
const { SERVER_PORT } = require("./config");
const { connectDatabase } = require("./config/database");
const logger = require("./utils/logger");
require("dotenv").config();

app.listen(SERVER_PORT, async () => {
  await connectDatabase();
  logger.info(`[!] Auth Service running on: localhost:${SERVER_PORT}`);
});
