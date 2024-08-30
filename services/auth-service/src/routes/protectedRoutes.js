const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/permissionMiddleware");
const { listAllUsers } = require("../controllers/authController");

const router = express.Router();

router.use(authMiddleware);

router.get("/admin", roleMiddleware(["adminOnly"]), (req, res) => {
  res.json({ message: "Welcome to the admin route" });
});
router.get("/users", roleMiddleware(["listAllUsers"]), listAllUsers);

module.exports = router;
