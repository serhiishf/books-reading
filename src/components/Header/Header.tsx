import React from 'react';
import Logo from '../Logo';
import Nav from '../Nav';
import NavNotAuth from '../NavNotAuth';
import NavAuth from '../NavAuth';
import styles from './Header.module.scss';

export default function Header() {
  const isLogged = true;

  return (
    <header className={styles.headerWrapper}>
      <Logo />
      <Nav>{isLogged ? <NavAuth /> : <NavNotAuth />} </Nav>
    </header>
  );
}
