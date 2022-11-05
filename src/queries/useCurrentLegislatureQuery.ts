import { useQuery } from "@tanstack/react-query";
import { fetchCurrentLegislature } from "../services";

export const useCurrentLegislatureQuery = () => {
  return useQuery(["current-legislature"], fetchCurrentLegislature);
};
