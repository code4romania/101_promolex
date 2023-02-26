import { ChartData } from 'chart.js';
import { chain, groupBy, keys, values } from 'lodash';
import { RegisteredProjectsStatistics } from '../types';

const authorMap = [
  {
    color: '#88A9B5',
    key: 'Deputați',
    label: 'Deputați',
  },
  { color: '#3868D7', key: 'Guvernul', label: 'Guvernul' },
  { color: '#BAE2F1', key: 'Președintele RM', label: 'Președintele RM' },
  { color: '#E3F7FF', key: 'Biroul Permanent', label: 'Biroul Permanent' },
  {
    color: '#FDE68A',
    key: 'Adunarea Populară a UTAG',
    label: 'Adunarea Populară a UTAG',
  },
];

export const getProjectsByAuthorChartData = (
  projects: RegisteredProjectsStatistics<'autor'>[],
): ChartData<'pie', number[], string> => {
  const projectsByAuthor = groupBy(projects, 'autor');

  const sortedProjectTypeMap = chain(authorMap)
    .sortBy(({ key }) => keys(projectsByAuthor).indexOf(key))
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
