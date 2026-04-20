require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ── Serve frontend static files from the parent folder ──
const frontendPath = path.join(__dirname, '..');
app.use(express.static(frontendPath));

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// ── Serve index.html for any unknown route (SPA fallback) ──
app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected!');
    app.listen(process.env.PORT, () => {
      console.log('Server running on port ' + process.env.PORT);
      console.log('Open your browser at: http://localhost:' + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log('MongoDB connection failed:', err.message);
  });cd "C:\Users\Shruti\OneDrive\Desktop\EduFlow\backend"
node server.js