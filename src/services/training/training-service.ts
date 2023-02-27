import axiosInstance from '../axiosConfig';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';



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

const trainingApi = {
  getActiveTraining,
};

export default trainingApi;