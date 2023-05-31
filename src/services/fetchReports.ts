import axios from 'axios';
import { Report } from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

export const fetchReports = async (): Promise<Report[]> => {
  const { data } = await axios.get(apiPaths.reportsList);

  return mapKeysToCamelCase(data);
};
