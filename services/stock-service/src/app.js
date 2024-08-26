const express = require("express");
const stockRoutes = require("./routes/stockRoutes");
const errorHandler = require("./utils/errorHandler");

const app = express();

app.use(express.json());
app.use("/", stockRoutes);
app.use(errorHandler);

module.exports = app;
