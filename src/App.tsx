import React, { useEffect } from 'react';
import './App.scss';
import PagesRoutes from './views/PagesRoutes';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from './redux/app/hooks';
import authOperations from './redux/features/auth/authOperations';
import tokenService from './services/auth/token-service';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

function App() {
  const dispatch = useAppDispatch();
  const accessToken = tokenService.getLocalAccessToken();

  // const { i18n } = useTranslation();
  // console.log(i18n);
  console.log(i18n);

  useEffect(() => {
    if (accessToken) {
      dispatch(authOperations.getCurrent());
    }
  }, [dispatch, accessToken]);

  return (
    <>
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
