/* eslint-disable camelcase */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchCommitteeReportsYears } from '../services';
import { CommitteeReportYear } from '../types';
import { useCurrentLegislatureQuery } from './useCurrentLegislatureQuery';

export const useCommitteeReportsYearsQuery = (
  report_type:
    | 'Rapoartele instituțiilor publice'
    | 'Audierea în plen a rapoartelor',
  options?: UseQueryOptions<CommitteeReportYear>,
) => {
  const { data: lid, isLoading, isError } = useCurrentLegislatureQuery();

  const enabled = Boolean(lid) && !isLoading && !isError && options?.enabled;

  return useQuery<CommitteeReportYear>(
    ['committee-report-years', lid, report_type],
    () =>
      fetchCommitteeReportsYears({
        lid: lid ?? '',
        report_type,
      }),
    {
      ...options,
      enabled,
    },
  );
};
