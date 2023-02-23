import axios from 'axios';
import { Deputy } from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

export const fetchDeputiesByLegislature = async (
  lid: string,
): Promise<Deputy[]> => {
  const { data } = await axios.post(
    `${apiPaths.deputiesListByLegislatureId}${lid}`,
  );

  return mapKeysToCamelCase(data);
};
