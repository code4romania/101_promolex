import axios from 'axios';
import { CommitteeInterpellation } from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

export const fetchCommitteeInterpellationsByLegislature = async (
  lid: string,
): Promise<CommitteeInterpellation[]> => {
  const { data } = await axios.get(
    `${apiPaths.committeeInterpellations}${lid}`,
  );

  return mapKeysToCamelCase(data);
};
