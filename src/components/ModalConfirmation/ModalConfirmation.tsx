import React from 'react';
import styles from './ModalConfirmation.module.scss';

interface Props {
  questionTxt: string;
  confirmBtnTxt: string;
  onConfirmClick: () => void;
}

const ModalConfirmation: React.FC<Props> = ({
  questionTxt,
  confirmBtnTxt,
  onConfirmClick,
}) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p>{questionTxt}</p>
        <button type="button" onClick={onConfirmClick}>
          {confirmBtnTxt}
        </button>
      </div>
    </div>
  );
};

export default ModalConfirmation;
