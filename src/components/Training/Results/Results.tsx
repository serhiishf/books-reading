import React, { useState, FC, useEffect } from 'react';
import styles from './Results.module.scss';
import ResultsForm from '../ResultsForm';
import ResultsTable from '../ResultsTable';
import { toast } from 'react-toastify';
import trainingApi, {
  Statistics,
} from '../../../services/training/training-service';

interface ResultsProps {
  startTrainingDate: string;
  totalPages: number;
  trainingId: string;
  statistics: Statistics[];
}

export interface Result {
  date: string;
  time: string;
  pages: number;
}

const Results: FC<ResultsProps> = ({
  startTrainingDate,
  totalPages,
  trainingId,
  statistics,
}) => {
  const [results, setResults] = useState<Result[]>([]);
  const [leftPages, setLeftPages] = useState<number>(totalPages);

  const removeResult = (index: number) => {
    const newResults = [...results];
    newResults.splice(index, 1);
    setResults(newResults);
    toast.error('Результат успішно видалено!');
  };

  useEffect(() => {
    const updatedStatistics = transformStatistics(statistics);
    setResults(updatedStatistics);
  }, []);

  const transformStatistics = (arr: Statistics[]) => {
    return arr.map((el) => {
      const dateObj = new Date(el.date);
      const date = dateObj.toISOString().slice(0, 10);
      const time = dateObj.toLocaleTimeString([], { hour12: false });
      return {
        date,
        time,
        pages: el.pages,
      };
    });
  };

  const getTotalReadPages = statistics.reduce((totalPages: number, stat) => {
    return totalPages + stat.pages;
  }, 0);

  console.log(getTotalReadPages);

  const handleFormSubmit = async (
    values: { date: string; pages: number },
    dateToSend: string,
  ) => {
    const newPages = totalPages - values.pages;
    setLeftPages(newPages);
    console.log(newPages);
    const freshAddedResult = await trainingApi.addResults({
      date: dateToSend,
      pages: values.pages,
      trainingId: trainingId,
    });
    const newResult = transformStatistics(freshAddedResult);
    setResults([...newResult]);
    toast.success('Результат успішно додано!');
  };

  return (
    <div className={styles.resultsWrapper}>
      <h3 className={styles.title}>results</h3>
      <ResultsForm
        onSubmitForm={handleFormSubmit}
        startTrainingDate={startTrainingDate}
        leftPages={leftPages}
      />
      <ResultsTable results={results} onRemove={removeResult} />
    </div>
  );
};

export default Results;
