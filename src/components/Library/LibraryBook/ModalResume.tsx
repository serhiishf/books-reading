import React from 'react';
import styles from './ModalResume.module.scss';
import { DoneT } from '../library.interfaces';
import { useTranslation } from 'react-i18next';

const ModalResume = ({ rating, resume }: DoneT) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.modal}>
        <div>
          <h3>{t('library.leftRating')}</h3>
          <span>{rating}</span>
        </div>
        <div>
          <h3>{t('library.resume')}</h3>
          <span>{resume}</span>
        </div>
        <div>
          <button>{t('library.back')}</button>
          <button>{t('library.save')}</button>
        </div>
      </div>
    </>
  );
};

export default ModalResume;
