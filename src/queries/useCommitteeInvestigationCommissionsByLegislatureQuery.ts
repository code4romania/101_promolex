import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchCommitteeInvestigationCommissionsByLegislature } from '../services';
import { CommitteeInvestigationCommission } from '../types';
import { useCurrentLegislatureQuery } from './useCurrentLegislatureQuery';

export const useCommitteeInvestigationCommissionsByLegislatureQuery = (
  options?: UseQueryOptions<CommitteeInvestigationCommission[]>,
) => {
  const { data: lid, isLoading, isError } = useCurrentLegislatureQuery();

  const enabled = Boolean(lid) && !isLoading && !isError && options?.enabled;

  return useQuery<CommitteeInvestigationCommission[]>(
    ['committee-investigation-commission', lid],
    () => fetchCommitteeInvestigationCommissionsByLegislature(lid ?? ''),
    {
      ...options,
      enabled,
    },
  );
};
