import React from 'react';
import Logo from '../Logo';
import Nav from '../Nav';
import NavNotAuth from '../NavNotAuth';
import NavAuth from '../NavAuth';
import styles from './Header.module.scss';
import { useAppSelector } from '../../redux/app/hooks';
import authSelectors from '../../redux/features/auth/authSelectors';

export default function Header() {
  const isLogged = useAppSelector(authSelectors.getLoggedOn);

  return (
    <header className={styles.headerWrapper}>
      <Logo />
      <Nav>{isLogged ? <NavAuth /> : <NavNotAuth />} </Nav>
    </header>
  );
}
