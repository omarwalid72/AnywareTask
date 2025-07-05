const Quiz = require('../models/quiz.model');
const Joi = require('joi');
const mongoose = require('mongoose');

const quizSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  questionCount: Joi.number().integer().min(1).required(),
  duration: Joi.number().integer().min(1).required(),
  difficulty: Joi.string().valid('easy', 'medium', 'hard').required(),
  category: Joi.string().required(),
});

exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json({
      success: true,
      message: 'Quizzes retrieved successfully',
      data: quizzes,
      count: quizzes.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve quizzes',
      error: error.message
    });
  }
};

exports.createQuiz = async (req, res) => {
  try {
    const { error } = quizSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: error.details[0].message
      });
    }

    const quiz = new Quiz(req.body);
    await quiz.save();
    
    res.status(201).json({
      success: true,
      message: 'Quiz created successfully',
      data: quiz
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create quiz',
      error: error.message
    });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = quizSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: error.details[0].message
      });
    }

    const updated = await Quiz.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found',
        error: 'No quiz exists with the provided ID'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Quiz updated successfully',
      data: updated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update quiz',
      error: error.message
    });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ تحقق من صحة الـ ID قبل أي شيء
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid quiz ID format',
      });
    }

    const deleted = await Quiz.findByIdAndDelete(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found',
        error: 'No quiz exists with the provided ID'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Quiz deleted successfully',
      data: deleted
    });
  } catch (error) {
    console.error('Error deleting quiz:', error.message); // ✳️ مهم للطباعة في السيرفر
    res.status(500).json({
      success: false,
      message: 'Failed to delete quiz',
      error: error.message
    });
  }
};
