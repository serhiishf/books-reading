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
import trainingApi from '../../../services/training/training-service';
// import TrainingDiagram from '../../TrainingDiagram';
// import { toast } from 'react-toastify';

interface CreateTrainingProps {
  handleSuccess: () => void;
  /*  handleSuccess: React.Dispatch<React.SetStateAction<string>>; */
}

function CreateTraining({ handleSuccess }: CreateTrainingProps) {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [bookCounterDays, setBookCounterDays] = useState<number>(0);
  const [addedBooksID, setAddedBooksID] = useState<string[]>([]);
  const [addedBooks, setAddedBooks] = useState<Book[]>([]);
  // const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    if (startDate && endDate) {
      const days = moment(endDate).diff(moment(startDate), 'days');
      setBookCounterDays(days);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (addedBooksID.length > 0) {
      fetchBooks();
    } else {
      setAddedBooks([]);
    }
  }, [addedBooksID]);

  function handleDeleteBook(id: string) {
    const updatedBooks = addedBooks.filter((book) => book._id !== id);
    setAddedBooks(updatedBooks);
  }

  const fetchBooks = async () => {
    const response = await Promise.all(
      addedBooksID.map((id) => booksApi.getBookById(id)),
    );

    const books = response.filter((book) => book !== undefined) as Book[];
    setAddedBooks(books);
  };

  const checkPermitionCreate = (): boolean => {
    if (endDate === '') {
      alert('Add Finish Date!');
      return false;
    } else if (addedBooksID.length === 0) {
      alert('Add book in your training!');
      return false;
    }
    return true;
  };

  const handleStartBtn = async () => {
    if (checkPermitionCreate()) {
      await trainingApi.createTraining({
        start: startDate.replace('T', ' '),
        finish: endDate.replace('T', ' '),
        books: addedBooksID.map((bookId: string) => {
          return { book: bookId };
        }),
      });
      handleSuccess(/* 'true' */);
    }
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
          {/* <TrainingDiagram
            isRealTraining={true}
            daysAmount={bookCounterDays}
            addedBooks={addedBooks}
            // totalPages={}
          /> */}
        </div>
      </div>
      <div className={styles.sidebar}>
        <BookCounter books={addedBooks.length} days={bookCounterDays} />
      </div>
    </div>
  );
}

export default CreateTraining;
