import axios from 'axios';
import { CommitteeSpecialCommission } from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

export const fetchCommitteeSpecialCommissionsByLegislature = async (
  lid: string,
): Promise<CommitteeSpecialCommission[]> => {
  const { data } = await axios.post(
    `${apiPaths.committeeSpecialCommissions}${lid}`,
  );

  return mapKeysToCamelCase(data);
};
