import React, { useState, useEffect, FC } from 'react';
import booksApi, { Book } from '../../../services/books/books-service';
import { useTranslation } from 'react-i18next';
// import styles from './TrainingEmpty.module.scss';
import AddTrainingBlock from '../AddTrainingBlock';
import trainingApi, {
  ReadingTraining,
} from '../../../services/training/training-service';
import Diagram from '../Diagram';

type Props = {
  changeTraining: (training: ReadingTraining) => void;
};

const TrainingEmpty: FC<Props> = ({ changeTraining }) => {
  const [pendingBooks, setPendingBooks] = useState<Book[]>([]);
  const [booksActive, setActiveBooks] = useState<Book[]>([]);

  const { t } = useTranslation();

  const getPendingBooks = async () => {
    const { data } = await booksApi.getBooksByStatus('pending');
    setPendingBooks(data);
  };

  useEffect(() => {
    getPendingBooks();
  }, []);

  const onAddToList = (newBook: Book) => {
    setActiveBooks([...booksActive, newBook]);

    const updatedBooks = pendingBooks.filter(
      (book) => book._id !== newBook._id,
    );
    setPendingBooks(updatedBooks);
  };

  const onCreateTraining = async (
    startDate: string,
    endDate: string,
    books: Book[],
  ) => {
    const newTraining = await trainingApi.createTraining({
      start: startDate.replace('T', ' '),
      finish: endDate.replace('T', ' '),
      books: books.map((book) => {
        return { book: book._id };
      }),
    });
    if (newTraining) {
      Promise.all(
        books.map(async (book) => {
          await booksApi.updateBookStatus({
            bookId: book._id,
            status: 'active',
          });
        }),
      ).then(async () => {
        const newTrainingActual = await trainingApi.getActiveTraining();
        if (newTrainingActual && newTrainingActual.length > 0) {
          changeTraining(newTrainingActual[0]);
        }
      });
    }
  };

  return (
    <div>
      <AddTrainingBlock
        books={pendingBooks}
        activeBooks={booksActive}
        onAddActive={onAddToList}
        handleCreateTraining={onCreateTraining}
      />
      <Diagram books={booksActive} />
    </div>
  );
};

export default TrainingEmpty;
