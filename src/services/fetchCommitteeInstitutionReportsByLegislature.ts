import axios from 'axios';
import { CommitteeInstitutionReports } from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

type CommitteeInstitutionReportsByLegislatureProps = {
  lid: string;
  year: string;
};

export const fetchCommitteeInstitutionReportsByLegislature = async (
  params: CommitteeInstitutionReportsByLegislatureProps,
): Promise<CommitteeInstitutionReports[]> => {
  const queryParams = new URLSearchParams(params);
  const { data } = await axios.post(
    `${apiPaths.committeeInstitutionReports}&${queryParams}`,
  );

  return mapKeysToCamelCase(data);
};
