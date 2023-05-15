import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { fetchDeputyDetails } from '../services';
import { DeputyDetails } from '../types';

export const useDeputyDetailsQuery = (
  did?: string,
  options?: UseQueryOptions<DeputyDetails>,
) => {
  const enabled = Boolean(did) && (options?.enabled ?? true);

  return useQuery<DeputyDetails>(
    ['deputy-details', did],
    () => fetchDeputyDetails(did ?? ''),
    {
      ...options,
      enabled,
    },
  );
};
