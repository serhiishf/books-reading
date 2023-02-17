import React from 'react';
import { ReactComponent as Book } from '../../../assets/img/book.svg';
import DoneEl from './DoneEl';

export type BookLib = {
  name: string;
  author: string;
  year?: string;
  pages: string;
  status: string;
  resume: string;
  raiting: string;
  id: string;
};

export default function LibraryBook(book: BookLib) {
  return (
    <li>
      <Book />
      <div>{book.name}</div>
      <div>{book.author}</div>
      <div>{book.year}</div>
      <div>{book.pages}</div>
      {book.status === 'done' ? (
        <DoneEl raiting={book.raiting} resume={book.resume} />
      ) : null}
    </li>
  );
}
