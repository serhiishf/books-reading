import React, { FC } from 'react';
import BookListHeader from '../BookListHeader';
import { Book } from '../../../services/books/books-service';
import { ReactComponent as BookImg } from '../../../assets/img/book.svg';
import BookItem from '../BookItem';
import styles from './BookListEmpty.module.scss';

type Props = {
  activeBooks: Book[];
};

const BookListEmpty: FC<Props> = ({ activeBooks }) => {
  return (
    <div>
      <BookListHeader />
      <ul>
        {activeBooks.map((book) => {
          return (
            <li className={styles.bookName} key={book._id}>
              <BookImg className={styles.icon} />
              <BookItem key={book._id} book={book} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BookListEmpty;
