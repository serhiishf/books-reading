import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  user: { name: string };
  accessToken: string;
  refreshToken: string;
  error: string;
  isRefreshed: boolean;
  isLoggedOn: boolean;
  isLoading: boolean;
}

const initialUserState: UserState = {
  user: { name: '' },
  accessToken: '',
  refreshToken: '',
  error: '',
  isRefreshed: false,
  isLoggedOn: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialUserState,
  reducers: {
    registerRequest: (state) => {
      state.isLoading = true;
    },
    registerSuccess: (state, { payload }) => {
      state.user.name = payload.user.name;
      state.isLoading = false;
      state.isLoggedOn = false;
    },
    registerError: (state, { payload }) => {
      state.error = payload.message;
      state.isLoading = false;
      state.isLoggedOn = false;
    },
    loginRequest: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, { payload }) => {
      state.user.name = payload.user.name;
      state.accessToken = payload.tokens.accessToken;
      state.refreshToken = payload.tokens.refreshToken;
      state.isLoading = false;
      state.isLoggedOn = true;
    },
    loginError: (state, { payload }) => {
      state.error = payload.message;
      state.isLoading = false;
      state.isLoggedOn = false;
    },
    logoutRequest: (state) => {
      state.isLoading = true;
    },
    logoutSuccess: (state) => {
      state.user.name = '';
      state.accessToken = '';
      state.refreshToken = '';
      state.isRefreshed = false;
      state.isLoading = false;
      state.isLoggedOn = false;
    },
    logoutError: (state, { payload }) => {
      state.error = payload?.message;
      state.isLoading = false;
    },
    getCurrentUserRequest: (state) => {
      state.isLoading = true;
    },
    getCurrentUserSuccess: (state, { payload }) => {
      state.user = payload.user;
      state.isLoading = false;
      state.isLoggedOn = true;
    },
    getCurrentUserError: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
      state.isLoggedOn = false;
    },
    refreshedUserRequest: (state) => {
      state.isRefreshed = true;
      state.isLoading = true;
    },
    refreshedUserSuccess: (state, { payload }) => {
      // state.user = payload.user;
      state.accessToken = payload.tokens.accessToken;
      state.refreshToken = payload.tokens.refreshToken;
      state.isRefreshed = false;
      state.isLoading = false;
      state.isLoggedOn = true;
    },
    refreshedUserError: (state, { payload }) => {
      state.error = payload;
      state.isRefreshed = false;
      state.isLoading = false;
      state.isLoggedOn = false;
    },
    setAccessToken: (state, { payload }) => {
      state.accessToken = payload;
    },
    setRefreshToken: (state, { payload }) => {
      state.refreshToken = payload;
    },
  },
});

export const {
  registerRequest,
  registerSuccess,
  registerError,
  loginError,
  loginRequest,
  loginSuccess,
  logoutError,
  logoutRequest,
  logoutSuccess,
  getCurrentUserError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  refreshedUserError,
  refreshedUserRequest,
  refreshedUserSuccess,
  setAccessToken,
  setRefreshToken,
} = authSlice.actions;

export default authSlice.reducer;
