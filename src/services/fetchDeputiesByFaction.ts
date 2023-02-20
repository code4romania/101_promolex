import axios from 'axios';
import { Deputy } from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

export const fetchDeputiesByFaction = async (
  fid: string,
): Promise<Deputy[]> => {
  const { data } = await axios.post(
    `${apiPaths.deputiesListByFactionId}${fid}`,
  );

  return mapKeysToCamelCase(data);
};
