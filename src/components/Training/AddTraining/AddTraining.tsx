import React, { useState, FC } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './AddTraining.module.scss';
import Calendar from '../../Calendar';
import { Book } from '../../../services/books/books-service';
import BookSelectInput from '../BookSelectInput';
import AddedBooksList from '../AddedBookList';

type Props = {
  books: Book[];
  activeBooks: Book[];
  onAddActive: (newBook: Book) => void;
  handleCreateTraining: () => void;
};

const AddTraining: FC<Props> = ({
  books,
  activeBooks,
  onAddActive,
  handleCreateTraining,
}) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [bookCounterDays, setBookCounterDays] = useState<number>(0);

  const { t } = useTranslation();

  const checkPermissionCreate = (): boolean => {
    if (endDate === '') {
      alert('Add Finish Date!');
      return false;
    } else if (!activeBooks.length) {
      alert('Add book in your training!');
      return false;
    }
    return true;
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
      <button type="button" onClick={handleCreateTraining}>
        {t('training.startTaining')}
      </button>
    </div>
  );
};

export default AddTraining;
