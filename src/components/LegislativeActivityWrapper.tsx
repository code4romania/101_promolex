import FindInPageIcon from '@mui/icons-material/FindInPage';
import { IconButton, Stack } from '@mui/material';
import { uniqueId } from 'lodash';
import { Fragment, PropsWithChildren, useMemo, useState } from 'react';
import { LegislationInitiative } from '../types';
import { legislationInitiativesTableColumns } from '../utils';
import { DetailsDialog } from './DetailsDialog';
import { LegislationInitiativeDetails } from './LegislationInitiativeDetails';
import { Table } from './Table';

type LegislativeActivityWrapperProps = {
  fromDate: Date;
  onFromDateChange: (date: Date | null) => void;
  onToDateChange: (date: Date | null) => void;
  registeredProjects: LegislationInitiative[];
  toDate: Date;
};

export function LegislativeActivityWrapper({
  children,
  fromDate,
  onFromDateChange,
  onToDateChange,
  registeredProjects,
  toDate,
}: PropsWithChildren<LegislativeActivityWrapperProps>) {
  const [docId, setDocId] = useState('');
  const extendedColumns = useMemo(
    () => [
      ...legislationInitiativesTableColumns,
      {
        field: 'details',
        headerName: 'Detalii',
        sortable: false,
        flex: 0.2,
        renderCell: ({ row }) => (
          <IconButton onClick={() => setDocId(row.docid)}>
            <FindInPageIcon />
          </IconButton>
        ),
      },
    ],
    [],
  );

  return (
    <>
      <Stack gap={8} pt={8}>
        {children}
        <Table
          columns={extendedColumns}
          fromDate={fromDate}
          height={510}
          getRowId={(row) => row.docid ?? uniqueId()}
          onFromDateChange={onFromDateChange}
          onToDateChange={onToDateChange}
          pageSize={5}
          rows={registeredProjects}
          showSearch
          showDatePickers
          toDate={toDate}
        />
      </Stack>
      <DetailsDialog open={Boolean(docId)} handleClose={() => setDocId('')}>
        <LegislationInitiativeDetails docId={docId} />
      </DetailsDialog>
    </>
  );
}
