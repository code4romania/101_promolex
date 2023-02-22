import { LegislativeActivityRoutes, Routes, RoutesConfig } from '../types';

export const routesConfig: RoutesConfig = [
  {
    label: 'Despre proiect',
    route: Routes.AboutProject,
  },
  {
    label: 'Deputați',
    route: Routes.Deputies,
  },
  {
    label: 'Activitate legislativă',
    route: Routes.LegislativeActivity,
    subRoutes: [
      {
        label: 'Proiecte înregistrate',
        route: `${Routes.LegislativeActivity}${LegislativeActivityRoutes.projects}`,
      },
      {
        label: 'Statutul proiectelor',
        route: `${Routes.LegislativeActivity}${LegislativeActivityRoutes.statute}`,
      },
      {
        label: 'Domeniile proiectelor',
        route: `${Routes.LegislativeActivity}${LegislativeActivityRoutes.domains}`,
      },
    ],
  },
  {
    label: 'Ședințe plenare',
    route: Routes.PlenaryMeetings,
  },
  {
    label: 'Rapoarte',
    route: Routes.Reports,
  },
  {
    label: 'Noutăți',
    route: Routes.News,
  },
];
