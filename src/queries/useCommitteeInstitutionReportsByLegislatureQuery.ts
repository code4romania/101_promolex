import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchCommitteeInstitutionReportsByLegislature } from '../services';
import { CommitteeInstitutionReports } from '../types';
import { useCurrentLegislatureQuery } from './useCurrentLegislatureQuery';

export const useCommitteeInstitutionReportsByLegislatureQuery = (
  year: string,
  options?: UseQueryOptions<CommitteeInstitutionReports[]>,
) => {
  const { data: lid, isLoading, isError } = useCurrentLegislatureQuery();

  const enabled = Boolean(lid) && !isLoading && !isError && options?.enabled;

  return useQuery<CommitteeInstitutionReports[]>(
    ['committee-institution-reports', lid, year],
    () =>
      fetchCommitteeInstitutionReportsByLegislature({ lid: lid ?? '', year }),
    {
      ...options,
      enabled,
    },
  );
};
