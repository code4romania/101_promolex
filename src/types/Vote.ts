export type Vote = {
  id: string;
  vote: '0' | '1';
};

export type VoteResults = {
  votesFor: string;
  votesAgainst: string;
};
