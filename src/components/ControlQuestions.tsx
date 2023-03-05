import { Stack } from '@mui/material';
import { GridColumns, GridValidRowModel } from '@mui/x-data-grid';
import { useTabs } from '../hooks';
import { SecondaryTab, SecondaryTabs } from './SecondaryTabs';
import { Table } from './Table';

const questionsTableColumns: GridColumns<GridValidRowModel> = [
  {
    field: 'nrProiect',
    headerName: 'Nr d/o',
    flex: 0.3,
    sortable: false,
  },
  {
    field: 'dataReg',
    headerName: 'Data',
    flex: 0.4,
  },
  {
    field: 'autor',
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
    field: 'responseType',
    headerName: 'Forma răspunsului',
    flex: 0.3,
    sortable: false,
  },
  {
    field: 'response',
    headerName: 'Răspunsul oferit',
    flex: 0.3,
    sortable: false,
  },
];

const interpellationsTableColumns: GridColumns<GridValidRowModel> = [
  {
    field: 'nrProiect',
    headerName: 'Nr d/o',
    flex: 0.3,
    sortable: false,
  },
  {
    field: 'dataReg',
    headerName: 'Data',
    flex: 0.4,
  },
  {
    field: 'interpellation',
    headerName: 'Interpelarea',
    flex: 1,
  },
  {
    field: 'autorii',
    headerName: 'Autorii interpelării',
    flex: 0.4,
    sortable: false,
  },
  {
    field: 'response',
    headerName: 'Răspunsul Guvernului',
    flex: 0.4,
    sortable: false,
  },
];

const mockQuestionsData = [
  {
    id: '1',
    nrProiect: '1',
    dataReg: '01.01.2021',
    autor: 'Autor 1',
    question: 'Întrebarea 1',
    institution: 'Instituția 1',
    responseType: 'Forma 1',
    response: 'Răspunsul 1',
  },
  {
    id: '2',
    nrProiect: '2',
    dataReg: '02.01.2021',
    autor: 'Autor 2',
    question: 'Întrebarea 2',
    institution: 'Instituția 2',
    responseType: 'Forma 2',
    response: 'Răspunsul 2',
  },
  {
    id: '3',
    nrProiect: '3',
    dataReg: '03.01.2021',
    autor: 'Autor 3',
    question: 'Întrebarea 3',
    institution: 'Instituția 3',
    responseType: 'Forma 3',
    response: 'Răspunsul 3',
  },
  {
    id: '4',
    nrProiect: '4',
    dataReg: '04.01.2021',
    autor: 'Autor 4',
    question: 'Întrebarea 4',
    institution: 'Instituția 4',
    responseType: 'Forma 4',
    response: 'Răspunsul 4',
  },
  {
    id: '5',
    nrProiect: '5',
    dataReg: '05.01.2021',
    autor: 'Autor 5',
    question: 'Întrebarea 5',
    institution: 'Instituția 5',
    responseType: 'Forma 5',
    response: 'Răspunsul 5',
  },
  {
    id: '6',
    nrProiect: '6',
    dataReg: '06.01.2021',
    autor: 'Autor 6',
    question: 'Întrebarea 6',
    institution: 'Instituția 6',
    responseType: 'Forma 6',
    response: 'Răspunsul 6',
  },
  {
    id: '7',
    nrProiect: '7',
    dataReg: '07.01.2021',
    autor: 'Autor 7',
    question: 'Întrebarea 7',
    institution: 'Instituția 7',
    responseType: 'Forma 7',
    response: 'Răspunsul 7',
  },
];

const mockInterpellationsData = [
  {
    id: '1',
    nrProiect: '1',
    dataReg: '01.01.2021',
    interpellation: 'Interpelarea 1',
    autorii: 'Autorii 1',
    response: 'Răspunsul 1',
  },
  {
    id: '2',
    nrProiect: '2',
    dataReg: '02.01.2021',
    interpellation: 'Interpelarea 2',
    autorii: 'Autorii 2',
    response: 'Răspunsul 2',
  },
  {
    id: '3',
    nrProiect: '3',
    dataReg: '03.01.2021',
    interpellation: 'Interpelarea 3',
    autorii: 'Autorii 3',
    response: 'Răspunsul 3',
  },
  {
    id: '4',
    nrProiect: '4',
    dataReg: '04.01.2021',
    interpellation: 'Interpelarea 4',
    autorii: 'Autorii 4',
    response: 'Răspunsul 4',
  },
  {
    id: '5',
    nrProiect: '5',
    dataReg: '05.01.2021',
    interpellation: 'Interpelarea 5',
    autorii: 'Autorii 5',
    response: 'Răspunsul 5',
  },
  {
    id: '6',
    nrProiect: '6',
    dataReg: '06.01.2021',
    interpellation: 'Interpelarea 6',
    autorii: 'Autorii 6',
    response: 'Răspunsul 6',
  },
  {
    id: '7',
    nrProiect: '7',
    dataReg: '07.01.2021',
    interpellation: 'Interpelarea 7',
    autorii: 'Autorii 7',
    response: 'Răspunsul 7',
  },
];

export function ControlQuestions() {
  const { tabValue, handleTabChange } = useTabs();

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
          getRowId={(row) => row.id}
          hideFooter={!mockQuestionsData?.length}
          pageSize={5}
          rows={mockQuestionsData}
          showSearch
        />
      )}
      {tabValue === 1 && (
        <Table
          columns={interpellationsTableColumns}
          height={510}
          getRowId={(row) => row.id}
          hideFooter={!mockInterpellationsData?.length}
          pageSize={5}
          rows={mockInterpellationsData}
          showSearch
        />
      )}
    </Stack>
  );
}
