import React from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../redux/app/hooks';
import authSelectors from '../../redux/features/auth/authSelectors';
import styles from './Page404.module.scss';

export default function Page404() {
  const isLogged = useAppSelector(authSelectors.getLoggedOn);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.txt1}>Article not found</p>
      <p className={styles.txt2}>The page you requested cannot be found.</p>
      <Link className={styles.link} to={isLogged ? '/library' : '/login'}>
        Return to the Homepage
      </Link>
    </div>
  );
}
