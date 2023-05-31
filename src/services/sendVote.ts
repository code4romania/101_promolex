import axios from 'axios';
import { Vote, VoteResults } from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

export const sendVote = async (params: Vote): Promise<string | VoteResults> => {
  const stringParams = new URLSearchParams(params).toString();
  const { data } = await axios.get(`${apiPaths.sendVote}&${stringParams}`);

  return mapKeysToCamelCase(data);
};
