const jwt = require("jsonwebtoken");
const { prisma } = require("../utils/database");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = authMiddleware;
