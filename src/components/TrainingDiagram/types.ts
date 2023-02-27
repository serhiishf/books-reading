export type IData = {
  id: string;
  data: {
    x: number | string;
    y: number;
  }[];
};

export interface Props {
  data?: IData[];
  isRealTraining?: boolean;
  daysAmount?: number;
  totalPages?: number;
}
