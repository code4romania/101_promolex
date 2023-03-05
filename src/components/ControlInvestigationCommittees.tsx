import { Stack } from '@mui/material';
import { GridColumns, GridValidRowModel } from '@mui/x-data-grid';
import { CommitteeSummary } from './CommitteeSummary';
import { Table } from './Table';

const investigationCommitteesTableColumns: GridColumns<GridValidRowModel> = [
  {
    field: 'dataReg',
    headerName: 'Data constituirii',
    flex: 0.4,
  },
  {
    field: 'members',
    headerName: 'Componența',
    flex: 0.4,
  },
  {
    field: 'presentationDate',
    headerName: 'Data prezentării raportului',
    flex: 1,
    sortable: false,
  },
  {
    field: 'report',
    headerName: 'IRaportul',
    flex: 0.3,
    sortable: false,
  },
];

export const mockInvestigationCommitteesData = [
  {
    id: '1',
    dataReg: 'Data constituirii',
    members: 'Componența',
    presentationDate: 'Data prezentării raportului',
    report: 'Raportul',
  },
  {
    id: '2',
    dataReg: 'Data constituirii',
    members: 'Componența',
    presentationDate: 'Data prezentării raportului',
    report: 'Raportul',
  },
  {
    id: '3',
    dataReg: 'Data constituirii',
    members: 'Componența',
    presentationDate: 'Data prezentării raportului',
    report: 'Raportul',
  },
  {
    id: '4',
    dataReg: 'Data constituirii',
    members: 'Componența',
    presentationDate: 'Data prezentării raportului',
    report: 'Raportul',
  },
  {
    id: '5',
    dataReg: 'Data constituirii',
    members: 'Componența',
    presentationDate: 'Data prezentării raportului',
    report: 'Raportul',
  },
  {
    id: '6',
    dataReg: 'Data constituirii',
    members: 'Componența',
    presentationDate: 'Data prezentării raportului',
    report: 'Raportul',
  },
  {
    id: '7',
    dataReg: 'Data constituirii',
    members: 'Componența',
    presentationDate: 'Data prezentării raportului',
    report: 'Raportul',
  },
  {
    id: '8',
    dataReg: 'Data constituirii',
    members: 'Componența',
    presentationDate: 'Data prezentării raportului',
    report: 'Raportul',
  },
  {
    id: '9',
    dataReg: 'Data constituirii',
    members: 'Componența',
    presentationDate: 'Data prezentării raportului',
    report: 'Raportul',
  },
];

export function ControlInvestigationCommittees() {
  return (
    <Stack gap={6} mt={9}>
      <CommitteeSummary name='Comisia de anchetă privind modul de exploatare a substanțelor minerale utile și determinarea impactului asupra mediului'>
        <Table
          columns={investigationCommitteesTableColumns}
          height={510}
          getRowId={(row) => row.id}
          hideFooter={!mockInvestigationCommitteesData?.length}
          pageSize={5}
          rows={mockInvestigationCommitteesData}
        />
      </CommitteeSummary>
    </Stack>
  );
}
