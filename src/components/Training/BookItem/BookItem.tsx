import React from 'react';
import styles from './BookItem.module.scss';
import { Book } from '../../../services/books/books-service';

interface Props {
  book: Book;
}

const BookItem: React.FC<Props> = ({ book }) => {
  return (
    <div className={styles.thumb} key={book._id}>
      <p className={styles.name}>{book.name}</p>
      <p className={styles.author}>{book.author}</p>
      <p className={styles.year}>{book.year}</p>
      <p className={styles.pages}>{book.pages}</p>
    </div>
  );
};

export default BookItem;
