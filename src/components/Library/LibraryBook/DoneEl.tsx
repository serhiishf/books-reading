import React from 'react';
import { ReactComponent as Star } from '../../../assets/img/star.svg';
import { DoneT } from '../library.interfaces';
import styles from './DoneEl.module.scss';
import ModalResume from './ModalResume';
import { useTranslation } from 'react-i18next';
import { useModal } from '../../../hooks/useModal';

const DoneEl = ({ rating, resume }: DoneT) => {
  const { isShown, toggle } = useModal();
  const { t } = useTranslation();

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
        <button onClick={toggle} className={styles.resumeBtn}>
          {t('library.resume')}
        </button>
        {isShown ? (
          <ModalResume
            rating={rating}
            resume={resume}
            isOpen={isShown}
            hide={toggle}
          />
        ) : null}
      </div>
    </>
  );
};

export default DoneEl;
