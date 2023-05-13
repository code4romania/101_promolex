import { useQuery } from '@tanstack/react-query';
import { fetchDeputiesByLegislature } from '../services';
import { useCurrentLegislatureQuery } from './useCurrentLegislatureQuery';

export const useDeputiesByLegislatureQuery = () => {
  const {
    data: lid,
    isLoading: isLoadingLid,
    isError: isErrorLoadingLid,
  } = useCurrentLegislatureQuery();

  const enabled = Boolean(lid) && !isLoadingLid && !isErrorLoadingLid;

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
