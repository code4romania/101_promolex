import SearchIcon from "@mui/icons-material/Search";
import { Box, Stack, styled, TextField } from "@mui/material";
import {
  DataGrid,
  GridColumns,
  GridRowIdGetter,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useMemo, useState } from "react";
import { ro } from "date-fns/locale";
import { deburr, filter, values } from "lodash";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-columnHeader, & .MuiDataGrid-footerContainer": {
    backgroundColor: "#EFF0F3",
  },
  "& .MuiDataGrid-columnHeaders": {
    borderBottomWidth: 0,
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: 700,
  },
  "& .MuiDataGrid-iconSeparator": {
    display: "none",
  },
  "& .MuiDataGrid-footerContainer": {
    borderTopWidth: 0,
  },
}));

type TableProps = {
  columns: GridColumns<GridValidRowModel>;
  fromDate?: Date;
  getRowId: GridRowIdGetter<GridValidRowModel>;
  height: number | string;
  onFromDateChange?: (date: Date | null) => void;
  onToDateChange?: (date: Date | null) => void;
  pageSize?: number;
  rows: GridValidRowModel[];
  toDate?: Date;
};

const cleanText = (text: string) =>
  deburr(text.toLowerCase()).replaceAll(/ș/g, "s");

export const Table = ({
  columns,
  fromDate,
  getRowId,
  height,
  onFromDateChange,
  onToDateChange,
  pageSize = 3,
  rows,
  toDate,
}: TableProps) => {
  const [search, setSearch] = useState("");

  const filteredRows = useMemo(
    () =>
      filter(rows, (row) =>
        values(row)
          .map(cleanText)
          .some((value) => value.includes(cleanText(search)))
      ),
    [rows, search]
  );

  console.log(filteredRows);

  return (
    <Stack gap={4}>
      <Stack direction="row" gap={4}>
        <TextField
          placeholder="Caută..."
          InputProps={{
            startAdornment: <SearchIcon color="disabled" />,
          }}
          onChange={(event) => setSearch(event.target.value)}
          value={search}
        />
        {onFromDateChange && (
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ro}>
            <DatePicker
              label="De la data"
              onChange={onFromDateChange}
              renderInput={(params) => <TextField {...params} />}
              value={fromDate}
            />
          </LocalizationProvider>
        )}
        {onToDateChange && (
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ro}>
            <DatePicker
              label="Până la data"
              onChange={onToDateChange}
              renderInput={(params) => <TextField {...params} />}
              value={toDate}
            />
          </LocalizationProvider>
        )}
      </Stack>
      <Box height={height}>
        <StyledDataGrid
          columns={columns}
          disableColumnFilter
          disableColumnMenu
          disableColumnSelector
          getRowId={getRowId}
          isCellEditable={() => false}
          isRowSelectable={() => false}
          pageSize={pageSize}
          rowHeight={80}
          rows={filteredRows}
        />
      </Box>
    </Stack>
  );
};
