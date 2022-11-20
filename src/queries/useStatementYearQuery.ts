import { useQuery } from "@tanstack/react-query";
import { fetchStatementYear } from "../services";

export const useStatementYearQuery = () => {
  return useQuery(["statement-year"], fetchStatementYear);
};
