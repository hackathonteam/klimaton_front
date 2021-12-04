import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import fetchLocation from '../actions/fetch_location';
import Map from './components/map';
import ProgressBar from './components/progress_bar';
import getGraph from '../actions/get_graph';

const Layout = styled.div`
  display: flex;
  height: 100%;
`;

const Flex = styled.div`
  width: 50%;
`;

const ResultsPage = () => {
  const [locations, setLocations] = useState<any>(null);

  useEffect(() => {
    (async () => setLocations(await fetchLocation()))();
  }, []);

  const { data } = useQuery('get-graph', () =>
    getGraph(locations ? locations[0].name : 'Roosevelta%20139', 'graph_name')
  );

  return (
    <Layout>
      <Map locations={locations} />
      <Flex>
        <ProgressBar value={60} />
        {data}
      </Flex>
    </Layout>
  );
};

export default ResultsPage;
