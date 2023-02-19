import React from 'react';
import styles from './ModalResume.module.scss';
import { DoneT } from '../library.interfaces';

const ModalResume = ({rating, resume}: DoneT) => {
  return (
    <>
      <div className={styles.modal}>
        MODAL
        <span>{rating}</span>
        <span>{resume}</span>
      </div>
    </>
  );
};

export default ModalResume;
