import axios from "axios";
import { apiPaths } from "../constants";
import { LegislationInitiative } from "../types";

export const fetchIncomeStatementsByDeputy = async (
  did: string,
  year: string
): Promise<LegislationInitiative> => {
  const { data } = await axios.post(
    apiPaths.incomeStatementsByDeputyId(did, year)
  );

  return data;
};
