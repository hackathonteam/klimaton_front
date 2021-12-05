import axios from 'axios';

const fetchSwitch = async (id: string) => {
  const response = await axios.get(
    `http://localhost:8000/switch/${id}`
  );

  return response.data;
};

export default fetchSwitch;
