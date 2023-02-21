import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchReportDetails } from '../services';
import { ReportDetails } from '../types';

export const useReportDetailsQuery = (
  rid: string,
  options?: UseQueryOptions<ReportDetails>,
) =>
  useQuery<ReportDetails>(
    ['report-details', rid],
    () => fetchReportDetails(rid),
    {
      ...options,
      enabled: Boolean(rid) && options?.enabled,
    },
  );
