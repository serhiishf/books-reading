import React, { useState, FC } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './AddTrainingBlock.module.scss';
import Calendar from '../../Calendar';
import { Book } from '../../../services/books/books-service';
import BookSelectInput from '../BookSelectInput';
import AddedBooksList from '../AddedBookList';
import { toast } from 'react-toastify';

const checkPermissionCreate = (books: Book[], endDate: string) => {
  if (endDate === '') {
    toast.error('Add Finish Date!');
    return false;
  } else if (!books.length) {
    toast.error('Add book in your training!');
    return false;
  }
  return true;
};

type Props = {
  books: Book[];
  activeBooks: Book[];
  onAddActive: (newBook: Book) => void;
  handleCreateTraining: (
    startDate: string,
    endDate: string,
    books: Book[],
  ) => Promise<void>;
};

const AddTrainingBlock: FC<Props> = ({
  books,
  activeBooks,
  onAddActive,
  handleCreateTraining,
}) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [bookCounterDays, setBookCounterDays] = useState<number>(0);

  const { t } = useTranslation();

  const createTraining = () => {
    if (checkPermissionCreate(activeBooks, endDate)) {
      handleCreateTraining(startDate, endDate, activeBooks);
    }
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
      <button type="button" onClick={createTraining}>
        {t('training.startTaining')}
      </button>
    </div>
  );
};

export default AddTrainingBlock;
