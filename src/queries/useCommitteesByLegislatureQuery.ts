import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchCommitteesByLegislature } from '../services';
import { Committee } from '../types';
import { useCurrentLegislatureQuery } from './useCurrentLegislatureQuery';

export const useCommitteesByLegislatureQuery = (
  options?: UseQueryOptions<Committee[]>,
) => {
  const { data: lid, isLoading, isError } = useCurrentLegislatureQuery();

  const enabled = Boolean(lid) && !isLoading && !isError && options?.enabled;

  return useQuery<Committee[]>(
    ['committees-by-legislature', lid],
    () => fetchCommitteesByLegislature(lid ?? ''),
    {
      ...options,
      enabled,
    },
  );
};
