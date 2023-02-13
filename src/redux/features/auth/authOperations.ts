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
  refreshedUserError,
  refreshedUserRequest,
  refreshedUserSuccess,
} from './authSlice';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUser,
  getCurrentUser,
} from '../../../services/auth-service';

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
      const response = await registerUser(credentials);
      if (response.status === 'success') {
        dispatch(registerSuccess(response.data));
        toast.success('Registration complete. Log in to access the app.');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          toast.error('This email is already exist');
        }
        dispatch(registerError(error?.message));
      }
    }
  };

const logIn = (credentials: LoginCreds) => async (dispatch: AppDispatch) => {
  dispatch(loginRequest());
  try {
    const { data } = await loginUser(credentials);
    dispatch(loginSuccess(data));
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        toast.error('This email is already exist');
      }
      dispatch(loginError(error?.message));
    }
    toast.error('Wrong email or password');
  }
};

const logOut = () => async (dispatch: AppDispatch) => {
  dispatch(logoutRequest());
  try {
    await logoutUser();
    dispatch(logoutSuccess());
  } catch (error) {
    if (error instanceof AxiosError) {
      dispatch(logoutError(error?.message));
      toast.error(error.message);
    }
  }
};

const refresh = (token: string) => async (dispatch: AppDispatch) => {
  const refereshToken = {
    refreshToken: token,
  };
  dispatch(refreshedUserRequest());
  try {
    const { data } = await refreshUser(refereshToken);
    console.log('refresh-operations', data);
    const { newAccessToken: accessToken, newRefreshToken: refreshToken } = data;
    dispatch(refreshedUserSuccess({ accessToken, refreshToken }));
  } catch (error) {
    if (error instanceof AxiosError) {
      dispatch(refreshedUserError(error?.message));
      toast.error(error.message);
    }
  }
};

const getCurrent = () => async (dispatch: AppDispatch) => {
  dispatch(getCurrentUserRequest());
  try {
    const result = await getCurrentUser();
    dispatch(getCurrentUserSuccess(result));
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
  refresh,
  getCurrent,
};

export default authOperations;
