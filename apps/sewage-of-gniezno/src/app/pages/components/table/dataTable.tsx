import React, { ReactNode, useState } from 'react';
import {
  Table,
  TableCell,
  TableHeaderCell,
  TableHeaderRow,
  TableRow,
} from './index';
import Pagination from './components/pagination';

type Props = {
  data?: Record<string, ReactNode>[];
  excludeHeaders?: string[];
  counter?: boolean;
  search?: boolean;
  perPage?: number;
  edit?: {
    redirect: (record: Record<string, ReactNode>) => string;
  };
};

export const DataTable = ({
  data,
  excludeHeaders,
  counter,
  search,
  perPage,
  edit,
}: Props) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(perPage || 15);
  const [searchValue, setSearchValue] = useState<string>('');

  if (!data || !data.length) {
    return null;
  }

  const excludeHeadersSet = new Set(excludeHeaders);

  const filterHeaders = (key: string) =>
    !excludeHeaders || !excludeHeadersSet.has(key);

  const headers = Object.keys(data[0]).filter(filterHeaders);
  const content = data
    .filter(
      (record) =>
        !searchValue ||
        Object.values(record).some((value) => String(value).match(searchValue))
    )
    .slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  return (
    <Table>
      <TableHeaderRow
        search={
          search ? { value: searchValue, setValue: setSearchValue } : undefined
        }
        width={headers.length + Number(counter) + 1}
      >
        {counter ? <TableHeaderCell align="left">No.</TableHeaderCell> : null}
        {headers.map((header, key) => (
          <TableHeaderCell align="left" key={key}>
            {header}
          </TableHeaderCell>
        ))}
        {edit ? <TableHeaderCell align="right">edit</TableHeaderCell> : null}
      </TableHeaderRow>
      <tbody>
        {content.map((record, key) => (
          <TableRow key={key}>
            {counter ? (
              <TableCell>{page * rowsPerPage + key + 1}</TableCell>
            ) : null}
            {Object.entries(record)
              .filter(([key]) => filterHeaders(key))
              .map(([, value], key) => (
                <TableCell key={key}>{value}</TableCell>
              ))}
          </TableRow>
        ))}
        <Pagination
          count={data.length}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      </tbody>
    </Table>
  );
};

DataTable.defaultProps = {
  data: undefined,
  excludeHeaders: new Set(),
  counter: false,
  search: false,
  perPage: 15,
};

export default DataTable;
