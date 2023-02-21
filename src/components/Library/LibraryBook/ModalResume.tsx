import React, {
  FunctionComponent,
  useState,
  ChangeEvent,
  useEffect,
} from 'react';
import ReactDOM from 'react-dom';
import Rating from './Rating';
import styles from './ModalResume.module.scss';
import { useTranslation } from 'react-i18next';

export interface ModalProps {
  isOpen: boolean;
  hide: () => void;
  resume: string;
  rating: number | null;
}

type MessageT = string;

const ModalResume: FunctionComponent<ModalProps> = ({
  rating,
  resume,
  isOpen,
  hide,
}) => {
  const { t } = useTranslation();
  const [message, setMessage] = useState<MessageT>('');

  useEffect(() => {
    setMessage(resume);
  }, []);

  const handleResume = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setMessage(value);
    console.log(value);
  };

  const modal = (
    <div className={styles.backdrop}>
      <div className={styles.wrapper}>
        <div className={styles.modal}>
          <div>
            <h3>{t('library.leftRating')}</h3>
            <Rating />
            <span>{rating}</span>
          </div>
          <div>
            <h3>{t('library.resume')}</h3>
            <textarea
              className={styles.tetxarea}
              name="feedback"
              value={message}
              rows={10}
              placeholder="Leave your feedback..."
              onChange={handleResume}
            />
            <span>{resume}</span>
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
