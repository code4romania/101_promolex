import axios from 'axios';
import { apiPaths } from '../constants';
import { DeputyDetails } from '../types';
import { mapKeysToCamelCase } from '../utils';

export const fetchDeputyDetails = async (
  did: string,
): Promise<Partial<DeputyDetails>> => {
  const { data } = await axios.post(`${apiPaths.deputyDetailsById}${did}`);

  return mapKeysToCamelCase(data);
};
