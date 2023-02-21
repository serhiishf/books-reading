import React, { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../redux/app/hooks';
import authSelectors from '../../redux/features/auth/authSelectors';

type Props = {
  redirectTo: string;
};

const PrivateRoute: FC<Props> = ({ redirectTo = '/' }) => {
  const isLogged = useAppSelector(authSelectors.getLoggedOn);
  return isLogged ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
