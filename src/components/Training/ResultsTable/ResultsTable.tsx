import React, { FC } from 'react';
import { Result } from '../Results/Results';
import styles from './ResultsTable.module.scss';

interface Props {
  results: Result[];
  onRemove: (id: number) => void;
}

const ResultsTable: FC<Props> = ({ results, onRemove }) => {
  return (
    <table className={styles.table}>
      <caption className={styles.title}>STATISTICS</caption>
      <tbody>
        {results.map((result, index) => (
          <tr key={index}>
            <td>{result.date}</td>
            <td>{result.time}</td>
            <td>{result.pages}</td>
            {/* <td>
              <button onClick={() => onRemove(index)}>Видалити</button>
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultsTable;
