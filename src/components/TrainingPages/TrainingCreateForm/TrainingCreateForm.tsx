import React, { useState, useEffect } from 'react';
import styles from './TrainingCreateForm.module.scss';
import { useTranslation } from 'react-i18next';
import booksApi, { Book } from '../../../services/books/books-service';
import Subheader from '../Subheader';
import Calendar from '../../Calendar';
import Dropdown from '../../Dropdown';
import Button from '../Button';
import { ButtonType } from '../Button/Button';

function TrainingCreateForm() {
  const { t } = useTranslation();
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await booksApi.getAllBooks();
      setBooks(data);
    };
    fetchBooks();
  }, []);
  const handleSubmit = () => {
    console.log('Submit btn');
  };

  return (
    <form className={styles.createForm}>
      <div className={styles.controlPanel}>
        <Subheader title={t('myTraining')} />
        <div className={styles.calendarsWrap}>
          <Calendar
            placeHolder='Початок'
            today={true}
            open={true}
          />
          <Calendar
            placeHolder='Закінчення'
            onlyAfter={true}
          />
        </div>
        <div className={styles.selectWrap}>
          <Dropdown
            placeHolder={t('chooseBookFromLibrary')}
            options={books.map(book => ({ value: book.name, label: book.name }))}
            noOptionsMessage={t('noBookMore')}
          />
          <Button
            type={ButtonType.add}
            handleClick={handleSubmit}
            title={t('auth.register')}
          />
        </div>
      </div>
      <div className={styles.listBooks}></div>
    </form>
  );
}

export default TrainingCreateForm;