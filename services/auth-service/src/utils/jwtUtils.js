const jwt = require("jsonwebtoken");

const generateToken = (userId, permissions) => {
  return jwt.sign({ id: userId, role: permissions }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const readToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, readToken };
