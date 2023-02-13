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
} from './authSlice';
import apiService from '../../../services/auth-service';
import tokenService from '../../../services/token-service';

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
      if (response.status === 'success') {
        dispatch(registerSuccess(response.data));
        toast.success('Registration complete. Log in to access the app.');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          toast.error('This email is already exist');
        } else {
          toast.error('Registration failed');
        }
        dispatch(registerError(error?.message));
      }
    }
  };

const logIn = (credentials: LoginCreds) => async (dispatch: AppDispatch) => {
  dispatch(loginRequest());
  try {
    const result = await apiService.loginUser(credentials);
    dispatch(loginSuccess(result.data));
    if (result.code === 200) {
      toast.success(`Welcome ${result.data.user.name}`);
    }
    tokenService.setLocalTokens(result.data.tokens);
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        toast.error('Wrong email or password');
      }
      dispatch(loginError(error?.message));
    }
  }
};

const logOut = () => async (dispatch: AppDispatch) => {
  dispatch(logoutRequest());
  try {
    await apiService.logoutUser();
    dispatch(logoutSuccess());
    tokenService.removeLocalTokens();
  } catch (error) {
    if (error instanceof AxiosError) {
      dispatch(logoutError(error?.message));
      toast.error(error.message);
    }
  }
};

const getCurrent = () => async (dispatch: AppDispatch) => {
  dispatch(getCurrentUserRequest());
  try {
    const result = await apiService.getCurrentUser();
    console.log(result);
    if (result.code === 200) {
      dispatch(getCurrentUserSuccess(result));
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      dispatch(getCurrentUserError(error?.message));
      toast.error(error.message);
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
