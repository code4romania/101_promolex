import { Deputy } from './Deputy';

type Committee = {
  cid: string;
  committee: string;
  hasMembers: string;
};

export type PartialDeputy = Pick<Deputy, 'did' | 'fullName'>;

export type LegislationInitiativeDetails = {
  denumireProiect: string;
  nrProiect: string;
  dataReg: string;
  statutProiect: string;
  lastUpdate: string;
  linkProiect: string;
  domInt: string;
  autor: PartialDeputy[];
  urgenta: string;
  comisiaSesizata: Committee[];
  consPub: string;
  dataConsPub: string;
  avizatProiectul: string;
  amendamente: string;
  deputatiAmendamente: PartialDeputy[];
  dataVot1Lect: string;
  dataVot2Lect: string;
  dataVot3Lect: string;
  '1LectDepPentru': PartialDeputy[] | null;
  '1LectDepContra': PartialDeputy[] | null;
  '1LectDepAbtinut': PartialDeputy[] | null;
  '2LectDepPentru': PartialDeputy[] | null;
  '2LectDepContra': PartialDeputy[] | null;
  '2LectDepAbtinut': PartialDeputy[] | null;
  '3LectDepPentru': PartialDeputy[] | null;
  '3LectDepContra': PartialDeputy[] | null;
  '3LectDepAbtinut': PartialDeputy[] | null;
};
