import axios from 'axios';
import { CommitteeDeputy } from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

export const fetchDeputiesByCommittee = async (
  committee: string,
): Promise<CommitteeDeputy[]> => {
  const { data } = await axios.post(
    `${apiPaths.deputiesListByCommitteeId}${committee}`,
  );

  return mapKeysToCamelCase(data);
};
