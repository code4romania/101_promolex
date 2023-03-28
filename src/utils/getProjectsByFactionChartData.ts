import { ChartData } from 'chart.js';
import { map, zip } from 'lodash';
import { RegisteredProjectsStatistics } from '../types';

const factionsMap = {
  '1': {
    color: '#FACC15',
    label: 'Partidul Acțiune și Solidaritate',
  },
  '2': { color: '#DC2626', label: 'Blocul Comuniștilor și Socialiștilor' },
  '3': { color: '#16A34A', label: 'Partidul Politic "ȘOR"' },
};

export const getProjectsByFactionChartData = (
  projects: RegisteredProjectsStatistics<'fid'>[],
): ChartData<'doughnut', number[], string> | undefined => {
  if (!projects?.length) {
    return undefined;
  }

  const [labels, backgroundColor, data] = zip(
    ...map(projects, ({ fid, total }) => [
      factionsMap[fid as keyof typeof factionsMap]?.label ?? '',
      factionsMap[fid as keyof typeof factionsMap]?.color,
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
