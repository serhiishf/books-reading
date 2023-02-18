import React from 'react';
import { ReactComponent as BookImg } from '../../../assets/img/book.svg';
import DoneEl from './DoneEl';
import styles from './LibraryBook.module.scss';
import { BookProps } from '../library.interfaces';

const LibraryBook: React.FC<BookProps> = ({ book }) => {
  return (
    <li className={styles.bookItem}>
      <BookImg />
      <div>{book.name}</div>
      <div>{book.author}</div>
      <div>{book.year}</div>
      <div>{book.pages}</div>
      {book.status === 'done' ? (
        <DoneEl raiting={book.raiting} resume={book.resume} />
      ) : null}
    </li>
  );
};

export default LibraryBook;
