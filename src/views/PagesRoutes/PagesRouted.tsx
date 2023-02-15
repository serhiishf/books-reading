import React, { Suspense } from 'react';
import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import PublicRoute from '../../components/PublicRoute';
import PrivateRoute from '../../components/PrivateRoute';
import { useAppSelector } from '../../redux/app/hooks';
import authSelectors from '../../redux/features/auth/authSelectors';
import Header from '../../components/Header';

const IntroPage = lazy(() => import('../IntroPage'));
const LoginPage = lazy(() => import('../LoginPage'));
const RegisterPage = lazy(() => import('../RegisterPage'));
const LibraryPage = lazy(() => import('../LibraryPage'));
const TrainingPage = lazy(() => import('../TrainingPage'));
// const Page404 = lazy(() => import('../Page404'));
// const AboutPage = lazy(() => import('../AboutPage'));

const PagesRoutes = () => {
  const isLogged = useAppSelector(authSelectors.getLoggedOn);
  const currentComponent = !isLogged ? <IntroPage /> : <LibraryPage />;

  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<IntroPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/training" element={<TrainingPage />} />
          </Route>
          <Route path="*" element={currentComponent} />
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
      </Suspense>
    </>
  );
};

export default PagesRoutes;
