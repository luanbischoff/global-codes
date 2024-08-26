const express = require("express");
const {
  addBatch,
  importCodes,
  getStock,
} = require("../controllers/stockController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/batch", authMiddleware, addBatch);
router.post("/import", authMiddleware, importCodes);
router.get("/", authMiddleware, getStock);

module.exports = router;
