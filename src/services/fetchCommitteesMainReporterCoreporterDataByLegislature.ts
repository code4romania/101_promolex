import axios from 'axios';
import { CommitteesMainReporterCoreporterData } from '../types';
import { apiPaths } from './apiUrls';

export const fetchCommitteesMainReporterCoreporterDataByLegislature = async (
  lid: string,
): Promise<CommitteesMainReporterCoreporterData> => {
  const { data } = await axios.post(
    `${apiPaths.committeesMainReporterCoreporterData}${lid}`,
  );

  return data;
};
