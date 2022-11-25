import axios from "axios";
import { apiPaths } from "../constants";
import { LegislationInitiativeDetails } from "../types";

export const fetchLegislationInitiativeDetails = async (
  docid: string
): Promise<Partial<LegislationInitiativeDetails>> => {
  const { data } = await axios.post(
    `${apiPaths.legislationInitiativeDetailsById}${docid}`
  );

  return {
    ...data,
    dep_pentru_1_lect: data["1_lect_dep_pentru"],
    dep_abtinut_1_lect: data["1_lect_dep_abtinut"],
    dep_contra_1_lect: data["1_lect_dep_contra"],
    dep_pentru_2_lect: data["2_lect_dep_pentru"],
    dep_abtinut_2_lect: data["2_lect_dep_abtinut"],
    dep_contra_2_lect: data["2_lect_dep_contra"],
    dep_pentru_3_lect: data["3_lect_dep_pentru"],
    dep_abtinut_3_lect: data["3_lect_dep_abtinut"],
    dep_contra_3_lect: data["3_lect_dep_contra"],
  };
};
