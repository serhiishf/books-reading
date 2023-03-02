import React, { FC } from 'react';
import BookListHeader from '../BookListHeader';
import { Book } from '../../../services/books/books-service';
import { ReactComponent as BookImg } from '../../../assets/img/book.svg';
import { AiOutlineDelete } from 'react-icons/ai';
import BookItem from '../BookItem';
import styles from './BookListEmpty.module.scss';

type Props = {
  activeBooks: Book[];
};

const BookListEmpty: FC<Props> = ({ activeBooks }) => {
  const onOpenClick = () => {
    console.log('!!!');
  };

  return (
    <div>
      <BookListHeader />
      <ul>
        {activeBooks.map((book) => {
          return (
            <li className={styles.bookName} key={book._id}>
              <BookImg className={styles.iconBook} />
              <div className={styles.bookItem}>
                <BookItem key={book._id} book={book} />
              </div>
              <button className={styles.btnDel} onClick={onOpenClick}>
                <AiOutlineDelete color="#a6abb9" style={{ fontSize: '20px' }} />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BookListEmpty;
