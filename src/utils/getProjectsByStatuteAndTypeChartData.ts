import { ChartData } from 'chart.js';
import { find, values } from 'lodash';
import { RegisteredProjectsStatistics } from '../types';

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
  projects: RegisteredProjectsStatistics<'proiect_act'>[],
  mainLabel: string,
): ChartData<'bar', (number | undefined)[], string> | undefined => {
  if (!projects.length) {
    return undefined;
  }

  return {
    labels: [mainLabel],
    datasets: values(projects).map((p) => ({
      label:
        find(projectTypeMap, ({ key }) => key === p.proiectAct)?.label ?? '',
      data: [parseInt(p.total, 10) > 0 ? parseInt(p.total, 10) : undefined],
      backgroundColor:
        find(projectTypeMap, ({ key }) => key === p.proiectAct)?.color ?? '',
    })),
  };
};
