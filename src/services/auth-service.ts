import axios from 'axios';

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

export type TokenType = {
  refreshToken: string | null;
};

export const loginUser = async (credentials: LoginCreds) => {
  const { data } = await axios.post('/users/login', credentials);
  accessToken.set(data.data.tokens.accessToken);
  refreshToken.set(data.data.tokens.refreshToken);
  return data;
};

export const registerUser = async (credentials: Credentials) => {
  const { data } = await axios.post('/users/signup', credentials);
  return data;
};

export const logoutUser = async () => {
  const { data } = await axios.get('/users/logout');
  accessToken.unset();
  return data;
};

export const refreshUser = async (data: TokenType) => {
  const result = await axios.post('/users/refresh-tokens', data);
  accessToken.set(result.data.tokens.accessToken);
  return result;
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem('AUTH_TOKEN') as string;
  accessToken.set(token);
  const { data } = await axios.get('users/current');
  return data.data;
};
