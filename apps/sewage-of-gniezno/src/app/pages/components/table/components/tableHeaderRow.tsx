import React, { ReactNode } from 'react';
import styled from 'styled-components';
import SearchInput from './searchInput';

const StyledRow = styled.tr`
  background-color: #495057;
`;

type Props = {
  children: ReactNode;
  search?: {
    value: string;
    setValue: (value: string) => void;
  };
  width?: number;
};

export const TableHeaderRow = ({ children, search, width }: Props) => (
  <thead>
    {search ? (
      <StyledRow>
        <th colSpan={width}>
          <SearchInput value={search.value} setValue={search.setValue} />
        </th>
      </StyledRow>
    ) : null}
    <StyledRow>{children}</StyledRow>
  </thead>
);

export default TableHeaderRow;
