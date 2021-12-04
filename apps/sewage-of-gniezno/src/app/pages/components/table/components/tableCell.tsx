import React, { ReactNode } from 'react';
import styled from 'styled-components';

type Align = 'left' | 'center' | 'right' | 'justify' | 'char' | undefined;

const Cell = styled.td<{ align: Align; error: boolean }>`
  padding: 0 20px;
  color: ${({ theme, error }) =>
    error ? theme.colors.errorPrimary : theme.colors.gray900};
  font: ${({ theme }) => theme.fonts.tableRow};
  text-align: ${({ align }) => align};
`;

type Props = {
  align?: Align;
  className?: string;
  error?: string;
  children: ReactNode;
};

export const TableCell = ({ align, error, className, children }: Props) => {
  const cell = (
    <Cell align={align} className={className} error={!!error}>
      {children}
    </Cell>
  );
  return cell;
};

export default TableCell;
