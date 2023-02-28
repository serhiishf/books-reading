import React, { useState, useEffect, FC } from 'react';
import booksApi, { Book } from '../../../services/books/books-service';
import { useTranslation } from 'react-i18next';
// import styles from './TrainingEmpty.module.scss';
import AddTraining from '../AddTraining';
import AddedBooksList from '../AddedBookList';
import { ReadingTraining } from '../../../services/training/training-service';

type Props = {
  changeTrainingStatus: (training: ReadingTraining) => void;
};

const TrainingEmpty: FC<Props> = ({ changeTrainingStatus }) => {
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
  };

  const onCreateTraining = () => {
    booksActive.map(async (book) => {
      await booksApi.updateBookStatus({ bookId: book._id, status: 'active' });
    });
    // const newTraining = trainingApi.createTraining();
    // if (newTraining) {
    //   changeTrainingStatus(newTraining)
    // }
  };

  return (
    <div>
      <AddTraining
        books={pendingBooks}
        activeBooks={booksActive}
        onAddActive={onAddToList}
        handleCreateTraining={onCreateTraining}
      />
    </div>
  );
};

export default TrainingEmpty;
