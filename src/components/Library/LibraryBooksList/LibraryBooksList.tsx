import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import BookListEl from './BookListEl';
import styles from './LibraryBooksList.module.scss';
import booksApi, { Book } from '../../../services/books/books-service';
import ActiveBookList from './ActiveBookList';

enum BookStatus {
  'PENDING' = 'pending',
  'DONE' = 'done',
  'ACTIVE' = 'active',
}

export type DropBook = {
  id: string;
  items: Book[];
};

const LibraryBooksList = () => {
  const [booksUser, setBooksUser] = useState<Book[]>([]);
  const [activeBooks, setActiveBooks] = useState<Book[]>([]);
  const [doneBooks, setDoneBooks] = useState<Book[]>([]);
  const [pendingBooks, setPendingBooks] = useState<Book[]>([]);

  const { t } = useTranslation();

  const getUsersBooks = async () => {
    const data = await booksApi.getAllBooks();
    const done = await booksApi.getBooksByStatus(BookStatus.DONE);
    const pending = await booksApi.getBooksByStatus(BookStatus.PENDING);
    const active = await booksApi.getBooksByStatus(BookStatus.ACTIVE);
    setBooksUser(data);
    setActiveBooks(active.data);
    setDoneBooks(done.data);
    setPendingBooks(pending.data);
  };

  useEffect(() => {
    getUsersBooks();
    // console.log(booksUser);
  }, []);

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
          <ActiveBookList books={activeBooks} />
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
