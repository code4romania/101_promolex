import axios from 'axios';
import { DeputyDetails } from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

export const fetchDeputyDetails = async (
  did: string,
): Promise<DeputyDetails> => {
  const { data } = await axios.get(`${apiPaths.deputyDetailsById}${did}`);

  return mapKeysToCamelCase(data);
};
