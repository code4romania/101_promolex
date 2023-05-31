import axios from 'axios';
import { CommitteeSpecialCommission } from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

export const fetchCommitteeSpecialCommissionsByLegislature = async (
  lid: string,
): Promise<CommitteeSpecialCommission[]> => {
  const { data } = await axios.get(
    `${apiPaths.committeeSpecialCommissions}${lid}`,
  );

  return mapKeysToCamelCase(data);
};
