import React, { useState, useEffect } from 'react';
import styles from './CreateTraining.module.scss';
import { useTranslation } from 'react-i18next';
import TrainingCreateForm from '../TrainingCreateForm';
import BookCounter from '../BookCounter';
import moment from 'moment';
import Table from '../Table';
import { Book } from '../../../services/books/books-service';
import booksApi from '../../../services/books/books-service';
import Button from '../Button';
import { ButtonType } from '../Button/Button';

function CreateTraining() {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [bookCounterDays, setBookCounterDays] = useState<number>(0);
  const [addedBooksID, setAddedBooksID] = useState<string[]>([]);
  const [addedBooks, setAddedBooks] = useState<Book[]>([]);

  function handleDeleteBook(id: string) {
    const updatedBooks = addedBooksID.filter((bookId) => bookId !== id);
    setAddedBooksID(updatedBooks);
  }

  useEffect(() => {
    if (startDate && endDate) {
      const days = moment(endDate).diff(moment(startDate), 'days');
      setBookCounterDays(days);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await Promise.all(
        addedBooksID.map((id) => booksApi.getBookById(id))
      );
      const books = response.filter((book) => book !== undefined) as Book[];
      setAddedBooks(books);
      console.log(response);
    };
    if (addedBooksID.length > 0) {
      fetchBooks();
    } else {
      setAddedBooks([]);
    }
  }, [addedBooksID]);

  const handleStartBtn = () => {
    console.log('Start btn');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContent}>
        <TrainingCreateForm
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setAddedBooks={setAddedBooksID}
        />
        <Table
          canDelete={true}
          canMarkedDone={true}
          books={addedBooks}
          deleteItemFunc={handleDeleteBook}
        />
        <div className={styles.startBtnWrap}>
          <Button
            type={ButtonType.done}
            handleClick={handleStartBtn}
            title={t('training.startTaining')}
          />
        </div>
        <div className={styles.wrapChartDiagram}>
          {/* TODO: insert diagram here */}
        </div>
      </div>
      <div className={styles.sidebar}>
        <BookCounter
          books={addedBooks.length}
          days={bookCounterDays}
        />
      </div>
    </div>
  );
}

export default CreateTraining;
