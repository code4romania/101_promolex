import { Stack } from '@mui/material';
import { GridColumns, GridValidRowModel } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { useTabs } from '../hooks';
import {
  useCommitteeInterpellationsByLegislatureQuery,
  useCommitteeQuestionsByLegislatureQuery,
} from '../queries';
import { SecondaryTab, SecondaryTabs } from './SecondaryTabs';
import { Table } from './Table';

const questionsTableColumns: GridColumns<GridValidRowModel> = [
  {
    field: 'docid',
    headerName: 'Nr d/o',
    flex: 0.2,
    sortable: false,
  },
  {
    field: 'dataSedinta',
    headerName: 'Data',
    flex: 0.3,
  },
  {
    field: 'autori',
    headerName: 'Autor',
    flex: 0.4,
  },
  {
    field: 'question',
    headerName: 'Întrebarea adresată',
    flex: 1,
    sortable: false,
  },
  {
    field: 'institution',
    headerName: 'Instituția vizată',
    flex: 0.3,
    sortable: false,
  },
  {
    field: 'answerType',
    headerName: 'Forma răspunsului',
    flex: 0.3,
    sortable: false,
  },
  {
    field: 'answerFile',
    headerName: 'Răspunsul oferit',
    flex: 0.3,
    sortable: false,
  },
];

const interpellationsTableColumns: GridColumns<GridValidRowModel> = [
  {
    field: 'docid',
    headerName: 'Nr d/o',
    flex: 0.3,
    sortable: false,
  },
  {
    field: 'dataSedinta',
    headerName: 'Data',
    flex: 0.4,
  },
  {
    field: 'autori',
    headerName: 'Autorii interpelării',
    flex: 0.4,
    sortable: false,
  },
  {
    field: 'interpellation',
    headerName: 'Interpelarea',
    flex: 1,
  },
  {
    field: 'institution',
    headerName: 'Instituția vizată',
    flex: 0.3,
    sortable: false,
  },
  {
    field: 'answerType',
    headerName: 'Forma răspunsului',
    flex: 0.3,
    sortable: false,
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
      questions?.map((question) => ({
        ...question,
        autori: question.autori.map(({ fullName }) => fullName).join(', '),
      })) ?? [],
    [questions],
  );

  const interpellationsData = useMemo(
    () =>
      interpellations?.map((question) => ({
        ...question,
        autori: question.autori.map(({ fullName }) => fullName).join(', '),
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
          height={510}
          isLoading={isLoadingQuestions}
          getRowId={(row) => row.docid}
          hideFooter={!questionsData.length}
          pageSize={5}
          rows={questionsData}
          showSearch
        />
      )}
      {tabValue === 1 && (
        <Table
          columns={interpellationsTableColumns}
          height={510}
          isLoading={isLoadingInterpellations}
          getRowId={(row) => row.docid}
          hideFooter={!interpellationsData?.length}
          pageSize={5}
          rows={interpellationsData}
          showSearch
        />
      )}
    </Stack>
  );
}
