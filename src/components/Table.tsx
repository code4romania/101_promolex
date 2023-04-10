import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import SearchIcon from '@mui/icons-material/Search';
import {
  alpha,
  Box,
  Button,
  Pagination,
  Stack,
  styled,
  TextField,
} from '@mui/material';
import {
  DataGrid,
  GridColumns,
  gridPageCountSelector,
  gridPageSelector,
  GridRowHeightParams,
  GridRowHeightReturnValue,
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
import { chain, deburr, filter, values } from 'lodash';
import { useMemo, useState } from 'react';
import { downloadAsExcel } from '../utils';

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color='primary'
      count={pageCount}
      page={page + 1}
      onChange={(_, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .MuiDataGrid-columnHeader, & .MuiDataGrid-footerContainer': {
    backgroundColor: alpha(theme.palette.secondary.main, 0.45),
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
  '& .MuiDataGrid-row > .MuiDataGrid-cell.MuiDataGrid-cell--textLeft': {
    overflow: 'unset',
    whiteSpace: 'unset',
  },
  '& .MuiDataGrid-row > .MuiDataGrid-cell': {
    paddingBottom: 8,
    paddingTop: 8,
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
  getRowHeight?: (params: GridRowHeightParams) => GridRowHeightReturnValue;
  getRowId: GridRowIdGetter<GridValidRowModel>;
  height: number | string;
  hideFooter?: boolean;
  isLoading?: boolean;
  onFromDateChange?: (date: Date | null) => void;
  onToDateChange?: (date: Date | null) => void;
  rows: GridValidRowModel[];
  showDatePickers?: boolean;
  showDownload?: boolean;
  showSearch?: boolean;
  toDate?: Date;
};

const cleanText = (text: string | string[]): string => {
  if (Array.isArray(text)) return text.map(cleanText).join(' ');
  return deburr(text.toLowerCase()).replaceAll(/ș/g, 's');
};

export function Table({
  columns,
  fromDate,
  getRowHeight,
  getRowId,
  height,
  hideFooter,
  isLoading,
  onFromDateChange,
  onToDateChange,
  rows,
  showDatePickers,
  showDownload,
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

  const headers = useMemo(
    () => columns.map((column) => column.headerName ?? ''),
    [columns],
  );

  const downloadData = useMemo(() => {
    const fields = columns.map((column) => column.field);

    const data = chain(rows)
      .map((row) => chain(row).pick(fields).values().value())
      .value();

    return data;
  }, [columns, rows]);

  return (
    <Stack gap={4}>
      {(showSearch || showDatePickers) && (
        <Stack direction='row' gap={4} flexWrap='wrap' py={2}>
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

          {showDownload && (
            <Button
              endIcon={<FileDownloadRoundedIcon />}
              onClick={() => downloadAsExcel(headers, downloadData)}
              sx={{ marginLeft: 'auto' }}
              variant='outlined'
            >
              Descarcă tabel
            </Button>
          )}
        </Stack>
      )}
      <Box height={height}>
        <StyledDataGrid
          autoPageSize
          columns={columns}
          disableColumnFilter
          disableColumnMenu
          disableColumnSelector
          disableSelectionOnClick
          getRowHeight={getRowHeight}
          getRowId={getRowId}
          isCellEditable={() => false}
          isRowSelectable={() => false}
          loading={isLoading}
          rows={filteredRows}
          hideFooter={hideFooter}
          components={{
            Pagination: CustomPagination,
          }}
          sortingOrder={['desc', 'asc']}
        />
      </Box>
    </Stack>
  );
}

Table.defaultProps = {
  fromDate: undefined,
  getRowHeight: undefined,
  hideFooter: true,
  isLoading: false,
  onFromDateChange: undefined,
  onToDateChange: undefined,
  showDatePickers: false,
  showDownload: false,
  showSearch: false,
  toDate: undefined,
};
