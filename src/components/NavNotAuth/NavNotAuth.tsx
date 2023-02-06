import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavNotAuth.module.scss';
import routes, { IRoute } from '../../routes';
import { v4 as uuidv4 } from 'uuid';

export default function NavNotAuth() {
  const navLinks: Array<IRoute> = useMemo(
    () => routes.filter((route) => route.isNav),
    [],
  );

  return (
    <div className={styles.navWrapper}>
      {navLinks.map((link: IRoute) => (
        <NavLink key={uuidv4()} to={link.path}>
          {link.label}
        </NavLink>
      ))}
    </div>
  );
}
