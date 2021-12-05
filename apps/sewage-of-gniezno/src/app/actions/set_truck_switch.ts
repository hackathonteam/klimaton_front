import axios from 'axios';

const setTruckSwitch = async (id: string, value: string) => {
  const response = await axios.put(
    `http://localhost:8000/truck/switch`, {id: id, value: value},{
    headers: {
        'content-type': 'text/json'
      }
    }
  );

  return response.data;
};

export default setTruckSwitch;

