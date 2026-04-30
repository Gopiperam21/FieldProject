const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('./models/User');

async function createAdmin() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/scholarship';
    await mongoose.connect(mongoUri);

    await User.deleteOne({ email: 'admin@test.com' });

    const admin = new User({
      name: 'Admin User',
      email: 'admin@test.com',
      password: 'Test@123',
      role: 'admin'
    });
    await admin.save();
    console.log('Admin created');

    const saved = await User.findOne({ email: 'admin@test.com' });
    const isValid = await bcrypt.compare('Test@123', saved.password);
    console.log('Verification after creation:', isValid);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createAdmin();
