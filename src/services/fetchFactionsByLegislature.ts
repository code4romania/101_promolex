import axios from 'axios';
import { apiPaths } from '../constants';
import { Faction } from '../types';
import { mapKeysToCamelCase } from '../utils';

export const fetchFactionsByLegislature = async (
  lid: string,
): Promise<Faction[]> => {
  const { data } = await axios.post(
    `${apiPaths.factionsListByLegislatureId}${lid}`,
  );

  return mapKeysToCamelCase(data);
};
