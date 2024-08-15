const express = require("express");
const router = express.Router();
const KeyController = require("../controllers/keyController");

// Define routes and attach controller methods
router.get("/", (req, res) => KeyController.getAllKeys(req, res));
router.post("/", (req, res) => KeyController.addKey(req, res));
router.delete("/:id", (req, res) => KeyController.removeKey(req, res));
router.put("/:id", (req, res) => KeyController.updateKey(req, res));

module.exports = router;
