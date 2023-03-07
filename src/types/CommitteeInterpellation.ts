import { PartialDeputy } from './LegislationInitiativeDetails';

export type CommitteeInterpellation = {
  docid: string;
  dataSedinta: string;
  interpellation: string;
  institution: string;
  answerType: string;
  autori: PartialDeputy[];
};
