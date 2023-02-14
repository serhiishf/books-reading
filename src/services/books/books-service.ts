import axiosInstance from '../axiosConfig';

type BookT = {
  name: string;
  author: string;
  year?: number;
  pages: number;
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

const getAllBooks = async () => {
  const result = await axiosInstance.get('/books');
  return result;
};

const getBookById = async (bookId: string) => {
  const result = await axiosInstance.get(`/books/book/?bookId=${bookId}`);
  return result;
};

const getBooksByStatus = async (status: string) => {
  const result = await axiosInstance.get(`/books/status/?status=${status}`);
  return result;
};

const createBook = async (body: BookT) => {
  const result = await axiosInstance.post('/books/create', body);
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
