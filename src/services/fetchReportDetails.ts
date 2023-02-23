import axios from 'axios';
import { ReportDetails } from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

export const fetchReportDetails = async (
  rid: string,
): Promise<ReportDetails> => {
  const { data } = await axios.post(`${apiPaths.reportDetails}${rid}`);

  return mapKeysToCamelCase(data);
};
