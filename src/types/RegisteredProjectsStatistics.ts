export type KeyFilter =
  | 'proiect_act'
  | 'autor'
  | 'fid'
  | 'statut_proiect'
  | 'lectura'
  | 'domeniul';

export type RegisteredProjectsStatisticsQueryParams = {
  key: KeyFilter;
} & Partial<{
  lid: string;
  from: string;
  to: string;
  statutProiect: string;
}>;

type BasicStatistics = {
  total: string;
};

type ProjectActStatistics = {
  proiectAct: string;
} & BasicStatistics;

type AuthorStatistics = {
  autor: string;
} & BasicStatistics;

type FidStatistics = {
  fid: string;
} & BasicStatistics;

type ProjectStateStatistics = {
  statutProiect: string;
} & BasicStatistics;

type LectureStatistics = {
  lectura: string;
} & BasicStatistics;

type DomainStatistics = {
  domeniul: string;
} & BasicStatistics;

export type RegisteredProjectsStatistics<T extends KeyFilter> =
  T extends 'proiect_act'
    ? ProjectActStatistics
    : T extends 'autor'
    ? AuthorStatistics
    : T extends 'fid'
    ? FidStatistics
    : T extends 'statut_proiect'
    ? ProjectStateStatistics
    : T extends 'lectura'
    ? LectureStatistics
    : T extends 'domeniul'
    ? DomainStatistics
    : never;
