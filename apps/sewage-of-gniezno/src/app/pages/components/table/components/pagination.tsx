import React from 'react';
import { TablePagination } from '@mui/material';

type Props = {
  count: number;
  page: number;
  setPage: (value: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (value: number) => void;
};

export const Pagination = ({
  count,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}: Props) => (
  <tr>
    <TablePagination
      count={count}
      onPageChange={(_event, page) => {
        setPage(page);
      }}
      page={page}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[10, 15, 25, 50]}
      onRowsPerPageChange={(event) => {
        const value = Number(event.target.value);
        setPage(0);
        setRowsPerPage(value);
      }}
    />
  </tr>
);

export default Pagination;
