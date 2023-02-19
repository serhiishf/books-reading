import React, { useState } from 'react';
import { ReactComponent as Star } from '../../../assets/img/star.svg';
import { DoneT } from '../library.interfaces';
import styles from './DoneEl.module.scss';
// import ModalResume from './ModalResume';

const DoneEl = ({ rating, resume }: DoneT) => {
  const [openModal, setOpenModal] = useState(false);

  const handleClick = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <div className={styles.starWrapper}>
        <span className={styles.subtitleMob}>Resume:</span>
        <div>
          <Star />
          <Star />
          <Star />
          <Star />
          <Star />
        </div>
      </div>
      <div>
        <button onClick={handleClick} className={styles.resumeBtn}>
          {'Resume'}
        </button>
        {/* {openModal ? <ModalResume raiting={rating} resume={resume} /> : null} */}
      </div>
    </>
  );
};

export default DoneEl;
