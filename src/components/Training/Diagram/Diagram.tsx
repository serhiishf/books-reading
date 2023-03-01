import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { defaultData } from './defaultData';
import { Props } from './types';
import styles from './Diagram.module.scss';
import { useTranslation } from 'react-i18next';
import generateData, { getAveragePagesPerDay } from './generateData';

const Diagram: React.FC<Props> = ({ activeTraining, books }) => {
  const { t } = useTranslation();

  const getAverage = () => {
    if (activeTraining) {
      const { start, finish, totalPages } = activeTraining;
      const { average } = getAveragePagesPerDay(start, finish, totalPages);
      return average;
    } else if (books && books.length) {
      const totalPages = books.reduce((acc, cur) => cur.pages + acc, 0);
    }
    return 0;
  };

  return (
    <div className={styles.thumb}>
      <h3 className={styles.title}>
        {t('training.diagramTitle') + ' '}

        <span>{getAverage()}</span>
      </h3>

      <ResponsiveLine
        data={activeTraining ? generateData(activeTraining) : defaultData}
        margin={{ top: 50, right: 50, bottom: 30, left: 45 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
        }}
        curve="cardinal"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',

          legendPosition: 'middle',
        }}
        axisLeft={null}
        enableGridY={false}
        colors={{ scheme: 'category10' }}
        lineWidth={3}
        pointSize={7}
        pointColor={{ from: 'color', modifiers: [] }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor', modifiers: [] }}
        pointLabelYOffset={-12}
        areaBlendMode="lighten"
        areaBaselineValue={40}
        areaOpacity={0.25}
        enableCrosshair={false}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 50,
            translateY: -20,
            itemWidth: 40,
            itemHeight: 30,
            itemsSpacing: 0,
            symbolSize: 9,
            symbolShape: 'circle',
            itemDirection: 'left-to-right',
            itemTextColor: '#777',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        motionConfig="default"
      />
    </div>
  );
};

export default Diagram;
