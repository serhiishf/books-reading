import React from 'react';
import { useTranslation } from 'react-i18next';
import { useModal } from '../../../../hooks/useModal';
import publicRoots from '../../../../utils/publicRoots';
import ModalResume from '../ModalResume';
import Rating from '../Rating';
import Portal from '../../../Portal';
import { DoneT } from '../../library.interfaces';
import styles from './DoneEl.module.scss';

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
        {isShown && (
          <Portal wrapperId={publicRoots.ResumeModal}>
            <ModalResume
              bookId={_id}
              rating={rating}
              resume={resume ? resume : ''}
              isOpen={isShown}
              hide={toggle}
            />
          </Portal>
        )}
      </div>
    </>
  );
};

export default DoneEl;
