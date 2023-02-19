import React from 'react';
import LibraryBook from '../LibraryBook';
import { BooksI } from '../library.interfaces';
import styles from './LibraryBooksList.module.scss';

const LibraryBooksList = ({ books }: BooksI) => {
  const activeBooks = books.filter((book) => book.status === 'active');
  const doneBooks = books.filter((book) => book.status === 'done');
  const pendingBooks = books.filter((book) => book.status === 'pending');

  return (
    <div className={styles.wrapper}>
      {doneBooks ? (
        <div>
          <h3 className={styles.sectionTitle}>Already read</h3>
          <div className={styles.titlesWrapper}>
            <span>Book title</span>
            <div>
              <span>Author</span>
              <span>Year</span>
              <span>Pages</span>
              <span>Raiting</span>
            </div>
          </div>
          <ul>
            {doneBooks.map((book, i) => (
              <LibraryBook book={book} key={i} />
            ))}
          </ul>
        </div>
      ) : null}
      {activeBooks ? (
        <div>
          <h3 className={styles.sectionTitle}>Reading now</h3>
          <div className={styles.wrapTitls}>
            <span>Book title</span>
            <div>
              <span>Author</span>
              <span>Year</span>
              <span>Pages</span>
            </div>
          </div>
          <ul>
            {activeBooks.map((book, i) => (
              <LibraryBook book={book} key={i} />
            ))}
          </ul>
        </div>
      ) : null}
      {pendingBooks ? (
        <div>
          <h3 className={styles.sectionTitle}>Going to read</h3>
          <div className={styles.wrapTitls}>
            <span>Book title</span>
            <div>
              <span>Author</span>
              <span>Year</span>
              <span>Pages</span>
            </div>
          </div>
          <ul>
            {pendingBooks.map((book, i) => (
              <LibraryBook book={book} key={i} />
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default LibraryBooksList;
