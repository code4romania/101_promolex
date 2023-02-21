import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchEventDetails } from '../services';
import { EventDetails } from '../types';

export const useEventDetailsQuery = (
  eid: string,
  options?: UseQueryOptions<EventDetails>,
) =>
  useQuery<EventDetails>(['event-details', eid], () => fetchEventDetails(eid), {
    ...options,
    enabled: Boolean(eid) && options?.enabled,
  });
