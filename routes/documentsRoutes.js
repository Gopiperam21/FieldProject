const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Document = require('../models/Document');
const auth = require('../middleware/auth');

const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

router.post('/upload', auth, upload.single('file'), async (req, res) => {
  try {
    const { docType } = req.body;
    const doc = new Document({
      studentId: req.user.id,
      docType,
      fileName: req.file.originalname,
      filePath: req.file.path
    });
    await doc.save();
    res.json({ msg: 'Uploaded', file: req.file });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const docs = await Document.find({ studentId: req.user.id });
    const docMap = {};
    docs.forEach(d => { docMap[d.docType] = d.fileName; });
    res.json(docMap);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/student/:studentId', auth, async (req, res) => {
  try {
    const docs = await Document.find({ studentId: req.params.studentId });
    res.json(docs);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;