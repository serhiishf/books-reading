import React, { useState } from 'react';
import styles from './MobileMenu.module.scss';
import Hamburger from '../../Hamburger';
interface Props {
  logoutClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const MobileMenu: React.FC<Props> = ({ logoutClick }) => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  };
  //todo: i18n
  return (
    <>
      <div className={styles.contentBox}>
        {hamburgerOpen && (
          <>
            <div className={styles.list}>
              <div>link</div>
              <div>link</div>
              <button type="button" onClick={logoutClick}>
                logout
              </button>
            </div>
          </>
        )}
      </div>

      <button
        type="button"
        onClick={toggleHamburger}
        className={styles.burgerBtn}
      >
        <Hamburger isOpen={hamburgerOpen} />
      </button>
    </>
  );
};

export default MobileMenu;
