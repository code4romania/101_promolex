import { useQuery } from '@tanstack/react-query';
import { fetchDeputyDetails } from '../services';

export const useDeputyDetailsQuery = (did?: string) => {
  const enabled = Boolean(did);

  return useQuery(
    ['deputy-details', did],
    () => {
      if (!did) return undefined;

      return fetchDeputyDetails(did);
    },
    {
      enabled,
    },
  );
};
