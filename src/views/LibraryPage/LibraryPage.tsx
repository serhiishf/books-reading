import React, { useState, useEffect } from 'react';
import LibraryForm from '../../components/Library/LibraryForm';
import styles from './LibraryPage.module.scss';
import LibraryHint from '../../components/Library/LibraryHint';
import booksApi, { Book } from '../../services/books/books-service';
import LibraryBooksList from '../../components/Library/LibraryBooksList';

const LibraryPage = () => {
  const [booksUser, setBooksUser] = useState<Book[]>();

  const getUsersBooks = async () => {
    const data = await booksApi.getAllBooks();
    const usersBook = data;
    setBooksUser(usersBook);
  };

  useEffect(() => {
    getUsersBooks();
  }, [booksUser]);

  return (
    <div className={styles.wrapper}>
      <LibraryForm />
      {booksUser?.length ? (
        <LibraryBooksList books={booksUser} />
      ) : (
        <LibraryHint />
      )}
    </div>
  );
};

export default LibraryPage;
