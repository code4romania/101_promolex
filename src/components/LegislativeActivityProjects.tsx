import { Grid } from '@mui/material';
import { LegislativeActivityWrapper, StatisticsPieChart } from '.';
import { useRegisteredProjects } from '../hooks';
import { useRegisteredProjectsStatisticsQuery } from '../queries';
import {
  getDateString,
  getProjectsByAuthorChartData,
  getProjectsByFactionChartData,
  getProjectsByTypeChartData,
} from '../utils';
import { StatisticsDoughnutChart } from './StatisticsDoughnutChart';

export function LegislativeActivityProjects() {
  const {
    fromDate,
    onFromDateChange,
    onToDateChange,
    registeredProjects,
    toDate,
  } = useRegisteredProjects();

  const {
    data: registeredProjectsByType,
    isFetching: isLoadingRegisteredProjectsByType,
  } = useRegisteredProjectsStatisticsQuery<'proiect_act'>(
    {
      key: 'proiect_act',
      from: getDateString(fromDate),
      to: getDateString(toDate),
    },
    { enabled: Boolean(fromDate && toDate) },
  );

  const {
    data: registeredProjectsByAuthor,
    isFetching: isLoadingRegisteredProjectsByAuthor,
  } = useRegisteredProjectsStatisticsQuery<'autor'>(
    {
      key: 'autor',
      from: getDateString(fromDate),
      to: getDateString(toDate),
    },
    { enabled: Boolean(fromDate && toDate) },
  );

  const {
    data: registeredProjectsByFid,
    isFetching: isLoadingRegisteredProjectsByFid,
  } = useRegisteredProjectsStatisticsQuery<'fid'>(
    {
      key: 'fid',
      from: getDateString(fromDate),
      to: getDateString(toDate),
    },
    { enabled: Boolean(fromDate && toDate) },
  );

  const projectsByTypeChartData = getProjectsByTypeChartData(
    registeredProjectsByType ?? [],
  );

  const projectsByAuthorChartData = getProjectsByAuthorChartData(
    registeredProjectsByAuthor ?? [],
  );

  const projectsByFactionChartData = getProjectsByFactionChartData(
    registeredProjectsByFid ?? [],
  );

  return (
    <LegislativeActivityWrapper
      fromDate={fromDate}
      onFromDateChange={onFromDateChange}
      onToDateChange={onToDateChange}
      registeredProjects={registeredProjects ?? []}
      toDate={toDate}
    >
      <Grid container columnSpacing={8} justifyContent='center' rowSpacing={6}>
        <Grid item xs lg={6}>
          <StatisticsPieChart
            data={projectsByTypeChartData}
            isLoading={isLoadingRegisteredProjectsByType}
            title='Tipul proiectului'
          />
        </Grid>
        <Grid item xs lg={6}>
          <StatisticsPieChart
            data={projectsByAuthorChartData}
            isLoading={isLoadingRegisteredProjectsByAuthor}
            title='Autorii inițiativelor legislative'
          />
        </Grid>
        <Grid item xs lg={6}>
          <StatisticsDoughnutChart
            data={projectsByFactionChartData}
            isLoading={isLoadingRegisteredProjectsByFid}
            height={380}
            title='Inițiative legislative ale deputaților'
          />
        </Grid>
      </Grid>
    </LegislativeActivityWrapper>
  );
}
