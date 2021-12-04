import axios from 'axios';

const fetchGraph = (id: string, graphName: string) => {
  return axios.get(
    `http://localhost:8000/containers/graphs/${id}/${graphName}`
  );
};

export default fetchGraph;
