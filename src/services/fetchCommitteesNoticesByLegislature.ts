import axios from 'axios';
import { CommitteeNotices } from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

export const fetchCommitteesNoticesByLegislature = async (
  lid: string,
): Promise<CommitteeNotices> => {
  const { data } = await axios.post(`${apiPaths.committeesNotices}${lid}`);

  return mapKeysToCamelCase(data);
};
