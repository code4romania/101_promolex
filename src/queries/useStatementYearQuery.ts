import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { fetchStatementYear } from '../services';

export const useStatementYearQuery = (options?: UseQueryOptions<string>) =>
  useQuery<string>(['statement-year'], fetchStatementYear, options);
