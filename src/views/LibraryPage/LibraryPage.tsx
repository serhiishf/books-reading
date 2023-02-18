import React, { useState, useEffect } from 'react';
import LibraryForm from '../../components/Library/LibraryForm';
import styles from './LibraryPage.module.scss';
import LibraryHint from '../../components/Library/LibraryHint';
import booksApi from '../../services/books/books-service';
import LibraryBooksList from '../../components/Library/LibraryBooksList';
import { BookLibI } from '../../components/Library/library.interfaces';

const LibraryPage = () => {
  const [booksUser, setBooksUser] = useState<BookLibI[]>();

  const getUsersBooks = async () => {
    const { data } = await booksApi.getAllBooks();
    const usersBook = data.books;
    setBooksUser(usersBook);
  };

  useEffect(() => {
    getUsersBooks();
  }, []);

  return (
    <div className={styles.wrapper}>
      <LibraryForm />
      {booksUser ? <LibraryBooksList books={booksUser} /> : <LibraryHint />}
    </div>
  );
};

export default LibraryPage;
