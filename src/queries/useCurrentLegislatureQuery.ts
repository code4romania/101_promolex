import { useQuery } from '@tanstack/react-query';
import { fetchCurrentLegislature } from '../services';

export const useCurrentLegislatureQuery = () =>
  useQuery(['current-legislature'], fetchCurrentLegislature);
