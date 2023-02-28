import React, { useState, useEffect } from 'react';
import trainingApi, {
  ReadingTraining,
} from '../../services/training/training-service';
import Loader from '../../components/Loader';
import TrainingFull from '../../components/Training/TrainingFull';
import TrainingEmpty from '../../components/Training/TrainingEmpty';
import BookStatus from '../../utils/bookStatus';

enum Status {
  'PENDING' = 'pending',
  'FULL' = 'full',
  'EMPTY' = 'empty',
}

const TrainingPageNew = () => {
  const [training, setTraining] = useState<ReadingTraining | null>(null);
  const [status, setStatus] = useState(Status.PENDING);

  const getStatus = async () => {
    const data = await trainingApi.getActiveTraining();
    if (data?.length) {
      setStatus(Status.FULL);
      setTraining(data[0]);
    } else {
      setStatus(Status.EMPTY);
    }
  };

  const setBookStatus = (onjBookId: string, status: BookStatus) => {
    if (training) {
      const updatedBooks = training.books.map((book) => {
        if (book._id === onjBookId) {
          return {
            _id: book._id,
            book: {
              ...book.book,
              status,
            },
          };
        }
        return book;
      });

      const updatedTraining = {
        ...training,
        books: updatedBooks,
      };

      setTraining(updatedTraining as ReadingTraining);
    }
  };

  useEffect(() => {
    getStatus();
  }, []);

  return (
    <>
      {status === Status.PENDING && <Loader />}
      {status === Status.FULL && training && (
        <TrainingFull
          training={training}
          setTraining={setTraining}
          setBookStatus={setBookStatus}
        />
      )}
      {status === Status.EMPTY && training === null && <TrainingEmpty />}
    </>
  );
};

export default TrainingPageNew;
