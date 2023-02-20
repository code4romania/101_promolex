import axios from 'axios';
import { apiPaths } from './apiUrls';

export const fetchCurrentLegislature = async (): Promise<string> => {
  const { data } = await axios.post(apiPaths.currentLegislatureId);

  return data;
};
