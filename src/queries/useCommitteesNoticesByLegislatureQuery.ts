import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchCommitteesNoticesByLegislature } from '../services';
import { CommitteeNotices } from '../types';
import { useCurrentLegislatureQuery } from './useCurrentLegislatureQuery';

export const useCommitteesNoticesByLegislatureQuery = (
  options?: UseQueryOptions<CommitteeNotices>,
) => {
  const { data: lid, isLoading, isError } = useCurrentLegislatureQuery();

  const enabled = Boolean(lid) && !isLoading && !isError && options?.enabled;

  return useQuery<CommitteeNotices>(
    ['committees-notices-by-legislature', lid],
    () => fetchCommitteesNoticesByLegislature(lid ?? ''),
    {
      ...options,
      enabled,
    },
  );
};
