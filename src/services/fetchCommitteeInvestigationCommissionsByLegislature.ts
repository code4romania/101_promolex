import axios from 'axios';
import { CommitteeInvestigationCommission } from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

export const fetchCommitteeInvestigationCommissionsByLegislature = async (
  lid: string,
): Promise<CommitteeInvestigationCommission[]> => {
  const { data } = await axios.get(
    `${apiPaths.committeeInvestigationCommissions}${lid}`,
  );

  return mapKeysToCamelCase(data);
};
