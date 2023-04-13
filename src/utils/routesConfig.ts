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
        label: 'Proiecte de legi și hotărâri',
        route: `${Routes.LegislativeActivity}/${LegislativeActivityRoutes.projects}`,
      },
      {
        label: 'Comisii parlamentare permanente',
        route: `${Routes.LegislativeActivity}/${LegislativeActivityRoutes.committees}`,
      },
      {
        label: 'Control parlamentar',
        route: `${Routes.LegislativeActivity}/${LegislativeActivityRoutes.control}`,
      },
    ],
  },
  {
    label: 'Ședințe plenare',
    route: Routes.PlenaryMeetings,
  },
  {
    label: 'Publicații',
    route: Routes.Reports,
  },
  {
    label: 'Noutăți',
    route: Routes.News,
  },
];
