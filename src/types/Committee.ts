import { CommitteeDeputy } from './Deputy';

type MainReporter = {
  legi_adoptate_comasate: string;
  legi_in_examinare: string;
  legi_retras_respins: string;
  hotarari_adoptate_comasate: string;
  hotarari_in_examinare: string;
  hotarari_retras_respins: string;
};

type MainReporterCorepoter = {
  comisie_raportor: string;
  comisie_coraportor: string;
};
type CommitteeHearing = {
  dataSedinte: string;
  hearingType: string;
};

type CommitteeSession = {
  dataSedinte: string;
  procesVerbal: string;
};

export type Committee = {
  cid: string;
  committee: string;
  commEmail: string;
  hasDetails: 'yes' | 'no';
};

export type CommitteeDetails = {
  cid: string;
  legislature: string;
  committee: string;
  commEmail: string;
  commPhone: string;
  members: CommitteeDeputy[];
  organizedHearings: CommitteeHearing[];
  sessions: CommitteeSession[];
};

export type CommitteeNotices = {
  'Comisia administrație publică': string;
  'Comisia drepturile omului și relații interetnice': string;
  'Comisia juridică, numiri şi imunităţi': string;
  'Comisia economie, buget și finanțe': string;
  'Comisia securitate națională, apărare și ordine publică': string;
  'Comisia politică externă și integrare europeană': string;
  'Comisia mediu și dezvoltare regională': string;
  'Comisia cultură, educație, cercetare, tineret, sport și mass-media': string;
  'Comisia agricultură și industrie alimentară': string;
  'Comisia protecție socială, sănătate și familie': string;
  'Comisia de control al finanțelor publice': string;
};

export type CommitteesMainReporterData = {
  [k: string]: MainReporter;
};

export type CommitteesMainReporterCoreporterData = {
  [k: string]: MainReporterCorepoter;
};
