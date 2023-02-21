import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchSessionsByLegislature } from '../services';
import { Session } from '../types';
import { useCurrentLegislatureQuery } from './useCurrentLegislatureQuery';

export const useSessionsByLegislatureQuery = (
  options?: UseQueryOptions<Session[]>,
) => {
  const { data: lid, isLoading, isError } = useCurrentLegislatureQuery();

  const enabled = Boolean(lid) && !isLoading && !isError && options?.enabled;

  return useQuery<Session[]>(
    ['sessions-by-legislature', lid],
    () => fetchSessionsByLegislature(lid ?? ''),
    {
      ...options,
      enabled,
    },
  );
};
