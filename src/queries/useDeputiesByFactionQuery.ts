import { useQuery } from '@tanstack/react-query';
import { fetchDeputiesByFaction } from '../services';

export const useDeputiesByFactionQuery = (fid?: string) => {
  const enabled = Boolean(fid);

  return useQuery(
    ['deputies-faction', fid],
    () => {
      if (!fid) return undefined;

      return fetchDeputiesByFaction(fid);
    },
    {
      enabled,
    },
  );
};
