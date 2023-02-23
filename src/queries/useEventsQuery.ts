import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchEvents } from '../services';
import { Event } from '../types';

export const useEventsQuery = (options?: UseQueryOptions<Event[]>) =>
  useQuery<Event[]>(['events'], fetchEvents, options);
