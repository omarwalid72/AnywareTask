const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  questionCount: { type: Number, required: true },
  duration: { type: Number, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  category: { type: String, required: true },
});

module.exports = mongoose.model('Quiz', quizSchema);
