import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchCommitteeDetails } from '../services';
import { CommitteeDetails } from '../types';

export const useCommitteeDetailsQuery = (
  committee: string,
  options?: UseQueryOptions<CommitteeDetails>,
) => {
  const enabled = Boolean(committee) && options?.enabled;

  return useQuery<CommitteeDetails>(
    ['committee-details', committee],
    () => fetchCommitteeDetails(committee),
    {
      ...options,
      enabled,
    },
  );
};
