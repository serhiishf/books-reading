import React, { useState, useEffect } from 'react';
import LibraryForm from '../../components/Library/LibraryForm';
import styles from './LibraryPage.module.scss';
import LibraryHint from '../../components/Library/LibraryHint';
import booksApi from '../../services/books/books-service';
import LibraryBooksList from '../../components/Library/LibraryBooksList';

type HasBooks = boolean | undefined;

const LibraryPage = () => {
  // const [booksUser, setBooksUser] = useState<Book[]>([]);
  const [hasBooks, setHasBooks] = useState<HasBooks>(true);

  const getHasBooks = async () => {
    const data = await booksApi.getAllBooks();
    if (data.length) {
      setHasBooks(true);
    } else {
      setHasBooks(false);
    }
  };

  useEffect(() => {
    getHasBooks();
  }, []);

  return (
    <div className={styles.wrapper}>
      <LibraryForm />
      {hasBooks ? <LibraryBooksList /> : <LibraryHint />}
    </div>
  );
};

export default LibraryPage;
