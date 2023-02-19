import axios from 'axios';
import { apiPaths } from '../constants';
import { DeputyDetails } from '../types';

export const fetchDeputyDetails = async (
  did: string,
): Promise<Partial<DeputyDetails>> => {
  const { data } = await axios.post(`${apiPaths.deputyDetailsById}${did}`);

  return data;
};
