import { Grid } from '@mui/material';
import { ChartData } from 'chart.js';
import { useMemo } from 'react';
import { LegislativeActivityWrapper, StatisticsBarChart } from '.';
import { useRegisteredProjects } from '../hooks';
import { useRegisteredProjectsStatisticsQuery } from '../queries';
import { getDateString, getProjectsByStatuteAndTypeChartData } from '../utils';

export function LegislativeActivityStatute() {
  const {
    fromDate,
    onFromDateChange,
    onToDateChange,
    registeredProjects,
    toDate,
  } = useRegisteredProjects();

  const { data: projectsInExaminationData } =
    useRegisteredProjectsStatisticsQuery<'proiect_act'>(
      {
        key: 'proiect_act',
        from: getDateString(fromDate),
        to: getDateString(toDate),
        statut_proiect: 'În examinare',
      },
      { enabled: Boolean(fromDate && toDate) },
    );

  const projectsInExamination = getProjectsByStatuteAndTypeChartData(
    projectsInExaminationData ?? [],
    'În examinare',
  );

  const { data: projectsPassedData } =
    useRegisteredProjectsStatisticsQuery<'proiect_act'>(
      {
        key: 'proiect_act',
        from: getDateString(fromDate),
        to: getDateString(toDate),
        statut_proiect: 'Adoptat',
      },
      { enabled: Boolean(fromDate && toDate) },
    );

  const projectsPassed = getProjectsByStatuteAndTypeChartData(
    projectsPassedData ?? [],
    'Adoptate',
  );

  const { data: projectsRejectedData } =
    useRegisteredProjectsStatisticsQuery<'proiect_act'>(
      {
        key: 'proiect_act',
        from: getDateString(fromDate),
        to: getDateString(toDate),
        statut_proiect: 'Respins',
      },
      { enabled: Boolean(fromDate && toDate) },
    );

  const projectsRejected = getProjectsByStatuteAndTypeChartData(
    projectsRejectedData ?? [],
    'Respinse',
  );

  const { data: projectsMergedData } =
    useRegisteredProjectsStatisticsQuery<'proiect_act'>(
      {
        key: 'proiect_act',
        from: getDateString(fromDate),
        to: getDateString(toDate),
        statut_proiect: 'Comasat',
      },
      { enabled: Boolean(fromDate && toDate) },
    );

  const projectsMerged = getProjectsByStatuteAndTypeChartData(
    projectsMergedData ?? [],
    'Comasate',
  );

  const { data: projectsRetractedData } =
    useRegisteredProjectsStatisticsQuery<'proiect_act'>(
      {
        key: 'proiect_act',
        from: getDateString(fromDate),
        to: getDateString(toDate),
        statut_proiect: 'Retras',
      },
      { enabled: Boolean(fromDate && toDate) },
    );

  const projectsRetracted = getProjectsByStatuteAndTypeChartData(
    projectsRetractedData ?? [],
    'Retrase',
  );

  const { data: projectsByLecturesData } =
    useRegisteredProjectsStatisticsQuery<'lectura'>(
      {
        key: 'lectura',
        from: getDateString(fromDate),
        to: getDateString(toDate),
        statut_proiect: 'În examinare',
      },
      { enabled: Boolean(fromDate && toDate) },
    );

  const projectsByLectures = useMemo<
    ChartData<'bar', (number | undefined)[], string> | undefined
  >(() => {
    const colors = ['#82969D', '#16697A', '#489FB5', '#82C0CC'];
    return {
      labels: ['Proiecte'],
      datasets:
        projectsByLecturesData?.map(({ lectura, total }, index) => ({
          label: lectura,
          data: [parseInt(total, 10)],
          backgroundColor: colors[index],
        })) ?? [],
    };
  }, [projectsByLecturesData]);

  return (
    <LegislativeActivityWrapper
      fromDate={fromDate}
      onFromDateChange={onFromDateChange}
      onToDateChange={onToDateChange}
      registeredProjects={registeredProjects ?? []}
      toDate={toDate}
    >
      <Grid container columnSpacing={6} justifyContent='center' rowSpacing={6}>
        <Grid item xs lg={4}>
          <StatisticsBarChart
            data={projectsInExamination}
            title='Proiecte în examinare'
          />
        </Grid>
        <Grid item xs lg={4}>
          <StatisticsBarChart data={projectsPassed} title='Proiecte adoptate' />
        </Grid>
        <Grid item xs lg={4}>
          <StatisticsBarChart
            data={projectsRejected}
            title='Proiecte respinse'
          />
        </Grid>
        <Grid item xs lg={4}>
          <StatisticsBarChart data={projectsMerged} title='Proiecte comasate' />
        </Grid>
        <Grid item xs lg={4}>
          <StatisticsBarChart
            data={projectsRetracted}
            title='Proiecte retrase'
          />
        </Grid>
        <Grid item xs lg={8}>
          <StatisticsBarChart
            data={projectsByLectures}
            title='Etapele proiectelor de legi aflate în examinare'
          />
        </Grid>
      </Grid>
    </LegislativeActivityWrapper>
  );
}
