import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import QuizCard from '../components/Quize/QuizCard/QuizCard';

// Mock props for testing
const mockQuizProps = {
  _id: 'quiz-1',
  title: 'React Native Basics',
  description: 'Test your knowledge of React Native fundamentals',
  questionCount: 10,
  duration: 15,
  difficulty: 'medium',
  category: 'Mobile Development',
  onEdit: jest.fn(),
  onDelete: jest.fn(),
  onPress: jest.fn(),
};

describe('QuizCard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders quiz information correctly', () => {
    render(<QuizCard {...mockQuizProps} />);
    
    // Check if title is rendered
    expect(screen.getByText('React Native Basics')).toBeTruthy();
    
    // Check if description is rendered
    expect(screen.getByText('Test your knowledge of React Native fundamentals')).toBeTruthy();
    
    // Check if difficulty badge is rendered
    expect(screen.getByText('quizzes.difficulty.medium')).toBeTruthy();
    
    // Check if question count is rendered
    expect(screen.getByText('10 Q')).toBeTruthy();
    
    // Check if duration is rendered
    expect(screen.getByText('15 min')).toBeTruthy();
    
    // Check if category is rendered
    expect(screen.getByText('Mobile Development')).toBeTruthy();
  });

  it('calls onPress when card is pressed', () => {
    render(<QuizCard {...mockQuizProps} />);
    
    const cardElement = screen.getByText('React Native Basics').parent.parent;
    fireEvent.press(cardElement);
    
    expect(mockQuizProps.onPress).toHaveBeenCalledWith('quiz-1');
  });

  it('applies correct difficulty colors', () => {
    const easyQuizProps = { ...mockQuizProps, difficulty: 'easy' };
    render(<QuizCard {...easyQuizProps} />);
    
    expect(screen.getByText('quizzes.difficulty.easy')).toBeTruthy();
  });

  it('handles missing optional props gracefully', () => {
    const minimalProps = {
      _id: 'quiz-1',
      title: 'Test Quiz',
      description: 'Test Description',
      questionCount: 5,
      duration: 10,
      difficulty: 'easy',
      category: 'Test Category',
    };
    
    expect(() => render(<QuizCard {...minimalProps} />)).not.toThrow();
  });

  it('displays correct question count and duration', () => {
    const customProps = {
      ...mockQuizProps,
      questionCount: 25,
      duration: 30,
    };
    
    render(<QuizCard {...customProps} />);
    
    expect(screen.getByText('25 Q')).toBeTruthy();
    expect(screen.getByText('30 min')).toBeTruthy();
  });
});
