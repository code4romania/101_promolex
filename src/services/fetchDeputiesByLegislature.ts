import axios from 'axios';
import { apiPaths } from '../constants';
import { Deputy } from '../types';
import { mapKeysToCamelCase } from '../utils';

export const fetchDeputiesByLegislature = async (
  lid: string,
): Promise<Deputy[]> => {
  const { data } = await axios.post(
    `${apiPaths.deputiesListByLegislatureId}${lid}`,
  );

  return mapKeysToCamelCase(data);
};
