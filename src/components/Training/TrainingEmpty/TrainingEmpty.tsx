import React, { useState, useEffect } from 'react';
import booksApi, { Book } from '../../../services/books/books-service';
import { useTranslation } from 'react-i18next';
import styles from './TrainingEmpty.module.scss';

const TrainingEmpty = () => {
  const [pendingBooks, setPendingBooks] = useState<Book[]>([]);

  const { t } = useTranslation();

  const getPendingBooks = async () => {
    const { data } = await booksApi.getBooksByStatus('pending');
    console.log('DATA', data);
    setPendingBooks(data);
    console.log('pendingBooks', pendingBooks);
  };

  useEffect(() => {
    getPendingBooks();
    // console.log(pendingBooks);
  }, []);

  return (
    <div>
      <div className={styles.trainingWrapper}>
        <h3>{t('training.myTraining')}</h3>
      </div>
    </div>
  );
};

export default TrainingEmpty;
