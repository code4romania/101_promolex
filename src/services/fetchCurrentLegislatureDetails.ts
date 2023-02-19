import axios from 'axios';
import { apiPaths } from '../constants';
import { LegislatureDetails } from '../types';

export const fetchCurrentLegislatureDetails = async (
  lid: string,
): Promise<LegislatureDetails> => {
  const { data } = await axios.post(
    `${apiPaths.currentLegislatureDetails}${lid}`,
  );

  return data;
};
