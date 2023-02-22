import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchCurrentLegislatureDetails } from '../services';
import { LegislatureDetails } from '../types';
import { useCurrentLegislatureQuery } from './useCurrentLegislatureQuery';

export const useCurrentLegislatureDetailsQuery = (
  options?: UseQueryOptions<LegislatureDetails>,
) => {
  const { data: lid, isLoading, isError } = useCurrentLegislatureQuery();

  const enabled = Boolean(lid) && !isLoading && !isError;

  return useQuery<LegislatureDetails>(
    ['current-legislature-details', lid],
    () => fetchCurrentLegislatureDetails(lid ?? ''),
    {
      ...options,
      enabled,
    },
  );
};
