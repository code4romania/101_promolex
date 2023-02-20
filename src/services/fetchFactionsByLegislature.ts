import axios from 'axios';
import { Faction } from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

export const fetchFactionsByLegislature = async (
  lid: string,
): Promise<Faction[]> => {
  const { data } = await axios.post(
    `${apiPaths.factionsListByLegislatureId}${lid}`,
  );

  return mapKeysToCamelCase(data);
};
