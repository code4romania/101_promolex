import axios from 'axios';
import { CommitteeHearingReports } from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

type CommitteeHearingReportsByLegislatureProps = {
  lid: string;
  year: string;
};

export const fetchCommitteeHearingReportsByLegislature = async (
  params: CommitteeHearingReportsByLegislatureProps,
): Promise<CommitteeHearingReports[]> => {
  const queryParams = new URLSearchParams(params);
  const { data } = await axios.get(
    `${apiPaths.committeeHearingReports}&${queryParams}`,
  );

  return mapKeysToCamelCase(data);
};
