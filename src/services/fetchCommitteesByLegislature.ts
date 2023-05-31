import axios from 'axios';
import { Committee } from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

export const fetchCommitteesByLegislature = async (
  lid: string,
): Promise<Committee[]> => {
  const { data } = await axios.get(
    `${apiPaths.committeesListByLegislatureId}${lid}`,
  );

  return mapKeysToCamelCase(data);
};
