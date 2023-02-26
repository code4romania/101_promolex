import { Grid } from '@mui/material';
import { ChartData } from 'chart.js';
import { has } from 'lodash';
import { useMemo } from 'react';
import { LegislativeActivityWrapper, StatisticsBarChart } from '.';
import { useRegisteredProjects } from '../hooks';
import { getProjectsByStatuteAndTypeChartData } from '../utils';

export function LegislativeActivityStatute() {
  const {
    fromDate,
    onFromDateChange,
    onToDateChange,
    registeredProjects,
    registeredProjectsByFirstLecture,
    registeredProjectsBySecondLecture,
    registeredProjectsByThirdLecture,
    toDate,
  } = useRegisteredProjects();

  const projectsByLectures = useMemo<
    ChartData<'bar', (number | undefined)[], string>
  >(() => {
    const firstLectureCount = registeredProjectsByFirstLecture?.length;
    const secondLectureCount = registeredProjectsBySecondLecture?.length;
    const thirdLectureCount = registeredProjectsByThirdLecture?.length;

    return {
      labels: ['Proiecte'],
      datasets: [
        {
          label: 'I lectură',
          data: [firstLectureCount],
          backgroundColor: '#16697A',
        },
        {
          label: 'a II-a lectură',
          data: [secondLectureCount],
          backgroundColor: '#489FB5',
        },
        {
          label: 'a III-a lectură',
          data: [thirdLectureCount],
          backgroundColor: '#82C0CC',
        },
      ],
    };
  }, [
    registeredProjectsByFirstLecture?.length,
    registeredProjectsBySecondLecture?.length,
    registeredProjectsByThirdLecture?.length,
  ]);

  if (has(registeredProjects, 'error')) {
    return null;
  }

  const projectsInExamination = getProjectsByStatuteAndTypeChartData(
    registeredProjects ?? [],
    'în examinare',
    'În examinare',
  );
  const projectsPassed = getProjectsByStatuteAndTypeChartData(
    registeredProjects ?? [],
    'adoptat',
    'Adoptate',
  );
  const projectsRejected = getProjectsByStatuteAndTypeChartData(
    registeredProjects ?? [],
    'respins',
    'Respinse',
  );
  const projectsMerged = getProjectsByStatuteAndTypeChartData(
    registeredProjects ?? [],
    'comasat',
    'Comasate',
  );
  const projectsRetracted = getProjectsByStatuteAndTypeChartData(
    registeredProjects ?? [],
    'retras',
    'Retrase',
  );

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
          {/* @todo missing data for project phases. Ask from API */}
          <StatisticsBarChart
            data={projectsByLectures}
            title='Etapele proiectelor de legi aflate în examinare'
          />
        </Grid>
      </Grid>
    </LegislativeActivityWrapper>
  );
}
