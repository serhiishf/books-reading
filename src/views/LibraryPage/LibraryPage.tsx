import React, { useState, useEffect } from 'react';
import LibraryForm from '../../components/Library/LibraryForm';
import styles from './LibraryPage.module.scss';
import LibraryHint from '../../components/Library/LibraryHint';
import booksApi from '../../services/books/books-service';
import LibraryBooksList from '../../components/Library/LibraryBooksList';
import BookLib from '../../components/Library/LibraryBook';

export default function LibraryPage() {
  const [booksUser, setBooksUser] = useState([]);
  // const [qty, setQty] = useState();

  const getUsersBooks = async () => {
    const { data } = await booksApi.getAllBooks();

    setBooksUser(data.books);
    // setQty(data.booksQuantity);
  };

  // booksApi.updateBookStatus({
  //   bookId: '63ef9d25eae0776357715bf5',
  //   status: 'active',
  // });

  useEffect(() => {
    getUsersBooks();
  }, []);

  return (
    <div className={styles.wrapper}>
      <LibraryForm />
      {booksUser ? <LibraryBooksList books={booksUser} /> : <LibraryHint />}
    </div>
  );
}
