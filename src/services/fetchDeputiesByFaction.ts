import axios from 'axios';
import { apiPaths } from '../constants';
import { Deputy } from '../types';

export const fetchDeputiesByFaction = async (
  fid: string,
): Promise<Deputy[]> => {
  const { data } = await axios.post(
    `${apiPaths.deputiesListByFactionId}${fid}`,
  );

  return data;
};
