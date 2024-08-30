const authService = require("../services/authService");
const { readToken } = require("../utils/jwtUtils");
const logger = require("../utils/logger");

const register = async (req, res) => {
  try {
    const { email, password, roleId = 1 } = req.body;
    const newUser = await authService.registerUser(
      email.toString().toLowerCase(),
      password,
      roleId
    );
    logger.info(`User ${email} registered successfully.`);
    return res.status(201).json(newUser);
  } catch (error) {
    logger.error(`[!] Error registering user: ${error.message}`);
    return res.status(401).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    const token = await authService.loginUser(
      email.toString().toLowerCase(),
      password
    );
    logger.info(
      `User ${email.toString().toLowerCase()} logged in successfully.`
    );
    res.json({ token });
  } catch (error) {
    logger.error(`[!] Error logging in user: ${error.message}`);
    res.status(401).json({ message: error.message });
  }
};

const listAllUsers = async (req, res) => {
  try {
    const users = await authService.getAllUsers();

    const jwtPayload = readToken(req.headers.authorization);

    console.log(jwtPayload);

    logger.info(`User ID ${jwtPayload.id}: list retrieved successfully.`);
    res.status(200).json(users);
  } catch (error) {
    logger.error(`[!] Error getting users list: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login, listAllUsers };
