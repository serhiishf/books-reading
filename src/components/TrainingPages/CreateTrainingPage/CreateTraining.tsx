import React, { useState, useEffect } from 'react';
import Dropdown from '../../Dropdown';
import styles from './CreateTraining.module.scss';
import { useTranslation } from 'react-i18next';
import booksApi, { Book } from '../../../services/books/books-service';
import Subheader from '../Subheader';

function CreateTraining() {
  const { t } = useTranslation();
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await booksApi.getAllBooks();
      setBooks(data);
    };
    fetchBooks();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContent}>
        <Subheader title={t('myTraining')} />
        <Dropdown
          placeHolder={t('chooseBookFromLibrary')}
          options={books.map(book => ({ value: book.name, label: book.name }))}
          noOptionsMessage={t('noBookMore')}
        />
      </div>
      <div className={styles.sidebar}>
        <Subheader title={t('myGoals')} />
      </div>
    </div>
  );
}

export default CreateTraining;
