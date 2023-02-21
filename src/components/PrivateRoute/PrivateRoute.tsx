import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../redux/app/hooks';
import authSelectors from '../../redux/features/auth/authSelectors';

const PrivateRoute = () => {
  const isLogged = useAppSelector(authSelectors.getLoggedOn);
  return isLogged ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
