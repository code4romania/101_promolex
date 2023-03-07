import { PartialDeputy } from './LegislationInitiativeDetails';

export type CommitteeQuestion = {
  docid: string;
  dataSedinta: string;
  question: string;
  institution: string;
  answerType: string;
  answerFile: string;
  autori: PartialDeputy[];
};
