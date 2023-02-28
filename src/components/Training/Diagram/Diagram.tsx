import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { defaultData } from './defaultData';
import { Props } from './types';
import styles from './TrainingDiagram.module.scss';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

/*                "start": "2023-02-13T17:15:24.002Z",
                "finish": "2023-02-17T12:30:30.002Z",
                "totalPages": 24,
                "readPages": 20,
                "books": [....],
                "statistics": [
                    {
                        "date": "2023-02-13T22:13:24.216Z",
                        "pages": 10,
                    },
                    {
                        "date": "2023-02-14T22:13:24.216Z",
                        "pages": 10,
                    },
                ],*/

const TrainingDiagram: React.FC<Props> = ({
  data = defaultData,
  addedBooks,
  isRealTraining = false,
  daysAmount = 6,
  totalPages = 200,
}) => {
  const { t } = useTranslation();

  const mathTotalPages = () => {
    if (addedBooks && addedBooks.length > 0) {
      const pagesSum = addedBooks.reduce((acc, cur) => cur.pages + acc, 0);
      return pagesSum;
    }
    return 0;
  };

  const mathPagesPerDay = () => {
    const totalPages = mathTotalPages();
    // console.log(totalPages);
    if (daysAmount > 0) {
      return Math.round(totalPages / daysAmount);
    }
    return 0;
  };

  return (
    <div className={styles.thumb}>
      <div className={classNames(!isRealTraining && styles.mask)}></div>
      <h3 className={styles.title}>
        {t('training.diagramTitle') + ' '}

        <span>{mathPagesPerDay()}</span>
      </h3>

      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 50, bottom: 30, left: 45 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'point',
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
        axisLeft={{
          tickSize: 2,
          tickPadding: 20,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
        }}
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

export default TrainingDiagram;
