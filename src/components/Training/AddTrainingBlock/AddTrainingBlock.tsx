import React, { useState, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Book } from '../../../services/books/books-service';
import Calendar from '../../Calendar';
import BookSelectInput from '../BookSelectInput';
import BookListEmpty from '../BookListEmpty';
import styles from './AddTrainingBlock.module.scss';

// import { string } from 'yup/lib/locale';

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
  setStartDateEmptyC: React.Dispatch<React.SetStateAction<string>>;
  setFinishDateEmptyC: React.Dispatch<React.SetStateAction<string>>;
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
  setStartDateEmptyC,
  setFinishDateEmptyC
}) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [bookCounterDays, setBookCounterDays] = useState<number>(0);

  const updateStartDay = (date: string) => {
    setStartDateEmptyC(date);
    setStartDate(date);
  };

  const updateFinishDate = (date: string) => {
    setFinishDateEmptyC(date);
    setEndDate(date);
  };

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
          updateDate={updateStartDay}
        /* setDate={setStartDate} */
        />
        <Calendar
          placeHolder={t('training.finish')}
          onlyAfter={true}
          updateDate={updateFinishDate}
        /* setDate={setEndDate} */
        />
      </div>
      <BookSelectInput books={books} onAddActive={onAddActive} />
      <BookListEmpty activeBooks={activeBooks} />
      <button type="button" onClick={createTraining}>
        {t('training.startTaining')}
      </button>
    </div>
  );
};

export default AddTrainingBlock;
