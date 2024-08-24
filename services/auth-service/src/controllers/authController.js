const authService = require("../services/authService");

const register = async (req, res) => {
  try {
    const { email, password, role = 1 } = req.body;
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }
    const newUser = await authService.registerUser(email, password, role);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.loginUser(email, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = { register, login };
