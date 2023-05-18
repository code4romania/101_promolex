import { useQuery } from '@tanstack/react-query';
import { fetchIncomeStatementYearsByDeputyId } from '../services';

export const useIncomeStatementYearsByDeputyIdQuery = (did?: string) => {
  const enabled = Boolean(did);

  return useQuery(
    ['income-statement-years', did],
    () => {
      if (!did) return undefined;

      return fetchIncomeStatementYearsByDeputyId(did);
    },
    {
      enabled,
    },
  );
};
