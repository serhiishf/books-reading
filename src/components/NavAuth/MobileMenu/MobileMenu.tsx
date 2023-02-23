import React, { useState } from 'react';
import styles from './MobileMenu.module.scss';
import Hamburger from '../../Hamburger';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { ReactComponent as SvgLibrary } from '../../../assets/img/book.svg';
import { ReactComponent as SvgHome } from '../../../assets/img/home.svg';

interface Props {
  logoutClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const MobileMenu: React.FC<Props> = ({ logoutClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();

  const toggleHamburger = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div
        onClick={toggleHamburger}
        className={classNames(styles.overlay, menuOpen && styles.openMenu)}
      ></div>
      <div
        className={classNames(styles.contentBox, menuOpen && styles.openMenu)}
      >
        <div className={styles.list}>
          <NavLink className={styles.link} to={'/library'}>
            <SvgLibrary />
            {t('navigation.library')}
          </NavLink>
          <NavLink className={styles.link} to={'/training'}>
            <SvgHome /> {t('navigation.training')}
          </NavLink>
          <button
            className={styles.logoutBtn}
            type="button"
            onClick={logoutClick}
          >
            {t('auth.logout')}
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={toggleHamburger}
        className={styles.burgerBtn}
      >
        <Hamburger isOpen={menuOpen} />
      </button>
    </>
  );
};

export default MobileMenu;
