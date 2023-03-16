import { ChartData } from 'chart.js';
import { chain, groupBy, keys, values } from 'lodash';
import { RegisteredProjectsStatistics } from '../types';

const factionsMap = [
  {
    color: '#FACC15',
    key: '1',
    label: 'Partidul Acțiune și Solidaritate',
  },
  { color: '#DC2626', key: '2', label: 'Blocul Comuniștilor și Socialiștilor' },
  { color: '#16A34A', key: '3', label: 'Partidul Politic "ȘOR"' },
];

export const getProjectsByFactionChartData = (
  projects: RegisteredProjectsStatistics<'fid'>[],
): ChartData<'doughnut', number[], string> => {
  const projectsByFid = groupBy(projects, 'fid');

  const sortedProjectTypeMap = chain(factionsMap)
    .sortBy(({ key }) => keys(projectsByFid).indexOf(key))
    .value();

  const labels: string[] = sortedProjectTypeMap.map(({ label }) => label);

  return {
    labels,
    datasets: [
      {
        label: 'Nr. proiecte',
        data: values(projects).map((p) => parseInt(p.total, 10)),
        backgroundColor: sortedProjectTypeMap.map(({ color }) => color),
      },
    ],
  };
};
