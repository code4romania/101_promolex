export enum Routes {
  AboutProject = "/",
  Deputies = "/deputati",
  LegislativeActivity = "/activitate",
  PlenaryMeetings = "/sedinte",
  Reports = "/rapoarte",
  News = "/noutati",
}

export type RoutesParams = {
  fid: string;
  did: string;
};

type RouteConfig = {
  label: string;
  route: Routes;
};

export type RoutesConfig = RouteConfig[];
