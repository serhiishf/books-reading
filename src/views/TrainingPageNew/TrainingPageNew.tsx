import React, { useState, useEffect } from 'react';
import trainingApi from '../../services/training/training-service';
import Loader from '../../components/Loader';

enum Status {
  'PENDING' = 'pending',
  'FULL' = 'full',
  'EMPTY' = 'empty',
}

const TrainingPageNew = () => {
  const [training, setTraining] = useState(
    async () => await trainingApi.getActiveTraining(),
  );
  const [status, setStatus] = useState(Status.PENDING);

  const getStatus = async () => {
    const data = await trainingApi.getActiveTraining();
    console.log(data);
    if (data.length) {
      setStatus(Status.FULL);
      setTraining(data);
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
      {status === Status.FULL && <div>Training Full</div>}
      {status === Status.EMPTY && <div>TrainingEmpty</div>}
    </div>
  );
};

export default TrainingPageNew;
