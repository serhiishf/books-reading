import React, { useState, useEffect } from 'react';
import styles from './ShowTrainingPage.module.scss';
import { useTranslation } from 'react-i18next';
import BookCounter from '../BookCounter';
import Table from '../Table';
import { Book } from '../../../services/books/books-service';
import TrainingDiagram from '../../TrainingDiagram';
import trainingApi from '../../../services/training/training-service';
import Countdown from '../../Countdown';

type Statistics = {
  date: string;
  pages: number;
  _id: string;
};

interface ReadingTraining {
  _id?: string;
  start: string;
  finish: string;
  totalPages?: number;
  readPages?: number;
  books: Book[];
  owner?: {
    _id: string;
    name: string;
    email: string;
  };
  statistics?: Statistics[];
  createdAt?: string;
  updatedAt?: string;
}

interface ShowTraining {
  trainingId: string;
}

function ShowTrainingPage({ trainingId }: ShowTraining) {
  const { t } = useTranslation();
  // const [trainingData, setTrainingData] = useState<ReadingTraining[] | []>([]);
  // const [trainingBooks, setTrainingBooks] = useState([]);
  // const [startDate, setStartDate] = useState<string>('');
  // const [finishDate, setFinishDate] = useState<string>('');

  // const getTrainingData = async () => {
  //   const data = await trainingApi.getActiveTraining();
  //   if (data) {
  //     setTrainingData(data);
  //   }
  // };

  // useEffect(() => {
  //   getTrainingData();
  // }, []);

  const readingBooks: Book[] = [];
  const leftDays = 9;
  const leftReadingBooks = 2;
  const totalPages = 300;

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContent}>
        <div className={styles.wrapCountdown}>
          <Countdown
            title={t('training.yearCountdown')}
          /* finishDate={'2023-02-28T15:45:48.361Z'} */
          />
          <Countdown
            title={t('training.goalCountdown')}
            finishDate={'2023-03-14T15:45:48.361Z'}
          />
        </div>
        <Table canDelete={false} canMarkedDone={true} books={readingBooks} />
        <div className={styles.wrapChartDiagram}>
          <TrainingDiagram
            isRealTraining={true}
            daysAmount={leftDays}
            totalPages={totalPages}
          />
        </div>
      </div>
      <div className={styles.sidebar}>
        <BookCounter
          books={readingBooks.length}
          days={leftDays}
          leftReading={leftReadingBooks}
        />

        <div className={styles.wrapStatistics}>
          {/* TODO: insert statistics here */}
        </div>
      </div>
    </div>
  );
}

export default ShowTrainingPage;
