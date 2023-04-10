import {
  GridColumns,
  gridNumberComparator,
  GridValidRowModel,
} from '@mui/x-data-grid';
import { formatDate } from './formatDate';
// import { TextWithTooltip } from '../components/TextWithTooltip';

export const legislationInitiativesTableColumns: GridColumns<GridValidRowModel> =
  [
    {
      field: 'nrProiect',
      headerName: 'Numărul proiectului',
      flex: 0.3,
      // renderCell: ({ value }) => <TextWithTooltip text={value} />,
      sortComparator: gridNumberComparator,
      minWidth: 120,
    },
    {
      field: 'dataReg',
      headerName: 'Data înregistrării proiectului',
      flex: 0.4,
      // renderCell: ({ value }) => <TextWithTooltip text={value} />,
      minWidth: 160,
      valueFormatter: (params) => formatDate(params.value),
    },
    {
      field: 'denumireProiect',
      headerName: 'Denumirea proiectului',
      sortable: false,
      flex: 1,
      // renderCell: ({ value }) => <TextWithTooltip text={value} />,
      minWidth: 320,
    },
    {
      field: 'statutProiect',
      headerName: 'Statutul proiectului',
      flex: 0.3,
      // renderCell: ({ value }) => <TextWithTooltip text={value} />,
      minWidth: 120,
    },
  ];
