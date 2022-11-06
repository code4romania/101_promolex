import axios from "axios";
import { apiPaths } from "../constants";
import { Faction } from "../types";

export const fetchFactionsByLegislature = async (
  lid: string
): Promise<Faction[]> => {
  const { data } = await axios.post(
    `${apiPaths.factionsListByLegislatureId}${lid}`
  );

  return data;
};
