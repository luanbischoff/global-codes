const express = require("express");
const checkerRoutes = require("./routes/checkerRoutes.js");
const errorHandler = require("./utils/errorHandler.js");

const app = express();

app.use(express.json());
app.use("/checker", checkerRoutes);
app.use(errorHandler);

module.exports = app;
