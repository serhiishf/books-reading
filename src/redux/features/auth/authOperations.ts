import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppDispatch } from '../../app/store';
import {
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
  setTokensSuccess,
} from './authSlice';
import apiService from '../../../services/auth/auth-service';
import tokenService from '../../../services/auth/token-service';

type Credentials = {
  name: string;
  email: string;
  password: string;
};

type LoginCreds = Omit<Credentials, 'name'>;

axios.defaults.baseURL = 'https://rsclone.com/api/v1';

const register =
  (credentials: Credentials) => async (dispatch: AppDispatch) => {
    dispatch(registerRequest());
    try {
      const response = await apiService.registerUser(credentials);
      dispatch(registerSuccess(response.data));
      if (response.code === 201) {
        toast.success('Registration complete. Log in to access the app.');
      }
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          toast.error('This email is already exist');
        } else {
          toast.error('Registration failed');
        }
        dispatch(registerError(error.message));
      }
    }
  };

const logIn = (credentials: LoginCreds) => async (dispatch: AppDispatch) => {
  dispatch(loginRequest());
  try {
    const result = await apiService.loginUser(credentials);
    dispatch(loginSuccess(result.data));
    dispatch(setTokensSuccess(result.data.tokens));
    tokenService.setLocalTokens(result.data.tokens);
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        toast.error('Wrong email or password');
      } else {
        toast.error('Something went wrong. Try again.');
      }
      dispatch(loginError(error.message));
    }
  }
};

const logOut = () => async (dispatch: AppDispatch) => {
  dispatch(logoutRequest());
  try {
    const result = await apiService.logoutUser();
    if (result.status === 204 || result.status === 401) {
      dispatch(logoutSuccess());
      tokenService.removeLocalTokens();
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      tokenService.removeLocalTokens();
      dispatch(logoutError());
      toast.error(error.message);
    }
  }
};

const getCurrent = () => async (dispatch: AppDispatch) => {
  dispatch(getCurrentUserRequest());
  try {
    const result = await apiService.getCurrentUser();
    if (result.code === 200) {
      dispatch(getCurrentUserSuccess(result.data));
      dispatch(setTokensSuccess(result.data.tokens));
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      dispatch(getCurrentUserError());
    }
  }
};

const authOperations = {
  register,
  logIn,
  logOut,
  getCurrent,
};

export default authOperations;
