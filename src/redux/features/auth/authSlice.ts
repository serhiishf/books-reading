import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  user: { name: string };
  accessToken: string;
  refreshToken: string;
  error: string;
  isRegistered: boolean;
  isRefreshed: boolean;
  isLoggedOn: boolean;
  isLoading: boolean;
}

const initialUserState: UserState = {
  user: { name: '' },
  accessToken: '',
  refreshToken: '',
  error: '',
  isRegistered: false,
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
      state.isRegistered = true;
    },
    registerError: (state, { payload }) => {
      state.error = payload.message;
      state.isLoading = false;
      state.isLoggedOn = false;
      state.isRegistered = false;
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
      state.user.name = payload.user.name;
      state.accessToken = payload.tokens.accessToken;
      state.refreshToken = payload.tokens.refreshToken;
      state.isLoading = false;
      state.isLoggedOn = true;
    },
    getCurrentUserError: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
      state.isLoggedOn = false;
    },
    setTokensRequest: (state) => {
      state.isLoading = true;
    },
    setTokensSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    },
    setTokensError: (state) => {
      state.accessToken = '';
      state.refreshToken = '';
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
  setTokensRequest,
  setTokensSuccess,
  setTokensError,
} = authSlice.actions;

export default authSlice.reducer;
