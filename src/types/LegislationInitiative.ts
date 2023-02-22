export type LegislationInitiativeStatute =
  | 'în examinare'
  | 'adoptat'
  | 'respins'
  | 'comasat'
  | 'retras';

export type LegislationInitiative = {
  docid: string;
  proiectAct: string;
  nrProiect: string;
  dataReg: string;
  statutProiect: string;
  linkProiect: string;
  denumireProiect: string;
  autor: string;
};
