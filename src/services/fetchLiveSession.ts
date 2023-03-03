import axios from 'axios';
import { LiveSession } from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

export const fetchLiveSession = async (): Promise<LiveSession> => {
  const { data } = await axios.post(apiPaths.liveSession);

  return mapKeysToCamelCase(data);
};
