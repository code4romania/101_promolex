import { ChartData } from 'chart.js';
import { map, zip } from 'lodash';
import { RegisteredProjectsStatistics } from '../types';

const projectTypeMap = {
  lege: {
    color: '#88A9B5',
    key: 'lege',
    label: 'Legi',
  },
  moțiune: { color: '#BAE2F1', label: 'Moțiuni' },
  hotărâre: { color: '#3868D7', label: 'Hotărâri' },
};

export const getProjectsByTypeChartData = (
  projects: RegisteredProjectsStatistics<'proiect_act'>[],
): ChartData<'pie', number[], string> | undefined => {
  if (!projects?.length) {
    return undefined;
  }

  const [labels, backgroundColor, data] = zip(
    ...map(projects, ({ proiectAct, total }) => [
      projectTypeMap[proiectAct as keyof typeof projectTypeMap]?.label ?? '',
      projectTypeMap[proiectAct as keyof typeof projectTypeMap]?.color,
      total,
    ]),
  );

  return {
    labels: labels?.map((l) => l ?? '') ?? [],
    datasets: [
      {
        label: 'Nr. proiecte',
        data: data?.map((d) => parseInt(d ?? '0', 10)) ?? [],
        backgroundColor,
      },
    ],
  };
};
