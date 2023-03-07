import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchCommitteeSpecialCommissionsByLegislature } from '../services';
import { CommitteeSpecialCommission } from '../types';
import { useCurrentLegislatureQuery } from './useCurrentLegislatureQuery';

export const useCommitteeSpecialCommissionsByLegislatureQuery = (
  options?: UseQueryOptions<CommitteeSpecialCommission[]>,
) => {
  const { data: lid, isLoading, isError } = useCurrentLegislatureQuery();

  const enabled = Boolean(lid) && !isLoading && !isError && options?.enabled;

  return useQuery<CommitteeSpecialCommission[]>(
    ['committee-special-commission', lid],
    () => fetchCommitteeSpecialCommissionsByLegislature(lid ?? ''),
    {
      ...options,
      enabled,
    },
  );
};
