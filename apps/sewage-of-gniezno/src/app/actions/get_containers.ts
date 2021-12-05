import axios from 'axios';


const getDefaultContainers = async () => {
  const response = await axios.get(
    `http://localhost:8000/containers/default`
  );

  return response.data;
};

export const getAllContainers = async () => {
  const response = await axios.get(
    `http://localhost:8000/containers`
  );

  return response.data;
};

export const getLowerThanContainers = async (percent: number) => {
  const response = await axios.get(
    `http://localhost:8000/containers/${percent}`
  );

  return response.data;
};

export default getDefaultContainers;
