import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchCommitteesMainReporterCoreporterDataByLegislature } from '../services';
import { CommitteesMainReporterCoreporterData } from '../types';
import { useCurrentLegislatureQuery } from './useCurrentLegislatureQuery';

export const useCommitteesMainReporterCoreporterDataByLegislatureQuery = (
  options?: UseQueryOptions<CommitteesMainReporterCoreporterData>,
) => {
  const { data: lid, isLoading, isError } = useCurrentLegislatureQuery();

  const enabled = Boolean(lid) && !isLoading && !isError && options?.enabled;

  return useQuery<CommitteesMainReporterCoreporterData>(
    ['committees-main-reporter-coreporter-data-by-legislature', lid],
    () => fetchCommitteesMainReporterCoreporterDataByLegislature(lid ?? ''),
    {
      ...options,
      enabled,
    },
  );
};
