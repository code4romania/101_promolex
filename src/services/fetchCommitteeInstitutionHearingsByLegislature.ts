import axios from 'axios';
import { CommitteeInstitutionHearing } from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

export const fetchCommitteeInstitutionHearingsByLegislature = async (
  lid: string,
): Promise<CommitteeInstitutionHearing[]> => {
  const { data } = await axios.post(
    `${apiPaths.committeeInstitutionHearings}${lid}`,
  );

  return mapKeysToCamelCase(data);
};
