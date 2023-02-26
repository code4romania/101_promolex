import { useQuery } from '@tanstack/react-query';
import { values } from 'lodash';
import {
  fetchRegisteredProjects,
  RegisteredProjectsQueryParams,
} from '../services';
import { useCurrentLegislatureQuery } from './useCurrentLegislatureQuery';

export const useRegisteredProjectsQuery = (
  params: RegisteredProjectsQueryParams,
) => {
  const { from, to } = params;
  const { data: lid, isLoading, isError } = useCurrentLegislatureQuery();

  const enabled =
    Boolean(lid) && Boolean(from) && Boolean(to) && !isLoading && !isError;

  return useQuery(
    ['registered-projects', lid, ...values(params)],
    () => {
      if (!lid || !from || !to) return undefined;

      return fetchRegisteredProjects({ lid, ...params });
    },
    {
      enabled,
    },
  );
};
