import React, { useState, FC } from 'react';
import styles from './Results.module.scss';
import ResultsForm from '../ResultsForm';
import ResultsTable from '../ResultsTable';
import { toast } from 'react-toastify';

interface ResultsProps {
  startTrainingDate: string;
  totalPages: number;
  isDataSaved: boolean;
  onSaveData: () => void;
}

export interface Result {
  date: string;
  time: string;
  pages: number;
}

const Results: FC<ResultsProps> = ({
  startTrainingDate,
  totalPages,
  isDataSaved,
  onSaveData,
}) => {
  const [results, setResults] = useState<Result[]>([]);

  const removeResult = (index: number) => {
    const newResults = [...results];
    newResults.splice(index, 1);
    setResults(newResults);
    toast.error('Результат успішно видалено!');
  };

  const handleFormSubmit = (values: { date: string; pages: number }): void => {
    const now = new Date();
    const result: Result = {
      date: values.date,
      time: now.toLocaleTimeString(),
      pages: values.pages,
    };
    setResults([...results, result]);
    toast.success('Результат успішно додано!');
  };

  return (
    <div>
      <ResultsForm
        onSubmitForm={handleFormSubmit}
        startTrainingDate={startTrainingDate}
        totalPages={totalPages}
      />
      <ResultsTable results={results} onRemove={removeResult} />
    </div>
  );
};

export default Results;
