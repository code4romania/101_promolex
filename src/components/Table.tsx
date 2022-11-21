import { Box, styled } from "@mui/material";
import { DataGrid, GridColumns, GridValidRowModel } from "@mui/x-data-grid";

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
  height: number | string;
  pageSize?: number;
  rows: GridValidRowModel[];
};

export const Table = ({ columns, height, pageSize = 3, rows }: TableProps) => {
  return (
    <Box height={height}>
      <StyledDataGrid
        columns={columns}
        disableColumnFilter
        disableColumnMenu
        disableColumnSelector
        getRowId={(row) => row.itemid}
        pageSize={pageSize}
        rowHeight={80}
        rows={rows}
      />
    </Box>
  );
};
