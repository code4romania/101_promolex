import { Stack } from '@mui/material';
import { GridColumns, GridValidRowModel } from '@mui/x-data-grid';
import { CommitteeSummary } from './CommitteeSummary';
import { Table } from './Table';

const specialCommitteesTableColumns: GridColumns<GridValidRowModel> = [
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

// mockSpecialCommitteesData is a mock data array with the same structure as the specialCommitteesTableColumns array and has 10 elements
export const mockSpecialCommitteesData = [
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

export function ControlSpecialCommittees() {
  return (
    <Stack gap={6} mt={9}>
      <CommitteeSummary name='Comisia specială pentru selectarea candidaților la funcția de Avocat al Poporului'>
        <Table
          columns={specialCommitteesTableColumns}
          height={510}
          getRowId={(row) => row.id}
          hideFooter={!mockSpecialCommitteesData?.length}
          pageSize={5}
          rows={mockSpecialCommitteesData}
        />
      </CommitteeSummary>
      <CommitteeSummary name='Comisia specială de examinare a procesului decizional privind controlul inflației și politica monetară pe parcursul ultimelor 18 luni'>
        <Table
          columns={specialCommitteesTableColumns}
          height={510}
          getRowId={(row) => row.id}
          hideFooter={!mockSpecialCommitteesData?.length}
          pageSize={5}
          rows={mockSpecialCommitteesData}
        />
      </CommitteeSummary>
      <CommitteeSummary name='Comisia specială pentru examinarea eficienței aplicării reglementărilor din sectorul produselor petroliere'>
        <Table
          columns={specialCommitteesTableColumns}
          height={510}
          getRowId={(row) => row.id}
          hideFooter={!mockSpecialCommitteesData?.length}
          pageSize={5}
          rows={mockSpecialCommitteesData}
        />
      </CommitteeSummary>
      <CommitteeSummary name='Comisia parlamentară specială de monitorizare și control parlamentar asupra realizării politicii de reintegrare a RM'>
        <Table
          columns={specialCommitteesTableColumns}
          height={510}
          getRowId={(row) => row.id}
          hideFooter={!mockSpecialCommitteesData?.length}
          pageSize={5}
          rows={mockSpecialCommitteesData}
        />
      </CommitteeSummary>
    </Stack>
  );
}