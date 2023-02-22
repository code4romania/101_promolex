import { Deputy } from './Deputy';

type Committee = {
  cid: string;
  committee: string;
  hasMembers: string;
};

export type LegislationInitiativeDetails = {
  denumireProiect: string;
  nrProiect: string;
  dataReg: string;
  statutProiect: string;
  lastUpdate: string;
  linkProiect: string;
  domInt: string;
  autor: Pick<Deputy, 'did' | 'fullName'>[];
  urgenta: string;
  comisiaSesizata: Committee[];
  consPub: string;
  dataConsPub: string;
  avizatProiectul: string;
  amendamente: string;
  deputatiAmendamente: string;
  dataVot1Lect: string;
  dataVot2Lect: string;
  dataVot3Lect: string;
  '1depPentruLect': Pick<Deputy, 'did' | 'fullName'>[];
  '1depContraLect': Pick<Deputy, 'did' | 'fullName'>[];
  '1depAbtinutLect': Pick<Deputy, 'did' | 'fullName'>[];
  '2depPentruLect': Pick<Deputy, 'did' | 'fullName'>[];
  '2depContraLect': Pick<Deputy, 'did' | 'fullName'>[];
  '2depAbtinutLect': Pick<Deputy, 'did' | 'fullName'>[];
  '3depPentruLect': Pick<Deputy, 'did' | 'fullName'>[];
  '3depContraLect': Pick<Deputy, 'did' | 'fullName'>[];
  '3depAbtinutLect': Pick<Deputy, 'did' | 'fullName'>[];
};
