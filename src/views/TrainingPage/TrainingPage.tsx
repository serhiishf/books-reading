import React, { useState, useEffect } from 'react';
import styles from './TrainingPage.module.scss';
import CreateTraining from '../../components/TrainingPages/CreateTrainingPage';
import ShowTrainingPage from '../../components/TrainingPages/ShowTrainingPage';
import trainingApi from '../../services/training/training-service';
import { ReadingTraining } from '../../services/training/training-service';
/* import Portal from '../../components/Portal';
import Loader from '../../components/Loader';
import publicRoots from '../../utils/publicRoots'; */


export default function TrainingPage() {
  const [trainingUser, setTrainingUser] = useState<ReadingTraining[]>([]);
  const [trainingBooks, setTrainingBooks] = useState([]);
  const [hasActiveTraining, setHasActiveTraining] = useState<string>('pending');

  const getHasActiveTraining = async () => {
    const data = await trainingApi.getActiveTraining() as ReadingTraining[];
    setTrainingUser(data);
    if (data.length) {
      setHasActiveTraining('true');
    } else {
      setHasActiveTraining('false');
    }
  };

  function hundleSucces() {
    getHasActiveTraining();
  }

  useEffect(() => {
    getHasActiveTraining();
  }, []);

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.containerWrap}>
        {/* {hasActiveTraining === 'pendind' && (
          <Portal wrapperId={publicRoots.Loader}>
            <div className={styles.loaderWrapper}>
              <Loader />
            </div>
          </Portal>
        )} */}
        {hasActiveTraining === 'true' && <ShowTrainingPage
          trainingId={trainingUser[0]._id}
        />}
        {hasActiveTraining === 'false' && <CreateTraining
          handleSuccess={hundleSucces}
        />}
      </div>
    </div>
  );
}
