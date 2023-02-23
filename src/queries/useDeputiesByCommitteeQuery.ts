import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchDeputiesByCommittee } from '../services';
import { CommitteeDeputy } from '../types';

export const useDeputiesByCommitteeQuery = (
  cid: string,
  options?: UseQueryOptions<CommitteeDeputy[]>,
) =>
  useQuery<CommitteeDeputy[]>(
    ['deputies-by-committee', cid],
    () => fetchDeputiesByCommittee(cid),
    { ...options, enabled: Boolean(cid) && options?.enabled },
  );
