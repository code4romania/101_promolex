export enum Routes {
  AboutProject = "/",
  Deputies = "/deputati",
  LegislativeActivity = "/activitate",
  PlenaryMeetings = "/sedinte",
  Reports = "/rapoarte",
  News = "/noutati",
}

type RouteConfig = {
  label: string;
  route: Routes;
};

export type RoutesConfig = RouteConfig[];
