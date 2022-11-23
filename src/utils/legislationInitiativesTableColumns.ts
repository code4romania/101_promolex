import { GridColumns, GridValidRowModel } from "@mui/x-data-grid";

export const legislationInitiativesTableColumns: GridColumns<GridValidRowModel> =
  [
    {
      field: "nr_proiect",
      headerName: "Numărul proiectului",
      flex: 0.3,
    },
    {
      field: "data_reg",
      headerName: "Data înregistrării proiectului",
      flex: 0.4,
    },
    {
      field: "denumire_proiect",
      headerName: "Denumirea proiectului",
      sortable: false,
      flex: 1,
    },
    {
      field: "statut_proiect",
      headerName: "Statutul proiectului",
      flex: 0.3,
    },
  ];
