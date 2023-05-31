import axios from 'axios';
import { Event } from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

export const fetchEvents = async (): Promise<Event[]> => {
  const { data } = await axios.get(apiPaths.eventsList);

  return mapKeysToCamelCase(data);
};
