import axios from 'axios';

export const axiosInstance = axios.create({
  // baseURL: 'http://lokalhost:3008/api/v1',
  baseURL: 'https://rsclone.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
