import { GridColumns, GridValidRowModel } from '@mui/x-data-grid';
import { TextWithTooltip } from '../components/TextWithTooltip';

export const legislationInitiativesTableColumns: GridColumns<GridValidRowModel> =
  [
    {
      field: 'nrProiect',
      headerName: 'Numărul proiectului',
      flex: 0.3,
      renderCell: ({ value }) => <TextWithTooltip text={value} />,
    },
    {
      field: 'dataReg',
      headerName: 'Data înregistrării proiectului',
      flex: 0.4,
      renderCell: ({ value }) => <TextWithTooltip text={value} />,
    },
    {
      field: 'denumireProiect',
      headerName: 'Denumirea proiectului',
      sortable: false,
      flex: 1,
      renderCell: ({ value }) => <TextWithTooltip text={value} />,
    },
    {
      field: 'statutProiect',
      headerName: 'Statutul proiectului',
      flex: 0.3,
      renderCell: ({ value }) => <TextWithTooltip text={value} />,
    },
  ];
