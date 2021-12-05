import axios from 'axios';

type Response = {
  plates: string,
  collectionDate: string,
  address: string[],
  declaredSewage: number,
  realSewage: number,
  difference: number,
  id: string
};

const fetchAllTrucks = async (): Promise<Response[]> => {
  const response = await axios.get(`http://localhost:8000/trucks`);

  const data: Response[] = response.data;

  return data;
};

export default fetchAllTrucks;
