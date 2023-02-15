import { RootState } from '../../app/store';

const getLoggedOn = (state: RootState) => state.auth.isLoggedOn;

const getUserName = (state: RootState) => state.auth.user.name;

const getUserAccessToken = (state: RootState) => state.auth.accessToken;

const getUserRefreshToken = (state: RootState) => state.auth.refreshToken;

const getIsRefresh = (state: RootState) => state.auth.isRefreshed;

const getLoading = (state: RootState) => state.auth.isLoading;

const authSelectors = {
  getLoggedOn,
  getUserName,
  getUserAccessToken,
  getUserRefreshToken,
  getLoading,
  getIsRefresh,
};

export default authSelectors;
