import axios from 'axios';
import { apiPaths } from './apiUrls';

export const fetchStatementYear = async (): Promise<string> => {
  const { data } = await axios.get(apiPaths.statementYear);

  return data;
};
