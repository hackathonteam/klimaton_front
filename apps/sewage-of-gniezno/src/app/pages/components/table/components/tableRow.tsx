import React, { ReactNode } from 'react';
import styled from 'styled-components';

type StyledRowProps = {
  error: boolean;
  warning: boolean;
};

const StyledRow = styled.tr<StyledRowProps>`
  &:nth-child(2n) {
    background-color: ${({ warning }) => (warning ? '#ffc107' : '#e9ecef')};
    &:hover {
      background-color: ${({ warning }) => (warning ? '#fd7e14' : '#dee2e6')};
    }
  }
  &:nth-child(2n + 1) {
    background-color: ${({ warning }) => (warning ? '#fde02f' : '#f8f9fa')};
    &:hover {
      background-color: ${({ warning }) => (warning ? '#fd7e14' : '#dee2e6')};
    }
  }
`;

const Text = styled.div`
  padding: 4px;
  text-align: center;
`;

type Props = {
  children: ReactNode;
  error?: string | null;
  warning?: string | null;
};

export const TableRow = ({ children, error, warning }: Props) => {
  const row = (
    <StyledRow error={!!error} warning={!!warning}>
      {children}
    </StyledRow>
  );
  return row;
};

export default TableRow;
