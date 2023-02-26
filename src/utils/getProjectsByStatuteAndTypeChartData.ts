import { ChartData } from 'chart.js';
import { chain, filter, values } from 'lodash';
import { LegislationInitiative, LegislationInitiativeStatute } from '../types';

const projectTypeMap = [
  {
    color: '#0081A7',
    key: 'lege',
    label: 'Legi',
  },
  { color: '#70C2DA', key: 'hotărâre', label: 'Hotărâri' },
  { color: '#C5D9DF', key: 'moțiune', label: 'Moțiuni' },
];

export const getProjectsByStatuteAndTypeChartData = (
  projects: LegislationInitiative[],
  statute: LegislationInitiativeStatute,
  mainLabel: string,
): ChartData<'bar', number[], string> => {
  const projectsByStatute = chain(projects)
    .groupBy('proiectAct')
    .toPairs()
    .map(([type, projectsByAct]) => {
      const filteredProjects = filter(
        projectsByAct,
        ({ statutProiect }) => statutProiect.toLowerCase() === statute,
      );

      return [type, filteredProjects];
    })
    .fromPairs()
    .sortBy(projectTypeMap.map(({ key }) => key))
    .value();

  const barColors = projectTypeMap.map(({ color }) => color);

  const labels: string[] = projectTypeMap.map(({ label }) => label);

  return {
    labels: [mainLabel],
    datasets: values(projectsByStatute).map((p, index) => ({
      label: labels[index],
      data: [p.length > 0 ? p.length : undefined],
      backgroundColor: barColors[index],
    })),
  };
};
