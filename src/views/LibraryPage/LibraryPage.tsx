import React, { useState, useEffect } from 'react';
import LibraryForm from '../../components/Library/LibraryForm';
import styles from './LibraryPage.module.scss';
import LibraryHint from '../../components/Library/LibraryHint';
import booksApi, { Book } from '../../services/books/books-service';
import LibraryBooksList from '../../components/Library/LibraryBooksList';

type HasBooks = boolean | undefined;

const LibraryPage = () => {
  const [booksUser, setBooksUser] = useState<Book[]>([]);
  const [hasBooks, setHasBooks] = useState<HasBooks>(true);

  const getUsersBooks = async () => {
    const data = await booksApi.getAllBooks();
    // const savedTodos = localStorage.getItem('books');
    if (data.length) {
      setHasBooks(true);
    } else {
      setHasBooks(false);
    }
    // return savedTodos ? JSON.parse(savedTodos) : [];
    setBooksUser(data);
  };

  useEffect(() => {
    getUsersBooks();
  }, []);

  return (
    <div className={styles.wrapper}>
      <LibraryForm />
      {hasBooks ? <LibraryBooksList books={booksUser} /> : <LibraryHint />}
    </div>
  );
};

export default LibraryPage;
