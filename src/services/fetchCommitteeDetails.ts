import axios from 'axios';
import { CommitteeDetails } from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

export const fetchCommitteeDetails = async (
  committee: string,
): Promise<CommitteeDetails> => {
  const { data } = await axios.get(`${apiPaths.committeeDetails}${committee}`);

  return mapKeysToCamelCase(data);
};
