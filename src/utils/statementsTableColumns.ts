import { GridColumns, GridValidRowModel } from "@mui/x-data-grid";

export const statementsTableColumns: GridColumns<GridValidRowModel> = [
  {
    field: "item_name",
    headerName: "Denumire",
    sortable: false,
    flex: 0.5,
  },
  {
    field: "cost",
    headerName: "Suma",
    flex: 0.2,
  },
  {
    field: "currency",
    headerName: "Valuta",
    flex: 0.2,
  },
  {
    field: "note",
    headerName: "Notă",
    sortable: false,
    flex: 1,
  },
];
