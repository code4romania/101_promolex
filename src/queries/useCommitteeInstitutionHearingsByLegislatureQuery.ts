import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchCommitteeInstitutionHearingsByLegislature } from '../services';
import { CommitteeInstitutionHearing } from '../types';
import { useCurrentLegislatureQuery } from './useCurrentLegislatureQuery';

export const useCommitteeInstitutionHearingsByLegislatureQuery = (
  options?: UseQueryOptions<CommitteeInstitutionHearing[]>,
) => {
  const { data: lid, isLoading, isError } = useCurrentLegislatureQuery();

  const enabled = Boolean(lid) && !isLoading && !isError && options?.enabled;

  return useQuery<CommitteeInstitutionHearing[]>(
    ['committee-institution-hearings', lid],
    () => fetchCommitteeInstitutionHearingsByLegislature(lid ?? ''),
    {
      ...options,
      enabled,
    },
  );
};
