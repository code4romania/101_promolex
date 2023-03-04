import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchVoteResults } from '../services';
import { VoteResults } from '../types';

export const useVoteResultsQuery = (options?: UseQueryOptions<VoteResults>) =>
  useQuery<VoteResults>(['vote-results'], fetchVoteResults, options);
