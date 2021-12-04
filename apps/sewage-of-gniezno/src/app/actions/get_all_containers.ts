import axios from 'axios';

const fetchContainers = () => {
  return axios.get(`http://localhost:8000/containers`);
};

export default fetchContainers;
