import { Link, Stack } from '@mui/material';
import {
  GridColumns,
  GridRenderCellParams,
  GridValidRowModel,
} from '@mui/x-data-grid';
import { useMemo } from 'react';
import { useTabs } from '../hooks';
import {
  useCommitteeInterpellationsByLegislatureQuery,
  useCommitteeQuestionsByLegislatureQuery,
} from '../queries';
import { Deputy, Routes } from '../types';
import { formatDate } from '../utils';
import { SecondaryTab, SecondaryTabs } from './SecondaryTabs';
import { StyledRouterLink } from './StyledRouterLink';
import { Table } from './Table';

const questionsTableColumns: GridColumns<GridValidRowModel> = [
  {
    field: 'id',
    headerName: 'Nr',
    flex: 0.1,
    // renderCell: ({ value }) => <TextWithTooltip text={value} />,
    minWidth: 65,
  },
  {
    field: 'dataSedinta',
    headerName: 'Data',
    flex: 0.3,
    // renderCell: ({ value }) => <TextWithTooltip text={value} />,
    minWidth: 90,
    valueFormatter: (params) => formatDate(params.value),
  },
  {
    field: 'autori',
    headerName: 'Autor',
    flex: 0.4,
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
    minWidth: 100,
  },
  {
    field: 'question',
    headerName: 'Întrebarea adresată',
    flex: 1,
    sortable: false,
    // renderCell: ({ value }) => <TextWithTooltip text={value} />,
    minWidth: 400,
  },
  {
    field: 'institution',
    headerName: 'Instituția vizată',
    flex: 0.4,
    sortable: false,
    // renderCell: ({ value }) => <TextWithTooltip text={value} />,
    minWidth: 100,
  },
  {
    field: 'answerType',
    headerName: 'Forma răspunsului',
    flex: 0.3,
    sortable: false,
    // renderCell: ({ value }) => <TextWithTooltip text={value} />,
    minWidth: 120,
  },
  {
    field: 'answerFile',
    headerName: 'Răspunsul oferit',
    flex: 0.3,
    sortable: false,
    renderCell: ({ value }) =>
      value && (
        <Link href={value} target='_blank'>
          Vezi răspunsul
        </Link>
      ),
    minWidth: 110,
  },
];

const interpellationsTableColumns: GridColumns<GridValidRowModel> = [
  {
    field: 'id',
    headerName: 'Nr',
    flex: 0.1,
    // renderCell: ({ value }) => <TextWithTooltip text={value} />,
    minWidth: 65,
  },
  {
    field: 'dataSedinta',
    headerName: 'Data',
    flex: 0.4,
    // renderCell: ({ value }) => <TextWithTooltip text={value} />,
    minWidth: 90,
    valueFormatter: (params) => formatDate(params.value),
  },
  {
    field: 'autori',
    headerName: 'Autorii interpelării',
    flex: 0.4,
    sortable: false,
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
    minWidth: 120,
  },
  {
    field: 'interpellation',
    headerName: 'Interpelarea',
    flex: 1,
    // renderCell: ({ value }) => <TextWithTooltip text={value} />,
    minWidth: 400,
  },
  {
    field: 'institution',
    headerName: 'Instituția vizată',
    flex: 0.3,
    sortable: false,
    // renderCell: ({ value }) => <TextWithTooltip text={value} />,
    minWidth: 110,
  },
  {
    field: 'answerType',
    headerName: 'Răspunsul Guvernului',
    flex: 0.4,
    sortable: false,
    renderCell: ({ value }) =>
      value && (
        <Link href={value} target='_blank'>
          Vezi răspunsul
        </Link>
      ),
    minWidth: 120,
  },
];

export function ControlQuestions() {
  const { tabValue, handleTabChange } = useTabs();

  const { data: questions, isInitialLoading: isLoadingQuestions } =
    useCommitteeQuestionsByLegislatureQuery({
      enabled: tabValue === 0,
      refetchOnMount: false,
    });

  const { data: interpellations, isInitialLoading: isLoadingInterpellations } =
    useCommitteeInterpellationsByLegislatureQuery({
      enabled: tabValue === 1,
      refetchOnMount: false,
    });

  const questionsData = useMemo(
    () =>
      questions?.map((question, index) => ({
        ...question,
        id: (index + 1).toString(),
      })) ?? [],
    [questions],
  );

  const interpellationsData = useMemo(
    () =>
      interpellations?.map((interpellation, index) => ({
        ...interpellation,
        id: (index + 1).toString(),
      })) ?? [],
    [interpellations],
  );

  return (
    <Stack gap={6} mt={9}>
      <SecondaryTabs
        onChange={handleTabChange}
        scrollButtons='auto'
        value={tabValue}
      >
        <SecondaryTab label='Întrebări' />
        <SecondaryTab label='Interpelări' />
      </SecondaryTabs>

      {tabValue === 0 && (
        <Table
          columns={questionsTableColumns}
          height='auto'
          isLoading={isLoadingQuestions}
          getRowHeight={() => 'auto'}
          getRowId={(row) => row.docid}
          hideFooter={!questionsData.length}
          rows={questionsData}
          showSearch
        />
      )}
      {tabValue === 1 && (
        <Table
          columns={interpellationsTableColumns}
          height='auto'
          isLoading={isLoadingInterpellations}
          getRowHeight={() => 'auto'}
          getRowId={(row) => row.docid}
          hideFooter={!interpellationsData?.length}
          rows={interpellationsData}
          showSearch
        />
      )}
    </Stack>
  );
}
