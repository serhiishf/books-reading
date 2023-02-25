import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as BookImg } from '../../../assets/img/book.svg';
import { CiEdit } from 'react-icons/ci';
import DoneEl from './DoneEl';
import styles from './LibraryBook.module.scss';
import { BookProps } from '../library.interfaces';
import { useModal } from '../../../hooks/useModal';
import Portal from '../../Portal';
import publicRoots from '../../../utils/publicRoots';
import ModalUpdate from './ModalUpdate/ModalUpdate';


const LibraryBook: React.FC<BookProps> = ({ book }) => {
  const { isShown, toggle } = useModal();
  const { t } = useTranslation();

  return (
    <li
      className={`${
        book.status === 'done' ? styles.itemDone : styles.bookItem
      }`}
    >
      <div className={styles.bookName}>
        <BookImg
          className={`${styles.icon} ${
            book.status === 'active' ? styles.iconActive : ''
          }`}
        />
        <span>{book.name}</span>
      </div>
      <div className={styles.bookInfo}>
        <div>
          <span className={styles.subtitleMob}>{t('library.author')}:</span>
          <span className={styles.subtitle}>{book.author}</span>
        </div>
        <div>
          <span className={styles.subtitleMob}>{t('library.yearShort')}:</span>
          <span className={styles.subtitle}>{book.year}</span>
        </div>
        <div>
          <span className={styles.subtitleMob}>{t('library.pageShort')}:</span>
          <span className={styles.subtitle}>{book.pages}</span>
        </div>
        {book.status === 'done' ? (
          <DoneEl _id={book._id} rating={book.rating} resume={book.resume} />
        ) : null}
        <button className={styles.editBtn} onClick={toggle}>
          <CiEdit title={t('library.edit')} />
        </button>
        {isShown && (
          <Portal wrapperId={publicRoots.UpdateModal}>
            <ModalUpdate
              book={book}
              isOpen={isShown}
              hide={toggle}
            />
          </Portal>
        )}
      </div>
    </li>
  );
};

export default LibraryBook;
