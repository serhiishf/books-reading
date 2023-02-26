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

  const getHasBooks = async () => {
    const data = await booksApi.getAllBooks();
    setBooksUser(data);
    if (data.length) {
      setHasBooks(true);
    } else {
      setHasBooks(false);
    }
  };

  useEffect(() => {
    getHasBooks();
  }, []);

  const handleAddBook = (newBook: Book) => {
    setBooksUser([...booksUser, newBook]);
  };

  const handleDeleteBook = (deletedBook: Book) => {
    const updatedBooks = booksUser.filter(
      (book) => book._id !== deletedBook._id,
    );
    setBooksUser(updatedBooks);
  };

  const handleUpdateBook = (updatedBook: Book) => {
    const updatedBooks = booksUser.map((book) =>
      book._id === updatedBook._id ? updatedBook : book,
    );
    setBooksUser(updatedBooks);
  };

  return (
    <div className={styles.wrapper}>
      <LibraryForm onAdd={handleAddBook} />
      {hasBooks ? (
        <LibraryBooksList
          books={booksUser}
          handleUpdate={handleUpdateBook}
          handleDelete={handleDeleteBook}
        />
      ) : (
        <LibraryHint />
      )}
    </div>
  );
};

export default LibraryPage;
