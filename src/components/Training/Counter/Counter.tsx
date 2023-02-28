import React from 'react';
import styles from './Counter.module.scss';
import { useTranslation } from 'react-i18next';
import CountItem from './CountItem';
import CountItemSmall from './CountItemSmall';

interface CounterProps {
  books: number;
  days: number;
  booksLeft?: number;
}

export default function BookCounter({ books, days, booksLeft }: CounterProps) {
  const UseCountItem = booksLeft ? CountItemSmall : CountItem;

  const { t } = useTranslation();

  return (
    <div className={styles.bookCounter}>
      <div className={styles.subheaderWrap}>
        <div className={styles.subheader}>
          <div className={styles.subheaderText}>{t('training.myGoals')}</div>
        </div>
      </div>

      <div className={styles.counters}>
        <UseCountItem count={books} title={t('training.numberOfBooks')} />
        <UseCountItem count={days} title={t('training.numberOfDays')} />
        {booksLeft && (
          <UseCountItem
            count={booksLeft}
            title={t('training.leftBooks')}
            highlight={true}
          />
        )}
      </div>
    </div>
  );
}
