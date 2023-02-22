export enum Routes {
  AboutProject = '/',
  Deputies = '/deputati',
  LegislativeActivity = '/activitate',
  PlenaryMeetings = '/sedinte',
  Reports = '/rapoarte',
  News = '/noutati',
}

export enum LegislativeActivityRoutes {
  projects = '/proiecte-inregistrate',
  statute = '/statut-proiecte',
  domains = '/domenii-proiecte',
}

export type RoutesParams = {
  fid: string;
  did: string;
};

type RouteConfig = {
  label: string;
  route: Routes;
  subRoutes?: {
    label: string;
    route: string;
  }[];
};

export type RoutesConfig = RouteConfig[];
