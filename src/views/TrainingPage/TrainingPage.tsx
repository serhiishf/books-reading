import React, { useState, useEffect } from 'react';
import styles from './TrainingPage.module.scss';
import CreateTraining from '../../components/TrainingPages/CreateTrainingPage';
import ShowTrainingPage from '../../components/TrainingPages/ShowTrainingPage';
import trainingApi from '../../services/training/training-service';

type HasActiveTraining = boolean | undefined;

export default function TrainingPage() {
  const [trainingUser, setTrainingUser] = useState([]);
  const [trainingBooks, setTrainingBooks] = useState([]);
  const [hasActiveTraining, setHasActiveTraining] =
    useState<HasActiveTraining>(true);

  const getHasActiveTraining = async () => {
    const data = await trainingApi.getActiveTraining();
    setTrainingUser(data);
    if (data.length) {
      setHasActiveTraining(true);
    } else {
      setHasActiveTraining(false);
    }
  };

  useEffect(() => {
    getHasActiveTraining();
  }, []);

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.containerWrap}>
        {hasActiveTraining ? <ShowTrainingPage /> : <CreateTraining />}
      </div>
    </div>
  );
}
