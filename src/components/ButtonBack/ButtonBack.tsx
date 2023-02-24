import React from 'react';
import { ReactComponent as BackIcon } from './assets/back.svg';
import styles from './ButtonBack.module.scss';


function ButtonBack() {
  return (
    <div
      className={styles.buttonBack}
    >
      <BackIcon />
    </div>
  );
}

export default ButtonBack;