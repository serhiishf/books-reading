import React, { useState, useEffect } from 'react';
import LibraryForm from '../../components/Library/LibraryForm';
import styles from './LibraryPage.module.scss';
import LibraryHint from '../../components/Library/LibraryHint';
import booksApi from '../../services/books/books-service';

export default function LibraryPage() {
  const [booksUser, setBooksUser] = useState([]);
  // const [qty, setQty] = useState();

  const getUsersBooks = async () => {
    const { data } = await booksApi.getAllBooks();

    console.log(data);
    setBooksUser(data.books);
    // setQty(data.booksQuantity);
  };

  useEffect(() => {
    getUsersBooks();
  }, []);

  return (
    <div className={styles.wrapper}>
      <LibraryForm />
      {booksUser ? <div>BOOKS</div> : <LibraryHint />}
    </div>
  );
}
