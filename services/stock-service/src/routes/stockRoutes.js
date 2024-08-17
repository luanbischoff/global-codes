const express = require("express");
const {
  createStockController,
  updateStockStatusController,
  getStockByKeyController,
  getAllStocksController,
} = require("../controllers/stockController");

const router = express.Router();

router.post("/", createStockController);
router.put("/:key/status", updateStockStatusController);
router.get("/:key", getStockByKeyController);
router.get("/", getAllStocksController);

module.exports = router;
