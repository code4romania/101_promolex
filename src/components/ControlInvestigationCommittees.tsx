import { Stack } from '@mui/material';
import { GridColumns, GridValidRowModel } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { useCommitteeInvestigationCommissionsByLegislatureQuery } from '../queries';
import { Table } from './Table';

const investigationCommitteesTableColumns: GridColumns<GridValidRowModel> = [
  {
    field: 'denComisie',
    headerName: 'Denumirea comisiei',
    flex: 1,
  },
  {
    field: 'dataConst',
    headerName: 'Data constituirii',
    flex: 0.4,
  },
  {
    field: 'componenta',
    headerName: 'Componența',
    flex: 0.5,
  },
  {
    field: 'dataPrezParl',
    headerName: 'Data prezentării raportului',
    flex: 0.4,
    sortable: false,
  },
  {
    field: 'raportFile',
    headerName: 'Raportul',
    flex: 0.3,
    sortable: false,
  },
];

export function ControlInvestigationCommittees() {
  const { data, isInitialLoading } =
    useCommitteeInvestigationCommissionsByLegislatureQuery({
      refetchOnMount: false,
    });

  const tableData = useMemo(
    () =>
      data?.map((report, index) => ({
        ...report,
        componenta: report.componenta
          .map(({ fullName }) => fullName)
          .join(', '),
        id: index,
      })) ?? [],
    [data],
  );

  return (
    <Stack gap={6} mt={9}>
      <Table
        columns={investigationCommitteesTableColumns}
        getRowHeight={() => 'auto'}
        height={510}
        isLoading={isInitialLoading}
        getRowId={(row) => row.id}
        hideFooter={!tableData?.length}
        pageSize={5}
        rows={tableData}
      />
    </Stack>
  );
}
