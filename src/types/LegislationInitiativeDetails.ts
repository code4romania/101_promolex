import { Deputy } from './Deputy';

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
  autor: Pick<Deputy, 'did' | 'full_name'>[];
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
  dep_pentru_1_lect: Pick<Deputy, 'did' | 'full_name'>[];
  dep_contra_1_lect: Pick<Deputy, 'did' | 'full_name'>[];
  dep_abtinut_1_lect: Pick<Deputy, 'did' | 'full_name'>[];
  dep_pentru_2_lect: Pick<Deputy, 'did' | 'full_name'>[];
  dep_contra_2_lect: Pick<Deputy, 'did' | 'full_name'>[];
  dep_abtinut_2_lect: Pick<Deputy, 'did' | 'full_name'>[];
  dep_pentru_3_lect: Pick<Deputy, 'did' | 'full_name'>[];
  dep_contra_3_lect: Pick<Deputy, 'did' | 'full_name'>[];
  dep_abtinut_3_lect: Pick<Deputy, 'did' | 'full_name'>[];
};
