import React, { ReactNode } from 'react';
import styled from 'styled-components';

type Align = 'left' | 'center' | 'right' | 'justify' | 'char' | undefined;

const StyledHeaderCell = styled.th<{ align: Align }>`
  padding: 0 20px;
  color: #f8f9fa;
  text-align: ${({ align }) => align};
  font-size: 18px;
  line-height: 40px;
`;

type Props = {
  align?: Align;
  children: ReactNode;
};

export const TableHeaderCell = ({ align, children }: Props) => (
  <StyledHeaderCell align={align || 'left'}>{children}</StyledHeaderCell>
);

export default TableHeaderCell;
