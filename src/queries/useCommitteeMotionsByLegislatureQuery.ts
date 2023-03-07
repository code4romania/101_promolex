/* eslint-disable camelcase */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchCommitteeMotionsByLegislature } from '../services';
import { CommitteeMotion } from '../types';
import { useCurrentLegislatureQuery } from './useCurrentLegislatureQuery';

export const useCommitteeMotionsByLegislatureQuery = (
  motion_type: 'simplă' | 'de cenzură',
  options?: UseQueryOptions<CommitteeMotion[]>,
) => {
  const { data: lid, isLoading, isError } = useCurrentLegislatureQuery();

  const enabled = Boolean(lid) && !isLoading && !isError && options?.enabled;

  return useQuery<CommitteeMotion[]>(
    ['committee-motions', lid, motion_type],
    () => fetchCommitteeMotionsByLegislature({ lid: lid ?? '', motion_type }),
    {
      ...options,
      enabled,
    },
  );
};
