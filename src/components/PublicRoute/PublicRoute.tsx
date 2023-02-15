import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../redux/app/hooks';
import authSelectors from '../../redux/features/auth/authSelectors';
import LibraryPage from '../../views/LibraryPage';

const PublicRoute = () => {
  const isLogged = useAppSelector(authSelectors.getLoggedOn);

  return <>{!isLogged ? <Outlet /> : <LibraryPage />}</>;
};

export default PublicRoute;
