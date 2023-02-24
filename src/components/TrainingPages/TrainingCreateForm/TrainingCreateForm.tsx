import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './TrainingCreateForm.module.scss';
import { useTranslation } from 'react-i18next';
import booksApi, { Book } from '../../../services/books/books-service';
import Subheader from '../Subheader';
import Calendar from '../../Calendar';
import Dropdown from '../../Dropdown';
import Button from '../Button';
import { ButtonType } from '../Button/Button';
import ButtonBack from '../../ButtonBack';

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
      <div className={classNames(styles.overlayControlPanel, styles.openControlPanel)}>
        <div className={classNames(styles.controlPanel)}>
          {/* <ButtonBack /> */}
          <Subheader title={t('training.myTraining')} />
          <div className={styles.calendarsWrap}>
            <Calendar
              placeHolder={t('training.start')}
              today={true}
              open={true}
            />
            <Calendar
              placeHolder={t('training.finish')}
              onlyAfter={true}
            />
          </div>
          <div className={styles.selectWrap}>
            <div className={styles.dropdownWrap}>
              <Dropdown
                placeHolder={t('training.chooseBookFromLibrary')}
                options={books.map(book => ({ value: book.name, label: book.name }))}
                noOptionsMessage={t('training.noBookMore')}
              />
            </div>
            <div className={styles.buttonWrap}>
              <Button
                type={ButtonType.add}
                handleClick={handleSubmit}
                title={t('training.add')}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.listBooks}></div>
    </form>
  );
}

export default TrainingCreateForm;