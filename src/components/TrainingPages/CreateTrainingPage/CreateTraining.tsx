import React/* , { useState, useEffect }  */ from 'react';
import styles from './CreateTraining.module.scss';
/* import { useTranslation } from 'react-i18next'; */
import TrainingCreateForm from '../TrainingCreateForm';
import BookCounter from '../BookCounter';

function CreateTraining() {
  /*   const { t } = useTranslation(); */


  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContent}>
        <TrainingCreateForm />
      </div>
      <div className={styles.sidebar}>
        <BookCounter
          books={2}
          days={14}
          leftReading={3}
        />
      </div>
    </div>
  );
}

export default CreateTraining;
