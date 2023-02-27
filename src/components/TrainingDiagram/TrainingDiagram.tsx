import React from 'react';
import { ResponsiveBump } from '@nivo/bump';

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
  isRealTraining = false,
  daysAmount = 6,
  totalPages = 300,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.thumb}>
      <div className={classNames(!isRealTraining && styles.mask)}></div>
      <h3 className={styles.title}>
        {t('training.diagramTitle') + ' '}

        <span>{Math.round(totalPages / daysAmount)}</span>
      </h3>

      <ResponsiveBump
        data={data}
        xPadding={0.65}
        xOuterPadding={0}
        yOuterPadding={1}
        colors={{ scheme: 'nivo' }}
        lineWidth={3}
        inactiveLineWidth={2}
        inactiveOpacity={0.5}
        startLabelTextColor="#e71313"
        endLabelPadding={24}
        endLabelTextColor="#949494"
        pointSize={3}
        activePointSize={4}
        inactivePointSize={0}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={9}
        activePointBorderWidth={9}
        pointBorderColor={{ from: 'serie.color', modifiers: [] }}
        enableGridY={false}
        axisTop={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 0,
          tickPadding: 20,
          tickRotation: -6,
          legend: '',
          legendPosition: 'middle',
          legendOffset: -8,
        }}
        margin={{ top: 0, right: 100, bottom: 0, left: 60 }}
        axisRight={null}
      />
    </div>
  );
};

export default TrainingDiagram;
