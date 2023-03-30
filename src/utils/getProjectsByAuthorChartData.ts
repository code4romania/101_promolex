import { ChartData } from 'chart.js';
import { map, zip } from 'lodash';
import { RegisteredProjectsStatistics } from '../types';

const authorMap = {
  Deputați: {
    color: '#88A9B5',
    label: 'Deputați',
  },
  Guvernul: { color: '#3868D7', label: 'Guvernul' },
  'Președintele RM': { color: '#BAE2F1', label: 'Președintele RM' },
  'Biroul Permanent': { color: '#E3F7FF', label: 'Biroul Permanent' },
  'Adunarea Populară a UTAG': {
    color: '#FDE68A',
    label: 'Adunarea Populară a UTAG',
  },
};

export const getProjectsByAuthorChartData = (
  projects: RegisteredProjectsStatistics<'autor'>[],
): ChartData<'pie', number[], string> | undefined => {
  if (!projects?.length) {
    return undefined;
  }

  const [labels, backgroundColor, data] = zip(
    ...map(projects, ({ autor, total }) => [
      authorMap[autor as keyof typeof authorMap]?.label ?? '',
      authorMap[autor as keyof typeof authorMap]?.color,
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
