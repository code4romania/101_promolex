import { Stack } from '@mui/material';
import { GridColumns, GridValidRowModel } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { useCommitteeInstitutionHearingsByLegislatureQuery } from '../queries';
import { Table } from './Table';

const publicInstitutionsTableColumns: GridColumns<GridValidRowModel> = [
  {
    field: 'autPublica',
    headerName: 'Autoritatea publică',
    flex: 0.4,
  },
  {
    field: 'tematica',
    headerName: 'Tematica audierii',
    flex: 0.4,
  },
  {
    field: 'dataSedinta',
    headerName: 'Data ședinței plenare',
    flex: 0.3,
    sortable: false,
  },
  {
    field: 'audierePlen',
    headerName: 'Audierea în plen',
    flex: 0.3,
    sortable: false,
  },
];

export function ControlPublicInstitutions() {
  const { data, isInitialLoading } =
    useCommitteeInstitutionHearingsByLegislatureQuery({
      refetchOnMount: false,
    });

  const tableData = useMemo(
    () => data?.map((report, index) => ({ ...report, id: index })) ?? [],
    [data],
  );

  return (
    <Stack gap={6} mt={9}>
      <Table
        columns={publicInstitutionsTableColumns}
        height={510}
        isLoading={isInitialLoading}
        getRowId={(row) => row.id}
        hideFooter={!tableData.length}
        pageSize={5}
        rows={tableData}
      />
    </Stack>
  );
}
