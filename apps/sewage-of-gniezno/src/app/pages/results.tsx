import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import Map from './components/map';
import ProgressBar from './components/progress_bar';
import getGraph from '../actions/get_graph';
import HBar from './components/hbar';
import Navbar from './components/navbar_vert';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import RadioControl from './components/radio_control';
import getDefaultContainers, {
  getAllContainers,
  getLowerThanContainers,
} from '../actions/get_containers';
import { Close } from '@mui/icons-material';

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

const StyledRadioGroup = styled.div`
  && {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
`;

const CloseButton = styled(Close)`
  && {
    position: absolute;
    right: 16px;
    top: 8px;
    font-size: 32px;
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
  }
`;

export type CaseState =
  | 'Wszystko w porządku'
  | 'Wymaga uwagi'
  | 'Rozpoczęto weryfikację'
  | 'Zweryfikowano pozytywnie'
  | 'Zweryfikowano negatywnie';

const ResultsPage = () => {
  const { state } = useLocation();

  const [locations, setLocations] = useState<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<{
    name: string;
    longtitude: number;
    latitude: number;
  } | null>(null);

  const [caseState, setCaseState] = useState<CaseState>('Wszystko w porządku');

  useEffect(() => {
    if (state?.imported) toast.success('Pomyślnie zaimportowano plik(i)');
  }, [state]);

  const { data } = useQuery(['get-graph', locations], () =>
    getGraph(
      locations?.length ? locations[0].name : 'Roosevelta%20139',
      'graph_name'
    )
  );

  const { data: containers } = useQuery('get-containers', () =>
    toast.promise(getDefaultContainers, {
      pending: 'Pobieranie danych...',
      success: 'Pomyślnie pobrano dane! 🤩',
      error: 'Wystąpił nieoczekiwany błąd',
    })
  );

  console.log({
    selectedLocation,
    containers,
    result:
      selectedLocation &&
      containers &&
      containers.filter(({ id }: any) => id === selectedLocation.name)[0]
        .st_oddanej_do_pobranej,
  });

  return (
    <Layout>
      <Navbar />
      <Map
        containers={containers?.filter(
          ({ longtitude, latitude }: any) => longtitude && latitude
        )}
        setSelectedLocation={setSelectedLocation}
      />
      <Flex>
        {selectedLocation && (
          <CloseButton onClick={() => setSelectedLocation(null)} />
        )}
        <Title>
          {selectedLocation
            ? `ul. ${selectedLocation.name}, Gniezno`
            : 'Gniezno'}
        </Title>
        {selectedLocation && (
          <StyledRadioGroup>
            <RadioControl
              setCaseState={setCaseState}
              caseState={caseState}
              value="Wszystko w porządku"
              color="primary"
            />
            <RadioControl
              setCaseState={setCaseState}
              caseState={caseState}
              value="Wymaga uwagi"
              color="warning"
            />
            <RadioControl
              setCaseState={setCaseState}
              caseState={caseState}
              value="Rozpoczęto weryfikację"
              color="secondary"
            />
            <RadioControl
              setCaseState={setCaseState}
              caseState={caseState}
              value="Zweryfikowano pozytywnie"
              color="success"
            />
            <RadioControl
              setCaseState={setCaseState}
              caseState={caseState}
              value="Zweryfikowano negatywnie"
              color="error"
            />
          </StyledRadioGroup>
        )}
        <ProgressBar
          selected={!!selectedLocation}
          name={
            containers && selectedLocation
              ? containers.filter(
                  ({ id }: any) => id === selectedLocation.name
                )[0].id
              : 'Miejsce'
          }
          value={
            containers && selectedLocation
              ? containers.filter(
                  ({ id }: any) => id === selectedLocation.name
                )[0].st_oddanej_do_pobranej * 100
              : 59
          }
        />
        {data && <HBar data={data} />}
      </Flex>
    </Layout>
  );
};

export default ResultsPage;
