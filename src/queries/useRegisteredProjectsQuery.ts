import { useQuery } from '@tanstack/react-query';
import { fetchRegisteredProjects } from '../services';
import { useCurrentLegislatureQuery } from './useCurrentLegislatureQuery';

export const useRegisteredProjectsQuery = (from?: string, to?: string) => {
  const { data: lid, isLoading, isError } = useCurrentLegislatureQuery();

  const enabled =
    Boolean(lid) && Boolean(from) && Boolean(to) && !isLoading && !isError;

  return useQuery(
    ['registered-projects', lid, from, to],
    () => {
      if (!lid || !from || !to) return undefined;

      return fetchRegisteredProjects(lid, from, to);
    },
    {
      enabled,
    },
  );
};
