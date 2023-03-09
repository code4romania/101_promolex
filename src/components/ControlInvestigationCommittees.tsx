import { Link, Stack } from '@mui/material';
import { GridColumns, GridValidRowModel } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { useCommitteeInvestigationCommissionsByLegislatureQuery } from '../queries';
import { Table } from './Table';
import { TextWithTooltip } from './TextWithTooltip';

const investigationCommitteesTableColumns: GridColumns<GridValidRowModel> = [
  {
    field: 'denComisie',
    headerName: 'Denumirea comisiei',
    flex: 1,
    renderCell: ({ value }) => <TextWithTooltip text={value} />,
  },
  {
    field: 'dataConst',
    headerName: 'Data constituirii',
    flex: 0.4,
    renderCell: ({ value }) => <TextWithTooltip text={value} />,
  },
  {
    field: 'componenta',
    headerName: 'Componența',
    flex: 0.5,
    renderCell: ({ value }) => <TextWithTooltip text={value} />,
  },
  {
    field: 'dataPrezParl',
    headerName: 'Data prezentării raportului',
    flex: 0.4,
    sortable: false,
    renderCell: ({ value }) => <TextWithTooltip text={value} />,
  },
  {
    field: 'raportFile',
    headerName: 'Raportul',
    flex: 0.3,
    sortable: false,
    renderCell: ({ value }) => <Link href={value}>Vezi raportul</Link>,
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
