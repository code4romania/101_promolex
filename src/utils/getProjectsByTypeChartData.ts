import { ChartData } from 'chart.js';
import { chain, groupBy, keys, values } from 'lodash';
import { LegislationInitiative } from '../types';

const projectTypeMap = [
  {
    color: '#88A9B5',
    key: 'lege',
    label: 'Legi',
  },
  { color: '#3868D7', key: 'hotărâre', label: 'Hotărâri' },
  { color: '#BAE2F1', key: 'moțiune', label: 'Moțiuni' },
];

export const getProjectsByTypeChartData = (
  projects: LegislationInitiative[],
): ChartData<'pie', number[], string> => {
  const projectsByType = groupBy(projects, 'proiectAct');

  const sortedProjectTypeMap = chain(projectTypeMap)
    .sortBy(({ key }) => keys(projectsByType).indexOf(key))
    .value();

  const labels: string[] = sortedProjectTypeMap.map(({ label }) => label);

  return {
    labels,
    datasets: [
      {
        label: 'Nr. proiecte',
        data: values(projectsByType).map((p) => p.length),
        backgroundColor: sortedProjectTypeMap.map(({ color }) => color),
      },
    ],
  };
};
