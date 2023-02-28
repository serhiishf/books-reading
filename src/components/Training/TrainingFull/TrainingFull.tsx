import React from 'react';
import { ReadingTraining } from '../../../services/training/training-service';

interface Props {
  training: ReadingTraining | null;
}

const TrainingFull: React.FC<Props> = ({ training }) => {
  console.log(training);

  return <div>training</div>;
};
export default TrainingFull;
