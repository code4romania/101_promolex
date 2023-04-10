import { Link, Stack } from '@mui/material';
import { GridColumns, GridValidRowModel } from '@mui/x-data-grid';
import { chain } from 'lodash';
import { useMemo } from 'react';
import { useTabs } from '../hooks';
import { useDeputyQuestionsAndInterpellations } from '../queries';
import { formatDate } from '../utils';
import { SecondaryTab, SecondaryTabs } from './SecondaryTabs';
import { Table } from './Table';

const questionsTableColumns: GridColumns<GridValidRowModel> = [
  {
    field: 'id',
    headerName: 'Nr',
    flex: 0.1,
    minWidth: 65,
  },
  {
    field: 'sessionDate',
    headerName: 'Data',
    flex: 0.3,
    minWidth: 90,
    valueFormatter: (params) => formatDate(params.value),
  },
  {
    field: 'quest',
    headerName: 'Întrebarea adresată',
    flex: 1,
    sortable: false,
    minWidth: 400,
  },
  {
    field: 'institution',
    headerName: 'Instituția vizată',
    flex: 0.4,
    sortable: false,
    minWidth: 100,
  },
  {
    field: 'answer',
    headerName: 'Răspunsul oferit',
    flex: 0.3,
    sortable: false,
    renderCell: ({ value }) =>
      value && typeof value === 'string' && value.startsWith('http') ? (
        <Link href={value} target='_blank'>
          Vezi răspunsul
        </Link>
      ) : (
        value
      ),
    minWidth: 110,
  },
];

type DeputyQuestionsDetailsProps = {
  did?: string;
};

export function DeputyQuestionsDetails({ did }: DeputyQuestionsDetailsProps) {
  const { tabValue, handleTabChange } = useTabs();

  const { data, isInitialLoading } = useDeputyQuestionsAndInterpellations(did);

  const questions = useMemo(
    () =>
      chain(data)
        .filter(({ type }) => type === 'intrebare')
        .map((question, index) => ({
          ...question,
          id: (index + 1).toString(),
        }))
        .value() ?? [],
    [data],
  );

  const interpellations = useMemo(
    () =>
      chain(data)
        .filter(({ type }) => type === 'interpelare')
        .map((interpellation, index) => ({
          ...interpellation,
          id: (index + 1).toString(),
        }))
        .value() ?? [],
    [data],
  );

  return (
    <Stack>
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
          height={510}
          isLoading={isInitialLoading}
          getRowHeight={() => 'auto'}
          getRowId={(row) => row.id}
          hideFooter={!questions.length}
          rows={questions}
          showSearch
        />
      )}
      {tabValue === 1 && (
        <Table
          columns={questionsTableColumns}
          height={510}
          isLoading={isInitialLoading}
          getRowHeight={() => 'auto'}
          getRowId={(row) => row.id}
          hideFooter={!interpellations?.length}
          rows={interpellations}
          showSearch
        />
      )}
    </Stack>
  );
}

DeputyQuestionsDetails.defaultProps = {
  did: undefined,
};
