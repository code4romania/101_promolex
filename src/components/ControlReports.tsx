import { MenuItem, Select, Stack, Typography } from '@mui/material';
import { GridColumns, GridValidRowModel } from '@mui/x-data-grid';
import { first } from 'lodash';
import { SyntheticEvent, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  useCommitteeHearingReportsByLegislatureQuery,
  useCommitteeInstitutionReportsByLegislatureQuery,
  useCommitteeReportsYearsQuery,
} from '../queries';
import { Routes } from '../types';
import { formatDate } from '../utils';
import { SecondaryTab, SecondaryTabs } from './SecondaryTabs';
import { StyledRouterLink } from './StyledRouterLink';
import { Table } from './Table';

const publicReportsTableColumns: GridColumns<GridValidRowModel> = [
  {
    field: 'autPublica',
    headerName: 'Autoritatea publică',
    flex: 0.4,
    // renderCell: ({ value }) => <TextWithTooltip text={value} />,
    minWidth: 130,
  },
  {
    field: 'tipRaport',
    headerName: 'Tipul raportului',
    flex: 0.4,
    sortable: false,
    // renderCell: ({ value }) => <TextWithTooltip text={value} />,
    minWidth: 400,
  },
  {
    field: 'termenPrezentare',
    headerName: 'Termenul de prezentare',
    flex: 0.4,
    sortable: false,
    // renderCell: ({ value }) => <TextWithTooltip text={value} />,
    minWidth: 140,
  },
  {
    field: 'prevederiLegale',
    headerName: 'Prevederi legale',
    flex: 0.4,
    sortable: false,
    // renderCell: ({ value }) => <TextWithTooltip text={value} />,
    minWidth: 130,
  },
  {
    field: 'dataPrezentarii',
    headerName: 'Data prezentării',
    flex: 0.3,
    // renderCell: ({ value }) => <TextWithTooltip text={value} />,
    minWidth: 110,
    valueFormatter: (params) => formatDate(params.value),
  },
];

const reportsAuditingTableColumns: GridColumns<GridValidRowModel> = [
  {
    field: 'autPublica',
    headerName: 'Autoritatea publică',
    flex: 0.4,
    // renderCell: ({ value }) => <TextWithTooltip text={value} />,
    minWidth: 130,
  },
  {
    field: 'tematica',
    headerName: 'Tematică',
    flex: 1,
    sortable: false,
    // renderCell: ({ value }) => <TextWithTooltip text={value} />,
    minWidth: 400,
  },
  {
    field: 'dataSedinta',
    headerName: 'Data ședinței plenare',
    flex: 0.3,
    // renderCell: ({ value }) => <TextWithTooltip text={value} />,
    minWidth: 130,
    renderCell: ({ value }) =>
      !value ? (
        '-'
      ) : (
        <StyledRouterLink
          to={{
            pathname: Routes.PlenaryMeetings,
            search: `?session=${value}`,
          }}
          target='_blank'
        >
          {formatDate(value)}
        </StyledRouterLink>
      ),
  },
];

export function ControlReports() {
  const [params, setParams] = useSearchParams();
  const tabValue = parseInt(params.get('secondaryTab') ?? '0', 10);
  const [selectedInstitutionReportsYear, setSelectedInstitutionReportsYear] =
    useState('');
  const [selectedHearingReportsYear, setSelectedHearingReportsYear] =
    useState('');

  const { data: institutionReportYears } = useCommitteeReportsYearsQuery(
    'Rapoartele instituțiilor publice',
    {
      enabled: tabValue === 0,
      onSuccess: (data) => {
        const firstYear = first(data);
        setSelectedInstitutionReportsYear(firstYear?.reportYear ?? '');
      },
    },
  );

  const { data: hearingReportYears } = useCommitteeReportsYearsQuery(
    'Audierea în plen a rapoartelor',
    {
      enabled: tabValue === 1,
      onSuccess: (data) => {
        const firstYear = first(data);
        setSelectedHearingReportsYear(firstYear?.reportYear ?? '');
      },
    },
  );

  const {
    data: institutionReports,
    isInitialLoading: isLoadingInstitutionReports,
  } = useCommitteeInstitutionReportsByLegislatureQuery(
    selectedInstitutionReportsYear,
    {
      enabled: !!selectedInstitutionReportsYear,
      refetchOnMount: false,
    },
  );

  const institutionReportsData = useMemo(
    () =>
      institutionReports?.map((report, index) => ({ ...report, id: index })) ??
      [],
    [institutionReports],
  );

  const { data: hearingReports, isInitialLoading: isLoadingHearingReports } =
    useCommitteeHearingReportsByLegislatureQuery(selectedHearingReportsYear, {
      enabled: !!selectedHearingReportsYear,
      refetchOnMount: false,
    });

  const hearingReportsData = useMemo(
    () =>
      hearingReports?.map((report, index) => ({ ...report, id: index })) ?? [],
    [hearingReports],
  );

  const handleTabChange = (_: SyntheticEvent, newValue: number) => {
    setParams({
      tab: params.get('tab') ?? '2',
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
        <SecondaryTab label='Rapoartele instituțiilor publice' />
        <SecondaryTab label='Audierea în plen a rapoartelor' />
      </SecondaryTabs>

      {tabValue === 0 && (
        <>
          <Stack alignItems='center' direction='row' gap={2}>
            <Typography>Selectează anul</Typography>
            <Select
              defaultValue={institutionReportYears?.[0] ?? ''}
              labelId='year'
              onChange={(event) => {
                setSelectedInstitutionReportsYear(event.target.value as string);
              }}
              value={selectedInstitutionReportsYear}
            >
              {institutionReportYears?.map(({ reportYear }) => (
                <MenuItem key={reportYear} value={reportYear}>
                  {reportYear}
                </MenuItem>
              ))}
            </Select>
          </Stack>
          <Table
            columns={publicReportsTableColumns}
            height='auto'
            isLoading={isLoadingInstitutionReports}
            getRowHeight={() => 'auto'}
            getRowId={(row) => row.id}
            hideFooter={!institutionReportsData.length}
            rows={institutionReportsData}
          />
        </>
      )}
      {tabValue === 1 && (
        <>
          <Stack alignItems='center' direction='row' gap={2}>
            <Typography>Selectează anul</Typography>
            <Select
              defaultValue={hearingReportYears?.[0] ?? ''}
              labelId='year'
              onChange={(event) => {
                setSelectedHearingReportsYear(event.target.value as string);
              }}
              value={selectedHearingReportsYear}
            >
              {hearingReportYears?.map(({ reportYear }) => (
                <MenuItem key={reportYear} value={reportYear}>
                  {reportYear}
                </MenuItem>
              ))}
            </Select>
          </Stack>
          <Table
            columns={reportsAuditingTableColumns}
            height='auto'
            isLoading={isLoadingHearingReports}
            getRowHeight={() => 'auto'}
            getRowId={(row) => row.id}
            hideFooter={!hearingReportsData.length}
            rows={hearingReportsData}
          />
        </>
      )}
    </Stack>
  );
}
