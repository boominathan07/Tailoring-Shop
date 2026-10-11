const { z } = require('zod');
const authService = require('../services/auth.service');
const { generateToken, clearToken } = require('../utils/generateToken');

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password is required').max(128, 'Password is too long')
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name is required').max(100, 'Name is too long'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters').max(128, 'Password is too long')
});

const login = async (req, res, next) => {
  try {
    const parsedData = loginSchema.parse(req.body);
    const user = await authService.login(parsedData.email, parsedData.password);
    
    generateToken(res, user._id);
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    // Return expected client errors directly instead of routing through the global error handler 
    if (error.code === 'UNAUTHORIZED') {
      return res.status(401).json({ success: false, message: error.message, code: 'UNAUTHORIZED' });
    }
    if (error.code === 'FORBIDDEN') {
      return res.status(403).json({ success: false, message: error.message, code: 'FORBIDDEN' });
    }
    next(error);
  }
};

const logout = (req, res) => {
  clearToken(res);
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};

const getMe = async (req, res, next) => {
  try {
    const user = await authService.getMe(req.user.id);
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const parsedData = registerSchema.parse(req.body);
    const user = await authService.register(parsedData.name, parsedData.email, parsedData.password);
    
    generateToken(res, user._id);
    
    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    if (error.code === 'BAD_REQUEST') {
      return res.status(400).json({ success: false, message: error.message, code: 'BAD_REQUEST' });
    }
    next(error);
  }
};

module.exports = {
  login,
  logout,
  getMe,
  register
};
