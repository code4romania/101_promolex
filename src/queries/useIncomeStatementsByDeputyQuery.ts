import { useQuery } from '@tanstack/react-query';
import { fetchIncomeStatementsByDeputy } from '../services';

export const useIncomeStatementsByDeputyQuery = (
  did?: string,
  year?: string,
) => {
  const enabled = Boolean(did) && Boolean(year);

  return useQuery(
    ['income-statements', did, year],
    () => {
      if (!did || !year) return undefined;

      return fetchIncomeStatementsByDeputy(did, year);
    },
    {
      enabled,
    },
  );
};
