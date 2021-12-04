import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import fetchLocation from '../actions/fetch_location';
import Map from './components/map';
import ProgressBar from './components/progress_bar';
import getGraph from '../actions/get_graph';
import HBar from './components/hbar';
import Navbar from './components/navbar_vert';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

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
  const { state } = useLocation();

  const [locations, setLocations] = useState<any>(null);
  const [selectedLocation, setSelectedLocation] =
    useState<{ name: string; longtitute: number; latitude: number } | null>(null);

  useEffect(() => {
    if (state?.imported) toast.success('Pomyślnie zaimportowano plik(i)');
  }, [state]);

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
    <>
      <Layout>
        <Navbar />
        <Map locations={locations} setSelectedLocation={setSelectedLocation} />
        <Flex>
          <Title>
            {selectedLocation
              ? `ul. ${selectedLocation.name}, Gniezno`
              : 'ul. Roosevelta 131a, Gniezno'}
          </Title>
          <ProgressBar value={60} />
          {data && <HBar data={data} />}
        </Flex>
      </Layout>
      <ToastContainer />
    </>
  );
};

export default ResultsPage;
