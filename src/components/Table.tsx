import SearchIcon from '@mui/icons-material/Search';
import { Box, Pagination, Stack, styled, TextField } from '@mui/material';
import {
  DataGrid,
  GridColumns,
  gridPageCountSelector,
  gridPageSelector,
  GridRowIdGetter,
  GridValidRowModel,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import {
  DatePicker,
  LocalizationProvider,
  PickersDay,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ro } from 'date-fns/locale';
import { deburr, filter, values } from 'lodash';
import { useMemo, useState } from 'react';

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color='primary'
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

const StyledDataGrid = styled(DataGrid)(() => ({
  '& .MuiDataGrid-columnHeader, & .MuiDataGrid-footerContainer': {
    backgroundColor: '#EFF0F3',
  },
  '& .MuiDataGrid-columnHeaders': {
    borderBottomWidth: 0,
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 700,
  },
  '& .MuiDataGrid-iconSeparator': {
    display: 'none',
  },
  '& .MuiDataGrid-footerContainer': {
    borderTopWidth: 0,
  },
}));

const StyledPickersDay = styled(PickersDay<Date>)(({ theme }) => ({
  '&.Mui-selected': {
    backgroundColor: theme.palette.secondary.main,

    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
}));

type TableProps = {
  columns: GridColumns<GridValidRowModel>;
  fromDate?: Date;
  getRowId: GridRowIdGetter<GridValidRowModel>;
  height: number | string;
  hideFooter?: boolean;
  isLoading?: boolean;
  onFromDateChange?: (date: Date | null) => void;
  onToDateChange?: (date: Date | null) => void;
  pageSize?: number;
  rows: GridValidRowModel[];
  showDatePickers?: boolean;
  showSearch?: boolean;
  toDate?: Date;
};

const cleanText = (text: string) =>
  deburr(text.toLowerCase()).replaceAll(/ș/g, 's');

export function Table({
  columns,
  fromDate,
  getRowId,
  height,
  hideFooter,
  isLoading,
  onFromDateChange,
  onToDateChange,
  pageSize = 3,
  rows,
  showDatePickers,
  showSearch,
  toDate,
}: TableProps) {
  const [search, setSearch] = useState('');

  const filteredRows = useMemo(
    () =>
      showSearch
        ? filter(rows, (row) =>
            values(row)
              .map(cleanText)
              .some((value) => value.includes(cleanText(search))),
          )
        : rows,
    [rows, search, showSearch],
  );

  return (
    <Stack gap={4}>
      {(showSearch || showDatePickers) && (
        <Stack direction='row' gap={4}>
          {showSearch && (
            <TextField
              placeholder='Caută...'
              InputProps={{
                startAdornment: <SearchIcon color='disabled' />,
              }}
              onChange={(event) => setSearch(event.target.value)}
              value={search}
            />
          )}
          {showDatePickers && onFromDateChange && (
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={ro}
              localeText={{
                nextMonth: 'Luna următoare',
                previousMonth: 'Luna anterioară',
              }}
            >
              <DatePicker
                label='De la data'
                maxDate={toDate}
                onChange={onFromDateChange}
                renderDay={(date, selectedDays, pickersDayProps) => (
                  <StyledPickersDay {...pickersDayProps} />
                )}
                renderInput={(params) => <TextField {...params} />}
                value={fromDate}
              />
            </LocalizationProvider>
          )}
          {showDatePickers && onToDateChange && (
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={ro}
              localeText={{
                nextMonth: 'Luna următoare',
                previousMonth: 'Luna anterioară',
              }}
            >
              <DatePicker
                label='Până la data'
                minDate={fromDate}
                onChange={onToDateChange}
                renderDay={(date, selectedDays, pickersDayProps) => (
                  <StyledPickersDay {...pickersDayProps} />
                )}
                renderInput={(params) => <TextField {...params} />}
                value={toDate}
              />
            </LocalizationProvider>
          )}
        </Stack>
      )}
      <Box height={height}>
        <StyledDataGrid
          columns={columns}
          disableColumnFilter
          disableColumnMenu
          disableColumnSelector
          disableSelectionOnClick
          getRowId={getRowId}
          isCellEditable={() => false}
          isRowSelectable={() => false}
          loading={isLoading}
          pageSize={pageSize}
          rowHeight={80}
          rows={filteredRows}
          rowsPerPageOptions={[5]}
          hideFooter={hideFooter}
          components={{
            Pagination: CustomPagination,
          }}
        />
      </Box>
    </Stack>
  );
}

Table.defaultProps = {
  fromDate: undefined,
  hideFooter: true,
  isLoading: false,
  onFromDateChange: undefined,
  onToDateChange: undefined,
  pageSize: 3,
  showDatePickers: false,
  showSearch: false,
  toDate: undefined,
};
