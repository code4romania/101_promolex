import { GridColumns, GridValidRowModel } from '@mui/x-data-grid';

export const legislationInitiativesTableColumns: GridColumns<GridValidRowModel> =
  [
    {
      field: 'nrProiect',
      headerName: 'Numărul proiectului',
      flex: 0.3,
    },
    {
      field: 'dataReg',
      headerName: 'Data înregistrării proiectului',
      flex: 0.4,
    },
    {
      field: 'denumireProiect',
      headerName: 'Denumirea proiectului',
      sortable: false,
      flex: 1,
    },
    {
      field: 'statutProiect',
      headerName: 'Statutul proiectului',
      flex: 0.3,
    },
  ];
