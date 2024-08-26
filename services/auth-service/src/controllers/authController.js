const authService = require("../services/authService");

const register = async (req, res) => {
  try {
    const { email, password, roleId = 1 } = req.body;
    console.log(req.body);
    const newUser = await authService.registerUser(email, password, roleId);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    const token = await authService.loginUser(email, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const listAllUsers = async (req, res) => {
  try {
    const users = await authService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login, listAllUsers };
