import axios from 'axios';
import { apiPaths } from '../constants';
import { IncomeStatements } from '../types';

export const fetchIncomeStatementsByDeputy = async (
  did: string,
  year: string,
): Promise<IncomeStatements> => {
  const { data } = await axios.post(
    apiPaths.incomeStatementsByDeputyId(did, year),
  );

  return data;
};
