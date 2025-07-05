import {configureStore} from '@reduxjs/toolkit';

import authReducer from './slices/authSlice'; // Import your auth slice
import quizReducer from './slices/quizSlice';
import  announcementReducer  from './slices/announcementSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer, // Add the auth slice to the store
    quiz: quizReducer, // Add the quiz slice to the store
    announcement: announcementReducer, // Add the announcement slice to the store

  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // Avoid warnings with AsyncStorage
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
