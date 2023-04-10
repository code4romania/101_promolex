import axios from 'axios';
import { IncomeStatements } from '../types';
import { apiPaths } from './apiUrls';

export const fetchIncomeStatementsByDeputy = async (
  did: string,
  year: string,
): Promise<IncomeStatements> => {
  const { data } = await axios.post(
    apiPaths.incomeStatementsByDeputyId(did, year),
  );

  return data;
};
