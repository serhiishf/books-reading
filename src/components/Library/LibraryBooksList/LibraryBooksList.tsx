import React from 'react';
import { useTranslation } from 'react-i18next';

import BookListEl from './BookListEl';
import { BooksI } from '../library.interfaces';
import styles from './LibraryBooksList.module.scss';

const LibraryBooksList = ({ books }: BooksI) => {
  const activeBooks = books?.filter((book) => book.status === 'active');
  const doneBooks = books?.filter((book) => book.status === 'done');
  const pendingBooks = books?.filter((book) => book.status === 'pending');
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      {activeBooks?.length ? (
        <div className={styles.sectionWrapper}>
          <h3 className={styles.sectionTitle}>{t('library.active')}</h3>
          <div className={styles.wrapTitls}>
            <span>{t('library.title')}</span>
            <div>
              <span>{t('library.author')}</span>
              <span>{t('library.yearShort')}</span>
              <span>{t('library.pageShort')}</span>
            </div>
          </div>
          <BookListEl books={activeBooks} />
        </div>
      ) : null}

      {doneBooks?.length ? (
        <div className={styles.sectionWrapper}>
          <h3 className={styles.sectionTitle}>{t('library.done')}</h3>
          <div className={styles.titlesWrapper}>
            <span>{t('library.title')}</span>
            <div>
              <span>{t('library.author')}</span>
              <span>{t('library.yearShort')}</span>
              <span>{t('library.pageShort')}</span>
              <span>{t('library.rating')}</span>
            </div>
          </div>
          <BookListEl books={doneBooks} />
        </div>
      ) : null}
      
      {pendingBooks ? (
        <div>
          <h3 className={styles.sectionTitle}>{t('library.pending')}</h3>
          <div className={styles.wrapTitls}>
            <span>{t('library.title')}</span>
            <div>
              <span>{t('library.author')}</span>
              <span>{t('library.yearShort')}</span>
              <span>{t('library.pageShort')}</span>
            </div>
          </div>
          <BookListEl books={pendingBooks} />
        </div>
      ) : null}
    </div>
  );
};

export default LibraryBooksList;
