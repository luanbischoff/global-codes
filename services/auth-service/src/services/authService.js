const bcrypt = require("bcryptjs");
const jwtUtils = require("../utils/jwtUtils");
const { prisma } = require("../config/database");

const registerUser = async (email, password, role) => {
  const hasUser = await prisma.user.findUnique({
    where: { email: email },
  });

  if (hasUser) {
    throw new Error(`${email} already registered.`);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
      roleId: role,
    },
  });
  return jwtUtils.generateToken(newUser.id);
};

const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email: email },
    select: { id: true, password: true, role: true },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }

  return jwtUtils.generateToken(user.id, user.role);
};

const getAllUsers = async () => {
  const users = await prisma.user.findMany({});
  return users;
};

module.exports = { registerUser, loginUser, getAllUsers };
