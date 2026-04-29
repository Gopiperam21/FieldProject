const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const Scholarship = require('../models/Scholarship');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    const { scholarshipId, personalData, bankData, academicData, additionalData, documents } = req.body;
    const scholarship = await Scholarship.findOne({ id: scholarshipId });
    if (!scholarship) return res.status(404).json({ msg: 'Scholarship not found' });
    const application = new Application({
      studentId: req.user.id,
      scholarshipId: scholarship._id,
      personalData,
      bankData,
      academicData,
      additionalData,
      documents
    });
    await application.save();
    res.json(application);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const apps = await Application.find({ studentId: req.user.id }).populate('scholarshipId');
    const formatted = apps.map(a => ({
      id: a._id,
      schId: a.scholarshipId.id,
      name: a.scholarshipId.name,
      org: a.scholarshipId.org,
      date: a.date.toISOString().slice(0,10),
      status: a.status,
      amt: a.scholarshipId.amt
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;