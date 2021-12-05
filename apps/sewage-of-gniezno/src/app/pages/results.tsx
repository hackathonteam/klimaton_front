import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import Map from './components/map';
import ProgressBar from './components/progress_bar';
import getGraph, { fetchAmountGraph } from '../actions/get_graph';
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
import fetchQuotientGraph from '../actions/get_graph';
import DataTable from './components/table/dataTable';

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
  | 'Nie weryfikowano'
  | 'Rozpoczęto weryfikację'
  | 'Zweryfikowano pozytywnie'
  | 'Zweryfikowano negatywnie';

const ResultsPage = () => {
  const { state } = useLocation();

  const [selectedLocation, setSelectedLocation] = useState<{
    name: string;
    longtitude: number;
    latitude: number;
  } | null>(null);

  const [caseState, setCaseState] = useState<CaseState>('Nie weryfikowano');

  useEffect(() => {
    if (state?.imported) toast.success('Pomyślnie zaimportowano plik(i)');
  }, [state]);

  const { data: amountData } = useQuery(
    ['get-graph-amount', selectedLocation],
    () => fetchAmountGraph(selectedLocation?.name as string),
    { enabled: !!selectedLocation, refetchOnWindowFocus: false }
  );

  const { data: quotientData } = useQuery(
    ['get-graph-quotient', selectedLocation],
    () =>
      toast.promise(fetchQuotientGraph(selectedLocation?.name as string), {
        pending: `Pobieranie danych dla ${selectedLocation?.name}...`,
        success: 'Znów się udało 💪',
        error: 'Wystąpił błąd 😭',
      }),
    { enabled: !!selectedLocation, refetchOnWindowFocus: false }
  );

  const { data: containers } = useQuery(
    'get-containers',
    () =>
      toast.promise(getDefaultContainers, {
        pending: 'Pobieranie danych...',
        success: 'Pomyślnie pobrano dane! 🤩',
        error: 'Wystąpił nieoczekiwany błąd',
      }),
    { refetchOnWindowFocus: false }
  );

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
              value="Nie weryfikowano"
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
          name={selectedLocation?.name}
          value={quotientData && quotientData.data[0].quotient * 100}
        />
        {amountData && <HBar data={amountData} />}
        {quotientData && <HBar data={quotientData} quotient />}
        {!selectedLocation && (
          <DataTable
            data={containers?.map((props) => ({
              ...props,
              st_oddanej_do_pobranej: (
                props.st_oddanej_do_pobranej * 100
              ).toFixed(2),
            }))}
            search
            excludeHeaders={['longtitude', 'latitude']}
          />
        )}
      </Flex>
    </Layout>
  );
};

export default ResultsPage;
