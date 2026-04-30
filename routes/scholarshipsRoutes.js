const express = require('express');
const router = express.Router();
const Scholarship = require('../models/Scholarship');
const User = require('../models/User');
const auth = require('../middleware/auth');
const defaultScholarships = require('../data/defaultScholarships');

const adminOnly = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });
  next();
};

router.get('/', async (req, res) => {
  try {
    let scholarships = await Scholarship.find();
    if (scholarships.length === 0) {
      scholarships = await Scholarship.insertMany(defaultScholarships);
    }
    res.json(scholarships);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post('/', auth, adminOnly, async (req, res) => {
  try {
    const { id, name, org, amt, dl, income, minM, cats, tag, desc } = req.body;
    const scholarship = new Scholarship({ id, name, org, amt, dl, income, minM, cats, tag, desc });
    await scholarship.save();
    res.json(scholarship);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.put('/:id', auth, adminOnly, async (req, res) => {
  try {
    const scholarship = await Scholarship.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    res.json(scholarship);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    await Scholarship.findOneAndDelete({ id: req.params.id });
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
