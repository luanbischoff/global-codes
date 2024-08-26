const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const authMiddleware = require("./middlewares/authMiddleware");
const roleMiddleware = require("./middlewares/roleMiddleware");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 11001;

app.use(express.json());
app.use(cors());
app.use("/", authRoutes);
app.use("/protected", authMiddleware, protectedRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
