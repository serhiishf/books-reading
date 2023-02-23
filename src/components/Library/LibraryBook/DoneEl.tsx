import React from 'react';
import { DoneT } from '../library.interfaces';
import styles from './DoneEl.module.scss';
import ModalResume from './ModalResume';
import { useTranslation } from 'react-i18next';
import { useModal } from '../../../hooks/useModal';
import Rating from './Rating';

const DoneEl = ({ _id, rating, resume }: DoneT) => {
  const { isShown, toggle } = useModal();
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.starWrapper}>
        <span className={styles.subtitleMob}>Resume:</span>
        <div>
          <Rating count={5} value={rating || 0} edit={false} />
        </div>
      </div>
      <div>
        <button onClick={toggle} className={styles.resumeBtn}>
          {t('library.resume')}
        </button>
        {isShown ? (
          <ModalResume
            bookId={_id}
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
