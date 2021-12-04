import React from 'react';
import styled from 'styled-components';
import { Input } from '@mui/material';

const StyledInput = styled(Input)`
  caret-color: ${({ theme }) => theme.colors.gray100};
  input {
    color: ${({ theme }) => theme.colors.gray100};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
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
