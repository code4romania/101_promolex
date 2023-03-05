import { Stack } from '@mui/material';
import { GridColumns, GridValidRowModel } from '@mui/x-data-grid';
import { Table } from './Table';

const publicInstitutionsTableColumns: GridColumns<GridValidRowModel> = [
  {
    field: 'nrProiect',
    headerName: 'Nr d/o',
    flex: 0.3,
    sortable: false,
  },
  {
    field: 'publicInstitution',
    headerName: 'Autoritatea publică',
    flex: 0.4,
  },
  {
    field: 'theme',
    headerName: 'Tematica audierii',
    flex: 0.4,
  },
  {
    field: 'dataReg',
    headerName: 'Data ședinței plenare',
    flex: 0.3,
    sortable: false,
  },
  {
    field: 'auditDate',
    headerName: 'Audierea în plen',
    flex: 0.3,
    sortable: false,
  },
];

// mockPublicInstitutionsData is a mock data array with the same structure as the publicInstitutionsTableColumns array and has 10 elements
export const mockPublicInstitutionsData = [
  {
    id: '1',
    nrProiect: '1',
    publicInstitution: 'Autoritatea publică',
    theme: 'Tematica audierii',
    dataReg: 'Data ședinței plenare',
    auditDate: 'Audierea în plen',
  },
  {
    id: '2',
    nrProiect: '2',
    publicInstitution: 'Autoritatea publică',
    theme: 'Tematica audierii',
    dataReg: 'Data ședinței plenare',
    auditDate: 'Audierea în plen',
  },
  {
    id: '3',
    nrProiect: '3',
    publicInstitution: 'Autoritatea publică',
    theme: 'Tematica audierii',
    dataReg: 'Data ședinței plenare',
    auditDate: 'Audierea în plen',
  },
  {
    id: '4',
    nrProiect: '4',
    publicInstitution: 'Autoritatea publică',
    theme: 'Tematica audierii',
    dataReg: 'Data ședinței plenare',
    auditDate: 'Audierea în plen',
  },
  {
    id: '5',
    nrProiect: '5',
    publicInstitution: 'Autoritatea publică',
    theme: 'Tematica audierii',
    dataReg: 'Data ședinței plenare',
    auditDate: 'Audierea în plen',
  },
  {
    id: '6',
    nrProiect: '6',
    publicInstitution: 'Autoritatea publică',
    theme: 'Tematica audierii',
    dataReg: 'Data ședinței plenare',
    auditDate: 'Audierea în plen',
  },
  {
    id: '7',
    nrProiect: '7',
    publicInstitution: 'Autoritatea publică',
    theme: 'Tematica audierii',
    dataReg: 'Data ședinței plenare',
    auditDate: 'Audierea în plen',
  },
];

export function ControlPublicInstitutions() {
  return (
    <Stack gap={6} mt={9}>
      <Table
        columns={publicInstitutionsTableColumns}
        height={510}
        getRowId={(row) => row.id}
        hideFooter={!mockPublicInstitutionsData?.length}
        pageSize={5}
        rows={mockPublicInstitutionsData}
      />
    </Stack>
  );
}
