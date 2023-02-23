import React from 'react';
import styles from './ModalChoice.module.scss';

interface Props {
  questionTxt: string;
  confirmBtnTxt: string;
  resetBtnTxt: string;
  onConfirmClick: () => void;
  onResetClick: () => void;
}

const ModalChoice: React.FC<Props> = ({
  questionTxt,
  confirmBtnTxt,
  resetBtnTxt,
  onConfirmClick,
  onResetClick,
}) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p>{questionTxt}</p>
        <button type="button" onClick={onResetClick}>
          {resetBtnTxt}
        </button>
        <button type="button" onClick={onConfirmClick}>
          {confirmBtnTxt}
        </button>
      </div>
    </div>
  );
};

export default ModalChoice;
