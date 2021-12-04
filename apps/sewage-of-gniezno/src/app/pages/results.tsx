import { useEffect, useState } from 'react';
import styled from 'styled-components';
import fetchLocation from '../actions/fetch_location';
import Map from './components/map';
import ProgressBar from './components/progress_bar';

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

  console.log(locations);

  return (
    <Layout>
      <Map locations={locations} />
      <Flex>
        <ProgressBar value={60} />
      </Flex>
    </Layout>
  );
};

export default ResultsPage;
