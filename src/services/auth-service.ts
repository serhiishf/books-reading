import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = 'https://rsclone.com/api/v1';

const accessToken = {
  set(accessToken: string) {
    localStorage.setItem('AUTH_TOKEN', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
    localStorage.removeItem('AUTH_TOKEN');
  },
};

const refreshToken = {
  set(refreshToken: string) {
    localStorage.setItem('REFRESH_TOKEN', refreshToken);
    axios.defaults.headers.common.Authorization = `Bearer ${refreshToken}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
    localStorage.removeItem('REFRESH_TOKEN');
  },
};

type Credentials = {
  name: string;
  email: string;
  password: string;
};

type LoginCreds = Omit<Credentials, 'name'>;

export const loginUser = async (credentials: LoginCreds) => {
  const { data } = await axios.post('/users/login', credentials);
  accessToken.set(data.data.tokens.accessToken);
  refreshToken.set(data.data.tokens.refreshToken);
  return data;
};

export const registerUser = async (credentials: Credentials) => {
  const { data } = await axios.post('/users/signup', credentials);
  toast.success('Registration complete. Log in to access the app.');
  return data;
};

export const logoutUser = async (persistedToken: string) => {
  if (!persistedToken) {
    toast.error('You are not logged in');
  }
  accessToken.set(persistedToken);
  const { data } = await axios.get('/users/logout');
  accessToken.unset();
  return data;
};

export const refreshUser = async (token: string) => {
  const { data } = await axios.post('/users/refresh-tokens', token);
  console.log('refresh-api', data);
  accessToken.set(data.data.tokens.accessToken);
  refreshToken.set(data.data.tokens.refreshToken);
};

export const getCurrentUser = async (persistedToken: string) => {
  if (!persistedToken) {
    toast.error('You are not logged in');
  }
  accessToken.set(persistedToken);
  try {
    const { data } = await axios.get('users/current');
    return data.data;
  } catch (error) {
    accessToken.unset();
    return error;
  }
};
