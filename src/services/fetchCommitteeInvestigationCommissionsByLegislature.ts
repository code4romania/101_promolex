import axios from 'axios';
import { CommitteeInvestigationCommission } from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

export const fetchCommitteeInvestigationCommissionsByLegislature = async (
  lid: string,
): Promise<CommitteeInvestigationCommission[]> => {
  const { data } = await axios.post(
    `${apiPaths.committeeInvestigationCommissions}${lid}`,
  );

  return mapKeysToCamelCase(data);
};
