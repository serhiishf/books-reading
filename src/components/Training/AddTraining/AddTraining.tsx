import React, { useState, FC } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './AddTraining.module.scss';
import Calendar from '../../Calendar';
import booksApi, { Book } from '../../../services/books/books-service';
import BookSelectInput from '../BookSelectInput';
import AddedBooksList from '../AddedBookList';

type Props = {
  books: Book[];
  activeBooks: Book[];
  onAddActive: (newBook: Book) => void;
};

const AddTraining: FC<Props> = ({ books, activeBooks, onAddActive }) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [bookCounterDays, setBookCounterDays] = useState<number>(0);

  const { t } = useTranslation();

  const handleAddTraining = () => {
    console.log('!!!!!!');
    console.log(activeBooks);
    activeBooks.map(async (book) => {
      console.log(book);
      await booksApi.updateBookStatus({ bookId: book._id, status: 'active' });
    });
  };

  return (
    <div className={styles.addTrainingWrapper}>
      <h3>{t('training.myTraining')}</h3>
      <div className={styles.calendarsWrap}>
        <Calendar
          placeHolder={t('training.start')}
          today={true}
          open={true}
          setDate={setStartDate}
        />
        <Calendar
          placeHolder={t('training.finish')}
          onlyAfter={true}
          setDate={setEndDate}
        />
      </div>
      <BookSelectInput books={books} onAddActive={onAddActive} />
      <AddedBooksList activeBooks={activeBooks} />
      <button type="button" onClick={handleAddTraining}>
        {t('training.startTaining')}
      </button>
    </div>
  );
};

export default AddTraining;
