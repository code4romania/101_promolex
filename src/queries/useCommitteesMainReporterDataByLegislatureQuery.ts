import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchCommitteesMainReporterDataByLegislature } from '../services';
import { CommitteesMainReporterData } from '../types';
import { useCurrentLegislatureQuery } from './useCurrentLegislatureQuery';

export const useCommitteesMainReporterDataByLegislatureQuery = (
  options?: UseQueryOptions<CommitteesMainReporterData>,
) => {
  const { data: lid, isLoading, isError } = useCurrentLegislatureQuery();

  const enabled = Boolean(lid) && !isLoading && !isError && options?.enabled;

  return useQuery<CommitteesMainReporterData>(
    ['committees-main-reporter-data-by-legislature', lid],
    () => fetchCommitteesMainReporterDataByLegislature(lid ?? ''),
    {
      ...options,
      enabled,
    },
  );
};
