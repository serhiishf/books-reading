import { Book } from '../../services/books/books-service';

export type DoneT = Pick<Book, 'rating' | 'resume'>;

export interface BooksI {
  books: Array<Book> | undefined;
}

export interface BookProps {
  book: Book;
}
