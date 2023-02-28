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

  // on add new training change status/set newTraining and render TrainingFull Component
  const changeTrainingStatus = (training: ReadingTraining) => {
    setTraining(training);
    setStatus(Status.FULL);
  };

  const setBookStatus = (onjBookId: string, status: BookStatus) => {
    //it's work but I think we don't need it
    // if (training) {
    //   const book = training.books.find((book) => book._id === onjBookId);
    //   if (book) {
    //     book.book.status = status;
    //   }
    //   console.log(training);
    // }
  };

  useEffect(() => {
    getStatus();
  }, []);

  return (
    <>
      {status === Status.PENDING && <Loader />}
      {status === Status.FULL && training && (
        <TrainingFull training={training} setBookStatus={setBookStatus} />
      )}
      {status === Status.EMPTY && (
        <TrainingEmpty changeTrainingStatus={changeTrainingStatus} />
      )}
    </>
  );
};

export default TrainingPageNew;
