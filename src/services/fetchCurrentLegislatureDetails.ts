import axios from 'axios';
import { LegislatureDetails } from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

export const fetchCurrentLegislatureDetails = async (
  lid: string,
): Promise<LegislatureDetails> => {
  const { data } = await axios.post(
    `${apiPaths.currentLegislatureDetails}${lid}`,
  );

  return mapKeysToCamelCase(data);
};
