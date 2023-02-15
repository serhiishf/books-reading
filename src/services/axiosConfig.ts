import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://rsclone.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
