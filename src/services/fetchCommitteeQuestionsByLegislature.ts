import axios from 'axios';
import { CommitteeQuestion } from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

export const fetchCommitteeQuestionsByLegislature = async (
  lid: string,
): Promise<CommitteeQuestion[]> => {
  const { data } = await axios.get(`${apiPaths.committeeQuestions}${lid}`);

  return mapKeysToCamelCase(data);
};
