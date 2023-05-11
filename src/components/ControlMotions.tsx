import { Stack } from '@mui/material';
import {
  GridColumns,
  GridRenderCellParams,
  GridValidRowModel,
} from '@mui/x-data-grid';
import { SyntheticEvent, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCommitteeMotionsByLegislatureQuery } from '../queries';
import { Deputy, Routes } from '../types';
import { formatDate } from '../utils';
import { SecondaryTab, SecondaryTabs } from './SecondaryTabs';
import { StyledRouterLink } from './StyledRouterLink';
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
    renderCell: ({ value }: GridRenderCellParams<Deputy[]>) => (
      <Stack direction='row' flexWrap='wrap' columnGap={1}>
        {value?.map(({ did, fullName }) => (
          <StyledRouterLink
            key={did}
            sx={{ whiteSpace: 'nowrap' }}
            to={`${Routes.Deputies}/detalii/${did}`}
          >
            {fullName}
          </StyledRouterLink>
        ))}
      </Stack>
    ),
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
  const [params, setParams] = useSearchParams();
  const tabValue = parseInt(params.get('secondaryTab') ?? '0', 10);

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
        id: index,
      })) ?? [],
    [simpleMotions],
  );

  const censorShipMotionsDta = useMemo(
    () =>
      censorShipMotions?.map((motion, index) => ({
        ...motion,
        id: index,
      })) ?? [],
    [censorShipMotions],
  );

  const handleTabChange = (_: SyntheticEvent, newValue: number) => {
    setParams({
      tab: params.get('tab') ?? '6',
      secondaryTab: newValue.toString(),
    });
  };

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
