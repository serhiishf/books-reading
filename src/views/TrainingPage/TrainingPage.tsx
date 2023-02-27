import React from 'react';
import styles from './TrainingPage.module.scss';
import CreateTraining from '../../components/TrainingPages/CreateTrainingPage';
import TrainingDiagram from '../../components/TrainingDiagram';

export default function TrainingPage() {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.containerWrap}>
        <CreateTraining />

        <div className={styles.bottomPosition}>
          <TrainingDiagram />
          {/* statistic component */}
        </div>
      </div>
    </div>
  );
}
