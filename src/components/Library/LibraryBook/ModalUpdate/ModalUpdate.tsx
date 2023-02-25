import React, { FunctionComponent } from 'react';
import styles from '../../LibraryBook/ModalResume/ModalResume.module.scss';
import ModalUpdateForm from './ModalUpdateForm';
import { Book } from '../../../../services/books/books-service';

export interface ModalProps {
  book: Book;
  isOpen: boolean;
  hide: () => void;
}

const ModalUpdate: FunctionComponent<ModalProps> = ({ book, isOpen, hide }) => {

  return isOpen ? (
    <div className={styles.backdrop}>
      <div className={styles.wrapper}>
        <div className={styles.modal}>
          <ModalUpdateForm book={book} hide={hide} />
        </div>
      </div>
    </div>
  ) : null;
};

export default ModalUpdate;
