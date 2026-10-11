const User = require('../models/User');
const bcrypt = require('bcryptjs');

const login = async (email, password) => {
  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw { code: 'UNAUTHORIZED', message: 'Invalid email or password' };
  }

  // Check if user is active
  if (!user.isActive) {
    throw { code: 'FORBIDDEN', message: 'Account has been deactivated' };
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw { code: 'UNAUTHORIZED', message: 'Invalid email or password' };
  }

  // Update last login
  user.lastLoginAt = new Date();
  await user.save();

  return user;
};

const getMe = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw { code: 'NOT_FOUND', message: 'User not found' };
  }
  return user;
};

const register = async (name, email, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw { code: 'BAD_REQUEST', message: 'Email already exists' };
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    passwordHash,
    role: 'customer'
  });

  return user;
};

module.exports = {
  login,
  getMe,
  register
};
