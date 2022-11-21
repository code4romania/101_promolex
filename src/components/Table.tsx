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
import { useState } from "react";
import { ro } from "date-fns/locale";

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
  getRowId: GridRowIdGetter<GridValidRowModel>;
  height: number | string;
  pageSize?: number;
  rows: GridValidRowModel[];
};

export const Table = ({
  columns,
  getRowId,
  height,
  pageSize = 3,
  rows,
}: TableProps) => {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState<Date | null>();

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
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ro}>
          <DatePicker
            label="Selectează data"
            value={startDate}
            onChange={(value) => setStartDate(value)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Stack>
      <Box height={height}>
        <StyledDataGrid
          columns={columns}
          disableColumnFilter
          disableColumnMenu
          disableColumnSelector
          getRowId={getRowId}
          pageSize={pageSize}
          rowHeight={80}
          rows={rows}
        />
      </Box>
    </Stack>
  );
};
