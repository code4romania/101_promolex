import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchCommitteeInterpellationsByLegislature } from '../services';
import { CommitteeInterpellation } from '../types';
import { useCurrentLegislatureQuery } from './useCurrentLegislatureQuery';

export const useCommitteeInterpellationsByLegislatureQuery = (
  options?: UseQueryOptions<CommitteeInterpellation[]>,
) => {
  const { data: lid, isLoading, isError } = useCurrentLegislatureQuery();

  const enabled = Boolean(lid) && !isLoading && !isError && options?.enabled;

  return useQuery<CommitteeInterpellation[]>(
    ['committee-interpellations', lid],
    () => fetchCommitteeInterpellationsByLegislature(lid ?? ''),
    {
      ...options,
      enabled,
    },
  );
};
