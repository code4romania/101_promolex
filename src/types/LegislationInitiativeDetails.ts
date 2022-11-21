import { Deputy } from "./Deputy";

type Committee = {
  cid: string;
  committee: string;
  has_members: string;
};

export type LegislationInitiativeDetails = {
  denumire_proiect: string;
  nr_proiect: string;
  data_reg: string;
  statut_proiect: string;
  last_update: string;
  link_proiect: string;
  dom_int: string;
  autor: Pick<Deputy, "did" | "full_name">[];
  urgenta: string;
  comisia_sesizata: Committee[];
  cons_pub: string;
  data_cons_pub: string;
  avizat_proiectul: string;
  amendamente: string;
  deputati_amendamente: string;
  data_vot_1_lect: string;
  data_vot_2_lect: string;
  data_vot_3_lect: string;
  //   1_lect_dep_pentru: Pick<Deputy, "did" | "full_name">[];
  //   lect_dep_contra: Pick<Deputy, "did" | "full_name">[];
  //   lect_dep_abtinut: Pick<Deputy, "did" | "full_name">[];
};
