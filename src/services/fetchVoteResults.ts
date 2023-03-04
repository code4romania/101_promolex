import axios from 'axios';
import { VoteResults } from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

export const fetchVoteResults = async (): Promise<VoteResults> => {
  const { data } = await axios.post(apiPaths.voteResults);

  return mapKeysToCamelCase(data);
};
