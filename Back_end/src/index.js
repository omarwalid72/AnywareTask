const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const quizRoutes = require('./routes/quiz.routes');
const announcementRoutes = require('./routes/announcement.routes');

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ DB Error:', err));

// Routes
app.use('/quizzes', quizRoutes);
app.use('/announcements', announcementRoutes);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
});
