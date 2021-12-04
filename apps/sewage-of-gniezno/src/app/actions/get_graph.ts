import axios from 'axios';

const fetchGraph = async (id: string, graphName: string) => {
  const response = await axios.get(
    `http://localhost:8000/containers/graphs/${id}/${graphName}`
  );

  return response.data;
};

export default fetchGraph;
