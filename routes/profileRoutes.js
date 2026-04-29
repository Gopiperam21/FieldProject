const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const profile = {
      name: user.name,
      dob: user.dob,
      aadhaar: user.aadhaar,
      phone: user.phone,
      gender: user.gender,
      cat: user.cat,
      ssc: user.ssc,
      inter: user.inter,
      college: user.college,
      course: user.course,
      cgpa: user.cgpa,
      year: user.year,
      income: user.income,
      state: user.state,
      disability: user.disability
    };
    res.json(profile);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.put('/', auth, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, req.body);
    res.json({ msg: 'Profile updated' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;