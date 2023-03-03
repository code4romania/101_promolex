import axios from 'axios';
import { CommitteesMainReporterData } from '../types';
import { apiPaths } from './apiUrls';

export const fetchCommitteesMainReporterDataByLegislature = async (
  lid: string,
): Promise<CommitteesMainReporterData> => {
  const { data } = await axios.post(
    `${apiPaths.committeesMainReporterData}${lid}`,
  );

  return data;
};
