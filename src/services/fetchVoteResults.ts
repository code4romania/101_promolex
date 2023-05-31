import axios from 'axios';
import { VoteResults } from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

export const fetchVoteResults = async (): Promise<VoteResults> => {
  const { data } = await axios.get(apiPaths.voteResults);

  return mapKeysToCamelCase(data);
};
