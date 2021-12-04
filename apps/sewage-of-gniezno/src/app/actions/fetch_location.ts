import axios from 'axios';

const fetchLocation = async () => {
  const response = await axios.get('http://localhost:8000/location');

  return response.data;
};

export default fetchLocation;
