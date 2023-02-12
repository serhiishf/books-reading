import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from './components/Header';
import './App.scss';
import PagesRoutes from './views/PagesRoutes';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppSelector, useAppDispatch } from './redux/app/hooks';
import authSelectors from './redux/features/auth/authSelectors';
import {
  setAccessToken,
  setRefreshToken,
} from './redux/features/auth/authSlice';
import authOperations from './redux/features/auth/authOperations';

function App() {
  const dispatch = useAppDispatch();
  const isLogged = useAppSelector(authSelectors.getLoggedOn);
  const accessToken = useAppSelector(authSelectors.getUserAccessToken);
  const [searchParams] = useSearchParams();
  const accessTokenFromURL = searchParams.get('accessToken');
  const refreshTokenFromURL = searchParams.get('refreshToken');

  useEffect(() => {
    if (accessTokenFromURL && refreshTokenFromURL) {
      dispatch(setAccessToken(accessTokenFromURL));
      dispatch(setRefreshToken(refreshTokenFromURL));
    }
  }, [accessTokenFromURL, refreshTokenFromURL, dispatch]);

  useEffect(() => {
    if (!isLogged && accessToken) {
      dispatch(authOperations.getCurrent(accessToken));
    }
  }, [dispatch, isLogged, accessToken]);

  return (
    <>
      <Header />
      <PagesRoutes />
      <ToastContainer
        autoClose={2000}
        hideProgressBar
        position="top-center"
        theme="colored"
        transition={Zoom}
      />
    </>
  );
}

export default App;
