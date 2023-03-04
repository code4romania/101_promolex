import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchLiveSession } from '../services';
import { ErrorResponse, LiveSession } from '../types';

export const useLiveSessionQuery = (
  options?: UseQueryOptions<LiveSession | ErrorResponse>,
) =>
  useQuery<LiveSession | ErrorResponse>(
    ['live-session'],
    () => fetchLiveSession(),
    options,
  );
