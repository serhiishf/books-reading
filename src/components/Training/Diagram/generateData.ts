import { Book } from '../../../services/books/books-service';
import { ReadingTraining } from '../../../services/training/training-service';
import { Datum, IData } from './types';

// interface Datum {
//   x: string;
//   y: number;
// }

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${day}.${month}`;
}

function getTotalDays(startDateStr: string, finishDateStr: string) {
  const start = new Date(startDateStr);
  const finish = new Date(finishDateStr);
  const days = (finish.getTime() - start.getTime()) / (24 * 60 * 60 * 1000);

  return days;
}

export function getAveragePagesPerDay(
  startStr: string,
  finishStr: string,
  totalPages: number,
) {
  const days = getTotalDays(startStr, finishStr);
  const average = Math.round(totalPages / days);

  return average;
}

function generatePlan(training: ReadingTraining): Datum[] {
  const planData: Datum[] = [];
  const days = getTotalDays(training.start, training.finish);
  let average = Math.round(training.totalPages / days);

  for (let i = 0; i < days; i++) {
    const date = new Date(
      new Date(training.start).getTime() + i * 24 * 60 * 60 * 1000,
    );
    const formattedDate = formatDate(date.toISOString());

    // Check if total pages is divisible by days
    if (i === days - 1) {
      const remainingPages = training.totalPages - average * (days - 1);
      average += remainingPages;
    }

    // Add some randomness to the average
    const randomOffset = Math.floor(Math.random() * 5) - 2;
    const yValue = Math.max(0, average + randomOffset);

    planData.push({ x: formattedDate, y: yValue });
  }

  return planData;
}

function generateFact(training: ReadingTraining): Datum[] {
  const { start, finish, statistics, totalPages } = training;

  if (statistics.length === 0) {
    const average = getAveragePagesPerDay(start, finish, totalPages);
    const factData: Datum[] = [{ x: formatDate(start), y: average + 5 }];
    return factData;
  } else {
    const factData: Datum[] = [];
    statistics.forEach(({ date, pages }) => {
      factData.push({ x: formatDate(date), y: pages });
    });
    return factData;
  }
}

export function generateData(training: ReadingTraining): IData[] {
  return [
    { id: 'Fact', data: generateFact(training) },
    { id: 'Plan', data: generatePlan(training) },
  ];
}

export function generateDataOnCreateTraining(
  books: Book[],
  startDate: string,
  finishDate: string,
): IData[] {
  const totalPages = books.reduce((acc, cur) => cur.pages + acc, 0);
  const average = getAveragePagesPerDay(startDate, finishDate, totalPages);

  const plan = () => {
    const planData: Datum[] = [];
    const days = getTotalDays(startDate, finishDate);
    let average = Math.round(totalPages / days);

    for (let i = 0; i < days; i++) {
      const date = new Date(
        new Date(startDate).getTime() + i * 24 * 60 * 60 * 1000,
      );
      const formattedDate = formatDate(date.toISOString());

      // Check if total pages is divisible by days
      if (i === days - 1) {
        const remainingPages = totalPages - average * (days - 1);
        average += remainingPages;
      }

      // Add some randomness to the average
      const randomOffset = Math.floor(Math.random() * 5) - 2;
      const yValue = Math.max(0, average + randomOffset);

      planData.push({ x: formattedDate, y: yValue });
    }

    return planData;
  };

  const fact = () => {
    const factData: Datum[] = [{ x: formatDate(startDate), y: average + 5 }];
    return factData;
  };

  return [
    { id: 'Fact', data: fact() },
    { id: 'Plan', data: plan() },
  ];
}
