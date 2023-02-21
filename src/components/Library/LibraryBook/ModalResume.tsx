import React, { FunctionComponent, useState, ChangeEvent } from 'react';
import ReactDOM from 'react-dom';
import Rating from './Rating';
import styles from './ModalResume.module.scss';
import { useTranslation } from 'react-i18next';
// import booksApi from '../../../services/books/books-service';

export interface ModalProps {
  isOpen: boolean;
  hide: () => void;
  resume: string;
  rating: number | null;
}

// const bookId = '63f50f95a6e01486dd1cad4e';
// const resume =
//   'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum';

// const rating = 3;

// booksApi.updateBookResume({ bookId, resume, rating });

const ModalResume: FunctionComponent<ModalProps> = ({
  rating,
  resume,
  isOpen,
  hide,
}) => {
  const { t } = useTranslation();
  const [message, setMessage] = useState(resume);

  const handleRating = () => {
    console.log('rating', rating);
  };

  const handleResume = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setMessage(value);
  };

  const modal = (
    <div className={styles.backdrop}>
      <div className={styles.wrapper}>
        <div className={styles.modal}>
          <div onClick={handleRating}>
            <h3 className={styles.title}>{t('library.leftRating')}</h3>
            <Rating />
          </div>
          <div>
            <h3 className={styles.title}>{t('library.resume')}</h3>
            <textarea
              className={styles.tetxarea}
              name="feedback"
              value={message || resume}
              rows={10}
              placeholder="Leave your feedback..."
              onChange={handleResume}
            />
          </div>
          <div className={styles.btnWrapper}>
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
