import React from 'react';
import { ReactComponent as BookImg } from '../../../assets/img/book.svg';
import DoneEl from './DoneEl';
import styles from './LibraryBook.module.scss';
import { BookProps } from '../library.interfaces';

const LibraryBook: React.FC<BookProps> = ({ book }) => {
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
          <span className={styles.subtitleMob}>Author:</span>
          <span className={styles.subtitle}>{book.author}</span>
        </div>
        <div>
          <span className={styles.subtitleMob}>Year:</span>
          <span className={styles.subtitle}>{book.year}</span>
        </div>
        <div>
          <span className={styles.subtitleMob}>Pages:</span>
          <span className={styles.subtitle}>{book.pages}</span>
        </div>
        {book.status === 'done' ? (
          <DoneEl _id={book._id} rating={book.rating} resume={book.resume} />
        ) : null}
      </div>
    </li>
  );
};

export default LibraryBook;
