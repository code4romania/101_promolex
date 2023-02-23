import axios from 'axios';
import { LegislationInitiativeDetails } from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

export const fetchLegislationInitiativeDetails = async (
  docid: string,
): Promise<Partial<LegislationInitiativeDetails>> => {
  const { data } = await axios.post(
    `${apiPaths.legislationInitiativeDetailsById}${docid}`,
  );

  return mapKeysToCamelCase(data);
};
