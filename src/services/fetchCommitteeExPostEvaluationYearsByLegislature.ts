import axios from 'axios';
import { ExPostEvaluationYear } from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

export type CommitteeExPostEvaluationYearsParams = {
  lid: string;
  eval_type: 'Juridică' | 'De impact';
};

export const fetchCommitteeExPostEvaluationYearsByLegislature = async (
  params: CommitteeExPostEvaluationYearsParams,
): Promise<ExPostEvaluationYear> => {
  const queryParams = new URLSearchParams(params);
  const { data } = await axios.post(
    `${apiPaths.committeeExPostEvaluationYears}&${queryParams}`,
  );

  return mapKeysToCamelCase(data);
};
