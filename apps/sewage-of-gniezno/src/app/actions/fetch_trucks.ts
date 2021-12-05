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

const fetchAllTrucks = async () => {
  return (await axios.get(`http://localhost:8000/trucks`) as Response);
};


export default fetchAllTrucks;
