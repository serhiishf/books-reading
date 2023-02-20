import { ReactComponent as SvgLibrary } from '../../assets/img/book.svg';
import { ReactComponent as SvgHome } from '../../assets/img/home.svg';
import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import styles from './NavAuth.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import authOperations from '../../redux/features/auth/authOperations';
import authSelectors from '../../redux/features/auth/authSelectors';
import { useTranslation } from 'react-i18next';
import UserName from '../UserName';

export default function NavAuth() {
  const dispatch = useAppDispatch();
  const userName = useAppSelector(authSelectors.getUserName);
  // const isLoading = useAppSelector(authSelectors.getLoading);

  const { t } = useTranslation();
  const onLogoutClick = async () => {
    await dispatch(authOperations.logOut());
  };

  return (
    <div className={styles.navWrapper}>
      <UserName userNameStr={userName} />

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
          {t('auth.logout')}
        </NavLink>
      </div>
    </div>
  );
}
//on mobile width instead linksWrapper shoud be burber and instead user name - icon
