import { Routes, RoutesConfig } from "../types";

export const routesConfig: RoutesConfig = [
  {
    label: "Despre proiect",
    route: Routes.AboutProject,
  },
  {
    label: "Deputați",
    route: Routes.Deputies,
  },
  {
    label: "Activitate legislativă",
    route: Routes.LegislativeActivity,
  },
  {
    label: "Ședințe plenare",
    route: Routes.PlenaryMeetings,
  },
  {
    label: "Rapoarte",
    route: Routes.Reports,
  },
  {
    label: "Noutăți",
    route: Routes.News,
  },
];
