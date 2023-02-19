import React from 'react';
import styles from './ModalResume.module.scss';

const ModalResume = (rating: number | null, resume: string | null) => {
  return (
    <>
      <div>
        MODAL
        <span>{rating}</span>
        <span>{resume}</span>
      </div>
    </>
  );
};

export default ModalResume;
