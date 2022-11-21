import axios from "axios";
import { apiPaths } from "../constants";
import { LegislationInitiative } from "../types";

export const fetchLegislationInitiativesByDeputy = async (
  did: string
): Promise<LegislationInitiative[]> => {
  const { data } = await axios.post(
    `${apiPaths.legislationInitiativesByDeputyId}${did}`
  );

  return data;
};
