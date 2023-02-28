import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './BookListHeader.module.scss';

const BookListHeader = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.thumb}>
      <p className={styles.name}>{t('training.bookTitle')}</p>
      <p className={styles.author}>{t('training.author')}</p>
      <p className={styles.year}>{t('training.year')}</p>
      <p className={styles.pages}>{t('training.pages')}</p>
    </div>
  );
};

export default BookListHeader;
