import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/app/hooks';
import authSelectors from '../../redux/features/auth/authSelectors';

const PublicRoute = () => {
  const isLogged = useAppSelector(authSelectors.getLoggedOn);

  return <>{!isLogged ? <Outlet /> : <Navigate to="/library" />}</>;
};

export default PublicRoute;
