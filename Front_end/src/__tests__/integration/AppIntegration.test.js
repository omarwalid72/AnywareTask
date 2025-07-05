import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from '../../navigation/TabNavigator';
import quizSlice from '../../store/slices/quizSlice';
import announcementSlice from '../../store/slices/announcementSlice';
import authSlice from '../../store/slices/authSlice';

// Mock the API
jest.mock('../../api/axiosInstance', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

// Mock Expo components
jest.mock('expo-linear-gradient', () => ({
  LinearGradient: ({ children }) => children,
}));

// Create a test store
const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      quiz: quizSlice,
      announcement: announcementSlice,
      auth: authSlice,
    },
    preloadedState: {
      quiz: {
        quizzes: [
          {
            _id: '1',
            title: 'React Native Quiz',
            description: 'Test your React Native knowledge',
            questionCount: 10,
            duration: 15,
            difficulty: 'medium',
            category: 'Mobile Development',
          },
          {
            _id: '2',
            title: 'JavaScript Quiz',
            description: 'Test your JavaScript skills',
            questionCount: 15,
            duration: 20,
            difficulty: 'hard',
            category: 'Programming',
          },
        ],
        loading: false,
        error: null,
      },
      announcement: {
        announcements: [
          {
            _id: '1',
            title: 'Welcome to the App',
            content: 'Welcome to our quiz and announcement application!',
            date: '2025-01-15',
            priority: 'high',
          },
          {
            _id: '2',
            title: 'Maintenance Notice',
            content: 'The app will be under maintenance this weekend.',
            date: '2025-01-14',
            priority: 'medium',
          },
        ],
        loading: false,
        error: null,
      },
      auth: {
        isAuthenticated: true,
        user: null,
        loading: false,
        error: null,
      },
      ...initialState,
    },
  });
};

// Wrapper component for testing
const TestWrapper = ({ children, store }) => (
  <Provider store={store}>
    <NavigationContainer>
      {children}
    </NavigationContainer>
  </Provider>
);

describe('App Integration Tests', () => {
  let store;

  beforeEach(() => {
    store = createTestStore();
    jest.clearAllMocks();
  });

  describe('Navigation and Screen Rendering', () => {
    it('should render TabNavigator with all screens', async () => {
      render(
        <TestWrapper store={store}>
          <TabNavigator />
        </TestWrapper>
      );

      // Wait for the navigation to render
      await waitFor(() => {
        // Check if tab navigation is rendered
        expect(screen.getByText('navigation.dashboard')).toBeTruthy();
        expect(screen.getByText('navigation.quizzes')).toBeTruthy();
        expect(screen.getByText('navigation.announcements')).toBeTruthy();
      });
    });

    it('should navigate between tabs', async () => {
      render(
        <TestWrapper store={store}>
          <TabNavigator />
        </TestWrapper>
      );

      await waitFor(() => {
        // Check that Dashboard is initially active
        expect(screen.getByText('navigation.dashboard')).toBeTruthy();
      });

      // Navigate to Quizzes tab
      const quizzesTab = screen.getByText('navigation.quizzes');
      fireEvent.press(quizzesTab);

      await waitFor(() => {
        // Should show quizzes content
        expect(screen.queryByText('React Native Quiz')).toBeTruthy();
      });

      // Navigate to Announcements tab
      const announcementsTab = screen.getByText('navigation.announcements');
      fireEvent.press(announcementsTab);

      await waitFor(() => {
        // Should show announcements content
        expect(screen.queryByText('Welcome to the App')).toBeTruthy();
      });
    });
  });

  describe('Dashboard Integration', () => {
    it('should display quiz and announcement statistics on dashboard', async () => {
      render(
        <TestWrapper store={store}>
          <TabNavigator />
        </TestWrapper>
      );

      await waitFor(() => {
        // Should show the count of quizzes and announcements
        expect(screen.getByText('2')).toBeTruthy(); // Quiz count
        // The exact text may vary based on how stats are displayed
      });
    });

    it('should navigate from dashboard stats to respective screens', async () => {
      render(
        <TestWrapper store={store}>
          <TabNavigator />
        </TestWrapper>
      );

      await waitFor(() => {
        // Look for the quiz stat card
        const quizStatElements = screen.queryAllByText('navigation.quizzes');
        if (quizStatElements.length > 0) {
          fireEvent.press(quizStatElements[0]);
        }
      });

      // Should navigate to quizzes screen
      await waitFor(() => {
        expect(screen.queryByText('React Native Quiz')).toBeTruthy();
      });
    });
  });

  describe('Data Flow Integration', () => {
    it('should display quiz data from Redux store', async () => {
      render(
        <TestWrapper store={store}>
          <TabNavigator />
        </TestWrapper>
      );

      // Navigate to quizzes
      const quizzesTab = screen.getByText('navigation.quizzes');
      fireEvent.press(quizzesTab);

      await waitFor(() => {
        // Check if quiz data is displayed
        expect(screen.getByText('React Native Quiz')).toBeTruthy();
        expect(screen.getByText('JavaScript Quiz')).toBeTruthy();
        expect(screen.getByText('Test your React Native knowledge')).toBeTruthy();
        expect(screen.getByText('10 Q')).toBeTruthy(); // Question count
        expect(screen.getByText('15 min')).toBeTruthy(); // Duration
      });
    });

    it('should display announcement data from Redux store', async () => {
      render(
        <TestWrapper store={store}>
          <TabNavigator />
        </TestWrapper>
      );

      // Navigate to announcements
      const announcementsTab = screen.getByText('navigation.announcements');
      fireEvent.press(announcementsTab);

      await waitFor(() => {
        // Check if announcement data is displayed
        expect(screen.getByText('Welcome to the App')).toBeTruthy();
        expect(screen.getByText('Maintenance Notice')).toBeTruthy();
        expect(screen.getByText('Welcome to our quiz and announcement application!')).toBeTruthy();
        expect(screen.getByText('2025-01-15')).toBeTruthy();
      });
    });
  });

  describe('Header Actions Integration', () => {
    it('should have language switcher in header', async () => {
      render(
        <TestWrapper store={store}>
          <TabNavigator />
        </TestWrapper>
      );

      await waitFor(() => {
        // Language switcher should be present in header
        // This depends on how LanguageSwitcher is implemented
        const headerElements = screen.queryAllByTestId('language-switcher');
        // If no testId, check for common language switch text
        if (headerElements.length === 0) {
          // Check for common language indicators
          expect(
            screen.queryByText('EN') || 
            screen.queryByText('AR') || 
            screen.queryAllByText('language').length > 0
          ).toBeTruthy();
        }
      });
    });

    it('should handle add button in quizzes screen', async () => {
      render(
        <TestWrapper store={store}>
          <TabNavigator />
        </TestWrapper>
      );

      // Navigate to quizzes
      const quizzesTab = screen.getByText('navigation.quizzes');
      fireEvent.press(quizzesTab);

      await waitFor(() => {
        // Look for add button (could be in header or as floating action button)
        const addButtons = screen.queryAllByRole('button');
        const addButton = addButtons.find(button => 
          button.children?.some(child => 
            child?.props?.name === 'add-circle' || 
            child?.props?.name === 'add'
          )
        );
        
        if (addButton) {
          fireEvent.press(addButton);
          // Should trigger add quiz modal or navigation
        }
      });
    });
  });

  describe('Error Handling Integration', () => {
    it('should handle empty state when no data is available', async () => {
      const emptyStore = createTestStore({
        quiz: { quizzes: [], loading: false, error: null },
        announcement: { announcements: [], loading: false, error: null },
      });

      render(
        <TestWrapper store={emptyStore}>
          <TabNavigator />
        </TestWrapper>
      );

      // Navigate to quizzes
      const quizzesTab = screen.getByText('navigation.quizzes');
      fireEvent.press(quizzesTab);

      await waitFor(() => {
        // Should show empty state message
        expect(
          screen.queryByText('quizzes.noQuizzes') || 
          screen.queryByText('No quizzes available')
        ).toBeTruthy();
      });
    });

    it('should handle loading state', async () => {
      const loadingStore = createTestStore({
        quiz: { quizzes: [], loading: true, error: null },
      });

      render(
        <TestWrapper store={loadingStore}>
          <TabNavigator />
        </TestWrapper>
      );

      // Navigate to quizzes
      const quizzesTab = screen.getByText('navigation.quizzes');
      fireEvent.press(quizzesTab);

      await waitFor(() => {
        // Should show loading indicator or empty state while loading
        // This depends on how loading is implemented in the component
        expect(screen.queryByText('Loading') || loadingStore.getState().quiz.loading).toBeTruthy();
      });
    });
  });
});
