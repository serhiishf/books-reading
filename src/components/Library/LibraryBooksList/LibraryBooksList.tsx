import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import BookListEl from './BookListEl';
import styles from './LibraryBooksList.module.scss';
import { Book } from '../../../services/books/books-service';
import ActiveBookList from './ActiveBookList';

export enum BookStatus {
  'PENDING' = 'pending',
  'DONE' = 'done',
  'ACTIVE' = 'active',
}

export type DropBook = {
  id: string;
  items: Book[];
};

type Props = {
  books: Book[];
  handleUpdate: (updatedBook: Book) => void;
  handleDelete: (deletedBook: Book) => void;
};

const LibraryBooksList: FC<Props> = ({ books, handleUpdate, handleDelete }) => {
  const activeBooks = books?.filter(
    (book) => book.status === BookStatus.ACTIVE,
  );
  const doneBooks = books?.filter((book) => book.status === BookStatus.DONE);
  const pendingBooks = books?.filter(
    (book) => book.status === BookStatus.PENDING,
  );

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
          <BookListEl
            books={doneBooks}
            handleUpdate={handleUpdate}
            onDelete={handleDelete}
          />
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
          <BookListEl
            books={pendingBooks}
            handleUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        </div>
      ) : null}
    </div>
  );
};

export default LibraryBooksList;
