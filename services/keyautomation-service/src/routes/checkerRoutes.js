const express = require("express");
const {
  verificateBatch,
  verificateKey,
} = require("../controllers/checkerController.js");

const router = express.Router();

router.post("/batch", verificateBatch);
router.post("/key", verificateKey);

module.exports = router;
