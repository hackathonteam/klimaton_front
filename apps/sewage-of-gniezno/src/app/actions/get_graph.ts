import axios from 'axios';

type Response1 =
  {
    name: string,
    title: string,
    data: [{
      date: string,
      quotient: number
    },
    ]
  };

type Response2 =
  {
    name: string,
    title: string,
    data: [{
      date: string,
      pobrana: number,
      deklarowana: number
    },
    ]
  };

const fetchQuotientGraph = async (id: string) => {
  const response = await axios.get(
    `http://localhost:8000/containers/graphs/${id}/quotient_timeseries`
  );
  const data: Response1 = response.data;

  return data;
};

export const fetchAmountGraph = async (id: string) => {
  const response = await axios.get(
    `http://localhost:8000/containers/graphs/${id}/amount_timeseries`
  );
  const data: Response2 = response.data;

  return data;
};


export default fetchQuotientGraph;
