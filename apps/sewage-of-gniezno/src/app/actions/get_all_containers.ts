import axios from 'axios';

const fetchContainers = () => {

  return axios.get(`http://localhost:8000/containers/default`);
};

export default fetchContainers;

// percentage between 0 and 1, and all records with value below that will be taken
export const fetchContainersByPercentage = (percentage: number) => {
  return axios.get(`http://localhost:8000/containers/${percentage}`)
};