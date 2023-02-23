import axios from 'axios';
import { Session } from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

export const fetchSessionsByLegislature = async (
  lid: string,
): Promise<Session[]> => {
  const { data } = await axios.post(
    `${apiPaths.sessionsListByLegislatureId}${lid}`,
  );

  return mapKeysToCamelCase(data);
};
