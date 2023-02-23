import axios from 'axios';
import {
  KeyFilter,
  RegisteredProjectsStatistics,
  RegisteredProjectsStatisticsQueryParams,
} from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

export const fetchRegisteredProjectsStatistics = async <T extends KeyFilter>(
  params: RegisteredProjectsStatisticsQueryParams,
): Promise<RegisteredProjectsStatistics<T>[]> => {
  const queryParams = new URLSearchParams(params);
  const { data } = await axios.post(
    `${apiPaths.registeredProjectsStatistics}?${queryParams.toString()}`,
  );

  return mapKeysToCamelCase(data);
};
