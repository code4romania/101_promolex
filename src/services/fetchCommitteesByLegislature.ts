import axios from 'axios';
import { Committee } from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

export const fetchCommitteesByLegislature = async (
  lid: string,
): Promise<Committee[]> => {
  const { data } = await axios.post(
    `${apiPaths.committeesListByLegislatureId}${lid}`,
  );

  return mapKeysToCamelCase(data);
};
