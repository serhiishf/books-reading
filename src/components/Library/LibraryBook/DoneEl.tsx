import React, { useState } from 'react';
import { ReactComponent as Star } from '../../../assets/img/star.svg';
import { DoneT } from '../library.interfaces';
import styles from './DoneEl.module.scss';
import ModalResume from './ModalResume';
import { useTranslation } from 'react-i18next';

const DoneEl = ({ rating, resume }: DoneT) => {
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation();

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
          {t('library.resume')}
        </button>
        {openModal ? <ModalResume rating={rating} resume={resume} /> : null}
      </div>
    </>
  );
};

export default DoneEl;
