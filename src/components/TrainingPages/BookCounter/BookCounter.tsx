import React from 'react';
import styles from './BookCounter.module.scss';
import Subheader from '../Subheader';
import { useTranslation } from 'react-i18next';
import CountItem from './CountItem';
import CountItemSmall from './CountItemSmall';

interface BookCounterProps {
  books: number;
  days: number;
  leftReading?: number;
}

export default function BookCounter({ books, days, leftReading }: BookCounterProps) {
  const UseCountItem = leftReading ? CountItemSmall : CountItem;
  const { t } = useTranslation();
  return (
    <div className={styles.bookCounter}>
      <Subheader title={t('myGoals')} />
      <div className={styles.counters}>
        <UseCountItem
          count={books}
          title={t('numberOfBooks')}
          smaller={true}
        />
        <UseCountItem
          count={days}
          title={t('numberOfDays')}
        />
        <UseCountItem
          count={days}
          title={t('numberOfDays')}
          highlight={true}
        />
      </div>
    </div>
  );
}