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
  useMediaQuery,
  useTheme,
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
  '& .MuiDataGrid-columnHeader': {
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
    backgroundColor: '#EFF0F3',
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

export const StyledPickersDay = styled(PickersDay<Date>)(({ theme }) => ({
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
  if (typeof text === 'string') {
    return deburr(text.toLowerCase()).replaceAll(/ș/g, 's');
  }
  if (Array.isArray(text)) return text.map(cleanText).join(' ');
  return text;
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
  const { breakpoints } = useTheme();
  const isLargeScreen = useMediaQuery(breakpoints.up('sm'));
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

    const data = chain(filteredRows)
      .map((row) => chain(row).pick(fields).values().value())
      .value();

    return data;
  }, [columns, filteredRows]);

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
              sx={{
                order: isLargeScreen ? 0 : 1,
              }}
              value={search}
            />
          )}
          {showDatePickers && (
            <Stack
              direction='row'
              gap={4}
              sx={{
                order: isLargeScreen ? 1 : 0,
              }}
            >
              {onFromDateChange && (
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

              {onToDateChange && (
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

          {showDownload && (
            <Button
              endIcon={<FileDownloadRoundedIcon />}
              onClick={() => downloadAsExcel(headers, downloadData)}
              sx={{
                marginLeft: 'auto',
                order: isLargeScreen ? 2 : 1,
              }}
              variant='outlined'
            >
              Descarcă tabel
            </Button>
          )}
        </Stack>
      )}
      <Box height={height}>
        <StyledDataGrid
          autoHeight
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
          pageSize={7}
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
