export type Deputy = {
  did: string;
  depStatus: string;
  fullName: string;
  factionsShortName: string;
  factionName: string;
  photo: string;
};

export type CommitteeDeputy = Omit<Deputy, 'depStatus' | 'photo'> & {
  comFunction: string;
};
