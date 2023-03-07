import axios from 'axios';
import { CommitteeInstitutionReports } from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

export const fetchCommitteeInstitutionReportsByLegislature = async (
  lid: string,
): Promise<CommitteeInstitutionReports[]> => {
  const { data } = await axios.post(
    `${apiPaths.committeeInstitutionReports}${lid}`,
  );

  return mapKeysToCamelCase(data);
};
