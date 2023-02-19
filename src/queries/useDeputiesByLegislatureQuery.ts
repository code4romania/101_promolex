import { useQuery } from '@tanstack/react-query';
import { fetchDeputiesByLegislature } from '../services';

export const useDeputiesByLegislatureQuery = (lid?: string) => {
  const enabled = Boolean(lid);

  return useQuery(
    ['deputies-legislature', lid],
    () => {
      if (!lid) return undefined;

      return fetchDeputiesByLegislature(lid);
    },
    {
      enabled,
    },
  );
};
