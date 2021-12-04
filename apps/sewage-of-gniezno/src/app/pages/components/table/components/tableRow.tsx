import { Tooltip } from '@mui/material';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

type StyledRowProps = {
  error: boolean;
  warning: boolean;
};

const StyledRow = styled.tr<StyledRowProps>`
  &:nth-child(2n) {
    background-color: ${({ theme, error, warning }) => {
      if (error) return theme.colors.errorSecondary;
      if (warning) return theme.colors.warningSecondary;
      return theme.colors.gray200;
    }};
    &:hover {
      background-color: ${({ theme, error, warning }) => {
        if (error) return theme.colors.errorPrimary;
        if (warning) return theme.colors.warningPrimary;
        return theme.colors.gray300;
      }};
    }
  }
  &:nth-child(2n + 1) {
    background-color: ${({ theme, error, warning }) => {
      if (error) return theme.colors.errorLight;
      if (warning) return theme.colors.warningLight;
      return theme.colors.gray100;
    }};
    &:hover {
      background-color: ${({ theme, error, warning }) => {
        if (error) return theme.colors.errorPrimary;
        if (warning) return theme.colors.warningPrimary;
        return theme.colors.gray300;
      }};
    }
  }
`;

const Text = styled.div`
  padding: 4px;
  text-align: center;
  font-size: ${({ theme }) => theme.fonts.default.fontSize};
  font-weight: ${({ theme }) => theme.fonts.default.fontWeight};
  line-height: ${({ theme }) => theme.fonts.default.lineHeight};
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
  return error || warning ? (
    <Tooltip
      title={<Text>{(error || warning) as string}</Text>}
      arrow
      placement="top"
    >
      {row}
    </Tooltip>
  ) : (
    row
  );
};

export default TableRow;
