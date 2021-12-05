import styled from 'styled-components';
import { Input } from '@mui/material';

const StyledInput = styled(Input)`
  caret-color: #f8f9fa;
  input {
    color: #f8f9fa;
    border-bottom: 1px solid #f8f9fa;
    font-size: 18px;
    line-height: 40px;c
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: end;
  padding: 8px 16px;
`;

type Props = {
  value: string;
  setValue: (value: string) => void;
};

const SearchInput = ({ value, setValue }: Props) => (
  <Box>
    <StyledInput
      value={value}
      placeholder="Search..."
      onChange={(e) => setValue(e.target.value)}
      autoFocus
    />
  </Box>
);

export default SearchInput;
