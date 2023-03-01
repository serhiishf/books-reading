import { Book } from '../../../services/books/books-service';
import { ReadingTraining } from '../../../services/training/training-service';
import { Datum, IData } from './types';

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
function getEndOfDay(dateString: string) {
  const date = new Date(dateString);
  const remainingMilliseconds =
    24 * 60 * 60 * 1000 - (date.getTime() - date.setHours(0, 0, 0, 0));
  const newDate = new Date(date.getTime() + remainingMilliseconds);
  return newDate;
}

function getStartOfDay(dateStr: string) {
  const date = new Date(dateStr);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function generateFactTest(training: ReadingTraining): Datum[] {
  const { start, finish, statistics, totalPages } = training;
  const factData: Datum[] = [];

  //if statistic is empty
  if (statistics.length === 0) {
    const average = getAveragePagesPerDay(start, finish, totalPages);
    factData.push({ x: formatDate(start), y: average + 5 });
    return factData;
  }

  // Sort statistics by date
  statistics.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  let prevDate = new Date(statistics[0].date);
  let startOfDay = getStartOfDay(prevDate.toISOString());
  let endOfDay = getEndOfDay(prevDate.toISOString());
  let sumPages = 0;

  for (let i = 0; i < statistics.length; i++) {
    const statDate = new Date(statistics[i].date);
    console.log('stat', statDate);
    console.log('start', startOfDay);
    console.log('end', endOfDay);
    //If current date is within the current day
    if (statDate >= startOfDay && statDate <= endOfDay) {
      console.log('object');
      sumPages += statistics[i].pages;
      const formattedDate = formatDate(startOfDay.toISOString());
      factData.push({ x: formattedDate, y: sumPages });

      //if next date is next day
      if (new Date(statistics[i + 1].date) > endOfDay) {
        startOfDay = getStartOfDay(prevDate.toISOString());
        endOfDay = getEndOfDay(prevDate.toISOString());
        sumPages = 0;
        prevDate = new Date(statistics[i + 1].date);
      }
    }
  }

  // Add last point if it's not already added
  if (
    factData.length > 0 &&
    factData[factData.length - 1].x !== formatDate(prevDate.toISOString())
  ) {
    factData.push({ x: formatDate(prevDate.toISOString()), y: sumPages });
  }

  return factData;
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
