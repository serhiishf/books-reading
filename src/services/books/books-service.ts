import axiosInstance from '../axiosConfig';

export type BookT = {
  name: string;
  author: string;
  year?: string;
  pages: string;
};

type UpdateStatusT = {
  bookId: string;
  status: string;
};

type UpdateResumeT = {
  bookId: string;
  resume?: string;
  raiting?: number;
};

export interface Book {
  _id: string;
  name: string;
  author: string;
  year: number;
  pages: number;
  status: 'pending' | 'active' | 'done';
  owner: {
    _id: string;
    name: string;
    email: string;
  };
  resume: string;
  rating: number | null;
  __v: number;
}

const getAllBooks = async (): Promise<Book[]> => {
  try {
    const data = await axiosInstance.get('/books');
    const result: Book[] = data.data.data.books;
    return result;
  } catch (error) {
    console.error(`Error fetching books: ${error}`);
    return [];
  }
};

const getBookById = async (bookId: string) => {
  const result = await axiosInstance.get(`/books/book/?bookId=${bookId}`);
  return result;
};

const getBooksByStatus = async (status: string) => {
  const result = await axiosInstance.get(`/books/status/?status=${status}`);
  return result;
};

const createBook = async ({ name, author, year, pages }: BookT) => {
  const result = await axiosInstance.post('/books/create', {
    name,
    author,
    year,
    pages,
  });
  return result;
};

const deleteBook = async (bookId: string) => {
  const result = await axiosInstance.post(`/books/delete/?bookId=${bookId}`);
  return result;
};

const updateBookStatus = async (body: UpdateStatusT) => {
  const result = await axiosInstance.patch('/books/update-status', body);
  return result;
};

const updateBookResume = async (body: UpdateResumeT) => {
  const result = await axiosInstance.patch('/books/update-resume', body);
  return result;
};

const booksApi = {
  getAllBooks,
  updateBookResume,
  updateBookStatus,
  deleteBook,
  createBook,
  getBooksByStatus,
  getBookById,
};

export default booksApi;
