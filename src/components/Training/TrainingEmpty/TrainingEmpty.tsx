import React, { useState, useEffect } from 'react';
import booksApi, { Book } from '../../../services/books/books-service';
import { useTranslation } from 'react-i18next';
// import styles from './TrainingEmpty.module.scss';
import AddTraining from '../AddTraining';
import AddedBooksList from '../AddedBookList';

const TrainingEmpty = () => {
  const [pendingBooks, setPendingBooks] = useState<Book[]>([]);
  const [booksActive, setActiveBooks] = useState<Book[]>([]);

  const { t } = useTranslation();

  const getPendingBooks = async () => {
    const { data } = await booksApi.getBooksByStatus('pending');
    setPendingBooks(data);
  };

  useEffect(() => {
    getPendingBooks();
  }, []);

  const onAddBooks = (newBook: Book) => {
    setActiveBooks([...booksActive, newBook]);
  };

  return (
    <div>
      <AddTraining
        books={pendingBooks}
        activeBooks={booksActive}
        onAddActive={onAddBooks}
      />
    </div>
  );
};

export default TrainingEmpty;
