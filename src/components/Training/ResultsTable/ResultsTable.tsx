import React, { FC } from 'react';
import { Result } from '../Results/Results';

interface Props {
  results: Result[];
  onRemove: (id: number) => void;
}

const ResultsTable: FC<Props> = ({ results, onRemove }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Дата додавання</th>
          <th>Час додавання</th>
          <th>Кількість сторінок</th>
        </tr>
      </thead>
      <tbody>
        {results.map((result, index) => (
          <tr key={index}>
            <td>{result.date}</td>
            <td>{result.time}</td>
            <td>{result.pages}</td>
            <td>
              <button onClick={() => onRemove(index)}>Видалити</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultsTable;
