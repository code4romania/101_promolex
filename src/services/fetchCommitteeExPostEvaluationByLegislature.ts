import axios from 'axios';
import { ExPostEvaluation } from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

export type CommitteeExPostEvaluationParams = {
  lid: string;
  eval_type: 'Juridică' | 'De impact';
  year: string;
};

export const fetchCommitteeExPostEvaluationByLegislature = async (
  params: CommitteeExPostEvaluationParams,
): Promise<ExPostEvaluation> => {
  const queryParams = new URLSearchParams(params);
  const { data } = await axios.get(
    `${apiPaths.committeeExPostEvaluation}&${queryParams}`,
  );

  return mapKeysToCamelCase(data);
};
