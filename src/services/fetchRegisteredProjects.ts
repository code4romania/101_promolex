import axios from 'axios';
import { apiPaths } from '../constants';
import { LegislationInitiative } from '../types';
import { mapKeysToCamelCase } from '../utils';

export const fetchRegisteredProjects = async (
  lid: string,
  from: string,
  to: string,
): Promise<LegislationInitiative[]> => {
  const { data } = await axios.post(
    apiPaths.registeredProjectsByLegislatureId(lid, from, to),
  );

  return mapKeysToCamelCase(data);
};
