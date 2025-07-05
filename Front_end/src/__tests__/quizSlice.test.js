import { configureStore } from '@reduxjs/toolkit';
import quizSlice, { addQuiz, updateQuiz, deleteQuiz, fetchQuizzes } from '../store/slices/quizSlice';

// Mock axios
jest.mock('../api/axiosInstance', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

const mockAxios = require('../api/axiosInstance');

describe('quizSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        quiz: quizSlice,
      },
    });
    jest.clearAllMocks();
  });

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      const state = store.getState().quiz;
      expect(state).toEqual({
        quizzes: [],
        loading: false,
        error: null,
      });
    });
  });

  describe('fetchQuizzes', () => {
    it('should handle fetchQuizzes.pending', () => {
      store.dispatch(fetchQuizzes.pending(''));
      const state = store.getState().quiz;
      
      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('should handle fetchQuizzes.fulfilled', () => {
      const mockQuizzes = [
        {
          _id: '1',
          title: 'Test Quiz',
          description: 'Test Description',
          questionCount: 10,
          duration: 15,
          difficulty: 'medium',
          category: 'Test',
        },
      ];

      store.dispatch(fetchQuizzes.fulfilled(mockQuizzes, ''));
      const state = store.getState().quiz;

      expect(state.loading).toBe(false);
      expect(state.quizzes).toEqual(mockQuizzes);
      expect(state.error).toBe(null);
    });

    it('should handle fetchQuizzes.rejected', () => {
      const errorMessage = 'Failed to fetch quizzes';
      store.dispatch(fetchQuizzes.rejected(new Error(errorMessage), ''));
      const state = store.getState().quiz;

      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('addQuiz', () => {
    it('should handle addQuiz.fulfilled', () => {
      const newQuiz = {
        _id: '2',
        title: 'New Quiz',
        description: 'New Description',
        questionCount: 5,
        duration: 10,
        difficulty: 'easy',
        category: 'New Category',
      };

      store.dispatch(addQuiz.fulfilled(newQuiz, ''));
      const state = store.getState().quiz;

      expect(state.quizzes).toContain(newQuiz);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
    });
  });

  describe('updateQuiz', () => {
    it('should handle updateQuiz.fulfilled', () => {
      // First add a quiz
      const initialQuiz = {
        _id: '1',
        title: 'Original Quiz',
        description: 'Original Description',
        questionCount: 10,
        duration: 15,
        difficulty: 'medium',
        category: 'Original',
      };

      store.dispatch(addQuiz.fulfilled(initialQuiz, ''));

      // Then update it
      const updatedQuiz = {
        ...initialQuiz,
        title: 'Updated Quiz',
        description: 'Updated Description',
      };

      store.dispatch(updateQuiz.fulfilled(updatedQuiz, ''));
      const state = store.getState().quiz;

      expect(state.quizzes[0]).toEqual(updatedQuiz);
      expect(state.loading).toBe(false);
    });
  });

  describe('deleteQuiz', () => {
    it('should handle deleteQuiz.fulfilled', () => {
      // First add a quiz
      const quiz = {
        _id: '1',
        title: 'Quiz to Delete',
        description: 'Description',
        questionCount: 10,
        duration: 15,
        difficulty: 'medium',
        category: 'Test',
      };

      store.dispatch(addQuiz.fulfilled(quiz, ''));
      expect(store.getState().quiz.quizzes).toHaveLength(1);

      // Then delete it
      store.dispatch(deleteQuiz.fulfilled('1', ''));
      const state = store.getState().quiz;

      expect(state.quizzes).toHaveLength(0);
      expect(state.loading).toBe(false);
    });
  });

  describe('Async Actions', () => {
    it('should create fetchQuizzes async action', async () => {
      const mockResponse = { data: [] };
      mockAxios.get.mockResolvedValue(mockResponse);

      const result = await store.dispatch(fetchQuizzes());
      
      expect(mockAxios.get).toHaveBeenCalledWith('/quizzes');
      expect(result.type).toBe('quizzes/fetchAll/fulfilled');
    });

    it('should create addQuiz async action', async () => {
      const newQuiz = {
        title: 'New Quiz',
        description: 'Description',
        questionCount: 10,
        duration: 15,
        difficulty: 'medium',
        category: 'Test',
      };

      const mockResponse = { data: { ...newQuiz, _id: '1' } };
      mockAxios.post.mockResolvedValue(mockResponse);

      const result = await store.dispatch(addQuiz(newQuiz));
      
      expect(mockAxios.post).toHaveBeenCalledWith('/quizzes', newQuiz);
      expect(result.type).toBe('quizzes/add/fulfilled');
    });
  });
});
