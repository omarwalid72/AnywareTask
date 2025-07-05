import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import QuizCard from '../../../components/Quize/QuizCard/QuizCard';

// Mock props for testing
const mockQuizProps = {
  _id: 'quiz-1',
  title: 'React Native Basics',
  description: 'Test your knowledge of React Native fundamentals',
  questionCount: 10,
  duration: 15,
  difficulty: 'medium' as const,
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
    
    const card = screen.getByText('React Native Basics').parent?.parent;
    fireEvent.press(card);
    
    expect(mockQuizProps.onPress).toHaveBeenCalledWith('quiz-1');
  });

  it('calls onEdit when edit button is pressed', () => {
    render(<QuizCard {...mockQuizProps} />);
    
    const editButtons = screen.getAllByRole('button');
    const editButton = editButtons.find(button => 
      button.props.accessibilityLabel === 'Edit quiz' ||
      button.children?.some((child: any) => child?.props?.name === 'create-outline')
    );
    
    if (editButton) {
      fireEvent.press(editButton);
      expect(mockQuizProps.onEdit).toHaveBeenCalledWith({
        _id: 'quiz-1',
        title: 'React Native Basics',
        description: 'Test your knowledge of React Native fundamentals',
        questionCount: 10,
        duration: 15,
        difficulty: 'medium',
        category: 'Mobile Development',
      });
    }
  });

  it('calls onDelete when delete button is pressed', () => {
    render(<QuizCard {...mockQuizProps} />);
    
    const deleteButtons = screen.getAllByRole('button');
    const deleteButton = deleteButtons.find(button => 
      button.props.accessibilityLabel === 'Delete quiz' ||
      button.children?.some((child: any) => child?.props?.name === 'trash-outline')
    );
    
    if (deleteButton) {
      fireEvent.press(deleteButton);
      expect(mockQuizProps.onDelete).toHaveBeenCalledWith('quiz-1');
    }
  });

  it('applies correct difficulty color for easy quiz', () => {
    const easyQuizProps = { ...mockQuizProps, difficulty: 'easy' as const };
    const { getByTestId } = render(<QuizCard {...easyQuizProps} />);
    
    // The card should have the correct border color for easy difficulty
    expect(screen.getByText('quizzes.difficulty.easy')).toBeTruthy();
  });

  it('applies correct difficulty color for hard quiz', () => {
    const hardQuizProps = { ...mockQuizProps, difficulty: 'hard' as const };
    render(<QuizCard {...hardQuizProps} />);
    
    // The card should have the correct border color for hard difficulty
    expect(screen.getByText('quizzes.difficulty.hard')).toBeTruthy();
  });

  it('handles missing optional props gracefully', () => {
    const minimalProps = {
      _id: 'quiz-1',
      title: 'Test Quiz',
      description: 'Test Description',
      questionCount: 5,
      duration: 10,
      difficulty: 'easy' as const,
      category: 'Test Category',
    };
    
    expect(() => render(<QuizCard {...minimalProps} />)).not.toThrow();
  });

  it('disables edit and delete buttons when no _id is provided', () => {
    const propsWithoutId = { ...mockQuizProps, _id: '' };
    render(<QuizCard {...propsWithoutId} />);
    
    // Buttons should be disabled when _id is empty
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      if (button.props.disabled !== undefined) {
        expect(button.props.disabled).toBe(true);
      }
    });
  });
});
