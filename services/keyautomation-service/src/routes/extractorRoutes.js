const express = require("express");
const app = express();
const router = express.Router();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Extractor route" });
});

module.exports = router;
