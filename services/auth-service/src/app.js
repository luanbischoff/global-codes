const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const roleMiddleware = require("./middlewares/permissionMiddleware");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", authRoutes);
app.use("/protected", protectedRoutes);

module.exports = app;
