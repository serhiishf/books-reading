export interface BookLibI {
  name: string;
  author: string;
  year?: string;
  pages: string;
  status: string;
  resume: string;
  raiting: string;
  id: string;
}

export type DoneT = Pick<BookLibI, 'raiting' | 'resume'>;

export interface BooksI {
  books: Array<BookLibI>;
}

export interface BookProps {
  book: BookLibI;
}