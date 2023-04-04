import axios from 'axios';
import { DeputyQuestion } from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

export const fetchDeputyQuestionsAndInterpellations = async (
  did: string,
): Promise<DeputyQuestion[]> => {
  const { data } = await axios.post(`${apiPaths.deputyQuestions}${did}`);

  return mapKeysToCamelCase(data);
};
