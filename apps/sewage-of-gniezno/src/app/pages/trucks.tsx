import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import fetchAllTrucks from '../actions/fetch_trucks';
import Navbar from './components/navbar_vert';
import DataTable from './components/table/dataTable';

const Layout = styled.div`
  display: flex;
  height: 100%;
`;

const TrucksPage = () => {
  const { data } = useQuery(
    'trucks',
    () => toast.promise(fetchAllTrucks, {
      pending: 'Pobieranie danych...',
      success: 'Pomyślnie pobrano dane! 🤩',
      error: 'Wystąpił nieoczekiwany błąd',
    })
  );
  console.log(data);
  return (
    <Layout>
      <Navbar />
      <DataTable data={data} search excludeHeaders={['id']} />
    </Layout>
  );
};

export default TrucksPage;
