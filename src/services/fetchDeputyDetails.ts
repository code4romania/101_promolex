import axios from 'axios';
import { DeputyDetails } from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

export const fetchDeputyDetails = async (
  did: string,
): Promise<Partial<DeputyDetails>> => {
  const { data } = await axios.post(`${apiPaths.deputyDetailsById}${did}`);

  return mapKeysToCamelCase(data);
};
