import axiosInstance from '../axiosConfig';
/* import { AxiosError } from 'axios';
import { toast } from 'react-toastify'; */


interface BookId {
  book: string
}

export interface CreateTrainingInterface {
  start: string,
  finish: string,
  books: BookId[],
}


const getActiveTraining = async () => {
  try {
    const responce = await axiosInstance.get('/trainings/active-trainings');
    const result = responce.data.data.trainings;
    console.log(result);
    return result;
  } catch (error) {
    console.log(`Error fetching active training: ${error}`);
  }
};

const createTraining = async (body: CreateTrainingInterface) => {
  try {
    const { data } = await axiosInstance.post('/trainings', body);
    return data;
  } catch (error) {
    console.log(`Error creating training: ${error}`);
  }
};



const trainingApi = {
  getActiveTraining,
  createTraining,
};

export default trainingApi;