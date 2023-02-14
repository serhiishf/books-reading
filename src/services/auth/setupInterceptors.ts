import { setTokens } from '../../redux/features/auth/authSlice';
import { getNewTokens } from './auth-service';
import axiosInstance from '../axiosConfig';
import tokenService from './token-service';
import { RootStoreType } from '../../redux/app/store';
import { AxiosError } from 'axios';

const setupInterceptors = (store: RootStoreType) => {
  const { dispatch } = store;

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = tokenService.getLocalAccessToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.log('interceptors', error);
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      console.log('interceptors1', err);
      const originalConfig = err.config;

      if (originalConfig.url !== '/users/login' && err.response) {
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const token = tokenService.getLocalRefreshToken();
            const response = await getNewTokens({
              refreshToken: token,
            });

            const { tokens } = await response.data.data;
            dispatch(setTokens(tokens));
            tokenService.setLocalTokens(tokens);
            axiosInstance.defaults.headers[
              'Authorization'
            ] = `Bearer ${tokens.accessToken}`;
            return axiosInstance(originalConfig);
          } catch (_error) {
            console.log('interceptors2', _error);
            if (_error instanceof AxiosError) {
              if (_error.response && _error.response.data) {
                return Promise.reject(_error.response.data);
              }
              return Promise.reject(_error);
            }
          }
        }
      }
      return Promise.reject(err);
    },
  );
};

export default setupInterceptors;
