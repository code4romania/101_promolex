/* eslint-disable camelcase */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchCommitteeExPostEvaluationYearsByLegislature } from '../services';
import { ExPostEvaluationYear } from '../types';
import { useCurrentLegislatureQuery } from './useCurrentLegislatureQuery';

export const useCommitteeExPostEvaluationYearsByLegislatureQuery = (
  eval_type: 'Juridică' | 'De impact',
  options?: UseQueryOptions<ExPostEvaluationYear>,
) => {
  const { data: lid, isLoading, isError } = useCurrentLegislatureQuery();

  const enabled = Boolean(lid) && !isLoading && !isError && options?.enabled;

  return useQuery<ExPostEvaluationYear>(
    ['committee-ex-post-evaluation-years', lid, eval_type],
    () =>
      fetchCommitteeExPostEvaluationYearsByLegislature({
        lid: lid ?? '',
        eval_type,
      }),
    {
      ...options,
      enabled,
    },
  );
};
