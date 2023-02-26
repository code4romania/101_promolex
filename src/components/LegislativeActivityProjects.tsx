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

export function LegislativeActivityProjects() {
  const {
    fromDate,
    onFromDateChange,
    onToDateChange,
    registeredProjects,
    toDate,
  } = useRegisteredProjects();

  const { data: registeredProjectsByType } =
    useRegisteredProjectsStatisticsQuery<'proiect_act'>(
      {
        key: 'proiect_act',
        from: getDateString(fromDate),
        to: getDateString(toDate),
      },
      { enabled: Boolean(fromDate && toDate) },
    );

  const { data: registeredProjectsByAuthor } =
    useRegisteredProjectsStatisticsQuery<'autor'>(
      {
        key: 'autor',
        from: getDateString(fromDate),
        to: getDateString(toDate),
      },
      { enabled: Boolean(fromDate && toDate) },
    );

  const { data: registeredProjectsByFid } =
    useRegisteredProjectsStatisticsQuery<'fid'>(
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
            title='Tipul proiectului'
          />
        </Grid>
        <Grid item xs lg={6}>
          <StatisticsPieChart
            data={projectsByAuthorChartData}
            title='Autorii inițiativelor legislative'
          />
        </Grid>
        <Grid item xs lg={6}>
          <StatisticsPieChart
            data={projectsByFactionChartData}
            title='Inițiative legislative ale deputaților'
          />
        </Grid>
      </Grid>
    </LegislativeActivityWrapper>
  );
}
