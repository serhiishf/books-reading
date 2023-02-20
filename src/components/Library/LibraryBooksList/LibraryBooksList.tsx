import React from 'react';
import LibraryBook from '../LibraryBook';
import { BooksI } from '../library.interfaces';
import styles from './LibraryBooksList.module.scss';
import { useTranslation } from 'react-i18next';

const LibraryBooksList = ({ books }: BooksI) => {
  const activeBooks = books?.filter((book) => book.status === 'active');
  const doneBooks = books?.filter((book) => book.status === 'done');
  const pendingBooks = books?.filter((book) => book.status === 'pending');
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      {doneBooks ? (
        <div>
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
          <ul>
            {doneBooks.map((book, i) => (
              <LibraryBook book={book} key={i} />
            ))}
          </ul>
        </div>
      ) : null}
      {activeBooks ? (
        <div>
          <h3 className={styles.sectionTitle}>{t('library.active')}</h3>
          <div className={styles.wrapTitls}>
            <span>{t('library.title')}</span>
            <div>
              <span>{t('library.author')}</span>
              <span>{t('library.yearShort')}</span>
              <span>{t('library.pageShort')}</span>
            </div>
          </div>
          <ul>
            {activeBooks.map((book, i) => (
              <LibraryBook book={book} key={i} />
            ))}
          </ul>
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
          <ul>
            {pendingBooks.map((book, i) => (
              <LibraryBook book={book} key={i} />
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default LibraryBooksList;
