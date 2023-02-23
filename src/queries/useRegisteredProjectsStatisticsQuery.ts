import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchRegisteredProjectsStatistics } from '../services';
import {
  KeyFilter,
  RegisteredProjectsStatistics,
  RegisteredProjectsStatisticsQueryParams,
} from '../types';

export const useRegisteredProjectsStatisticsQuery = <T extends KeyFilter>(
  params: RegisteredProjectsStatisticsQueryParams,
  options?: UseQueryOptions<RegisteredProjectsStatistics<T>[]>,
) =>
  useQuery<RegisteredProjectsStatistics<T>[]>(
    ['registered-projects-statistics', params],
    () => fetchRegisteredProjectsStatistics(params),
    options,
  );
