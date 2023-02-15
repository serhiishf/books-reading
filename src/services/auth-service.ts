import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://rsclone.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// const accessToken = {
//   set(accessToken: string) {
//     localStorage.setItem('AUTH_TOKEN', accessToken);
//     axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
//   },
//   unset() {
//     axios.defaults.headers.common.Authorization = '';
//     localStorage.removeItem('AUTH_TOKEN');
//   },
// };

// const refreshToken = {
//   set(refreshToken: string) {
//     localStorage.setItem('REFRESH_TOKEN', refreshToken);
//     axios.defaults.headers.common.Authorization = `Bearer ${refreshToken}`;
//   },
//   unset() {
//     axios.defaults.headers.common.Authorization = '';
//     localStorage.removeItem('REFRESH_TOKEN');
//   },
// };

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
  const { data } = await axiosInstance.post('/users/login', credentials);
  return data;
};

export const registerUser = async (credentials: Credentials) => {
  const { data } = await axiosInstance.post('/users/signup', credentials);
  return data;
};

export const logoutUser = async () => {
  const { data } = await axiosInstance.get('/users/logout');
  return data;
};

export const refreshUser = async (data: TokenType) => {
  const result = await axiosInstance.post('/users/refresh-tokens', data);
  return result;
};

export const getCurrentUser = async () => {
  const { data } = await axiosInstance.get('users/current');
  return data;
};

export const getNewTokens = async (data: TokenType) => {
  return await axiosInstance.post('/users/refresh-tokens', data);
};

const apiService = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  getNewTokens,
};

export default apiService;
