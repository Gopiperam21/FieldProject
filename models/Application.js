const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  scholarshipId: { type: mongoose.Schema.Types.ObjectId, ref: 'Scholarship', required: true },
  status: { type: String, enum: ['Submitted','Under Review','Approved','Funds Disbursed','Rejected'], default: 'Submitted' },
  date: { type: Date, default: Date.now },
  personalData: mongoose.Schema.Types.Mixed,
  bankData: mongoose.Schema.Types.Mixed,
  academicData: mongoose.Schema.Types.Mixed,
  additionalData: mongoose.Schema.Types.Mixed,
  documents: [String]
});

module.exports = mongoose.model('Application', ApplicationSchema);