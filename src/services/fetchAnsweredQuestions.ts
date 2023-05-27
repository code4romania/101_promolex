import axios from 'axios';
import { AnsweredQuestion } from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

export const fetchAnsweredQuestions = async (): Promise<AnsweredQuestion[]> => {
  const { data } = await axios.post(apiPaths.answeredQuestions);

  return mapKeysToCamelCase(data);
};
