import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleLogin: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
    toggleLogout: (state) => {
      state.isLoggedIn = false;
    }
  },
});

export const { toggleLogin , toggleLogout } = authSlice.actions;
export default authSlice.reducer;
