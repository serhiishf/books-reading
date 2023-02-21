import React, { Suspense, useState, useEffect } from 'react';
import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader from '../../components/Loader';
import PublicRoute from '../../components/PublicRoute';
import PrivateRoute from '../../components/PrivateRoute';
import Header from '../../components/Header';
import { useAppSelector } from '../../redux/app/hooks';
import authSelectors from '../../redux/features/auth/authSelectors';

const IntroPage = lazy(() => import('../IntroPage'));
const LoginPage = lazy(() => import('../LoginPage'));
const RegisterPage = lazy(() => import('../RegisterPage'));
const LibraryPage = lazy(() => import('../LibraryPage'));
const TrainingPage = lazy(() => import('../TrainingPage'));
const Page404 = lazy(() => import('../Page404'));

const PagesRoutes = () => {
  const [currentRoute, setCurrentRoute] = useState('');
  const isFetchingUser = useAppSelector(authSelectors.getFetching);

  useEffect(() => {
    window.onbeforeunload = () => {
      window.sessionStorage.setItem(
        'lastRoute',
        JSON.stringify(window.location.pathname),
      );
    };
    const route = window.sessionStorage.getItem('lastRoute') as string;
    setCurrentRoute(route.slice(2, -1));
  }, [currentRoute]);

  return !isFetchingUser ? (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route element={<PublicRoute restricted redirectTo={currentRoute} />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={<PublicRoute restricted redirectTo="/login" />}>
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          <Route element={<PrivateRoute redirectTo="/login" />}>
            <Route path="/library" element={<LibraryPage />} />
          </Route>
          <Route element={<PrivateRoute redirectTo="/login" />}>
            <Route path="/training" element={<TrainingPage />} />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Suspense>
    </>
  ) : (
    <Loader />
  );
};

export default PagesRoutes;
