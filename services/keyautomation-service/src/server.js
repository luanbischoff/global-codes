const { SERVER_PORT } = require("./config/index.js");
const { connectDatabase } = require("./config/database");
const app = require("./app");
const logger = require("./utils/logger.js");

app.listen(SERVER_PORT, async () => {
  await connectDatabase();
  logger.info(
    `[!] Key Automation Service running on: localhost:${SERVER_PORT}`
  );
});
