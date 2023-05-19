import axios from 'axios';
import { apiPaths } from './apiUrls';

export const fetchIncomeStatementYearsByDeputyId = async (
  did: string,
): Promise<{ year: string }[]> => {
  const { data } = await axios.post(
    `${apiPaths.deputyIncomeStatementYears}${did}`,
  );

  return data;
};
