import React, { useState, useEffect } from 'react';
import styles from './CreateTraining.module.scss';
/* import { useTranslation } from 'react-i18next'; */
import TrainingCreateForm from '../TrainingCreateForm';
import BookCounter from '../BookCounter';
import moment from 'moment';

function CreateTraining() {
  /*   const { t } = useTranslation(); */
  const [selectedBook, setSelectedBook] = useState(0);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [bookCounterDays, setBookCounterDays] = useState<number>(0);

  useEffect(() => {
    if (startDate && endDate) {
      const days = moment(endDate).diff(moment(startDate), 'days');
      setBookCounterDays(days);
    }
  }, [startDate, endDate]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContent}>
        <TrainingCreateForm
          setSelectedBook={setSelectedBook}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </div>
      <div className={styles.sidebar}>
        <BookCounter
          books={selectedBook}
          days={bookCounterDays}
        />
      </div>
    </div>
  );
}

export default CreateTraining;
