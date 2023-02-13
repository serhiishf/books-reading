import React, { useEffect } from 'react';
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
  const accessToken = localStorage.getItem('AUTH_TOKEN');
  const refreshToken = localStorage.getItem('REFRESH_TOKEN') as string;

  useEffect(() => {
    if (accessToken && refreshToken) {
      dispatch(setAccessToken(accessToken));
      dispatch(setRefreshToken(refreshToken));
    }
  }, [accessToken, refreshToken, dispatch]);

  useEffect(() => {
    if (!isLogged && accessToken) {
      dispatch(authOperations.refresh(refreshToken));
      dispatch(authOperations.getCurrent());
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
