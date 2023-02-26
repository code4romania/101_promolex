import { ChartData } from 'chart.js';
import { useMemo } from 'react';
import { useRegisteredProjects } from '../hooks';
import {
  useCurrentLegislatureQuery,
  useRegisteredProjectsStatisticsQuery,
} from '../queries';
import { LegislativeActivityWrapper } from './LegislativeActivityWrapper';
import { StatisticsDoughnutChart } from './StatisticsDoughnutChart';

const colors = [
  '#A7CAB1',
  '#F4ECD6',
  '#88B7B5',
  '#D4DDBA',
  '#88A9B5',
  '#3868D7',
  '#BAE2F1',
  '#E3F7FF',
];

export function LegislativeActivityDomains() {
  const { data: lid } = useCurrentLegislatureQuery();
  const { data: registeredProjectsByDomain } =
    useRegisteredProjectsStatisticsQuery<'domeniul'>({
      key: 'domeniul',
      lid,
    });
  const {
    fromDate,
    onFromDateChange,
    onToDateChange,
    registeredProjects,
    toDate,
  } = useRegisteredProjects();

  const chartData = useMemo<ChartData<'doughnut', number[], string>>(() => {
    const filteredDomains = registeredProjectsByDomain?.filter(
      ({ total }) => parseInt(total, 10) > 50,
    );
    const labels = filteredDomains?.map(({ domeniul }) => domeniul);
    const data = filteredDomains?.map(({ total }) => parseInt(total, 10)) ?? [];

    return {
      labels,
      datasets: [
        {
          label: 'Total proiecte',
          data,
          backgroundColor: colors,
        },
      ],
    };
  }, [registeredProjectsByDomain]);

  return (
    <LegislativeActivityWrapper
      fromDate={fromDate}
      onFromDateChange={onFromDateChange}
      onToDateChange={onToDateChange}
      registeredProjects={registeredProjects ?? []}
      toDate={toDate}
    >
      <StatisticsDoughnutChart
        data={chartData}
        height={460}
        title='Domeniile proiectelor'
      />
    </LegislativeActivityWrapper>
  );
}
