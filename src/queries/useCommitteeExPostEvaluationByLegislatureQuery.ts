/* eslint-disable camelcase */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchCommitteeExPostEvaluationByLegislature } from '../services';
import { ExPostEvaluation } from '../types';
import { useCurrentLegislatureQuery } from './useCurrentLegislatureQuery';

export const useCommitteeExPostEvaluationByLegislatureQuery = (
  eval_type: 'Juridică' | 'De impact',
  year: string,
  options?: UseQueryOptions<ExPostEvaluation>,
) => {
  const { data: lid, isLoading, isError } = useCurrentLegislatureQuery();

  const enabled = Boolean(lid) && !isLoading && !isError && options?.enabled;

  return useQuery<ExPostEvaluation>(
    ['committee-ex-post-evaluation', lid, eval_type, year],
    () =>
      fetchCommitteeExPostEvaluationByLegislature({
        lid: lid ?? '',
        eval_type,
        year,
      }),
    {
      ...options,
      enabled,
    },
  );
};
