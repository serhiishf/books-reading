import React, { Suspense } from 'react';
import { useAppSelector } from '../../redux/app/hooks';
import authSelectors from '../../redux/features/auth/authSelectors';
import IntroPage from '../IntroPage';
import LibraryPage from '../LibraryPage';
import Loader from '../../components/Loader';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../LoginPage';
import RegisterPage from '../RegisterPage';
import PublicRoute from '../../components/PublicRoute';
import PrivateRoute from '../../components/PrivateRoute';
import TrainingPage from '../TrainingPage';

const PagesRoutes = () => {
  const isLogged = useAppSelector(authSelectors.getLoggedOn);

  return (
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
        <Route path="*" element={<Navigate to='/'/>} />
      </Routes>
    </Suspense>
  );
};

export default PagesRoutes;
