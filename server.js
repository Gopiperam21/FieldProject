const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, 'uploads');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadDir));
app.use(express.static(__dirname));

const connectDB = require('./config/db');
connectDB();

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));
app.use('/api/scholarships', require('./routes/scholarshipsRoutes'));
app.use('/api/applications', require('./routes/applicationsRoutes'));
app.use('/api/documents', require('./routes/documentsRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'scholrship.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
