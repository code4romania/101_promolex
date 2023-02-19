import axios from 'axios';
import { apiPaths } from '../constants';
import { Deputy } from '../types';

export const fetchDeputiesByLegislature = async (
  lid: string,
): Promise<Deputy[]> => {
  const { data } = await axios.post(
    `${apiPaths.deputiesListByLegislatureId}${lid}`,
  );

  return data;
};
