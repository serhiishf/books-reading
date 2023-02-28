import React from 'react';
import styles from './BookListHeader.module.scss';

const BookListHeader = () => {
  return (
    <div className={styles.thumb}>
      <p className={styles.name}>Назва книги</p>
      <p className={styles.author}>Автор</p>
      <p className={styles.year}>Рік</p>
      <p className={styles.pages}>Сторінка</p>
    </div>
  );
};

export default BookListHeader;
