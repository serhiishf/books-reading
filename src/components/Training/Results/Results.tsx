import React, { useState, FC } from 'react';
import styles from './Results.module.scss';
import ResultsForm from '../ResultsForm';
import ResultsTable from '../ResultsTable';
import { toast } from 'react-toastify';
import trainingApi from '../../../services/training/training-service';

interface ResultsProps {
  startTrainingDate: string;
  totalPages: number;
  trainingId: string;
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
}) => {
  const [results, setResults] = useState<Result[]>([]);
  const [leftPages, setLeftPages] = useState<number>(totalPages);

  const removeResult = (index: number) => {
    const newResults = [...results];
    newResults.splice(index, 1);
    setResults(newResults);
    toast.error('Результат успішно видалено!');
  };

  const handleFormSubmit = async (
    values: { date: string; pages: number },
    dateToSend: string,
  ) => {
    const now = new Date();
    const result: Result = {
      date: values.date,
      time: now.toLocaleTimeString(),
      pages: values.pages,
    };
    const newPages = totalPages - values.pages;
    setLeftPages(newPages);
    setResults([...results, result]);
    console.log(result);
    const freshAddedResult = await trainingApi.addResults({
      date: dateToSend,
      pages: values.pages,
      trainingId: trainingId,
    });
    console.log(freshAddedResult);
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
