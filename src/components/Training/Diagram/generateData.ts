import { ReadingTraining } from '../../../services/training/training-service';

interface Datum {
  x: string;
  y: number;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${day}.${month}`;
}

export function getAveragePagesPerDay(
  startStr: string,
  finishStr: string,
  totalPages: number,
) {
  const start = new Date(startStr);
  const finish = new Date(finishStr);
  const days = (finish.getTime() - start.getTime()) / (24 * 60 * 60 * 1000) + 1;
  const average = Math.round(totalPages / days);

  return { average };
}

function generatePlan(training: ReadingTraining): Datum[] {
  const start = new Date(training.start);
  const finish = new Date(training.finish);
  const days = (finish.getTime() - start.getTime()) / (24 * 60 * 60 * 1000) + 1;
  let average = Math.round(training.totalPages / days);
  const planData: Datum[] = [];

  for (let i = 0; i < days; i++) {
    const date = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
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

function generateFact(training: ReadingTraining, planData: Datum[]): Datum[] {
  if (training.statistics.length === 0) {
    const average = Math.round(training.totalPages / (planData.length + 1)) + 5; // додаємо 5 до середнього значення, якщо немає статистики
    const factData: Datum[] = [{ x: formatDate(training.start), y: average }];
    return factData;
  } else {
    const factData: Datum[] = [];
    training.statistics.forEach((statistic) => {
      factData.push({ x: formatDate(statistic.date), y: statistic.pages });
    });
    return factData;
  }
}

export default function generateData(training: ReadingTraining) {
  const plan = generatePlan(training);
  const fact = generateFact(training, plan);

  return [
    { id: 'Fact', data: fact },
    { id: 'Plan', data: plan },
  ];
}
