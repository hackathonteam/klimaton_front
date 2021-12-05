import styled from 'styled-components';
import Navbar from './components/navbar_vert';

const Layout = styled.div`
  display: flex;
  height: 100%;
`;

const TrucksPage = () => {
  return (
    <Layout>
      <Navbar />
    </Layout>
  );
};

export default TrucksPage;
