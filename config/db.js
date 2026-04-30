const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || (process.env.NODE_ENV !== 'production' ? 'mongodb://localhost:27017/scholarship' : null);

    if (!mongoUri) {
      throw new Error('MONGO_URI is required in production. Add it in Render environment variables.');
    }

    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(`MongoDB connection failed: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
