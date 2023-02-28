import { Book } from '../../../services/books/books-service';

export type IData = {
  id: string;
  // color: string;
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
  data?: IData[];
  addedBooks?: Book[];
  isRealTraining?: boolean;
  daysAmount?: number;
  totalPages?: number;
}
