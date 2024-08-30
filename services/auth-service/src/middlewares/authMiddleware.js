const { prisma } = require("../config/database");
const { readToken } = require("../utils/jwtUtils");
const logger = require("../utils/logger");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  try {
    const decoded = readToken(token);

    req.user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: { role: true },
    });

    next();
  } catch (error) {
    logger.error(error);
    res.status(401).json({ message: error.message });
  }
};

module.exports = authMiddleware;
