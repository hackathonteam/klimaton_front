import axios from 'axios';

const fetchTruckSwitch = async (id: string) => {
  const response = await axios.get(
    `http://localhost:8000/truck/switch/${id}`
  );

  return response.data;
};

export default fetchTruckSwitch;
