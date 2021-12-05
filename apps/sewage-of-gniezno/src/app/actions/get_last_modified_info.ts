import axios from "axios"

type Response = {
  declaredSewage: string;
  realSewage: string;
  waterConsumption: string;
  sewageReception: string;
  companies: string;
  containers: string;
  meters: string;
  residents: string;
}

const getLastModifiedInfo = async () => {
  const response = await axios.get('http://localhost:8000/last_modified');

  const data: Response = response.data;

  return data;
}

export default getLastModifiedInfo;

