import React from 'react';
import LibraryBook from '../LibraryBook';
import { Book } from '../../../services/books/books-service';
import { BooksI } from '../library.interfaces';

const BookListEl = ({ books }: BooksI) => {
  return (
    <ul>
      {books?.map((book: Book, i: number) => (
        <LibraryBook book={book} key={book._id} index={i} />
      ))}
    </ul>
  );
};

export default BookListEl;
