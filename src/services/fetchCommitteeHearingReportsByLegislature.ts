import axios from 'axios';
import { CommitteeHearingReports } from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

export const fetchCommitteeHearingReportsByLegislature = async (
  lid: string,
): Promise<CommitteeHearingReports[]> => {
  const { data } = await axios.post(
    `${apiPaths.committeeHearingReports}${lid}`,
  );

  return mapKeysToCamelCase(data);
};
