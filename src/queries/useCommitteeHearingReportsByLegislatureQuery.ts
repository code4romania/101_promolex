import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchCommitteeHearingReportsByLegislature } from '../services';
import { CommitteeHearingReports } from '../types';
import { useCurrentLegislatureQuery } from './useCurrentLegislatureQuery';

export const useCommitteeHearingReportsByLegislatureQuery = (
  year: string,
  options?: UseQueryOptions<CommitteeHearingReports[]>,
) => {
  const { data: lid, isLoading, isError } = useCurrentLegislatureQuery();

  const enabled = Boolean(lid) && !isLoading && !isError && options?.enabled;

  return useQuery<CommitteeHearingReports[]>(
    ['committee-hearing-reports', lid, year],
    () => fetchCommitteeHearingReportsByLegislature({ lid: lid ?? '', year }),
    {
      ...options,
      enabled,
    },
  );
};
