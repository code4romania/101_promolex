import axios from 'axios';
import { EventDetails } from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

export const fetchEventDetails = async (eid: string): Promise<EventDetails> => {
  const { data } = await axios.get(`${apiPaths.eventDetails}${eid}`);

  return mapKeysToCamelCase(data);
};
