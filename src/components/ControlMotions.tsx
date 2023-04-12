import { Stack } from '@mui/material';
import { GridColumns, GridValidRowModel } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { useTabs } from '../hooks';
import { useCommitteeMotionsByLegislatureQuery } from '../queries';
import { formatDate } from '../utils';
import { SecondaryTab, SecondaryTabs } from './SecondaryTabs';
import { Table } from './Table';
// import { TextWithTooltip } from './TextWithTooltip';

const motionsTableColumns: GridColumns<GridValidRowModel> = [
  {
    field: 'denumireProiect',
    headerName: 'Denumire moțiune',
    flex: 1,
    sortable: false,
    // renderCell: ({ value }) => <TextWithTooltip text={value} />,
    minWidth: 260,
  },
  {
    field: 'numeDep',
    headerName: 'Autorii moțiunii',
    flex: 1,
    // renderCell: ({ value }) => <TextWithTooltip text={value} />,
    minWidth: 400,
  },
  {
    field: 'dataVot1Lect',
    headerName: 'Data examinării în plen',
    flex: 0.4,
    // renderCell: ({ value }) => <TextWithTooltip text={value} />,
    minWidth: 140,
    valueFormatter: (params) => formatDate(params.value),
  },
  {
    field: 'decizia1Lect',
    headerName: 'Rezultat',
    flex: 0.3,
    sortable: false,
    // renderCell: ({ value }) => <TextWithTooltip text={value} />,
    minWidth: 110,
  },
];

export function ControlMotions() {
  const { tabValue, handleTabChange } = useTabs();

  const { data: simpleMotions, isInitialLoading: isLoadingSimpleMotions } =
    useCommitteeMotionsByLegislatureQuery('simplă', {
      enabled: tabValue === 0,
      refetchOnMount: false,
    });

  const {
    data: censorShipMotions,
    isInitialLoading: isLoadingcensorShipMotions,
  } = useCommitteeMotionsByLegislatureQuery('de cenzură', {
    enabled: tabValue === 1,
    refetchOnMount: false,
  });

  const simpleMotionsData = useMemo(
    () =>
      simpleMotions?.map((motion, index) => ({
        ...motion,
        numeDep: motion.numeDep.map(({ fullName }) => fullName).join(', '),
        id: index,
      })) ?? [],
    [simpleMotions],
  );

  const censorShipMotionsDta = useMemo(
    () =>
      censorShipMotions?.map((motion, index) => ({
        ...motion,
        numeDep: motion.numeDep.map(({ fullName }) => fullName).join(', '),
        id: index,
      })) ?? [],
    [censorShipMotions],
  );

  return (
    <Stack gap={6} mt={9}>
      <SecondaryTabs
        onChange={handleTabChange}
        scrollButtons='auto'
        value={tabValue}
      >
        <SecondaryTab label='Moțiuni simple' />
        <SecondaryTab label='Moțiuni de cenzură' />
      </SecondaryTabs>

      {tabValue === 0 && (
        <Table
          columns={motionsTableColumns}
          height='auto'
          isLoading={isLoadingSimpleMotions}
          getRowHeight={() => 'auto'}
          getRowId={(row) => row.id}
          hideFooter={!simpleMotionsData?.length}
          rows={simpleMotionsData}
        />
      )}
      {tabValue === 1 && (
        <Table
          columns={motionsTableColumns}
          height='auto'
          isLoading={isLoadingcensorShipMotions}
          getRowHeight={() => 'auto'}
          getRowId={(row) => row.id}
          hideFooter={!censorShipMotionsDta?.length}
          rows={censorShipMotionsDta}
        />
      )}
    </Stack>
  );
}
