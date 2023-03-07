import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchCommitteeQuestionsByLegislature } from '../services';
import { CommitteeQuestion } from '../types';
import { useCurrentLegislatureQuery } from './useCurrentLegislatureQuery';

export const useCommitteeQuestionsByLegislatureQuery = (
  options?: UseQueryOptions<CommitteeQuestion[]>,
) => {
  const { data: lid, isLoading, isError } = useCurrentLegislatureQuery();

  const enabled = Boolean(lid) && !isLoading && !isError && options?.enabled;

  return useQuery<CommitteeQuestion[]>(
    ['committee-questions', lid],
    () => fetchCommitteeQuestionsByLegislature(lid ?? ''),
    {
      ...options,
      enabled,
    },
  );
};
