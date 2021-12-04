import styled from 'styled-components';



const FlexV = styled.div`
  width: 4%;
  min-width: 40px;
`;

const Button = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  width: 90%;

`;

const Icon = styled.div`
`;

const LowerText = styled.p`

`;

const NavBarV = () => {
  return (
    <FlexV>
      <Button>
        <Icon></Icon>
        <LowerText>mały tekst tu</LowerText>
      </Button>

      <Button>
        <Icon></Icon>
        <LowerText>mały tekst tu</LowerText>
      </Button>
    </FlexV>
  )
}

export default NavBarV;
