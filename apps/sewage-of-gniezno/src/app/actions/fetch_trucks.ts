import axios from 'axios';

const fetchAllTrucks = () => {
  return axios.get(`http://localhost:8000/trucks`);
};


export default fetchAllTrucks;
