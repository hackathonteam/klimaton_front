import axios from 'axios';

type Response = {
  id: string,
  nr_zbiornika: string,
  st_oddanej_do_pobranej: number,
  longtitude: number,
  latitude: number
};

const getDefaultContainers = async () => {
  const response = await axios.get(
    `http://localhost:8000/containers/default`
  );

  const data: Response[] = response.data;

  return data;
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
