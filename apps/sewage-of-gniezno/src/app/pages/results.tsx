import { useEffect, useState } from 'react';
import styled from 'styled-components';
import fetchLocation from '../actions/fetch_location';
import Map from './components/map';

const Layout = styled.div`
  height: 100%;
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
    </Layout>
  );
};

export default ResultsPage;
