import { ReactComponent as SvgLibrary } from '../../assets/img/book.svg';
import { ReactComponent as SvgHome } from '../../assets/img/home.svg';
import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import styles from './NavAuth.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import authOperations from '../../redux/features/auth/authOperations';
import authSelectors from '../../redux/features/auth/authSelectors';

export default function NavAuth() {
  const dispatch = useAppDispatch();
  const userName = useAppSelector(authSelectors.getUserName);

  const onLogoutClick = async () => {
    await dispatch(authOperations.logOut());
  };

  return (
    <div className={styles.navWrapper}>
      <div className={styles.userName}>{userName}</div>
      <div className={styles.linksWrapper}>
        <NavLink className={styles.navLink} key={uuidv4()} to={'/library'}>
          <SvgLibrary className={styles.icon} />
        </NavLink>
        <NavLink className={styles.navLink} key={uuidv4()} to={'/training'}>
          <SvgHome className={styles.icon} />
        </NavLink>
        <NavLink
          className={styles.navLink}
          key={uuidv4()}
          to={'/'}
          onClick={onLogoutClick}
        >
          Logout
        </NavLink>
      </div>
    </div>
  );
}
