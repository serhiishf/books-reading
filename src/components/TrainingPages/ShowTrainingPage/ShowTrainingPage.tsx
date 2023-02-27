import React /* , { useState, useEffect } */ from 'react';
import styles from './ShowTrainingPage.module.scss';
import BookCounter from '../BookCounter';
import Table from '../Table';
import { Book } from '../../../services/books/books-service';
import TrainingDiagram from '../../TrainingDiagram';

function ShowTrainingPage() {
  const readingBooks: Book[] = [];
  const leftDays = 9;
  const leftReadingBooks = 2;
  const totalPages = 300;

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContent}>
        <div className={styles.wrapCountdown}></div>
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
