import axios from 'axios';
import { apiPaths } from './apiUrls';

export const fetchCurrentLegislature = async (): Promise<string> => {
  const { data } = await axios.get(apiPaths.currentLegislatureId);

  return data;
};
