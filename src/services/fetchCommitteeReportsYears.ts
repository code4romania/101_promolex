import axios from 'axios';
import { CommitteeReportYear } from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

type CommitteeReportsYearsParams = {
  lid: string;
  report_type:
    | 'Rapoartele instituțiilor publice'
    | 'Audierea în plen a rapoartelor';
};

export const fetchCommitteeReportsYears = async (
  params: CommitteeReportsYearsParams,
): Promise<CommitteeReportYear> => {
  const queryParams = new URLSearchParams(params);
  const { data } = await axios.get(
    `${apiPaths.committeeReportsYears}&${queryParams}`,
  );

  return mapKeysToCamelCase(data);
};
