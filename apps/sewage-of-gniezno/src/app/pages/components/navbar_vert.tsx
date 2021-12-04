import styled from 'styled-components';
import { LocalShipping, Publish, Home } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router';

const FlexV = styled.nav`
  width: 100px;
  height: 100%;
  background-color: #6377c6;
`;

const Button = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  padding: 8px;
  padding-top: 16px;
  margin: 16px;
  margin-right: 0;
  cursor: pointer;
  box-sizing: border-box;
  border-radius: 8px 0px 0px 8px;
  text-align: center;
  ${({ selected }) =>
    selected
      ? `background-color: #fff`
      : `&:hover {
        background-color: #fff;
    opacity: 0.5;
  }`}
`;

const LocalShippingIcon = styled(LocalShipping)`
  && {
    font-size: 24px;
  }
`;

const HomeIcon = styled(Home)`
  && {
    font-size: 24px;
  }
`;

const ImportIcon = styled(Publish)`
  && {
    font-size: 24px;
    transform: rotate(180deg);
  }
`;

const LowerText = styled.p``;

const NavBarV = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <FlexV>
      <Button
        onClick={() => navigate('/results')}
        selected={location.pathname === '/results'}
      >
        <Home />
        <LowerText>Strona Główna</LowerText>
      </Button>
      <Button
        onClick={() => navigate('/trucks')}
        selected={location.pathname === '/trucks'}
      >
        <LocalShippingIcon />
        <LowerText>Firmy</LowerText>
      </Button>

      <Button
        onClick={() => navigate('/upload')}
        selected={location.pathname === '/upload'}
      >
        <ImportIcon />
        <LowerText>Import</LowerText>
      </Button>
    </FlexV>
  );
};

export default NavBarV;
