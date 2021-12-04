import axios from 'axios';

const fetchGraph = (id: string, graph_name: string ) => {
  return axios.get(`http://localhost:8000/containers/graphs/${id}/${graph_name}`);
};

export default fetchGraph;
