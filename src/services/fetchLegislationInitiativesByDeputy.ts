import axios from 'axios';
import { LegislationInitiative } from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

export const fetchLegislationInitiativesByDeputy = async (
  did: string,
): Promise<LegislationInitiative[]> => {
  const { data } = await axios.get(
    `${apiPaths.legislationInitiativesByDeputyId}${did}`,
  );

  return mapKeysToCamelCase(data);
};
