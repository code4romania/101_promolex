import { Stack } from '@mui/material';
import { GridColumns, GridValidRowModel } from '@mui/x-data-grid';
import { useTabs } from '../hooks';
import { SecondaryTab, SecondaryTabs } from './SecondaryTabs';
import { Table } from './Table';

const simpleMotionsTableColumns: GridColumns<GridValidRowModel> = [
  {
    field: 'nrProiect',
    headerName: 'Nr d/o',
    flex: 0.3,
    sortable: false,
  },
  {
    field: 'theme',
    headerName: 'Tematica moțiunii',
    flex: 1,
  },
  {
    field: 'autor',
    headerName: 'Autorii moțiunii',
    flex: 0.4,
  },
  {
    field: 'date',
    headerName: 'Data examinării în plen',
    flex: 0.3,
    sortable: false,
  },
  {
    field: 'response',
    headerName: 'Rezultat',
    flex: 0.3,
    sortable: false,
  },
];

const censorshipMotionsTableColumns: GridColumns<GridValidRowModel> = [
  {
    field: 'nrProiect',
    headerName: 'Nr d/o',
    flex: 0.3,
    sortable: false,
  },
  {
    field: 'context',
    headerName: 'Contextul înaintării',
    flex: 0.4,
  },
  {
    field: 'autorii',
    headerName: 'Autorii moțiunii',
    flex: 0.4,
    sortable: false,
  },
  {
    field: 'date',
    headerName: 'Data examinării în plen',
    flex: 1,
  },
  {
    field: 'response',
    headerName: 'Rezultat',
    flex: 0.4,
    sortable: false,
  },
];

const mockSimpleMotionsData = [
  {
    id: '1',
    nrProiect: '1',
    theme: 'Tematica moțiunii',
    autor: 'Autorii moțiunii',
    date: 'Data examinării în plen',
    response: 'Rezultat',
  },
  {
    id: '2',
    nrProiect: '2',
    theme: 'Tematica moțiunii',
    autor: 'Autorii moțiunii',
    date: 'Data examinării în plen',
    response: 'Rezultat',
  },
  {
    id: '3',
    nrProiect: '3',
    theme: 'Tematica moțiunii',
    autor: 'Autorii moțiunii',
    date: 'Data examinării în plen',
    response: 'Rezultat',
  },
  {
    id: '4',
    nrProiect: '4',
    theme: 'Tematica moțiunii',
    autor: 'Autorii moțiunii',
    date: 'Data examinării în plen',
    response: 'Rezultat',
  },
  {
    id: '5',
    nrProiect: '5',
    theme: 'Tematica moțiunii',
    autor: 'Autorii moțiunii',
    date: 'Data examinării în plen',
    response: 'Rezultat',
  },
];

const mockCensorshipMotionsData = [
  {
    id: '1',
    nrProiect: '1',
    context: 'Contextul înaintării',
    autorii: 'Autorii moțiunii',
    date: 'Data examinării în plen',
    response: 'Rezultat',
  },
  {
    id: '2',
    nrProiect: '2',
    context: 'Contextul înaintării',
    autorii: 'Autorii moțiunii',
    date: 'Data examinării în plen',
    response: 'Rezultat',
  },
  {
    id: '3',
    nrProiect: '3',
    context: 'Contextul înaintării',
    autorii: 'Autorii moțiunii',
    date: 'Data examinării în plen',
    response: 'Rezultat',
  },
  {
    id: '4',
    nrProiect: '4',
    context: 'Contextul înaintării',
    autorii: 'Autorii moțiunii',
    date: 'Data examinării în plen',
    response: 'Rezultat',
  },
  {
    id: '5',
    nrProiect: '5',
    context: 'Contextul înaintării',
    autorii: 'Autorii moțiunii',
    date: 'Data examinării în plen',
    response: 'Rezultat',
  },
];

export function ControlMotions() {
  const { tabValue, handleTabChange } = useTabs();

  return (
    <Stack gap={6} mt={9}>
      <SecondaryTabs
        onChange={handleTabChange}
        scrollButtons='auto'
        value={tabValue}
        //   variant='fullWidth'
      >
        <SecondaryTab label='Moțiuni simple' />
        <SecondaryTab label='Moțiuni de cenzură' />
      </SecondaryTabs>

      {tabValue === 0 && (
        <Table
          columns={simpleMotionsTableColumns}
          height={510}
          getRowId={(row) => row.id}
          hideFooter={!mockSimpleMotionsData?.length}
          pageSize={5}
          rows={mockSimpleMotionsData}
        />
      )}
      {tabValue === 1 && (
        <Table
          columns={censorshipMotionsTableColumns}
          height={510}
          getRowId={(row) => row.id}
          hideFooter={!mockCensorshipMotionsData?.length}
          pageSize={5}
          rows={mockCensorshipMotionsData}
        />
      )}
    </Stack>
  );
}
