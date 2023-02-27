import React from 'react';
import styles from './Table.module.scss';
import classNames from 'classnames';
import { Book } from '../../../services/books/books-service';
import { useTranslation } from 'react-i18next';
import { ReactComponent as BookIcon } from './assets/book.svg';
import { ReactComponent as DeleteIcon } from './assets/delete.svg';

interface TableProps {
  canDelete?: boolean,
  canMarkedDone?: boolean,
  books: Book[];
  deleteItemFunc?: (id: string) => void;
}

function Table({ canDelete, books, deleteItemFunc }: TableProps) {
  const { t } = useTranslation();
  const handleDeleteBtn = (id: string) => {
    console.log('delete btn');
    if (deleteItemFunc) {
      deleteItemFunc(id);
    }
  };

  return (
    <table className={styles.table}>
      <thead className={styles.tHead}>
        <tr>
          <th className={styles.textItem}>{t('training.bookTitle')}</th>
          <th className={styles.textItem}>{t('training.author')}</th>
          <th className={styles.numberItem}>{t('training.year')}</th>
          <th className={styles.numberItem}>{t('training.pages')}</th>
          <th className={classNames(canDelete && styles.deleteColumn)}></th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr className={styles.booksItem} key={book.name}>
            <td className={styles.booksItem__textItem}>
              <div className={styles.booksItem__bookTitleContent}>
                <div className={styles.booksItem__svgWrap}>
                  <BookIcon />
                </div>
                {book.name}
              </div>
            </td>
            <td className={styles.booksItem__textItem}>{book.author}</td>
            <td className={styles.booksItem__numberItem}>{book.year}</td>
            <td className={styles.booksItem__numberItem}>{book.pages}</td>
            {canDelete && <td>
              <div className={styles.booksItem__deleteColumn}>
                <button
                  className={styles.booksItem__deleteBtn}
                  onClick={() => handleDeleteBtn(book._id)}>
                  <div className={styles.booksItem__deleteBtnSvgWrap}>
                    <DeleteIcon />
                  </div>
                </button>
              </div>
            </td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;