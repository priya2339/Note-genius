const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const aiRoutes = require('./routes/routes');

const cors = require('cors');
app.use(cors({
  origin: 'https://note-genius-fcy2.vercel.app', // or '*', but not recommended for production
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));


const app = express();
const PORT = process.env.PORT || 5500;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(' Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/ai', aiRoutes);

// Serve frontend static files
// app.use(express.static(path.join(__dirname, '..', 'frontend')));

// // Catch-all route for SPA
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
// });
app.get('/', (req, res) => {
  res.send('Server is running from VERSEL')
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
