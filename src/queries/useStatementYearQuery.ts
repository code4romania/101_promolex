import { useQuery } from '@tanstack/react-query';
import { fetchStatementYear } from '../services';

export const useStatementYearQuery = () =>
  useQuery(['statement-year'], fetchStatementYear);
