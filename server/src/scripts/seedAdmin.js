require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/guru-tailoring');
    
    const adminExists = await User.findOne({ email: 'admin@gurutailoring.com' });
    
    if (adminExists) {
      console.log('Admin already exists');
      process.exit();
    }
    
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('admin123', salt);
    
    await User.create({
      name: 'Guru Tailoring Admin',
      email: 'admin@gurutailoring.com',
      passwordHash,
      role: 'admin'
    });
    
    console.log('Admin user seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
