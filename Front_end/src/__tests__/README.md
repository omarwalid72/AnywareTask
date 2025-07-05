# Testing Documentation

This project includes comprehensive testing with Jest and React Native Testing Library.

## Test Structure

### Unit Tests
- **QuizCard.test.js**: Tests for the QuizCard component
- **AnnouncementCard.test.js**: Tests for the AnnouncementCard component  
- **quizSlice.test.js**: Tests for Redux quiz slice logic

### Integration Tests
- **AppIntegration.test.js**: End-to-end tests for navigation and data flow

## Running Tests

### Prerequisites
```bash
npm install
```

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Run Tests with Coverage
```bash
npm run test:coverage
```

### Run Specific Test Files
```bash
# Run only QuizCard tests
npm test QuizCard.test.js

# Run only integration tests
npm test AppIntegration.test.js
```

## Test Coverage

The tests cover:

### Components
- ✅ Component rendering
- ✅ User interactions (press events)
- ✅ Props handling
- ✅ Conditional rendering
- ✅ Error boundaries

### Redux Store
- ✅ Initial state
- ✅ Action creators
- ✅ Reducers
- ✅ Async thunks
- ✅ State updates

### Integration
- ✅ Navigation flow
- ✅ Data flow between components
- ✅ Screen interactions
- ✅ Header actions
- ✅ Tab navigation

## Test Files Location

```
src/
  __tests__/
    setup.js                     # Test configuration
    QuizCard.test.js            # Unit tests for QuizCard
    AnnouncementCard.test.js    # Unit tests for AnnouncementCard
    quizSlice.test.js           # Unit tests for Redux slice
    integration/
      AppIntegration.test.js    # Integration tests
```

## Mocked Dependencies

The tests mock the following dependencies:
- `react-i18next` for internationalization
- `@expo/vector-icons` for icons
- `react-native-safe-area-context` for safe areas
- `@react-navigation/native` for navigation
- `axios` for API calls

## Key Test Scenarios

### QuizCard Component
- Renders quiz information correctly
- Handles user interactions (press, edit, delete)
- Applies correct styling based on difficulty
- Handles missing props gracefully

### AnnouncementCard Component  
- Displays announcement data properly
- Shows correct priority colors
- Handles user actions
- Manages long content text

### Redux Quiz Slice
- Manages quiz state correctly
- Handles async operations
- Updates state on CRUD operations
- Handles error states

### Integration Tests
- Navigation between screens works
- Data flows correctly from Redux to components
- Header actions function properly
- Empty and loading states are handled

## Writing New Tests

When adding new components or features, follow these patterns:

### Component Tests
```javascript
import { render, fireEvent, screen } from '@testing-library/react-native';
import YourComponent from '../path/to/YourComponent';

describe('YourComponent', () => {
  it('should render correctly', () => {
    render(<YourComponent prop="value" />);
    expect(screen.getByText('Expected Text')).toBeTruthy();
  });
});
```

### Redux Tests
```javascript
import { configureStore } from '@reduxjs/toolkit';
import yourSlice from '../path/to/yourSlice';

describe('yourSlice', () => {
  let store;
  
  beforeEach(() => {
    store = configureStore({ reducer: { data: yourSlice } });
  });
  
  it('should handle actions correctly', () => {
    // Test implementation
  });
});
```

## Troubleshooting

### Common Issues

1. **Import errors**: Ensure paths are correct relative to test files
2. **Mock issues**: Check that all external dependencies are properly mocked
3. **Navigation errors**: Ensure NavigationContainer wraps components in integration tests
4. **Redux errors**: Make sure store is properly configured with all required slices

### Debug Tests
```bash
# Run tests with verbose output
npm test -- --verbose

# Run specific test with debug output
npm test QuizCard.test.js -- --verbose
```
