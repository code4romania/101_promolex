import axios from 'axios';
import { apiPaths } from '../constants';
import { LegislationInitiativeDetails } from '../types';
import { mapKeysToCamelCase } from '../utils';

export const fetchLegislationInitiativeDetails = async (
  docid: string,
): Promise<Partial<LegislationInitiativeDetails>> => {
  const { data } = await axios.post(
    `${apiPaths.legislationInitiativeDetailsById}${docid}`,
  );

  return mapKeysToCamelCase(data);
};
