import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import Rating from './Rating';
import styles from './ModalResume.module.scss';
import { useTranslation } from 'react-i18next';

export interface ModalProps {
  isOpen: boolean;
  hide: () => void;
  resume: string | null;
  rating: number | null;
}

const ModalResume: FunctionComponent<ModalProps> = ({
  rating,
  resume,
  isOpen,
  hide,
}) => {
  const { t } = useTranslation();

  const modal = (
    <div className={styles.backdrop} onClick={hide}>
      <div className={styles.wrapper}>
        <div className={styles.modal}>
          <div>
            <h3>{t('library.leftRating')}</h3>
            <Rating />
            <span>{rating}</span>
          </div>
          <div>
            <h3>{t('library.resume')}</h3>
            <span>{resume}</span>
          </div>
          <div>
            <button className={styles.closeBtn} onClick={hide}>
              {t('library.back')}
            </button>
            <button className={styles.saveBtn}>{t('library.save')}</button>
          </div>
        </div>
      </div>
    </div>
  );

  return isOpen ? ReactDOM.createPortal(modal, document.body) : null;
};

export default ModalResume;
