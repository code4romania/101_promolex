export enum Routes {
  Home = '/',
  AboutProject = '/despre-proiect',
  Deputies = '/deputati',
  LegislativeActivity = '/activitate-legislativa',
  PlenaryMeetings = '/sedinte-plenare',
  Reports = '/publicatii',
  News = '/noutati',
}

export enum LegislativeActivityRoutes {
  projects = 'proiecte-de-legi-si-hotarari',
  committees = 'comisii-parlamentare-permanente',
  control = 'control-parlamentar',
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
