import axios from 'axios';
import { LegislationInitiative } from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

export type RegisteredProjectsQueryParams = Partial<{
  autor: string;
  did: string;
  domeniul: string;
  fid: string;
  from: string;
  lectura: string;
  lid: string;
  proiectAct: string;
  statutProiect: string;
  to: string;
}>;

export const fetchRegisteredProjects = async (
  params: RegisteredProjectsQueryParams,
): Promise<LegislationInitiative[]> => {
  const queryParams = new URLSearchParams(params);
  const { data } = await axios.post(
    `${apiPaths.registeredProjectsByFilters}&${queryParams.toString()}`,
  );

  return mapKeysToCamelCase(data);
};
