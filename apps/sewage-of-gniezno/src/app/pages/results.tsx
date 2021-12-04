import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import fetchLocation from '../actions/fetch_location';
import Map from './components/map';
import ProgressBar from './components/progress_bar';
import getGraph from '../actions/get_graph';
import HBar from './components/hbar';

const Layout = styled.div`
  display: flex;
  height: 100%;
`;

const Flex = styled.div`
  width: 50%;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 36px;
`;

const ResultsPage = () => {
  const [locations, setLocations] = useState<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  useEffect(() => {
    (async () => setLocations(await fetchLocation()))();
  }, []);

  const { data } = useQuery(['get-graph', locations], () =>
    getGraph(
      locations.length ? locations[0].name : 'Roosevelta%20139',
      'graph_name'
    )
  );

  console.log(data);

  return (
    <Layout>
      <Map locations={locations} setSelectedLocation={setSelectedLocation} />
      <Flex>
        <Title>{selectedLocation ? `ul. ${selectedLocation.name}, Gniezno` : 'ul. Roosevelta 131a, Gniezno'}</Title>
        <ProgressBar value={60} />
        {data && <HBar data={data} />}
      </Flex>
    </Layout>
  );
};

export default ResultsPage;
