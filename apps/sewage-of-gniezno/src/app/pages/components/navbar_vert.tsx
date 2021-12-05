import styled from 'styled-components';
import { LocalShipping, Publish, Home, ExitToApp } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router';

const SpaceBetween = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  background-color: #6377c6;
`;

const FlexV = styled.nav`
  width: 100px;
  height: 100%;
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

const LogoutIcon = styled(ExitToApp)`
  && {
    font-size: 24px;
    transform: rotate(180deg);
  }
`;

const LowerText = styled.p``;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <SpaceBetween>
      <FlexV>
        <Button
          onClick={() => navigate('/results')}
          selected={location.pathname === '/results'}
        >
          <HomeIcon />
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
      <Button
        onClick={() => navigate('/')}
        selected={location.pathname === '/'}
      >
        <LogoutIcon />
        <LowerText>Wyloguj</LowerText>
      </Button>
    </SpaceBetween>
  );
};

export default Navbar;
