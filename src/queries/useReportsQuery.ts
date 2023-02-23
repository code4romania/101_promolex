import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchReports } from '../services';
import { Report } from '../types';

export const useReportsQuery = (options?: UseQueryOptions<Report[]>) =>
  useQuery<Report[]>(['reports'], fetchReports, options);
