import axios from 'axios';

const fetchAllTrucks = async () => {
  const response = await axios.get(`http://localhost:8000/trucks`);

  return response.data;
};

export default fetchAllTrucks;
