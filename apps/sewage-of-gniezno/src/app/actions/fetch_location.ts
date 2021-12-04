import axios from 'axios';

const fetchLocation = () => {
  return axios.get('http://localhost:8000/location');
};

export default fetchLocation;
