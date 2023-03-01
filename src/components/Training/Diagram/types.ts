import { Book } from '../../../services/books/books-service';
import { ReadingTraining } from '../../../services/training/training-service';

export type IData = {
  id: string;
  data: (
    | {
        x: string | Date;
        y: number | null;
      }
    | {
        x: string | Date;
        y: number | null;
      }
  )[];
};

export interface Props {
  activeTraining?: ReadingTraining;
  books?: Book[];
  isRealTraining?: boolean;
  daysAmount?: number;
  totalPages?: number;
  isCreatingTraining?: boolean;
}
