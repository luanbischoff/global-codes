const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../models/prismaClient");
const jwtUtils = require("../utils/jwtUtils");

const registerUser = async (email, password, role) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      // role: { connect: { name: role } },
      roleId: role,
    },
  });
  return jwtUtils.generateToken(newUser.id);
};

const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }
  return jwtUtils.generateToken(user.id);
};

module.exports = { registerUser, loginUser };
