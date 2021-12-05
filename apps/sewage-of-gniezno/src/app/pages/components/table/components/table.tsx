import React, { ReactNode } from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
  width: 100%;
  height: fit-content;
  border-collapse: collapse;
  overflow: hidden;
`;

type Props = {
  children: ReactNode;
};

export const Table = ({ children }: Props) => {
  return (
    <StyledTable cellSpacing={0} cellPadding={0}>
      {children}
    </StyledTable>
  );
};

export default Table;
