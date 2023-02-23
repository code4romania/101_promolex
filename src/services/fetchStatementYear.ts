import axios from 'axios';
import { apiPaths } from './apiUrls';

export const fetchStatementYear = async (): Promise<string> => {
  const { data } = await axios.post(apiPaths.statementYear);

  return data;
};
