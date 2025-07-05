const express = require('express');
const { createQuiz, getQuizzes, updateQuiz, deleteQuiz } = require('../controllers/quiz.controller');
const router = express.Router();

router.get('/', getQuizzes);
router.post('/', createQuiz);
router.put('/:id', updateQuiz);
router.delete('/:id', deleteQuiz);

module.exports = router;
