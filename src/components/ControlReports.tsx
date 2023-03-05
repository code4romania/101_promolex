import { MenuItem, Select, Stack, Typography } from '@mui/material';
import { GridColumns, GridValidRowModel } from '@mui/x-data-grid';
import { useTabs } from '../hooks';
import { SecondaryTab, SecondaryTabs } from './SecondaryTabs';
import { Table } from './Table';

const publicReportsTableColumns: GridColumns<GridValidRowModel> = [
  {
    field: 'nrProiect',
    headerName: 'Nr d/o',
    flex: 0.3,
    sortable: false,
  },
  {
    field: 'authority',
    headerName: 'Autoritatea publică',
    flex: 0.4,
  },
  {
    field: 'reportType',
    headerName: 'Tipul raportului',
    flex: 0.4,
    sortable: false,
  },
  {
    field: 'institution',
    headerName: 'Termenul de prezentare',
    flex: 0.4,
    sortable: false,
  },
  {
    field: 'responseType',
    headerName: 'Prevederi legale',
    flex: 0.4,
    sortable: false,
  },
  {
    field: 'dataReg',
    headerName: 'Data prezentării',
    flex: 0.3,
  },
];

const reportsAuditingTableColumns: GridColumns<GridValidRowModel> = [
  {
    field: 'nrProiect',
    headerName: 'Nr d/o',
    flex: 0.3,
    sortable: false,
  },
  {
    field: 'authority',
    headerName: 'Autoritatea publică',
    flex: 0.4,
  },
  {
    field: 'reportType',
    headerName: 'Tipul raportului',
    flex: 0.4,
    sortable: false,
  },
  {
    field: 'dataReg',
    headerName: 'Data ședinței plenare',
    flex: 0.3,
  },
];

const mockPublicReportsData = [
  {
    id: '1',
    nrProiect: '1',
    authority: 'Autoritatea Publică 1',
    reportType: 'Tipul raportului 1',
    institution: 'Termenul de prezentare 1',
    responseType:
      'Art. 12, alin. (2), Legea nr. 121/2012 pct. 28 și 29, Regulamentul de activitate al Consiliului, adoptat prin Legea nr. 298/2012',
    dataReg: '10.10.2021',
  },
  {
    id: '2',
    nrProiect: '2',
    authority: 'Autoritatea Publică 2',
    reportType: 'Tipul raportului 2',
    institution: 'Termenul de prezentare 2',
    responseType:
      'Art. 12, alin. (2), Legea nr. 121/2012 pct. 28 și 29, Regulamentul de activitate al Consiliului, adoptat prin Legea nr. 298/2012',
    dataReg: '10.10.2021',
  },
  {
    id: '3',
    nrProiect: '3',
    authority: 'Autoritatea Publică 3',
    reportType: 'Tipul raportului 3',
    institution: 'Termenul de prezentare 3',
    responseType:
      'Art. 12, alin. (2), Legea nr. 121/2012 pct. 28 și 29, Regulamentul de activitate al Consiliului, adoptat prin Legea nr. 298/2012',
    dataReg: '10.10.2021',
  },
  {
    id: '4',
    nrProiect: '4',
    authority: 'Autoritatea Publică 4',
    reportType: 'Tipul raportului 4',
    institution: 'Termenul de prezentare 4',
    responseType:
      'Art. 12, alin. (2), Legea nr. 121/2012 pct. 28 și 29, Regulamentul de activitate al Consiliului, adoptat prin Legea nr. 298/2012',
    dataReg: '10.10.2021',
  },
  {
    id: '5',
    nrProiect: '5',
    authority: 'Autoritatea Publică 5',
    reportType: 'Tipul raportului 5',
    institution: 'Termenul de prezentare 5',
    responseType:
      'Art. 12, alin. (2), Legea nr. 121/2012 pct. 28 și 29, Regulamentul de activitate al Consiliului, adoptat prin Legea nr. 298/2012',
    dataReg: '10.10.2021',
  },
  {
    id: '6',
    nrProiect: '6',
    authority: 'Autoritatea Publică 6',
    reportType: 'Tipul raportului 6',
    institution: 'Termenul de prezentare 6',
    responseType:
      'Art. 12, alin. (2), Legea nr. 121/2012 pct. 28 și 29, Regulamentul de activitate al Consiliului, adoptat prin Legea nr. 298/2012',
    dataReg: '10.10.2021',
  },
];

// mockAuditingData is an array using reportsAuditingTableColumns as a template for the data structure and has 10 items in it

const mockAuditingData = [
  {
    id: '1',
    nrProiect: '1',
    authority: 'Autoritatea Publică 1',
    reportType: 'Tipul raportului 1',
    dataReg: '10.10.2021',
  },
  {
    id: '2',
    nrProiect: '2',
    authority: 'Autoritatea Publică 2',
    reportType: 'Tipul raportului 2',
    dataReg: '10.10.2021',
  },
  {
    id: '3',
    nrProiect: '3',
    authority: 'Autoritatea Publică 3',
    reportType: 'Tipul raportului 3',
    dataReg: '10.10.2021',
  },
  {
    id: '4',
    nrProiect: '4',
    authority: 'Autoritatea Publică 4',
    reportType: 'Tipul raportului 4',
    dataReg: '10.10.2021',
  },
  {
    id: '5',
    nrProiect: '5',
    authority: 'Autoritatea Publică 5',
    reportType: 'Tipul raportului 5',
    dataReg: '10.10.2021',
  },
  {
    id: '6',
    nrProiect: '6',
    authority: 'Autoritatea Publică 6',
    reportType: 'Tipul raportului 6',
    dataReg: '10.10.2021',
  },
];

export function ControlReports() {
  const { tabValue, handleTabChange } = useTabs();

  return (
    <Stack gap={6} mt={9}>
      <SecondaryTabs
        onChange={handleTabChange}
        scrollButtons='auto'
        value={tabValue}
      >
        <SecondaryTab label='Rapoartele instituțiilor publice' />
        <SecondaryTab label='Audierea în plen a rapoartelor' />
      </SecondaryTabs>

      <Stack alignItems='center' direction='row' gap={2}>
        <Typography>Selectează anul</Typography>
        <Select labelId='year' value={2023}>
          <MenuItem value={2021}>2021</MenuItem>
          <MenuItem value={2022}>2022</MenuItem>
          <MenuItem value={2023}>2023</MenuItem>
        </Select>
      </Stack>

      {tabValue === 0 && (
        <Table
          columns={publicReportsTableColumns}
          height={510}
          getRowId={(row) => row.id}
          hideFooter={!mockPublicReportsData?.length}
          pageSize={5}
          rows={mockPublicReportsData}
        />
      )}
      {tabValue === 1 && (
        <Table
          columns={reportsAuditingTableColumns}
          height={510}
          getRowId={(row) => row.id}
          hideFooter={!mockAuditingData?.length}
          pageSize={5}
          rows={mockAuditingData}
        />
      )}
    </Stack>
  );
}
