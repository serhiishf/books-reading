import React from 'react';
import LibraryBook from '../LibraryBook';
import { BookLib } from '../LibraryBook/LibraryBook';

interface Props {
  books: BookLib[];
}

const LibraryBooksList: React.FC<Props> = ({ books }) => {
  console.log('BOOKS', books);

  return (
    <ul>
      {/* {books
        .filter((book) => book.status === 'done')
        .map((book, i) => (
          // <LibraryBook book={book} key={i} />
        ))} */}
    </ul>
  );
};

export default LibraryBooksList;
