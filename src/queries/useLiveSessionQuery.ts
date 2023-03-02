import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchLiveSession } from '../services';
import { LiveSession } from '../types';

export const useLiveSessionQuery = (options?: UseQueryOptions<LiveSession>) =>
  useQuery<LiveSession>(['live-session'], () => fetchLiveSession(), options);
