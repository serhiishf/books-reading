import React from 'react';
import styles from './Table.module.scss';
import { BookT, Book } from '../../../services/books/books-service';
import { useTranslation } from 'react-i18next';

interface TableProps {
  canDelete: boolean,
  canMarkedDone: boolean,
  books: Book[];
}

function Table({ canDelete, canMarkedDone, books }: TableProps) {
  const { t } = useTranslation();
  /*   const handleDelete = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    props.setRows(newRows);
  }; */

  return (
    <table className={styles.mainWrap}>
      <thead className={styles.tHead}>
        <tr>
          <th className={styles.textItem}>{t('training.bookTitle')}</th>
          <th className={styles.textItem}>{t('training.author')}</th>
          <th className={styles.numberItem}>{t('training.year')}</th>
          <th className={styles.numberItem}>{t('training.pages')}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.name}>
            <td>{book.name}</td>
            <td>{book.author}</td>
            <td className={styles.numberItem}>{book.year}</td>
            <td className={styles.numberItem}>{book.pages}</td>
            <td></td>
            {canDelete && <td><button>Delete</button></td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;