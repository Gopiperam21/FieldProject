const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Application = require('../models/Application');
const Document = require('../models/Document');
const auth = require('../middleware/auth');

const adminOnly = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });
  next();
};

router.get('/stats', auth, adminOnly, async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalApps = await Application.countDocuments();
    const pendingApps = await Application.countDocuments({ status: 'Submitted' });
    const approvedApps = await Application.countDocuments({ status: 'Approved' });
    res.json({ totalStudents, totalApps, pendingApps, approvedApps });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/applications', auth, adminOnly, async (req, res) => {
  try {
    const apps = await Application.find()
      .populate('studentId', 'name email')
      .populate('scholarshipId', 'name');
    res.json(apps);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.put('/applications/:id/status', auth, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    await Application.findByIdAndUpdate(req.params.id, { status });
    res.json({ msg: 'Status updated' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/students', auth, adminOnly, async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password');
    const result = await Promise.all(students.map(async s => {
      const appCount = await Application.countDocuments({ studentId: s._id });
      return { ...s.toObject(), applicationCount: appCount };
    }));
    res.json(result);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post('/verify-doc', auth, adminOnly, async (req, res) => {
  try {
    const { studentId, docId } = req.body;
    await Document.findOneAndUpdate({ studentId, docType: docId }, { verified: true });
    res.json({ msg: 'Document verified' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;