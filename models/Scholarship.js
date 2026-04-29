const mongoose = require('mongoose');

const ScholarshipSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  org: String,
  amt: { type: Number, required: true },
  dl: { type: Date, required: true },
  income: Number,
  minM: Number,
  cats: [String],
  tag: String,
  desc: String
});

module.exports = mongoose.model('Scholarship', ScholarshipSchema);