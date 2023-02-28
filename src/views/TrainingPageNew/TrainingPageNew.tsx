import React, { useState, useEffect } from 'react';
import trainingApi, {
  ReadingTraining,
} from '../../services/training/training-service';
import Loader from '../../components/Loader';
import TrainingFull from '../../components/Training/TrainingFull';
import TrainingEmpty from '../../components/Training/TrainingEmpty';

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
    // console.log(data);
    if (data?.length) {
      setStatus(Status.FULL);
      setTraining(data[0]);
    } else {
      setStatus(Status.EMPTY);
    }
  };

  useEffect(() => {
    getStatus();
  }, []);

  return (
    <div>
      {status === Status.PENDING && <Loader />}
      {status === Status.FULL && <TrainingFull training={training} />}
      {status === Status.EMPTY && <TrainingEmpty />}
    </div>
  );
};

export default TrainingPageNew;
