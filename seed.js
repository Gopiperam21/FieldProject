const mongoose = require('mongoose');
require('dotenv').config();
const Scholarship = require('./models/Scholarship');
const defaultScholarships = require('./data/defaultScholarships');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/scholarship');
    await Scholarship.deleteMany({});
    await Scholarship.insertMany(defaultScholarships);
    console.log('Default scholarships inserted!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
seed();
